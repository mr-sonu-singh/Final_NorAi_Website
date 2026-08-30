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
