'use client';

import React, { useState } from 'react';
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

const AUDENS_CAPABILITIES: CapabilityItem[] = [
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
      { label: 'Egress / Telemetry', value: '0 bytes retained', status: 'ok' },
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
      { label: 'Scholar Tier', value: '₹0 Student Cost', status: 'ok' },
    ],
  },
  {
    id: 'chat-digest',
    n: '03',
    dimension: 'Everyday Tools',
    title: 'Community Chat Digest',
    subhead: 'The operational signal extracted from noisy community threads.',
    copy: 'Summarizes thousands of unread team conversations across Slack and Discord into prioritized executive action items, unresolved technical blockers, and key decisions.',
    href: '/products/chat-digest',
    telemetryHeader: 'STREAM DIGEST · MULTI-CHANNEL BUFFER',
    telemetryBadge: '4,820 ➔ 3 ITEMS',
    telemetryMetrics: [
      { label: 'Channel Ingestion', value: 'Slack & Discord', status: 'ok' },
      { label: 'Noise Reduction', value: '98.7% compressed', status: 'ok' },
      { label: 'Action Items', value: 'Extracted Cleanly', status: 'ok' },
    ],
  },
  {
    id: 'smart-dainik-news',
    n: '04',
    dimension: 'Everyday Tools',
    title: 'Smart Dainik News',
    subhead: 'Regional public notices and citizen gazettes, verified before deadlines.',
    copy: 'Autonomous monitoring of district public gazettes and welfare notices, delivering concise, actionable vernacular alerts in pure Hindi for citizens and students.',
    href: '/products/smart-dainik-news',
    telemetryHeader: 'CIVIC INTELLIGENCE · REGIONAL CRAWLER',
    telemetryBadge: 'UP GAZETTE #402',
    telemetryMetrics: [
      { label: 'Source Verification', value: 'Official Gazette', status: 'ok' },
      { label: 'Language Delivery', value: 'Vernacular Hindi', status: 'ok' },
      { label: 'Deadline Alert', value: '48h Window Alert', status: 'alert' },
    ],
  },
];

export function CapabilityArc() {
  const [activeId, setActiveId] = useState<string>('resume-shortlister');
  const activeCap = AUDENS_CAPABILITIES.find((c) => c.id === activeId) || (AUDENS_CAPABILITIES[0] as CapabilityItem);

  return (
    <section id="capabilities" className="py-24 sm:py-32 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24 relative overflow-hidden">
      {/* Soft Ambient Aurora Glows */}
      <div
        className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#00E599]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#C6B5FF]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="eyebrow text-xs uppercase font-mono tracking-[0.18em] text-[#06845A] font-bold block">
            — THE CAPABILITY ARC · FOUR SOVEREIGN TOOLS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--pine)] tracking-tight leading-[1.06]">
            Four single-purpose tools. <br />
            <span className="text-[#06845A]">Zero busywork.</span>
          </h2>
          <p className="text-[var(--pine)]/80 text-base sm:text-lg leading-relaxed max-w-xl">
            Sovereign instruments designed to eliminate cognitive friction. Sub-second execution, ephemeral memory processing, and zero data retention.
          </p>
        </div>

        {/* The Borderless Interactive Telemetry Stage (Replaces 2,200px 4-card stack!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Borderless Capability Selector List */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Capabilities List">
            {AUDENS_CAPABILITIES.map((cap) => {
              const isActive = cap.id === activeId;
              return (
                <button
                  key={cap.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(cap.id)}
                  className={cn(
                    'w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 relative border flex items-start gap-4',
                    isActive
                      ? 'bg-white border-[var(--pine-20)] shadow-[0_8px_30px_rgba(7,41,41,0.06)]'
                      : 'bg-transparent border-transparent hover:bg-white/50 opacity-65 hover:opacity-100'
                  )}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#06845A] rounded-r shadow-[0_0_8px_rgba(6,132,90,0.4)]" />
                  )}

                  <span
                    className={cn(
                      'font-mono text-xs font-bold mt-1 transition-colors',
                      isActive ? 'text-[#06845A]' : 'text-[var(--pine)]/60'
                    )}
                  >
                    {cap.n}
                  </span>
                  <div>
                    <h3
                      className={cn(
                        'text-lg sm:text-xl font-bold tracking-tight transition-colors',
                        isActive ? 'text-[var(--pine)]' : 'text-[var(--pine)]/85'
                      )}
                    >
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--pine)]/70 mt-1 line-clamp-2">
                      {cap.subhead}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Single Telemetry Chassis */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#072929] text-[#f5f5f0] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E599] text-[#072929] font-bold text-sm hover:bg-[#1ef4b4] transition-all duration-200 shadow-[0_4px_20px_rgba(0,229,153,0.3)] hover:scale-[1.02]"
                >
                  <span>Explore {activeCap.title} →</span>
                </Link>
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                  0 BYTES RETAINED
                </span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default CapabilityArc;
