import React from 'react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export type AccordionType = 'single' | 'multiple';

export interface AccordionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'dir'
> {
  items: AccordionItemData[];
  type?: AccordionType;
  defaultValue?: string | string[];
  dir?: 'ltr' | 'rtl';
  className?: string;
}
