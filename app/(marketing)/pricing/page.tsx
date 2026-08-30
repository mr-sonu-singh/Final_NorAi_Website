import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { ComparisonTable } from '@/components/organisms/sections/ComparisonTable';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { PricingToggleClient, type PricingTier } from './PricingToggleClient';

export const metadata = buildMetadata({
  path: '/pricing',
  title: 'Pricing & Plans',
  description:
    'Transparent pricing for NorAI micro-SaaS tools. Starter, Pro, and Enterprise tiers with sub-second latency guarantees. No hidden fees.',
});

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    tierLabel: 'Starter',
    audience: 'Individual & Small Projects',
    description: 'Essential micro-AI tools for freelancers and early-stage startups.',
    monthlyPrice: 29,
    annualPrice: 23,
    features: [
      '5,000 AI API requests / mo',
      'Sub-1s processing latency guarantee',
      'Access to all 4 micro-SaaS tools',
      'Standard email support',
    ],
    cta: 'Start screening free',
    highlighted: false,
  },
  {
    id: 'pro',
    tierLabel: 'Pro',
    audience: 'Growing Businesses',
    description: 'High-throughput AI pipelines with webhooks and priority SLA.',
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      '50,000 AI API requests / mo',
      'Priority sub-500ms processing SLA',
      'Webhooks & REST API access',
      'Custom candidate & parser rules',
      '24/7 priority chat support',
    ],
    cta: 'Take better notes',
    highlighted: true,
  },
  {
    id: 'enterprise',
    tierLabel: 'Enterprise',
    audience: 'Custom AI Infrastructure',
    description: 'Dedicated compute clusters, custom model fine-tuning, and enterprise SLAs.',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Unlimited AI request throughput',
      'Custom model fine-tuning & private connectors',
      'Dedicated cluster & 99.99% uptime SLA',
      'Dedicated solution architect',
    ],
    cta: 'Talk to us',
    highlighted: false,
  },
];

const COMPARISON_COLUMNS = [
  { id: 'starter', label: 'Starter' },
  { id: 'pro', label: 'Pro', highlighted: true },
  { id: 'enterprise', label: 'Enterprise' },
];

const COMPARISON_ROWS = [
  {
    id: 'requests',
    label: 'Monthly AI requests',
    values: { starter: '5,000', pro: '50,000', enterprise: 'Unlimited' },
  },
  {
    id: 'latency',
    label: 'Latency guarantee',
    values: { starter: '< 1s', pro: '< 500ms', enterprise: '< 100ms' },
  },
  {
    id: 'api',
    label: 'Webhooks & REST API access',
    values: { starter: true, pro: true, enterprise: true },
  },
  {
    id: 'rules',
    label: 'Custom candidate & parsing rules',
    values: { starter: false, pro: true, enterprise: true },
  },
  {
    id: 'finetuning',
    label: 'Custom model fine-tuning & private connectors',
    values: { starter: false, pro: false, enterprise: true },
  },
  {
    id: 'sla',
    label: 'Uptime SLA',
    values: { starter: '99.5%', pro: '99.9%', enterprise: '99.99%' },
  },
];

const ASSURANCES = [
  {
    icon: RotateCcw,
    tone: 'text-sage-600 bg-sage-100',
    title: 'Cancel anytime',
    body: 'Upgrade, downgrade, or leave from your dashboard. No phone calls required.',
  },
  {
    icon: ShieldCheck,
    tone: 'text-gold-600 bg-gold-100',
    title: 'Data stays yours',
    body: 'Your documents are processed in memory and never used to train public models.',
  },
  {
    icon: Clock,
    tone: 'text-terra-600 bg-terra-100',
    title: 'Humans reply < 2 hours',
    body: 'Real people answer during business hours — Monday to Saturday, 9 AM to 8 PM IST.',
  },
];

const FAQ_PREVIEW = [
  {
    question: 'Can I change or upgrade my plan later?',
    answer:
      'Yes. Upgrade, downgrade, or cancel at any time from your dashboard, with pro-rated credits applied automatically.',
    href: '/faq#billing',
    linkText: 'Read about changing plans',
  },
  {
    question: 'What happens if I exceed my monthly request limit?',
    answer:
      'We notify you at 80% and 100% of your cap. Extra requests bill at a simple pay-as-you-go rate of $0.002 per request — no service interruption.',
    href: '/faq#billing',
    linkText: 'See how usage limits work',
  },
  {
    question: 'How does the 14-day free trial work?',
    answer:
      'The trial includes full Starter and Pro features with 1,000 free API requests. No credit card required to sign up.',
    href: '/faq#product',
    linkText: 'Learn about the free trial',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      {/* Hero */}
      <Section className="relative overflow-hidden pb-4 pt-12 md:pb-6 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas-pure px-3 py-1 text-[13px] font-medium text-ink-secondary">
              Pricing
            </p>
            <Heading
              as="h1"
              variant="display-xl"
              className="text-balance text-ink-primary"
            >
              Simple prices, serious tools.
            </Heading>
            <Text variant="body-lg" as="p" className="mx-auto max-w-xl leading-relaxed text-ink-body">
              Pick a plan for the tools you use every day. Choose annual billing and save 20%.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Interactive toggle & tier cards */}
      <PricingToggleClient tiers={TIERS} />

      {/* Objection-handling strip */}
      <Section variant="sunken" className="py-12">
        <Container size="default">
          <StaggerGrid className="grid grid-cols-1 gap-8 sm:grid-cols-3" stagger={0.06}>
            {ASSURANCES.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.tone}`}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-[15px] font-semibold text-ink-primary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-body">{item.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* Comparison table */}
      <ComparisonTable
        heading="Compare every plan"
        columns={COMPARISON_COLUMNS}
        rows={COMPARISON_ROWS}
        caption="All plans include access to all four NorAI tools. Usage limits reset at the start of each billing cycle."
      />

      {/* FAQ preview */}
      <Section variant="sunken" className="py-16">
        <Container size="narrow">
          <div className="mb-10 max-w-2xl space-y-3">
            <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
              Questions people ask before paying
            </Heading>
            <Text variant="body-md" className="text-ink-body">
              The short versions are below — the full answers live on the FAQ page.
            </Text>
          </div>

          <StaggerGrid className="space-y-3" stagger={0.05}>
            {FAQ_PREVIEW.map((faq) => (
              <StaggerItem key={faq.question}>
                <Link
                  href={faq.href}
                  variant="unstyled"
                  aria-label={`${faq.linkText} — opens the full answer for: ${faq.question}`}
                  className="group block rounded-xl border border-line-subtle bg-canvas-paper p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="text-[17px] font-semibold text-ink-primary">{faq.question}</h3>
                      <p className="text-sm leading-relaxed text-ink-body">{faq.answer}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-ink-secondary transition-colors duration-200 group-hover:text-terra-500"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <div className="pt-6 text-center">
            <Link href="/faq" variant="standalone">
              Browse all frequently asked questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section className="py-16 lg:py-20">
        <Container size="default">
          <Reveal>
            <div className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-line-subtle bg-canvas-paper p-10 text-center shadow-sm sm:p-12">
              <Heading as="h2" variant="display-lg" className="text-balance text-ink-primary">
                Not sure which plan fits?
              </Heading>
              <Text variant="body-md" className="leading-relaxed text-ink-body">
                Tell us what you are building and we will point you to the right tier — or scope a
                custom pipeline if none of them do.
              </Text>
              <div className="pt-2">
                <Link href="/contact" variant="unstyled" aria-label="Contact our team about pricing">
                  <Button variant="primary" size="lg">
                    Talk to our team
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
