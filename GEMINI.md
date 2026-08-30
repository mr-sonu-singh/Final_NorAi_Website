# Agent Instructions (`GEMINI.md`)

> This file is mirrored across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` so the same instructions load in any AI environment.

You operate within a **3-layer architecture** that separates concerns to maximize reliability. LLMs are probabilistic, whereas most business and frontend logic is deterministic and requires consistency. This system fixes that mismatch.

---

## 1. The 3-Layer Architecture

**Layer 1: Directive (What to do)**
- Standard Operating Procedures (SOPs) written in Markdown, living in `directives/` and root context (`PRODUCT.md`, `DESIGN.md`).
- Define goals, inputs, tools to use, outputs, and edge cases.
- Natural language instructions, like you would give a senior staff engineer.

**Layer 2: Orchestration (Decision making)**
- This is you. Your job: intelligent routing.
- Read directives, call execution tools in the right order, handle errors, ask for clarification, and update directives with learnings.
- You are the glue between intent and execution. Do not do manual error-prone tasks in your head when a deterministic script or test can do it.

**Layer 3: Execution (Doing the work)**
- Deterministic scripts in `execution/`, test suites, and typecheckers.
- Environment variables and API keys stored in `.env`.
- Handle API calls, data transformations, linting, and automated tests.
- Fast, reliable, reproducible.

---

## 2. Frontend & Design Standards (The Impeccable Protocol)

When implementing or modifying UI in this repository, you must adhere strictly to the **Impeccable Design & Engineering Standards**:

### A. Design System Adherence (`DESIGN.md`)
- **Theme**: Editorial Hardware & Technical Craft ("Parchment & Terracotta").
- **Tokens Over Raw Values**: Never introduce arbitrary hex codes (`#123456`) in JSX. Use configured semantic variables or Tailwind tokens (`bg-bg-page`, `bg-bg-elevated`, `text-primary-800`, `text-accent-500`).
- **5-State Ergonomics**: Every interactive component must define Idle, Hover, Active/Pressed, Focused (double-ring focus pattern), and Disabled/Loading states.
- **Typography**: Strictly use `Instrument Serif` for display headings, `Plus Jakarta Sans` for body prose, and `JetBrains Mono` with `tabular-nums` for numeric and technical readouts.

### B. React 19 & Next.js 15 App Router Conventions
- **Server Components by Default**: All route pages (`page.tsx`) and layout shells must remain React Server Components (RSC).
- **Leaf Client Components**: Isolate `'use client'` strictly to interactive leaves (e.g., workbenches, accordion triggers, mobile drawer toggles).
- **Zero Layout Shift**: Use fixed aspect ratios, next/image optimizations, and `tabular-nums` on dynamic metrics.
- **Accessibility (WCAG AAA)**: Always maintain accessible contrast, label associations on forms, keyboard navigation, and `prefers-reduced-motion` compliance.

### C. Visual Verification & Chrome DevTools Screenshot Standards
- **Standard Desktop Dimensions**: Always set `resize_page({ pageId, width: 1440, height: 900 })` (or `height: 1200` for deep workbenches) before capturing UI states.
- **Full Page Snapshots**: Use `take_screenshot({ pageId, fullPage: true })` for comprehensive visual audits of complete page layouts and section flow.
- **Reset Scroll Coordinates**: Synthetic tool interactions (clicking/typing on right-column elements) cause CDP to auto-scroll horizontally or vertically (`scrollX > 0`), which crops out the left section. Always reset `window.scrollTo(0, 0)` before viewport screenshots.
- **Targeted Element Snapshots**: Use element `uid` for component-level verification rather than arbitrary scrolled viewport crops.

### D. Interactive Web Tool & Workbench Spatial Standards (The Resume-Shortlister Benchmark)
All interactive web tools (AI Resume Shortlister, Course Note-Taker, Chat Digest, Smart Dainik News, and future SaaS tools) must adhere strictly to the spatial and ergonomic standards established in the Resume Shortlister benchmark:
- **Widescreen Stage Utilization**: Wrap interactive tool sections in `<Container size="wide">` (`--container-wide: 1380px` / `max-w-7xl`). Never constrain dual-pane interactive workbenches into narrow 1120px containers that waste horizontal screen area and squeeze tool controls.
- **Zero Nested Scrollbars & Segmented Intake**: Never vertically stack multiple tiny textareas or file dropzones inside a single cramped column. Use a segmented step dock (`[ 1. Job Role ]`, `[ 2. Ingestion / Batch ]`, `[ 3. Rubric & Filter ]`) with comfortable, full-height textareas (`min-h-[200px]` to `min-h-[260px]`) that display complete content without internal scrollbars.
- **Master-Detail & Inline Accordions**: In list or leaderboard views, provide inline expandable breakdown accordions (1-click chevron toggle) for instant preview of verified strengths, evidence, and probing questions without forcing disorienting tab switches.
- **Multi-Entity Comparative Matrices**: When analyzing multiple items against a rubric, provide a side-by-side grouped comparative matrix view across all dimensions with color-coded comparison bars.
- **1-Click Entity Switcher Pill Bars**: Deep scorecard/inspector views must include a top pill switcher strip (`[ #1 Entity A 96% ]` `[ #2 Entity B 82% ]`) for 1-click profile switching.
- **Bento Grid Scorecards**: Organize deep inspections into hero banners, 2-column verified evidence vs. risk assessments, and numbered cue-card interview questions.

---

## 3. Operating Principles

**1. Check for tools & context first**
Before writing any code or scripts, read `PRODUCT.md` and `DESIGN.md` to ensure complete alignment with project vision and tokens.

**2. Self-anneal when things break**
- Read error messages and TypeScript/ESLint stack traces carefully.
- Fix the root cause and verify with `npx tsc --noEmit` and `npm run lint`.
- Update directives/docs with new discoveries (e.g., API constraints, timing edge cases).

**3. Update directives as you learn**
Directives are living documents. When you discover new edge cases or architectural patterns, update the respective markdown file. Preserve and improve instruction sets over time.

---

## 4. Self-Annealing Quality Loop

When something breaks or a quality check fails:
1. Identify the root cause.
2. Fix the component or script.
3. Test deterministically (`npx tsc --noEmit`, `npm run lint`, component tests).
4. Update context documentation with the solution.
5. The system is now permanently stronger.

---

## 5. File Organization

**Deliverables vs Intermediates:**
- **Deliverables**: Production-grade Next.js pages, components, schemas, and deployed services.
- **Intermediates**: Temporary build artifacts, scraped datasets, and test exports in `.tmp/`.

**Directory Structure:**
- `PRODUCT.md` - Product context, target personas, product matrix, brand voice, anti-goals.
- `DESIGN.md` - Design tokens, typography hierarchy, elevation, 5-state rules, anti-slop checks.
- `AGENTS.md` - Agent instruction set and frontend protocol (mirrored to `CLAUDE.md` and `GEMINI.md`).
- `project_progress_context.md` - Rebuild execution history and phase milestones.
- `.tmp/` - Scratch files and temporary artifacts (ignored by git).
- `directives/` - Markdown SOPs.
- `execution/` - Deterministic automation scripts.

---

## 6. Summary

You sit between human intent (`PRODUCT.md`, `DESIGN.md`, `directives/`) and deterministic execution. Read context, make high-taste decisions, enforce zero AI slop, handle errors systematically, and continuously improve the codebase.
