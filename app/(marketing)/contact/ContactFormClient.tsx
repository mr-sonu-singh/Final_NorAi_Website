'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heading } from '@/components/foundation/Heading';
import { CheckCircle2, ChevronDown, Send, ShieldCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const SERVICE_OPTIONS = [
  { value: 'AI Resume Shortlister', label: 'AI Resume Shortlister (Micro-SaaS)' },
  { value: 'Course Note-Taker', label: 'Course Note-Taker (Study Utility)' },
  { value: 'Community Chat Digest', label: 'Community Chat Digest (Channel Intel)' },
  { value: 'Smart Dainik News', label: 'Smart Dainik News (Regional Alerts)' },
  { value: 'Custom AI development', label: 'Custom Enterprise AI Pipeline' },
  { value: 'Campus Workshop / AI Skill Mission', label: 'Campus Workshop & AI Skill Mission' },
  { value: 'Something else', label: 'General Technical Inquiry' },
];

const inputClasses = [
  'w-full rounded-lg border border-line-default bg-canvas-pure px-4 py-3',
  'font-sans text-[15px] text-ink-primary placeholder:text-ink-secondary',
  'transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-smooth)]',
  'focus-visible:border-terra-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terra-500 focus-visible:ring-offset-canvas-paper',
].join(' ');

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-sans text-[13px] font-semibold uppercase tracking-wider select-none text-ink-primary"
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
      const matched = SERVICE_OPTIONS.find(
        (opt) =>
          opt.value.toLowerCase().includes(paramLower) ||
          opt.label.toLowerCase().includes(paramLower)
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
        const errorData = await res.json().catch(() => null);
        setError(
          errorData?.message || 'We could not send your message right now. Please try again.'
        );
      }
    } catch (err) {
      console.error(err);
      setError('A network error occurred while submitting. Please check your connection and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'AI Resume Shortlister',
      message: '',
    });
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.09)] bg-canvas-paper p-7 md:p-9 shadow-sm">
      {/* Form header / hardware window title */}
      <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.07)] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-terra-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-ochre-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-sage-500/80 inline-block" />
          <span className="font-mono text-xs font-medium text-ink-secondary ml-2 tracking-wide uppercase">
            Inquiry Dispatch Window
          </span>
        </div>
        <span className="font-mono text-[11px] text-sage-700 bg-sage-50 border border-sage-200/80 px-2 py-0.5 rounded font-medium">
          Direct Route
        </span>
      </div>

      {submitted ? (
        <div
          className="space-y-5 rounded-xl border border-sage-200 bg-sage-50/60 p-8 text-center"
          role="status"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700 shadow-sm">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="space-y-1.5">
            <Heading as="h2" className="font-display text-2xl text-ink-primary">
              Message Received
            </Heading>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-ink-body">
              Thank you, <strong className="font-semibold text-ink-primary">{formData.name}</strong>.
              Your inquiry regarding <strong className="font-semibold text-ink-primary">{formData.service}</strong> has been routed directly to our engineering team. We will reply to{' '}
              <strong className="font-semibold text-ink-primary">{formData.email}</strong> promptly
              during business hours.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-line-default bg-canvas-pure px-4 py-2 font-sans text-xs font-semibold text-ink-primary shadow-sm transition-all hover:bg-canvas-recessed active:scale-[0.98]"
            >
              <RefreshCw className="h-3.5 w-3.5 text-ink-secondary" />
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="e.g. Vikram Sharma"
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
                placeholder="vikram@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-company">Company / Organization</FieldLabel>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Corp (optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-service" required>
                Area of Interest
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
              Project Details & Requirements
            </FieldLabel>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              rows={4}
              placeholder="Describe what you are looking to automate, accelerate, or engineer with NorAI..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} resize-y min-h-[120px]`}
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

          <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-terra-500 px-6 py-3 font-sans text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-terra-600 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terra-500 focus-visible:ring-offset-canvas-paper disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden="true"
                  />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>

            <span className="font-mono text-xs text-ink-secondary">
              Direct inbox · Triage by engineers
            </span>
          </div>

          {/* Inline Privacy & Security Micro-Reassurance */}
          <div className="pt-3 border-t border-[rgba(13,37,61,0.07)] flex items-start gap-2.5 text-[12px] text-ink-secondary leading-relaxed">
            <ShieldCheck className="h-4 w-4 text-sage-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Your information is strictly protected and never sold or shared. Read our{' '}
              <Link
                href="/privacy"
                className="font-medium text-terra-600 underline underline-offset-2 hover:text-terra-700 transition-colors"
              >
                privacy policy
              </Link>
              .
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
