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
    id: 'shortlist',
    method: 'POST',
    path: '/api/v1/shortlist',
    title: 'Resume Shortlister API',
    description:
      'Upload candidate resume binary or plain text against structured job requirement specifications.',
    curl: `curl -X POST https://api.norai.in/v1/shortlist \\
  -H "Authorization: Bearer norai_live_sec_key" \\
  -H "Content-Type: multipart/form-data" \\
  -F "resume=@candidate_resume.pdf" \\
  -F "job_criteria='{\\"title\\": \\"Sr Backend Engineer\\", \\"min_exp\\": 4}'"`,
    typescript: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const result = await client.shortlist.evaluate({
  resumeFile: fs.createReadStream('./resume.pdf'),
  criteria: {
    title: 'Sr Backend Engineer',
    requiredSkills: ['Python', 'FastAPI', 'PostgreSQL'],
  },
});

console.log(result.composite_score); // 0.962`,
  },
  {
    id: 'notes',
    method: 'POST',
    path: '/api/v1/notes/transcribe',
    title: 'Course Note-Taker API',
    description:
      'Transform lecture audio, video files, or YouTube links into timestamped outlines and flashcard decks.',
    curl: `curl -X POST https://api.norai.in/v1/notes/transcribe \\
  -H "Authorization: Bearer norai_live_sec_key" \\
  -H "Content-Type: application/json" \\
  -d '{"audio_url": "https://cdn.example.com/lecture_04.mp3", "deck_type": "ANKI_FLASHCARDS"}'`,
    typescript: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const notes = await client.notes.generate({
  audioUrl: 'https://cdn.example.com/lecture_04.mp3',
  outputFormat: 'markdown_flashcards',
});

console.log(notes.chapter_outlines);`,
  },
  {
    id: 'digest',
    method: 'POST',
    path: '/api/v1/digest/webhook',
    title: 'Chat Digest Ingestion Webhook',
    description:
      'Stream unread Slack, Discord, or Telegram messages for 24-hour executive clustering.',
    curl: `curl -X POST https://api.norai.in/v1/digest/webhook \\
  -H "Authorization: Bearer norai_live_sec_key" \\
  -H "Content-Type: application/json" \\
  -d '{"channel_id": "C0489234", "timeframe_hours": 24}'`,
    typescript: `import { NorAI } from '@norai/sdk';

const client = new NorAI({ apiKey: process.env.NORAI_API_KEY });

const briefing = await client.digest.summarizeChannel({
  channelId: 'C0489234',
  windowHours: 24,
});

console.log(briefing.key_decisions);`,
  },
];

export function ApiReferenceMatrix() {
  const [selectedId, setSelectedId] = useState('shortlist');
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
                TypeScript SDK
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
            <span>Authentication: Bearer Token</span>
            <span>Latency SLA: &lt; 0.35s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
