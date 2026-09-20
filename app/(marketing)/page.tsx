import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { KineticWaveMarquee } from '@/components/foundation';
import {
  HeroChamber,
  CivicMissionBanner,
  FourPillarsStage,
  CapabilityArc,
  SectorLedger,
  OperatingRitualsRail,
  ClosingDispatch,
} from '@/components/organisms';
import { buildMetadata, getOrganizationJsonLd, getLocalBusinessJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'NorAI Technologies — Pragmatic AI Engineering & Upskilling Mission',
  description:
    'Indian AI engineering practice and civic upskilling mission based in Ghazipur, Uttar Pradesh. Pragmatic AI solutions, modern custom web software, spatial computing, and educational student workshops.',
});

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getOrganizationJsonLd()} />
      <JsonLd schema={getLocalBusinessJsonLd()} />

      {/* BEAT 1: HERO CHAMBER WITH INTERACTIVE VECTOR LATTICE */}
      <HeroChamber />

      {/* BEAT 2: CIVIC MISSION ARCHITECTURAL BANNER (Aligned with AI-Ready India) */}
      <CivicMissionBanner />

      {/* BEAT 3: THE 4 CORE PILLARS INTERACTIVE STAGE */}
      <FourPillarsStage />

      {/* BEAT 4: THE STUDIO MANIFESTO (Ghazipur Conviction) */}
      <section className="py-24 sm:py-36 bg-[#072929] text-[#f5f5f0] border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#f5f5f0 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <Container size="default" className="relative z-10 max-w-[1080px] mx-auto px-4 sm:px-6">
          <span className="eyebrow text-xs uppercase font-mono tracking-[0.2em] text-[#1ef4b4] font-bold block mb-8">
            — THE STUDIO CONVICTION · BHARAT &amp; BEYOND
          </span>
          <p className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[3.1rem] leading-[1.18] text-[#f5f5f0] mb-12 tracking-tight">
            Too much of the AI conversation is trapped in metro hype bubbles and theoretical throat-clearing. We chose to build from Ghazipur, Uttar Pradesh—where technical craft meets genuine human empowerment.
          </p>
          <div className="pt-10 border-t border-white/15">
            <p className="font-sans text-xl sm:text-2xl text-white/70 mb-4 font-normal">
              High-caliber engineering practice. Transparent open standards. No vendor lock-in.
            </p>
            <div className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1ef4b4] tracking-[-0.04em] leading-none mb-6">
              NorAI.
            </div>
            <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-widest">
              Engineered in Ghazipur, Uttar Pradesh · 100% Client IP Ownership · Aligned with an AI-Ready India
            </p>
          </div>
        </Container>
      </section>

      {/* BEAT 5: KINETIC WAVE MARQUEE */}
      <KineticWaveMarquee />

      {/* BEAT 6: STUDENT & STUDIO PROTOTYPES (Pillar 4 Living Proof) */}
      <CapabilityArc />

      {/* BEAT 7: INDUSTRY SECTOR LEDGER */}
      <SectorLedger />

      {/* BEAT 8: OPERATING RITUALS (Studio Ethics & Code Quality) */}
      <section id="operating-rituals" className="py-20 sm:py-28 bg-[#f5f5f0] border-b border-[var(--line)] scroll-mt-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <OperatingRitualsRail />
        </Container>
      </section>

      {/* BEAT 10: CLOSING DISPATCH */}
      <ClosingDispatch />
    </div>
  );
}
