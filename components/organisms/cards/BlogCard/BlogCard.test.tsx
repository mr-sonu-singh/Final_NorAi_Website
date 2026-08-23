/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { BlogCard } from './BlogCard';

describe('BlogCard Organism', () => {
  const baseProps = {
    title: 'Architecting Deterministic AI Agent Workflows',
    excerpt: 'An overview of multi-agent state machines and structured validation.',
    href: '/blog/ai-agent-orchestration-architecture',
    author: 'Gourav Singh',
    date: 'January 15, 2026',
    category: 'AI Orchestration',
  };

  it('renders serif title as a unique link to the post', () => {
    const { getByRole, getByText } = render(<BlogCard {...baseProps} />);

    const link = getByRole('link');
    expect(link.getAttribute('href')).toBe('/blog/ai-agent-orchestration-architecture');
    expect(link.textContent).toContain('Architecting Deterministic AI Agent Workflows');
    expect(getByText(baseProps.category)).toBeTruthy();
  });

  it('renders plain body-font byline without monospace or Read Article filler', () => {
    const { getByText, queryByText } = render(<BlogCard {...baseProps} />);

    expect(getByText('By Gourav Singh · January 15, 2026')).toBeTruthy();
    expect(queryByText(/Read Article/i)).toBeNull();
  });

  it('keeps keyboard focus ring and hover elevation classes', () => {
    const { getByRole } = render(<BlogCard {...baseProps} />);

    const link = getByRole('link');
    expect(link.className).toContain('focus-visible:ring-2');

    const card = getByRole('article').parentElement;
    expect(card?.className).toContain('hover:-translate-y-0.5');
  });

  it('rotates warm accent bars', () => {
    const { getByTestId, rerender } = render(
      <BlogCard {...baseProps} accent="sage" data-testid="card" />,
    );
    expect(getByTestId('blog-card-organism').querySelector('.bg-sage-500')).toBeTruthy();

    rerender(<BlogCard {...baseProps} accent="gold" />);
    expect(getByTestId('blog-card-organism').querySelector('.bg-gold-500')).toBeTruthy();

    rerender(<BlogCard {...baseProps} accent="terra" />);
    expect(getByTestId('blog-card-organism').querySelector('.bg-terra-500')).toBeTruthy();
  });
});
