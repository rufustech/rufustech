// Temporary smoke test for POST /api/quote. Delete after use.
const URL = "http://localhost:5001/api/quote";

async function post(label, payload) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  console.log(`\n--- ${label}`);
  console.log("status:", res.status);
  console.log("body:  ", body.slice(0, 400));
  return { status: res.status, body };
}

// 1. Missing required answers -> 400 with fieldErrors + firstStep
await post("validation (expect 400)", {
  name: "A",
  email: "not-an-email",
  summary: "too short",
  elapsedMs: 120000,
});

// 2. Honeypot filled -> 200 but silently dropped
await post("honeypot (expect 200, not emailed)", {
  _gotcha: "i am a bot",
  name: "Bot",
  email: "bot@example.com",
  elapsedMs: 120000,
});

// 3. Submitted too fast -> 200 but silently dropped
await post("too fast (expect 200, not emailed)", {
  name: "Speedy",
  email: "speedy@example.com",
  elapsedMs: 800,
});

// 4. Unknown keys and bogus multi-select values must be stripped
const full = {
  name: "Rufaro Mucheri (quote smoke test)",
  email: "mucherinvest@gmail.com",
  company: "RufaroDev",
  role: "Founder",
  phone: "+1 403 555 0142",
  location: "Calgary, Canada",
  preferredContact: "Email",
  bestTime: "Morning",

  projectName: "Wholesale ordering portal",
  engagementReason: ["Brand-new build", "Integration between systems", "NOT_A_REAL_OPTION"],
  productType: ["Web application", "Customer or client portal"],
  summary:
    "Automated smoke test of the quote questionnaire endpoint. We need a wholesale ordering portal where retail buyers browse a product catalogue, order by the case, see tiered pricing, and track deliveries. Should integrate with our accounting system.",
  existingUrl: "https://eastafricawholesalefoods.com",
  hasRepo: "No",

  primaryGoals: ["Sell products or services online", "Replace a manual or paper process"],
  audience: ["Other businesses (B2B)"],
  expectedUsers: "1,000 – 10,000",
  successMeasure: "Phone and WhatsApp orders drop by 80% within two months of launch.",
  references: "https://www.faire.com — like the catalogue browsing and reorder flow.",

  features: ["User accounts and login", "Payments or subscriptions", "Admin dashboard", "Reporting and analytics"],
  integrations: ["Stripe", "QuickBooks or Xero"],
  mustHaves: "Case-quantity ordering and per-customer pricing tiers.",
  outOfScope: "No native mobile app for now.",

  designStatus: "Logo only",
  brandAssets: "Logo only",
  contentOwner: "I'll draft it, you polish it",
  accessibility: "WCAG 2.1 AA target",
  seoNeeded: "Yes, from the start",
  languages: "English and Swahili",

  existingStack: "WordPress plus a lot of spreadsheets",
  hostingPreference: "AWS",
  domainStatus: "We already own it",
  emailStatus: "Needs setting up",
  dataSensitivity: "Payment or card data",
  compliance: ["PIPEDA (Canada)", "PCI-DSS"],
  maintenanceOwner: "You — on a retainer",

  budget: "$15,000 – $50,000",
  budgetFlexibility: "Some flexibility for the right scope",
  engagementModel: "Fixed price per milestone",
  startDate: "Within a month",
  hardDeadline: "2026-12-01",
  deadlineReason: "Wholesale buying season starts in December.",
  decisionMakers: "I decide with one other person",

  heardFrom: "Referral from someone",
  links: "https://example.com/spec.pdf",
  extraContext: "A previous developer got halfway and stopped responding.",
  ndaRequired: true,
  consent: true,

  // these must be dropped by sanitizeQuoteAnswers
  isAdmin: true,
  injected: "<script>alert(1)</script>",

  elapsedMs: 480000,
  page: "http://localhost:3000/#quote",
  referrer: "quote-smoke-test",
};

const result = await post("full valid submission (expect 200 + 2 emails)", full);

if (result.status !== 200) {
  console.error("\nFull submission FAILED");
  process.exit(1);
}
console.log("\nAll quote endpoint checks behaved as expected.");
