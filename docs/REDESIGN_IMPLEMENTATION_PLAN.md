# NorAI Official Web — Redesign Implementation Plan

## High-Voltage Obsidian Theme & Human-Friendly Visual Rebuild

> **Reference Inspiration:** Audens.ai architectural craft (high-voltage jewel themes, micro-vignette bento cards, kinetic wave ribbons, 3-dimensional scope)  
> **Key Constraint:** Zero technical benchmarks or developer jargon. Effortless navigation and clarity for non-technical visitors.  
> **Aesthetic Ethos:** Dark, vibrant, colorful, bold, and energetic with zero "AI slop".

---

## Master Section-by-Section Implementation Checklist

- [x] **SECTION 1:** Global Theme & Token Architecture (`app/globals.css`)
- [x] **SECTION 2:** Site-Wide Shell & Navigation (`Header.tsx`, `BilingualToggle.tsx`, `Footer.tsx`)
- [x] **SECTION 3:** Hero Section Rebuild (`HeroStudioWorkbench.tsx`, kinetic ring headline, friendly trust chips)
- [x] **SECTION 4:** Kinetic Wave Marquee (`KineticWaveMarquee.tsx`)
- [ ] **SECTION 5:** Audens-Inspired Capability Bento Grid & 4 Micro-Vignettes (`AudensCapabilityBento.tsx`)
  - [ ] 5.1: `VignetteResumeScore.tsx` (Electric Mint `#2EFCC2`)
  - [ ] 5.2: `VignetteCourseNotes.tsx` (Lavender `#D8B4FE`)
  - [ ] 5.3: `VignetteChatDigest.tsx` (Coral `#FFA07A`)
  - [ ] 5.4: `VignetteDainikNews.tsx` (Laser Emerald `#34D399`)
  - [ ] 5.5: Progressive disclosure drawers (100% semantic HTML retained in DOM)
- [ ] **SECTION 6:** Three Dimensions Rail ("How We Help": Tools, Solutions, Community)
- [ ] **SECTION 7:** Signature NorAI Regional Identity & 75 Districts Radar (`DistrictImpactRadar.tsx`)
- [ ] **SECTION 8:** Closing Dispatch & Contact Section
- [ ] **SECTION 9:** Global Shell Wrappers (`app/layout.tsx` & `app/(marketing)/layout.tsx`)
- [ ] **SECTION 10:** Site-Wide Route Inheritance Audit (`/products`, `/services`, `/team`, `/about`, `/blog`, `/contact`)
- [ ] **SECTION 11:** Verification, Accessibility, Performance & Responsive Testing Protocol

---

## SECTION 1: Global Theme & Token Architecture Sub-Plan

### 1.1 Objective & Rationale

Replace the legacy warm parchment palette with a calibrated **High-Voltage Obsidian** system. Every color is mathematically tested against the deep dark canvas to exceed WCAG AA/AAA standards, ensuring high readability for all visitors.

### 1.2 Exact CSS Variable Specifications (`app/globals.css`)

```css
:root {
  /* ==========================================================================
     BASE SURFACES (Deep Obsidian Architecture - Zero Muddy Grays)
     ========================================================================== */
  --surface-canvas: #07080d; /* Pitch obsidian with 1% midnight undertone */
  --surface-panel: #0d1017; /* Container cards and section enclosures */
  --surface-panel-elevated: #141824; /* Modals, flyouts, and active tab states */
  --surface-panel-subtle: #11141e; /* Inset wells, preview boxes, and code tracks */
  --surface-hover: #191e2e; /* Interactive item hover state */
  --surface-active: #20273a; /* Pressed and active button states */

  /* ==========================================================================
     TYPOGRAPHY & CONTENT (High-Contrast White & Slate)
     ========================================================================== */
  --text-primary: #f8fafc; /* 98% Crisp white for headings & key data (17.5:1 contrast) */
  --text-secondary: #94a3b8; /* Neutral slate for body text & explanations (7.2:1 contrast) */
  --text-muted: #64748b; /* Subtle captions, timestamps, and secondary hints (4.8:1 contrast) */
  --text-inverse: #07080d; /* Dark text when placed on solid bright jewel buttons */

  /* ==========================================================================
     HAIRLINE BORDERS & LASER SHEENS
     ========================================================================== */
  --border-subtle: rgba(255, 255, 255, 0.08); /* 1px crisp resting card boundary */
  --border-strong: rgba(255, 255, 255, 0.16); /* Interactive controls & input fields */
  --border-highlight: rgba(255, 255, 255, 0.32); /* Focused, active, and hovered cards */

  /* ==========================================================================
     CALIBRATED HIGH-VOLTAGE JEWEL TOKENS (Each Entity Owns Its Color)
     ========================================================================== */
  --jewel-mint: #2efcc2; /* Resume Shortlister & Velocity (13.8:1 - AAA) */
  --jewel-mint-soft: rgba(46, 252, 194, 0.12);

  --jewel-lavender: #d8b4fe; /* Course Note-Taker & LaTeX (9.8:1 - AAA) */
  --jewel-lavender-soft: rgba(216, 180, 254, 0.12);

  --jewel-coral: #ffa07a; /* Community Chat Digest (8.5:1 - AAA) */
  --jewel-coral-soft: rgba(255, 160, 122, 0.12);

  --jewel-emerald: #34d399; /* Smart Dainik Regional News (9.4:1 - AAA) */
  --jewel-emerald-soft: rgba(52, 211, 153, 0.12);

  --jewel-amber: #fbbf24; /* Enterprise Solutions & Private Infra (11.2:1 - AAA) */
  --jewel-amber-soft: rgba(251, 191, 36, 0.12);

  --jewel-pink: #f472b6; /* Uttar Pradesh Grassroots Mission (7.6:1 - AA) */
  --jewel-pink-soft: rgba(244, 114, 182, 0.12);

  /* Primary Interactive Action Token */
  --accent-primary: var(--jewel-mint);
  --accent-hover: #1edba4;
}
```

### 1.3 Accessibility & Focus Rules

- All interactive controls receive a calibrated focus ring:
  `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080D] focus-visible:ring-white/80 focus-visible:outline-none`.
- All background transitions are capped between 150ms and 250ms for snappy responsiveness.

---

## SECTION 2: Site-Wide Shell & Navigation Sub-Plan

### 2.1 Component: `Header.tsx` (`components/organisms/sections/Header/Header.tsx`)

- **Visual Design**: Floating obsidian pill header (`mt-3 mx-auto max-w-5xl rounded-full border border-white/10 bg-[#07080D]/85 backdrop-blur-md px-5 py-2.5 shadow-2xl`).
- **Navigation Links (Plain-English & Focused)**:
  1. `Tools` (`/products`)
  2. `Solutions` (`/services`)
  3. `Community` (`/mission`)
  4. `About` (`/about`)
  5. `Contact` (`/contact`)
- **First-Class Bilingual Switcher (`BilingualToggle.tsx`)**:
  - Embedded directly inside the desktop navigation bar and mobile drawer.
  - Toggles between `English` and `हिन्दी` with smooth pill translation (`layoutId="lang-pill"`).
- **Primary CTA**: High-contrast pill button: `Try Free Sandbox` (`/products`).
- **Mobile Menu (375px)**:
  - Accessible hamburger icon morphing into an 'X'.
  - Full-screen slide-down glass drawer (`bg-[#07080D]/95 backdrop-blur-xl border-b border-white/10`).
  - Generous 48px touch targets for thumb navigation.

### 2.2 Component: `Footer.tsx` (`components/organisms/sections/Footer/Footer.tsx`)

- **Visual Design**: Grounded pitch dark `#050608` with a 1px top laser sheen (`linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`).
- **Categorized Columns**:
  - **Tools**: Resume Shortlister, Course Note-Taker, Chat Digest, Smart Dainik News.
  - **Solutions**: Custom Automations, Secure Infrastructure, Business Pipelines.
  - **Community**: Free Student Workshops, 75 Districts Mission, Team Story.
  - **Trust & Privacy**: 100% Private Guarantee, Terms of Service, Security Overview.
- **Plain-English Trust Line**:
  `"Your files and messages are never stored, sold, or used to train models. Engineered with pride in Uttar Pradesh, India."`

---

## SECTION 3: Hero Section Rebuild Sub-Plan

### 3.1 Headline & Copy Strategy (Plain English, Zero Benchmarks)

- **Eyebrow**: Clean monospace tag with subtle mint indicator:
  `● NORAI TECHNOLOGIES · FAST, PRIVATE AI TOOLS`
- **Main Headline**:
  ```tsx
  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.08] tracking-tight">
    Software that works <br />
    <span className="relative inline-block text-[#2EFCC2]">
      as fast as you do.
      {/* Hand-drawn SVG kinetic accent ring */}
      <svg
        className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none"
        viewBox="0 0 300 80"
        fill="none"
      >
        <path
          d="M 10 45 C 50 15, 250 10, 290 35 C 310 55, 180 75, 80 68 C 20 62, 10 35, 60 20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </span>
  </h1>
  ```
- **Audience Subtitle**:
  _"Four single-purpose tools that take the busywork out of screening resumes, studying lecture notes, catching up on group chats, and tracking government jobs. Simple to use, completely private, and instant."_
- **Action Buttons**:
  - Primary: `Explore All 4 Tools →` (Links to `#tools` with smooth scroll).
  - Secondary: `Watch 30-Second Demo` (Opens quick visual preview).
- **Human-Friendly Trust Chips (Replacing Latency & RAM Specs)**:
  - Chip 1: `⚡ Instant Results · No Waiting`
  - Chip 2: `🔒 100% Private · Files Never Stored`
  - Chip 3: `🎓 Free Workshops Across 75 Districts`

### 3.2 Dark Carbon Chassis: `HeroStudioWorkbench.tsx`

- Restyle the container chassis:
  - Background: `#0B0E17` (Dark carbon enclosure).
  - Top window chrome: 3 jewel window dots (`#FF5F56`, `#FFBD2E`, `#27C93F`) and tool label.
  - Active tool selector tabs with jewel accent indicators on hover and active states.
- Re-tune the 4 simulator sub-tabs to emphasize **human results over developer telemetry**:
  - _Candidate Screener_: Shows candidate name, matching percentage, key qualifications, and instant decision pill.
  - _Course Note-Taker_: Shows clean lecture outline, key formula card, and an interactive "Reveal Answer" flashcard.
  - _Chat Digest_: Shows "4,800 unread messages ➔ 3 key decisions".
  - _Dainik News_: Shows clean government job cards with application deadlines.

---

## SECTION 4: Kinetic Wave Marquee Sub-Plan

### 4.1 Component: `KineticWaveMarquee.tsx` (`components/foundation/KineticWaveMarquee.tsx`)

- **Visual Design**: An undulating SVG sine-wave ribbon separating the Hero from the Capability Arc.
- **Wave Geometry**:
  SVG `<path>` calculated via smooth cubic beziers across a `2000 x 140` coordinate space.
- **Text Path Content**:
  `INSTANT CANDIDATE MATCHING ✦ CLEAN LECTURE NOTES ✦ 2-MINUTE CHAT BRIEFS ✦ VERIFIED REGIONAL JOBS ✦ 100% PRIVATE & SECURE ✦ FREE STUDENT WORKSHOPS ✦`
- **Gradient Fill**: Multi-stop linear gradient transitioning from `var(--jewel-mint)` to `var(--text-primary)` to `var(--jewel-lavender)`.
- **GPU Acceleration**:
  - Uses CSS hardware transform `translate3d(0,0,0)` and `will-change: transform`.
  - Runs on a 16-second linear loop decoupled from React state rerenders.
- **Accessibility (`prefers-reduced-motion`)**:
  - Automatically disables SVG path animation when reduced motion is detected.
  - Renders as an elegant, static horizontal badge ribbon with zero CPU/GPU overhead.

---

## SECTION 5: Audens-Inspired Capability Bento Grid & 4 Micro-Vignettes Sub-Plan

### 5.1 Component: `AudensCapabilityBento.tsx` (`components/organisms/AudensCapabilityBento/AudensCapabilityBento.tsx`)

- **Layout Architecture**:
  - Desktop (1024px+): 2-column asymmetric bento grid.
  - Tablet (768px): 2-column balanced grid.
  - Mobile (375px): Single-column accordion card stack.
- **Card Anatomy (`.product-card`)**:
  1. **Top Bar**: Saturated icon chip + Tool number (`01`, `02`, `03`, `04`) + Category label.
  2. **The Micro-Vignette**: The interactive visual preview simulator.
  3. **Typography**: Bold tool title (`text-2xl sm:text-3xl font-bold text-white`) + 1-line human promise.
  4. **Progressive Disclosure Drawer (`.pcard__more`)**: Accessible toggle button (`Read Full Details +`) expanding the comprehensive explanation, feature checklist, and primary action link.

---

### 5.2 Vignette 1: `VignetteResumeScore.tsx` (Electric Mint `#2EFCC2`)

- **Target Tool**: AI Resume Shortlister
- **Outcome Shown**: Instant candidate evaluation without reading 50-page stacks.
- **Visual Simulation**:
  - Window Header: `● ● ● APPLICANT REVIEW · SENIOR DEVELOPER`
  - Candidate Profile:
    - Name: `Aditya V. · 5 yrs experience`
    - Match Gauge: `96% Match` in Electric Mint badge.
  - Why It Matched (Visual Chips):
    - `✓ Backend Architecture (Verified)`
    - `✓ Fast API Integration (Strong)`
    - `✓ Team Leadership (Demonstrated)`
  - Decision Bar: `RECOMMENDED FOR INTERVIEW · EXPORT TO ATS`
  - Privacy Note: `Resumes deleted automatically after review.`

---

### 5.3 Vignette 2: `VignetteCourseNotes.tsx` (Lavender `#D8B4FE`)

- **Target Tool**: Course Note-Taker
- **Outcome Shown**: Turns 2-hour lecture audio and slides into organized notes and flashcards.
- **Visual Simulation**:
  - Window Header: `● ● ● LECTURE SYNTHESIS · PHYSICS 101`
  - Lecture Audio Tracker: Sample wave track at `08:42` with title _"Energy Conservation & Heat Transfer"_.
  - Clean Summary Card:
    - Key Concept pill: `Core Principle: Energy cannot be created or destroyed`
    - Formatted Equation Card: `\Delta U = Q - W` (rendered crisply via KaTeX).
  - Interactive Flashcard:
    - _"Card 1 of 12: What does Q represent in thermodynamics?"_
    - Interactive button: `[Tap to Flip Card]` ➔ reveals _"Q represents heat added to the system."_

---

### 5.4 Vignette 3: `VignetteChatDigest.tsx` (Coral `#FFA07A`)

- **Target Tool**: Community Chat Digest
- **Outcome Shown**: Catch up on massive group chats without missing important updates.
- **Visual Simulation**:
  - Window Header: `● ● ● DAILY BRIEF · #ENGINEERING-UPDATES`
  - Before/After Metric Bar: `4,820 unread messages ➔ 3 key decisions`
  - Key Decisions List:
    - `[LAUNCHED] Payment gateway upgrade deployed successfully.`
    - `[RESOLVED] Mobile login bug fixed by dev team.`
    - `[ASSIGNED] Documentation review assigned to team leads.`
  - Time Saved Tag: `Read in 90 seconds instead of 45 minutes.`

---

### 5.5 Vignette 4: `VignetteDainikNews.tsx` (Laser Emerald `#34D399`)

- **Target Tool**: Smart Dainik News
- **Outcome Shown**: Verified government and public employment alerts without fake news or broken links.
- **Visual Simulation**:
  - Window Header: `● ● ● VERIFIED JOB GAZETTE · BILINGUAL FEED`
  - Interactive Language Switcher: `[English] / [हिन्दी]`
    - English state: _"UP Technical Education Dept — Junior Lecturer 2026"_
    - Hindi state: _"उत्तर प्रदेश तकनीकी शिक्षा विभाग — कनिष्ठ प्रवक्ता भर्ती २०२६"_
  - Eligibility Badges: `Degree / Diploma in Tech` · `Age: 21–35`
  - Verified Portal Link: `Official Notification Link Verified ✓`
  - Deadline Countdown: `Applications close in: 4 days, 12 hours`

---

## SECTION 6: Three Dimensions Rail ("How We Help") Sub-Plan

### 6.1 Component: `ThreeDimensionsRail.tsx` (`components/organisms/ThreeDimensionsRail/ThreeDimensionsRail.tsx`)

Inspired by Audens' "One firm. Three dimensions", this section explains NorAI's complete scope in plain English:

1. **Dimension 1: Everyday AI Tools (Electric Mint `#2EFCC2`)**
   - _Headline_: Focused tools you can use right away.
   - _Description_: Purpose-built web apps to screen resumes, organize notes, summarize chats, and track government job alerts. Free to start, no technical setup required.
2. **Dimension 2: Custom Automations for Teams (Solar Amber `#FBBF24`)**
   - _Headline_: Tailored workflows for your company.
   - _Description_: We build custom AI assistants, internal search on your private documents, and automated data pipelines connected directly to your existing software.
3. **Dimension 3: Free Community Education (Rose Pink `#F472B6`)**
   - _Headline_: Empowering regional students across UP.
   - _Description_: Founder-led, 100% free coding and AI workshops in colleges and polytechnics across 75 districts. We bring modern technology directly to grassroots classrooms.

### 6.2 Interactive Details

- Interactive tabs with animated typing dots (`<i></i><i></i><i></i>`) demonstrating that each dimension is actively serviced.
- Selecting a dimension smoothly swaps the focal spotlight with clean spring physics.

---

## SECTION 7: Signature NorAI Identity & Community Section Sub-Plan

### 7.1 Component: `DistrictImpactRadar.tsx` (`components/molecules/DistrictImpactRadar.tsx`)

- **Purpose**: Showcase NorAI's real-world regional mission in Uttar Pradesh without feeling like a generic Silicon Valley template.
- **Visual Design**:
  - Saturated Dark Enclosure (`#0D1017`) with warm pink and amber accents.
  - Interactive district explorer highlighting real polytechnics, colleges, and community centers reached.
  - 3 Core Pillars:
    - `₹0 Cost to Students`: Free workshops, open source materials, no hidden fees.
    - `75 Target Districts`: Covering rural polytechnics and tier-2/3 universities across UP.
    - `Practical, Real Skills`: Students learn how to build apps, run local models, and automate everyday workflows.
- **Documentary Photography**:
  - High-resolution frame featuring real on-ground student workshops in classroom labs.
  - Clean caption badge with Devanagari script integration:
    `उत्तर प्रदेश तकनीकी साक्षरता मिशन (Uttar Pradesh Tech Literacy Initiative)`

---

## SECTION 8: Closing Dispatch & Conversion Sub-Plan

### 8.1 Section Structure (`#closing-dispatch`)

- **Heading**:
  `"Have a repetitive task you want automated?"`
- **Subhead**:
  _"Whether you need a quick tool for your daily work or a custom system built for your company, our team is ready to help. Every message is read and answered by a real engineer within one business day."_
- **Action Group**:
  - Primary Button: `Talk to an Engineer →` (Direct link to `/contact`).
  - Secondary Button: `Explore Free Tools` (Direct link to `/products`).
- **Human Trust Badges**:
  - `✓ 1-Day Reply Guarantee`
  - `✓ 100% Private — Your Data Remains Yours`
  - `✓ Headquartered in Uttar Pradesh, India`

---

## SECTION 9: Footer & Global Shell Sub-Plan

### 9.1 Updates to `app/layout.tsx` & `app/(marketing)/layout.tsx`

- Ensure base HTML shell defaults to `#07080D` (`bg-[#07080D] text-text-primary antialiased selection:bg-[#2EFCC2] selection:text-[#07080D]`).
- Skip-to-content accessibility link:
  `sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#2EFCC2] focus:text-[#07080D] focus:font-bold focus:shadow-xl`.

---

## SECTION 10: Site-Wide Route Inheritance Audit Sub-Plan

To fulfill the site-wide scope requirement, all existing secondary routes will inherit the global obsidian tokens and dark styling:

| Route                        | Changes Required                                                                                     |
| :--------------------------- | :--------------------------------------------------------------------------------------------------- |
| **`/products`**              | Inherit dark canvas; style tool catalog cards with their dedicated jewel badges; preserve links.     |
| **`/products/[slug]`**       | Restyle detail view with dark panel chassis, high-contrast headings, and clear CTA buttons.          |
| **`/services`**              | Restyle architecture matrix into dark obsidian panels with solar amber accents.                      |
| **`/team`**                  | Restyle directory filters and 35mm photography cards to match dark editorial studio look.            |
| **`/about`**                 | Re-theme origin story and founder profiles against deep obsidian surfaces.                           |
| **`/blog` & `/blog/[slug]`** | High-contrast article reader with readable slate prose (`#94A3B8`) and formatted code blocks.        |
| **`/contact`**               | Restyle input fields into crisp `#141824` inputs with `border-white/10` and clear validation states. |
| **`/privacy` & `/terms`**    | Ensure high-contrast legal typography and sticky table of contents.                                  |

---

## SECTION 11: Exhaustive Verification & Quality Protocol

### 11.1 Automated Verification Commands

```bash
# Strict TypeScript compilation check
npx tsc --noEmit

# ESLint audit
npm run lint

# Prettier format check
npm run format:check
```

### 11.2 Human Usability & Copy Audit (The "Non-Tech Visitor" Test)

- Verify zero mentions of:
  - Latency / milliseconds (`< 0.35s`, `P95`)
  - RAM / Ephemeral memory specs (`RAM Isolation`)
  - Vector similarity metrics (`0.98 cosine distance`)
  - Internal developer jargon (`ETL pipelines`, `vLLM LoRA adapters`)
- Confirm every headline describes a tangible human benefit.

### 11.3 Accessibility & Keyboard Traversal Test

1. **WCAG AA/AAA Verification**: Inspect computed colors using Chrome DevTools color picker to confirm all body copy exceeds 4.5:1 and all headings exceed 3:1.
2. **Keyboard Focus Test**: Press `Tab` through the entire page from top to bottom. Ensure a crisp, high-contrast focus ring is visible on every link, button, drawer, and tab.
3. **Screen Reader Check**: Verify that `sr-only` summary labels correctly announce each vignette's outcome.
4. **Reduced Motion Test**: Toggle `prefers-reduced-motion: reduce` in browser emulation and confirm the Wave Marquee, audio waveforms, and typing dots pause immediately into static representations.

### 11.4 Mobile Responsiveness Inspection

- Test across viewports:
  - `375px` (iPhone SE): Verify zero horizontal scroll; bento stacks in single column; vignettes are compact and touch-friendly.
  - `390px` (iPhone 14/15): Verify generous padding and 48px tap targets.
  - `768px` (iPad): Verify clean 2-column balanced grid.
  - `1280px+` (Desktop): Verify full asymmetric bento layout and kinetic wave animation.

### 11.5 Performance Budget Verification

- Confirm zero hydration errors in developer console.
- Verify that off-screen vignettes pause their canvas/RAF loops using `IntersectionObserver`.
- Verify Core Web Vitals targets: CLS = 0, LCP < 2.2s.
