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
  preferredModel: 'gemini-3.5-lite' | 'gemini-1.5-flash' | 'gemini-1.5-pro';
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
export type TopicStatus = 'RESOLVED' | 'IN PROGRESS' | 'ACTIVE DEBATE';
export type ActionPriorityCode = 'P0' | 'P1' | 'P2' | 'P3';
export type ActionItemStatus = 'Open' | 'In Progress' | 'Completed';

export interface TopicCluster {
  id: string;
  topicName: string;
  channelOrContext: string;
  messageCount: number;
  sentiment: 'Positive' | 'Neutral' | 'Mixed' | 'Negative';
  sentimentScore: number; // 0 to 100
  summary: string;
  keyQuotations: string[];
  status?: TopicStatus;
  channelTags?: string[];
  participantHandles?: string[];
  impactSummary?: string;
}

export interface ActionAssignee {
  name: string;
  handle: string;
  role?: string;
}

export interface ActionItemOrBug {
  id: string;
  type: 'Bug Report' | 'Feature Request' | 'Question' | 'Community Action';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  priorityCode?: ActionPriorityCode;
  title: string;
  description: string;
  reporterHandle: string;
  recommendedTriage: string;
  status?: ActionItemStatus;
  assignee?: ActionAssignee;
  sourceMessageRef?: string;
  targetIntegration?: 'Slack' | 'Linear' | 'GitHub' | 'Notion';
}

export interface RawChatMessage {
  id: string;
  timestamp: string;
  author: string;
  channel: string;
  content: string;
  isSignal: boolean;
  signalConfidence: number; // 0 to 100
  category?: 'Bug' | 'Announcement' | 'Feature' | 'Question' | 'Spam' | 'General';
}

export interface CommunityChatResult {
  communityName: string;
  timeframeCovered: string;
  totalRawMessages: number;
  filteredSignalMessages: number;
  spamFilteredPercentage: number;
  overallSentiment:
    | 'Bullish / Enthusiastic'
    | 'Healthy & Constructive'
    | 'Neutral'
    | 'Frustrated / Needs Attention';
  sentimentScore: number;
  executiveBrief: string;
  topicClusters: TopicCluster[];
  actionItemsAndBugs: ActionItemOrBug[];
  rawMessages?: RawChatMessage[];
  activeChannels?: string[];
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
  hindiDepartmentOrMinistry?: string;
  category:
    | 'Govt Employment'
    | 'Public Policy'
    | 'Civic Notice'
    | 'Industrial Incentive'
    | 'Govt Recruitment & Jobs'
    | 'Infrastructure & Smart City'
    | 'Education & Scholarships';
  urgencyLevel: 'Critical Deadline' | 'Active Window' | 'Upcoming Notification';
  deadlineDate: string;
  hindiDeadlineDate?: string;
  daysRemaining: number;
  vacanciesOrScope: string;
  hindiVacanciesOrScope?: string;
  salaryBandOrBudget: string;
  hindiSalaryBandOrBudget?: string;
  eligibilitySnippet: string;
  hindiEligibilitySnippet?: string;
  officialPortalUrl: string;
  verifiedSourceRef: string;
  officialSealReference?: string;
  verificationSealNumber?: string;
  isVerifiedOfficial?: boolean;
  antiRumorNote?: string;
  hindiAntiRumorNote?: string;
  minAge?: number;
  maxAge?: number;
  requiredDegrees?: string[];
  categoryRelaxations?: Record<string, number>;
  feeStructure?: Record<string, string>;
  hindiFeeStructure?: Record<string, string>;
  applicationStartDate?: string;
  portalName?: string;
}

export interface EligibilityMatrixRow {
  postOrNotification: string;
  hindiPostOrNotification?: string;
  ageCriteria: string;
  hindiAgeCriteria?: string;
  qualification: string;
  hindiQualification?: string;
  reservationQuotas: string;
  hindiReservationQuotas?: string;
  applicationFee: string;
  hindiApplicationFee?: string;
  selectionProcess: string;
  hindiSelectionProcess?: string;
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
