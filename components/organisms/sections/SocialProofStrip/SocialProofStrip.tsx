'use client';

import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Text } from '@/components/foundation/Text';
import { Badge } from '@/components/atoms/Badge';
import { Link } from '@/components/atoms/Link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import {
  SocialProofStripProps,
  SocialProofLogo,
  SocialProofTrustIndicator,
} from './SocialProofStrip.types';

export function SocialProofStrip({
  eyebrow,
  logos = [],
  trustIndicators = [],
}: SocialProofStripProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = !prefersReducedMotion;
  const isTrustIndicatorsVariant = trustIndicators.length > 0 && logos.length === 0;
  const activeVariant = isTrustIndicatorsVariant ? 'trustIndicators' : 'logoCloud';

  const renderLogo = (logo: SocialProofLogo, index: number) => {
    const content = (
      <div className="flex items-center gap-2 px-3 py-1.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-normal">
        {logo.logoUrl ? (
          <Image
            src={logo.logoUrl}
            alt={logo.name}
            width={100}
            height={24}
            className="h-6 w-auto object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        ) : (
          <Text variant="body-sm" className="font-semibold text-primary-700 tracking-tight">
            {logo.name}
          </Text>
        )}
      </div>
    );

    if (logo.href) {
      return (
        <Link key={`${logo.name}-${index}`} href={logo.href} external aria-label={logo.name}>
          {content}
        </Link>
      );
    }

    return <div key={`${logo.name}-${index}`}>{content}</div>;
  };

  const renderTrustIndicator = (indicator: SocialProofTrustIndicator, index: number) => {
    return (
      <div key={`${indicator.label}-${index}`} className="flex items-center gap-2">
        <Text variant="body-xs" className="text-primary-500 font-medium">
          {indicator.label}:
        </Text>
        <Badge variant="neutral" size="sm">
          {indicator.value}
        </Badge>
      </div>
    );
  };

  return (
    <div ref={ref}>
      <Section
        variant="sunken"
        className={cn(
          'py-8 border-y border-primary-200 transition-all duration-normal',
          shouldAnimate && !isRevealed && 'opacity-0 translate-y-4',
          shouldAnimate && isRevealed && 'opacity-100 translate-y-0',
        )}
        data-testid="social-proof-strip-organism"
        data-variant={activeVariant}
        data-revealed={isRevealed}
      >
        <Container size="default">
          <div className="flex flex-col items-center gap-6">
            {eyebrow && (
              <Text variant="body-xs" className="text-primary-500 font-medium text-center">
                {eyebrow}
              </Text>
            )}

            <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {logos.map((logo, index) => renderLogo(logo, index))}
              {trustIndicators.map((indicator, index) => renderTrustIndicator(indicator, index))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
