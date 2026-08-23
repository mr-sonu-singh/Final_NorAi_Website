'use client';

import React from 'react';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Grid } from '@/components/foundation/Grid';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Button } from '@/components/atoms/Button';
import { PricingCard } from '@/components/molecules/PricingCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { PricingSectionProps, PricingTierConfig } from './PricingSection.types';

export function PricingSection({
  heading,
  tiers = [],
  intro,
}: PricingSectionProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = !prefersReducedMotion;
  const gridCols = tiers.length <= 2 ? 2 : 3;

  const renderTierCard = (tier: PricingTierConfig, index: number) => {
    const ctaButton = (
      <Button
        variant={tier.highlighted ? 'primary' : 'secondary'}
        size="md"
        fullWidth
        onClick={tier.cta.onClick}
      >
        {tier.cta.label}
      </Button>
    );

    return (
      <PricingCard
        key={`${tier.name}-${index}`}
        tierName={tier.name}
        price={tier.price}
        interval={tier.interval}
        features={tier.features}
        highlighted={tier.highlighted}
        cta={ctaButton}
      />
    );
  };

  return (
    <div ref={ref}>
      <Section
        variant="default"
        className={cn(
          'relative py-16 lg:py-24 transition-all duration-normal',
          shouldAnimate && !isRevealed && 'opacity-0 translate-y-4',
          shouldAnimate && isRevealed && 'opacity-100 translate-y-0',
        )}
        data-testid="pricing-section-organism"
        data-revealed={isRevealed}
      >
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <Heading as="h2" variant="heading-xl" className="font-bold tracking-tight text-ink-primary">
              {heading}
            </Heading>
            {intro && (
              <Text variant="body-lg" className="text-ink-body">
                {intro}
              </Text>
            )}
          </div>

          <Grid cols={gridCols} gap="6">
            {tiers.map((tier, index) => renderTierCard(tier, index))}
          </Grid>
        </Container>
      </Section>
    </div>
  );
}
