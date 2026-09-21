import React from 'react';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: AlertSeverity;
  title?: string;
  message: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
