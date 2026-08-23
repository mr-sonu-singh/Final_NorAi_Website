import React from 'react';
import { Section } from '@/components/foundation/Section';
import { Container } from '@/components/foundation/Container';
import { Heading } from '@/components/foundation/Heading';
import { LegalToc, LegalTocItem } from './LegalTemplate.toc';

export interface LegalTemplateSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalTemplateProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: LegalTemplateSection[];
  footer?: React.ReactNode;
}

export function LegalTemplate({
  eyebrow = 'Legal',
  title,
  subtitle,
  lastUpdated,
  sections,
  footer,
}: LegalTemplateProps) {
  const tocItems: LegalTocItem[] = sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      <Section className="relative overflow-hidden pb-16 pt-12 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="lg:mx-auto lg:grid lg:w-fit lg:grid-cols-[200px_minmax(0,720px)] lg:gap-10">
            {/* TOC sidebar — hidden on mobile */}
            <aside className="hidden lg:block" aria-label="Document sections">
              <div className="sticky top-24 py-1">
                <LegalToc items={tocItems} />
              </div>
            </aside>

            {/* Reader column */}
            <article className="w-full max-w-[720px] space-y-10">
              <header className="space-y-4 pb-2">
                {eyebrow ? (
                  <p className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas-pure px-3 py-1 text-[13px] font-medium text-ink-secondary">
                    {eyebrow}
                  </p>
                ) : null}
                <Heading as="h1" variant="display-xl" className="text-balance text-ink-primary">
                  {title}
                </Heading>
                {subtitle ? (
                  <p className="leading-relaxed text-ink-body">{subtitle}</p>
                ) : null}
                {lastUpdated ? (
                  <p className="text-[13px] text-ink-secondary">Last updated {lastUpdated}</p>
                ) : null}
              </header>

              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                  <h2 className="font-display text-2xl leading-snug text-ink-primary">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${section.id}-${index}`}
                      className="text-base leading-[1.75] text-ink-body"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              {footer ? <div className="pt-6">{footer}</div> : null}
            </article>
          </div>
        </Container>
      </Section>
    </div>
  );
}
