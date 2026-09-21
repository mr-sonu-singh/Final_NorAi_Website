import React from 'react';
import { ButtonVariant, ButtonSize } from '../Button/Button.types';

export type IconButtonShape = 'square' | 'round';

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  icon: string;
  'aria-label': string; // Required per spec §5.2
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: IconButtonShape;
  disabled?: boolean;
  loading?: boolean;
}
