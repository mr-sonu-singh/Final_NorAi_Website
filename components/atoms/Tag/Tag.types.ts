import React from 'react';
import { BadgeVariant, BadgeSize } from '../Badge/Badge.types';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  leadingIcon?: string;
  onRemove?: () => void;
}
