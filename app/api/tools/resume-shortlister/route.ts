import {
  ResumeShortlistInputSchema,
  ResumeShortlistOutputSchema,
  GEMINI_RESUME_SHORTLIST_RESPONSE_SCHEMA,
} from '@/lib/tools/schemas';
import { SYSTEM_PROMPT_RESUME_SHORTLISTER, buildResumeShortlistPrompt } from '@/lib/tools/prompts';
import { createToolHandler } from '@/lib/tools/handler';

export const runtime = 'edge';

const POST = createToolHandler({
  routeName: 'resume-shortlister',
  inputSchema: ResumeShortlistInputSchema,
  outputSchema: ResumeShortlistOutputSchema,
  responseJsonSchema: GEMINI_RESUME_SHORTLIST_RESPONSE_SCHEMA,
  systemPrompt: SYSTEM_PROMPT_RESUME_SHORTLISTER,
  buildPrompt: buildResumeShortlistPrompt,
  temperature: 0.1,
});

export { POST };
