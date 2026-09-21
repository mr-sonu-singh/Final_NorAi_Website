import React, { useId } from 'react';
import { Accordion } from '../Accordion';
import { FAQItemProps } from './FAQItem.types';

export function FAQItem({
  question,
  answer,
  id,
  defaultOpen = false,
  className,
  ...props
}: FAQItemProps) {
  const generatedId = useId();
  const itemId = id || generatedId;
  const items = [
    {
      id: itemId,
      title: question,
      content: typeof answer === 'string' ? <p>{answer}</p> : answer,
    },
  ];

  return (
    <Accordion
      items={items}
      type="single"
      defaultValue={defaultOpen ? itemId : undefined}
      className={className}
      data-testid="faq-item-molecule"
      {...props}
    />
  );
}
