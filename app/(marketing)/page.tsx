import type { Metadata } from 'next';
import {
  HeroChamber,
  CivicMissionBanner,
  FourPillarsStage,
  CapabilityArc,
  SectorLedger,
  OperatingRitualsRail,
  ClosingDispatch,
  StudioManifesto,
} from '@/components/organisms';
import { buildMetadata, getLocalBusinessJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/',
  title: 'AI Engineering, Ghazipur',
  description:
    'Indian AI engineering practice in Ghazipur, Uttar Pradesh. Browser tools, custom web software, spatial computing, and civic AI-literacy workshops.',
});

/**
 * Only the homepage-local entity is declared here. The root layout already
 * emits Organization, so repeating it would put the same @type on one page
 * twice; this page adds the LocalBusiness that describes the studio itself.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getLocalBusinessJsonLd()} />

      {/* BEAT 1: HERO CHAMBER WITH INTERACTIVE VECTOR LATTICE */}
      <HeroChamber />

      {/* BEAT 2: CIVIC MISSION ARCHITECTURAL BANNER (Aligned with AI-Ready India) */}
      <CivicMissionBanner />

      {/* BEAT 3: THE 4 CORE PILLARS INTERACTIVE STAGE */}
      <FourPillarsStage />

      {/* BEAT 4: THE STUDIO MANIFESTO (Ghazipur Conviction) */}
      <StudioManifesto />

      {/* BEAT 5: STUDENT & STUDIO PROTOTYPES (Pillar 4 Living Proof) */}
      <CapabilityArc />

      {/* BEAT 6: INDUSTRY SECTOR LEDGER */}
      <SectorLedger />

      {/* BEAT 7: OPERATING RITUALS (STUDIO PRACTICES & PHILOSOPHY) */}
      <OperatingRitualsRail />

      {/* BEAT 8: CLOSING DISPATCH & GHAZIPUR OFFICE INQUIRY */}
      <ClosingDispatch />
    </div>
  );
}
