export type CandidateStatus = 'Top Match' | 'Shortlisted' | 'Review Queue' | 'Rejected';

export interface SkillVector {
  label: string;
  matchScore: number; // 0 to 100
  evidence: string;
}

export interface CandidateEvaluation {
  id: string;
  name: string;
  currentRole: string;
  experienceYears: string;
  compositeScore: number; // 0 to 100
  status: CandidateStatus;
  oneLineVerdict: string;
  skillVectors: SkillVector[];
  keyStrengths: string[];
  missingRequirements: string[];
  potentialRedFlags: string[];
  interviewQuestions: string[];
}

export interface ResumeShortlistResult {
  batchId: string;
  jobTitle: string;
  totalEvaluated: number;
  shortlistedCount: number;
  summaryOverview: string;
  evaluationRubric: {
    criteriaName: string;
    weightPercentage: number;
    description: string;
  }[];
  candidates: CandidateEvaluation[];
  telemetry?: TelemetryMetrics;
}

export interface TelemetryMetrics {
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  modelUsed: string;
  ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED';
  timestamp: string;
}

export interface ByokSettings {
  apiKey: string;
  preferredModel:
    | 'gemini-3.5-lite'
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-1.5-flash';
}

export interface ShortlistPreset {
  id: string;
  title: string;
  category: string;
  jobTitle: string;
  jobDescription: string;
  customWeights: { [skill: string]: number };
  sampleResumesText: string;
  precomputedResult: ResumeShortlistResult;
}
