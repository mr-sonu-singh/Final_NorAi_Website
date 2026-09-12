'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ShieldCheck, Zap, Lock, Terminal, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-latency',
    question: 'How does NorAI guarantee sub-second (<0.35s) parsing latency?',
    answer:
      'We deploy fine-tuned, quantized neural tokenizers on warm serverless vLLM and TensorRT-LLM runtimes. Instead of making generic multi-step chain-of-thought API calls, our models execute targeted single-pass extraction directly against typed Zod schemas, yielding verified results in 180ms to 350ms.',
    icon: Zap,
  },
  {
    id: 'faq-privacy',
    question: 'What is your data residency policy? Is any data retained or used for training?',
    answer:
      'Zero bytes of customer data are ever retained or used for model training. All resumes, audio streams, and community transcripts are parsed in transient, RAM-isolated containers and immediately flushed upon payload return. We offer signed Data Processing Agreements (DPAs) and air-gapped private VPC deployments for enterprise clients.',
    icon: Lock,
  },
  {
    id: 'faq-integrations',
    question:
      'Can NorAI integrate directly with our existing ATS (Greenhouse, Lever, Zoho) and Slack/Discord?',
    answer:
      'Yes. All four micro-SaaS utilities and enterprise pipelines expose typed REST endpoints and webhooks. Our Resume Shortlister syncs candidate scorecards directly to your ATS via standard webhooks, while our Chat Digest dispatches formatted briefs directly into your private Slack or Discord channels.',
    icon: Terminal,
  },
  {
    id: 'faq-mcp',
    question: 'How do your Model Context Protocol (MCP) servers work with IDEs and AI agents?',
    answer:
      'We build production-grade Model Context Protocol (MCP) servers that expose your internal databases, ERP systems, and document repositories as deterministic tools. AI agents in Cursor, Claude Desktop, or custom Python/TypeScript runtimes can invoke these tools with strict schema guarantees and optional human approval checkpoints.',
    icon: ShieldCheck,
  },
  {
    id: 'faq-mission',
    question:
      'What is the NorAI Skill Mission and how can regional institutions in Uttar Pradesh participate?',
    answer:
      'Headquartered in Uttar Pradesh, NorAI conducts hands-on, zero-cost AI engineering bootcamps and hackathons for regional colleges, polytechnics, and schools. We also grant 100% free student access to our AI Course Note-Taker. College leaders can request an on-campus masterclass via our Mission portal.',
    icon: GraduationCap,
  },
];

export function HomeFaqAccordion() {
  return (
    <div className="w-full text-left font-sans max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Technical Architecture &amp; FAQ
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-text-primary font-normal leading-tight tracking-tight">
          Frequently asked <br />
          <span className="font-medium text-text-primary">engineering questions.</span>
        </h2>
        <p className="text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
          Radical transparency on model architecture, sub-second latency targets, privacy
          guarantees, and regional integration.
        </p>
      </div>

      {/* Box-Free Minimalist Accordion List */}
      <Accordion.Root
        type="single"
        collapsible
        defaultValue="faq-latency"
        className="divide-y divide-border-subtle border-t border-b border-border-subtle"
      >
        {FAQS.map((faq) => {
          return (
            <Accordion.Item key={faq.id} value={faq.id} className="group py-1">
              <Accordion.Header className="flex">
                <Accordion.Trigger
                  className={cn(
                    'flex items-center justify-between gap-4 w-full py-4 sm:py-5 text-left transition-colors duration-150 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer active:scale-[0.995]',
                    'hover:text-accent-primary',
                  )}
                >
                  <span className="font-sans font-medium text-base sm:text-lg text-text-primary leading-snug group-hover:text-accent-primary transition-colors">
                    {faq.question}
                  </span>
                  <span className="font-mono text-xl text-text-muted group-hover:text-text-primary w-6 h-6 flex items-center justify-center shrink-0 select-none transition-colors">
                    <span className="group-data-[state=open]:hidden">+</span>
                    <span className="hidden group-data-[state=open]:inline">−</span>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="accordion-content overflow-hidden pb-5 pt-1 text-sm sm:text-base text-text-secondary leading-relaxed">
                <p className="max-w-2xl leading-relaxed">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}

export default HomeFaqAccordion;
