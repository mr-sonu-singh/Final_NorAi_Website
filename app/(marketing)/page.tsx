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
