import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Palette,
  TrendingUp,
  Bot,
  HeartHandshake,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/team',
  title: 'The Builders & Engineering Ethos — Built to change what happens',
  description:
    'Meet Dhruw Singh, Sonu Singh, Annanta Singh, Rishabh Singh, and Gourav Singh—the founding engineering team driving NorAI Technologies from Uttar Pradesh, India.',
});

interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: string;
  pedigree: string;
  bio: string;
  systemsOwned: string[];
  primaryStack: string[];
  icon: React.ElementType;
}

const BUILDERS: TeamMember[] = [
  {
    id: 'dhruw-singh',
    name: 'Dhruw Singh',
    role: 'Founder & Head of Strategic Operations',
    discipline: 'Strategic Operations',
    pedigree: 'Retd. Indian Army (Corps of Signals) · 30 Years Defense Service',
    bio: 'Directs institutional governance, operational security protocols, and state-level outreach with the same discipline that guided three decades of military communications.',
    systemsOwned: [
      'Strategic Operations & Governance',
      'Institutional & State Outreach',
      'Operational SLAs & Security Guardrails',
    ],
    primaryStack: ['Defense Ops Rigor', 'Institutional Governance', 'Operational SLAs'],
    icon: ShieldCheck,
  },
  {
    id: 'sonu-singh',
    name: 'Sonu Singh',
    role: 'Co-Founder & Spatial AI / Systems Engineer',
    discipline: 'Spatial Systems & AR/VR',
    pedigree: 'Spatial Computing Specialist · Japan VR/AR Summit Finalist',
    bio: 'Specializes in spatial computing, WebGPU shaders, and tactile 3D interaction models, bridging the boundary between physical environments and model inference.',
    systemsOwned: [
      'Spatial Computing Engine',
      'Immersive 3D Interaction Pipeline',
      'WebGPU & Spatial Shaders',
    ],
    primaryStack: ['Spatial Computing', 'WebGPU & Three.js', 'Python / vLLM'],
    icon: Cpu,
  },
  {
    id: 'annanta-singh',
    name: 'Annanta Singh',
    role: 'Digital Marketing & Growth Lead',
    discipline: 'Digital Marketing & Inbound',
    pedigree: 'Brand Development & Inbound Growth Specialist',
    bio: 'Architects customer acquisition funnels, technical search visibility, and enterprise partnership ecosystems to get NorAI tools into production workflows.',
    systemsOwned: [
      'Inbound Acquisition Engine',
      'Product Positioning Strategy',
      'Technical SEO & B2B Client Pipelines',
    ],
    primaryStack: ['Inbound Growth Funnels', 'Technical SEO', 'B2B Client Pipelines'],
    icon: TrendingUp,
  },
  {
    id: 'rishabh-singh',
    name: 'Rishabh Singh',
    role: 'Design & Visualisation Lead',
    discipline: 'Design & UI/UX Architecture',
    pedigree: 'UI/UX Architect & Visual Rendering Specialist',
    bio: 'Designs tactile, high-craft interfaces, fluid spring physics, and accessible typography, ensuring every software surface feels as substantial as a physical tool.',
    systemsOwned: [
      'High-Craft Design Tokens',
      'Tactile Hardware UI Atoms & Molecules',
      'Motion & Micro-Interaction Curves',
    ],
    primaryStack: ['Design Systems', 'Tailwind CSS & Next.js 15', 'motion/react'],
    icon: Palette,
  },
  {
    id: 'gourav-singh',
    name: 'Gourav Singh',
    role: 'AI Engineer / Orchestration Lead',
    discipline: 'AI Orchestration & Agent Systems',
    pedigree: 'Agent Systems Architect & Autonomous Workflows Specialist',
    bio: 'Builds deterministic multi-agent state machines, structured Zod runtime boundaries, and sub-second tool execution pipelines with zero hallucination.',
    systemsOwned: [
      'Deterministic Agent State Machines',
      'Structured Zod Runtime Contracts',
      'Sub-Second Ingestion & Extraction Engines',
    ],
    primaryStack: ['TypeScript & Next.js App Router', 'vLLM / Ollama Serving', 'Zod Schemas'],
    icon: Bot,
  },
];

const RITUALS = [
  {
    number: '01',
    title: 'Founders write the code & answer technical questions',
    tagline: 'Zero support deflection · Direct engineer accountability',
    desc: 'We do not employ deflection bots or junior triage queues. When you suggest an improvement or report a parsing edge case, the engineer who authored the schema fixes it.',
    icon: HeartHandshake,
  },
  {
    number: '02',
    title: 'Radical hardware honesty & exposed latency',
    tagline: 'Visible execution ms · Typed Zod schemas · No black boxes',
    desc: 'Every tool displays its telemetry: exact parsing time in milliseconds, ephemeral RAM isolation status, and raw JSON payloads. Software should explain its mechanics transparently.',
    icon: Terminal,
  },
  {
    number: '03',
    title: 'Rapid improvements, shipped frequently',
    tagline: 'Short feedback loops · Constant iteration · Weekly releases',
    desc: 'We deploy in tight, verifiable cycles. Our clients receive direct Git commits, benchmark logs, and release notes instead of quarterly committee slide decks.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Upskilling local communities across 75 districts',
    tagline: '100% free campus workshops · Vernacular literacy · ₹0 cost',
    desc: 'Every commercial deployment subsidizes free computational literacy workshops, open-weight student models, and localized Hindi tooling across Uttar Pradesh.',
    icon: ShieldCheck,
  },
];

export default function TeamPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/team' },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          HERO CHAMBER (.phero)
          ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]">
        {/* Soft Organic Aurora Glow Orbs */}
        <div
          className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15"
          aria-hidden="true"
        />
        <div
          className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12"
          aria-hidden="true"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-4xl space-y-6 text-left">
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono text-[var(--pine)]">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span className="tracking-wide uppercase font-medium">
                05 · THE BUILDERS &amp; ARCHITECTURAL ETHOS · DIRECT ACCESS
              </span>
            </div>

            {/* Kinetic Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight">
              Built to change what happens. <br />
              <span className="relative inline-block text-[var(--mint-ink)]">
                Direct access to the builders.
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]"
                  viewBox="0 0 240 40"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 33C50 12 150 5 237 22"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
              We are an engineering studio headquartered in Uttar Pradesh. We design, benchmark,
              and deploy autonomous tools and private enterprise intelligence with mathematical precision.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          THE BUILDERS ROSTER
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--pine)]/60 uppercase tracking-wider font-semibold block">
              FOUNDING STUDIO ENGINEERS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-tight">
              The people who write the code.
            </h2>
            <p className="text-sm sm:text-base text-[var(--pine)]/75">
              Zero executive insulation. Each engineer directly owns production runtime services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {BUILDERS.map((builder) => {
              const BuilderIcon = builder.icon;
              return (
                <div
                  key={builder.id}
                  className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xs group hover:shadow-lg transition-all duration-200"
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--porcelain)] border border-[var(--line)] flex items-center justify-center text-[var(--pine)]">
                          <BuilderIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-extrabold text-[var(--pine)]">
                            {builder.name}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-[var(--mint-ink)] block">
                            {builder.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--pine-08)] text-[var(--pine)]/70">
                        {builder.discipline}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs font-mono text-[var(--pine)]/60">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--pine)]/40 block">
                        PEDIGREE
                      </span>
                      <p>{builder.pedigree}</p>
                    </div>

                    <p className="text-sm text-[var(--pine)]/80 leading-relaxed font-normal">
                      {builder.bio}
                    </p>

                    <div className="pt-3 border-t border-[var(--line)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--pine)]/50 font-bold block">
                        SYSTEMS OWNED:
                      </span>
                      <div className="space-y-1">
                        {builder.systemsOwned.map((sys, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-[var(--pine)]/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--mint-ink)] shrink-0" />
                            <span>{sys}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--line)] flex flex-wrap gap-1.5">
                    {builder.primaryStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--porcelain)] text-[var(--pine)]/80 border border-[var(--line)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          OPERATING RITUALS
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--pine)]/60 uppercase tracking-wider font-semibold block">
              OPERATIONAL RITUALS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-tight">
              How we work with clients and code.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RITUALS.map((ritual) => {
              const RitualIcon = ritual.icon;
              return (
                <div
                  key={ritual.number}
                  className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                      <span className="font-mono text-xs font-bold text-[var(--pine)]/60">
                        {ritual.number}
                      </span>
                      <RitualIcon className="w-4 h-4 text-[var(--mint-ink)]" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[var(--pine)] leading-snug">
                      {ritual.title}
                    </h3>
                    <span className="text-xs font-mono text-[var(--mint-ink)] block font-semibold">
                      {ritual.tagline}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed">
                      {ritual.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CLOSING CONIC DISPATCH (.gradient-card)
          ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="gradient-card max-w-4xl mx-auto text-center">
            <div className="gradient-card__inner p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--mint)]/20 border border-[var(--mint-ink)]/20 text-xs font-mono font-bold text-[var(--mint-ink)] dark:text-[var(--mint)] uppercase tracking-wider">
                Direct Engineering Collaboration
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] dark:text-[var(--bone)] tracking-tight leading-tight">
                Work directly with our founders.
              </h2>

              <p className="text-base sm:text-lg text-[var(--pine)]/75 dark:text-[var(--bone-70)] max-w-2xl mx-auto leading-relaxed font-normal">
                Whether you need dedicated enterprise deployment, private on-premise model enclaves,
                or want to partner on grassroots AI research, our core builders are ready.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn btn--solid w-full sm:w-auto h-12 px-7 text-sm font-semibold shadow-md"
                >
                  <span>Talk to an Engineer</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="btn btn--ghost w-full sm:w-auto h-12 px-6 text-sm font-medium"
                >
                  <span>Explore 4 live tools &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
