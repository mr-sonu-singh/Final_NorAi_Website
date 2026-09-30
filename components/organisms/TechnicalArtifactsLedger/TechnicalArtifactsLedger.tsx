'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Copy,
  Check,
  Cpu,
  ShieldCheck,
  Palette,
  Bot,
  TrendingUp,
  Terminal,
  Zap,
} from 'lucide-react';

interface TechnicalArtifact {
  id: string;
  name: string;
  package: string;
  author: string;
  authorRole: string;
  version: string;
  latencyTarget: string;
  summary: string;
  icon: typeof Code2;
  language: string;
  code: string;
}

const DEFAULT_ARTIFACT: TechnicalArtifact = {
  id: 'orchestration-schema',
  name: 'Deterministic Agent State Machine',
  package: '@norai/orchestrator-core',
  author: 'Gourav Singh',
  authorRole: 'AI Engineer / Orchestration Lead',
  version: 'v2.4.0',
  latencyTarget: 'Schema-Validated Output',
  summary:
    'Typed Zod schema and transition state machine ensuring schema-checked structured JSON output on every run, across all micro-SaaS endpoints.',
  icon: Bot,
  language: 'typescript',
  code: `import { z } from 'zod';
import { defineAgentPipeline } from '@norai/orchestrator-core';

// Candidate Scoring & Evaluation Contract
export const CandidateEvaluationSchema = z.object({
  candidateId: z.string().uuid(),
  matchScore: z.number().min(0).max(100),
  verifiedSkills: z.array(z.string()).nonempty(),
  missingRequirements: z.array(z.string()),
  probingQuestions: z.array(z.string()).length(3),
  executionMode: z.enum(['BROWSER_RUNTIME', 'EDGE_RUNTIME']),
  dataResidency: z.literal('EPHEMERAL_RAM_FLUSHED'),
});

export const shortlisterAgent = defineAgentPipeline({
  name: 'ResumeShortlisterEngine',
  model: 'byok/gemini-user-supplied-key',
  outputSchema: CandidateEvaluationSchema,
  maxRetries: 2,
  timeoutMs: 30000,
});`,
};

const ARTIFACTS: TechnicalArtifact[] = [
  DEFAULT_ARTIFACT,
  {
    id: 'spatial-mesh',
    name: 'Spatial AR/VR Interaction Schema',
    package: '@norai/spatial-mesh',
    author: 'Sonu Singh',
    authorRole: 'AR-VR / AI Engineer',
    version: 'v1.8.2',
    latencyTarget: 'Browser Frame Budget Target',
    summary:
      'Coordinate mapping and multi-modal sensory event pipelines for next-generation spatial computing and WebGPU immersive rendering.',
    icon: Cpu,
    language: 'typescript',
    code: `import { z } from 'zod';
import { SpatialRaycastPipeline } from '@norai/spatial-mesh';

export const SpatialInteractionSchema = z.object({
  anchorCoordinates: z.tuple([z.number(), z.number(), z.number()]),
  gazeVector: z.tuple([z.number(), z.number(), z.number()]),
  hapticFeedbackPattern: z.enum(['SUBTLE_CLICK', 'CONFIRM_PULSE', 'WARNING_BURST']),
  renderPipeline: z.enum(['WEBGPU_DIRECT', 'THREEJS_FALLBACK']),
  frameBudgetMs: z.number().max(8.33), // 120 FPS Target
});

export const spatialTracker = new SpatialRaycastPipeline({
  trackingRateHz: 90,
  latencyCompensation: 'KALMAN_FILTER_PREDICTIVE',
});`,
  },
  {
    id: 'design-tokens',
    name: 'Parchment & Terracotta Token System',
    package: '@norai/design-tokens',
    author: 'Rishabh Singh',
    authorRole: 'Design & Visualisation Lead',
    version: 'v3.1.0',
    latencyTarget: 'Static Token Emission',
    summary:
      'Tactile editorial token definitions, 5-state component ergonomics, and concentric border radius formulas adhering to the Impeccable Protocol.',
    icon: Palette,
    language: 'typescript',
    code: `export const NorAIDesignTokens = {
  canvas: {
    base: '#F5F0EA',      // Heavy archival parchment
    paper: '#FDFBF7',     // Elevated clean paper surface
    sunken: '#EDE7DF',    // Recessed hardware track
  },
  ink: {
    primary: '#0D253D',   // Deep authoritative navy ink
    body: '#3D4F5F',      // Muted slate reading prose
    secondary: '#364757', // Metadata & technical readouts
  },
  accent: {
    terracotta: '#C2553A', // Primary signature interactive accent
    sage: '#5B8A72',       // Ephemeral telemetry & verified signals
    ochre: '#B8860B',      // Regional intelligence & district badges
  },
  radiiFormula: (outerPx: number, gapPx: number) => Math.max(4, outerPx - gapPx),
} as const;`,
  },
  {
    id: 'growth-engine',
    name: 'Inbound Acquisition & Routing Schema',
    package: '@norai/growth-engine',
    author: 'Annanta Singh',
    authorRole: 'Digital Marketing Lead',
    version: 'v1.4.0',
    latencyTarget: 'Typed Routing Contract',
    summary:
      'Multi-channel inbound lead routing, organic search attribution, and automated institutional partner matching algorithms.',
    icon: TrendingUp,
    language: 'typescript',
    code: `import { z } from 'zod';

export const InboundLeadRoutingSchema = z.object({
  partnerType: z.enum(['COLLEGIATE_CAMPUS', 'GRAM_PANCHAYAT', 'CSR_SPONSOR', 'ENTERPRISE']),
  districtLocation: z.string(),
  urgencyBand: z.enum(['SCHEDULE_THIS_WEEK', 'NEXT_MONTH_COHORT', 'GENERAL_INQUIRY']),
  routingTarget: z.string().email(),
  responseTarget: z.enum(['NEXT_WORKING_DAY']),
});

export function routeInboundInquiry(lead: z.infer<typeof InboundLeadRoutingSchema>) {
  // Routes to the relevant engineering or institutional coordinator
  return { routed: true, timestamp: Date.now(), queue: 'HIGH_PRIORITY_UP_REGIONAL' };
}`,
  },
  {
    id: 'governance-sla',
    name: 'High-Stakes Security & Reliability Guardrails',
    package: '@norai/governance-guardrails',
    author: 'Dhruw Singh',
    authorRole: 'Founder & Head of Operations',
    version: 'v2.0.0',
    latencyTarget: 'Fail-Safe by Design',
    summary:
      'Fail-safe operational defaults, automated heartbeat failover, and data residency and compliance obligations set per contract.',
    icon: ShieldCheck,
    language: 'typescript',
    code: `export interface OperationalGuardrail {
  serviceLevelAgreement: 'SET_PER_ENGAGEMENT';
  dataRetentionPolicy: 'ZERO_PERSISTENCE_TRANSIENT_RAM';
  failoverProtocol: 'MULTI_TIER_FALLBACK_QUEUE';
  institutionalCompliance: 'UP_STATE_SKILL_MISSION_COMPLIANT';
  verificationStatus: 'CONTINUOUS_AUDIT_ACTIVE';
}

export const noraiGovernanceConfig: OperationalGuardrail = {
  serviceLevelAgreement: 'SET_PER_ENGAGEMENT',
  dataRetentionPolicy: 'ZERO_PERSISTENCE_TRANSIENT_RAM',
  failoverProtocol: 'MULTI_TIER_FALLBACK_QUEUE',
  institutionalCompliance: 'UP_STATE_SKILL_MISSION_COMPLIANT',
  verificationStatus: 'CONTINUOUS_AUDIT_ACTIVE',
};`,
  },
];

export function TechnicalArtifactsLedger() {
  const [activeTab, setActiveTab] = useState<string>('orchestration-schema');
  const [copied, setCopied] = useState<boolean>(false);

  const matchedArtifact = ARTIFACTS.find((a) => a.id === activeTab);
  const currentArtifact: TechnicalArtifact = matchedArtifact || DEFAULT_ARTIFACT;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentArtifact.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full space-y-6 font-sans text-left">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(13,37,61,0.08)] pb-4">
        {ARTIFACTS.map((artifact) => {
          const Icon = artifact.icon;
          const isActive = activeTab === artifact.id;
          return (
            <button
              key={artifact.id}
              type="button"
              onClick={() => setActiveTab(artifact.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 ${
                isActive
                  ? 'text-ink-primary font-semibold'
                  : 'text-ink-secondary hover:text-ink-primary bg-canvas-sunken/40'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeArtifactTab"
                  className="absolute inset-0 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-xs"
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? 'text-terra-600' : 'text-ink-secondary'}`}
                />
                <span>{artifact.name}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Code Inspector Frame */}
      <div className="rounded-3xl border border-[rgba(13,37,61,0.12)] bg-bg-dark text-white overflow-hidden shadow-xl">
        {/* Hardware Chrome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-[#0B1E32]">
          <div className="flex items-center gap-3">
            {/* Traffic Light LEDs */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-terra-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-ochre-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-sage-500" />
            </div>

            <div className="flex items-center gap-2 pl-2">
              <Terminal className="w-4 h-4 text-white/50" />
              <span className="font-mono text-xs font-semibold text-white/90">
                {currentArtifact.package}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70">
                {currentArtifact.version}
              </span>
            </div>
          </div>

          {/* Right Telemetry & Copy Action */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="font-mono text-[11px] text-sage-300 flex items-center gap-1">
              <Zap className="w-3 h-3 text-sage-400" />
              <span>{currentArtifact.latencyTarget}</span>
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-white transition-all active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied Schema</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white/70" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Author Attribution Strip */}
        <div className="px-6 py-2.5 bg-white/[0.03] border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="text-white/60">
            Architected by:{' '}
            <span className="text-white font-semibold">{currentArtifact.author}</span> (
            {currentArtifact.authorRole})
          </div>
          <div className="text-white/50 text-[11px]">{currentArtifact.summary}</div>
        </div>

        {/* Code Content */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Artifact code snippet"
          className="p-6 overflow-x-auto bg-[var(--bg-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mint)]"
        >
          <pre className="font-mono text-xs leading-relaxed text-sky-100/90 selection:bg-[var(--mint-ink)] selection:text-white">
            <code>{currentArtifact.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
