import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { EmptyStateProps } from './EmptyState.types';

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Stack
      direction="col"
      gap="4"
      align="center"
      justify="center"
      className={cn('p-8 text-center max-w-md mx-auto', className)}
      data-testid="empty-state-molecule"
      {...props}
    >
      <div className="w-12 h-12 rounded-full bg-canvas-recessed flex items-center justify-center text-ink-secondary">
        <Icon name={icon} size="lg" aria-hidden="true" />
      </div>

      <div className="space-y-1">
        <Heading as="h4" variant="heading-sm" className="font-semibold text-ink-primary">
          {title}
        </Heading>
        {description && (
          <Text as="p" className="text-body-sm text-ink-secondary max-w-xs mx-auto">
            {description}
          </Text>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </Stack>
  );
}
