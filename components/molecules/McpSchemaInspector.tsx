'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

interface ToolSchema {
  id: string;
  name: string;
  description: string;
  method: 'POST' | 'MCP_TOOL';
  contract: string;
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
    description:
      'Illustrative tool contract: scores a batch of resume text against a target role and returns ranked, per-skill evidence. Shaped like the pipelines we ship, not a live endpoint.',
    method: 'MCP_TOOL',
    contract: 'tools/call → screen_candidates',
    parameters: [
      {
        name: 'jobTitle',
        type: 'string',
        required: true,
        description: 'Target role the batch is evaluated against',
      },
      {
        name: 'resumesText',
        type: 'string',
        required: true,
        description: 'Candidate resume text supplied by the calling agent',
      },
      {
        name: 'minThreshold',
        type: 'number',
        required: false,
        description: 'Shortlist cut-off from 0 to 100, defaults to 75',
      },
    ],
    exampleCurl: `# Your MCP server runs in YOUR cloud or VPC, not on NorAI.
curl -X POST "$MCP_SERVER_URL/mcp" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "screen_candidates",
      "arguments": {
        "jobTitle": "Backend Engineer",
        "resumesText": "...",
        "minThreshold": 75
      }
    }
  }'`,
    exampleTs: `// JSON-RPC 2.0 tools/call frame sent to the engagement's MCP server.
{
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'screen_candidates',
    arguments: {
      jobTitle: 'Backend Engineer',
      resumesText: candidateTextFromAgent,
      minThreshold: 75,
    },
  },
}`,
    exampleResponse: {
      jsonrpc: '2.0',
      id: 1,
      result: {
        structuredContent: {
          jobTitle: '<string>',
          totalEvaluated: '<integer>',
          shortlistedCount: '<integer>',
          candidates: [
            {
              id: '<cand-01>',
              name: '<string>',
              compositeScore: '<number, 0-100>',
              status: '<Top Match | Shortlisted | Review Queue | Rejected>',
              skillVectors: [{ label: '<string>', matchScore: '<number>', evidence: '<string>' }],
            },
          ],
        },
        isError: false,
      },
    },
  },
  {
    id: 'course-notes',
    name: 'extract_lecture_notes',
    description:
      'Illustrative tool contract: distils a lecture transcript into chapters, extracted formulas, flashcards, and a quiz. Shaped like the pipelines we ship, not a live endpoint.',
    method: 'MCP_TOOL',
    contract: 'tools/call → extract_lecture_notes',
    parameters: [
      {
        name: 'lectureTitle',
        type: 'string',
        required: true,
        description: 'Lecture or session title',
      },
      {
        name: 'transcriptText',
        type: 'string',
        required: true,
        description: 'Transcript supplied by the calling agent',
      },
      {
        name: 'focusMode',
        type: 'string',
        required: false,
        description: 'Comprehensive Study Guide | Formulas & Axioms | Exam Cram & Quizzes',
      },
    ],
    exampleCurl: `# Your MCP server runs in YOUR cloud or VPC, not on NorAI.
curl -X POST "$MCP_SERVER_URL/mcp" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "extract_lecture_notes",
      "arguments": {
        "lectureTitle": "Lecture 4",
        "transcriptText": "...",
        "focusMode": "Formulas & Axioms"
      }
    }
  }'`,
    exampleTs: `// JSON-RPC 2.0 tools/call frame sent to the engagement's MCP server.
{
  jsonrpc: '2.0',
  id: 2,
  method: 'tools/call',
  params: {
    name: 'extract_lecture_notes',
    arguments: {
      lectureTitle: 'Lecture 4',
      transcriptText: transcriptFromAgent,
      focusMode: 'Formulas & Axioms',
    },
  },
}`,
    exampleResponse: {
      jsonrpc: '2.0',
      id: 2,
      result: {
        structuredContent: {
          lectureTitle: '<string>',
          chapters: [
            {
              id: '<ch-01>',
              timestamp: '<00:00 - 14:30>',
              keyTakeaways: ['<string>'],
              formulasOrCode: [{ label: '<string>', formulaOrSnippet: '<LaTeX source>' }],
            },
          ],
          flashcards: [{ category: '<string>', difficulty: '<Foundational|Intermediate|Advanced>' }],
          quiz: [{ options: ['<string>'], correctAnswerIndex: '<integer>' }],
        },
        isError: false,
      },
    },
  },
  {
    id: 'chat-digest',
    name: 'synthesize_community_chat',
    description:
      'Illustrative tool contract: clusters a raw chat export, triages bugs and requests, and drafts a newsletter. Shaped like the pipelines we ship, not a live endpoint.',
    method: 'MCP_TOOL',
    contract: 'tools/call → synthesize_community_chat',
    parameters: [
      {
        name: 'communityName',
        type: 'string',
        required: true,
        description: 'Community or workspace the log came from',
      },
      {
        name: 'chatLogText',
        type: 'string',
        required: true,
        description: 'Raw export supplied by the calling agent',
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: 'Discord | Telegram | Slack, defaults to Discord',
      },
    ],
    exampleCurl: `# Your MCP server runs in YOUR cloud or VPC, not on NorAI.
curl -X POST "$MCP_SERVER_URL/mcp" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "synthesize_community_chat",
      "arguments": {
        "communityName": "Engineering",
        "chatLogText": "...",
        "platform": "Discord"
      }
    }
  }'`,
    exampleTs: `// JSON-RPC 2.0 tools/call frame sent to the engagement's MCP server.
{
  jsonrpc: '2.0',
  id: 3,
  method: 'tools/call',
  params: {
    name: 'synthesize_community_chat',
    arguments: {
      communityName: 'Engineering',
      chatLogText: rawExportFromAgent,
      platform: 'Discord',
    },
  },
}`,
    exampleResponse: {
      jsonrpc: '2.0',
      id: 3,
      result: {
        structuredContent: {
          communityName: '<string>',
          timeframeCovered: '<Last 24 Hours | Past 7 Days>',
          topicClusters: [{ id: '<topic-01>', sentiment: '<Positive|Neutral|Mixed|Negative>' }],
          actionItemsAndBugs: [
            {
              type: '<Bug Report | Feature Request | Question | Community Action>',
              priority: '<Urgent | High | Medium | Low>',
            },
          ],
        },
        isError: false,
      },
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
          <div className="w-8 h-8 rounded-lg bg-accent-primary on-accent-fill flex items-center justify-center font-mono text-xs font-bold shadow-sm">
            MCP
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
              Illustrative Contract · Built Per Engagement
            </span>
            <h3 className="text-sm font-bold text-text-primary font-mono">
              Tool Schema &amp; Strict Zod Type Contract
            </h3>
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
                    ? 'bg-accent-primary on-accent-fill font-semibold shadow-xs'
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
                {selectedSchema.contract}
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
                TypeScript Frame
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
                Example Result
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
