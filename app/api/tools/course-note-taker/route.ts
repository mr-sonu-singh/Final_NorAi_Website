import {
  CourseNotesInputSchema,
  CourseNotesOutputSchema,
  GEMINI_COURSE_NOTES_RESPONSE_SCHEMA,
} from '@/lib/tools/schemas';
import { SYSTEM_PROMPT_COURSE_NOTE_TAKER, buildCourseNotesPrompt } from '@/lib/tools/prompts';
import { createToolHandler } from '@/lib/tools/handler';

export const runtime = 'edge';

const POST = createToolHandler({
  routeName: 'course-note-taker',
  inputSchema: CourseNotesInputSchema,
  outputSchema: CourseNotesOutputSchema,
  responseJsonSchema: GEMINI_COURSE_NOTES_RESPONSE_SCHEMA,
  systemPrompt: SYSTEM_PROMPT_COURSE_NOTE_TAKER,
  buildPrompt: buildCourseNotesPrompt,
});

export { POST };
