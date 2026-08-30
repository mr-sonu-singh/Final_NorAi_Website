# NorAI Website — Next-Level Improvement Plan

> **Created**: 2026-08-30  
> **Purpose**: Session-by-session execution plan for targeted site improvements.  
> **Usage**: Copy the relevant `SESSION` block into a new AI thread. Each session is self-contained with full context, file paths, skills to invoke, and acceptance criteria.  
> **Status Legend**: `[ ]` Not started · `[/]` In progress · `[x]` Complete

---

## Master Checklist

| # | Session | Priority | Est. Scope | Status |
|---|---------|----------|------------|--------|
| 1 | RSC Fix — `/pricing` Route | 🔴 Critical | ~3 files | `[x]` |
| 2 | SEO Metadata — All Marketing Pages | 🔴 Critical | ~6 files | `[x]` |
| 3 | JSON-LD Structured Data Expansion | 🔴 Critical | ~4 files | `[x]` |
| 4 | Animation System Upgrade | 🟡 High | ~8 files | `[x]` |
| 5 | View Transitions (Route Changes) | 🟡 High | ~3 files | `[x]` |
| 6 | Visual & UI Polish Pass | 🟡 High | ~6 files | `[x]` |
| 7 | Typography & Layout Tightening | 🟡 Medium | ~5 files | `[x]` |
| 8 | Accessibility Hardening | 🟢 Medium | ~6 files | `[x]` |
| 9 | Performance & Core Web Vitals | 🟢 Medium | ~5 files | `[x]` |
| 10 | Security Headers & Hardening | 🟢 Medium | ~3 files | `[x]` |
| 11 | Test Suite Foundation | 🟢 Low | ~8 files (new) | `[x]` |
| 12 | Conversion & Content Optimization | 🔵 Low | ~4 files | `[x]` |

---

## SESSION 1 — RSC Fix: `/pricing` Route

### Context
The `/pricing` page (`app/(marketing)/pricing/page.tsx`) starts with `'use client'` at line 1. This **violates** the project's anti-goal rule in `PRODUCT.md` and `AGENTS.md`: _"No root `'use client'` on marketing pages."_ It also blocks `export const metadata` (Next.js requires metadata exports in Server Components), meaning `/pricing` has **zero SEO metadata**.

### Prompt to Paste in New Thread
```
Read PRODUCT.md, DESIGN.md, and AGENTS.md for project context.

Fix the RSC violation on `/pricing`. The file `app/(marketing)/pricing/page.tsx` starts with 'use client' which violates our anti-goal rules and blocks metadata export.

Tasks:
1. Extract the interactive pricing toggle (useState for annual/monthly switching) into a new client leaf component at `app/(marketing)/pricing/PricingToggleClient.tsx`.
2. Extract the ComparisonTable import into the client leaf if it requires interactivity.
3. Convert `app/(marketing)/pricing/page.tsx` to a pure React Server Component (remove 'use client').
4. Add `export const metadata = buildMetadata({ path: '/pricing', title: 'Pricing & Plans', description: 'Transparent pricing tiers for NorAI micro-SaaS tools...' })` to the page.
5. Verify with `npx tsc --noEmit` and `npm run build`.

Skills to use: vercel-react-best-practices, landing-page-design
```

### Files Involved
- `app/(marketing)/pricing/page.tsx` — Convert to RSC
- `app/(marketing)/pricing/PricingToggleClient.tsx` — **NEW** client leaf
- `lib/seo/metadata.ts` — Reference for `buildMetadata()`

### Acceptance Criteria
- [x] `page.tsx` has no `'use client'` directive
- [x] `page.tsx` exports `metadata` via `buildMetadata()`
- [x] Interactive pricing toggle works identically to current behavior
- [x] `npx tsc --noEmit` passes
- [x] `npm run build` succeeds

---

## SESSION 2 — SEO Metadata on All Marketing Pages

### Context
Multiple marketing pages are missing `export const metadata` calls. The site has a `buildMetadata()` utility in `lib/seo/metadata.ts` that generates proper `<title>`, Open Graph, Twitter Card, and canonical URL metadata. Pages like `/about` and `/contact` already use it correctly. The following pages do **not**:

- `app/(marketing)/page.tsx` (homepage) — no page-level metadata override
- `app/(marketing)/products/page.tsx` — no metadata at all
- `app/(marketing)/services/page.tsx` — no metadata at all
- `app/(marketing)/pricing/page.tsx` — blocked by `'use client'` (fix in Session 1 first)
- `app/(marketing)/blog/page.tsx` — verify if present
- `app/(marketing)/careers/page.tsx` — verify if present

### Prompt to Paste in New Thread
```
Read PRODUCT.md for product context and lib/seo/metadata.ts for the buildMetadata() utility.

Add proper SEO metadata exports to all marketing pages that are missing them.

For each page, add:
export const metadata = buildMetadata({
  path: '<route>',
  title: '<descriptive title>',
  description: '<compelling 150-char description>',
});

Pages to fix:
1. app/(marketing)/page.tsx — homepage (title: 'AI That Actually Works', path: '/')
2. app/(marketing)/products/page.tsx — products catalog
3. app/(marketing)/services/page.tsx — enterprise services
4. app/(marketing)/pricing/page.tsx — pricing (only if Session 1 is complete)
5. Audit app/(marketing)/blog/page.tsx and app/(marketing)/careers/page.tsx

Write descriptions that are specific to NorAI's brand voice: grounded, specific, no buzzwords. Reference PRODUCT.md Section 4 for tone guidelines.

Verify with: npm run build
Skills to use: landing-page-design, performance-optimization
```

### Files Involved
- `app/(marketing)/page.tsx`
- `app/(marketing)/products/page.tsx`
- `app/(marketing)/services/page.tsx`
- `app/(marketing)/pricing/page.tsx` (after Session 1)
- `app/(marketing)/blog/page.tsx`
- `app/(marketing)/careers/page.tsx`

### Acceptance Criteria
- [x] Every marketing page exports `metadata` via `buildMetadata()`
- [x] Titles are unique per page and include "NorAI Technologies" suffix
- [x] Descriptions are 120–160 characters, compelling, and brand-aligned
- [x] Canonical URLs are correct
- [x] `npm run build` succeeds

---

## SESSION 3 — JSON-LD Structured Data Expansion

### Context
The current `lib/seo/jsonld.ts` has only a minimal 7-line `Organization` schema. Rich structured data significantly boosts search visibility. The site has 4 products, enterprise services, an FAQ page, and a physical location in Uttar Pradesh, India.

### Prompt to Paste in New Thread
```
Read PRODUCT.md for the full product taxonomy and lib/seo/jsonld.ts for the existing implementation.

Expand the JSON-LD structured data system:

1. In lib/seo/jsonld.ts, add factory functions for:
   - WebSite (with SearchAction for site search)
   - SoftwareApplication (one per product: Resume Shortlister, Course Note-Taker, Chat Digest, Smart Dainik News — use data from PRODUCT.md Section 3A)
   - Service (for enterprise offerings from PRODUCT.md Section 3B)
   - FAQPage (for the /faq route)
   - BreadcrumbList (for navigation hierarchy)
   - LocalBusiness (NorAI Technologies, Uttar Pradesh, India)

2. Inject the JSON-LD into relevant pages:
   - app/layout.tsx — Organization + WebSite
   - app/(marketing)/page.tsx — Organization (homepage)
   - app/(marketing)/products/[slug]/page.tsx — SoftwareApplication per product
   - app/(content)/faq/page.tsx — FAQPage
   - app/(marketing)/services/page.tsx — Service

Use this pattern for injection:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

Verify with: npm run build and Google Rich Results Test validator mentally.
Skills to use: landing-page-design
```

### Files Involved
- `lib/seo/jsonld.ts` — Expand with new schema factories
- `app/layout.tsx` — Inject Organization + WebSite
- `app/(marketing)/products/[slug]/page.tsx` — Product schemas
- `app/(content)/faq/page.tsx` — FAQ schema
- `app/(marketing)/services/page.tsx` — Service schema

### Acceptance Criteria
- [x] 6+ JSON-LD schema types implemented
- [x] Each factory function is type-safe
- [x] Schemas are injected into correct pages
- [x] Output validates against schema.org specifications
- [x] `npm run build` succeeds

---

## SESSION 4 — Animation System Upgrade

### Context
The current animation system in `components/foundation/AnimatedSection.tsx` provides only `opacity + translateY` scroll reveals with a single easing curve. The site uses Framer Motion (`framer-motion@^12`). The design system specifies `cubic-bezier(0.16, 1, 0.3, 1)` easing and `prefers-reduced-motion` compliance.

### Prompt to Paste in New Thread
```
Read DESIGN.md Section 6 (Motion & Animation Tokens) and components/foundation/AnimatedSection.tsx for the existing animation primitives.

Build an expanded motion system with these new reusable components:

1. components/foundation/TextReveal.tsx — Split headline text into words/characters with staggered spring animation on scroll. Props: text, splitBy ('word' | 'char'), stagger, tag.

2. components/foundation/CountUp.tsx — Animate numbers from 0 to target value on scroll into view. Props: value, prefix, suffix, duration. Must use tabular-nums font-variant.

3. components/foundation/DrawLine.tsx — SVG line/path that draws itself on scroll. For use in ConnectedPipelineRail section.

4. components/foundation/CrossFade.tsx — Content crossfade wrapper for tab/panel switching with layout animation.

5. Update components/foundation/index.ts barrel export.

Integration targets (implement at least 2):
- Homepage hero h1: Replace static text with TextReveal word-split
- Trust telemetry strip: Add CountUp to the "< 0.35s" metric
- Bento product cards: Add subtle hover micro-interaction (inner glow shift)

Rules:
- All animations MUST respect prefers-reduced-motion (render static fallback)
- Use the project's easing curve: cubic-bezier(0.16, 1, 0.3, 1)
- Import from 'framer-motion' (already in package.json)
- Keep components as 'use client' leaf components
- Duration tokens: micro 150-200ms, transitions 300-400ms, stagger 50ms

PRIMARY skill: animate (read this first — it's your decision framework for motion)
SECONDARY skill: emil-design-eng (read only for micro-interaction taste checks)
Do NOT load impeccable — it overlaps with animate and will bloat context.
```

### Files Involved
- `components/foundation/TextReveal.tsx` — **NEW**
- `components/foundation/CountUp.tsx` — **NEW**
- `components/foundation/DrawLine.tsx` — **NEW**
- `components/foundation/CrossFade.tsx` — **NEW**
- `components/foundation/index.ts` — Update exports
- `app/(marketing)/page.tsx` — Integrate TextReveal, CountUp
- `components/organisms/ConnectedPipelineRail/` — Integrate DrawLine
- `components/organisms/HeroWorkbench/` — Hover micro-interactions

### Acceptance Criteria
- [x] 4 new animation primitives created
- [x] All respect `prefers-reduced-motion`
- [x] At least 2 integrated into actual pages
- [x] Easing curve matches design system
- [x] No layout shift during animations (CLS = 0)
- [x] `npx tsc --noEmit` passes

---

## SESSION 5 — View Transitions for Route Changes

### Context
The site runs Next.js 15.5.21 with React 19. Route navigation is currently an abrupt hard-cut with no visual transition. React 19 supports the View Transition API via `<ViewTransition>` component and `addTransitionType`.

### Prompt to Paste in New Thread
```
Read the vercel-react-view-transitions skill for implementation guidance.

Check if next@15.5.21 supports React View Transitions natively. If so:

1. Wrap the marketing layout (app/(marketing)/layout.tsx) content in <ViewTransition>.
2. Add crossfade transition CSS in globals.css using ::view-transition-old and ::view-transition-new pseudo-elements.
3. Add directional transitions (slide-left for forward nav, slide-right for back nav) using addTransitionType.
4. Ensure transitions are disabled under prefers-reduced-motion.

If View Transitions aren't stable in this Next.js version, implement a simpler Framer Motion AnimatePresence wrapper around the layout children with opacity crossfade.

Duration: 200-300ms (match design system --duration-normal: 300ms).
Easing: cubic-bezier(0.16, 1, 0.3, 1).

PRIMARY skill: vercel-react-view-transitions (read this first — it's the implementation guide)
SECONDARY skill: animate (read only Section on easing curves and duration tokens)
These two don't conflict — one covers route transitions, the other covers element motion.
```

### Files Involved
- `app/(marketing)/layout.tsx` — Add ViewTransition wrapper
- `app/globals.css` — Add view-transition CSS rules
- `app/layout.tsx` — Possibly adjust for transition support

### Acceptance Criteria
- [x] Route changes have smooth visual transition
- [x] Forward/back navigation has directional animation
- [x] `prefers-reduced-motion` disables transitions
- [x] No flash of unstyled content during transition
- [x] `npm run build` succeeds

---

## SESSION 6 — Visual & UI Polish Pass

### Context
The site uses the "Parchment & Terracotta" design system (DESIGN.md). The structure is solid, but several areas need polish to feel premium rather than functional. The homepage has 8 sections. Key components: bento product grid, trust strip, pipeline rail, pull-quote, pre-footer CTA.

### Prompt to Paste in New Thread
```
Read DESIGN.md for the full token system and PRODUCT.md Section 4 for brand aesthetics.

Perform a visual polish pass on these specific areas:

1. Homepage Bento Grid (app/(marketing)/page.tsx, lines ~149-323):
   - The hero product card (Resume Shortlister, md:col-span-7) should have a subtle distinction from the other 3 cards — add a faint terracotta gradient wash on the top edge or a slightly thicker left border in accent-500
   - Each product category badge should use its designated color: Terracotta for Recruitment, Goldenrod for EdTech, Terracotta for Community, Sage for Regional Intelligence (currently some use generic accent-50)

2. Editorial Pull-Quote (lines ~353-365):
   - Add large decorative opening quotation mark in Instrument Serif (e.g., a giant "  positioned absolutely, text-8xl, text-accent-100 opacity)
   - Add hairline dividers above and below the quote block
   - Consider a subtle warm background tint

3. CandidateScreenerWorkbench (components/organisms/HeroWorkbench/CandidateScreenerWorkbench.tsx):
   - Add a faux macOS-style window chrome bar at the top (3 dots: red/yellow/green, title bar text)
   - Add a subtle ambient glow/shadow behind the workbench card to make it "float" off the page

4. Trust Telemetry Strip (lines ~100-129):
   - Add a subtle repeating dot pattern or noise texture to differentiate it from plain sections
   - Or use a very faint horizontal hairline gradient

Use only design system tokens — no arbitrary hex values.
PRIMARY skill: impeccable (read this first — it's the master UI review framework)
SECONDARY skill: better-ui (read only for specific component polish patterns like concentric radius, optical alignment)
Do NOT load high-end-visual-design, tastemaker, or emil-design-eng simultaneously — they overlap with impeccable and will cause contradictory advice. Impeccable alone covers 90% of what they offer.
```

### Files Involved
- `app/(marketing)/page.tsx` — Bento grid + pull-quote + trust strip
- `components/organisms/HeroWorkbench/CandidateScreenerWorkbench.tsx` — Window chrome
- `app/globals.css` — New utility classes if needed

### Acceptance Criteria
- [x] Resume Shortlister card is visually distinct as the hero product
- [x] Product category badges use their designated palette colors
- [x] Pull-quote has editorial decorative treatment
- [x] Workbench has window chrome and ambient glow
- [x] No arbitrary hex values introduced (tokens only)
- [x] Visual verification via Chrome DevTools screenshot at 1440×900

---

## SESSION 7 — Typography & Layout Tightening

### Context
The design system in DESIGN.md defines precise typography scales, tracking values, and spacing tokens. Some areas of the site use approximate values instead of exact tokens.

### Prompt to Paste in New Thread
```
Read DESIGN.md Section 3 (Typography Architecture) and Section 2 (Color Palette).

Audit and fix typography/layout precision:

1. Typography alignment:
   - Verify homepage hero h1 tracking matches DESIGN.md spec (-0.02em). Currently uses Tailwind's tracking-tight (-0.025em). May need a custom utility.
   - Body paragraphs use text-lg/text-xl with abrupt breakpoint jump. Replace with fluid clamp: font-size: clamp(1.125rem, 1rem + 0.5vw, 1.25rem)
   - Monospace badges use hardcoded text-[11px]. Replace with text-[0.6875rem] or create a --text-badge-size token.
   - Pull-quote should use proper OpenType curly quotes (" ") not straight quotes

2. Layout tightening (Gestalt Proximity):
   - Bento grid: Consider gap-5 (20px) instead of gap-6 (24px) for tighter card grouping
   - Hero CTA button pair: gap-3 instead of gap-4 to reduce decision friction
   - Trust badges row: gap-4 instead of gap-6 for tighter secondary info grouping

3. Add fluid typography utility to globals.css if not present:
   .fluid-body { font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }
   .fluid-lead { font-size: clamp(1.125rem, 1rem + 0.5vw, 1.25rem); }

PRIMARY skill: better-typography (read this first — it drives all type scale and tracking fixes)
SECONDARY skill: better-layout (read for spacing/grouping rules only)
Do NOT load perception-laws — its Gestalt principles are already summarized in the prompt. Loading the full skill would add ~4KB of theoretical content that dilutes the practical tasks.
```

### Files Involved
- `app/(marketing)/page.tsx` — Typography + spacing fixes
- `app/globals.css` — Fluid typography utilities + token fixes
- `components/foundation/Heading.tsx` — Verify tracking values
- `components/foundation/Text.tsx` — Verify size scale

### Acceptance Criteria
- [x] Tracking values match DESIGN.md exactly
- [x] Body text uses fluid clamp scaling (no abrupt jumps)
- [x] Badge font sizes use tokens, not arbitrary pixel values
- [x] Pull-quote uses typographic curly quotes
- [x] Layout gaps are tightened per Gestalt Proximity principles
- [x] `npx tsc --noEmit` passes

---

## SESSION 8 — Accessibility Hardening

### Context
The site has good accessibility foundations: skip-to-content link, `focus-visible` rings, `aria-label` on nav, `prefers-reduced-motion` CSS. Gaps exist in focus trapping, ARIA live regions, semantic HTML, and contrast verification.

### Prompt to Paste in New Thread
```
Read DESIGN.md Section 4 (Focus System) and Section 5 (5-State Ergonomics).

Perform an accessibility hardening pass:

1. Mobile menu focus trap (components/organisms/sections/Header/Header.tsx):
   - Currently handles Escape key but doesn't trap Tab focus within the menu
   - Implement full focus trapping: Tab should cycle within mobile menu items when open
   - Add aria-live="polite" announcement when menu opens/closes

2. Semantic HTML fixes (app/(marketing)/page.tsx):
   - Bento product cards are <div> — convert to <article> with proper heading hierarchy
   - Trust telemetry strip should be wrapped in <aside aria-label="Platform metrics">
   - Pre-footer CTA section should use <aside> with role="complementary"

3. Color contrast verification:
   - Check text-ink-secondary (#6B7B8D) on bg-canvas-recessed (#EDE7DF) — calculate contrast ratio
   - Check font-mono badge text text-[11px] at those colors — small text needs 4.5:1 minimum (WCAG AA)
   - If any fail, adjust the muted ink color to meet WCAG AAA (7:1)

4. ARIA live regions for workbenches:
   - When CandidateScreenerWorkbench processes a resume, announce results to screen readers
   - Add aria-live="polite" region for status updates

5. Mobile menu animation:
   - The class animate-in slide-in-from-top-2 is not a standard Tailwind class — verify it works or replace with Framer Motion AnimatePresence

PRIMARY skill: better-accessibility (read this first — it's the accessibility authority)
Do NOT load impeccable — this session is purely about a11y, not visual polish. Impeccable's visual opinions would dilute focus.
```

### Files Involved
- `components/organisms/sections/Header/Header.tsx` — Focus trap + ARIA
- `app/(marketing)/page.tsx` — Semantic HTML
- `app/globals.css` — Contrast adjustments if needed
- `components/organisms/HeroWorkbench/CandidateScreenerWorkbench.tsx` — ARIA live
- `components/organisms/tools/ResumeShortlisterWorkbench.tsx` — ARIA live

### Acceptance Criteria
- [x] Mobile menu has full Tab focus trapping
- [x] Bento cards use `<article>` with heading hierarchy
- [x] All text/background combos meet WCAG AAA (7:1 contrast)
- [x] Workbench state changes are announced via `aria-live`
- [x] Mobile menu animation uses a verified animation approach
- [x] Keyboard-only navigation works end-to-end on homepage

---

## SESSION 9 — Performance & Core Web Vitals

### Context
The site uses Next.js 15 App Router, React 19, Tailwind v4, and Framer Motion (~80KB gzipped). 3 Google Fonts are loaded. No `next/image` is used (all visuals are SVG/CSS).

### Prompt to Paste in New Thread
```
Read package.json for dependencies and app/layout.tsx for font loading.

Optimize performance and Core Web Vitals:

1. Framer Motion tree-shaking:
   - All imports currently use 'framer-motion'. Switch to 'motion/react' (the tree-shakeable import) across all files.
   - Grep for: import { ... } from 'framer-motion' and replace with 'motion/react'
   - Files to check: components/foundation/AnimatedSection.tsx, components/organisms/HeroWorkbench/*.tsx, all workbench tools in components/organisms/tools/*.tsx

2. Lazy load below-fold animations:
   - The homepage has 8 sections. Only Section 1 (hero) needs animations on initial load.
   - Sections 3-8 can use dynamic(() => import(...), { ssr: false }) for their AnimatedSection wrappers, or rely on IntersectionObserver-based loading.

3. Font subsetting:
   - JetBrains Mono is loaded with full Latin subset but only used for technical readouts (numbers, short labels)
   - Add specific unicodeRange to limit the font file: numbers (0-9), punctuation (<>./,), and letters (a-z, A-Z)

4. Bundle analysis:
   - Run: ANALYZE=true npm run build (if @next/bundle-analyzer is installed, otherwise install it)
   - Identify the largest client-side chunks
   - Report findings

5. Static generation verification:
   - All marketing pages should be statically generated at build time
   - Verify no pages are accidentally server-rendered on each request

Skills to use: performance-optimization, vercel-react-best-practices
```

### Files Involved
- All files importing `framer-motion` (~10+ files)
- `app/layout.tsx` — Font configuration
- `next.config.ts` — Bundle analyzer config
- `app/(marketing)/**` — Static generation verification

### Acceptance Criteria
- [x] All Framer Motion imports use `motion/react`
- [x] JetBrains Mono font file size reduced via unicode subsetting & explicit weights
- [x] Bundle size report generated
- [x] All marketing pages are statically generated
- [x] Lighthouse Performance score ≥ 95
- [x] `npm run build` succeeds with no warnings

---

## SESSION 10 — Security Headers & Hardening

### Context
The site uses `nodemailer` for the contact form, has a `.env` file (68 bytes), and server actions for form submission. The `next.config.ts` currently has no security headers.

### Prompt to Paste in New Thread
```
Read next.config.ts and app/actions/ for server-side code.

Add security hardening:

1. Security headers in next.config.ts:
   - Content-Security-Policy (strict, allow Google Fonts and own domain)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security: max-age=31536000; includeSubDomains
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: camera=(), microphone=(), geolocation=()

2. Contact form hardening (app/actions/):
   - Verify Zod validation on all form inputs
   - Add rate limiting (simple in-memory or use headers-based approach)
   - Sanitize HTML/script injection in form fields
   - Verify nodemailer config doesn't expose SMTP credentials client-side

3. Environment variable audit:
   - Read .env and .env.example
   - Verify no NEXT_PUBLIC_ variables expose sensitive data
   - Ensure .env is in .gitignore

Skills to use: security-and-hardening
```

### Files Involved
- `next.config.ts` — Security headers
- `app/actions/` — Form submission hardening
- `.env` / `.env.example` — Variable audit
- `.gitignore` — Verify .env exclusion

### Acceptance Criteria
- [x] 6+ security headers configured in next.config.ts
- [x] Contact form validates and sanitizes all inputs
- [x] Rate limiting on form submission
- [x] No sensitive variables exposed client-side
- [x] `.env` is gitignored
- [x] `npm run build` succeeds

---

## SESSION 11 — Test Suite Foundation

### Context
Only 1 test file exists: `tests/phase7-verification.test.tsx` (3.6KB). The project has no Playwright, no component tests, and no automated accessibility checks.

### Prompt to Paste in New Thread
```
Read package.json for existing test dependencies and tests/ for existing tests.

Set up a foundational test suite:

1. Install Playwright:
   npx -y playwright install --with-deps chromium

2. Create Playwright config: playwright.config.ts

3. Create these test files:
   a. tests/e2e/seo.spec.ts — For each marketing page, verify:
      - <title> tag exists and is unique
      - <meta name="description"> exists
      - <link rel="canonical"> exists
      - JSON-LD script tags are present
      - Single <h1> per page

   b. tests/e2e/accessibility.spec.ts:
      - Integrate @axe-core/playwright
      - Run accessibility audit on homepage, products, services, pricing, about, contact
      - Verify no critical or serious violations

   c. tests/e2e/navigation.spec.ts:
      - Desktop nav links all resolve (no 404s)
      - Mobile menu opens/closes
      - Skip-to-content link works

   d. tests/e2e/visual.spec.ts:
      - Screenshot each marketing page at 1440x900 and 375x812
      - Store as baseline snapshots in tests/e2e/__screenshots__/

4. Add test scripts to package.json:
   "test:e2e": "playwright test"
   "test:a11y": "playwright test tests/e2e/accessibility.spec.ts"

PRIMARY skill: playwright-best-practices (read this first — it's the implementation guide for all E2E tests)
SECONDARY skill: test-driven-development (read only for test structure philosophy, not for implementation)
Do NOT load better-accessibility — the axe-core integration is already specified in the prompt. Loading the full a11y skill would add unrelated WCAG theory.
```

### Files Involved
- `playwright.config.ts` — **NEW**
- `tests/e2e/seo.spec.ts` — **NEW**
- `tests/e2e/accessibility.spec.ts` — **NEW**
- `tests/e2e/navigation.spec.ts` — **NEW**
- `tests/e2e/visual.spec.ts` — **NEW**
- `package.json` — Add test scripts + devDependencies

### Acceptance Criteria
- [x] Playwright installed and configured
- [x] 4 test files created
- [x] SEO tests pass on all marketing pages
- [x] Accessibility audit reports zero critical violations
- [x] Navigation tests pass (no 404s)
- [x] Visual baseline screenshots generated
- [x] `npm run test:e2e` executes successfully

---

## SESSION 12 — Conversion & Content Optimization

### Context
The site's social proof section says "Trusted by engineering teams..." but provides no concrete numbers, logos, or testimonials. Blog content is hardcoded in `lib/blog.ts`. The `/careers` page exists in navigation but its content quality is unverified.

### Prompt to Paste in New Thread
```
Read PRODUCT.md for brand voice and app/(marketing)/page.tsx for the current homepage.

Improve conversion signals:

1. Social proof strip (homepage Section 2, lines ~100-129):
   - Replace generic "Trusted by..." text with specific metrics
   - Add animated counters: "X+ resumes processed", "Y+ hours saved", "Z+ teams served"
   - If real data isn't available, use realistic placeholder numbers with a TODO comment

2. Pre-footer CTA (homepage Section 8, lines ~370-428):
   - Add a subtle urgency signal: "Early adopter pricing available" or "Limited beta access"
   - Add a micro-testimonial or customer quote if available

3. /careers page audit:
   - Navigate to app/(marketing)/careers/page.tsx
   - Verify it has full editorial treatment matching the site design system
   - Add metadata export if missing
   - Ensure it's linked correctly in Header and Footer navigation

4. Blog system assessment:
   - Read lib/blog.ts and assess whether the hardcoded approach scales
   - If it has <5 posts, it's fine for now — add a TODO comment for future MDX migration
   - If >5, recommend MDX or CMS migration path

Skills to use: landing-page-design, design-taste-frontend
```

### Files Involved
- `app/(marketing)/page.tsx` — Social proof + CTA improvements
- `app/(marketing)/careers/page.tsx` — Audit and fix
- `lib/blog.ts` — Assessment
- `config/navigation.ts` — Verify careers link

### Acceptance Criteria
- [x] Social proof strip has specific, concrete metrics
- [x] Pre-footer CTA has urgency/scarcity signal
- [x] `/careers` page has editorial design + SEO metadata
- [x] Blog system has clear scaling plan documented
- [x] All changes match NorAI brand voice (specific, grounded, no buzzwords)

---

## Quick Reference: Skills Index

| Skill Name | Best Used For | Sessions |
|---|---|---|
| `vercel-react-best-practices` | RSC patterns, Next.js conventions | 1, 9 |
| `landing-page-design` | SEO, conversion, page structure | 2, 3, 12 |
| `performance-optimization` | Core Web Vitals, bundle size | 2, 9 |
| `animate` | Motion primitives, easing | 4, 5 |
| `emil-design-eng` | Micro-interactions, feel | 4, 6 |
| `vercel-react-view-transitions` | Route transitions | 5 |
| `impeccable` | Visual polish, UI review | 6, 8 |
| `better-ui` | Component polish, shadows | 6 |
| `high-end-visual-design` | Premium feel, agency-quality | 6 |
| `tastemaker` | Anti-slop, brand consistency | 6 |
| `better-typography` | Type scale, fluid sizing | 7 |
| `better-layout` | Spacing, grouping, alignment | 7 |
| `perception-laws` | Gestalt, Fitts's, Hick's Law | 7 |
| `better-accessibility` | WCAG, focus, ARIA | 8, 11 |
| `security-and-hardening` | Headers, input validation | 10 |
| `playwright-best-practices` | E2E tests, visual regression | 11 |
| `test-driven-development` | Test structure, coverage | 11 |
| `design-taste-frontend` | Content pages, editorial | 12 |

---

## Notes for Session Execution

1. **Always read context first**: Start each session by reading `PRODUCT.md`, `DESIGN.md`, and `AGENTS.md`
2. **Verify before moving on**: End each session with `npx tsc --noEmit` and `npm run build`
3. **Update this file**: Mark completed sessions with `[x]` in the Master Checklist
4. **Session 1 must complete before Session 2** (pricing metadata depends on RSC fix)
5. **Sessions 4-12 are independent** and can run in any order
6. **Visual verification**: Use Chrome DevTools screenshots at 1440×900 after visual changes

---

## Skill Conflict Prevention Rules

Each session prompt designates skills as **PRIMARY** or **SECONDARY** to prevent conflicts:

1. **Load max 2 skills per session** — a PRIMARY (the authority) and optionally a SECONDARY (supplementary reference). Each skill file is 2–8KB of instructions; loading 3+ visual/design skills simultaneously causes contradictory advice and diluted focus.
2. **PRIMARY = the decision framework** — when in doubt, follow the PRIMARY skill's guidance.
3. **SECONDARY = narrow reference only** — read only the specific section mentioned in the prompt, not the entire skill file.
4. **"Do NOT load" = seriously, skip it** — the prompt already extracts the relevant advice from those skills inline. Loading them would add redundant context that competes with the PRIMARY.

### Why This Matters
- Skills like `impeccable`, `tastemaker`, `high-end-visual-design`, and `emil-design-eng` all target "make UI premium" but from different philosophies. Loading all 4 simultaneously creates ~20KB of competing instructions ("use gradients" vs "stay flat", "add shadows" vs "hairlines only").
- Domain-specific skills like `better-typography`, `better-layout`, `better-accessibility` are **complementary** (different domains) but loading 3+ still wastes context tokens on theory when the prompt already specifies the exact fixes.
- The `PRODUCT.md` and `DESIGN.md` files already serve as the project's ground truth. Skills should **supplement**, not override, those files.
