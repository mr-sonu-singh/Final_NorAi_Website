'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';

export interface TaglineRevealProps {
  className?: string;
}

const TAGLINE =
  'We reject black-box AI magic. NorAI delivers deterministic software instruments engineered with mathematical precision and physical-world reliability.';

interface WordProps {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.28, 1]);
  const color = useTransform(progress, range, ['#8491A2', '#141C2B']);

  return (
    <motion.span style={{ opacity, color }} className="inline-block transition-colors duration-200">
      {children}
    </motion.span>
  );
}

export function TaglineReveal({ className }: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = TAGLINE.split(' ');

  return (
    <section
      ref={containerRef}
      className={cn(
        'py-14 md:py-20 bg-surface-canvas border-b border-border-subtle relative overflow-hidden',
        className,
      )}
      aria-label="Core Philosophy"
    >
      <Container size="default">
        <div className="max-w-[680px] mx-auto text-center space-y-5">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Core Philosophy
          </p>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-display text-balance select-none">
            {shouldReduceMotion ? (
              <span className="text-text-primary">{TAGLINE}</span>
            ) : (
              <span className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1">
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + 1 / words.length;
                  return (
                    <Word key={`${word}-${i}`} range={[start, end]} progress={scrollYProgress}>
                      {word}
                    </Word>
                  );
                })}
              </span>
            )}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-text-muted tracking-wide uppercase pt-4">
            Sub-second P95 Latency · Zero Cloud Retention · Verified Schemas
          </p>
        </div>
      </Container>
    </section>
  );
}
