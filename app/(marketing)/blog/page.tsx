import React from 'react';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { BlogIndexClient } from './BlogIndexClient';

export const metadata: Metadata = buildMetadata({
  path: '/blog',
  title: 'Engineering Journal',
  description:
    'Practical notes on AI agent orchestration, hybrid vector search, MCP tooling, and vLLM deployment from the engineers building NorAI.',
});

export default function BlogIndexPage() {
  const postsList = Object.values(BLOG_POSTS);

  return <BlogIndexClient posts={postsList} />;
}
