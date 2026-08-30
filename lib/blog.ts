/**
 * NorAI Editorial Blog & Engineering Knowledge Store
 *
 * ============================================================================
 * ARCHITECTURAL ASSESSMENT & CONTENT SCALING ROADMAP
 * ============================================================================
 *
 * Current State Assessment:
 * - Post count: 5 foundational engineering articles.
 * - Current storage pattern: In-memory typed TypeScript dictionary (`BLOG_POSTS`).
 * - Performance characteristics: Zero runtime parsing overhead, instant compile-time static
 *   page generation via `generateStaticParams`, guaranteed type safety without external build plugins.
 *
 * Scaling Roadmap:
 *
 * 1. Phase 1 (Current: 1–5 Posts) — [ACTIVE]
 *    - In-memory typed Record dictionary. Perfect fit for lean MVP with <10 articles.
 *
 * 2. Phase 2 (Next Milestone: 6–25 Posts) — [RECOMMENDED FOR NEXT PHASE]
 *    - File-based MDX content pipeline (`content/blog/*.mdx`).
 *    - Schema Validation: Zod frontmatter parser for author, category, publishedDate, and canonical URLs.
 *    - Code Syntax Highlighting: Shiki or rehype-pretty-code with VS Code theme tokens.
 *    - RSS & Syndication: Automated RSS 2.0 / Atom feed route at `app/feed.xml/route.ts`.
 *    - Search & Discovery: Build-time generated Lunr/Fuse.js static index for fast client-side query matching.
 *
 * 3. Phase 3 (Enterprise Scale: 25+ Posts & Multi-Author Teams)
 *    - Headless Git-backed CMS (Keystatic or Sanity.io) with visual markdown editing.
 *    - Draft previews and on-demand Incremental Static Regeneration (ISR) via Next.js `revalidatePath()`.
 */

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  sections: Array<{
    heading?: string;
    paragraphs: string[];
    codeSnippet?: {
      language: string;
      code: string;
    };
  }>;
}

export const BLOG_POSTS: Record<string, BlogPostData> = {
  'ai-agent-orchestration-architecture': {
    slug: 'ai-agent-orchestration-architecture',
    title: 'Architecting Deterministic AI Agent Workflows for Scale',
    excerpt: 'An overview of multi-agent state transition machines, structured JSON schema validation, and fault-tolerant background execution queues.',
    author: 'Gourav Singh',
    date: 'January 15, 2026',
    category: 'AI Orchestration',
    readTime: '5 min read',
    sections: [
      {
        heading: 'The Need for Predictable Payload Execution',
        paragraphs: [
          'Automated AI workflows require predictable, structured outputs. Unstructured text responses introduce parsing fragility, potential hallucination edge cases, and unexpected system errors when downstream services consume the output.',
          'At NorAI, we structure multi-agent workflows using strict JSON schema validation and deterministic execution state machines. This ensures every pipeline invocation returns a verified, type-safe payload ready for automated processing.',
        ],
      },
      {
        heading: 'Modeling State Machine Transition Handlers',
        paragraphs: [
          'By treating agent steps as explicit state machine transitions, each stage maintains verified input contracts, retry policies, and fallback handlers if an endpoint encounters a temporary timeout.',
        ],
        codeSnippet: {
          language: 'typescript',
          code: `import { AgentOrchestrator, SchemaValidator } from '@norai/agent-core';

const orchestrator = new AgentOrchestrator({
  timeoutMs: 800,
  maxRetries: 2,
});

const result = await orchestrator.executeTask({
  task: 'SHORTLIST_RESUME',
  payload: rawPayloadText,
  schema: ResumeScoringSchema,
});
console.log('Qualification Score:', result.score);`,
        },
      },
    ],
  },

  'rag-vector-search-best-practices': {
    slug: 'rag-vector-search-best-practices',
    title: 'Best Practices for Hybrid Vector Search & RAG Retrieval',
    excerpt: 'Key strategies for document chunking, hybrid keyword-dense embedding indexing, and grounded context validation in enterprise knowledge search.',
    author: 'Gourav Singh',
    date: 'January 04, 2026',
    category: 'Knowledge Retrieval',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Optimizing Document Chunking Strategies',
        paragraphs: [
          'Retrieval-Augmented Generation (RAG) performance depends directly on document pre-processing. Naive fixed-character chunking frequently splits critical sentences across boundaries, corrupting semantic context.',
          'We recommend semantic heading-aware chunking combined with overlap margins to ensure related concepts remain grouped together during vector index generation.',
        ],
      },
      {
        heading: 'Hybrid Vector & Keyword Indexing',
        paragraphs: [
          'Dense vector embeddings excel at capturing conceptual similarity, while sparse BM25 keyword matching handles specific product SKUs, proper nouns, and technical serial numbers. Combining both in a hybrid retrieval ranker provides higher retrieval accuracy across diverse query types.',
        ],
      },
    ],
  },

  'mcp-protocol-developer-tooling': {
    slug: 'mcp-protocol-developer-tooling',
    title: 'Connecting Developer Tools via Model Context Protocol (MCP)',
    excerpt: 'Understanding standard MCP tool servers, secure resource handlers, and how AI assistants interact with local databases and APIs.',
    author: 'Sonu Singh',
    date: 'December 20, 2025',
    category: 'Developer Tooling',
    readTime: '4 min read',
    sections: [
      {
        heading: 'Standardizing AI Tool Interfaces',
        paragraphs: [
          'The Model Context Protocol (MCP) establishes a unified open standard for exposing local tools, database query endpoints, and external APIs to AI assistants.',
          'Instead of building custom one-off API wrappers for every LLM interface, developers can implement standard MCP servers that expose typed tool methods and resource streams safely.',
        ],
      },
    ],
  },

  'automated-resume-screening-patterns': {
    slug: 'automated-resume-screening-patterns',
    title: 'Automating Candidate Screening: Skill Extraction Patterns',
    excerpt: 'Technical insights into parsing multi-format resume documents, extracting verified candidate qualifications, and computing objective match scores.',
    author: 'Gourav Singh',
    date: 'December 05, 2025',
    category: 'Recruitment AI',
    readTime: '5 min read',
    sections: [
      {
        heading: 'Handling Multi-Format Document Ingestion',
        paragraphs: [
          'Candidate resumes arrive in disparate file formats, ranging from complex multi-column PDFs to unstructured Word documents. Extracting clean text while preserving chronological career history requires specialized document parsing logic.',
          'Once text is extracted, skill vectors are evaluated against job requirements to compute objective qualification scores and generate structured candidate briefs for recruiting teams.',
        ],
      },
    ],
  },

  'operational-discipline-devops-reliability': {
    slug: 'operational-discipline-devops-reliability',
    title: 'Operational Redundancy and Fail-Safe Engineering Principles',
    excerpt: 'Applying multi-tier fallback systems, automated database heartbeats, and strict DevSecOps redundancy across high-availability background workers.',
    author: 'Dhruw Singh',
    date: 'November 18, 2025',
    category: 'Operations',
    readTime: '4 min read',
    sections: [
      {
        heading: 'Designing Resilient Background Workers',
        paragraphs: [
          'In mission-critical background automation, temporary network drops or upstream API rate limits must never cause silent data loss.',
          'We implement multi-tier fallback queues, exponential backoff retries, and strict isolated execution workers to ensure system reliability under continuous load.',
        ],
      },
    ],
  },
};
