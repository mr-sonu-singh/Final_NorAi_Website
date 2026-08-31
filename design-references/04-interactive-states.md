# 04 — Interactive States & 5-State Ergonomics

> **Focus**: Systematic 5-state interaction design (Idle, Hover, Active/Pressed, Focused, Disabled/Loading) across buttons, interactive cards, form inputs, tool switchers, and mechanical switches.  
> **NorAI Standard**: Every interactive atom and molecule must intentionally define all five states.

---

## The 5-State Ergonomic Matrix

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   1. IDLE    │ ──> │   2. HOVER   │ ──> │  3. ACTIVE   │ ──> │  4. FOCUSED  │ ──> │ 5. DISABLED │
│ Hairline     │     │ Micro-lift   │     │ Physical     │     │ Double-ring  │     │ Dimmed (50%) │
│ border on    │     │ + border     │     │ compression  │     │ keyboard     │     │ aria-disabled│
│ paper surface│     │ highlight    │     │ (scale 0.98) │     │ outline      │     │ not-allowed  │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## Pattern Breakdown

### Pattern 4.1: Primary Action Button (Terracotta Ink)

- **Source Reference**: `linear.app` + `resend.com`
- **Pillar**: **Linear (Velocity) + Resend (DX)**
- **Fit Rationale**: The primary trigger for executing deterministic jobs must feel physical, responsive, and unambiguous.

#### CSS / Tailwind Specification
```tsx
<button
  type="button"
  disabled={isLoading}
  aria-disabled={isLoading}
  className="
    /* 1. IDLE STATE */
    relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
    bg-accent-500 text-white font-sans text-sm font-semibold tracking-normal shadow-xs
    border border-[rgba(255,255,255,0.15)] transition-all duration-150 ease-out

    /* 2. HOVER STATE */
    hover:bg-[#A84530] hover:-translate-y-0.5 hover:shadow-md

    /* 3. ACTIVE / PRESSED STATE */
    active:translate-y-0 active:scale-[0.98] active:bg-[#963C29]

    /* 4. FOCUSED STATE (Double-Ring Token) */
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
    focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page

    /* 5. DISABLED / LOADING STATE */
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
    disabled:hover:bg-accent-500 disabled:active:scale-100
  "
>
  {isLoading ? (
    <>
      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      <span className="font-mono text-xs">PROCESSING...</span>
    </>
  ) : (
    <>
      <span>Execute Job</span>
      <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded">↵</kbd>
    </>
  )}
</button>
```

---

### Pattern 4.2: Interactive Workbench Selection Card

- **Source Reference**: `linear.app` / `teenage.engineering`
- **Pillar**: **Linear (Ergonomics) + Teenage Engineering (Hardware Craft)**
- **Fit Rationale**: Cards that host tools or candidate profiles must give clear physical feedback when hovered, selected, or navigated via keyboard.

#### CSS / Tailwind Specification
```tsx
<div
  tabIndex={0}
  role="button"
  aria-pressed={isSelected}
  className={`
    /* 1. IDLE STATE */
    group relative p-5 rounded-2xl bg-bg-elevated cursor-pointer
    border border-[rgba(13,37,61,0.08)] shadow-xs
    transition-all duration-200 ease-out select-none

    /* 2. HOVER STATE */
    hover:border-accent-500/40 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-sm

    /* 3. ACTIVE / PRESSED STATE */
    active:scale-[0.99] active:bg-bg-sunken/40

    /* 4. FOCUSED STATE (Double-Ring) */
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page

    /* ACTIVE SELECTION STATE */
    ${isSelected ? 'border-2 border-accent-500 bg-accent-500/5 shadow-xs' : ''}
  `}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-lg bg-bg-sunken border border-[rgba(13,37,61,0.08)] flex items-center justify-center font-mono text-xs font-bold text-primary-800">
        01
      </span>
      <h3 className="font-display text-lg text-primary-900 font-normal">AI Resume Shortlister</h3>
    </div>
    <kbd className="font-mono text-xs text-primary-400 group-hover:text-accent-500 transition-colors">1</kbd>
  </div>
</div>
```

---

### Pattern 4.3: High-Density Search & Form Input

- **Source Reference**: `linear.app` (Command Bar & Filter Input)
- **Pillar**: **Linear (Velocity)**
- **Fit Rationale**: Search and prompt inputs must maintain crisp typography without intrusive default browser borders or awkward outlines.

#### CSS / Tailwind Specification
```tsx
<div className="relative">
  <input
    type="text"
    placeholder="Filter candidates by rubric keyword (e.g. 'Raft', 'Rust', 'Kafka')..."
    className="
      /* 1. IDLE STATE */
      w-full h-11 px-4 py-2 rounded-xl bg-bg-sunken/50 border border-[rgba(13,37,61,0.1)]
      font-sans text-sm text-primary-900 placeholder:text-primary-400
      transition-all duration-150

      /* 2. HOVER STATE */
      hover:border-[rgba(13,37,61,0.2)] hover:bg-bg-sunken/70

      /* 3. FOCUSED STATE */
      focus:outline-none focus:bg-bg-elevated focus:border-accent-500
      focus:ring-2 focus:ring-accent-500/20

      /* 4. DISABLED STATE */
      disabled:opacity-50 disabled:bg-bg-sunken disabled:cursor-not-allowed
    "
  />
  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
    <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-primary-400 bg-bg-elevated border border-[rgba(13,37,61,0.1)] rounded">
      /
    </kbd>
  </div>
</div>
```

---

### Pattern 4.4: Mechanical Hardware Toggle Switch

- **Source Reference**: `teenage.engineering`
- **Pillar**: **Teenage Engineering (Physical Honesty)**
- **Fit Rationale**: Binary settings (such as "Deterministic Seed Locked" or "Strict Boolean Mode") should feel like toggling a high-grade mechanical instrument switch.

#### Structural DOM & Component Specification
```tsx
<button
  type="button"
  role="switch"
  aria-checked={enabled}
  onClick={() => setEnabled(!enabled)}
  className={`
    /* Track 5-State Ergonomics */
    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
    border-2 border-transparent transition-colors duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
    ${enabled ? 'bg-accent-500' : 'bg-bg-sunken border-[rgba(13,37,61,0.12)]'}
  `}
>
  <span className="sr-only">Toggle deterministic mode</span>
  {/* Mechanical Thumb */}
  <span
    aria-hidden="true"
    className={`
      pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-xs
      transform transition duration-200 ease-in-out
      ${enabled ? 'translate-x-5' : 'translate-x-0'}
    `}
  />
</button>
```
