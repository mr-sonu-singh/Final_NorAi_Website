'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import { cn } from '@/lib/utils';

interface MathRendererProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

/**
 * Universal Unicode dictionary to translate common LaTeX macros and formulas
 * into crisp, human-readable mathematical Unicode glyphs as a fail-safe.
 */
export function formatLatexToUnicode(raw: string): string {
  if (!raw) return '';

  let out = raw
    // Normalization & strip double backslashes
    .replace(/\\\\/g, '\\')
    // Delimiter strips
    .replace(/^\$\$|\$\$$|^\\\[|\\\]$|^\\\(|\\\)$/g, '')
    // Strip \left and \right scaling commands
    .replace(/\\left|\\right/g, '')
    // Logic & Implication
    .replace(/\\implies|\\Longrightarrow/g, ' ⟹ ')
    .replace(/\\impliedby|\\Longleftarrow/g, ' ⟸ ')
    .replace(/\\iff|\\Longleftrightarrow/g, ' ⟺ ')
    .replace(/\\rightarrow|\\to/g, ' → ')
    .replace(/\\leftarrow|\\gets/g, ' ← ')
    .replace(/\\Rightarrow/g, ' ⇒ ')
    .replace(/\\Leftarrow/g, ' ⇐ ')
    .replace(/\\leftrightarrow/g, ' ↔ ')
    .replace(/\\uparrow/g, ' ↑ ')
    .replace(/\\downarrow/g, ' ↓ ')
    .replace(/\\land|\\wedge/g, ' ∧ ')
    .replace(/\\lor|\\vee/g, ' ∨ ')
    .replace(/\\neg|\\lnot/g, ' ¬ ')
    .replace(/\\forall/g, ' ∀ ')
    .replace(/\\exists/g, ' ∃ ')
    .replace(/\\nexists/g, ' ∄ ')
    // Comparison & Relations
    .replace(/\\ge|\\geq/g, ' ≥ ')
    .replace(/\\le|\\leq/g, ' ≤ ')
    .replace(/\\ne|\\neq/g, ' ≠ ')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\sim/g, ' ∼ ')
    .replace(/\\simeq/g, ' ≃ ')
    .replace(/\\equiv/g, ' ≡ ')
    .replace(/\\cong/g, ' ≅ ')
    .replace(/\\propto/g, ' ∝ ')
    .replace(/\\ll/g, ' ≪ ')
    .replace(/\\gg/g, ' ≫ ')
    // Operators & Arithmetic
    .replace(/\\odot/g, ' ⊙ ')
    .replace(/\\otimes/g, ' ⊗ ')
    .replace(/\\oplus/g, ' ⊕ ')
    .replace(/\\times/g, ' × ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\mp/g, ' ∓ ')
    .replace(/\\div/g, ' ÷ ')
    .replace(/\\circ/g, ' ∘ ')
    .replace(/\\bullet/g, ' • ')
    .replace(/\\star/g, ' ⋆ ')
    .replace(/\\in/g, ' ∈ ')
    .replace(/\\notin/g, ' ∉ ')
    .replace(/\\subset/g, ' ⊂ ')
    .replace(/\\supset/g, ' ⊃ ')
    .replace(/\\subseteq/g, ' ⊆ ')
    .replace(/\\supseteq/g, ' ⊇ ')
    .replace(/\\cup/g, ' ∪ ')
    .replace(/\\cap/g, ' ∩ ')
    .replace(/\\setminus/g, ' \\ ')
    .replace(/\\emptyset|\\varnothing/g, ' ∅ ')
    // Calculus, Sums & Set notations
    .replace(/\\partial/g, '∂')
    .replace(/\\nabla/g, '∇')
    .replace(/\\infty/g, '∞')
    .replace(/\\sum/g, '∑')
    .replace(/\\prod/g, '∏')
    .replace(/\\int/g, '∫')
    .replace(/\\iint/g, '∬')
    .replace(/\\oint/g, '∮')
    // Brackets & Floor/Ceil/Angle
    .replace(/\\lfloor/g, '⌊')
    .replace(/\\rfloor/g, '⌋')
    .replace(/\\lceil/g, '⌈')
    .replace(/\\rceil/g, '⌉')
    .replace(/\\langle/g, '⟨')
    .replace(/\\rangle/g, '⟩')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    // Lowercase Greek letters
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\epsilon|\\varepsilon/g, 'ε')
    .replace(/\\zeta/g, 'ζ')
    .replace(/\\eta/g, 'η')
    .replace(/\\theta|\\vartheta/g, 'θ')
    .replace(/\\iota/g, 'ι')
    .replace(/\\kappa/g, 'κ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\nu/g, 'ν')
    .replace(/\\xi/g, 'ξ')
    .replace(/\\pi|\\varpi/g, 'π')
    .replace(/\\rho|\\varrho/g, 'ρ')
    .replace(/\\sigma|\\varsigma/g, 'σ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\upsilon/g, 'υ')
    .replace(/\\phi|\\varphi/g, 'φ')
    .replace(/\\chi/g, 'χ')
    .replace(/\\psi/g, 'ψ')
    .replace(/\\omega/g, 'ω')
    // Uppercase Greek letters
    .replace(/\\Gamma/g, 'Γ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\Theta/g, 'Θ')
    .replace(/\\Lambda/g, 'Λ')
    .replace(/\\Xi/g, 'Ξ')
    .replace(/\\Pi/g, 'Π')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\Upsilon/g, 'Υ')
    .replace(/\\Phi/g, 'Φ')
    .replace(/\\Psi/g, 'Ψ')
    .replace(/\\Omega/g, 'Ω')
    // Special functions, blackboard bold and styles
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\mathbb\{N\}/g, 'ℕ')
    .replace(/\\mathbb\{Z\}/g, 'ℤ')
    .replace(/\\mathbb\{Q\}/g, 'ℚ')
    .replace(/\\mathbb\{C\}/g, 'ℂ')
    .replace(/\\mathbb\{E\}/g, '𝔼')
    .replace(/\\mathbb\{P\}/g, 'ℙ')
    .replace(/\\mathcal\{L\}/g, 'ℒ')
    .replace(/\\mathcal\{J\}/g, '𝒥')
    .replace(/\\mathcal\{H\}/g, 'ℋ')
    .replace(/\\mathcal\{N\}/g, '𝒩')
    .replace(/\\mathcal\{D\}/g, '𝒟')
    .replace(/\\mathcal\{R\}/g, 'ℛ')
    .replace(/\\mathcal\{([A-Za-z])\}/g, '$1')
    .replace(/\\mathbb\{([A-Za-z])\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1')
    .replace(/\\mathit\{([^}]+)\}/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\operatorname\{([^}]+)\}/g, '$1')
    .replace(/\\hat\{([A-Za-z0-9]+)\}/g, '$1̂')
    .replace(/\\bar\{([A-Za-z0-9]+)\}/g, '$1̄')
    .replace(/\\vec\{([A-Za-z0-9]+)\}/g, '$1⃗')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\sqrt/g, '√')
    .replace(/\\quad/g, '   ')
    .replace(/\\qquad/g, '     ')
    .replace(/\\,|\\:|\\;/g, ' ')
    .replace(/\\!/g, '')
    // Fractions: \frac{a}{b} -> (a / b)
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');

  // Subscript conversions: e.g. x_i -> xᵢ, t_cand -> t_cand
  out = out
    .replace(/_0/g, '₀')
    .replace(/_1/g, '₁')
    .replace(/_2/g, '₂')
    .replace(/_3/g, '₃')
    .replace(/_4/g, '₄')
    .replace(/_5/g, '₅')
    .replace(/_6/g, '₆')
    .replace(/_7/g, '₇')
    .replace(/_8/g, '₈')
    .replace(/_9/g, '₉')
    .replace(/_i\b/g, 'ᵢ')
    .replace(/_j\b/g, 'ⱼ')
    .replace(/_k\b/g, 'ₖ')
    .replace(/_n\b/g, 'ₙ')
    .replace(/_m\b/g, 'ₘ')
    .replace(/_t\b/g, 'ₜ')
    .replace(/_x\b/g, 'ₓ');

  // Superscript conversions: e.g. x^2 -> x²
  out = out
    .replace(/\^0/g, '⁰')
    .replace(/\^1/g, '¹')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^4/g, '⁴')
    .replace(/\^5/g, '⁵')
    .replace(/\^6/g, '⁶')
    .replace(/\^7/g, '⁷')
    .replace(/\^8/g, '⁸')
    .replace(/\^9/g, '⁹')
    .replace(/\^\+/g, '⁺')
    .replace(/\^-/g, '⁻')
    .replace(/\^T\b/g, 'ᵀ');

  // Clean unparsed subscript/superscript braces: _{abc} -> _abc
  out = out.replace(/_\{([^{}]+)\}/g, '_$1');
  out = out.replace(/\^\{([^{}]+)\}/g, '^$1');

  // Clean remaining unparsed braces safely
  out = out.replace(/\{([^{}]+)\}/g, '$1');

  // Collapse multiple spaces
  out = out.replace(/[ \t]+/g, ' ');

  return out.trim();
}

/**
 * Normalizes LaTeX input: strips escaped backslashes, trims outer delimiters.
 */
function cleanLatexString(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.trim();

  // Normalize double/quad backslashes from JSON strings
  if (cleaned.includes('\\\\')) {
    cleaned = cleaned.replace(/\\\\/g, '\\');
  }

  // Strip outer $$ or $ or \[ or \( delimiters if wrapped
  if (cleaned.startsWith('$$') && cleaned.endsWith('$$') && cleaned.length > 4) {
    cleaned = cleaned.slice(2, -2).trim();
  } else if (cleaned.startsWith('$') && cleaned.endsWith('$') && cleaned.length > 2) {
    cleaned = cleaned.slice(1, -1).trim();
  } else if (cleaned.startsWith('\\[') && cleaned.endsWith('\\]') && cleaned.length > 4) {
    cleaned = cleaned.slice(2, -2).trim();
  } else if (cleaned.startsWith('\\(') && cleaned.endsWith('\\') && cleaned.length > 4) {
    cleaned = cleaned.slice(2, -2).trim();
  }
  return cleaned;
}

/**
 * Primary MathRenderer Atom: Compiles LaTeX to static HTML via KaTeX
 * with strict error catching and seamless fallback to Unicode mathematical formatting.
 */
export function MathRenderer({ math, displayMode = false, className }: MathRendererProps) {
  const html = useMemo(() => {
    const cleaned = cleanLatexString(math);
    if (!cleaned) return '';

    try {
      const rendered = katex.renderToString(cleaned, {
        displayMode,
        throwOnError: true, // Throws cleanly on parse/syntax error so catch can activate fallback!
        errorColor: '#A84530',
        strict: false,
      });

      // Safety check: if somehow KaTeX output contains katex-error, force fallback
      if (rendered.includes('katex-error')) {
        return '';
      }

      return rendered;
    } catch {
      // If KaTeX encounters an unrecoverable parse error, return empty to trigger unicode fallback
      return '';
    }
  }, [math, displayMode]);

  if (!html) {
    const unicodeFallback = formatLatexToUnicode(math);
    return (
      <span
        className={cn(
          'font-mono font-medium tracking-tight text-ink-primary',
          displayMode ? 'block text-center py-2 text-sm' : 'inline text-xs',
          className,
        )}
      >
        {unicodeFallback}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-math select-text',
        displayMode && 'block text-center my-1.5 overflow-x-auto scrollbar-none',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * SubMathSegment Helper:
 * Handles inline parenthesized math or macro expressions without global regex state corruption.
 */
function SubMathSegment({ text }: { text: string }) {
  // Pattern to split on parenthesized equations or math macro clusters
  const MACRO_SPLIT_REGEX =
    /(\([^\)]*?\\[a-zA-Z]+[^\)]*?\)|\\lfloor[\s\S]*?\\rfloor|\\lceil[\s\S]*?\\rceil|\\\w+(?:\{[^{}]*?\})*(?:\s*[\+\-\=\<\>\*\/\^]\s*(?:\\\w+(?:\{[^{}]*?\})*|[a-zA-Z0-9]+))*)/;

  const parts = text.split(MACRO_SPLIT_REGEX);

  return (
    <>
      {parts.map((seg, idx) => {
        if (!seg) return null;
        if (seg.includes('\\')) {
          const isParenWrapped = seg.startsWith('(') && seg.endsWith(')');
          const cleanSeg = isParenWrapped ? seg.slice(1, -1) : seg;
          return (
            <span key={idx} className="inline-flex items-baseline mx-0.5">
              {isParenWrapped && '('}
              <MathRenderer math={cleanSeg} displayMode={false} />
              {isParenWrapped && ')'}
            </span>
          );
        }
        return <span key={idx}>{seg}</span>;
      })}
    </>
  );
}

/**
 * MathText Component:
 * Ingests mixed sentences / paragraphs containing either LaTeX delimiters ($...$, $$...$$, \(...\))
 * or inline LaTeX macros (e.g. \lfloor N/2 \rfloor + 1, \implies) and renders
 * math inline with KaTeX while preserving surrounding prose.
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const renderedElements = useMemo(() => {
    if (!text) return null;

    // Pattern to match explicit delimiters without stateful global /g regex:
    const DELIM_REGEX = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$|\\\[[\s\S]*?\\\]|\\\([^\)]+?\\\))/;

    if (DELIM_REGEX.test(text)) {
      const parts = text.split(DELIM_REGEX);
      return parts.map((part, idx) => {
        if (!part) return null;
        const isBlock = part.startsWith('$$') || part.startsWith('\\[');
        const isInline =
          (part.startsWith('$') && part.endsWith('$')) ||
          (part.startsWith('\\(') && part.endsWith('\\)'));

        if (isBlock || isInline) {
          return (
            <MathRenderer
              key={idx}
              math={part}
              displayMode={isBlock}
              className={isBlock ? 'my-2' : undefined}
            />
          );
        }

        if (part.includes('\\')) {
          return <SubMathSegment key={idx} text={part} />;
        }

        return <span key={idx}>{part}</span>;
      });
    }

    // If text contains un-bracketed LaTeX commands (e.g. "majority of nodes (\lfloor N/2 \rfloor + 1).")
    if (text.includes('\\')) {
      return <SubMathSegment text={text} />;
    }

    // Default plain string
    return <span>{text}</span>;
  }, [text]);

  return <span className={cn('leading-relaxed', className)}>{renderedElements}</span>;
}
