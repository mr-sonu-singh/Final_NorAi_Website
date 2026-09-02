'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Link } from '@/components/atoms/Link';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingFaqItem {
  id: string;
  question: string;
  answer: string;
  tag?: string;
}

interface PricingFaqAccordionProps {
  items: PricingFaqItem[];
}

export function PricingFaqAccordion({ items }: PricingFaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section variant="sunken" className="py-16 lg:py-20 border-t border-line-subtle">
      <Container size="narrow">
        <div className="mb-12 max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
            <HelpCircle className="h-3.5 w-3.5" />
            Direct Answers
          </p>
          <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
            Questions people ask before paying
          </Heading>
          <Text variant="body-md" className="text-ink-body">
            Get instant clarity on billing cycles, limits, and infrastructure guarantees without leaving this page.
          </Text>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  'rounded-2xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'border-line-strong bg-canvas-paper shadow-sm ring-1 ring-accent-primary/20'
                    : 'border-line-subtle bg-canvas-paper/70 hover:border-line-default hover:bg-canvas-paper',
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <div className="flex items-center gap-3">
                    {item.tag && (
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider rounded bg-canvas-recessed px-2 py-0.5 text-ink-secondary">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-ink-primary sm:text-[17px]">
                      {item.question}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas-recessed text-ink-secondary transition-transform duration-200',
                      isOpen && 'rotate-180 bg-accent-subtle text-accent-primary',
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-line-subtle px-5 pb-5 pt-3.5">
                    <p className="text-sm leading-relaxed text-ink-body">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/faq" variant="standalone" className="inline-flex items-center gap-1.5 font-medium">
            Browse all frequently asked questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default PricingFaqAccordion;
