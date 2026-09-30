'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

interface Endpoint {
  id: string;
  method: 'POST' | 'GET';
  path: string;
  title: string;
  description: string;
  curl: string;
  typescript: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'resume-shortlister',
    method: 'POST',
    path: '/api/tools/resume-shortlister',
    title: 'Resume Shortlister',
    description:
      'Ranks pasted resume text against a job title, description, and optional custom weights. Returns scored candidates with skill vectors, red flags, and interview questions.',
    curl: `# Same-origin route. Set ORIGIN to whatever host serves this app.
curl -X POST "$ORIGIN/api/tools/resume-shortlister" \\
  -H "Content-Type: application/json" \\
  -H "x-gemini-api-key: $GEMINI_API_KEY" \\
  -d '{
    "jobTitle": "Sr Backend Engineer",
    "jobDescription": "Distributed systems, Python, PostgreSQL.",
    "minThreshold": 75,
    "resumesText": "<resume text extracted in your browser>"
  }'`,
    typescript: `// Runs in the browser. Your key, your account, your Google bill.
const response = await fetch('/api/tools/resume-shortlister', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-gemini-api-key': userSuppliedGeminiKey,
  },
  body: JSON.stringify({
    jobTitle: 'Sr Backend Engineer',
    jobDescription: 'Distributed systems, Python, PostgreSQL.',
    minThreshold: 75,
    resumesText: textExtractedInBrowser,
  }),
});

const { data } = await response.json();
// data.candidates[].skillVectors[] carries label, matchScore (0-100), evidence.
// data.telemetry.latencyMs is this request only — not a published benchmark.`,
  },
  {
    id: 'course-note-taker',
    method: 'POST',
    path: '/api/tools/course-note-taker',
    title: 'Course Note-Taker',
    description:
      'Turns a lecture transcript into a chaptered study guide with extracted formulas, recall flashcards, and a multiple-choice quiz.',
    curl: `# Same-origin route. Set ORIGIN to whatever host serves this app.
curl -X POST "$ORIGIN/api/tools/course-note-taker" \\
  -H "Content-Type: application/json" \\
  -H "x-gemini-api-key: $GEMINI_API_KEY" \\
  -d '{
    "lectureTitle": "Attention Is All You Need",
    "subject": "Deep Learning",
    "focusMode": "Formulas & Axioms",
    "transcriptText": "<transcript pasted into the browser>"
  }'`,
    typescript: `// Runs in the browser. Your key, your account, your Google bill.
const response = await fetch('/api/tools/course-note-taker', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-gemini-api-key': userSuppliedGeminiKey,
  },
  body: JSON.stringify({
    lectureTitle: 'Attention Is All You Need',
    subject: 'Deep Learning',
    focusMode: 'Formulas & Axioms',
    transcriptText: pastedTranscript,
  }),
});

const { data } = await response.json();
// data.chapters[].formulasOrCode[] carries LaTeX source, not rendered markup.
// data.flashcards and data.quiz are validated against their Zod schemas before return.`,
  },
  {
    id: 'chat-digest',
    method: 'POST',
    path: '/api/tools/chat-digest',
    title: 'Chat Digest',
    description:
      'Condenses a raw Discord, Telegram, or Slack export into topic clusters, triaged action items, and a ready-to-send newsletter draft.',
    curl: `# Same-origin route. Set ORIGIN to whatever host serves this app.
curl -X POST "$ORIGIN/api/tools/chat-digest" \\
  -H "Content-Type: application/json" \\
  -H "x-gemini-api-key: $GEMINI_API_KEY" \\
  -d '{
    "communityName": "Open Source Maintainers",
    "platform": "Discord",
    "timeframe": "Last 24 Hours",
    "chatLogText": "<raw chat log pasted into the browser>"
  }'`,
    typescript: `// Runs in the browser. Your key, your account, your Google bill.
const response = await fetch('/api/tools/chat-digest', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-gemini-api-key': userSuppliedGeminiKey,
  },
  body: JSON.stringify({
    communityName: 'Open Source Maintainers',
    platform: 'Discord',
    timeframe: 'Last 24 Hours',
    chatLogText: pastedChatLog,
  }),
});

const { data } = await response.json();
// data.actionItemsAndBugs[] is typed as Bug Report, Feature Request,
// Question, or Community Action — nothing is dispatched automatically.`,
  },
  {
    id: 'smart-dainik-news',
    method: 'POST',
    path: '/api/tools/smart-dainik-news',
    title: 'Regional Gazette Reader',
    description:
      'Reads a pasted gazette or press release and returns bilingual briefs, deadline alert cards, and an eligibility matrix. A drafting aid, not a verified source.',
    curl: `# Same-origin route. Set ORIGIN to whatever host serves this app.
curl -X POST "$ORIGIN/api/tools/smart-dainik-news" \\
  -H "Content-Type: application/json" \\
  -H "x-gemini-api-key: $GEMINI_API_KEY" \\
  -d '{
    "stateOrRegion": "Uttar Pradesh",
    "languageMode": "Bilingual (Hindi + English)",
    "gazetteText": "<gazette text pasted into the browser>"
  }'`,
    typescript: `// Runs in the browser. Your key, your account, your Google bill.
const response = await fetch('/api/tools/smart-dainik-news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-gemini-api-key': userSuppliedGeminiKey,
  },
  body: JSON.stringify({
    stateOrRegion: 'Uttar Pradesh',
    languageMode: 'Bilingual (Hindi + English)',
    gazetteText: pastedGazetteText,
  }),
});

const { data } = await response.json();
// Dates, portal URLs, and notification references come from the text you pasted.
// Confirm every one against the official portal before you rely on it.`,
  },
];

export function ApiReferenceMatrix() {
  const [selectedId, setSelectedId] = useState('resume-shortlister');
  const [language, setLanguage] = useState<'curl' | 'ts'>('curl');
  const [copied, setCopied] = useState(false);

  const endpoint = (ENDPOINTS.find((e) => e.id === selectedId) || ENDPOINTS[0]) as Endpoint;
  const activeCode = language === 'curl' ? endpoint.curl : endpoint.typescript;

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full text-left font-sans space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Endpoint Selector */}
        <div className="lg:col-span-4 space-y-2">
          {ENDPOINTS.map((ep) => {
            const isSelected = selectedId === ep.id;
            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => setSelectedId(ep.id)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border transition-all',
                  isSelected
                    ? 'bg-canvas-paper border-accent-500/80 shadow-md ring-1 ring-accent-500/20'
                    : 'bg-canvas-paper/40 border-[rgba(13,37,61,0.08)] hover:bg-canvas-paper',
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent-50 text-accent-500">
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-ink-primary font-semibold truncate">
                    {ep.path}
                  </span>
                </div>
                <h4 className="font-display text-lg text-ink-primary font-normal">{ep.title}</h4>
                <p className="text-xs text-ink-secondary line-clamp-2 mt-1">{ep.description}</p>
              </button>
            );
          })}
        </div>

        {/* Right Code Preview Stage */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0D253D] text-[#FDFBF7] p-6 shadow-xl border border-[rgba(253,251,247,0.1)] space-y-4">
          <div className="flex items-center justify-between border-b border-[rgba(253,251,247,0.1)] pb-3 text-xs">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLanguage('curl')}
                className={cn(
                  'px-3 py-1 rounded font-mono',
                  language === 'curl'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-slate-400 hover:text-white',
                )}
              >
                cURL
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ts')}
                className={cn(
                  'px-3 py-1 rounded font-mono',
                  language === 'ts'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-slate-400 hover:text-white',
                )}
              >
                TypeScript fetch
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#5B8A72]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'Copied snippet' : 'Copy'}</span>
            </button>
          </div>

          <pre
            tabIndex={0}
            aria-label="Code snippet"
            className="font-mono text-xs text-emerald-300/95 overflow-x-auto leading-relaxed p-2 max-h-72 focus:outline-none focus:ring-1 focus:ring-emerald-400/30"
          >
            {activeCode}
          </pre>

          <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-[rgba(253,251,247,0.1)] flex justify-between">
            <span>Auth: x-gemini-api-key header (BYOK)</span>
            <span>Rate limit: 30 req / 5 min / IP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
