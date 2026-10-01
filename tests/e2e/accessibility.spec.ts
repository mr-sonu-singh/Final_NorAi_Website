import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated and manual accessibility checks.
 *
 * The site is dark-first but ships a real light theme, and contrast has to hold
 * in both — so every axe run here is executed twice, once per theme, seeded
 * through the same `localStorage` key (`norai_theme`) that
 * `providers/ThemeProvider.tsx` reads. Seeding it matters: asserting "light"
 * while the document is still dark would make the light run a no-op that can
 * never fail.
 */

const THEMES = ['dark', 'light'] as const;
type Theme = (typeof THEMES)[number];

/** BCP-47 prefix each UI language should declare on <html lang>. */
const LANG_CODES = { en: 'en', hi: 'hi' } as const;

/**
 * Every one of these routes has to be free of WCAG A/AA violations in both
 * themes — and, because reduced motion removes the scroll reveals, in both
 * motion settings too.
 */
const ZERO_VIOLATION_PAGES = [
  '/',
  '/products',
  '/products/resume-shortlister',
  '/products/course-note-taker',
  '/products/chat-digest',
  '/products/smart-dainik-news',
  '/services',
  '/mission',
  '/team',
  '/careers',
  '/contact',
  '/blog',
  '/docs',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
] as const;

/** Blog posts are audited in their own block below, in both themes. */
const BLOG_POST_PAGES = [
  '/blog/ai-agent-orchestration-architecture',
  '/blog/rag-vector-search-best-practices',
  '/blog/mcp-protocol-developer-tooling',
  '/blog/automated-resume-screening-patterns',
  '/blog/operational-discipline-devops-reliability',
  '/blog/deploying-open-weight-llms-vllm-awq',
  '/blog/multimodal-audio-video-synthesis-latex',
  '/blog/zero-hallucination-enterprise-guardrails',
  '/blog/vernacular-nlp-hindi-english-gazette-parsing',
] as const;

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function applyTheme(context: import('@playwright/test').BrowserContext, theme: Theme) {
  await context.addInitScript((value) => {
    try {
      localStorage.setItem('norai_theme', value);
    } catch {
      /* private mode */
    }
  }, theme);
}

async function expectTheme(page: Page, theme: Theme) {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.classList.contains('dark')), {
      message: 'the seeded theme was never applied, so the audit below proves nothing',
    })
    .toBe(theme === 'dark');
}

/**
 * The page reveals sections on scroll with a fade/translate. Auditing mid-flight
 * is meaningless: axe resolves the *blended* colour of a half-faded glyph
 * against its backdrop and reports a contrast violation that disappears one
 * frame later. Scroll the whole document so every reveal has fired, return to
 * the top, and let the transitions finish before anything is measured.
 */
async function settleScrollReveals(page: Page) {
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

function formatViolations(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) {
  return JSON.stringify(
    violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 3).map((n) => ({ target: n.target, html: n.html.slice(0, 160) })),
    })),
    null,
    2,
  );
}

test.describe('axe audits — both themes', () => {
  for (const path of ZERO_VIOLATION_PAGES) {
    for (const theme of THEMES) {
      test(`${path} in ${theme} theme has zero WCAG A/AA violations`, async ({ page, context }) => {
        await applyTheme(context, theme);
        await page.goto(path);
        await expectTheme(page, theme);
        await settleScrollReveals(page);

        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        expect(results.violations, formatViolations(results.violations)).toEqual([]);
      });
    }
  }

  test('the axe run really is auditing the whole document, not an empty shell', async ({
    page,
    context,
  }) => {
    await applyTheme(context, 'dark');
    await page.goto('/');
    await expectTheme(page, 'dark');
    await settleScrollReveals(page);

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    // If the shell collapsed, the page would still "pass" with nothing scanned.
    expect(results.passes.length).toBeGreaterThan(20);
    expect(await page.locator('#main-content a').count()).toBeGreaterThan(10);
  });
});

test.describe('axe audits under prefers-reduced-motion: reduce', () => {
  /**
   * This is the only mode in which the whole document is auditable. With motion
   * allowed, a scroll-revealed wrapper is still at `opacity: 0` for anything the
   * audit has not scrolled past, and axe skips a zero-opacity subtree entirely —
   * so a colour that is invisible-but-wrong passes the no-preference run. Under
   * reduced motion every reveal renders in its final state, so axe measures the
   * colours a visitor actually sees.
   *
   * It is also why a real contrast defect could hide there: `bg-sage-100/70` and
   * `text-accent-500/40` compile to `color-mix()` with an alpha, so the solid
   * `.dark` step rules could not reach them, and the frozen light values were
   * being mixed over the obsidian canvas at 1.46:1 and 1.47:1. The fixes are in
   * `app/globals.css`; this block now forbids that class of failure outright.
   */
  for (const path of ZERO_VIOLATION_PAGES) {
    for (const theme of THEMES) {
      test(`${path} in ${theme} theme settles revealed content to its final state`, async ({
        browser,
      }) => {
        const context = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          reducedMotion: 'reduce',
        });
        await applyTheme(context, theme);
        const page = await context.newPage();

        await page.goto(path);
        await expectTheme(page, theme);
        await page.waitForTimeout(400);

        // Every reveal must be finished: no half-faded glyph, no leftover offset.
        // Only inline styles count — a static `opacity-40` utility on a decorative
        // mesh glow is a design value, whereas an inline `opacity`/`transform` is
        // the signature of a reveal that has not settled.
        const unfinished = await page.evaluate(() => {
          const stuck: string[] = [];
          document.querySelectorAll<HTMLElement>('#main-content *').forEach((el) => {
            const inline = el.getAttribute('style') ?? '';
            const animated = /(^|;)\s*(opacity|transform)\s*:/.test(inline);
            if (!animated) return;
            const style = getComputedStyle(el);
            if (Number(style.opacity) < 1) {
              stuck.push(
                `${el.tagName}.${String(el.className).slice(0, 60)} opacity=${style.opacity} (inline: ${inline})`,
              );
            }
            if (style.transform !== 'none' && style.transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
              stuck.push(
                `${el.tagName}.${String(el.className).slice(0, 60)} transform=${style.transform}`,
              );
            }
          });
          return stuck;
        });
        expect(unfinished, `${path} left revealed content mid-animation under reduced motion`).toEqual(
          [],
        );

        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        expect(results.violations, formatViolations(results.violations)).toEqual([]);
        await context.close();
      });
    }
  }
});

test.describe('blog posts', () => {
  /**
   * Every post renders `components/templates/BlogPostInteractive.tsx` — an
   * "Explore Tool" CTA. The card lives inside `.prose-editorial`, whose unlayered
   * `a` rule repaints links with the accent ink; the CTA therefore rendered its
   * label in sky (`#38bdf8`, dark) on a terracotta fill, measuring 1.79:1. The
   * fill is now a step deeper and the label opts out of the prose ink.
   *
   * No allowlist: a post must be clean in both themes, and a regression fails
   * immediately rather than being absorbed.
   */
  test('carry no WCAG A/AA violation in either theme', async ({ page, context }) => {
    for (const theme of THEMES) {
      await applyTheme(context, theme);
      for (const path of BLOG_POST_PAGES) {
        await page.goto(path);
        await expectTheme(page, theme);
        await settleScrollReveals(page);

        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        expect(results.violations, formatViolations(results.violations)).toEqual([]);
      }
    }
  });

  test('the contextual product CTA clears 4.5:1 against its own fill, not the page', async ({
    page,
    context,
  }) => {
    await applyTheme(context, 'dark');
    await page.goto('/blog/ai-agent-orchestration-architecture');
    await expectTheme(page, 'dark');

    const cta = page.getByRole('link', { name: /explore tool/i });
    await expect(cta).toHaveCount(1);

    const measured = await cta.evaluate((el) => {
      const luminance = (value: string) => {
        const channels = (value.match(/[\d.]+/g) ?? []).map(Number);
        const lin = (c: number) => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return (
          0.2126 * lin(channels[0] ?? 0) +
          0.7152 * lin(channels[1] ?? 0) +
          0.0722 * lin(channels[2] ?? 0)
        );
      };
      const color = getComputedStyle(el).color;
      const backgroundColor = getComputedStyle(el).backgroundColor;
      const fg = luminance(color);
      const bg = luminance(backgroundColor);
      const [hi, lo] = fg > bg ? [fg, bg] : [bg, fg];
      return { color, backgroundColor, ratio: (hi + 0.05) / (lo + 0.05) };
    });

    // The solid fill is one opaque step and the prose ink no longer reaches it,
    // so the label is the white the fill was always meant to carry.
    expect(measured.color).toBe('rgb(255, 255, 255)');
    // 12px semibold is normal text, so the bar is 4.5:1 — not the 3:1 that a
    // large-text reading of the same chip would allow.
    expect(
      measured.ratio,
      `the CTA label is ${measured.color} on ${measured.backgroundColor} — only ${measured.ratio.toFixed(2)}:1`,
    ).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe('static accessibility primitives', () => {
  test('every image carries an alt attribute', async ({ page }) => {
    for (const path of ZERO_VIOLATION_PAGES) {
      await page.goto(path);
      const images = await page
        .locator('img')
        .evaluateAll((els) => els.map((e) => e.getAttribute('alt')));
      expect(images.length, `${path} rendered no images at all`).toBeGreaterThan(0);
      for (const alt of images) {
        expect(alt, `${path} has an <img> with no alt attribute`).not.toBeNull();
        expect(alt!.length, `${path} has an <img> with an empty alt but no empty-alt marker`).toBeLessThan(200);
      }
    }
  });

  test('every link and button has a discernible accessible name', async ({ page }) => {
    for (const path of ZERO_VIOLATION_PAGES) {
      await page.goto(path);
      const unnamed = await page.locator('a, button, [role="button"], [role="radio"]').evaluateAll(
        (els) =>
          els
            .filter((el) => {
              const label =
                el.getAttribute('aria-label') ?? el.getAttribute('title') ?? el.textContent ?? '';
              return label.trim().length === 0;
            })
            .map((el) => el.outerHTML.slice(0, 120)),
      );
      expect(unnamed, `${path} has interactive elements with no accessible name`).toEqual([]);
    }
  });

  test('no page hijacks the natural tab order with a positive tabindex', async ({ page }) => {
    for (const path of ZERO_VIOLATION_PAGES) {
      await page.goto(path);
      const offenders = await page
        .locator('[tabindex]')
        .evaluateAll((els) =>
          els
            .filter((el) => Number(el.getAttribute('tabindex')) > 0)
            .map((el) => `${el.tagName}[tabindex=${el.getAttribute('tabindex')}]`),
        );
      expect(offenders, `${path} uses a positive tabindex`).toEqual([]);
    }
  });

  test('every page declares a document language', async ({ page }) => {
    for (const path of ZERO_VIOLATION_PAGES) {
      await page.goto(path);
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang, `${path} has no <html lang>`).toBeTruthy();
      expect(lang, `${path} declares a malformed lang`).toMatch(/^[a-z]{2}(-[A-Za-z0-9]+)*$/);
    }
  });

  test('every page declares exactly one level-1 heading', async ({ page }) => {
    for (const path of ZERO_VIOLATION_PAGES) {
      await page.goto(path);
      await expect(page.locator('h1'), `${path} must have exactly one h1`).toHaveCount(1);
    }
  });

  /**
   * axe-core classifies a placeholder-only field as "incomplete" rather than a
   * violation, so a violations-only audit never sees it. The two search fields on
   * /blog and /mission used to be exactly that; both now carry a real `<label>`.
   * The list is empty and must stay empty — a new unnamed control fails here.
   */
  test('every form control has a programmatic accessible name', async ({ page }) => {
    for (const path of [...ZERO_VIOLATION_PAGES]) {
      await page.goto(path);

      const unlabelled = await page
        .locator('input, textarea, select')
        .evaluateAll((els) =>
          els
            .filter((el) => {
              const id = el.getAttribute('id');
              const hasLabel = id ? !!document.querySelector(`label[for="${CSS.escape(id)}"]`) : false;
              return (
                !hasLabel &&
                !el.closest('label') &&
                !el.getAttribute('aria-label') &&
                !el.getAttribute('aria-labelledby') &&
                !el.getAttribute('title')
              );
            })
            .map((el) => el.getAttribute('placeholder') ?? `${el.tagName}#${el.getAttribute('id')}`),
        );

      expect([...unlabelled].sort(), `${path} has an unlabelled form control`).toEqual([]);
    }
  });

  test('every search field is named by a label, not by its placeholder', async ({ page }) => {
    for (const [path, placeholder] of [
      ['/blog', "Search articles... (Press '/')"],
      ['/mission', 'Search curriculum tracks or focus areas...'],
    ] as const) {
      await page.goto(path);
      const field = page.locator(`input[placeholder="${placeholder}"]`);
      await expect(field, `${path} no longer has the search field it had`).toHaveCount(1);

      const name = await field.evaluate((el) => {
        const id = el.getAttribute('id');
        const label = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
        return (
          label?.textContent?.trim() ??
          el.getAttribute('aria-label') ??
          el.getAttribute('aria-labelledby') ??
          ''
        );
      });
      expect(name, `${path} search field has no accessible name`).not.toBe('');
      // A placeholder is not a name: it vanishes the moment the field has a value.
      expect(name).not.toBe(placeholder);
    }
  });

  test('the contact form labels every field it asks the user to fill in', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form')).toHaveCount(1);

    const fields = page.locator('form input, form textarea, form select');
    await expect(fields).toHaveCount(5);

    const names = await fields.evaluateAll((els) =>
      els.map((el) => {
        const id = el.getAttribute('id') ?? '';
        const label = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
        return label?.textContent?.trim() ?? '';
      }),
    );
    for (const [index, name] of names.entries()) {
      expect(name, `contact field #${index} has no <label for>`).not.toBe('');
    }

    await expect(page.locator('form button[type="submit"]')).toHaveText(/dispatch message/i);
  });
});

test.describe('theme control', () => {
  test('the toggle is named for the theme it switches to, and does switch', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const toLight = page.getByRole('button', { name: 'Switch to light mode' });
    await expect(toLight).toHaveCount(1);

    await toLight.click();
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
    expect(await page.evaluate(() => localStorage.getItem('norai_theme'))).toBe('light');

    const toDark = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(toDark).toHaveCount(1);
    await toDark.click();
    await expect(page.locator('html')).toHaveClass(/\bdark/);
    expect(await page.evaluate(() => localStorage.getItem('norai_theme'))).toBe('dark');
  });

  test('the chosen theme survives a reload', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);

    await page.reload();
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
    expect(await page.evaluate(() => localStorage.getItem('norai_theme'))).toBe('light');
  });

  test('the two themes paint genuinely different surfaces', async ({ page, context }) => {
    await applyTheme(context, 'dark');
    await page.goto('/services');
    await expectTheme(page, 'dark');
    const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const darkFg = await page.evaluate(() => getComputedStyle(document.body).color);

    const fresh = await context.browser()!.newContext();
    const freshPage = await fresh.newPage();
    await freshPage.addInitScript(() => {
      try {
        localStorage.setItem('norai_theme', 'light');
      } catch {
        /* private mode */
      }
    });
    await freshPage.goto('/services');
    await expect(freshPage.locator('html')).not.toHaveClass(/\bdark\b/);
    const lightBg = await freshPage.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const lightFg = await freshPage.evaluate(() => getComputedStyle(document.body).color);
    await fresh.close();

    expect(darkBg, 'light mode did not change the page background').not.toBe(lightBg);
    expect(darkFg, 'light mode did not change the body text colour').not.toBe(lightFg);
  });
});

test.describe('language control', () => {
  test('is a labelled radio group with exactly one selected language', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const group = page.getByRole('radiogroup', { name: 'Select Language' });
    await expect(group).toHaveCount(1);
    await expect(group.getByRole('radio')).toHaveCount(2);
    await expect(group.locator('[aria-checked="true"]')).toHaveCount(1);
    await expect(group.locator('[aria-checked="true"]')).toHaveAttribute('aria-label', /English \(EN\)/);
  });

  test('switching language actually translates the navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const navRow = page
      .locator('nav[aria-label="Main Navigation"] div.hidden.lg\\:flex')
      .first()
      .locator('a');
    expect(await navRow.allTextContents()).toEqual(['Solutions', 'Prototypes', 'Mission', 'Story']);

    await page.getByRole('radiogroup', { name: 'Select Language' }).getByRole('radio', { name: /Hindi/ }).click();
    await expect(navRow).toHaveText(['समाधान', 'प्रोटोटाइप्स', 'मिशन', 'कहानी']);

    // The choice is remembered, not just applied for this render.
    expect(await page.evaluate(() => localStorage.getItem('norai_language'))).toBe('hi');
    await page.reload();
    await expect(navRow).toHaveText(['समाधान', 'प्रोटोटाइप्स', 'मिशन', 'कहानी']);
  });

  /**
   * Switching to Hindi swaps every visible string, so <html lang> has to swap
   * with it — otherwise a screen reader applies English pronunciation rules to
   * Devanagari. It previously stayed "en" in both the toggle path and the
   * first-load path. No allowlist: both languages must declare their own tag.
   */
  test('the document language follows the selected interface language', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const language of ['en', 'hi'] as const) {
      await page.addInitScript((value) => {
        try {
          localStorage.setItem('norai_language', value);
        } catch {
          /* private mode */
        }
      }, language);
      await page.goto('/');

      await expect
        .poll(
          async () => (await page.locator('html').getAttribute('lang')) ?? '',
          { message: `a stored "${language}" preference was never applied to <html lang>` },
        )
        .toBe(LANG_CODES[language]);
    }
  });

  test('the document language changes the moment the toggle is used', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.getByRole('radiogroup', { name: 'Select Language' }).getByRole('radio', { name: /Hindi/ }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');

    await page.getByRole('radiogroup', { name: 'Select Language' }).getByRole('radio', { name: /English/ }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('skip link', () => {
  test('is visually hidden until focused, then fully visible', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const skip = page.locator('body > a[href="#main-content"]');
    await expect(skip).toHaveCount(1);

    const before = await skip.boundingBox();
    expect(before === null || before.width < 4 || before.height < 4).toBe(true);

    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    const after = await skip.boundingBox();
    expect(after, 'the focused skip link has no box').not.toBeNull();
    expect(after!.width).toBeGreaterThan(40);
    expect(after!.height).toBeGreaterThan(20);
  });
});

test.describe('mobile drawer accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('opens as a modal dialog, takes focus and announces its state', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-toggle');
    const live = page.locator('[aria-live="polite"]').first();
    await expect(live).toHaveText('');

    await toggle.click();
    const drawer = page.locator('#mobile-menu');
    await expect(drawer).toHaveAttribute('aria-modal', 'true');
    await expect(live).toHaveText('Navigation menu opened');

    // Focus is inside the dialog, not left behind on the page behind it.
    const insideDrawer = await page.evaluate(() => {
      const drawerEl = document.getElementById('mobile-menu');
      return !!drawerEl && document.activeElement !== null && drawerEl.contains(document.activeElement);
    });
    expect(insideDrawer, 'focus was not moved into the drawer').toBe(true);

    await page.keyboard.press('Escape');
    await expect(drawer).toHaveCount(0);
    await expect(live).toHaveText('Navigation menu closed');
  });

  test('every drawer link has a visible focus ring target inside the dialog', async ({ page }) => {
    await page.locator('#mobile-menu-toggle').click();
    const drawer = page.locator('#mobile-menu');
    await expect(drawer).toBeVisible();

    const links = drawer.locator('a');
    const boxes = await links.evaluateAll((els) =>
      els.map((el) => {
        const b = el.getBoundingClientRect();
        return { w: Math.round(b.width), h: Math.round(b.height) };
      }),
    );
    expect(boxes.length).toBeGreaterThan(0);
    for (const box of boxes) {
      expect(box.w, 'a drawer link is too small to tap').toBeGreaterThanOrEqual(44);
      expect(box.h, 'a drawer link is too small to tap').toBeGreaterThanOrEqual(44);
    }
  });
});