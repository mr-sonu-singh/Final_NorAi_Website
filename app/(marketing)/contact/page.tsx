import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal } from '@/components/foundation';
import { Link } from '@/components/atoms/Link';
import { ContactFormClient } from './ContactFormClient';
import { Clock, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Engineering & Sales',
  description:
    'Discuss your enterprise AI workflow or explore our micro-SaaS tools. The NorAI engineering team responds within 2 hours during business hours.',
});

const INFO_CARDS = [
  {
    icon: Mail,
    title: 'Email us',
    lines: ['noraitechnologies@gmail.com'],
    body: 'For quotes, partnerships, and everything in between.',
  },
  {
    icon: Clock,
    title: 'Response time',
    lines: ['Under 2 hours'],
    body: 'Monday to Saturday, 9:00 AM – 8:00 PM IST.',
  },
  {
    icon: MapPin,
    title: 'Where we are',
    lines: ['Uttar Pradesh, India'],
    body: 'Proudly building from India’s northern technology corridor for clients worldwide.',
  },
];

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NorAI Technologies',
    description: 'Get in touch with NorAI Technologies engineering and sales teams.',
    mainEntity: {
      '@type': 'Organization',
      name: 'NorAI Technologies Pvt. Ltd.',
      url: 'https://norai-c8yy.onrender.com',
      email: 'noraitechnologies@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Split hero + form */}
      <Section className="relative overflow-hidden pb-16 pt-12 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[11fr_9fr] lg:gap-16">
            {/* Left: promise */}
            <Reveal className="space-y-6 pt-4 lg:sticky lg:top-24">
              <p className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas-pure px-3 py-1 text-[13px] font-medium text-ink-secondary">
                Contact
              </p>

              <Heading
                as="h1"
                variant="display-xl"
                className="text-balance text-ink-primary"
              >
                Tell us what&apos;s slowing you down.
              </Heading>

              <Text variant="body-lg" as="p" className="max-w-xl leading-relaxed text-ink-body">
                Whether it is screening hundreds of resumes, taming lecture notes, or a custom AI
                pipeline you cannot buy off the shelf — write to us. A real engineer reads every
                message, and you will always get a thoughtful reply instead of an autoresponder.
              </Text>

              <p className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-3 py-1 text-[13px] font-medium text-sage-700">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                &lt; 2 hours guaranteed response
              </p>
            </Reveal>

            {/* Right: form card */}
            <Reveal delay={0.1}>
              <ContactFormClient />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Info cards */}
      <Section variant="sunken" className="py-14">
        <Container size="default">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {INFO_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-line-subtle bg-canvas-paper p-6 shadow-sm transition-shadow duration-300 hover:shadow-hover"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="pt-4 text-[15px] font-semibold text-ink-primary">{card.title}</h2>
                <p className="text-sm font-medium text-terra-600">{card.lines}</p>
                <p className="pt-1 text-sm leading-relaxed text-ink-body">{card.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Privacy reassurance */}
      <Section className="py-14 lg:py-16">
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-line-subtle bg-canvas-paper p-8 sm:flex-row sm:items-center sm:gap-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <h2 className="font-display text-xl text-ink-primary">Your details stay between us.</h2>
                <Text variant="body-sm" className="leading-relaxed text-ink-body">
                  No lists, no spam, no sharing with third parties. Read the fine print in our{' '}
                  <Link href="/privacy" variant="inline">
                    privacy policy
                  </Link>
                  .
                </Text>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
