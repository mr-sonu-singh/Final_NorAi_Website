'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Reveal } from '@/components/foundation/AnimatedSection';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  ArrowRight,
  Check,
  Copy,
  ShieldCheck,
  Cpu,
  Lock,
  Server,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CodeViewFormat = 'sdk' | 'zod' | 'jsonrpc';

interface McpTool {
  id: string;
  name: string;
  category: string;
  tagline: string;
  endpoint: string;
  filePath: string;
  codeSnippet: string;
  zodSchema: string;
  jsonRpcWire: string;
}

const MCP_TOOLS: McpTool[] = [
  {
    id: 'resume',
    name: 'screen_candidates',
    category: 'Candidate Evaluation',
    tagline: 'Deterministic resume vector scoring and weighted JSON scorecard extraction',
    endpoint: 'POST /v1/mcp/resume/screen',
    filePath: 'packages/mcp/tools/candidate-screener.ts',
    codeSnippet: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

// Deterministic candidate evaluation with strict ATS schema output
const result = await client.mcp.screenCandidates({
  documentBase64: resumeBuffer.toString('base64'),
  targetRole: 'Staff Infrastructure Engineer',
  scoringWeights: { experience: 0.4, technicalFit: 0.4, leadership: 0.2 },
  threshold: 0.82,
});

console.log(\`Verified Match: \${result.topMatch.score}% | Latency: \${result.telemetry.parseLatencyMs}ms\`);`,
    zodSchema: `import { z } from 'zod';

export const ScreenCandidatesSchema = z.object({
  document_base64: z.string().min(1).describe('Base64 encoded PDF/DOCX candidate file'),
  target_role: z.string().min(3).describe('Canonical job description criteria'),
  scoring_weights: z.object({
    experience: z.number().min(0).max(1).default(0.4),
    technical_fit: z.number().min(0).max(1).default(0.4),
    leadership: z.number().min(0).max(1).default(0.2),
  }).optional(),
  threshold: z.number().min(0).max(1).default(0.82),
});

export type ScreenCandidatesInput = z.infer<typeof ScreenCandidatesSchema>;`,
    jsonRpcWire: `{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "screen_candidates",
    "arguments": {
      "target_role": "Staff Infrastructure Engineer",
      "threshold": 0.82,
      "scoring_weights": {
        "experience": 0.4,
        "technical_fit": 0.4,
        "leadership": 0.2
      },
      "document_base64": "JVBERi0xLjQKJ..."
    }
  },
  "id": "req-mcp-019a-9811"
}`,
  },
  {
    id: 'notes',
    name: 'extract_lecture_notes',
    category: 'Multi-Modal Speech',
    tagline: 'Multi-modal audio/video intelligence with verbatim LaTeX formula extraction',
    endpoint: 'POST /v1/mcp/notes/extract',
    filePath: 'packages/mcp/tools/lecture-extractor.ts',
    codeSnippet: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const notes = await client.mcp.extractLectureNotes({
  mediaUrl: 'https://cdn.internal.org/lectures/quantum-circuits.mp4',
  extractMath: true,
  mathDialect: 'katex',
  generateQuiz: true,
});

console.log(\`Formulas: \${notes.extractedFormulas.length} | Concepts: \${notes.glossary.length}\`);`,
    zodSchema: `import { z } from 'zod';

export const ExtractNotesSchema = z.object({
  media_url: z.string().url().describe('Direct audio stream or video lecture URL'),
  extract_math: z.boolean().default(true).describe('Preserve verbatim LaTeX/KaTeX formulas'),
  math_dialect: z.enum(['katex', 'mathjax', 'raw_tex']).default('katex'),
  generate_quiz: z.boolean().default(false).describe('Synthesize conceptual recall questions'),
});

export type ExtractNotesInput = z.infer<typeof ExtractNotesSchema>;`,
    jsonRpcWire: `{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "extract_lecture_notes",
    "arguments": {
      "media_url": "https://cdn.internal.org/lectures/quantum-circuits.mp4",
      "extract_math": true,
      "math_dialect": "katex",
      "generate_quiz": true
    }
  },
  "id": "req-mcp-028f-4412"
}`,
  },
  {
    id: 'chat',
    name: 'synthesize_community_chat',
    category: 'Stream Analytics',
    tagline: 'High-throughput topic clustering, spam deduplication, and sentiment radar',
    endpoint: 'POST /v1/mcp/chat/digest',
    filePath: 'packages/mcp/tools/community-digest.ts',
    codeSnippet: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const digest = await client.mcp.synthesizeChat({
  messagesJson: rawDiscordBuffer,
  deduplicateNoise: true,
  sentimentRadar: true,
});

console.log(\`Triage Tasks: \${digest.actionItems.length} | Sentiment: \${digest.sentimentIndex}\`);`,
    zodSchema: `import { z } from 'zod';

export const SynthesizeChatSchema = z.object({
  messages_json: z.array(z.record(z.unknown())).describe('Raw unformatted chat payload batch'),
  deduplicate_noise: z.boolean().default(true).describe('Filter bot greetings & emoji reactions'),
  sentiment_radar: z.boolean().default(true).describe('Generate topic-level sentiment matrix'),
});

export type SynthesizeChatInput = z.infer<typeof SynthesizeChatSchema>;`,
    jsonRpcWire: `{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "synthesize_community_chat",
    "arguments": {
      "deduplicate_noise": true,
      "sentiment_radar": true,
      "messages_json": [
        { "user": "eng_lead", "text": "Node pool 3 memory pressure spike..." },
        { "user": "sre_alex", "text": "Confirmed. Applied HPA target adjustment." }
      ]
    }
  },
  "id": "req-mcp-043b-7782"
}`,
  },
  {
    id: 'rag',
    name: 'query_private_rag',
    category: 'Vector Retrieval',
    tagline: 'Zero-egress hybrid dense/sparse vector retrieval across isolated VPC indices',
    endpoint: 'POST /v1/mcp/rag/query',
    filePath: 'packages/mcp/tools/private-vector-rag.ts',
    codeSnippet: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const response = await client.mcp.queryPrivateRag({
  indexName: 'corp-regulatory-guidelines-2026',
  query: 'Threshold requirements for cross-border data transfer under DPDP Act',
  topK: 5,
  rerank: true,
});

console.log(\`Top Vector Score: \${response.matches[0].similarity} | Citations: \${response.citations.length}\`);`,
    zodSchema: `import { z } from 'zod';

export const QueryPrivateRagSchema = z.object({
  index_name: z.string().min(1).describe('Isolated private VPC vector collection identifier'),
  query: z.string().min(3).describe('Natural language prompt or technical retrieval query'),
  top_k: z.number().int().min(1).max(50).default(5),
  rerank: z.boolean().default(true).describe('Cross-encoder reranking inside GPU VRAM'),
});

export type QueryPrivateRagInput = z.infer<typeof QueryPrivateRagSchema>;`,
    jsonRpcWire: `{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "query_private_rag",
    "arguments": {
      "index_name": "corp-regulatory-guidelines-2026",
      "query": "Threshold requirements for cross-border data transfer under DPDP Act",
      "top_k": 5,
      "rerank": true
    }
  },
  "id": "req-mcp-091e-3329"
}`,
  },
];

const DEPLOYMENT_TOPOLOGIES = [
  {
    id: 'vpc',
    title: 'Customer Private VPC',
    badge: 'Zero Public Egress',
    description: 'Model inference operates entirely within your AWS, GCP, or Azure perimeter via dedicated PrivateLink peering. No public gateway.',
    specs: [
      { label: 'Network Peering', val: 'AWS PrivateLink / Azure ExpressRoute' },
      { label: 'Inference SLA', val: '< 250ms P95 Cold-Start' },
      { label: 'Data Egress', val: '0 Bytes to Public Internet' },
      { label: 'Key Custody', val: 'Customer-Managed KMS (CMK)' },
    ],
  },
  {
    id: 'onprem',
    title: 'Air-Gapped Bare Metal',
    badge: 'FIPS 140-2 Compliant',
    description: 'Containerized Kubernetes release deployed directly on physical on-premises servers. Completely severed from external telemetry.',
    specs: [
      { label: 'Runtime Target', val: 'Air-gapped Kubernetes / Docker' },
      { label: 'Hardware Spec', val: 'NVIDIA H100 / A100 / L40S' },
      { label: 'Telemetry Policy', val: 'Strict Zero Phoning-Home' },
      { label: 'Compliance Fit', val: 'Defense, BFSI, Healthcare' },
    ],
  },
  {
    id: 'dedicated',
    title: 'Dedicated Isolated Tenant',
    badge: 'Instant Provisioning',
    description: 'Single-tenant database and dedicated vLLM GPU nodes managed by NorAI with custom token rate limits and 99.99% uptime SLA.',
    specs: [
      { label: 'Provisioning Speed', val: '< 48 Hours to Production' },
      { label: 'Concurrency SLA', val: 'Up to 50,000 req/min' },
      { label: 'Isolation Level', val: 'Single-Tenant Physical Compute' },
      { label: 'Direct Support', val: '24/7 Dedicated Slack Bridge' },
    ],
  },
];

export function EnterpriseMcpDiptych() {
  const [selectedTool, setSelectedTool] = useState<McpTool>(MCP_TOOLS[0] as McpTool);
  const [activeFormat, setActiveFormat] = useState<CodeViewFormat>('sdk');
  const [copied, setCopied] = useState(false);

  const getCodeContent = () => {
    switch (activeFormat) {
      case 'sdk':
        return selectedTool.codeSnippet;
      case 'zod':
        return selectedTool.zodSchema;
      case 'jsonrpc':
        return selectedTool.jsonRpcWire;
      default:
        return selectedTool.codeSnippet;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="enterprise-console"
      aria-label="Sovereign Enterprise Infrastructure and Model Context Protocol Specifications"
      className="py-20 md:py-28 bg-surface-canvas border-b border-border-subtle relative overflow-hidden"
    >
      <Container size="default" className="relative z-10">
        {/* =====================================================================
            1. SECTION HEADER: EDITORIAL CONTRAST & TELEMETRY LEDGER
            ===================================================================== */}
        <Reveal delay={0} y={20}>
          <div className="max-w-3xl space-y-4 text-left mb-12">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Sovereign Infrastructure &amp; Agent Protocols
            </p>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-[1.08] tracking-tight">
              Enterprise VPC enclaves &amp; <br />
              <span className="font-medium text-text-primary">typed MCP agent protocols.</span>
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans max-w-2xl text-pretty">
              Deploy air-gapped GPU clusters directly inside your private security perimeter with zero network egress, or wire strictly typed Model Context Protocol (MCP) endpoints into Claude, Cursor, and autonomous agent loops.
            </p>
          </div>

          {/* Quick Telemetry Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-12 mb-12 border-b border-border-subtle">
            <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
                <span>DATA EGRESS</span>
              </div>
              <p className="text-lg sm:text-xl font-mono font-bold text-text-primary">0 Bytes</p>
              <p className="text-[11px] text-text-secondary">Air-gapped VRAM isolation</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                <Cpu className="w-3.5 h-3.5 text-accent-primary" />
                <span>P95 COLD-START</span>
              </div>
              <p className="text-lg sm:text-xl font-mono font-bold text-text-primary">&lt; 320ms</p>
              <p className="text-[11px] text-text-secondary">Dedicated vLLM instances</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                <Terminal className="w-3.5 h-3.5 text-[#1F6C9F]" />
                <span>SCHEMA INTEGRITY</span>
              </div>
              <p className="text-lg sm:text-xl font-mono font-bold text-text-primary">100% Typed</p>
              <p className="text-[11px] text-text-secondary">Runtime Zod enforcement</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                <Server className="w-3.5 h-3.5 text-[#956400]" />
                <span>NETWORKING</span>
              </div>
              <p className="text-lg sm:text-xl font-mono font-bold text-text-primary">PrivateLink</p>
              <p className="text-[11px] text-text-secondary">Zero public IP allocation</p>
            </div>
          </div>
        </Reveal>

        {/* =====================================================================
            2. HIGH-DENSITY BENTO WORKBENCH (12 COLS)
            Left: Interactive MCP Agent Console (7 cols)
            Right: Sovereign Infrastructure Specs Matrix (5 cols)
            ===================================================================== */}
        <Reveal delay={0.1} y={24}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
            {/* -----------------------------------------------------------------
                BENTO PANEL A: INTERACTIVE MCP AGENT CONSOLE (7 cols)
                ----------------------------------------------------------------- */}
            <div className="lg:col-span-7 rounded-xl border border-border-subtle bg-white text-text-primary shadow-xs overflow-hidden text-left">
              {/* Tool Navigation Bar */}
              <div className="p-4 bg-surface-panel border-b border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-text-primary">MCP Tool Registry</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-panel-subtle text-text-secondary border border-border-subtle text-[10px] font-mono font-medium shrink-0 whitespace-nowrap">
                      v2.4 Spec
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">Select an agent capability to inspect schema contracts</p>
                </div>

                <div className="flex items-center gap-1 bg-surface-canvas p-1 rounded-lg border border-border-subtle flex-wrap">
                  {MCP_TOOLS.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setSelectedTool(tool)}
                      className={cn(
                        'px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer whitespace-nowrap',
                        selectedTool.id === tool.id
                          ? 'bg-white text-text-primary font-semibold shadow-xs'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Context Header */}
              <div className="p-4 sm:p-5 border-b border-border-subtle space-y-2 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-text-primary">
                    tool: {selectedTool.name}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-panel-subtle text-text-secondary border border-border-subtle">
                    {selectedTool.endpoint}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {selectedTool.tagline}
                </p>
              </div>

              {/* Faux-OS Window Chrome for Code */}
              <div className="bg-[#141C2B] text-slate-200">
                {/* Window Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0F172A] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                    </div>
                    <span className="text-slate-400 text-[11px] pl-2 border-l border-white/10 hidden sm:inline">
                      {selectedTool.filePath}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Format Selector */}
                    <div className="flex items-center bg-white/10 rounded p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setActiveFormat('sdk')}
                        className={cn(
                          'px-2 py-0.5 rounded transition-all cursor-pointer',
                          activeFormat === 'sdk' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'
                        )}
                      >
                        SDK
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFormat('zod')}
                        className={cn(
                          'px-2 py-0.5 rounded transition-all cursor-pointer',
                          activeFormat === 'zod' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'
                        )}
                      >
                        Zod Schema
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFormat('jsonrpc')}
                        className={cn(
                          'px-2 py-0.5 rounded transition-all cursor-pointer',
                          activeFormat === 'jsonrpc' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'
                        )}
                      >
                        JSON-RPC
                      </button>
                    </div>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs cursor-pointer active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-sans text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="font-sans text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Body */}
                <div className="p-4 sm:p-5 overflow-x-auto">
                  <pre className="font-mono text-xs leading-relaxed text-emerald-300/95 font-medium">
                    <code>{getCodeContent()}</code>
                  </pre>
                </div>

                {/* Code Terminal Status Strip */}
                <div className="px-4 py-2 bg-[#0F172A]/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Protocol: MCP / stdio &amp; SSE</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="text-amber-300/90 hidden sm:inline">Validation: Zod Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>Claude Desktop / Cursor Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------------------
                BENTO PANEL B: SOVEREIGN INFRASTRUCTURE SPECS (5 cols)
                ----------------------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-4 text-left">
              {/* Card 1: Private Cloud VPC Peering */}
              <div className="p-5 sm:p-6 rounded-xl bg-white border border-border-subtle hover:border-border-strong transition-colors space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Lock className="w-4 h-4 text-text-secondary shrink-0" />
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-text-primary truncate">
                      Air-Gapped Private VPC Peering
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-panel-subtle text-text-secondary border border-border-subtle text-[10px] font-mono font-medium shrink-0 whitespace-nowrap">
                    AWS · GCP · Azure
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Model endpoints accept traffic exclusively through AWS PrivateLink, Azure ExpressRoute, or GCP Cloud Interconnect. No public IP is ever assigned to inference clusters.
                </p>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>mTLS 1.3 Encryption</span>
                  <span className="text-text-primary font-medium">Zero Gateway Ingress</span>
                </div>
              </div>

              {/* Card 2: Dedicated vLLM GPU Clusters */}
              <div className="p-5 sm:p-6 rounded-xl bg-white border border-border-subtle hover:border-border-strong transition-colors space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Cpu className="w-4 h-4 text-text-secondary shrink-0" />
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-text-primary truncate">
                      Dedicated vLLM GPU Enclaves
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-panel-subtle text-text-secondary border border-border-subtle text-[10px] font-mono font-medium shrink-0 whitespace-nowrap">
                    H100 / L40S Non-Contended
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Pinned hardware instances eliminate noisy-neighbor latency jitter. Execute quantized FP8/AWQ weights fine-tuned with custom domain LoRA adapters tailored to your nomenclature.
                </p>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Continuous Batching</span>
                  <span className="text-text-primary font-medium">&lt; 320ms Cold Start</span>
                </div>
              </div>

              {/* Card 3: Ephemeral In-VRAM Firewall */}
              <div className="p-5 sm:p-6 rounded-xl bg-white border border-border-subtle hover:border-border-strong transition-colors space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-text-secondary shrink-0" />
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-text-primary truncate">
                      Ephemeral In-VRAM Firewall
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-panel-subtle text-text-secondary border border-border-subtle text-[10px] font-mono font-medium shrink-0 whitespace-nowrap">
                    0 Bytes Logged
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Payloads and intermediate vector embeddings live strictly inside volatile GPU VRAM and are purged immediately after execution. Zero data is persisted to physical disk.
                </p>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Cryptographic Zero-Fill</span>
                  <span className="text-text-primary font-medium">SOC 2 &amp; DPDP Ready</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =====================================================================
            3. DEPLOYMENT TOPOLOGY COMPARISON MATRIX (3 TIERS)
            ===================================================================== */}
        <Reveal delay={0.15} y={24}>
          <div className="mb-12 text-left">
            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
                Deployment Architectures
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-text-primary font-normal">
                Engineered for strict enterprise compliance.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEPLOYMENT_TOPOLOGIES.map((topo) => (
                <div
                  key={topo.id}
                  className="rounded-xl border border-border-subtle bg-white p-6 space-y-4 hover:border-border-strong transition-all flex flex-col justify-between text-left"
                >
                  <div className="space-y-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-panel-subtle text-text-secondary border border-border-subtle text-[10px] font-mono font-medium shrink-0 whitespace-nowrap">
                        {topo.badge}
                      </span>
                    </div>

                    <h4 className="font-sans font-semibold text-base text-text-primary tracking-tight">
                      {topo.title}
                    </h4>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      {topo.description}
                    </p>
                  </div>

                    <div className="pt-4 border-t border-border-subtle space-y-2 text-xs font-mono">
                      {topo.specs.map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-text-muted">{s.label}:</span>
                          <span className="text-text-primary font-medium">{s.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* =====================================================================
            4. CONVERSION & ARCHITECTURAL DISCOVERY DOCK
            ===================================================================== */}
        <Reveal delay={0.2} y={20}>
          <div className="rounded-xl border border-border-subtle bg-surface-panel p-6 sm:p-8 text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
                Technical Discovery Consultation
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-normal text-text-primary">
                Scope your private enclave architecture.
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Schedule a 30-minute technical evaluation with a Principal Infrastructure Architect. We benchmark your latency requirements, VPC security perimeter, and data volume.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/contact?service=enterprise-vpc">
                <Button
                  size="md"
                  className="w-full sm:w-auto bg-[#141C2B] hover:bg-[#222E42] text-white font-sans text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-xs cursor-pointer transition-all active:scale-98 inline-flex items-center justify-center gap-2"
                >
                  <span>Schedule Architecture Review</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/services">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto border border-border-strong hover:bg-surface-hover text-text-primary font-sans text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg cursor-pointer transition-all"
                >
                  <span>Inspect Services &amp; SLA</span>
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default EnterpriseMcpDiptych;
