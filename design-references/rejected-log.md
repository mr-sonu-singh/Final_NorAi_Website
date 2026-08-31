# Rejected Inspiration Log

> **Purpose**: Documents off-brand candidate patterns that were reviewed and explicitly rejected during design curation. This log prevents regressions, stops re-scraping generic SaaS templates, and enforces NorAI's anti-goal firewall.

---

## Filter Criteria & Anti-Goal Rules

Every candidate pattern was evaluated against NorAI's **Instrument Craft & Deterministic Utility** mandate. A site or component was rejected if it exhibited any of the following:

1. **Anti-Goal 1**: Dark-mode neon purple/cyan/magenta radial glow cards (`#7C3AED`, `#06B6D4`).
2. **Anti-Goal 2**: 3D tilt/parallax mouse-following cards (`TiltCard`), floating glass spheres, or cyber-grid meshes.
3. **Anti-Goal 3**: Generic AI-startup templates ("gradient blob + giant bold sans headline + chat prompt pill").
4. **Anti-Goal 4**: Autoplay background hero videos or heavy Three.js canvas shaders that cause render lag or layout shift.
5. **Anti-Goal 5**: Crypto/Web3 SaaS dashboards with flashy speculative charts and zero deterministic telemetry.
6. **Anti-Goal 6**: Multi-step modal wizards with vertically stacked, cramped textareas causing nested scrollbars.

---

## Log of Rejected Candidates

### Entry 01: Generic AI Hero with Neon Radial Gradient Blobs
- **Source / Category**: Godly / Awwwards "AI SaaS" category entries (e.g., generic generative copywriting tools)
- **Visual Anti-Pattern**: Dark `#0A0A0A` background with heavy `#8B5CF6` (purple) and `#06B6D4` (cyan) radial gradient blur blobs (`blur-3xl`), floating behind a giant bold sans headline.
- **Rules Violated**: `DESIGN.md` §10 Anti-Slop Rule #1 ("No gratuitous neon radial glows on light canvas") and `PRODUCT.md` §5 Brand Anti-Goals.
- **Why Rejected**: Reads immediately as disposable, generic AI wrapper hype. Obscures technical contrast and lacks editorial craftsmanship.
- **NorAI Replacement**: High-contrast `Instrument Serif` headline on warm `#F5F0EA` parchment canvas with calibrated 1px hairline border rules.

---

### Entry 02: 3D Mouse-Tilt Feature Cards (`TiltCard`)
- **Source / Category**: CodeSandbox / Awwwards experimental SaaS portfolios
- **Visual Anti-Pattern**: Cards that tilt in 3D perspective (`rotateX`, `rotateY`, `transform-style: preserve-3d`) following cursor coordinates with glossy glare overlays.
- **Rules Violated**: `DESIGN.md` §10 Anti-Slop Rule #2 ("No 3D mouse-tilt cards") and `AGENTS.md` §2 Frontend Standards.
- **Why Rejected**: Creates visual distortion, makes small technical telemetry unreadable, degrades mobile performance, and adds zero deterministic utility.
- **NorAI Replacement**: Flat, elevated paper cards (`#FDFBF7`) with subtle, predictable 150ms micro-lift (`hover:-translate-y-0.5`) and Terracotta border highlight (`hover:border-accent-500/40`).

---

### Entry 03: Autoplay Hero Loop Video (3D Render of Swirling Cyber Mesh)
- **Source / Category**: Web3 and Crypto infrastructure landing pages
- **Visual Anti-Pattern**: 15MB MP4 video loop of a rotating abstract chrome torus/mesh playing in the hero background.
- **Rules Violated**: `DESIGN.md` §10 Anti-Slop Rule #6 and `AGENTS.md` §2 Zero Layout Shift / WCAG Accessibility rules.
- **Why Rejected**: Distracts from product value, wastes network bandwidth, causes severe mobile battery drain, and signals style over substance.
- **NorAI Replacement**: Static, authoritative editorial typography paired with a live, interactive, dual-pane deterministic tool workbench preview.

---

### Entry 04: Glassmorphic Floating Cards with Low-Contrast Text
- **Source / Category**: Dribbble "Modern Dashboard UI" trend concepts
- **Visual Anti-Pattern**: `backdrop-blur-xl` semi-transparent cards with white text on semi-transparent backgrounds, lacking clear edge contrast.
- **Rules Violated**: `DESIGN.md` §2 WCAG AAA Legibility and `AGENTS.md` Color & Contrast Standards.
- **Why Rejected**: Fails accessible contrast ratios (< 4.5:1), makes dense technical data difficult to scan in daylight, and looks floaty rather than engineered.
- **NorAI Replacement**: Solid clean paper surfaces (`#FDFBF7`) with calibrated 1px hairline borders (`rgba(13,37,61,0.08)`) and deep navy ink (`#0D253D`).

---

### Entry 05: Vertically Stacked Multi-Textarea Modal Wizard
- **Source / Category**: Traditional ATS & Resume Parser form flows
- **Visual Anti-Pattern**: A narrow modal containing three small vertically stacked textareas (`height: 80px` each), forcing users to scroll within three nested scrollbars simultaneously.
- **Rules Violated**: `DESIGN.md` §9 Interactive Workbench Spatial Standards & `AGENTS.md` §2.D (Zero Nested Scrollbars).
- **Why Rejected**: Severely restricts visibility of candidate resumes and rubrics, creating severe ergonomic friction.
- **NorAI Replacement**: Segmented Horizontal Step Dock (`[ 1. Job Role ] [ 2. Ingestion ] [ 3. Rubric ]`) with a generous `min-h-[220px]` full-height editor.

---

### Entry 06: Fictional ZK Hardware Claims & Vague "Magic AI" Badges
- **Source / Category**: Generic Web3/AI landing pages claiming "Decentralized Zero-Knowledge Quantum AI"
- **Visual Anti-Pattern**: Badges promising "100% Magical Automation" without disclosing model latency, parameters, or retention architecture.
- **Rules Violated**: `DESIGN.md` §10 Anti-Slop Rule #3 ("No fake ZK hardware proof claims or fictional benchmarks").
- **Why Rejected**: Violates Teenage Engineering and Resend honesty principles.
- **NorAI Replacement**: Verifiable operational metrics: `0 Bytes Retained · Ephemeral RAM Flushed`, `Latency: < 350ms`, `Zod Typed Schema`.
