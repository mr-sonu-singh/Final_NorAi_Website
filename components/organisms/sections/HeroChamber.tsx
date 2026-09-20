'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/foundation/Container';
import { HeroLandscapeScene } from './HeroLandscapeScene';
import { Layers, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function HeroChamber() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] lg:min-h-[98vh] flex flex-col justify-between overflow-hidden bg-[#04130f] text-[#eaf4f0] border-b border-white/10 pt-28 pb-12 sm:pt-36 sm:pb-16">
      {/* Background Banyan Tree & Cosmic Aurora Scene */}
      <HeroLandscapeScene />

      <Container size="default" className="relative z-10 w-full max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="max-w-[44rem] text-left pt-6 sm:pt-10">
          {/* Architectural Location & Identity Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#1ef4b4]/30 backdrop-blur-md shadow-xs mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#1ef4b4] animate-pulse" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-[#eaf4f0]/90 font-semibold">
              {t.hero.locationTag}
            </span>
          </div>

          {/* Display Headline in Native Plus Jakarta Sans */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.04] tracking-[-0.035em] text-white font-extrabold mb-6">
            <span className="block">{t.hero.headlinePrefix}</span>
            <span className="relative inline-block text-[#1ef4b4] tracking-[-0.04em] mt-1 sm:mt-2">
              <span>{t.hero.headlineHighlight}</span>
              <svg
                className="absolute -bottom-2 left-[-1%] w-[102%] h-3.5 sm:h-4 overflow-visible pointer-events-none"
                viewBox="0 0 400 16"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-swoosh-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1ef4b4" />
                    <stop offset="65%" stopColor="#8af6cf" />
                    <stop offset="100%" stopColor="#ffa24d" />
                  </linearGradient>
                </defs>
                <path
                  d="M 4 11 C 120 3, 280 3, 396 9"
                  pathLength="1"
                  stroke="url(#hero-swoosh-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="hero-swoosh-path"
                />
              </svg>
            </span>
          </h1>

          {/* Approachable, Clear Lede */}
          <p className="text-[#a8beb4] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10 text-pretty font-normal">
            {t.hero.lede}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 sm:mb-14">
            <Link
              href="/services"
              className="btn h-12 sm:h-13 px-7 rounded-full bg-[#1ef4b4] text-[#03140f] hover:bg-[#1ae0a5] text-base font-semibold shadow-lg shadow-[#1ef4b4]/25 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] group"
            >
              <span>{t.hero.exploreSolutions}</span>
              <ArrowRight className="w-4 h-4 text-[#03140f] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/mission"
              className="btn h-12 sm:h-13 px-7 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 hover:border-[#1ef4b4]/40 text-[#eaf4f0] text-base font-medium backdrop-blur-md transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>{t.hero.civicMission}</span>
              <ArrowRight className="w-4 h-4 text-[#a8beb4]" />
            </Link>
          </div>

          {/* Micro-Telemetry Identity Strip */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm font-mono text-[#a8beb4]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#1ef4b4]" />
              <span>{t.hero.ghazipurStudio}</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#7a5cff]" />
              <span>{t.hero.fourPillars}</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffa24d]" />
              <span>{t.hero.clientOwnership}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroChamber;
