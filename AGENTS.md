# NorAI Agent Operating Instructions (`AGENTS.md`)

> **Notice:** This file is mirrored identically across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` to ensure a consistent, unified operating standard across all AI engineering environments.

You operate within a **3-layer architecture** that separates concerns to maximize reliability. LLMs are probabilistic, whereas business logic, frontend layouts, and engineering verifications are deterministic. This system resolves that mismatch.

---

## 1. The 3-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: DIRECTIVE (The "What & Why")                                       │
│ • Root context: PRODUCT.md (Strategy), DESIGN.md (Design System Tokens)     │
│ • Domain-specific SOPs in directives/ (e.g., ingestion, benchmarks)         │
│ • Defines user intent, functional guardrails, and non-negotiable boundaries │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ LAYER 2: ORCHESTRATION (The "Decision Engine")                              │
│ • This is you. Intelligent routing, plan creation, and skill dispatch       │
│ • Calls execution tools, delegates to specialized skills, and handles errors│
│ • Never guesses or performs manual error-prone tasks in head                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ LAYER 3: EXECUTION (The "Deterministic Workhorse")                          │
│ • Deterministic automation scripts in execution/                            │
│ • Typecheckers (npx tsc --noEmit), linters (npm run lint), Playwright tests │
│ • Next.js 15 compiler, React 19 SSR/RSC runtime, Chrome DevTools MCP        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Specialized Frontend Skills Dispatch Matrix

When modifying, polishing, or creating UI components, do not write generic, uninspired frontend code. You have access to specialized domain skills in your environment. Route tasks according to this matrix:

| Task / Domain | Primary Skill to Consult | What the Skill Governs |
| :--- | :--- | :--- |
| **Landing Page & Marketing Sections** | `/landing-page-design` | Hero compositions, high-conversion section sequencing, visual rhythm, value proposition copy cadence, CTA ergonomics. |
| **Micro-Interactions & Animation Polish** | `/emil-design-eng` / `/animate` | Fluid spring physics, layout transitions, interactive button states, gesture feedback, optical balance. |
| **Editorial & Calm Bento Layouts** | `/minimalist-ui` | Subtle grid hierarchies, warm monochrome surfaces, clean typographic contrast, quiet density. |
| **Comprehensive UI/UX Audits & Refinement** | `/impeccable` | Anti-slop checks, typography scales, contrast verification, responsive audits, edge-case states. |
| **Complex Browser-Rendered Web Artifacts** | `/web-design-engineer` | Full-stack interactive visual artifacts, dashboard shells, data visualization, browser QA. |
| **Live Browser Testing & Inspections** | `/browser-testing-with-devtools` | DOM inspections, console error monitoring, layout shift verification, responsive viewport checks via Chrome DevTools. |

> [!TIP]
> **Skill Autonomy Guideline:** `DESIGN.md` provides **tokens and principles**, not micromanaged boilerplate code. When you invoke specialized frontend skills, give them full creative freedom to determine layout structure, motion curves, and component hierarchies within the semantic token boundaries.

---

## 3. Engineering & Architectural Standards

### A. Next.js 15 App Router & React 19
- **Server Components by Default:** Keep marketing pages, layout shells, and static content as React Server Components (RSC).
- **Leaf Client Components:** Confine `'use client'` strictly to interactive leaves (e.g., interactive workbenches, hotkey listeners, tabs, audio scrubbers).
- **Zero Cumulative Layout Shift (CLS = 0):** Always reserve explicit dimensions for media, dynamic telemetry, and asynchronous states.
- **Accessibility & Semantics:** Ensure proper HTML5 semantic tags, keyboard tab indexing, focus management, and WCAG AAA color contrast for body copy.

### B. Styling & Design Token Consumption
- Derive all styling properties from the canonical tokens defined in `DESIGN.md` and `app/globals.css`:
  - Canvas: `--surface-canvas`, `--surface-panel`, `--surface-panel-subtle`.
  - Ink: `--text-primary`, `--text-secondary`, `--text-muted`.
  - Accents: `--accent-primary` (Terracotta), `--accent-secondary` (Sage), `--accent-tertiary` (Goldenrod).
  - Borders: `--border-subtle`, `--border-strong`, `--border-highlight`.
- Avoid arbitrary hardcoded color values. Use CSS variables or Tailwind token classes that map to the design system.

### C. Browser Testing & Visual Verification (Playwright & Chrome DevTools)
Use each tool for the task it is best at:
- **Playwright (Default for Screenshots & Visual Regression):** Always use **Playwright** as the default tool for visual screenshot testing and automated regressions (`tests/e2e/visual.spec.ts`). Playwright is purpose-built for deterministic baseline diffing (`toHaveScreenshot()`), animation freezing (`animations: 'disabled'`), parallel multi-viewport validation (desktop & mobile), and CI test gating.
- **Chrome DevTools MCP (Live Inspection & Diagnostics):** Use **Chrome DevTools** for live, exploratory runtime debugging—inspecting computed CSS values, traversing active DOM elements, monitoring live console errors/warnings, evaluating ad-hoc browser scripts, and profiling layout shifts (CLS) during interactive development.

---

## 4. The Self-Annealing Quality Loop

When any build breaks, a type error occurs, or visual feedback fails:
1. **Root-Cause Analysis:** Read error messages, TypeScript diagnostics, and DevTools console logs carefully. Do not patch symptoms with quick hacks.
2. **Deterministic Fix:** Address the root cause in the affected component or script.
3. **Deterministic Verification:** Always verify before declaring completion:
   ```bash
   npx tsc --noEmit
   npm run lint
   npx playwright test tests/e2e/visual.spec.ts # For UI/layout modifications
   ```
4. **Document Learnings:** If the issue revealed a systemic edge case or an unwritten pattern, update the corresponding markdown directive in `directives/` or `DESIGN.md`.

---

## 5. File Organization & Boundaries

- **`PRODUCT.md`**: Defines business intent, personas, value propositions, and conversion funnels. Contains **zero CSS, layout, or component code**.
- **`DESIGN.md`**: Defines aesthetic ethos, design tokens, typography scales, surface archetypes, and interaction guardrails. Provides **principles and tokens**, not rigid ASCII art.
- **`AGENTS.md` (mirrored to `CLAUDE.md` and `GEMINI.md`)**: Defines operating protocols, skill routing, engineering standards, and verification checklists.
- **`directives/`**: Living Standard Operating Procedures (SOPs) for domain-specific operational workflows (e.g., data ingestion, pipeline benchmarks).
- **`execution/`**: Deterministic automation scripts and benchmarks.
- **`.tmp/`**: Temporary build artifacts and scratch exports (ignored by git).