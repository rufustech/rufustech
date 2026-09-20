import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Activity,
  ArrowRight,
  AtSign,
  BadgeCheck,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  ChartBar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  Gauge,
  GitBranch,
  Github,
  Globe2,
  HardDrive,
  KeyRound,
  Layers,
  Layout,
  LineChart,
  Linkedin,
  ListChecks,
  Lock,
  Mail,
  MailCheck,
  MapPin,
  Moon,
  Network,
  Palette,
  Plug,
  Repeat,
  Rocket,
  Route,
  Scale,
  Search,
  Server,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Terminal,
  Timer,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  background,
  cooloffice,
  darkoffice,
  laptopdev,
  nicedesk,
  office,
  rufus,
  whiteoffice,
} from "../assets";
import ContactForm from "./ContactForm";
import QuoteForm from "./QuoteForm";
import { ThemeContext, cx, useTheme } from "./ThemeContext";
/* =========================================================
   RufaroDev — One‑Page SPA (Home.jsx)
   - Single file, production‑ready component
   - TailwindCSS, Framer Motion, Lucide, Recharts
   - Sticky nav + scroll spy, filters, modals, chart, animations
   - Uses only standard libs so you can drop into any CRA/Vite/Next project
   ========================================================= */

// ---------- Helpers ----------
// ThemeContext / useTheme / cx live in ./ThemeContext so sibling components
// (e.g. ContactForm) can share them without importing this file.
const open = (url) => window.open(url, "_blank", "noopener,noreferrer");
const Section = ({ id, title, kicker, children }) => {
  const { theme } = useTheme();
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {kicker && (
          <p
            className={cx(
              "text-xs uppercase tracking-widest mb-2",
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            )}
          >
            {kicker}
          </p>
        )}
        <h2
          className={cx(
            "text-2xl md:text-4xl font-bold tracking-tight mb-6",
            theme === "dark" ? "text-white" : "text-zinc-900"
          )}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

// ---------- Hero images (random) ----------
const heroImages = [
  background,
  cooloffice,
  darkoffice,
  laptopdev,
  nicedesk,
  office,
  whiteoffice,
];

// ---------- Data (edit freely) ----------
const ventures = [
  {
    title: "Flux Logistics",
    role: "Platform Architect & Tech Lead",
    period: "2024 → Present",
    blurb:
      "UK‑based logistics platform powering tracking, dispatch, and fleet operations. Real‑time shipment visibility, route optimization, and customer portals — engineered on AWS for resilience and scale.",
    tags: ["Logistics", "AWS", "React", "Node", "Real‑time"],
    links: { live: "https://fluxlogistics.co.uk/" },
    highlight: true,
    flagship: true,
  },
  {
    title: "Magetsi",
    role: "Co‑founder & Sales Director",
    period: "2022 → Present",
    blurb:
      "Digital payments for Zimbabwe & diaspora — electricity tokens, airtime, data, insurance, licensing, and QR‑coded ticketing with real‑time dashboards.",
    tags: ["Fintech", "Payments", "AWS", "Security"],
    links: { live: "https://magetsi.co.zw" },
    highlight: true,
    flagship: true,
  },
  {
    title: "Skillbase",
    role: "Founder & Platform Architect",
    period: "2024 → Present",
    blurb:
      "Multi‑tenant HSE training & compliance SaaS: Courses, Quizzes, Certificates, Safety Meetings, Inspections, Incidents, AI policy Q&A, and more.",
    tags: ["SaaS", "HSE", "React", "Node", "MongoDB", "AWS"],
    links: { live: "https://skillbase.co.zw" },
    highlight: true,
  },
  {
    title: "East Africa Wholesale Foods",
    role: "Platform Architect & Web Developer",
    period: "2025 → Present",
    blurb:
      "Wholesale food distribution platform for East African retailers and grocers — product catalogue, bulk ordering, tiered pricing, and supply‑chain visibility.",
    tags: ["Wholesale", "E‑commerce", "Catalogue", "Logistics"],
    links: { live: "https://eastafricawholesalefoods.com" },
    highlight: true,
  },
  {
    title: "Leopard Mining",
    role: "Web Developer",
    period: "2025",
    blurb:
      "Geological consultancy & mining services: exploration mapping, field logistics, compliance documentation, and digital reporting portals.",
    tags: ["Mining", "GIS", "Consulting", "Operations"],
    links: { live: "https://leopardmining.co.zw/" },
    highlight: false,
  },
  {
    title: "Friends of Karanda Mission Hospital",
    role: "Co‑founder & CTO",
    period: "2023 → Present",
    blurb:
      "Fundraising platform supporting Karanda Hospital — donor stories, causes, and transparent impact updates.",
    tags: ["Non‑profit", "Donations", "Next.js"],
    links: { live: "https://www.friendsofkaranda.com/" },
    highlight: false,
  },
  {
    title: "AIEL Institute Portal",
    role: "Platform Architect",
    period: "2023 → Present",
    blurb:
      "Django + React research portal with briefs, events, resources, and AI‑assisted knowledge search.",
    tags: ["Django", "Postgres", "React"],
    links: { live: "https://www.aielinstitute.org/" },
    highlight: true,
  },
];

const projects = [
  // Flagships
  {
    name: "Flux Logistics – Fleet & Tracking",
    summary:
      "Logistics ops platform with live shipment tracking, driver dispatch, geo‑fencing, route optimization, and customer self‑service. Multi‑region AWS deployment for low‑latency tracking across the UK and EU.",
    stack: ["Next.js", "Node", "Express", "MongoDB", "AWS EC2", "CloudFront", "S3", "Route 53"],
    tags: ["Logistics", "AWS", "Real‑time", "Full‑Stack"],
    links: { live: "https://fluxlogistics.co.uk/" },
    featured: true,
  },
  {
    name: "Magetsi – Fintech Core",
    summary:
      "High‑volume payments engine with bulk bill pay for corporate clients, QR ticketing, and real‑time sales analytics.",
    stack: ["Node", "Express", "MongoDB", "Redis", "AWS", "Nginx"],
    tags: ["Fintech", "Backend", "DevOps"],
    links: { live: "https://magetsi.co.zw" },
    featured: true,
  },
  {
    name: "Skillbase – HSE Suite",
    summary:
      "Courses, quizzes, certificates, inspections, incidents, AI policy Q&A, broadcast notices, and competency tracking.",
    stack: ["React", "Node", "MongoDB", "S3", "CloudFront", "Render"],
    tags: ["SaaS", "Full‑Stack"],
    links: { live: "https://skillbase.co.zw/" },
    featured: true,
  },
  // Selected builds
  {
    name: "East Africa Wholesale Foods",
    summary:
      "Wholesale storefront with a searchable product catalogue, case/bulk ordering, customer‑tier pricing, quote requests, and order tracking for retail buyers.",
    stack: [
      "Next.js",
      "React",
      "Node",
      "Express",
      "MongoDB",
      "Mongoose",
      "TailwindCSS",
      "AWS S3",
    ],
    featured: true,
    tags: ["Wholesale", "E‑commerce", "Catalogue", "Full-Stack"],
    links: { live: "https://eastafricawholesalefoods.com" },
  },
  {
    name: "AIEL Research Portal",
    summary: "Django/React knowledge hub with vector search and events.",
    stack: ["Django", "Postgres", "React", "Vector Search"],
    tags: ["Django", "AI"],
  },
  {
    name: "Friends of Karanda",
    summary: "Donor stories, cause pages, and transparent fundraising.",
    stack: ["Next.js", "Tailwind", "S3"],
    tags: ["Non‑profit", "Frontend"],
  },
  {
    name: "Leopard Mining – Services Portal",
    summary:
      "Geological services portal with project pages, exploration logs, compliance docs, and reporting workflows.",
    stack: ["Next.js", "Django", "Postgres"],
    tags: ["Mining", "GIS", "Portal"],
  },
];

const skills = [
  { name: "AWS Cloud Architecture", value: 92 },
  { name: "Data Center Operations", value: 92 },
  { name: "DevOps & CI/CD", value: 90 },
  { name: "Linux / Networking", value: 90 },
  { name: "React / Next.js", value: 92 },
  { name: "Node / Express", value: 91 },
  { name: "Security & Compliance", value: 88 },
  { name: "MongoDB / Postgres", value: 86 },
];

// AWS Solutions Architect domain spread (used in Cloud / DevOps section)
const awsServices = [
  { name: "EC2 & Auto Scaling", icon: Server, blurb: "Compute fleets with health checks, ASGs, and rolling deploys." },
  { name: "VPC & Networking", icon: Network, blurb: "Multi‑AZ VPCs, subnets, NAT, peering, Route 53 DNS, CloudFront edges." },
  { name: "S3 & CloudFront", icon: HardDrive, blurb: "Object storage with lifecycle rules and CDN‑first delivery." },
  { name: "IAM & Security", icon: Lock, blurb: "Least‑privilege roles, KMS, SSL/TLS, secrets rotation." },
  { name: "RDS & DynamoDB", icon: Database, blurb: "Managed Postgres/Mongo Atlas, backups, read replicas." },
  { name: "SES, SNS, SQS", icon: Cloud, blurb: "Transactional email, push, and decoupled async pipelines." },
  { name: "Amplify & Lambda", icon: Zap, blurb: "Serverless functions, edge logic, and CI‑driven hosting." },
  { name: "CloudWatch & Logs", icon: ChartBar, blurb: "Metrics, alarms, dashboards, log aggregation, anomaly alerts." },
];

// DevOps toolbelt (used in Cloud / DevOps section)
const devopsStack = [
  { name: "Docker & Compose", icon: Layers },
  { name: "Nginx Reverse Proxy", icon: Workflow },
  { name: "PM2 Process Manager", icon: Cpu },
  { name: "GitHub Actions CI/CD", icon: Terminal },
  { name: "SSL/TLS & Certbot", icon: ShieldCheck },
  { name: "Multi‑Domain DNS", icon: Globe2 },
  { name: "Monitoring & Alerts", icon: ChartBar },
  { name: "Zero‑downtime Deploys", icon: Rocket },
];

// ---------- Services / Capabilities (what clients actually hire me for) ----------
const services = [
  {
    name: "DevOps & Release Automation",
    icon: GitBranch,
    group: "Engineering",
    blurb:
      "Repeatable pipelines that take code from commit to production without drama — and roll it back just as calmly.",
    items: [
      "GitHub Actions CI/CD (build, test, deploy)",
      "Docker & Compose containerization",
      "Zero‑downtime deploys with PM2 / rolling restarts",
      "Environment & secrets management",
      "Staging → production promotion + rollback plans",
    ],
  },
  {
    name: "Linux Server Administration",
    icon: Terminal,
    group: "Infrastructure",
    blurb:
      "Ubuntu and Amazon Linux servers built, hardened, patched, and monitored the way production actually demands.",
    items: [
      "Provisioning, users, groups & sudo policy",
      "systemd services, cron jobs, log rotation",
      "SSH key‑only auth, UFW/iptables, fail2ban",
      "Disk, memory & process troubleshooting",
      "Patch management and kernel/package upgrades",
    ],
  },
  {
    name: "Nginx & Reverse Proxy",
    icon: Route,
    group: "Infrastructure",
    blurb:
      "The front door of your stack: clean routing, TLS that never expires unnoticed, and caching that cuts response times.",
    items: [
      "Server blocks, virtual hosts & multi‑site routing",
      "SSL/TLS termination with Certbot auto‑renewal",
      "Reverse proxy to Node / Django / Docker upstreams",
      "Gzip/Brotli, caching headers, rate limiting",
      "WebSocket proxying, redirects & canonical hosts",
    ],
  },
  {
    name: "DNS & Domain Configuration",
    icon: Globe2,
    group: "Infrastructure",
    blurb:
      "Domains, subdomains, and nameserver migrations handled carefully — including cutovers with no visible downtime.",
    items: [
      "Route 53, Cloudflare & registrar zone management",
      "A / AAAA / CNAME / ALIAS / TXT / SRV records",
      "Apex + www, subdomain delegation, wildcard setups",
      "Nameserver migrations with TTL pre‑staging",
      "DNSSEC, propagation checks & zone documentation",
    ],
  },
  {
    name: "Email Configuration & Deliverability",
    icon: MailCheck,
    group: "Infrastructure",
    blurb:
      "Business email that sends, receives, and lands in the inbox — not the spam folder.",
    items: [
      "Google Workspace, Microsoft 365 & Zoho setup",
      "MX records, catch‑all, aliases & shared mailboxes",
      "SPF, DKIM & DMARC alignment and reporting",
      "Transactional email via SES / Nodemailer / SMTP relays",
      "Bounce, complaint & inbox‑placement troubleshooting",
    ],
  },
  {
    name: "Website Design & UI/UX",
    icon: Palette,
    group: "Product",
    blurb:
      "Interfaces that look considered and behave predictably across every screen, with accessibility baked in.",
    items: [
      "Brand‑aligned design systems & component libraries",
      "Responsive, mobile‑first Tailwind layouts",
      "WCAG AA colour contrast, focus states & keyboard paths",
      "Purposeful motion with Framer Motion",
      "Dark/light theming and design‑to‑code handoff",
    ],
  },
  {
    name: "SEO & Web Performance",
    icon: Search,
    group: "Growth",
    blurb:
      "Technical SEO and Core Web Vitals work so the right people find the site and it feels instant when they do.",
    items: [
      "Semantic markup, metadata & Open Graph/Twitter cards",
      "JSON‑LD structured data, sitemaps & robots.txt",
      "Canonical URLs, redirects & crawl‑budget hygiene",
      "Core Web Vitals: LCP, CLS, INP tuning",
      "Image optimization, CDN caching, GA4 & Search Console",
    ],
  },
  {
    name: "Enterprise Development",
    icon: Building2,
    group: "Engineering",
    blurb:
      "Multi‑tenant systems built for organizations — roles, audit trails, integrations, and documentation that survives handover.",
    items: [
      "Multi‑tenant data models & tenant isolation",
      "RBAC, SSO‑ready auth & granular permissions",
      "Audit logging, reporting & data export",
      "REST API design, versioning & integration contracts",
      "Stripe, ERP/CRM and third‑party system integrations",
    ],
  },
  {
    name: "Cloud Architecture & Migration",
    icon: Cloud,
    group: "Cloud",
    blurb:
      "AWS designs that survive real traffic and real failures — then the migration path to get you there.",
    items: [
      "VPC, subnets, security groups & multi‑AZ topology",
      "EC2, S3, CloudFront, Route 53, RDS, Lambda",
      "Lift‑and‑shift and re‑platform migrations",
      "Cost review, right‑sizing & lifecycle policies",
      "Backup, DR strategy & restore rehearsals",
    ],
  },
  {
    name: "Security & Compliance Hardening",
    icon: ShieldCheck,
    group: "Cloud",
    blurb:
      "Least‑privilege access, encrypted everything, and evidence you can hand an auditor.",
    items: [
      "IAM least privilege & credential rotation",
      "SSL/TLS everywhere, HSTS & security headers",
      "Secrets management and dependency patching",
      "Access reviews, audit trails & change records",
      "Backup verification and recovery drills",
    ],
  },
  {
    name: "Monitoring & Observability",
    icon: Activity,
    group: "Cloud",
    blurb:
      "You cannot operate what you cannot see. Dashboards, alerts, and logs that name the problem before the customer does.",
    items: [
      "CloudWatch metrics, alarms & dashboards",
      "Uptime/synthetic checks & status reporting",
      "Centralized logs and error tracking",
      "Alert routing, escalation & on‑call rotations",
      "Post‑incident review and follow‑up tracking",
    ],
  },
  {
    name: "Maintenance & Managed Support",
    icon: Repeat,
    group: "Support",
    blurb:
      "Launch day is the beginning. Ongoing care keeps the platform fast, patched, and boring in the best way.",
    items: [
      "Monthly patching & dependency upgrades",
      "Certificate, domain & billing renewal tracking",
      "Performance and cost reviews",
      "Content, feature and small‑change requests",
      "Documented runbooks and knowledge transfer",
    ],
  },
];

// Quick capability pills shown under the services grid
const capabilityPills = [
  { name: "DevOps & CI/CD", icon: GitBranch },
  { name: "Linux Administration", icon: Terminal },
  { name: "Nginx & TLS", icon: Route },
  { name: "DNS & Domains", icon: Globe2 },
  { name: "Email & Deliverability", icon: AtSign },
  { name: "Website Design", icon: Layout },
  { name: "SEO & Core Web Vitals", icon: TrendingUp },
  { name: "Enterprise Platforms", icon: Building2 },
  { name: "Cloud Architecture", icon: Cloud },
  { name: "Containers & Docker", icon: Boxes },
  { name: "Observability", icon: LineChart },
  { name: "Server Hardening", icon: ServerCog },
  { name: "Performance Tuning", icon: Gauge },
  { name: "Access & IAM", icon: KeyRound },
  { name: "Accessibility (WCAG AA)", icon: Eye },
];

// ---------- Core Principles (how the work gets done) ----------
const principles = [
  {
    title: "Secure by default",
    icon: Lock,
    blurb:
      "Least privilege, encryption in transit and at rest, and no shared credentials. Security is a starting condition, not a hardening phase bolted on before launch.",
  },
  {
    title: "Design for failure",
    icon: ShieldCheck,
    blurb:
      "Hardware dies, networks partition, deploys go wrong. Every design gets a blast‑radius review, a backout plan, and a tested restore path before it reaches production.",
  },
  {
    title: "Automate anything done twice",
    icon: Workflow,
    blurb:
      "Manual steps are where outages are born. If a task repeats, it becomes a script, a pipeline, or a runbook — repeatable, reviewable, and safe to hand over.",
  },
  {
    title: "Measure it or you don't run it",
    icon: Activity,
    blurb:
      "Metrics, logs, and alerts ship with the feature. Observability is part of the definition of done, so problems get named before customers report them.",
  },
  {
    title: "Simplicity scales",
    icon: Compass,
    blurb:
      "The simplest architecture that meets the requirement wins. Complexity is only added when a real constraint demands it, never for novelty.",
  },
  {
    title: "Performance is a feature",
    icon: Gauge,
    blurb:
      "Fast pages convert and fast systems cost less. Core Web Vitals, query plans, caching, and payload size get treated as product requirements, not afterthoughts.",
  },
  {
    title: "Accessible to everyone",
    icon: Eye,
    blurb:
      "Semantic markup, keyboard paths, contrast, and clear error states as standard. Full WCAG conformance also needs assistive‑tech testing and expert review — I build toward it and say so honestly.",
  },
  {
    title: "Ship small, ship often",
    icon: Rocket,
    blurb:
      "Weekly slices beat quarterly reveals. Small changes are easier to review, safer to release, and give stakeholders something real to react to.",
  },
  {
    title: "Document as you build",
    icon: ListChecks,
    blurb:
      "Architecture notes, runbooks, and handover docs are written while the context is fresh. No project should depend on one person's memory.",
  },
  {
    title: "Cost awareness is engineering",
    icon: Scale,
    blurb:
      "Right‑sizing, lifecycle rules, and CDN‑first delivery keep the bill proportional to the value. An elegant system nobody can afford is not a solution.",
  },
  {
    title: "You build it, you run it",
    icon: Target,
    blurb:
      "Ownership continues past launch. Operating what I ship keeps the feedback loop short and the incentives pointed at reliability.",
  },
  {
    title: "Straight talk with stakeholders",
    icon: Users,
    blurb:
      "Clear scope, honest timelines, and early warning when something slips. Trust comes from predictable communication, not optimistic estimates.",
  },
];

// ---------- How engagements work (commercial terms, client-facing) ----------
const engagementModels = [
  {
    name: "Fixed‑price project",
    icon: Target,
    bestFor: "Best for a defined build with a clear outcome",
    detail:
      "We agree the scope, then I quote a fixed price per milestone. You know the total before anything starts, and each milestone ships something you can actually use.",
    points: [
      "Written scope, price and timeline up front",
      "Milestone payments, not one lump sum",
      "Change requests priced separately, never silently",
    ],
  },
  {
    name: "Hourly / day rate",
    icon: Clock,
    bestFor: "Best for fixes, audits and unknown scope",
    detail:
      "For work that can't be scoped precisely — a broken deploy, a performance problem, an inherited codebase — you buy time and I report where it went.",
    points: [
      "Tracked hours with a written summary",
      "Agreed cap so the bill can't run away",
      "Good for a one‑off audit or second opinion",
    ],
  },
  {
    name: "Monthly retainer",
    icon: Repeat,
    bestFor: "Best for ongoing development and support",
    detail:
      "A set number of days each month for continuous delivery, maintenance and on‑call cover. Effectively a part‑time senior developer without the hiring overhead.",
    points: [
      "Reserved capacity each month",
      "Patching, monitoring and upgrades included",
      "Rolls month to month — no long lock‑in",
    ],
  },
];

// Realistic starting points, with the timelines I actually quote.
const projectShapes = [
  {
    name: "Marketing site or landing page",
    duration: "2 – 4 weeks",
    icon: Layout,
    blurb:
      "Responsive, accessible, fast. Design system, CMS or hard‑coded content, contact form, analytics, SEO groundwork, and deployment.",
  },
  {
    name: "Web app / MVP",
    duration: "4 – 8 weeks",
    icon: Terminal,
    blurb:
      "Auth, database, core workflows, admin views, payments if needed. Built to be extended rather than rewritten after launch.",
  },
  {
    name: "Multi‑tenant SaaS platform",
    duration: "3 months+",
    icon: Building2,
    blurb:
      "Tenant isolation, role‑based access, billing, audit trails, reporting, and the AWS infrastructure and pipelines to run it.",
  },
  {
    name: "API or third‑party integration",
    duration: "1 – 3 weeks",
    icon: Plug,
    blurb:
      "REST API design, or wiring your system to Stripe, a CRM, an ERP, or a partner API — with retries, webhooks and reconciliation.",
  },
  {
    name: "Cloud setup or migration",
    duration: "1 – 3 weeks",
    icon: Cloud,
    blurb:
      "Move off a shared host onto AWS, or tidy what's there: VPC, TLS, backups, CI/CD, monitoring, and a cost review.",
  },
  {
    name: "Rescue / unblock",
    duration: "2 – 5 days",
    icon: Zap,
    blurb:
      "Site down, deploys broken, email landing in spam, domain misconfigured, pages crawling. Diagnose, fix, document what happened.",
  },
];

// What every engagement includes, regardless of size.
const engagementIncludes = [
  "A written scope with the cost and timeline before work starts",
  "Weekly progress updates and a working preview environment",
  "Source code in your own Git repository from day one",
  "Full ownership of code, domains and cloud accounts on final payment",
  "Architecture notes and runbooks so you're never locked to me",
  "A 30‑day fix window for defects in what I delivered",
];

// ---------- FAQ ----------
// These questions and answers are mirrored in the FAQPage JSON-LD in
// public/index.html. If you edit the wording here, update it there too —
// structured data must match what the visitor can actually read.
const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Custom web applications, SaaS platforms, API and integration work, and the cloud infrastructure underneath them. That ranges from a single well-scoped fix — a broken deployment, a DNS or email migration, a slow page — through to building and operating a multi-tenant platform end to end.",
  },
  {
    q: "Do you price hourly or fixed?",
    a: "Both. Small, clearly defined jobs work well hourly. Larger builds get a fixed price per milestone so you know the cost before work starts. Longer engagements can run as a monthly retainer with an agreed number of days. Either way, the scope, cost and timeline go in writing first.",
  },
  {
    q: "How soon can you start, and how long will my project take?",
    a: "Small fixes usually start within a few days. A typical marketing site runs two to four weeks, a focused web app four to eight weeks, and a larger platform three months or more. I ship in weekly slices so you see working software early rather than waiting for one big reveal.",
  },
  {
    q: "Do you work with clients outside Canada?",
    a: "Yes. I work remotely with clients in Canada, the United States, the United Kingdom and Africa. I am based in Calgary on Mountain Time, which overlaps most of the North American business day and the UK morning. I invoice in CAD or USD.",
  },
  {
    q: "Who owns the code when the project is finished?",
    a: "You do. On final payment the source code, repositories, domains and cloud accounts are yours, transferred into your own accounts wherever possible. You also get the architecture notes and runbooks so another developer can pick the work up without me.",
  },
  {
    q: "What happens after launch?",
    a: "Launch day is the start, not the finish. I offer ongoing maintenance covering security patching, dependency upgrades, certificate and domain renewals, monitoring, performance reviews and small change requests. If you would rather run it in-house, I hand over documented runbooks instead.",
  },
];

// ---------- Career Experience (L1B‑friendly, public‑safe) ----------
const careerExperience = [
  {
    role: "Data Center Technician IV",
    company: "Amazon Web Services (Amazon Data Services Canada)",
    period: "May 2023 → Present",
    location: "Calgary, AB · with U.S. assignments",
    blurb:
      "Production data center operations at AWS — hardware diagnostics, break‑fix, rack‑level troubleshooting, build & launch readiness, structured cabling, change‑window execution, secure media handling, and major‑incident response. Lead‑adjacent responsibilities include site safety auditing, on‑call scheduling, ISP cross‑connect coordination, rack‑down drill facilitation, and large‑scale event response training delivery.",
    highlights: [
      "Specialized knowledge of high‑density compute, storage, and network platforms in 24x7 production environments.",
      "Certified technical interviewer; conducts structured panel interviews and contributes hiring recommendations.",
      "Architect and program lead for an internal data‑center training program rolled out across multiple sites.",
      "Recognized as Global Safety Hero (Q1 2025) for hardware‑handling safety improvements.",
      "Designed and shipped internal full‑stack tools for shift management, change‑awareness alerts, and shift handover.",
    ],
    tags: [
      "AWS",
      "Data Center Ops",
      "Networking",
      "Security",
      "Incident Response",
      "Training",
    ],
  },
  {
    role: "IT Support Associate II",
    company: "Amazon",
    period: "Aug 2020 → May 2023",
    location: "Calgary, AB · multi‑site Canadian builds",
    blurb:
      "Supported large‑scale fulfillment, sort, and robotics site builds across Canada (Vancouver, Edmonton, Ottawa, Winnipeg, Hamilton, Calgary). MDF/IDF infrastructure, Cisco switch staging, structured cabling, fiber labeling, endpoint imaging and deployment, and launch‑readiness execution under tight cutover windows.",
    highlights: [
      "Acted as a traveling build resource aligning new sites to enterprise IT standards.",
      "Built launch checklists, cutover plans, asset documentation, and SOPs for repeatable site readiness.",
      "Coordinated with vendors, construction, operations, safety, facilities, and IT leadership to clear blockers.",
    ],
    tags: ["IT Build", "MDF/IDF", "Cisco", "Imaging", "Launch Readiness"],
  },
  {
    role: "IT Support Consultant (Freelance)",
    company: "Independent — Calgary, AB",
    period: "Mar 2018 → Feb 2020",
    location: "Calgary, AB",
    blurb:
      "Small‑business and individual IT support: hardware/OS deployment, networking, security, backups, and end‑user training. Configured small‑office routers, wireless networks, and endpoint security for SMB clients.",
    highlights: [
      "Hands‑on support across Windows, networking, and small‑office infrastructure.",
    ],
    tags: ["SMB IT", "Networking", "Endpoint Support"],
  },
  {
    role: "Client Support / IT Support",
    company: "Sanjel Corporation",
    period: "Jul 2012 → Jan 2018",
    location: "Calgary, AB",
    blurb:
      "SLA‑driven enterprise IT support for corporate, field, and operations users. Private data center / server room work including server racking, equipment installation, cabling, and configuration. Imaging and deployment of 3,000+ devices during a Windows rollout. Citrix, VPN, Active Directory, and remote access support.",
    highlights: [
      "Private data‑center server racking, cable management, and configuration support.",
      "Mass endpoint deployment across a multi‑site enterprise rollout.",
    ],
    tags: ["Service Desk", "Citrix", "VPN", "AD", "Data Center"],
  },
];

// ---------- Industry Certifications (public) ----------
const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2021",
    detail: "Score 900/1000",
    icon: Cloud,
  },
  {
    name: "Google IT Support Professional",
    issuer: "Google / Coursera",
    year: "2020",
    detail: "5‑course program (Networking, OS, SysAdmin, Security)",
    icon: Terminal,
  },
  {
    name: "Web Developer Certificate",
    issuer: "SAIT — In Progress",
    year: "2024 → 2026",
    detail: "GPA 3.91 / 4.0",
    icon: Code2,
  },
  {
    name: "Full‑Stack Web Development",
    issuer: "Udemy — 62 hrs",
    year: "—",
    detail: "Frontend, backend, APIs, deployment",
    icon: Layers,
  },
];

const toolTags = [
  "TailwindCSS",
  "Framer Motion",
  "Lucide Icons",
  "FullCalendar",
  "Render.com",
  "PM2",
  "Nginx",
  "Certbot / Let's Encrypt",
  "Route 53",
  "Cloudflare",
  "Google Workspace",
  "SPF / DKIM / DMARC",
  "Amazon SES",
  "Lighthouse",
  "GA4 & Search Console",
  "Docker",
  "GitHub Actions",
  "Git / GitHub",
  "Vite",
  "Jest",
  "AOS",
  "MUI",
  "ShadCN (optionally)",
];

// ---------- Subcomponents ----------
function Kicker({ icon: Icon, children }) {
  const { theme } = useTheme();
  return (
    <div
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        theme === "dark"
          ? "border-zinc-800 bg-zinc-900/50 text-zinc-300"
          : "border-zinc-300 bg-white/80 text-zinc-700"
      )}
    >
      {Icon && <Icon size={14} className="opacity-80" />} {children}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  const { theme } = useTheme();
  return (
    <div
      className={cx(
        "flex items-center gap-3 rounded-2xl border p-4 shadow-lg",
        theme === "dark"
          ? "border-zinc-800/80 bg-gradient-to-b from-zinc-950 to-zinc-900"
          : "border-zinc-200 bg-gradient-to-b from-white to-zinc-50"
      )}
    >
      <div
        className={cx(
          "rounded-xl p-2",
          theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"
        )}
      >
        <Icon
          size={20}
          className={theme === "dark" ? "text-white" : "text-zinc-700"}
        />
      </div>
      <div>
        <div
          className={cx(
            "text-xl font-bold",
            theme === "dark" ? "text-white" : "text-zinc-900"
          )}
        >
          {value}
        </div>
        <div
          className={cx(
            "text-xs",
            theme === "dark" ? "text-zinc-400" : "text-zinc-600"
          )}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen }) {
  const { theme } = useTheme();
  return (
    <motion.button
      onClick={() => onOpen(p)}
      whileHover={{ y: -4 }}
      className={cx(
        "group text-left rounded-2xl border p-5 shadow-lg focus:outline-none",
        theme === "dark"
          ? "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700/80"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h4
          className={cx(
            "text-lg font-semibold",
            theme === "dark" ? "text-white" : "text-zinc-900"
          )}
        >
          {p.name}
        </h4>
        <ArrowRight
          className={cx(
            "shrink-0 opacity-60 group-hover:translate-x-1 transition",
            theme === "dark" ? "text-white" : "text-zinc-700"
          )}
        />
      </div>
      <p
        className={cx(
          "mt-2 text-sm",
          theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
        )}
      >
        {p.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.stack?.map((t) => (
          <span
            key={t}
            className={cx(
              "rounded-full border px-2 py-0.5 text-[11px]",
              theme === "dark"
                ? "border-zinc-800/70 bg-zinc-800/30 text-zinc-300"
                : "border-zinc-300 bg-zinc-100 text-zinc-700"
            )}
          >
            {t}
          </span>
        ))}
      </div>
      {p.featured && (
        <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-emerald-500">
          <BadgeCheck size={14} /> Featured
        </div>
      )}
    </motion.button>
  );
}

function TimelineItem({ v }) {
  const { theme } = useTheme();
  return (
    <div className="relative pl-8">
      <div className="absolute left-1.5 top-1 h-2 w-2 rounded-full bg-emerald-500" />
      <div className="text-sm text-emerald-500">{v.period}</div>
      <div
        className={cx(
          "font-semibold",
          theme === "dark" ? "text-white" : "text-zinc-900"
        )}
      >
        {v.title}
      </div>
      <div
        className={cx(
          "text-xs",
          theme === "dark" ? "text-zinc-400" : "text-zinc-600"
        )}
      >
        {v.role}
      </div>
      <p
        className={cx(
          "mt-2 text-sm",
          theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
        )}
      >
        {v.blurb}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {v.tags?.map((t) => (
          <span
            key={t}
            className={cx(
              "rounded-full border px-2 py-0.5 text-[11px]",
              theme === "dark"
                ? "border-zinc-800/70 bg-zinc-800/30 text-zinc-300"
                : "border-zinc-300 bg-zinc-100 text-zinc-700"
            )}
          >
            {t}
          </span>
        ))}
      </div>
      {v.links?.live && (
        <button
          onClick={() => open(v.links.live)}
          className={cx(
            "mt-3 inline-flex items-center gap-2 text-sm",
            theme === "dark"
              ? "text-zinc-100 hover:text-white"
              : "text-zinc-700 hover:text-zinc-900"
          )}
        >
          <ExternalLink size={16} /> Visit
        </button>
      )}
    </div>
  );
}

function ServiceCard({ s }) {
  const { theme } = useTheme();
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className={cx(
        "flex h-full flex-col rounded-2xl border p-5 shadow-sm transition-colors",
        theme === "dark"
          ? "border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/40"
          : "border-zinc-200 bg-white hover:border-emerald-500/40"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cx(
            "rounded-xl p-2",
            theme === "dark"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-emerald-50 text-emerald-600"
          )}
        >
          <Icon size={18} />
        </div>
        <span
          className={cx(
            "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider",
            theme === "dark"
              ? "border-zinc-800 bg-zinc-800/40 text-zinc-400"
              : "border-zinc-300 bg-zinc-100 text-zinc-600"
          )}
        >
          {s.group}
        </span>
      </div>
      <h4
        className={cx(
          "mt-3 text-lg font-semibold",
          theme === "dark" ? "text-white" : "text-zinc-900"
        )}
      >
        {s.name}
      </h4>
      <p
        className={cx(
          "mt-2 text-sm",
          theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
        )}
      >
        {s.blurb}
      </p>
      <ul
        className={cx(
          "mt-4 space-y-1.5 text-sm",
          theme === "dark" ? "text-zinc-400" : "text-zinc-600"
        )}
      >
        {s.items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <CheckCircle2
              size={14}
              className="mt-0.5 shrink-0 text-emerald-500"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PrincipleCard({ p, index }) {
  const { theme } = useTheme();
  const Icon = p.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className={cx(
        "relative h-full overflow-hidden rounded-2xl border p-5",
        theme === "dark"
          ? "border-zinc-800 bg-zinc-900/40"
          : "border-zinc-200 bg-white"
      )}
    >
      <span
        aria-hidden
        className={cx(
          "absolute right-4 top-2 text-4xl font-bold",
          theme === "dark" ? "text-zinc-800/80" : "text-zinc-100"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={cx(
          "relative inline-flex rounded-xl p-2",
          theme === "dark"
            ? "bg-sky-500/10 text-sky-400"
            : "bg-sky-50 text-sky-600"
        )}
      >
        <Icon size={18} />
      </div>
      <h4
        className={cx(
          "relative mt-3 font-semibold",
          theme === "dark" ? "text-white" : "text-zinc-900"
        )}
      >
        {p.title}
      </h4>
      <p
        className={cx(
          "relative mt-2 text-sm",
          theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
        )}
      >
        {p.blurb}
      </p>
    </motion.div>
  );
}

// ---------- Main Component ----------
export default function Home() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [modal, setModal] = useState(null);
  // Every entry is watched by the scroll spy. `nav: false` keeps a section out
  // of the top bar so the nav stays readable without losing highlight tracking.
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience", nav: false },
    { id: "ventures", label: "Ventures", nav: false },
    { id: "projects", label: "Work" },
    { id: "services", label: "Services" },
    { id: "hire", label: "Hire me" },
    { id: "cloud", label: "Cloud" },
    { id: "skills", label: "Skills" },
    { id: "principles", label: "Principles", nav: false },
    { id: "faq", label: "FAQ" },
    { id: "quote", label: "Get a quote", nav: false },
    { id: "contact", label: "Contact" },
  ];
  const navSections = sections.filter((s) => s.nav !== false);

  // Theme persistence
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Pick a random hero background on mount
  const heroBg = useMemo(
    () => heroImages[Math.floor(Math.random() * heroImages.length)],
    []
  );
  // Scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allTags = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((p) => p.tags || []))),
    ],
    []
  );
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const byTag = tag === "All" || (p.tags || []).includes(tag);
      const byQuery = query
        ? [p.name, p.summary, ...(p.stack || []), ...(p.tags || [])]
            .join("\n")
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      return byTag && byQuery;
    });
  }, [query, tag]);

  const stats = useMemo(() => {
    const featured = projects.filter((p) => p.featured).length;
    return [
      { label: "Years @ AWS", value: "5+", icon: Cloud },
      { label: "Flagship builds", value: featured, icon: Rocket },
      {
        label: "Stacks touched",
        value: new Set(projects.flatMap((p) => p.stack)).size,
        icon: Wrench,
      },
      { label: "Compliance / Security", value: "On", icon: ShieldCheck },
    ];
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={cx(
          "min-h-screen transition-colors duration-300",
          theme === "dark"
            ? "bg-black text-zinc-100"
            : "bg-zinc-50 text-zinc-900"
        )}
      >
        {/* Scroll progress */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400"
        />
        {/* ===== Sticky Nav ===== */}
        <div
          className={cx(
            "fixed inset-x-0 top-0 z-40 backdrop-blur border-b transition-colors",
            theme === "dark"
              ? "supports-[backdrop-filter]:bg-black/40 border-zinc-900"
              : "supports-[backdrop-filter]:bg-white/40 border-zinc-200"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
            <button
              onClick={() => scrollTo("home")}
              className="font-bold tracking-tight text-xl text-emerald-500"
            >
              Rufaro
              <span
                className={theme === "dark" ? "text-white" : "text-zinc-900"}
              >
                Dev
              </span>
            </button>
            <nav
              aria-label="Page sections"
              className="hidden md:flex items-center gap-0.5 overflow-x-auto no-scrollbar max-w-[62%]"
            >
              {navSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={cx(
                    "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] transition",
                    active === s.id
                      ? theme === "dark"
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-200 text-zinc-900"
                      : theme === "dark"
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-all hover:scale-105",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              {/* Primary conversion action — deliberately the only
                  emerald element in the nav so it reads as THE next step. */}
              <button
                onClick={() => scrollTo("quote")}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3.5 py-1.5 text-sm font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-md hover:shadow-emerald-500/25"
              >
                <ClipboardList size={16} />
                <span className="hidden sm:inline">Get a quote</span>
                <span className="sm:hidden">Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary content landmark — everything between the nav and footer */}
        <main id="content">
        {/* ===== Hero ===== */}
        <section
          id="home"
          className={cx(
            "relative flex min-h-[72vh] items-center overflow-hidden",
            theme === "dark"
              ? "bg-[radial-gradient(60rem_60rem_at_120%_-20%,rgba(16,185,129,0.16),transparent_40%),radial-gradient(40rem_40rem_at_-20%_10%,rgba(59,130,246,0.12),transparent_40%)]"
              : "bg-[radial-gradient(60rem_60rem_at_120%_-20%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(40rem_40rem_at_-20%_10%,rgba(59,130,246,0.08),transparent_40%)]"
          )}
        >
          {/* Backdrop image shade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroBg})`,
              filter:
                theme === "dark"
                  ? "grayscale(40%) contrast(1.1)"
                  : "grayscale(20%) contrast(1.05) brightness(1.1)",
            }}
          />
          <div
            aria-hidden
            className={cx(
              "absolute inset-0",
              theme === "dark" ? "bg-black/60" : "bg-white/70"
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-3xl order-2 lg:order-1"
              >
              <Kicker icon={Sparkles}>
                Available for freelance & contract projects • Calgary +
                remote worldwide
              </Kicker>
              {/* Single H1 on the page. Leads with the phrase clients
                  actually search for, then the deliverables. */}
              <h1
                className={cx(
                  "mt-4 text-4xl md:text-6xl font-bold tracking-tight",
                  theme === "dark" ? "text-white" : "text-zinc-900"
                )}
              >
                Freelance software developer for{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  web apps, SaaS, and the cloud they run on
                </span>
                .
              </h1>
              <p
                className={cx(
                  "mt-4 text-lg",
                  theme === "dark" ? "text-zinc-100" : "text-zinc-700"
                )}
              >
                I'm Rufaro Mucheri — a full‑stack software developer in
                Calgary, Alberta, taking on contract and project work for
                clients in Canada, the US, the UK, and Africa. I build with{" "}
                <strong className="font-semibold">
                  React, Next.js, Node.js, Python
                </strong>{" "}
                and deploy on <strong className="font-semibold">AWS</strong> —
                then run the DNS, email, CI/CD, and Linux servers underneath so
                the thing actually stays up. Five years inside Amazon / AWS
                data center operations is where the reliability habits come
                from. Recent builds include{" "}
                <a
                  href="https://fluxlogistics.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 underline-offset-4 hover:underline"
                >
                  Flux Logistics
                </a>
                ,{" "}
                <a
                  href="https://magetsi.co.zw"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 underline-offset-4 hover:underline"
                >
                  Magetsi
                </a>
                , and Skillbase.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("quote")}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black hover:bg-emerald-400 transition-all",
                    theme === "dark"
                      ? "hover:shadow-md hover:shadow-emerald-500/20"
                      : "hover:shadow-lg"
                  )}
                >
                  <ClipboardList size={18} /> Get a free quote
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => scrollTo("projects")}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all",
                    theme === "dark"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                      : "border-emerald-500/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  )}
                >
                  <Briefcase size={18} /> See past work
                </button>
                <button
                  onClick={() => scrollTo("hire")}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-md hover:shadow-white/10"
                      : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 hover:shadow-lg"
                  )}
                >
                  <Scale size={18} /> Rates & how I work
                </button>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <Stat key={s.label} {...s} />
                ))}
              </div>
            </motion.div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center order-1 lg:order-2"
            >
              <div className="relative">
                {/* Glow ring */}
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-full bg-gradient-to-tr from-emerald-500/40 via-teal-400/30 to-sky-500/40 blur-2xl"
                />
                {/* Animated gradient ring */}
                <motion.div
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.9),rgba(56,189,248,0.6),rgba(16,185,129,0.9))]"
                />
                <div
                  className={cx(
                    "relative h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 xl:h-80 xl:w-80 rounded-full overflow-hidden ring-4 shadow-2xl",
                    theme === "dark"
                      ? "ring-black/80 shadow-emerald-500/20"
                      : "ring-white shadow-emerald-500/20"
                  )}
                >
                  <img
                    src={rufus}
                    alt="Rufaro Mucheri, freelance full-stack software developer and cloud engineer based in Calgary, Alberta"
                    width="320"
                    height="320"
                    loading="eager"
                    fetchpriority="high"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className={cx(
                    "absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur",
                    theme === "dark"
                      ? "border-emerald-500/40 bg-black/70 text-emerald-300"
                      : "border-emerald-500/40 bg-white/80 text-emerald-700"
                  )}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for new projects
                </motion.div>
              </div>
            </motion.div>
          </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <Section id="about" title="About Rufaro" kicker="Profile">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="prose prose-invert max-w-none">
                <p>
                  All‑round IT professional based in Calgary. AWS Data Center
                  Engineer with 5+ years at Amazon / AWS — plus a Cloud
                  Solutions Architect, DevOps, and full‑stack track shipping
                  production platforms.
                </p>
                <ul>
                  <li>
                    <strong>Data Center Ops:</strong> rack build, structured
                    cabling, Cisco fabrics, change management, incident
                    response.
                  </li>
                  <li>
                    <strong>AWS Cloud:</strong> EC2, VPC, S3, CloudFront, Route
                    53, IAM, Lambda, RDS, CloudWatch — multi‑region HA.
                  </li>
                  <li>
                    <strong>DevOps & Full‑Stack:</strong> Docker, Nginx, CI/CD,
                    React/Next, Node, Django, Stripe.
                  </li>
                  <li>
                    <strong>Linux & Web Infrastructure:</strong> Ubuntu server
                    administration, Nginx reverse proxy and TLS, DNS zone and
                    domain management, business email with SPF/DKIM/DMARC.
                  </li>
                  <li>
                    <strong>Design, SEO & Enterprise:</strong> accessible UI
                    design systems, technical SEO and Core Web Vitals,
                    multi‑tenant enterprise platforms with RBAC and audit
                    trails.
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {toolTags.map((t) => (
                  <span
                    key={t}
                    className={cx(
                      "rounded-full border px-3 py-1 text-xs",
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/60 text-zinc-300"
                        : "border-zinc-300 bg-zinc-100 text-zinc-700"
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div
                className={cx(
                  "rounded-2xl border p-4",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                )}
              >
                <div
                  className={cx(
                    "flex items-center gap-3 text-sm",
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  <MapPin size={16} className="opacity-80" /> Calgary, Canada
                </div>
                <div
                  className={cx(
                    "mt-2 flex items-center gap-3 text-sm",
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  <Briefcase size={16} className="opacity-80" /> AWS Data
                  Center Engineer · Cloud Architect · DevOps
                </div>
                <div
                  className={cx(
                    "mt-2 flex items-center gap-3 text-sm",
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  <ShieldCheck size={16} className="opacity-80" /> Safety,
                  compliance & security‑minded
                </div>
              </div>
              <div
                className={cx(
                  "rounded-2xl border p-4",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                )}
              >
                <div
                  className={cx(
                    "text-sm",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  Availability
                </div>
                <div
                  className={cx(
                    "font-semibold",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  Consulting / Fractional Engineering
                </div>
                <button
                  onClick={() =>
                    open(
                      "mailto:rufaro@rufarodev.com?subject=Project%20inquiry"
                    )
                  }
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
                >
                  Book a chat <CalendarIcon />
                </button>
              </div>
              <div
                className={cx(
                  "rounded-2xl border p-4",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                )}
              >
                <div
                  className={cx(
                    "text-sm mb-2",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  Connect
                </div>
                <div className="flex items-center gap-3">
                  <IconLink
                    Icon={Github}
                    label="GitHub"
                    href="https://github.com/rufustech/"
                  />
                  <IconLink
                    Icon={Linkedin}
                    label="LinkedIn"
                    href="www.linkedin.com/in/rmucheri

"
                  />
                  <IconLink
                    Icon={Globe2}
                    label="Magetsi"
                    href="https://magetsi.co.zw"
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== Career Experience ===== */}
        <Section
          id="experience"
          title="Career Experience"
          kicker="Specialized knowledge & professional history"
        >
          <div className="relative">
            {/* timeline rail */}
            <div
              className={cx(
                "absolute left-3 top-2 bottom-2 w-px hidden md:block",
                theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
              )}
            />
            <div className="space-y-5">
              {careerExperience.map((job, idx) => (
                <motion.div
                  key={job.role + job.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="relative md:pl-10"
                >
                  {/* dot */}
                  <div
                    className={cx(
                      "absolute left-1.5 top-6 hidden md:flex h-3 w-3 rounded-full ring-4",
                      theme === "dark"
                        ? "bg-emerald-500 ring-black"
                        : "bg-emerald-500 ring-zinc-50"
                    )}
                  />
                  <div
                    className={cx(
                      "rounded-2xl border p-5 md:p-6 shadow-sm",
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/50"
                        : "border-zinc-200 bg-white"
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div
                          className={cx(
                            "text-lg font-semibold",
                            theme === "dark" ? "text-white" : "text-zinc-900"
                          )}
                        >
                          {job.role}
                        </div>
                        <div
                          className={cx(
                            "text-sm",
                            theme === "dark"
                              ? "text-emerald-400"
                              : "text-emerald-600"
                          )}
                        >
                          {job.company}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={cx(
                            "text-xs",
                            theme === "dark"
                              ? "text-zinc-400"
                              : "text-zinc-600"
                          )}
                        >
                          {job.period}
                        </div>
                        <div
                          className={cx(
                            "text-xs",
                            theme === "dark"
                              ? "text-zinc-500"
                              : "text-zinc-500"
                          )}
                        >
                          <MapPin
                            size={12}
                            className="inline-block mr-1 -mt-0.5"
                          />
                          {job.location}
                        </div>
                      </div>
                    </div>

                    <p
                      className={cx(
                        "mt-3 text-sm",
                        theme === "dark"
                          ? "text-zinc-300/90"
                          : "text-zinc-600"
                      )}
                    >
                      {job.blurb}
                    </p>

                    {job.highlights?.length > 0 && (
                      <ul
                        className={cx(
                          "mt-3 space-y-1.5 text-sm list-disc pl-5",
                          theme === "dark"
                            ? "text-zinc-300/90 marker:text-emerald-500"
                            : "text-zinc-600 marker:text-emerald-600"
                        )}
                      >
                        {job.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags?.map((t) => (
                        <span
                          key={t}
                          className={cx(
                            "rounded-full border px-2 py-0.5 text-[11px]",
                            theme === "dark"
                              ? "border-zinc-800/70 bg-zinc-800/30 text-zinc-300"
                              : "border-zinc-300 bg-zinc-100 text-zinc-700"
                          )}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== Ventures / Timeline ===== */}
        <Section
          id="ventures"
          title="Ventures & Milestones"
          kicker="What I build"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {ventures
                .filter((v) => v.highlight)
                .map((v) => (
                  <div
                    key={v.title}
                    className={cx(
                      "rounded-2xl border p-6",
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/50"
                        : "border-zinc-200 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-2 text-emerald-500 text-sm">
                      <Rocket size={16} /> Flagship
                    </div>
                    <div
                      className={cx(
                        "mt-2 text-xl font-semibold",
                        theme === "dark" ? "text-white" : "text-zinc-900"
                      )}
                    >
                      {v.title}
                    </div>
                    <div
                      className={cx(
                        "text-xs",
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      )}
                    >
                      {v.role} • {v.period}
                    </div>
                    <p
                      className={cx(
                        "mt-3 text-sm",
                        theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                      )}
                    >
                      {v.blurb}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {v.tags.map((t) => (
                        <span
                          key={t}
                          className={cx(
                            "rounded-full border px-2 py-0.5 text-[11px]",
                            theme === "dark"
                              ? "border-zinc-800/70 bg-zinc-800/30 text-zinc-300"
                              : "border-zinc-300 bg-zinc-100 text-zinc-700"
                          )}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {v.links?.live && (
                      <button
                        onClick={() => open(v.links.live)}
                        className={cx(
                          "mt-4 inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition-colors",
                          theme === "dark"
                            ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
                            : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200"
                        )}
                      >
                        <ExternalLink size={16} /> Visit site
                      </button>
                    )}
                  </div>
                ))}
            </div>
            <div className="relative">
              <div
                className={cx(
                  "absolute left-1 top-0 bottom-0 w-0.5",
                  theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
                )}
              />
              <div className="space-y-8 pl-6">
                {ventures.map((v) => (
                  <TimelineItem key={v.title} v={v} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ===== Projects w/ Filters ===== */}
        <Section
          id="projects"
          title="Selected Work"
          kicker="Builds & case studies"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={cx(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm",
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900/60 text-zinc-300"
                  : "border-zinc-300 bg-white text-zinc-700"
              )}
            >
              <Code2 size={16} /> Filter:
              <div className="flex flex-wrap gap-1">
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className={cx(
                      "rounded-full px-2 py-0.5 text-xs transition-colors",
                      tag === t
                        ? "bg-emerald-500 text-black"
                        : theme === "dark"
                        ? "text-zinc-300 hover:text-white"
                        : "text-zinc-600 hover:text-zinc-900"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, stacks, tags…"
              className={cx(
                "w-full md:w-80 rounded-xl border px-3 py-2 text-sm outline-none transition-colors",
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900/60 placeholder:text-zinc-500 focus:border-zinc-700 text-white"
                  : "border-zinc-300 bg-white placeholder:text-zinc-400 focus:border-zinc-400 text-zinc-900"
              )}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProjectCard key={p.name} p={p} onOpen={setModal} />
            ))}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {modal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cx(
                  "fixed inset-0 z-50 flex items-center justify-center p-4",
                  theme === "dark" ? "bg-black/70" : "bg-zinc-900/50"
                )}
                onClick={() => setModal(null)}
              >
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className={cx(
                    "w-full max-w-2xl rounded-2xl border p-6",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-950"
                      : "border-zinc-300 bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className={cx(
                          "text-xl font-semibold",
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        )}
                      >
                        {modal.name}
                      </div>
                      <div
                        className={cx(
                          "mt-1 text-sm",
                          theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                        )}
                      >
                        {modal.stack?.join(" • ")}
                      </div>
                    </div>
                    <button
                      onClick={() => setModal(null)}
                      className={cx(
                        "rounded-lg border px-2 py-1 text-sm transition-colors",
                        theme === "dark"
                          ? "border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                          : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                      )}
                    >
                      Close
                    </button>
                  </div>
                  <p
                    className={cx(
                      "mt-4 text-sm",
                      theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                    )}
                  >
                    {modal.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(modal.tags || []).map((t) => (
                      <span
                        key={t}
                        className={cx(
                          "rounded-full border px-2 py-0.5 text-[11px]",
                          theme === "dark"
                            ? "border-zinc-800/70 bg-zinc-800/30 text-zinc-300"
                            : "border-zinc-300 bg-zinc-100 text-zinc-700"
                        )}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    {modal.links?.live && (
                      <button
                        onClick={() => open(modal.links.live)}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-black"
                      >
                        <ExternalLink size={16} /> Live site
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        {/* ===== Services / Capabilities ===== */}
        <Section
          id="services"
          title="Services & Capabilities"
          kicker="What I can take off your plate"
        >
          <p
            className={cx(
              "-mt-2 mb-8 max-w-3xl text-sm md:text-base",
              theme === "dark" ? "text-zinc-300" : "text-zinc-700"
            )}
          >
            End‑to‑end delivery: design and build the product, put it on
            infrastructure that holds up, wire the domain and email correctly,
            make it findable, then keep it running. Engagements range from a
            one‑off DNS or email fix to architecting and operating a full
            enterprise platform.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.name} s={s} />
            ))}
          </div>

          <div className="mt-10">
            <div
              className={cx(
                "mb-3 text-xs uppercase tracking-widest",
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              Capabilities at a glance
            </div>
            <div className="flex flex-wrap gap-2">
              {capabilityPills.map((c) => (
                <span
                  key={c.name}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900/60 text-zinc-200"
                      : "border-zinc-300 bg-white text-zinc-700"
                  )}
                >
                  <c.icon size={13} className="text-emerald-500" />
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() =>
                open(
                  "mailto:rufaro@rufarodev.com?subject=Service%20inquiry"
                )
              }
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              <Mail size={16} /> Discuss a requirement
            </button>
          </div>
        </Section>

        {/* ===== Hire me / engagement terms ===== */}
        <Section
          id="hire"
          title="Hire a freelance developer"
          kicker="How working together works"
        >
          <p
            className={cx(
              "-mt-2 mb-8 max-w-3xl text-sm md:text-base",
              theme === "dark" ? "text-zinc-300" : "text-zinc-700"
            )}
          >
            I take on freelance and contract software development for clients in
            Calgary, across Canada, and remotely in the US, UK and Africa. No
            agency markup, no account manager — you work directly with the
            person writing the code.
          </p>

          {/* engagement models */}
          <div className="grid gap-5 md:grid-cols-3">
            {engagementModels.map((m) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35 }}
                className={cx(
                  "flex h-full flex-col rounded-2xl border p-6",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                )}
              >
                <div
                  className={cx(
                    "inline-flex w-fit rounded-xl p-2",
                    theme === "dark"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-600"
                  )}
                >
                  <m.icon size={18} />
                </div>
                <h3
                  className={cx(
                    "mt-3 text-lg font-semibold",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  {m.name}
                </h3>
                <div
                  className={cx(
                    "mt-1 text-xs font-medium",
                    theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                  )}
                >
                  {m.bestFor}
                </div>
                <p
                  className={cx(
                    "mt-3 text-sm",
                    theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                  )}
                >
                  {m.detail}
                </p>
                <ul
                  className={cx(
                    "mt-4 space-y-1.5 text-sm",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* typical project shapes + timelines */}
          <div className="mt-10">
            <div
              className={cx(
                "mb-3 text-xs uppercase tracking-widest",
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              Typical projects and how long they take
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projectShapes.map((p) => (
                <div
                  key={p.name}
                  className={cx(
                    "rounded-2xl border p-5",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900/40"
                      : "border-zinc-200 bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p.icon size={17} className="mt-0.5 text-emerald-500" />
                    <span
                      className={cx(
                        "rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
                        theme === "dark"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-emerald-500/30 bg-emerald-50 text-emerald-700"
                      )}
                    >
                      {p.duration}
                    </span>
                  </div>
                  <h3
                    className={cx(
                      "mt-3 font-semibold",
                      theme === "dark" ? "text-white" : "text-zinc-900"
                    )}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={cx(
                      "mt-2 text-sm",
                      theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                    )}
                  >
                    {p.blurb}
                  </p>
                </div>
              ))}
            </div>
            <p
              className={cx(
                "mt-3 text-xs",
                theme === "dark" ? "text-zinc-500" : "text-zinc-500"
              )}
            >
              Timelines are honest estimates from past builds, not guarantees.
              Yours gets a firm figure once the scope is agreed.
            </p>
          </div>

          {/* what's always included */}
          <div
            className={cx(
              "mt-10 rounded-3xl border p-6 md:p-8",
              theme === "dark"
                ? "border-emerald-500/25 bg-gradient-to-br from-zinc-900 to-emerald-950/25"
                : "border-emerald-500/25 bg-gradient-to-br from-white to-emerald-50"
            )}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3
                  className={cx(
                    "text-xl font-bold tracking-tight",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  Every engagement includes
                </h3>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {engagementIncludes.map((item) => (
                    <div
                      key={item}
                      className={cx(
                        "flex items-start gap-2 text-sm",
                        theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                      )}
                    >
                      <ShieldCheck
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition-colors hover:bg-emerald-400 lg:w-auto"
                >
                  <Mail size={16} /> Send a project brief
                </button>
                <p
                  className={cx(
                    "mt-2 text-center text-xs lg:text-left",
                    theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                  )}
                >
                  Reply within one business day
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== Cloud & DevOps ===== */}
        <Section
          id="cloud"
          title="Cloud, DevOps & Data Center"
          kicker="AWS Solutions Architect"
        >
          <div
            className={cx(
              "rounded-3xl border p-6 md:p-10 relative overflow-hidden",
              theme === "dark"
                ? "border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/30"
                : "border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-emerald-50"
            )}
          >
            {/* glow accents */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"
            />

            <div className="relative grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  <Cloud size={14} /> AWS · DevOps · Data Center
                </div>
                <h3
                  className={cx(
                    "mt-3 text-2xl md:text-3xl font-bold tracking-tight",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  From the rack to the region.
                </h3>
                <p
                  className={cx(
                    "mt-3 text-sm",
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  I architect production AWS workloads, run the CI/CD pipelines
                  that ship them, and operate the data‑center backbone that
                  keeps them online. Resilient, observable, and cost‑aware by
                  default.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Regions operated", value: "Multi", icon: Globe2 },
                    { label: "Uptime target", value: "99.9%", icon: ShieldCheck },
                    { label: "Deploys / week", value: "Daily", icon: Rocket },
                    { label: "Infra as code", value: "Yes", icon: Workflow },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={cx(
                        "rounded-xl border p-3",
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-900/60"
                          : "border-zinc-200 bg-white"
                      )}
                    >
                      <div className="flex items-center gap-2 text-emerald-500">
                        <s.icon size={16} />
                        <span className="text-[11px] uppercase tracking-wider">
                          {s.label}
                        </span>
                      </div>
                      <div
                        className={cx(
                          "mt-1 text-lg font-semibold",
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        )}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AWS service grid */}
              <div className="lg:col-span-2">
                <div
                  className={cx(
                    "text-xs uppercase tracking-widest mb-3",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  AWS Solutions Architect — services I ship with
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {awsServices.map((svc) => (
                    <motion.div
                      key={svc.name}
                      whileHover={{ y: -2 }}
                      className={cx(
                        "rounded-2xl border p-4 transition-colors",
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/40"
                          : "border-zinc-200 bg-white hover:border-emerald-500/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cx(
                            "rounded-lg p-2",
                            theme === "dark"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-emerald-50 text-emerald-600"
                          )}
                        >
                          <svc.icon size={18} />
                        </div>
                        <div
                          className={cx(
                            "font-semibold",
                            theme === "dark" ? "text-white" : "text-zinc-900"
                          )}
                        >
                          {svc.name}
                        </div>
                      </div>
                      <p
                        className={cx(
                          "mt-2 text-sm",
                          theme === "dark"
                            ? "text-zinc-400"
                            : "text-zinc-600"
                        )}
                      >
                        {svc.blurb}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* DevOps pills */}
                <div
                  className={cx(
                    "mt-6 text-xs uppercase tracking-widest mb-3",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  DevOps toolbelt
                </div>
                <div className="flex flex-wrap gap-2">
                  {devopsStack.map((d) => (
                    <span
                      key={d.name}
                      className={cx(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                        theme === "dark"
                          ? "border-zinc-800 bg-zinc-900/60 text-zinc-200"
                          : "border-zinc-300 bg-white text-zinc-700"
                      )}
                    >
                      <d.icon size={13} className="text-emerald-500" />
                      {d.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== Skills / Chart ===== */}
        <Section
          id="skills"
          title="Skills & Focus Areas"
          kicker="Breadth × depth"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div
              className={cx(
                "rounded-2xl border p-3",
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900/50"
                  : "border-zinc-300 bg-white/80"
              )}
            >
              <div
                className={cx(
                  "flex items-center gap-2 text-sm",
                  theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                )}
              >
                <ChartBar size={16} /> Tooling overview
              </div>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skills}
                    margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 12,
                        fill: theme === "dark" ? "#d4d4d8" : "#3f3f46",
                      }}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis
                      tick={{
                        fontSize: 12,
                        fill: theme === "dark" ? "#d4d4d8" : "#3f3f46",
                      }}
                      domain={[0, 100]}
                    />
                    <Tooltip cursor={{ fillOpacity: 0.1 }} />
                    <Bar
                      dataKey="value"
                      fill={theme === "dark" ? "#10b981" : "#059669"}
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div
              className={cx(
                "rounded-2xl border p-6",
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900/50"
                  : "border-zinc-200 bg-white"
              )}
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <Item icon={ShieldCheck} title="Production‑grade">
                    SSL/TLS, RBAC, audit trails, backups, monitoring.
                  </Item>
                  <Item icon={HardDrive} title="Data & infra">
                    Multi‑tenant design, S3/CloudFront, Render, PM2, Nginx.
                  </Item>
                  <Item icon={BookOpen} title="Docs & UX">
                    Clear copy, helpful error states, and admin workflows.
                  </Item>
                </div>
                <div className="space-y-3">
                  <Item icon={Timer} title="Fast iteration">
                    Ship weekly slices; measure impact; refine.
                  </Item>
                  <Item icon={Globe2} title="Web scale">
                    CDN‑first delivery with cache strategies.
                  </Item>
                  <Item icon={CheckCircle2} title="Outcome‑focused">
                    Revenue, reliability, and maintainability.
                  </Item>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-10">
            <div
              className={cx(
                "text-xs uppercase tracking-widest mb-3",
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              Certifications & Education
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className={cx(
                    "rounded-2xl border p-5 h-full",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900/50"
                      : "border-zinc-200 bg-white"
                  )}
                >
                  <div
                    className={cx(
                      "inline-flex items-center justify-center rounded-xl p-2 mb-3",
                      theme === "dark"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                    )}
                  >
                    <c.icon size={18} />
                  </div>
                  <div
                    className={cx(
                      "font-semibold",
                      theme === "dark" ? "text-white" : "text-zinc-900"
                    )}
                  >
                    {c.name}
                  </div>
                  <div
                    className={cx(
                      "text-xs",
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    )}
                  >
                    {c.issuer} · {c.year}
                  </div>
                  <p
                    className={cx(
                      "mt-2 text-sm",
                      theme === "dark"
                        ? "text-zinc-300/90"
                        : "text-zinc-600"
                    )}
                  >
                    {c.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== Core Principles ===== */}
        <Section
          id="principles"
          title="Core Engineering Principles"
          kicker="How the work gets done"
        >
          <p
            className={cx(
              "-mt-2 mb-8 max-w-3xl text-sm md:text-base",
              theme === "dark" ? "text-zinc-300" : "text-zinc-700"
            )}
          >
            These are the rules I hold to whether the job is a single Nginx
            config or a multi‑tenant platform. They come out of running
            production infrastructure at AWS scale, where the cost of shortcuts
            is measured in customer impact.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <PrincipleCard key={p.title} p={p} index={i} />
            ))}
          </div>

          <div
            className={cx(
              "mt-8 rounded-2xl border p-5 md:p-6",
              theme === "dark"
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-emerald-500/30 bg-emerald-50"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cx(
                  "rounded-xl p-2",
                  theme === "dark"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-100 text-emerald-700"
                )}
              >
                <BadgeCheck size={18} />
              </div>
              <div>
                <div
                  className={cx(
                    "font-semibold",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  The short version
                </div>
                <p
                  className={cx(
                    "mt-1 text-sm",
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  Build the simplest thing that meets the requirement, secure it
                  from the start, automate the repeatable parts, instrument what
                  matters, document it for the next person, and stay accountable
                  for it after launch.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== FAQ =====
            Native <details>/<summary>: answers stay in the DOM while
            collapsed, so crawlers read them and the FAQPage structured data in
            index.html matches visible content. Keep the copy in sync with the
            `faqs` array and the JSON-LD. */}
        <Section
          id="faq"
          title="Questions clients ask"
          kicker="Before you get in touch"
        >
          <div className="grid gap-3 lg:grid-cols-2">
            {faqs.map((item) => (
              <details
                key={item.q}
                className={cx(
                  "group rounded-2xl border p-5 transition-colors",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50 open:border-emerald-500/30"
                    : "border-zinc-200 bg-white open:border-emerald-500/30"
                )}
              >
                <summary
                  className={cx(
                    "flex cursor-pointer list-none items-start justify-between gap-4 font-semibold",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded",
                    theme === "dark"
                      ? "text-white focus-visible:ring-offset-zinc-900"
                      : "text-zinc-900 focus-visible:ring-offset-white"
                  )}
                >
                  <h3 className="text-base font-semibold">{item.q}</h3>
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-emerald-500 transition-transform group-open:rotate-90"
                  />
                </summary>
                <p
                  className={cx(
                    "mt-3 text-sm leading-relaxed",
                    theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                  )}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <p
            className={cx(
              "mt-6 text-sm",
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            )}
          >
            Something not covered here?{" "}
            <button
              onClick={() => scrollTo("contact")}
              className="font-semibold text-emerald-500 underline-offset-4 hover:underline"
            >
              Ask me directly
            </button>{" "}
            — I answer every enquiry personally.
          </p>
        </Section>

        {/* ===== Quote / intake questionnaire ===== */}
        <Section
          id="quote"
          title="Get a project quote"
          kicker="Intake questionnaire"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="min-w-0 lg:order-1">
              <QuoteForm />
            </div>

            {/* Why it's worth filling in */}
            <aside className="space-y-4 lg:order-2">
              <div
                className={cx(
                  "rounded-2xl border p-5",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                )}
              >
                <h3
                  className={cx(
                    "text-sm font-semibold",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  Why the long form?
                </h3>
                <p
                  className={cx(
                    "mt-2 text-sm",
                    theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                  )}
                >
                  A vague brief gets a vague number. The more of this you answer,
                  the closer my quote is to the real cost — and the fewer
                  surprises either of us hits later.
                </p>
                <ul
                  className={cx(
                    "mt-4 space-y-2 text-sm",
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  {[
                    "Takes about 5 minutes",
                    "Only a few fields are required",
                    "Saves as you go — refresh safe",
                    "Written proposal in 2 business days",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={cx(
                  "rounded-2xl border p-5",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                )}
              >
                <h3
                  className={cx(
                    "text-sm font-semibold",
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  )}
                >
                  Not ready for all that?
                </h3>
                <p
                  className={cx(
                    "mt-2 text-sm",
                    theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
                  )}
                >
                  Send a couple of sentences instead and I'll ask the questions
                  myself.
                </p>
                <button
                  onClick={() => scrollTo("contact")}
                  className={cx(
                    "mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                    theme === "dark"
                      ? "border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
                      : "border-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  )}
                >
                  <Mail size={15} /> Use the short form
                </button>
              </div>
            </aside>
          </div>
        </Section>

        {/* ===== Contact ===== */}
        <Section
          id="contact"
          title="Prefer a quick message?"
          kicker="Contact"
        >
          <p
            className={cx(
              "-mt-2 mb-8 max-w-3xl text-sm md:text-base",
              theme === "dark" ? "text-zinc-300" : "text-zinc-700"
            )}
          >
            Have a product, integration, or platform in mind? I can help scope,
            architect, and deliver it end‑to‑end — then run it like a service.
            Send a short brief and I’ll reply with options.
          </p>

          <ContactForm />

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "AWS Data Center Operations — Calgary, AB",
              "5+ years continuous Amazon / AWS tenure",
              "AWS Certified Cloud Practitioner",
              "Cloud Solutions Architect · DevOps Engineer",
              "Full‑Stack: React/Next, Node, Django",
              "U.S. build & enablement assignments",
            ].map((fact) => (
              <div
                key={fact}
                className={cx(
                  "flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900/40 text-zinc-300"
                    : "border-zinc-200 bg-white text-zinc-700"
                )}
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                {fact}
              </div>
            ))}
          </div>
        </Section>
        </main>

        {/* ===== Footer ===== */}
        <footer
          className={cx(
            "border-t py-8",
            theme === "dark" ? "border-zinc-900" : "border-zinc-200"
          )}
        >
          <div
            className={cx(
              "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-sm",
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            )}
          >
            <div>
              © {new Date().getFullYear()} Rufaro Mucheri — rufarodev.com
            </div>
            <div className="flex items-center gap-3">
              <IconLink
                Icon={Github}
                label="GitHub"
                href="https://github.com"
              />
              <IconLink
                Icon={Linkedin}
                label="LinkedIn"
                href="https://linkedin.com"
              />
            </div>
          </div>
        </footer>

        {/* Back to top */}
        <button
          onClick={() => scrollTo("home")}
          className={cx(
            "fixed bottom-6 right-6 z-40 rounded-full border p-3 shadow-lg transition-colors",
            theme === "dark"
              ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
          )}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

// ---------- Tiny bits ----------
function IconLink({ Icon, label, href }) {
  const { theme } = useTheme();
  return (
    <button
      onClick={() => open(href)}
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-colors",
        theme === "dark"
          ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
          : "border-zinc-300 bg-white hover:bg-zinc-100"
      )}
    >
      <Icon size={16} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function Item({ icon: Icon, title, children }) {
  const { theme } = useTheme();
  return (
    <div className="flex items-start gap-3">
      <div
        className={cx(
          "rounded-lg p-2",
          theme === "dark" ? "bg-zinc-800/60" : "bg-zinc-100"
        )}
      >
        <Icon
          size={16}
          className={theme === "dark" ? "text-white" : "text-zinc-700"}
        />
      </div>
      <div>
        <div
          className={cx(
            "font-medium",
            theme === "dark" ? "text-white" : "text-zinc-900"
          )}
        >
          {title}
        </div>
        <div
          className={cx(
            "text-sm",
            theme === "dark" ? "text-zinc-300/90" : "text-zinc-600"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden
      fill="currentColor"
    >
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 9H4v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8ZM5 9h14V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2Z" />
    </svg>
  );
}
