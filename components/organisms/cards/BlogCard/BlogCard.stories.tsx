import React from 'react';
import { BlogCard } from './BlogCard';

const meta = {
  title: 'Organisms/Cards/BlogCard',
  component: BlogCard,
};

export default meta;

export const Default = () => (
  <BlogCard
    title="Architecting Deterministic AI Agent Workflows for Scale"
    excerpt="An overview of multi-agent state transition machines, structured JSON schema validation, and fault-tolerant execution queues."
    href="/blog/ai-agent-orchestration-architecture"
    author="Gourav Singh"
    date="January 15, 2026"
    category="AI Orchestration"
    accent="terra"
  />
);

export const SageAccent = () => (
  <BlogCard
    title="Best Practices for Hybrid Vector Search & RAG Retrieval"
    excerpt="Key strategies for document chunking, hybrid keyword-dense indexing, and grounded context validation."
    href="/blog/rag-vector-search-best-practices"
    author="Gourav Singh"
    date="January 04, 2026"
    category="Knowledge Retrieval"
    accent="sage"
  />
);

export const GoldAccent = () => (
  <BlogCard
    title="Connecting Developer Tools via Model Context Protocol (MCP)"
    excerpt="Understanding standard MCP tool servers, secure resource handlers, and how AI assistants interact with local databases and APIs."
    href="/blog/mcp-protocol-developer-tooling"
    author="Sonu Singh"
    date="December 20, 2025"
    category="Developer Tooling"
    accent="gold"
  />
);
