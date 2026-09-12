import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  Zap,
  Server,
  FileCheck,
} from 'lucide-react';
import { ServicesDirectory } from '@/components/organisms';
import { buildMetadata, getServiceJsonLd, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/services',
  title: 'Bespoke Enterprise Deliverables — Built to change what happens',
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

const PRACTICE_PREVIEWS = [
  {
    number: '01',
    tag: 'DATA INGESTION',
    title: 'Multi-Format Ingestion & Stream Extraction',
    summary:
      'Zero-egress stream parsing, layout-aware PDF tokenization, and sub-second extraction pipelines in transient RAM.',
    metric: 'P95 Latency < 350ms',
    bandClass: 'border-l-4 border-l-[var(--mint)]',
    accent: 'var(--mint)',
    accentInk: 'var(--mint-ink)',
  },
  {
    number: '02',
    tag: 'RAG & RETRIEVAL',
    title: 'Deterministic RAG & Agent Orchestration',
    summary:
      'Enterprise hybrid vector search (pgvector + BM25), Model Context Protocol (MCP) tool servers, and grounded citation verification.',
    metric: '99.95% Citation Grounding',
    bandClass: 'border-l-4 border-l-[var(--lavender)]',
    accent: 'var(--lavender)',
    accentInk: '#4e3a8c',
  },
  {
    number: '03',
    tag: 'SOVEREIGN CLOUD',
    title: 'Private VPC & Air-Gapped Inference',
    summary:
      'Dedicated vLLM and TensorRT-LLM container deployments operating inside your private VPC with zero data egress.',
    metric: 'Sub-100ms Inference',
    bandClass: 'border-l-4 border-l-[var(--coral)]',
    accent: 'var(--coral)',
    accentInk: '#b83818',
  },
  {
    number: '04',
    tag: 'R&D PILOT · AR/VR',
    title: 'Spatial & Immersive Systems (AR/VR)',
    summary:
      'WebGPU compute shaders, Three.js/WGSL, tactile spatial interaction models, and multi-modal sensory telemetry for spatial data. Led by Japan VR/AR Summit finalist.',
    metric: '60fps WebGPU Compute',
    bandClass: 'border-l-4 border-l-[var(--sky)]',
    accent: 'var(--sky)',
    accentInk: '#16656e',
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Deliverables', path: '/services' },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getServiceJsonLd()} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          BEAT 1: AURORA HERO CHAMBER (.phero)
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
                02 · DELIVERABLES &amp; ENTERPRISE SYSTEMS · SYSTEMS YOU OWN
              </span>
            </div>

            {/* Kinetic Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight">
              Bespoke AI solutions. <br />
              <span className="relative inline-block text-[var(--mint-ink)]">
                Engineered for your stack.
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
              From high-accuracy hybrid RAG pipelines to standardized Model Context Protocol (MCP)
              servers and deterministic background queues, we engineer reliable systems you own.
            </p>

            {/* Telemetry Guarantees */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <Lock className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Dedicated VPC &amp; Air-Gap</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <Clock className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>3–5 Day Rapid PoC Sprint</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <Zap className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Sub-200ms P95 Latency SLA</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 2: 4-PRACTICE PREVIEW CARDS (Guaranteed E2E Contract)
          Must display all 4 practice previews before interactive viewer
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--pine)]/60 uppercase tracking-wider font-semibold block">
              ENGINEERED CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-tight">
              Mission-critical scale practices.
            </h2>
            <p className="text-sm sm:text-base text-[var(--pine)]/75">
              Explore our core practices across data ingestion, deterministic retrieval, sovereign VPC inference, and WebGPU spatial computing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRACTICE_PREVIEWS.map((p) => (
              <div
                key={p.number}
                className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-6 flex flex-col justify-between space-y-5 shadow-xs hover:shadow-lg transition-all duration-200 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                    <span className="font-mono text-xs font-bold text-[var(--pine)]/60">
                      {p.number}
                    </span>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--pine-08)] text-[var(--pine)]">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[var(--pine)] group-hover:text-[var(--mint-ink)] transition-colors leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--line)] text-xs font-mono font-semibold text-[var(--mint-ink)]">
                  {p.metric}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 3: AUDENS FULL-WIDTH COLORED HORIZONTAL BANDS
          Signature full-width colored bands (.band--mint, .band--lavender, etc.)
          ========================================================================= */}
      <section className="border-b border-[var(--line)]">
        {/* Band 01: Ingestion & Vectorization (Mint) */}
        <div className="bg-[#072929] text-[#f5f5f0] py-14 sm:py-18 border-b border-[var(--pine-20)] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[var(--mint)]" />
          <Container size="wide" className="max-w-[1240px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <span className="font-mono text-xs text-[var(--mint)] font-bold tracking-wider uppercase">
                  BAND 01 · DATA EXTRACTION
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f0] tracking-tight">
                  Multi-Format Ingestion &amp; Stream Extraction
                </h3>
                <p className="text-sm sm:text-base text-[var(--bone-70)] leading-relaxed">
                  High-throughput layout-aware document parsers operating purely in transient RAM. Instant PDF, DOCX, and scan extraction with zero cold-storage retention.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--mint)] font-semibold">P95 Latency</span>
                  <p className="text-xs text-[var(--bone-70)]">&lt; 350ms per multi-page vectorization payload</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--mint)] font-semibold">Security SLA</span>
                  <p className="text-xs text-[var(--bone-70)]">Ephemeral RAM processing with zero external egress</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Band 02: Deterministic RAG (Lavender) */}
        <div className="bg-[#072929] text-[#f5f5f0] py-14 sm:py-18 border-b border-[var(--pine-20)] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[var(--lavender)]" />
          <Container size="wide" className="max-w-[1240px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <span className="font-mono text-xs text-[var(--lavender)] font-bold tracking-wider uppercase">
                  BAND 02 · DETERMINISTIC RETRIEVAL
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f0] tracking-tight">
                  Deterministic RAG &amp; Agent Orchestration
                </h3>
                <p className="text-sm sm:text-base text-[var(--bone-70)] leading-relaxed">
                  Hybrid vector search (pgvector + BM25) coupled with Model Context Protocol (MCP) tool servers. Every token is anchored to traceable document citations.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--lavender)] font-semibold">Citation Grounding</span>
                  <p className="text-xs text-[var(--bone-70)]">99.95% verified grounding with hallucination abort triggers</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--lavender)] font-semibold">Tool Protocol</span>
                  <p className="text-xs text-[var(--bone-70)]">Standardized MCP servers compatible with Claude, Cursor, and custom LLM runtimes</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Band 03: Private VPC & Local Inference (Coral) */}
        <div className="bg-[#072929] text-[#f5f5f0] py-14 sm:py-18 border-b border-[var(--pine-20)] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[var(--coral)]" />
          <Container size="wide" className="max-w-[1240px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <span className="font-mono text-xs text-[var(--coral)] font-bold tracking-wider uppercase">
                  BAND 03 · SOVEREIGN ENCLAVES
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f0] tracking-tight">
                  Private VPC &amp; Air-Gapped Inference
                </h3>
                <p className="text-sm sm:text-base text-[var(--bone-70)] leading-relaxed">
                  Dedicated vLLM and TensorRT-LLM container deployments running behind AWS PrivateLink, GCP VPC-SC, or bare-metal GPU clusters you control.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--coral)] font-semibold">Inference Latency</span>
                  <p className="text-xs text-[var(--bone-70)]">Sub-100ms TTFT on private FP8 / INT4 quantized models</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--coral)] font-semibold">Egress Guarantee</span>
                  <p className="text-xs text-[var(--bone-70)]">Zero external bytes transmitted to third-party model providers</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Band 04: Spatial & Immersive Systems (Sky) */}
        <div className="bg-[#072929] text-[#f5f5f0] py-14 sm:py-18 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[var(--sky)]" />
          <Container size="wide" className="max-w-[1240px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <span className="font-mono text-xs text-[var(--sky)] font-bold tracking-wider uppercase">
                  BAND 04 · SPATIAL &amp; AR/VR
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f5f0] tracking-tight">
                  Spatial &amp; Immersive Systems (AR/VR)
                </h3>
                <p className="text-sm sm:text-base text-[var(--bone-70)] leading-relaxed">
                  WebGPU compute shaders, Three.js/WGSL render pipelines, and tactile spatial interaction telemetry for immersive enterprise applications.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--sky)] font-semibold">Rendering Performance</span>
                  <p className="text-xs text-[var(--bone-70)]">60fps locked on WebGPU &amp; Three.js canvas shaders</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--forest)]/50 border border-[var(--line)] space-y-1">
                  <span className="font-mono text-xs text-[var(--sky)] font-semibold">Research Lineage</span>
                  <p className="text-xs text-[var(--bone-70)]">Led by Japan VR/AR Summit finalist with WebXR spatial telemetry</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* =========================================================================
          BEAT 4: INTERACTIVE SOLUTION MATRIX (ServicesDirectory)
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--pine)]/60 uppercase tracking-wider font-semibold block">
              EXPLORE ARCHITECTURAL SCHEMAS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-tight">
              Interactive Solution Matrix.
            </h2>
          </div>
          <ServicesDirectory />
        </Container>
      </section>

      {/* =========================================================================
          BEAT 5: 3-PHASE DELIVERY RAILWAY
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--pine)]/60 uppercase tracking-wider font-semibold block">
              DELIVERY PROTOCOL
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-tight">
              How we partner with engineering teams.
            </h2>
            <p className="text-sm sm:text-base text-[var(--pine)]/75">
              A predictable, milestone-driven framework designed to deliver a verified proof-of-concept in days, not quarters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-7 flex flex-col justify-between space-y-6 shadow-xs group hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--pine)] text-[#f5f5f0]">
                        {step.phase}
                      </span>
                      <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--pine-08)] text-[var(--pine)]">
                        {step.timeline}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--porcelain)] flex items-center justify-center text-[var(--pine)]">
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-[var(--pine)] leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed pt-1">
                        {step.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[var(--line)]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--pine)]/50 block">
                        Key Deliverables:
                      </span>
                      <div className="space-y-1.5">
                        {step.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-[var(--pine)]/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                            <span className="font-medium leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 6: CLOSING CONIC DISPATCH (.gradient-card)
          ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="gradient-card max-w-4xl mx-auto text-center">
            <div className="gradient-card__inner p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--mint)]/20 border border-[var(--mint-ink)]/20 text-xs font-mono font-bold text-[var(--mint-ink)] dark:text-[var(--mint)] uppercase tracking-wider">
                Direct Engineering Engagement
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] dark:text-[var(--bone)] tracking-tight leading-tight">
                Have a custom AI workflow in mind?
              </h2>

              <p className="text-base sm:text-lg text-[var(--pine)]/75 dark:text-[var(--bone-70)] max-w-2xl mx-auto leading-relaxed font-normal">
                Connect directly with our core engineering team to scope your technical architecture,
                latency requirements, and 5-day proof-of-concept sprint.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?service=enterprise-consultation"
                  className="btn btn--solid w-full sm:w-auto h-12 px-7 text-sm font-semibold shadow-md"
                >
                  <span>Schedule Technical Consultation</span>
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
