/**
 * String and HTML Sanitization Utilities
 * Implements defensive output encoding and input neutralization per OWASP guidelines.
 */

/**
 * Escapes characters that have special meaning in HTML contexts.
 * Use when interpolating untrusted input into HTML email bodies or web documents.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitizes input strings by trimming whitespace, normalizing control characters,
 * and optionally enforcing a maximum length.
 */
export function sanitizeInput(str: string, maxLength?: number): string {
  if (typeof str !== 'string') return '';
  // Remove null bytes and non-printable control characters (keep \r, \n, \t)
  let clean = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  if (typeof maxLength === 'number' && maxLength > 0) {
    clean = clean.slice(0, maxLength);
  }
  return clean;
}

/**
 * Strips HTML tags from text for safe plain-text formatting.
 */
export function stripHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '');
}
