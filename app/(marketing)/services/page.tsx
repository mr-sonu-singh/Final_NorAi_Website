import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  Brain,
  Code2,
  Glasses,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Terminal,
  FileCode2,
} from 'lucide-react';
import { buildMetadata, getServiceJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/services',
  title: 'Solutions & Engineering Practice — NorAI Technologies',
  description:
    'Pragmatic AI Solutions, Custom Modern Web Software, Spatial Computing (AR/VR), and Applied R&D. Engineered with clean code, open standards, and zero vendor lock-in.',
});

const PILLARS_DEEP_DIVE = [
  {
    id: 'ai-solutions',
    n: '01',
    icon: Brain,
    title: 'AI Solutions & Automation',
    tagline: 'Pragmatic machine intelligence for high-friction workflows.',
    desc: 'We engineer purpose-built intelligence pipelines that eliminate tedious operational busywork. From unstructured document extraction to contextual assistants, our systems run with sub-second latency and zero permanent data retention.',
    deliverables: [
      'Multi-format resume, invoice, and legal document parsers',
      'Contextual knowledge retrieval without hallucination',
      'Automated customer support triage and intent routing',
      'Custom fine-tuned open-weight classification models',
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Hugging Face', 'Vector Indexing', 'Docker'],
    accent: '#046A47',
    badge: 'SUB-SECOND IN-MEMORY',
  },
  {
    id: 'custom-software',
    n: '02',
    icon: Code2,
    title: 'Custom Modern Web Software',
    tagline: 'High-performance web applications and resilient digital products.',
    desc: 'Full-stack software engineering grounded in modern TypeScript ecosystems. We author ultra-fast web interfaces, robust REST/GraphQL APIs, and mission-critical admin portals designed to scale gracefully without technical debt.',
    deliverables: [
      'Next.js 15 & React 19 web applications with sub-second page loads',
      'High-concurrency RESTful and GraphQL backend microservices',
      'PostgreSQL / Redis database architectures with zero data loss SLAs',
      'Responsive enterprise consoles with real-time WebSocket telemetry',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL', 'Node.js'],
    accent: '#1E40AF',
    badge: '100% CLIENT IP OWNERSHIP',
  },
  {
    id: 'ar-vr',
    n: '03',
    icon: Glasses,
    title: 'AR / VR Spatial Computing',
    tagline: 'Interactive 3D environments and immersive simulations.',
    desc: 'We bring spatial computing directly to the browser via WebXR and Three.js. No cumbersome headset-only app stores or heavy gigabyte downloads—just immediate, 60fps 3D interactions accessible across phones, tablets, and VR headsets.',
    deliverables: [
      'Interactive 3D mechanical, architectural, and equipment visualizers',
      'WebXR vocational training environments for technical apprentices',
      'Virtual product showcases with photorealistic PBR materials',
      'Interactive spatial educational modules for collegiate classrooms',
    ],
    techStack: ['Three.js', 'WebXR', 'GLSL', 'React Three Fiber', 'Blender', 'WebGPU'],
    accent: '#7C3AED',
    badge: '60 FPS BROWSER NATIVE',
  },
  {
    id: 'research-innovation',
    n: '04',
    icon: Lightbulb,
    title: 'Applied Research & Innovation',
    tagline: 'Experimental R&D, local edge intelligence, and student prototypes.',
    desc: 'Where cutting-edge AI research meets real ground utility. We benchmark open-weight models, run local quantized inference on consumer GPUs, and collaborate with student fellows to author civic intelligence tools.',
    deliverables: [
      'Local on-device inference setups using vLLM and quantized GGUF weights',
      'Vernacular Hindi language scrapers and regional gazette extractors',
      'Mathematical lecture synthesis and academic research tools',
      'Open-source student developer sandboxes and reproducible blueprints',
    ],
    techStack: ['vLLM', 'Ollama', 'GGUF', 'KaTeX', 'Open Data APIs', 'Python'],
    accent: '#FF7755',
    badge: 'OPEN STANDARDS & CIVIC',
  },
];

const ENGAGEMENT_STEPS = [
  {
    step: '01',
    title: 'Architecture Blueprint & Scoping',
    time: 'Day 1–2',
    desc: 'We analyze your data boundaries, latency targets, and business constraints. We deliver a clear technical specification with zero vendor lock-in.',
  },
  {
    step: '02',
    title: '5-Day Functional PoC Sprint',
    time: 'Day 3–7',
    desc: 'We author a functional, reproducible proof-of-concept in an isolated sandbox. You verify performance, accuracy, and latency with real test data.',
  },
  {
    step: '03',
    title: 'Production Handover & Local Deploy',
    time: 'Sprint Close',
    desc: 'Complete git repository transfer, Docker deployment configurations, and senior engineer architectural walkthrough. You own 100% of the code.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={getServiceJsonLd()} />

      <main id="main-content" className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
        {/* HERO HEADER */}
        <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-24 overflow-hidden border-b border-[var(--line)]">
          <div className="absolute -top-32 -left-20 w-[450px] h-[450px] rounded-full bg-[var(--norai-blue-soft)] blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--norai-violet-soft)] blur-[110px] pointer-events-none" aria-hidden="true" />

          <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
                <span>— SOLUTIONS &amp; PRACTICE CAPABILITIES · 4 PILLARS</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]">
                Pragmatic systems.{' '}
                <span className="text-[var(--mint-ink)]">Built for real operations.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
                We build production-ready machine intelligence, high-performance web software, and spatial computing environments. Clean architectures, open standards, and 100% client code ownership.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>100% Client IP Ownership</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-2xs">
                  <Clock className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>5-Day Rapid PoC Sprints</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-2xs">
                  <Zap className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>Sub-Second Latency SLAs</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION: 4 PILLARS ARCHITECTURAL MATRIX */}
        <section className="py-20 sm:py-28 border-b border-[var(--line)]">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-16 space-y-3 text-left">
              <span className="eyebrow text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] font-bold block">
                — PRACTICE DEEP DIVE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--pine)] tracking-tight">
                Four engineering pillars.
              </h2>
              <p className="text-[var(--pine)]/75 text-base sm:text-lg">
                Explore the exact deliverables, technologies, and specifications we build for clients.
              </p>
            </div>

            <div className="space-y-12">
              {PILLARS_DEEP_DIVE.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    id={pillar.id}
                    className="rounded-[28px] border border-[var(--line)] bg-[#fffdf7] p-8 sm:p-12 shadow-xs transition-shadow hover:shadow-md text-left relative overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left: Summary & Deliverables */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-[#072929] text-white">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="font-mono text-sm font-bold text-[var(--pine)]/60">
                              /{pillar.n}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/5 text-[var(--pine)]/80">
                            {pillar.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pine)] tracking-tight">
                            {pillar.title}
                          </h3>
                          <p className="text-xs font-mono uppercase tracking-wider text-[var(--mint-ink)] font-semibold mt-1">
                            {pillar.tagline}
                          </p>
                          <p className="text-sm sm:text-base text-[var(--pine)]/80 leading-relaxed mt-4">
                            {pillar.desc}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[var(--line)] space-y-3">
                          <span className="text-xs font-mono uppercase tracking-wider text-[var(--pine)]/60 font-semibold block">
                            Standard Deliverables:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {pillar.deliverables.map((deliv, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-[var(--pine)]/90">
                                <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                                <span>{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical Specs & Tech Stack */}
                      <div className="lg:col-span-5 rounded-2xl bg-[#072929] text-[#f5f5f0] p-6 sm:p-8 space-y-6">
                        <div className="space-y-1">
                          <span className="text-xs font-mono uppercase tracking-widest text-[#1ef4b4] font-bold">
                            Stack &amp; Architecture
                          </span>
                          <h4 className="text-lg font-bold text-white">
                            Technology Foundations
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {pillar.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-mono text-white/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-white/10 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                            <FileCode2 className="w-4 h-4 text-[#1ef4b4]" />
                            <span>Full Git Source Code &amp; Test Suite</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                            <Terminal className="w-4 h-4 text-[#1ef4b4]" />
                            <span>Dockerized Reproducible Deployment</span>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Link
                            href="/contact"
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1ef4b4] text-[#072929] font-bold text-xs hover:bg-white transition-colors shadow-xs"
                          >
                            <span>Scope a {pillar.title.split(' ')[0]} Project</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* SECTION: 3-STEP STUDIO ENGAGEMENT PROTOCOL */}
        <section className="py-20 sm:py-28 bg-[#fffdf7] border-b border-[var(--line)]">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-16 space-y-3 text-left">
              <span className="eyebrow text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] font-bold block">
                — HOW WE WORK
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--pine)] tracking-tight">
                Transparent studio engagement.
              </h2>
              <p className="text-[var(--pine)]/75 text-base sm:text-lg">
                No opaque retainer black boxes. Every project progresses through three disciplined milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {ENGAGEMENT_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--porcelain)] p-7 space-y-4 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--pine)] text-[#f5f5f0]">
                      {step.step}
                    </span>
                    <span className="font-mono text-xs text-[var(--mint-ink)] font-bold">
                      {step.time}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[var(--pine)]">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#072929] text-[#f5f5f0] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  Ready to build with precision?
                </h3>
                <p className="text-sm text-white/70">
                  Speak directly with founding engineers. We scope projects within 24 hours.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1ef4b4] text-[#072929] font-bold text-sm hover:bg-white transition-colors shadow-md shrink-0"
              >
                <span>Start a Project Consultation →</span>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
