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

      {/* BEAT 1: AURORA HERO CHAMBER */}
      <HeroChamber />

      {/* BEAT 2: THREE DIMENSIONS ASYMMETRIC STAGE */}
      <ThreeDimensionsRail />

      {/* BEAT 3: THE CINEMATIC SHIFT MANIFESTO */}
      <section className="py-24 sm:py-36 bg-[#072929] text-[#f5f5f0] border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#f5f5f0 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <Container size="default" className="relative z-10 max-w-[1080px] mx-auto px-4 sm:px-6">
          <span className="eyebrow text-xs uppercase font-mono tracking-[0.2em] text-[#00E599] font-bold block mb-8">
            — The Shift
          </span>
          <p className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.16] text-[#f5f5f0] mb-12 tracking-tight">
            Every business is faster now. The same drafts, decks, and answers arrive in seconds for everyone at once — which means speed is no longer an edge. It is the entry fee.
          </p>
          <div className="pt-10 border-t border-white/15">
            <p className="font-sans text-xl sm:text-2xl text-white/70 mb-4 font-normal">
              So what actually changes what your organisation is capable of?
            </p>
            <div className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#00E599] tracking-[-0.04em] leading-none mb-6">
              NorAI.
            </div>
            <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-widest">
              Sovereign software you own · Deployed in your VPC · Under your control
            </p>
          </div>
        </Container>
      </section>

      {/* BEAT 4: KINETIC WAVE MARQUEE */}
      <KineticWaveMarquee />

      {/* BEAT 5: THE CAPABILITY ARC */}
      <CapabilityArc />

      {/* BEAT 6: THE SECTOR LEDGER */}
      <SectorLedger />

      {/* BEAT 6.5: OPERATING RITUALS */}
      <section id="operating-rituals" className="py-20 sm:py-28 bg-[#f5f5f0] border-b border-[var(--line)] scroll-mt-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <OperatingRitualsRail />
        </Container>
      </section>

      {/* BEAT 6.8: GRASSROOTS BHARAT MISSION */}
      <BharatMissionBeat />

      {/* BEAT 7: UNIVERSAL CLOSING DISPATCH */}
      <ClosingDispatch />
    </div>
  );
}
