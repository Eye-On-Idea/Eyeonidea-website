// functions/api/contact.ts

export const onRequestPost = async ({ request, env }) => {
  try {
    const { name, email, subject, message, company } = await request.json();

    // Bot honeypot
    if (company) return json({ ok: true });

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM, // e.g. no-reply@eyeonidea.com
        to: env.CONTACT_TO, // e.g. hello@eyeonidea.com
        subject: `Contact: ${subject}`,
        reply_to: email,
        html: `
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!r.ok) {
      const body = await r.text().catch(() => "");
      return json({ error: `Email provider error: ${body || r.status}` }, 502);
    }

    return json({ ok: true });
  } catch {
    return json({ error: "Unexpected error" }, 500);
  }
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
