import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  ChartBar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  HardDrive,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
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
  whiteoffice,
} from "../assets";
/* =========================================================
   RufaroDev — One‑Page SPA (Home.jsx)
   - Single file, production‑ready component
   - TailwindCSS, Framer Motion, Lucide, Recharts
   - Sticky nav + scroll spy, filters, modals, chart, animations
   - Uses only standard libs so you can drop into any CRA/Vite/Next project
   ========================================================= */

// ---------- Helpers ----------
const cx = (...cls) => cls.filter(Boolean).join(" ");
const open = (url) => window.open(url, "_blank", "noopener,noreferrer");
const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="scroll-mt-24 py-20 md:py-28">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {kicker && (
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-6">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

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
    title: "Magetsi",
    role: "Co‑founder & Sales Director",
    period: "2022 → Present",
    blurb:
      "Digital payments for Zimbabwe & diaspora — electricity tokens, airtime, data, insurance, licensing, and QR‑coded ticketing with real‑time dashboards.",
    tags: ["Fintech", "Payments", "AWS", "Security"],
    links: { live: "https://magetsi.co.zw" },
    highlight: true,
  },
  {
    title: "Skillbase",
    role: "Founder & Platform Architect",
    period: "2024 → Present",
    blurb:
      "Multi‑tenant HSE training & compliance SaaS: Courses, Quizzes, Certificates, Safety Meetings, Inspections, Incidents, AI policy Q&A, and more.",
    tags: ["SaaS", "HSE", "React", "Node", "MongoDB", "AWS"],
    links: { live: "https://safety.co.zw" },
    highlight: true,
  },
  {
    title: "Wildrose Placement Inc.",
    role: "Platform Engineer",
    period: "2022 → Present",
    blurb:
      "Product studio & venture lab delivering high‑impact web apps, integrations, and go‑to‑market experiments for startups and SMBs.",
    tags: ["Studio", "Product", "SaaS"],
    links: { live: "https://www.wildroseplacement.com/" },
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

  {
    title: "Voting App",
    role: "Platform Architect",
    period: "2025",
    blurb:
      "Free + paid voting with Stripe Checkout, webhook‑driven counting, anti‑bot controls, and dynamic leaderboards.",
    tags: ["Stripe", "Security", "Next.js", "MongoDB"],
    links: { live: "https://votes.co.zw/" },
    highlight: false,
  },
  {
    title: "Dispora Health Presciptions",
    role: "Platform Architect --- Work in Progress/Planning",
    period: "2025 →",
    blurb:
      "Diaspora‑to‑home prescription purchasing with pharmacy integrations, inventory/price sync, and regulatory compliance.",
    tags: ["Healthcare", "Compliance", "React.js", "Node"],
  },
];

const projects = [
  // Flagships
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
    links: { live: "https://safety.co.zw" },
    featured: true,
  },
  // Selected builds
  {
    name: "Wildrose Placement Inc",
    summary:
      "Job placement website with employer and candidate portals: post openings, search/filter jobs, apply with resumes, screening questionnaires, interview scheduling, and status notifications.",
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
    tags: ["Recruitment", "ATS", "Portal", "Full-Stack"],
    links: { live: "https://wildroseplacement.com" },
  },
  {
    name: "Voting App + Stripe",
    summary:
      "Stripe Checkout w/ metadata, webhook reconciliation, retry logic, and fraud‑resistant vote increments.",
    stack: ["Next.js", "Stripe", "MongoDB"],
    tags: ["Stripe", "Security"],
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
  {
    name: "Diaspora Health Prescriptions",
    summary:
      "Multi-pharmacy integration, inventory/price sync, order verification, and ZIMRA compliance workflows.",
    stack: ["Node", "Express", "MongoDB"],
    tags: ["Healthcare", "Compliance"],
  },
];

const skills = [
  { name: "React / Next.js", value: 92 },
  { name: "Node / Express", value: 91 },
  { name: "MongoDB / Mongoose", value: 88 },
  { name: "Django / Postgres", value: 78 },
  { name: "AWS (Amplify, S3, CloudFront, EC2)", value: 85 },
  { name: "DevOps (Nginx, Docker)", value: 80 },
  { name: "Stripe / Payments", value: 84 },
  { name: "Security & Compliance", value: 76 },
];

const toolTags = [
  "TailwindCSS",
  "Framer Motion",
  "Lucide Icons",
  "FullCalendar",
  "Render.com",
  "PM2",
  "Nginx",
  "Git / GitHub",
  "Vite",
  "Jest",
  "AOS",
  "MUI",
  "ShadCN (optionally)",
];

// ---------- Subcomponents ----------
function Kicker({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300">
      {Icon && <Icon size={14} className="opacity-80" />} {children}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950 to-zinc-900 p-4 shadow-lg">
      <div className="rounded-xl bg-zinc-800/50 p-2">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="text-xs text-zinc-400">{label}</div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(p)}
      whileHover={{ y: -4 }}
      className="group text-left rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-lg hover:border-zinc-700/80 focus:outline-none"
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-semibold text-white">{p.name}</h4>
        <ArrowRight className="shrink-0 opacity-60 group-hover:translate-x-1 transition" />
      </div>
      <p className="mt-2 text-sm text-zinc-300/90">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.stack?.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-800/70 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
      {p.featured && (
        <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-emerald-400">
          <BadgeCheck size={14} /> Featured
        </div>
      )}
    </motion.button>
  );
}

function TimelineItem({ v }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-1.5 top-1 h-2 w-2 rounded-full bg-emerald-400" />
      <div className="text-sm text-emerald-400">{v.period}</div>
      <div className="text-white font-semibold">{v.title}</div>
      <div className="text-xs text-zinc-400">{v.role}</div>
      <p className="mt-2 text-sm text-zinc-300/90">{v.blurb}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {v.tags?.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-800/70 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
      {v.links?.live && (
        <button
          onClick={() => open(v.links.live)}
          className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-100 hover:text-white"
        >
          <ExternalLink size={16} /> Visit
        </button>
      )}
    </div>
  );
}

// ---------- Main Component ----------
export default function Home() {
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [modal, setModal] = useState(null);
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "ventures", label: "Ventures" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

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
      { label: "Ventures", value: ventures.length, icon: Layers },
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

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* ===== Sticky Nav ===== */}
      <div className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <button
            onClick={() => scrollTo("home")}
            className="font-bold tracking-tight text-xl text-emerald-400"
          >
            Rufaro<span className="text-white text-md">Dev</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cx(
                  "rounded-full px-3 py-1 text-sm transition",
                  active === s.id
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-300 hover:text-white"
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => open("mailto:rufaro@rufarodev.com")}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm hover:bg-zinc-800"
            >
              <Mail size={16} /> Contact
            </button>
          </div>
        </div>
      </div>

      {/* ===== Hero ===== */}
      <section
        id="home"
        className="relative flex min-h-[72vh] items-center overflow-hidden bg-[radial-gradient(60rem_60rem_at_120%_-20%,rgba(16,185,129,0.16),transparent_40%),radial-gradient(40rem_40rem_at_-20%_10%,rgba(59,130,246,0.12),transparent_40%)]"
      >
        {/* Backdrop image shade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
            filter: "grayscale(40%) contrast(1.1)",
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
          <div className="max-w-3xl">
            
            <Kicker icon={Sparkles}>
              Systems Engineer • Full‑Stack Developer • Platform Architect •
              
            </Kicker>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white">
              Building reliable, revenue‑driven platforms — end to end.
            </h1>
            <p className="mt-4 text-lg text-zinc-100">
              I design, ship, and operate production software — React/Next.js
              frontends, Node/Django backends, and AWS‑powered infrastructure.
              From fintech and compliance to e‑commerce and research portals, I
              turn ideas into dependable products.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black hover:bg-emerald-400 hover:shadow-md hover:shadow-white"
              >
                Explore work <ArrowRight size={20} />
              </button>
              <button
                onClick={() => open("/Rufaro_Mucheri_Resume.pdf")}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 font-semibold text-white hover:bg-zinc-800 hover:shadow-md hover:shadow-white"
              >
                Download résumé
              </button>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <Section id="about" title="About Rufaro" kicker="Profile">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="prose prose-invert max-w-none">
              <p>
                Calgary‑based Systems Infrastructure Engineer and full‑stack
                builder with a Computer Science degree and hands‑on AWS
                experience (Amplify, S3, CloudFront, EC2, SES, SNS). I craft
                scalable platforms with clear UX, strong security, and practical
                monetization. Recent work spans multi‑tenant SaaS, payments,
                compliance, scheduling, and knowledge portals.
              </p>
              <ul>
                <li>
                  Fluent in React/Next.js, Node/Express, MongoDB/Mongoose, and
                  Django/Postgres.
                </li>
                <li>
                  DevOps: Nginx, PM2, Docker, Render.com, SSL/TLS, multi‑domain
                  DNS.
                </li>
                <li>
                  Payments: Stripe Checkout, webhooks, metadata, anti‑fraud
                  controls.
                </li>
                <li>
                  AI‑adjacent: vector search over policies; automated insights
                  and notifications.
                </li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {toolTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="opacity-80" /> Calgary, Canada
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <Briefcase size={16} className="opacity-80" /> Tech Director @
                Magetsi; Founder @ Skillbase
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <ShieldCheck size={16} className="opacity-80" /> Safety,
                compliance & security‑minded
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="text-sm text-zinc-400">Availability</div>
              <div className="text-white font-semibold">
                Consulting / Fractional Engineering
              </div>
              <button
                onClick={() =>
                  open("mailto:rufaro@rufarodev.com?subject=Project%20inquiry")
                }
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
              >
                Book a chat <CalendarIcon />
              </button>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="text-sm text-zinc-400 mb-2">Connect</div>
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
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <Rocket size={16} /> Flagship
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">
                    {v.title}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {v.role} • {v.period}
                  </div>
                  <p className="mt-3 text-sm text-zinc-300/90">{v.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {v.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-zinc-800/70 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {v.links?.live && (
                    <button
                      onClick={() => open(v.links.live)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
                    >
                      <ExternalLink size={16} /> Visit site
                    </button>
                  )}
                </div>
              ))}
          </div>
          <div className="relative">
            <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-zinc-800" />
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
          <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm">
            <Code2 size={16} /> Filter:
            <div className="flex flex-wrap gap-1">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={cx(
                    "rounded-full px-2 py-0.5 text-xs",
                    tag === t
                      ? "bg-emerald-500 text-black"
                      : "text-zinc-300 hover:text-white"
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
            className="w-full md:w-80 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-700"
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              onClick={() => setModal(null)}
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-white">
                      {modal.name}
                    </div>
                    <div className="mt-1 text-sm text-zinc-400">
                      {modal.stack?.join(" • ")}
                    </div>
                  </div>
                  <button
                    onClick={() => setModal(null)}
                    className="rounded-lg border border-zinc-800 px-2 py-1 text-sm text-zinc-300"
                  >
                    Close
                  </button>
                </div>
                <p className="mt-4 text-sm text-zinc-300/90">{modal.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(modal.tags || []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-800/70 bg-zinc-800/30 px-2 py-0.5 text-[11px] text-zinc-300"
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

      {/* ===== Skills / Chart ===== */}
      <Section
        id="skills"
        title="Skills & Focus Areas"
        kicker="Breadth × depth"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 ">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
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
                    tick={{ fontSize: 12 }}
                    angle={-15}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip cursor={{ fillOpacity: 0.1 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
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
      </Section>

      {/* ===== Contact ===== */}
      <Section
        id="contact"
        title="Let’s build something dependable"
        kicker="Contact"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-zinc-300">
              Have a product, integration, or platform in mind? I can help
              scope, architect, and deliver it end‑to‑end — then run it like a
              service. Send a short brief and I’ll reply with options.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="mailto:rufaro@rufarodev.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
              >
                <Mail size={16} /> Email me
              </a>
              <a
                href="tel:+1403XXXXXXX"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 font-semibold hover:bg-zinc-800"
              >
                <Phone size={16} /> Call
              </a>
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 font-semibold hover:bg-zinc-800"
              >
                <Briefcase size={16} /> View portfolio
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="text-sm text-zinc-400">Quick facts</div>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              <li>Systems Infrastructure Engineer (Calgary)</li>
              <li>Tech Director — Magetsi</li>
              <li>Founder — Skillbase</li>
              <li>Full‑stack: React/Next, Node, Django</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-sm text-zinc-400">
          <div>© {new Date().getFullYear()} Rufaro Mucheri — rufarodev.com</div>
          <div className="flex items-center gap-3">
            <IconLink Icon={Github} label="GitHub" href="https://github.com" />
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
        className="fixed bottom-6 right-6 z-40 rounded-full border border-zinc-800 bg-zinc-900 p-3 text-zinc-300 shadow-lg hover:bg-zinc-800"
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

// ---------- Tiny bits ----------
function IconLink({ Icon, label, href }) {
  return (
    <button
      onClick={() => open(href)}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 hover:bg-zinc-800"
    >
      <Icon size={16} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function Item({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-zinc-800/60 p-2">
        <Icon size={16} />
      </div>
      <div>
        <div className="font-medium text-white">{title}</div>
        <div className="text-sm text-zinc-300/90">{children}</div>
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
