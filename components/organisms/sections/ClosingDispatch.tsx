'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Route } from 'next';
import { Container } from '@/components/foundation/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';
import { ArrowRight } from 'lucide-react';

export function ClosingDispatch() {
  return (
    <section id="closing-dispatch" className="py-24 sm:py-32 bg-[#f5f5f0] dark:bg-[#03140f] text-[var(--pine)] dark:text-white scroll-mt-24 overflow-hidden">
      <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-16 lg:p-20 overflow-hidden shadow-2xl bg-[#04130f] border border-white/15 text-[#eaf4f0]"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div
            className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full blur-[110px] pointer-events-none opacity-20"
            style={{ background: '#1ef4b4' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-[#1ef4b4]">
              START THE CONVERSATION
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
              Bring us the problem you are actually facing.
            </h2>

            <p className="text-[#a8beb4] text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans font-normal text-pretty">
              An initial technical conversation is one hour with our founding engineers. A straight answer: the right architecture, cost, and timeline.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={'/contact' as Route}
                className="h-13 px-8 rounded-full bg-[#1ef4b4] hover:bg-[#1ae0a5] text-[#04130f] text-base font-bold shadow-lg shadow-[#1ef4b4]/25 flex items-center justify-center gap-2.5 transition-all duration-200 ease-out active:scale-[0.98] w-full sm:w-auto group"
              >
                <span>Talk to an Engineer</span>
                <HandWaveIcon className="w-4 h-4 text-[#04130f] transition-transform duration-200 group-hover:rotate-12" />
              </Link>
              <Link
                href={'/products' as Route}
                className="h-13 px-8 rounded-full border border-white/20 hover:border-white/40 text-white hover:bg-white/5 text-base font-medium flex items-center justify-center gap-2 transition-all duration-200 ease-out active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Explore 4 Tools</span>
                <ArrowRight className="w-4 h-4 text-[#a8beb4]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default ClosingDispatch;
