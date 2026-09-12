# NorAI Design System & Aesthetics Specification (`DESIGN.md`)

> **Architectural Reference**: Direct replication of [Audens.ai](https://audens.ai) visual ethos, spatial balance, typographic weight, and high-voltage palette for NorAI Technologies.

---

## 1. Design Ethos: "Deep Pine, Warm Porcelain & High-Voltage Jewels"

NorAI rejects both generic dark SaaS tropes (muddy gray cards, neon purple glows, generic AI badges) and sterile corporate templates. 

Instead, our aesthetic is built on high-contrast tactile warmth combined with surgical engineering clarity:
- **Warm Porcelain Canvas (`#F5F5F0`)**: A calm, daylight-grade ground that reads like premium archival paper.
- **Deep Dark Pine Contrasts (`#072929`)**: A grounded, authoritative pitch pine with subtle chlorophyll undertones used for night-mode sections, footers, and key narrative beats.
- **Pure Surface Plates (`#FFFDF7`)**: Crisp elevated cards with hairline borders (`rgba(7, 41, 41, 0.12)`) and micro-chamfered corners (`--r-card: 22px`).
- **High-Voltage Jewel Highlights**: Tactile neon pigments calibrated specifically for high legibility:
  - **Electric Mint (`#1EF4B4`)**: Primary interactive color, live signals, and primary CTAs.
  - **Mint Ink (`#06845A`)**: High-contrast dark mint for text on light backgrounds.
  - **Lavender (`#C6B5FF`)**: Research, theoretical models, and structured knowledge.
  - **Butter Yellow (`#FFE9B5`)**: Warm telemetry, warnings, and attention anchors.
  - **Coral (`#FF7755`)**: Communications, human feedback loops, and chat digests.
  - **Sky Cyan (`#75D3DA`)**: Systems infrastructure, network topologies, and data streams.
  - **Hot Pink (`#FF69B4`)**: Autonomous agents, active execution, and live dispatch.

---

## 2. Core Tokens & CSS Custom Properties

Defined in [`app/globals.css`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/app/globals.css):

```css
:root {
  /* Canvas & Base Surfaces */
  --pine: #072929;
  --forest: #1e3c3b;
  --porcelain: #f5f5f0;
  --bone: #ebeae1;
  --surface: #fffdf7;

  /* Opacity Gradients for Deep Pine */
  --pine-70: rgba(7, 41, 41, 0.7);
  --pine-50: rgba(7, 41, 41, 0.5);
  --pine-20: rgba(7, 41, 41, 0.2);
  --pine-12: rgba(7, 41, 41, 0.12);
  --pine-08: rgba(7, 41, 41, 0.08);

  /* Opacity Gradients for Bone/Dark Canvas */
  --bone-70: rgba(235, 234, 225, 0.7);
  --bone-50: rgba(235, 234, 225, 0.5);
  --bone-20: rgba(235, 234, 225, 0.2);

  /* Signature Jewel Accents */
  --mint: #1ef4b4;
  --mint-ink: #06845a;
  --lavender: #c6b5ff;
  --butter: #ffe9b5;
  --coral: #ff7755;
  --sky: #75d3da;
  --pink: #ff69b4;

  /* Text & Line Tokens */
  --ink: #072929;
  --muted: rgba(7, 41, 41, 0.65);
  --line: rgba(7, 41, 41, 0.12);

  /* Geometry & Layout */
  --r-card: 22px;
  --r-pill: 999px;
  --r-sm: 8px;
  --maxw: 1240px;

  /* Motion & Easings */
  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce: cubic-bezier(0.33, 1.4, 0.6, 1);
}
```

---

## 3. Typography Scale & Font Pairings

| Role | Font Family | Tailwind Class | Usage & Styling |
| :--- | :--- | :--- | :--- |
| **Display Hero** | `Cabinet Grotesk` / `Plus Jakarta Sans` (800) | `font-display` | Hero titles, large kinetic headlines, tracking `-0.03em`, leading `1.02` |
| **Page Headings** | `Cabinet Grotesk` / `Plus Jakarta Sans` (700) | `font-display` | `h1` (`clamp(2rem, 5vw, 3.4rem)`), `h2` (`clamp(1.75rem, 4vw, 2.75rem)`) |
| **Interface Body** | `General Sans` / `Plus Jakarta Sans` (400, 500) | `font-sans` | Body paragraphs, form controls, button labels, leading `1.55` |
| **Monospace Telemetry** | `JetBrains Mono` (400, 600) | `font-mono` | Step numbers (`01`, `02`), latency metrics, JSON payloads, tags |

---

## 4. Key Component Blueprints (The Audens Canon)

### 4.1 The Floating Nav Capsule (`.navshell` / `.navpill`)
- **Container**: Sticky `top: 0`, pointer-events pass-through on shell, `z-index: 100`.
- **The Pill**: 66px height, rounded `--r-pill`, background `rgba(245, 245, 240, 0.85)` with `backdrop-filter: blur(18px) saturate(160%)`.
- **Items**:
  - Wordmark: Geometric NorAI logo mark + `NORAI` in 800 display weight.
  - Links: Magnetic hover tabs with background pill indicator transition.
  - Primary CTA: Pill button with animated wave hand SVG icon (`.btn__hand`).
  - Progress Indicator: 2px active scroll progress bar at bottom of pill in `--mint`.

### 4.2 Aurora Hero Chamber (`.phero` / `.aurora__orb`)
- Multi-spectrum organic radial blur disks placed subtly in the background (`--mint` top-left at 18% opacity, `--lavender` top-right at 15% opacity).
- Staggered word-by-word kinetic typography (`.kinetic span.word`).
- Underline SVG flourish (`stroke: var(--mint)`, stroke-width: 4).

### 4.3 Three Dimensions Conversation Rail (`.section--dark.dotgrid`)
- Background: Pitch pine `#072929` with subtle SVG dotted grid pattern.
- 3 staggered conversational chat slots (`.chat-slot`):
  1. *The Consumer Question*: `Aditya asks: "Which candidate actually shipped backend microservices?"`
  2. *The Enterprise Question*: `CTO asks: "Can we run sovereign LLM inference without AWS data egress?"`
  3. *The Grassroots Question*: `Student in Varanasi asks: "Where do I start learning autonomous agent code for free?"`
- Each slot features an animated 3-dot typing indicator (`<i></i><i></i><i></i>`) revealing interactive solutions in Mint, Lavender, and Butter.

### 4.4 Capability Bento Grid (`.bento` & `.vig`)
- Asymmetric 2-column bento grid.
- Sheen numbers (`01`, `02`, `03`, `04`) in mono weight with jewel circular background.
- Live Micro-Vignette Chassis (`.vig`):
  - 3 macOS-style window dots (`<i></i><i></i><i></i>`).
  - Real-time interactive simulation (SVG gauge, KaTeX equation flip card, message compression bar, bilingual toggle).
- Expandable Disclosure Drawer (`.pcard__more`):
  - Semantic HTML retained in DOM for 100% SEO accessibility.
  - Smooth CSS grid animation `grid-template-rows: 0fr ➔ 1fr`.

### 4.5 The Sector Ledger (`.ledger` / `.artledger`)
- Clean horizontal rows with:
  - Numeric badge (`.ledger__n mono`).
  - Main title & promise statement (`.ledger__name`, `.ledger__promise`).
  - Short deliverable chip (`.ledger__short`).
  - Sliding arrow on hover (`.ledger__arrow` translates `translateX(4px)`).

### 4.6 Stepflow & Nextrail (`.stepflow`, `.nextrail`)
- Connected numbered sequence nodes with custom line connectors:
  `[01] ─── [02] ─── [03] ─── [04]`
- Highlighting transparent process ("What happens next") before any engagement.

### 4.7 Rotating Conic Closing Dispatch (`.gradient-card`)
- High-voltage card wrapped in an animated rotating conic gradient:
  `conic-gradient(from var(--angle), var(--mint), var(--sky), var(--lavender), var(--pink), var(--mint))`
- Enclosing a high-impact call to action ("Build AI that ships").

---

## 5. Interaction & Motion Rules (Emil Kowalski Philosophy)

- **No `transition: all`**: Explicitly specify `transition: transform 200ms var(--ease), background 200ms var(--ease), box-shadow 200ms var(--ease)`.
- **Tactile Click Depression**: Buttons and interactive tiles scale to `active:scale-[0.97]` or `0.98` with crisp recovery.
- **Fluid Spring Easings**: Dialogs and flyouts enter from `scale(0.95)` with `var(--ease-bounce)`.
- **Strict `prefers-reduced-motion`**: All animations automatically switch to instant opacity cross-fades when reduced motion is requested.
