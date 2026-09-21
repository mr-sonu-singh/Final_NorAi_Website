import React from 'react';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { BlogIndexClient } from './BlogIndexClient';

export const metadata: Metadata = buildMetadata({
  path: '/blog',
  title: 'Engineering Journal & Technical Notes',
  description:
    'Practical technical notes on AI orchestration patterns, vector search retrieval, MCP developer tooling, and workflow automation engineering.',
});

export default function BlogIndexPage() {
  const postsList = Object.values(BLOG_POSTS);

  return <BlogIndexClient posts={postsList} />;
}
