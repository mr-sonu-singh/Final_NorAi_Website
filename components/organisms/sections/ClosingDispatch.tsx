'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Container } from '@/components/foundation/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';

export function ClosingDispatch() {
  return (
    <section id="closing-dispatch" className="py-24 sm:py-32 bg-[#f5f5f0] text-[var(--pine)] scroll-mt-24">
      <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Archetype 4: The Radiant Sunset-Mint Light Sculpture */}
        <div
          className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-16 lg:p-20 overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #FF7755 0%, #FFAE42 42%, #00E599 100%)',
          }}
        >
          {/* Subtle Ambient Radial Overlay */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block text-xs uppercase font-mono tracking-[0.2em] text-[#072929] font-extrabold">
              — START THE CONVERSATION
            </span>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#072929] tracking-tight leading-[1.05]">
              Bring us the problem you are actually facing.
            </h2>

            <p className="text-[#072929]/85 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans font-medium">
              An initial technical conversation is one hour with our founding engineers. A straight answer: the right architecture, cost, and timeline.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={'/contact' as Route}
                className="btn btn--solid h-13 px-8 rounded-full bg-[#072929] text-white hover:bg-[#0b3d3d] text-base font-bold shadow-lg flex items-center justify-center gap-2.5 transition-[background-color,transform] duration-160 ease-out active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Talk to an Engineer</span>
                <HandWaveIcon className="w-4 h-4 text-[var(--mint)]" />
              </Link>
              <Link
                href={'/products' as Route}
                className="btn h-13 px-7 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-[#072929] hover:bg-white/65 text-base font-bold flex items-center justify-center transition-[background-color,border-color,transform] duration-160 ease-out active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Explore 4 Tools →</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
