import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Cloud,
  Copy,
  Github,
  Globe2,
  Layout,
  Linkedin,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Repeat,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  User,
} from "lucide-react";

import { cx, useTheme } from "./ThemeContext";
import { CONTACT, CONTACT_ENDPOINT } from "../constants/api";

// ---------------------------------------------------------------- options
const SERVICE_OPTIONS = [
  { value: "Website Design", icon: Layout },
  { value: "Web App / SaaS Build", icon: Terminal },
  { value: "Cloud & DevOps", icon: Cloud },
  { value: "DNS & Domain Setup", icon: Globe2 },
  { value: "Email Configuration", icon: Mail },
  { value: "SEO & Performance", icon: Search },
  { value: "Enterprise Platform", icon: Building2 },
  { value: "Maintenance & Support", icon: Repeat },
];

const BUDGET_OPTIONS = [
  "Under $1k",
  "$1k – $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "ASAP",
  "2 – 4 weeks",
  "1 – 3 months",
  "3 months+",
  "Just exploring",
];

const HEARD_FROM_OPTIONS = [
  "Google / search",
  "LinkedIn",
  "GitHub",
  "Referral",
  "Saw one of my builds",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 5000;

const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: [],
  budget: "",
  timeline: "",
  heardFrom: "",
  message: "",
  _gotcha: "",
};

// ------------------------------------------------------------- validation
function validateForm(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email))
    errors.email = "That email address doesn't look right.";

  if (!message) errors.message = "Please tell me a bit about the project.";
  else if (message.length < MESSAGE_MIN)
    errors.message = `A little more detail helps — ${
      MESSAGE_MIN - message.length
    } more character${MESSAGE_MIN - message.length === 1 ? "" : "s"}.`;
  else if (message.length > MESSAGE_MAX)
    errors.message = "That's longer than the form accepts — please trim it.";

  return errors;
}

// ------------------------------------------------------------ small parts
function FieldLabel({ htmlFor, children, required, hint }) {
  const { theme } = useTheme();
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label
        htmlFor={htmlFor}
        className={cx(
          "text-xs font-medium uppercase tracking-wider",
          theme === "dark" ? "text-zinc-400" : "text-zinc-600"
        )}
      >
        {children}
        {required && (
          <span className="ml-1 text-emerald-500" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && (
        <span
          className={cx(
            "text-[11px]",
            theme === "dark" ? "text-zinc-500" : "text-zinc-500"
          )}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

function FieldError({ id, children }) {
  return (
    <AnimatePresence initial={false}>
      {children ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500"
        >
          <AlertCircle size={13} className="shrink-0" />
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function Chip({ active, onClick, children, icon: Icon, ariaPressed = true }) {
  const { theme } = useTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed ? active : undefined}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        theme === "dark"
          ? "focus-visible:ring-offset-zinc-950"
          : "focus-visible:ring-offset-white",
        active
          ? "border-emerald-500 bg-emerald-500 text-black shadow-sm shadow-emerald-500/30"
          : theme === "dark"
          ? "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:text-white"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
      )}
    >
      {Icon && <Icon size={13} className={active ? "" : "text-emerald-500"} />}
      {children}
      {active && <Check size={13} />}
    </button>
  );
}

// ------------------------------------------------------------ main widget
export default function ContactForm() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");
  const [autoReplySent, setAutoReplySent] = useState(true);
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  const startedAt = useRef(Date.now());
  const formTopRef = useRef(null);

  const inputBase = cx(
    "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors",
    "focus:ring-2 focus:ring-emerald-500/40",
    dark
      ? "border-zinc-800 bg-zinc-950/70 text-white placeholder:text-zinc-600 focus:border-emerald-500/60"
      : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500/60"
  );

  const errorRing = dark
    ? "border-rose-500/70 focus:border-rose-500"
    : "border-rose-400 focus:border-rose-500";

  // Live clock for my timezone, so visitors know if I'm likely awake.
  useEffect(() => {
    const tick = () =>
      setLocalTime(
        new Date().toLocaleTimeString("en-CA", {
          timeZone: CONTACT.timezone,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Reset the "Copied" pill after a moment.
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const messageLength = form.message.trim().length;

  // Completion meter — required fields carry most of the weight.
  const completion = useMemo(() => {
    let score = 0;
    if (form.name.trim().length >= 2) score += 28;
    if (EMAIL_RE.test(form.email.trim())) score += 28;
    if (messageLength >= MESSAGE_MIN) score += 28;
    if (form.projectType.length > 0) score += 8;
    if (form.budget) score += 4;
    if (form.timeline) score += 4;
    return Math.min(100, score);
  }, [form, messageLength]);

  const setField = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validate a single field on blur so people see problems as they go,
  // rather than all at once on submit.
  const handleBlur = (field) => () => {
    const next = validateForm(form);
    setErrors((prev) => {
      const copy = { ...prev };
      if (next[field]) copy[field] = next[field];
      else delete copy[field];
      return copy;
    });
  };

  const toggleService = (value) => {
    setForm((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(value)
        ? prev.projectType.filter((v) => v !== value)
        : [...prev.projectType, value],
    }));
  };

  const pickOne = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: prev[field] === value ? "" : value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
    setServerError("");
    startedAt.current = Date.now();
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = ["name", "email", "message"].find((f) => nextErrors[f]);
      if (firstField) document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          elapsedMs: Date.now() - startedAt.current,
          page: window.location.href,
          referrer: document.referrer,
        }),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok || !payload?.ok) {
        if (payload?.fieldErrors) setErrors(payload.fieldErrors);
        setServerError(
          payload?.error ||
            "The message didn't go through. Please try again, or email me directly."
        );
        setStatus("error");
        return;
      }

      setAutoReplySent(payload.autoReplySent !== false);
      setStatus("sent");
    } catch {
      setServerError(
        "I couldn't reach the mail service — it may be offline. Please email me directly and I'll pick it up."
      );
      setStatus("error");
    }
  };

  const sending = status === "sending";

  // ------------------------------------------------------------ success view
  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className={cx(
          "relative overflow-hidden rounded-3xl border p-8 text-center md:p-14",
          dark
            ? "border-emerald-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40"
            : "border-emerald-500/30 bg-gradient-to-br from-white via-emerald-50/60 to-white"
        )}
        role="status"
        aria-live="polite"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-xl flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30"
            />
            <div className="relative rounded-full bg-emerald-500 p-4 text-black">
              <Check size={30} strokeWidth={3} />
            </div>
          </motion.div>

          <h3
            className={cx(
              "mt-6 text-2xl font-bold tracking-tight md:text-3xl",
              dark ? "text-white" : "text-zinc-900"
            )}
          >
            Message sent. Thanks, {form.name.trim().split(/\s+/)[0]}.
          </h3>

          <p className={cx("mt-3 text-sm md:text-base", dark ? "text-zinc-300" : "text-zinc-700")}>
            It landed in my inbox and I read every enquiry personally. Expect a
            reply within one business day.
            {autoReplySent
              ? " A confirmation is on its way to your email as well."
              : " (The confirmation email didn't send, but your message definitely arrived.)"}
          </p>

          <div className="mt-8 grid w-full gap-3 text-left sm:grid-cols-3">
            {[
              { icon: MessageSquare, title: "I review", body: "Your brief and the context around it." },
              { icon: Send, title: "I reply", body: "Questions, or a proposed approach." },
              { icon: CheckCircle2, title: "We scope", body: "Timeline and cost in writing first." },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className={cx(
                  "rounded-2xl border p-4",
                  dark ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-200 bg-white"
                )}
              >
                <step.icon size={16} className="text-emerald-500" />
                <div className={cx("mt-2 text-sm font-semibold", dark ? "text-white" : "text-zinc-900")}>
                  {step.title}
                </div>
                <div className={cx("mt-1 text-xs", dark ? "text-zinc-400" : "text-zinc-600")}>
                  {step.body}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetForm}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                dark
                  ? "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100"
              )}
            >
              <RefreshCw size={15} /> Send another message
            </button>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              <Mail size={15} /> Email me directly
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  // --------------------------------------------------------------- form view
  return (
    <div ref={formTopRef} className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
      {/* ============================ form card ============================ */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cx(
          "relative overflow-hidden rounded-3xl border p-6 shadow-sm md:p-8",
          dark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-white"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
        />

        {/* header + completion meter */}
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className={cx("text-xl font-bold tracking-tight", dark ? "text-white" : "text-zinc-900")}>
                Tell me about the project
              </h3>
              <p className={cx("mt-1 text-sm", dark ? "text-zinc-400" : "text-zinc-600")}>
                Three required fields. The rest just helps me give you a sharper answer.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={cx("text-[11px] tabular-nums", dark ? "text-zinc-500" : "text-zinc-500")}>
                {completion}%
              </span>
              <div
                className={cx("h-1.5 w-24 overflow-hidden rounded-full", dark ? "bg-zinc-800" : "bg-zinc-200")}
                role="progressbar"
                aria-valuenow={completion}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Form completion"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* server-side error banner */}
        <AnimatePresence>
          {status === "error" && serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              role="alert"
              className={cx(
                "relative mt-5 overflow-hidden rounded-2xl border p-4",
                dark ? "border-rose-500/40 bg-rose-500/10" : "border-rose-300 bg-rose-50"
              )}
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-500" />
                <div>
                  <div className={cx("text-sm font-semibold", dark ? "text-rose-200" : "text-rose-800")}>
                    That didn't send
                  </div>
                  <p className={cx("mt-1 text-sm", dark ? "text-rose-200/80" : "text-rose-700")}>
                    {serverError}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-400"
                    >
                      <RefreshCw size={13} /> Try again
                    </button>
                    <a
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                        "Project enquiry"
                      )}&body=${encodeURIComponent(form.message)}`}
                      className={cx(
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold",
                        dark
                          ? "border-rose-500/40 text-rose-200 hover:bg-rose-500/10"
                          : "border-rose-300 text-rose-700 hover:bg-rose-100"
                      )}
                    >
                      <Mail size={13} /> Email instead
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- identity ---- */}
        <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="contact-name" required>
              Your name
            </FieldLabel>
            <div className="relative">
              <User
                size={15}
                aria-hidden
                className={cx(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
                  dark ? "text-zinc-600" : "text-zinc-400"
                )}
              />
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={setField("name")}
                onBlur={handleBlur("name")}
                placeholder="Jane Mukamuri"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={cx(inputBase, "pl-9", errors.name && errorRing)}
              />
            </div>
            <FieldError id="contact-name-error">{errors.name}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="contact-email" required>
              Email
            </FieldLabel>
            <div className="relative">
              <Mail
                size={15}
                aria-hidden
                className={cx(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
                  dark ? "text-zinc-600" : "text-zinc-400"
                )}
              />
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={setField("email")}
                onBlur={handleBlur("email")}
                placeholder="jane@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={cx(inputBase, "pl-9", errors.email && errorRing)}
              />
            </div>
            <FieldError id="contact-email-error">{errors.email}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="contact-company" hint="optional">
              Company
            </FieldLabel>
            <div className="relative">
              <Building2
                size={15}
                aria-hidden
                className={cx(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
                  dark ? "text-zinc-600" : "text-zinc-400"
                )}
              />
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={setField("company")}
                placeholder="Acme Ltd."
                className={cx(inputBase, "pl-9")}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="contact-phone" hint="optional">
              Phone / WhatsApp
            </FieldLabel>
            <div className="relative">
              <Phone
                size={15}
                aria-hidden
                className={cx(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
                  dark ? "text-zinc-600" : "text-zinc-400"
                )}
              />
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={setField("phone")}
                placeholder="+1 403 000 0000"
                className={cx(inputBase, "pl-9")}
              />
            </div>
          </div>
        </div>

        {/* ---- services ---- */}
        <fieldset className="relative mt-6">
          <legend
            className={cx(
              "mb-2 text-xs font-medium uppercase tracking-wider",
              dark ? "text-zinc-400" : "text-zinc-600"
            )}
          >
            What do you need?{" "}
            <span className={dark ? "text-zinc-600" : "text-zinc-400"}>
              pick any that apply
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                icon={opt.icon}
                active={form.projectType.includes(opt.value)}
                onClick={() => toggleService(opt.value)}
              >
                {opt.value}
              </Chip>
            ))}
          </div>
        </fieldset>

        {/* ---- budget + timeline ---- */}
        <div className="relative mt-6 grid gap-6 sm:grid-cols-2">
          <fieldset>
            <legend
              className={cx(
                "mb-2 text-xs font-medium uppercase tracking-wider",
                dark ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              Budget range
            </legend>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map((b) => (
                <Chip
                  key={b}
                  active={form.budget === b}
                  onClick={() => pickOne("budget")(b)}
                >
                  {b}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend
              className={cx(
                "mb-2 text-xs font-medium uppercase tracking-wider",
                dark ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              Timeline
            </legend>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((t) => (
                <Chip
                  key={t}
                  active={form.timeline === t}
                  onClick={() => pickOne("timeline")(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>

        {/* ---- message ---- */}
        <div className="relative mt-6">
          <FieldLabel
            htmlFor="contact-message"
            required
            hint={`${messageLength} / ${MESSAGE_MAX}`}
          >
            Project brief
          </FieldLabel>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={form.message}
            onChange={setField("message")}
            onBlur={handleBlur("message")}
            maxLength={MESSAGE_MAX}
            placeholder="What are you building, what's broken, or what outcome are you after? Links to an existing site, a repo, or a deadline all help."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={cx(
              "contact-message-hint",
              errors.message ? "contact-message-error" : ""
            )}
            className={cx(inputBase, "resize-y leading-relaxed", errors.message && errorRing)}
          />
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <p
              id="contact-message-hint"
              className={cx("text-[11px]", dark ? "text-zinc-500" : "text-zinc-500")}
            >
              {messageLength >= MESSAGE_MIN
                ? "That's enough to work with."
                : `At least ${MESSAGE_MIN} characters, please.`}
            </p>
            <div
              className={cx("h-1 w-20 overflow-hidden rounded-full", dark ? "bg-zinc-800" : "bg-zinc-200")}
              aria-hidden
            >
              <motion.div
                className={cx(
                  "h-full rounded-full",
                  messageLength >= MESSAGE_MIN ? "bg-emerald-500" : "bg-amber-500"
                )}
                animate={{
                  width: `${Math.min(100, (messageLength / MESSAGE_MIN) * 100)}%`,
                }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
          <FieldError id="contact-message-error">{errors.message}</FieldError>
        </div>

        {/* ---- how did you find me ---- */}
        <div className="relative mt-6">
          <FieldLabel htmlFor="contact-heard" hint="optional">
            How did you find me?
          </FieldLabel>
          <select
            id="contact-heard"
            name="heardFrom"
            value={form.heardFrom}
            onChange={setField("heardFrom")}
            className={cx(inputBase, "appearance-none")}
          >
            <option value="">Prefer not to say</option>
            {HEARD_FROM_OPTIONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* honeypot — hidden from humans, irresistible to bots */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="contact-gotcha">Leave this field empty</label>
          <input
            id="contact-gotcha"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form._gotcha}
            onChange={setField("_gotcha")}
          />
        </div>

        {/* ---- submit ---- */}
        <div className="relative mt-8 flex flex-wrap items-center gap-4">
          <motion.button
            type="submit"
            disabled={sending}
            whileHover={sending ? undefined : { scale: 1.02 }}
            whileTap={sending ? undefined : { scale: 0.98 }}
            className={cx(
              "inline-flex min-w-[190px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              dark ? "focus-visible:ring-offset-zinc-900" : "focus-visible:ring-offset-white",
              sending
                ? "cursor-wait bg-emerald-500/60 text-black/70"
                : "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
            )}
          >
            {sending ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send size={16} /> Send message <ArrowRight size={16} />
              </>
            )}
          </motion.button>

          <p className={cx("flex items-center gap-1.5 text-xs", dark ? "text-zinc-500" : "text-zinc-500")}>
            <Lock size={12} /> Goes straight to my inbox. No list, no sharing.
          </p>
        </div>

        {/* status region for screen readers */}
        <p className="sr-only" aria-live="polite">
          {sending ? "Sending your message" : ""}
        </p>
      </form>

      {/* ============================ info rail ============================ */}
      <div className="space-y-4">
        {/* availability */}
        <div
          className={cx(
            "relative overflow-hidden rounded-3xl border p-6",
            dark
              ? "border-emerald-500/25 bg-gradient-to-br from-zinc-900 to-emerald-950/30"
              : "border-emerald-500/25 bg-gradient-to-br from-white to-emerald-50"
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/15 blur-2xl"
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </div>

            <div className={cx("mt-4 text-sm", dark ? "text-zinc-300" : "text-zinc-700")}>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-500" />
                <span>
                  Replies within <strong>1 business day</strong>
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <MapPin size={14} className="text-emerald-500" />
                <span>{CONTACT.location}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Globe2 size={14} className="text-emerald-500" />
                <span>
                  My local time{" "}
                  <strong className="tabular-nums">{localTime || "—"}</strong> (MT)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* direct email */}
        <div
          className={cx(
            "rounded-3xl border p-6",
            dark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-white"
          )}
        >
          <div className={cx("text-xs uppercase tracking-widest", dark ? "text-zinc-400" : "text-zinc-600")}>
            Prefer plain email?
          </div>
          <div className={cx("mt-2 break-all text-sm font-semibold", dark ? "text-white" : "text-zinc-900")}>
            {CONTACT.email}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                dark
                  ? "border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
              )}
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" /> Copied
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy address
                </>
              )}
            </button>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Project enquiry")}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
            >
              <Mail size={13} /> Open mail app
            </a>
          </div>
          <div className="mt-4 flex gap-2">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors",
                dark
                  ? "border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
              )}
            >
              <Github size={13} /> GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors",
                dark
                  ? "border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
              )}
            >
              <Linkedin size={13} /> LinkedIn
            </a>
          </div>
        </div>

        {/* what happens next */}
        <div
          className={cx(
            "rounded-3xl border p-6",
            dark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-white"
          )}
        >
          <div className={cx("text-xs uppercase tracking-widest", dark ? "text-zinc-400" : "text-zinc-600")}>
            What happens next
          </div>
          <ol className="mt-3 space-y-3">
            {[
              { icon: MessageSquare, text: "I read your brief and reply personally — no sales funnel." },
              { icon: Sparkles, text: "You get honest feedback on scope, approach, and what I'd change." },
              { icon: ShieldCheck, text: "Cost and timeline go in writing before any work starts." },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={cx(
                    "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    dark ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-50 text-emerald-700"
                  )}
                >
                  {i + 1}
                </span>
                <span className={cx("text-sm", dark ? "text-zinc-300" : "text-zinc-700")}>
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* trust strip */}
        <div
          className={cx(
            "rounded-3xl border p-5",
            dark ? "border-zinc-800 bg-zinc-900/40" : "border-zinc-200 bg-white"
          )}
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Cloud, label: "5+ yrs at AWS" },
              { icon: ShieldCheck, label: "Security-first" },
              { icon: Terminal, label: "Ships production" },
              { icon: Repeat, label: "Support after launch" },
            ].map((t) => (
              <div
                key={t.label}
                className={cx("flex items-center gap-2 text-xs", dark ? "text-zinc-400" : "text-zinc-600")}
              >
                <t.icon size={14} className="shrink-0 text-emerald-500" />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
