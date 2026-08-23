import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { Text } from '@/components/foundation/Text';
import { cn } from '@/lib/utils';
import { ToastProps, ToastSeverity } from './Toast.types';

const severityMap: Record<ToastSeverity, { icon: string; iconColor: string }> = {
  info: { icon: 'info', iconColor: 'text-info-600' },
  success: { icon: 'check-circle', iconColor: 'text-success-600' },
  warning: { icon: 'alert-triangle', iconColor: 'text-warning-600' },
  error: { icon: 'alert-circle', iconColor: 'text-error-600' },
};

export function Toast({
  severity = 'info',
  title,
  message,
  actionLabel,
  onAction,
  onDismiss,
  className,
  ...props
}: ToastProps) {
  const { icon, iconColor } = severityMap[severity];
  const isCritical = severity === 'error' || severity === 'warning';

  return (
    <div
      role={isCritical ? 'alert' : 'status'}
      aria-live={isCritical ? 'assertive' : 'polite'}
      className={cn(
        'inline-flex items-center gap-3 p-3.5 bg-canvas-paper border border-line-subtle shadow-lg rounded-lg max-w-md w-full',
        className,
      )}
      data-testid="toast-molecule"
      {...props}
    >
      <Icon name={icon} size="md" className={cn('shrink-0', iconColor)} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        {title && (
          <Text as="p" className="text-body-sm font-semibold text-ink-primary">
            {title}
          </Text>
        )}
        <Text as="p" className="text-body-xs text-ink-secondary">
          {message}
        </Text>
      </div>

      {actionLabel && (
        <Button variant="ghost" size="sm" onClick={onAction} className="shrink-0 text-terra-600 hover:bg-terra-50">
          {actionLabel}
        </Button>
      )}

      {onDismiss && (
        <IconButton
          icon="x"
          size="sm"
          variant="ghost"
          aria-label="Close notification"
          onClick={onDismiss}
          className="shrink-0 text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed"
        />
      )}
    </div>
  );
}
