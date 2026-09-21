'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms/Link';
import type { Route } from 'next';

interface CapabilityItem {
  id: string;
  n: string;
  dimension: string;
  title: string;
  subhead: string;
  copy: string;
  href: string;
  telemetryHeader: string;
  telemetryBadge: string;
  telemetryMetrics: {
    label: string;
    value: string;
    status: 'ok' | 'alert';
  }[];
}

const STUDIO_PROTOTYPES: CapabilityItem[] = [
  {
    id: 'resume-shortlister',
    n: '01',
    dimension: 'Everyday Tools',
    title: 'AI Resume Shortlister',
    subhead: 'Sub-second parsing analyzes git repositories and architectural experience.',
    copy: 'Filters out ATS keyword stuffers by evaluating production commits, system design patterns, and engineering ownership. Ephemeral memory processing with zero data retention.',
    href: '/products/resume-shortlister',
    telemetryHeader: 'PARSER ENGINE · CONTEXTUAL SCORING',
    telemetryBadge: '0.28s LATENCY',
    telemetryMetrics: [
      { label: 'Evaluation Speed', value: '0.28s Execution', status: 'ok' },
      { label: 'Data Retention', value: '0 bytes retained', status: 'ok' },
      { label: 'Keyword Stuffers', value: 'Filtered Out', status: 'alert' },
    ],
  },
  {
    id: 'course-note-taker',
    n: '02',
    dimension: 'Everyday Tools',
    title: 'Course Note-Taker',
    subhead: 'Messy classroom recordings converted to executive KaTeX notes.',
    copy: 'Ingests raw classroom recordings and slide decks, extracting validated mathematical equations, structured study summaries, and active recall cards in seconds.',
    href: '/products/course-note-taker',
    telemetryHeader: 'AUDIO TRANSCRIPTION · NLP EXTRACTION',
    telemetryBadge: 'KATEX COMPILED',
    telemetryMetrics: [
      { label: 'Audio Ingestion', value: '1.2h in 8.4s', status: 'ok' },
      { label: 'LaTeX Accuracy', value: '99.4% syntax ok', status: 'ok' },
      { label: 'Scholar Tier', value: 'Academic Access', status: 'ok' },
    ],
  },
  {
    id: 'chat-digest',
    n: '03',
    dimension: 'Everyday Tools',
    title: 'WhatsApp & Slack Digest',
    subhead: 'Synthesizes 500+ unread team messages into 3 bulleted decisions.',
    copy: 'Runs locally or in a zero-persistence sandbox, extracting actionable action items, blocker alerts, and assigned deliverables without leaking company conversations.',
    href: '/products/chat-digest',
    telemetryHeader: 'LOCAL INFERENCE · AGENT PIPELINE',
    telemetryBadge: 'EPHEMERAL RAM',
    telemetryMetrics: [
      { label: 'Token Window', value: '128k context', status: 'ok' },
      { label: 'Action Extraction', value: '100% Deterministic', status: 'ok' },
      { label: 'Telemetry Leak', value: '0 bytes saved', status: 'alert' },
    ],
  },
  {
    id: 'candidate-screener',
    n: '04',
    dimension: 'Enterprise Rigs',
    title: 'Voice-Based Technical Rig',
    subhead: 'Real-time conversational screener for system architecture rounds.',
    copy: 'Deploys an autonomous voice agent that conducts preliminary technical interviews, questioning candidates on database trade-offs and concurrency pitfalls with live code review.',
    href: '/products/candidate-screener',
    telemetryHeader: 'WEBRTC REALTIME · VOICE AGENT',
    telemetryBadge: 'LIVE SOCKET',
    telemetryMetrics: [
      { label: 'Audio Latency', value: '240ms roundtrip', status: 'ok' },
      { label: 'Code Execution', value: 'Isolated Firecracker VM', status: 'ok' },
      { label: 'Biased Scoring', value: 'Eliminated', status: 'alert' },
    ],
  },
];

export function CapabilityArc() {
  const [activeId, setActiveId] = useState<string>('resume-shortlister');
  const activeCap: CapabilityItem = STUDIO_PROTOTYPES.find((c) => c.id === activeId) || (STUDIO_PROTOTYPES[0] as CapabilityItem);

  return (
    <section id="prototypes" className="py-24 sm:py-32 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24 overflow-hidden">
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
            Prototypes built to work. <br className="hidden sm:inline" />
            <span className="text-[#06845A]">Not to raise rounds.</span>
          </h2>
          <p className="text-[var(--pine)]/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            These are not speculative pitch decks. Every prototype below is a functional computational rig engineered in Ghazipur and battle-tested in real operations.
          </p>
        </motion.div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: 4 Prototype Selector Cards with Staggered Entrance */}
          <div className="lg:col-span-5 space-y-3.5" role="tablist">
            {STUDIO_PROTOTYPES.map((cap, idx) => {
              const isActive = cap.id === activeId;
              return (
                <motion.button
                  key={cap.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(cap.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-start gap-4 card-interactive group relative overflow-hidden',
                    isActive
                      ? 'bg-white dark:bg-[#0a2020] border-[#1ef4b4]/60 dark:border-[#1ef4b4]/50 shadow-md ring-1 ring-[#1ef4b4]/20'
                      : 'bg-white/60 dark:bg-[#071d1d]/60 border-[var(--line)] hover:bg-white dark:hover:bg-[#0a2020] hover:border-[var(--pine-20)] dark:hover:border-white/15'
                  )}
                >
                  <div
                    className={cn(
                      'p-3 rounded-xl shrink-0 font-mono text-xs font-bold transition-transform duration-200 group-hover:scale-105',
                      isActive ? 'bg-[var(--pine)] text-white dark:bg-[#1ef4b4] dark:text-[#04130f]' : 'bg-black/5 dark:bg-white/5 text-[var(--pine)]'
                    )}
                  >
                    {cap.n}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[var(--pine)]/60">
                        {cap.dimension}
                      </span>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[var(--pine)]/70">
                        {cap.telemetryBadge}
                      </span>
                    </div>
                    <h3 className={cn(
                      'text-lg sm:text-xl font-bold tracking-tight mt-1 transition-colors',
                      isActive ? 'text-[var(--pine)]' : 'text-[var(--pine)]/90'
                    )}>
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--pine)]/70 mt-1 line-clamp-2">
                      {cap.subhead}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Single Telemetry Chassis with Smooth Crossfade */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#072929] text-[#f5f5f0] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between"
              >
                {/* Internal Radiant Corner Mesh */}
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00E599]/10 blur-[80px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Chassis Top Bar: Tag & Telemetry Status */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00E599]">
                    {activeCap.telemetryHeader}
                  </span>
                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" aria-hidden="true" />
                    {activeCap.telemetryBadge}
                  </span>
                </div>

                {/* Chassis Body: Product Overview & Telemetry Matrix */}
                <div className="py-8 space-y-6 relative z-10">
                  <div>
                    <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                      {activeCap.title}
                    </h4>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                      {activeCap.copy}
                    </p>
                  </div>

                  {/* Live Telemetry Table */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#051f1f]/80 border border-white/10 space-y-2.5 font-mono text-xs sm:text-sm">
                    {activeCap.telemetryMetrics.map((m, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-white/60">{m.label}</span>
                        <span className={cn('font-bold', m.status === 'alert' ? 'text-[#FFAE42]' : 'text-[#00E599]')}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chassis Footer: Action Link */}
                <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                  <Link
                    href={activeCap.href as Route}
                    variant="unstyled"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E599] text-[#072929] font-bold text-sm hover:bg-[#1ef4b4] transition-all duration-200 shadow-[0_4px_20px_rgba(0,229,153,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore {activeCap.title} →</span>
                  </Link>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    0 BYTES RETAINED
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default CapabilityArc;
