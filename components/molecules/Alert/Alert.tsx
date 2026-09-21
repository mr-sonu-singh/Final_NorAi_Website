import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { cn } from '@/lib/utils';
import { AlertProps, AlertSeverity } from './Alert.types';

const severityMap: Record<
  AlertSeverity,
  { icon: string; bg: string; accentBorder: string; titleColor: string; iconColor: string }
> = {
  info: {
    icon: 'info',
    bg: 'bg-info-100',
    accentBorder: 'border-l-info-600',
    titleColor: 'text-ink-primary',
    iconColor: 'text-info-600',
  },
  success: {
    icon: 'check-circle',
    bg: 'bg-success-100',
    accentBorder: 'border-l-success-600',
    titleColor: 'text-ink-primary',
    iconColor: 'text-success-600',
  },
  warning: {
    icon: 'alert-triangle',
    bg: 'bg-warning-100',
    accentBorder: 'border-l-warning-600',
    titleColor: 'text-ink-primary',
    iconColor: 'text-warning-600',
  },
  error: {
    icon: 'alert-circle',
    bg: 'bg-error-100',
    accentBorder: 'border-l-error-600',
    titleColor: 'text-ink-primary',
    iconColor: 'text-error-600',
  },
};

export function Alert({
  severity = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: AlertProps) {
  const config = severityMap[severity];
  const isCritical = severity === 'error' || severity === 'warning';

  return (
    <div
      role={isCritical ? 'alert' : 'status'}
      aria-live={isCritical ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-3 p-4 rounded-md border-l-4 w-full',
        config.bg,
        config.accentBorder,
        className,
      )}
      data-testid="alert-molecule"
      {...props}
    >
      <Icon
        name={config.icon}
        size="md"
        className={cn('shrink-0 mt-0.5', config.iconColor)}
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0">
        {title && (
          <Heading
            as="h6"
            variant="heading-xs"
            className={cn('font-semibold mb-1 text-body-md', config.titleColor)}
          >
            {title}
          </Heading>
        )}
        <Text as="div" className="text-body-sm leading-relaxed text-ink-body">
          {message}
        </Text>
      </div>

      {(dismissible || onDismiss) && (
        <IconButton
          icon="x"
          size="sm"
          variant="ghost"
          aria-label="Dismiss alert"
          onClick={onDismiss}
          className="shrink-0 -mr-1 -mt-1 text-ink-secondary hover:text-ink-primary"
        />
      )}
    </div>
  );
}
