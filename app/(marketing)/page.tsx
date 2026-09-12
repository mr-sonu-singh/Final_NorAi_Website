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
import { HeroStudioWorkbench, OperatingRitualsRail } from '@/components/organisms';
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
    tagline:
      'Screen hundreds of engineering resumes in seconds with sub-second vector scoring and weighted skills matching.',
    metric: '< 0.35s / PDF',
    icon: FileText,
  },
  {
    number: '02',
    badge: 'v1.0',
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    tagline:
      'Transform raw lecture recordings, videos, and slides into structured study outlines, LaTeX math, and flashcards.',
    metric: 'Real-Time Audio NLP',
    icon: Headphones,
  },
  {
    number: '03',
    badge: 'v1.0',
    slug: 'chat-digest',
    title: 'Community Chat Digest',
    category: 'Community AI',
    tagline:
      'Condense thousands of unread Discord, Slack, and Telegram messages into 2-minute executive action briefs.',
    metric: '2m Executive Brief',
    icon: MessageSquare,
  },
  {
    number: '04',
    badge: 'v1.0',
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    tagline:
      'Hyper-local public employment alerts and government gazette notifications clustered across Hindi and English feeds.',
    metric: 'Bilingual NLP',
    icon: Newspaper,
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
                NorAI Technologies · Autonomous AI Agents · Enterprise Automation
              </p>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-text-primary leading-[1.05] tracking-display text-balance">
                Intelligence <br />
                <span className="italic text-accent-primary font-normal">Meets Action.</span>
              </h1>

              {/* Audience-Readable Subhead */}
              <Reveal delay={0.15} y={12}>
                <p className="fluid-lead text-text-secondary font-normal leading-relaxed max-w-xl text-pretty">
                  Four single-purpose AI tools and bespoke enterprise automation that turn
                  repetitive workflows into fast, reliable systems. Sub-second execution, zero data
                  retention, and clean, deterministic outputs.
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
      <section
        className="py-16 md:py-24 bg-surface-panel border-b border-border-subtle"
        id="capabilities"
      >
        <Container size="default">
          <div className="max-w-2xl mb-12 text-left space-y-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
              The Capability Arc · Four Tools, One Problem Each
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-tight">
              Four focused tools. <br />
              <span className="font-medium text-text-primary">
                Each solves one operational problem.
              </span>
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl text-pretty">
              Purpose-built AI micro-tools for operational speed—eliminating recruitment drag,
              lecture synthesis friction, channel noise, and regional job alerts with sub-second
              execution and zero data retention.
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
            <Link
              href="/products"
              className="text-text-secondary hover:text-accent-primary transition-colors"
            >
              Explore All Tools &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 3: OPERATING RITUALS (Architectural Circuit Rail)
          Completely Unboxed — Zero Rectangle Boxes — Connected Rail
          ========================================================================= */}
      <section
        className="py-16 md:py-24 bg-surface-canvas border-b border-border-subtle"
        id="operating-rituals"
      >
        <Container size="default">
          <OperatingRitualsRail />
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
                Bespoke AI Solutions &amp; Private Infrastructure
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-text-primary font-normal">
                Custom agents, workflow integration &amp; spatial XR systems.
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Engineered for your stack. Connect autonomous AI agents to your APIs, deploy private
                VPC inference with zero data egress, or build intelligent simulations in Unity,
                WebGPU, and AR/VR.
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
      <section
        className="py-16 md:py-24 bg-surface-canvas border-b border-border-subtle"
        id="mission-overview"
      >
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-panel border border-border-strong text-accent-primary text-xs font-mono font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI SKILL MISSION · UTTAR PRADESH</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-tight">
                Make intelligence operational <br />
                <span className="italic text-accent-primary font-normal">
                  across our communities.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed text-pretty">
                Frontier technology cannot remain confined to metro tech enclaves. We partner with
                non-profits, colleges, and rural panchayats to deliver 100% free, hands-on
                computational literacy tailored to how students live, learn, and build across Uttar
                Pradesh.
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
                <Link
                  href="/mission"
                  className="font-semibold text-accent-primary hover:text-accent-hover inline-flex items-center gap-1 text-sm"
                >
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
                  On-ground reality: Turning regional classrooms and community labs into instruments
                  of practical AI empowerment.
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
      <section
        className="py-16 md:py-24 bg-surface-panel border-t border-border-subtle"
        id="closing-dispatch"
      >
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
                Tell us what you want to automate. Whether you need single-purpose autonomous tools,
                custom API workflow integrations, or a dedicated private VPC enclave—a real engineer
                reads every message and replies within one business day.
              </p>

              {/* Dual Action: Primary to /contact, Secondary to /products */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center cursor-pointer whitespace-nowrap"
                  >
                    <span>Talk to an Engineer</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto justify-center cursor-pointer whitespace-nowrap"
                  >
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
