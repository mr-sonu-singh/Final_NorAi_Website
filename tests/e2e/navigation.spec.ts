import { test, expect } from '@playwright/test';

/**
 * Navigation, routing and redirect integrity.
 *
 * Every route, link label and redirect target asserted here is read from the
 * app's own source of truth: `config/routes.ts`, `config/navigation.ts`,
 * `next.config.ts redirects()` and `middleware.ts CANONICAL_REWRITES`. Nothing
 * in this file is allowed to drift from those tables — if a nav item is renamed
 * or a redirect is retargeted, the failure should point at the config, not at a
 * hard-coded string that quietly rotted here.
 */

/** Any absolute base works: only the pathname of a Location header is asserted. */
const URL_BASE = 'http://norai.test';

const FOOTER = '[data-testid="footer-organism"]';
const HEADER = 'header[data-testid="header-organism"]';
const NAV = 'nav[aria-label="Main Navigation"]';
/** The nav-link container: the first `hidden lg:flex` row inside the nav. */
const DESKTOP_NAV_ROW = `${NAV} div.hidden.lg\\:flex >> nth=0`;

/** `NORAI_HEADER_NAV_ITEMS` in config/navigation.ts, in DOM order. */
const HEADER_NAV = [
  { label: 'Solutions', href: '/services' },
  { label: 'Prototypes', href: '/products' },
  { label: 'Mission', href: '/mission' },
  { label: 'Story', href: '/team' },
] as const;

/** The single header CTA. `t.nav.startProject` in config/translations.ts. */
const HEADER_CTA = { label: 'Start a Project', href: '/contact' } as const;

/** `next.config.ts` `redirects()`, all `permanent: true` => 308. */
const CONFIG_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ['/about', '/team'],
  ['/faq', '/contact'],
  ['/pricing', '/products'],
  ['/privacy', '/privacy-policy'],
  ['/terms', '/terms-of-service'],
  ['/legal/privacy', '/privacy-policy'],
  ['/legal/terms', '/terms-of-service'],
  ['/legal/cookies', '/cookie-policy'],
  ['/products/ai-resume-shortlister', '/products/resume-shortlister'],
  ['/products/community-chat-digest', '/products/chat-digest'],
  ['/products/news-aggregator', '/products/smart-dainik-news'],
  ['/products/ai-course-note-taker', '/products/course-note-taker'],
  ['/privacy-policy/', '/privacy-policy'],
  ['/terms-of-service/', '/terms-of-service'],
];

/** `middleware.ts` CANONICAL_REWRITES, all emitted with an explicit 308. */
const MIDDLEWARE_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ['/index', '/'],
  ['/home', '/'],
  ['/capabilities', '/products'],
  ['/approach', '/services'],
  ['/deliverables', '/services'],
  ['/work', '/products'],
  ['/journal', '/blog'],
  ['/stories', '/blog'],
  ['/about-us', '/team'],
  ['/who-we-are', '/team'],
  ['/career', '/careers'],
  ['/jobs', '/careers'],
  ['/get-in-touch', '/contact'],
  ['/enquiry', '/contact'],
  ['/documentation', '/docs'],
  ['/legal', '/cookie-policy'],
  ['/cookies', '/cookie-policy'],
  ['/cookie', '/cookie-policy'],
  ['/privacy-notice', '/privacy-policy'],
  ['/tos', '/terms-of-service'],
  ['/terms-and-conditions', '/terms-of-service'],
  ['/mission-statement', '/mission'],
  ['/upskilling', '/mission'],
];

/** Trailing-slash and casing normalisation, also 308. */
const NORMALISED_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ['/team/', '/team'],
  ['/TEAM', '/team'],
  ['/Products', '/products'],
  ['/mission/', '/mission'],
  ['/blog/', '/blog'],
  ['/docs/', '/docs'],
];

/** `dynamicParams = false` on /products/[slug], /blog/[slug] and /[policy]. */
const UNKNOWN_URLS = ['/products/nope', '/blog/nope', '/nonexistent', '/privacy-policy/nope'] as const;

/** Every canonical, indexable page: 9 static + 4 product + 9 blog + 3 legal. */
const CANONICAL_ROUTES = [
  '/',
  '/products',
  '/services',
  '/mission',
  '/team',
  '/careers',
  '/contact',
  '/blog',
  '/docs',
  '/products/resume-shortlister',
  '/products/course-note-taker',
  '/products/chat-digest',
  '/products/smart-dainik-news',
  '/blog/ai-agent-orchestration-architecture',
  '/blog/rag-vector-search-best-practices',
  '/blog/mcp-protocol-developer-tooling',
  '/blog/automated-resume-screening-patterns',
  '/blog/operational-discipline-devops-reliability',
  '/blog/deploying-open-weight-llms-vllm-awq',
  '/blog/multimodal-audio-video-synthesis-latex',
  '/blog/zero-hallucination-enterprise-guardrails',
  '/blog/vernacular-nlp-hindi-english-gazette-parsing',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
] as const;

/** Every distinct internal destination the footer is allowed to link to. */
const FOOTER_INTERNAL_HREFS = [
  '/',
  '/contact',
  '/mission',
  '/services',
  '/team',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/products/resume-shortlister',
  '/products/course-note-taker',
  '/products/chat-digest',
  '/products/smart-dainik-news',
] as const;

test.describe('desktop header', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
  });

  test('exposes exactly the four links config/navigation.ts declares', async ({ page }) => {
    // The first `hidden lg:flex` container in the nav is the link list; the
    // second one holds the controls and the CTA.
    const navLinks = page.locator(DESKTOP_NAV_ROW).locator('a');

    await expect(navLinks).toHaveCount(HEADER_NAV.length);
    expect(await navLinks.allTextContents()).toEqual(HEADER_NAV.map((i) => i.label));
    expect(await navLinks.evaluateAll((els) => els.map((e) => e.getAttribute('href')))).toEqual(
      HEADER_NAV.map((i) => i.href),
    );
  });

  test('brand link is the only home link and returns to /', async ({ page }) => {
    const brand = page.locator(HEADER).getByRole('link', { name: 'NorAI Home' });
    await expect(brand).toHaveCount(1);
    await expect(brand).toHaveAttribute('href', '/');
    await expect(brand).toBeVisible();
  });

  test('has exactly one /contact affordance and it is the solid CTA', async ({ page }) => {
    const nav = page.locator(NAV);
    await expect(nav.locator('a')).toHaveCount(HEADER_NAV.length + 2); // brand + 4 links + CTA

    const contactLinks = nav.locator(`a[href="${HEADER_CTA.href}"]`);
    await expect(contactLinks).toHaveCount(1);
    await expect(contactLinks).toHaveText(HEADER_CTA.label);
    await expect(contactLinks).toBeVisible();

    // A duplicate plain-text "Contact" sitting next to the button is the classic
    // nav bug this assertion exists to prevent.
    await expect(nav.getByRole('link', { name: 'Contact', exact: true })).toHaveCount(0);
  });

  test('carries no dead or placeholder anchors', async ({ page }) => {
    await expect(page.locator(`${HEADER} a[href="#"]`)).toHaveCount(0);
    await expect(page.locator(`${HEADER} a[href="/#mission"]`)).toHaveCount(0);
  });

  test('every anchor in the header resolves to a live page', async ({ page, request }) => {
    const hrefs = await page
      .locator(`${HEADER} a`)
      .evaluateAll((els) => els.map((e) => e.getAttribute('href') as string));

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of new Set(hrefs)) {
      const res = await request.get(href);
      expect(res.status(), `header link did not resolve: ${href}`).toBe(200);
    }
  });

  test('language and theme controls are named buttons', async ({ page }) => {
    const names = await page
      .locator(`${HEADER} button`)
      .evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')));
    expect(names).toContain('English (EN)');
    expect(names).toContain('Hindi (हिन्दी)');
    expect(names).toContain('Switch to light mode');
  });

  test('the mobile hamburger is not an affordance on desktop', async ({ page }) => {
    await expect(page.locator('#mobile-menu-toggle')).toBeHidden();
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });
});

test.describe('desktop nav links land on real pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
  });

  for (const { label, href } of HEADER_NAV) {
    test(`${label} (${href}) renders a populated page, not a soft 404`, async ({ page }) => {
      const link = page.locator(DESKTOP_NAV_ROW).getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await link.click();

      await expect(page).toHaveURL(new RegExp(`${href}$`));

      const main = page.locator('#main-content').first();
      await expect(main).toBeVisible();
      await expect(main).not.toBeEmpty();

      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).not.toHaveText(/404/i);

      await expect(page.locator(FOOTER)).toBeVisible();
    });
  }

  test('the header CTA reaches /contact', async ({ page }) => {
    const cta = page.locator(HEADER).getByRole('link', { name: HEADER_CTA.label, exact: true });
    await cta.click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('#main-content').first()).not.toBeEmpty();
  });

  test('a section link is marked aria-current only while inside that section', async ({ page }) => {
    // The nav is a client component: aria-current only exists after hydration.
    const activeLabels = async () => {
      await page.waitForLoadState('networkidle');
      return page.locator(DESKTOP_NAV_ROW).locator('a[aria-current="page"]').allTextContents();
    };

    for (const [path, expected] of [
      ['/services', 'Solutions'],
      ['/products', 'Prototypes'],
      ['/mission', 'Mission'],
      ['/team', 'Story'],
      // A product detail page inherits its parent's section.
      ['/products/resume-shortlister', 'Prototypes'],
    ] as const) {
      await page.goto(path);
      await expect
        .poll(
          () =>
            page.locator(DESKTOP_NAV_ROW).locator('a[aria-current="page"]').allTextContents(),
          { message: `aria-current wrong on ${path}` },
        )
        .toEqual([expected]);
    }

    // A page outside the nav has no active nav item at all.
    await page.goto('/contact');
    expect(await activeLabels()).toEqual([]);

    // Neither does the homepage.
    await page.goto('/');
    expect(await activeLabels()).toEqual([]);
  });
});

test.describe('client-side navigation', () => {
  test('restores the scroll position to the top on route change', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 3000));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);

    await page.locator(HEADER).getByRole('link', { name: HEADER_CTA.label, exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    expect(await page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(5);
  });

  test('reaches /contact from the footer CTA on a deep page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/careers');
    await page.locator(FOOTER).getByRole('link', { name: /Start a Project/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('#main-content').first()).not.toBeEmpty();
  });
});

test.describe('legacy routes redirect', () => {
  for (const [source, destination] of [
    ...CONFIG_REDIRECTS,
    ...MIDDLEWARE_REDIRECTS,
    ...NORMALISED_REDIRECTS,
  ] as ReadonlyArray<readonly [string, string]>) {
    test(`${source} answers 308 to ${destination}`, async ({ request }) => {
      const res = await request.get(source, { maxRedirects: 0 });
      expect(res.status(), `${source} should be a permanent redirect`).toBe(308);

      const location = res.headers().location;
      expect(location, `${source} sent no Location header`).toBeTruthy();
      expect(new URL(location!, URL_BASE).pathname, `${source} pointed somewhere else`).toBe(
        destination,
      );
    });
  }

  const GROUPS: ReadonlyArray<readonly [string, ReadonlyArray<readonly [string, string]>]> = [
    ['next.config.ts', CONFIG_REDIRECTS],
    ['middleware.ts', MIDDLEWARE_REDIRECTS],
    ['path normalisation', NORMALISED_REDIRECTS],
  ];

  for (const [name, table] of GROUPS) {
    test(`${name}: every redirect terminates on a 200 at its canonical path`, async ({ page }) => {
      test.setTimeout(120_000);
      for (const [source, destination] of table) {
        const response = await page.goto(source);
        expect(response?.status(), `${source} did not terminate on 200`).toBe(200);
        expect(new URL(page.url()).pathname, `${source} landed on the wrong page`).toBe(destination);
        await expect(page.locator('#main-content').first(), `${source} rendered an empty page`).not.toBeEmpty();
      }
    });
  }

  test('a canonical URL is never redirected', async ({ request }) => {
    for (const path of ['/', '/products', '/services', '/mission', '/team', '/blog', '/contact']) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status(), `${path} must not redirect`).toBe(200);
      expect(res.headers().location, `${path} must not send a Location header`).toBeUndefined();
    }
  });
});

test.describe('unknown URLs 404', () => {
  for (const path of UNKNOWN_URLS) {
    test(`${path} answers 404 with a recoverable error page`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should be a 404, not a soft 404`).toBe(404);

      // app/global-not-found.tsx deliberately renders no <h1>, so assert the
      // HTTP status and the visible error message rather than a heading.
      await expect(page.locator('[data-testid="error-state-molecule"]')).toContainText('404');
      await expect(page.getByText(/could not be found/i)).toBeVisible();

      // The 404 is rendered inside the normal shell, so the visitor keeps the
      // header, the footer and every navigation affordance.
      await expect(page.locator(HEADER)).toBeVisible();
      await expect(page.locator(FOOTER)).toBeVisible();

      const home = page.getByRole('link', { name: /go to homepage/i });
      await expect(home).toHaveAttribute('href', '/');
      await home.click();
      await expect(page).toHaveURL((url) => url.pathname === '/');
      await expect(page.locator('#main-content').first()).not.toBeEmpty();

      await page.goto(path);
      const explore = page.getByRole('link', { name: /explore products/i });
      await expect(explore).toHaveAttribute('href', '/products');
      await explore.click();
      await expect(page).toHaveURL((url) => url.pathname === '/products');
    });
  }

  test('the 404 page is marked noindex and claims no canonical', async ({ request }) => {
    const res = await request.get('/nonexistent');
    expect(res.status()).toBe(404);
    const html = await res.text();
    expect(html).toMatch(/<meta name="robots" content="noindex/);
    expect(html).not.toContain('rel="canonical"');
  });
});

test.describe('mobile navigation drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('the hamburger is collapsed by default and announces its state', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAttribute('aria-label', 'Open menu');
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });

  test('opens as a labelled modal dialog mirroring the header nav', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-toggle');
    await toggle.click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Close menu');

    const drawer = page.locator('#mobile-menu');
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute('role', 'dialog');
    await expect(drawer).toHaveAttribute('aria-modal', 'true');
    await expect(drawer).toHaveAttribute('aria-label', 'Mobile Navigation Menu');

    const links = drawer.locator('a');
    await expect(links).toHaveCount(HEADER_NAV.length + 1);
    expect(await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))).toEqual([
      ...HEADER_NAV.map((i) => i.href),
      HEADER_CTA.href,
    ]);
    expect(await links.allTextContents()).toEqual([
      ...HEADER_NAV.map((i) => i.label),
      HEADER_CTA.label,
    ]);
  });

  test('moves focus into the drawer when it opens', async ({ page }) => {
    await page.locator('#mobile-menu-toggle').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    const focused = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '');
    expect(focused).toBe(HEADER_NAV[0].label);
  });

  test('closes on Escape and on the toggle', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-toggle');

    await toggle.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toHaveCount(0);

    await toggle.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });

  test('navigates and dismisses itself when a drawer link is used', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-toggle');
    await toggle.click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Prototypes', exact: true }).click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
    await expect(page.locator('#mobile-menu-toggle')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#main-content').first()).not.toBeEmpty();
  });

  test('collapses to the hamburger on tablet and phone widths', async ({ page }) => {
    for (const width of [1023, 768, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(
        page.locator('#mobile-menu-toggle'),
        `no hamburger at ${width}px`,
      ).toBeVisible();
      await expect(
        page.locator(DESKTOP_NAV_ROW),
        `desktop nav still visible at ${width}px`,
      ).toBeHidden();
    }
  });
});

test.describe('skip link', () => {
  for (const path of ['/', '/products/resume-shortlister', '/privacy-policy']) {
    test(`is the first tab stop on ${path} and jumps to #main-content`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);

      await page.keyboard.press('Tab');
      const skip = page.locator('a[href="#main-content"]');
      await expect(skip).toBeFocused();
      await expect(skip).toBeVisible();
      await expect(page.locator('#main-content')).not.toHaveCount(0);

      await skip.press('Enter');
      expect(await page.evaluate(() => window.location.hash)).toBe('#main-content');
    });
  }

  /**
   * `#main-content` is the skip link's target and a fragment reference, so a
   * duplicate `id` makes the destination ambiguous and nests one `<main>`
   * landmark inside another. `/services` and `/team` used to render a second
   * `<main id="main-content">` inside the marketing layout's own; both now
   * contribute a plain wrapper. The count is exactly 1 everywhere — there is no
   * allowlist left to tighten, and re-introducing a nested `<main>` fails.
   */
  test('the skip-link target id resolves to exactly one element', async ({ page }) => {
    for (const path of CANONICAL_ROUTES) {
      await page.goto(path);
      const count = await page.locator('#main-content').count();
      expect(count, `${path} must expose exactly one #main-content for the skip link`).toBe(1);
    }
  });

  test('the skip-link target is the only <main> landmark on the page', async ({ page }) => {
    for (const path of CANONICAL_ROUTES) {
      await page.goto(path);
      const mains = await page.locator('main').count();
      expect(mains, `${path} renders ${mains} <main> landmarks; <main> may not be nested`).toBe(1);
      // getByRole('main') only sees elements that actually expose the landmark.
      await expect(page.getByRole('main'), `${path} exposes ${mains} main landmarks`).toHaveCount(1);
    }
  });
});

test.describe('footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
  });

  test('is a single labelled contentinfo landmark', async ({ page }) => {
    await expect(page.locator(FOOTER)).toHaveCount(1);
    await expect(page.locator(FOOTER)).toHaveAttribute('aria-label', 'Site Footer');
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
  });

  /**
   * `footer` has to stay unambiguous on every canonical route. The product
   * workbench used to end in a `<footer>` telemetry bar, so `locator('footer')`
   * matched two elements on a product page and the article template ends its
   * column with one too. A `<footer>` is only a landmark when it is not scoped
   * to a sectioning root, so the honest fix is to not use the element: the
   * workbench bar is a plain `<div>` and the article closes its column with a
   * `<div>`, leaving the site footer as the document's only `<footer>`.
   */
  test('is the only <footer> element on every canonical route', async ({ page }) => {
    for (const path of CANONICAL_ROUTES) {
      await page.goto(path);
      const footers = await page.locator('footer').count();
      expect(footers, `${path} renders ${footers} <footer> elements`).toBe(1);
    }
  });

  test('links to exactly the canonical destinations and no dead routes', async ({ page, request }) => {
    const internal = await page
      .locator(`${FOOTER} a`)
      .evaluateAll((els) =>
        els
          .map((e) => e.getAttribute('href') ?? '')
          .filter((h) => h.startsWith('/'))
          .map((h) => h.split('#')[0] ?? h),
      );

    const unique = [...new Set(internal)].sort();
    expect(unique).toEqual([...FOOTER_INTERNAL_HREFS].sort());

    for (const href of unique) {
      const res = await request.get(href);
      expect(res.status(), `footer link dead: ${href}`).toBe(200);
    }
  });

  test('offers every product and every legal policy', async ({ page }) => {
    const footer = page.locator(FOOTER);
    for (const href of [
      '/products/resume-shortlister',
      '/products/course-note-taker',
      '/products/chat-digest',
      '/products/smart-dainik-news',
      '/privacy-policy',
      '/terms-of-service',
      '/cookie-policy',
    ]) {
      await expect(
        footer.locator(`a[href="${href}"]`).first(),
        `footer is missing ${href}`,
      ).toBeVisible();
    }
  });

  test('sits after the main content in the document flow', async ({ page }) => {
    const main = await page.locator('#main-content').first().boundingBox();
    const footer = await page.locator(FOOTER).boundingBox();

    expect(main).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(main!.height).toBeGreaterThan(0);
    expect(footer!.height).toBeGreaterThan(0);
    expect(footer!.y).toBeGreaterThanOrEqual(main!.y + main!.height - 1);
  });
});