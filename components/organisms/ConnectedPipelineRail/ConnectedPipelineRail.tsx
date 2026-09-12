import React from 'react';
import { ArrowRight, FileText, Cpu, CheckCircle2 } from 'lucide-react';
import { DrawLine } from '@/components/foundation/DrawLine';
import { StaggerGrid, StaggerItem } from '@/components/foundation/AnimatedSection';

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
          <span>Deterministic Architecture</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-tight tracking-tight">
          From unstructured chaos to <br />
          <span className="italic text-accent-primary font-normal">verified operations.</span>
        </h2>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          Every NorAI utility follows a strict 3-stage execution contract designed for deterministic
          reliability, zero hallucination, and instant integration.
        </p>
      </div>

      <div className="relative">
        {/* Animated Connecting Vector Rail (Desktop) */}
        <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] z-0 pointer-events-none">
          <DrawLine
            orientation="horizontal"
            color="rgba(200, 90, 50, 0.3)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            duration={0.8}
            delay={0.1}
            className="w-full h-3"
          />
        </div>

        <StaggerGrid
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10"
        >
          {STAGES.map((st, idx) => {
            const Icon = st.icon;
            return (
              <StaggerItem key={st.title} className="h-full">
                <div className="h-full p-6 md:p-8 rounded-3xl bg-surface-panel border border-border-subtle shadow-sm hover:shadow-md hover:border-accent-primary/30 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 space-y-5 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-accent-primary tracking-wider">
                        {st.step}
                      </span>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-sage-100/70 text-accent-secondary border border-accent-secondary/20">
                        {st.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-surface-canvas border border-border-subtle flex items-center justify-center text-text-primary">
                      <Icon className="w-5 h-5 text-accent-primary" />
                    </div>

                    <h3 className="font-display text-2xl text-text-primary font-normal leading-tight">
                      {st.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed">{st.description}</p>
                  </div>

                  <div className="pt-4 border-t border-border-subtle space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-text-muted uppercase tracking-wider">
                      <span>{st.contract}</span>
                      {idx < STAGES.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-text-muted group-hover:translate-x-1 transition-transform hidden md:inline" />
                      )}
                    </div>
                    <span className="font-mono font-medium text-text-primary text-xs block">
                      {st.payload}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </div>
  );
}
