import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string; // Required per spec §5.6
  required?: boolean;
  disabled?: boolean;
}
