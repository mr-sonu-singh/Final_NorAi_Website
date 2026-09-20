import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { ShieldCheck, Zap, Clock } from 'lucide-react';
import { buildMetadata, getServiceJsonLd, JsonLd } from '@/lib/seo';
import { SubpageHeroAtmosphere } from '@/components/organisms';
import { ServicesPillarsBento } from '@/components/organisms/sections/ServicesPillarsBento';
import { ServicesEngagementTimeline } from '@/components/organisms/sections/ServicesEngagementTimeline';

export const metadata: Metadata = buildMetadata({
  path: '/services',
  title: 'Solutions & Engineering Practice — NorAI Technologies',
  description:
    'Pragmatic AI Solutions, Custom Modern Web Software, Spatial Computing (AR/VR), and Applied R&D. Engineered with clean code, open standards, and zero vendor lock-in.',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={getServiceJsonLd()} />

      <main id="main-content" className="min-h-screen font-sans bg-[#f5f5f0] dark:bg-[#03140f] text-[var(--pine)] dark:text-[#eaf4f0] selection:bg-[#1ef4b4] selection:text-[#03140f]">
        {/* CINEMATIC HERO CHAMBER WITH COSMIC OBSERVATORY BACKDROP */}
        <section className="relative min-h-[65vh] lg:min-h-[72vh] flex flex-col justify-center overflow-hidden bg-[#04130f] text-[#eaf4f0] border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-24">
          <SubpageHeroAtmosphere
            imageSrc="/images/bg-services-observatory.webp"
            imageAlt="Cosmic Engineering Observatory & Architectural Horizon"
            imagePosition="object-cover object-[78%_center] md:object-[80%_center]"
            glowGradient="radial-gradient(ellipse 60% 40% at 75% 65%, rgba(30,244,180,0.22), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(122,92,255,0.18), transparent 70%)"
          />

          <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              {/* Architecture Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#1ef4b4]/30 backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1ef4b4] animate-pulse" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase text-[#eaf4f0]/90 font-semibold">
                  SOLUTIONS &amp; PRACTICE CAPABILITIES · 4 PILLARS
                </span>
              </div>

              {/* Bold Unified Display Headline */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.04] tracking-[-0.035em]">
                Pragmatic systems.{' '}
                <span className="text-[#1ef4b4]">Built for real operations.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#a8beb4] leading-relaxed max-w-2xl font-normal text-pretty">
                We build production-ready machine intelligence, high-performance web software, and spatial computing environments. Clean architectures, open standards, and 100% client code ownership.
              </p>

              {/* Telemetry Strip Badges */}
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[#eaf4f0]">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/15 backdrop-blur-md shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#1ef4b4]" />
                  <span>100% Client IP Ownership</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/15 backdrop-blur-md shadow-xs">
                  <Clock className="w-4 h-4 text-[#7a5cff]" />
                  <span>5-Day Rapid PoC Sprints</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/15 backdrop-blur-md shadow-xs">
                  <Zap className="w-4 h-4 text-[#ffa24d]" />
                  <span>Sub-Second Latency SLAs</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION: 4 PILLARS INTERACTIVE BENTO GRID STAGE */}
        <section className="py-20 sm:py-28 border-b border-[var(--line)]">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12 space-y-3 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] dark:text-[#1ef4b4] font-bold block">
                INTERACTIVE PRACTICE MATRIX
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--pine)] dark:text-white tracking-tight">
                Four engineering pillars.
              </h2>
              <p className="text-[var(--pine)]/75 dark:text-white/70 text-base sm:text-lg">
                Select a pillar below to inspect its production deliverables, system architecture, code blueprints, and in-memory SLAs.
              </p>
            </div>

            <ServicesPillarsBento />
          </Container>
        </section>

        {/* SECTION: 3-STEP STUDIO ENGAGEMENT TIMELINE */}
        <section className="py-20 sm:py-28 bg-[#fffdf7] dark:bg-[#04130f] border-b border-[var(--line)] dark:border-white/10">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-16 space-y-3 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] dark:text-[#1ef4b4] font-bold block">
                HOW WE WORK WITH CLIENTS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--pine)] dark:text-white tracking-tight">
                Transparent studio engagement.
              </h2>
              <p className="text-[var(--pine)]/75 dark:text-white/70 text-base sm:text-lg">
                No opaque retainer black boxes. Every engagement progresses through three disciplined milestones with guaranteed deliverables.
              </p>
            </div>

            <ServicesEngagementTimeline />
          </Container>
        </section>
      </main>
    </>
  );
}
