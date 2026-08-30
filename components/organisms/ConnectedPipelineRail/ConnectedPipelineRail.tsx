import React from 'react';
import { ArrowRight, FileText, Cpu, CheckCircle2 } from 'lucide-react';

interface Stage {
  step: string;
  title: string;
  icon: React.ElementType;
  description: string;
  contract: string;
  payload: string;
  tag: string;
}

const STAGES: Stage[] = [
  {
    step: 'STAGE 01',
    title: 'Ingest Unstructured Input',
    icon: FileText,
    description:
      'Upload resumes, meeting recordings, Discord/Telegram webhooks, or regional gazette feeds via our zero-friction API or web dashboard.',
    contract: 'INPUT CONTRACT',
    payload: 'PDF, DOCX, MP3, Webhook payload',
    tag: 'Multi-Modal Intake',
  },
  {
    step: 'STAGE 02',
    title: 'Deterministic Neural Parse',
    icon: Cpu,
    description:
      'Our fine-tuned models parse entities, extract skill vectors, calculate relevance scores, and verify facts in ephemeral RAM containers.',
    contract: 'PROCESSING SLA',
    payload: '< 0.35s / doc · 0 Bytes logged',
    tag: 'RAM-Isolated',
  },
  {
    step: 'STAGE 03',
    title: 'Deliver Verified Action',
    icon: CheckCircle2,
    description:
      'Receive typed JSON schemas, update your ATS scorecard directly, dispatch formatted Slack executive briefs, or export structured datasets.',
    contract: 'OUTPUT CONTRACT',
    payload: 'Typed JSON, Webhook callback, ATS sync',
    tag: 'Zero-Schema Drift',
  },
];

export function ConnectedPipelineRail() {
  return (
    <div className="w-full text-left font-sans space-y-10">
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
          <span>Deterministic Architecture</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
          From unstructured chaos to <br />
          <span className="italic text-accent-500 font-normal">verified operations.</span>
        </h2>
        <p className="text-base md:text-lg text-ink-body leading-relaxed">
          Every NorAI utility follows a strict 3-stage execution contract designed for deterministic reliability, zero hallucination, and instant integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
        {STAGES.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.title}
              className="p-6 md:p-8 rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all duration-200 space-y-5 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent-500 tracking-wider">
                    {st.step}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-sage-100/70 text-accent-secondary border border-accent-secondary/20">
                    {st.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] flex items-center justify-center text-ink-primary">
                  <Icon className="w-5 h-5 text-accent-500" />
                </div>

                <h3 className="font-display text-2xl text-ink-primary font-normal leading-tight">
                  {st.title}
                </h3>

                <p className="text-sm text-ink-body leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-ink-secondary uppercase tracking-wider">
                  <span>{st.contract}</span>
                  {idx < STAGES.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-ink-secondary group-hover:translate-x-1 transition-transform hidden md:inline" />
                  )}
                </div>
                <span className="font-mono font-medium text-ink-primary text-xs block">
                  {st.payload}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

