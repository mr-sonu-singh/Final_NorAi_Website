import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { ArrowRight, Lock, Clock, Zap } from 'lucide-react';
import {
  ServicesDirectory,
  SpiralCapabilitiesMatrix,
  DeliveryProtocolRail,
} from '@/components/organisms';
import { buildMetadata, getServiceJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/services',
  title: 'Bespoke Enterprise Deliverables — Built to change what happens',
  description:
    'Custom RAG pipelines, MCP tool servers, and high-throughput private VPC inference architectures engineered for enterprise scale and zero hallucination.',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={getServiceJsonLd()} />

      <main id="main-content" className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
        {/* HERO CHAMBER */}
        <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]">
          <div className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15" aria-hidden="true" />
          <div className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12" aria-hidden="true" />

          <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
                <span>— 02 · ENTERPRISE DELIVERABLES &amp; METHODOLOGY</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]">
                Bespoke systems. <br />
                <span className="relative inline-block text-[var(--mint-ink)]">
                  Built for your infrastructure.
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
                Air-gapped LLM inference, deterministic RAG pipelines, and Model Context Protocol (MCP) servers deployed directly into your private cloud.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                  <Lock className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>Private VPC &amp; Air-Gapped</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                  <Clock className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>5-Day Rapid PoC Sprints</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]">
                  <Zap className="w-4 h-4 text-[var(--mint-ink)]" />
                  <span>Sub-200ms In-Memory SLA</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: THE SPIRAL CAPABILITIES MATRIX (Non-Card Archetype) */}
        <SpiralCapabilitiesMatrix />

        {/* SOVEREIGN ARCHITECTURE CONSOLE */}
        <ServicesDirectory />

        {/* SECTION 2: THE CONTINUOUS KINETIC TIMELINE RAIL (Non-Card Archetype) */}
        <DeliveryProtocolRail />

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
                  — ENTERPRISE ENGAGEMENT
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Bring us the system you need to build.
                </h2>

                <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium">
                  One hour with our founding engineering team. A straight answer: architecture, timeline, and exact cost.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#072929] hover:bg-[#0c3c3c] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <span>Schedule an architecture session</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="w-full sm:w-auto h-12 px-7 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[#072929] font-bold text-sm inline-flex items-center justify-center transition-all"
                  >
                    <span>View Sovereign Tools →</span>
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
