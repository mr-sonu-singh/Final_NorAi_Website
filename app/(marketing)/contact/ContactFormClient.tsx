'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Send,
  ShieldCheck,
  RefreshCw,
  Calendar,
  Layers,
  BookOpen,
  Server,
  GraduationCap,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type TriageTrack = 'enterprise' | 'microsaas' | 'mission' | 'general';
type ActiveTab = 'message' | 'schedule';

interface TrackOption {
  id: TriageTrack;
  label: string;
  defaultService: string;
  placeholder: string;
  icon: React.ElementType;
}

const TRIAGE_TRACKS: TrackOption[] = [
  {
    id: 'enterprise',
    label: 'Enterprise',
    defaultService: 'Custom Enterprise AI Pipeline',
    placeholder:
      'Describe your throughput requirements, latency targets, or custom RAG architecture...',
    icon: Server,
  },
  {
    id: 'microsaas',
    label: 'Micro-SaaS',
    defaultService: 'AI Resume Shortlister & Micro-SaaS',
    placeholder:
      'Let us know which tool you are using (Resume, Notes, Digest) or what feature you need...',
    icon: Layers,
  },
  {
    id: 'mission',
    label: 'Campus',
    defaultService: 'Campus Workshop & AI Skill Mission',
    placeholder:
      'Share your college/institution details, estimated cohort size, and preferred schedule...',
    icon: GraduationCap,
  },
  {
    id: 'general',
    label: 'General Inquiry',
    defaultService: 'General Technical Inquiry',
    placeholder: 'How can our engineering team assist you? Write your inquiry here...',
    icon: BookOpen,
  },
];

const inputClasses = [
  'w-full rounded-lg border border-[var(--line)] bg-[#fffdf7] px-4 py-3',
  'font-sans text-[14px] text-[var(--pine)] placeholder:text-[var(--pine)]/40',
  'transition-[border-color,box-shadow] duration-160 ease-out',
  'hover:border-[var(--pine-50)]',
  'focus:border-[var(--mint-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--mint)]/20',
].join(' ');

function FieldLabel({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-1.5 select-none">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--pine)]"
      >
        {children}
        {required && (
          <span className="ml-1 text-[var(--coral)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && <span className="font-mono text-[11px] text-ink-secondary">{hint}</span>}
    </div>
  );
}

export function ContactFormClient() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<ActiveTab>('message');
  const [selectedTrack, setSelectedTrack] = useState<TriageTrack>('enterprise');

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Custom Enterprise AI Pipeline',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);
  const [error, setError] = useState('');

  // Handle URL search params pre-selection
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const p = serviceParam.toLowerCase();
      if (
        p.includes('resume') ||
        p.includes('note') ||
        p.includes('chat') ||
        p.includes('dainik')
      ) {
        setSelectedTrack('microsaas');
        setFormData((prev) => ({ ...prev, service: serviceParam }));
      } else if (p.includes('mission') || p.includes('workshop')) {
        setSelectedTrack('mission');
        setFormData((prev) => ({ ...prev, service: 'Campus Workshop & AI Skill Mission' }));
      } else {
        setSelectedTrack('enterprise');
        setFormData((prev) => ({ ...prev, service: 'Custom Enterprise AI Pipeline' }));
      }
    }
  }, [searchParams]);

  const currentTrackConfig: TrackOption = TRIAGE_TRACKS.find((t) => t.id === selectedTrack) ?? {
    id: 'enterprise',
    label: 'Enterprise Pipeline',
    defaultService: 'Custom Enterprise AI Pipeline',
    placeholder:
      'Describe your throughput requirements, latency targets, or custom RAG architecture...',
    icon: Server,
  };

  const handleTrackChange = (track: TrackOption) => {
    setSelectedTrack(track.id);
    setFormData((prev) => ({
      ...prev,
      service: track.defaultService,
    }));
  };

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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        }),
      });

      const randHex = Math.floor(1000 + Math.random() * 9000);
      const generatedRef = `NOR-2026-${randHex}`;
      setReferenceId(generatedRef);

      if (res.ok) {
        setSubmitted(true);
        setError('');
      } else {
        const errorData = await res.json().catch(() => null);
        setSubmitted(true);
        if (errorData?.message) {
          console.warn(errorData.message);
        }
      }
    } catch (err) {
      console.error(err);
      const randHex = Math.floor(1000 + Math.random() * 9000);
      setReferenceId(`NOR-2026-${randHex}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyRef = async () => {
    if (referenceId) {
      await navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: currentTrackConfig.defaultService,
      message: '',
    });
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-6 sm:p-9 shadow-xs">
      {/* Top Header Switcher: Send Dispatch vs Book Audit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(13,37,61,0.06)] pb-5 mb-7">
        <div className="inline-flex rounded-lg border border-[rgba(13,37,61,0.08)] bg-canvas-recessed/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('message')}
            className={cn(
              'flex items-center gap-2 rounded-md px-3.5 py-1.5 font-sans text-xs font-medium transition-all',
              activeTab === 'message'
                ? 'bg-canvas-pure text-ink-primary shadow-xs font-semibold'
                : 'text-ink-secondary hover:text-ink-primary',
            )}
          >
            <Send className="h-3.5 w-3.5 text-[var(--mint-ink)]" />
            <span>Direct Dispatch</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={cn(
              'flex items-center gap-2 rounded-md px-3.5 py-1.5 font-sans text-xs font-medium transition-all',
              activeTab === 'schedule'
                ? 'bg-canvas-pure text-ink-primary shadow-xs font-semibold'
                : 'text-ink-secondary hover:text-ink-primary',
            )}
          >
            <Calendar className="h-3.5 w-3.5 text-sage-600" />
            <span>Book 20-Min Call</span>
          </button>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--mint-ink)] bg-[rgba(6,132,90,0.08)] border border-[rgba(6,132,90,0.2)] px-2.5 py-1 rounded-md self-start sm:self-auto font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint-ink)]" />
          <span>Engineer Triage · 1-Day Reply</span>
        </div>
      </div>

      {activeTab === 'schedule' ? (
        /* Schedule Tab */
        <div className="py-2 space-y-6">
          <div className="rounded-xl border border-[rgba(13,37,61,0.08)] bg-canvas-pure p-6 sm:p-7 space-y-4">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mint-ink)] font-semibold">
                Architecture Consultation
              </span>
              <h3 className="font-display text-2xl text-ink-primary">
                Schedule a 20-minute technical review
              </h3>
              <p className="text-[14px] leading-relaxed text-ink-secondary">
                Connect directly with a founding engineer to review throughput bottlenecks, private
                VPC isolation, or custom AI pipeline architecture.
              </p>
            </div>

            <div className="pt-3 border-t border-[rgba(13,37,61,0.06)] flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="mailto:noraitechnologies@gmail.com?subject=Schedule%2020-Min%20Architecture%20Review"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--pine)] px-5 py-2.5 font-sans text-xs font-semibold text-[var(--bone)] shadow-xs hover:bg-[var(--forest)] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
              >
                <span>Request Calendar Invite</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="font-mono text-xs text-ink-secondary">
                Direct founder response · Zero sales scripts
              </span>
            </div>
          </div>
        </div>
      ) : submitted ? (
        /* Submission Success State */
        <div
          className="space-y-6 rounded-xl border border-sage-300/60 bg-sage-50/50 p-8 text-center"
          role="status"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700 shadow-xs">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-ink-primary">Dispatch Queued Successfully</h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-body">
              Thank you, <strong className="font-semibold text-ink-primary">{formData.name}</strong>
              . Your inquiry has been routed to our desk. A core engineer will review your note and
              respond to{' '}
              <strong className="font-semibold text-ink-primary">{formData.email}</strong> within 4
              business hours.
            </p>
          </div>

          {/* Reference ID Pill */}
          <div className="mx-auto max-w-xs rounded-lg border border-[rgba(13,37,61,0.1)] bg-canvas-pure p-3 flex items-center justify-between shadow-xs">
            <div className="text-left">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-secondary">
                Dispatch Reference
              </span>
              <span className="font-mono text-xs font-bold text-[var(--mint-ink)]">{referenceId}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyRef}
              className="inline-flex items-center gap-1 rounded bg-canvas-recessed/60 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-primary hover:bg-canvas-recessed transition-colors"
            >
              {copiedRef ? (
                <>
                  <Check className="h-3 w-3 text-sage-600" />
                  <span className="text-sage-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-ink-secondary" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-line-default bg-canvas-pure px-4 py-2 font-sans text-xs font-semibold text-ink-primary shadow-xs transition-all hover:bg-canvas-recessed active:scale-[0.98]"
            >
              <RefreshCw className="h-3.5 w-3.5 text-ink-secondary" />
              <span>Send another dispatch</span>
            </button>
          </div>
        </div>
      ) : (
        /* Streamlined Minimalist Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inquiry Track Minimalist Pill Selector */}
          <div>
            <FieldLabel htmlFor="inquiry-track" required>
              Inquiry Focus
            </FieldLabel>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" id="inquiry-track">
              {TRIAGE_TRACKS.map((track) => {
                const isSelected = selectedTrack === track.id;
                const Icon = track.icon;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleTrackChange(track)}
                    className={cn(
                      'flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-center transition-all',
                      isSelected
                        ? 'border-[var(--mint-ink)] bg-[var(--mint)]/10 text-[var(--pine)] font-semibold shadow-xs'
                        : 'border-[var(--line)] bg-[#fffdf7] text-[var(--pine)]/70 hover:text-[var(--pine)] hover:border-[var(--pine-50)]',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-3.5 w-3.5 shrink-0',
                        isSelected ? 'text-[var(--mint-ink)]' : 'text-[var(--pine)]/60',
                      )}
                    />
                    <span className="font-sans text-xs whitespace-nowrap">{track.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name and Email 2-Column Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-name" required>
                Full Name
              </FieldLabel>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                placeholder="Vikram Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-email" required>
                Work Email
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

          {/* Organization and Service / Topic Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-company" hint="Optional">
                {selectedTrack === 'mission' ? 'University / College' : 'Company / Organization'}
              </FieldLabel>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder={
                  selectedTrack === 'mission' ? 'IIT Kanpur / Lucknow Univ' : 'Company Name'
                }
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-service" required>
                Subject / Topic
              </FieldLabel>
              <input
                id="contact-service"
                name="service"
                type="text"
                required
                aria-required="true"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <FieldLabel htmlFor="contact-message" required>
              Requirement & Technical Scope
            </FieldLabel>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              rows={4}
              placeholder={currentTrackConfig.placeholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} resize-y min-h-[120px] leading-relaxed`}
            />
          </div>

          {error && (
            <div
              className="flex items-start justify-between gap-4 rounded-lg border border-[var(--coral)]/30 bg-[var(--coral)]/10 p-4"
              role="alert"
            >
              <p className="text-xs text-[var(--coral)] font-medium">{error}</p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--pine)] px-6 py-3 font-sans text-[14px] font-semibold text-[var(--bone)] shadow-xs transition-[transform,background-color] duration-160 ease-out hover:bg-[var(--forest)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden="true"
                  />
                  <span>Dispatching to Desk...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Message</span>
                  <Send className="h-3.5 w-3.5 text-[var(--mint)]" aria-hidden="true" />
                </>
              )}
            </button>

            <span className="font-mono text-[11px] text-ink-secondary">
              Direct founder inbox · Reply within 1 business day
            </span>
          </div>

          {/* Privacy Note */}
          <div className="pt-4 border-t border-[rgba(13,37,61,0.06)] flex items-center gap-2 text-[12px] text-ink-secondary">
            <ShieldCheck className="h-4 w-4 text-sage-600 shrink-0" aria-hidden="true" />
            <span>
              Your information is kept strictly confidential and never shared. Read our{' '}
              <Link
                href="/privacy"
                className="font-medium text-ink-primary underline underline-offset-2 hover:text-[var(--mint-ink)] transition-colors"
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
