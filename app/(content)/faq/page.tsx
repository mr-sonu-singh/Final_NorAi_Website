'use client';

import React, { useMemo, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Link } from '@/components/atoms/Link';
import { ChevronDown, Search, X } from 'lucide-react';
import { getFAQPageJsonLd, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';

interface FAQItem {
  question: string;
  answer: string;
  category: 'product' | 'service' | 'billing';
}

const FAQ_ITEMS: FAQItem[] = [
  // Product Category
  {
    category: 'product',
    question: 'What self-serve AI micro-tools does NorAi offer?',
    answer: 'NorAi offers 4 self-serve micro-tools: AI Resume Shortlister (candidate screening), AI Course Note-Taker (lecture summarization & flashcards), Chat Digest AI (community chat briefs), and Smart News Aggregator (regional news curation).',
  },
  {
    category: 'product',
    question: 'How fast are responses processed by the micro-tools?',
    answer: 'All self-serve micro-tools are engineered for sub-second execution speeds, with processing SLAs ranging from < 0.28s to < 0.45s depending on payload size.',
  },
  {
    category: 'product',
    question: 'What file formats can be uploaded to the AI Resume Shortlister and Course Note-Taker?',
    answer: 'The AI Resume Shortlister supports PDF, DOCX, and TXT files. The Course Note-Taker supports video transcripts, plain text notes, and MP3/WAV audio tracks.',
  },
  {
    category: 'product',
    question: 'Can Chat Digest AI aggregate community chat transcripts from Telegram or Discord?',
    answer: 'Yes! You can paste public community channel exports or sync webhook exports to generate automated daily executive digests.',
  },

  // Service Category
  {
    category: 'service',
    question: 'What is the difference between self-serve products and custom enterprise services?',
    answer: 'Self-serve products (available on our Products page) are ready-to-deploy tools accessible via instant sign-up. Custom enterprise services involve engineering bespoke AI pipelines, RAG vector search, MCP tool servers, or full-stack web applications tailored to your proprietary data.',
  },
  {
    category: 'service',
    question: 'What are the 3 service readiness tiers listed on your Services page?',
    answer: 'Our Services page categorizes offerings into 3 maturity tiers: Tier 1 (7 Active Core Services ready for deployment), Tier 2 (1 Early Access Practice onboarding pilot partners), and Tier 3 (1 Provisional R&D Scaffold under internal research).',
  },
  {
    category: 'service',
    question: 'How fast can a custom enterprise AI pipeline or chatbot prototype be deployed?',
    answer: 'Initial functional prototypes are typically delivered within 3-5 days. Full enterprise production deployments with webhooks and SLA guarantees typically take 1 to 2 weeks.',
  },
  {
    category: 'service',
    question: 'Can custom enterprise AI services be deployed on private cloud infrastructure?',
    answer: 'Yes! For enterprise clients with strict data residency requirements, we offer private cloud deployments across AWS, Azure, GCP, and dedicated isolated clusters.',
  },

  // Billing Category
  {
    category: 'billing',
    question: 'What pricing tiers are available for self-serve products?',
    answer: 'Self-serve products feature transparent monthly tiers (Starter, Pro, Scale) designed for different usage volumes, starting at predictable monthly rates.',
  },
  {
    category: 'billing',
    question: 'Are there any hidden setup or maintenance fees for self-serve tools?',
    answer: 'No. Self-serve plans feature transparent monthly pricing with zero hidden setup fees or unexpected maintenance charges.',
  },
  {
    category: 'billing',
    question: 'How are custom enterprise AI services priced?',
    answer: 'Custom enterprise services are scoped individually during a technical consultation based on workflow complexity, data integration requirements, and SLA targets.',
  },
  {
    category: 'billing',
    question: 'How do I upgrade or change my self-serve product tier?',
    answer: 'You can adjust your subscription tier anytime directly through your product dashboard or by contacting our support team.',
  },
];

const CATEGORIES: { id: FAQItem['category']; label: string; heading: string }[] = [
  { id: 'product', label: 'Products', heading: 'Product questions' },
  { id: 'service', label: 'Services', heading: 'Custom services' },
  { id: 'billing', label: 'Billing & tiers', heading: 'Billing & pricing' },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | FAQItem['category']>('all');

  const grouped = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return CATEGORIES.filter(
      (category) => activeCategory === 'all' || category.id === activeCategory,
    )
      .map((category) => ({
        ...category,
        items: FAQ_ITEMS.filter(
          (item) =>
            item.category === category.id &&
            (query === '' ||
              item.question.toLowerCase().includes(query) ||
              item.answer.toLowerCase().includes(query)),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, activeCategory]);

  const totalMatches = grouped.reduce((sum, group) => sum + group.items.length, 0);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  const faqSchemaItems = FAQ_ITEMS.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      <JsonLd schema={getFAQPageJsonLd(faqSchemaItems)} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />
      {/* Header */}
      <Section className="relative overflow-hidden pb-12 pt-12 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <Heading as="h1" variant="display-xl" className="text-balance text-ink-primary">
              Frequently asked questions
            </Heading>
            <Text variant="body-lg" as="p" className="mx-auto max-w-xl leading-relaxed text-ink-body">
              Instant answers about our self-serve products, custom engineering work, and billing.
            </Text>
          </div>
        </Container>


      </Section>

      {/* Search & filters */}
      <div className="sticky top-16 z-30 border-b border-line-subtle bg-canvas-paper/90 backdrop-blur-md">
        <Container size="narrow" className="py-5">
          <div className="space-y-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary"
                aria-hidden="true"
              />
              <input
                type="text"
                aria-label="Search frequently asked questions"
                placeholder="Search questions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-line-default bg-canvas-pure py-3 pl-11 pr-10 font-sans text-[15px] text-ink-primary placeholder:text-ink-secondary focus-visible:border-terra-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-terra-500/12 transition-[border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-secondary transition-colors duration-200 hover:text-ink-primary"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter questions by topic">
              {[{ id: 'all' as const, label: 'All questions' }, ...CATEGORIES].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-terra-500/12 ${
                    activeCategory === tab.id
                      ? 'bg-terra-500 text-white shadow-accent'
                      : 'border border-line-default bg-canvas-pure text-ink-body hover:border-line-strong hover:text-ink-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Grouped accordions */}
      <Section className="py-14">
        <Container size="narrow">
          {totalMatches === 0 ? (
            <div className="space-y-3 py-12 text-center">
              <Text variant="body-md" className="text-ink-body">
                No questions match “{searchQuery}”. Try a different word, or ask us directly.
              </Text>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="cursor-pointer text-sm font-semibold text-terra-600 underline underline-offset-4 transition-colors duration-200 hover:text-terra-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map((group) => (
                <section key={group.id} id={group.id} className="scroll-mt-40 space-y-5">
                  <div className="flex items-baseline gap-3">
                    <h2 className="font-display text-2xl text-ink-primary">{group.heading}</h2>
                    <span className="rounded-full bg-canvas-recessed px-2.5 py-0.5 text-xs font-semibold tabular-nums text-ink-secondary">
                      {group.items.length}
                    </span>
                  </div>

                  <Accordion.Root type="single" collapsible className="space-y-3">
                    {group.items.map((item) => (
                      <Accordion.Item
                        key={item.question}
                        value={item.question}
                        className="overflow-hidden rounded-xl border border-line-subtle bg-canvas-paper shadow-sm transition-shadow duration-200 data-[state=open]:shadow-md"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-terra-500/12">
                            <span className="text-[17px] font-semibold leading-snug text-ink-primary">
                              {item.question}
                            </span>
                            <ChevronDown
                              className="h-4 w-4 shrink-0 text-ink-secondary transition-transform duration-200 ease-[var(--ease-smooth)] group-data-[state=open]:rotate-180"
                              aria-hidden="true"
                            />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-[var(--ease-smooth)] motion-reduce:transition-none data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]">
                          <div className="min-h-0">
                            <p className="border-t border-line-subtle px-5 pb-5 pt-4 text-[15px] leading-[1.75] text-ink-body">
                              {item.answer}
                            </p>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                </section>
              ))}
            </div>
          )}

          {/* Contact banner */}
          <div className="mt-16 space-y-4 rounded-xl border border-line-subtle bg-canvas-paper p-8 text-center shadow-sm">
            <h2 className="font-display text-2xl text-ink-primary">Still stuck on something?</h2>
            <Text variant="body-sm" className="leading-relaxed text-ink-body">
              Skip the search bar and talk directly to our engineering team during business hours.
            </Text>
            <div className="pt-1">
              <Link href="/contact" variant="standalone" aria-label="Ask us directly through the contact page">
                Ask us directly
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
