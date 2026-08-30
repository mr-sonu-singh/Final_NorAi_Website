'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heading } from '@/components/foundation/Heading';
import { CheckCircle2, ChevronDown, Send } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: 'AI Resume Shortlister', label: 'AI Resume Shortlister' },
  { value: 'Course Note-Taker', label: 'Course Note-Taker' },
  { value: 'Community Chat Digest', label: 'Community Chat Digest' },
  { value: 'Smart Dainik News', label: 'Smart Dainik News' },
  { value: 'Custom AI development', label: 'Custom AI development' },
  { value: 'Campus Workshop / AI Skill Mission', label: 'Campus Workshop / AI Skill Mission' },
  { value: 'Something else', label: 'Something else' },
];

const inputClasses = [
  'w-full rounded-md border border-line-default bg-canvas-pure px-4 py-3',
  'font-sans text-[15px] text-ink-primary placeholder:text-ink-secondary',
  'transition-[color,background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]',
  'focus-visible:border-terra-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-terra-500/12',
].join(' ');

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-sans text-[14px] font-medium select-none text-ink-primary"
    >
      {children}
      {required && (
        <span className="ml-1 text-terra-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function ContactFormClient() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Resume Shortlister',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const paramLower = serviceParam.toLowerCase();
      const matched = SERVICE_OPTIONS.find((opt) =>
        opt.value.toLowerCase().includes(paramLower) || opt.label.toLowerCase().includes(paramLower)
      );
      if (matched) {
        setFormData((prev) => ({ ...prev, service: matched.value }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setError('');
      } else {
        setError('We could not send your message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong on our end. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line-subtle bg-canvas-paper p-8 shadow-md md:p-10">
      {/* Form header */}
      <div className="space-y-2 pb-6">
        <Heading as="h2" variant="heading-lg" className="font-sans text-xl font-semibold tracking-tight text-ink-primary">
          Send a message
        </Heading>
        <p className="text-sm leading-relaxed text-ink-secondary">
          A few lines about your project are enough — we will take it from there.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4 rounded-xl border border-sage-300 bg-sage-50 p-8 text-center" role="status">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="font-display text-2xl text-ink-primary">Message received.</h3>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-ink-body">
            Thanks for writing in, {formData.name.split(' ')[0] || 'friend'}. We will reply at{' '}
            <strong className="font-semibold text-ink-primary">{formData.email}</strong> within two
            hours during business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-[13px] text-ink-secondary">
            Fields marked with <span className="text-terra-500">*</span> are required.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-name" required>
                Full name
              </FieldLabel>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-email" required>
                Work email
              </FieldLabel>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-company">Company (optional)</FieldLabel>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-service" required>
                What can we help with?
              </FieldLabel>
              <div className="relative">
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`${inputClasses} cursor-pointer appearance-none pr-10`}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-canvas-pure text-ink-primary">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="contact-message" required>
              Tell us about your project
            </FieldLabel>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              rows={5}
              placeholder="What are you working on, and where does it slow down?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} resize-y`}
            />
          </div>

          {error && (
            <div
              className="flex items-start justify-between gap-4 rounded-lg border border-terra-300 bg-terra-50 p-4"
              role="alert"
            >
              <p className="text-sm text-terra-700">{error}</p>
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 text-sm font-semibold text-terra-600 underline underline-offset-4 transition-colors duration-200 hover:text-terra-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-terra-500 px-6 py-3 font-sans text-[15px] font-semibold text-white shadow-accent transition-all duration-200 hover:bg-terra-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Send className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
