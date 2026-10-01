import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { buildMetadata, getServiceJsonLd, JsonLd } from '@/lib/seo';
import { SubpageHeroAtmosphere } from '@/components/organisms';
import { ServicesPillarsBento } from '@/components/organisms/sections/ServicesPillarsBento';
import { ServicesEngagementTimeline } from '@/components/organisms/sections/ServicesEngagementTimeline';

export const metadata: Metadata = buildMetadata({
  path: '/services',
  title: 'Solutions & Engineering',
  description:
    'AI solutions and automation, custom modern web software, spatial computing, and applied research. Engineered cleanly, with no vendor lock-in.',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={getServiceJsonLd()} />

      {/* The marketing layout already owns the single <main id="main-content">
          landmark that the skip link targets, so this page contributes a plain
          wrapper — a second <main> would nest the landmarks and make the
          fragment reference ambiguous. */}
      <div className="min-h-screen font-sans bg-[#f5f5f0] dark:bg-[#060919] text-[var(--pine)] dark:text-[#F4F6FC] selection:bg-[#B278E3]/30 selection:text-[#060919]">
        {/* CINEMATIC HERO CHAMBER WITH COSMIC OBSERVATORY BACKDROP */}
        <section className="relative min-h-[65vh] lg:min-h-[72vh] flex flex-col justify-center overflow-hidden bg-[#060919] text-[#F4F6FC] border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-24">
          <SubpageHeroAtmosphere
            imageSrc="/images/bg-services-observatory.webp"
            imageAlt="Cosmic Engineering Observatory & Architectural Horizon"
            imagePosition="object-cover object-[78%_center] md:object-[80%_center]"
            glowGradient="radial-gradient(ellipse 60% 40% at 75% 65%, rgba(30,244,180,0.22), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(122,92,255,0.18), transparent 70%)"
          />

          <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              {/* Bold Unified Display Headline */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.04] tracking-[-0.035em]">
                Pragmatic systems.{' '}
                <span className="text-[#38BDF8]">Built for real operations.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A8B6D8] leading-relaxed max-w-2xl font-normal text-pretty">
                We build production-ready machine intelligence, high-performance web software, and spatial computing environments. Clean architectures, open standards, and 100% client code ownership.
              </p>
            </div>
          </Container>
        </section>

        {/* SECTION: 4 PILLARS INTERACTIVE BENTO GRID STAGE */}
        <section className="py-20 sm:py-28 border-b border-[var(--line)]">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12 space-y-3 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] dark:text-[#38BDF8] font-bold block">
                INTERACTIVE PRACTICE MATRIX
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--pine)] dark:text-white tracking-tight">
                Four engineering pillars.
              </h2>
              <p className="text-[var(--pine)]/75 dark:text-white/70 text-base sm:text-lg">
                Select a pillar below to inspect its production deliverables, system architecture, code blueprints, and runtime constraints.
              </p>
            </div>

            <ServicesPillarsBento />
          </Container>
        </section>

        {/* SECTION: 3-STEP STUDIO ENGAGEMENT TIMELINE */}
        <section className="py-20 sm:py-28 bg-[#fffdf7] dark:bg-[#060919] border-b border-[var(--line)] dark:border-white/10">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-16 space-y-3 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] dark:text-[#38BDF8] font-bold block">
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
      </div>
    </>
  );
}
