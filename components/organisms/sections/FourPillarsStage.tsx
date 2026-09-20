'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';
import {
  Brain,
  Code2,
  Glasses,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface Pillar {
  id: string;
  n: string;
  icon: React.ElementType;
  category: string;
  tagline: string;
  tag: string;
  metric: string;
  summary: string;
  thesis: string;
  deliverables: string[];
  techStack: string[];
  accent: string;
  accentSoft: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'ai-solutions',
    n: '01',
    icon: Brain,
    category: 'AI Solutions',
    tagline: 'Pragmatic machine intelligence & automation for real problems.',
    tag: '01 · MACHINE INTELLIGENCE',
    metric: 'Sub-Second In-Memory Latency',
    thesis: 'Why deterministic pipelines outperform generative guesswork.',
    summary:
      'We design purpose-built intelligence pipelines that automate high-friction operational workflows, parse complex unstructured documents, and power contextual retrieval with zero hallucination.',
    deliverables: [
      'Unstructured invoice, resume, and legal document extraction',
      'Context-aware knowledge base retrieval with verified citations',
      'Automated customer support routing and workflow triggers',
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Open-Weight LLMs', 'Vector Stores'],
    accent: '#046A47',
    accentSoft: 'rgba(4, 106, 71, 0.15)',
  },
  {
    id: 'custom-software',
    n: '02',
    icon: Code2,
    category: 'Custom Software',
    tagline: 'Modern web platforms engineered for sub-second speeds.',
    tag: '02 · WEB & SYSTEMS',
    metric: '100% Client Code Ownership',
    thesis: 'Why a pilot is not a production capability.',
    summary:
      'High-performance web applications, resilient backend APIs, and scalable database architectures built on Next.js 15, React 19, and TypeScript. Zero lock-in, complete code ownership.',
    deliverables: [
      'Full-stack web applications with sub-second core web vitals',
      'Type-safe API microservices and event-driven architectures',
      'Modernized relational and document database pipelines',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL'],
    accent: '#1E40AF',
    accentSoft: 'rgba(30, 64, 175, 0.15)',
  },
  {
    id: 'spatial-ar-vr',
    n: '03',
    icon: Glasses,
    category: 'AR / VR (Spatial)',
    tagline: 'Interactive 3D environments running directly in the browser.',
    tag: '03 · SPATIAL COMPUTING',
    metric: '60fps In-Browser WebXR',
    thesis: 'Why spatial computing belongs on the open web.',
    summary:
      'Browser-based WebXR 3D experiences, spatial training visualizers, and interactive digital twins accessible on any device without mandatory headset hardware.',
    deliverables: [
      'Zero-install browser WebXR spatial environments',
      'Interactive 3D mechanical and vocational training modules',
      'Industrial digital twins and architectural visualizers',
    ],
    techStack: ['Three.js', 'WebXR', 'React Three Fiber', 'WebGL', 'GLTF / GLB'],
    accent: '#7C3AED',
    accentSoft: 'rgba(124, 58, 237, 0.15)',
  },
  {
    id: 'research-innovation',
    n: '04',
    icon: Lightbulb,
    category: 'Research & Innovation',
    tagline: 'Applied R&D, open-weight experiments, and student prototypes.',
    tag: '04 · APPLIED R&D',
    metric: 'Four Live Working Tools',
    thesis: 'Why output is not the measure of effectiveness.',
    summary:
      'Continuous applied experimentation bridging frontier academic research with practical utility. We build single-purpose tools that solve real cognitive and operational friction.',
    deliverables: [
      'Open-weight model evaluation and on-device quantization',
      'Production prototypes built by studio engineers and scholars',
      'Vernacular Hindi language processing and civic gazette parsers',
    ],
    techStack: ['vLLM', 'Ollama', 'Hugging Face', 'KaTeX', 'LangChain / MCP'],
    accent: '#C2410C',
    accentSoft: 'rgba(194, 65, 12, 0.15)',
  },
];

export function FourPillarsStage() {
  const [activeId, setActiveId] = useState<string>('ai-solutions');
  const activePillar = PILLARS.find((p) => p.id === activeId) || (PILLARS[0] as Pillar);

  return (
    <section id="pillars" className="py-24 sm:py-32 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24 relative overflow-hidden">
      {/* Soft Ambient Radiance */}
      <div
        className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-[var(--norai-blue-soft)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[var(--norai-violet-soft)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3 text-left">
          <span className="eyebrow text-xs uppercase font-mono tracking-[0.18em] text-[var(--mint-ink)] font-bold block">
            — THE 4 CORE PILLARS · PRACTICE CAPABILITIES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--pine)] tracking-tight leading-[1.06]">
            Architectural precision. <br />
            <span className="text-[var(--mint-ink)]">Four grounded pillars.</span>
          </h2>
          <p className="text-[var(--pine)]/80 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            We reject vague tech buzzwords. NorAI operates across four concrete engineering domains, each backed by production code, open standards, and proven deliverables.
          </p>
        </div>

        {/* The Asymmetric Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: 4 Pillar Selector Tabs */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Four Pillars">
            {PILLARS.map((pillar) => {
              const isActive = pillar.id === activeId;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(pillar.id)}
                  className={cn(
                    'w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 relative border flex items-start gap-4',
                    isActive
                      ? 'bg-[#fffdf7] border-[var(--pine-20)] shadow-[0_8px_30px_rgba(7,41,41,0.06)] scale-[1.01]'
                      : 'bg-transparent border-transparent hover:bg-white/60 opacity-70 hover:opacity-100'
                  )}
                >
                  {/* Left Active Accent Bar */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r shadow-xs"
                      style={{ backgroundColor: pillar.accent }}
                    />
                  )}

                  <div className={cn(
                    'p-2.5 rounded-xl shrink-0 transition-colors',
                    isActive ? 'bg-[#072929] text-white' : 'bg-black/5 text-[var(--pine)]'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[var(--pine)]/60">
                        {pillar.n}
                      </span>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/5 text-[var(--pine)]/70">
                        {pillar.metric}
                      </span>
                    </div>
                    <h3 className={cn(
                      'text-lg sm:text-xl font-bold tracking-tight mt-1 transition-colors',
                      isActive ? 'text-[var(--pine)]' : 'text-[var(--pine)]/90'
                    )}>
                      {pillar.category}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--pine)]/70 mt-1 line-clamp-2">
                      {pillar.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Telemetry Chassis Viewport */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#072929] text-[#f5f5f0] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
              
              {/* Corner Mesh Glow */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-20"
                style={{ backgroundColor: activePillar.accent }}
                aria-hidden="true"
              />

              {/* Chassis Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1ef4b4]">
                  {activePillar.tag}
                </span>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/15">
                  {activePillar.metric}
                </span>
              </div>

              {/* Chassis Body: Overview & Solutions Breakdown */}
              <div className="py-8 space-y-6 relative z-10 text-left">
                <div>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                    {activePillar.category}
                  </h4>
                  <p className="text-[#1ef4b4] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    — {activePillar.thesis}
                  </p>
                  <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
                    {activePillar.summary}
                  </p>
                </div>

                {/* Practical Capabilities List */}
                <div className="p-5 rounded-2xl bg-[#051f1f]/80 border border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 block font-semibold">
                    Core Engineering Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {activePillar.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-[#1ef4b4] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Badges */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                    Core Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-xs font-mono text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chassis Footer */}
              <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1ef4b4] text-[#072929] font-bold text-sm hover:bg-white transition-all duration-160 ease-out shadow-md group"
                >
                  <span>Explore {activePillar.category} Solutions</span>
                  <ArrowRight className="w-4 h-4 text-[#072929] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <span className="text-xs font-mono text-white/40 hidden sm:inline-block">
                  NO VENDOR LOCK-IN
                </span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default FourPillarsStage;
