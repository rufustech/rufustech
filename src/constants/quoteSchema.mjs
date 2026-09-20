/**
 * Client intake questionnaire — single source of truth.
 *
 * Shared deliberately between the React form (src/components/QuoteForm.js) and
 * the mail server (server/index.mjs, server/emailTemplates.mjs) so field names,
 * labels and option lists can never drift apart. This is an ES module; the
 * server runs as ESM (.mjs) specifically so it can import this file directly
 * instead of keeping a second copy of the questionnaire.
 *
 * The .mjs extension is deliberate: package.json has no "type": "module" (the
 * CRA/Tailwind/PostCSS configs are CommonJS), so a plain .js file with ESM
 * syntax makes Node guess and emit a MODULE_TYPELESS_PACKAGE_JSON warning.
 *
 * Field types the renderer understands:
 *   text | email | tel | url | date | textarea | select | radio | multi | checkbox
 *
 * Field options:
 *   name        payload key (must be unique across ALL steps)
 *   label       question shown to the user and used as the email row label
 *   type        one of the above
 *   required    blocks advancing past the step
 *   options     for select / radio / multi
 *   placeholder input placeholder
 *   hint        small helper text under the label
 *   full        span the full grid width
 *   maxLength   hard cap (also enforced server-side)
 *   minLength   minimum for required textareas
 */

export const QUOTE_STEPS = [
  // ------------------------------------------------------------------ 1
  {
    id: "contact",
    title: "About you",
    blurb: "So I know who I'm replying to and how you'd rather be reached.",
    fields: [
      {
        name: "name",
        label: "Your name",
        type: "text",
        required: true,
        placeholder: "Jane Mukamuri",
        maxLength: 100,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "jane@company.com",
        maxLength: 254,
      },
      {
        name: "company",
        label: "Company or organisation",
        type: "text",
        placeholder: "Acme Ltd.",
        maxLength: 120,
      },
      {
        name: "role",
        label: "Your role",
        type: "text",
        placeholder: "Operations Director",
        maxLength: 100,
      },
      {
        name: "phone",
        label: "Phone or WhatsApp",
        type: "tel",
        placeholder: "+1 403 000 0000",
        maxLength: 40,
      },
      {
        name: "location",
        label: "Where are you based?",
        type: "text",
        placeholder: "Calgary, Canada",
        hint: "Helps me work out timezone overlap",
        maxLength: 120,
      },
      {
        name: "preferredContact",
        label: "Preferred way to talk",
        type: "radio",
        options: ["Email", "Phone call", "Video call", "WhatsApp"],
        full: true,
      },
      {
        name: "bestTime",
        label: "Best time to reach you",
        type: "select",
        options: ["Morning", "Afternoon", "Evening", "Any time"],
      },
    ],
  },

  // ------------------------------------------------------------------ 2
  {
    id: "project",
    title: "The project",
    blurb: "What you want built, in your own words.",
    fields: [
      {
        name: "projectName",
        label: "Project name or working title",
        type: "text",
        placeholder: "Internal booking portal",
        maxLength: 120,
      },
      {
        name: "engagementReason",
        label: "What kind of work is this?",
        type: "multi",
        required: true,
        hint: "Pick everything that applies",
        options: [
          "Brand-new build",
          "Redesign of something existing",
          "Add features to an existing product",
          "Fix or rescue a broken project",
          "Integration between systems",
          "Migration to new hosting or stack",
          "Ongoing maintenance and support",
        ],
        full: true,
      },
      {
        name: "productType",
        label: "What are we building?",
        type: "multi",
        required: true,
        options: [
          "Marketing website",
          "Web application",
          "SaaS platform",
          "E-commerce store",
          "Internal business tool",
          "Customer or client portal",
          "API or backend only",
          "Mobile-friendly PWA",
          "Not sure yet",
        ],
        full: true,
      },
      {
        name: "summary",
        label: "Describe the project",
        type: "textarea",
        required: true,
        minLength: 30,
        maxLength: 4000,
        placeholder:
          "What should it do, who is it for, and what problem does it solve? Plain language is perfect — no need for technical detail.",
        full: true,
      },
      {
        name: "existingUrl",
        label: "Existing site or app URL",
        type: "url",
        placeholder: "https://example.com",
        hint: "Leave blank if starting from nothing",
        maxLength: 300,
      },
      {
        name: "hasRepo",
        label: "Is there existing code?",
        type: "radio",
        options: ["Yes, in a repo", "Yes, but no repo access", "No", "Not sure"],
      },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    id: "goals",
    title: "Goals & audience",
    blurb: "What success looks like, and who this is for.",
    fields: [
      {
        name: "primaryGoals",
        label: "What should this achieve?",
        type: "multi",
        required: true,
        options: [
          "Generate leads or enquiries",
          "Sell products or services online",
          "Replace a manual or paper process",
          "Scale an existing product",
          "Improve speed and reliability",
          "Launch an MVP to test an idea",
          "Meet a compliance or audit requirement",
          "Reduce operating cost",
        ],
        full: true,
      },
      {
        name: "audience",
        label: "Who will use it?",
        type: "multi",
        options: [
          "General public",
          "Other businesses (B2B)",
          "Our own staff",
          "Members or subscribers",
          "Government or institutions",
          "A mix",
        ],
        full: true,
      },
      {
        name: "expectedUsers",
        label: "Expected users in the first year",
        type: "select",
        options: [
          "Under 100",
          "100 – 1,000",
          "1,000 – 10,000",
          "10,000 – 100,000",
          "Over 100,000",
          "No idea yet",
        ],
      },
      {
        name: "successMeasure",
        label: "How will you measure success?",
        type: "textarea",
        maxLength: 1500,
        placeholder:
          "e.g. 20 qualified enquiries a month, staff save a day a week, checkout completes under 3 seconds.",
        full: true,
      },
      {
        name: "references",
        label: "Sites or products you admire",
        type: "textarea",
        maxLength: 1500,
        placeholder:
          "Links plus a note on what you like about each — layout, tone, a specific feature. Competitors are useful too.",
        full: true,
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    id: "features",
    title: "Features & integrations",
    blurb: "Tick what you think you need. Guessing is fine — we refine it later.",
    fields: [
      {
        name: "features",
        label: "Features you expect to need",
        type: "multi",
        options: [
          "User accounts and login",
          "Roles and permissions",
          "Admin dashboard",
          "Payments or subscriptions",
          "File and document uploads",
          "Search and filtering",
          "Email notifications",
          "SMS or push notifications",
          "In-app messaging or chat",
          "Booking, scheduling or calendar",
          "Reporting and analytics",
          "Data import and export",
          "Multiple languages",
          "Multi-tenant (separate client accounts)",
          "Maps or location features",
          "AI or LLM features",
          "PDF or document generation",
          "Audit log and activity history",
          "Offline or low-bandwidth support",
        ],
        full: true,
      },
      {
        name: "integrations",
        label: "Systems it must connect to",
        type: "multi",
        options: [
          "Stripe",
          "PayPal",
          "QuickBooks or Xero",
          "Salesforce or HubSpot",
          "Google Workspace",
          "Microsoft 365",
          "Twilio (SMS)",
          "Transactional email (SES, SendGrid)",
          "Shopify",
          "An ERP system",
          "A bank or government API",
          "A custom internal API",
          "Nothing yet",
          "Not sure",
        ],
        full: true,
      },
      {
        name: "mustHaves",
        label: "Must-haves for launch day",
        type: "textarea",
        maxLength: 2000,
        placeholder:
          "The things that make this worth doing. If one of these is missing, launch doesn't happen.",
        full: true,
      },
      {
        name: "outOfScope",
        label: "Explicitly not needed",
        type: "textarea",
        maxLength: 2000,
        placeholder:
          "Anything you want to rule out now, to keep cost and timeline down.",
        full: true,
      },
    ],
  },

  // ------------------------------------------------------------------ 5
  {
    id: "design",
    title: "Design & content",
    blurb: "How much of the look and the words already exist.",
    fields: [
      {
        name: "designStatus",
        label: "Where is the design?",
        type: "radio",
        required: true,
        options: [
          "Finished designs ready to build",
          "Brand guidelines but no designs",
          "Logo only",
          "Nothing yet — design it for me",
          "Match the style of an existing site",
        ],
        full: true,
      },
      {
        name: "brandAssets",
        label: "Brand assets you have",
        type: "radio",
        options: [
          "Logo and full brand kit",
          "Logo only",
          "Nothing",
          "Need a logo designed",
        ],
        full: true,
      },
      {
        name: "contentOwner",
        label: "Who writes the copy and supplies images?",
        type: "radio",
        options: [
          "I'll provide everything",
          "I'll draft it, you polish it",
          "Write it for me",
          "A mix, depending on the page",
        ],
        full: true,
      },
      {
        name: "accessibility",
        label: "Accessibility expectations",
        type: "select",
        options: [
          "WCAG 2.1 AA target",
          "Basic good practice is fine",
          "Legally required for us",
          "Not sure",
        ],
      },
      {
        name: "seoNeeded",
        label: "Do you need SEO work?",
        type: "radio",
        options: ["Yes, from the start", "Later, after launch", "No", "Not sure"],
      },
      {
        name: "languages",
        label: "Languages needed",
        type: "text",
        placeholder: "English only, or English + French…",
        maxLength: 200,
      },
    ],
  },

  // ------------------------------------------------------------------ 6
  {
    id: "technical",
    title: "Technical & compliance",
    blurb:
      "Skip anything you don't know — answering \"not sure\" is genuinely useful.",
    fields: [
      {
        name: "existingStack",
        label: "Existing tech stack, if any",
        type: "text",
        placeholder: "WordPress, Laravel, an Access database…",
        maxLength: 300,
      },
      {
        name: "hostingPreference",
        label: "Hosting preference",
        type: "select",
        options: [
          "AWS",
          "Vercel or Netlify",
          "Render",
          "Keep our current host",
          "No preference",
          "Need a recommendation",
        ],
      },
      {
        name: "domainStatus",
        label: "Domain name",
        type: "radio",
        options: [
          "We already own it",
          "Need to buy one",
          "Need to transfer it",
          "Need advice",
        ],
        full: true,
      },
      {
        name: "emailStatus",
        label: "Business email",
        type: "radio",
        options: [
          "Working fine",
          "Needs setting up",
          "Lands in spam / has problems",
          "Not sure",
        ],
        full: true,
      },
      {
        name: "dataSensitivity",
        label: "Most sensitive data it will hold",
        type: "select",
        required: true,
        options: [
          "Public information only",
          "Business confidential",
          "Personal data (names, addresses)",
          "Payment or card data",
          "Health or medical data",
          "Not sure",
        ],
      },
      {
        name: "compliance",
        label: "Compliance requirements",
        type: "multi",
        options: [
          "None that I know of",
          "PIPEDA (Canada)",
          "GDPR (EU / UK)",
          "HIPAA",
          "PCI-DSS",
          "SOC 2",
          "Other or not sure",
        ],
        full: true,
      },
      {
        name: "maintenanceOwner",
        label: "Who maintains it after launch?",
        type: "radio",
        options: [
          "You — on a retainer",
          "Our own team takes over",
          "You, ad-hoc when needed",
          "Undecided",
        ],
        full: true,
      },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    id: "commercials",
    title: "Budget & timeline",
    blurb:
      "A range is enough. It tells me what's realistic rather than what to charge.",
    fields: [
      {
        name: "budget",
        label: "Budget range",
        type: "radio",
        required: true,
        options: [
          "Under $2,000",
          "$2,000 – $5,000",
          "$5,000 – $15,000",
          "$15,000 – $50,000",
          "Over $50,000",
          "Need guidance on this",
        ],
        full: true,
      },
      {
        name: "budgetFlexibility",
        label: "How firm is that?",
        type: "select",
        options: [
          "Firm ceiling",
          "Some flexibility for the right scope",
          "Guided by your recommendation",
        ],
      },
      {
        name: "engagementModel",
        label: "Preferred arrangement",
        type: "radio",
        options: [
          "Fixed price per milestone",
          "Hourly or day rate",
          "Monthly retainer",
          "Not sure — advise me",
        ],
        full: true,
      },
      {
        name: "startDate",
        label: "When would you like to start?",
        type: "select",
        required: true,
        options: [
          "Immediately",
          "Within 2 weeks",
          "Within a month",
          "1 – 3 months",
          "Just researching for now",
        ],
      },
      {
        name: "hardDeadline",
        label: "Hard deadline, if there is one",
        type: "date",
      },
      {
        name: "deadlineReason",
        label: "What's driving that date?",
        type: "textarea",
        maxLength: 1000,
        placeholder:
          "A funding round, a trade show, a contract start, the end of a licence…",
        full: true,
      },
      {
        name: "decisionMakers",
        label: "Who signs this off?",
        type: "select",
        options: [
          "I decide alone",
          "I decide with one other person",
          "Needs committee or board approval",
          "Our own client decides",
        ],
      },
    ],
  },

  // ------------------------------------------------------- 8 (review step)
  {
    id: "review",
    title: "Review & send",
    blurb: "Check it over, add anything missing, and send it my way.",
    review: true,
    fields: [
      {
        name: "heardFrom",
        label: "How did you find me?",
        type: "select",
        options: [
          "Google or search",
          "LinkedIn",
          "GitHub",
          "Referral from someone",
          "Saw one of my builds",
          "Other",
        ],
      },
      {
        name: "links",
        label: "Links to documents, designs or specs",
        type: "textarea",
        maxLength: 1500,
        placeholder:
          "Figma, Google Docs, a spec, a spreadsheet — anything that saves a round trip. Make sure sharing is enabled.",
        full: true,
      },
      {
        name: "extraContext",
        label: "Anything else I should know?",
        type: "textarea",
        maxLength: 3000,
        placeholder:
          "Previous attempts that didn't work, internal politics, a hard constraint, a worry about cost — all fair game.",
        full: true,
      },
      {
        name: "ndaRequired",
        label: "We'll need an NDA before discussing details",
        type: "checkbox",
        full: true,
      },
      {
        name: "consent",
        label: "I'm happy for Rufaro to contact me about this enquiry",
        type: "checkbox",
        required: true,
        full: true,
      },
    ],
  },
];

/** Flat map of field name -> field definition, for validation and emails. */
export const QUOTE_FIELDS = QUOTE_STEPS.reduce((acc, step) => {
  for (const field of step.fields) acc[field.name] = { ...field, step: step.id };
  return acc;
}, {});

/** Blank answer object, typed per field so React inputs stay controlled. */
export function emptyQuoteAnswers() {
  const answers = {};
  for (const step of QUOTE_STEPS) {
    for (const field of step.fields) {
      if (field.type === "multi") answers[field.name] = [];
      else if (field.type === "checkbox") answers[field.name] = false;
      else answers[field.name] = "";
    }
  }
  return answers;
}

/** Single-line field types — CR/LF in these is always an injection attempt. */
const SINGLE_LINE_TYPES = [
  "text",
  "email",
  "tel",
  "url",
  "date",
  "select",
  "radio",
];

export const EMAIL_RE = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

/**
 * Validate one step's answers. Returns { fieldName: message }.
 * Used by the browser on "Next" and by the server on submit, so the rules
 * cannot diverge.
 */
export function validateQuoteStep(stepId, answers) {
  const step = QUOTE_STEPS.find((s) => s.id === stepId);
  const errors = {};
  if (!step) return errors;

  for (const field of step.fields) {
    const raw = answers ? answers[field.name] : undefined;

    if (field.type === "multi") {
      const list = Array.isArray(raw) ? raw : [];
      if (field.required && list.length === 0) {
        errors[field.name] = "Pick at least one option.";
      }
      continue;
    }

    if (field.type === "checkbox") {
      if (field.required && raw !== true) {
        errors[field.name] = "This needs to be checked to continue.";
      }
      continue;
    }

    const value = typeof raw === "string" ? raw.trim() : "";

    if (field.required && !value) {
      errors[field.name] = "This one's required.";
      continue;
    }
    if (!value) continue;

    if (field.type === "email" && !EMAIL_RE.test(value)) {
      errors[field.name] = "That email address doesn't look right.";
    }
    if (field.type === "url" && !/^https?:\/\/.+\..+/i.test(value)) {
      errors[field.name] = "Include the full URL, starting with https://";
    }
    if (field.minLength && value.length < field.minLength) {
      const short = field.minLength - value.length;
      errors[field.name] = `A little more detail please — ${short} more character${
        short === 1 ? "" : "s"
      }.`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = "That's longer than the form accepts.";
    }
    if (SINGLE_LINE_TYPES.includes(field.type) && /[\r\n]/.test(value)) {
      errors[field.name] = "Invalid characters.";
    }
    if (
      (field.type === "select" || field.type === "radio") &&
      Array.isArray(field.options) &&
      !field.options.includes(value)
    ) {
      errors[field.name] = "Choose one of the listed options.";
    }
  }

  return errors;
}

/** Validate every step at once. Used by the server. */
export function validateQuoteAll(answers) {
  return QUOTE_STEPS.reduce(
    (acc, step) => Object.assign(acc, validateQuoteStep(step.id, answers)),
    {}
  );
}
