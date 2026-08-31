# 03 — Data Display & Workbench Patterns (High Priority)

> **Core Focus**: Comparative matrices, segmented step docks, master-detail scorecards, inline expandable accordions, 1-click entity switcher pill bars, and hardware telemetry readouts.  
> **Benchmark Target**: The **Resume Shortlister & Candidate Scorecard** interface (and all subsequent NorAI studio tools).

---

## Summary Matrix

| Pattern Name | Source Site / Inspiration | Primary Pillar | Core Problem Solved | NorAI Adaptation |
| :--- | :--- | :--- | :--- | :--- |
| **Comparative Multi-Entity Matrix** | SaaS Benchmark & NN/g | Linear + Stripe Press | Eliminates tab switching by placing candidates side-by-side with color-coded rubric progress bars | Emerald ($\ge 90\%$), Terracotta ($\ge 75\%$), Slate ($< 75\%$) + qualitative citations |
| **Segmented Horizontal Step Dock** | Linear Settings & Raycast | Linear (Velocity) | Eliminates cramped vertical textarea stacking and internal nested scrollbars | `[ 1. Job Role ] [ 2. Ingestion ] [ 3. Rubric ]` with full-height `min-h-[220px]` editors |
| **Master-Detail with Inline Accordion** | Linear Issue List | Linear (Ergonomics) | 1-click chevron toggle reveals verified evidence, quote citations, and probe questions inline | Smooth CSS grid animation, zero horizontal layout jump |
| **1-Click Entity Switcher Pill Bar** | Vercel Analytics / Linear | Linear (Velocity) | Rapid context switching across scored profiles without losing scorecard context | `[ #1 Alex Chen 96% ] [ #2 Sarah V. 88% ]` pill strip with rank badges |
| **Bento Scorecard & Risk Assessment** | Teenage Eng + Resend | Teenage Eng (Honesty) | 2-column verified evidence vs risk flags, numbered interview cue cards | Clean paper card with traffic-light status badges |
| **Hardware Live Telemetry Ribbon** | Teenage Eng Hardware | Teenage Eng (Telemetry) | Exposes live parsing latency, RAM isolation, and Zod schema typing | Terracotta/Ochre/Sage LEDs + `font-mono tabular-nums` readouts |

---

## Concrete Pattern Specifications

### Pattern 3.1: Comparative Multi-Entity Vector Matrix (Side-by-Side Rubric)

- **Problem Solved**: Evaluating multiple candidates/entities against a standardized rubric usually forces recruiters to open 5 separate tabs or flip through screens, losing mental context.
- **Pillar**: **Linear (Velocity) + Stripe Press (Technical Precision)**
- **Fit Rationale**: NorAI provides deterministic, reproducible scoring. A structured comparative matrix visually breaks down scores dimension-by-dimension with evidence citations.

#### Structural DOM & Component Specification
```tsx
<div className="w-full rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] overflow-hidden shadow-xs">
  {/* Matrix Header Strip */}
  <div className="px-6 py-4 bg-bg-sunken/40 border-b border-[rgba(13,37,61,0.08)] flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs font-bold text-accent-500 uppercase tracking-wider">DIMENSIONAL COMPARATIVE MATRIX</span>
      <span className="text-primary-300">•</span>
      <span className="font-sans text-xs text-primary-600">3 Candidates Evaluated against Staff Distributed Systems Rubric</span>
    </div>
    <div className="font-mono text-[11px] text-primary-500">SORTED BY VERIFIED FIT ↓</div>
  </div>

  {/* Comparison Table Grid */}
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-[rgba(13,37,61,0.08)] bg-bg-elevated">
          <th className="py-3.5 px-6 font-mono text-xs font-semibold text-primary-500 uppercase w-1/4">Evaluation Dimension</th>
          <th className="py-3.5 px-4 font-sans text-sm font-semibold text-primary-900 w-1/4 border-l border-[rgba(13,37,61,0.06)]">
            <div className="flex items-center justify-between">
              <span>#1 Alex Chen</span>
              <span className="font-mono text-xs text-accent-secondary font-bold tabular-nums">96%</span>
            </div>
          </th>
          <th className="py-3.5 px-4 font-sans text-sm font-semibold text-primary-900 w-1/4 border-l border-[rgba(13,37,61,0.06)]">
            <div className="flex items-center justify-between">
              <span>#2 Sarah Varma</span>
              <span className="font-mono text-xs text-accent-500 font-bold tabular-nums">82%</span>
            </div>
          </th>
          <th className="py-3.5 px-4 font-sans text-sm font-semibold text-primary-900 w-1/4 border-l border-[rgba(13,37,61,0.06)]">
            <div className="flex items-center justify-between">
              <span>#3 Marcus Brody</span>
              <span className="font-mono text-xs text-primary-500 font-bold tabular-nums">64%</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[rgba(13,37,61,0.06)] font-sans text-xs">
        {/* Row 1: Distributed Consensus */}
        <tr className="hover:bg-bg-sunken/30 transition-colors">
          <td className="py-4 px-6 font-medium text-primary-900">
            <div className="font-semibold text-sm">Distributed Consensus</div>
            <div className="font-mono text-[11px] text-primary-500 mt-0.5">Raft / Paxos / etcd internals</div>
          </td>
          {/* Candidate 1 */}
          <td className="py-4 px-4 border-l border-[rgba(13,37,61,0.06)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-sunken overflow-hidden">
                <div className="h-full bg-accent-secondary rounded-full" style={{ width: '95%' }} />
              </div>
              <span className="font-mono font-bold text-accent-secondary tabular-nums">95%</span>
            </div>
            <p className="text-primary-700 italic text-[11px] leading-tight">
              "Rewrote Raft consensus engine in Rust for low-latency leader election."
            </p>
          </td>
          {/* Candidate 2 */}
          <td className="py-4 px-4 border-l border-[rgba(13,37,61,0.06)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-sunken overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: '80%' }} />
              </div>
              <span className="font-mono font-bold text-accent-500 tabular-nums">80%</span>
            </div>
            <p className="text-primary-700 italic text-[11px] leading-tight">
              "Managed 20-node etcd cluster with automated failover and snapshotting."
            </p>
          </td>
          {/* Candidate 3 */}
          <td className="py-4 px-4 border-l border-[rgba(13,37,61,0.06)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-sunken overflow-hidden">
                <div className="h-full bg-primary-400 rounded-full" style={{ width: '50%' }} />
              </div>
              <span className="font-mono font-bold text-primary-500 tabular-nums">50%</span>
            </div>
            <p className="text-primary-500 italic text-[11px] leading-tight">
              "Used Redis locks; lacks distributed consensus deep-engine experience."
            </p>
          </td>
        </tr>

        {/* Row 2: Production Scale */}
        <tr className="hover:bg-bg-sunken/30 transition-colors">
          <td className="py-4 px-6 font-medium text-primary-900">
            <div className="font-semibold text-sm">High-Throughput Ingestion</div>
            <div className="font-mono text-[11px] text-primary-500 mt-0.5">&gt; 100k QPS Kafka / gRPC</div>
          </td>
          {/* Candidate 1 */}
          <td className="py-4 px-4 border-l border-[rgba(13,37,61,0.06)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-sunken overflow-hidden">
                <div className="h-full bg-accent-secondary rounded-full" style={{ width: '98%' }} />
              </div>
              <span className="font-mono font-bold text-accent-secondary tabular-nums">98%</span>
            </div>
            <p className="text-primary-700 italic text-[11px] leading-tight">
              "Architected 450k QPS telemetry pipeline with zero message loss."
            </p>
          </td>
          {/* Candidate 2 */}
          <td className="py-4 px-4 border-l border-[rgba(13,37,61,0.06)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-sunken overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <span className="font-mono font-bold text-accent-500 tabular-nums">85%</span>
            </div>
            <p className="text-primary-700 italic text-[11px] leading-tight">
              "Optimized Kafka consumer groups handling 80k events/sec."
            </p>
          </td>
          {/* Candidate 3 */}
          <td className="py-4 px-4 border-l border-[rgba(13,37,61,0.06)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-sunken overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="font-mono font-bold text-accent-500 tabular-nums">75%</span>
            </div>
            <p className="text-primary-700 italic text-[11px] leading-tight">
              "Maintained RabbitMQ cluster for asynchronous background jobs."
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

#### Color-Coding Thresholds
- **Emerald / Forest Sage (`#5B8A72`)**: Score $\ge 90\%$ (Exceeds Rubric Criteria with Proven Production Scale).
- **Burnt Terracotta (`#C2553A`)**: Score $75\% - 89\%$ (Meets Rubric Criteria with Relevant Experience).
- **Muted Slate (`#3D4F5F` / `#9E9E9E`)**: Score $< 75\%$ (Missing Requirement or Insufficient Evidence).

---

### Pattern 3.2: Segmented Horizontal Step Intake Dock (Zero Nested Scrollbars)

- **Problem Solved**: Stacking three tiny `textarea` elements inside a narrow sidebar creates three independent nested scrollbars, making it impossible to read job descriptions or rubrics comfortably.
- **Pillar**: **Linear (Creator Velocity & Ergonomics)**
- **Fit Rationale**: Replaces cramped vertical stacking with a horizontal segmented dock. Users switch between steps with one click or numeric hotkeys (`1`, `2`, `3`), and enjoy a generous `min-h-[240px]` full-height editor.

#### Structural DOM & Component Specification
```tsx
<div className="w-full rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] p-5 space-y-4 shadow-xs">
  {/* Segmented Dock Pill Strip */}
  <div className="grid grid-cols-3 gap-2 p-1 bg-bg-sunken rounded-xl border border-[rgba(13,37,61,0.06)]">
    <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-bg-elevated border border-[rgba(13,37,61,0.1)] text-primary-900 font-medium text-xs shadow-xs">
      <span className="w-5 h-5 rounded-md bg-accent-500 text-white font-mono text-[11px] flex items-center justify-center font-bold">1</span>
      <span>Target Role Spec</span>
      <span className="font-mono text-[10px] text-accent-secondary font-semibold">✓ LOADED</span>
    </button>
    <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-primary-600 hover:text-primary-900 text-xs transition-colors">
      <span className="w-5 h-5 rounded-md bg-bg-sunken text-primary-500 font-mono text-[11px] flex items-center justify-center border border-[rgba(13,37,61,0.1)]">2</span>
      <span>Batch Ingestion</span>
      <span className="font-mono text-[10px] text-primary-400 font-normal">3 Resumes</span>
    </button>
    <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-primary-600 hover:text-primary-900 text-xs transition-colors">
      <span className="w-5 h-5 rounded-md bg-bg-sunken text-primary-500 font-mono text-[11px] flex items-center justify-center border border-[rgba(13,37,61,0.1)]">3</span>
      <span>Rubric &amp; Weights</span>
      <span className="font-mono text-[10px] text-primary-400 font-normal">Strict Boolean</span>
    </button>
  </div>

  {/* Full-Height Comfortable Editor Stage (No Internal Scrollbar) */}
  <div className="relative">
    <label className="block font-mono text-[11px] text-primary-500 uppercase mb-1.5">
      Active Step 1: Staff Systems Engineer Specification
    </label>
    <textarea 
      rows={8}
      className="w-full min-h-[220px] rounded-xl bg-bg-sunken/40 border border-[rgba(13,37,61,0.08)] p-4 font-sans text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent leading-relaxed resize-none"
      placeholder="Paste job description or select a pre-loaded template..."
      defaultValue={`Role: Staff Distributed Systems Engineer
Key Requirements:
- 5+ years building high-throughput streaming systems (Kafka, Flink, gRPC).
- Deep expertise in distributed consensus protocols (Raft, Paxos).
- Production experience in Rust or Go under sub-millisecond p99 constraints.`}
    />
  </div>

  {/* Step Navigation Actions */}
  <div className="flex items-center justify-between pt-2">
    <span className="font-mono text-[11px] text-primary-500">Press [2] or click next to verify batch ingestion.</span>
    <button className="px-4 py-2 bg-accent-500 hover:bg-[#A84530] text-white rounded-lg font-sans font-medium text-xs shadow-xs transition-all">
      Continue to Ingestion →
    </button>
  </div>
</div>
```

---

### Pattern 3.3: Master-Detail List with 1-Click Inline Breakdown Accordions

- **Problem Solved**: Forcing the user to leave the ranked list view to see why candidate #1 was scored 96% breaks evaluation flow.
- **Pillar**: **Linear (Master-Detail List Ergonomics)**
- **Fit Rationale**: Enables instant 1-click preview of verified strengths, evidence quotes, and technical probing questions directly inside the leaderboard row.

#### Structural DOM & Component Specification
```tsx
<div className="w-full rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] overflow-hidden">
  {/* Ranked Candidate Card (Header Row) */}
  <div className="p-4 flex items-center justify-between hover:bg-bg-sunken/40 transition-colors cursor-pointer border-b border-[rgba(13,37,61,0.06)]">
    <div className="flex items-center gap-4">
      {/* Rank Chip */}
      <span className="px-2.5 py-1 rounded-md bg-accent-secondary/15 text-accent-secondary font-mono text-xs font-bold">
        #1
      </span>
      <div>
        <h4 className="font-display text-lg text-primary-900 font-normal">Alex Chen</h4>
        <div className="font-mono text-[11px] text-primary-500">Ex-Stripe / Rust Core Dev · 8 YOE</div>
      </div>
    </div>

    <div className="flex items-center gap-6">
      {/* Score Dial */}
      <div className="text-right">
        <div className="font-mono text-xl font-bold text-accent-secondary tabular-nums">96%</div>
        <div className="font-mono text-[10px] text-primary-400 uppercase">Match Fit</div>
      </div>
      {/* Chevron Trigger */}
      <button className="p-1.5 rounded-lg border border-[rgba(13,37,61,0.08)] bg-bg-page hover:bg-bg-sunken text-primary-600 transition-transform">
        <ChevronDownIcon className="w-4 h-4" />
      </button>
    </div>
  </div>

  {/* Inline Expandable Accordion Body */}
  <div className="p-5 bg-bg-sunken/20 border-b border-[rgba(13,37,61,0.08)] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
    {/* Verified Strengths */}
    <div className="p-3.5 rounded-xl bg-bg-elevated border border-[rgba(13,37,61,0.08)] space-y-2">
      <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-accent-secondary uppercase">
        <span>✓</span> Verified Strengths (3/3)
      </div>
      <ul className="space-y-1.5 text-primary-700">
        <li>• <strong className="text-primary-900">Distributed consensus:</strong> Authored open-source Raft engine in Rust.</li>
        <li>• <strong className="text-primary-900">Scale throughput:</strong> Managed 450k QPS pipeline with sub-millisecond p99.</li>
      </ul>
    </div>

    {/* Probing Interview Questions */}
    <div className="p-3.5 rounded-xl bg-bg-elevated border border-[rgba(13,37,61,0.08)] space-y-2">
      <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-accent-500 uppercase">
        <span>?</span> Recommended Probe Question
      </div>
      <p className="text-primary-700 italic">
        "Ask how Alex handled log compaction and snapshotting during network partitions under high-write load."
      </p>
    </div>
  </div>
</div>
```

---

### Pattern 3.4: 1-Click Entity Switcher Pill Bar & Bento Scorecard

- **Problem Solved**: In deep candidate inspection views, navigating between candidate scorecards shouldn't require going back to the main menu.
- **Pillar**: **Linear + Resend**

#### Structural DOM & Component Specification
```tsx
<div className="space-y-4">
  {/* Top Entity Switcher Pill Bar */}
  <div className="flex items-center gap-2 overflow-x-auto pb-1">
    <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-elevated border-2 border-accent-500 text-primary-900 font-sans font-semibold text-xs shadow-xs">
      <span className="px-1.5 py-0.5 rounded bg-accent-secondary text-white font-mono text-[10px]">#1</span>
      <span>Alex Chen</span>
      <span className="font-mono text-accent-secondary tabular-nums">96%</span>
    </button>
    <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] hover:border-accent-500/40 text-primary-700 font-sans text-xs transition-all">
      <span className="px-1.5 py-0.5 rounded bg-bg-sunken text-primary-600 font-mono text-[10px]">#2</span>
      <span>Sarah Varma</span>
      <span className="font-mono text-accent-500 tabular-nums">82%</span>
    </button>
    <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] hover:border-accent-500/40 text-primary-700 font-sans text-xs transition-all">
      <span className="px-1.5 py-0.5 rounded bg-bg-sunken text-primary-600 font-mono text-[10px]">#3</span>
      <span>Marcus Brody</span>
      <span className="font-mono text-primary-500 tabular-nums">64%</span>
    </button>
  </div>

  {/* Bento Grid Scorecard */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
    {/* Hero Candidate Profile Box */}
    <div className="md:col-span-8 p-6 rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] space-y-3">
      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent-secondary/15 text-accent-secondary font-mono text-[11px] font-bold">
        VERIFIED STRONG MATCH
      </div>
      <h3 className="font-display text-2xl text-primary-900 font-normal">Alex Chen — Lead Systems Architect</h3>
      <p className="font-sans text-xs text-primary-700 leading-relaxed">
        Demonstrates exceptional mastery across all boolean criteria. 8 years architecting mission-critical distributed databases and consensus protocols with zero production data loss incidents.
      </p>
    </div>

    {/* Overall Match Dial */}
    <div className="md:col-span-4 p-6 rounded-2xl bg-bg-elevated border border-[rgba(13,37,61,0.1)] flex flex-col items-center justify-center text-center">
      <div className="font-display text-5xl text-accent-secondary tabular-nums font-normal">96<span className="text-2xl font-sans">%</span></div>
      <div className="font-mono text-xs font-semibold text-primary-900 uppercase mt-1">Rubric Score</div>
      <div className="font-mono text-[10px] text-primary-500 mt-0.5">Confidence: 0.994</div>
    </div>
  </div>
</div>
```

---

### Pattern 3.5: Hardware Honesty Live Telemetry Ribbon

- **Problem Solved**: Giving users continuous, verifiable reassurance that data is processed in ephemeral RAM without leakage, and tracking actual sub-second parsing speeds.
- **Pillar**: **Teenage Engineering (Hardware Honesty)**

#### Structural DOM & Component Specification
```tsx
<div className="w-full h-10 px-4 rounded-xl bg-bg-sunken border border-[rgba(13,37,61,0.08)] flex items-center justify-between font-mono text-[11px] text-primary-600">
  {/* Traffic-Light LED Status */}
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-[#C2553A]" title="Ingestion Active" />
      <span className="w-2 h-2 rounded-full bg-[#B8860B]" title="Tokenizer Ready" />
      <span className="w-2 h-2 rounded-full bg-[#5B8A72]" title="RAM Isolated" />
    </div>
    <span className="text-primary-400">|</span>
    <span className="text-primary-800 font-semibold">CHANNEL 01: RESUME INGESTION</span>
  </div>

  {/* Live Metrics */}
  <div className="flex items-center gap-4">
    <span className="hidden sm:inline text-accent-secondary font-medium">
      0 BYTES RETAINED · EPHEMERAL RAM FLUSHED
    </span>
    <span className="text-primary-400">|</span>
    <div className="flex items-center gap-1 tabular-nums">
      <span>LATENCY:</span>
      <span className="font-bold text-primary-900">312ms</span>
    </div>
  </div>
</div>
```
