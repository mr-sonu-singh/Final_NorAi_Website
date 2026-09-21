import React from 'react';
import { cn } from '@/lib/utils';
import { LabelProps } from './Label.types';

export function Label({
  htmlFor,
  required = false,
  disabled = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block font-sans text-[14px] font-medium text-ink-primary mb-1.5 select-none',
        disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-error-600" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
