'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/foundation/Container';
import { ArrowRight, GraduationCap, HeartHandshake, Compass } from 'lucide-react';

export function CivicMissionBanner() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#072929] text-[#f5f5f0] border-b border-white/10 overflow-hidden">
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
        className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-[#1ef4b4]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Monumental Mission Statement */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#1ef4b4] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#1ef4b4] animate-pulse" aria-hidden="true" />
              <span>CIVIC UPSKILLING MISSION · BHARAT & YOUTH</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[2.9rem] text-[#f5f5f0] leading-[1.14] tracking-tight">
              Empowering Millions of Youth with AI Skills —{' '}
              <span className="text-[#1ef4b4]">Aligned with the vision of an AI-ready India.</span>
            </h2>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Based in Ghazipur, Uttar Pradesh, NorAI is committed to expanding hands-on computational education, open-weight model literacy, and practical developer workshops across regional colleges and grassroots youth.
            </p>

            {/* Metrics Ribbon */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-white/12 text-xs sm:text-sm font-mono text-white/80">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1ef4b4]" />
                <span><strong className="text-white font-bold">Grassroots Outreach</strong> for Regional Youth</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#75d3da]" />
                <span><strong className="text-white font-bold">Ghazipur & Eastern UP</strong> Roots</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#ffe9b5]" />
                <span><strong className="text-white font-bold">Vernacular Hindi</strong> AI Tools</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Action Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-md text-left space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1ef4b4] font-bold">
                  Educational Vision
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Collaborate on Student Workshops
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Colleges, educators, and student organizers are invited to connect with us as we formulate our upcoming regional curriculums.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/mission"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1ef4b4] text-[#072929] font-bold text-sm hover:bg-white transition-all duration-160 ease-out active:scale-[0.98] shadow-md group"
                >
                  <span>Explore the Bharat Vision</span>
                  <ArrowRight className="w-4 h-4 text-[#072929] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default CivicMissionBanner;
