/**
 * Contact-form mail API
 * ---------------------
 * POST /api/contact  → validates the payload, emails it to CONTACT_TO via
 *                      Gmail SMTP, and sends the submitter a confirmation.
 * GET  /api/health   → liveness + SMTP-config check (no secrets returned).
 *
 * Credentials come from environment variables only. Nothing sensitive is
 * hardcoded, logged, or returned in a response body.
 */

import "dotenv/config";

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

import {
  buildNotificationEmail,
  buildAutoReplyEmail,
  buildQuoteEmail,
  buildQuoteAutoReply,
} from "./emailTemplates.mjs";
import {
  QUOTE_FIELDS,
  emptyQuoteAnswers,
  validateQuoteAll,
} from "../src/constants/quoteSchema.mjs";

const PORT = process.env.PORT || 5001;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const CONTACT_TO = process.env.CONTACT_TO || GMAIL_USER;
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || "RufaroDev Website";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error(
    "[mail] GMAIL_USER and GMAIL_APP_PASSWORD must be set. Copy .env.example to .env and fill them in."
  );
}

// ---------------------------------------------------------------- app setup
const app = express();

app.set("trust proxy", 1); // correct client IPs behind Nginx/CloudFront
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/non-browser callers (no Origin header) and any
      // explicitly whitelisted origin. Everything else is rejected.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin not allowed: ${origin}`));
    },
    methods: ["POST", "GET", "OPTIONS"],
    maxAge: 86400,
  })
);

// Throttle submissions per IP so the mailbox (and the Gmail send quota)
// can't be drained by a script.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Too many messages from this address. Try again in a little while.",
  },
});

// ------------------------------------------------------------- mail transport
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // implicit TLS
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    pool: true,
    maxConnections: 2,
    maxMessages: 50,
  });
  return transporter;
}

// -------------------------------------------------------------- validation
const MAX = {
  name: 100,
  email: 254,
  company: 120,
  phone: 40,
  budget: 60,
  timeline: 60,
  heardFrom: 80,
  message: 5000,
};

// Deliberately permissive: the goal is to catch typos, not to police
// every legal address shape.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body) {
  const errors = {};

  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const phone = str(body.phone);
  const budget = str(body.budget);
  const timeline = str(body.timeline);
  const heardFrom = str(body.heardFrom);
  const message = str(body.message);

  const projectType = Array.isArray(body.projectType)
    ? body.projectType.map(str).filter(Boolean).slice(0, 12)
    : str(body.projectType)
    ? [str(body.projectType)]
    : [];

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > MAX.name) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > MAX.email)
    errors.email = "That email address doesn't look right.";

  if (message.length < 20)
    errors.message = "Please give me at least a sentence or two to work with.";
  else if (message.length > MAX.message)
    errors.message = "That message is too long — please trim it a little.";

  if (company.length > MAX.company) errors.company = "Company name is too long.";
  if (phone.length > MAX.phone) errors.phone = "Phone number is too long.";

  // Header-injection guard: CR/LF in any single-line field is never legitimate.
  const singleLine = { name, email, company, phone, budget, timeline, heardFrom };
  for (const [field, value] of Object.entries(singleLine)) {
    if (/[\r\n]/.test(value)) errors[field] = "Invalid characters.";
  }

  return {
    errors,
    data: {
      name,
      email,
      company,
      phone,
      projectType,
      budget: budget.slice(0, MAX.budget),
      timeline: timeline.slice(0, MAX.timeline),
      heardFrom: heardFrom.slice(0, MAX.heardFrom),
      message,
    },
  };
}

// ------------------------------------------------------------------- routes
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "rufarodev-contact-api",
    smtpConfigured: Boolean(GMAIL_USER && GMAIL_APP_PASSWORD),
    time: new Date().toISOString(),
  });
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const body = req.body || {};

  // Honeypot: real users never see or fill this field. Respond with success
  // so bots don't learn they were caught.
  if (str(body._gotcha)) {
    return res.json({ ok: true, delivered: true });
  }

  // Timing check: a genuine human takes more than a couple of seconds.
  const elapsedMs = Number(body.elapsedMs);
  if (Number.isFinite(elapsedMs) && elapsedMs > 0 && elapsedMs < 2000) {
    return res.json({ ok: true, delivered: true });
  }

  const { errors, data } = validate(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: errors,
    });
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(500).json({
      ok: false,
      error: "Mail is not configured on the server yet.",
    });
  }

  const meta = {
    submittedAt: new Date().toLocaleString("en-CA", {
      timeZone: "America/Edmonton",
      dateStyle: "full",
      timeStyle: "short",
    }),
    page: str(body.page),
    referrer: str(body.referrer),
    ip: req.ip,
  };

  const notification = buildNotificationEmail({ ...data, meta });
  const autoReply = buildAutoReplyEmail(data);
  const from = `"${MAIL_FROM_NAME}" <${GMAIL_USER}>`;

  try {
    // The owner notification must succeed — that's the actual delivery.
    await getTransporter().sendMail({
      from,
      to: CONTACT_TO,
      replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    });
  } catch (err) {
    console.error("[mail] notification failed:", err.message);
    return res.status(502).json({
      ok: false,
      error:
        "The message could not be sent right now. Please email me directly and I'll pick it up.",
    });
  }

  // The confirmation is best-effort: if it bounces, the enquiry still landed.
  let autoReplySent = true;
  try {
    await getTransporter().sendMail({
      from,
      to: data.email,
      replyTo: CONTACT_TO,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });
  } catch (err) {
    autoReplySent = false;
    console.warn("[mail] auto-reply failed:", err.message);
  }

  return res.json({ ok: true, delivered: true, autoReplySent });
});

/**
 * Coerce an untrusted payload into exactly the shape the schema describes.
 * Unknown keys are dropped, multi-selects are restricted to their declared
 * options, and every string is trimmed and length-capped. This runs before
 * validation so nothing unexpected can reach the email templates.
 */
function sanitizeQuoteAnswers(body) {
  const answers = emptyQuoteAnswers();

  for (const [name, field] of Object.entries(QUOTE_FIELDS)) {
    const raw = body[name];

    if (field.type === "multi") {
      const allowed = Array.isArray(field.options) ? field.options : [];
      answers[name] = Array.isArray(raw)
        ? raw
            .map(str)
            .filter((v) => allowed.includes(v))
            .slice(0, allowed.length)
        : [];
      continue;
    }

    if (field.type === "checkbox") {
      answers[name] = raw === true;
      continue;
    }

    const cap = field.maxLength || 500;
    answers[name] = str(raw).slice(0, cap);
  }

  return answers;
}

app.post("/api/quote", contactLimiter, async (req, res) => {
  const body = req.body || {};

  // Honeypot — invisible to humans. Answer 200 so bots learn nothing.
  if (str(body._gotcha)) {
    return res.json({ ok: true, delivered: true });
  }

  // An exhaustive questionnaire takes a human well over ten seconds.
  const elapsedMs = Number(body.elapsedMs);
  if (Number.isFinite(elapsedMs) && elapsedMs > 0 && elapsedMs < 10000) {
    return res.json({ ok: true, delivered: true });
  }

  const answers = sanitizeQuoteAnswers(body);
  const errors = validateQuoteAll(answers);

  if (Object.keys(errors).length > 0) {
    // Tell the client which step to jump back to.
    const firstField = Object.keys(errors)[0];
    return res.status(400).json({
      ok: false,
      error: "Some answers need attention.",
      fieldErrors: errors,
      firstStep: QUOTE_FIELDS[firstField] ? QUOTE_FIELDS[firstField].step : null,
    });
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(500).json({
      ok: false,
      error: "Mail is not configured on the server yet.",
    });
  }

  const meta = {
    submittedAt: new Date().toLocaleString("en-CA", {
      timeZone: "America/Edmonton",
      dateStyle: "full",
      timeStyle: "short",
    }),
    duration: Number.isFinite(elapsedMs)
      ? `${Math.round(elapsedMs / 60000)} min`
      : "unknown",
    page: str(body.page),
    referrer: str(body.referrer),
    ip: req.ip,
  };

  const notification = buildQuoteEmail(answers, meta);
  const autoReply = buildQuoteAutoReply(answers);
  const from = `"${MAIL_FROM_NAME}" <${GMAIL_USER}>`;

  try {
    await getTransporter().sendMail({
      from,
      to: CONTACT_TO,
      replyTo: `"${answers.name.replace(/"/g, "")}" <${answers.email}>`,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    });
  } catch (err) {
    console.error("[mail] quote notification failed:", err.message);
    return res.status(502).json({
      ok: false,
      error:
        "Your answers could not be sent right now. Please email me directly and I'll pick it up.",
    });
  }

  // Best effort — the enquiry already landed if this fails.
  let autoReplySent = true;
  try {
    await getTransporter().sendMail({
      from,
      to: answers.email,
      replyTo: CONTACT_TO,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });
  } catch (err) {
    autoReplySent = false;
    console.warn("[mail] quote auto-reply failed:", err.message);
  }

  return res.json({ ok: true, delivered: true, autoReplySent });
});

// CORS rejections, malformed JSON, and anything else unhandled
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err && /Origin not allowed/.test(err.message)) {
    return res.status(403).json({ ok: false, error: "Origin not allowed." });
  }
  // express.json() throws a SyntaxError (with .status) on an unparseable body
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({ ok: false, error: "Malformed request body." });
  }
  if (err && err.type === "entity.too.large") {
    return res.status(413).json({ ok: false, error: "Message is too large." });
  }
  console.error("[server]", err && err.message);
  return res.status(500).json({ ok: false, error: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`[mail] contact API listening on http://localhost:${PORT}`);
  console.log(`[mail] delivering submissions to ${CONTACT_TO || "(unset)"}`);
  console.log(`[mail] allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
});
