import React, { useId } from 'react';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { IconButton } from '@/components/atoms/IconButton';
import { cn } from '@/lib/utils';
import { ModalHeaderProps } from './ModalHeader.types';

export function ModalHeader({
  title,
  description,
  onClose,
  id,
  className,
  ...props
}: ModalHeaderProps) {
  const generatedId = useId();
  const titleId = id || generatedId;

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 p-6 border-b border-line-subtle w-full',
        className,
      )}
      data-testid="modal-header-molecule"
      {...props}
    >
      <div className="space-y-1 min-w-0">
        <Heading id={titleId} as="h4" variant="heading-sm" className="font-semibold text-ink-primary truncate">
          {title}
        </Heading>
        {description && (
          <Text as="p" className="text-body-sm text-ink-secondary">
            {description}
          </Text>
        )}
      </div>

      {onClose && (
        <IconButton
          icon="x"
          size="sm"
          variant="ghost"
          aria-label="Close dialog"
          onClick={onClose}
          className="shrink-0 -mr-2 -mt-2 text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed"
        />
      )}
    </div>
  );
}
