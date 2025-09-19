// functions/api/contact.ts
type Env = {
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  const {
    name = "",
    email = "",
    subject = "",
    message = "",
    company = "",
  } = await request.json().catch(() => ({}));
  if (company) return json({ ok: true }); // honeypot
  if (!name.trim() || !email.trim() || !subject.trim() || !message.trim())
    return json({ error: "Missing required fields" }, 400);
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO)
    return json({ error: "Server not configured" }, 500);

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
      subject: `Contact: ${subject}`,
      reply_to: email,
      html: `<h2>New contact message</h2>
             <p><strong>Name:</strong> ${escape(name)}</p>
             <p><strong>Email:</strong> ${escape(email)}</p>
             <p><strong>Message:</strong></p>
             <p>${escape(message).replace(/\n/g, "<br/>")}</p>`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!r.ok)
    return json(
      {
        error: `Email provider error: ${await r.text().catch(() => r.status)}`,
      },
      502
    );
  return json({ ok: true });
};

function escape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
