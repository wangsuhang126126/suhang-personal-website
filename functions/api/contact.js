const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const sanitize = (value) => (typeof value === "string" ? value.trim() : "");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const topic = sanitize(payload.topic);
  const message = sanitize(payload.message);
  const source = sanitize(payload.source);
  const honeypot = sanitize(payload.company);

  if (honeypot) {
    return json({ ok: true });
  }

  if (!name || !email || !topic || !message) {
    return json({ ok: false, error: "Missing required fields." }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ ok: false, error: "Invalid email address." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ ok: false, error: "Contact service is not configured." }, 500);
  }

  const timestamp = new Date().toISOString();
  const subject = `[suhangwang.com] ${topic}`;
  const text = [
    "New contact form message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    `Timestamp: ${timestamp}`,
    source ? `Source: ${source}` : null,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New contact form message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
    <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
    ${source ? `<p><strong>Source:</strong> ${escapeHtml(source)}</p>` : ""}
    <hr />
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    return json({ ok: false, error: "Email service failed." }, 502);
  }

  return json({ ok: true });
}
