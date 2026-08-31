# NorAI Filtered Design Reference Library

> **Identity**: *Instrument Craft & Deterministic Utility*  
> **Aesthetic Core**: Parchment & Terracotta (`#F5F0EA` & `#C2553A`), High-Contrast Editorial Serif (`Instrument Serif`), Engineered Sans (`Plus Jakarta Sans`), and Tabular Monospace (`JetBrains Mono`).

---

## 1. The Four Foundational Pillars

This library curates UI patterns strictly aligned with NorAI's DNA. Every design reference in this repository maps directly to at least one of these four pillars:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                           NORAI DESIGN IDENTITY                               │
├───────────────────────┬───────────────────────┬───────────────────────────────┤
│ 1. Teenage Engineering│ 2. Linear             │ 3. Stripe Press / Resend      │
│ Physical honesty,     │ Creator velocity,     │ Warm parchment craft, DX/AX   │
│ exposed telemetry,    │ hotkey-first control, │ precision, typed schemas,     │
│ "everything labeled"  │ segmented workflows,  │ 1-click clipboard actions,    │
│ density with balance. │ sub-millisecond feel. │ mathematical typography.      │
└───────────────────────┴───────────────────────┴───────────────────────────────┘
```

1. **Teenage Engineering (Hardware Honesty & Exposed Telemetry)**:
   - Exposed operational spec sheets (dimensions, power, latency in ms, RAM usage).
   - "Everything labeled" micro-captions (`font-mono text-[11px]`).
   - Hardware status indicators (Terracotta, Ochre, Forest Sage LEDs).
   - Precision grid ergonomics with calibrated hairline borders.

2. **Linear (Creator Velocity & Ergonomic Flow)**:
   - Keyboard-first interaction model (`⌘K`, `Esc`, `1`-`4` number hotkeys).
   - Segmented step intake docks avoiding cramped vertical textarea stacking.
   - Master-detail lists with 1-click inline accordions.
   - Instant visual response with zero cumulative layout shift (CLS).

3. **Stripe Press (Editorial Craft & Mathematical Rigor)**:
   - Warm archival parchment paper backgrounds (`#F5F0EA`).
   - High-contrast authoritative headlines (`Instrument Serif`).
   - Algorithmic and mathematical formula typesetting (KaTeX-styled readouts).
   - Editorial pull-quotes, marginalia, and section divider rules.

4. **Resend (Obsessive DX & Interface Clarity)**:
   - Typed schema presentation (Zod/TypeScript syntax blocks).
   - 1-click copy affordances with instantaneous tactile checkmark feedback.
   - Clear HTTP method pills (`GET`, `POST`, `PATCH`, `DELETE`).
   - High information density without visual fatigue.

---

## 2. The Anti-Goal Firewall

To preserve NorAI's editorial-technical character, all design references are aggressively filtered against the following anti-patterns:

| Anti-Pattern | Why It Is Rejected | NorAI Replacement Token |
| :--- | :--- | :--- |
| **Neon purple/cyan glow cards** | Reads as generic crypto/Web3 slop | Calibrated 1px hairline borders (`rgba(13,37,61,0.08)`) |
| **3D mouse-tilt cards (`TiltCard`)** | Gimmicky distraction with zero utility | Flat paper elevation (`bg-bg-elevated`) with subtle lift (`hover:-translate-y-0.5`) |
| **Autoplay background hero video** | Bandwidth bloat, layout shifts, distraction | High-contrast static editorial hero + live interactive workbench preview |
| **Cyber-grid & glassmorphism mesh** | Reduces text contrast and legibility | Warm parchment base (`#F5F0EA`) + clean paper cards (`#FDFBF7`) |
| **Stacked multi-textarea wizards** | Causes cramped nested scrollbars | Segmented horizontal Step Intake Dock (`[ 1. Job Role ] [ 2. Ingestion ]`) |

---

## 3. Directory Structure & File Index

| File | Focus Area | Benchmark Application |
| :--- | :--- | :--- |
| [`01-navigation-patterns.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/01-navigation-patterns.md) | Header bars, command palettes (`⌘K`), breadcrumbs, mobile drawers | Top navigation, global hotkeys, model/tool switchers |
| [`02-hero-sections.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/02-hero-sections.md) | High-contrast editorial hero layouts & live workbench intros | Landing page hero, interactive studio header |
| [`03-data-display.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/03-data-display.md) | Comparative matrices, scorecards, telemetry bars, step docks | **Resume Shortlister Benchmark**, Candidate leaderboard |
| [`04-interactive-states.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/04-interactive-states.md) | 5-state ergonomics (Idle, Hover, Active, Focus, Disabled) | Form controls, buttons, tool switchers, table rows |
| [`05-typography-editorial.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/05-typography-editorial.md) | Serif + Sans + Mono pairings, KaTeX math blocks, pull-quotes | Technical whitepapers, case studies, changelog |
| [`06-micro-interactions.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/06-micro-interactions.md) | 1-click copy feedback, hotkey hints, LED pulses, skeletons | Payload inspector, status ribbons, clipboard actions |
| [`rejected-log.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/design-references/rejected-log.md) | Documented log of rejected references and rationales | Quality gatekeeper preventing off-brand regressions |

---

## 4. How to Adapt References to NorAI (`DESIGN.md` Tokens)

When implementing any pattern from this library into the NorAI codebase:

1. **Surfaces**: Swap pure white or dark obsidian backgrounds for `--bg-page` (`#F5F0EA`) and elevated cards for `--bg-elevated` (`#FDFBF7`).
2. **Typography**:
   - Display headlines $\rightarrow$ `Instrument Serif` (`font-display`).
   - Body copy & UI controls $\rightarrow$ `Plus Jakarta Sans` (`font-sans`).
   - Numbers & telemetry $\rightarrow$ `JetBrains Mono` (`font-mono tabular-nums`).
3. **Borders**: Replace shadows or heavy borders with 1px hairlines: `border-[rgba(13,37,61,0.08)]`.
4. **Accents**: Use Burnt Terracotta (`#C2553A` / `bg-accent-500`) for primary interactive moments, and Forest Sage (`#5B8A72`) for verified/SLA status tags.
5. **Keyboard & Focus**: Always apply the double-ring focus token:
   `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page`.
