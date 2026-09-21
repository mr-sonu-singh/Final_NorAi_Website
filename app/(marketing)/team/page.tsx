import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { ArrowRight } from 'lucide-react';
import { SwissStudioRoster } from '@/components/organisms';
import { SubpageHeroAtmosphere } from '@/components/organisms';
import { buildMetadata, getWebSiteJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/team',
  title: 'Studio & Story — NorAI Technologies',
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

      <main id="main-content" className="min-h-screen font-sans bg-[#f5f5f0] dark:bg-[#060919] text-[var(--pine)] dark:text-[#F4F6FC] selection:bg-[#B278E3]/30 selection:text-[#060919]">
        {/* CINEMATIC HERO CHAMBER WITH ATELIER BACKDROP */}
        <section className="relative min-h-[65vh] lg:min-h-[72vh] flex flex-col justify-center overflow-hidden bg-[#060919] text-[#F4F6FC] border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-24">
          <SubpageHeroAtmosphere
            imageSrc="/images/bg-team-atelier.webp"
            imageAlt="Engineering Studio & Atelier overlooking Starry Twilight"
            imagePosition="object-cover object-[70%_center] md:object-[75%_center]"
            glowGradient="radial-gradient(ellipse 60% 40% at 75% 60%, rgba(255,162,77,0.22), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(30,244,180,0.18), transparent 70%)"
          />

          <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-[#38BDF8] font-semibold block mb-2">
                FOUNDING STUDIO &amp; ENGINEERING ETHOS
              </span>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.04] tracking-[-0.035em]">
                Engineers first.{' '}
                <span className="text-[#38BDF8]">Building outside the bubble.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A8B6D8] leading-relaxed max-w-2xl font-normal text-pretty">
                Nor AI Technologies is an independent AI engineering practice based in Umarganj, Zamania, Ghazipur, Uttar Pradesh. We design pragmatic intelligence, modern web software, and train tomorrow&apos;s builders.
              </p>
            </div>
          </Container>
        </section>

        {/* SWISS STUDIO ROSTER */}
        <SwissStudioRoster />

        {/* OPERATING RITUALS */}
        <section className="py-16 sm:py-24 border-b border-[var(--line)]">
          <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12 text-left space-y-2">
              <span className="font-mono text-xs text-[var(--mint-ink)] dark:text-[#38BDF8] uppercase tracking-wider font-bold block">
                STUDIO GOVERNANCE &amp; OPERATING DISCIPLINE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] dark:text-white tracking-tight">
                Engineering rituals that protect craft.
              </h2>
              <p className="text-sm sm:text-base text-[var(--pine)]/75 dark:text-white/70">
                Four non-negotiable architectural habits that ensure every client engagement ships without compromise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {RITUALS.map((ritual) => (
                <div
                  key={ritual.number}
                  className="p-7 sm:p-8 rounded-3xl bg-[#fffdf7] dark:bg-[#060919] border border-[var(--line)] dark:border-white/10 space-y-4 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between border-b border-[var(--line)] dark:border-white/10 pb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--pine)] text-white dark:bg-white/10">
                      RITUAL {ritual.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--pine)] dark:text-white">
                    {ritual.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--pine)]/75 dark:text-white/70 leading-relaxed font-normal">
                    {ritual.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#060919] border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-left shadow-2xl">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Speak directly with founding engineers.
                </h3>
                <p className="text-sm text-[#A8B6D8]">
                  Zero sales gatekeepers. We discuss system architectures and deliverables directly.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#38BDF8] text-[#060919] font-bold text-sm hover:bg-[#E4CEF7] transition-all duration-200 shadow-lg shadow-[#D4C5F9]/20 shrink-0 active:scale-[0.98] group"
              >
                <span>Initiate Studio Dialogue</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
