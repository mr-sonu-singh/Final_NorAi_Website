import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import {
  AnimatedSection,
  Reveal,
  StaggerGrid,
  StaggerItem,
} from '@/components/foundation/AnimatedSection';
import { TextReveal } from '@/components/foundation/TextReveal';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Palette,
  TrendingUp,
  Bot,
  HeartHandshake,
  Terminal,
  Zap,
  Users,
  CheckCircle2,
  Lock,
  Code2,
  Layers,
} from 'lucide-react';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  path: '/team',
  title: 'Founding Leadership & Engineering Studio',
  description:
    'Meet Dhruw Singh, Sonu Singh, Annanta Singh, Rishabh Singh, and Gourav Singh—the founding team driving NorAI Technologies from Uttar Pradesh, India.',
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
  image: string;
  icon: React.ElementType;
}

const BUILDERS: TeamMember[] = [
  {
    id: 'dhruw-singh',
    name: 'Dhruw Singh',
    role: 'Founder & Head of Strategic Operations',
    discipline: 'Strategic Operations',
    pedigree: 'Retd. Indian Army (Corps of Signals) · 30 Years Military Service',
    bio: 'Leads institutional governance, operational security protocols, and state-level outreach with the same discipline that guided three decades of defense communications.',
    systemsOwned: [
      'Strategic Operations & Governance',
      'Institutional & State Outreach',
      'Operational SLAs & Security Guardrails',
    ],
    primaryStack: ['Defense Ops Rigor', 'Institutional Governance', 'Operational SLAs'],
    image: '/images/team/dhruw-singh.jpg',
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
    image: '/images/team/sonu-singh.jpg',
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
    image: '/images/team/annanta-singh.jpg',
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
      'Parchment & Terracotta Design Tokens',
      'Tactile Hardware UI Atoms & Molecules',
      'Motion & Micro-Interaction Curves',
    ],
    primaryStack: ['Design Systems', 'Tailwind CSS & Next.js 15', 'motion/react'],
    image: '/images/team/rishabh-singh.jpg',
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
    image: '/images/team/gourav-singh.jpg',
    icon: Bot,
  },
];

const OPERATING_RITUALS = [
  {
    number: '01',
    title: 'Founders write the code & answer support',
    tagline: 'Zero support queues · Direct engineer accountability',
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
    title: 'Shipped weekly on a deterministic rhythm',
    tagline: 'Continuous delivery · Real software every Monday',
    desc: 'We build lightweight, single-purpose utilities released on a steady rhythm. No vaporware or pitch decks behind NDAs—just reliable software you can use in production tomorrow.',
    icon: Zap,
  },
  {
    number: '04',
    title: 'Field Fridays across regional Uttar Pradesh',
    tagline: 'Grassroots ground truth · Real classroom testing',
    desc: 'Every Friday, our team visits regional colleges, polytechnics, and village clusters across Uttar Pradesh—testing our tools with first-generation students and everyday citizens.',
    icon: Users,
  },
];

const ENGINEERING_INVARIANTS = [
  {
    number: 'INVARIANT 01',
    title: 'Zero Data Retention',
    tagline: 'Ephemeral RAM isolation · 0 bytes retained',
    desc: 'User documents and query vectors process exclusively in ephemeral RAM containers. Once the response stream terminates, memory is zeroed. Client data is never retained or used for model training.',
    icon: Lock,
  },
  {
    number: 'INVARIANT 02',
    title: 'Typed Runtime Contracts',
    tagline: 'Strict Zod boundaries · Zero schema drift',
    desc: 'Every LLM output is validated against strict, versioned Zod schemas before returning to the caller. Hallucinations and malformed keys are caught and healed deterministically at the boundary.',
    icon: Code2,
  },
  {
    number: 'INVARIANT 03',
    title: 'Sub-Second Execution',
    tagline: 'P95 cold-start < 350ms · Native parallelism',
    desc: 'We aggressively eliminate overhead. Fast tokenizers, streaming responses, and pre-warmed inference workers ensure our tools respond at the speed of thought.',
    icon: Zap,
  },
];

export default function TeamPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
  ];

  const teamJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'NorAI Founding Leadership & Engineering Team',
    url: `${siteConfig.url}/team`,
    mainEntity: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: siteConfig.url,
      location: {
        '@type': 'Place',
        name: 'Uttar Pradesh, India',
      },
      member: BUILDERS.map((builder) => ({
        '@type': 'Person',
        name: builder.name,
        jobTitle: builder.role,
        description: builder.bio,
      })),
    },
  };

  return (
    <div className="text-text-primary min-h-screen font-sans bg-surface-canvas selection:bg-accent-primary selection:text-white">
      <JsonLd schema={teamJsonLd} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          SECTION 1: HERO & STUDIO CRAFT STAGE
          ========================================================================= */}
      <section className="relative pt-16 pb-14 md:pt-24 md:pb-20 border-b border-border-subtle overflow-hidden bg-surface-canvas">
        <Container size="default" className="relative z-10 space-y-12">
          <div className="max-w-4xl space-y-6 text-left">
            <Reveal delay={0} y={16}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Founding Leadership &amp; Engineering Studio · Uttar Pradesh</span>
              </div>
            </Reveal>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-text-primary leading-[1.02] tracking-display">
              <TextReveal text="Five engineers." as="span" /> <br />
              <span className="italic text-accent-primary font-normal">
                <TextReveal text="One standard." as="span" delay={0.2} />
              </span>
            </h1>

            <Reveal delay={0.2} y={18}>
              <p className="fluid-lead text-text-secondary leading-relaxed max-w-2xl font-normal text-pretty">
                Every pipeline authored, deployed, and supported directly by the five founding
                engineers in Uttar Pradesh. No corporate bureaucracy, no deflection queues—just
                grounded engineering from the heart of North India.
              </p>
            </Reveal>
          </div>

          {/* Hero Studio Photography Frame */}
          <Reveal delay={0.3} y={24}>
            <figure className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface-panel shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-panel-subtle">
                <Image
                  src="/images/team/studio-workshop.jpg"
                  alt="NorAI engineering studio workshop in Uttar Pradesh, India with founders collaborating at oak workbenches"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border-subtle bg-surface-panel/90 px-6 py-3.5 text-xs font-mono text-text-secondary text-left">
                <span>NorAI Engineering Studio · Uttar Pradesh, India</span>
                <span className="text-accent-primary font-medium">
                  Ground Truth, Hard Hardware, and Fast Code
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: ORIGIN STORY & GROUNDED PERSPECTIVE (Merged from /about)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 border-b border-border-subtle bg-surface-panel">
        <Container size="default">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Origin Narrative */}
            <Reveal className="space-y-6 lg:col-span-7 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>The Genesis &amp; Grounded Perspective</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                  Born from real <br />
                  <span className="italic text-accent-primary font-normal">
                    operational friction.
                  </span>
                </h2>
              </div>

              <div className="space-y-5 text-base md:text-lg leading-relaxed text-text-secondary text-pretty">
                <p>
                  NorAI began with a simple frustration. Resumes arrived faster than anyone could
                  read them—four hundred applicants for a single position, shortlisted by hand over
                  long weekends. Lecture recordings dissolved into chaotic screenshots across three
                  apps and were never found again.
                </p>
                <p>
                  None of these bottlenecks required a trillion-parameter general assistant. They
                  needed someone to sit down and build the{' '}
                  <strong className="text-text-primary font-medium">
                    focused, deterministic fix
                  </strong>
                  —and keep it running with sub-second speed and zero hallucination.
                </p>
                <p>
                  The first tool was our{' '}
                  <strong className="text-text-primary font-medium">AI Resume Shortlister</strong>,
                  engineered for our own hiring. It parsed candidate documents and returned a
                  structured, verified verdict in under 350 milliseconds. We shipped it, watched
                  teams rely on it daily, and doubled down on single-purpose utility.
                </p>
              </div>
            </Reveal>

            {/* Right: Candid Workshop Craft Photo */}
            <Reveal delay={0.2} className="lg:col-span-5">
              <figure className="overflow-hidden rounded-3xl border border-border-strong bg-surface-canvas shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-panel-subtle">
                  <Image
                    src="/images/about/origin-craft.jpg"
                    alt="NorAI engineers sketching architecture and reviewing code on an engineering desk"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <figcaption className="border-t border-border-subtle bg-surface-panel px-5 py-3 text-xs font-mono text-text-secondary text-left">
                  <span>Architecture review at the studio desk</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 3: THE 5 BUILDERS ROSTER (High-Craft Editorial Cards)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 border-b border-border-subtle bg-surface-canvas">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
              Core Engineering Team
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
              Meet the five builders.
            </h2>
            <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
              Direct engineer accountability. When you use a NorAI tool or scope a custom pipeline,
              you work directly with the person who authored the architecture.
            </p>
          </div>

          {/* Builder Cards Grid */}
          <StaggerGrid
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
            stagger={0.12}
          >
            {BUILDERS.map((builder, idx) => {
              const Icon = builder.icon;
              return (
                <StaggerItem
                  key={builder.id}
                  className={idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                >
                  <div className="p-2 rounded-3xl bg-surface-panel/40 border border-border-strong shadow-sm h-full flex flex-col justify-between hover:border-accent-primary/40 transition-colors">
                    <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-5 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Portrait & Discipline Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-border-subtle bg-surface-panel-subtle shrink-0">
                            <Image
                              src={builder.image}
                              alt={builder.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-panel-subtle border border-border-subtle text-[11px] font-mono text-accent-primary font-medium">
                            <Icon className="w-3 h-3" />
                            <span>{builder.discipline}</span>
                          </div>
                        </div>

                        {/* Name & Role */}
                        <div className="space-y-1">
                          <h3 className="font-display text-2xl text-text-primary font-normal">
                            {builder.name}
                          </h3>
                          <p className="text-xs font-mono text-accent-secondary font-medium">
                            {builder.role}
                          </p>
                        </div>

                        {/* Pedigree Pill */}
                        <div className="text-[11px] font-mono text-text-muted bg-surface-canvas border border-border-subtle rounded-lg px-2.5 py-1">
                          {builder.pedigree}
                        </div>

                        {/* Bio */}
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {builder.bio}
                        </p>
                      </div>

                      {/* Systems Owned & Stack */}
                      <div className="space-y-3 pt-4 border-t border-border-subtle">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                            Systems Owned:
                          </span>
                          <div className="space-y-1">
                            {builder.systemsOwned.map((sys) => (
                              <div
                                key={sys}
                                className="flex items-center gap-1.5 text-xs text-text-primary"
                              >
                                <CheckCircle2 className="w-3 h-3 text-accent-secondary shrink-0" />
                                <span className="text-[11px] font-medium leading-tight">{sys}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {builder.primaryStack.map((st) => (
                            <span
                              key={st}
                              className="px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-[10px] font-mono text-text-secondary"
                            >
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 4: THE 4 OPERATING RITUALS ("HOW WE BUILD")
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-surface-panel border-b border-border-subtle">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-secondary">
              Studio Operating Rigor
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
              Our four operating rituals.
            </h2>
            <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
              How five builders ship reliable, sub-second tools without corporate bloat or
              deflection tickets.
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" stagger={0.12}>
            {OPERATING_RITUALS.map((ritual) => {
              const Icon = ritual.icon;
              return (
                <StaggerItem key={ritual.number} className="h-full">
                  <div className="p-2 rounded-3xl bg-surface-canvas/80 border border-border-strong shadow-sm h-full flex flex-col justify-between hover:border-accent-primary/40 transition-colors">
                    <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-5 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-accent-primary px-2.5 py-0.5 rounded bg-accent-50 border border-accent-primary/20">
                            Ritual {ritual.number}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-surface-panel-subtle border border-border-subtle text-accent-primary flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="font-display text-2xl text-text-primary font-normal leading-snug">
                          {ritual.title}
                        </h3>

                        <p className="font-mono text-xs text-accent-primary font-medium">
                          {ritual.tagline}
                        </p>

                        <p className="text-sm text-text-secondary leading-relaxed">{ritual.desc}</p>
                      </div>

                      <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-accent-secondary font-semibold">
                        <span>Zero Deflection Principle</span>
                        <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 5: THREE ENGINEERING INVARIANTS
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-surface-canvas border-b border-border-subtle">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
              Deterministic Architecture
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
              Three engineering invariants.
            </h2>
            <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
              The architectural rules enforced on every pipeline, tool, and client deployment across
              the NorAI stack.
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" stagger={0.12}>
            {ENGINEERING_INVARIANTS.map((inv) => {
              const Icon = inv.icon;
              return (
                <StaggerItem key={inv.number} className="h-full">
                  <div className="p-2 rounded-3xl bg-surface-panel/40 border border-border-strong shadow-sm h-full flex flex-col justify-between hover:border-accent-primary/40 transition-colors">
                    <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-5 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-accent-secondary px-2.5 py-0.5 rounded bg-sage-100/70 border border-accent-secondary/20">
                            {inv.number}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-surface-panel-subtle border border-border-subtle text-accent-secondary flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="font-display text-2xl text-text-primary font-normal leading-snug">
                          {inv.title}
                        </h3>

                        <p className="font-mono text-xs text-accent-secondary font-medium">
                          {inv.tagline}
                        </p>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {inv.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                        <span>Strict Verification</span>
                        <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 6: CLOSING FOUNDER DISPATCH CONSOLE
          ========================================================================= */}
      <AnimatedSection
        as="aside"
        aria-label="Connect with our founders"
        className="py-20 md:py-28 bg-surface-panel"
      >
        <Container size="default">
          <div className="p-2 sm:p-3 rounded-3xl bg-surface-canvas/80 border border-border-strong shadow-lg">
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-8 sm:p-12 md:p-16 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(200,90,50,0.04)_0%,transparent_70%)]"
                aria-hidden="true"
              />

              <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 border border-accent-primary/25 text-accent-primary text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  <span>Direct Founder Dispatch</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                  Have an engineering challenge <br />
                  <span className="italic text-accent-primary font-normal">for our workshop?</span>
                </h2>

                <p className="fluid-body text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
                  Whether you need bespoke multi-agent RAG pipelines, air-gapped private inference,
                  or want to invite us to your regional campus—talk directly with our founding
                  engineers.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <MagneticButton strength={14} className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto justify-between group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer btn-tactile pl-6 pr-2.5 py-2.5"
                      >
                        <span className="font-semibold text-sm">Talk to the Engineering Team</span>
                        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 ml-3">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </Link>

                  <Link href="/products" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto justify-center hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer text-sm"
                    >
                      Explore 4 live tools
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
