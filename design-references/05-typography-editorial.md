# 05 — Editorial Typography & Mathematical Typesetting

> **Focus**: Serif + Sans + Monospace pairing hierarchy, KaTeX mathematical typesetting, editorial pull-quotes, marginalia, and changelog typographic rhythm.  
> **NorAI Type System**: `Instrument Serif` (Display Headings) + `Plus Jakarta Sans` (Prose & Interface) + `JetBrains Mono` (Tabular Numbers, SLAs & Payloads).

---

## The Typography Hierarchy Matrix

| Element Role | Font Family | Size (Mobile → Desktop) | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XL** | `Instrument Serif` | `3.5rem` → `5.5rem` (56–88px) | 400 | `1.04` | `-0.02em` | Hero display headlines |
| **Section Title** | `Instrument Serif` | `2.25rem` → `3.75rem` (36–60px) | 400 | `1.10` | `-0.02em` | Major landing and doc section headers |
| **Component Header** | `Instrument Serif` | `1.75rem` → `2.25rem` (28–36px) | 400 | `1.15` | `-0.015em`| Workbench titles, bento hero cards |
| **UI Control / Label** | `Plus Jakarta Sans` | `0.875rem` → `1.0rem` (14–16px) | 600 | `1.40` | `-0.005em`| Form labels, button text, step titles |
| **Reading Prose** | `Plus Jakarta Sans` | `1.0rem` → `1.125rem` (16–18px)| 400 | `1.70` | `normal` | Long-form technical reading, rationale |
| **Telemetry / Code** | `JetBrains Mono` | `0.75rem` → `0.8125rem` (12–13px)| 500 | `1.40` | `+0.02em` | Latency, JSON schemas, formula variables |

---

## Pattern Breakdown

### Pattern 5.1: Stripe Press Editorial Pull-Quote & Marginalia

- **Source Reference**: `press.stripe.com` (Book & Chapter Excerpts)
- **Pillar**: **Stripe Press (Editorial Craft)**
- **Fit Rationale**: NorAI whitepapers and technical deep-dives need high-authority editorial treatments that emphasize human craft over generic chatbot boilerplate.

#### Structural DOM & Component Specification
```tsx
<figure className="relative my-8 pl-6 border-l-2 border-accent-500/60 space-y-3 bg-bg-sunken/10 py-2 rounded-r-xl">
  <blockquote className="font-display text-2xl sm:text-3xl text-primary-900 font-normal italic leading-snug">
    “Deterministic instruments do not guess; they evaluate structured inputs against verifiable rubrics and yield mathematical certainty.”
  </blockquote>
  <figcaption className="flex items-center gap-2 font-mono text-xs text-primary-600">
    <span className="font-semibold text-primary-900">— NorAI Architecture Manifesto</span>
    <span>•</span>
    <span className="text-accent-secondary">Section 04: The Verification Loop</span>
  </figcaption>
</figure>
```

---

### Pattern 5.2: Mathematical Typesetting Block (KaTeX Style)

- **Source Reference**: Academic Papers & Stripe Press
- **Pillar**: **Stripe Press (Mathematical Rigor) + Teenage Engineering**
- **Fit Rationale**: Formalizes NorAI's spatial and algorithmic rules (such as the concentric nested radius theorem and rubric scoring equations) with mathematical clarity.

#### Structural DOM & Component Specification
```tsx
<div className="my-6 p-6 rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] space-y-4">
  {/* Formula Title */}
  <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.06)] pb-3">
    <span className="font-mono text-xs font-bold text-accent-500 uppercase">THEOREM 1.1: CONCENTRIC RADIUS EQUILIBRIUM</span>
    <span className="font-mono text-[11px] text-primary-400">GEOMETRY FORMULA</span>
  </div>

  {/* Formula Display Block */}
  <div className="py-4 px-6 bg-bg-sunken/40 rounded-xl border border-[rgba(13,37,61,0.06)] text-center">
    <div className="font-display text-2xl sm:text-3xl text-primary-900 tracking-wide">
      Radius<sub>inner</sub> = Radius<sub>outer</sub> − Padding<sub>gap</sub>
    </div>
  </div>

  {/* Monospace Parameter Explanations */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs text-primary-600">
    <div className="p-2.5 rounded-lg bg-bg-page border border-[rgba(13,37,61,0.06)]">
      <div className="font-bold text-primary-900">Outer Stage (24px)</div>
      <div className="text-[11px] text-primary-500 mt-0.5">With 8px container gap</div>
    </div>
    <div className="p-2.5 rounded-lg bg-bg-page border border-[rgba(13,37,61,0.06)]">
      <div className="font-bold text-primary-900">Inner Card (16px)</div>
      <div className="text-[11px] text-primary-500 mt-0.5">With 8px control padding</div>
    </div>
    <div className="p-2.5 rounded-lg bg-bg-page border border-[rgba(13,37,61,0.06)]">
      <div className="font-bold text-accent-secondary">Button / Pill (8px)</div>
      <div className="text-[11px] text-primary-500 mt-0.5">Concentric optical harmony</div>
    </div>
  </div>
</div>
```

---

### Pattern 5.3: Linear-Style Changelog Typographic Rhythm

- **Source Reference**: `linear.app/changelog`
- **Pillar**: **Linear (Creator Velocity)**
- **Fit Rationale**: Displays fast product releases and technical upgrades in a clean vertical timeline with sticky dates and high typographic discipline.

#### Structural DOM & Component Specification
```tsx
<article className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 border-b border-[rgba(13,37,61,0.08)]">
  {/* Sticky Date Column */}
  <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit space-y-1">
    <time className="font-mono text-xs font-bold text-primary-500 uppercase tracking-wider">
      August 31, 2026
    </time>
    <div className="inline-block px-2 py-0.5 rounded bg-accent-500/10 text-accent-500 font-mono text-[11px] font-semibold">
      v2.4.0 RELEASE
    </div>
  </div>

  {/* Changelog Content Column */}
  <div className="lg:col-span-9 space-y-4">
    <h3 className="font-display text-2xl sm:text-3xl text-primary-900 font-normal">
      Multi-Entity Comparative Matrices &amp; Segmented Step Docks
    </h3>
    <p className="font-sans text-sm text-primary-700 leading-relaxed">
      Upgraded the AI Resume Shortlister engine with full widescreen stage utilization, zero nested scrollbars, and master-detail accordions with line-level source provenance.
    </p>

    {/* Structured Feature Badges */}
    <ul className="space-y-2 font-sans text-xs text-primary-800 pt-2">
      <li className="flex items-start gap-2.5">
        <span className="px-1.5 py-0.5 rounded bg-accent-secondary/15 text-accent-secondary font-mono text-[10px] font-bold shrink-0">NEW</span>
        <span>Side-by-side rubric comparison with emerald, terracotta, and slate score bars.</span>
      </li>
      <li className="flex items-start gap-2.5">
        <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 font-mono text-[10px] font-bold shrink-0">IMPROVED</span>
        <span>Keyboard hotkey traversal for 1-click candidate profile switching via number keys [1-4].</span>
      </li>
    </ul>
  </div>
</article>
```
