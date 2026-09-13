'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useReducedMotion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';
import { cn } from '@/lib/utils';

export function ClosingDispatch() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="closing-dispatch" className="py-20 sm:py-28 bg-[#f5f5f0] text-[var(--pine)] scroll-mt-24">
      <Container size="default" className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="gradient-card p-[2px] rounded-[24px] overflow-hidden relative shadow-2xl">
          {/* Animated Conic Gradient Border */}
          <div
            className={cn(
              'absolute -inset-[50%] w-[200%] h-[200%] pointer-events-none',
              !shouldReduceMotion && 'animate-[rotateConic_14s_linear_infinite]'
            )}
            style={{
              background:
                'conic-gradient(var(--mint), var(--sky), var(--lavender), var(--coral), var(--butter), var(--mint))',
            }}
            aria-hidden="true"
          />

          {/* Inner Card - Pure Ivory Surface with Deep Pine Text */}
          <div className="relative z-10 bg-[#fffdf7] rounded-[22px] p-8 sm:p-14 text-center sm:text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] font-bold">
                THE FIRST ENGAGEMENT
              </span>
              <h2 className="font-display font-normal text-3xl sm:text-4xl text-[var(--pine)] tracking-tight">
                Tell us what&apos;s slowing you down. <br className="hidden sm:inline" />
                Bring us the operational bottleneck you are actually facing.
              </h2>
              <p className="text-[var(--pine)]/80 text-sm sm:text-base leading-relaxed">
                A first technical conversation is with our founding engineers. We evaluate your workflow, define the exact private architecture, and quote a fixed two-week diagnostic before any bigger build.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <Link
                href={'/contact' as Route}
                className="btn btn--solid h-12 px-7 rounded-full bg-[var(--pine)] text-[var(--bone)] hover:bg-[var(--forest)] text-base font-semibold shadow-md flex items-center justify-center gap-2 transition-[background-color,transform] duration-160 ease-out active:scale-[0.98]"
              >
                <span>Talk to an Engineer</span>
                <HandWaveIcon className="w-4 h-4 text-[var(--mint)]" />
              </Link>
              <Link
                href={'/products' as Route}
                className="btn btn--ghost h-12 px-6 rounded-full border border-[var(--pine-20)] text-[var(--pine)] hover:bg-[var(--pine-08)] text-base font-medium flex items-center justify-center transition-[background-color,border-color,transform] duration-160 ease-out active:scale-[0.98]"
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
