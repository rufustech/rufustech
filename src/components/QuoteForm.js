import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ClipboardList,
  Loader2,
  Lock,
  Mail,
  Pencil,
  RefreshCw,
  Save,
  Send,
  Sparkles,
} from "lucide-react";

import { cx, useTheme } from "./ThemeContext";
import { CONTACT, QUOTE_ENDPOINT } from "../constants/api";
import {
  QUOTE_STEPS,
  emptyQuoteAnswers,
  validateQuoteStep,
} from "../constants/quoteSchema.mjs";

const DRAFT_KEY = "rufarodev:quote-draft:v1";

/* ------------------------------------------------------------------ helpers */

/** Has the user put anything in this field? */
function hasValue(field, value) {
  if (field.type === "multi") return Array.isArray(value) && value.length > 0;
  if (field.type === "checkbox") return value === true;
  return typeof value === "string" && value.trim().length > 0;
}

/** Human-readable answer for the review screen. */
function displayValue(field, value) {
  if (field.type === "multi") return (value || []).join(", ");
  if (field.type === "checkbox") return value === true ? "Yes" : "";
  return typeof value === "string" ? value.trim() : "";
}

/* --------------------------------------------------------------- subparts */

function Legend({ children, required, hint }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <>
      <span
        className={cx(
          "block text-xs font-medium uppercase tracking-wider",
          dark ? "text-zinc-400" : "text-zinc-600"
        )}
      >
        {children}
        {required && (
          <span className="ml-1 text-emerald-500" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </span>
      {hint && (
        <span
          className={cx("mt-0.5 block text-[11px]", dark ? "text-zinc-500" : "text-zinc-500")}
        >
          {hint}
        </span>
      )}
    </>
  );
}

function ErrorText({ id, children }) {
  return (
    <AnimatePresence initial={false}>
      {children ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 flex items-start gap-1.5 text-xs text-rose-500"
        >
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function OptionChip({ active, onClick, children, multi }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-xs font-medium transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        dark ? "focus-visible:ring-offset-zinc-900" : "focus-visible:ring-offset-white",
        active
          ? "border-emerald-500 bg-emerald-500 text-black shadow-sm shadow-emerald-500/30"
          : dark
          ? "border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700 hover:text-white"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
      )}
    >
      <span
        aria-hidden
        className={cx(
          "grid h-3.5 w-3.5 shrink-0 place-items-center border",
          multi ? "rounded-[4px]" : "rounded-full",
          active
            ? "border-black/40 bg-black/15"
            : dark
            ? "border-zinc-600"
            : "border-zinc-400"
        )}
      >
        {active && <Check size={10} strokeWidth={4} />}
      </span>
      {children}
    </button>
  );
}

/** Renders a single schema field. */
function Field({ field, value, error, onChange }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const id = `quote-${field.name}`;
  const errorId = `${id}-error`;
  const hintId = field.hint ? `${id}-hint` : undefined;

  const inputBase = cx(
    "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors",
    "focus:ring-2 focus:ring-emerald-500/40",
    dark
      ? "border-zinc-800 bg-zinc-950/70 text-white placeholder:text-zinc-600 focus:border-emerald-500/60"
      : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500/60",
    error && (dark ? "border-rose-500/70" : "border-rose-400")
  );

  const describedBy = [hintId, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  // ---- grouped choice fields get a real fieldset/legend
  if (field.type === "multi" || field.type === "radio") {
    const multi = field.type === "multi";
    const selected = multi ? value || [] : value;

    const toggle = (option) => {
      if (multi) {
        const list = Array.isArray(value) ? value : [];
        onChange(
          list.includes(option) ? list.filter((v) => v !== option) : [...list, option]
        );
      } else {
        onChange(value === option ? "" : option);
      }
    };

    return (
      <fieldset
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="min-w-0"
      >
        <legend className="mb-2">
          <Legend required={field.required} hint={field.hint}>
            {field.label}
          </Legend>
        </legend>
        <div className="flex flex-wrap gap-2">
          {field.options.map((option) => (
            <OptionChip
              key={option}
              multi={multi}
              active={multi ? selected.includes(option) : selected === option}
              onClick={() => toggle(option)}
            >
              {option}
            </OptionChip>
          ))}
        </div>
        <ErrorText id={errorId}>{error}</ErrorText>
      </fieldset>
    );
  }

  // ---- single boolean
  if (field.type === "checkbox") {
    return (
      <div className="min-w-0">
        <label
          htmlFor={id}
          className={cx(
            "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors",
            value
              ? dark
                ? "border-emerald-500/50 bg-emerald-500/10 text-white"
                : "border-emerald-500/50 bg-emerald-50 text-zinc-900"
              : dark
              ? "border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700"
              : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400",
            error && (dark ? "border-rose-500/70" : "border-rose-400")
          )}
        >
          <input
            id={id}
            name={field.name}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500"
          />
          <span>
            {field.label}
            {field.required && (
              <span className="ml-1 text-emerald-500" aria-hidden="true">
                *
              </span>
            )}
          </span>
        </label>
        <ErrorText id={errorId}>{error}</ErrorText>
      </div>
    );
  }

  // ---- everything else is a labelled control
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block">
        <Legend required={field.required} hint={field.hint}>
          {field.label}
        </Legend>
      </label>

      {field.type === "textarea" ? (
        <>
          <textarea
            id={id}
            name={field.name}
            rows={field.name === "summary" ? 6 : 4}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cx(inputBase, "resize-y leading-relaxed")}
          />
          {field.minLength && (
            <div
              className={cx(
                "mt-1 text-[11px]",
                (value || "").trim().length >= field.minLength
                  ? "text-emerald-500"
                  : dark
                  ? "text-zinc-500"
                  : "text-zinc-500"
              )}
            >
              {(value || "").trim().length}/{field.minLength} characters minimum
            </div>
          )}
        </>
      ) : field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cx(inputBase, "appearance-none")}
        >
          <option value="">Select…</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {field.type === "date" && (
            <Calendar
              size={15}
              aria-hidden
              className={cx(
                "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
                dark ? "text-zinc-600" : "text-zinc-400"
              )}
            />
          )}
          <input
            id={id}
            name={field.name}
            type={field.type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            autoComplete={
              field.name === "name"
                ? "name"
                : field.name === "email"
                ? "email"
                : field.name === "phone"
                ? "tel"
                : field.name === "company"
                ? "organization"
                : field.name === "role"
                ? "organization-title"
                : "off"
            }
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={inputBase}
          />
        </div>
      )}

      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

/* ------------------------------------------------------------------- main */

export default function QuoteForm() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [answers, setAnswers] = useState(emptyQuoteAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");
  const [autoReplySent, setAutoReplySent] = useState(true);
  const [draftRestored, setDraftRestored] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState(null);
  // Honeypot: real users never see this, so any value means a bot.
  const [gotcha, setGotcha] = useState("");

  const startedAt = useRef(Date.now());
  const topRef = useRef(null);
  const headingRef = useRef(null);
  const isFirstRender = useRef(true);

  const step = QUOTE_STEPS[stepIndex];
  const totalSteps = QUOTE_STEPS.length;
  const isReview = Boolean(step.review);
  const sending = status === "sending";

  /* ---- restore a draft so a long questionnaire survives a refresh ---- */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.answers === "object") {
        setAnswers({ ...emptyQuoteAnswers(), ...parsed.answers });
        if (typeof parsed.stepIndex === "number") {
          setStepIndex(Math.min(Math.max(parsed.stepIndex, 0), totalSteps - 1));
        }
        setDraftRestored(true);
      }
    } catch {
      // A corrupt draft shouldn't break the form.
      window.localStorage.removeItem(DRAFT_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- persist the draft on every change (skip the initial mount) ---- */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (status === "sent") return;
    try {
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ answers, stepIndex, savedAt: Date.now() })
      );
      setDraftSavedAt(Date.now());
    } catch {
      // Storage full or blocked (private mode) — not worth interrupting for.
    }
  }, [answers, stepIndex, status]);

  const setField = useCallback(
    (name) => (value) => {
      setAnswers((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const next = { ...prev };
        delete next[name];
        return next;
      });
    },
    []
  );

  /** Scroll the form into view and move focus to the new step heading. */
  const focusStep = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Let the scroll settle before shifting focus, otherwise the browser jumps.
    window.setTimeout(() => headingRef.current?.focus(), 350);
  }, []);

  const goNext = () => {
    const stepErrors = validateQuoteStep(step.id, answers);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      const first = step.fields.find((f) => stepErrors[f.name]);
      if (first) document.getElementById(`quote-${first.name}`)?.focus();
      return;
    }
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    focusStep();
  };

  const goPrev = () => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
    focusStep();
  };

  const jumpTo = (index) => {
    setErrors({});
    setStepIndex(index);
    focusStep();
  };

  const clearDraft = () => {
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  const startOver = () => {
    clearDraft();
    setAnswers(emptyQuoteAnswers());
    setStepIndex(0);
    setErrors({});
    setStatus("idle");
    setServerError("");
    startedAt.current = Date.now();
    setDraftRestored(false);
    focusStep();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    // Validate every step, not just the review screen.
    const allErrors = QUOTE_STEPS.reduce(
      (acc, s) => Object.assign(acc, validateQuoteStep(s.id, answers)),
      {}
    );
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      const badName = Object.keys(allErrors)[0];
      const badStep = QUOTE_STEPS.findIndex((s) =>
        s.fields.some((f) => f.name === badName)
      );
      if (badStep >= 0) {
        setStepIndex(badStep);
        focusStep();
      }
      setServerError(
        "A few answers still need attention — I've jumped you back to the first one."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(QUOTE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          _gotcha: gotcha,
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
        if (payload?.firstStep) {
          const idx = QUOTE_STEPS.findIndex((s) => s.id === payload.firstStep);
          if (idx >= 0) {
            setStepIndex(idx);
            focusStep();
          }
        }
        setServerError(
          payload?.error ||
            "That didn't go through. Please try again, or email me directly."
        );
        setStatus("error");
        return;
      }

      setAutoReplySent(payload.autoReplySent !== false);
      clearDraft();
      setStatus("sent");
      focusStep();
    } catch {
      setServerError(
        "I couldn't reach the server — it may be offline. Your answers are saved in this browser, so you can try again shortly."
      );
      setStatus("error");
    }
  };

  /* ---- progress: share of required fields answered across the whole form ---- */
  const progress = useMemo(() => {
    const required = [];
    for (const s of QUOTE_STEPS) {
      for (const f of s.fields) if (f.required) required.push(f);
    }
    const done = required.filter((f) => hasValue(f, answers[f.name])).length;
    return Math.round((done / required.length) * 100);
  }, [answers]);

  /* ---- answered fields grouped by step, for the review screen ---- */
  const reviewGroups = useMemo(
    () =>
      QUOTE_STEPS.filter((s) => !s.review)
        .map((s, index) => ({
          id: s.id,
          title: s.title,
          index,
          items: s.fields
            .filter((f) => hasValue(f, answers[f.name]))
            .map((f) => ({ label: f.label, value: displayValue(f, answers[f.name]) })),
        }))
        .filter((group) => group.items.length > 0),
    [answers]
  );

  /* =================================================== success ============ */
  if (status === "sent") {
    return (
      <div
        ref={topRef}
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
            ref={headingRef}
            tabIndex={-1}
            className={cx(
              "mt-6 text-2xl font-bold tracking-tight outline-none md:text-3xl",
              dark ? "text-white" : "text-zinc-900"
            )}
          >
            Got it — thanks, {(answers.name || "").trim().split(/\s+/)[0]}.
          </h3>

          <p className={cx("mt-3 text-sm md:text-base", dark ? "text-zinc-300" : "text-zinc-700")}>
            Your questionnaire is in my inbox. I'll read it properly and come back
            with a written proposal — scope, approach, milestones and price —
            within two business days.
            {autoReplySent
              ? " A copy of what happens next is on its way to your email."
              : " (The confirmation email didn't send, but your answers definitely arrived.)"}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              <Mail size={15} /> Email me something extra
            </a>
            <button
              type="button"
              onClick={startOver}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                dark
                  ? "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100"
              )}
            >
              <RefreshCw size={15} /> Submit another project
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =================================================== form =============== */
  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* ---------------- step rail ---------------- */}
      <div
        className={cx(
          "rounded-t-3xl border border-b-0 p-5 md:p-6",
          dark ? "border-zinc-800 bg-zinc-900/70" : "border-zinc-200 bg-white"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-emerald-500" />
            <span
              className={cx(
                "text-xs font-medium uppercase tracking-widest",
                dark ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              Step {stepIndex + 1} of {totalSteps}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {draftSavedAt && (
              <span
                className={cx(
                  "hidden items-center gap-1 text-[11px] sm:inline-flex",
                  dark ? "text-zinc-500" : "text-zinc-500"
                )}
              >
                <Save size={11} /> Draft saved
              </span>
            )}
            <span className={cx("text-[11px] tabular-nums", dark ? "text-zinc-500" : "text-zinc-500")}>
              {progress}% of essentials
            </span>
          </div>
        </div>

        {/* clickable step dots */}
        <ol className="mt-4 flex flex-wrap gap-1.5">
          {QUOTE_STEPS.map((s, i) => {
            const isCurrent = i === stepIndex;
            const isDone = i < stepIndex;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cx(
                    "group flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                    isCurrent
                      ? "border-emerald-500 bg-emerald-500 text-black"
                      : isDone
                      ? dark
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "border-emerald-500/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : dark
                      ? "border-zinc-800 bg-zinc-950/60 text-zinc-500 hover:text-zinc-300"
                      : "border-zinc-300 bg-white text-zinc-500 hover:text-zinc-700"
                  )}
                >
                  {isDone ? <Check size={11} strokeWidth={3} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          className={cx("mt-4 h-1.5 overflow-hidden rounded-full", dark ? "bg-zinc-800" : "bg-zinc-200")}
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label="Questionnaire progress"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      {/* ---------------- the form ---------------- */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cx(
          "relative rounded-b-3xl border p-5 md:p-8",
          dark ? "border-zinc-800 bg-zinc-900/40" : "border-zinc-200 bg-zinc-50/60"
        )}
      >
        {/* restored-draft notice */}
        <AnimatePresence>
          {draftRestored && status !== "sent" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cx(
                "mb-5 overflow-hidden rounded-xl border p-3 text-xs",
                dark
                  ? "border-sky-500/30 bg-sky-500/10 text-sky-200"
                  : "border-sky-300 bg-sky-50 text-sky-800"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex items-start gap-2">
                  <Save size={13} className="mt-0.5 shrink-0" />
                  Picked up where you left off — your previous answers were saved
                  in this browser.
                </span>
                <button
                  type="button"
                  onClick={startOver}
                  className="shrink-0 font-semibold underline underline-offset-2"
                >
                  Start fresh
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* error banner */}
        <AnimatePresence>
          {status === "error" && serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              role="alert"
              className={cx(
                "mb-5 overflow-hidden rounded-2xl border p-4",
                dark ? "border-rose-500/40 bg-rose-500/10" : "border-rose-300 bg-rose-50"
              )}
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-500" />
                <div>
                  <div className={cx("text-sm font-semibold", dark ? "text-rose-200" : "text-rose-800")}>
                    Not sent
                  </div>
                  <p className={cx("mt-1 text-sm", dark ? "text-rose-200/80" : "text-rose-700")}>
                    {serverError}
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Project enquiry")}`}
                    className={cx(
                      "mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold",
                      dark
                        ? "border-rose-500/40 text-rose-200 hover:bg-rose-500/10"
                        : "border-rose-300 text-rose-700 hover:bg-rose-100"
                    )}
                  >
                    <Mail size={13} /> Email me instead
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* step header */}
        <h3
          ref={headingRef}
          tabIndex={-1}
          className={cx(
            "text-xl font-bold tracking-tight outline-none md:text-2xl",
            dark ? "text-white" : "text-zinc-900"
          )}
        >
          {step.title}
        </h3>
        {step.blurb && (
          <p className={cx("mt-1.5 text-sm", dark ? "text-zinc-400" : "text-zinc-600")}>
            {step.blurb}
          </p>
        )}

        {/* announce step changes to assistive tech */}
        <p className="sr-only" aria-live="polite">
          Step {stepIndex + 1} of {totalSteps}: {step.title}
        </p>

        {/* review summary */}
        {isReview && (
          <div className="mt-6 space-y-3">
            {reviewGroups.length === 0 ? (
              <p className={cx("text-sm", dark ? "text-zinc-400" : "text-zinc-600")}>
                Nothing filled in yet — step back through and add some detail.
              </p>
            ) : (
              reviewGroups.map((group) => (
                <div
                  key={group.id}
                  className={cx(
                    "rounded-2xl border p-4",
                    dark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4
                      className={cx(
                        "text-xs font-semibold uppercase tracking-widest",
                        dark ? "text-emerald-400" : "text-emerald-700"
                      )}
                    >
                      {group.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => jumpTo(group.index)}
                      className={cx(
                        "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-medium transition-colors",
                        dark
                          ? "border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                          : "border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      )}
                    >
                      <Pencil size={11} /> Edit
                    </button>
                  </div>
                  <dl className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <div key={item.label} className="grid gap-0.5 sm:grid-cols-[220px_1fr] sm:gap-3">
                        <dt
                          className={cx(
                            "text-[11px] uppercase tracking-wider",
                            dark ? "text-zinc-500" : "text-zinc-500"
                          )}
                        >
                          {item.label}
                        </dt>
                        <dd
                          className={cx(
                            "whitespace-pre-wrap text-sm",
                            dark ? "text-zinc-200" : "text-zinc-800"
                          )}
                        >
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))
            )}
          </div>
        )}

        {/* fields for this step */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            {step.fields.map((field) => (
              <div key={field.name} className={field.full ? "sm:col-span-2" : undefined}>
                <Field
                  field={field}
                  value={answers[field.name]}
                  error={errors[field.name]}
                  onChange={setField(field.name)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* honeypot */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="quote-gotcha">Leave empty</label>
          <input
            id="quote-gotcha"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
          />
        </div>

        {/* ---------------- navigation ---------------- */}
        <div
          className={cx(
            "mt-8 flex flex-wrap items-center gap-3 border-t pt-6",
            dark ? "border-zinc-800" : "border-zinc-200"
          )}
        >
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={goPrev}
              disabled={sending}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50",
                dark
                  ? "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100"
              )}
            >
              <ArrowLeft size={16} /> Previous
            </button>
          )}

          {isReview ? (
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? undefined : { scale: 1.02 }}
              whileTap={sending ? undefined : { scale: 0.98 }}
              className={cx(
                "inline-flex min-w-[210px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors",
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
                  <Send size={16} /> Send my questionnaire
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={goNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-emerald-400"
            >
              Next <ArrowRight size={16} />
            </motion.button>
          )}

          {!isReview && (
            <button
              type="button"
              onClick={() => jumpTo(totalSteps - 1)}
              className={cx(
                "text-xs font-medium underline-offset-4 hover:underline",
                dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              Skip to review
            </button>
          )}

          <p
            className={cx(
              "ml-auto flex items-center gap-1.5 text-xs",
              dark ? "text-zinc-500" : "text-zinc-500"
            )}
          >
            <Lock size={12} /> Goes only to me. Nothing shared or sold.
          </p>
        </div>
      </form>

      <p className={cx("mt-3 flex items-start gap-1.5 text-xs", dark ? "text-zinc-500" : "text-zinc-500")}>
        <Sparkles size={12} className="mt-0.5 shrink-0 text-emerald-500" />
        Only a handful of fields are required — skip anything you're unsure about
        and we'll cover it in the reply. Answers save automatically in this
        browser as you go.
      </p>
    </div>
  );
}
