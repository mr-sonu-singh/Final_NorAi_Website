import {
  CommunityChatInputSchema,
  CommunityChatOutputSchema,
  GEMINI_CHAT_DIGEST_RESPONSE_SCHEMA,
} from '@/lib/tools/schemas';
import { SYSTEM_PROMPT_CHAT_DIGEST, buildChatDigestPrompt } from '@/lib/tools/prompts';
import { createToolHandler } from '@/lib/tools/handler';

export const runtime = 'edge';

const POST = createToolHandler({
  routeName: 'chat-digest',
  inputSchema: CommunityChatInputSchema,
  outputSchema: CommunityChatOutputSchema,
  responseJsonSchema: GEMINI_CHAT_DIGEST_RESPONSE_SCHEMA,
  systemPrompt: SYSTEM_PROMPT_CHAT_DIGEST,
  buildPrompt: buildChatDigestPrompt,
});

export { POST };
