import React from 'react';
import { cn } from '@/lib/utils';
import { FocusRing } from '../FocusRing';
import { CheckboxSize } from '../Checkbox/Checkbox.types';
import { RadioProps } from './Radio.types';

const outerSizeClasses: Record<CheckboxSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
};

const innerSizeClasses: Record<CheckboxSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
};

export function Radio({
  name,
  size = 'md',
  checked,
  defaultChecked,
  disabled = false,
  invalid = false,
  className,
  id,
  value,
  onChange,
  'aria-describedby': ariaDescribedby,
  'aria-label': ariaLabel,
  ...props
}: RadioProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const radioElement = (
    <div className="relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        aria-checked={isChecked}
        aria-describedby={ariaDescribedby}
        aria-label={ariaLabel}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-line-strong bg-canvas-pure transition-colors duration-200 ease-[var(--ease-smooth)] select-none cursor-pointer',
          outerSizeClasses[size],
          isChecked && 'border-terra-500',
          invalid && 'border-error-600',
          disabled && 'opacity-disabled bg-canvas-recessed border-line-default cursor-not-allowed',
          className,
        )}
      >
        {isChecked && (
          <span
            className={cn(
              'rounded-full bg-terra-500 transition-transform duration-200 ease-[var(--ease-smooth)] scale-100',
              innerSizeClasses[size],
            )}
          />
        )}
      </div>
    </div>
  );

  return <FocusRing>{radioElement}</FocusRing>;
}
