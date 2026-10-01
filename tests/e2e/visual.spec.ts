import { test, expect, type Page } from '@playwright/test';

/**
 * Layout integrity — the checks a screenshot baseline cannot make for you.
 *
 * There are deliberately no `toHaveScreenshot()` assertions here: the baselines
 * under `tests/e2e/__screenshots__/` do not exist for the current design, so a
 * pixel diff against them would either be skipped or be noise. Instead these
 * tests measure geometry, which is what actually breaks: a section that never
 * renders, a hero that collapses to zero height, an image that 404s into an
 * empty box, a header that lands on top of the content, or a layout that starts
 * forcing a horizontal scrollbar at 1024px.
 *
 * "Unclipped" matters. The design uses deliberate full-bleed imagery and
 * horizontally scrollable code/table blocks, so an element may legitimately poke
 * past the viewport as long as an ancestor clips it. Overflow that escapes every
 * ancestor is what breaks a page.
 */

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'laptop', width: 1024, height: 768 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'phone', width: 390, height: 844 },
] as const;

const LAYOUT_PAGES = [
  '/',
  '/products',
  '/products/chat-digest',
  '/services',
  '/team',
  '/mission',
  '/careers',
  '/contact',
  '/blog',
  '/blog/ai-agent-orchestration-architecture',
  '/docs',
  '/privacy-policy',
] as const;

/** The homepage's anchorable, content-bearing beats. */
const HOME_SECTIONS = ['#pillars', '#prototypes', '#sector-ledger', '#operating-rituals', '#closing-dispatch'] as const;

const FOOTER = '[data-testid="footer-organism"]';
const HEADER = 'header[data-testid="header-organism"]';
const NAV = 'nav[aria-label="Main Navigation"]';
/** The first `hidden lg:flex` row of the nav is the link list, not the CTA row. */
const NAV_ROW = `${NAV} div.hidden.lg\\:flex >> nth=0`;

/** Walks to `<html>` and reports page-level horizontal scroll + unclipped bleed. */
async function measureOverflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const clippedByAncestor = (el: Element) => {
      let node: Element | null = el.parentElement;
      while (node && node !== doc) {
        if (getComputedStyle(node).overflowX !== 'visible') return true;
        node = node.parentElement;
      }
      return false;
    };

    const escaping: string[] = [];
    document
      .querySelectorAll('h1,h2,h3,h4,p,a,button,img,input,textarea,select,nav,main,footer,li,table,code,pre')
      .forEach((el) => {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return;
        const box = el.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) return;
        if (clippedByAncestor(el)) return;
        if (box.right > window.innerWidth + 1 || box.left < -1) {
          const id = el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`;
          escaping.push(`${id} [${Math.round(box.left)}..${Math.round(box.right)}]`);
        }
      });

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      innerWidth: window.innerWidth,
      escaping,
    };
  });
}

async function openAt(page: Page, path: string, width: number, height: number) {
  await page.setViewportSize({ width, height });
  await page.goto(path);
  await expect(page.locator('#main-content').first()).toBeVisible();
  await page.waitForLoadState('domcontentloaded');
}

test.describe('no horizontal overflow', () => {
  for (const vp of VIEWPORTS) {
    for (const path of LAYOUT_PAGES) {
      test(`${path} does not scroll sideways at ${vp.width}px`, async ({ page }) => {
        await openAt(page, path, vp.width, vp.height);
        const m = await measureOverflow(page);
        expect(
          m.scrollWidth,
          `${path} forces a horizontal scrollbar at ${vp.width}px (scrollWidth ${m.scrollWidth} > ${m.clientWidth})`,
        ).toBeLessThanOrEqual(m.clientWidth + 1);
      });
    }
  }

  test('no unclipped element escapes the viewport at any breakpoint', async ({ page }) => {
    for (const vp of VIEWPORTS) {
      for (const path of LAYOUT_PAGES) {
        await openAt(page, path, vp.width, vp.height);
        const m = await measureOverflow(page);
        expect(
          m.escaping,
          `${path} at ${vp.width}px: these elements escape every clipping ancestor`,
        ).toEqual([]);
      }
    }
  });
});

test.describe('the shell never sits on top of the content', () => {
  for (const vp of VIEWPORTS) {
    test(`header, main and footer stack without overlap at ${vp.width}px`, async ({ page }) => {
      await openAt(page, '/', vp.width, vp.height);

      const header = await page.locator(HEADER).boundingBox();
      const main = await page.locator('#main-content').first().boundingBox();
      const footer = await page.locator(FOOTER).boundingBox();

      expect(header, `no header box at ${vp.width}px`).not.toBeNull();
      expect(main, `no main box at ${vp.width}px`).not.toBeNull();
      expect(footer, `no footer box at ${vp.width}px`).not.toBeNull();

      expect(header!.height).toBeGreaterThan(0);
      expect(main!.height).toBeGreaterThan(0);
      expect(footer!.height).toBeGreaterThan(0);

      // 1px of tolerance for sub-pixel rounding only.
      expect(header!.y + header!.height, `header overlaps main at ${vp.width}px`).toBeLessThanOrEqual(
        main!.y + 1,
      );
      expect(main!.y + main!.height, `main overlaps footer at ${vp.width}px`).toBeLessThanOrEqual(
        footer!.y + 1,
      );
      expect(footer!.y + footer!.height).toBeLessThanOrEqual(vp.height * 100);
    });
  }

  test('the header stays pinned to the top after a long scroll', async ({ page }) => {
    for (const vp of VIEWPORTS) {
      await openAt(page, '/', vp.width, vp.height);
      await page.evaluate(() => window.scrollTo(0, 3000));
      await expect
        .poll(() => page.evaluate(() => window.scrollY), { message: 'the page never scrolled' })
        .toBeGreaterThan(500);

      const header = await page.locator(HEADER).boundingBox();
      expect(header!.y, `the header unsticks at ${vp.width}px`).toBeLessThanOrEqual(1);
      expect(header!.width).toBeLessThanOrEqual(vp.width + 1);
    }
  });

  test('the nav pill never exceeds the viewport width', async ({ page }) => {
    for (const vp of VIEWPORTS) {
      await openAt(page, '/', vp.width, vp.height);
      // The pill is the header's flex wrapper around the nav.
      const pill = await page.locator(NAV).locator('..').boundingBox();
      expect(pill, `no nav box at ${vp.width}px`).not.toBeNull();
      expect(pill!.width).toBeLessThanOrEqual(vp.width);
      expect(pill!.x).toBeGreaterThanOrEqual(0);
      expect(pill!.x + pill!.width).toBeLessThanOrEqual(vp.width + 1);
      expect(pill!.height, `the nav pill collapsed at ${vp.width}px`).toBeGreaterThanOrEqual(60);
    }
  });
});

test.describe('responsive navigation mode', () => {
  test('the desktop nav and the hamburger are never shown together', async ({ page }) => {
    for (const vp of VIEWPORTS) {
      await openAt(page, '/', vp.width, vp.height);

      const desktopVisible = await page.locator(NAV_ROW).isVisible();
      const hamburgerVisible = await page.locator('#mobile-menu-toggle').isVisible();

      expect(desktopVisible, `desktop nav hidden at ${vp.width}px`).toBe(vp.width >= 1024);
      expect(hamburgerVisible, `hamburger state wrong at ${vp.width}px`).toBe(vp.width < 1024);
      expect(
        desktopVisible && hamburgerVisible,
        `both navigation modes are offered at ${vp.width}px`,
      ).toBe(false);
    }
  });

  test('the mobile drawer opens inside the viewport at every phone width', async ({ page }) => {
    for (const vp of VIEWPORTS.filter((v) => v.width < 1024)) {
      await openAt(page, '/', vp.width, vp.height);
      await page.locator('#mobile-menu-toggle').click();

      const drawer = page.locator('#mobile-menu');
      await expect(drawer).toBeVisible();

      const box = await drawer.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width, `drawer overflows at ${vp.width}px`).toBeLessThanOrEqual(vp.width);
      expect(box!.width).toBeGreaterThan(vp.width * 0.6);
      expect(box!.height).toBeGreaterThan(0);
    }
  });
});

test.describe('content is actually rendered', () => {
  for (const path of LAYOUT_PAGES) {
    test(`${path} renders a sized, visible main region and heading`, async ({ page }) => {
      await openAt(page, path, 1440, 900);

      const main = await page.locator('#main-content').first().boundingBox();
      expect(main, `${path} has no visible main region`).not.toBeNull();
      expect(main!.height, `${path} rendered an empty main region`).toBeGreaterThan(200);
      expect(main!.width).toBeLessThanOrEqual(1440);

      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1, `${path} has no visible h1`).toHaveCount(1);
      const h1Box = await h1.boundingBox();
      expect(h1Box, `${path} h1 has no box`).not.toBeNull();
      expect(h1Box!.width).toBeGreaterThan(20);
      expect(h1Box!.height).toBeGreaterThan(10);
      expect(h1Box!.y).toBeGreaterThanOrEqual(0);
      expect(h1Box!.y + h1Box!.height).toBeLessThanOrEqual(main!.y + main!.height);

      const footer = await page.locator(FOOTER).boundingBox();
      expect(footer!.height, `${path} rendered a collapsed footer`).toBeGreaterThan(100);
    });
  }

  test('every homepage beat occupies real space at every breakpoint', async ({ page }) => {
    for (const vp of VIEWPORTS) {
      await openAt(page, '/', vp.width, vp.height);
      for (const selector of HOME_SECTIONS) {
        const section = page.locator(selector);
        await expect(section, `${selector} is missing at ${vp.width}px`).toHaveCount(1);

        const box = await section.boundingBox();
        expect(box, `${selector} has no box at ${vp.width}px`).not.toBeNull();
        expect(box!.width, `${selector} collapsed horizontally at ${vp.width}px`).toBeGreaterThan(100);
        expect(box!.height, `${selector} collapsed vertically at ${vp.width}px`).toBeGreaterThan(120);
        expect(box!.x + box!.width, `${selector} escapes the viewport at ${vp.width}px`).toBeLessThanOrEqual(
          vp.width + 1,
        );
      }
    }
  });

  test('the document grows taller than the viewport on every long page', async ({ page }) => {
    await openAt(page, '/', 1440, 900);
    expect(await page.evaluate(() => document.body.scrollHeight)).toBeGreaterThan(2000);

    await openAt(page, '/blog/ai-agent-orchestration-architecture', 1440, 900);
    expect(await page.evaluate(() => document.body.scrollHeight)).toBeGreaterThan(2000);
  });
});

test.describe('media is really loaded', () => {
  for (const path of LAYOUT_PAGES) {
    test(`${path} renders every image with real pixels`, async ({ page }) => {
      await openAt(page, path, 1440, 900);

      const images = await page.locator('img').evaluateAll((els) =>
        els.map((el) => {
          const img = el as HTMLImageElement;
          return {
            src: img.getAttribute('src'),
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            width: Math.round(img.getBoundingClientRect().width),
            height: Math.round(img.getBoundingClientRect().height),
          };
        }),
      );

      expect(images.length, `${path} rendered no images`).toBeGreaterThan(0);
      for (const img of images) {
        expect(img.complete, `${path}: ${img.src} never finished loading`).toBe(true);
        expect(img.naturalWidth, `${path}: ${img.src} decoded to zero intrinsic width`).toBeGreaterThan(0);
        expect(img.naturalHeight, `${path}: ${img.src} decoded to zero intrinsic height`).toBeGreaterThan(0);
        expect(img.width, `${path}: ${img.src} collapsed to zero width on screen`).toBeGreaterThan(0);
        expect(img.height, `${path}: ${img.src} collapsed to zero height on screen`).toBeGreaterThan(0);
      }
    });
  }

  test('no request for a local asset 404s', async ({ page }) => {
    const failures: string[] = [];
    page.on('response', (res) => {
      if (res.status() >= 400 && !res.url().includes('/api/')) failures.push(`${res.status()} ${res.url()}`);
    });

    await openAt(page, '/', 1440, 900);
    await page.waitForLoadState('networkidle');
    expect(failures, 'the homepage requests a missing asset').toEqual([]);
  });
});

test.describe('both themes lay out identically', () => {
  for (const path of ['/', '/services', '/contact', '/docs']) {
    test(`${path} keeps the same geometry in light and dark`, async ({ page, context }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(path);
      await expect(page.locator('#main-content').first()).toBeVisible();
      const dark = await page.evaluate(() => {
        const m = document.querySelector('#main-content')!.getBoundingClientRect();
        return { mainHeight: Math.round(m.height), scrollWidth: document.documentElement.scrollWidth };
      });

      const fresh = await context.browser()!.newContext();
      const lightPage = await fresh.newPage();
      await lightPage.addInitScript(() => {
        try {
          localStorage.setItem('norai_theme', 'light');
        } catch {
          /* private mode */
        }
      });
      await lightPage.goto(path);
      await expect(lightPage.locator('#main-content').first()).toBeVisible();
      await expect(lightPage.locator('html')).not.toHaveClass(/\bdark\b/);

      const light = await lightPage.evaluate(() => {
        const m = document.querySelector('#main-content')!.getBoundingClientRect();
        return { mainHeight: Math.round(m.height), scrollWidth: document.documentElement.scrollWidth };
      });
      await fresh.close();

      expect(light.mainHeight, `${path} reflows between themes`).toBeCloseTo(dark.mainHeight, -1);
      expect(light.scrollWidth, `${path} overflows sideways only in light mode`).toBeLessThanOrEqual(
        dark.scrollWidth + 1,
      );
    });
  }
});