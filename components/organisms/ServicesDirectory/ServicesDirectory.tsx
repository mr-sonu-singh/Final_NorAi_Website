'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Practice {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  stages: string[];
  deliverables: string[];
  cta: string;
  href: string;
}

const PRACTICES: Practice[] = [
  {
    id: 'rag-systems',
    title: 'RAG Systems & Vector Search',
    category: 'Knowledge Retrieval',
    tagline: 'Enterprise vector search pipelines, hybrid retrieval, and multi-document indexing engines for high-accuracy internal knowledge search.',
    problem: 'Off-the-shelf chatbots hallucinate when queried on thousands of internal PDFs, Notion wikis, and technical documents.',
    solution: 'We build hybrid vector + BM25 keyword search engines with grounded context verification, ensuring zero false retrieval.',
    stages: [
      'Document Chunking & Clean Ingestion',
      'Dense Embeddings & Vector Indexing',
      'Hybrid Retrieval & Grounding Check',
      'Verified Deterministic JSON Response',
    ],
    deliverables: [
      'Custom chunking strategies tailored to your document schema',
      'Hybrid vector DB infrastructure (pgvector / Qdrant / Pinecone)',
      'Sub-200ms retrieval latency with citation verification',
      'On-premise or isolated VPC deployment container',
    ],
    cta: 'Scope RAG Architecture',
    href: '/contact?service=rag-systems',
  },
  {
    id: 'mcp-integration',
    title: 'Model Context Protocol (MCP) Servers',
    category: 'Protocol Tooling',
    tagline: 'Standardized MCP tool and resource servers connecting LLMs and Claude directly to your private databases and internal APIs.',
    problem: 'Connecting AI assistants to internal databases requires brittle custom connectors that break with every API update.',
    solution: 'We engineer official Model Context Protocol (MCP) tool servers with secure sandbox execution and typed tool schemas.',
    stages: [
      'Schema Introspection & Security Boundary',
      'Standardized MCP Protocol Server Implementation',
      'Type-Safe Parameter Validation & Sandboxing',
      'Claude Desktop & Agent Orchestration Ready',
    ],
    deliverables: [
      'Production-grade TypeScript / Python MCP tool servers',
      'Granular authorization & read/write access policies',
      'Standardized tool declarations and JSON schema contracts',
      'Full test harness and mock testing suite',
    ],
    cta: 'Integrate MCP Server',
    href: '/contact?service=mcp-integration',
  },
  {
    id: 'llm-optimization',
    title: 'LLM Stack Optimization & Cost Auditing',
    category: 'Model Optimization',
    tagline: 'Evaluate model performance, optimize prompt pipelines, eliminate token waste, and implement latency benchmarks across your LLM infrastructure.',
    problem: 'Unoptimized LLM calls burn through thousands of dollars monthly while suffering from 5+ second latency delays.',
    solution: 'We audit prompt token density, implement semantic response caching, and route queries to smaller, fine-tuned deterministic models.',
    stages: [
      'Token Density & Latency Bottleneck Audit',
      'Prompt Optimization & Schema Compression',
      'Semantic In-Memory Response Caching',
      'Model Tiering & Automated Fallback Routing',
    ],
    deliverables: [
      '40%–70% reduction in monthly foundation model API spend',
      'P95 latency reduction from 4s down to < 600ms',
      'Zero-loss accuracy evaluation benchmarks',
      'Automated cost telemetry and usage dashboards',
    ],
    cta: 'Audit Your LLM Spend',
    href: '/contact?service=llm-consulting',
  },
  {
    id: 'custom-web-apps',
    title: 'Custom AI Web Applications',
    category: 'Full-Stack Web',
    tagline: 'Modern Next.js and React web applications powered by sub-second neural inference, dynamic UI generation, and deterministic workflow engines.',
    problem: 'Generic AI wrapper templates lack tactile polish, responsive speed, and enterprise-grade state management.',
    solution: 'We design bespoke full-stack applications with high-polish UI craft, streaming responses, and robust backend integrations.',
    stages: [
      'Design System & Information Architecture',
      'Next.js 15 & React 19 Client Engineering',
      'Serverless Inference & Streaming Endpoints',
      'Automated CI/CD & Production SLA Deployment',
    ],
    deliverables: [
      'Bespoke, un-templated visual identity and tactile UI',
      'Sub-100ms serverless endpoints with streaming outputs',
      'Fully responsive accessible design (WCAG AA compliant)',
      'Clean TypeScript codebase ready for your in-house team',
    ],
    cta: 'Build Custom AI App',
    href: '/contact?service=custom-web-apps',
  },
  {
    id: 'business-automation',
    title: 'Business Automation Pipelines',
    category: 'Enterprise Automation',
    tagline: 'Automate manual data entry, ERP ingestion, compliance auditing, and multi-app synchronization with fault-tolerant background workers.',
    problem: 'Operations teams waste dozens of hours every week copying data across ERPs, spreadsheets, and emails.',
    solution: 'We engineer deterministic background worker queues that parse unstructured documents, validate business rules, and sync downstream automatically.',
    stages: [
      'Workflow Process Mapping & Data Contract',
      'Multi-Format Document Parsing Engine',
      'Business Logic Validation & Rule Checks',
      'Automated ERP & Webhook Synchronization',
    ],
    deliverables: [
      'Fault-tolerant worker queues with automatic retry logic',
      'Audit log trail for compliance and human-in-the-loop review',
      '99.9% uptime guarantees with real-time alerting',
      'Dedicated integration support and team walkthrough',
    ],
    cta: 'Automate Business Workflows',
    href: '/contact?service=business-automation',
  },
];

export function ServicesDirectory() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const practice = (PRACTICES[selectedIdx] || PRACTICES[0]) as Practice;

  return (
    <div className="w-full text-left font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Navigation Rail: Service Practice Index */}
        <div className="lg:col-span-5 space-y-2">
          <div className="space-y-2">
            {PRACTICES.map((p, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    'w-full text-left p-5 rounded-2xl transition-all duration-200 flex items-start justify-between gap-4 group',
                    isSelected
                      ? 'bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-md ring-1 ring-accent-500/20'
                      : 'hover:bg-canvas-paper/50 border border-transparent'
                  )}
                >
                  <div className="space-y-1.5 flex-1">
                    <span
                      className={cn(
                        'text-xs font-mono font-semibold uppercase tracking-wider block',
                        isSelected ? 'text-accent-500' : 'text-ink-secondary'
                      )}
                    >
                      {p.category}
                    </span>
                    <h3
                      className={cn(
                        'font-display text-xl sm:text-2xl font-normal transition-colors',
                        isSelected
                          ? 'text-ink-primary font-medium'
                          : 'text-ink-secondary group-hover:text-ink-primary'
                      )}
                    >
                      {p.title}
                    </h3>
                  </div>

                  <ArrowRight
                    className={cn(
                      'w-5 h-5 mt-2 transition-all',
                      isSelected
                        ? 'text-accent-500 opacity-100 translate-x-0'
                        : 'text-ink-secondary opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Stage: Dynamic Architecture Blueprint */}
        <div className="lg:col-span-7 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-6 sm:p-8 md:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-[rgba(13,37,61,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                {practice.category}
              </span>
              <span className="text-xs font-medium text-accent-secondary">
                Production SLA Ready
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary font-normal leading-tight">
              {practice.title}
            </h2>

            <p className="text-base text-ink-body leading-relaxed">
              {practice.tagline}
            </p>
          </div>

          {/* Execution Topology Diagram */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold text-accent-500 uppercase tracking-wider">
              Execution Topology
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {practice.stages.map((stage, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)] flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-500 shrink-0" />
                  <span className="text-xs font-medium text-ink-primary leading-snug">
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope & Deliverables */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono font-semibold text-accent-500 uppercase tracking-wider">
              Scope & Verified Deliverables
            </h4>

            <div className="space-y-2.5">
              {practice.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-xs text-ink-body">
                  <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-[rgba(13,37,61,0.08)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-xs text-ink-secondary">
              Deployment Timeline: <span className="font-semibold text-ink-primary">3–5 Days to MVP</span>
            </div>

            <Link href={practice.href} className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto justify-center group">
                <span>{practice.cta}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
