'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggleProps } from './ThemeToggle.types';

/**
 * The NorAI site ships a single warm light theme, so there is nothing to
 * toggle. The component stays exported with its original props API and
 * renders an inert hidden placeholder — callers can keep mounting it safely.
 */
export function ThemeToggle({
  checked: _checked,
  defaultChecked: _defaultChecked,
  disabled: _disabled,
  onChange: _onChange,
  'aria-label': _ariaLabel = 'Toggle theme',
  className,
  ...props
}: ThemeToggleProps) {
  return <div className={cn('hidden', className)} data-testid="theme-toggle-molecule" {...props} />;
}
