import React from 'react';
import { EmptyState } from '../EmptyState';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { ErrorStateProps } from './ErrorState.types';

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred while loading this section. Please try again.',
  primaryAction,
  secondaryAction,
  variant = 'inline',
  className,
  ...props
}: ErrorStateProps) {
  const actions = (primaryAction || secondaryAction) && (
    <Stack direction="row" gap="3" align="center" justify="center">
      {primaryAction}
      {secondaryAction}
    </Stack>
  );

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'w-full',
        variant === 'fullSection' && 'min-h-[400px] flex items-center justify-center py-12',
        className,
      )}
      data-testid="error-state-molecule"
      {...props}
    >
      <EmptyState
        icon={variant === 'notFound' ? 'file-x' : 'alert-triangle'}
        title={title}
        description={description}
        action={actions}
      />
    </div>
  );
}
