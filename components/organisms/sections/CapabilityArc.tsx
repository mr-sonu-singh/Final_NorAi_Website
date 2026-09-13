'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useReducedMotion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';

export interface CapabilityItem {
  id: string;
  n: string;
  dimension: 'Everyday Tools' | 'Enterprise Infra';
  title: string;
  subhead: string;
  copy: string;
  href: string;
  telemetryHeader: string;
  telemetryBadge: string;
  telemetryMetrics: { label: string; value: string; status: 'ok' | 'alert' }[];
}

export const AUDENS_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'resume-shortlister',
    n: '01',
    dimension: 'Everyday Tools',
    title: 'AI Resume Shortlister',
    subhead: 'See who actually built the system, not who stuffed the keywords.',
    copy: 'Sub-second vector scoring parses verified engineering depth and code craft from raw PDFs, eliminating recruiter screening backlog instantly.',
    href: '/products/resume-shortlister',
    telemetryHeader: 'RESUME VECTOR SCREENER · TRANSIENT RAM',
    telemetryBadge: '96/100 VERIFIED',
    telemetryMetrics: [
      { label: 'P95 Parse Latency', value: '0.28s / doc', status: 'ok' },
      { label: 'Egress / Telemetry', value: '0 bytes retained', status: 'ok' },
      { label: 'Keyword Stuffers', value: 'Filtered', status: 'alert' },
    ],
  },
  {
    id: 'course-note-taker',
    n: '02',
    dimension: 'Everyday Tools',
    title: 'Course Note-Taker',
    subhead: 'Messy lectures converted to executive KaTeX notes in seconds.',
    copy: 'Ingests raw classroom recordings and slide decks, extracting validated mathematical equations, structured study summaries, and active recall cards.',
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
    subhead: 'The operational signal extracted from community noise.',
    copy: 'Summarizes thousands of unread team conversations into prioritized executive action items, unresolved technical blockers, and key consensus decisions.',
    href: '/products/chat-digest',
    telemetryHeader: 'STREAM DIGEST · MULTI-CHANNEL BUFFER',
    telemetryBadge: '4,820 ➔ 3 POINTS',
    telemetryMetrics: [
      { label: 'Channel Ingestion', value: 'Slack & Discord', status: 'ok' },
      { label: 'Noise Reduction', value: '98.7% compressed', status: 'ok' },
      { label: 'Action Items', value: 'Extracted', status: 'ok' },
    ],
  },
  {
    id: 'smart-dainik-news',
    n: '04',
    dimension: 'Everyday Tools',
    title: 'Smart Dainik News',
    subhead: 'Regional government notices, verified before deadlines expire.',
    copy: 'Autonomous monitoring of district public gazettes and welfare notices, delivering concise, actionable vernacular alerts for citizens and students.',
    href: '/products/smart-dainik-news',
    telemetryHeader: 'CIVIC INTELLIGENCE · REGIONAL CRAWLER',
    telemetryBadge: 'UP GAZETTE #402',
    telemetryMetrics: [
      { label: 'Source Verification', value: 'Official Gazette', status: 'ok' },
      { label: 'Language Delivery', value: 'Pure Hindi', status: 'ok' },
      { label: 'Deadline Alert', value: '48h Window', status: 'alert' },
    ],
  },
];

export function CapabilityArc() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="capabilities" className="py-20 sm:py-28 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)] scroll-mt-24">
      <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--pine-12)] text-xs font-mono text-[var(--pine)]">
            <span
              className={cn('w-2 h-2 rounded-full bg-[var(--mint-ink)]', !shouldReduceMotion && 'animate-pulse')}
              aria-hidden="true"
            />
            <span className="tracking-widest uppercase font-medium">The Capability Arc · Four Sovereign Tools</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--pine)] tracking-tight leading-[1.1]">
            Four single-purpose tools. <br />
            <span className="text-[var(--mint-ink)]">Each solves one operational problem.</span>
          </h2>
          <p className="text-[var(--pine)]/85 text-base leading-relaxed max-w-xl">
            Sovereign instruments designed to eliminate busywork. Sub-second execution, ephemeral memory processing, and zero data retention.
          </p>
        </div>

        {/* Alternating Split Capability Rows */}
        <div className="space-y-12 sm:space-y-16">
          {AUDENS_CAPABILITIES.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={cap.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-[22px] bg-[var(--surface)] border border-[var(--pine-12)] shadow-[0_8px_30px_rgba(7,41,41,0.04)] hover:border-[var(--pine-20)] hover:shadow-[0_12px_36px_rgba(7,41,41,0.06)] transition-[border-color,box-shadow] duration-200 ease-out"
              >
                {/* Visual Telemetry Chassis (Fixed 260px height) */}
                <div className={cn('lg:col-span-5 w-full', isEven ? 'lg:order-1' : 'lg:order-2')}>
                  <div className="rounded-xl bg-[var(--pine)] text-[var(--bone)] p-5 border border-[var(--pine-20)] font-mono shadow-inner h-[260px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--bone-20)] text-[10px] tracking-wider text-[var(--bone-70)]">
                        <span>{cap.telemetryHeader}</span>
                        <span className="text-[var(--mint)] flex items-center gap-1.5">
                          <span
                            className={cn('w-1.5 h-1.5 rounded-full bg-[var(--mint)]', !shouldReduceMotion && 'animate-ping')}
                            aria-hidden="true"
                          />
                          LIVE
                        </span>
                      </div>
                      <div className="py-2">
                        <span className="inline-block px-2.5 py-1 rounded bg-[var(--forest)] text-[var(--mint)] font-bold text-xs">
                          {cap.telemetryBadge}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-[var(--bone-20)]">
                      {cap.telemetryMetrics.map((m, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span className="text-[var(--bone-70)]">{m.label}</span>
                          <span className={m.status === 'alert' ? 'text-[var(--coral)]' : 'text-[var(--mint)]'}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative & Action */}
                <div className={cn('lg:col-span-7 space-y-4', isEven ? 'lg:order-2' : 'lg:order-1')}>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--mint-ink)]">
                    <span>{cap.n}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase tracking-wider">{cap.dimension}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pine)]">
                    {cap.title}
                  </h3>
                  <p className="font-medium text-[var(--pine)] text-base">
                    {cap.subhead}
                  </p>
                  <p className="text-[var(--pine)]/85 text-sm sm:text-base leading-relaxed">
                    {cap.copy}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={cap.href as Route}
                      data-testid={`capability-link-${cap.id}`}
                      className="inline-flex items-center gap-2 font-medium text-sm text-[var(--pine)] hover:text-[var(--mint-ink)] transition-[color,transform] duration-160 ease-out active:scale-[0.98] group"
                    >
                      <span>Explore {cap.title}</span>
                      <span className="transition-transform duration-160 ease-out group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
