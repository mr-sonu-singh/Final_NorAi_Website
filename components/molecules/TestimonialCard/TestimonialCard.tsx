import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { Text } from '@/components/foundation/Text';
import { Heading } from '@/components/foundation/Heading';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { TestimonialCardProps } from './TestimonialCard.types';

export function TestimonialCardBody({
  quote,
  authorName,
  authorRole,
  authorCompany,
  avatarSrc,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'p-6 bg-canvas-paper border border-line-subtle rounded-xl w-full shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:shadow-hover hover:border-line-accent hover:-translate-y-0.5',
        className,
      )}
      data-testid="testimonial-card-molecule"
      {...props}
    >
      <Stack direction="col" gap="4">
        <blockquote className="m-0">
          <Text
            as="p"
            className="font-display italic text-[length:var(--text-heading-lg-size)] leading-[var(--text-heading-lg-line)] tracking-[var(--text-heading-lg-tracking)] text-ink-primary"
          >
            &ldquo;{quote}&rdquo;
          </Text>
        </blockquote>

        <figcaption className="inline-flex items-center gap-3 pt-2">
          <Avatar src={avatarSrc} alt={authorName} size="md" />
          <div className="space-y-0.5">
            <Heading as="h4" variant="heading-xs" className="font-semibold text-[14px] text-ink-primary font-sans">
              {authorName}
            </Heading>
            <Text as="p" className="text-body-xs text-ink-secondary">
              {authorRole}
              {authorCompany ? `, ${authorCompany}` : ''}
            </Text>
          </div>
        </figcaption>
      </Stack>
    </figure>
  );
}

export function TestimonialCard(props: TestimonialCardProps) {
  return <TestimonialCardBody {...props} />;
}
