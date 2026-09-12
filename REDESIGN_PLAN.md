# NorAI Official Web — Audens Replicator Master Plan (`REDESIGN_PLAN.md`)

> **Strategic North Star**: Rebuild the NorAI web platform to fully embody the craftsmanship, spatial restraint, typographic power, and high-voltage jewel palette of [**Audens.ai**](https://audens.ai), grounded in the 12 critical friction points identified in `report.md`.

---

## Master Architecture & Phased Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                     6-PHASE EXECUTION ROADMAP                          │
├────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: NAVIGATION & SHELL STREAMLINING                              │
│  ├── Delete dead anchor href="/#mission" from Header and Footer        │
│  ├── Remove redundant "Contact" text link; retain "Book a call" CTA    │
│  └── Enforce clean 5-item pill hierarchy with bottom scroll progress   │
│                                                                        │
│  PHASE 2: DESIGN SYSTEM & CONTRAST REMEDIATION                         │
│  ├── Purge rogue tokens: #07080D pitch obsidian, terra-500             │
│  ├── Fix invisible text in .gradient-card__inner across all 6 subpages │
│  └── Verify 100% WCAG AAA contrast across pine and porcelain           │
│                                                                        │
│  PHASE 3: HOMEPAGE HERO DE-BLOAT                                       │
│  ├── Remove 47KB HeroStudioWorkbench from homepage hero                │
│  ├── Implement single-column Aurora Hero with 2-line conviction lede   │
│  └── Restore sub-second paint speed and spatial breathing room         │
│                                                                        │
│  PHASE 4: CAPABILITY ARC TRANSFORMATION                                │
│  ├── Replace 1,800px AudensCapabilityBento with sleek CapabilityArc    │
│  ├── Convert heavy interactive widgets into 260px telemetry cards      │
│  └── Eliminate collapsible accordion drawers from homepage             │
│                                                                        │
│  PHASE 5: INSERT GRASSROOTS BHARAT MISSION BEAT                        │
│  ├── Build dedicated BharatMissionBeat.tsx section before closing CTA  │
│  ├── Feature the 3 community tiers (Citizens, Students, Builders)      │
│  └── Link to /mission for district impact radar and workshop signups   │
│                                                                        │
│  PHASE 6: SUBPAGE ALIGNMENT & SINGLE-RESPONSIBILITY VERIFICATION       │
│  ├── Re-anchor /products as the sole home for interactive tool sandboxes│
│  ├── Re-anchor /services as the sole home for enterprise RAG/MCP specs │
│  └── Conduct final cross-browser visual verification                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Phase-by-Phase Implementation Details

### Phase 1: Navigation Pill & Shell Streamlining
- **Target Files**: `components/organisms/sections/Header/Header.tsx`, `config/navigation.ts`, `Footer.tsx`
- **Actions**:
  1. Update `DEFAULT_HEADER_NAV_ITEMS` to exactly 5 links:
     - `Capabilities` (`/products`)
     - `Approach` (`/services#operating-rituals` or `/approach`)
     - `Deliverables` (`/services`)
     - `About` (`/team`)
     - `The Canonical` (`/blog`)
  2. Remove dead anchor `{ label: 'Approach', href: '/#mission' }`.
  3. Remove redundant text link `{ label: 'Contact', href: '/contact' }` from the pill; the primary button `Book a call` is the singular contact point.
  4. Fix footer links to eliminate broken anchors.

### Phase 2: Design Token & Contrast Remediation
- **Target Files**: `app/globals.css`, `team/page.tsx`, `services/page.tsx`, `products/[slug]/page.tsx`, `products/ProductsIndexClient.tsx`, `blog/BlogIndexClient.tsx`, `mission/page.tsx`, `ContactFormClient.tsx`
- **Actions**:
  1. In `app/globals.css`, remove rogue `--surface-canvas: #07080d` and `--surface-panel: #0d1017`. Re-anchor everything to `--porcelain: #f5f5f0` and `--pine: #072929`.
  2. In all 6 marketing subpages, replace `text-[var(--pine)] dark:text-[var(--bone)]` inside `.gradient-card__inner` with explicit high-contrast tokens (`text-[var(--bone)]` or style `.gradient-card__inner` with ivory surface and pine text).
  3. Purge all `terra-*` classes from `ContactFormClient.tsx`. Use `--mint-ink`, `--pine`, and `--line`.

### Phase 3: Homepage Hero Teardown
- **Target File**: `app/(marketing)/page.tsx`
- **Actions**:
  1. Excise `<HeroStudioWorkbench />` and its 6-column split container.
  2. Implement the clean, centered `HeroChamber` blueprint:
     - Organic blurred multi-color aurora glow orbs (`.aurora__orb`).
     - Monospace eyebrow tag: `SOVEREIGN AI SYSTEMS · BHARAT & ENTERPRISE`.
     - Giant display headline: *"Software you own. Intelligence that stays."*
     - 2-sentence lede with generous negative space.
     - Dual pill buttons (`Book a diagnostic` with hand icon + `Explore the capabilities →`).
     - Monospace trust badges (`0 cloud training egress · Sub-second execution · Your keys, your stack`).

### Phase 4: Capability Arc Transformation
- **Target Files**: `components/organisms/AudensCapabilityBento/...`, `app/(marketing)/page.tsx`
- **Actions**:
  1. Replace the bulky 2x2 bento grid with `CapabilityArc.tsx`.
  2. For each of the 4 sovereign tools (Resume Shortlister, Course Note-Taker, Chat Digest, Smart Dainik), create a fixed-height (260px) illustrative telemetry card:
     - Top bar with category and live pulsing dot.
     - Telemetry badge (e.g. `0.28s / PDF · 96/100 VERIFIED`).
     - 2-sentence plain-spoken copy.
     - Direct arrow link to `/products/[slug]`.
  3. Remove all collapsible accordion drawers and heavy interactive widgets from the homepage.

### Phase 5: Grassroots Bharat Mission Section Insertion
- **Target Files**: `components/organisms/sections/BharatMissionBeat.tsx`, `app/(marketing)/page.tsx`
- **Actions**:
  1. Create `BharatMissionBeat.tsx` as a full-width deep pine section placed immediately before Beat 7 (`#closing-dispatch`).
  2. Feature the 3 community tiers:
     - Tier 01: Village Citizens (Vernacular Hindi literacy, welfare navigation).
     - Tier 02: Collegiate Students (Free scholar lecture synthesis, KaTeX).
     - Tier 03: Undergraduate Builders (Founder-led MCP and local inference bootcamps).
  3. Include the commitment banner: `75 Districts Committed ✦ ₹0 Student Cost ✦ Vernacular Hindi Delivery`.
  4. Link to `/mission` for district schedules and details.

### Phase 6: Subpage Alignment & Verification
- **Target Files**: `app/(marketing)/products/...`, `app/(marketing)/services/...`, `app/(marketing)/mission/...`
- **Actions**:
  1. Verify `/products` hosts the complete interactive tool sandboxes.
  2. Verify `/services` cleanly details enterprise RAG, private VPC inference, and MCP topologies.
  3. Verify `/mission` details the 75-district radar.
  4. Run full build and visual checks to ensure zero contrast drops, zero dead links, and complete responsive polish.
