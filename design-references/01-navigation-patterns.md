# 01 — Navigation Patterns

> **Focus**: Top navigation bars, keyboard command palettes (`⌘K`), API documentation sidebars, breadcrumbs, and segmented mobile drawers.

---

## Summary Matrix

| Pattern Name | Source Site | Primary Pillar | Key Interaction / Affordance | NorAI Adaptation |
| :--- | :--- | :--- | :--- | :--- |
| **Command Palette (Cmd+K Modal)** | `linear.app` | Linear (Velocity) | Fuzzy search, hotkey traversal, contextual grouping | Parchment paper surface, Terracotta active item highlight |
| **API Docs Sidebar & Method Pills** | `resend.com/docs` | Resend (DX/AX) | Grouped endpoints, compact method pills (`POST`, `GET`) | Hairline border dividers, Forest Sage for safe/read endpoints |
| **Monospace Header & Mode Strip** | `teenage.engineering` | Teenage Eng (Hardware) | Geometric status glyphs, monospace nav items, exposed state | Tabular font, Terracotta LED status indicator |
| **Editorial Header & Reading Bar** | `press.stripe.com` | Stripe Press (Editorial) | Minimalist logo mark, hairline rule, scroll progress bar | Warm `#F5F0EA` backdrop, deep navy ink typography |
| **Breadcrumb & Studio Switcher** | `linear.app` / `raycast.com` | Linear + Raycast | Hotkey pill tags (`[1]`, `[2]`), tool scope breadcrumbs | Numbered tool hotkey dock (`1-4`) for NorAI product studio |

---

## Pattern Breakdown

### Pattern 1.1: Linear-Style Keyboard Command Palette (`⌘K`)

- **Source**: [Linear App](https://linear.app) (`linear.app/features/command-menu`)
- **Pillar**: **Linear (Creator Velocity)**
- **Fit Rationale**: NorAI is a keyboard-first determinism engine. Power users should never have to take their hands off the keyboard to switch tools, copy schema payloads, or filter candidates.

#### Structural DOM & Component Specification
```tsx
<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-primary-900/40 backdrop-blur-xs">
  <div className="w-full max-w-xl rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.12)] shadow-2xl overflow-hidden">
    {/* Search Input Bar */}
    <div className="flex items-center px-4 py-3.5 border-b border-[rgba(13,37,61,0.08)] gap-3 bg-bg-sunken/40">
      <SearchIcon className="w-4 h-4 text-primary-500" />
      <input 
        type="text" 
        placeholder="Type a command or search tools (e.g. 'Shortlist Resumes', 'JSON Schema')..."
        className="w-full bg-transparent text-primary-900 placeholder:text-primary-400 font-sans text-sm focus:outline-none"
      />
      <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-primary-500 bg-bg-elevated border border-[rgba(13,37,61,0.12)] rounded">ESC</kbd>
    </div>

    {/* Categorized Command Groups */}
    <div className="p-2 max-h-80 overflow-y-auto space-y-3">
      <div>
        <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-primary-400">Deterministic Tools</div>
        <ul className="mt-1 space-y-0.5">
          <li className="flex items-center justify-between px-3 py-2 rounded-lg bg-accent-500/10 text-primary-900 text-sm font-medium cursor-pointer">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              <span>01. AI Resume Shortlister</span>
            </div>
            <kbd className="font-mono text-xs text-primary-500">1</kbd>
          </li>
          <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-bg-sunken text-primary-700 text-sm cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary-300" />
              <span>02. Course Note-Taker</span>
            </div>
            <kbd className="font-mono text-xs text-primary-400">2</kbd>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

#### Interaction States Observed
- **Idle**: Trigger button in header displays `⌘K` badge in `font-mono text-xs text-primary-500`.
- **Hover**: Command item background subtly shifts to `--bg-sunken` (`#EDE7DF`).
- **Active / Selected**: Accent highlight (`bg-accent-500/10`) with Terracotta left accent indicator.
- **Focus**: Keyboard traversal via $\uparrow / \downarrow$ with `aria-selected="true"`.
- **Disabled**: Dimmed opacity (`opacity-40`) with `pointer-events-none` for tools in background compilation.

#### Adaptation Notes for NorAI
- Replace obsidian background with warm paper `--bg-elevated` (`#FDFBF7`).
- Use `Instrument Serif` for modal group headers if styled as high-editorial, or `JetBrains Mono text-[11px]` for technical command groups.
- Set keyboard indicator borders to 1px hairline `rgba(13,37,61,0.12)`.

---

### Pattern 1.2: Resend-Style API Docs Sidebar with Method Pills

- **Source**: [Resend Docs](https://resend.com/docs/api-reference/emails/send-email)
- **Pillar**: **Resend (Obsessive DX/AX)**
- **Fit Rationale**: NorAI tools expose verifiable schemas and typed deterministic endpoints. Grouping endpoints by domain with color-coded HTTP method badges creates high visual scannability.

#### Structural DOM & Component Specification
```tsx
<nav className="w-64 border-r border-[rgba(13,37,61,0.08)] bg-bg-page p-4 flex flex-col gap-6">
  {/* Category Header */}
  <div>
    <h4 className="px-2 mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary-500">
      Studio Endpoints
    </h4>
    <ul className="space-y-1">
      {/* Active Endpoint Item */}
      <li>
        <a href="#shortlist" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-bg-elevated border border-[rgba(13,37,61,0.1)] text-primary-900 font-medium text-xs shadow-xs">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#A84530] text-white">POST</span>
          <span className="font-mono truncate">/v1/shortlist</span>
        </a>
      </li>
      {/* Inactive Endpoint Items */}
      <li>
        <a href="#rubric" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-primary-600 hover:text-primary-900 hover:bg-bg-sunken transition-colors text-xs">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent-secondary/20 text-accent-secondary">GET</span>
          <span className="font-mono truncate">/v1/rubric/scores</span>
        </a>
      </li>
      <li>
        <a href="#telemetry" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-primary-600 hover:text-primary-900 hover:bg-bg-sunken transition-colors text-xs">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-700">PATCH</span>
          <span className="font-mono truncate">/v1/telemetry/stream</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
```

#### Interaction States Observed
- **Idle**: Muted slate text (`text-primary-600`) with semi-transparent method pill background.
- **Hover**: Background elevates to `--bg-sunken`, text darkens to `--color-ink-primary`.
- **Active / Pressed**: Subtle 0.98 scale compression.
- **Focused**: Double-ring outline with 2px offset.
- **Disabled**: Method badge grayed out (`bg-gray-200 text-gray-400`).

#### Adaptation Notes for NorAI
- Color POST method pills with Terracotta (`#A84530`), GET with Forest Sage (`#5B8A72`), and PATCH with Goldenrod Ochre (`#B8860B`).
- Typography uses `JetBrains Mono` for endpoints and `Plus Jakarta Sans` for section navigation.

---

### Pattern 1.3: Teenage Engineering Hardware Top Bar & Live Status LEDs

- **Source**: [Teenage Engineering](https://teenage.engineering)
- **Pillar**: **Teenage Engineering (Hardware Honesty)**
- **Fit Rationale**: Gives the user immediate tactile awareness that they are operating a live deterministic machine, exposing system status and latency directly in the window chrome.

#### Structural DOM & Component Specification
```tsx
<header className="h-14 border-b border-[rgba(13,37,61,0.08)] bg-bg-page/95 backdrop-blur-xs px-6 flex items-center justify-between">
  {/* Brand + Model Label */}
  <div className="flex items-center gap-4">
    <a href="/" className="font-display text-xl tracking-tight text-primary-900 font-normal">
      Nor<span className="italic font-normal">AI</span>
    </a>
    <div className="h-4 w-px bg-[rgba(13,37,61,0.12)]" />
    <span className="font-mono text-[11px] uppercase tracking-wider text-primary-500">
      CORE INSTRUMENT v2.4
    </span>
  </div>

  {/* Live Telemetry LEDs */}
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B8A72]" />
      </span>
      <span className="font-mono text-xs tabular-nums text-primary-700">SYS: NOMINAL</span>
    </div>

    <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs tabular-nums text-primary-500 border-l border-[rgba(13,37,61,0.08)] pl-4">
      <span>P95:</span>
      <span className="font-semibold text-primary-900">284ms</span>
    </div>

    {/* Hotkey Trigger */}
    <button className="flex items-center gap-2 px-2.5 py-1 bg-bg-elevated border border-[rgba(13,37,61,0.12)] rounded-lg hover:border-accent-500/40 text-xs font-mono text-primary-700 transition-all">
      <span>Search</span>
      <kbd className="px-1 py-0.2 rounded bg-bg-sunken text-[10px] text-primary-500">⌘K</kbd>
    </button>
  </div>
</header>
```

#### Interaction States Observed
- **Idle**: Clean hairline border, crisp typography.
- **Hover**: Search button reveals Terracotta border glow (`hover:border-accent-500/40`).
- **Active / Pressed**: Active scale compression on search hotkey button.
- **Focus**: Double-ring keyboard focus pattern.
- **Disabled**: System status dot changes from Forest Sage (`#5B8A72`) to Muted Gray (`#9E9E9E`).

#### Adaptation Notes for NorAI
- Keep hardware window chrome consistent across marketing headers and interactive workbench toolbars.
