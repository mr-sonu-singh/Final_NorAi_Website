import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal } from '@/components/foundation';
import { ContactFormClient } from './ContactFormClient';
import { Clock, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Engineering & Sales',
  description:
    'Discuss your enterprise AI workflow or explore our micro-SaaS tools directly with the NorAI engineering team.',
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

      {/* Main Single-Viewport Editorial Stage */}
      <Section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        {/* Subtle Archival Paper Top Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas-paper/70 to-transparent"
        />

        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left: Editorial Statement & Technical Contact Specs */}
            <Reveal className="space-y-8 lg:col-span-6 lg:pt-2">
              <div className="space-y-4">
                <Heading
                  as="h1"
                  variant="display-xl"
                  className="text-balance text-ink-primary"
                >
                  Tell us what&apos;s slowing you down.
                </Heading>

                <Text variant="body-lg" as="p" className="max-w-xl leading-relaxed text-ink-body">
                  Whether it is high-volume candidate screening, long audio and video synthesis, or a bespoke deterministic AI pipeline you cannot buy off the shelf — write to us. A real engineer reads every message, and you will always get an actionable technical response.
                </Text>
              </div>

              {/* High-Craft Editorial Spec Panel */}
              <div className="rounded-xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper/80 p-6 space-y-5">
                {/* Active Engineering Status */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-sage-300/80 bg-sage-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-sage-800 tracking-wide">
                    <Clock className="h-3.5 w-3.5 text-sage-600" aria-hidden="true" />
                    ENGINEERING DESK ACTIVE
                  </span>
                  <span className="font-mono text-[11px] text-ink-secondary">
                    Mon–Sat, 9 AM – 8 PM IST
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[rgba(13,37,61,0.06)]">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink-secondary block">
                      Direct Dispatch
                    </span>
                    <a
                      href="mailto:noraitechnologies@gmail.com"
                      className="font-mono text-[13px] font-semibold text-terra-600 hover:text-terra-700 underline underline-offset-2 transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      noraitechnologies@gmail.com
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink-secondary block">
                      Engineering Hub
                    </span>
                    <p className="font-sans text-[13px] font-medium text-ink-primary flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-ochre-600 shrink-0" aria-hidden="true" />
                      Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(13,37,61,0.06)]">
                  <p className="text-[12px] leading-relaxed text-ink-secondary flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sage-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      Direct triage by founders and core AI engineers. No sales queues or automated triage bots.
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right: Focused Form Stage */}
            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <ContactFormClient />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
