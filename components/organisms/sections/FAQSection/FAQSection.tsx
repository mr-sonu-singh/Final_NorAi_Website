'use client';

import React from 'react';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Heading } from '@/components/foundation/Heading';
import { FAQItem } from '@/components/molecules/FAQItem';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { FAQSectionProps } from './FAQSection.types';

export function FAQSection({
  heading,
  items = [],
  expandMode = 'single',
}: FAQSectionProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  return (
    <div ref={ref}>
      <Section
        variant="default"
        className={cn(
          'relative py-16 lg:py-24 transition-all duration-normal',
          shouldAnimate && !isRevealed && 'opacity-0 translate-y-4',
          shouldAnimate && isRevealed && 'opacity-100 translate-y-0',
        )}
        data-testid="faq-section-organism"
        data-expand-mode={expandMode}
        data-revealed={isRevealed}
      >
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Heading as="h2" variant="heading-xl" className="font-bold tracking-tight text-ink-primary">
              {heading}
            </Heading>
          </div>

          {items.length === 0 ? (
            <EmptyState
              title="No FAQs Available"
              description="Frequently asked questions for this section are currently being updated."
              icon="layers"
            />
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {items.map((item, index) => (
                <FAQItem
                  key={`faq-${index}`}
                  id={`faq-${index}`}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
