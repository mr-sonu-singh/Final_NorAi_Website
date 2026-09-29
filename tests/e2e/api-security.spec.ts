import { test, expect } from '@playwright/test';
import {
  buildGeminiEndpoint,
  resolveModelId,
  resolveRequestedModel,
  isAllowedModelId,
  GEMINI_MODEL_ALLOWLIST,
} from '@/lib/security/gemini';

const TOOL_ROUTES = [
  '/api/tools/resume-shortlister',
  '/api/tools/course-note-taker',
  '/api/tools/chat-digest',
  '/api/tools/smart-dainik-news',
] as const;

/** Minimal input that satisfies each tool's Zod schema, so the model check is reached. */
const VALID_BODIES: Record<(typeof TOOL_ROUTES)[number], Record<string, unknown>> = {
  '/api/tools/resume-shortlister': {
    jobTitle: 'Backend Engineer',
    jobDescription: 'We need a backend engineer for distributed systems work.',
    resumesText: 'RESUME 1 Candidate Name: Test Person\nExperience: 5 years\nSkills: Go, Postgres',
  },
  '/api/tools/course-note-taker': {
    lectureTitle: 'Operating Systems',
    subject: 'Computer Science',
    transcriptText: 'Today we cover scheduling. The scheduler picks a process. Preemption follows.',
  },
  '/api/tools/chat-digest': {
    communityName: 'Test Community',
    chatLogText: 'user1: the new build is out\nuser2: nice\nuser3: any regressions?',
  },
  '/api/tools/smart-dainik-news': {
    stateOrRegion: 'Uttar Pradesh',
    gazetteText: 'Government of Uttar Pradesh notifies recruitment for various posts.',
  },
};

test.describe('model allowlist — unit', () => {
  test('traversal strings never resolve', () => {
    const attacks = [
      '../files/x',
      '../../v1beta/files',
      '..%2Ffiles',
      '/etc/passwd',
      'models/other',
      './gemini-1.5-flash',
    ];
    for (const attack of attacks) {
      expect(resolveModelId(attack), `resolved traversal string: ${attack}`).toBeNull();
    }
  });

  test('query-injection strings never resolve', () => {
    const attacks = [
      'foo?key=attacker',
      'gemini-1.5-flash?key=attacker',
      'gemini-1.5-flash&key=attacker',
      'gemini-1.5-flash#fragment',
      'gemini-1.5-flash?a=1&b=2',
    ];
    for (const attack of attacks) {
      expect(resolveModelId(attack), `resolved query-injection string: ${attack}`).toBeNull();
    }
  });

  test('non-string and empty inputs never resolve', () => {
    for (const bad of [null, undefined, 123, {}, [], true, '', '   ']) {
      expect(resolveModelId(bad)).toBeNull();
    }
  });

  test('legitimate product model ids resolve to a real upstream id', () => {
    expect(resolveModelId('gemini-3.5-lite')).toBe('gemini-1.5-flash');
    expect(resolveModelId('gemini-1.5-flash')).toBe('gemini-1.5-flash');
    expect(resolveModelId('gemini-1.5-pro')).toBe('gemini-1.5-pro');
  });

  test('an explicit but unknown model is rejected rather than silently downgraded', () => {
    expect(resolveRequestedModel('../files/x')).toBeNull();
    expect(resolveRequestedModel('attacker-model')).toBeNull();
  });

  test('allowlist cannot be mutated at runtime', () => {
    expect(Object.isFrozen(GEMINI_MODEL_ALLOWLIST)).toBe(true);
    expect(isAllowedModelId('constructor')).toBe(false);
    expect(isAllowedModelId('__proto__')).toBe(false);
    expect(isAllowedModelId('toString')).toBe(false);
    expect(resolveModelId('__proto__')).toBeNull();
  });

  test('endpoint never carries a query string or a raw key', () => {
    const endpoint = buildGeminiEndpoint('gemini-1.5-flash');
    expect(endpoint).not.toContain('?');
    expect(endpoint).not.toContain('key=');
    expect(new URL(endpoint).pathname).toBe(
      '/v1beta/models/gemini-1.5-flash:generateContent',
    );
  });

  test('endpoint builder refuses an id outside the allowlist', () => {
    expect(() => buildGeminiEndpoint('../files/x')).toThrow();
    expect(() => buildGeminiEndpoint('foo?key=attacker')).toThrow();
  });
});

test.describe('model allowlist — HTTP surface', () => {
  for (const route of TOOL_ROUTES) {
    test(`${route} rejects traversal model ids with 400`, async ({ request }) => {
      const response = await request.post(route, {
        headers: { 'x-gemini-api-key': 'test-key-not-a-real-key' },
        data: { ...VALID_BODIES[route], preferredModel: '../files/x' },
      });
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('INVALID_MODEL');
    });

    test(`${route} rejects query-injection model ids with 400`, async ({ request }) => {
      const response = await request.post(route, {
        headers: { 'x-gemini-api-key': 'test-key-not-a-real-key' },
        data: { ...VALID_BODIES[route], preferredModel: 'gemini-1.5-flash?key=attacker' },
      });
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('INVALID_MODEL');
    });

    test(`${route} rejects an unknown model id with 400`, async ({ request }) => {
      const response = await request.post(route, {
        headers: { 'x-gemini-api-key': 'test-key-not-a-real-key' },
        data: { ...VALID_BODIES[route], preferredModel: 'attacker-model' },
      });
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('INVALID_MODEL');
    });

    test(`${route} rejects an oversized body with 413`, async ({ request }) => {
      const oversized = 'x'.repeat(300 * 1024);
      const response = await request.post(route, {
        headers: { 'x-gemini-api-key': 'test-key-not-a-real-key' },
        data: { ...VALID_BODIES[route], chatLogText: oversized, resumesText: oversized, transcriptText: oversized, gazetteText: oversized },
      });
      expect(response.status()).toBe(413);
      const body = await response.json();
      expect(body.error).toBe('PAYLOAD_TOO_LARGE');
    });

    test(`${route} returns 400 for a malformed JSON body`, async ({ request }) => {
      const response = await request.post(route, {
        headers: {
          'content-type': 'application/json',
          'x-gemini-api-key': 'test-key-not-a-real-key',
        },
        data: '{not valid json',
      });
      expect(response.status()).toBe(400);
    });
  }
});

test.describe('error bodies do not leak internals', () => {
  test('a rejected model id echoes nothing back but the code', async ({ request }) => {
    const secretish = 'SECRET-CANARY-abc123';
    const response = await request.post('/api/tools/chat-digest', {
      headers: { 'x-gemini-api-key': secretish },
      data: { ...VALID_BODIES['/api/tools/chat-digest'], preferredModel: `../files/${secretish}` },
    });
    const text = await response.text();
    expect(text).not.toContain(secretish);
    expect(text).not.toContain('SECRET-CANARY');
  });

  test('a valid model with a bad key does not echo the key or upstream body', async ({ request }) => {
    const badKey = 'SECRET-CANARY-badkey-xyz789';
    const response = await request.post('/api/tools/chat-digest', {
      headers: { 'x-gemini-api-key': badKey },
      data: VALID_BODIES['/api/tools/chat-digest'],
    });
    const text = await response.text();
    // 401 from upstream maps to INVALID_API_KEY; the key must never appear.
    expect([400, 401, 429, 502, 503]).toContain(response.status());
    expect(text).not.toContain(badKey);
    expect(text).not.toContain('SECRET-CANARY');
    // No stack traces or upstream envelope leaked.
    expect(text).not.toContain('generativelanguage');
    expect(text).not.toMatch(/\bat [A-Za-z_$][\w$]*\s*\(/);
  });
});
