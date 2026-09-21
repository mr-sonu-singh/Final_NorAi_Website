import React from 'react';

export type LoadingStateVariant = 'spinner' | 'skeleton';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoadingStateVariant;
  label?: string;
  className?: string;
}
