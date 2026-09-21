'use client';

import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import { SwitchProps, SwitchSize } from './Switch.types';

const trackSizeClasses: Record<SwitchSize, string> = {
  sm: 'w-8 h-4.5 p-0.5',
  md: 'w-11 h-6 p-0.5',
};

const thumbSizeClasses: Record<SwitchSize, { size: string; translate: string }> = {
  sm: { size: 'w-3.5 h-3.5', translate: 'data-[state=checked]:translate-x-3.5' },
  md: { size: 'w-5 h-5', translate: 'data-[state=checked]:translate-x-5' },
};

export function Switch({
  size = 'md',
  checked,
  defaultChecked,
  disabled = false,
  className,
  id,
  name,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleCheckedChange = (nextChecked: boolean) => {
    if (checked === undefined) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked);
  };

  return (
    <SwitchPrimitive.Root
      id={id}
      name={name}
      checked={isChecked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-[var(--ease-smooth)] select-none min-w-[44px] min-h-[44px] data-[state=checked]:bg-terra-500 data-[state=unchecked]:bg-canvas-recessed border border-line-subtle data-[state=checked]:border-terra-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2',
        trackSizeClasses[size],
        disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-canvas-pure shadow-xs transition-transform duration-200 ease-[var(--ease-smooth)] translate-x-0',
          thumbSizeClasses[size].size,
          thumbSizeClasses[size].translate,
        )}
      />
    </SwitchPrimitive.Root>
  );
}
