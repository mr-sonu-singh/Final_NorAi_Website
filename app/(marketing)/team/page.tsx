import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { ArrowRight, ShieldCheck, Code2, Sparkles } from 'lucide-react';
import { SwissStudioRoster } from '@/components/organisms';
import { buildMetadata, getWebSiteJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/team',
  title: 'The Builders & Engineering Ethos — Built to change what happens',
  description:
    'Meet Dhruw Singh, Sonu Singh, Annanta Singh, Rishabh Singh, and Gourav Singh—the founding engineering team driving NorAI Technologies from Uttar Pradesh, India.',
});

const RITUALS = [
  {
    number: '01',
    title: 'Founders write the code & answer technical questions',
    desc: 'We do not employ deflection bots or junior triage queues. When you suggest an improvement or report a parsing edge case, the engineer who authored the schema fixes it.',
  },
  {
    number: '02',
    title: 'Every model deployed is locally verifiable',
    desc: 'We do not ask clients to trust closed vendor benchmarks. We deliver Docker containers with reproducible eval scripts and latency probes you run yourself.',
  },
  {
    number: '03',
    title: 'Zero data egress is an engineering constraint, not a policy',
    desc: 'Our tools do not communicate with external analytics or telemetry servers. Code parsing happens in transient RAM; vectors reside on your encrypted volume.',
  },
  {
    number: '04',
    title: 'Direct senior architect walkthrough on every handover',
    desc: 'Every project closes with an architecture walkthrough, full repository transfer, and environment configuration led by the founding engineer who built it.',
  },
];

export default function TeamPage() {
  return (
    <>
      <JsonLd schema={getWebSiteJsonLd()} />

      <main id="main-content" className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
        {/* HERO CHAMBER */}
        <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]">
          <div className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15" aria-hidden="true" />
          <div className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12" aria-hidden="true" />

          <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
                <span>— 04 · FOUNDING STUDIO &amp; ENGINEERING ETHOS</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]">
                Engineers first. <br />
                <span className="relative inline-block text-[var(--mint-ink)]">
                  Direct accountability.
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]"
                    viewBox="0 0 240 40"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M3 33C50 12 150 5 237 22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
                NorAI is an independent engineering firm headquartered in Uttar Pradesh. We design and
                deliver private AI infrastructure and sovereign tools for students and citizens.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>Zero Executive Insulation</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                  <Code2 className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>100% In-House Code</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                  <Sparkles className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>Free Grassroots Literacy</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 4: THE MINIMALIST SWISS STUDIO ROSTER (Non-Card Archetype) */}
        <SwissStudioRoster />

        {/* OPERATING RITUALS (Clean Borderless Ledger) */}
        <section className="py-16 sm:py-24 border-b border-[var(--line)]">
          <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12 text-left space-y-2">
              <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block">
                — OPERATING RITUALS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-[-0.03em]">
                How we work with clients and code.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {RITUALS.map((ritual) => (
                <div
                  key={ritual.number}
                  className="p-7 rounded-2xl bg-[#fffdf7] border border-[var(--line)] space-y-3 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--mint-ink)]">
                      {ritual.number}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[var(--pine)]">
                      {ritual.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed">
                    {ritual.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CLOSING DISPATCH */}
        <section className="py-16 sm:py-24">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div
              className="rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)',
              }}
            >
              <div className="max-w-3xl mx-auto space-y-6 text-[#072929]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072929]/10 text-xs font-mono font-bold uppercase tracking-wider">
                  — TALK DIRECTLY TO THE ENGINEERS
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Bring us the problem you are actually facing.
                </h2>

                <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium">
                  One hour with the founding team. Zero marketing decks. A straight answer: architecture, feasibility, and costs.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#072929] hover:bg-[#0c3c3c] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <span>Schedule an architecture call</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto h-12 px-7 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[#072929] font-bold text-sm inline-flex items-center justify-center transition-all"
                  >
                    <span>Explore Deliverables →</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
