# 06 — Micro-Interactions & Feedback Systems

> **Focus**: 1-click clipboard actions, keyboard hotkey badges, live LED status pulses, and zero-layout-shift skeleton loaders.  
> **NorAI Standard**: Micro-interactions must be instantaneous, accessible, and communicate state transitions with physical clarity.

---

## Summary Matrix

| Pattern Name | Source Site | Primary Pillar | Key Transition / Animation | NorAI Adaptation |
| :--- | :--- | :--- | :--- | :--- |
| **1-Click Copy with Checkmark Feedback** | `resend.com` | Resend (DX/AX) | 150ms icon swap (Copy $\rightarrow$ Check), 2s auto-reset, `c` hotkey support | JetBrains Mono tooltip, Forest Sage checkmark confirm |
| **Keyboard Hotkey Affordance Badges** | `linear.app` | Linear (Velocity) | Subtle 1px bordered keycap badge (`⌘K`, `1-4`), high contrast | Sunken parchment background (`#EDE7DF`), mono font |
| **Live Telemetry LED Pulse** | `teenage.engineering` | Teenage Eng (Hardware) | CSS opacity/scale pulse on 2s interval, hardware status colors | Forest Sage (`#5B8A72`), Terracotta (`#C2553A`), Ochre (`#B8860B`) |
| **Archival Paper Shimmer Skeleton** | `linear.app` + Custom | Stripe Press + Linear | Hairline gradient wipe without harsh white flashes, fixed height | Tabular numbers skeleton (`w-12 h-4`), zero CLS |

---

## Pattern Breakdown

### Pattern 6.1: Resend-Style 1-Click Copy Button with Keyboard Hotkey (`c`)

- **Source Reference**: [Resend CodeBlock](https://resend.com/docs)
- **Pillar**: **Resend (Obsessive DX)**
- **Fit Rationale**: Copying verified JSON payloads, schemas, and interview questions must require exactly 1 click with instant visual confirmation.

#### Structural DOM & Component Specification
```tsx
function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : 'Copy payload to clipboard'}
      className="
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
        bg-bg-elevated border border-[rgba(13,37,61,0.12)] text-primary-700
        hover:border-accent-500/40 hover:text-primary-900 active:scale-[0.96]
        transition-all duration-150 text-xs font-mono select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500
      "
    >
      {copied ? (
        <>
          <CheckIcon className="w-3.5 h-3.5 text-accent-secondary animate-in fade-in zoom-in-75 duration-150" />
          <span className="text-accent-secondary font-semibold">COPIED</span>
        </>
      ) : (
        <>
          <CopyIcon className="w-3.5 h-3.5 text-primary-500" />
          <span>Copy</span>
          <kbd className="px-1 py-0.2 rounded bg-bg-sunken text-[10px] text-primary-400">c</kbd>
        </>
      )}
    </button>
  );
}
```

---

### Pattern 6.2: Linear-Style Keyboard Hotkey Affordance Badges

- **Source Reference**: `linear.app`
- **Pillar**: **Linear (Creator Velocity)**
- **Fit Rationale**: Visibly teaching users keyboard shortcuts without cluttering the interface makes repetitive actions lightning fast.

#### Structural DOM & Component Specification
```tsx
<div className="flex items-center gap-2">
  {/* Standard Keycap Pill */}
  <kbd className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md bg-bg-sunken border border-[rgba(13,37,61,0.12)] font-mono text-[11px] font-semibold text-primary-700 shadow-2xs">
    ⌘K
  </kbd>

  {/* Numeric Selector Keycap */}
  <kbd className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-bg-sunken border border-[rgba(13,37,61,0.12)] font-mono text-[11px] font-semibold text-primary-700 shadow-2xs">
    1
  </kbd>

  {/* Escape Keycap */}
  <kbd className="inline-flex items-center justify-center px-1.5 h-5 rounded-md bg-bg-sunken border border-[rgba(13,37,61,0.12)] font-mono text-[10px] font-semibold text-primary-500 shadow-2xs">
    ESC
  </kbd>
</div>
```

---

### Pattern 6.3: Teenage Engineering Hardware Telemetry LED Pulse

- **Source Reference**: `teenage.engineering`
- **Pillar**: **Teenage Engineering (Hardware Honesty)**
- **Fit Rationale**: Displays live background neural tokenization and stream telemetry with subtle physical hardware lighting.

#### Structural DOM & CSS Specification
```tsx
<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-bg-sunken border border-[rgba(13,37,61,0.08)]">
  {/* Pulsing Sage LED (RAM Isolated & Active Stream) */}
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B8A72] opacity-75 duration-1000" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B8A72]" />
  </span>
  <span className="font-mono text-[11px] font-semibold text-primary-800 tabular-nums">
    NEURAL STREAM: 420 TOKENS/S
  </span>
</div>
```

---

### Pattern 6.4: Zero-Layout-Shift Archival Paper Skeleton Loader

- **Source Reference**: `linear.app` + NorAI Parchment Design System
- **Pillar**: **Linear + Stripe Press**
- **Fit Rationale**: When resumes or documents are ingesting, skeleton placeholders must precisely match final component dimensions, completely eliminating Cumulative Layout Shift (CLS).

#### Structural DOM & Component Specification
```tsx
<div className="p-4 rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.08)] space-y-3 animate-pulse">
  {/* Header Skeleton Row */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-md bg-bg-sunken" />
      <div className="w-32 h-5 rounded-md bg-bg-sunken" />
    </div>
    <div className="w-12 h-6 rounded-md bg-bg-sunken" />
  </div>

  {/* Progress Fill Bar Placeholder */}
  <div className="w-full h-2 rounded-full bg-bg-sunken overflow-hidden">
    <div className="h-full bg-accent-500/20 rounded-full w-2/3" />
  </div>

  {/* Telemetry Footer Placeholder */}
  <div className="flex items-center justify-between pt-1">
    <div className="w-24 h-3 rounded bg-bg-sunken" />
    <div className="w-16 h-3 rounded bg-bg-sunken font-mono text-[10px] tabular-nums" />
  </div>
</div>
```
