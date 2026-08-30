/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { escapeHtml, sanitizeInput, stripHtml } from '../lib/security/sanitize';
import { checkRateLimit, getRateLimitHeaders, getClientIp } from '../lib/security/rate-limit';
import { contactFormSchema } from '../lib/schemas/contact';
import { envSchema } from '../lib/schemas/env';

describe('Security & Hardening Verification Suite (Session 10)', () => {
  describe('Input Sanitization & Output Escaping (XSS Prevention)', () => {
    it('escapes dangerous HTML/script characters to safe HTML entities', () => {
      const malicious = '<script>alert("XSS & attack")</script>';
      const safe = escapeHtml(malicious);
      expect(safe).toBe('&lt;script&gt;alert(&quot;XSS &amp; attack&quot;)&lt;/script&gt;');
    });

    it('escapes single and double quotes', () => {
      expect(escapeHtml(`' or 1=1 --`)).toBe('&#039; or 1=1 --');
      expect(escapeHtml(`" onclick="alert(1)"`)).toBe('&quot; onclick=&quot;alert(1)&quot;');
    });

    it('sanitizes input and strips non-printable control characters', () => {
      const dirty = 'Hello\x00\x08World\r\n\t!';
      const clean = sanitizeInput(dirty, 50);
      expect(clean).toBe('HelloWorld\r\n\t!');
    });

    it('truncates inputs exceeding maxLength', () => {
      const longText = 'a'.repeat(200);
      expect(sanitizeInput(longText, 50).length).toBe(50);
    });

    it('strips HTML tags completely with stripHtml', () => {
      expect(stripHtml('<p>Hello <b>World</b><img src="x" onerror="alert(1)"/></p>')).toBe('Hello World');
    });
  });

  describe('Sliding Window Rate Limiter (DoS Prevention)', () => {
    it('allows requests within the configured threshold', () => {
      const testKey = `test-ip-${Date.now()}-1`;
      const result1 = checkRateLimit(testKey, { maxRequests: 3, windowMs: 10000 });
      expect(result1.success).toBe(true);
      expect(result1.remaining).toBe(2);

      const result2 = checkRateLimit(testKey, { maxRequests: 3, windowMs: 10000 });
      expect(result2.success).toBe(true);
      expect(result2.remaining).toBe(1);

      const result3 = checkRateLimit(testKey, { maxRequests: 3, windowMs: 10000 });
      expect(result3.success).toBe(true);
      expect(result3.remaining).toBe(0);
    });

    it('blocks subsequent requests and sets retry headers when threshold is exceeded', () => {
      const testKey = `test-ip-${Date.now()}-2`;
      // Exhaust 2 requests
      checkRateLimit(testKey, { maxRequests: 2, windowMs: 10000 });
      checkRateLimit(testKey, { maxRequests: 2, windowMs: 10000 });

      // 3rd attempt
      const result = checkRateLimit(testKey, { maxRequests: 2, windowMs: 10000 });
      expect(result.success).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.retryAfterSeconds).toBeGreaterThan(0);

      const headers = getRateLimitHeaders(result);
      expect(headers['X-RateLimit-Limit']).toBe('2');
      expect(headers['X-RateLimit-Remaining']).toBe('0');
      expect(headers['Retry-After']).toBeDefined();
    });

    it('resolves client IP from various proxy headers correctly', () => {
      const headers1 = new Headers({ 'x-forwarded-for': '203.0.113.195, 70.41.3.18' });
      expect(getClientIp(headers1)).toBe('203.0.113.195');

      const headers2 = new Headers({ 'x-real-ip': '198.51.100.1' });
      expect(getClientIp(headers2)).toBe('198.51.100.1');

      const headers3 = new Headers({ 'cf-connecting-ip': '192.0.2.1' });
      expect(getClientIp(headers3)).toBe('192.0.2.1');

      const headersEmpty = new Headers();
      expect(getClientIp(headersEmpty)).toBe('127.0.0.1');
    });
  });

  describe('Contact Form Zod Schema Validation', () => {
    it('accepts valid contact payloads', () => {
      const validPayload = {
        name: 'Gourav Gupta',
        email: 'gourav@example.com',
        company: 'NorAI Labs',
        service: 'AI Resume Shortlister',
        message: 'We want to discuss custom enterprise RAG pipelines for high-throughput document search.',
      };

      const result = contactFormSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Gourav Gupta');
        expect(result.data.service).toBe('AI Resume Shortlister');
      }
    });

    it('rejects payloads with invalid or malformed emails', () => {
      const invalidEmail = {
        name: 'Gourav Gupta',
        email: 'not-an-email',
        message: 'This is a long enough message to pass length checks.',
      };
      const result = contactFormSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    });

    it('rejects payloads with messages that are too short (< 10 chars)', () => {
      const shortMessage = {
        name: 'Gourav',
        email: 'test@example.com',
        message: 'Hi',
      };
      const result = contactFormSchema.safeParse(shortMessage);
      expect(result.success).toBe(false);
    });

    it('rejects payloads exceeding max character limits', () => {
      const tooLongName = {
        name: 'x'.repeat(150),
        email: 'test@example.com',
        message: 'Valid message body with sufficient length.',
      };
      const result = contactFormSchema.safeParse(tooLongName);
      expect(result.success).toBe(false);
    });
  });

  describe('Environment Schema Security & Separation', () => {
    it('validates environment schema with safe defaults', () => {
      const result = envSchema.safeParse({
        NEXT_PUBLIC_SITE_URL: 'https://noraitech.com',
        CONTACT_SALES_EMAIL: 'sales@noraitech.com',
      });
      expect(result.success).toBe(true);
    });

    it('does not expose server credentials as public variables', () => {
      const schemaKeys = Object.keys(envSchema.shape);
      const publicKeys = schemaKeys.filter((k) => k.startsWith('NEXT_PUBLIC_'));

      // Ensure secret keys are strictly non-public
      expect(publicKeys).not.toContain('GEMINI_API_KEY');
      expect(publicKeys).not.toContain('EMAIL_PASS');
      expect(publicKeys).not.toContain('EMAIL_USER');
    });
  });
});
