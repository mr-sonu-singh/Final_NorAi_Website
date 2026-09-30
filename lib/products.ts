export interface ProductData {
  slug: string;
  id: string;
  title: string;
  /** Search/OG title, kept short so the brand suffix stays within 60 chars. */
  seoTitle?: string;
  badge: string;
  tagline: string;
  excerpt: string;
  latency: string;
  iconName: string;
  problem: string[];
  solution: string[];
  features: Array<{
    title: string;
    desc: string;
  }>;
  workflow: Array<{
    step: string;
    title: string;
    desc: string;
  }>;
  pricing: Array<{
    tier: string;
    price: string;
    desc: string;
    features: string[];
    highlighted?: boolean;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export const PRODUCTS_DATA: Record<string, ProductData> = {
  'resume-shortlister': {
    slug: 'resume-shortlister',
    id: 'TOOL_01',
    title: 'AI Resume Shortlister',
    seoTitle: 'AI Resume Shortlister',
    badge: 'Recruitment Automation',
    tagline: 'Automated candidate screening and match scoring for high-volume hiring teams.',
    excerpt:
      'Parse PDF/Word resumes, extract core engineering skills, and generate objective qualification scores matched against your job specifications.',
    latency: 'PDF · DOCX · TXT · Markdown · CSV',
    iconName: 'Sparkles',
    problem: [
      'Recruiters burn entire days scanning hundreds of unstructured resumes by hand, in a queue that never clears.',
      'Manual keyword searches miss qualified talent and introduce inconsistent screening standards.',
    ],
    solution: [
      'NorAI parses incoming resumes in memory, extracting technical skill vectors with the evidence behind every score.',
      'Generates a structured JSON score card with weighted qualification rankings, red flags, and calibrated interview questions.',
    ],
    features: [
      {
        title: 'Multi-Format Parsing',
        desc: 'Drop PDF, DOCX, TXT, Markdown, or CSV resumes in, or paste the text straight into the workbench.',
      },
      {
        title: 'Weighted Skill Scoring',
        desc: 'Score each candidate against your job description using per-skill weights and a cutoff threshold you set.',
      },
      {
        title: 'Structured JSON Payload',
        desc: 'Every field is validated by a Zod schema before it reaches the screen. Copy the JSON, or export the batch as CSV or Markdown.',
      },
      {
        title: 'No NorAI Storage',
        desc: 'NorAI keeps no candidate file and no database. The request goes to Google with your key and the response comes back to your tab.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Drop In The Batch',
        desc: 'Add resume files to the workbench, or paste them separated by a --- RESUME --- delimiter.',
      },
      {
        step: '02',
        title: 'Skill Vector Extraction',
        desc: 'NorAI pulls out technical skills, work history, and the evidence line behind each one.',
      },
      {
        step: '03',
        title: 'Read The Scorecard',
        desc: 'Get a composite score, skill-by-skill breakdowns, red flags, and 2-4 probing interview questions per candidate.',
      },
    ],
    pricing: [
      {
        tier: 'Free',
        price: 'Your own Gemini key',
        desc: 'One tier. No trial, no card, no seat count. NorAI never bills you, and the inference you trigger is billed by Google to you.',
        features: [
          'Runs entirely in your browser',
          '30 requests / 5 minutes, per IP',
          'No NorAI account, no login',
          'You pay Google directly for your own inference',
        ],
      },
    ],
    faq: [
      {
        question: 'What file formats does the AI Resume Shortlister support?',
        answer:
          'The parser accepts PDF, Microsoft Word (.doc, .docx), plain text (.txt), Markdown, CSV, and JSON, or you can paste resume text directly.',
      },
      {
        question: 'Is candidate data stored or used for AI model training?',
        answer:
          'Not by us. NorAI holds no database and writes nothing to disk — the request is forwarded to Google with your key and the response returns to your browser. Google\'s own retention terms apply to their inference.',
      },
      {
        question: 'Can I connect the API to my existing ATS software?',
        answer:
          'There is no public NorAI API to connect to. The tool runs in your browser and hands you validated JSON, which you can copy into Greenhouse, Lever, Workday, or your own portal, or export as CSV. If you want a real, automated pipeline into your ATS, that is a services engagement — talk to us about it.',
      },
    ],
  },

  'course-note-taker': {
    slug: 'course-note-taker',
    id: 'TOOL_02',
    title: 'AI Course Note-Taker',
    seoTitle: 'AI Course Note-Taker',
    badge: 'EdTech Summarization',
    tagline:
      'Turn lecture transcripts and notes into structured chapter briefs, flashcards, and self-assessment quizzes.',
    excerpt:
      'Convert hours of educational content into structured chapter summaries, interactive flashcards, key takeaways, and self-assessment quizzes.',
    latency: 'TXT · PDF · DOCX · VTT · SRT · Markdown',
    iconName: 'Zap',
    problem: [
      'Students and researchers struggle to retain key concepts from long 2-hour lecture video recordings.',
      'Manual note-taking takes hours away from active learning, problem solving, and concept revision.',
    ],
    solution: [
      'NorAI turns lecture transcripts and raw notes into chapterised study outlines with the formulas preserved.',
      'Generates active-recall flashcards and chapter quizzes graded by difficulty, for rapid concept revision.',
    ],
    features: [
      {
        title: 'Chapter Segmentation',
        desc: 'Break a long transcript into logical topic sections with estimated timestamp spans and per-chapter takeaways.',
      },
      {
        title: 'Flashcard Generation',
        desc: 'Extract key formulas, definitions, and core concepts into a study deck graded Foundational, Intermediate, or Advanced.',
      },
      {
        title: 'Multi-Lingual Support',
        desc: 'Handle English, Hindi, and mixed Devanagari-Latin transcripts without a translation step in between.',
      },
      {
        title: 'Export Formats',
        desc: 'Download the study guide as Markdown or the flashcard deck as CSV — no account needed to keep the output.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Supply The Transcript',
        desc: 'Paste transcript text or drop a TXT, PDF, DOCX, VTT, SRT, Markdown, CSV, or JSON file into the workbench.',
      },
      {
        step: '02',
        title: 'Intelligent Digesting',
        desc: 'NorAI identifies the core thesis, the axioms, and every formula or code snippet the lecture turns on.',
      },
      {
        step: '03',
        title: 'Study Guide & Flashcards',
        desc: 'Read the chapterised brief, flashcards, and practice quiz in the workbench, then export as Markdown or CSV.',
      },
    ],
    pricing: [
      {
        tier: 'Free',
        price: 'Your own Gemini key',
        desc: 'No classroom licence and no seat count. Bring a key and process as many lectures as your own Google quota allows.',
        features: [
          'Runs entirely in your browser',
          '30 requests / 5 minutes, per IP',
          'Markdown study guide + CSV flashcard export',
          'No NorAI account, no login',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I upload video files directly or do I need a transcript?',
        answer:
          'You need the text. Drop a transcript, notes file, or subtitle track (TXT, PDF, DOCX, VTT, SRT, Markdown, CSV, JSON) and NorAI synthesises from that. There is no audio or video transcriber here — pull auto-generated captions off YouTube yourself and paste them in.',
      },
      {
        question: 'Are flashcards exportable to study apps like Anki?',
        answer:
          'The deck exports as CSV with one front/back pair per row, which is the shape Anki\'s basic import expects. We do not ship an Anki plugin or a hosted sync service — you own the file.',
      },
    ],
  },

  'chat-digest': {
    slug: 'chat-digest',
    id: 'TOOL_03',
    title: 'Chat Digest & Newsletter AI',
    seoTitle: 'Chat Digest & Newsletter AI',
    badge: 'Community Summarization',
    tagline: 'Digest a noisy community export into an executive brief, action log, and newsletter draft.',
    excerpt:
      'Extract actionable feedback, sentiment read, product bugs, and top discussion topics from a pasted Telegram, Discord, or Slack export.',
    latency: 'Discord · Telegram · Slack exports',
    iconName: 'Cpu',
    problem: [
      'Community managers and founders miss critical user feedback hidden inside thousands of daily chat messages.',
      'Manually writing community newsletters and weekly updates requires tedious message scanning.',
    ],
    solution: [
      'NorAI reads a channel export and filters spam and casual banter to isolate the discussions worth a decision.',
      'Delivers an executive brief covering topic clusters, reported bugs, feature requests, and a newsletter draft.',
    ],
    features: [
      {
        title: 'Noise & Spam Filtering',
        desc: 'Filter out greetings, memes, bot messages, and off-topic banter to focus on high-value community insights.',
      },
      {
        title: 'Action Item Extraction',
        desc: 'Surface reported bugs, requested features, and unanswered questions — each tagged Urgent, High, Medium, or Low with a triage suggestion.',
      },
      {
        title: 'Newsletter Draft Generation',
        desc: 'Get a draft with headline, intro, spotlight section, member shoutouts, and a call to action. You send it; NorAI does not.',
      },
      {
        title: 'Bring Your Own Export',
        desc: 'Paste a channel log or drop a TXT, JSON, CSV, LOG, or Markdown dump. No bot install, no OAuth, no read access to your server.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Paste Channel Export',
        desc: 'Drop in an export file, or paste multi-channel chat logs straight into the workbench.',
      },
      {
        step: '02',
        title: 'Signal Extraction',
        desc: 'NorAI clusters messages by topic and scores the aggregate sentiment of the community.',
      },
      {
        step: '03',
        title: 'Read The Executive Brief',
        desc: 'Review clusters, action items, and the newsletter draft in the workbench, then export as Markdown or CSV.',
      },
    ],
    pricing: [
      {
        tier: 'Free',
        price: 'Your own Gemini key',
        desc: 'Not a community-management subscription. Paste an export, read the digest, send the newsletter yourself.',
        features: [
          'Runs entirely in your browser',
          '30 requests / 5 minutes, per IP',
          'Markdown digest + CSV action-item export',
          'No bot install, no NorAI account',
        ],
      },
    ],
    faq: [
      {
        question: 'Does the tool read private messages or user data?',
        answer:
          'No. There is no bot. NorAI never connects to your Discord, Telegram, or Slack workspace and holds no server credentials — it only ever sees the export text you paste or drop in yourself.',
      },
      {
        question: 'Can I schedule automated daily email digests?',
        answer:
          'No. There is no scheduler, no mailer, and no saved history to draw on. You get the digest in the workbench at the moment you run it, and you can export it as Markdown or CSV to wire into whatever delivery you already use.',
      },
    ],
  },

  'smart-dainik-news': {
    slug: 'smart-dainik-news',
    id: 'TOOL_04',
    title: 'Smart Dainik News',
    seoTitle: 'Smart Dainik News',
    badge: 'Regional Intelligence',
    tagline: 'Regional gazette and employment-notice parsing with bilingual citizen briefings.',
    excerpt:
      'Turn gazette notices, recruitment circulars, and press releases into deadline-tracked alert cards, an eligibility matrix, and bilingual briefs.',
    latency: 'Gazette text · PDF · TXT · DOCX',
    iconName: 'Layers',
    problem: [
      'Media teams and market analysts drown in uncurated news feeds and duplicate press releases.',
      'Regional and local language notices often lack structured metadata and any kind of eligibility breakdown.',
    ],
    solution: [
      'NorAI structures gazette notices, recruitment circulars, and press-release text into categorised, deadline-tracked alert cards.',
      'Returns parallel English and Hindi briefs plus a side-by-side eligibility matrix and anti-rumor checks.',
    ],
    features: [
      {
        title: 'Regional Curation',
        desc: 'Set the state or jurisdiction and the domain focus before parsing, so the brief lands on your territory.',
      },
      {
        title: 'Bilingual Executive Briefs',
        desc: 'Every notification comes back with parallel English and Devanagari summaries, alert titles included.',
      },
      {
        title: 'Eligibility Matrix',
        desc: 'Tabulate age limits, qualifications, reservation quotas, fee structure, and selection stages side by side.',
      },
      {
        title: 'Anti-Rumor Verification',
        desc: 'Carry the gazette serial reference on each alert card, with explicit fact-check notes against unauthorised claims.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Define State & Language',
        desc: 'Choose the jurisdiction, domain focus, and language mode — bilingual Hindi + English, English, or Hindi.',
      },
      {
        step: '02',
        title: 'Alert Extraction',
        desc: 'NorAI pulls out deadlines, days remaining, vacancies, pay bands, and official portal links from the pasted text.',
      },
      {
        step: '03',
        title: 'Read The Briefs',
        desc: 'Review the bilingual summaries, eligibility matrix, and fact-check notes, then apply through the official portal yourself.',
      },
    ],
    pricing: [
      {
        tier: 'Free',
        price: 'Your own Gemini key',
        desc: 'No media-monitoring contract. Paste the gazette text, read the eligibility matrix, open the official portal yourself.',
        features: [
          'Runs entirely in your browser',
          '30 requests / 5 minutes, per IP',
          'Bilingual English + Devanagari briefs',
          'No NorAI account, no login',
        ],
      },
    ],
    faq: [
      {
        question: 'Which regional languages are supported?',
        answer:
          'You pick the language mode per run: bilingual Hindi + English, English, or Hindi. NorAI handles mixed Devanagari and Latin script in the same paste.',
      },
      {
        question: 'Can I export news data via REST API?',
        answer:
          'No — there is no public NorAI API, no SDK, and no scheduler. The tool runs in your browser and hands you structured JSON you can copy; automated ingestion from RSS or a ministry endpoint is a services engagement we build for you.',
      },
    ],
  },
};

// Pre-rename slugs are NOT aliased into this map. Aliasing made
// `generateStaticParams` prerender a second URL for the same document, so three
// products were reachable at two addresses each and all of them landed in the
// sitemap. Old inbound links are handled by permanent redirects in
// next.config.ts, which is the correct mechanism: one canonical URL per
// document, and a single hop for anything that still points at the old path.
