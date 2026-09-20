/**
 * HTML + plain-text email bodies for the contact form.
 *
 * Every interpolated value passes through esc() so a submitted string can
 * never break out of the markup or inject attributes/scripts.
 */

import { QUOTE_STEPS } from "../src/constants/quoteSchema.mjs";

const BRAND = {
  emerald: "#10b981",
  emeraldDark: "#059669",
  ink: "#0a0a0a",
  slate: "#3f3f46",
  muted: "#71717a",
  line: "#e4e4e7",
  bg: "#f4f4f5",
  site: "https://rufarodev.com",
};

/** Escape the five XML-significant characters. */
function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape, then turn newlines into <br> for multi-line message bodies. */
function escMultiline(value) {
  return esc(value).replace(/\r?\n/g, "<br />");
}

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};width:150px;vertical-align:top;
                 font:600 12px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                 letter-spacing:.06em;text-transform:uppercase;color:${BRAND.muted};">
        ${esc(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};
                 font:400 15px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
        ${value}
      </td>
    </tr>`;
}

function pill(text) {
  return `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border-radius:999px;
    background:#ecfdf5;border:1px solid #a7f3d0;color:${BRAND.emeraldDark};
    font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">${esc(text)}</span>`;
}

/**
 * The notification that lands in the owner's inbox.
 */
function buildNotificationEmail(data) {
  const {
    name,
    email,
    company,
    phone,
    projectType,
    budget,
    timeline,
    heardFrom,
    message,
    meta = {},
  } = data;

  const services = Array.isArray(projectType) ? projectType : [projectType];
  const servicePills = services.filter(Boolean).map(pill).join("") || "—";
  const mailtoReply = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: your enquiry on rufarodev.com`
  )}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New enquiry from ${esc(name)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${esc(name)}${company ? ` · ${esc(company)}` : ""} — ${esc(
    services.filter(Boolean).join(", ") || "General enquiry"
  )}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:640px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;overflow:hidden;">

          <!-- header -->
          <tr>
            <td style="background:linear-gradient(135deg,#065f46 0%,#0f766e 55%,#0369a1 100%);padding:28px 28px 24px;">
              <div style="font:600 11px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.18em;text-transform:uppercase;color:#a7f3d0;">
                rufarodev.com · new enquiry
              </div>
              <div style="margin-top:8px;font:700 24px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
                ${esc(name)}${company ? ` <span style="font-weight:400;color:#d1fae5;">· ${esc(company)}</span>` : ""}
              </div>
              <div style="margin-top:6px;font:400 14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#d1fae5;">
                ${esc(email)}${phone ? ` · ${esc(phone)}` : ""}
              </div>
            </td>
          </tr>

          <!-- services -->
          <tr>
            <td style="padding:24px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
                Interested in
              </div>
              <div>${servicePills}</div>
            </td>
          </tr>

          <!-- details -->
          <tr>
            <td style="padding:16px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Budget", esc(budget))}
                ${row("Timeline", esc(timeline))}
                ${row("Found via", esc(heardFrom))}
                ${row(
                  "Reply to",
                  `<a href="${esc(mailtoReply)}" style="color:${BRAND.emeraldDark};text-decoration:none;font-weight:600;">${esc(
                    email
                  )}</a>`
                )}
              </table>
            </td>
          </tr>

          <!-- message -->
          <tr>
            <td style="padding:24px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
                Message
              </div>
              <div style="padding:16px 18px;background:#fafafa;border:1px solid ${BRAND.line};
                          border-left:3px solid ${BRAND.emerald};border-radius:10px;
                          font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};">
                ${escMultiline(message)}
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 28px 8px;">
              <a href="${esc(mailtoReply)}"
                 style="display:inline-block;padding:12px 22px;border-radius:10px;background:${BRAND.emerald};
                        color:#04160f;text-decoration:none;
                        font:700 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                Reply to ${esc(name)}
              </a>
            </td>
          </tr>

          <!-- meta -->
          <tr>
            <td style="padding:16px 28px 28px;">
              <div style="border-top:1px solid ${BRAND.line};padding-top:14px;
                          font:400 12px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                Submitted ${esc(meta.submittedAt || "")}<br />
                Page: ${esc(meta.page || "—")}<br />
                Referrer: ${esc(meta.referrer || "direct")}<br />
                IP: ${esc(meta.ip || "—")}
              </div>
            </td>
          </tr>
        </table>

        <div style="max-width:640px;margin:14px auto 0;
                    font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
          Sent by the contact form on
          <a href="${BRAND.site}" style="color:${BRAND.muted};">rufarodev.com</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `NEW ENQUIRY — rufarodev.com`,
    ``,
    `Name:      ${name}`,
    company ? `Company:   ${company}` : null,
    `Email:     ${email}`,
    phone ? `Phone:     ${phone}` : null,
    services.filter(Boolean).length
      ? `Services:  ${services.filter(Boolean).join(", ")}`
      : null,
    budget ? `Budget:    ${budget}` : null,
    timeline ? `Timeline:  ${timeline}` : null,
    heardFrom ? `Found via: ${heardFrom}` : null,
    ``,
    `MESSAGE`,
    `-------`,
    message,
    ``,
    `Submitted: ${meta.submittedAt || ""}`,
    `Page:      ${meta.page || "—"}`,
    `Referrer:  ${meta.referrer || "direct"}`,
    `IP:        ${meta.ip || "—"}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const subjectBits = [name, company].filter(Boolean).join(" · ");
  const subject = `New enquiry — ${subjectBits}${
    services.filter(Boolean).length ? ` (${services.filter(Boolean).join(", ")})` : ""
  }`;

  return { subject, html, text };
}

/**
 * The confirmation sent back to whoever filled in the form.
 */
function buildAutoReplyEmail(data) {
  const { name, message, projectType } = data;
  const services = (Array.isArray(projectType) ? projectType : [projectType]).filter(
    Boolean
  );
  const firstName = String(name || "there").trim().split(/\s+/)[0];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Thanks for reaching out</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Got your message — I reply within one business day.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:600px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#065f46 0%,#0f766e 55%,#0369a1 100%);padding:30px 28px;">
              <div style="font:700 22px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
                Thanks, ${esc(firstName)} — message received.
              </div>
              <div style="margin-top:8px;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#d1fae5;">
                I read every enquiry personally and reply within one business day.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 28px 0;font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};">
              <p style="margin:0 0 14px;">
                Here's what happens next:
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${["I review your brief and the context around it.", "You get a reply with clarifying questions or a proposed approach.", "If it's a fit, we scope the work, timeline, and cost in writing before anything starts."]
                  .map(
                    (step, i) => `
                <tr>
                  <td width="30" valign="top" style="padding:4px 0;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:999px;background:#ecfdf5;
                                 border:1px solid #a7f3d0;color:${BRAND.emeraldDark};text-align:center;
                                 font:700 12px/22px -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">${i + 1}</span>
                  </td>
                  <td style="padding:4px 0 4px 10px;font:400 15px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};">
                    ${esc(step)}
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          ${
            services.length
              ? `<tr>
            <td style="padding:22px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
                You selected
              </div>
              <div>${services.map(pill).join("")}</div>
            </td>
          </tr>`
              : ""
          }

          <tr>
            <td style="padding:22px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
                Your message
              </div>
              <div style="padding:14px 16px;background:#fafafa;border:1px solid ${BRAND.line};
                          border-left:3px solid ${BRAND.emerald};border-radius:10px;
                          font:400 14px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                ${escMultiline(message)}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 28px 30px;">
              <a href="${BRAND.site}"
                 style="display:inline-block;padding:12px 22px;border-radius:10px;background:${BRAND.emerald};
                        color:#04160f;text-decoration:none;
                        font:700 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                Browse recent work
              </a>
              <div style="margin-top:22px;border-top:1px solid ${BRAND.line};padding-top:16px;
                          font:400 13px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                <strong style="color:${BRAND.ink};">Rufaro Mucheri</strong><br />
                Cloud Solutions Architect · DevOps · Full-Stack<br />
                Calgary, Alberta ·
                <a href="${BRAND.site}" style="color:${BRAND.emeraldDark};text-decoration:none;">rufarodev.com</a>
              </div>
            </td>
          </tr>
        </table>

        <div style="max-width:600px;margin:14px auto 0;
                    font:400 11px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
          You received this because you submitted the contact form on rufarodev.com.
          No newsletter, no list — just this confirmation.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Thanks, ${firstName} — message received.`,
    ``,
    `I read every enquiry personally and reply within one business day.`,
    ``,
    `What happens next:`,
    `  1. I review your brief and the context around it.`,
    `  2. You get a reply with clarifying questions or a proposed approach.`,
    `  3. If it's a fit, we scope the work, timeline, and cost in writing first.`,
    ``,
    services.length ? `You selected: ${services.join(", ")}` : null,
    ``,
    `Your message:`,
    message,
    ``,
    `--`,
    `Rufaro Mucheri`,
    `Cloud Solutions Architect · DevOps · Full-Stack`,
    `Calgary, Alberta · ${BRAND.site}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return {
    subject: "Thanks for reaching out — I'll reply within one business day",
    html,
    text,
  };
}

export { buildNotificationEmail, buildAutoReplyEmail, esc };

/* =========================================================================
   Quote / intake questionnaire emails
   ========================================================================= */

/** Render one answer as display-ready, already-escaped HTML. */
function renderAnswer(field, value) {
  if (field.type === "multi") {
    const list = Array.isArray(value) ? value.filter(Boolean) : [];
    if (list.length === 0) return null;
    return list.map(pill).join("");
  }
  if (field.type === "checkbox") {
    if (value !== true) return null;
    return `<strong style="color:${BRAND.emeraldDark};">Yes</strong>`;
  }
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return null;
  if (field.type === "url") {
    const safe = esc(text);
    return `<a href="${safe}" style="color:${BRAND.emeraldDark};">${safe}</a>`;
  }
  if (field.type === "textarea") return escMultiline(text);
  return esc(text);
}

/** Plain-text version of an answer. */
function answerToText(field, value) {
  if (field.type === "multi") {
    const list = Array.isArray(value) ? value.filter(Boolean) : [];
    return list.length ? list.join(", ") : "";
  }
  if (field.type === "checkbox") return value === true ? "Yes" : "";
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Full questionnaire notification for the site owner.
 * Groups answers by questionnaire step and omits anything left blank, so a
 * short submission produces a short email.
 */
function buildQuoteEmail(answers, meta = {}) {
  const name = answers.name || "Unknown";
  const company = answers.company || "";
  const email = answers.email || "";

  const budget = answers.budget || "Not stated";
  const start = answers.startDate || "Not stated";
  const products = Array.isArray(answers.productType) ? answers.productType : [];

  const mailtoReply = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${answers.projectName || "your project enquiry"}`
  )}`;

  // ---- headline chips: the three things worth seeing before anything else
  const headline = [
    { label: "Budget", value: budget },
    { label: "Start", value: start },
    { label: "Decision", value: answers.decisionMakers || "Not stated" },
  ]
    .map(
      (item) => `
        <td style="padding:0 6px;" width="33%">
          <div style="border:1px solid ${BRAND.line};border-radius:10px;padding:12px;background:#fafafa;">
            <div style="font:600 10px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                        letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};">
              ${esc(item.label)}
            </div>
            <div style="margin-top:4px;font:700 14px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
              ${esc(item.value)}
            </div>
          </div>
        </td>`
    )
    .join("");

  // ---- one block per questionnaire step
  const sections = QUOTE_STEPS.map((step) => {
    const rows = step.fields
      .map((field) => {
        const rendered = renderAnswer(field, answers[field.name]);
        return rendered ? row(field.label, rendered) : "";
      })
      .filter(Boolean)
      .join("");

    if (!rows) return "";

    return `
      <tr>
        <td style="padding:26px 28px 0;">
          <div style="font:700 13px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                      letter-spacing:.08em;text-transform:uppercase;color:${BRAND.emeraldDark};
                      padding-bottom:6px;border-bottom:2px solid ${BRAND.emerald};">
            ${esc(step.title)}
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>
        </td>
      </tr>`;
  })
    .filter(Boolean)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Quote request from ${esc(name)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${esc(budget)} &middot; ${esc(start)} &middot; ${esc(
    products.join(", ") || "project enquiry"
  )}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:680px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;overflow:hidden;">

          <tr>
            <td style="background:linear-gradient(135deg,#065f46 0%,#0f766e 55%,#0369a1 100%);padding:28px;">
              <div style="font:600 11px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.18em;text-transform:uppercase;color:#a7f3d0;">
                rufarodev.com &middot; quote request
              </div>
              <div style="margin-top:8px;font:700 24px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
                ${esc(name)}${
    company
      ? ` <span style="font-weight:400;color:#d1fae5;">&middot; ${esc(company)}</span>`
      : ""
  }
              </div>
              <div style="margin-top:6px;font:400 14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#d1fae5;">
                ${esc(email)}${answers.phone ? ` &middot; ${esc(answers.phone)}` : ""}${
    answers.location ? ` &middot; ${esc(answers.location)}` : ""
  }
              </div>
              ${
                answers.ndaRequired === true
                  ? `<div style="margin-top:12px;display:inline-block;padding:5px 12px;border-radius:999px;
                        background:rgba(0,0,0,.35);border:1px solid #fbbf24;color:#fde68a;
                        font:700 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                        NDA requested before detailed discussion
                     </div>`
                  : ""
              }
            </td>
          </tr>

          <tr>
            <td style="padding:22px 22px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>${headline}</tr>
              </table>
            </td>
          </tr>

          ${sections}

          <tr>
            <td style="padding:26px 28px 8px;">
              <a href="${esc(mailtoReply)}"
                 style="display:inline-block;padding:12px 22px;border-radius:10px;background:${BRAND.emerald};
                        color:#04160f;text-decoration:none;
                        font:700 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                Reply to ${esc(name)}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 28px 28px;">
              <div style="border-top:1px solid ${BRAND.line};padding-top:14px;
                          font:400 12px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                Submitted ${esc(meta.submittedAt || "")}<br />
                Time on form: ${esc(meta.duration || "unknown")}<br />
                Page: ${esc(meta.page || "—")}<br />
                Referrer: ${esc(meta.referrer || "direct")}<br />
                IP: ${esc(meta.ip || "—")}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // ---- plain text mirror
  const textSections = QUOTE_STEPS.map((step) => {
    const lines = step.fields
      .map((field) => {
        const value = answerToText(field, answers[field.name]);
        return value ? `  ${field.label}: ${value}` : null;
      })
      .filter(Boolean);
    if (lines.length === 0) return null;
    return [step.title.toUpperCase(), "-".repeat(step.title.length), ...lines].join(
      "\n"
    );
  })
    .filter(Boolean)
    .join("\n\n");

  const text = [
    `QUOTE REQUEST — rufarodev.com`,
    ``,
    `${name}${company ? ` (${company})` : ""}`,
    `${email}${answers.phone ? ` · ${answers.phone}` : ""}`,
    answers.ndaRequired === true ? `** NDA requested **` : null,
    ``,
    `Budget: ${budget}   Start: ${start}`,
    ``,
    textSections,
    ``,
    `Submitted: ${meta.submittedAt || ""}`,
    `Time on form: ${meta.duration || "unknown"}`,
    `Page: ${meta.page || "—"}`,
    `Referrer: ${meta.referrer || "direct"}`,
    `IP: ${meta.ip || "—"}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const subjectBits = [name, company].filter(Boolean).join(" · ");
  const subject = `Quote request — ${subjectBits} · ${budget} · ${start}`;

  return { subject, html, text };
}

/** Confirmation sent to the person who completed the questionnaire. */
function buildQuoteAutoReply(answers) {
  const firstName = String(answers.name || "there").trim().split(/\s+/)[0];
  const products = (
    Array.isArray(answers.productType) ? answers.productType : []
  ).filter(Boolean);

  const steps = [
    "I read the whole questionnaire and map it against what I've built before.",
    "If anything is ambiguous I'll come back with a short list of questions.",
    "You get a written proposal: scope, approach, milestones, timeline and price.",
    "Nothing starts until you've agreed that document.",
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Your quote request</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Got your questionnaire — a written proposal follows within two business days.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:600px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#065f46 0%,#0f766e 55%,#0369a1 100%);padding:30px 28px;">
              <div style="font:700 22px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
                Thanks, ${esc(firstName)} — that's exactly what I needed.
              </div>
              <div style="margin-top:8px;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#d1fae5;">
                Your questionnaire is in. I'll come back with a written proposal
                within two business days.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:12px;">
                What happens now
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${steps
                  .map(
                    (step, i) => `
                <tr>
                  <td width="30" valign="top" style="padding:5px 0;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:999px;background:#ecfdf5;
                                 border:1px solid #a7f3d0;color:${BRAND.emeraldDark};text-align:center;
                                 font:700 12px/22px -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">${
                                   i + 1
                                 }</span>
                  </td>
                  <td style="padding:5px 0 5px 10px;font:400 15px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};">
                    ${esc(step)}
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          ${
            products.length
              ? `<tr>
            <td style="padding:24px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
                You're looking at
              </div>
              <div>${products.map(pill).join("")}</div>
            </td>
          </tr>`
              : ""
          }

          ${
            answers.summary
              ? `<tr>
            <td style="padding:24px 28px 0;">
              <div style="font:600 11px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                          letter-spacing:.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
                How you described it
              </div>
              <div style="padding:14px 16px;background:#fafafa;border:1px solid ${BRAND.line};
                          border-left:3px solid ${BRAND.emerald};border-radius:10px;
                          font:400 14px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                ${escMultiline(answers.summary)}
              </div>
            </td>
          </tr>`
              : ""
          }

          <tr>
            <td style="padding:26px 28px 30px;">
              <div style="font:400 14px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};">
                Remembered something after hitting send? Just reply to this email
                and it'll reach me directly.
              </div>
              <div style="margin-top:22px;border-top:1px solid ${BRAND.line};padding-top:16px;
                          font:400 13px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.muted};">
                <strong style="color:${BRAND.ink};">Rufaro Mucheri</strong><br />
                Freelance Full-Stack Software Developer<br />
                Calgary, Alberta &middot;
                <a href="${BRAND.site}" style="color:${BRAND.emeraldDark};text-decoration:none;">rufarodev.com</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Thanks, ${firstName} — that's exactly what I needed.`,
    ``,
    `Your questionnaire is in. I'll come back with a written proposal within two business days.`,
    ``,
    `What happens now:`,
    ...steps.map((step, i) => `  ${i + 1}. ${step}`),
    ``,
    products.length ? `You're looking at: ${products.join(", ")}` : null,
    ``,
    `Remembered something after hitting send? Just reply to this email.`,
    ``,
    `--`,
    `Rufaro Mucheri`,
    `Freelance Full-Stack Software Developer`,
    `Calgary, Alberta · ${BRAND.site}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return {
    subject: "Your quote request — proposal within two business days",
    html,
    text,
  };
}

export { buildQuoteEmail, buildQuoteAutoReply };
