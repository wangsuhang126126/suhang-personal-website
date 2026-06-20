const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const sanitize = (value) => (typeof value === "string" ? value.trim() : "");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const fieldLimits = {
  name: 120,
  email: 200,
  topic: 200,
  message: 5000,
  source: 500,
};

const rateLimitPolicy = {
  ipCooldownMs: 60 * 1000,
  emailWindowMs: 10 * 60 * 1000,
  emailMaxSubmissions: 3,
  duplicateWindowMs: 10 * 60 * 1000,
  kvTtlSeconds: 10 * 60,
};

const validationError = () => json({ ok: false, error: "Invalid contact form submission." }, 400);
const rateLimitError = () => json({ ok: false, error: "Please wait a moment before sending another message.", code: "RATE_LIMITED" }, 429);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const normalizeForHash = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();

async function sha256(value) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getClientIp(request) {
  const forwarded = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

async function getTimestampList(kv, key) {
  const stored = await kv.get(key, { type: "json" }).catch(() => null);
  return Array.isArray(stored) ? stored.filter((value) => typeof value === "number") : [];
}

async function enforceRateLimit({ kv, request, email, topic, message }) {
  const now = Date.now();
  const ipHash = await sha256(getClientIp(request));
  const emailHash = await sha256(normalizeForHash(email));
  const messageHash = await sha256(normalizeForHash(`${email}\n${topic}\n${message}`));

  const ipKey = `contact:ip:${ipHash}`;
  const emailKey = `contact:email:${emailHash}`;
  const messageKey = `contact:message:${messageHash}`;

  const lastIpSubmission = Number(await kv.get(ipKey).catch(() => 0));
  if (lastIpSubmission && now - lastIpSubmission < rateLimitPolicy.ipCooldownMs) {
    return false;
  }

  const recentEmailSubmissions = (await getTimestampList(kv, emailKey)).filter(
    (timestamp) => now - timestamp < rateLimitPolicy.emailWindowMs,
  );
  if (recentEmailSubmissions.length >= rateLimitPolicy.emailMaxSubmissions) {
    return false;
  }

  const duplicateMessageTimestamp = Number(await kv.get(messageKey).catch(() => 0));
  if (duplicateMessageTimestamp && now - duplicateMessageTimestamp < rateLimitPolicy.duplicateWindowMs) {
    return false;
  }

  await Promise.all([
    kv.put(ipKey, String(now), { expirationTtl: rateLimitPolicy.kvTtlSeconds }),
    kv.put(emailKey, JSON.stringify([...recentEmailSubmissions, now]), { expirationTtl: rateLimitPolicy.kvTtlSeconds }),
    kv.put(messageKey, String(now), { expirationTtl: rateLimitPolicy.kvTtlSeconds }),
  ]);

  return true;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return validationError();
  }

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const topic = sanitize(payload.topic);
  const message = sanitize(payload.message);
  const source = sanitize(payload.source).slice(0, fieldLimits.source);
  const honeypot = sanitize(payload.company);

  if (honeypot) {
    return validationError();
  }

  if (!name || !email || !topic || !message) {
    return validationError();
  }

  if (
    name.length > fieldLimits.name ||
    email.length > fieldLimits.email ||
    topic.length > fieldLimits.topic ||
    message.length > fieldLimits.message
  ) {
    return validationError();
  }

  if (!isValidEmail(email)) {
    return validationError();
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ ok: false, error: "Contact service is unavailable." }, 500);
  }

  if (!env.CONTACT_RATE_LIMIT) {
    return json({ ok: false, error: "Contact service is unavailable." }, 500);
  }

  const isAllowed = await enforceRateLimit({
    kv: env.CONTACT_RATE_LIMIT,
    request,
    email,
    topic,
    message,
  });

  if (!isAllowed) {
    return rateLimitError();
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

  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
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
  } catch {
    return json({ ok: false, error: "Email service failed." }, 502);
  }

  if (!resendResponse.ok) {
    return json({ ok: false, error: "Email service failed." }, 502);
  }

  return json({ ok: true });
}
