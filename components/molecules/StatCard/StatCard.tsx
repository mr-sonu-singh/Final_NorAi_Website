import React from 'react';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Icon } from '@/components/atoms/Icon';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { StatCardProps } from './StatCard.types';

export function StatCard({
  value,
  label,
  icon,
  emphasis = false,
  className,
  ...props
}: StatCardProps) {
  return (
    <Stack
      direction="col"
      gap="2"
      align="start"
      className={cn(
        'p-6 bg-canvas-paper border border-line-subtle rounded-xl w-full shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:shadow-hover hover:border-line-accent hover:-translate-y-0.5',
        emphasis && 'border-terra-500/30 bg-terra-50',
        className,
      )}
      data-testid="stat-card-molecule"
      {...props}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <Heading
          as="h3"
          variant="display-md"
          className={cn(
            'font-semibold tracking-tight tabular-nums',
            emphasis ? 'text-terra-600' : 'text-ink-primary',
          )}
        >
          {value}
        </Heading>
        {icon && (
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg shrink-0',
              emphasis ? 'bg-terra-100 text-terra-600' : 'bg-canvas-recessed text-ink-secondary',
            )}
            aria-hidden="true"
          >
            <Icon name={icon} size="md" />
          </div>
        )}
      </div>

      <Text as="p" className="text-body-sm text-ink-secondary font-medium">
        {label}
      </Text>
    </Stack>
  );
}
