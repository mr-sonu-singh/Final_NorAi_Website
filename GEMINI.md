# NorAI Agent & Developer Guide (`AGENTS.md`)

> **Notice:** This file is mirrored identically across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` to ensure a consistent, unified operating context across all AI engineering environments.

---

## 1. Project Overview & Mission

You are working on the official web platform for **NorAI Technologies** (`/home/gourav/coding/startup/NorAi_Ofiicial_Web`, running locally on `http://localhost:3000`).

NorAI is an independent sovereign AI engineering practice and grassroots civic mission in Uttar Pradesh, India. The web platform's aesthetic and operational benchmark is **[Audens.ai](https://audens.ai)**—celebrated for its extreme editorial restraint, spacious breathing room, atmospheric aurora glows, and high-voltage jewel accents against deep pine and porcelain surfaces.

---

## 2. Technology Stack & Environment

- **Framework**: [Next.js 15](https://nextjs.org/) App Router
- **UI Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom properties in `app/globals.css`
- **Animation & Physics**: [Framer Motion / Motion](https://motion.dev/) (with `prefers-reduced-motion` compliance)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Audens-style inline SVGs
- **Validation**: [Zod](https://zod.dev/)

---

## 3. Core Craft Principles & Guiding Directions

### 3.1 Guiding Directions Over Rigid Dogma
- Do **not** impose rigid, formulaic templates or harsh micro-constraints that stifle creative polish.
- Strive for **quiet authority, visceral craft, and emotional weight**.
- When designing or editing a section, always ask: *Does this look like a cluttered SaaS dashboard, or does it feel like an elite, high-conviction engineering firm?*

### 3.2 Strict Deduplication & Single Responsibility
- **Every page and section has exactly one job.**
- The homepage introduces the narrative arc and previews capabilities with compact 260px telemetry cards.
- Subpages (`/products`, `/services`, `/mission`) provide deep interactive exploration.
- If an explanation has been made in one section, **never repeat it in another section**.

### 3.3 Flawless WCAG AAA Contrast
- **Light Surfaces (`#f5f5f0` / `#fffdf7`)**: Use Deep Pine (`#072929`) for headings and body. Use Mint Ink (`#06845a`) for badges and accent links.
- **Dark Surfaces (`#072929` / `#1e3c3b`)**: Use Bone (`#ebeae1`) for headings and body. Use High-Voltage Mint (`#1ef4b4`) or Lavender (`#c6b5ff`) for accents.
- **Critical Warning**: Never use `text-[var(--pine)] dark:text-[var(--bone)]` inside a container with a fixed dark background (like `.gradient-card__inner`). This causes 1.0:1 invisible dark-on-dark text in light mode!

### 3.4 Atmosphere & Feel Over Walls of Text
- Replace paragraphs of technical throat-clearing with punchy 2-sentence clarity.
- Let generous vertical spacing (`clamp(56px, 7vw, 104px)`), organic blurred aurora glows, and live monospace telemetry indicators do the heavy lifting.

### 3.5 Clean Navigation Discipline
- The floating `.navpill` contains exactly 5 links (`Capabilities`, `Approach`, `Deliverables`, `About`, `The Canonical`) and 1 solid action button (`Book a call`).
- Never include dead anchors (e.g. `/#mission`). Never include "Contact" as both a text link and a button in the same pill.

---

## 4. Canonical Design Tokens Quick Reference

```css
/* Core Surfaces */
--pine: #072929;        /* Deep pine green dark surface / light primary text */
--forest: #1e3c3b;      /* Elevated dark card surface */
--porcelain: #f5f5f0;   /* Primary light canvas */
--surface: #fffdf7;     /* Warm ivory card & modal surface */
--bone: #ebeae1;        /* Crisp off-white text on pine */

/* High-Voltage Jewel Accents */
--mint: #1ef4b4;        /* Core high-voltage mint key */
--mint-ink: #06845a;    /* High-contrast mint for light surfaces */
--lavender: #c6b5ff;    /* EdTech / LaTeX */
--butter: #ffe9b5;      /* Bharat mission & civic alerts */
--coral: #ff7755;       /* Community digest */
--sky: #75d3da;         /* Stream ingestion */

/* Geometry */
--r-card: 22px;
--r-pill: 999px;
--container: 1240px;
```

---

## 5. Pre-Commit Verification Checklist

Before completing any task in this codebase:
1. **Contrast Check**: Verify that all text is clearly readable in both default (light) and dark modes. Zero contrast drops.
2. **Link Integrity**: Ensure every link in the header, footer, and cards points to a real, existing route or valid ID.
3. **No Bento Bloat**: Ensure the homepage is uncluttered and fast; interactive sandboxes belong on `/products/[slug]`.
4. **Build & Type Check**: Verify `npm run build` or `npm run type-check` passes cleanly.
