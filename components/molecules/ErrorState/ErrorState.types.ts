import React from 'react';

export type ErrorStateVariant = 'inline' | 'fullSection' | 'notFound';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: ErrorStateVariant;
  className?: string;
}
