# NorAI Design System & Aesthetics Guide (`DESIGN.md`)

## 1. Aesthetic Ethos & Visual Identity

NorAI’s visual identity is defined by **Tactile Warm Parchment meets Precision Instrument Craft**.

Rather than defaulting to generic dark AI tropes (heavy neon purple glows, generic cards, and synthetic cyberpunk styling), NorAI interfaces evoke the feeling of a **well-crafted physical engineering workbench, an archival technical journal, or a high-precision instrument**:

- **Warm Parchment Foundation**: An inviting, paper-like background (`--surface-canvas: #F5F0EA`) paired with subtle layered paper panels (`--surface-panel: #FAF7F2`) that feels organic and calm.
- **Deep Navy Ink**: High-contrast, sharp ink typography (`--text-primary: #141C2B` and `#0D253D`) ensuring comfortable long-form reading and clear visual hierarchy.
- **Burnt Terracotta Accents**: Warm terracotta (`--accent-primary: #A63F1C` / `#C85A32`) that guides attention to primary interactive elements without visual fatigue.
- **Natural Secondary Accents**: Forest Sage (`--accent-secondary: #2E634A` / `#5B8A72`) for live status badges, telemetry, and verified indicators; Dark Goldenrod (`--accent-tertiary: #996B00` / `#B8860B`) for regional context and special callouts.
- **Refined Hairline Borders**: Subtle borders (`--border-subtle: rgba(20, 28, 43, 0.08)`) that create structured, architectural layouts without visual clutter.
- **Honest Telemetry & Tactile Feedback**: Displaying real execution times, clean data tags, and responsive micro-interactions.

---

## 2. Typography System

The typography pairs an editorial display serif with a clean modern interface sans and a fixed-width monospace:

| Font Role                   | Font Family                     | Tailwind / CSS                | Primary Usage                                                            |
| :-------------------------- | :------------------------------ | :---------------------------- | :----------------------------------------------------------------------- |
| **Editorial Display Serif** | `Instrument Serif`, serif       | `font-display` / `font-serif` | Hero headlines, section titles, editorial statements, narrative emphasis |
| **Interface Sans-Serif**    | `Plus Jakarta Sans`, sans-serif | `font-sans`                   | Body paragraphs, buttons, navigation links, form labels, general UI      |
| **Tabular Monospace**       | `JetBrains Mono`, monospace     | `font-mono`                   | Latency readouts, metrics, code snippets, tags, keyboard hints           |

---

## 3. Core Design Tokens Reference

All design tokens are defined in [`app/globals.css`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/app/globals.css) and can be used directly via CSS variables or Tailwind utility classes:

### Surfaces & Backgrounds

- `--surface-canvas` (`#F5F0EA`): Warm parchment base canvas for the page.
- `--surface-panel` (`#FAF7F2`): Elevated cards, module containers, and clean paper surfaces.
- `--surface-panel-elevated` (`#FFFFFF`): Flyouts, modals, popovers, and elevated focus layers.
- `--surface-panel-subtle` (`#EBE3D8`): Inset wells, code blocks, parameter tables, and sunken areas.
- `--surface-hover` (`#ECE5DA`): Interactive hover background for items and rows.
- `--surface-active` (`#E0D5C5`): Pressed and active item backgrounds.
- `--surface-dark` (`#141C2B`): Contrast dark surface (e.g., footer block, terminal code windows).

### Foreground & Typography

- `--text-primary` (`#141C2B`): Primary navy ink for headings, data values, and strong copy.
- `--text-secondary` (`#475467` / `#526075`): Body text, supporting descriptions, and inactive states.
- `--text-muted` (`#4F5E72` / `#8491A2`): Captions, line numbers, timestamps, and secondary metadata.
- `--text-inverse` (`#F5F0EA`): Parchment text on solid dark or accent backgrounds.

### Accents & Status Indicators

- `--accent-primary` (`#A63F1C` / `#C85A32`): Terracotta interactive accent for buttons and links.
- `--accent-hover` (`#913617` / `#B54F2A`): Darker terracotta hover state.
- `--accent-subtle` (`rgba(166, 63, 28, 0.12)`): Light terracotta tint for selections and chips.
- `--accent-secondary` (`#2E634A` / `#5B8A72`): Forest sage for active telemetry and verified states.
- `--accent-tertiary` (`#996B00` / `#B8860B`): Goldenrod for regional highlights and milestones.
- `--border-subtle` (`rgba(20, 28, 43, 0.08)`): Hairline dividers and container outlines.
- `--border-strong` (`rgba(20, 28, 43, 0.16)`): Active card borders and form controls.

---

## 4. Helpful Design Principles

When designing or updating UI components, use these guidelines to maintain a cohesive, premium feel:

1. **Editorial Balance & Rhythm**: Give content room to breathe with generous padding and clean vertical cadence. Let headlines and cards have natural visual presence without overwhelming density.
2. **Tactile Micro-Interactions**: Interactive elements feel great when they respond smoothly—subtle background transitions on hover, light scaling (`active:scale-[0.98]`), and tactile focus states.
3. **Natural Motion**: Keep animations purposeful and snappy (150–300ms transitions). Always respect `prefers-reduced-motion` so users with accessibility preferences have a smooth experience.
4. **Legibility & Accessibility**: Ensure strong contrast between text and background surfaces (WCAG AA/AAA). Maintain semantic HTML headings (`h1` → `h2` → `h3`) and accessible button/link elements.
5. **Responsive Fluidity**: Design interfaces to look polished across both mobile viewports and large desktop displays.

---

## 5. Creative Freedom for Agents & Engineers

This guide provides **context, tokens, and aesthetic principles**—not rigid micromanagement.

Engineers and AI agents have full creative freedom to:

- Structure page sections, heroes, and layouts to best tell the product story.
- Create new interactive components, workbench sandboxes, and visual elements that delight users.
- Experiment with creative layouts, bento arrangements, and data visualizations that enhance utility.
- Choose the best motion curves, spacing, and micro-interactions suited to each specific feature.
