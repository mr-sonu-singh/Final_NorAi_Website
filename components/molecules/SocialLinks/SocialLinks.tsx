import React from 'react';
import { Link } from '@/components/atoms/Link';
import { Icon } from '@/components/atoms/Icon';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { SocialLinksProps } from './SocialLinks.types';

export function SocialLinks({
  links,
  size = 'md',
  orientation = 'horizontal',
  className,
  ...props
}: SocialLinksProps) {
  return (
    <Stack
      direction={orientation === 'horizontal' ? 'row' : 'col'}
      gap="4"
      align="center"
      className={cn('inline-flex', className)}
      data-testid="social-links-molecule"
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          variant="unstyled"
          external
          aria-label={`${item.label} (opens in new tab)`}
          className={cn(
            'inline-flex items-center justify-center p-2 text-primary hover:text-accent transition-colors duration-fast rounded-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          )}
          data-testid={`social-link-${item.label.toLowerCase()}`}
        >
          <Icon name={item.icon} size={size} aria-hidden="true" />
        </Link>
      ))}
    </Stack>
  );
}
