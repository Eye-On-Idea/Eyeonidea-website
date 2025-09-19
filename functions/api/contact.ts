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

function escape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  const data = await request.json().catch(() => ({} as any));
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const subject = (data.subject ?? "").trim();
  const message = (data.message ?? "").trim();
  const honeypot = (data.company ?? "").trim();

  // Log basic info (no message content)
  console.log("CONTACT POST", {
    hasName: !!name,
    hasEmail: !!email,
    hasSubject: !!subject,
    hpLen: honeypot.length,
  });

  // Ignore bots if honeypot has any substance (>= 3 chars)
  if (honeypot.length >= 3) {
    console.warn("HONEYPOT_TRIGGERED");
    return json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    console.warn("VALIDATION_FAIL");
    return json({ error: "Missing required fields" }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO) {
    console.error("MISSING_ENV", {
      apiKey: !!env.RESEND_API_KEY,
      from: !!env.CONTACT_FROM,
      to: !!env.CONTACT_TO,
    });
    return json({ error: "Server not configured" }, 500);
  }

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
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    }),
  });

  if (!r.ok) {
    const body = await r.text().catch(() => "");
    console.error("RESEND_ERROR", r.status, body);
    return json({ error: `Email provider error: ${body || r.status}` }, 502);
  }

  console.log("RESEND_OK");
  return json({ ok: true });
};
