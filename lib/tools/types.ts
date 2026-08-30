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

// Course Note-Taker Interfaces
export interface FormulaOrCodeSnippet {
  label: string;
  formulaOrSnippet: string;
  explanation: string;
}

export interface ChapterSummary {
  id: string;
  timestamp: string; // e.g. "00:00 - 14:30"
  title: string;
  summary: string;
  keyTakeaways: string[];
  formulasOrCode?: FormulaOrCodeSnippet[];
}

export interface Flashcard {
  id: string;
  category: string;
  frontPrompt: string;
  backAnswer: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
}

export interface CourseNotesResult {
  lectureTitle: string;
  instructorOrSource: string;
  estimatedDuration: string;
  executiveAbstract: string;
  coreAxioms: string[];
  chapters: ChapterSummary[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  telemetry?: TelemetryMetrics;
}

export interface CourseNotesPreset {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  focusMode: 'Comprehensive Study Guide' | 'Formulas & Axioms' | 'Exam Cram & Quizzes';
  sampleTranscriptText: string;
  precomputedResult: CourseNotesResult;
}

// Community Chat Digest Interfaces
export interface TopicCluster {
  id: string;
  topicName: string;
  channelOrContext: string;
  messageCount: number;
  sentiment: 'Positive' | 'Neutral' | 'Mixed' | 'Negative';
  sentimentScore: number; // 0 to 100
  summary: string;
  keyQuotations: string[];
}

export interface ActionItemOrBug {
  id: string;
  type: 'Bug Report' | 'Feature Request' | 'Question' | 'Community Action';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  reporterHandle: string;
  recommendedTriage: string;
}

export interface CommunityChatResult {
  communityName: string;
  timeframeCovered: string;
  totalRawMessages: number;
  filteredSignalMessages: number;
  spamFilteredPercentage: number;
  overallSentiment: 'Bullish / Enthusiastic' | 'Healthy & Constructive' | 'Neutral' | 'Frustrated / Needs Attention';
  sentimentScore: number;
  executiveBrief: string;
  topicClusters: TopicCluster[];
  actionItemsAndBugs: ActionItemOrBug[];
  formattedNewsletter: {
    headline: string;
    introParagraph: string;
    spotlightSection: string;
    communityShoutouts: string[];
    closingCallToAction: string;
  };
  telemetry?: TelemetryMetrics;
}

export interface ChatDigestPreset {
  id: string;
  title: string;
  platform: 'Discord' | 'Telegram' | 'Slack';
  communityName: string;
  timeframe: 'Last 24 Hours' | 'Past 7 Days';
  sampleChatLogText: string;
  precomputedResult: CommunityChatResult;
}

// Smart Dainik News / Regional Gazette Interfaces
export interface GazetteAlertCard {
  id: string;
  title: string;
  hindiTitle: string;
  departmentOrMinistry: string;
  category: 'Govt Employment' | 'Public Policy' | 'Civic Notice' | 'Industrial Incentive';
  urgencyLevel: 'Critical Deadline' | 'Active Window' | 'Upcoming Notification';
  deadlineDate: string;
  daysRemaining: number;
  vacanciesOrScope: string;
  salaryBandOrBudget: string;
  eligibilitySnippet: string;
  officialPortalUrl: string;
  verifiedSourceRef: string;
}

export interface EligibilityMatrixRow {
  postOrNotification: string;
  ageCriteria: string;
  qualification: string;
  reservationQuotas: string;
  applicationFee: string;
  selectionProcess: string;
}

export interface DainikNewsResult {
  editionDate: string;
  stateOrRegion: string;
  totalNotificationsAnalyzed: number;
  verifiedGazetteCount: number;
  englishSummaryHeadline: string;
  hindiSummaryHeadline: string;
  executiveBriefEnglish: string;
  executiveBriefHindi: string;
  alertCards: GazetteAlertCard[];
  eligibilityMatrix: EligibilityMatrixRow[];
  factValidationNotes: string[];
  telemetry?: TelemetryMetrics;
}

export interface DainikNewsPreset {
  id: string;
  title: string;
  stateOrRegion: string;
  domain: string;
  languageMode: 'Bilingual (Hindi + English)' | 'English' | 'Hindi';
  sampleGazetteText: string;
  precomputedResult: DainikNewsResult;
}
