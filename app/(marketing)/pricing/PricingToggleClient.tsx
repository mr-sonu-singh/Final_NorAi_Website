'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Check, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingTier {
  id: string;
  tierLabel: string;
  audience: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  latencySla: string;
  features: string[];
  cta: string;
  href?: string;
  highlighted: boolean;
}

export interface IndividualToolPlan {
  id: string;
  name: string;
  tagline: string;
  freeLimit: string;
  paidPrice: string;
  latency: string;
  keyFeature: string;
  href: string;
  badge?: string;
}

export interface PricingToggleClientProps {
  tiers: PricingTier[];
  individualTools?: IndividualToolPlan[];
}

export function PricingToggleClient({
  tiers,
  individualTools = [],
}: PricingToggleClientProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [viewMode, setViewMode] = useState<'suite' | 'individual'>('suite');

  return (
    <>
      {/* Controls Bar: View Mode Switch & Billing Frequency Pill */}
      <div className="flex flex-col items-center justify-center gap-6 pt-4 pb-2">
        {/* Mode Switcher */}
        <div className="inline-flex rounded-full border border-line-subtle bg-canvas-paper p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('suite')}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
              viewMode === 'suite'
                ? 'bg-canvas-pure font-semibold text-ink-primary shadow-sm border border-line-subtle'
                : 'text-ink-secondary hover:text-ink-primary',
            )}
          >
            <Layers className="h-4 w-4 text-accent-primary" />
            All-Access Platform Suite
          </button>
          <button
            type="button"
            onClick={() => setViewMode('individual')}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
              viewMode === 'individual'
                ? 'bg-canvas-pure font-semibold text-ink-primary shadow-sm border border-line-subtle'
                : 'text-ink-secondary hover:text-ink-primary',
            )}
          >
            <Sparkles className="h-4 w-4 text-accent-primary" />
            Individual Tool Licenses
          </button>
        </div>

        {/* Billing Toggle (Only relevant for Suite plans) */}
        {viewMode === 'suite' && (
          <div className="inline-flex items-center rounded-full border border-line-subtle bg-canvas-paper p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm transition-all duration-200',
                !isAnnual
                  ? 'bg-canvas-pure text-ink-primary shadow-sm border border-line-subtle'
                  : 'text-ink-secondary hover:text-ink-primary',
              )}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm transition-all duration-200',
                isAnnual
                  ? 'bg-canvas-pure text-ink-primary shadow-sm border border-line-subtle'
                  : 'text-ink-secondary hover:text-ink-primary',
              )}
            >
              <span>Annual billing</span>
              <span className="rounded-full bg-sage-100 px-2 py-0.5 font-mono text-[10px] font-bold text-sage-700">
                Save 20%
              </span>
            </button>
          </div>
        )}
      </div>

      {/* View 1: All-Access Suite Tier Cards */}
      {viewMode === 'suite' && (
        <Section className="pt-6 pb-16 lg:pt-8">
          <Container size="default">
            <StaggerGrid
              className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
              stagger={0.08}
            >
              {tiers.map((tier) => {
                const effectivePrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;
                return (
                  <StaggerItem key={tier.id} className="h-full">
                    <div
                      className={cn(
                        'relative flex h-full flex-col justify-between rounded-2xl border bg-canvas-paper p-8 transition-all duration-300',
                        tier.highlighted
                          ? 'border-accent-primary bg-canvas-paper shadow-lg ring-1 ring-accent-primary/50'
                          : 'border-line-subtle shadow-sm hover:border-line-strong hover:shadow-md',
                      )}
                    >
                      {tier.highlighted && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-primary px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                          Most Popular
                        </span>
                      )}

                      <div className="space-y-4">
                        {/* Header & Tagline */}
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
                            {tier.tierLabel}
                          </p>
                          <h3 className="font-display text-2xl font-bold text-ink-primary">
                            {tier.audience}
                          </h3>
                          <p className="text-sm leading-relaxed text-ink-body">
                            {tier.description}
                          </p>
                        </div>

                        {/* Price Numerals */}
                        <div className="pt-3 pb-1 border-t border-line-subtle" aria-live="polite">
                          {tier.monthlyPrice === null ? (
                            <div className="flex items-baseline py-2">
                              <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-ink-primary">
                                Custom quote
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-1.5 py-1">
                              <span className="font-display text-2xl font-normal text-ink-secondary">
                                $
                              </span>
                              <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-ink-primary tabular-nums">
                                {effectivePrice}
                              </span>
                              <span className="font-mono text-xs text-ink-secondary">
                                / month
                              </span>
                            </div>
                          )}
                          <p className="text-[12px] font-mono text-ink-secondary">
                            {tier.monthlyPrice === null
                              ? 'Tailored to VPC compute requirements.'
                              : isAnnual
                                ? `Billed annually ($${(tier.annualPrice ?? 0) * 12}/yr).`
                                : 'Billed month to month.'}
                          </p>
                        </div>

                        {/* Latency SLA Telemetry Badge */}
                        <div className="rounded-xl border border-line-subtle bg-canvas-recessed/60 px-3.5 py-2 flex items-center justify-between font-mono text-[11px]">
                          <span className="flex items-center gap-1.5 text-ink-secondary">
                            <Zap className="h-3 w-3 text-accent-primary" /> SLA Target:
                          </span>
                          <span className="font-bold text-ink-primary">
                            {tier.latencySla}
                          </span>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-3 pt-2">
                          {tier.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-sm text-ink-body"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-sage-600 stroke-[2.5]"
                                aria-hidden="true"
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-8">
                        <Link
                          href={tier.href || `/contact?tier=${tier.id}`}
                          variant="unstyled"
                          aria-label={`${tier.cta} — ${tier.tierLabel} plan`}
                        >
                          <Button
                            variant={tier.highlighted ? 'primary' : 'secondary'}
                            size="md"
                            fullWidth
                            className="font-medium"
                          >
                            {tier.cta}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>

            <Reveal delay={0.15}>
              <p className="pt-8 text-center font-mono text-xs text-ink-secondary">
                🔒 All transactions processed via 256-bit encrypted gateway. Zero hidden fees.
              </p>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* View 2: Individual Micro-SaaS Tool Cards */}
      {viewMode === 'individual' && (
        <Section className="pt-6 pb-16 lg:pt-8">
          <Container size="default">
            <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-2xl text-ink-primary">
                Standalone Micro-SaaS Licenses
              </h3>
              <p className="text-sm text-ink-body">
                Only need one dedicated tool? Subscribe independently with tool-specific limits and free tiers.
              </p>
            </div>

            <StaggerGrid
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              stagger={0.06}
            >
              {individualTools.map((tool) => (
                <StaggerItem key={tool.id} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-line-subtle bg-canvas-paper p-6 shadow-sm transition-all duration-200 hover:border-line-strong hover:shadow-md">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent-primary">
                          Micro-Tool
                        </span>
                        {tool.badge && (
                          <span className="rounded-full bg-sage-100 px-2 py-0.5 font-mono text-[10px] font-bold text-sage-700">
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-display text-lg font-bold text-ink-primary">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-ink-secondary line-clamp-2">
                          {tool.tagline}
                        </p>
                      </div>

                      <div className="pt-2 pb-1 border-t border-line-subtle font-mono space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-ink-secondary">Free Tier:</span>
                          <span className="font-semibold text-ink-primary">{tool.freeLimit}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-ink-secondary">Pro Tier:</span>
                          <span className="font-bold text-accent-primary">{tool.paidPrice}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-ink-muted">
                          <span>Latency:</span>
                          <span>{tool.latency}</span>
                        </div>
                      </div>

                      <div className="text-xs text-ink-body rounded-lg bg-canvas-recessed/60 p-2.5">
                        <span className="font-semibold text-ink-primary">Highlight: </span>
                        {tool.keyFeature}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link href={tool.href} variant="unstyled" aria-label={`Open ${tool.name}`}>
                        <Button variant="secondary" size="sm" fullWidth className="group justify-between">
                          <span>Launch Tool</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Container>
        </Section>
      )}
    </>
  );
}

export default PricingToggleClient;
