/**
 * Sanity-checks the SEO surface of a built (or source) index.html:
 *   - every JSON-LD block parses
 *   - the expected schema.org node types are present
 *   - required meta/link tags exist and are non-empty
 *
 * Usage:  node scripts/check-seo.js [path-to-index.html]
 * Default path is build/index.html, falling back to public/index.html.
 */

const fs = require("fs");
const path = require("path");

const explicit = process.argv[2];
const candidates = explicit
  ? [explicit]
  : [path.join("build", "index.html"), path.join("public", "index.html")];

const file = candidates.find((p) => fs.existsSync(p));
if (!file) {
  console.error(`No index.html found. Looked in: ${candidates.join(", ")}`);
  process.exit(1);
}

const html = fs.readFileSync(file, "utf8");
console.log(`Checking ${file}\n`);

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`  FAIL  ${msg}`);
};
const pass = (msg) => console.log(`  ok    ${msg}`);

// ------------------------------------------------------------- JSON-LD
const blocks = [
  ...html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  ),
];

console.log(`JSON-LD blocks found: ${blocks.length}`);
if (blocks.length === 0) fail("no JSON-LD block present");

const seenTypes = new Set();

blocks.forEach((block, i) => {
  let parsed;
  try {
    parsed = JSON.parse(block[1]);
  } catch (err) {
    fail(`block ${i} does not parse: ${err.message}`);
    return;
  }
  pass(`block ${i} parses`);

  const nodes = parsed["@graph"] || [parsed];
  for (const node of nodes) {
    const type = node["@type"];
    if (Array.isArray(type)) type.forEach((t) => seenTypes.add(t));
    else if (type) seenTypes.add(type);
  }

  const service = nodes.find((n) => n["@type"] === "ProfessionalService");
  if (service) {
    const offers = service.hasOfferCatalog?.itemListElement?.length ?? 0;
    if (offers > 0) pass(`ProfessionalService lists ${offers} service offers`);
    else fail("ProfessionalService has no offers in hasOfferCatalog");
  }

  const faq = nodes.find((n) => n["@type"] === "FAQPage");
  if (faq) {
    const qs = faq.mainEntity?.length ?? 0;
    const bad = (faq.mainEntity || []).filter(
      (q) => !q.name || !q.acceptedAnswer?.text
    );
    if (qs > 0 && bad.length === 0) pass(`FAQPage has ${qs} complete Q&A pairs`);
    else fail(`FAQPage problem: ${qs} questions, ${bad.length} incomplete`);
  }

  // Every internal @id reference should resolve to a node in the graph.
  const ids = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
  const refs = [];
  const walk = (value) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 1 && keys[0] === "@id") refs.push(value["@id"]);
      else Object.values(value).forEach(walk);
    }
  };
  walk(nodes);
  const dangling = refs.filter((r) => !ids.has(r));
  if (dangling.length === 0) pass(`all ${refs.length} @id references resolve`);
  else fail(`dangling @id references: ${[...new Set(dangling)].join(", ")}`);
});

console.log(`\nSchema types: ${[...seenTypes].sort().join(", ")}`);
for (const required of [
  "Person",
  "ProfessionalService",
  "WebSite",
  "ProfilePage",
  "FAQPage",
]) {
  if (seenTypes.has(required)) pass(`${required} present`);
  else fail(`${required} missing`);
}

// ---------------------------------------------------------------- meta
console.log("\nHead tags:");

const checks = [
  { label: "title", re: /<title>([^<]+)<\/title>/i, max: 65 },
  {
    label: "meta description",
    re: /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i,
    max: 165,
  },
  { label: "canonical", re: /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i },
  { label: "robots", re: /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i },
  { label: "og:title", re: /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i },
  {
    label: "og:description",
    re: /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i,
  },
  { label: "og:image", re: /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i },
  { label: "og:url", re: /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i },
  {
    label: "twitter:card",
    re: /<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i,
  },
  { label: "viewport", re: /<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i },
];

for (const check of checks) {
  const match = html.match(check.re);
  if (!match) {
    fail(`${check.label} missing`);
    continue;
  }
  const value = match[1].trim();
  const len = value.length;
  if (check.max && len > check.max) {
    console.log(
      `  warn  ${check.label} is ${len} chars (recommended <= ${check.max}) — may be truncated in results`
    );
  } else {
    pass(`${check.label} (${len} chars)`);
  }
}

// lang attribute
if (/<html[^>]+lang=["'][a-z-]+["']/i.test(html)) pass("html lang attribute");
else fail("html lang attribute missing");

// single h1 in the noscript fallback is fine; flag zero
const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
console.log(`  info  ${h1Count} <h1> in static HTML (React adds the live one)`);

console.log(
  failures === 0
    ? "\nAll SEO checks passed."
    : `\n${failures} check(s) failed.`
);
process.exit(failures === 0 ? 0 : 1);
