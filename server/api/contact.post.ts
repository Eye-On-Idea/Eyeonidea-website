// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    company?: string; // honeypot
  }>(event);

  // Honeypot: if filled, pretend it's fine (don’t tip bots)
  if (body.company?.trim()) return { ok: true };

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please fill in name, email and message.",
      data: { error: "Missing required fields" },
    });
  }

  const rc = useRuntimeConfig();

  // primary source: runtimeConfig (env from Cloudflare Secrets)
  let API_KEY = rc.RESEND_API_KEY as string | undefined;
  let TO = rc.CONTACT_TO as string | undefined;
  let FROM = rc.CONTACT_FROM as string | undefined;

  // optional fallback: Cloudflare bindings if you ever add them
  const cfEnv = (event as any).context?.cloudflare?.env;
  API_KEY ??= cfEnv?.RESEND_API_KEY;
  TO ??= cfEnv?.CONTACT_TO;
  FROM ??= cfEnv?.CONTACT_FROM;

  if (!API_KEY || !TO || !FROM) {
    throw createError({
      statusCode: 500,
      statusMessage: "Email service is not fully configured.",
      data: { error: "Missing RESEND_API_KEY/CONTACT_TO/CONTACT_FROM" },
    });
  }

  const subject = body.subject?.trim() || "New contact form submission";
  const text = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Subject: ${body.subject || "-"}`,
    "",
    body.message,
  ].join("\n");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "no-reply@eyeonidea.com", // e.g. "EOI <no-reply@eyeonidea.com>"
      to: "hello@eyeonidea.com",
      reply_to: body.email,
      subject,
      text,
      html: text.replace(/\n/g, "<br>"),
    }),
  });

  if (!resp.ok) {
    const details = await resp.json().catch(() => ({}));
    throw createError({
      statusCode: 502,
      statusMessage: "Failed to send email via Resend.",
      data: { error: details?.error || `HTTP ${resp.status}` },
    });
  }

  return { ok: true };
});
