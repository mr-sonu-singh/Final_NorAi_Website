import React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarStatus = 'neutral' | 'accent' | 'success' | 'warning' | 'error';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  status?: AvatarStatus;
}
