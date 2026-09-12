import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalTemplate } from '@/components/templates/LegalTemplate';

export const metadata: Metadata = buildMetadata({
  path: '/privacy',
  title: 'Privacy Policy — NorAi Technologies',
  description:
    'Understand how NorAi Technologies processes, protects, and respects user data with zero persistent logging and AES-256 encryption.',
});

const PRIVACY_SECTIONS = [
  {
    id: 'collection',
    title: '1. Information We Collect',
    paragraphs: [
      'We collect minimal information necessary to deliver our Services: account registration data (name, email address, company name) and technical API metadata (timestamp, request volume, status codes).',
      'We do NOT store or log the text content of your uploaded resumes, lecture audio, community chat messages, or news queries after inference completion.',
    ],
  },
  {
    id: 'ephemeral',
    title: '2. Ephemeral In-Memory Processing',
    paragraphs: [
      'All AI inferences run in ephemeral RAM containers. Input payloads are parsed, evaluated by our LLM pipeline, and immediately flushed from system memory once output JSON is returned.',
      'NorAI does NOT retain your proprietary data to train or fine-tune public foundation models.',
    ],
  },
  {
    id: 'encryption',
    title: '3. Data Security & Encryption Standards',
    paragraphs: [
      'All data transmitted between your application and NorAi API endpoints is encrypted in transit using Transport Layer Security (TLS 1.3).',
      'Account data and billing records are encrypted at rest using AES-256 cryptographic standards with hardware security module key management.',
    ],
  },
  {
    id: 'subprocessors',
    title: '4. Subprocessors & Infrastructure',
    paragraphs: [
      'We partner with tier-1 cloud infrastructure providers (Vercel, AWS, Cloudflare) that comply with SOC2 Type II, ISO 27001, and GDPR security frameworks.',
      'Our subprocessors process encrypted data payloads strictly under our direction and bound by strict Data Processing Agreements (DPAs).',
    ],
  },
  {
    id: 'rights',
    title: '5. User Rights & Data Deletion',
    paragraphs: [
      'You have the right to request access to, correction of, or complete deletion of your account data at any time.',
      'To request account deletion or export your billing history, email noraitechnologies@gmail.com.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalTemplate
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="NorAi Technologies Pvt. Ltd. · Uttar Pradesh, India"
      lastUpdated="January 1, 2026"
      sections={PRIVACY_SECTIONS}
      footer={
        <div className="space-y-3 rounded-xl border border-line-subtle bg-canvas-paper p-6 shadow-sm">
          <h2 className="font-display text-xl text-ink-primary">Privacy requests</h2>
          <p className="text-sm leading-[1.75] text-ink-body">
            For data access, deletion requests, GDPR compliance inquiries, or custom DPA agreements,
            write to{' '}
            <a
              href="mailto:noraitechnologies@gmail.com"
              className="font-semibold text-terra-600 underline underline-offset-4 transition-colors duration-200 hover:text-terra-700"
            >
              noraitechnologies@gmail.com
            </a>{' '}
            — we respond within two business hours.
          </p>
        </div>
      }
    />
  );
}
