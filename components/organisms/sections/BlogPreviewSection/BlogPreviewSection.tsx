'use client';

import React from 'react';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Heading } from '@/components/foundation/Heading';
import { Grid } from '@/components/foundation/Grid';
import { BlogCard } from '../../cards/BlogCard';
import { SearchField } from '@/components/molecules/SearchField';
import { Pagination } from '@/components/molecules/Pagination';
import { EmptyState } from '@/components/molecules/EmptyState';
import { LoadingState } from '@/components/molecules/LoadingState';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { BlogPreviewSectionProps } from './BlogPreviewSection.types';

export function BlogPreviewSection({
  heading,
  posts = [],
  showSearch = false,
  pagination,
  variant = 'Preview',
  pending = false,
}: BlogPreviewSectionProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = !prefersReducedMotion;
  const isHub = variant === 'Hub' || showSearch;

  return (
    <div ref={ref}>
      <Section
        variant="default"
        className={cn(
          'relative py-16 lg:py-24 transition-all duration-normal',
          shouldAnimate && !isRevealed && 'opacity-0 translate-y-4',
          shouldAnimate && isRevealed && 'opacity-100 translate-y-0',
        )}
        data-testid="blog-preview-section-organism"
        data-variant={variant}
        data-revealed={isRevealed}
      >
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <Heading as="h2" variant="heading-xl" className="text-primary-900 font-bold tracking-tight">
              {heading}
            </Heading>

            {isHub && (
              <div className="max-w-md mx-auto pt-4">
                <SearchField
                  placeholder="Search articles & updates..."
                />
              </div>
            )}
          </div>

          {pending ? (
            <LoadingState label="Loading blog posts..." variant="skeleton" />
          ) : posts.length === 0 ? (
            <EmptyState
              title="No Articles Found"
              description="No blog posts match your current filter or search criteria."
              icon="layers"
            />
          ) : (
            <div className="space-y-12">
              <Grid cols={3} gap="6" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <BlogCard
                    key={`post-${index}`}
                    title={post.title}
                    excerpt={post.excerpt}
                    href={post.href}
                    author={post.author}
                    date={post.date}
                    category={post.category}
                  />
                ))}
              </Grid>

              {pagination && (
                <div className="flex justify-center pt-4">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={pagination.onPageChange}
                    siblingCount={pagination.siblingCount}
                  />
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
