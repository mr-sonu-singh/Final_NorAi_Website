# NorAI Design System & Visual Philosophy (`DESIGN.md`)

> **The North Star**: Embody the architectural restraint, spatial pacing, typographic gravitas, and high-voltage jewel accents of [**Audens.ai**](https://audens.ai), adapted for NorAI's sovereign AI mission.

---

## 1. Aesthetic Foundations & Atmospheric Philosophy

NorAI is an independent sovereign AI engineering practice and grassroots civic mission. The visual identity must communicate **quiet authority, mathematical precision, and visceral craft**. 

Rather than chasing generic SaaS dashboard tropes—walls of text, cluttered bento grids, and noisy interactive mockups—NorAI achieves impact through **spacious breathing room, intentional typographic hierarchy, and focused telemetry vignettes**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE DESIGN POSTULATES                          │
├────────────────────────────────────────────────────────────────────────┤
│ 1. VISCERAL MINIMALISM                                                 │
│    Let typography and negative space carry the gravity of the brand.   │
│    Every section must breathe. Default to clamp(56px, 7vw, 104px)     │
│    vertical padding.                                                   │
│                                                                        │
│ 2. SINGLE RESPONSIBILITY                                               │
│    Every page and section has exactly one distinct job. If a concept   │
│    has been introduced, never re-explain it in another section.        │
│                                                                        │
│ 3. ATMOSPHERE OVER TEXT WALLS                                          │
│    Evoke technical rigor through soft organic aurora glows, crisp     │
│    monospace status indicators, and live telemetry badges rather than  │
│    paragraphs of jargon.                                               │
│                                                                        │
│ 4. STRICT DICHROMATIC HARMONY                                          │
│    A warm porcelain canvas (#f5f5f0) transitioning into deep pine     │
│    green (#072929). Never introduce pitch black (#07080D) or rogue     │
│    terracotta tones.                                                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Palette Tokens & Color Architecture

All colors are governed by live CSS custom properties in `app/globals.css`, derived directly from the audited Audens color engine.

### 2.1 Surfaces & Canvas
- **Porcelain Canvas (`--porcelain: #f5f5f0`)**: The primary light page canvas. Warm, tactile, and editorial.
- **Ivory Surface (`--surface: #fffdf7`)**: Elevated light card, form, and modal background.
- **Deep Pine (`--pine: #072929`)**: The signature dark surface. Deep petrol green. Used for dark sections, primary text on porcelain, and solid CTA fills.
- **Forest Pine (`--forest: #1e3c3b`)**: Elevated dark card surface, subtle hover backgrounds, and telemetry badge wells.
- **Bone (`--bone: #ebeae1`)**: High-contrast off-white text and hairline dividers on deep pine.

### 2.2 High-Voltage Jewel Accents
Each entity owns an unmistakable jewel frequency:
- **High-Voltage Mint (`--mint: #1ef4b4`)**: Core brand accent. Used for animated underlines, glowing aura orbs, live status pings, and rotating conic borders.
- **Mint Ink (`--mint-ink: #06845a`)**: Accessible high-contrast mint for text, tags, and icons placed on light porcelain surfaces (WCAG AAA 5.4:1+).
- **Lavender (`--lavender: #c6b5ff`)**: EdTech & LaTeX note-taking entity.
- **Butter (`--butter: #ffe9b5`)**: Grassroots mission and civic telemetry.
- **Coral (`--coral: #ff7755`)**: Community chat digest and alert highlights.
- **Sky (`--sky: #75d3da`)**: Ingestion streams and network conduits.
- **Pink (`--pink: #ff69b4`)**: Regional civic verification.

### 2.3 Opacity & Hairline Tokens
- Dark on Light: `--pine-70: #072929b3`, `--pine-50: #07292980`, `--pine-20: #07292933`, `--pine-12: #0729291f`, `--pine-08: #07292914`
- Light on Dark: `--bone-70: #ebeae1b3`, `--bone-50: #ebeae180`, `--bone-20: #ebeae133`
- Line Divider: `--line: var(--pine-12)`

---

## 3. Typographic Hierarchy & Scale

Audens-style typography pairs bold, tight-tracked display serifs/sans with clean geometric body copy and disciplined monospace telemetry.

| Role | Font Family | Size / Clamp | Weight & Tracking | Purpose |
|---|---|---|---|---|
| **Giant Display** | Cabinet Grotesk / Outfit | `clamp(2.7rem, 6vw, 5.2rem)` | Extrabold (800), `-0.02em`, `leading-[1.04]` | Homepage & hero headlines. Maximum 2–3 words per line. |
| **Section Display** | Cabinet Grotesk / Outfit | `clamp(2.1rem, 4.4vw, 3.4rem)` | Extrabold (800), `-0.015em`, `leading-[1.1]` | Major section headers. |
| **Subhead / Lede** | General Sans / Inter | `clamp(1.05rem, 1.5vw, 1.35rem)` | Medium (500), Normal, `leading-relaxed` | High-conviction 2-sentence thesis statements. |
| **Card Title** | Cabinet Grotesk / Outfit | `clamp(1.25rem, 2vw, 1.6rem)` | Bold (700), `-0.01em` | Capability and tier headings. |
| **Body Copy** | General Sans / Inter | `1.0625rem` (17px) | Regular (400), Normal, `leading-[1.65]` | Editorial paragraphs. |
| **Telemetry / Eyebrow** | ui-monospace, Menlo, monospace | `10px–12px` | Bold (700), `+0.12em` to `+0.14em`, UPPERCASE | Section badges, status indicators, live metrics. |

---

## 4. Layout Archetypes (Replacing Generic Bento Grids)

Avoid monotonous square card grids. Employ Audens's five signature spatial archetypes:

### 4.1 The Telemetry Vignette (`.vig` / `.pstage`)
- **Role**: Illustrate a working capability without dumping an interactive dashboard on the visitor.
- **Geometry**: Compact window (height 260px–280px), rounded corners (`var(--r-card): 22px`), dark pine background (`var(--pine)`), inner subtle shadow.
- **Chrome**: Top status bar with uppercase monospace category, category tag, and live pulsing indicator dot (`.vg-livedot`).
- **Body**: 2 to 3 lines of high-conviction data (e.g. `0.28s parse latency`, `0 bytes retained`, `96/100 verified`). Zero interactive sliders or heavy audio scrubbers on the homepage.

### 4.2 The Horizontal Ledger (`.ledger` / `.artledger`)
- **Role**: List capabilities, enterprise deliverables, or sector practices with extreme scannability.
- **Geometry**: Borderless horizontal rows separated by 1px hairline borders (`border-bottom: 1px solid var(--pine-12)`).
- **Row Columns**: `[Index: 64px] [Title + 1-Line Promise] [Deliverable Tag] [40px Circular Hover Arrow]`.
- **Interaction**: On hover, row shifts slightly, arrow background flips to `var(--pine)`, text to `var(--bone)`, rotating `-45deg`.

### 4.3 The 4-Stage Process Flow (`.stepflow`)
- **Role**: Communicate operating methodology (*Evaluate → Engineer → Air-Gap → Handover*).
- **Geometry**: 4 circular numbered nodes (46px diameter) connected by dynamic 2px horizontal hairline bridges (`--flow-tone`).
- **Content**: Clean 2-line captions beneath each node. No bulky card borders.

### 4.4 The Conic Closing Dispatch (`.gradient-card`)
- **Role**: High-voltage conversion anchor placed at the conclusion of key pages.
- **Geometry**: Outer wrapper with 2px padding, `border-radius: 24px`, animated by a 14s rotating `conic-gradient` across all jewel tokens.
- **Inner Surface**: Pure warm ivory paper (`#fffdf7`) or deep pine (`#072929`).
- **Crucial Rule**: The inner text MUST maintain strict AAA contrast. Never place `text-[var(--pine)]` inside a dark container!

### 4.5 Full-Width Alternating Rhythm Bands
- **Role**: Create dramatic visual momentum across long pages.
- **Cadence**: Clean porcelain (`#f5f5f0`) hero → deep pine (`#072929`) feature rail → porcelain capability arc → deep pine grassroots showcase → porcelain closing dispatch.

---

## 5. Navigation Pill Geometry (`.navpill`)

Citing the live production standard of `https://audens.ai`:
- **Placement**: Fixed floating capsule at `top: 12px` (`padding: 12px 0 0`), max-width 1020px.
- **Surface**: `#f5f5f0b8` with `backdrop-filter: blur(18px) saturate(160%)` and `border: 1px solid var(--pine-12)`.
- **Bottom Progress**: `.nav-progress` bar (height 2px, `var(--mint)`) pegged to viewport scroll progress.
- **Links Hierarchy**: Exactly 5 links (`Capabilities`, `Approach`, `Deliverables`, `About`, `The Canonical`).
- **Action**: Exactly 1 solid button (`Book a call` → `/contact`) styled as `.btn btn--solid` with hand gesture SVG icon.
- **Strict Anti-Pattern**: Never include 'Contact' as both a text link and a button in the same pill. Never use dead anchor links like `/#mission`.

---

## 6. Critical Anti-Patterns & Quality Rules

1. **Zero Text Invisibility**: Never use `text-[var(--pine)] dark:text-[var(--bone)]` inside a container that has a fixed dark background (such as `.gradient-card__inner` or `.section--dark`). All text in dark containers must be explicitly `text-[var(--bone)]` or `text-[var(--bone-70)]`.
2. **Zero Bento Bloat**: Never embed heavy interactive widgets (mock ATS tables, audio players, KaTeX formula editors) into homepage overview cards. Keep the homepage atmospheric and punchy; reserve deep interactivity for dedicated subpages (`/products/[slug]`).
3. **Zero Rogue Color Spaces**: Never use pitch black (`#07080D`), dark slate obsidian (`#0D1017`), or legacy terracotta (`terra-500`). The design universe belongs strictly to Pine, Porcelain, Bone, Surface, and the verified jewel tokens.
4. **Zero Dead Anchors**: Every link in navigation and footers must resolve to an active, valid route or an element ID that actually exists on the page.
5. **Fluid Spring Easings**: All transitions should use Audens's verified cubic-bezier curves:
   - Base: `--ease: cubic-bezier(.65, 0, .35, 1)`
   - Spring / Hover: `--ease-spring: cubic-bezier(.33, 1.4, .6, 1)`
