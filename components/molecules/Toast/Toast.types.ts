import React from 'react';

export type ToastSeverity = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: ToastSeverity;
  title?: string;
  message: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}
