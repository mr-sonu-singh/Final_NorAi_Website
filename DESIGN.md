# NorAI — Design System & Visual Language Reference

## 1. Visual Theme & Philosophy ("Parchment & Terracotta")

NorAI's interface embodies the **Editorial Hardware & Technical Craft** aesthetic. Moving away from generic dark-mode neon glows and cookie-cutter SaaS templates, NorAI operates on an intentional, tactile, and grounded palette inspired by physical editorial journals, engineering workbenches, and regional craftsmanship.

- **Canvas**: Warm Parchment (`#F5F0EA`) base surface, evocative of high-grade editorial paper.
- **Card & Elevated Surfaces**: Clean Paper (`#FDFBF7`) with calibrated 1px hairline borders (`rgba(13, 37, 61, 0.08)` to `0.12`).
- **Primary Ink**: Deep Navy Ink (`#0D253D`) for authoritative headlines and high-contrast legibility.
- **Body Prose**: Muted Slate (`#3D4F5F`) for effortless reading comfort across long technical sections.
- **Primary Accent**: Burnt Terracotta (`#C2553A` / `var(--accent-primary)`), used deliberately on primary CTAs, active highlights, and key brand moments.
- **Secondary Accent**: Forest Sage (`#5B8A72` / `var(--accent-secondary)`), signifying security isolation, verified signals, and sub-second SLAs.
- **Tertiary Accent**: Warm Ochre / Dark Goldenrod (`#B8860B`), highlighting regional intelligence and specialized badges.
- **Dark Accent Exception**: Deep Navy (`#0D253D`) is reserved exclusively for the structural footer and terminal/code JSON inspectors.

---

## 2. Color Palette & Semantic Roles

### Core Surface & Ink Tokens

| Role | CSS Variable | Hex / RGB Value | Usage |
|---|---|---|---|
| **Canvas Base** | `--ds-background-100` / `--bg-page` | `#F5F0EA` | Primary page canvas, warm paper base |
| **Elevated Surface** | `--ds-background-200` / `--bg-elevated` | `#FDFBF7` | Cards, interactive workbenches, modals |
| **Recessed Surface** | `--ds-background-300` / `--bg-sunken` | `#EDE7DF` | Input backgrounds, toggle tracks, sunken badges |
| **Hover Surface** | `--ds-background-400` | `#E7DFD4` | Hover states on interactive cards and rows |
| **Primary Ink** | `--ds-text-100` / `--color-ink-primary` | `#0D253D` | Headings, high-emphasis text |
| **Body Ink** | `--ds-text-200` / `--color-ink-body` | `#3D4F5F` | Body paragraphs, feature descriptions |
| **Muted Ink** | `--ds-text-300` / `--color-ink-secondary`| `#6B7B8D` | Labels, captions, helper text |
| **Interactive Accent**| `--accent-primary` / `--ds-interactive` | `#C2553A` | Primary buttons, link hovers, active tabs |
| **Status / Verified** | `--accent-secondary` / `--accent-mono` | `#5B8A72` | Live telemetry, SLAs, data isolation tags |
| **Footer Canvas** | `--bg-dark` | `#0D253D` | Dedicated footer and code inspection blocks |

---

## 3. Typography Architecture

NorAI pairs a character-rich serif with an engineered sans-serif and monospaced numbers:

- **Display Headings**: `Instrument Serif` (`--font-display`), 400 weight (italic used selectively for signature words).
- **Body & Interface**: `Plus Jakarta Sans` (`--font-sans`), weights 400, 500, 600.
- **Technical Readouts & SLA**: `JetBrains Mono` (`--font-mono`), weights 500, 600 with `tabular-nums`.

### Type Hierarchy

| Element | Font Family | Size | Weight | Tracking | Role |
|---|---|---|---|---|---|
| `h1` Display XL | Instrument Serif | 4rem–5.5rem (64–88px) | 400 | `-0.02em` | Hero display headlines |
| `h2` Section Title | Instrument Serif | 2.5rem–3.75rem (40–60px) | 400 | `-0.02em` | Major section headers |
| `h3` Component Title | Instrument Serif | 1.75rem–2.25rem (28–36px) | 400 | `-0.015em` | Card titles, workbench headers |
| `h4` UI Label | Plus Jakarta Sans | 0.875rem–1rem (14–16px) | 600 | `-0.005em` | Form labels, card subtitles |
| `body-lg` | Plus Jakarta Sans | 1.125rem (18px) | 400 | normal | Hero lead-in paragraphs |
| `body-md` | Plus Jakarta Sans | 1rem (16px) | 400 | normal | Standard reading body |
| `body-sm` | Plus Jakarta Sans | 0.875rem (14px) | 400 | normal | Secondary text, table cells |
| `caption / code` | JetBrains Mono | 0.75rem–0.8125rem (12–13px)| 500 | `+0.02em` | Technical metadata, SLAs, JSON payloads |

---

## 4. Elevation, Hairlines & Focus System

### Hairline Borders
Rather than heavy drop shadows, elevation is communicated through **1px hairline borders** with subtle contrast shifts:
- Base border: `1px solid rgba(13, 37, 61, 0.08)`
- Hover border: `1px solid rgba(194, 85, 58, 0.35)`
- Dark container border: `1px solid rgba(253, 251, 247, 0.1)`

### Double-Ring Focus Pattern
Keyboard accessibility is enforced across all interactive elements via the signature double-ring pattern:
```css
box-shadow: 0 0 0 2px var(--bg-page, #f5f0ea), 0 0 0 4px rgba(194, 85, 58, 0.55);
```

---

## 5. 5-State Ergonomics Rule

Every interactive atom and molecule must intentionally define 5 interaction states:
1. **Idle**: Pristine hairline container on clean canvas.
2. **Hover**: Smooth border highlight (`border-accent-500/50`) + micro-lift (`hover:-translate-y-0.5`).
3. **Active / Pressed**: Physical compression (`active:scale-[0.98]`).
4. **Focused**: Double-ring keyboard outline (`:focus-visible`).
5. **Disabled / Loading**: `opacity-50 cursor-not-allowed` with accessible screen-reader indicators.

---

## 6. Anti-Slop Checkpoints

- ❌ **No gratuitous neon radial glows** on light canvas.
- ❌ **No 3D mouse-tilt cards** (`TiltCard`).
- ❌ **No fake ZK hardware proof claims or fictional benchmarks**.
- ❌ **No layout shift on numeric readouts**: always use `font-mono tabular-nums`.
- ❌ **No root `'use client'` on static marketing pages**: keep pages server-rendered; isolate client interactivity to leaf components.
