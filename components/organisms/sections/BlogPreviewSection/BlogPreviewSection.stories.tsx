import React from 'react';
import { BlogPreviewSection } from './BlogPreviewSection';

const meta = {
  title: 'Organisms/Sections/BlogPreviewSection',
  component: BlogPreviewSection,
};

export default meta;

const mockPosts = [
  {
    title: 'Deterministic AI Inference Architecture',
    excerpt: 'Detailed overview of cryptographic zero-knowledge proof generation.',
    href: '/blog/deterministic-ai-inference',
    author: 'Gourav Singh',
    date: 'October 24, 2025',
    category: 'Architecture',
  },
  {
    title: 'Sub-10ms Inference Latency at Scale',
    excerpt: 'How NorAI optimizes hardware pipelines for high-throughput enterprise workloads.',
    href: '/blog/sub-10ms-inference-latency',
    author: 'Sonu Singh',
    date: 'November 12, 2025',
    category: 'Performance',
  },
];

export const Preview = () => (
  <BlogPreviewSection
    heading="Latest Insights"
    posts={mockPosts}
    variant="Preview"
  />
);

export const Hub = () => (
  <BlogPreviewSection
    heading="Resource Hub"
    posts={mockPosts}
    variant="Hub"
    showSearch
    pagination={{
      currentPage: 1,
      totalPages: 4,
      onPageChange: () => {},
    }}
  />
);

export const Loading = () => (
  <BlogPreviewSection
    heading="Resource Hub"
    posts={[]}
    pending
  />
);

export const Empty = () => (
  <BlogPreviewSection
    heading="Resource Hub"
    posts={[]}
  />
);
