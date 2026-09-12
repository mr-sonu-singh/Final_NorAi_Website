# NorAI Official Web — Project Progress & Context Summary

## 1. Executive Summary & Active Design Direction

**NorAI Technologies** is an independent sovereign AI engineering practice and grassroots civic mission operating from Uttar Pradesh, India. NorAI builds private enterprise intelligence pipelines and sovereign everyday micro-tools, while democratizing computational literacy across 75 districts of Uttar Pradesh.

The web platform's active benchmark is **[Audens.ai](https://audens.ai)**. All legacy visual experiments—including deep pitch obsidian (`#07080D`), dark slate cards (`#0D1017`), terracotta (`terra-500`), and warm parchment (`#F5F0EA`)—have been superseded by the **Audens Pine & Porcelain Design System**.

---

## 2. Core Architecture & Design DNA

### 2.1 Surfaces & Palettes
- **Porcelain Canvas (`--porcelain: #f5f5f0`)**: The tactile, light editorial canvas.
- **Ivory Surface (`--surface: #fffdf7`)**: Elevated card and container surface.
- **Deep Pine (`--pine: #072929`)**: Signature dark background and light-surface display ink.
- **Forest (`--forest: #1e3c3b`)**: Elevated dark card surface.
- **Bone (`--bone: #ebeae1`)**: High-contrast text and dividers on pine.
- **High-Voltage Mint (`--mint: #1ef4b4`)**: Core brand accent and glow frequency.
- **Mint Ink (`--mint-ink: #06845a`)**: WCAG AAA compliant text on porcelain.
- **Jewel Accents**: Lavender (`#c6b5ff`), Butter (`#ffe9b5`), Coral (`#ff7755`), Sky (`#75d3da`), Pink (`#ff69b4`).

### 2.2 Core Layout Archetypes
- **The Telemetry Vignette (`.vig` / `.pstage`)**: Compact (260px) illustrative capability windows with live indicator dots.
- **The Horizontal Ledger (`.ledger`)**: Borderless rows with circular hover-rotating arrows.
- **The 4-Stage Process Flow (`.stepflow`)**: Connected circular node rails for operating rituals.
- **The Conic Closing Dispatch (`.gradient-card`)**: 14s rotating conic border enclosing high-contrast conversion CTA.

---

## 3. The Three Dimensions & Product Portfolio

1. **Dimension 1: Sovereign Everyday Tools**
   - **AI Resume Shortlister**: Sub-second vector scoring for verified engineering depth.
   - **Course Note-Taker**: Lecture audio to KaTeX notes and active recall flashcards.
   - **Community Chat Digest**: Condensing thousands of unread messages into 3 executive decisions.
   - **Smart Dainik News**: Bilingual regional gazette alerts and citizen welfare notifications.
2. **Dimension 2: Bespoke Enterprise Intelligence**
   - **Air-Gapped Private VPC Inference**: Local clusters with zero cloud egress.
   - **Deterministic RAG**: Citing source documents on every single claim.
   - **Model Context Protocol (MCP)**: Secure agent tool servers with human-in-the-loop validation.
3. **Dimension 3: Grassroots 75-District Bharat Mission**
   - Free vernacular literacy for village citizens.
   - Free scholar sandboxes for collegiate students.
   - Direct founder-led developer masterclasses across 75 districts of Uttar Pradesh.

---

## 4. Current State & Immediate Redesign Priorities

The repository audit (`report.md`) established the following 6 priority milestones now tracked in `REDESIGN_PLAN.md`:

1. **Header & Navigation Streamlining**:
   - Remove dead anchor `/#mission`.
   - Remove redundant `Contact` text link; retain the primary solid pill button `Book a call`.
2. **Contrast & Color Purge**:
   - Fix dark-on-dark invisible text in `.gradient-card__inner` across 6 marketing pages.
   - Purge `#07080D` obsidian and `terra-*` classes.
3. **Hero De-Bloat**:
   - Remove the 47KB `HeroStudioWorkbench` from the homepage.
   - Deploy the clean, single-column Aurora Hero with high-conviction typography.
4. **Capability Arc Simplification**:
   - Replace the 1,800px bento grid with compact 260px telemetry rows.
   - Relocate interactive sandboxes to `/products/[slug]`.
5. **Grassroots Bharat Mission Beat**:
   - Insert dedicated `<BharatMissionBeat />` section before the closing dispatch.
6. **Subpage Single-Responsibility Routing**:
   - Ensure `/products`, `/services`, `/mission`, `/team`, and `/contact` each fulfill their distinct role without redundant overlap.
