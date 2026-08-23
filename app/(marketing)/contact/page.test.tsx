/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import ContactPage, { metadata } from './page';
import MarketingLayout from '../layout';

describe('Contact Page (/contact)', () => {
  it('exports valid metadata', () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toContain('Contact Us');
    expect(metadata.description).toBeDefined();
  });

  it('renders correctly inside MarketingLayout with single H1', () => {
    const { getByRole, getAllByRole, getByTestId } = render(
      <MarketingLayout>
        <ContactPage />
      </MarketingLayout>,
    );

    expect(getByTestId('header-organism')).toBeTruthy();
    expect(getByRole('main')).toBeTruthy();

    const h1Elements = getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0].textContent).toContain("Tell us what's slowing you down");
  });

  it('renders ContactPage JSON-LD structured data', () => {
    const { container } = render(<ContactPage />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();
    const parsed = JSON.parse(script?.textContent || '{}');
    expect(parsed['@type']).toBe('ContactPage');
    expect(parsed.name).toBe('Contact NorAI Technologies');
  });
});
