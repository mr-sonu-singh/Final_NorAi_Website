import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { KineticWaveMarquee } from '@/components/foundation';
import {
  HeroChamber,
  CapabilityArc,
  ThreeDimensionsRail,
  SectorLedger,
  OperatingRitualsRail,
  BharatMissionBeat,
  ClosingDispatch,
} from '@/components/organisms';
import { buildMetadata, getOrganizationJsonLd, getLocalBusinessJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'NorAI Technologies — Built to change what happens',
  description:
    'Four single-purpose autonomous tools and private enterprise intelligence pipelines. Sub-second latency, zero data retention, and systems you own.',
});

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getOrganizationJsonLd()} />
      <JsonLd schema={getLocalBusinessJsonLd()} />

      {/* =========================================================================
          BEAT 1: AURORA HERO CHAMBER (Audens .phero)
          Single-column centered chamber with atmospheric aurora orbs & executive authority
          ========================================================================= */}
      <HeroChamber />

      {/* =========================================================================
          BEAT 2: THREE DIMENSIONS CONVERSATION RAIL (Audens Staggered Chat Slots)
          ========================================================================= */}
      <ThreeDimensionsRail />

      {/* =========================================================================
          BEAT 3: THE MANIFEST SHIFT RAIL (High-Conviction Editorial Statement)
          ========================================================================= */}
      <section className="section py-20 sm:py-28 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1020px] mx-auto px-4 sm:px-6">
          <span className="eyebrow text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] font-semibold block mb-4">
            The Shift
          </span>
          <p className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-[var(--pine)]">
            Every business is faster now. But most AI is built on borrowed APIs and fragile wrappers.
            We build sovereign software you own — deployed into your infrastructure, with your data, under your control.
          </p>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 4: KINETIC WAVE MARQUEE (Off-Main-Thread GPU Accelerated Ribbon)
          ========================================================================= */}
      <KineticWaveMarquee />

      {/* =========================================================================
          BEAT 5: THE CAPABILITY ARC · FOUR SOVEREIGN TOOLS (id="capabilities")
          ========================================================================= */}
      <CapabilityArc />

      {/* =========================================================================
          BEAT 6: THE SECTOR LEDGER (Enterprise & Bharat Matrix)
          ========================================================================= */}
      <SectorLedger />

      {/* =========================================================================
          BEAT 6.5: OPERATING RITUALS (How We Build Software)
          ========================================================================= */}
      <section id="operating-rituals" className="py-20 sm:py-28 bg-[#f5f5f0] border-b border-[var(--line)] scroll-mt-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <OperatingRitualsRail />
        </Container>
      </section>

      {/* =========================================================================
          BEAT 6.8: GRASSROOTS BHARAT MISSION SECTION (75 Districts)
          ========================================================================= */}
      <BharatMissionBeat />

      {/* =========================================================================
          BEAT 7: UNIVERSAL CLOSING DISPATCH (.gradient-card)
          High-voltage animated conic gradient wrapper enclosing action prompt
          ========================================================================= */}
      <ClosingDispatch />
    </div>
  );
}
