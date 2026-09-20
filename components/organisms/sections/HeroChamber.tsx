'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/foundation/Container';
import { EngineeringLatticeCanvas } from '@/components/atoms/EngineeringLatticeCanvas';
import { Layers, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export function HeroChamber() {
  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-36 overflow-hidden bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)]">
      {/* Interactive Vector Engineering Lattice */}
      <EngineeringLatticeCanvas />

      {/* Subtle Restrained Ambient Aura Orbs */}
      <div
        className="absolute -top-28 -left-20 w-[500px] h-[500px] rounded-full bg-[var(--norai-blue-soft)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full bg-[var(--norai-violet-soft)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1060px] mx-auto text-center px-4 sm:px-6">
        {/* Architectural Location & Identity Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-mono tracking-[0.16em] uppercase text-[var(--pine)]/85 font-semibold">
            NOR AI TECHNOLOGIES · GHAZIPUR, UTTAR PRADESH
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold text-[var(--pine)] leading-[1.05] tracking-[-0.035em] mb-8">
          Engineering pragmatic intelligence.{' '}
          <span className="relative inline-block text-[var(--mint-ink)]">
            Building what matters.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[var(--mint)] opacity-80"
              viewBox="0 0 240 20"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 2 15 C 60 5, 180 5, 238 15"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Approachable, Jargon-Eliminated Lede (25 words) */}
        <p className="text-[var(--pine)]/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 text-pretty font-normal">
          Pragmatic AI systems, high-performance web platforms, and spatial computing environments. Engineered in Ghazipur, Uttar Pradesh, for real businesses and an AI-ready India.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/services"
            className="btn h-12 px-8 rounded-full bg-[var(--pine)] text-[#f5f5f0] hover:bg-[#123838] text-base font-semibold shadow-md flex items-center gap-2.5 transition-all duration-160 ease-out active:scale-[0.98] group"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="w-4 h-4 text-[#1ef4b4] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/mission"
            className="btn btn--ghost h-12 px-8 rounded-full border border-[var(--pine-20)] bg-[#fffdf7]/80 hover:bg-[#fffdf7] text-[var(--pine)] text-base font-medium transition-all duration-160 ease-out active:scale-[0.98] flex items-center gap-2"
          >
            <span>Our Civic Mission</span>
            <ArrowRight className="w-4 h-4 text-[var(--pine)]/60" />
          </Link>
        </div>

        {/* Micro-Telemetry Identity Strip */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[var(--pine)]/70">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[var(--norai-blue)]" />
            <span>Ghazipur Studio, UP</span>
          </div>
          <span className="text-[var(--pine-20)]">·</span>
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[var(--norai-violet)]" />
            <span>4 Core Pillars</span>
          </div>
          <span className="text-[var(--pine-20)]">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--mint-ink)]" />
            <span>100% Client IP Ownership</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroChamber;
