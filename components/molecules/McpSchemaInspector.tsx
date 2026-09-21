'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

interface ToolSchema {
  id: string;
  name: string;
  description: string;
  method: 'POST' | 'MCP_TOOL';
  endpoint: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  exampleCurl: string;
  exampleTs: string;
  exampleResponse: Record<string, unknown>;
}

const SCHEMAS: ToolSchema[] = [
  {
    id: 'resume-screener',
    name: 'screen_candidates',
    description: 'Deterministic resume parser and vector match scoring engine.',
    method: 'MCP_TOOL',
    endpoint: '/v1/mcp/resume/screen',
    parameters: [
      {
        name: 'document_base64',
        type: 'string',
        required: true,
        description: 'Raw PDF or DOCX candidate payload',
      },
      {
        name: 'target_role',
        type: 'string',
        required: true,
        description: 'Role spec or job description requirements',
      },
      {
        name: 'threshold',
        type: 'number',
        required: false,
        description: 'Minimum match confidence cut-off (0.0 - 1.0)',
      },
    ],
    exampleCurl: `curl -X POST https://api.norai.in/v1/mcp/resume/screen \\
  -H "Authorization: Bearer norai_live_key_..." \\
  -H "Content-Type: application/json" \\
  -d '{"document_base64": "JVBERi0xLjQK...", "target_role": "Backend Engineer", "threshold": 0.85}'`,
    exampleTs: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const result = await client.mcp.screenCandidates({
  documentBase64: fileBuffer.toString('base64'),
  targetRole: 'Backend Engineer',
  threshold: 0.85,
});

console.log(result.topCandidates);`,
    exampleResponse: {
      status: 'SUCCESS',
      latency_ms: 248,
      candidates_evaluated: 1,
      match_score: 0.962,
      recommendation: 'SHORTLIST_FOR_ROUND_1',
      skills_verified: ['FastAPI', 'PostgreSQL', 'vLLM', 'Distributed Queues'],
      memory_state: 'RAM_PURGED_ZERO_LOGGED',
    },
  },
  {
    id: 'course-notes',
    name: 'extract_lecture_notes',
    description: 'Audio/video multi-modal lecture intelligence and LaTeX formula extractor.',
    method: 'MCP_TOOL',
    endpoint: '/v1/mcp/notes/extract',
    parameters: [
      {
        name: 'media_url',
        type: 'string',
        required: true,
        description: 'Direct audio stream or video lecture URL',
      },
      {
        name: 'extract_math',
        type: 'boolean',
        required: false,
        description: 'Extract and render KaTeX/LaTeX syntax',
      },
      {
        name: 'generate_quiz',
        type: 'boolean',
        required: false,
        description: 'Generate Socratic study flashcards',
      },
    ],
    exampleCurl: `curl -X POST https://api.norai.in/v1/mcp/notes/extract \\
  -H "Authorization: Bearer norai_live_key_..." \\
  -H "Content-Type: application/json" \\
  -d '{"media_url": "https://cdn.norai.in/lectures/cs229.mp4", "extract_math": true}'`,
    exampleTs: `const notes = await client.mcp.extractLectureNotes({
  mediaUrl: 'https://cdn.norai.in/lectures/cs229.mp4',
  extractMath: true,
  generateQuiz: true,
});`,
    exampleResponse: {
      status: 'SUCCESS',
      latency_ms: 310,
      timestamp_checkpoints: 8,
      extracted_formulas: ['\\mathcal{L}_{\\text{triplet}} = \\max(0, D(a,p) - D(a,n) + \\alpha)'],
      quiz_cards_generated: 4,
    },
  },
  {
    id: 'chat-digest',
    name: 'synthesize_community_chat',
    description: 'Deduplicated topic cluster and action item intelligence for Discord/Slack.',
    method: 'MCP_TOOL',
    endpoint: '/v1/mcp/chat/digest',
    parameters: [
      {
        name: 'messages_json',
        type: 'array',
        required: true,
        description: 'Batch of raw messages with timestamps',
      },
      {
        name: 'sentiment_radar',
        type: 'boolean',
        required: false,
        description: 'Extract community sentiment distribution',
      },
    ],
    exampleCurl: `curl -X POST https://api.norai.in/v1/mcp/chat/digest \\
  -H "Authorization: Bearer norai_live_key_..." \\
  -H "Content-Type: application/json" \\
  -d '{"messages_json": [...], "sentiment_radar": true}'`,
    exampleTs: `const digest = await client.mcp.synthesizeChat({
  messagesJson: rawMessages,
  sentimentRadar: true,
});`,
    exampleResponse: {
      status: 'SUCCESS',
      topics_identified: 3,
      action_items_assigned: 4,
      sentiment_score: { positive: 0.88, neutral: 0.1, negative: 0.02 },
    },
  },
];

export function McpSchemaInspector({ className }: { className?: string }) {
  const [selectedSchema, setSelectedSchema] = useState<ToolSchema>(SCHEMAS[0] as ToolSchema);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'typescript' | 'response'>('curl');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy =
      activeCodeTab === 'curl'
        ? selectedSchema.exampleCurl
        : activeCodeTab === 'typescript'
          ? selectedSchema.exampleTs
          : JSON.stringify(selectedSchema.exampleResponse, null, 2);

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-border-strong bg-surface-panel overflow-hidden shadow-md text-left',
        className,
      )}
    >
      {/* Top Header */}
      <div className="bg-surface-panel-subtle/90 px-6 py-4 border-b border-border-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-primary text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm">
            MCP
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
              Model Context Protocol (MCP) Standard
            </span>
            <h4 className="text-sm font-bold text-text-primary font-mono">
              Tool Schema &amp; Strict Zod Type Contract
            </h4>
          </div>
        </div>

        {/* Tool Selectors */}
        <div className="flex items-center gap-1.5 bg-surface-canvas p-1 rounded-xl border border-border-subtle">
          {SCHEMAS.map((schema) => {
            const isSelected = selectedSchema.id === schema.id;
            return (
              <button
                key={schema.id}
                type="button"
                onClick={() => setSelectedSchema(schema)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer',
                  isSelected
                    ? 'bg-accent-primary text-white font-semibold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
                )}
              >
                {schema.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout (Surface C Docs Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
        {/* Left Column: Parameter Schema Description */}
        <div className="lg:col-span-6 p-6 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-accent-subtle text-accent-primary text-[11px] font-mono font-semibold">
                {selectedSchema.method}
              </span>
              <code className="text-xs font-mono text-text-primary font-semibold">
                {selectedSchema.endpoint}
              </code>
            </div>
            <p className="text-xs text-text-secondary pt-1 leading-relaxed">
              {selectedSchema.description}
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-mono font-semibold text-text-primary uppercase tracking-wider">
              Input Parameters (Strict Zod Schema)
            </h5>
            <div className="space-y-2">
              {selectedSchema.parameters.map((param, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3 rounded-lg bg-surface-canvas border border-border-subtle text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-text-primary">{param.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-accent-primary bg-accent-50 px-1.5 py-0.5 rounded border border-accent-primary/20">
                        {param.type}
                      </span>
                      {param.required ? (
                        <span className="text-[10px] font-mono text-status-red bg-status-error-bg px-1.5 py-0.5 rounded">
                          required
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-text-muted bg-surface-panel-subtle px-1.5 py-0.5 rounded">
                          optional
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    {param.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code Generator & Live Payload Tabs */}
        <div className="lg:col-span-6 flex flex-col bg-surface-panel-subtle/60">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-surface-canvas/50">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveCodeTab('curl')}
                className={cn(
                  'px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer',
                  activeCodeTab === 'curl'
                    ? 'bg-surface-panel text-accent-primary font-semibold shadow-xs border border-border-subtle'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                cURL
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab('typescript')}
                className={cn(
                  'px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer',
                  activeCodeTab === 'typescript'
                    ? 'bg-surface-panel text-accent-primary font-semibold shadow-xs border border-border-subtle'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                TypeScript SDK
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab('response')}
                className={cn(
                  'px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer',
                  activeCodeTab === 'response'
                    ? 'bg-surface-panel text-accent-primary font-semibold shadow-xs border border-border-subtle'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                JSON Response (200)
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-mono text-text-secondary hover:text-text-primary bg-surface-panel px-2.5 py-1 rounded border border-border-subtle transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 flex-1 font-mono text-xs overflow-x-auto bg-surface-panel-subtle/90">
            <pre className="text-text-primary leading-relaxed">
              {activeCodeTab === 'curl' && selectedSchema.exampleCurl}
              {activeCodeTab === 'typescript' && selectedSchema.exampleTs}
              {activeCodeTab === 'response' &&
                JSON.stringify(selectedSchema.exampleResponse, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
