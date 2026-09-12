import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Reveal } from '@/components/foundation/AnimatedSection';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  Cpu,
} from 'lucide-react';
import { HeroStudioWorkbench } from '@/components/organisms';
import { buildMetadata, getOrganizationJsonLd, getLocalBusinessJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'NorAI Technologies — Intelligence Meets Action',
  description:
    'Four single-purpose AI tools. Sub-second execution, zero data retention, and clean, reliable outputs. Engineered in Uttar Pradesh, India.',
});

const TOOLS_ARC = [
  {
    number: '01',
    badge: 'v1.0',
    slug: 'resume-shortlister',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
    tagline: 'Screen hundreds of engineering resumes in seconds with sub-second vector scoring and weighted skills matching.',
    metric: '< 0.35s / PDF',
    icon: FileText,
  },
  {
    number: '02',
    badge: 'v1.0',
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    tagline: 'Transform raw lecture recordings, videos, and slides into structured study outlines, LaTeX math, and flashcards.',
    metric: 'Real-Time Audio NLP',
    icon: Headphones,
  },
  {
    number: '03',
    badge: 'v1.0',
    slug: 'chat-digest',
    title: 'Community Chat Digest',
    category: 'Community AI',
    tagline: 'Condense thousands of unread Discord, Slack, and Telegram messages into 2-minute executive action briefs.',
    metric: '2m Executive Brief',
    icon: MessageSquare,
  },
  {
    number: '04',
    badge: 'v1.0',
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    tagline: 'Hyper-local public employment alerts and government gazette notifications clustered across Hindi and English feeds.',
    metric: 'Bilingual NLP',
    icon: Newspaper,
  },
];

const OPERATING_RITUALS = [
  {
    number: '01',
    title: 'Founders write the code & answer support',
    tagline: 'Zero deflection queues · Direct engineer accountability',
    desc: 'We do not employ deflection bots or ticket tiers. When you report an edge case or request a pipeline feature, the engineer who authored the schema fixes it.',
  },
  {
    number: '02',
    title: 'Hardware honesty, exposed latency',
    tagline: 'Visible execution ms · Typed Zod schemas · No black boxes',
    desc: 'Every tool displays its telemetry: exact parsing time in milliseconds, ephemeral RAM isolation status, and raw JSON payloads. Software should explain its mechanics transparently.',
  },
  {
    number: '03',
    title: 'Shipped weekly on a deterministic rhythm',
    tagline: 'Continuous delivery · Real software every Monday',
    desc: 'We build lightweight, single-purpose utilities released on a steady rhythm. No vaporware or pitch decks behind NDAs—just reliable software you can use in production tomorrow.',
  },
  {
    number: '04',
    title: 'Field Fridays across Uttar Pradesh',
    tagline: 'Grassroots ground truth · Real classroom testing',
    desc: 'Every Friday, our team visits regional colleges, polytechnics, and village clusters across Uttar Pradesh—testing our tools with first-generation students and everyday citizens.',
  },
];

export default function HomePage() {
  return (
    <div className="text-text-primary min-h-screen font-sans selection:bg-accent-primary selection:text-white">
      <JsonLd schema={getOrganizationJsonLd()} />
      <JsonLd schema={getLocalBusinessJsonLd()} />

      {/* =========================================================================
          BEAT 1: HERO COMMAND STAGE
          Terminal Living Workbench + Direct Proposition + Static Trust Chips
          ========================================================================= */}
      <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 md:pt-14 md:pb-16 overflow-hidden bg-surface-canvas border-b border-border-subtle">
        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column (6 cols on desktop) */}
            <div className="lg:col-span-6 space-y-5 text-left">
              {/* Borderless Minimalist Eyebrow */}
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                NorAI Technologies · Tools · Services · Studio
              </p>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-text-primary leading-[1.05] tracking-display text-balance">
                Intelligence <br />
                <span className="italic text-accent-primary font-normal">Meets Action.</span>
              </h1>

              {/* Audience-Readable Subhead */}
              <Reveal delay={0.15} y={12}>
                <p className="fluid-lead text-text-secondary font-normal leading-relaxed max-w-xl text-pretty">
                  Four single-purpose AI tools. Sub-second execution, zero data retention, and clean, reliable outputs. Engineered in Uttar Pradesh for teams that reject black-box magic.
                </p>
              </Reveal>

              {/* Primary Actions */}
              <Reveal delay={0.25} y={12}>
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href="/products" className="w-full sm:w-auto">
                    <MagneticButton strength={12} className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto justify-center group active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
                      >
                        <span>Start Free Sandbox</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </MagneticButton>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto justify-center active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
                    >
                      Enterprise Services &rarr;
                    </Button>
                  </Link>
                </div>
              </Reveal>

              {/* Two Static Trust Chips (CLS = 0, no hydration zeros) */}
              <Reveal delay={0.35} y={10}>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-panel border border-border-subtle">
                    <Zap className="w-3.5 h-3.5 text-accent-primary" />
                    <span>P95 &lt; 0.35s Latency</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-panel border border-border-subtle">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
                    <span>0 Bytes Data Retained</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Product Demo: Multi-Tool Living Sandbox (6 cols on desktop) */}
            <div className="lg:col-span-6 relative">
              <Reveal delay={0.2} y={16}>
                <HeroStudioWorkbench />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 2: TOOLS CAPABILITY ARC (Audens-Style Router)
          Scannable, compact, non-duplicative routing arc
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-surface-panel border-b border-border-subtle" id="capabilities">
        <Container size="default">
          <div className="max-w-2xl mb-12 text-left space-y-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
              The Capability Arc
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-tight">
              Purpose-built tools. <br />
              <span className="font-medium text-text-primary">Zero operational drag.</span>
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl text-pretty">
              Each utility solves exactly one operational bottleneck with deterministic accuracy, sub-second speed, and ephemeral memory isolation.
            </p>
          </div>

          {/* Scalable Capability Arc List */}
          <div className="divide-y divide-border-subtle border-t border-b border-border-subtle">
            {TOOLS_ARC.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.slug}
                  className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-surface-canvas/40 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-lg transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <span className="font-mono text-xs font-bold text-accent-primary shrink-0 pt-0.5 sm:pt-0">
                      {tool.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-surface-panel-subtle flex items-center justify-center text-text-primary shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-sans text-base sm:text-lg font-semibold text-text-primary">
                          {tool.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-canvas border border-border-subtle text-text-secondary">
                          {tool.badge}
                        </span>
                        <span className="text-xs text-text-muted hidden sm:inline">·</span>
                        <span className="text-xs text-text-muted hidden sm:inline">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed max-w-2xl text-pretty">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-8 md:pl-0">
                    <span className="font-mono text-xs text-accent-secondary font-medium tabular-nums">
                      {tool.metric}
                    </span>
                    <Link
                      href={`/products/${tool.slug}`}
                      className="font-medium text-xs sm:text-sm text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group/link"
                    >
                      <span>Open Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex items-center justify-between text-xs font-mono text-text-muted">
            <span>Free to start · 50 sandbox credits · No card required</span>
            <Link href="/products" className="text-text-secondary hover:text-accent-primary transition-colors">
              Explore All Tools &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 3: OPERATING RITUALS (How We Build Software)
          Scannable, Calm Four-Card Row Replacing Team Roster
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-surface-canvas border-b border-border-subtle" id="operating-rituals">
        <Container size="default">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                  Engineering Operating Rituals
                </p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-tight">
                  How we build software.
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed text-pretty">
                  Four operating rituals that separate NorAI engineering from slide decks and wrappers.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/team"
                  className="font-medium text-xs sm:text-sm text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 group"
                >
                  <span>Meet the founding team on /team</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {OPERATING_RITUALS.map((ritual) => (
                <div
                  key={ritual.number}
                  className="p-5 sm:p-6 rounded-2xl bg-surface-panel border border-border-subtle hover:border-border-strong transition-all flex flex-col justify-between text-left space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                      <span className="font-mono text-xs font-bold text-accent-primary">
                        {ritual.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-normal text-text-primary group-hover:text-accent-primary transition-colors leading-snug">
                      {ritual.title}
                    </h3>
                    <p className="font-mono text-[11px] text-accent-secondary font-medium leading-relaxed">
                      {ritual.tagline}
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {ritual.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-text-muted border-t border-border-subtle pt-6">
              <span>Uttar Pradesh, India · 100% In-House Engineering</span>
              <span className="text-accent-primary font-medium">Deterministic Schemas · Zero Synthetic Hype</span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 4: SERVICES INVITATION LINE
          Single calm horizontal invitation bar
          ========================================================================= */}
      <section className="py-12 md:py-16 bg-surface-panel border-b border-border-subtle">
        <Container size="default">
          <div className="rounded-2xl bg-surface-canvas border border-border-strong p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
            <div className="space-y-1.5 max-w-xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
                Bespoke Systems &amp; Private Inference
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-text-primary font-normal">
                Custom pipelines, private inference, spatial systems.
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Dedicated VPC enclaves, air-gapped container deployments, and custom Model Context Protocol (MCP) integrations scoped directly with our engineers.
              </p>
            </div>

            <div className="shrink-0">
              <Link href="/contact?service=enterprise">
                <Button variant="primary" size="md" className="whitespace-nowrap cursor-pointer">
                  <span>Talk to an engineer &rarr;</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 5: MISSION / REGIONAL IMPACT (Single Calm Section)
          Differentiated Headline + Documentary Classroom Frame
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-surface-canvas border-b border-border-subtle" id="mission-overview">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-panel border border-border-strong text-accent-primary text-xs font-mono font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI SKILL MISSION · UTTAR PRADESH</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-tight">
                Rooted in <br />
                <span className="italic text-accent-primary font-normal">community impact.</span>
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed text-pretty">
                Frontier technology cannot remain an elite metro privilege. We partner with non-profits, colleges, and rural panchayats to deliver 100% free, hands-on computational literacy across Uttar Pradesh.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                  <span>₹0 Cost to Students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                  <span>75 Target Districts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                  <span>Founder-Led Masterclasses</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/mission" className="font-semibold text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 text-sm">
                  <span>Explore Skill Mission roadmap &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="relative rounded-2xl overflow-hidden border border-border-subtle bg-surface-panel shadow-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-panel-subtle">
                  <Image
                    src="/images/about/skill-mission.jpg"
                    alt="NorAI on-ground AI coding and engineering workshop in Uttar Pradesh"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="p-3 text-left font-mono text-[11px] text-text-muted bg-surface-panel border-t border-border-subtle">
                  Classroom reality: Founder-led AI engineering clinic in a regional college
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 6: HONEST CLOSING DISPATCH
          Honest Framing, No Synthetic Metrics, Direct Leads
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-surface-panel border-t border-border-subtle" id="closing-dispatch">
        <Container size="default">
          <div className="rounded-2xl bg-surface-canvas border border-border-strong p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Direct Engineering Dispatch
              </p>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-display">
                Tell us what&apos;s <br />
                <span className="font-medium text-text-primary">slowing you down.</span>
              </h2>

              <p className="fluid-body text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
                Whether you need high-volume candidate screening, lecture note synthesis, or a dedicated private VPC pipeline—a real engineer reads every message. We reply within one business day.
              </p>

              {/* Dual Action: Primary to /contact, Secondary to /products */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center cursor-pointer whitespace-nowrap">
                    <span>Talk to an Engineer</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center cursor-pointer whitespace-nowrap">
                    Explore All 4 Tools &rarr;
                  </Button>
                </Link>
              </div>

              {/* Trust Badges Footer */}
              <div className="pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-text-muted">
                <span>1-Day Reply Guarantee</span>
                <span className="text-border-strong select-none">/</span>
                <span>Ephemeral RAM Isolation</span>
                <span className="text-border-strong select-none">/</span>
                <span>Engineered in Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}