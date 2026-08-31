import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import {
  AnimatedSection,
  Reveal,
  TextReveal,
  CountUp,
  StaggerGrid,
  StaggerItem,
} from '@/components/foundation';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Code2,
  HeartHandshake,
  Users,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { TeamWorkshopDirectory, TechnicalArtifactsLedger } from '@/components/organisms';

export const metadata = buildMetadata({
  path: '/team',
  title: 'Founding Leadership & Engineering Team',
  description:
    'Meet Dhruw Singh, Sonu Singh, Annanta Singh, Rishabh Singh, and Gourav Singh—the founding team driving NorAI Technologies from Uttar Pradesh, India.',
});

const TEAM_STATS = [
  {
    value: 5,
    suffix: '',
    label: 'Core Builders',
    detail: '100% in-house engineering, zero outsourced code',
  },
  {
    value: 100,
    suffix: '%',
    label: 'In-House Pipelines',
    detail: 'From MCP servers to Indic NLP distillation',
  },
  {
    value: 350,
    prefix: '<',
    suffix: 'ms',
    label: 'Cold-Start Latency SLA',
    detail: 'Sub-second deterministic tool execution',
  },
  {
    value: 75,
    suffix: '',
    label: 'UP Districts Scope',
    detail: 'Statewide AI Skill Mission outreach target',
  },
];

const OPERATING_RITUALS = [
  {
    number: '01',
    title: 'Founders write the code & answer support',
    tagline: 'Zero support queues · Direct engineer accountability',
    desc: 'We do not employ deflection bots or junior triage queues. When you suggest an improvement or report a parsing edge case, the person fixing it is the engineer who authored the schema.',
    icon: HeartHandshake,
  },
  {
    number: '02',
    title: 'Radical hardware honesty & exposed latency',
    tagline: 'Visible execution ms · Typed Zod schemas · No black boxes',
    desc: 'Every tool visibly displays its telemetry: exact parsing time in milliseconds, ephemeral RAM memory isolation status, and raw JSON payloads. Software should explain its mechanics transparently.',
    icon: Terminal,
  },
  {
    number: '03',
    title: 'Shipped weekly on a deterministic rhythm',
    tagline: 'Continuous delivery · Real software every Monday',
    desc: 'We build lightweight, single-purpose utilities released on a steady rhythm. No vaporware or pitch decks behind NDAs—just reliable software you can use in production tomorrow morning.',
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

const OPEN_DISCIPLINES = [
  {
    role: 'Systems & Inference Engineer',
    discipline: 'Core Architecture',
    focus: 'vLLM optimization, local model serving, ephemeral RAM isolation, sub-100ms vector index pipelines.',
    stack: ['Rust / C++', 'Python / vLLM', 'CUDA / GPU kernels', 'Linux Systems'],
  },
  {
    role: 'Applied Indic NLP Researcher',
    discipline: 'Linguistic Models',
    focus: 'Hindi and Indic vernacular model distillation, prompt schema compression, and tokenization benchmarks.',
    stack: ['PyTorch', 'LoRA / QLoRA', 'Indic NLP Tokenizers', 'HuggingFace'],
  },
  {
    role: 'Spatial & Immersive UI Engineer',
    discipline: 'Spatial Systems',
    focus: 'WebGPU shaders, spatial 3D interaction models, tactile UI components, and accessible keyboard ergonomics.',
    stack: ['WebGPU / Three.js', 'Next.js 15 / React 19', 'Tailwind CSS', 'motion/react'],
  },
];

export default function TeamPage() {
  const teamJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'NorAI Founding Leadership & Engineering Team',
    url: 'https://norai.asia/team',
    mainEntity: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: 'https://norai.asia',
      location: {
        '@type': 'Place',
        name: 'Uttar Pradesh, India',
      },
      member: [
        {
          '@type': 'Person',
          name: 'Dhruw Singh',
          jobTitle: 'Founder & Head of Strategic Operations',
          description:
            'Retd. Indian Army (Corps of Signals) after 30 years of distinguished military service. Leads strategic operations and administrative leadership.',
          knowsAbout: ['Strategic Defense Operations', 'Institutional Governance', 'Operational Security'],
        },
        {
          '@type': 'Person',
          name: 'Sonu Singh',
          jobTitle: 'Co-Founder & AR-VR / AI Engineer',
          description:
            'Returned from Japan VR/AR Summit. Specializes in spatial computing, immersive tech, and modern AI model pipelines.',
          knowsAbout: ['Spatial Computing', 'AR/VR', 'WebGPU', 'AI Model Pipelines'],
        },
        {
          '@type': 'Person',
          name: 'Annanta Singh',
          jobTitle: 'Digital Marketing Lead',
          description:
            'Drives brand development, inbound marketing pipelines, SEO strategies, and corporate client acquisition.',
          knowsAbout: ['Digital Marketing', 'Inbound Growth', 'SEO', 'Brand Positioning'],
        },
        {
          '@type': 'Person',
          name: 'Rishabh Singh',
          jobTitle: 'Design & Visualisation Lead',
          description:
            'Focuses on UI/UX architecture, visual rendering, interactive frontend design, and product aesthetics.',
          knowsAbout: ['UI/UX Architecture', 'Design Systems', 'Visual Rendering', 'Frontend Ergonomics'],
        },
        {
          '@type': 'Person',
          name: 'Gourav Singh',
          jobTitle: 'AI Engineer / Orchestration Lead',
          description:
            'Builds AI agents, workflows, and automation using modern AI models, ensuring smart, reliable, and scalable AI solutions.',
          knowsAbout: ['AI Agents', 'Deterministic Orchestration', 'LLM Workflows', 'Model Inference'],
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans selection:bg-accent-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />

      {/* SECTION 1: EDITORIAL WORKSHOP HERO & LIVE TELEMETRY */}
      <Section className="relative pt-16 pb-14 md:pt-24 md:pb-20 border-b border-[rgba(13,37,61,0.08)] overflow-hidden">
        {/* Archival paper top gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas-paper/70 to-transparent"
        />

        <Container size="default" className="relative z-10 space-y-12">
          <div className="max-w-4xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terra-50 border border-terra-500/20 text-terra-600 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founding Team &amp; Engineering Studio · Uttar Pradesh</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-display text-ink-primary">
              <TextReveal text="Five builders. One workshop in" as="span" /> <br />
              <span className="italic text-terra-500 font-normal">Uttar Pradesh.</span>
            </h1>

            <Reveal delay={0.2}>
              <p className="max-w-2xl fluid-lead leading-relaxed text-ink-body text-pretty font-normal">
                We build every tool ourselves, answer our own customer tickets, and deploy on a
                steady weekly rhythm. No corporate bureaucracy—just grounded engineering from the
                heart of North India.
              </p>
            </Reveal>
          </div>

          {/* Hero Studio Photography Frame */}
          <Reveal delay={0.3}>
            <figure className="relative overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-recessed">
                <Image
                  src="/images/team/studio-workshop.jpg"
                  alt="NorAI engineering studio workshop in Uttar Pradesh, India with founders collaborating at oak workbenches"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.01]"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper/90 px-5 py-3 text-xs font-mono text-ink-secondary text-left">
                <span>NorAI Engineering Studio · Uttar Pradesh, India</span>
                <span className="text-terra-600 font-medium">Ground Truth, Hard Hardware, and Fast Code</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Live Studio Telemetry Ribbon — Staggered entrance */}
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[rgba(13,37,61,0.08)]" stagger={0.12}>
            {TEAM_STATS.map((stat) => (
              <StaggerItem
                key={stat.label}
                className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-5 space-y-1 text-left hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="font-display text-3xl sm:text-4xl text-ink-primary font-normal flex items-baseline">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1.8}
                    className="font-display text-3xl sm:text-4xl text-ink-primary font-normal"
                  />
                </div>
                <div className="font-sans text-xs font-semibold text-ink-primary">
                  {stat.label}
                </div>
                <p className="font-mono text-[11px] text-ink-secondary leading-tight">
                  {stat.detail}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* SECTION 2: INTERACTIVE TEAM & DISCIPLINE DIRECTORY */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-base">
        <Container size="default">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-terra-600">
              The Engineering Workshop Roster
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Meet the five builders.
            </Heading>
            <p className="text-base text-ink-body">
              Filter by discipline, toggle between Bento Cards and Systems Matrix view, or click on
              any builder to inspect their architecture profile and owned systems.
            </p>
          </div>

          {/* Interactive Team Directory Organism */}
          <TeamWorkshopDirectory />
        </Container>
      </Section>

      {/* SECTION 3: THE 4 WORKSHOP OPERATING RITUALS ("HOW WE BUILD") — Staggered grid */}
      <Section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sage-700">
              Studio Operating Rigor
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Our four engineering rituals.
            </Heading>
            <p className="text-base text-ink-body">
              How five builders ship reliable, sub-second tools without corporate bloat or deflection
              tickets.
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" stagger={0.12}>
            {OPERATING_RITUALS.map((ritual) => {
              const Icon = ritual.icon;
              return (
                <StaggerItem
                  key={ritual.number}
                  className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-8 shadow-xs hover:shadow-lg hover:border-terra-500/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-default"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-canvas-sunken text-terra-600 border border-terra-500/20">
                        Ritual {ritual.number}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-terra-50 border border-terra-500/20 text-terra-600 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display text-2xl text-ink-primary font-normal">
                      {ritual.title}
                    </h3>

                    <p className="font-mono text-xs text-terra-600">
                      {ritual.tagline}
                    </p>

                    <p className="text-sm text-ink-body leading-relaxed">
                      {ritual.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs font-mono text-sage-700 font-semibold">
                    <span>Zero Deflection Principle</span>
                    <CheckCircle2 className="w-4 h-4 text-sage-600" />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </Section>

      {/* SECTION 4: PUBLISHED TECHNICAL PROTOCOLS & SCHEMAS */}
      <Section className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-terra-600">
              Published Engineering Artifacts
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Internal schemas &amp; protocols.
            </Heading>
            <p className="text-base text-ink-body">
              The typed Zod contracts and open specifications authored by our team to guarantee zero
              schema drift, sub-second execution, and spatial interaction accuracy.
            </p>
          </div>

          {/* Technical Artifacts Ledger Organism */}
          <TechnicalArtifactsLedger />
        </Container>
      </Section>

      {/* SECTION 5: STUDIO HIRING CREED & OPEN DISCIPLINES — Staggered grid */}
      <Section className="py-20 md:py-28 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ochre-50 border border-ochre-500/20 text-ochre-700 text-xs font-mono font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Studio Craft &amp; Talent Ethos</span>
            </div>

            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              We hire for judgment, not pedigree.
            </Heading>

            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              Degrees don&rsquo;t build deterministic tools; taste, operational discipline, and
              follow-through do. If you have shipped something you are proud of, we would like to
              read your code and see your pull requests more than your CV.
            </p>
          </div>

          {/* 3 Active Discipline Cards — Staggered entrance with hover lift */}
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" stagger={0.14}>
            {OPEN_DISCIPLINES.map((disc) => (
              <StaggerItem
                key={disc.role}
                className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-7 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg hover:border-terra-500/30 hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-canvas-sunken border border-[rgba(13,37,61,0.08)] text-terra-600 font-semibold uppercase tracking-wider">
                    {disc.discipline}
                  </span>

                  <h3 className="font-display text-2xl text-ink-primary font-normal pt-1">
                    {disc.role}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                    {disc.focus}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[rgba(13,37,61,0.08)]">
                  <div className="flex flex-wrap gap-1.5">
                    {disc.stack.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)] text-[10px] font-mono text-ink-primary"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  <NextLink
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-terra-600 hover:text-terra-700 transition-colors group/link pt-1"
                  >
                    <span>Send us your code &amp; work</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </NextLink>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* SECTION 6: CLOSING CONVERSION CTA */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center space-y-6 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <h2 className="mx-auto max-w-xl font-display text-4xl sm:text-5xl font-normal leading-tight text-ink-primary">
              Have an engineering challenge for our workshop?
            </h2>
            <p className="max-w-md mx-auto text-sm text-ink-body leading-relaxed">
              Whether you need high-volume automated resume screening, bespoke multi-agent RAG
              pipelines, or want to invite us to your campus—talk directly to our founders.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-line-default bg-canvas-base px-6 py-3 font-sans text-sm font-semibold text-ink-primary hover:bg-canvas-sunken hover:-translate-y-0.5 transition-all shadow-sm active:scale-[0.96]"
              >
                <span>Test our 4 live tools</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>
              <NextLink
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-terra-500 px-6 py-3 font-sans text-sm font-semibold text-white hover:bg-terra-600 transition-all shadow-sm hover:-translate-y-0.5 active:scale-[0.96]"
              >
                Talk to the engineering team &rarr;
              </NextLink>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
