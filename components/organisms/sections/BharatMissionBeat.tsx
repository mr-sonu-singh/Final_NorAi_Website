'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Container } from '@/components/foundation/Container';

const IMPACT_ROWS = [
  {
    n: '01',
    audience: 'Village Citizens',
    subtitle: 'Vernacular Hindi Literacy & Public Welfare Access',
    desc: 'Voice-first vernacular Hindi interfaces, welfare accessibility, and digital fraud defense for village elders, local tradespeople, and rural micro-enterprises.',
    badge: '₹0 Fee · Direct Access',
  },
  {
    n: '02',
    audience: 'Collegiate Students',
    subtitle: 'Academic Acceleration & Sovereign Sandboxes',
    desc: 'Free scholar compute sandboxes for KaTeX mathematical synthesis, lecture extraction, and accelerated technical thesis research across regional colleges.',
    badge: '₹0 Student Cost · Regional Youth',
  },
  {
    n: '03',
    audience: 'Ambitious Builders',
    subtitle: 'Deterministic Systems Engineering & Local Models',
    desc: 'Founder-led masterclasses on Model Context Protocol (MCP), local vLLM serving, quantized inference, and vector indexing for ambitious regional engineers.',
    badge: 'Open-Weight · In-Person Labs',
  },
];

export function BharatMissionBeat() {
  return (
    <section
      id="bharat-mission"
      className="py-24 sm:py-32 bg-[#072929] text-[var(--bone)] border-b border-white/10 relative overflow-hidden scroll-mt-24"
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
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <span className="eyebrow text-xs uppercase font-mono tracking-[0.2em] text-[var(--mint)] font-bold block">
            — 03 · GRASSROOTS BHARAT MISSION · YOUTH UPSKILLING
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--bone)] tracking-tight leading-[1.05]">
            A Sovereign Vision. To Upskill Youth & Local Regions.
          </h2>
          <p className="text-[var(--bone-70)] text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
            Free computational literacy, developer masterclasses, and vernacular AI dedicated to local youth and grassroots communities.
          </p>
        </div>

        {/* 3 Borderless Horizontal Impact Rows */}
        <div className="border-t border-white/10">
          {IMPACT_ROWS.map((pillar) => (
            <div
              key={pillar.n}
              className="py-8 sm:py-10 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
                {/* Left: Index & Audience */}
                <div className="lg:col-span-4 flex items-baseline gap-4">
                  <span className="font-mono text-sm font-bold text-[var(--mint)] tracking-widest shrink-0">
                    /{pillar.n}
                  </span>
                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--bone)] group-hover:text-[var(--mint)] transition-colors duration-200">
                      {pillar.audience}
                    </h3>
                    <p className="font-mono text-xs text-[var(--bone-60)] tracking-wider mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                {/* Center: Description */}
                <div className="lg:col-span-5">
                  <p className="text-sm sm:text-base text-[var(--bone-70)] leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>

                {/* Right: Institutional Badge */}
                <div className="lg:col-span-3 flex lg:justify-end items-center pt-2 lg:pt-0">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b3333] border border-[var(--mint)]/30 text-xs font-mono text-[var(--mint)] font-semibold shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
                    {pillar.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Monumental Metric Ribbon & CTA */}
        <div className="mt-14 sm:mt-18 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-wider text-[var(--bone-70)]">
            <span className="text-[var(--mint)] font-bold">VISION FOR REGIONAL YOUTH</span>
            <span className="text-[var(--mint)]" aria-hidden="true">✦</span>
            <span className="text-[var(--bone)] font-semibold">100% FREE ADMISSION</span>
            <span className="text-[var(--mint)]" aria-hidden="true">✦</span>
            <span className="text-[var(--bone-60)]">ZERO CLOUD LOCK-IN</span>
          </div>
          <Link
            href={'/mission' as Route}
            className="btn btn--solid text-xs sm:text-sm h-11 px-6 rounded-full bg-[var(--mint)] text-[var(--pine)] font-extrabold hover:bg-white transition-[background-color,transform] duration-160 ease-out active:scale-[0.98] shrink-0"
          >
            Explore the Upskilling Vision →
          </Link>
        </div>
      </Container>
    </section>
  );
}
