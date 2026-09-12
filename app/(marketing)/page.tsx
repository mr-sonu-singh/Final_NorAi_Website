import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { KineticWaveMarquee } from '@/components/foundation';
import { Link } from '@/components/atoms/Link';
import {
  HeroChamber,
  AudensCapabilityBento,
  ThreeDimensionsRail,
  SectorLedger,
  OperatingRitualsRail,
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
          BEAT 5: AUDENS CAPABILITY BENTO & 4 MICRO-VIGNETTES (id="tools")
          ========================================================================= */}
      <AudensCapabilityBento />

      {/* =========================================================================
          BEAT 6: THE SECTOR LEDGER (Enterprise & Bharat Matrix)
          ========================================================================= */}
      <SectorLedger />

      {/* =========================================================================
          BEAT 6.5: OPERATING RITUALS (How We Build Software)
          ========================================================================= */}
      <section id="operating-rituals" className="py-20 sm:py-28 bg-[#f5f5f0] border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <OperatingRitualsRail />
        </Container>
      </section>

      {/* =========================================================================
          BEAT 7: CLOSING DISPATCH (.gradient-card)
          High-voltage animated conic gradient wrapper enclosing action prompt
          ========================================================================= */}
      <section id="closing-dispatch" className="section py-20 sm:py-28 bg-[#f5f5f0] text-[var(--pine)]">
        <Container size="default" className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="gradient-card">
            <div className="gradient-card__inner text-center sm:text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint)] font-semibold">
                  Next Steps
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--bone)] tracking-tight">
                  Tell us what&apos;s slowing you down. Build AI that ships.
                </h2>
                <p className="text-[var(--bone-70)] text-sm sm:text-base leading-relaxed">
                  Tell us where you are. We usually open with a fast, fixed-scope diagnostic that proves ROI before the bigger build.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn btn--mint h-12 px-7 text-base font-bold shadow-lg shrink-0"
              >
                <span>Talk to an Engineer</span>
                <svg
                  className="btn__hand w-5 h-5 text-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-3.8-1.8L4 16.2a1.5 1.5 0 0 1 2.2-2L8 16V8.5a1.5 1.5 0 0 1 1-1.4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
