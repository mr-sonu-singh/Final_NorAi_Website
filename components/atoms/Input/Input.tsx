import React from 'react';
import { cn } from '@/lib/utils';
import { FocusRing } from '../FocusRing';
import { Icon } from '../Icon';
import { InputProps, InputSize } from './Input.types';

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-body-sm rounded-md',
  md: 'h-11 px-3.5 text-[15px] rounded-md',
  lg: 'h-12 px-4 text-body-lg rounded-md',
};

const iconSizeMap: Record<InputSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export function Input({
  type = 'text',
  size = 'md',
  invalid = false,
  disabled = false,
  readOnly = false,
  leadingIcon,
  trailingIcon,
  className,
  id,
  name,
  'aria-describedby': ariaDescribedby,
  ...props
}: InputProps) {
  const inputElement = (
    <div className="relative flex items-center w-full">
      {leadingIcon && (
        <div className="absolute left-3 pointer-events-none text-ink-secondary">
          <Icon name={leadingIcon} size={iconSizeMap[size]} />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid}
        aria-describedby={ariaDescribedby}
        className={cn(
          'w-full bg-canvas-pure font-sans text-[15px] text-ink-primary placeholder:text-ink-secondary border border-line-default rounded-md transition-[color,background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]',
          'focus-visible:border-terra-500 focus-visible:ring-[3px] focus-visible:ring-terra-500/12 focus-visible:ring-offset-0 focus-visible:outline-none',
          sizeClasses[size],
          leadingIcon && 'pl-10',
          trailingIcon && 'pr-10',
          invalid &&
            'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/12',
          disabled && 'opacity-disabled bg-canvas-recessed cursor-not-allowed',
          readOnly && 'bg-canvas-recessed cursor-default',
          className,
        )}
        {...props}
      />
      {trailingIcon && (
        <div className="absolute right-3 pointer-events-none text-ink-secondary">
          <Icon name={trailingIcon} size={iconSizeMap[size]} />
        </div>
      )}
    </div>
  );

  return <FocusRing>{inputElement}</FocusRing>;
}
