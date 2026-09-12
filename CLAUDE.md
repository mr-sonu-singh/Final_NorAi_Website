# NorAI Agent & Developer Guide (`AGENTS.md`)

> **Notice:** This file is mirrored identically across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` to ensure a consistent, unified operating context across all AI engineering environments.

---

## 1. Project Overview & Architectural Role

Welcome to the **NorAI Technologies** official web platform (`testing` branch). This repository powers the marketing site, interactive capability simulators, enterprise intelligence catalog, and documentation for NorAI.

The web platform is engineered to replicate the craftsmanship, typographic weight, spatial pacing, and editorial authority of [**Audens.ai**](https://audens.ai). Every component, transition, color token, and layout beat must reflect the standard of a top-tier design engineering studio.

---

## 2. Technology Stack & Core Concepts

- **Framework**: [Next.js 15](https://nextjs.org/) App Router
- **UI Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties in `app/globals.css`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/) (with `prefers-reduced-motion` support)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom inline Audens-style SVGs
- **Data Validation**: [Zod](https://zod.dev/)

---

## 3. Design System & Token Principles

Always adhere to the design system outlined in [`DESIGN.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/DESIGN.md):

- **Palette**: Deep Pine (`var(--pine: #072929)`), Porcelain (`var(--porcelain: #f5f5f0)`), Bone (`var(--bone: #ebeae1)`), White Surface (`var(--surface: #fffdf7)`).
- **High-Voltage Jewels**:
  - Electric Mint: `var(--mint: #1ef4b4)` & `var(--mint-ink: #06845a)`
  - Lavender: `var(--lavender: #c6b5ff)`
  - Butter Yellow: `var(--butter: #ffe9b5)`
  - Coral: `var(--coral: #ff7755)`
  - Sky Cyan: `var(--sky: #75d3da)`
  - Hot Pink: `var(--pink: #ff69b4)`
- **Geometry**: `--r-card: 22px`, `--r-pill: 999px`, `--r-sm: 8px`.
- **Micro-Interaction Rules (Emil Kowalski Craft)**:
  - Never use `transition: all`. Always specify properties: `transition: transform 200ms var(--ease), background 200ms var(--ease)`.
  - Buttons and tactile cards must have `active:scale-[0.97]` or `0.98`.
  - Ensure 100% semantic HTML is kept in the DOM for search indexers and screen readers (use CSS grid animation for progressive disclosure).

---

## 4. Repository Structure

```
NorAi_Ofiicial_Web/
├── app/                          # Next.js App Router root
│   ├── (marketing)/              # Marketing routes (Home, Products, Services, Team, etc.)
│   ├── (content)/                # Content hub (Blog, Docs, FAQ, The Canonical)
│   ├── (legal)/                  # Legal & compliance (Privacy, Terms)
│   ├── api/                      # Route handlers & server endpoints
│   ├── globals.css               # Audens CSS tokens, easing functions, and utilities
│   └── layout.tsx                # Root layout, fonts, and global metadata
├── components/                   # Component architecture
│   ├── foundation/               # Base primitives (Container, Grid, Section)
│   ├── atoms/                    # Fundamental elements (Button, Badge, Link, Input, MathRenderer)
│   ├── molecules/                # Multi-part patterns (Card, FormField, SearchBar, LedgerRow)
│   ├── organisms/                # Complex sections (Header, Footer, AudensCapabilityBento, WaveMarquee)
│   └── templates/                # Full page layout wrappers
├── config/                       # Site configuration, metadata, and navigation routes
├── lib/                          # Data catalogs, validation schemas, and SEO helpers
│   ├── schemas/                  # Zod input schemas
│   └── seo/                      # Dynamic metadata & OpenGraph generators
├── public/                       # Static brand assets and images
└── tests/                        # Playwright e2e tests
```

---

## 5. Development & Verification Workflow

Run standard verification commands to ensure zero regressions:

```bash
# Typecheck TypeScript
npx tsc --noEmit

# Run ESLint
npm run lint

# Build production bundle
npm run build

# Run end-to-end Playwright tests
npx playwright test
```

### Critical Preservation Rules:
- When modifying or rebuilding sections, always preserve anchor IDs like `id="tools"` and test selectors like `data-testid="capability-link-resume-shortlister"` so automated test suites continue passing seamlessly.
- Ensure all interactive controls meet WCAG 2.1 AA contrast standards (minimum 4.5:1 for normal text, 3:1 for large text) and provide 48px touch targets.
