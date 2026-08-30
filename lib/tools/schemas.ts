import { z } from 'zod';

export const SkillVectorSchema = z.object({
  label: z.string().describe('Skill or competency evaluated, e.g. "Distributed Systems"'),
  matchScore: z.number().min(0).max(100).describe('Score from 0 to 100 on this specific competency'),
  evidence: z.string().describe('Direct evidence or justification found in candidate experience'),
});

export const CandidateEvaluationSchema = z.object({
  id: z.string().describe('Unique identifier e.g. "cand-01"'),
  name: z.string().describe('Candidate full name'),
  currentRole: z.string().describe('Most recent job title or designation'),
  experienceYears: z.string().describe('Years of relevant experience, e.g. "5 yrs exp"'),
  compositeScore: z.number().min(0).max(100).describe('Overall match score from 0 to 100'),
  status: z.enum(['Top Match', 'Shortlisted', 'Review Queue', 'Rejected']).describe('Qualification categorization'),
  oneLineVerdict: z.string().describe('A concise 1-sentence assessment summarizing candidate fitness'),
  skillVectors: z.array(SkillVectorSchema).min(1).describe('Breakdown of individual technical competencies'),
  keyStrengths: z.array(z.string()).min(1).describe('Top accomplishments and matching qualifications'),
  missingRequirements: z.array(z.string()).describe('Required qualifications not clearly demonstrated'),
  potentialRedFlags: z.array(z.string()).describe('Potential concerns such as job tenure, unverified claims, or skill mismatches'),
  interviewQuestions: z.array(z.string()).min(2).describe('Targeted technical questions to probe during the interview'),
});

export const ResumeShortlistOutputSchema = z.object({
  batchId: z.string().describe('Unique batch evaluation identifier'),
  jobTitle: z.string().describe('Target job title evaluated against'),
  totalEvaluated: z.number().int().describe('Total number of candidates in this batch'),
  shortlistedCount: z.number().int().describe('Number of candidates who passed the qualification threshold'),
  summaryOverview: z.string().describe('High-level executive overview of candidate quality across the pool'),
  evaluationRubric: z.array(
    z.object({
      criteriaName: z.string(),
      weightPercentage: z.number(),
      description: z.string(),
    })
  ).describe('The scoring criteria and weights applied during evaluation'),
  candidates: z.array(CandidateEvaluationSchema).min(1).describe('Ranked list of evaluated candidates'),
});

export const ResumeShortlistInputSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  jobDescription: z.string().min(10, 'Job description must be at least 10 characters'),
  customWeights: z.record(z.string(), z.number()).optional(),
  minThreshold: z.number().min(0).max(100).default(75),
  resumesText: z.string().min(20, 'Please provide candidate resume content to evaluate'),
});

export type ResumeShortlistInput = z.infer<typeof ResumeShortlistInputSchema>;
export type ResumeShortlistOutput = z.infer<typeof ResumeShortlistOutputSchema>;

// JSON Schema for Gemini structured output API
export const GEMINI_RESUME_SHORTLIST_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    batchId: { type: 'STRING' },
    jobTitle: { type: 'STRING' },
    totalEvaluated: { type: 'INTEGER' },
    shortlistedCount: { type: 'INTEGER' },
    summaryOverview: { type: 'STRING' },
    evaluationRubric: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          criteriaName: { type: 'STRING' },
          weightPercentage: { type: 'NUMBER' },
          description: { type: 'STRING' },
        },
        required: ['criteriaName', 'weightPercentage', 'description'],
      },
    },
    candidates: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          name: { type: 'STRING' },
          currentRole: { type: 'STRING' },
          experienceYears: { type: 'STRING' },
          compositeScore: { type: 'NUMBER' },
          status: {
            type: 'STRING',
            enum: ['Top Match', 'Shortlisted', 'Review Queue', 'Rejected'],
          },
          oneLineVerdict: { type: 'STRING' },
          skillVectors: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                label: { type: 'STRING' },
                matchScore: { type: 'NUMBER' },
                evidence: { type: 'STRING' },
              },
              required: ['label', 'matchScore', 'evidence'],
            },
          },
          keyStrengths: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          missingRequirements: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          potentialRedFlags: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          interviewQuestions: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
        },
        required: [
          'id',
          'name',
          'currentRole',
          'experienceYears',
          'compositeScore',
          'status',
          'oneLineVerdict',
          'skillVectors',
          'keyStrengths',
          'missingRequirements',
          'potentialRedFlags',
          'interviewQuestions',
        ],
      },
    },
  },
  required: [
    'batchId',
    'jobTitle',
    'totalEvaluated',
    'shortlistedCount',
    'summaryOverview',
    'evaluationRubric',
    'candidates',
  ],
};

// COURSE NOTE-TAKER SCHEMAS
export const FormulaOrCodeSnippetSchema = z.object({
  label: z.string().describe('Name or label of the theorem, formula, or code concept'),
  formulaOrSnippet: z.string().describe('LaTeX formatted math e.g. $$\\nabla L(\\theta)$$ or formatted code syntax'),
  explanation: z.string().describe('Concise breakdown of terms and practical meaning'),
});

export const ChapterSummarySchema = z.object({
  id: z.string().describe('Unique chapter ID e.g. "ch-01"'),
  timestamp: z.string().describe('Estimated video/audio timestamp span e.g. "00:00 - 14:30"'),
  title: z.string().describe('Descriptive chapter or topic heading'),
  summary: z.string().describe('Comprehensive paragraph explaining concepts covered in this chapter'),
  keyTakeaways: z.array(z.string()).min(2).describe('Bullet points of critical takeaways and axioms'),
  formulasOrCode: z.array(FormulaOrCodeSnippetSchema).optional().describe('Key formulas or code definitions extracted in this chapter'),
});

export const FlashcardSchema = z.object({
  id: z.string().describe('Flashcard ID e.g. "card-01"'),
  category: z.string().describe('Domain or topic tag e.g. "Consensus Rules"'),
  frontPrompt: z.string().describe('High-yield recall question or prompt on the front of the flashcard'),
  backAnswer: z.string().describe('Clear, definitive answer and conceptual explanation on the back'),
  difficulty: z.enum(['Foundational', 'Intermediate', 'Advanced']).describe('Cognitive difficulty level'),
});

export const QuizQuestionSchema = z.object({
  id: z.string().describe('Question ID e.g. "q-01"'),
  question: z.string().describe('Conceptual assessment question testing deep understanding'),
  options: z.array(z.string()).length(4).describe('4 multiple choice answer options (A, B, C, D)'),
  correctAnswerIndex: z.number().int().min(0).max(3).describe('0-indexed position of the correct option'),
  explanation: z.string().describe('Detailed explanation of why the correct option is right and others are distractors'),
  topic: z.string().describe('Specific lecture chapter or topic being tested'),
});

export const CourseNotesOutputSchema = z.object({
  lectureTitle: z.string().describe('Extracted or refined lecture title'),
  instructorOrSource: z.string().describe('Instructor, university, or platform name'),
  estimatedDuration: z.string().describe('Estimated lecture length based on transcript density e.g. "~45 mins"'),
  executiveAbstract: z.string().describe('High-density abstract summarizing core thesis and outcomes'),
  coreAxioms: z.array(z.string()).min(3).describe('Foundational rules, invariants, and fundamental principles'),
  chapters: z.array(ChapterSummarySchema).min(2).describe('Chronological chapter segments with takeaways'),
  flashcards: z.array(FlashcardSchema).min(4).describe('Active recall study flashcards'),
  quiz: z.array(QuizQuestionSchema).min(3).describe('Self-assessment multiple choice practice quiz'),
});

export const CourseNotesInputSchema = z.object({
  lectureTitle: z.string().min(2, 'Lecture title is required'),
  subject: z.string().min(2, 'Subject or domain is required'),
  instructor: z.string().optional().default(''),
  focusMode: z
    .enum(['Comprehensive Study Guide', 'Formulas & Axioms', 'Exam Cram & Quizzes'])
    .default('Comprehensive Study Guide'),
  transcriptText: z.string().min(30, 'Please provide lecture transcript or lecture notes text'),
});

export type CourseNotesInput = z.infer<typeof CourseNotesInputSchema>;
export type CourseNotesOutput = z.infer<typeof CourseNotesOutputSchema>;

export const GEMINI_COURSE_NOTES_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    lectureTitle: { type: 'STRING' },
    instructorOrSource: { type: 'STRING' },
    estimatedDuration: { type: 'STRING' },
    executiveAbstract: { type: 'STRING' },
    coreAxioms: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    chapters: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          timestamp: { type: 'STRING' },
          title: { type: 'STRING' },
          summary: { type: 'STRING' },
          keyTakeaways: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          formulasOrCode: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                label: { type: 'STRING' },
                formulaOrSnippet: { type: 'STRING' },
                explanation: { type: 'STRING' },
              },
              required: ['label', 'formulaOrSnippet', 'explanation'],
            },
          },
        },
        required: ['id', 'timestamp', 'title', 'summary', 'keyTakeaways'],
      },
    },
    flashcards: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          category: { type: 'STRING' },
          frontPrompt: { type: 'STRING' },
          backAnswer: { type: 'STRING' },
          difficulty: {
            type: 'STRING',
            enum: ['Foundational', 'Intermediate', 'Advanced'],
          },
        },
        required: ['id', 'category', 'frontPrompt', 'backAnswer', 'difficulty'],
      },
    },
    quiz: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          question: { type: 'STRING' },
          options: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          correctAnswerIndex: { type: 'INTEGER' },
          explanation: { type: 'STRING' },
          topic: { type: 'STRING' },
        },
        required: [
          'id',
          'question',
          'options',
          'correctAnswerIndex',
          'explanation',
          'topic',
        ],
      },
    },
  },
  required: [
    'lectureTitle',
    'instructorOrSource',
    'estimatedDuration',
    'executiveAbstract',
    'coreAxioms',
    'chapters',
    'flashcards',
    'quiz',
  ],
};

// COMMUNITY CHAT DIGEST SCHEMAS
export const TopicClusterSchema = z.object({
  id: z.string().describe('Unique cluster identifier e.g. "topic-01"'),
  topicName: z.string().describe('Descriptive name of the discussion topic or feature area'),
  channelOrContext: z.string().describe('Primary channel e.g. "#engineering", "#general", "#bugs"'),
  messageCount: z.number().int().describe('Estimated message volume dedicated to this topic'),
  sentiment: z.enum(['Positive', 'Neutral', 'Mixed', 'Negative']).describe('Dominant tone of participants'),
  sentimentScore: z.number().min(0).max(100).describe('Sentiment score from 0 (very negative) to 100 (very positive)'),
  summary: z.string().describe('Synthesized overview of what community members discussed and concluded'),
  keyQuotations: z.array(z.string()).describe('Direct notable quotes illustrating user sentiments or questions'),
});

export const ActionItemOrBugSchema = z.object({
  id: z.string().describe('Unique action ID e.g. "bug-01"'),
  type: z.enum(['Bug Report', 'Feature Request', 'Question', 'Community Action']).describe('Categorization'),
  priority: z.enum(['Urgent', 'High', 'Medium', 'Low']).describe('Severity/priority classification'),
  title: z.string().describe('Concise headline of the reported bug or request'),
  description: z.string().describe('Detailed context, reproduction steps, or request rationale'),
  reporterHandle: z.string().describe('Username or handle of the primary community member'),
  recommendedTriage: z.string().describe('Recommended action for the engineering or mod team'),
});

export const CommunityChatOutputSchema = z.object({
  communityName: z.string().describe('Extracted or configured community name'),
  timeframeCovered: z.string().describe('Time window represented in the chat logs'),
  totalRawMessages: z.number().int().describe('Total raw messages ingested'),
  filteredSignalMessages: z.number().int().describe('High-signal messages after filtering memes, spam, and banter'),
  spamFilteredPercentage: z.number().describe('Percentage of low-signal banter and bot spam eliminated'),
  overallSentiment: z.enum([
    'Bullish / Enthusiastic',
    'Healthy & Constructive',
    'Neutral',
    'Frustrated / Needs Attention',
  ]).describe('Aggregated community health indicator'),
  sentimentScore: z.number().min(0).max(100).describe('Composite sentiment index (0-100)'),
  executiveBrief: z.string().describe('High-density summary of key events, discussions, and community consensus'),
  topicClusters: z.array(TopicClusterSchema).min(2).describe('Clustered topic threads with sentiment'),
  actionItemsAndBugs: z.array(ActionItemOrBugSchema).min(2).describe('Extracted bugs, feature requests, and inquiries'),
  formattedNewsletter: z.object({
    headline: z.string(),
    introParagraph: z.string(),
    spotlightSection: z.string(),
    communityShoutouts: z.array(z.string()),
    closingCallToAction: z.string(),
  }).describe('Ready-to-dispatch weekly or daily community email newsletter draft'),
});

export const CommunityChatInputSchema = z.object({
  communityName: z.string().min(2, 'Community name is required'),
  platform: z.enum(['Discord', 'Telegram', 'Slack']).default('Discord'),
  timeframe: z.enum(['Last 24 Hours', 'Past 7 Days']).default('Last 24 Hours'),
  chatLogText: z.string().min(30, 'Please provide chat log messages to digest'),
});

export type CommunityChatInput = z.infer<typeof CommunityChatInputSchema>;
export type CommunityChatOutput = z.infer<typeof CommunityChatOutputSchema>;

export const GEMINI_CHAT_DIGEST_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    communityName: { type: 'STRING' },
    timeframeCovered: { type: 'STRING' },
    totalRawMessages: { type: 'INTEGER' },
    filteredSignalMessages: { type: 'INTEGER' },
    spamFilteredPercentage: { type: 'NUMBER' },
    overallSentiment: {
      type: 'STRING',
      enum: [
        'Bullish / Enthusiastic',
        'Healthy & Constructive',
        'Neutral',
        'Frustrated / Needs Attention',
      ],
    },
    sentimentScore: { type: 'NUMBER' },
    executiveBrief: { type: 'STRING' },
    topicClusters: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          topicName: { type: 'STRING' },
          channelOrContext: { type: 'STRING' },
          messageCount: { type: 'INTEGER' },
          sentiment: {
            type: 'STRING',
            enum: ['Positive', 'Neutral', 'Mixed', 'Negative'],
          },
          sentimentScore: { type: 'NUMBER' },
          summary: { type: 'STRING' },
          keyQuotations: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
        },
        required: [
          'id',
          'topicName',
          'channelOrContext',
          'messageCount',
          'sentiment',
          'sentimentScore',
          'summary',
          'keyQuotations',
        ],
      },
    },
    actionItemsAndBugs: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          type: {
            type: 'STRING',
            enum: ['Bug Report', 'Feature Request', 'Question', 'Community Action'],
          },
          priority: {
            type: 'STRING',
            enum: ['Urgent', 'High', 'Medium', 'Low'],
          },
          title: { type: 'STRING' },
          description: { type: 'STRING' },
          reporterHandle: { type: 'STRING' },
          recommendedTriage: { type: 'STRING' },
        },
        required: [
          'id',
          'type',
          'priority',
          'title',
          'description',
          'reporterHandle',
          'recommendedTriage',
        ],
      },
    },
    formattedNewsletter: {
      type: 'OBJECT',
      properties: {
        headline: { type: 'STRING' },
        introParagraph: { type: 'STRING' },
        spotlightSection: { type: 'STRING' },
        communityShoutouts: {
          type: 'ARRAY',
          items: { type: 'STRING' },
        },
        closingCallToAction: { type: 'STRING' },
      },
      required: [
        'headline',
        'introParagraph',
        'spotlightSection',
        'communityShoutouts',
        'closingCallToAction',
      ],
    },
  },
  required: [
    'communityName',
    'timeframeCovered',
    'totalRawMessages',
    'filteredSignalMessages',
    'spamFilteredPercentage',
    'overallSentiment',
    'sentimentScore',
    'executiveBrief',
    'topicClusters',
    'actionItemsAndBugs',
    'formattedNewsletter',
  ],
};

// SMART DAINIK NEWS / REGIONAL GAZETTE SCHEMAS
export const GazetteAlertCardSchema = z.object({
  id: z.string().describe('Unique alert ID e.g. "alert-01"'),
  title: z.string().describe('English headline describing the recruitment, scheme, or notification'),
  hindiTitle: z.string().describe('Hindi title in Devanagari script'),
  departmentOrMinistry: z.string().describe('Government department or commission e.g. "UPPSC", "DSSSB"'),
  category: z.enum([
    'Govt Employment',
    'Public Policy',
    'Civic Notice',
    'Industrial Incentive',
  ]).describe('Category classification'),
  urgencyLevel: z.enum([
    'Critical Deadline',
    'Active Window',
    'Upcoming Notification',
  ]).describe('Time sensitivity status'),
  deadlineDate: z.string().describe('Application last date or effective gazette date e.g. "15 October 2026"'),
  daysRemaining: z.number().int().describe('Estimated days remaining until deadline'),
  vacanciesOrScope: z.string().describe('Total vacant posts or financial allocation e.g. "4,200 Posts"'),
  salaryBandOrBudget: z.string().describe('Pay level or grant amount e.g. "Pay Matrix Level 7 (₹44,900 - ₹1,42,400)"'),
  eligibilitySnippet: z.string().describe('Key eligibility prerequisites (Degree, Age, Experience)'),
  officialPortalUrl: z.string().describe('Verified official government portal URL'),
  verifiedSourceRef: z.string().describe('Gazette notification reference number'),
});

export const EligibilityMatrixRowSchema = z.object({
  postOrNotification: z.string().describe('Specific post or scheme title'),
  ageCriteria: z.string().describe('Permitted age window and relaxation rules'),
  qualification: z.string().describe('Educational degree or technical certifications required'),
  reservationQuotas: z.string().describe('Category breakdown (Gen, OBC, SC, ST, EWS)'),
  applicationFee: z.string().describe('Official fee requirements by category'),
  selectionProcess: z.string().describe('Stages of evaluation (Prelims, Mains, Interview, Physical)'),
});

export const DainikNewsOutputSchema = z.object({
  editionDate: z.string().describe('Edition date or issue timestamp'),
  stateOrRegion: z.string().describe('Target Indian state or central jurisdiction'),
  totalNotificationsAnalyzed: z.number().int().describe('Total gazette notifications parsed'),
  verifiedGazetteCount: z.number().int().describe('Verified official items'),
  englishSummaryHeadline: z.string().describe('Executive summary headline in English'),
  hindiSummaryHeadline: z.string().describe('Executive summary headline in Hindi'),
  executiveBriefEnglish: z.string().describe('Comprehensive English executive briefing'),
  executiveBriefHindi: z.string().describe('Comprehensive Hindi executive briefing in Devanagari'),
  alertCards: z.array(GazetteAlertCardSchema).min(2).describe('Actionable citizen and jobseeker alert cards'),
  eligibilityMatrix: z.array(EligibilityMatrixRowSchema).min(2).describe('Detailed tabular criteria comparison'),
  factValidationNotes: z.array(z.string()).min(2).describe('Anti-rumor checks and official gazette citations'),
});

export const DainikNewsInputSchema = z.object({
  stateOrRegion: z.string().min(2, 'State or region is required'),
  domain: z.string().default('Govt Jobs & Public Notifications'),
  languageMode: z
    .enum(['Bilingual (Hindi + English)', 'English', 'Hindi'])
    .default('Bilingual (Hindi + English)'),
  gazetteText: z.string().min(30, 'Please provide gazette or press release text to analyze'),
});

export type DainikNewsInput = z.infer<typeof DainikNewsInputSchema>;
export type DainikNewsOutput = z.infer<typeof DainikNewsOutputSchema>;

export const GEMINI_DAINIK_NEWS_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    editionDate: { type: 'STRING' },
    stateOrRegion: { type: 'STRING' },
    totalNotificationsAnalyzed: { type: 'INTEGER' },
    verifiedGazetteCount: { type: 'INTEGER' },
    englishSummaryHeadline: { type: 'STRING' },
    hindiSummaryHeadline: { type: 'STRING' },
    executiveBriefEnglish: { type: 'STRING' },
    executiveBriefHindi: { type: 'STRING' },
    alertCards: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          title: { type: 'STRING' },
          hindiTitle: { type: 'STRING' },
          departmentOrMinistry: { type: 'STRING' },
          category: {
            type: 'STRING',
            enum: [
              'Govt Employment',
              'Public Policy',
              'Civic Notice',
              'Industrial Incentive',
            ],
          },
          urgencyLevel: {
            type: 'STRING',
            enum: [
              'Critical Deadline',
              'Active Window',
              'Upcoming Notification',
            ],
          },
          deadlineDate: { type: 'STRING' },
          daysRemaining: { type: 'INTEGER' },
          vacanciesOrScope: { type: 'STRING' },
          salaryBandOrBudget: { type: 'STRING' },
          eligibilitySnippet: { type: 'STRING' },
          officialPortalUrl: { type: 'STRING' },
          verifiedSourceRef: { type: 'STRING' },
        },
        required: [
          'id',
          'title',
          'hindiTitle',
          'departmentOrMinistry',
          'category',
          'urgencyLevel',
          'deadlineDate',
          'daysRemaining',
          'vacanciesOrScope',
          'salaryBandOrBudget',
          'eligibilitySnippet',
          'officialPortalUrl',
          'verifiedSourceRef',
        ],
      },
    },
    eligibilityMatrix: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          postOrNotification: { type: 'STRING' },
          ageCriteria: { type: 'STRING' },
          qualification: { type: 'STRING' },
          reservationQuotas: { type: 'STRING' },
          applicationFee: { type: 'STRING' },
          selectionProcess: { type: 'STRING' },
        },
        required: [
          'postOrNotification',
          'ageCriteria',
          'qualification',
          'reservationQuotas',
          'applicationFee',
          'selectionProcess',
        ],
      },
    },
    factValidationNotes: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
  },
  required: [
    'editionDate',
    'stateOrRegion',
    'totalNotificationsAnalyzed',
    'verifiedGazetteCount',
    'englishSummaryHeadline',
    'hindiSummaryHeadline',
    'executiveBriefEnglish',
    'executiveBriefHindi',
    'alertCards',
    'eligibilityMatrix',
    'factValidationNotes',
  ],
};
