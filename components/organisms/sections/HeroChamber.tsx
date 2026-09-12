'use client';

import React from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';
import { cn } from '@/lib/utils';

export function HeroChamber() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)]">
      {/* Audens Multi-Color Aurora Glow Orbs */}
      <div
        className="absolute -top-24 -left-20 w-[550px] h-[550px] rounded-full bg-[var(--mint)]/18 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-[var(--lavender)]/14 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1040px] mx-auto text-center px-4 sm:px-6">
        {/* Monospace Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--pine-12)] text-xs font-mono text-[var(--pine)] mb-8">
          <span
            className={cn('w-2 h-2 rounded-full bg-[var(--mint-ink)]', !shouldReduceMotion && 'animate-pulse')}
            aria-hidden="true"
          />
          <span className="tracking-widest uppercase font-medium">
            SOVEREIGN AI SYSTEMS · BHARAT &amp; ENTERPRISE
          </span>
        </div>

        {/* Giant Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight mb-8">
          Software you own. <br />
          <span className="text-[var(--mint-ink)] relative inline-block">
            Intelligence that stays.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[var(--mint)]"
              viewBox="0 0 240 40"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 26 C 60 6, 150 6, 236 22"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* 2-Sentence Conviction Lede */}
        <p className="text-[var(--pine)]/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 text-pretty">
          NorAI engineers private AI systems and sovereign everyday tools. Air-gapped enterprise pipelines you control, and 100% free computational literacy across 75 districts of Uttar Pradesh.
        </p>

        {/* Dual Pill Action Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/contact"
            className="btn btn--solid h-12 px-7 rounded-full bg-[var(--pine)] text-[var(--bone)] hover:bg-[var(--forest)] text-base font-semibold shadow-md flex items-center gap-2 transition-[transform,background-color] duration-160 ease-out active:scale-[0.98] group"
          >
            <span>Book a diagnostic</span>
            <HandWaveIcon className="w-4 h-4 text-[var(--mint)] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
          </Link>
          <Link
            href="/products"
            className="btn btn--ghost h-12 px-7 rounded-full border border-[var(--pine-20)] hover:bg-[var(--pine-08)] text-[var(--pine)] text-base font-medium transition-[background-color,border-color,transform] duration-160 ease-out active:scale-[0.98]"
          >
            <span>Explore the capabilities →</span>
          </Link>
        </div>

        {/* Micro-Telemetry Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--pine)]/70">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-ink)]" aria-hidden="true" />
            Zero cloud training egress
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-ink)]" aria-hidden="true" />
            Sub-second in-memory execution
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-ink)]" aria-hidden="true" />
            Your keys, your infrastructure
          </span>
        </div>
      </Container>
    </section>
  );
}
