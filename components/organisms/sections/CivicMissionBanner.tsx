'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { ArrowRight, GraduationCap, HeartHandshake, Compass } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function CivicMissionBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 bg-[#060919] text-[#F4F6FC] border-b border-white/10 overflow-hidden">
      {/* Background Subtle Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#f5f5f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glows */}
      <div
        className="absolute -top-24 right-1/4 w-96 h-96 rounded-xl bg-[#7C3AED]/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Monumental Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-6 text-left"
          >
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#B278E3] font-bold block mb-2">
              {t.civic.eyebrow}
            </span>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[2.9rem] text-[#F4F6FC] leading-[1.14] tracking-tight">
              {t.civic.headlinePrefix}{' '}
              <span className="text-[#D4C5F9]">{t.civic.headlineHighlight}</span>
            </h2>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {t.civic.lede}
            </p>

            {/* Metrics Ribbon */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-white/12 text-xs sm:text-sm font-mono text-white/80">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
                <span><strong className="text-white font-bold">{t.civic.outreachMetric}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#75d3da]" />
                <span><strong className="text-white font-bold">{t.civic.rootsMetric}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#ffe9b5]" />
                <span><strong className="text-white font-bold">{t.civic.toolsMetric}</strong></span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Action Card with Hover Depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="rounded-2xl border border-white/15 bg-[#0D1226]/80 border-white/10 p-7 backdrop-blur-md text-left space-y-5 card-interactive glow-border-brand">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#B278E3] font-bold">
                  {t.civic.cardEyebrow}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {t.civic.cardTitle}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {t.civic.cardDesc}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/mission"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4C5F9] text-[#03091E] font-semibold text-sm hover:bg-[#E4CEF7] transition-all duration-160 ease-out active:scale-[0.98] shadow-md group"
                >
                  <span>{t.civic.cardBtn}</span>
                  <ArrowRight className="w-4 h-4 text-[#03091E] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export default CivicMissionBanner;
