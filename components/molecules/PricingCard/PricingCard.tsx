import React from 'react';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Badge } from '@/components/atoms/Badge';
import { Divider } from '@/components/atoms/Divider';
import { Icon } from '@/components/atoms/Icon';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { PricingCardProps } from './PricingCard.types';

export function PricingCardBody({
  tierName,
  price,
  interval,
  description,
  features,
  highlighted = false,
  cta,
  badgeText,
  className,
  ...props
}: PricingCardProps) {
  return (
    <Stack
      direction="col"
      gap="6"
      className={cn(
        'p-6 bg-canvas-paper border rounded-xl w-full relative shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]',
        highlighted
          ? 'border-terra-500 ring-1 ring-terra-500 shadow-lg hover:shadow-xl'
          : 'border-line-subtle hover:shadow-hover hover:border-line-accent hover:-translate-y-0.5',
        className,
      )}
      data-testid="pricing-card-molecule"
      {...props}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Heading as="h3" variant="heading-sm" className="font-semibold text-ink-primary">
            {tierName}
          </Heading>
          {(badgeText || highlighted) &&
            (highlighted ? (
              <span className="inline-flex items-center rounded-full bg-terra-500 px-2.5 py-1 text-[12px] font-medium text-white shadow-accent">
                {badgeText || 'Most popular'}
              </span>
            ) : (
              <Badge variant="neutral" size="sm">
                {badgeText}
              </Badge>
            ))}
        </div>

        {description && <Text as="p" className="text-body-xs text-ink-secondary">{description}</Text>}

        <div className="flex items-baseline gap-1 pt-1">
          <Heading as="h2" variant="display-md" className="font-semibold text-ink-primary tabular-nums">
            {price}
          </Heading>
          {interval && (
            <Text as="span" className="text-body-xs text-ink-secondary tabular-nums">
              /{interval}
            </Text>
          )}
        </div>
      </div>

      <Divider />

      <ul className="space-y-2.5 flex-1" aria-label={`Features included in ${tierName} plan`}>
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <Icon name="check" size="sm" className="text-terra-600 shrink-0 mt-0.5" aria-hidden="true" />
            <Text as="span" className="text-body-sm text-ink-body">
              {feature}
            </Text>
          </li>
        ))}
      </ul>

      {cta && <div className="pt-2">{cta}</div>}
    </Stack>
  );
}

export function PricingCard(props: PricingCardProps) {
  return <PricingCardBody {...props} />;
}
