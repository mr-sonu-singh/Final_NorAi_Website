import React from 'react';
import { Stack } from '@/components/foundation/Stack';
import { cn } from '@/lib/utils';
import { ModalFooterProps } from './ModalFooter.types';

export function ModalFooter({
  primaryAction,
  secondaryAction,
  align = 'end',
  className,
  children,
  ...props
}: ModalFooterProps) {
  const content = children || (
    <>
      {secondaryAction}
      {primaryAction}
    </>
  );

  return (
    <div
      className={cn('p-6 border-t border-line-subtle w-full', className)}
      data-testid="modal-footer-molecule"
      {...props}
    >
      <Stack
        direction="row"
        gap="3"
        align="center"
        justify={align}
        className="w-full flex-wrap sm:flex-nowrap"
      >
        {content}
      </Stack>
    </div>
  );
}
