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
