import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { DistrictImpactRadar } from '@/components/organisms';
import { SubpageHeroAtmosphere } from '@/components/organisms';
import { MissionTiersInteractive } from '@/components/organisms/sections/MissionTiersInteractive';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  path: '/mission',
  title: 'Youth Upskilling Mission — Aligned with an AI-Ready India | NorAI',
  description:
    'A dedicated vision to democratize AI literacy and deterministic engineering for collegiate students, youth, and regional communities across Uttar Pradesh.',
});

const GROUND_FACTS = [
  {
    value: 'Vision',
    label: 'Regional Youth',
    detail: 'Committed to bringing applied AI skills to collegiate talent across Uttar Pradesh',
    accent: '#38BDF8',
  },
  {
    value: 'Studio',
    label: 'Ghazipur Roots',
    detail: 'Founded outside metro bubbles in Eastern UP with genuine regional conviction',
    accent: '#7a5cff',
  },
  {
    value: 'Open',
    label: 'Open Standards',
    detail: 'Building curriculum around open-weight models, Python, and local compute',
    accent: '#00e5ff',
  },
  {
    value: 'Craft',
    label: 'Applied Building',
    detail: 'Project-based hands-on problem solving rather than passive lectures',
    accent: '#ffa24d',
  },
];

export default function MissionPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Mission', path: '/mission' },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] dark:bg-[#060919] text-[var(--pine)] dark:text-[#F4F6FC] selection:bg-[#B278E3]/30 selection:text-[#060919]">
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* CINEMATIC HERO CHAMBER WITH EASTERN UP DAWN BANYAN BACKDROP */}
      <section className="relative min-h-[68vh] lg:min-h-[75vh] flex flex-col justify-center overflow-hidden bg-[#060919] text-[#F4F6FC] border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <SubpageHeroAtmosphere
          imageSrc="/images/bg-mission-dawn-banyan.webp"
          imageAlt="Eastern UP Dawn & Banyan Tree Horizon"
          imagePosition="object-cover object-[75%_center] md:object-[78%_center]"
          glowGradient="radial-gradient(ellipse 60% 40% at 75% 65%, rgba(255,162,77,0.22), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(30,244,180,0.18), transparent 70%)"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl text-left space-y-6">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-[#38BDF8] font-semibold block mb-2">
              BHARAT YOUTH UPSKILLING MISSION · GHAZIPUR, UP
            </span>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.04] tracking-[-0.035em]">
              Empowering Millions of Youth with AI Skills.{' '}
              <span className="text-[#38BDF8]">Aligned with an AI-ready India.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A8B6D8] leading-relaxed max-w-2xl font-normal text-pretty">
              Rooted in Ghazipur, Uttar Pradesh, NorAI is dedicated to expanding computational literacy, open developer workshops, and vernacular AI tools for students and regional communities.
            </p>

            {/* Dynamic Ground Facts Metric Tiles */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl">
              {GROUND_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="p-4 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-md text-left shadow-sm hover:border-white/30 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-white block tracking-tight">
                      {fact.value}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: fact.accent }}
                    />
                  </div>
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider block"
                    style={{ color: fact.accent }}
                  >
                    {fact.label}
                  </span>
                  <p className="text-[11px] text-[#A8B6D8] mt-1 leading-tight font-normal">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* DISTRICT IMPACT & RADAR */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <DistrictImpactRadar />
        </Container>
      </section>

      {/* 3-TIER COMMUNITY ARCHITECTURE WITH INTERACTIVE TABS */}
      <section className="py-16 sm:py-24 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--mint-ink)] dark:text-[#38BDF8] uppercase tracking-wider font-bold block">
              THREE-TIER COMMUNITY ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] dark:text-white tracking-tight">
              Tailored for every learner level.
            </h2>
            <p className="text-sm sm:text-base text-[var(--pine)]/75 dark:text-white/70">
              Interactive curriculum tracks from village elders navigating public schemes to undergraduate computer science students authoring production MCP servers.
            </p>
          </div>

          <MissionTiersInteractive />
        </Container>
      </section>

      {/* CLOSING DISPATCH */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden bg-[#060919] border border-white/15 text-[#F4F6FC]">
            <div
              className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20"
              style={{ background: '#7a5cff' }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                REGIONAL COLLABORATIONS &amp; WORKSHOPS
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Bring NorAI Workshops to Your Institution.
              </h2>

              <p className="text-base sm:text-lg max-w-xl mx-auto font-normal text-[#A8B6D8] leading-relaxed">
                We conduct intensive hands-on hackathons, localized student sprints, and faculty AI orientations across Uttar Pradesh and Bihar.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="h-12 px-8 rounded-xl bg-[#38BDF8] hover:bg-[#E4CEF7] text-[#060919] font-bold text-sm shadow-lg shadow-[#D4C5F9]/20 transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2 group"
                >
                  <span>Request an On-Campus Workshop</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
