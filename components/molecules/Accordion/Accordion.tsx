'use client';

import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';
import { AccordionProps } from './Accordion.types';

export function Accordion({
  items,
  type = 'single',
  defaultValue,
  className,
  ...props
}: AccordionProps) {
  if (!items || items.length === 0) return null;

  return (
    <RadixAccordion.Root
      {...(type === 'single'
        ? { type: 'single', collapsible: true, defaultValue: defaultValue as string | undefined }
        : { type: 'multiple', defaultValue: defaultValue as string[] | undefined })}
      className={cn(
        'w-full divide-y divide-line-subtle rounded-xl border border-line-subtle bg-canvas-paper shadow-sm overflow-hidden',
        className,
      )}
      data-testid="accordion-molecule"
      {...props}
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          disabled={item.disabled}
          className="group px-4 py-3"
        >
          <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger
              className={cn(
                'flex flex-1 items-center justify-between py-2 text-left text-body-lg font-medium text-ink-primary transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-terra-600',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500/55 focus-visible:ring-offset-2 rounded-sm',
                item.disabled && 'opacity-disabled cursor-not-allowed text-ink-disabled',
              )}
            >
              <span>{item.title}</span>
              <Icon
                name="chevron-down"
                size="sm"
                className="shrink-0 text-ink-secondary transition-transform duration-200 ease-[var(--ease-smooth)] group-data-[state=open]:rotate-180 group-hover:text-terra-600"
                aria-hidden="true"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          <RadixAccordion.Content className="overflow-hidden text-body-md text-ink-body pt-2 pb-3 transition-all duration-200 ease-[var(--ease-smooth)]">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
