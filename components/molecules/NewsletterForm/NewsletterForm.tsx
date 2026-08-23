'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { FormError } from '../FormError';
import { FormHint } from '../FormHint';
import { cn } from '@/lib/utils';
import { NewsletterFormProps } from './NewsletterForm.types';

export function NewsletterForm({
  placeholder = 'Enter your email...',
  buttonText = 'Subscribe',
  disabled = false,
  loading = false,
  error: externalError,
  successMessage,
  onSubmitEmail,
  className,
  ...props
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && onSubmitEmail) {
      onSubmitEmail(email);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-2 w-full max-w-md', className)}
      data-testid="newsletter-form-molecule"
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          required
          value={email}
          placeholder={placeholder}
          disabled={disabled || loading}
          invalid={Boolean(externalError)}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address for newsletter"
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={disabled || loading || !email}
          loading={loading}
          className="shrink-0"
        >
          {buttonText}
        </Button>
      </div>

      {externalError && <FormError message={externalError} />}
      {successMessage && !externalError && (
        <FormHint text={successMessage} className="text-success-600" />
      )}
    </form>
  );
}
