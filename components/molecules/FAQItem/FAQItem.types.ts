import React from 'react';

export interface FAQItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'dir'
> {
  question: string;
  answer: React.ReactNode;
  id?: string;
  defaultOpen?: boolean;
  className?: string;
}
