import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MeshGradient } from '@/components/atoms/MeshGradient';
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
  ShieldCheck,
  CheckCircle2,
  Zap,
  Lock,
  Layers,
  Clock,
  Sparkles,
  Server,
  FileCheck,
} from 'lucide-react';
import { ServicesDirectory } from '@/components/organisms';
import { buildMetadata, getServiceJsonLd, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/services',
  title: 'Bespoke Enterprise AI Solutions',
  description:
    'Custom RAG pipelines, MCP tool servers, and high-throughput private VPC inference architectures engineered for enterprise scale and zero hallucination.',
});

const ENGAGEMENT_STEPS = [
  {
    phase: 'PHASE 01',
    timeline: 'Day 01–02',
    title: 'Technical Workflow & Latency Audit',
    desc: 'We analyze your data schemas, query volume, latency bottlenecks, and private network boundaries during an initial technical deep-dive.',
    icon: FileCheck,
    deliverables: [
      'Document Schema & Chunking Blueprint',
      'Zero-Trust Security Boundary Plan',
      'Target Latency & Accuracy SLA Spec',
    ],
  },
  {
    phase: 'PHASE 02',
    timeline: 'Day 03–05',
    title: '5-Day Rapid Sandbox PoC Sprint',
    desc: 'We engineer a functioning proof-of-concept pipeline in an isolated test sandbox with live benchmarks on your sample datasets.',
    icon: Zap,
    deliverables: [
      'Isolated Sandbox Inference Pipeline',
      'P95 Latency & Accuracy Benchmark Report',
      'Deterministic Output Guardrails',
    ],
  },
  {
    phase: 'PHASE 03',
    timeline: 'Day 06+',
    title: 'Production VPC & Guaranteed SLA',
    desc: 'We deploy the hardened container into your private cloud (AWS / GCP / Azure PrivateLink or On-Prem) backed by automated telemetry.',
    icon: Server,
    deliverables: [
      'Air-Gapped Docker / Helm Package',
      '99.9% Uptime & Sub-200ms Latency SLA',
      'Direct Senior Architect Walkthrough',
    ],
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <div className="text-text-primary min-h-screen font-sans bg-surface-canvas selection:bg-accent-primary selection:text-white">
      <JsonLd schema={getServiceJsonLd()} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          HERO SECTION: High-Craft Editorial Command Stage (Surface A)
          ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-28 border-b border-border-subtle overflow-hidden bg-surface-canvas">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-7 text-left">
            {/* Eyebrow Pill */}
            <Reveal delay={0} y={16}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                <span>Bespoke Enterprise Systems · Dedicated VPC Deployments</span>
              </div>
            </Reveal>

            {/* Kinetic Display Headline */}
            <h1
              aria-label="Bespoke AI solutions engineered for your stack."
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-text-primary leading-[1.02] tracking-display"
            >
              <TextReveal text="Bespoke AI solutions" splitBy="word" as="span" stagger={0.08} duration={0.7} /> <br />
              <span className="italic text-accent-primary font-normal inline-block">
                <TextReveal text="engineered for your stack." splitBy="word" as="span" delay={0.2} stagger={0.08} duration={0.7} />
              </span>
            </h1>

            {/* Body Copy with Fluid Clamp */}
            <Reveal delay={0.32} y={18}>
              <p className="fluid-lead text-text-secondary leading-relaxed max-w-2xl font-normal text-pretty">
                From high-accuracy hybrid RAG pipelines to standardized Model Context Protocol (MCP) servers and deterministic background worker queues, we engineer reliable intelligence that never hallucinates.
              </p>
            </Reveal>

            {/* Telemetry Guarantee Strip */}
            <Reveal delay={0.46} y={16}>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                <div className="p-3 rounded-xl bg-surface-panel border border-border-subtle flex items-center gap-2.5 text-xs text-text-primary">
                  <Lock className="w-4 h-4 text-accent-secondary shrink-0" />
                  <span className="font-mono text-[11px]">Dedicated VPC &amp; Air-Gap</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-panel border border-border-subtle flex items-center gap-2.5 text-xs text-text-primary">
                  <Clock className="w-4 h-4 text-accent-primary shrink-0" />
                  <span className="font-mono text-[11px]">3–5 Day Rapid PoC Sprint</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-panel border border-border-subtle flex items-center gap-2.5 text-xs text-text-primary">
                  <Zap className="w-4 h-4 text-accent-primary shrink-0" />
                  <span className="font-mono text-[11px]">Sub-200ms P95 Latency SLA</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: BESPOKE INTERACTIVE ENGINEERING DIRECTORY (Surface B)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-surface-canvas border-b border-border-subtle">
        <Container size="default">
          <div className="space-y-10">
            <Reveal delay={0} y={20}>
              <div className="max-w-2xl text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Interactive Solution Matrix</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                  Engineered practices for <br />
                  <span className="italic text-accent-primary font-normal">mission-critical scale.</span>
                </h2>
                <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
                  Explore our four core engineering practices. Inspect the execution topology, review the typed TypeScript contracts, and scope your dedicated architecture.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15} y={24}>
              <ServicesDirectory />
            </Reveal>
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 3: CONNECTED 3-PHASE DELIVERY ROADMAP (Surface A)
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-surface-panel border-b border-border-subtle">
        <Container size="default">
          <Reveal delay={0} y={20}>
            <div className="max-w-2xl mb-14 text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-panel-subtle border border-border-subtle text-accent-primary text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Engineering Engagement Protocol</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                How we partner with <br />
                <span className="italic text-accent-primary font-normal">technical teams.</span>
              </h2>
              <p className="fluid-body text-text-secondary leading-relaxed max-w-xl text-pretty">
                A predictable, milestone-driven framework designed to deliver a verified proof-of-concept in days, not quarters.
              </p>
            </div>
          </Reveal>

          {/* Connected Sprint Pipeline with Double-Bezel Cards */}
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" stagger={0.15}>
            {ENGAGEMENT_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <StaggerItem key={step.title} className="h-full">
                  <div className="p-2 rounded-3xl bg-surface-canvas/80 border border-border-strong shadow-sm h-full flex flex-col justify-between group hover:border-accent-primary/40 transition-colors">
                    <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-5 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Step Header */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-accent-primary px-2.5 py-0.5 rounded bg-accent-50 border border-accent-primary/20">
                            {step.phase}
                          </span>
                          <span className="font-mono text-[11px] text-accent-secondary font-medium bg-sage-100/70 border border-accent-secondary/20 px-2 py-0.5 rounded">
                            {step.timeline}
                          </span>
                        </div>

                        {/* Title & Icon */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-surface-panel-subtle flex items-center justify-center text-accent-primary shrink-0">
                              <StepIcon className="w-3.5 h-3.5" />
                            </div>
                            <h3 className="font-display text-xl sm:text-2xl text-text-primary font-normal leading-snug">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed pt-1">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="space-y-2 pt-4 border-t border-border-subtle">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted block">
                          Key Deliverables:
                        </span>
                        <div className="space-y-1.5">
                          {step.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-text-primary">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                              <span className="text-[11px] font-medium leading-tight">{item}</span>
                            </div>
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
          SECTION 4: PRE-FOOTER HIGH-CONVERSION CONSOLE (Surface A)
          ========================================================================= */}
      <AnimatedSection as="aside" aria-label="Schedule technical consultation" className="py-20 md:py-28 bg-surface-canvas">
        <Container size="default">
          <div className="p-2 sm:p-3 rounded-3xl bg-surface-panel/40 border border-border-strong shadow-lg">
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-8 sm:p-12 md:p-16 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(200,90,50,0.04)_0%,transparent_70%)]"
                aria-hidden="true"
              />

              <div className="max-w-2xl mx-auto space-y-7 relative z-10">
                {/* Direct Engineering Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-panel-subtle border border-border-subtle text-accent-primary text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  <span>Direct Engineering Engagement</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-display">
                  Have a custom AI workflow <br />
                  <span className="italic text-accent-primary font-normal">in mind?</span>
                </h2>

                <p className="fluid-body text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
                  Connect directly with our core engineering team to scope your technical architecture, latency requirements, and proof-of-concept sprint.
                </p>

                {/* Assurance Card */}
                <div className="rounded-2xl border border-border-subtle bg-surface-canvas/90 p-4 sm:p-5 text-left shadow-sm max-w-lg mx-auto flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent-secondary shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-text-primary block">Zero-Commitment Technical Scoping</span>
                    <p className="text-text-secondary leading-relaxed">
                      Every consultation produces an explicit architecture diagram, latency budget, and concrete proof-of-concept scope with zero vendor lock-in.
                    </p>
                  </div>
                </div>

                {/* Dual Action CTAs with Magnetic Pull */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/contact?service=enterprise-consultation" className="w-full sm:w-auto">
                    <MagneticButton strength={14} className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto justify-between group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer btn-tactile pl-6 pr-2.5 py-2.5"
                      >
                        <span className="font-semibold text-sm">Schedule Technical Consultation</span>
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