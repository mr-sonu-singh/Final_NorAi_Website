# 02 — Hero Sections

> **Focus**: Hero layouts, value-proposition intros, and live workbench entry frames.  
> **Strict Anti-Goal Firewall**: Reject all autoplay video backgrounds, floating glass cubes, 3D tilt cards, and generic purple/cyan radial glow meshes.

---

## Summary Matrix

| Pattern Name | Source Site | Primary Pillar | Core Philosophy / Composition | NorAI Adaptation |
| :--- | :--- | :--- | :--- | :--- |
| **Authoritative Editorial Hero** | `press.stripe.com` | Stripe Press (Editorial) | High-contrast serif headline, warm parchment canvas, zero video noise | `Instrument Serif` XL display (88px), warm `#F5F0EA` base |
| **Spec-First Hardware Hero** | `teenage.engineering` | Teenage Eng (Hardware) | Exposed millimeter specs, live parameter badges, monochrome crop | `font-mono tabular-nums` latency & telemetry readouts |
| **Velocity Workbench Intro** | `linear.app` | Linear (Velocity) | Immediate interactive canvas preview, keyboard hotkey tags (`[1-4]`) | Interactive Studio dual-pane stage with hotkey switcher |
| **DX-First Typed Code Hero** | `resend.com` | Resend (DX/AX) | Concrete typed request/response payload, 1-click test affordance | Live JSON Schema inspector beside natural language prompt |

---

## Pattern Breakdown

### Pattern 2.1: Stripe Press Authoritative Editorial Hero

- **Source**: [Stripe Press](https://press.stripe.com)
- **Pillar**: **Stripe Press (Editorial Craft)**
- **Fit Rationale**: NorAI is positioned as a rigorous engineering studio, not a fly-by-night wrapper startup. High-contrast editorial serif typography creates an immediate impression of permanence, academic rigor, and craftsmanship.

#### Structural DOM & Component Specification
```tsx
<section className="relative pt-24 pb-16 px-6 lg:px-12 bg-bg-page border-b border-[rgba(13,37,61,0.08)]">
  <div className="max-w-5xl mx-auto text-center space-y-6">
    {/* Micro-Telemetry Badge */}
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-elevated border border-[rgba(13,37,61,0.1)] text-primary-700 shadow-xs">
      <span className="w-2 h-2 rounded-full bg-accent-500" />
      <span className="font-mono text-xs tracking-wide">DETERMINISTIC AI STUDIO · ZERO PERSISTENT RETENTION</span>
    </div>

    {/* Display Serif Headline */}
    <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-primary-900 leading-[1.04]">
      Precision instruments for <span className="italic">verifiable</span> work.
    </h1>

    {/* Editorial Lead Paragraph */}
    <p className="max-w-2xl mx-auto font-sans text-lg sm:text-xl text-primary-700 leading-relaxed font-normal">
      High-velocity tools for engineers and operators. Neural ingestion pipeline with sub-second parsing, typed schemas, and zero data leakage.
    </p>

    {/* Dual CTA Strip with Hotkey Hint */}
    <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
      <button className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-[#A84530] active:scale-[0.98] text-white font-sans font-semibold text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-accent-500">
        Explore Product Studio
      </button>
      <button className="px-6 py-3 rounded-xl bg-bg-elevated hover:bg-bg-sunken border border-[rgba(13,37,61,0.12)] text-primary-900 font-sans font-medium text-sm transition-all flex items-center gap-2">
        <span>Quick Tour</span>
        <kbd className="font-mono text-xs text-primary-500 bg-bg-sunken px-1.5 py-0.5 rounded border border-[rgba(13,37,61,0.08)]">Tab</kbd>
      </button>
    </div>
  </div>
</section>
```

#### Interaction States Observed
- **Idle**: High-contrast headline on heavy archival paper canvas.
- **Hover on CTAs**: Terracotta background warms up; secondary button reveals hairline shadow.
- **Active / Pressed**: Tactile physical depression (`scale-[0.98]`).
- **Focus**: Double-ring outline (`ring-2 ring-accent-500 ring-offset-2 ring-offset-bg-page`).
- **Disabled**: Dimmed button state with `cursor-not-allowed`.

#### Adaptation Notes for NorAI
- Primary headline must always use `Instrument Serif`.
- Avoid adding background video, moving floating 3D balls, or fuzzy blur blobs behind the text.

---

### Pattern 2.2: Teenage Engineering Spec-First Product Hero

- **Source**: [Teenage Engineering](https://teenage.engineering)
- **Pillar**: **Teenage Engineering (Hardware Honesty)**
- **Fit Rationale**: Replaces vague marketing hype ("revolutionary AI") with exact, measurable technical telemetry (latency, memory footprint, token efficiency, deterministic model seeds).

#### Structural DOM & Component Specification
```tsx
<div className="rounded-3xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] p-6 lg:p-8 shadow-xs">
  {/* Header Spec Ribbon */}
  <div className="flex flex-wrap items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-4 mb-6 gap-4">
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs font-bold text-accent-500">SPEC NO. 01</span>
      <span className="text-primary-300">/</span>
      <span className="font-mono text-xs text-primary-600">RESUME_SHORTLISTER_V2</span>
    </div>
    <div className="flex items-center gap-4 font-mono text-[11px] text-primary-500">
      <span>LATENCY: &lt; 350ms</span>
      <span>•</span>
      <span>RAM ISOLATION: 100%</span>
      <span>•</span>
      <span>SEED: 0x4F92</span>
    </div>
  </div>

  {/* Hero Split Stage */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div className="lg:col-span-7 space-y-4">
      <h2 className="font-display text-3xl sm:text-4xl text-primary-900 font-normal">
        Automated Candidate Rubric Matching with Verifiable Citations.
      </h2>
      <p className="font-sans text-sm text-primary-700 leading-relaxed">
        Ingests batch PDF resumes, matches qualifications against strict boolean criteria, and calculates weighted domain scores with line-level source provenance.
      </p>
      {/* Hardware Parameter Badges */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-bg-sunken border border-[rgba(13,37,61,0.06)]">
          <div className="font-mono text-[10px] text-primary-500 uppercase">Throughput</div>
          <div className="font-mono text-base font-bold text-primary-900 tabular-nums">48 Docs/min</div>
        </div>
        <div className="p-3 rounded-xl bg-bg-sunken border border-[rgba(13,37,61,0.06)]">
          <div className="font-mono text-[10px] text-primary-500 uppercase">False Positive</div>
          <div className="font-mono text-base font-bold text-accent-secondary tabular-nums">&lt; 0.02%</div>
        </div>
        <div className="p-3 rounded-xl bg-bg-sunken border border-[rgba(13,37,61,0.06)]">
          <div className="font-mono text-[10px] text-primary-500 uppercase">Schema</div>
          <div className="font-mono text-base font-bold text-primary-900">Zod Strict</div>
        </div>
      </div>
    </div>

    {/* Clean Wireframe / Physical Visual Asset (No Fake 3D) */}
    <div className="lg:col-span-5 bg-bg-sunken rounded-2xl border border-[rgba(13,37,61,0.08)] p-4 flex flex-col justify-center items-center aspect-4/3 text-center">
      <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.12)] flex items-center justify-center mb-3 shadow-xs">
        <span className="font-display text-2xl text-accent-500 italic">01</span>
      </div>
      <div className="font-mono text-xs font-semibold text-primary-900">STAGE 01: RESUME SHORTLISTER</div>
      <div className="font-mono text-[11px] text-primary-500 mt-1">Ready for input stream...</div>
    </div>
  </div>
</div>
```

#### Interaction States Observed
- **Idle**: Clean monospace technical readouts.
- **Hover**: Subtle card elevation and border hairline tone shift.
- **Active**: Instant click response on parameter toggles.
- **Focus**: Double-ring keyboard outline.
- **Disabled**: Stat chips display `---` with gray status LED.

#### Adaptation Notes for NorAI
- Expose actual runtime metrics (like `< 0.35s / PDF`) rather than fictional benchmarks.
- Use `JetBrains Mono` with `tabular-nums` on every metric to prevent layout shifts.
