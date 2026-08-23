import React from 'react';
import { Spinner } from '@/components/atoms/Spinner';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Text } from '@/components/foundation/Text';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { LoadingStateProps } from './LoadingState.types';

export function LoadingState({
  variant = 'spinner',
  label = 'Loading content...',
  className,
  ...props
}: LoadingStateProps) {
  if (variant === 'skeleton') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn('w-full space-y-3 p-4', className)}
        data-testid="loading-state-skeleton"
        {...props}
      >
        <span className="sr-only">{label}</span>
        <Skeleton shape="rect" className="w-1/3 h-6" />
        <Skeleton shape="text" className="w-full h-4" />
        <Skeleton shape="text" className="w-4/5 h-4" />
      </div>
    );
  }

  return (
    <Stack
      direction="col"
      gap="3"
      align="center"
      justify="center"
      role="status"
      aria-live="polite"
      className={cn('p-8 text-center w-full', className)}
      data-testid="loading-state-spinner"
      {...props}
    >
      <Spinner size="lg" aria-label={label} />
      {label && <Text className="text-body-sm text-ink-secondary font-medium">{label}</Text>}
    </Stack>
  );
}
