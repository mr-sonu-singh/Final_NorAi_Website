# NorAI Design System & Visual Specification (`DESIGN.md`)

## 1. Design Ethos & Visual Philosophy

NorAI’s aesthetic signature is **Tactile Warm Parchment meets Precision Instrument Craft**.

We deliberately break away from generic, interchangeable "AI startup templates" (dark neon purple/blue glows, floating glass spheres, and synthetic cyberpunk grids). Instead, our interfaces feel like **physical engineering workbenches, mathematical reference texts, and tactile physical instruments**:

- **Warm Parchment Foundation**: Light, tactile paper base (`--surface-canvas: #F5F0EA`) with layered warm paper surfaces (`--surface-panel: #FAF7F2`), evoking high-grade archival publication stock.
- **Deep Navy Ink**: Crisp, high-contrast ink typography (`--text-primary: #141C2B`) for commanding readability and editorial dignity.
- **Burnt Terracotta Accents**: Warm, energetic terracotta (`--accent-primary: #C85A32`) that draws the eye to high-intent actions without visual exhaustion.
- **Calibrated 1px Hairlines**: Ultra-fine borders (`rgba(20, 28, 43, 0.08)`) that delineate hierarchy with razor-sharp architectural discipline.
- **Exposed Telemetry**: Honest numerical precision, live execution timings, and structured system state rather than decorative obfuscation.

### Core Reference Inspirations

Our visual and ergonomic standards draw inspiration from leading craft benchmarks:
1. **Stripe Press**: High-contrast display serif typography paired with quiet sans-serif metadata, atmospheric color pairings, and calm editorial narrative pacing.
2. **Linear**: Speed as an interaction feature, subtle hairline borders, fluid spring physics, and keyboard-first velocity.
3. **Resend**: Tactile code showcases, tabbed multi-language snippets, instant copy affordances, and zero-friction developer ergonomics.
4. **Teenage Engineering**: Hardware honesty, unadorned technical specifications, tactile controls, and physical instrument feedback.

---

## 2. Semantic Token Architecture

All UI components must derive their visual properties directly from these canonical design tokens defined in `app/globals.css`.

### 2.1 Surfaces & Canvas Neutrals

```css
:root {
  /* Canvas & Base Layers */
  --surface-canvas: #F5F0EA;              /* Warm parchment paper canvas */
  --surface-panel: #FAF7F2;               /* Card and module background */
  --surface-panel-elevated: #FFFFFF;      /* Modals, flyouts, popovers */
  --surface-panel-subtle: #EBE3D8;        /* Inset wells, code blocks, parameter wells */
  --surface-hover: #ECE5DA;               /* Row and item hover tint */
  --surface-active: #E0D5C5;              /* Pressed/active element state */

  /* Dark Contrast Accent (Restricted strictly to the footer and dark code viewports) */
  --surface-dark: #141C2B;
  --surface-dark-elevated: #1F2B3E;

  /* Calibrated Borders & Dividers */
  --border-subtle: rgba(20, 28, 43, 0.08);   /* Standard 1px hairline divider */
  --border-strong: rgba(20, 28, 43, 0.16);   /* Interactive controls, card outlines */
  --border-highlight: rgba(20, 28, 43, 0.32);/* Active states, sticky headers */
}
```

### 2.2 Ink & Foreground Typography

```css
:root {
  --text-primary: #141C2B;                /* Deep navy ink for headings, values, and strong text */
  --text-secondary: #526075;              /* Descriptive body copy, supporting labels */
  --text-muted: #8491A2;                  /* Secondary metadata, line numbers, subtle captions */
  --text-inverse: #F5F0EA;                /* Light parchment text on solid accent/dark surfaces */
}
```

### 2.3 Interactive & Brand Accents

```css
:root {
  /* Primary Terracotta */
  --accent-primary: #C85A32;              /* Burnt terracotta interactive accent */
  --accent-hover: #B54F2A;                /* Terracotta active hover state */
  --accent-subtle: rgba(200, 90, 50, 0.12); /* Terracotta tint for badges/selection */

  /* Secondary & Tertiary Accents */
  --accent-secondary: #5B8A72;            /* Forest Sage telemetry accent */
  --accent-secondary-soft: #E2EDE7;       /* Sage wash background */
  --accent-tertiary: #B8860B;             /* Dark Goldenrod metric accent */
  --accent-tertiary-soft: #FFF4D6;        /* Goldenrod wash background */
}
```

### 2.4 Status, Telemetry & Severity Tokens

```css
:root {
  /* Success & Verified */
  --status-success-bg: rgba(5, 150, 105, 0.10);
  --status-success-border: rgba(5, 150, 105, 0.25);
  --status-success-text: #047857;
  --status-success-solid: #059669;

  /* Warning & Deadline Alerts */
  --status-warn-bg: rgba(217, 119, 6, 0.10);
  --status-warn-border: rgba(217, 119, 6, 0.25);
  --status-warn-text: #B45309;
  --status-warn-solid: #D97706;

  /* Error & System Faults */
  --status-error-bg: rgba(220, 38, 38, 0.10);
  --status-error-border: rgba(220, 38, 38, 0.25);
  --status-error-text: #B91C1C;
  --status-error-solid: #DC2626;

  /* Informational & Neutral */
  --status-info-bg: rgba(79, 70, 229, 0.10);
  --status-info-border: rgba(79, 70, 229, 0.25);
  --status-info-text: #4338CA;
  --status-info-solid: #4F46E5;

  /* Runtime Cache States */
  --badge-cache-hit-bg: rgba(5, 150, 105, 0.12);
  --badge-cache-hit-text: #047857;
  --badge-cache-miss-bg: rgba(217, 119, 6, 0.12);
  --badge-cache-miss-text: #B45309;
  --badge-cache-stale-bg: rgba(100, 116, 139, 0.12);
  --badge-cache-stale-text: #475569;
}
```

---

## 3. Typography Hierarchy & Scales

The typography combines high-character editorial serifs, ultra-legible system sans-serifs, and fixed-width tabular monospace fonts:

1. **Editorial Display Serif (`font-serif`)**:
   - Used for primary hero headlines, publication titles, and narrative emphasis.
   - Fallbacks: `Newsreader`, `Charter`, `Georgia`, `serif`.
2. **System Interface Sans (`font-sans`)**:
   - Used for interactive controls, body paragraphs, navigation, and data labels.
   - Fallbacks: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
3. **Tabular Monospace (`font-mono`)**:
   - Used for telemetry values, API schemas, code payloads, hotkey hints, and pricing tags.
   - Fallbacks: `JetBrains Mono`, `SF Mono`, `Menlo`, `monospace`.

### Modular Type Scale

| Token | Size | Line Height | Tracking | Weight | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-hero` | `48px` (`3.0rem`) | `1.1` | `-0.03em` | `600`–`700` | Landing page hero statements, publication titles |
| `--text-h1` | `32px` (`2.0rem`) | `1.2` | `-0.02em` | `600` | Major section headers, product title anchors |
| `--text-h2` | `24px` (`1.5rem`) | `1.25` | `-0.015em` | `600` | Card group titles, modal headers, major tool labels |
| `--text-h3` | `18px` (`1.125rem`) | `1.35` | `-0.01em` | `500` | Module titles, author credits, sub-panel headers |
| `--text-body-editorial`| `17px` (`1.0625rem`)| `1.65` | `0` | `400` | Narrative introductions, long-form reviews, briefs |
| `--text-body` | `14px` (`0.875rem`) | `1.5` | `0` | `400` | Standard workbench body, descriptions, options |
| `--text-body-plain` | `16px` (`1.0rem`) | `1.6` | `0` | `400`–`500` | Mobile-first citizen alerts, regional scannability |
| `--text-caption` | `12px` (`0.75rem`) | `1.4` | `+0.01em` | `400`–`500` | Badges, timestamps, secondary metadata |
| `--text-mono-code` | `13px` (`0.8125rem`)| `1.55` | `0` | `400` | Syntax code blocks, structured schema properties |
| `--text-mono-data` | `12px` (`0.75rem`) | `1.3` | `+0.02em` | `500` | Telemetry readouts, latency timers, counters |

---

## 4. Operational Surface Archetypes

Rather than forcing every screen into a single rigid layout, NorAI defines four flexible surface archetypes. Each archetype establishes density, navigation, and visual register tailored to its user intent.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SURFACE ARCHETYPES                              │
├─────────────────────┬─────────────────────┬───────────────────┬─────────────┤
│ SURFACE A           │ SURFACE B           │ SURFACE C         │ SURFACE D   │
│ Editorial/Marketing │ Interactive Bench   │ Developer Docs    │ Mobile Alert│
│ • Narrative rhythm  │ • High data density │ • Split reference │ • 1-column  │
│ • Display serif     │ • Keyboard velocity │ • Tabbed code SDKs│ • 48px touch│
│ • Bento showcases   │ • Telemetry cards   │ • Schema contracts│ • Vernacular│
└─────────────────────┴─────────────────────┴───────────────────┴─────────────┘
```

### 4.1 Surface A: Marketing & Editorial Showcase
- **Target Context:** Landing page (`/`), Product showcases (`/products/*`), Mission (`/mission`), Services (`/services`).
- **Visual Rhythm:** Spacious reading cadence, balanced negative space, high typographic contrast.
- **Key Patterns:**
  - Dynamic Hero viewport with immediate interactive preview.
  - Curated bento grids featuring real tool capabilities and micro-interactions.
  - Editorial testimonials with distinguished typography and authentic attribution.
  - Social proof and transparent quantitative counters.

### 4.2 Surface B: Interactive Workbench
- **Target Context:** AI Resume Shortlister workbench, Course Note-Taker studio, Community Chat Digest explorer.
- **Visual Rhythm:** High information density, compact tabular rows, sticky facet filters, clean spatial division.
- **Key Patterns:**
  - Multi-view toggles (List, Board, Timeline) to suit user workflows.
  - Side-by-side comparison panels with synchronized metric scrolling.
  - Real-time telemetry badges (latency in ms, tokens parsed, cache hit/miss).
  - Rapid keyboard shortcuts (`⌘K` command palette, single-key triage, `Esc` dismiss).

### 4.3 Surface C: Developer Documentation & API Reference
- **Target Context:** API Reference, MCP Server specifications, integration docs.
- **Visual Rhythm:** Focused two-column or split-pane reference model.
- **Key Patterns:**
  - Left column: Endpoint URI, HTTP method pill, typed parameter hierarchy with collapsible properties.
  - Right column: Multi-language tabbed code generator (cURL, TypeScript, Python, Go) and fixed synchronous JSON response preview.
  - Instant one-click copy affordances with temporary checkmark feedback.

### 4.4 Surface D: Plain-Language Mobile & Regional Alerts
- **Target Context:** Smart Dainik News (`/products/smart-dainik-news`), public gazette tracking.
- **Visual Rhythm:** Mobile-first, single-column vertical flow with generous negative space.
- **Key Patterns:**
  - Oversized touch targets (minimum `44px x 44px`, primary action buttons `48px` height).
  - Zero jargon: Plain-language status pills ("Up to Date", "Deadline Approaching", "Checking for Updates") replacing technical codes.
  - Isolated numerical anchors (Vacancy count, Application Deadline, Age limits) for rapid scannability across Hindi/English.
  - Persistent, thumb-accessible bottom action triggers.

---

## 5. Interaction Ethos & Ergonomic Guardrails

All interactive elements adhere to modern interaction engineering standards (rooted in Emil Kowalski's interaction principles and Impeccable standards):

### 5.1 The 5-State Interactive Matrix

Every button, input, tab, and card must account for all five essential interactive states:
1. **Default (Rest):** Crisp background, 1px subtle hairline, clear label contrast.
2. **Hover:** Gentle background luminance shift (+5% to +10%), border sharpening, cursor cue.
3. **Active (Pressed):** Subtle tactile scale down (`scale(0.98)` or `scale(0.99)`), slight inset shadow.
4. **Focus-Visible (Keyboard):** Unambiguous 2px focus ring with 2px offset (`--accent-primary` or `--status-info-solid`). Never suppress focus rings for keyboard navigation.
5. **Disabled:** Reduced opacity (`0.4`–`0.5`), `cursor: not-allowed`, pointer events neutralized.

### 5.2 Physics-Informed Motion Principles
- **Natural Spring Physics Over Linear Tweens:** Prefer spring-based transitions (`cubic-bezier(0.16, 1, 0.3, 1)` or CSS springs) for dropdowns, tooltips, drawers, and modal transitions.
- **Context-Preserving Layout Transitions:** Use React View Transitions or Framer Motion layout animations when elements reorder or change state.
- **Micro-Interaction Snappiness:** Interactive responses (hovers, clicks) should execute in $<150\text{ms}$; complex transitions should complete in $<300\text{ms}$.
- **Respect User Preferences:** Always enforce `@media (prefers-reduced-motion: reduce)` by reducing motion to subtle opacity fades or disabling non-essential transitions.

### 5.3 Non-Negotiable Frontend Quality Checklist
- ✅ **Zero Cumulative Layout Shift (CLS = 0):** Always reserve visual space for dynamic images, telemetry streams, and async components.
- ✅ **WCAG AAA Legibility:** Primary text contrast ratio must exceed 7:1 against `--surface-canvas` and `--surface-panel`.
- ✅ **Semantic HTML Structure:** Single `<h1>` per page, hierarchical `<h2>`–`<h4>`, semantic `<nav>`, `<main>`, `<article>`, and `<aside>`.
- ✅ **No AI Slop:** No gratuitous neon gradients, no generic stock cards, no arbitrary 3D distortions that degrade mobile battery and performance.

---

## 6. Frontend Skill Creative Freedom

This specification provides **guardrails, semantic tokens, and visual principles**—it intentionally does **NOT** micromanage layout code, prescribe ASCII art, or dictate arbitrary spacing math.

Specialized frontend skills have full creative authority to apply their domain expertise:
- **/landing-page-design**: Owns section sequence, conversion copy rhythm, hero composition, and CTA ergonomics.
- **/emil-design-eng**: Owns micro-interaction polish, spring physics tuning, interactive gesture handling, and optical alignment.
- **/minimalist-ui**: Owns calm whitespace distribution, typography contrast, and elegant flat bento grids.
- **/impeccable**: Owns visual critique, holistic audit passes, accessibility enforcement, and typography refinement.
- **/web-design-engineer**: Owns full-stack visual artifacts, browser QA, and complex component architecture.
