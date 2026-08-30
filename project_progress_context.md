# NorAI Official Web — Project Progress & Evolution Context

## 1. Project Overview & Original Legacy Baseline
**NorAI Technologies** is an AI products and enterprise automation startup operating out of its regional hub in **Uttar Pradesh, India**. NorAI builds lightweight micro-SaaS utilities (AI Resume Shortlister, Course Note-Taker, Community Chat Digest, Smart Government Job News) and bespoke enterprise AI pipelines.

### Initial Legacy Architecture & Styling Constraints
* **Framework:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4.
* **Legacy Aesthetics:** Deep near-black canvas (`#030712`), generic blue radial glows (`rgba(59,130,246,0.15)`), 3D tilt cards (`TiltCard`), standard framework default colors (`#10B981` Emerald), and legacy placeholders (such as hardware ZK proof badges).

---

## 2. The Impeccable Design Standard & Token System Baseline

### The Quality Protocol (Loop for Every Page)
To transform the website from generic AI startup tropes into a bespoke, state-of-the-art visual experience, every page undergoes a strict 5-step loop:
`Critique → User Approval → Implementation → Vercel Guidelines Review → Fixes & Visual Verification`.

### Derived Bespoke Design Tokens (Site-Wide Baseline)
* **Canvas Base (`--bg-page` / `--ds-background-100`):** `#F5F0EA` (Warm Parchment — pure editorial paper canvas).
* **Elevated Surfaces (`--bg-elevated` / `--ds-background-200`):** `#FDFBF7` (Clean Paper — 1px hairline border containers `rgba(13,37,61,0.08)` to `0.12`).
* **Recessed Surfaces (`--bg-sunken` / `--ds-background-300`):** `#EDE7DF` (Recessed Sand — inputs, sunken tracks).
* **Primary Ink (`--color-ink-primary` / `--ds-text-100`):** `#0D253D` (Deep Navy Ink).
* **Body Prose (`--color-ink-body` / `--ds-text-200`):** `#3D4F5F` (Muted Slate).
* **Primary Accent (`--accent-primary`):** `#C2553A` (Burnt Terracotta).
* **Status / Verified Accent (`--accent-secondary` / `--accent-mono`):** `#5B8A72` (Forest Sage — for live indicators, latency badges, and status tags).
* **Regional Accent (`--accent-tertiary`):** `#B8860B` (Dark Goldenrod).
* **Typography:** `Instrument Serif` (Display headings 400), `Plus Jakarta Sans` (Body prose 400/500/600), `JetBrains Mono` (Technical SLAs and metadata 500 tabular-nums).

---

## 3. Rebuild Status & Execution Log

| Phase / Page | Rebuild Objective | Key Architectural & Design Changes | Status |
| :--- | :--- | :--- | :--- |
| **Homepage (`/`)** | Establish token baseline & hero signature | Added `Instrument Serif`, Burnt Terracotta (`#C2553A`), hairline workbench cards, interactive `CandidateScreenerWorkbench`. | ✅ Complete |
| **Phase 1 (`/pricing`)** | Audit numbers & purge placeholders | Purged fictional "ZK Proofs" for *Custom Model Fine-Tuning & Private Connectors*, added static throughput brackets, audited 5k/50k/unlimited request limits. | ✅ Complete |
| **Phase 2 (`/services`)** | Solve 8-product grid monotony | Transformed flat 2x2 grids into an **Asymmetrical Architecture Matrix** + Solution Architecture Selector Bar. | ✅ Complete |
| **Phase 3 (`/about`)** | Human origin story & regional hub | Preserved 100% authentic Uttar Pradesh, India hub facts. Reconciled founder biographies with `WorkshopRoster`. | ✅ Complete |
| **Phase 4 (`/contact`)** | Interactive form & pre-filled routing | Upgrade form to parse URL query params (`?service=...`), hairline form cards, UP India address block, `< 2 Hours Guaranteed` SLA telemetry badge. | ✅ Complete |
| **Phase 5 (`/team`)** | Team presentation & roles | Clean hierarchy, preserved 100% authentic founder roles & credentials, hairline roster cards, `#C2553A` accents. | ✅ Complete |
| **Phase 6 (`/blog`)** | Content hub & article reader | High-contrast typography, reading time badges, stateful category routing (`[ALL]`, `[AI ORCHESTRATION]`, `[SPATIAL]`, `[OPERATIONS]`), high-contrast code snippet reader. | ✅ Complete |
| **Phase 7 (`/privacy` & `/terms`)** | Legal & compliance templates | Structured legal typography, sticky document index sidebar, updated organization metadata (NorAI Technologies Pvt. Ltd., Uttar Pradesh, India), `#C2553A` accents. | ✅ Complete |
| **Phase 8 (`/products` & `/services`)** | Split products & services | Trimmed `/services` down to consultative enterprise offerings; created `/products` self-serve catalog & `/products/[slug]` detail routes; synchronized primary navigation. | ✅ Complete |
| **Phase 9 (`/services` 8-Offering Expansion)** | 3-Tier service maturity matrix | Expanded `/services` to offerings categorized into distinct visual tiers. | ✅ Complete |
| **Phase 10 (`/blog`, `/docs`, `/faq`)** | Information Architecture & Content Pages | Created `/blog` index & `/blog/[slug]` editorial reader, `/docs` product reference guide, and `/faq` searchable Q&A hub. | ✅ Complete |
| **Phase 11 (Nav & Footer Audit)** | Global navigation & footer sync | Audited and synchronized Header/Footer links across all active pages (`/`, `/products`, `/services`, `/pricing`, `/about`, `/team`, `/blog`, `/contact`, `/careers`). | ✅ Complete |
| **Phase 13 (Production Polish & Launch Readiness)** | Accessibility, SEO Metadata, Sitemap & Final Verification | Audited WCAG AAA contrast, keyboard focus rings, semantic `<h1>` hierarchy, form label associations, server-side `buildMetadata` exports. | ✅ Complete |
| **Phase 14 (Anti-AI-Slop & Dead Code Purge)** | Strict Codebase Cleanse & RSC Migration | Purged 76 unconfigured story files, 15 unused organism sections, 12 dead molecules, 8 dead atoms, and dead React context providers (`ThemeTokenProvider`, `BackgroundProvider`). Converted marketing route roots (`/`, `/products`, `/services`) to React Server Components (RSC) with isolated client leaves. Streamlined Footer and standardized canonical product slugs. | ✅ Complete |
| **Phase 15 (Impeccable Context Initialization)** | Standardize `.md` Context Architecture | Generated `PRODUCT.md` (Product taxonomy, personas, brand voice, anti-goals), updated `DESIGN.md` (Parchment & Terracotta tokens, typography scales, 5-state ergonomics, anti-slop rules), modernized `README.md` (Next.js 15 / React 19 / Tailwind v4 / Atomic structure), and aligned `AGENTS.md`. | ✅ Complete |
| **Phase 16 (Security Headers & Hardening — Session 10)** | HTTP Headers, Zod Hardening, Rate Limiting & Input Sanitization | Configured strict CSP, HSTS, X-Frame-Options, Permissions-Policy in `next.config.ts`. Added HTML sanitization, in-memory IP sliding window rate limiter, hardened contact form Zod schema & Nodemailer handling, and audited `.env` / `.env.example`. | ✅ Complete |

---

## 4. Grounding Context Files Matrix

Every AI agent and engineer operating on this repository must consult the unified markdown context files:
1. **`PRODUCT.md`**: Product identity, personas, product taxonomy, brand voice, and anti-references.
2. **`DESIGN.md`**: Design tokens, typography hierarchy, elevation, 5-state ergonomics, and anti-slop rules.
3. **`AGENTS.md`**: 3-layer architecture, coding conventions, RSC guidelines, and quality loops.
4. **`README.md`**: High-level overview, directory architecture, scripts, and deployment instructions.
5. **`project_progress_context.md`**: Chronological build history, milestone tracking, and architectural status.

---

## 5. Security & Dependency Notes

* **Dependency Security Audit (August 2026):** 3 known high-severity advisories exist in Next.js's internal nested dependencies (`postcss` 8.4.31 and `sharp` 0.34.5 under `next@15.5.22`). No direct patch is available without a major Next 16 upgrade. Real-world risk is low (build-time image/CSS processing only; no user-uploaded binary content in current scope). Revisit upon Next.js 16 major release.
