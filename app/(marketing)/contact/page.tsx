import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal } from '@/components/foundation';
import { ContactFormClient } from './ContactFormClient';
import { Mail, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Engineering & Sales — NorAI Technologies',
  description:
    'Discuss your enterprise AI pipeline, schedule an architecture audit, or explore our micro-SaaS tools directly with NorAI founding engineers.',
});

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NorAI Technologies',
    description: 'Get in touch with NorAI Technologies engineering and sales teams.',
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
    <div className="min-h-[calc(100vh-140px)] bg-canvas-base font-sans text-ink-primary selection:bg-accent-500 selection:text-white flex flex-col justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <Section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        {/* Subtle Ambient Background Warmth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-canvas-paper/80 via-canvas-paper/30 to-transparent"
        />

        <Container size="default" className="relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Editorial Statement & Desk Telemetry */}
            <Reveal className="space-y-8 lg:col-span-5 lg:pt-1">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-terra-50 border border-terra-200/70 px-3 py-1 font-mono text-[11px] font-semibold text-terra-800">
                  <Zap className="h-3 w-3 text-terra-600" />
                  <span>DIRECT ENGINEERING DISPATCH</span>
                </div>

                <Heading
                  as="h1"
                  variant="display-xl"
                  className="text-balance text-ink-primary font-display text-[clamp(34px,4.5vw,48px)] leading-[1.08] tracking-tight"
                >
                  Tell us what&apos;s slowing you down.
                </Heading>

                <Text
                  variant="body-lg"
                  as="p"
                  className="leading-relaxed text-ink-body font-sans text-[15px]"
                >
                  Whether you need high-volume resume parsing, multi-modal audio synthesis, or a bespoke deterministic AI pipeline with sub-second latency — write to us. A real engineer reads every message.
                </Text>
              </div>

              {/* Minimalist Editorial Desk Spec Card */}
              <div className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-6 sm:p-7 space-y-5 shadow-xs">
                {/* Active Desk Telemetry */}
                <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.06)] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-sage-500 animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-sage-800 tracking-wider uppercase">
                      DESK ACTIVE (IST)
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-secondary">
                    Mon–Sat · 9 AM – 8 PM
                  </span>
                </div>

                {/* Structured Channels */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary block font-semibold">
                      Direct Email
                    </span>
                    <a
                      href="mailto:noraitechnologies@gmail.com"
                      className="font-mono text-[13px] font-medium text-terra-600 hover:text-terra-700 underline underline-offset-2 transition-colors inline-flex items-center gap-2 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-terra-600" aria-hidden="true" />
                      <span>noraitechnologies@gmail.com</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary block font-semibold">
                      Development Office
                    </span>
                    <p className="font-sans text-[13px] text-ink-primary flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-ink-secondary shrink-0" aria-hidden="true" />
                      <span>Uttar Pradesh, India</span>
                    </p>
                  </div>
                </div>

                {/* SLA and Privacy Highlights */}
                <div className="pt-4 border-t border-[rgba(13,37,61,0.06)] space-y-3">
                  <div className="flex items-start gap-2.5 text-[12px] text-ink-secondary leading-normal">
                    <Clock className="h-3.5 w-3.5 text-sage-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-ink-primary">Guaranteed SLA:</strong> Direct reply within 4 business hours from a core engineer.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[12px] text-ink-secondary leading-normal">
                    <ShieldCheck className="h-3.5 w-3.5 text-sage-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-ink-primary">Enterprise Privacy:</strong> Zero sales bots, zero automated queues, and strict NDA protocols.
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
