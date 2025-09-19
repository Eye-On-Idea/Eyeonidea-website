// server/api/contact.post.ts
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(10, "Please write a longer message"),
  company: z.string().optional().default(""), // honeypot
});

// tiny in-memory rate limit: 5 requests per 5 minutes per IP
const bucket = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string, max = 5, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const item = bucket.get(ip);
  if (!item || now > item.resetAt) {
    bucket.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (item.count >= max) return false;
  item.count += 1;
  return true;
}

export default defineEventHandler(async (event) => {
  // basic rate limit
  const ip =
    getRequestHeader(event, "x-forwarded-for")?.split(",")[0].trim() ||
    getRequestIP(event) ||
    "unknown";
  if (!rateLimit(ip)) {
    throw createError({ statusCode: 429, statusMessage: "Too many requests" });
  }

  const body = await readBody(event);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid input" });
  }

  // Honeypot: if filled, pretend success but drop it
  if (parsed.data.company) {
    return { ok: true };
  }

  const { name, email, subject, message } = parsed.data;

  // Guard lengths
  const safeSubject = subject.slice(0, 200);
  const safeMessage = message.slice(0, 5000);

  const config = useRuntimeConfig();
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT || 587),
    secure: false, // STARTTLS on 587
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  const text = `New contact form message

From: ${name} <${email}>
Subject: ${safeSubject}

${safeMessage}
`;

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${config.CONTACT_FROM}>`,
      to: config.CONTACT_TO,
      replyTo: email,
      subject: `Contact form: ${safeSubject}`,
      text,
    });
    return { ok: true };
  } catch (err) {
    console.error("Mailer error:", err);
    throw createError({ statusCode: 500, statusMessage: "Failed to send" });
  }
});
