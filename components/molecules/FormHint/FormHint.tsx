import React from 'react';
import { Text } from '@/components/foundation/Text';
import { cn } from '@/lib/utils';
import { FormHintProps } from './FormHint.types';

export function FormHint({ text, id, className, ...props }: FormHintProps) {
  if (!text) return null;

  return (
    <Text
      as="p"
      id={id}
      className={cn('text-body-xs text-ink-secondary mt-1', className)}
      data-testid="form-hint-molecule"
      {...props}
    >
      {text}
    </Text>
  );
}
