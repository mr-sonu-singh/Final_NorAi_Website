import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { ContactFormClient } from './ContactFormClient';
import { Mail, Phone, MapPin, Globe, ShieldCheck, Clock } from 'lucide-react';
import { buildMetadata, getWebSiteJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Engineering & Studio — NorAI Technologies',
  description:
    'Contact the founding engineering practice of Nor AI Technologies Private Limited in Ghazipur, Uttar Pradesh. Real engineer response within one business day.',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getWebSiteJsonLd()} />

      {/* HERO CHAMBER */}
      <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]">
        <div className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15" aria-hidden="true" />
        <div className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12" aria-hidden="true" />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span>— GHAZIPUR STUDIO DESK · DIRECT CONTACT</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]">
              Start a project.{' '}
              <span className="text-[var(--mint-ink)]">Talk with builders.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
              Whether you need pragmatic AI workflows, high-speed custom web software, spatial computing environments, or want to collaborate on student workshops—speak directly with our engineering team. We reply within one business day.
            </p>
          </div>
        </Container>
      </section>

      {/* 3-STEP INTAKE PROTOCOL */}
      <section className="py-8 bg-[#fffdf7] border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--pine)] text-[#f5f5f0]">
                01
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)]">Define Requirements</h4>
                <p className="text-xs text-[var(--pine)]/70 mt-0.5">Share your workflow, latency goals, or cohort details.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--pine)] text-[#f5f5f0]">
                02
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)]">Architecture Review</h4>
                <p className="text-xs text-[var(--pine)]/70 mt-0.5">We review feasibility and propose a functional blueprint.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)]">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--pine)] text-[#f5f5f0]">
                03
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--pine)]">Sprint Execution</h4>
                <p className="text-xs text-[var(--pine)]/70 mt-0.5">5-day working prototype or live in-person workshop.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN CONTACT STAGE */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Verified Corporate Credentials */}
            <div className="space-y-6 lg:col-span-5 text-left">
              <div className="rounded-[22px] border border-[var(--line)] bg-[#fffdf7] p-7 sm:p-8 space-y-6 shadow-xs">
                {/* Active Status */}
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--mint-ink)] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[var(--mint-ink)] tracking-wider uppercase">
                      STUDIO DESK ACTIVE
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--pine)]/80">
                    Mon–Sat · 9 AM – 7 PM IST
                  </span>
                </div>

                {/* Statutory Identity Block */}
                <div className="p-4 rounded-xl bg-[var(--porcelain)] border border-[var(--line)] space-y-2 font-mono text-xs text-[var(--pine)]">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--pine)]/60 font-bold">
                    Registered Corporate Entity
                  </div>
                  <div className="font-bold text-[var(--pine)]">
                    Nor AI Technologies Private Limited
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[var(--line)]/50">
                    <span className="text-[var(--pine)]/60">CIN:</span>
                    <span className="font-semibold text-[var(--mint-ink)]">U62011UP2026PTC252801</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--pine)]/60">PAN:</span>
                    <span className="font-semibold">AAMCN1061B</span>
                  </div>
                </div>

                {/* Direct Channels */}
                <div className="space-y-4 text-xs font-mono text-[var(--pine)]">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 block font-bold">
                      Direct Email
                    </span>
                    <a
                      href="mailto:noraitechnologies@gmail.com"
                      className="text-sm font-semibold text-[var(--mint-ink)] hover:underline inline-flex items-center gap-2 break-all"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>noraitechnologies@gmail.com</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 block font-bold">
                      Direct Phone Lines
                    </span>
                    <p className="text-sm font-semibold text-[var(--pine)] flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[var(--mint-ink)] shrink-0" />
                      <span>+91 7988552179 / +91 7860818514</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 block font-bold">
                      Studio &amp; Registered Address
                    </span>
                    <p className="text-xs text-[var(--pine)]/90 flex items-start gap-2 leading-relaxed">
                      <MapPin className="h-4 w-4 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                      <span>Umarganj, Zamania, Ghazipur, Uttar Pradesh, India — 232329</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--pine)]/60 block font-bold">
                      Official Domain
                    </span>
                    <p className="text-xs font-semibold text-[var(--pine)] flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[var(--mint-ink)] shrink-0" />
                      <span>www.norai.tech</span>
                    </p>
                  </div>
                </div>

                {/* Service SLA */}
                <div className="pt-4 border-t border-[var(--line)] space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-[var(--pine)]/80 leading-normal">
                    <Clock className="h-4 w-4 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[var(--pine)]">Engineer Reviewed:</strong> Every message is read by founding engineers.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[var(--pine)]/80 leading-normal">
                    <ShieldCheck className="h-4 w-4 text-[var(--mint-ink)] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[var(--pine)]">Zero Sales Bots:</strong> Direct technical consultation without deflection.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Contact Form */}
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
