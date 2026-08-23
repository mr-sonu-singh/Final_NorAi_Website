import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { FeatureCardProps } from './FeatureCard.types';

export function FeatureCardBody({
  icon,
  title,
  description,
  cta,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Stack
      direction="col"
      gap="4"
      align="start"
      className={cn(
        'p-6 bg-canvas-paper border border-line-subtle rounded-xl w-full shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:shadow-hover hover:border-line-accent hover:-translate-y-0.5',
        className,
      )}
      data-testid="feature-card-molecule"
      {...props}
    >
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-terra-100 text-terra-600 flex items-center justify-center shrink-0">
          <Icon name={icon} size="md" aria-hidden="true" />
        </div>
      )}

      <div className="space-y-2">
        <Heading as="h3" variant="heading-sm" className="font-semibold text-ink-primary">
          {title}
        </Heading>
        <Text as="p" className="text-body-sm text-ink-body leading-relaxed">
          {description}
        </Text>
      </div>

      {cta && <div className="mt-2">{cta}</div>}
    </Stack>
  );
}

export function FeatureCard(props: FeatureCardProps) {
  return <FeatureCardBody {...props} />;
}
