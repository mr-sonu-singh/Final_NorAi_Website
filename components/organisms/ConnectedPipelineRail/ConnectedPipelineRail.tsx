import React from 'react';

interface Stage {
  title: string;
  subtitle: string;
  description: string;
  contract: string;
  payload: string;
}

const STAGES: Stage[] = [
  {
    title: 'Ingest Unstructured Input',
    subtitle: 'High-Volume Document & Audio Ingestion',
    description:
      'Upload resumes, meeting audio, community channel webhooks, or regional news streams via our zero-friction API or web dashboard.',
    contract: 'INPUT CONTRACT',
    payload: 'PDF, DOCX, MP3, Webhook payload',
  },
  {
    title: 'Deterministic Neural Parse',
    subtitle: 'RAM-Isolated Vector Verification',
    description:
      'Our fine-tuned models parse entities, extract skill vectors, calculate relevance scores, and verify facts in ephemeral memory.',
    contract: 'PROCESSING SLA',
    payload: '< 0.35s / document · 0 Bytes logged',
  },
  {
    title: 'Deliver Verified Action',
    subtitle: 'Direct System Synchronization',
    description:
      'Receive structured JSON, update your ATS candidate scorecard, dispatch formatted Slack executive digests, or export to Notion.',
    contract: 'OUTPUT CONTRACT',
    payload: 'Typed JSON, Notion sync, Webhook callback',
  },
];

export function ConnectedPipelineRail() {
  return (
    <div className="w-full text-left font-sans space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
        {STAGES.map((st) => (
          <div
            key={st.title}
            className="p-6 md:p-8 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-500">
                  {st.contract}
                </span>
                <span className="text-[11px] font-mono text-accent-secondary">
                  Active
                </span>
              </div>

              <h4 className="font-display text-2xl text-ink-primary font-normal leading-tight">
                {st.title}
              </h4>

              <p className="text-xs text-ink-body leading-relaxed">
                {st.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] space-y-1 text-xs">
              <span className="font-mono font-medium text-ink-primary text-[11px] block">
                {st.payload}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
