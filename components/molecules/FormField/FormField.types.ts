import React from 'react';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label?: string;
  control?: React.ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
