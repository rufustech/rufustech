import { useEffect, useMemo, useState, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  ChartBar,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Globe2,
  HardDrive,
  Layers,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Moon,
  Network,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Timer,
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
/* =========================================================
   RufaroDev — One‑Page SPA (Home.jsx)
   - Single file, production‑ready component
   - TailwindCSS, Framer Motion, Lucide, Recharts
   - Sticky nav + scroll spy, filters, modals, chart, animations
   - Uses only standard libs so you can drop into any CRA/Vite/Next project
   ========================================================= */

// ---------- Theme Context ----------
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// ---------- Helpers ----------
const cx = (...cls) => cls.filter(Boolean).join(" ");
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

// ---------- Data Center Operations (sanitized, public‑safe wording) ----------
const dataCenterExperience = [
  {
    title: "Production Data Center Operations",
    blurb:
      "Daily hardware diagnostics, break‑fix execution, ticket triage, and rack‑level troubleshooting across high‑density compute, storage, and network environments.",
    icon: Server,
  },
  {
    title: "Build, Deployment & Launch Readiness",
    blurb:
      "Rack receiving, rack‑and‑stack, structured cabling, fiber routing, link validation, and operational handover from build into steady‑state operations.",
    icon: Workflow,
  },
  {
    title: "Network Infrastructure Support",
    blurb:
      "Cisco 9300/9500 fabrics, spine/leaf and backbone/ring readiness, optical span validation, cross‑connect coordination with ISPs, and cable plant audits.",
    icon: Network,
  },
  {
    title: "Change Management & Operational Risk",
    blurb:
      "Change‑window execution, blast‑radius review, stakeholder coordination, backout planning, and post‑change validation in 24x7 production environments.",
    icon: ShieldCheck,
  },
  {
    title: "Major Incident Response",
    blurb:
      "Operational bridge participation, dependency identification, traffic remediation coordination, and root‑cause analysis follow‑up for high‑impact infrastructure events.",
    icon: Zap,
  },
  {
    title: "Secure Hardware Lifecycle",
    blurb:
      "Restricted‑zone equipment handling, secure media sanitization, RMA preparation, and decommissioning aligned with enterprise security and compliance standards.",
    icon: Lock,
  },
  {
    title: "Safety, Compliance & Auditing",
    blurb:
      "Site safety auditing, PPE compliance, physical security control verification, and access‑control audits supporting customer‑data protection requirements.",
    icon: BadgeCheck,
  },
  {
    title: "On‑Call Scheduling & Coverage",
    blurb:
      "On‑call rotation design across 24x7 shifts, workload balancing, and shift‑handoff continuity to maintain uninterrupted operational coverage.",
    icon: Timer,
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
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "ventures", label: "Ventures" },
    { id: "projects", label: "Projects" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

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
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={cx(
                    "rounded-full px-3 py-1 text-sm transition",
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
              <button
                onClick={() => open("mailto:rufaro@rufarodev.com")}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                    : "border-zinc-300 bg-white hover:bg-zinc-100"
                )}
              >
                <Mail size={16} /> Contact
              </button>
            </div>
          </div>
        </div>

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
                AWS Data Center Operations • Cloud Solutions Architect •
                DevOps • Full‑Stack
              </Kicker>
              <h1
                className={cx(
                  "mt-4 text-4xl md:text-6xl font-bold tracking-tight",
                  theme === "dark" ? "text-white" : "text-zinc-900"
                )}
              >
                Cloud‑native platforms and the data centers that{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  power them
                </span>
                .
              </h1>
              <p
                className={cx(
                  "mt-4 text-lg",
                  theme === "dark" ? "text-zinc-100" : "text-zinc-700"
                )}
              >
                I'm Rufaro — an all‑round IT professional with 5+ years at
                Amazon / AWS in Data Center Operations, plus a track record of
                shipping production software. I architect on AWS, run the
                DevOps pipelines, operate the racks and the network, and
                deliver the product. Flagships include{" "}
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
                  onClick={() => scrollTo("projects")}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black hover:bg-emerald-400 transition-all",
                    theme === "dark"
                      ? "hover:shadow-md hover:shadow-emerald-500/20"
                      : "hover:shadow-lg"
                  )}
                >
                  Explore work <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => scrollTo("cloud")}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all",
                    theme === "dark"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                      : "border-emerald-500/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  )}
                >
                  <Cloud size={18} /> Cloud & DevOps
                </button>
                <button
                  onClick={() => open("/Rufaro_Mucheri_Resume.pdf")}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-md hover:shadow-white/10"
                      : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 hover:shadow-lg"
                  )}
                >
                  Download résumé
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
                    alt="Rufaro Mucheri — placeholder portrait"
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
                  Technician IV with 5+ years at Amazon / AWS — plus a Cloud
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
                  Center Tech IV · Cloud Architect · DevOps
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

            {/* Data center experience */}
            <div className="relative mt-10">
              <div
                className={cx(
                  "text-xs uppercase tracking-widest mb-3",
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                )}
              >
                Data Center Operations — production AWS specialized knowledge
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {dataCenterExperience.map((d) => (
                  <motion.div
                    key={d.title}
                    whileHover={{ y: -3 }}
                    className={cx(
                      "rounded-2xl border p-5 h-full",
                      theme === "dark"
                        ? "border-zinc-800 bg-zinc-900/40"
                        : "border-zinc-200 bg-white"
                    )}
                  >
                    <div
                      className={cx(
                        "inline-flex items-center justify-center rounded-xl p-2 mb-3",
                        theme === "dark"
                          ? "bg-sky-500/10 text-sky-400"
                          : "bg-sky-50 text-sky-600"
                      )}
                    >
                      <d.icon size={18} />
                    </div>
                    <div
                      className={cx(
                        "font-semibold",
                        theme === "dark" ? "text-white" : "text-zinc-900"
                      )}
                    >
                      {d.title}
                    </div>
                    <p
                      className={cx(
                        "mt-2 text-sm",
                        theme === "dark"
                          ? "text-zinc-300/90"
                          : "text-zinc-600"
                      )}
                    >
                      {d.blurb}
                    </p>
                  </motion.div>
                ))}
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

        {/* ===== Contact ===== */}
        <Section
          id="contact"
          title="Let’s build something dependable"
          kicker="Contact"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className={cx(
                "md:col-span-2 rounded-2xl border p-6",
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900/50"
                  : "border-zinc-200 bg-white"
              )}
            >
              <p
                className={cx(
                  theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                )}
              >
                Have a product, integration, or platform in mind? I can help
                scope, architect, and deliver it end‑to‑end — then run it like a
                service. Send a short brief and I’ll reply with options.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="mailto:rufaro@rufarodev.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400 transition-colors"
                >
                  <Mail size={16} /> Email me
                </a>
                <a
                  href="tel:+1403XXXXXXX"
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 font-semibold transition-colors",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
                      : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900"
                  )}
                >
                  <Phone size={16} /> Call
                </a>
                <button
                  onClick={() => scrollTo("projects")}
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 font-semibold transition-colors",
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
                      : "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900"
                  )}
                >
                  <Briefcase size={16} /> View portfolio
                </button>
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
              <div
                className={cx(
                  "text-sm",
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                )}
              >
                Quick facts
              </div>
              <ul
                className={cx(
                  "mt-2 space-y-2 text-sm",
                  theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                )}
              >
                <li>AWS Data Center Technician IV — Calgary, AB</li>
                <li>5+ years continuous Amazon / AWS tenure</li>
                <li>AWS Certified Cloud Practitioner</li>
                <li>Cloud Solutions Architect · DevOps Engineer</li>
                <li>Full‑Stack: React/Next, Node, Django</li>
                <li>U.S. build & enablement assignments</li>
              </ul>
            </div>
          </div>
        </Section>

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
