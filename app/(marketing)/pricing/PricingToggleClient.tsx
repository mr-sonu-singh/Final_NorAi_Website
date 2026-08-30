'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Switch } from '@/components/atoms/Switch';
import { Check } from 'lucide-react';

export interface PricingTier {
  id: string;
  tierLabel: string;
  audience: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface PricingToggleClientProps {
  tiers: PricingTier[];
}

export function PricingToggleClient({ tiers }: PricingToggleClientProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <>
      {/* Billing toggle */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
        <span
          className={`text-sm transition-colors duration-200 ${isAnnual ? 'font-medium text-ink-secondary' : 'font-semibold text-ink-primary'}`}
        >
          Monthly billing
        </span>
        <Switch
          checked={isAnnual}
          onChange={(checked) => setIsAnnual(checked)}
          aria-label="Toggle annual billing"
        />
        <span
          className={`inline-flex items-center gap-2 text-sm transition-colors duration-200 ${isAnnual ? 'font-semibold text-ink-primary' : 'font-medium text-ink-secondary'}`}
        >
          Annual billing
          <span className="rounded-full bg-sage-100 px-2 py-0.5 text-xs font-semibold text-sage-700">
            Save 20%
          </span>
        </span>
      </div>

      {/* Tier cards */}
      <Section className="pt-6 pb-16 lg:pt-8">
        <Container size="default">
          <StaggerGrid className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3" stagger={0.08}>
            {tiers.map((tier) => {
              return (
                <StaggerItem key={tier.id} className="h-full">
                  <div
                    className={
                      tier.highlighted
                        ? 'relative flex h-full flex-col rounded-2xl border border-terra-500 bg-canvas-paper p-8 shadow-lg ring-1 ring-terra-500'
                        : 'relative flex h-full flex-col rounded-2xl border border-line-subtle bg-canvas-paper p-8 shadow-sm transition-shadow duration-300 hover:shadow-md'
                    }
                  >
                    {tier.highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-terra-500 px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-accent">
                        Most popular
                      </span>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-ink-secondary">{tier.tierLabel}</p>
                      <h3 className="font-display text-2xl text-ink-primary">{tier.audience}</h3>
                      <p className="text-sm leading-relaxed text-ink-body">{tier.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-6" aria-live="polite">
                      {tier.monthlyPrice === null ? (
                        <span className="text-4xl font-semibold tabular-nums tracking-tight text-ink-primary">
                          Custom quote
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-semibold tabular-nums tracking-tight text-ink-primary">
                            ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                          </span>
                          <span className="text-sm text-ink-secondary">/ month</span>
                        </>
                      )}
                    </div>
                    <p className="pt-1 text-[13px] text-ink-secondary">
                      {tier.monthlyPrice === null
                        ? 'Scoped with our team before any commitment.'
                        : isAnnual
                          ? `Billed annually ($${(tier.annualPrice ?? 0) * 12}/year).`
                          : 'Billed month to month.'}
                    </p>

                    <ul className="flex-1 space-y-3 border-t border-line-subtle py-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-ink-body">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" variant="unstyled" aria-label={`${tier.cta} — ${tier.tierLabel} plan`}>
                      <Button
                        variant={tier.highlighted ? 'primary' : 'secondary'}
                        size="md"
                        fullWidth
                      >
                        {tier.cta}
                      </Button>
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>

          <Reveal delay={0.15}>
            <p className="pt-6 text-center text-[13px] text-ink-secondary">
              Prices in USD. Cancel anytime. No surprise invoices.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
