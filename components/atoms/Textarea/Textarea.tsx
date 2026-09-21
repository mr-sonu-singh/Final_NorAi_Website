import React from 'react';
import { cn } from '@/lib/utils';
import { InputSize } from '../Input/Input.types';
import { TextareaProps, TextareaResize } from './Textarea.types';

const sizeClasses: Record<InputSize, string> = {
  sm: 'p-2.5 text-body-sm rounded-md min-h-[80px]',
  md: 'p-3 text-body-md rounded-md min-h-[120px]',
  lg: 'p-4 text-body-lg rounded-md min-h-[160px]',
};

const resizeClasses: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  both: 'resize',
};

export function Textarea({
  size = 'md',
  invalid = false,
  disabled = false,
  readOnly = false,
  resize = 'vertical',
  rows = 4,
  className,
  id,
  name,
  'aria-describedby': ariaDescribedby,
  ...props
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedby}
      className={cn(
        'w-full bg-canvas-pure font-sans text-[15px] text-ink-primary placeholder:text-ink-secondary border border-line-default rounded-md transition-[color,background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]',
        'focus-visible:border-terra-500 focus-visible:ring-[3px] focus-visible:ring-terra-500/12 focus-visible:ring-offset-0 focus-visible:outline-none',
        sizeClasses[size],
        resizeClasses[resize],
        invalid &&
          'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/12',
        disabled && 'opacity-disabled bg-canvas-recessed cursor-not-allowed',
        readOnly && 'bg-canvas-recessed cursor-default',
        className,
      )}
      {...props}
    />
  );
}
