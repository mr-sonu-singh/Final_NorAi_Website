# Quality Verification & Self-Annealing SOP (`directives/quality_verification.md`)

## Purpose
Standard Operating Procedure for testing, auditing, and self-annealing the NorAI codebase before and after any feature or UI iteration.

---

## 1. Automated Quality Gates

Run the deterministic verification suite before committing any changes:

```bash
# 1. Typecheck
npx tsc --noEmit

# 2. Lint check
npm run lint

# 3. Unit / Component tests (when applicable)
npm run test
```

---

## 2. Accessibility & Performance Checklist (WCAG AAA)

- **Contrast Ratios**:
  - Ink on Parchment (`#0D253D` on `#F5F0EA`): ~14.2:1 (exceeds AAA requirement of 7:1)
  - Body Prose on Paper (`#3D4F5F` on `#FDFBF7`): ~8.4:1 (exceeds AAA requirement of 7:1)
  - Primary Accent on Parchment (`#C2553A` on `#F5F0EA`): ~4.6:1 (meets AA for large headings/buttons)
- **Keyboard Navigation**:
  - All interactive elements reachable via `Tab` / `Shift+Tab`.
  - Double-ring focus indicator visible on all focused elements (`focus-visible:ring-2 focus-visible:ring-accent-500`).
- **Form Associations**:
  - Every `<input>`, `<textarea>`, and `<select>` must have an associated `<label>` with matching `id` and `htmlFor`.
- **Layout Shift Prevention**:
  - All dynamic numeric and telemetry metrics must use `font-mono tabular-nums`.
  - All images must specify width, height, or aspect ratio.
- **Motion Safeguards**:
  - All animations respect `@media (prefers-reduced-motion: reduce)`.

---

## 3. Self-Annealing Protocol

When a build error, type error, or linter warning occurs:
1. **Analyze Root Cause**: Inspect the trace without making speculative edits.
2. **Deterministic Fix**: Resolve the underlying type mismatch, missing prop, or styling token.
3. **Re-verify**: Re-run `npx tsc --noEmit` and `npm run lint`.
4. **Update Context**: If an edge case or new pattern emerged, document it in `DESIGN.md` or `directives/`.

---

## 4. Visual Verification & Chrome DevTools Screenshot Protocol

To avoid clipped, half-cut, or scrolled-out screenshots during visual testing and automated audits:

1. **Explicit Viewport Dimensions**:
   - Always initialize standard desktop dimensions before taking screenshots:
     `resize_page({ pageId, width: 1440, height: 900 })` (or `height: 1200` for deep dashboards/workbenches).
2. **Full Page Capture for Structural Audits**:
   - For auditing overall layout, hierarchy, and complete pages from header to footer, always pass:
     `take_screenshot({ pageId, fullPage: true })`.
3. **Scroll Coordinates Reset for Viewport Capture**:
   - After synthetic actions (`click`, `fill`, `hover`), the browser engine may scroll horizontally or vertically into view (`scrollX > 0`, `scrollY > 0`), causing the left side or top of the interface to be cropped off.
   - Always reset scroll position before taking a viewport screenshot:
     `evaluate_script({ pageId, function: "() => { window.scrollTo(0, 0); }" })`
   - Or explicitly scroll directly to the target element:
     `evaluate_script({ pageId, function: "() => { document.querySelector('#target-section')?.scrollIntoView({ block: 'start' }); }" })`.
4. **Targeted Element Screenshots**:
   - To inspect a specific component (e.g. interactive workbench or scorecard), use the element `uid` from `take_snapshot` rather than an arbitrary scrolled viewport.

