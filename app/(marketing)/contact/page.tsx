import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { ContactFormClient } from './ContactFormClient';
import { Mail, MapPin, Clock, ShieldCheck, Server } from 'lucide-react';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Engineering & Studio — Built to change what happens',
  description:
    'Discuss your enterprise AI pipeline, schedule an architecture consultation, or explore our micro-SaaS tools directly with NorAI founding engineers.',
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NorAI Technologies',
    description: 'Get in touch with NorAI Technologies engineering and studio teams.',
    mainEntity: {
      '@type': 'Organization',
      name: 'NorAI Technologies Pvt. Ltd.',
      url: siteConfig.url,
      email: 'noraitechnologies@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={contactJsonLd} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          HERO CHAMBER (.phero)
          ========================================================================= */}
      <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-16 overflow-hidden border-b border-[var(--line)]">
        {/* Soft Organic Aurora Glow Orbs */}
        <div
          className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15"
          aria-hidden="true"
        />
        <div
          className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12"
          aria-hidden="true"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-4xl space-y-6 text-left">
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono text-[var(--pine)]">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span className="tracking-wide uppercase font-medium">
                03 · DIRECT ENGINEERING DISPATCH · ADVICE THAT SHIPS
              </span>
            </div>

            {/* Kinetic Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight">
              Tell us what&apos;s slowing <br />
              <span className="relative inline-block text-[var(--mint-ink)]">
                you down.
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
              Whether you need high-volume document extraction, custom deterministic RAG pipelines, or
              want to invite us to your campus—write to us. A real engineer reads every message. We reply
              within one business day.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          AUDENS NEXTRAIL STEP PROTOCOL (.nextrail)
          01 Tell us what you're building ➔ 02 Architecture review ➔ 03 We ship advice or code
          ========================================================================= */}
      <section className="py-8 bg-[#fffdf7] border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--pine)] text-[#f5f5f0]">
                01
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)]">Define the Workflow</h4>
                <p className="text-xs text-[var(--pine)]/70 mt-0.5">Share your latency, schemas, and data boundaries.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--pine)] text-[#f5f5f0]">
                02
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)]">Architecture Review</h4>
                <p className="text-xs text-[var(--pine)]/70 mt-0.5">We scope a deterministic blueprint and latency SLA.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--pine)] text-[#f5f5f0]">
                03
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)]">We Ship Advice or Code</h4>
                <p className="text-xs text-[var(--pine)]/70 mt-0.5">5-day sandbox PoC or air-gapped Docker container.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          MAIN CONTACT & TELEMETRY STAGE
          Left: Desk Specs & Regional Telemetry | Right: Tactile Form Client
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Desk Telemetry & Physical Presence */}
            <div className="space-y-6 lg:col-span-5 text-left">
              {/* Desk Telemetry Card */}
              <div className="rounded-[22px] border border-[var(--line)] bg-[#fffdf7] p-7 sm:p-8 space-y-6 shadow-xs">
                {/* Active Desk Telemetry */}
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--mint-ink)] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[var(--mint-ink)] tracking-wider uppercase">
                      ENGINEERING DESK ACTIVE
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--pine)]/80">
                    Mon–Sat · 9 AM – 7 PM IST
                  </span>
                </div>

                {/* Direct Channels */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--pine)]/80 block font-semibold">
                      Direct Email
                    </span>
                    <a
                      href="mailto:noraitechnologies@gmail.com"
                      className="font-mono text-sm font-semibold text-[var(--mint-ink)] hover:underline transition-colors inline-flex items-center gap-2 break-all"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>noraitechnologies@gmail.com</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--pine)]/80 block font-semibold">
                      Primary Engineering Studio
                    </span>
                    <p className="text-sm text-[var(--pine)] flex items-center gap-2 font-medium">
                      <MapPin className="h-4 w-4 text-[var(--pine)]/80 shrink-0" aria-hidden="true" />
                      <span>NCR Hub (Noida &amp; Gurugram) · Uttar Pradesh</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--pine)]/80 block font-semibold">
                      Grassroots Mission Desk
                    </span>
                    <p className="text-sm text-[var(--pine)] flex items-center gap-2 font-medium">
                      <Server className="h-4 w-4 text-[var(--pine)]/80 shrink-0" aria-hidden="true" />
                      <span>Lucknow Regional AI Telemetry Center</span>
                    </p>
                  </div>
                </div>

                {/* Direct SLA Guarantees */}
                <div className="pt-4 border-t border-[var(--line)] space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-[var(--pine)]/80 leading-normal">
                    <Clock className="h-4 w-4 text-[var(--mint-ink)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[var(--pine)]">Honest Reply:</strong> A real engineer reads every message. We reply within one business day.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[var(--pine)]/80 leading-normal">
                    <ShieldCheck className="h-4 w-4 text-[var(--mint-ink)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[var(--pine)]">Strict Confidentiality:</strong> Zero sales bots, zero automated deflection queues, and strict NDA-level privacy.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Form Container */}
            <div className="lg:col-span-7">
              <div className="rounded-[22px] border border-[var(--line)] bg-[#fffdf7] p-6 sm:p-8 shadow-xs">
                <ContactFormClient />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
