'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
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
    metric: 'Schema-Validated Extraction',
    thesis: 'Why deterministic pipelines outperform generative guesswork.',
    summary:
      'We design purpose-built intelligence pipelines that automate high-friction operational workflows, parse complex unstructured documents, and power contextual retrieval with citations attached to every answer.',
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
    tagline: 'Modern web platforms engineered around measured performance.',
    tag: '02 · WEB & SYSTEMS',
    metric: '100% Client Code Ownership',
    thesis: 'Why a pilot is not a production capability.',
    summary:
      'High-performance web applications, resilient backend APIs, and scalable database architectures built on Next.js 15, React 19, and TypeScript. Zero lock-in, complete code ownership.',
    deliverables: [
      'Full-stack web applications instrumented for Core Web Vitals',
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
    metric: 'Zero-Install Browser WebXR',
    thesis: 'Physical reality meets responsive synthetic spaces.',
    summary:
      'Immersive WebGL and WebXR spaces for product visualization, spatial commerce, and architectural walkthroughs without requiring native app downloads.',
    deliverables: [
      'Zero-install browser-based 3D product visualizers',
      'Photorealistic architectural interior walkthroughs',
      'Interactive WebXR device demos and synthetic training rigs',
    ],
    techStack: ['Three.js', 'React Three Fiber', 'WebXR', 'GLSL Shaders', 'WebGPU'],
    accent: '#6D28D9',
    accentSoft: 'rgba(109, 40, 217, 0.15)',
  },
  {
    id: 'civic-upskilling',
    n: '04',
    icon: Lightbulb,
    category: 'Civic Upskilling (Bharat)',
    tagline: 'Empowering students and collegiate scholars in tier-2/3 regions.',
    tag: '04 · YOUTH EMPOWERMENT',
    metric: 'Ghazipur Grassroots Outreach',
    thesis: 'Democratizing AI engineering beyond metro elite hubs.',
    summary:
      'Our dedicated civic mission based out of Ghazipur, UP. We conduct free open-weight model workshops, practical computational literacy labs, and hands-on coding intensives for local youth.',
    deliverables: [
      'Hands-on open-source model workshops for provincial engineering colleges',
      'Vernacular Hindi coding documentation and practical AI toolkits',
      'Mentorship pipelines connecting rural scholars with modern software practice',
    ],
    techStack: ['Open-Weights', 'Ollama', 'FastAPI', 'Next.js', 'Python'],
    accent: '#B45309',
    accentSoft: 'rgba(180, 83, 9, 0.15)',
  },
];

export function FourPillarsStage() {
  const [activeId, setActiveId] = useState<string>('ai-solutions');
  const activePillar: Pillar = PILLARS.find((p) => p.id === activeId) || (PILLARS[0] as Pillar);

  return (
    <section id="pillars" className="py-24 sm:py-32 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24 overflow-hidden">
      <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
               {/* Section Header with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--pine)] tracking-tight leading-[1.08]">
            Complete capability. <br className="hidden sm:inline" />
            <span className="text-[#0650AD] dark:text-[#38BDF8]">Unified engineering craft.</span>
          </h2>
          <p className="text-[var(--pine)]/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From deterministic enterprise machine intelligence to grassroots youth upskilling in Ghazipur—every capability is built with zero fluff and complete ownership.
          </p>
        </motion.div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: 4 Interactive Pillar Cards with Staggered Entrance */}
          <div className="lg:col-span-5 space-y-3.5" role="tablist">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = pillar.id === activeId;
              return (
                <motion.button
                  key={pillar.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(pillar.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-start gap-4 card-interactive group relative overflow-hidden',
                    isActive
                      ? 'bg-white dark:bg-[#0D1226] border-[#040A5C]/40 dark:border-[#B278E3]/50 shadow-md ring-1 ring-[#B278E3]/20'
                      : 'bg-white/60 dark:bg-[#071d1d]/60 border-[var(--line)] hover:bg-white dark:hover:bg-[#0a2020] hover:border-[var(--pine-20)] dark:hover:border-white/15'
                  )}
                >
                  <div
                    className={cn(
                      'p-3 rounded-xl shrink-0 transition-transform duration-200 group-hover:scale-105',
                      isActive ? 'bg-[var(--pine)] text-white dark:bg-[#D4C5F9] dark:text-[#03091E]' : 'bg-black/5 dark:bg-white/5 text-[var(--pine)]'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs font-bold text-[var(--pine)]/50 block">
                      {pillar.n}
                    </span>
                    <h3 className={cn(
                      'text-lg sm:text-xl font-bold tracking-tight mt-0.5 transition-colors',
                      isActive ? 'text-[var(--pine)]' : 'text-[var(--pine)]/90'
                    )}>
                      {pillar.category}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--pine)]/70 mt-1 line-clamp-2">
                      {pillar.tagline}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Telemetry Chassis Viewport with Smooth Crossfade */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#0D1226] text-[#f5f5f0] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between"
              >
                {/* Corner Mesh Glow */}
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-20"
                  style={{ backgroundColor: activePillar.accent }}
                  aria-hidden="true"
                />

                {/* Chassis Body: Overview & Solutions Breakdown */}
                <div className="pb-8 space-y-6 relative z-10 text-left">
                  <div>
                    <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
                      {activePillar.category}
                    </h4>
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
                          <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4C5F9] text-[#03091E] font-semibold text-sm hover:bg-[#E4CEF7] transition-all duration-160 ease-out shadow-md group active:scale-[0.98]"
                  >
                    <span>Explore {activePillar.category}</span>
                    <ArrowRight className="w-4 h-4 text-[#03091E] transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FourPillarsStage;
