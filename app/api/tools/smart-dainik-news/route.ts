import {
  DainikNewsInputSchema,
  DainikNewsOutputSchema,
  GEMINI_DAINIK_NEWS_RESPONSE_SCHEMA,
} from '@/lib/tools/schemas';
import { SYSTEM_PROMPT_SMART_DAINIK_NEWS, buildSmartDainikNewsPrompt } from '@/lib/tools/prompts';
import { createToolHandler } from '@/lib/tools/handler';

export const runtime = 'edge';

const POST = createToolHandler({
  routeName: 'smart-dainik-news',
  inputSchema: DainikNewsInputSchema,
  outputSchema: DainikNewsOutputSchema,
  responseJsonSchema: GEMINI_DAINIK_NEWS_RESPONSE_SCHEMA,
  systemPrompt: SYSTEM_PROMPT_SMART_DAINIK_NEWS,
  buildPrompt: buildSmartDainikNewsPrompt,
});

export { POST };
