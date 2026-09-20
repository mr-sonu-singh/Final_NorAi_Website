import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  Users,
  GraduationCap,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { DistrictImpactRadar } from '@/components/organisms';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/mission',
  title: 'Youth Upskilling Mission — Aligned with an AI-Ready India | NorAI',
  description:
    'A dedicated vision to democratize AI literacy and deterministic engineering for collegiate students, youth, and regional communities across Uttar Pradesh.',
});

const COMMUNITY_TIERS = [
  {
    tier: 'TIER 01',
    badge: 'Rural & Village Citizens',
    title: 'Everyday Vernacular Literacy',
    desc: 'Bringing Hindi voice interfaces, government welfare navigation, and digital fraud prevention to village elders, self-help groups, and local tradespeople.',
    metric: 'Vernacular Delivery · Localized Learning',
    icon: Users,
    accent: 'var(--mint)',
    accentInk: 'var(--mint-ink)',
    highlights: [
      'Hindi voice prompts for crop advisory & mandi rates',
      'Digital scam detection & online payment safety',
      'Government welfare portal navigation',
    ],
  },
  {
    tier: 'TIER 02',
    badge: 'Secondary & College Students',
    title: 'Academic & Foundation Mastery',
    desc: 'Teaching high school and collegiate students how to turn AI into a tireless personal tutor, extract structured notes from messy lectures, and build rigorous study habits.',
    metric: 'Curriculum & Sandbox Access',
    icon: GraduationCap,
    accent: 'var(--lavender)',
    accentInk: '#4e3a8c',
    highlights: [
      'Lecture note-taking & structured flashcard extraction',
      'STEM homework verification without hallucination',
      'Foundational programming fundamentals',
    ],
  },
  {
    tier: 'TIER 03',
    badge: 'Collegiate Builders & Engineers',
    title: 'Deterministic Systems Engineering',
    desc: 'Direct founder-led masterclasses for ambitious undergraduate engineers: Model Context Protocol (MCP) servers, local vLLM serving, vector databases, and typed APIs.',
    metric: 'Direct Founder Mentorship',
    icon: Terminal,
    accent: 'var(--coral)',
    accentInk: '#b83818',
    highlights: [
      'Model Context Protocol (MCP) server authoring',
      'Local open-weight vLLM serving & prompt engineering',
      'Type-safe Zod runtime contracts & vector search',
    ],
  },
];

const GROUND_FACTS = [
  {
    value: 'Vision',
    label: 'Regional Youth',
    detail: 'Committed to bringing applied AI skills to collegiate talent across Uttar Pradesh',
  },
  {
    value: 'Studio',
    label: 'Ghazipur Roots',
    detail: 'Founded outside metro bubbles in Eastern UP with genuine regional conviction',
  },
  {
    value: 'Open',
    label: 'Open Standards',
    detail: 'Building curriculum around open-weight models, Python, and local compute',
  },
  {
    value: 'Craft',
    label: 'Applied Building',
    detail: 'Project-based hands-on problem solving rather than passive lectures',
  },
];

export default function MissionPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Mission', path: '/mission' },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          HERO CHAMBER WITH ASPIRATIONAL VISION
          ========================================================================= */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl text-left space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--pine)]/85 font-semibold">
                BHARAT YOUTH UPSKILLING MISSION · GHAZIPUR, UP
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--pine)] tracking-tight leading-[1.04]">
              Empowering Millions of Youth with AI Skills.{' '}
              <span className="relative inline-block text-[var(--mint-ink)]">
                Aligned with an AI-ready India.
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]"
                  viewBox="0 0 240 40"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 33C50 12 150 5 237 22"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
              Rooted in Ghazipur, Uttar Pradesh, NorAI is dedicated to expanding computational literacy, open developer workshops, and vernacular AI tools for students and regional communities.
            </p>

            {/* Ground Facts Metric Counters */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
              {GROUND_FACTS.map((fact) => (
                <div key={fact.label} className="p-4 rounded-xl bg-[#fffdf7] border border-[var(--line)] text-left shadow-xs">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)] block">
                    {fact.value}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[var(--mint-ink)] uppercase mt-0.5 block">
                    {fact.label}
                  </span>
                  <p className="text-[11px] text-[var(--pine)]/75 mt-1 leading-tight">{fact.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          DISTRICT IMPACT & CURRICULUM ROADMAP SECTION
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <DistrictImpactRadar />
        </Container>
      </section>

      {/* =========================================================================
          3 COMMUNITY TIERS
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 text-left space-y-2">
            <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-wider font-bold block">
              THREE-TIER COMMUNITY ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-tight">
              Tailored for every learner level.
            </h2>
            <p className="text-sm sm:text-base text-[var(--pine)]/75">
              From village elders navigating public schemes to undergraduate computer science students authoring MCP servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_TIERS.map((tier) => {
              const TierIcon = tier.icon;
              return (
                <div
                  key={tier.tier}
                  className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs group hover:shadow-lg transition-all duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                      <span className="font-mono text-xs font-bold text-[var(--pine)]/85">
                        {tier.tier}
                      </span>
                      <span className="font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--pine-08)] text-[var(--pine)]">
                        {tier.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[var(--porcelain)] flex items-center justify-center text-[var(--pine)]">
                          <TierIcon className="w-4 h-4" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-[var(--pine)]">
                          {tier.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed font-normal">
                        {tier.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[var(--line)]">
                      {tier.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[var(--pine)]/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--line)] text-xs font-mono font-semibold text-[var(--mint-ink)]">
                    {tier.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CLOSING CONIC DISPATCH (.gradient-card)
          ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="gradient-card max-w-4xl mx-auto text-center">
            <div className="gradient-card__inner p-8 sm:p-12 space-y-6 bg-[#fffdf7] text-[var(--pine)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono font-bold text-[var(--mint-ink)] uppercase tracking-wider">
                Campus & Community Workshop Vision
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-tight leading-tight">
                Invite NorAI to your institution.
              </h2>

              <p className="text-base sm:text-lg text-[var(--pine)]/75 max-w-2xl mx-auto leading-relaxed font-normal">
                Whether you are a university dean, youth club coordinator, or student organizer, we bring
                our syllabus, engineering mentorship, and workshop frameworks directly to your campus.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?track=mission"
                  className="btn btn--solid w-full sm:w-auto h-12 px-7 text-sm font-semibold shadow-xs active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>Connect for an On-Campus Workshop &rarr;</span>
                </Link>
                <Link
                  href="/products"
                  className="btn btn--ghost w-full sm:w-auto h-12 px-6 text-sm font-medium text-[var(--pine)] hover:bg-[var(--pine-08)] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>Explore 4 live tools</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
