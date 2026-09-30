/**
 * NorAI Editorial Blog & Engineering Knowledge Store
 *
 * ============================================================================
 * ARCHITECTURAL ASSESSMENT & CONTENT SCALING ROADMAP
 * ============================================================================
 *
 * Current State:
 * - 9 in-depth, production-grade technical publications.
 * - In-memory typed TypeScript dictionary (`BLOG_POSTS`) for instant compile-time
 *   static page generation via `generateStaticParams`, zero runtime DB overhead,
 *   and guaranteed type safety.
 */

export type BlogDifficulty = 'Foundational' | 'Intermediate' | 'Advanced';

export interface BlogCallout {
  type: 'takeaway' | 'warning' | 'benchmark';
  title: string;
  content: string;
}

export interface BlogCodeSnippet {
  language: string;
  filename?: string;
  code: string;
  output?: string;
}

export interface BlogTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface BlogSection {
  id: string;
  heading?: string;
  paragraphs: string[];
  callout?: BlogCallout;
  codeSnippet?: BlogCodeSnippet;
  table?: BlogTable;
}

export interface BlogRelatedProduct {
  name: string;
  description: string;
  href: string;
  badge: string;
}

export interface BlogPostData {
  slug: string;
  title: string;
  /**
   * Search/OG title, kept short enough that the brand suffix does not push the
   * document title past 60 characters. Falls back to `title` when absent.
   */
  seoTitle?: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  readTime: string;
  difficulty: BlogDifficulty;
  tags: string[];
  sections: BlogSection[];
  relatedProduct?: BlogRelatedProduct;
}

export const BLOG_POSTS: Record<string, BlogPostData> = {
  'ai-agent-orchestration-architecture': {
    slug: 'ai-agent-orchestration-architecture',
    title: 'Architecting Deterministic AI Agent Workflows for Scale',
    seoTitle:
      'Deterministic AI Agent Workflows',
    excerpt:
      'An in-depth analysis of multi-agent state transition machines, structured JSON schema validation, automated self-healing repair loops, and fault-tolerant background execution queues.',
    author: 'Gourav Singh',
    authorRole: 'Founder & AI Systems Architect',
    date: 'January 15, 2026',
    category: 'AI Orchestration',
    readTime: '8 min read',
    difficulty: 'Advanced',
    tags: ['State Machines', 'TypeScript', 'Zod', 'Multi-Agent', 'Orchestration'],
    relatedProduct: {
      name: 'Bespoke Enterprise AI Solutions',
      description:
        'Deploy deterministic, private-VPC agent pipelines with per-stage latency budgets.',
      href: '/services',
      badge: 'Enterprise Architecture',
    },
    sections: [
      {
        id: 'the-problem-with-probabilistic-pipelines',
        heading: 'The Problem with Probabilistic Pipelines',
        paragraphs: [
          'Most enterprise AI pilots fail when transitioning from prototype to production because developers treat Large Language Models as omniscient black-box functions. In reality, LLM outputs are inherently probabilistic and prone to schema drift, token hallucination, and unpredictable response formatting.',
          'When an upstream agent emits slightly malformed markdown or omits a required JSON field, downstream enterprise databases and microservices crash. Building resilient automation requires shifting from loose natural-language prompts to strict, deterministic finite state machines (FSMs) wrapped in runtime schema guardrails.',
        ],
        callout: {
          type: 'warning',
          title: 'The Unstructured Text Antipattern',
          content:
            'Never allow agent nodes in an automation DAG to communicate via freeform natural language strings. All inter-agent telemetry must pass through strictly typed, zero-schema-drift JSON contracts.',
        },
      },
      {
        id: 'finite-state-machine-formalism',
        heading: 'Modeling Agent Workflows as Finite State Machines',
        paragraphs: [
          'At NorAI, we model every multi-agent pipeline as an explicit Directed Acyclic Graph (DAG) of state transitions. Each node represents a single, isolated deterministic task (e.g., INTAKE, VALIDATE, ENRICH, SYNTHESIZE, COMMIT) with typed entry criteria, a per-node timeout budget set from your own latency data, and rollback handlers.',
          'By isolating responsibilities into discrete states, failed transitions can be retried independently without re-executing expensive upstream LLM calls or corrupting system state.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'agent-state-machine.ts',
          code: `import { z } from 'zod';

export const AgentStateSchema = z.enum([
  'IDLE',
  'INGESTING_PAYLOAD',
  'EXTRACTING_ENTITIES',
  'SCHEMA_VALIDATION',
  'HUMAN_VERIFICATION',
  'COMMITTED',
  'FAILED_RETRYABLE',
]);

export interface StateTransitionContext<TInput, TOutput> {
  taskId: string;
  currentState: z.infer<typeof AgentStateSchema>;
  retryCount: number;
  maxRetries: number;
  payload: TInput;
  intermediateResult?: Partial<TOutput>;
  telemetry: {
    startTimeMs: number;
    stepDurations: Record<string, number>;
  };
}`,
          output: 'State machine initialized with strict transition contracts.',
        },
      },
      {
        id: 'automated-schema-repair-loops',
        heading: 'Automated Schema Self-Healing & Repair Loops',
        paragraphs: [
          'When an LLM generates a payload that violates a Zod schema (such as a missing property or wrong type), the orchestrator intercepts the error before it escapes the node boundary. Instead of discarding the run, the system enters a self-healing loop.',
          'The repair loop sends the exact Zod issue array back to the model as a targeted correction prompt, instructing it to fix only the violated fields.',
          'How well that works is not a property of the technique, it is a property of your schema, your model, and your prompt. So do not take a published recovery rate from anyone, including us. Instrument it: log every validation failure with its issue array, replay the loop, and report two numbers for your own corpus, the first-retry recovery rate and the latency the retry adds. Those two figures are the ones that belong in your design doc.',
        ],
        table: {
          headers: ['Pipeline Strategy', 'Raw Error Rate', 'First-Retry Recovery', 'Added Latency'],
          rows: [
            ['Naive Prompting (Unstructured)', 'measure', 'none: no repair path exists', 'measure'],
            ['Provider JSON Mode', 'measure', 'measure', 'measure'],
            ['Zod DAG + Targeted Repair Loop', 'measure', 'measure', 'measure'],
          ],
          caption:
            'Illustrative measurement structure, not measured results. We have not run this benchmark, so the cells are deliberately empty. The win comes from the mechanism, a narrow correction prompt against a machine-checkable contract, not from a number lifted off somebody else traffic.',
        },
        callout: {
          type: 'takeaway',
          title: 'Key Architecture Insight',
          content:
            'Schema repair prompts must include both the invalid raw JSON and the exact path of the failing Zod error. Do not ask the model to regenerate the entire payload from scratch.',
        },
      },
      {
        id: 'production-orchestrator-implementation',
        heading: 'Production Orchestrator Implementation',
        paragraphs: [
          'Below is a concrete implementation of an enterprise task orchestrator executing a candidate qualification scoring node with exponential backoff and structured output enforcement.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'execute-task.ts',
          code: `import { AgentOrchestrator, SchemaValidator } from '@norai/agent-core';
import { ResumeScoringSchema } from '@/lib/schemas/resume';

const orchestrator = new AgentOrchestrator({
  timeoutMs: 800,
  maxRetries: 2,
  backoffMultiplier: 1.5,
});

export async function processCandidateIntake(rawText: string) {
  const result = await orchestrator.executeTask({
    task: 'SHORTLIST_RESUME',
    payload: rawText,
    schema: ResumeScoringSchema,
    onStepComplete: (step, durationMs) => {
      console.log(\`[Orchestrator] Step \${step} completed in \${durationMs}ms\`);
    },
  });

  if (!result.success) {
    throw new Error(\`Pipeline failed: \${result.errorDetails}\`);
  }

  return result.data;
}`,
        },
      },
    ],
  },

  'rag-vector-search-best-practices': {
    slug: 'rag-vector-search-best-practices',
    title: 'Best Practices for Hybrid Vector Search & RAG Retrieval',
    seoTitle:
      'Hybrid Vector Search & RAG',
    excerpt:
      'Key strategies for document chunking, hybrid keyword-dense embedding indexing, Reciprocal Rank Fusion (RRF), and grounded context validation in enterprise knowledge search.',
    author: 'Gourav Singh',
    authorRole: 'Founder & AI Systems Architect',
    date: 'January 04, 2026',
    category: 'Knowledge Retrieval',
    readTime: '9 min read',
    difficulty: 'Advanced',
    tags: ['RAG', 'Vector Search', 'Embeddings', 'BM25', 'Milvus', 'Qdrant'],
    relatedProduct: {
      name: 'Enterprise Knowledge Hub & RAG',
      description:
        'Schema-enforced document intelligence pipelines for proprietary enterprise data.',
      href: '/services',
      badge: 'High-Throughput RAG',
    },
    sections: [
      {
        id: 'the-limits-of-naive-vector-retrieval',
        heading: 'The Limits of Naive Vector Retrieval',
        paragraphs: [
          'Retrieval-Augmented Generation (RAG) is commonly implemented by chunking documents into arbitrary 500-character blocks, computing dense vector embeddings (e.g. OpenAI text-embedding-3 or BGE-M3), and querying a vector index via cosine similarity.',
          'In production enterprise systems, this naive architecture suffers from three fatal weaknesses: loss of document hierarchy, vulnerability to specific keyword/SKU queries, and poor ranking of dense technical tables. Solving this requires a hybrid multi-stage retrieval architecture.',
        ],
        callout: {
          type: 'warning',
          title: 'The Semantic Blindspot',
          content:
            'Dense embeddings excel at conceptual similarity (e.g., "vacation policy" ≈ "annual leave"), but struggle with exact alphanumeric strings like part numbers ("A-7809-X") or financial line items.',
        },
      },
      {
        id: 'heading-aware-document-chunking',
        heading: 'Heading-Aware & Structure-Preserving Chunking',
        paragraphs: [
          'Rather than slicing text by arbitrary character or token boundaries, chunking must be semantic and document-aware. In technical documentation and enterprise manuals, every chunk must inherit its parent section hierarchy (e.g., `Document Title > Chapter 3 > Subsection B`).',
          'Prepending the breadcrumb hierarchy to the chunk content before embedding gives the vector both the local detail and the surrounding document context, instead of an orphaned sentence.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'chunking-pipeline.ts',
          code: `interface StructuredChunk {
  chunkId: string;
  hierarchy: string[]; // e.g. ["HR Manual", "Health Benefits", "Dental Coverage"]
  content: string;
  tokenCount: number;
  metadata: {
    pageNumber: number;
    sourceDocument: string;
    sectionHash: string;
  };
}

export function buildSemanticContextString(chunk: StructuredChunk): string {
  const contextHeader = chunk.hierarchy.join(' > ');
  return \`[Context: \${contextHeader}]\n\${chunk.content}\`;
}`,
        },
      },
      {
        id: 'hybrid-retrieval-and-reciprocal-rank-fusion',
        heading: 'Hybrid Retrieval & Reciprocal Rank Fusion (RRF)',
        paragraphs: [
          'To achieve both semantic comprehension and exact-match precision, NorAI employs hybrid search combining sparse BM25 keyword matching with dense vector similarity.',
          'The individual score distributions from dense vector search and sparse BM25 cannot be directly summed because their scales differ. We normalize and merge the ranked candidate lists using Reciprocal Rank Fusion (RRF), where the constant k=60 is the value from the original RRF paper (Cormack et al., 2009) and is what stops top-rank skewing:',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'rrf-ranker.ts',
          code: `export function reciprocalRankFusion(
  denseRankings: string[],
  sparseRankings: string[],
  k: number = 60
): Map<string, number> {
  const fusedScores = new Map<string, number>();

  const processList = (list: string[]) => {
    list.forEach((docId, rank) => {
      const currentScore = fusedScores.get(docId) || 0;
      const rrfScore = 1 / (k + (rank + 1));
      fusedScores.set(docId, currentScore + rrfScore);
    });
  };

  processList(denseRankings);
  processList(sparseRankings);

  return new Map(
    [...fusedScores.entries()].sort((a, b) => b[1] - a[1])
  );
}`,
        },
        table: {
          headers: ['Retrieval Strategy', 'Recall@5', 'Precision@5', 'P95 Latency'],
          rows: [
            ['Dense Embeddings Only', 'measure', 'measure', 'measure'],
            ['BM25 Keyword Search Only', 'measure', 'measure', 'measure'],
            ['Hybrid RRF (Dense + BM25)', 'measure', 'measure', 'measure'],
            ['Hybrid RRF + Cross-Encoder Rerank', 'measure', 'measure', 'measure'],
          ],
          caption:
            'Illustrative measurement structure, not measured results. We hold no public retrieval benchmark over legal or technical-spec corpora and would not publish one without disclosing the corpus, the judge, and the split. The directional claim is the real content of this table: hybrid fusion should beat either arm alone on exact-match queries, and reranking should buy precision with latency. Measure the magnitude on your own corpus.',
        },
      },
      {
        id: 'cross-encoder-reranking-and-context-window-hygiene',
        heading: 'Cross-Encoder Re-Ranking & Context Hygiene',
        paragraphs: [
          'After initial hybrid retrieval extracts the top-25 candidate chunks, a lightweight cross-encoder model (such as BGE-Reranker-Large or Cohere Rerank v3) re-evaluates the query-chunk pair with full cross-attention.',
          'The top-5 highest-scoring chunks are formatted into a clean, markdown-delimited prompt with strict citation requirements: "Cite [Doc ID: X, Page: Y] for every claim made. If the provided context does not contain the answer, explicitly state that the information is unavailable."',
        ],
        callout: {
          type: 'takeaway',
          title: 'Production Tip',
          content:
            'Always limit the generation context to top-5 reranked chunks rather than stuffing 50 chunks into a 128k context window. Concentrated relevance keeps a far larger share of generated tokens tied to retrieved evidence, and a short prompt is cheaper and faster to generate. We have not measured the delta ourselves, so if you want to quote a percentage, run it on your own traffic.',
        },
      },
    ],
  },

  'mcp-protocol-developer-tooling': {
    slug: 'mcp-protocol-developer-tooling',
    title: 'Connecting Developer Tools via Model Context Protocol (MCP)',
    seoTitle:
      'Model Context Protocol (MCP)',
    excerpt:
      'Understanding standard MCP tool servers, secure resource handlers, JSON-RPC communication, and how AI assistants interact safely with local databases and APIs.',
    author: 'Sonu Singh',
    authorRole: 'Head of Developer Tooling',
    date: 'December 20, 2025',
    category: 'Developer Tooling',
    readTime: '7 min read',
    difficulty: 'Intermediate',
    tags: ['MCP', 'Anthropic', 'Developer Tools', 'JSON-RPC', 'Security', 'APIs'],
    relatedProduct: {
      name: 'Custom MCP Server Development',
      description: 'Integrate enterprise databases, CRMs, and internal APIs into Claude & Cursor.',
      href: '/services',
      badge: 'MCP Protocol',
    },
    sections: [
      {
        id: 'the-need-for-an-open-tool-standard',
        heading: 'The Need for an Open Tool Standard',
        paragraphs: [
          'Before the Model Context Protocol (MCP) was introduced, integrating LLMs with external systems required writing proprietary connectors for every platform: one for ChatGPT plugins, another for Cursor, a third for Claude desktop, and custom wrappers for internal CLI tools.',
          'MCP replaces this fragmented landscape with a universal, open standard over JSON-RPC. It allows AI clients to discover, query, and invoke tools, live resources, and prompt templates exposed by standard server processes running locally or over secure SSE streams.',
        ],
        callout: {
          type: 'takeaway',
          title: 'The MCP Core Triad',
          content:
            'MCP standardizes three key primitives: Tools (executable functions with typed schemas), Resources (readable data feeds like files or database records), and Prompts (reusable workflow templates).',
        },
      },
      {
        id: 'mcp-architecture-under-the-hood',
        heading: 'MCP Architecture Under the Hood',
        paragraphs: [
          'An MCP deployment consists of three distinct participants: the Host application (such as Cursor or Claude Desktop), an MCP Client running inside the host, and one or more independent MCP Servers.',
          'Communication occurs over standard input/output (stdio) for local tools, or Server-Sent Events (SSE) over HTTP for remote microservices. Every method invocation is typed via JSON Schema contracts.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'postgres-mcp-server.ts',
          code: `import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

const server = new Server(
  { name: 'norai-postgres-inspector', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'query_read_only_schema',
      description: 'Inspect database tables and column types safely',
      inputSchema: {
        type: 'object',
        properties: {
          tableName: { type: 'string', description: 'Table to inspect' },
        },
        required: ['tableName'],
      },
    },
  ],
}));`,
        },
      },
      {
        id: 'security-and-sandboxing-best-practices',
        heading: 'Security & Sandboxing Best Practices',
        paragraphs: [
          'Because MCP servers grant AI assistants direct access to developer machines and enterprise backends, strict security boundaries must be enforced:',
          '1. Read-Only Guards: Database MCP servers must use database roles with explicit `SELECT` privileges only, preventing accidental data mutations or drops.',
          '2. Path Normalization: Filesystem MCP tools must strictly validate that requested file paths cannot escape designated project roots via `../` path traversal attacks.',
          '3. Human-in-the-Loop Permissions: Sensitive operations (such as sending emails, deleting records, or running terminal commands) must mandate explicit user confirmation dialogs before execution.',
        ],
        callout: {
          type: 'warning',
          title: 'Security Vulnerability Alert',
          content:
            'Never run an MCP server with unrestricted root or admin permissions. Always implement rate limiting, payload redaction, and strict sandbox paths.',
        },
      },
    ],
  },

  'automated-resume-screening-patterns': {
    slug: 'automated-resume-screening-patterns',
    title: 'Automating Candidate Screening: Skill Extraction Patterns',
    seoTitle:
      'Automated Candidate Screening',
    excerpt:
      'Technical insights into parsing multi-format resume documents, extracting verified candidate qualifications, and computing objective match scores with auditable weighting.',
    author: 'Gourav Singh',
    authorRole: 'Founder & AI Systems Architect',
    date: 'December 05, 2025',
    category: 'Recruitment AI',
    readTime: '7 min read',
    difficulty: 'Intermediate',
    tags: ['HR Tech', 'PDF Parsing', 'Skill Extraction', 'Scoring', 'Micro-SaaS'],
    relatedProduct: {
      name: 'AI Resume Shortlister',
      description: 'Automated candidate screening and match scoring for high-volume hiring teams.',
      href: '/products/resume-shortlister',
      badge: 'Live Micro-SaaS',
    },
    sections: [
      {
        id: 'the-chaos-of-resume-formatting',
        heading: 'The Chaos of Unstructured Resume Formatting',
        paragraphs: [
          'Recruiters in high-growth companies receive thousands of resumes weekly across radically different formats: complex multi-column PDFs, graphic-heavy Canva templates, poorly formatted Word documents, and plain text uploads.',
          'Standard PDF text extraction libraries frequently read across column boundaries, causing job titles from column 1 to merge with dates from column 2. At NorAI, we built a layout-aware PDF tokenizer that calculates spatial bounding boxes before text extraction, so work history reads in chronological order instead of reading order.',
        ],
        callout: {
          type: 'takeaway',
          title: 'Where The Time Actually Goes',
          content:
            'Layout analysis is the expensive stage, and taxonomy matching is the cheap one: parsing a PDF into spatial blocks costs real time, while matching those blocks against a pre-compiled skill taxonomy is a deterministic local lookup. Keep the model call out of the hot path where you can and instrument every stage separately. Measure your own corpus before you put a latency number in front of a hiring team, because page count and scan quality move the distribution more than any optimisation will.',
        },
      },
      {
        id: 'multi-dimensional-qualification-scoring',
        heading: 'Multi-Dimensional Qualification Scoring',
        paragraphs: [
          'A single monolithic match score is unhelpful to recruiters. Effective talent screening requires decomposing evaluation into four objective, verifiable dimensions:',
          '1. Hard Technical Competencies (40% Weight): Verified programming languages, frameworks, and domain tooling.',
          '2. Role Experience & Seniority (30% Weight): Relevant years in production environments and engineering scale.',
          '3. Educational & Certification Foundation (15% Weight): Relevant degrees, technical credentials, and continuous learning.',
          '4. Recent Project Velocity (15% Weight): Recency and complexity of shipped production systems.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'scoring-matrix.ts',
          code: `export interface CandidateScorecard {
  overallScore: number; // 0 - 100
  qualificationTier: 'Tier-1 Qualified' | 'Tier-2 Review' | 'Unqualified';
  dimensions: {
    technicalSkills: { score: number; matched: string[]; missing: string[] };
    experienceDepth: { score: number; yearsRelevant: number; scaleLevel: string };
    education: { score: number; degree: string; verified: boolean };
    projectRecency: { score: number; lastActiveYear: number };
  };
  highlightSummary: string;
  recommendationReason: string;
}`,
        },
      },
      {
        id: 'bias-mitigation-and-fairness-guardrails',
        heading: 'Bias Mitigation & Compliance Guardrails',
        paragraphs: [
          'Automated hiring tools must adhere to strict equal employment regulations. Our extraction engine implements an automatic PII (Personally Identifiable Information) masking layer.',
          'Before candidate evaluation begins, demographic signals—including candidate photo, candidate name, gender indicators, age references, and residential addresses—are stripped from the evaluation payload, so the score is computed from skills and work history rather than from the name on the envelope. Stripping is not a fairness proof: it removes one class of leak, and the remaining weights still have to be reviewed and challenged.',
        ],
      },
    ],
  },

  'operational-discipline-devops-reliability': {
    slug: 'operational-discipline-devops-reliability',
    title: 'Operational Redundancy and Fail-Safe Engineering Principles',
    seoTitle:
      'Operational Redundancy',
    excerpt:
      'Applying multi-tier fallback routing, liveness probes on every long-running worker, and strict DevSecOps redundancy across high-availability background processes.',
    author: 'Dhruw Singh',
    authorRole: 'Infrastructure & Reliability Lead',
    date: 'November 18, 2025',
    category: 'Operations',
    readTime: '6 min read',
    difficulty: 'Advanced',
    tags: ['DevOps', 'Reliability', 'vLLM', 'Queues', 'High Availability'],
    relatedProduct: {
      name: 'Private On-Prem GPU Infrastructure',
      description: 'Dedicated GPU clusters with no network egress and redundancy designed into the serving tier.',
      href: '/services',
      badge: 'Infrastructure',
    },
    sections: [
      {
        id: 'designing-for-intermittent-gpu-failures',
        heading: 'Designing for Intermittent GPU Failures',
        paragraphs: [
          'In mission-critical AI workloads, inference endpoints can fail without warning due to CUDA out-of-memory errors, GPU thermal throttling, or sudden upstream rate-limit bursts.',
          'A reliable production system must treat inference failures as routine operational occurrences rather than fatal exceptions. We implement a three-tier routing topology so that a failing endpoint degrades into a slower or a queued path instead of a dropped request, and we alert on the tier you land in rather than assuming the primary will hold.',
        ],
        table: {
          headers: ['Tier Level', 'Target Hardware', 'Fallback Trigger', 'Latency Budget'],
          rows: [
            [
              'Tier 1: Primary',
              'Dedicated vLLM GPU Cluster (VPC)',
              'Normal operation',
              'Set from your own traces, then instrumented',
            ],
            [
              'Tier 2: Hot Standby',
              'Secondary Hosted API (Anthropic / OpenAI)',
              'Tier 1 above your SLO, or 5xx',
              'Higher: budget it as a deliberate slowdown',
            ],
            [
              'Tier 3: Asynchronous DLQ',
              'Persistent Redis / BullMQ Queue',
              'Global provider outage',
              'Async: queued, retried, then alerted',
            ],
          ],
          caption:
            'Architecture table, not a performance table. The tiers and the trigger conditions are the deliverable; the latency figures are numbers each deployment sets and instruments for itself, and we do not publish ours as a promise.',
        },
      },
      {
        id: 'circuit-breakers-and-exponential-jitter',
        heading: 'Circuit Breakers & Exponential Jitter Backoff',
        paragraphs: [
          'When an endpoint begins returning 503 Service Unavailable or 429 Rate Limit errors, naive retry loops compound the overload in a destructive retry storm.',
          'We deploy circuit breakers with half-open sampling states combined with full jitter exponential backoff formulas ($t = \text{random}(0, 2^{\text{attempt}} \times \text{base})$), ensuring downstream services can safely recover.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'circuit-breaker.ts',
          code: `export class CircuitBreaker {
  private failures = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private lastStateChange = Date.now();

  constructor(
    private readonly threshold = 5,
    private readonly resetTimeoutMs = 30000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastStateChange > this.resetTimeoutMs) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN. Fast failing request.');
      }
    }

    try {
      const result = await fn();
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failures = 0;
      }
      return result;
    } catch (err) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.state = 'OPEN';
        this.lastStateChange = Date.now();
      }
      throw err;
    }
  }
}`,
        },
      },
    ],
  },

  'deploying-open-weight-llms-vllm-awq': {
    slug: 'deploying-open-weight-llms-vllm-awq',
    title: 'Deploying Open-Weight LLMs Locally with vLLM, AWQ & FlashAttention-2',
    seoTitle:
      'Open-Weight LLMs with vLLM & AWQ',
    excerpt:
      'A complete blueprint for running high-throughput, low-latency open-source models (Llama 3.3, DeepSeek, Qwen 2.5) on private infrastructure with AWQ 4-bit quantization.',
    author: 'Gourav Singh',
    authorRole: 'Founder & AI Systems Architect',
    date: 'January 28, 2026',
    category: 'Systems & Infrastructure',
    readTime: '10 min read',
    difficulty: 'Advanced',
    tags: ['vLLM', 'AWQ', 'Quantization', 'FlashAttention', 'CUDA', 'Open Weights'],
    relatedProduct: {
      name: 'Private On-Premises LLM Clusters',
      description: 'Deploy state-of-the-art open weights inside your sovereign data boundary.',
      href: '/services',
      badge: 'GPU Engineering',
    },
    sections: [
      {
        id: 'why-open-weights-win-for-enterprise',
        heading: 'Why Open Weights Win for Enterprise Infrastructure',
        paragraphs: [
          'While proprietary cloud APIs are the fastest path to a prototype, it is usually the buyer, not the vendor, who forces the decision in-house: data sovereignty, customer regimes such as HIPAA, GDPR, or India DPDP, and per-token unit economics the buyer can forecast. We are not certified against any of those regimes and do not claim to be, we engineer to whatever counsel on the buying side requires.',
          'With open weights at the Llama 3.3 70B and Qwen 2.5 72B class, the published evaluation results are close enough to frontier proprietary models that the engineering challenge shifts from model capability to throughput and memory. Read the current model card before you commit: these leaderboards move every quarter, and we will happily go read it with you.',
        ],
        callout: {
          type: 'takeaway',
          title: 'Run The TCO Model Yourself',
          content:
            'The self-hosting argument is a spreadsheet, not a headline saving. Build it with your own inputs: tokens per day, your blended price per token from the provider console, amortised GPU lease, power and cooling, and the engineer-hours needed to keep the cluster alive across driver upgrades. Every one of those five numbers moves, and the two that move most are the ones no blog post can quote for you. We will build that model with you during an engagement; we have not run it as a NorAI cost study, so we do not publish a saving figure.',
        },
      },
      {
        id: 'vram-budgeting-and-awq-quantization',
        heading: 'VRAM Budgeting & AWQ 4-Bit Quantization',
        paragraphs: [
          'A standard 70B parameter model in 16-bit floating point precision requires approximately 140GB of GPU VRAM just to load model weights into memory, which is basic arithmetic: 70 billion parameters at two bytes each. That is what forces the expensive multi-GPU A100 or H100 configuration.',
          'Activation-aware Weight Quantization (AWQ) protects a small fraction of salient weights, roughly one percent, that carry disproportionate weight for accuracy, while compressing the rest into 4-bit integers. That framing comes from the AWQ paper (Lin et al., MLSys 2023), not from us. The practical result is a 70B model fitting in the high-thirties of GB, give or take: the exact footprint depends on group size, KV-cache headroom, and the context length you serve, so measure it under your own serving parameters.',
        ],
        table: {
          headers: [
            'Quantization Format',
            'VRAM Footprint (Weights Only)',
            'Throughput (Batch 1)',
            'MMLU Delta vs FP16',
          ],
          rows: [
            ['FP16 (Uncompressed)', '~140 GB', 'measure', 'baseline'],
            ['GPTQ 4-bit', '~40 GB', 'measure', 'measure'],
            ['AWQ 4-bit (FlashAttention-2)', '~36-38 GB', 'measure', 'measure'],
            ['FP8 (Hopper Native)', '~70 GB', 'measure', 'measure'],
          ],
          caption:
            'Illustrative structure, not measured results. We have not benchmarked these rows on our own hardware, so the throughput and MMLU columns are left for you to fill. The VRAM column is arithmetic on parameter counts. Any MMLU number you compare against comes from a vendor or community model card, and those vary with prompt template, few-shot count, and harness version, so read the card and then reproduce it on your own eval set.',
        },
      },
      {
        id: 'production-vllm-deployment-config',
        heading: 'Production vLLM Server Deployment Config',
        paragraphs: [
          'Below is the launch script we start from, using PagedAttention, FlashAttention-2, and CUDA graph capture. First-token latency is dominated by queue depth and prompt length, so set your own target from a load test under your own arrival pattern:',
        ],
        codeSnippet: {
          language: 'bash',
          filename: 'serve-vllm.sh',
          code: `#!/usr/bin/env bash
python3 -m vllm.entrypoints.openai.api_server \\
  --model casperhansen/llama-3.3-70b-instruct-awq \\
  --quantization awq \\
  --tensor-parallel-size 2 \\
  --max-model-len 8192 \\
  --gpu-memory-utilization 0.94 \\
  --max-num-seqs 256 \\
  --enable-chunked-prefill \\
  --dtype float16 \\
  --port 8000`,
          output: 'vLLM server listening on http://0.0.0.0:8000 with 2x GPU tensor parallelism.',
        },
      },
    ],
  },

  'multimodal-audio-video-synthesis-latex': {
    slug: 'multimodal-audio-video-synthesis-latex',
    title: 'Multi-Modal Audio & Video Synthesis: Timestamped Chunking & LaTeX Math Extraction',
    seoTitle:
      'Multimodal Audio & Video Synthesis',
    excerpt:
      'How NorAI built the Course Note-Taker ingestion engine to parse 2-hour university lectures into timestamped summaries, definition glossaries, and clean LaTeX mathematical formula cards.',
    author: 'Sonu Singh',
    authorRole: 'Head of Developer Tooling',
    date: 'February 08, 2026',
    category: 'Multi-Modal AI',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    tags: ['Multi-Modal', 'Audio', 'Whisper', 'LaTeX', 'KaTeX', 'Study Tools'],
    relatedProduct: {
      name: 'Course Note-Taker',
      description:
        'Turn hours of video lectures and audio into structured study notes and flashcards.',
      href: '/products/course-note-taker',
      badge: 'Live Micro-SaaS',
    },
    sections: [
      {
        id: 'the-challenge-of-long-form-academic-audio',
        heading: 'The Challenge of Long-Form Academic Audio',
        paragraphs: [
          'University lectures and technical webinars contain dense spoken formulas, fast transitions between whiteboard proofs, and colloquial professor explanations. Standard speech-to-text models produce continuous walls of unformatted text without logical chapter breaks.',
          'Extracting usable study notes requires three synchronized processing stages: acoustic silence-aware segmentation, phonetic speech-to-text with specialized mathematical vocabulary prompting, and post-processing mathematical normalization into LaTeX syntax.',
        ],
        callout: {
          type: 'takeaway',
          title: 'Acoustic Chunking Strategy',
          content:
            'Instead of slicing audio by fixed 60-second intervals, audio must be split on conversational pause boundaries (>600ms silence) to prevent clipping words midway.',
        },
      },
      {
        id: 'latex-formula-extraction-pipeline',
        heading: 'LaTeX Formula Extraction & KaTeX Rendering',
        paragraphs: [
          'When a speaker says "the integral from zero to infinity of e to the minus x squared dx equals square root pi over two," standard transcription outputs broken text. Our pipeline converts spoken mathematical phrasing into standard LaTeX notation:',
          '$$\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}$$',
          'We render the LaTeX server-side with KaTeX so a study card never reflows on the client, and format theorems into structured cards with clickable timestamps.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'lecture-card-schema.ts',
          code: `export interface LectureStudyCard {
  timestamp: string; // "14:22"
  timestampSeconds: number; // 862
  sectionTitle: string;
  summary: string;
  latexFormulas: string[];
  keyDefinitions: Array<{ term: string; explanation: string }>;
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}`,
        },
      },
    ],
  },

  'zero-hallucination-enterprise-guardrails': {
    slug: 'zero-hallucination-enterprise-guardrails',
    title: 'Eliminating Hallucinations in Enterprise Pipelines with Structured Outputs',
    seoTitle:
      'Hallucination Guardrails for Enterprise AI',
    excerpt:
      'Driving down probabilistic failure modes in mission-critical banking, legal, and HR automation with schema-enforced generation and verification circuits.',
    author: 'Gourav Singh',
    authorRole: 'Founder & AI Systems Architect',
    date: 'February 19, 2026',
    category: 'AI Engineering',
    readTime: '7 min read',
    difficulty: 'Foundational',
    tags: ['Guardrails', 'Reliability', 'Zod', 'Compliance', 'Enterprise'],
    relatedProduct: {
      name: 'Bespoke Enterprise AI Solutions',
      description:
        'Deploy deterministic, schema-enforced automation pipelines with instrumented verification.',
      href: '/services',
      badge: 'Enterprise Architecture',
    },
    sections: [
      {
        id: 'the-anatomy-of-hallucinations',
        heading: 'The Anatomy of Hallucinations in Production',
        paragraphs: [
          'In enterprise automation, hallucinations take three distinct forms: factual fabrications (inventing non-existent policies), structural drift (returning the wrong data format), and confidence masking (stating inaccurate claims with high assertiveness).',
          'Model fine-tuning can reduce errors, but it cannot make a claim true. The only version of zero hallucination we are willing to put our name on is structural: hard guardrails that shrink the generation space before a token is sampled. That does not make a factual claim correct, it makes a malformed claim impossible, which is a narrower promise and the one we can actually keep.',
        ],
        callout: {
          type: 'warning',
          title: 'The Temperature Myth',
          content:
            'Setting model temperature to 0.0 reduces output randomness but does NOT eliminate hallucinations. Structural constraints and citation grounding are mandatory.',
        },
      },
      {
        id: 'grammar-constrained-sampling-and-logprobs',
        heading: 'Grammar-Constrained Sampling & Logprobs Validation',
        paragraphs: [
          'By compiling JSON schemas into Context-Free Grammars (CFGs) directly at the inference engine level (using libraries like Outlines or llama.cpp grammars), the model is mathematically incapable of generating tokens that violate the required schema.',
          'Furthermore, monitoring per-token log probabilities (confidence scores) allows the system to flag uncertain extractions for automated human review before the payload is committed to production databases.',
        ],
        table: {
          headers: ['Guardrail Layer', 'Mechanism', 'What It Actually Buys You', 'What It Costs'],
          rows: [
            [
              'Grammar-Constrained Sampling',
              'Token masking via CFG',
              'Malformed output becomes structurally impossible',
              'A slower sampler, not a free win',
            ],
            [
              'Deterministic Zod Validation',
              'Runtime post-parse typecheck',
              'Type errors cannot reach your database',
              'Cheap: a pure CPU parse',
            ],
            [
              'Citation Grounding Check',
              'Cross-encoder claim verifier',
              'Ranks claims for human review, proves none of them',
              'Real: one forward pass per claim',
            ],
          ],
          caption:
            'Mechanism table, not a performance table. The first two layers carry hard guarantees and neither is free, and the third layer is the probabilistic one that gets sold most often as if it were a guarantee. It is not: a verifier scores its own opinion and still needs a human in the loop above your confidence threshold.',
        },
      },
    ],
  },

  'vernacular-nlp-hindi-english-gazette-parsing': {
    slug: 'vernacular-nlp-hindi-english-gazette-parsing',
    title: 'Vernacular NLP: Engineering Hindi-English Code-Mixed Speech & Public Gazette Parsing',
    seoTitle:
      'Vernacular NLP for Hindi-English',
    excerpt:
      'How NorAI built the Smart Dainik News ingestion pipeline to parse complex Indian public employment gazettes, Hindi PDF tables, and code-mixed vernacular announcements.',
    author: 'Dhruw Singh',
    authorRole: 'Infrastructure & Reliability Lead',
    date: 'February 24, 2026',
    category: 'Regional NLP',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    tags: ['Vernacular NLP', 'Hindi NLP', 'Smart Dainik', 'Gazettes', 'Regional AI'],
    relatedProduct: {
      name: 'Smart Dainik News & Job Digest',
      description:
        'Verified public employment alerts and regional policy summaries for North India.',
      href: '/products/smart-dainik-news',
      badge: 'Public Utility',
    },
    sections: [
      {
        id: 'the-reality-of-regional-indian-document-parsing',
        heading: 'The Reality of Regional Indian Document Parsing',
        paragraphs: [
          'Public employment notifications (Sarkari Gazettes) in North India present unique document challenges: scanned physical printouts with ink smudges, complex multi-script Hindi/English (Hinglish) code-mixing, and critical eligibility tables embedded in unstructured PDF layouts.',
          'Standard international OCR models degrade badly on Devanagari script conjuncts (युग्माक्षर) and misread eligibility age criteria, which is precisely how an eligible candidate misses a deadline.',
        ],
        callout: {
          type: 'takeaway',
          title: 'Regional Mission Grounding',
          content:
            'Built from our engineering hub in Uttar Pradesh, Smart Dainik News bridges this gap by transforming complex gazettes into structured, instant mobile alerts in plain language.',
        },
      },
      {
        id: 'bilingual-entity-normalization-engine',
        heading: 'Bilingual Entity Normalization Engine',
        paragraphs: [
          'Our pipeline extracts four core verified data points from every employment notification: Eligibility Qualifications, Age Limits with category relaxations, Important Application Deadlines, and Official Direct Submission Links.',
          'By pairing a custom fine-tuned Devanagari OCR pass with regex boundary detectors, each of those four fields is extracted into a fixed shape. The regex detectors are cheap and easy to test, which is the point: we verify every extraction against the source gazette during ingestion and surface a low-confidence flag to the reader rather than publishing an accuracy percentage we cannot reproduce on a corpus you can download.',
        ],
        codeSnippet: {
          language: 'typescript',
          filename: 'gazette-schema.ts',
          code: `export interface GazetteJobDigest {
  notificationId: string;
  departmentName: string; // e.g., "UPSSSC / UP Police"
  postTitleHindi: string;
  postTitleEnglish: string;
  totalVacancies: number;
  eligibility: {
    minEducation: string;
    ageMin: number;
    ageMax: number;
    categoryRelaxations: Record<string, number>;
  };
  deadlines: {
    applicationStart: string;
    applicationEnd: string;
    examDateTentative?: string;
  };
  officialLink: string;
  verifiedStamp: boolean;
}`,
        },
      },
    ],
  },
};
