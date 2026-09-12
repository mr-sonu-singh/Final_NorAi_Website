# NorAI Official Web — Audens Replicator Master Engineering Plan (`REDESIGN_PLAN.md`)

> **Document Status**: Production-Grade Master Execution Specification  
> **Source Baseline**: Synthesized from the 1,054 lines of [`report.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/report.md)  
> **Benchmark Reference**: AUDENS (`https://audens.ai`)  
> **Target Codebase**: NorAI Technologies Web Platform (`/home/gourav/coding/startup/NorAi_Ofiicial_Web`)  
> **Primary Objective**: Transform the NorAI web platform from a bloated 47KB widget playground into an elite, visceral sovereign AI institution embodying the editorial restraint, spacious breathing room, atmospheric aurora glows, and high-voltage jewel palette of Audens.ai.

---

## 1. Executive Strategy & Guiding North Star

NorAI Technologies possesses sovereign technical capabilities: air-gapped VPC inference clusters, deterministic pgvector/BM25 retrieval pipelines, sub-second transient RAM document parsing, and an authentic 75-District grassroots mission across Uttar Pradesh.

However, the current implementation violates core tenets of modern luxury software craft:
1. **Severe Bento & Widget Fatigue**: The homepage hero loads a 47KB workbench (`HeroStudioWorkbench.tsx`) containing interactive ATS candidate tables, audio players, KaTeX editors, chat simulators, and news feeds. Beat 5 repeats this with a 1,800px bento (`AudensCapabilityBento.tsx`) with nested accordions.
2. **Extreme Duplication**: The 4 Everyday Tools are explained across 4 separate places on the homepage and subpages.
3. **Contrast Failures**: The `.gradient-card__inner` component on all 6 subpages renders dark green text (`#072929`) on dark green background (`#072929`) in default light mode (1.0:1 invisible contrast).
4. **Palette Invasions**: Alien colors (`#07080D` pitch obsidian, `terra-500`) clash with the canonical Audens pine and porcelain design system.
5. **Missing Civic Soul**: The 75-District Bharat Mission is omitted entirely from the primary homepage narrative before the closing dispatch.

### The Single Responsibility Rule
Every page and section in the NorAI ecosystem must have **exactly one job**:
- **Homepage Hero**: Establish sovereign positioning, inspire executive conviction, and communicate the core thesis in under 5 seconds.
- **Homepage Beat 2 (`ThreeDimensionsRail`)**: Introduce the three foundational pillars (Tools, Enterprise, Bharat). Zero feature lists.
- **Homepage Beat 5 (`CapabilityArc`)**: Fast, scannable, atmospheric 260px telemetry preview of the 4 sovereign tools. Zero interactive widgets or accordions.
- **Homepage Beat 6 (`SectorLedger`)**: Clean horizontal ledger directing exclusively to `/services`.
- **Homepage Beat 6.5 (`OperatingRitualsRail`)**: Connected 4-stage circular node rail (`.stepflow`) detailing engagement rituals.
- **Homepage Beat 6.8 (`BharatMissionBeat`)**: The civic heartbeat—showcasing the 3 community tiers across Uttar Pradesh.
- **Homepage Beat 7 (`ClosingDispatch`)**: High-contrast, ivory-centered conic engagement chamber.
- **Subpage `/products` & `/products/[slug]`**: The exclusive home for deep interactive sandboxes, audio scrubbers, and live test benches.
- **Subpage `/services`**: The exclusive home for enterprise RAG architectures, private VPC inference topologies, and MCP specifications.
- **Subpage `/mission`**: The exclusive home for the 75-district impact radar, workshop schedules, and student curriculum.

---

## 2. The 12 Critical Friction Points Operational Matrix

| # | Friction Point from `report.md` | Core Defect in Codebase | Target Resolution & Master Phase |
|---|---|---|---|
| **01** | **Strict Deduplication & Single Responsibility** | The 4 tools and enterprise solutions are duplicated 4 times across the homepage and subpages. | **Phases 3, 4, 6**: Excise `HeroStudioWorkbench`; convert Beat 5 to 260px telemetry previews; re-anchor interactive sandboxes exclusively to `/products/[slug]`. |
| **02** | **Text Visibility & Contrast Failures** | `.gradient-card__inner` has `background: var(--pine)` with `text-[var(--pine)] dark:text-[var(--bone)]`, rendering 100% invisible text in light mode across 6 subpages. | **Phase 2**: Re-anchor `.gradient-card__inner` to ivory surface (`#fffdf7`) with deep pine text (`#072929`) and mint-ink badge (`#06845a`), achieving 14.2:1 WCAG AAA contrast. |
| **03** | **Top Header Bar Overload** | Header contains dead anchor `/#mission`, duplicate `Contact` text link beside button, and 8+ interactive targets colliding on mid-screens. | **Phase 1**: Purge `/#mission` and `Contact` text link; enforce exact 5-link hierarchy (`Capabilities`, `Approach`, `Deliverables`, `About`, `The Canonical`) + 1 solid button (`Book a call`). |
| **04** | **Bento Box Fatigue & Widget Bloat** | `AudensCapabilityBento` spans 1,800px of vertical scroll with heavy interactive scrubbers, accordions, and 3D KaTeX boxes. | **Phase 4**: Replace with `CapabilityArc.tsx` featuring alternating split layout, fixed 260px telemetry chassis, and zero collapsible accordions. |
| **05** | **Missing Bharat Grassroots Mission** | The homepage contains zero dedicated showcase for the 75-district Uttar Pradesh mission before the closing dispatch. | **Phase 5**: Build and insert `BharatMissionBeat.tsx` before Beat 7, presenting the 3 community tiers (Citizens, Students, Builders) on deep pine with commitment strip. |
| **06** | **Content Bulk & Corporate Jargon** | Walls of dense technical throat-clearing clutter cards and headers. | **Phases 3, 4, 5, 6**: Apply word-for-word copy redlines from `report.md`, cutting word count by 60% and leading with operational outcomes. |
| **07** | **Minimalism & Visceral Spatial Impact** | Dense borders and boxed containers create "dashboard syndrome" with zero visual rest. | **Phases 2, 3**: Enforce Audens vertical padding (`clamp(56px, 7vw, 104px)`), remove heavy container borders, and elevate negative space. |
| **08** | **Repetitive Bento Grids** | Beats 2, 5, and 6.5 all use the identical rectangular bento card layout. | **Phases 4, 6**: Enforce 4 distinct Audens geometry archetypes: Telemetry Vignettes, Horizontal Ledgers, Connected Circular Step Flows, and Conic Cards. |
| **09** | **Atmosphere & Feel Over Walls of Text** | Lack of ambient depth; dry technical descriptions without living systems telemetry. | **Phases 3, 4, 5**: Integrate multi-color blurred aurora orbs (`.aurora__orb`), monospace live headers with pulsing dots (`.vg-livedot`), and active metric rows. |
| **10** | **Jargon-Heavy Headings** | Academic labels like "Multi-Format Stream Extraction Pipelines" confuse executives. | **All Phases**: Enforce punchy Audens-style headlines: *"Software you own. Intelligence that stays."*, *"Messy lectures converted to executive KaTeX notes."* |
| **11** | **Card Geometry & Archetype Variety** | Generic `rounded-2xl border bg-[#0D1017]` applied indiscriminately across all sections. | **Phases 4, 5, 6**: Distribute structural patterns: 260px chassis (`.vig`), hairline ledger (`.artledger`), circular stepflow (`.stepflow`), and conic pill card (`.gradient-card`). |
| **12** | **Palette Purity & Polish** | Rogue `#07080D` pitch obsidian, `#0D1017`, and `terra-500` clash with Audens pine/porcelain tokens. | **Phase 2**: Purge obsidian and terra classes; enforce canonical Audens tokens: `--pine` (`#072929`), `--porcelain` (`#f5f5f0`), `--surface` (`#fffdf7`), `--bone` (`#ebeae1`), and jewel accents. |

---

## 3. Canonical Design System & Token Dictionary

Directly derived from Audens production stylesheet (`https://audens.ai/assets/index-CDD-smPP.css`):

```css
/* Core Surfaces */
--pine: #072929;        /* Deep pine green dark surface / light primary text */
--forest: #1e3c3b;      /* Elevated dark card surface */
--porcelain: #f5f5f0;   /* Primary light canvas */
--surface: #fffdf7;     /* Warm ivory card & modal surface */
--bone: #ebeae1;        /* Crisp off-white text on pine */

/* Opacities */
--pine-70: rgba(7, 41, 41, 0.7);
--pine-50: rgba(7, 41, 41, 0.5);
--pine-20: rgba(7, 41, 41, 0.2);
--pine-12: rgba(7, 41, 41, 0.12);
--pine-08: rgba(7, 41, 41, 0.08);
--bone-70: rgba(235, 234, 225, 0.7);
--bone-50: rgba(235, 234, 225, 0.5);
--bone-20: rgba(235, 234, 225, 0.2);

/* High-Voltage Jewel Tokens */
--mint: #1ef4b4;        /* Core high-voltage mint key (13.8:1 on dark) */
--mint-ink: #06845a;    /* High-contrast mint for light porcelain surfaces (5.4:1 - WCAG AAA) */
--lavender: #c6b5ff;    /* EdTech / Scholar KaTeX extraction */
--butter: #ffe9b5;      /* Bharat mission & civic alerts */
--coral: #ff7755;       /* Community chat digest alerts */
--sky: #75d3da;         /* Stream ingestion & telemetry */
--pink: #ff69b4;        /* Aurora secondary highlight */

/* Geometry & Spatial Tokens */
--container: 1240px;
--r-card: 22px;
--r-pill: 999px;
--r-sm: 12px;
--gutter: clamp(20px, 5vw, 64px);
--section-padding: clamp(56px, 7vw, 104px);

/* Easings */
--ease: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.33, 1.4, 0.6, 1);
```

---

## 4. Phase-by-Phase Master Engineering Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                     6-PHASE MASTER ROADMAP OVERVIEW                    │
├────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: NAVIGATION & SHELL STREAMLINING                              │
│  ├── Delete dead anchor href="/#mission" from Header and Footer        │
│  ├── Remove redundant "Contact" text link; keep singular CTA button    │
│  └── Enforce clean 5-item pill hierarchy with bottom scroll progress   │
│                                                                        │
│  PHASE 2: DESIGN SYSTEM & CONTRAST REMEDIATION                         │
│  ├── Purge rogue tokens: #07080D pitch obsidian, terra-500             │
│  ├── Fix invisible text in .gradient-card__inner across all 6 subpages │
│  └── Verify 100% WCAG AAA contrast across pine and porcelain           │
│                                                                        │
│  PHASE 3: HOMEPAGE HERO DE-BLOAT                                       │
│  ├── Remove 47KB HeroStudioWorkbench from homepage hero                │
│  ├── Implement single-column Aurora Hero Chamber with 2-line lede      │
│  └── Restore sub-second paint speed and spatial breathing room         │
│                                                                        │
│  PHASE 4: CAPABILITY ARC TRANSFORMATION                                │
│  ├── Replace 1,800px AudensCapabilityBento with sleek CapabilityArc    │
│  ├── Convert heavy interactive widgets into 260px telemetry cards      │
│  └── Eliminate collapsible accordion drawers from homepage             │
│                                                                        │
│  PHASE 5: INSERT GRASSROOTS BHARAT MISSION BEAT                        │
│  ├── Build dedicated BharatMissionBeat.tsx section before closing CTA  │
│  ├── Feature the 3 community tiers (Citizens, Students, Builders)      │
│  └── Link to /mission for district impact radar and workshop signups   │
│                                                                        │
│  PHASE 6: SUBPAGE ALIGNMENT, CLOSING DISPATCH & FINAL VERIFICATION     │
│  ├── Standardize ClosingDispatch.tsx with ivory inner card across all  │
│  ├── Re-anchor /products as the sole home for interactive sandboxes    │
│  ├── Re-anchor /services as the sole home for enterprise RAG/MCP specs │
│  └── Execute full type-check, link crawl, and visual verification      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phase 1: Navigation Pill & Shell Streamlining

#### 1.1 Strategic Intent & Audens.ai Reference
- **Audens Benchmark**: `https://audens.ai/` (Desktop `.navpill` inspection, lines 122–130 of `report.md`).
- **Design Philosophy**: The navigation must float serenely as a unified capsule with zero crowding. Audens uses exactly 5 text links and 1 solid primary action button (`Book a call`). Crucially, Audens does **not** duplicate "Contact" as both a text link and a button in the same pill. NorAI currently suffers from a dead anchor (`/#mission`) and a redundant "Contact" text link that crowds the pill to 9 targets.

#### 1.2 Target Files
- `components/organisms/sections/Header/Header.tsx` (MODIFY)
- `config/navigation.ts` (MODIFY)
- `components/organisms/sections/Footer/Footer.tsx` (MODIFY)
- `app/(marketing)/layout.tsx` (VERIFY)

#### 1.3 Exact Component Blueprints & Interfaces

```tsx
// Location: config/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export const AUDENS_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Capabilities', href: '/products' },
  { label: 'Approach', href: '/services#operating-rituals' },
  { label: 'Deliverables', href: '/services' },
  { label: 'About', href: '/team' },
  { label: 'The Canonical', href: '/blog' },
];
```

```tsx
// Location: components/organisms/sections/Header/Header.tsx
// Key layout structure:
<header className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 sm:px-6 pointer-events-none">
  <div className="navpill max-w-[1040px] mx-auto pointer-events-auto rounded-full border border-[var(--pine-12)] bg-[#f5f5f0]/90 backdrop-blur-xl px-5 py-2.5 flex items-center justify-between shadow-[0_10px_30px_-12px_rgba(7,41,41,0.15)] transition-all">
    {/* Brand Mark */}
    <Link href="/" className="flex items-center gap-2.5 text-[var(--pine)]">
      <BrandLogo size="sm" />
      <span className="font-display font-extrabold text-lg tracking-tight">NORAI</span>
    </Link>

    {/* Exactly 5 Desktop Links */}
    <nav className="hidden md:flex items-center gap-1">
      {AUDENS_HEADER_NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="px-3.5 py-1.5 text-sm font-medium rounded-full text-[var(--pine)]/80 hover:text-[var(--pine)] hover:bg-[var(--pine-08)] transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>

    {/* Action Group */}
    <div className="flex items-center gap-3">
      <BilingualToggle size="sm" />
      <Link
        href="/contact"
        className="btn btn--solid text-sm py-2 px-4 rounded-full bg-[var(--pine)] text-[var(--bone)] hover:bg-[var(--forest)] flex items-center gap-2 transition-transform active:scale-95 shadow-sm"
      >
        <span>Book a call</span>
        <HandWaveIcon className="w-4 h-4 text-[var(--mint)]" />
      </Link>
      {/* Mobile Menu Trigger */}
      <MobileMenuTrigger className="md:hidden" />
    </div>
  </div>
  {/* Scroll Progress Bar */}
  <motion.div
    className="h-[2px] bg-[var(--mint)] origin-left max-w-[1040px] mx-auto mt-0.5 rounded-full"
    style={{ scaleX: scrollYProgress }}
  />
</header>
```

#### 1.4 Copy & Content Specifications
- **Pill Links**:
  1. `Capabilities` → `/products`
  2. `Approach` → `/services#operating-rituals`
  3. `Deliverables` → `/services`
  4. `About` → `/team`
  5. `The Canonical` → `/blog`
- **Pill CTA Button**: `Book a call` → `/contact` (with Audens hand gesture SVG)
- **Footer Links**: Replace any dead `/#mission` anchor with `/mission`. Ensure all footer columns point to valid routes.

#### 1.5 Detailed Implementation Checklist
- [ ] In `config/navigation.ts`, replace `DEFAULT_HEADER_NAV_ITEMS` with the 5 canonical items. Purge `/#mission` and `{ label: 'Contact', href: '/contact' }`.
- [ ] In `Header.tsx`, consume the 5 canonical items. Remove the redundant contact text link.
- [ ] In `Header.tsx`, add the subtle 2px scroll progress indicator (`.nav-progress`) pegged to page scroll.
- [ ] In `Footer.tsx`, audit all href attributes. Point "Grassroots Mission" to `/mission`, "Enterprise" to `/services`, and "Tools" to `/products`.
- [ ] Ensure mobile navigation drawer mirrors the exact same 5 links without dead anchors.

#### 1.6 Verification & Quality Gate
- **Type Check**: `npx tsc --noEmit`
- **Link Integrity Test**: Assert every href in Header and Footer resolves to a 200 HTTP status:
  ```bash
  # Check for dead anchors
  ! grep -rn 'href="/#mission"' components/ config/ app/
  ```
- **Responsive Check**: Verify that at 768px, 1024px, and 1440px viewport widths, the `.navpill` has zero horizontal scrollbar or element wrapping.

---

### Phase 2: Design System & Contrast Remediation

#### 2.1 Strategic Intent & Audens.ai Reference
- **Audens Benchmark**: `https://audens.ai/assets/index-CDD-smPP.css` (Section 1.1 & Friction Point 2 in `report.md`).
- **Design Philosophy**: Audens is revered for its pristine contrast and unified color discipline. Surfaces are strictly light porcelain (`#f5f5f0`) or deep pine (`#072929`). The current NorAI codebase has a catastrophic contrast bug: `.gradient-card__inner` has a hardcoded dark pine background (`#072929`), but pages apply `text-[var(--pine)] dark:text-[var(--bone)]`, which defaults to `#072929` dark green text on `#072929` dark green surface in light mode (1.0:1 invisible contrast!). Additionally, pitch obsidian (`#07080D`) and `terra-500` create jarring visual clashes.

#### 2.2 Target Files
- `app/globals.css` (MODIFY)
- `app/(marketing)/team/page.tsx` (MODIFY)
- `app/(marketing)/services/page.tsx` (MODIFY)
- `app/(marketing)/products/[slug]/page.tsx` (MODIFY)
- `app/(marketing)/products/ProductsIndexClient.tsx` (MODIFY)
- `app/(marketing)/blog/BlogIndexClient.tsx` (MODIFY)
- `app/(marketing)/mission/page.tsx` (MODIFY)
- `components/organisms/ContactFormClient.tsx` (MODIFY)

#### 2.3 Exact Component Blueprints & Interfaces

##### 2.3.1 CSS Custom Property Overhaul (`app/globals.css`)
```css
/* Purge #07080D, #0D1017, #11141e. Standardize canonical Audens tokens: */
:root {
  --pine: #072929;
  --forest: #1e3c3b;
  --porcelain: #f5f5f0;
  --surface: #fffdf7;
  --bone: #ebeae1;

  --mint: #1ef4b4;
  --mint-ink: #06845a;
  --lavender: #c6b5ff;
  --butter: #ffe9b5;
  --coral: #ff7755;
  --sky: #75d3da;
  --pink: #ff69b4;

  --bg: var(--porcelain);
  --fg: var(--pine);
  --line: rgba(7, 41, 41, 0.12);
  --r-card: 22px;
  --r-pill: 999px;
}

/* Fix .gradient-card__inner to Ivory Surface with Deep Pine Text */
.gradient-card__inner {
  position: relative;
  z-index: 1;
  background: var(--surface); /* #fffdf7 */
  color: var(--pine);        /* #072929 - 14.2:1 contrast ratio */
  border-radius: calc(var(--r-card) - 2px);
  padding: clamp(32px, 5vw, 64px);
}
```

##### 2.3.2 Subpage Closing Dispatch Remediation
In all 6 subpage files, replace the broken text classes:
```tsx
// BEFORE (Defective - 1.0:1 invisible contrast):
<div className="gradient-card__inner p-8 sm:p-12 space-y-6">
  <span className="text-[var(--mint-ink)] text-xs font-mono">NEXT STEPS</span>
  <h2 className="text-[var(--pine)] dark:text-[var(--bone)]">...</h2>
  <p className="text-[var(--pine)]/75 dark:text-[var(--bone-70)]">...</p>
</div>

// AFTER (Audens Ivory Chamber Pattern - 14.2:1 WCAG AAA contrast):
<div className="gradient-card__inner p-8 sm:p-12 space-y-6 bg-[#fffdf7] text-[var(--pine)]">
  <span className="text-[var(--mint-ink)] text-xs font-mono font-bold uppercase tracking-widest">THE FIRST ENGAGEMENT</span>
  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)]">...</h2>
  <p className="text-[var(--pine)]/75 text-base sm:text-lg leading-relaxed">...</p>
</div>
```

##### 2.3.3 Contact Form Color Purge (`ContactFormClient.tsx`)
```tsx
// Purge all bg-terra-500 and text-terra-600.
// Replace with canonical Audens tokens:
// Submit button: bg-[var(--pine)] text-[var(--bone)] hover:bg-[var(--forest)]
// Focus rings: focus:ring-[var(--mint)] focus:border-[var(--mint-ink)]
// Form labels: text-[var(--pine)] font-medium
```

#### 2.4 Copy & Content Specifications
- Ensure all closing cards use consistent executive lede:
  - Badge: `THE FIRST ENGAGEMENT`
  - Headline: `Bring us the operational bottleneck you are actually facing.`
  - Body: `A first technical conversation is with our founding engineers. We evaluate your workflow, define the exact private architecture, and quote a fixed two-week diagnostic before any bigger build.`

#### 2.5 Detailed Implementation Checklist
- [ ] In `app/globals.css`, eliminate `--surface-canvas: #07080d` and re-anchor background to `--porcelain: #f5f5f0`.
- [ ] In `app/globals.css`, update `.gradient-card__inner` background to `var(--surface)` (`#fffdf7`).
- [ ] In `app/(marketing)/team/page.tsx`, fix text classes in `.gradient-card__inner` (lines 348–370).
- [ ] In `app/(marketing)/services/page.tsx`, fix text classes in `.gradient-card__inner` (lines 460–485).
- [ ] In `app/(marketing)/products/[slug]/page.tsx`, fix text classes in `.gradient-card__inner` (lines 350–375).
- [ ] In `app/(marketing)/products/ProductsIndexClient.tsx`, fix text classes in `.gradient-card__inner` (lines 345–370).
- [ ] In `app/(marketing)/blog/BlogIndexClient.tsx`, fix text classes in `.gradient-card__inner` (lines 300–325).
- [ ] In `app/(marketing)/mission/page.tsx`, fix text classes in `.gradient-card__inner` (lines 250–275).
- [ ] In `ContactFormClient.tsx`, replace all instances of `terra-*` classes with canonical Audens tokens.

#### 2.6 Verification & Quality Gate
- **Type Check**: `npx tsc --noEmit`
- **Contrast Automated Verification**:
  ```bash
  # Ensure no text-[var(--pine)] dark:text-[var(--bone)] remains inside gradient-card__inner
  ! grep -rn "gradient-card__inner" app/ | grep "text-\[var(--pine)\] dark:text-\[var(--bone)\]"
  ```
- **Visual Gate**: Inspect each of the 6 subpages in the browser under light mode to confirm 100% crisp, legible text in closing CTAs.

---

### Phase 3: Homepage Hero De-Bloat (`HeroChamber.tsx`)

#### 3.1 Strategic Intent & Audens.ai Reference
- **Audens Benchmark**: `https://audens.ai/` Hero Chamber (`.phero`, lines 147, 400–412, and 561–628 of `report.md`).
- **Design Philosophy**: The homepage hero must establish immediate executive authority through spacious breathing room, atmospheric multi-color aurora glow orbs, and high-altitude copywriting. The current NorAI hero splits into a 6:6 grid that embeds a 47KB `HeroStudioWorkbench`—cramming interactive ATS tables, KaTeX renderers, audio scrubbers, and chat simulators right onto the initial viewport. This chokes paint performance, creates overwhelming cognitive friction, and prematurely dumps the entire product catalog before establishing brand conviction.

#### 3.2 Target Files
- `components/organisms/sections/HeroChamber.tsx` (CREATE)
- `app/(marketing)/page.tsx` (MODIFY)
- `components/organisms/HeroStudioWorkbench/` (DE-COUPLE from homepage)

#### 3.3 Exact Component Blueprints & Interfaces

```tsx
// Location: components/organisms/sections/HeroChamber.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';

export function HeroChamber() {
  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)]">
      {/* Audens Multi-Color Aurora Glow Orbs */}
      <div 
        className="absolute -top-24 -left-20 w-[550px] h-[550px] rounded-full bg-[var(--mint)]/18 blur-[100px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-[var(--lavender)]/14 blur-[110px] pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10 max-w-[1040px] mx-auto text-center px-4 sm:px-6">
        {/* Monospace Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--pine-12)] text-xs font-mono text-[var(--pine)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" />
          <span className="tracking-widest uppercase font-medium">
            SOVEREIGN AI SYSTEMS · BHARAT & ENTERPRISE
          </span>
        </div>

        {/* Giant Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight mb-8">
          Software you own. <br />
          <span className="text-[var(--mint-ink)] relative inline-block">
            Intelligence that stays.
            <svg 
              className="absolute -bottom-2 left-0 w-full h-3 text-[var(--mint)]" 
              viewBox="0 0 240 40" 
              fill="none" 
              preserveAspectRatio="none"
            >
              <path d="M4 26 C 60 6, 150 6, 236 22" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* 2-Sentence Conviction Lede */}
        <p className="text-[var(--pine)]/75 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10 text-pretty">
          NorAI engineers private AI systems and sovereign everyday tools. Air-gapped enterprise pipelines you control, and 100% free computational literacy across 75 districts of Uttar Pradesh.
        </p>

        {/* Dual Pill Action Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link 
            href="/contact" 
            className="btn btn--solid h-12 px-7 rounded-full bg-[var(--pine)] text-[var(--bone)] hover:bg-[var(--forest)] text-base font-semibold shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <span>Book a diagnostic</span>
            <HandWaveIcon className="w-4 h-4 text-[var(--mint)]" />
          </Link>
          <Link 
            href="/products" 
            className="btn btn--ghost h-12 px-7 rounded-full border border-[var(--pine-20)] hover:bg-[var(--pine-08)] text-[var(--pine)] text-base font-medium transition-colors"
          >
            <span>Explore the capabilities →</span>
          </Link>
        </div>

        {/* Micro-Telemetry Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--pine)]/60">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-ink)]" />
            Zero cloud training egress
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-ink)]" />
            Sub-second in-memory execution
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-ink)]" />
            Your keys, your infrastructure
          </span>
        </div>
      </Container>
    </section>
  );
}
```

#### 3.4 Copy & Content Specifications
- **Eyebrow**: `SOVEREIGN AI SYSTEMS · BHARAT & ENTERPRISE`
- **H1 Headline**: `Software you own. Intelligence that stays.` (with mint flourish underline)
- **Lede**: `NorAI engineers private AI systems and sovereign everyday tools. Air-gapped enterprise pipelines you control, and 100% free computational literacy across 75 districts of Uttar Pradesh.`
- **Primary Button**: `Book a diagnostic` (with hand wave icon) → `/contact`
- **Secondary Button**: `Explore the capabilities →` → `/products`
- **Micro-Telemetry Strip**:
  - `Zero cloud training egress`
  - `Sub-second in-memory execution`
  - `Your keys, your infrastructure`

#### 3.5 Detailed Implementation Checklist
- [ ] Create `components/organisms/sections/HeroChamber.tsx` with the exact single-column Aurora Hero blueprint.
- [ ] In `app/(marketing)/page.tsx`, replace the 6:6 grid and `<HeroStudioWorkbench />` with `<HeroChamber />`.
- [ ] Remove unused `HeroStudioWorkbench` import from `page.tsx`.
- [ ] Verify that the aurora glow orbs render with hardware-accelerated blur and `pointer-events: none`.
- [ ] Verify that display fonts (`Cabinet Grotesk` or fallback font-extrabold) scale down cleanly on 375px mobile viewports.

#### 3.6 Verification & Quality Gate
- **Type Check**: `npx tsc --noEmit`
- **Performance Verification**: Hero DOM size reduced by over 350 nodes. Initial bundle size decreased by ~47KB.
- **Visual Inspection**: Confirm sub-second initial paint, centered typography, and subtle ambient mint/lavender glows behind the headline.

---

### Phase 4: Capability Arc Transformation (`CapabilityArc.tsx`)

#### 4.1 Strategic Intent & Audens.ai Reference
- **Audens Benchmark**: `https://audens.ai/#capabilities` and `https://audens.ai/capabilities` ("The capability arc", lines 34–110 of Audens scrape; Section 5.3 of `report.md`).
- **Design Philosophy**: Rather than exhausting visitors with interactive widget playgrounds and accordions on the homepage, Audens uses an alternating split ledger. Each card pairs a compact (260px) illustrative telemetry window on one side with 2-line plain-spoken copy on the other. NorAI's current 1,800px bento (`AudensCapabilityBento.tsx`) overwhelms the user. Phase 4 transforms this into the sleek, authoritative `CapabilityArc.tsx`.

#### 4.2 Target Files
- `components/organisms/sections/CapabilityArc.tsx` (CREATE)
- `app/(marketing)/page.tsx` (MODIFY)
- `components/organisms/AudensCapabilityBento/` (DEPRECATE / ISOLATE for subpage reuse)

#### 4.3 Exact Component Blueprints & Interfaces

```tsx
// Location: components/organisms/sections/CapabilityArc.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { cn } from '@/lib/utils';

export interface CapabilityItem {
  id: string;
  n: string;
  dimension: 'Everyday Tools' | 'Enterprise Infra';
  title: string;
  subhead: string;
  copy: string;
  href: string;
  telemetryHeader: string;
  telemetryBadge: string;
  telemetryMetrics: { label: string; value: string; status: 'ok' | 'alert' }[];
}

export const AUDENS_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'resume-shortlister',
    n: '01',
    dimension: 'Everyday Tools',
    title: 'AI Resume Shortlister',
    subhead: 'See who actually built the system, not who stuffed the keywords.',
    copy: 'Sub-second vector scoring parses verified engineering depth and code craft from raw PDFs, eliminating recruiter screening backlog instantly.',
    href: '/products/resume-shortlister',
    telemetryHeader: 'RESUME VECTOR SCREENER · TRANSIENT RAM',
    telemetryBadge: '96/100 VERIFIED',
    telemetryMetrics: [
      { label: 'P95 Parse Latency', value: '0.28s / doc', status: 'ok' },
      { label: 'Egress / Telemetry', value: '0 bytes retained', status: 'ok' },
      { label: 'Keyword Stuffers', value: 'Filtered', status: 'alert' },
    ],
  },
  {
    id: 'course-note-taker',
    n: '02',
    dimension: 'Everyday Tools',
    title: 'Course Note-Taker',
    subhead: 'Messy lectures converted to executive KaTeX notes in seconds.',
    copy: 'Ingests raw classroom recordings and slide decks, extracting validated mathematical equations, structured study summaries, and active recall cards.',
    href: '/products/course-note-taker',
    telemetryHeader: 'AUDIO TRANSCRIPTION · NLP EXTRACTION',
    telemetryBadge: 'KATEX COMPILED',
    telemetryMetrics: [
      { label: 'Audio Ingestion', value: '1.2h in 8.4s', status: 'ok' },
      { label: 'LaTeX Accuracy', value: '99.4% syntax ok', status: 'ok' },
      { label: 'Scholar Tier', value: '₹0 Student Cost', status: 'ok' },
    ],
  },
  {
    id: 'chat-digest',
    n: '03',
    dimension: 'Everyday Tools',
    title: 'Community Chat Digest',
    subhead: 'The operational signal extracted from community noise.',
    copy: 'Summarizes thousands of unread team conversations into prioritized executive action items, unresolved technical blockers, and key consensus decisions.',
    href: '/products/chat-digest',
    telemetryHeader: 'STREAM DIGEST · MULTI-CHANNEL BUFFER',
    telemetryBadge: '4,820 ➔ 3 POINTS',
    telemetryMetrics: [
      { label: 'Channel Ingestion', value: 'Slack & Discord', status: 'ok' },
      { label: 'Noise Reduction', value: '98.7% compressed', status: 'ok' },
      { label: 'Action Items', value: 'Extracted', status: 'ok' },
    ],
  },
  {
    id: 'smart-dainik',
    n: '04',
    dimension: 'Everyday Tools',
    title: 'Smart Dainik News',
    subhead: 'Regional government notices, verified before deadlines expire.',
    copy: 'Autonomous monitoring of district public gazettes and welfare notices, delivering concise, actionable vernacular alerts for citizens and students.',
    href: '/products/smart-dainik-news',
    telemetryHeader: 'CIVIC INTELLIGENCE · REGIONAL CRAWLER',
    telemetryBadge: 'UP GAZETTE #402',
    telemetryMetrics: [
      { label: 'Source Verification', value: 'Official Gazette', status: 'ok' },
      { label: 'Language Delivery', value: 'Pure Hindi', status: 'ok' },
      { label: 'Deadline Alert', value: '48h Window', status: 'alert' },
    ],
  },
];

export function CapabilityArc() {
  return (
    <section id="capabilities" className="py-20 sm:py-28 bg-[#f5f5f0] text-[var(--pine)] border-b border-[var(--line)]">
      <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--pine-12)] text-xs font-mono text-[var(--pine)]">
            <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" />
            <span className="tracking-widest uppercase font-medium">The Capability Arc · Four Sovereign Tools</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-tight leading-[1.1]">
            Four single-purpose tools. <br />
            <span className="text-[var(--mint-ink)]">Each solves one operational problem.</span>
          </h2>
          <p className="text-[var(--pine)]/70 text-base leading-relaxed max-w-xl">
            Sovereign instruments designed to eliminate busywork. Sub-second execution, ephemeral memory processing, and zero data retention.
          </p>
        </div>

        {/* Alternating Split Capability Rows */}
        <div className="space-y-12 sm:space-y-16">
          {AUDENS_CAPABILITIES.map((cap, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={cap.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-[22px] bg-[var(--surface)] border border-[var(--pine-12)] shadow-[0_8px_30px_rgba(7,41,41,0.04)]"
              >
                {/* Visual Telemetry Chassis (Fixed 260px height) */}
                <div className={cn('lg:col-span-5 w-full', isEven ? 'lg:order-1' : 'lg:order-2')}>
                  <div className="rounded-xl bg-[var(--pine)] text-[var(--bone)] p-5 border border-[var(--pine-20)] font-mono shadow-inner h-[260px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--bone-20)] text-[10px] tracking-wider text-[var(--bone-70)]">
                        <span>{cap.telemetryHeader}</span>
                        <span className="text-[var(--mint)] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint)] animate-ping" />
                          LIVE
                        </span>
                      </div>
                      <div className="py-2">
                        <span className="inline-block px-2.5 py-1 rounded bg-[var(--forest)] text-[var(--mint)] font-bold text-xs">
                          {cap.telemetryBadge}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-[var(--bone-20)]">
                      {cap.telemetryMetrics.map((m, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span className="text-[var(--bone-70)]">{m.label}</span>
                          <span className={m.status === 'alert' ? 'text-[var(--coral)]' : 'text-[var(--mint)]'}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative & Action */}
                <div className={cn('lg:col-span-7 space-y-4', isEven ? 'lg:order-2' : 'lg:order-1')}>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--mint-ink)]">
                    <span>{cap.n}</span>
                    <span>·</span>
                    <span className="uppercase tracking-wider">{cap.dimension}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pine)]">
                    {cap.title}
                  </h3>
                  <p className="font-medium text-[var(--pine)] text-base">
                    {cap.subhead}
                  </p>
                  <p className="text-[var(--pine)]/70 text-sm sm:text-base leading-relaxed">
                    {cap.copy}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={cap.href}
                      className="inline-flex items-center gap-2 font-medium text-sm text-[var(--pine)] hover:text-[var(--mint-ink)] transition-colors group"
                    >
                      <span>Explore {cap.title}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

#### 4.4 Copy & Content Specifications
Word-for-word copy from Section 4.4 of `report.md`:
1. **Resume Shortlister**:
   - Subhead: `See who actually built the system, not who stuffed the keywords.`
   - Body: `Sub-second vector scoring parses verified engineering depth and code craft from raw PDFs, eliminating recruiter screening backlog instantly.`
   - Telemetry: `RESUME VECTOR SCREENER · TRANSIENT RAM` · `96/100 VERIFIED`
2. **Course Note-Taker**:
   - Subhead: `Messy lectures converted to executive KaTeX notes in seconds.`
   - Body: `Ingests raw classroom recordings and slide decks, extracting validated mathematical equations, structured study summaries, and active recall cards.`
   - Telemetry: `AUDIO TRANSCRIPTION · NLP EXTRACTION` · `KATEX COMPILED`
3. **Community Chat Digest**:
   - Subhead: `The operational signal extracted from community noise.`
   - Body: `Summarizes thousands of unread team conversations into prioritized executive action items, unresolved technical blockers, and key consensus decisions.`
   - Telemetry: `STREAM DIGEST · MULTI-CHANNEL BUFFER` · `4,820 ➔ 3 POINTS`
4. **Smart Dainik News**:
   - Subhead: `Regional government notices, verified before deadlines expire.`
   - Body: `Autonomous monitoring of district public gazettes and welfare notices, delivering concise, actionable vernacular alerts for citizens and students.`
   - Telemetry: `CIVIC INTELLIGENCE · REGIONAL CRAWLER` · `UP GAZETTE #402`

#### 4.5 Detailed Implementation Checklist
- [ ] Create `components/organisms/sections/CapabilityArc.tsx` with alternating split layout and fixed 260px telemetry cards.
- [ ] In `app/(marketing)/page.tsx`, replace `<AudensCapabilityBento />` with `<CapabilityArc />`.
- [ ] Ensure all 4 cards link cleanly to their respective subpage routes (`/products/[slug]`).
- [ ] Verify zero collapsible accordions or heavy stateful inputs exist on this homepage section.

#### 4.6 Verification & Quality Gate
- **Type Check**: `npx tsc --noEmit`
- **DOM & Scroll Reduction**: Verify vertical scroll for Beat 5 drops from ~1,800px down to ~1,100px.
- **Link Check**: Assert `/products/resume-shortlister`, `/products/course-note-taker`, `/products/chat-digest`, and `/products/smart-dainik-news` resolve cleanly.

---

### Phase 5: Grassroots Bharat Mission Section Insertion (`BharatMissionBeat.tsx`)

#### 5.1 Strategic Intent & Audens.ai Reference
- **Audens Benchmark**: `https://audens.ai/approach` and `https://audens.ai/about` ("Who we work with / Institutional Mandate", Section 5.4 in `report.md`).
- **Design Philosophy**: NorAI is uniquely distinguished by its grassroots mission across all 75 districts of Uttar Pradesh. The homepage currently omits this entirely, making the firm look like an ordinary commercial SaaS demo. Phase 5 inserts a full-width deep pine section immediately before the closing dispatch, celebrating the three community tiers (Citizens, Students, and Builders) with quiet gravitas.

#### 5.2 Target Files
- `components/organisms/sections/BharatMissionBeat.tsx` (CREATE)
- `app/(marketing)/page.tsx` (MODIFY)
- `components/organisms/sections/index.ts` (MODIFY)

#### 5.3 Exact Component Blueprints & Interfaces

```tsx
// Location: components/organisms/sections/BharatMissionBeat.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';

export function BharatMissionBeat() {
  return (
    <section id="bharat-mission" className="py-20 sm:py-28 bg-[#072929] text-[var(--bone)] border-b border-[var(--bone-20)] relative overflow-hidden">
      {/* Background Subtle Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--bone) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bone-20)] text-xs font-mono text-[var(--mint)] font-medium">
            <span className="w-2 h-2 rounded-full bg-[var(--mint)] animate-pulse" />
            <span className="tracking-widest uppercase">03 · Grassroots Bharat Mission · 75 Districts</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--bone)] tracking-tight leading-[1.1]">
            75 Districts. One Sovereign Mission. <br />
            <span className="text-[var(--mint)]">Computational literacy where it matters most.</span>
          </h2>
          <p className="text-[var(--bone-70)] text-base leading-relaxed">
            True technological sovereignty cannot belong exclusively to Tier-1 boardrooms. We bring deterministic AI engineering directly to village youth, students, and regional colleges across Uttar Pradesh — 100% free of charge.
          </p>
        </div>

        {/* 3-Tier Asymmetric Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {/* Tier 01: Citizens */}
          <div className="p-7 rounded-[22px] bg-[#1e3c3b]/60 border border-[var(--bone-20)] space-y-4">
            <span className="font-mono text-xs font-bold text-[var(--mint)] px-2.5 py-1 rounded-full bg-[var(--mint)]/15 inline-block">
              TIER 01 · CITIZENS
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--bone)]">
              Vernacular Hindi Literacy
            </h3>
            <p className="text-sm text-[var(--bone-70)] leading-relaxed">
              Voice-first Hindi interfaces, government welfare navigation, and digital fraud prevention for village elders and local tradespeople.
            </p>
            <div className="text-xs font-mono text-[var(--mint)] pt-2 border-t border-[var(--bone-20)]">
              ₹0 Cost · Vernacular Delivery
            </div>
          </div>

          {/* Tier 02: Students */}
          <div className="p-7 rounded-[22px] bg-[#1e3c3b]/60 border border-[var(--bone-20)] space-y-4">
            <span className="font-mono text-xs font-bold text-[var(--lavender)] px-2.5 py-1 rounded-full bg-[var(--lavender)]/15 inline-block">
              TIER 02 · STUDENTS
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--bone)]">
              Academic Acceleration
            </h3>
            <p className="text-sm text-[var(--bone-70)] leading-relaxed">
              Giving collegiate students free scholar sandboxes for lecture note synthesis, KaTeX mathematical extraction, and rigorous study workflows.
            </p>
            <div className="text-xs font-mono text-[var(--lavender)] pt-2 border-t border-[var(--bone-20)]">
              Free Scholar Sandbox Access
            </div>
          </div>

          {/* Tier 03: Builders */}
          <div className="p-7 rounded-[22px] bg-[#1e3c3b]/60 border border-[var(--bone-20)] space-y-4">
            <span className="font-mono text-xs font-bold text-[var(--coral)] px-2.5 py-1 rounded-full bg-[var(--coral)]/15 inline-block">
              TIER 03 · BUILDERS
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--bone)]">
              Deterministic Systems Engineering
            </h3>
            <p className="text-sm text-[var(--bone-70)] leading-relaxed">
              Direct founder-led masterclasses on Model Context Protocol (MCP), local vLLM serving, and vector databases for ambitious undergraduate engineers.
            </p>
            <div className="text-xs font-mono text-[var(--coral)] pt-2 border-t border-[var(--bone-20)]">
              Founder-Led Masterclasses
            </div>
          </div>
        </div>

        {/* Commitment Banner Strip */}
        <div className="p-6 rounded-2xl bg-[#0b3333] border border-[var(--bone-20)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--bone-70)]">
            <span className="text-[var(--mint)] font-bold">✦ 75 Districts Committed</span>
            <span>·</span>
            <span>₹0 Student Fee</span>
            <span>·</span>
            <span>Vernacular Hindi Delivery</span>
          </div>
          <Link
            href="/mission"
            className="btn btn--solid text-xs h-10 px-5 rounded-full bg-[var(--mint)] text-[var(--pine)] font-bold hover:bg-white transition-colors"
          >
            Explore the 75-District Mission →
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

#### 5.4 Copy & Content Specifications
- **Eyebrow**: `03 · GRASSROOTS BHARAT MISSION · 75 DISTRICTS`
- **H2 Headline**: `75 Districts. One Sovereign Mission. Computational literacy where it matters most.`
- **Lede**: `True technological sovereignty cannot belong exclusively to Tier-1 boardrooms. We bring deterministic AI engineering directly to village youth, students, and regional colleges across Uttar Pradesh — 100% free of charge.`
- **Tiers**:
  - `TIER 01 · CITIZENS`: Vernacular Hindi voice interfaces, welfare navigation, digital fraud defense.
  - `TIER 02 · STUDENTS`: Free scholar note-taking sandboxes, KaTeX extraction, AI study workflows.
  - `TIER 03 · BUILDERS`: Founder-led bootcamps on MCP servers, local vLLM serving, and vector embeddings.
- **Commitment Strip**: `75 Districts Committed ✦ ₹0 Student Cost ✦ 100% Vernacular Delivery` → `Explore the 75-District Mission →`

#### 5.5 Detailed Implementation Checklist
- [ ] Create `components/organisms/sections/BharatMissionBeat.tsx`.
- [ ] In `app/(marketing)/page.tsx`, import and insert `<BharatMissionBeat />` immediately preceding `<ClosingDispatch />`.
- [ ] Ensure the container uses `#072929` deep pine surface with crisp `#ebeae1` bone typography (WCAG AAA 13.5:1 contrast).
- [ ] Verify that the bottom CTA button cleanly routes to `/mission`.

#### 5.6 Verification & Quality Gate
- **Type Check**: `npx tsc --noEmit`
- **Contrast Check**: Verify that all tier cards have > 7.0:1 contrast ratios on `#072929` and `#1e3c3b`.
- **Anchor Integrity**: Verify `id="bharat-mission"` allows smooth anchor scrolling if referenced.

---

### Phase 6: Subpage Alignment, Closing Dispatch & Global Polish

#### 6.1 Strategic Intent & Audens.ai Reference
- **Audens Benchmark**: `https://audens.ai/` (Closing Dispatch `.gradient-card`, lines 135–145 of scrape; Section 5.5 of `report.md`).
- **Design Philosophy**: Strict single responsibility across the entire sitemap. The closing engagement chamber must be high-voltage and inviting, utilizing the animated conic gradient border around a warm ivory card (`#fffdf7`) with deep pine text (`#072929`). Furthermore, Operating Rituals must be refactored from generic bento boxes into Audens's connected circular node rail (`.stepflow`).

#### 6.2 Target Files
- `components/organisms/sections/ClosingDispatch.tsx` (CREATE / REPLACE)
- `components/organisms/sections/OperatingRitualsRail.tsx` (MODIFY)
- `components/organisms/sections/SectorLedger.tsx` (MODIFY)
- `app/(marketing)/products/page.tsx` & `ProductsIndexClient.tsx` (VERIFY)
- `app/(marketing)/services/page.tsx` (VERIFY)
- `app/(marketing)/mission/page.tsx` (VERIFY)

#### 6.3 Exact Component Blueprints & Interfaces

##### 6.3.1 Universal Closing Dispatch Blueprint (`ClosingDispatch.tsx`)
```tsx
// Location: components/organisms/sections/ClosingDispatch.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { HandWaveIcon } from '@/components/atoms/HandWaveIcon';

export function ClosingDispatch() {
  return (
    <section id="closing-dispatch" className="py-20 sm:py-28 bg-[#f5f5f0] text-[var(--pine)]">
      <Container size="default" className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="gradient-card p-[2px] rounded-[24px] overflow-hidden relative shadow-2xl">
          {/* Animated Conic Gradient Border */}
          <div
            className="absolute -inset-[50%] w-[200%] h-[200%] pointer-events-none animate-[rotateConic_14s_linear_infinite]"
            style={{
              background: 'conic-gradient(var(--mint), var(--sky), var(--lavender), var(--coral), var(--butter), var(--mint))',
            }}
            aria-hidden="true"
          />

          {/* Inner Card - Pure Ivory Surface with Deep Pine Text */}
          <div className="relative z-10 bg-[#fffdf7] rounded-[22px] p-8 sm:p-14 text-center sm:text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--mint-ink)] font-bold">
                THE FIRST ENGAGEMENT
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--pine)] tracking-tight">
                Bring us the operational bottleneck you are actually facing.
              </h2>
              <p className="text-[var(--pine)]/75 text-sm sm:text-base leading-relaxed">
                A first technical conversation is with our founding engineers. We evaluate your workflow, define the exact private architecture, and quote a fixed two-week diagnostic before any bigger build.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <Link
                href="/contact"
                className="btn btn--solid h-12 px-7 rounded-full bg-[var(--pine)] text-[var(--bone)] hover:bg-[var(--forest)] text-base font-semibold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>Book a diagnostic</span>
                <HandWaveIcon className="w-4 h-4 text-[var(--mint)]" />
              </Link>
              <Link
                href="/products"
                className="btn btn--ghost h-12 px-6 rounded-full border border-[var(--pine-20)] text-[var(--pine)] hover:bg-[var(--pine-08)] text-base font-medium flex items-center justify-center transition-colors"
              >
                <span>Explore 4 Tools →</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

##### 6.3.2 Connected Circular StepFlow (`OperatingRitualsRail.tsx`)
```tsx
// Replaces generic rectangular cards with Audens .stepflow connected rail:
// 4 stages: 01 Evaluate -> 02 Engineer -> 03 Air-Gap -> 04 Handover
// 46px circular numbered nodes connected by a 2px hairline bridge
export const AUDENS_PROCESS_STAGES = [
  {
    n: '01',
    title: 'Evaluate',
    copy: 'We audit your data schemas, security boundaries, and latency requirements. A fixed-scope diagnostic that proves feasibility before any contract.',
  },
  {
    n: '02',
    title: 'Engineer',
    copy: 'We build deterministic pipelines in your own stack: local vector search, MCP tool servers, and air-gapped model serving.',
  },
  {
    n: '03',
    title: 'Air-Gap',
    copy: 'Zero cloud egress. Hardened containers deployed into your private VPC or on-premise hardware with mathematically verified data isolation.',
  },
  {
    n: '04',
    title: 'Handover',
    copy: 'The code, docs, and keys are handed over to your team. We train your engineers to own, operate, and extend the system independently.',
  },
];
```

#### 6.4 Copy & Content Specifications
- **Operating Rituals**:
  - `01 · Evaluate`: Feasibility audit & 2-week diagnostic before contracts.
  - `02 · Engineer`: Deterministic pipelines, MCP servers, and local vector search.
  - `03 · Air-Gap`: Zero egress containerized deployment into client VPC.
  - `04 · Handover`: Full code handover and engineering upskilling.
- **Closing Dispatch**:
  - Eyebrow: `THE FIRST ENGAGEMENT`
  - Headline: `Bring us the operational bottleneck you are actually facing.`
  - CTAs: `Book a diagnostic` and `Explore 4 Tools →`

#### 6.5 Detailed Implementation Checklist
- [ ] Implement `ClosingDispatch.tsx` with ivory inner panel and replace existing closing beats across homepage and subpages.
- [ ] In `OperatingRitualsRail.tsx`, convert rectangular cards into connected circular step rail (`.stepflow`).
- [ ] In `SectorLedger.tsx`, verify horizontal borderless ledger rows with 45° hover-rotating arrows linking to `/services`.
- [ ] Audit `/products`: ensure full interactive tool sandboxes are operational and not duplicated on homepage.
- [ ] Audit `/services`: verify private VPC inference specs and MCP topologies are prominently featured.
- [ ] Audit `/mission`: verify 75-district radar and workshop schedules are intact.

#### 6.6 Verification & Quality Gate
- **Type Check**: `npx tsc --noEmit`
- **Lint Check**: `npm run lint`
- **Full Build**: `npm run build`
- **WCAG Verification**: Confirm 100% WCAG AAA contrast across all light and dark sections.

---

## 5. Master Verification & Quality Gates

Before any milestone is signed off, the engineering team must pass all 4 verification gates:

### Gate 1: Type & Syntax Validation
```bash
npx tsc --noEmit
npm run lint
```
*Criteria*: Zero errors, zero warnings.

### Gate 2: Link & Anchor Crawler
```bash
# Verify no dead anchors remain in codebase
! grep -rn 'href="/#mission"' app/ components/ config/
# Verify navigation pill has exact 5 links
grep -rn "DEFAULT_HEADER_NAV_ITEMS" config/ components/
```
*Criteria*: Zero dead anchors, exactly 5 header links + 1 CTA button.

### Gate 3: Contrast & Visibility Audit
Inspect the DOM on all 7 primary routes (`/`, `/products`, `/products/[slug]`, `/services`, `/mission`, `/team`, `/blog`):
- Light surfaces (`#f5f5f0`, `#fffdf7`): Primary text must be `#072929` (14.2:1); badge text must be `#06845a` (5.4:1).
- Dark surfaces (`#072929`, `#1e3c3b`): Primary text must be `#ebeae1` (13.5:1); accent text must be `#1ef4b4` (13.8:1).
- Invisible text check: Ensure **zero** instances of dark text inside dark containers.

### Gate 4: Visual & Aesthetic Inspection
- Check Aurora glow orbs in hero for smooth blur and hardware acceleration.
- Check 260px telemetry cards in `CapabilityArc` for layout alignment and live dot pulsation.
- Check `BharatMissionBeat` for typographic hierarchy and commitment strip alignment.
- Verify mobile responsiveness on 375px, 414px, 768px, and 1240px viewport widths.
