# NorAI — Design System & Visual Language Reference (`DESIGN.md`)

## 1. Visual Theme & Philosophy ("Parchment & Terracotta: Instrument Craft")

NorAI's visual and interactive interface embodies the **Instrument Craft & Deterministic Utility** aesthetic. Synthesizing the physical honesty of **Teenage Engineering**, the creator velocity of **Linear**, the editorial rigor of **Stripe Press**, and the obsessive developer experience (DX) of **Resend**, NorAI builds software that feels like an authentic physical engineering instrument.

- **Canvas Base**: Warm Parchment (`#F5F0EA` / `--bg-page`), evoking heavy-stock archival paper and engineering workbenches.
- **Elevated Surfaces**: Clean Paper (`#FDFBF7` / `--bg-elevated`) with calibrated 1px hairline borders (`rgba(13, 37, 61, 0.08)` to `rgba(13, 37, 61, 0.12)`).
- **Primary Ink**: Deep Navy Ink (`#0D253D` / `--color-ink-primary`) for authoritative headlines and high-contrast WCAG AAA legibility.
- **Body Prose**: Muted Slate (`#3D4F5F` / `--color-ink-body`) for long-form technical reading comfort.
- **Primary Accent**: Burnt Terracotta (`#A84530` / `#C2553A` / `var(--accent-primary)`), used on primary CTAs, active highlights, and key brand moments.
- **Secondary Accent**: Forest Sage (`#5B8A72` / `var(--accent-secondary)`), signifying ephemeral RAM data isolation, verified signals, and sub-second SLAs.
- **Tertiary Accent**: Warm Ochre / Dark Goldenrod (`#B8860B`), highlighting regional intelligence, UP gazettes, and specialized badges.
- **Dark Accent Exception**: Deep Navy (`#0D253D`) is reserved exclusively for the structural footer and terminal/code JSON inspectors.

---

## 2. Color Palette & Semantic Roles

### Core Surface & Ink Tokens

| Role | CSS Variable | Hex / RGB Value | Tailwind / Utility Class | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Base** | `--ds-background-100` / `--bg-page` | `#F5F0EA` | `bg-bg-page` / `bg-canvas-base` | Primary page canvas, warm paper base |
| **Elevated Surface** | `--ds-background-200` / `--bg-elevated` | `#FDFBF7` | `bg-bg-elevated` / `bg-canvas-paper` | Cards, interactive workbenches, modals |
| **Recessed Surface** | `--ds-background-300` / `--bg-sunken` | `#EDE7DF` | `bg-bg-sunken` / `bg-canvas-sunken` | Input backgrounds, toggle tracks, sunken badges |
| **Hover Surface** | `--ds-background-400` | `#E7DFD4` | `hover:bg-[#E7DFD4]` | Hover states on interactive cards and rows |
| **Primary Ink** | `--ds-text-100` / `--color-ink-primary` | `#0D253D` | `text-primary-800` / `text-ink-primary` | Headings, high-emphasis text, display titles |
| **Body Ink** | `--ds-text-200` / `--color-ink-body` | `#3D4F5F` | `text-primary-700` / `text-ink-body` | Body paragraphs, feature descriptions |
| **Muted Ink** | `--ds-text-300` / `--color-ink-secondary`| `#364757` | `text-primary-500` / `text-ink-secondary`| Labels, captions, helper text, timestamps |
| **Interactive Accent**| `--accent-primary` / `--ds-interactive` | `#A84530` | `bg-accent-500` / `text-accent-500` | Primary buttons, link hovers, active tabs |
| **Status / Verified** | `--accent-secondary` / `--accent-mono` | `#5B8A72` | `text-accent-secondary` / `bg-[#e2ede7]`| Live telemetry, SLAs, data isolation tags |
| **Regional / Badge** | `--accent-tertiary` | `#B8860B` | `text-[#b8860b]` / `bg-[#fff4d6]` | Regional intelligence & specialized tags |
| **Footer Canvas** | `--bg-dark` | `#0D253D` | `bg-bg-dark` / `bg-[#0d253d]` | Dedicated footer and code inspection blocks |

---

## 3. Typography & Mathematical Architecture

NorAI pairs a character-rich editorial serif with an engineered sans-serif, monospaced tabular numbers, and rendered KaTeX formulas:

- **Display Headings**: `Instrument Serif` (`--font-display`), 400 weight (italic used selectively for signature accent words).
- **Body & Interface**: `Plus Jakarta Sans` (`--font-sans`), weights 400, 500, 600.
- **Technical Readouts & SLA**: `JetBrains Mono` (`--font-mono`), weights 500, 600 with `tabular-nums`.
- **Mathematical Formulas**: Rendered via KaTeX (`MathRenderer`, `MathText`) with universal Unicode fallback.

### Type Hierarchy & Scale

| Element | Font Family | Size (Mobile → Desktop) | Weight | Line Height | Tracking | Semantic Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `h1` Display XL | Instrument Serif | `3.5rem` → `5.5rem` (56–88px) | 400 | `1.04` | `-0.02em` | Hero display headlines |
| `h2` Section Title | Instrument Serif | `2.25rem` → `3.75rem` (36–60px) | 400 | `1.1` | `-0.02em` | Major section headers |
| `h3` Component Title | Instrument Serif | `1.75rem` → `2.25rem` (28–36px) | 400 | `1.15` | `-0.015em` | Card titles, workbench headers |
| `h4` UI Label | Plus Jakarta Sans | `0.875rem` → `1rem` (14–16px) | 600 | `1.4` | `-0.005em` | Form labels, card subtitles |
| `body-lg` | Plus Jakarta Sans | `1.125rem` (18px) | 400 | `1.75rem` | `normal` | Hero lead-in paragraphs |
| `body-md` | Plus Jakarta Sans | `1rem` (16px) | 400 | `1.625rem`| `normal` | Standard reading prose |
| `body-sm` | Plus Jakarta Sans | `0.875rem` (14px) | 400 | `1.5rem` | `normal` | Secondary text, table cells |
| `caption / code` | JetBrains Mono | `0.75rem`–`0.8125rem` (12–13px)| 500 | `1.4` | `+0.02em` | Technical metadata, SLAs, JSON payloads |

---

## 4. Hardware Window Chrome & Telemetry Ribbons

### Traffic-Light Window Chrome
Workbenches and consoles feature hardware-style top bars with traffic light status LEDs:
- **Terracotta LED**: `#C2553A` (Live Ingestion Channel)
- **Ochre LED**: `#B8860B` (Neural Tokenizer Status)
- **Forest Sage LED**: `#5B8A72` (Ephemeral RAM Isolated)

### Exposed Hardware Telemetry Chips
Every interactive workbench visibly exposes operational metrics:
- **Latency Meter**: `font-mono tabular-nums text-xs font-semibold` (e.g. `< 0.35s / PDF`).
- **Data Residency**: `font-mono text-[11px] text-accent-secondary` (`0 Bytes Retained · Ephemeral RAM Flushed`).
- **Schema Validation**: `text-[10px] font-mono bg-white/10 text-emerald-300` (`Zod Typed`).

---

## 5. Keyboard Velocity & Global Hotkey Registry

In the tradition of **Linear** and **Raycast**, power users can control interactive workbenches via keyboard:

| Key | Action | Scope |
| :--- | :--- | :--- |
| `1` | Select Tool 01: AI Resume Shortlister | Product Studio / Hero Console |
| `2` | Select Tool 02: Course Note-Taker | Product Studio / Hero Console |
| `3` | Select Tool 03: Community Chat Digest | Product Studio / Hero Console |
| `4` | Select Tool 04: Smart Dainik News | Product Studio / Hero Console |
| `c` | Copy Active JSON Schema Payload to Clipboard | JSON Inspector Views |
| `Esc` | Close Modal / Reset Selection | Active Tool Modals |
| `Tab` | Accessible Focus Traversal | All Interactive Elements |

### Double-Ring Focus Pattern
Keyboard accessibility is enforced across all interactive elements via the signature double-ring pattern:
```css
box-shadow: 0 0 0 2px var(--bg-page, #f5f0ea), 0 0 0 4px rgba(194, 85, 58, 0.55);
```
Tailwind utility equivalent: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page`.

---

## 6. Nested Corner Radius & Proportional Spacing Formula

When an element sits nested inside another element with a gap/padding $< 32\text{px}$:
$$\text{Radius}_{\text{inner}} = \text{Radius}_{\text{outer}} - \text{Gap}$$

### Scale Mapping
- Outer Stage (`rounded-3xl` / 24px) with 8px padding $\rightarrow$ Inner Card (`rounded-2xl` / 16px).
- Inner Card (`rounded-2xl` / 16px) with 8px padding $\rightarrow$ Button/Control (`rounded-lg` / 8px).
- Button/Pill (`rounded-lg` / 8px) with 4px padding $\rightarrow$ Indicator Chip (`rounded-md` / 4px).

---

## 7. 5-State Ergonomics Rule

Every interactive atom, molecule, and component must intentionally define all 5 states:
1. **Idle**: Pristine hairline container (`border-[rgba(13,37,61,0.08)]`) on clean paper canvas.
2. **Hover**: Smooth border highlight (`border-accent-500/40`) + micro-lift (`hover:-translate-y-0.5`).
3. **Active / Pressed**: Physical compression feedback (`active:scale-[0.98]`).
4. **Focused**: Double-ring keyboard outline (`focus-visible:ring-2 focus-visible:ring-accent-500`).
5. **Disabled / Loading**: `opacity-50 cursor-not-allowed` with accessible `aria-disabled="true"` and screen-reader indicators.

---

## 8. Motion & Fluid Dynamics Tokens

- **Custom Cubic Beziers**:
  - Micro-interactions (hover, active): `cubic-bezier(0.16, 1, 0.3, 1)` (150ms–200ms).
  - Modal & Drawer transitions: `cubic-bezier(0.32, 0.72, 0, 1)` (300ms–400ms).
  - Staggered entrances: `50ms` stagger delay.
- **Scroll-Interpolated Reveals**: Words and sections transition smoothly as they cross viewport triggers via `whileInView` and `IntersectionObserver`.
- **Reduced Motion**: All animations and transitions immediately bypass transforms under `prefers-reduced-motion: reduce`.

---

## 9. Interactive Tool & Workbench Spatial Standards

When architecting or styling interactive self-serve AI web tools (Resume Shortlister, Course Note-Taker, Chat Digest, Smart Dainik News):

### 1. Canvas Width & Widescreen Scaling
- **Container**: Use `<Container size="wide">` (`--container-wide: 1380px`, `max-w-7xl`).
- **Aspect & Height**: Standard minimum height is `min-h-[680px]` to `min-h-[720px]`, providing synchronized column heights without clipped cards.

### 2. Segmented Step Intake Dock (Zero Nested Scrollbars)
- **Structure**: Group intake parameters into a segmented step dock (`[ 1. Job Role ]`, `[ 2. Ingestion / Batch ]`, `[ 3. Rubric & Filter ]`).
- **Editor Height**: Textareas must have generous minimum heights (`min-h-[200px]` to `min-h-[260px]`) showing comprehensive prompt/data text without tiny internal scrollbars.

### 3. Master-Detail List Ergonomics & Inline Accordions
- **Ranked Cards**: Cards must include rank chips (`#1`, `#2`), display font typography, role metadata, and large score dials (`tabular-nums`).
- **Inline Breakdown**: Provide a 1-click chevron toggle on list cards to reveal key evidence, verified strengths, and probe questions inline without breaking list context.

### 4. Comparative Multi-Entity Vector Matrices
- Group evaluated items side-by-side per evaluation dimension with progress comparison bars (Emerald $\ge 90\%$, Terracotta $\ge 75\%$, Muted Slate $< 75\%$) and qualitative evidence quotes.

### 5. 1-Click Entity Switcher Pill Bars & Bento Scorecards
- **Switcher Strip**: Deep scorecard views must feature a top pill strip (`[ #1 Entity A 96% ]` `[ #2 Entity B 82% ]`) for 1-click profile switching.
- **Bento Grid**: 
  - Hero Profile Box (status badge, name, score dial, executive verdict).
  - 2-Column Evaluation (Verified Strengths vs Missing Requirements / Risk Flags).
  - Full-width Numbered Technical Probing Questions (`01`, `02`, `03`).

---

## 10. Anti-Slop Checkpoints & Linting Rules

- ❌ **No gratuitous neon radial glows** on light canvas.
- ❌ **No 3D mouse-tilt cards** (`TiltCard`).
- ❌ **No fake ZK hardware proof claims or fictional benchmarks**.
- ❌ **No layout shift on numeric readouts**: always use `font-mono tabular-nums`.
- ❌ **No root `'use client'` on static marketing pages**: keep pages server-rendered; isolate client interactivity to leaf components.
- ❌ **No generic stock photography**: use authentic regional photography or bespoke SVG wireframes.
- ❌ **No unstyled default focus outlines**: always implement the double-ring focus token.
- ❌ **No hardcoded raw hex values in JSX**: utilize CSS variables or Tailwind configured semantic classes.
- ❌ **No stacked multi-textarea nested scrollbars**: always use segmented step docks.
- ❌ **No narrow-constrained workbench canvas**: always use `--container-wide` (`1380px`).
