import React from 'react';
import { InputSize } from '../Input/Input.types';

export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: InputSize;
  invalid?: boolean;
  resize?: TextareaResize;
  'aria-describedby'?: string;
}
