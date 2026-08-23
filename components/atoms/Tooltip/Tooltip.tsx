'use client';

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import { TooltipProps } from './Tooltip.types';

export function Tooltip({
  content,
  side = 'top',
  delay = 200,
  disabled = false,
  children,
}: TooltipProps) {
  if (disabled || !content) {
    return children;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={4}
            className={cn(
              'z-50 px-2.5 py-1.5 text-body-xs font-sans font-medium text-canvas-paper bg-navy-900 rounded-md shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-200 ease-[var(--ease-smooth)] animate-in fade-in-0',
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-navy-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
