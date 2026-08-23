'use client';

import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { FocusRing } from '../FocusRing';
import { Icon } from '../Icon';
import { InputSize } from '../Input/Input.types';
import { SelectProps, SelectOption } from './Select.types';

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 pl-3 pr-10 text-body-sm rounded-md',
  md: 'h-11 pl-4 pr-10 text-body-md rounded-md',
  lg: 'h-12 pl-4 pr-10 text-body-lg rounded-md',
};

const iconSizeMap: Record<InputSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export function Select({
  options,
  size = 'md',
  value,
  defaultValue,
  placeholder = 'Select an option...',
  disabled = false,
  invalid = false,
  className,
  id,
  name,
  onChange,
  'aria-describedby': ariaDescribedby,
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (nextVal: string) => {
    if (value === undefined) {
      setInternalValue(nextVal);
    }
    onChange?.(nextVal);
  };

  const triggerElement = (
    <SelectPrimitive.Trigger
      id={id}
      disabled={disabled}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedby}
      className={cn(
        'relative inline-flex items-center justify-between w-full bg-canvas-pure font-sans text-[15px] text-ink-primary border border-line-default rounded-md cursor-pointer transition-[color,background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)] select-none',
        'focus-visible:border-terra-500 focus-visible:ring-[3px] focus-visible:ring-terra-500/12 focus-visible:ring-offset-0 focus-visible:outline-none',
        sizeClasses[size],
        !currentValue && 'text-ink-secondary',
        invalid &&
          'border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/12',
        disabled && 'opacity-disabled bg-canvas-recessed cursor-not-allowed',
        className,
      )}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon asChild>
        <div className="absolute right-3 pointer-events-none text-ink-secondary">
          <Icon name="ChevronDown" size={iconSizeMap[size]} />
        </div>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );

  return (
    <SelectPrimitive.Root
      value={currentValue !== undefined ? String(currentValue) : undefined}
      defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
      onValueChange={handleValueChange}
      disabled={disabled}
      name={name}
    >
      <FocusRing>{triggerElement}</FocusRing>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-line-default bg-canvas-paper text-ink-primary shadow-md animate-in fade-in-80"
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option: SelectOption) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none data-[highlighted]:bg-terra-50 data-[highlighted]:text-terra-700 focus:bg-terra-50 focus:text-terra-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled"
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-terra-600">
                  <SelectPrimitive.ItemIndicator>
                    <Icon name="Check" size="xs" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
