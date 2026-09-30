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
    subhead: 'Scoring that reads git repositories and architectural experience.',
    copy: 'Filters out ATS keyword stuffers by evaluating production commits, system design patterns, and engineering ownership. Parsing runs in your browser with zero data retention.',
    href: '/products/resume-shortlister',
    telemetryHeader: 'PARSER ENGINE · CONTEXTUAL SCORING',
    telemetryBadge: 'BROWSER-SIDE SCORING',
    telemetryMetrics: [
      { label: 'Where Scoring Runs', value: 'In Your Browser', status: 'ok' },
      { label: 'Data Retention', value: 'No Document Data Stored', status: 'ok' },
      { label: 'Keyword Stuffers', value: 'Filtered Out', status: 'alert' },
    ],
  },
  {
    id: 'course-note-taker',
    n: '02',
    dimension: 'Everyday Tools',
    title: 'Course Note-Taker',
    subhead: 'Messy classroom recordings converted to executive KaTeX notes.',
    copy: 'Ingests raw classroom recordings and slide decks, extracting validated mathematical equations, structured study summaries, and active recall cards you can review and export.',
    href: '/products/course-note-taker',
    telemetryHeader: 'AUDIO TRANSCRIPTION · NLP EXTRACTION',
    telemetryBadge: 'KATEX COMPILED',
    telemetryMetrics: [
      { label: 'Audio Ingestion', value: 'Batch Transcript → Reviewed Notes', status: 'ok' },
      { label: 'Equation Output', value: 'Schema-Validated KaTeX', status: 'ok' },
      { label: 'Scholar Tier', value: 'Academic Access', status: 'ok' },
    ],
  },
  {
    id: 'chat-digest',
    n: '03',
    dimension: 'Everyday Tools',
    title: 'WhatsApp & Slack Digest',
    subhead: 'Unread team threads condensed into three bulleted decisions.',
    copy: 'Runs locally or in a zero-persistence sandbox, extracting actionable action items, blocker alerts, and assigned deliverables without leaking company conversations.',
    href: '/products/chat-digest',
    telemetryHeader: 'BROWSER INFERENCE · AGENT PIPELINE',
    telemetryBadge: 'NO SERVER-SIDE STORAGE',
    telemetryMetrics: [
      { label: 'Token Window', value: 'Set By Your Gemini Model', status: 'ok' },
      { label: 'Action Extraction', value: 'SCHEMA-VALIDATED OUTPUT', status: 'ok' },
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
      { label: 'Audio Path', value: 'Browser-Side WebRTC', status: 'ok' },
      { label: 'Isolation Model', value: 'NO SERVER-SIDE STORAGE', status: 'ok' },
      { label: 'Biased Scoring', value: 'Eliminated', status: 'alert' },
    ],
  },
];

export function CapabilityArc() {
  const [activeId, setActiveId] = useState<string>('resume-shortlister');
  const activeCap: CapabilityItem = STUDIO_PROTOTYPES.find((c) => c.id === activeId) || (STUDIO_PROTOTYPES[0] as CapabilityItem);

  return (
    <section id="prototypes" className="py-20 sm:py-28 lg:py-32 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24 overflow-hidden">
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
            <span className="text-[#0650AD] dark:text-[#38BDF8]">Not to raise rounds.</span>
          </h2>
          <p className="text-[var(--pine)]/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            These are not speculative pitch decks. Every rig below runs in your browser against your own Gemini key, with no accounts, no database, and nothing retained on our side.
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
                      ? 'bg-white dark:bg-[#0D1226] border-[#040A5C]/40 dark:border-[#B278E3]/50 shadow-md ring-1 ring-[#B278E3]/20'
                      : 'bg-white/60 dark:bg-[#071d1d]/60 border-[var(--line)] hover:bg-white dark:hover:bg-[#0a2020] hover:border-[var(--pine-20)] dark:hover:border-white/15'
                  )}
                >
                  <div
                    className={cn(
                      'p-3 rounded-xl shrink-0 font-mono text-xs font-bold transition-transform duration-200 group-hover:scale-105',
                      isActive ? 'bg-[var(--pine)] text-white dark:bg-[#D4C5F9] dark:text-[#03091E]' : 'bg-black/5 dark:bg-white/5 text-[var(--pine)]'
                    )}
                  >
                    {cap.n}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs font-bold text-[var(--pine)]/50 block">
                      {cap.dimension}
                    </span>
                    <h3 className={cn(
                      'text-lg sm:text-xl font-bold tracking-tight mt-0.5 transition-colors',
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

          {/* RIGHT: Dynamic Single Prototype Chassis with Smooth Crossfade */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#0D1226] text-[#f5f5f0] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between"
              >
                {/* Internal Radiant Corner Mesh */}
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#38BDF8]/10 blur-[80px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Chassis Body: Product Overview */}
                <div className="py-4 space-y-5 relative z-10">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8B6D8]">
                    {activeCap.dimension} · Living Prototype
                  </span>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    {activeCap.title}
                  </h4>
                  <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl">
                    {activeCap.subhead}
                  </p>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
                    {activeCap.copy}
                  </p>
                </div>

                {/* Chassis Footer: Action Link */}
                <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                  <Link
                    href={activeCap.href as Route}
                    variant="unstyled"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4C5F9] text-[#03091E] font-semibold text-sm hover:bg-[#E4CEF7] transition-all duration-200 shadow-[0_4px_20px_rgba(0,229,153,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore {activeCap.title} →</span>
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

export default CapabilityArc;
