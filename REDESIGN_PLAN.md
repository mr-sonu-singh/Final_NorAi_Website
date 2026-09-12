# NorAI Official Web — Audens-Style Master Redesign Plan (`REDESIGN_PLAN.md`)

> **Master Strategic Goal**: Rebuild the NorAI web platform to completely replicate the design, theme, components, narrative flow, and high-conviction editorial style of [**Audens.ai**](https://audens.ai), adapted for NorAI's 3 Dimensions (Sovereign Everyday Tools, Bespoke Enterprise Intelligence, and Grassroots Bharat Mission).

---

## Master Architecture Checklist

- [x] **PHASE 1: Foundation Clean Slate**
  - [x] 1.1: Complete research and crawl of all 24 URLs on `audens.ai`
  - [x] 1.2: Rewrite [`DESIGN.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/DESIGN.md) (Deep Pine & Porcelain + High-Voltage Jewels)
  - [x] 1.3: Rewrite [`PRODUCT.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/PRODUCT.md) (NorAI 3 Dimensions in Audens high-conviction voice)
  - [x] 1.4: Rewrite [`AGENTS.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/AGENTS.md) (and mirror to `CLAUDE.md`, `GEMINI.md`)
  - [x] 1.5: Rewrite [`REDESIGN_PLAN.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/REDESIGN_PLAN.md) (this master plan)

- [x] **PHASE 2: Core Design Engine & CSS Tokens (`app/globals.css`)**
  - [x] 2.1: Implement exact Audens CSS variables (`--pine`, `--porcelain`, `--surface`, `--bone`, `--mint`, `--lavender`, `--coral`, `--sky`, `--butter`, `--pink`)
  - [x] 2.2: Configure typography tokens (`Cabinet Grotesk` / `Outfit` display, `General Sans` / `Plus Jakarta Sans` body, `JetBrains Mono`)
  - [x] 2.3: Configure signature cubic-bezier easings (`--ease: cubic-bezier(.65,0,.35,1)`, `--ease-bounce: cubic-bezier(.33,1.4,.6,1)`)
  - [x] 2.4: Implement core Audens utility patterns (`.navpill`, `.btn--mint`, `.btn--solid`, `.ledger`, `.artledger`, `.stepflow`, `.nextrail`, `.gradient-card`, `.aurora__orb`)

- [x] **PHASE 3: Site Shell Architecture**
  - [x] 3.1: **Header (`Header.tsx`)**: Rebuild into Audens 66px floating capsule nav with backdrop blur, magnetic pill hover tabs, bottom progress line (`.nav-progress`), and pill CTA with animated hand SVG (`.btn__hand`)
  - [x] 3.2: **Footer (`Footer.tsx`)**: Rebuild into Audens Deep Pine `#072929` container with bold headline ("Built to change what happens"), multi-column directory, and legal status bar

- [x] **PHASE 4: Homepage Narrative Reconstruction (`app/(marketing)/page.tsx`)**
  - [x] 4.1: **Aurora Hero Chamber (`.phero`)**: Organic multi-color blurred gradient orbs with staggered word-by-word kinetic headline and wave hand CTA
  - [x] 4.2: **Three Dimensions Chat Rail (`.section--dark.dotgrid`)**: Pitch pine canvas with 3 staggered conversational chat slots (`.chat-slot`), each with an animated 3-dot typing indicator (`<i></i><i></i><i></i>`) revealing Consumer, Enterprise, and Bharat answers
  - [x] 4.3: **The Manifest Shift Rail**: Word-by-word reading statement ("Every business is faster now...")
  - [x] 4.4: **Kinetic Wave Marquee (`KineticWaveMarquee.tsx`)**: Animated undulating SVG sine wave path with repeating high-conviction slogan
  - [x] 4.5: **Capability Bento Grid (`AudensCapabilityBento.tsx`)**: 2-column asymmetric cards with number badges (`01`, `02`), tag pills, micro-vignette interactive simulators, and progressive disclosure drawers
  - [x] 4.6: **The Enterprise Sector Ledger (`SectorLedger.tsx`)**: Interactive horizontal numbered rows with promise statements and hover slide arrows
  - [x] 4.7: **Operating Rituals Rail (`OperatingRitualsRail.tsx`)**: Visualized high-cadence engineering practices and grassroots regional commitment without founder roster
  - [x] 4.8: **Closing Dispatch (`.gradient-card`)**: High-voltage rotating conic gradient border enclosing "Talk to an Engineer" call to action

- [x] **PHASE 5: Subpages Replication**
  - [x] 5.1: `/products` (Index with category grouping and interactive ledger preview)
  - [x] 5.2: `/products/[slug]` (Canonical capability template: `.phero`, `.pstage` preview chassis, definition, problem, deliverables bento, `.stepflow`, outcome, and next capability link)
  - [x] 5.3: `/services` (Full-width colored horizontal bands + 3-stage delivery protocol)
  - [x] 5.4: `/team` (Team narrative, founding builders roster, and operational rituals)
  - [x] 5.5: `/contact` (Order nextrail `01 / 02 / 03`, clean form, NCR/Lucknow desk addresses, privacy-conscious telemetry)
  - [x] 5.6: `/blog` (The Canonical blog ledger, featured article card, tag badges, and reading time)
  - [x] 5.7: `/mission` (Grassroots 75-district regional impact radar with interactive explorer)

- [x] **PHASE 6: Verification, Accessibility & Performance**
  - [x] 6.1: Zero TypeScript compilation errors (`npx tsc --noEmit`)
  - [x] 6.2: Zero ESLint warnings (`npm run lint`)
  - [x] 6.3: Clean production build (`npm run build` — 38/38 static pages generated)
  - [x] 6.4: Playwright e2e navigation suite passes (`15/15 passed`)
  - [x] 6.5: Zero Axe accessibility violations (WCAG 2.1 AA/AAA compliance)

---

## Detailed Implementation Specifications

### Section 2: Core Design Engine & CSS Tokens (`app/globals.css`)

Update `app/globals.css` with exact Audens custom properties:
```css
:root {
  --pine: #072929;
  --forest: #1e3c3b;
  --porcelain: #f5f5f0;
  --bone: #ebeae1;
  --surface: #fffdf7;

  --pine-70: rgba(7, 41, 41, 0.7);
  --pine-50: rgba(7, 41, 41, 0.5);
  --pine-20: rgba(7, 41, 41, 0.2);
  --pine-12: rgba(7, 41, 41, 0.12);
  --pine-08: rgba(7, 41, 41, 0.08);

  --bone-70: rgba(235, 234, 225, 0.7);
  --bone-50: rgba(235, 234, 225, 0.5);
  --bone-20: rgba(235, 234, 225, 0.2);

  --mint: #1ef4b4;
  --mint-ink: #06845a;
  --lavender: #c6b5ff;
  --butter: #ffe9b5;
  --coral: #ff7755;
  --sky: #75d3da;
  --pink: #ff69b4;

  --ink: #072929;
  --muted: rgba(7, 41, 41, 0.65);
  --line: rgba(7, 41, 41, 0.12);

  --r-card: 22px;
  --r-pill: 999px;
  --r-sm: 8px;
  --maxw: 1240px;

  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce: cubic-bezier(0.33, 1.4, 0.6, 1);
}
```

### Section 3: Floating Nav Capsule (`Header.tsx`)

Rebuild `components/organisms/Header/Header.tsx` to match Audens's exact navigation:
1. Outer wrapper: `.navshell` sticky top-0 with `z-index: 100`.
2. Inner pill: `.wrap.navpill` with height 66px, border-radius 999px, background `rgba(245, 245, 240, 0.85)` (or `rgba(7, 41, 41, 0.85)` in dark sections), backdrop blur 18px.
3. Links: Capabilities, Approach, Deliverables, About, The Canonical.
4. Button: `.btn.btn--solid` with wave hand icon (`.btn__hand`).
5. Progress bar: `.nav-progress` line at the bottom of the pill that dynamically fills in `--mint` based on scroll depth.

### Section 4: Three Dimensions Conversation Rail

Implement the signature Audens staggered conversational chat slots:
- Slot 1 (Mint): "Aditya asks: Which candidate actually shipped backend microservices?" ➔ Revealed: AI Resume Shortlister scorecard.
- Slot 2 (Lavender): "CTO asks: Can we run sovereign inference without AWS data egress?" ➔ Revealed: Private on-premises VPC enclave.
- Slot 3 (Butter): "Student asks: Where do I start learning autonomous agent code for free?" ➔ Revealed: 75-district Bharat coding workshop.
- Include animated 3-dot typing indicator (`<i></i><i></i><i></i>`) for realistic conversational cadence.

---

## Verification & Acceptance Criteria

1. **Visual Accuracy**: Every section reflects the spacing, border radii (`22px`), colors, and micro-interactions of Audens.ai.
2. **Zero Regressions**: Anchor `#tools` and Playwright test selectors are retained. All 4 micro-vignettes are fully functional.
3. **Accessibility**: All text contrast exceeds WCAG AA (4.5:1), keyboard focus indicators are distinct and high-visibility, and motion respects `prefers-reduced-motion`.
