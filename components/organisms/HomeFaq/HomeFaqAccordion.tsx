'use client';

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Lock, Terminal, GraduationCap } from 'lucide-react';
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
    question: 'Can NorAI integrate directly with our existing ATS (Greenhouse, Lever, Zoho) and Slack/Discord?',
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
    question: 'What is the NorAI Skill Mission and how can regional institutions in Uttar Pradesh participate?',
    answer:
      'Headquartered in Uttar Pradesh, NorAI conducts hands-on, zero-cost AI engineering bootcamps and hackathons for regional colleges, polytechnics, and schools. We also grant 100% free student access to our AI Course Note-Taker. College leaders can request an on-campus masterclass via our Mission portal.',
    icon: GraduationCap,
  },
];

export function HomeFaqAccordion() {
  return (
    <div className="w-full text-left font-sans max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Technical Architecture & FAQ</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal leading-tight tracking-tight">
          Frequently asked <br />
          <span className="italic text-accent-500 font-normal">engineering questions.</span>
        </h2>
        <p className="text-base text-ink-body leading-relaxed max-w-xl mx-auto">
          Radical transparency on model architecture, sub-second latency targets, privacy guarantees, and regional integration.
        </p>
      </div>

      {/* Accordion Container */}
      <Accordion.Root
        type="single"
        collapsible
        defaultValue="faq-latency"
        className="space-y-3.5"
      >
        {FAQS.map((faq) => {
          const Icon = faq.icon;
          return (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="group rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] overflow-hidden shadow-sm data-[state=open]:border-accent-500/50 data-[state=open]:shadow-md transition-all"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger
                  className={cn(
                    'flex items-center justify-between gap-4 w-full p-5 sm:p-6 text-left transition-colors font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 cursor-pointer',
                    'hover:bg-canvas-recessed/30'
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas-recessed flex items-center justify-center text-accent-500 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-display text-lg sm:text-xl text-ink-primary font-normal leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-ink-secondary shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="accordion-content overflow-hidden px-5 sm:px-6 pb-6 pt-1 text-sm text-ink-body leading-relaxed border-t border-[rgba(13,37,61,0.06)] bg-canvas-recessed/20">
                <p className="pl-11.5 text-ink-body">
                  {faq.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}

export default HomeFaqAccordion;
