import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Reveal } from '@/components/foundation/AnimatedSection';
import { ContactFormClient } from './ContactFormClient';
import { Mail, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Engineering & Studio — NorAI Technologies',
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
      url: 'https://norai.asia',
      email: 'noraitechnologies@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-surface-canvas font-sans text-text-primary selection:bg-accent-primary selection:text-white flex flex-col justify-center">
      <JsonLd schema={contactJsonLd} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      <Section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        {/* Subtle Ambient Background Warmth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-surface-panel/80 via-surface-panel/30 to-transparent"
        />

        <Container size="default" className="relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Editorial Statement & Desk Telemetry */}
            <Reveal className="space-y-8 lg:col-span-5 lg:pt-1 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 border border-accent-primary/20 px-3.5 py-1 font-mono text-[11px] font-semibold text-accent-primary">
                  <Zap className="h-3 w-3 text-accent-primary" />
                  <span>DIRECT ENGINEERING DISPATCH</span>
                </div>

                <h1 className="text-balance text-text-primary font-display text-[clamp(34px,4.5vw,48px)] leading-[1.08] tracking-tight">
                  Tell us what&apos;s slowing you down.
                </h1>

                <p className="leading-relaxed text-text-secondary font-sans text-[15px]">
                  Whether you need high-volume document extraction, custom deterministic RAG pipelines, or want to invite us to your campus—write to us. A real engineer reads every message. We reply within one business day.
                </p>
              </div>

              {/* Minimalist Editorial Desk Spec Card */}
              <div className="rounded-3xl border border-border-strong bg-surface-panel p-6 sm:p-7 space-y-5 shadow-sm">
                {/* Active Desk Telemetry */}
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-accent-secondary animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-accent-secondary tracking-wider uppercase">
                      DESK ACTIVE (IST)
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary">
                    Mon–Sat · 9 AM – 7 PM
                  </span>
                </div>

                {/* Structured Channels */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block font-semibold">
                      Direct Email
                    </span>
                    <a
                      href="mailto:noraitechnologies@gmail.com"
                      className="font-mono text-[13px] font-medium text-accent-primary hover:underline transition-colors inline-flex items-center gap-2 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-accent-primary" aria-hidden="true" />
                      <span>noraitechnologies@gmail.com</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block font-semibold">
                      Engineering Studio
                    </span>
                    <p className="font-sans text-[13px] text-text-primary flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-text-muted shrink-0" aria-hidden="true" />
                      <span>Uttar Pradesh, India</span>
                    </p>
                  </div>
                </div>

                {/* Honest Reply & Confidentiality Highlights */}
                <div className="pt-4 border-t border-border-subtle space-y-3">
                  <div className="flex items-start gap-2.5 text-[12px] text-text-secondary leading-normal">
                    <Clock className="h-3.5 w-3.5 text-accent-secondary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-text-primary">Honest Reply:</strong> A real engineer reads every message. We reply within one business day.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[12px] text-text-secondary leading-normal">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent-secondary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-text-primary">Confidential &amp; Direct:</strong> Zero sales bots, zero automated deflection queues, and strict privacy.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Clean Form Container */}
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <ContactFormClient />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
