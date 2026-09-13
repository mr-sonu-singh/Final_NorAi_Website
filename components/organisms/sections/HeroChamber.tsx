'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/foundation/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';

export function HeroChamber() {
  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-32 overflow-hidden bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)]">
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
        {/* Minimalist Typographic Overline (Pure typography with emerald dash, no box) */}
        <div className="flex items-center justify-center gap-2 mb-8 text-xs sm:text-sm font-mono tracking-[0.18em] uppercase text-[var(--pine)]/80 font-medium">
          <span className="w-2 h-0.5 bg-[var(--mint-ink)]" aria-hidden="true" />
          <span>SOVEREIGN AI SYSTEMS · BHARAT &amp; ENTERPRISE</span>
        </div>

        {/* Giant Display Headline (Cabinet Grotesk 800 with tight tracking) */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em] mb-8">
          Software you own. <br />
          <span className="relative inline-block text-[var(--pine)]">
            Intelligence that{' '}
            <span className="relative inline-block text-[var(--pine)]">
              stays.
              {/* Hand-drawn organic SVG emerald highlight loop (Audens Signature Hook) */}
              <svg
                className="absolute -inset-x-4 -inset-y-2.5 w-[calc(100%+32px)] h-[calc(100%+20px)] pointer-events-none text-[#00E599]"
                viewBox="0 0 160 60"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 14 30 C 14 12, 75 5, 146 14 C 158 22, 154 46, 122 53 C 65 58, 10 52, 5 33 C 2 18, 35 7, 85 7"
                  stroke="currentColor"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </h1>

        {/* Ruthless Copy Cut: Exactly 20 Words */}
        <p className="text-[var(--pine)]/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 text-pretty font-normal">
          NorAI builds private, air-gapped AI systems for enterprise infrastructure, and sovereign everyday tools for the students and citizens of Bharat.
        </p>

        {/* Dual Pill Action Cluster: High-Voltage Solid Mint Primary + Ghost Secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn h-12 px-8 rounded-full bg-[#00E599] text-[#072929] hover:bg-[#1ef4b4] text-base font-bold shadow-[0_10px_30px_-10px_rgba(0,229,153,0.5)] flex items-center gap-2 transition-[transform,background-color,box-shadow] duration-160 ease-out active:scale-[0.98] group"
          >
            <span>Book a diagnostic</span>
            <HandWaveIcon className="w-4 h-4 text-[#072929] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
          </Link>
          <Link
            href="/products"
            className="btn btn--ghost h-12 px-8 rounded-full border border-[var(--pine-20)] hover:bg-[var(--pine-08)] text-[var(--pine)] text-base font-medium transition-[background-color,border-color,transform] duration-160 ease-out active:scale-[0.98]"
          >
            <span>Explore the capabilities →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
