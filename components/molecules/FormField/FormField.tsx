import React from 'react';
import { Label } from '@/components/atoms/Label';
import { cn } from '@/lib/utils';
import { FormFieldProps } from './FormField.types';

export function FormField({
  id,
  label,
  control,
  hint,
  error,
  required = false,
  readOnly = false,
  disabled = false,
  className,
  children,
  ...props
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const targetControl = control || children;

  const renderedControl = React.isValidElement<{
    id?: string;
    'aria-describedby'?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
  }>(targetControl)
    ? React.cloneElement(targetControl, {
        id,
        'aria-describedby': describedBy,
        invalid: Boolean(error),
        disabled: disabled || targetControl.props.disabled,
        required: required || targetControl.props.required,
        readOnly: readOnly || targetControl.props.readOnly,
      })
    : targetControl;

  return (
    <div
      className={cn('flex flex-col gap-1.5 w-full', className)}
      data-testid="form-field-molecule"
      {...props}
    >
      {label && (
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>
      )}

      {renderedControl}

      {hint && !error && (
        <span id={hintId} className="text-xs text-ink-secondary font-sans">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} role="alert" className="text-xs text-error-600 font-sans font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
