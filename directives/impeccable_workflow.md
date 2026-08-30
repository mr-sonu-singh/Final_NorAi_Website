# Impeccable Frontend Design & Engineering Workflow (`directives/impeccable_workflow.md`)

## Purpose
Standard Operating Procedure (SOP) for creating, redesigning, and polishing pages and components in the NorAI codebase using the **Impeccable Design Protocol**.

---

## 1. Grounding Phase (Zero-Assumptions)
Before generating or modifying any UI:
1. Read [PRODUCT.md](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/PRODUCT.md) for target persona, problem-solution match, pricing brackets, and anti-goals.
2. Read [DESIGN.md](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/DESIGN.md) for color tokens, typography scales, 5-state rules, and elevation models.
3. Check existing components in `components/` to reuse atomic tokens and avoid duplication.

---

## 2. Visual & Architectural Rules

### A. Theme: "Parchment & Terracotta"
- **Canvas Base**: `#F5F0EA` (`bg-bg-page`, `bg-canvas-base`)
- **Card Surfaces**: `#FDFBF7` (`bg-bg-elevated`, `bg-canvas-paper`) with hairline border `rgba(13, 37, 61, 0.08)`
- **Recessed Areas**: `#EDE7DF` (`bg-bg-sunken`)
- **Headings & Primary Ink**: `#0D253D` (`text-primary-800`, `text-ink-primary`)
- **Body Prose**: `#3D4F5F` (`text-primary-700`, `text-ink-body`)
- **Primary Accent**: `#C2553A` (`bg-accent-500`, `text-accent-500`)
- **Forest Sage Accent**: `#5B8A72` (`text-accent-secondary`) for telemetry, SLAs, and security signals
- **Dark Surface Exception**: `#0D253D` (`bg-bg-dark`) reserved exclusively for the structural footer and terminal/code JSON blocks.

### B. Typography Architecture
- **Display Headings (`h1`, `h2`, `h3`)**: `Instrument Serif` (`--font-display`, `font-display`), 400 weight (italic used selectively for signature words).
- **Body Prose & Interface**: `Plus Jakarta Sans` (`--font-sans`, `font-sans`), weights 400/500/600.
- **Technical & Numeric Readouts**: `JetBrains Mono` (`--font-mono`, `font-mono`) with `tabular-nums`.

### C. 5-State Ergonomics Rule
Every interactive element must explicitly handle:
1. **Idle**: Pristine hairline container on clean paper canvas.
2. **Hover**: Smooth border highlight (`border-accent-500/40`) + micro-lift (`hover:-translate-y-0.5`).
3. **Active / Pressed**: Physical compression feedback (`active:scale-[0.98]`).
4. **Focused**: Double-ring keyboard outline (`focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page`).
5. **Disabled / Loading**: `opacity-50 cursor-not-allowed` with accessible ARIA tags.

### D. App Router & Server Components
- All route files (`page.tsx`) and layout shells must remain **React Server Components (RSC)**.
- Client state (`'use client'`) must be strictly pushed to leaf components (e.g., workbenches, accordions, selectors).

---

## 3. The 5-Step Execution Loop
1. **Critique / Specification**: Define the scope, user persona, and layout wireframe.
2. **Component Architecture**: Build or update leaf components with 5-state ergonomics.
3. **Assemble Route**: Compose the server-rendered page layout with structured metadata.
4. **Deterministic Validation**:
   - `npx tsc --noEmit`
   - `npm run lint`
5. **Visual & Accessibility Verification**: Check contrast, keyboard navigation, and responsive breakpoints.
