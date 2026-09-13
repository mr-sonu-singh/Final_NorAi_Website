'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useReducedMotion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';

export function BharatMissionBeat() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="bharat-mission"
      className="py-20 sm:py-28 bg-[#072929] text-[var(--bone)] border-b border-[var(--bone-20)] relative overflow-hidden scroll-mt-24"
    >
      {/* Background Subtle Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--bone) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bone-20)] text-xs font-mono text-[var(--mint)] font-medium">
            <span
              className={cn('w-2 h-2 rounded-full bg-[var(--mint)]', !shouldReduceMotion && 'animate-pulse')}
              aria-hidden="true"
            />
            <span className="tracking-widest uppercase">03 · Grassroots Bharat Mission · 75 Districts</span>
          </div>
          <h2 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl text-[var(--bone)] tracking-tight leading-[1.1]">
            75 Districts. One Sovereign Mission. <br />
            <span className="text-[var(--mint)]">Computational literacy where it matters most.</span>
          </h2>
          <p className="text-[var(--bone-70)] text-base leading-relaxed">
            True technological sovereignty cannot belong exclusively to Tier-1 boardrooms. We bring deterministic AI engineering directly to village youth, students, and regional colleges across Uttar Pradesh — 100% free of charge.
          </p>
        </div>

        {/* 3-Tier Asymmetric Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {/* Tier 01: Citizens */}
          <div className="p-7 rounded-[22px] bg-[#1e3c3b]/60 border border-[var(--bone-20)] space-y-4 hover:border-[var(--mint)]/40 hover:bg-[#1e3c3b]/80 transition-[border-color,background-color] duration-200 ease-out">
            <span className="font-mono text-xs font-bold text-[var(--mint)] px-2.5 py-1 rounded-full bg-[var(--mint)]/15 inline-block">
              TIER 01 · CITIZENS
            </span>
            <h3 className="font-sans font-semibold text-lg sm:text-xl text-[var(--bone)]">
              Vernacular Hindi Literacy
            </h3>
            <p className="text-sm text-[var(--bone-70)] leading-relaxed">
              Voice-first Hindi interfaces, government welfare navigation, and digital fraud prevention for village elders and local tradespeople.
            </p>
            <div className="text-xs font-mono text-[var(--mint)] pt-2 border-t border-[var(--bone-20)]">
              ₹0 Cost · Vernacular Delivery
            </div>
          </div>

          {/* Tier 02: Students */}
          <div className="p-7 rounded-[22px] bg-[#1e3c3b]/60 border border-[var(--bone-20)] space-y-4 hover:border-[var(--lavender)]/40 hover:bg-[#1e3c3b]/80 transition-[border-color,background-color] duration-200 ease-out">
            <span className="font-mono text-xs font-bold text-[var(--lavender)] px-2.5 py-1 rounded-full bg-[var(--lavender)]/15 inline-block">
              TIER 02 · STUDENTS
            </span>
            <h3 className="font-sans font-semibold text-lg sm:text-xl text-[var(--bone)]">
              Academic Acceleration
            </h3>
            <p className="text-sm text-[var(--bone-70)] leading-relaxed">
              Giving collegiate students free scholar sandboxes for lecture note synthesis, KaTeX mathematical extraction, and rigorous study workflows.
            </p>
            <div className="text-xs font-mono text-[var(--lavender)] pt-2 border-t border-[var(--bone-20)]">
              Free Scholar Sandbox Access
            </div>
          </div>

          {/* Tier 03: Builders */}
          <div className="p-7 rounded-[22px] bg-[#1e3c3b]/60 border border-[var(--bone-20)] space-y-4 hover:border-[var(--coral)]/40 hover:bg-[#1e3c3b]/80 transition-[border-color,background-color] duration-200 ease-out">
            <span className="font-mono text-xs font-bold text-[var(--coral)] px-2.5 py-1 rounded-full bg-[var(--coral)]/15 inline-block">
              TIER 03 · BUILDERS
            </span>
            <h3 className="font-sans font-semibold text-lg sm:text-xl text-[var(--bone)]">
              Deterministic Systems Engineering
            </h3>
            <p className="text-sm text-[var(--bone-70)] leading-relaxed">
              Direct founder-led masterclasses on Model Context Protocol (MCP), local vLLM serving, and vector databases for ambitious undergraduate engineers.
            </p>
            <div className="text-xs font-mono text-[var(--coral)] pt-2 border-t border-[var(--bone-20)]">
              Founder-Led Masterclasses
            </div>
          </div>
        </div>

        {/* Commitment Banner Strip */}
        <div className="p-6 rounded-2xl bg-[#0b3333] border border-[var(--bone-20)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--bone-70)]">
            <span className="text-[var(--mint)] font-bold">✦ 75 Districts Committed</span>
            <span aria-hidden="true">·</span>
            <span>₹0 Student Fee</span>
            <span aria-hidden="true">·</span>
            <span>Vernacular Hindi Delivery</span>
          </div>
          <Link
            href={'/mission' as Route}
            className="btn btn--solid text-xs h-10 px-5 rounded-full bg-[var(--mint)] text-[var(--pine)] font-bold hover:bg-white transition-[background-color,transform] duration-160 ease-out active:scale-[0.98] shrink-0"
          >
            Explore the 75-District Mission →
          </Link>
        </div>
      </Container>
    </section>
  );
}
