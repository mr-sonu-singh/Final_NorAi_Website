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
    latency: '< 0.35s',
    iconName: 'Sparkles',
    problem: [
      'Recruiters waste 15+ hours weekly manually scanning hundreds of unstructured candidate resumes.',
      'Manual keyword searches miss qualified talent and introduce inconsistent screening standards.',
    ],
    solution: [
      'NorAI parses incoming resumes in memory, extracting verified technical skill vectors and experience timelines.',
      'Generates a structured JSON score card with weighted qualification rankings and key candidate highlights.',
    ],
    features: [
      {
        title: 'Multi-Format Parsing',
        desc: 'Extract structured candidate profiles from PDF, DOCX, and plain text resumes instantaneously.',
      },
      {
        title: 'Weighted Skill Scoring',
        desc: 'Match candidates against specific job descriptions using custom skill weights and experience thresholds.',
      },
      {
        title: 'Structured JSON Payload',
        desc: 'Receive clean, validated JSON outputs ready to sync directly into your ATS or internal HR dashboard.',
      },
      {
        title: 'Zero Permanent Storage',
        desc: 'Candidate files are processed ephemerally in memory and flushed immediately after scoring.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Submit Resume Payload',
        desc: 'Send resume documents via REST API endpoint or drag-and-drop web dashboard.',
      },
      {
        step: '02',
        title: 'Neural Skill Extraction',
        desc: 'NorAI extracts education history, technical skills, and project relevance scores.',
      },
      {
        step: '03',
        title: 'Receive Ranked Scoring',
        desc: 'Get immediate candidate match percentage and qualification summary.',
      },
    ],
    pricing: [
      {
        tier: 'Starter',
        price: '$49/mo',
        desc: 'Ideal for early-stage startups hiring 5-10 roles per month.',
        features: [
          '500 Resume Parses/mo',
          'Standard Skill Matching',
          'Dashboard Access',
          'Email Support',
        ],
      },
      {
        tier: 'Pro',
        price: '$149/mo',
        desc: 'For growing teams requiring API access and ATS integration.',
        features: [
          '3,000 Resume Parses/mo',
          'Custom Skill Weighting',
          'REST API Access',
          'Priority SLA Support',
        ],
        highlighted: true,
      },
      {
        tier: 'Scale',
        price: '$399/mo',
        desc: 'High-volume recruiting agencies & enterprise HR operations.',
        features: [
          '10,000 Resume Parses/mo',
          'Private Webhook Queues',
          'Dedicated Support',
          '99.9% Uptime SLA',
        ],
      },
    ],
    faq: [
      {
        question: 'What file formats does the AI Resume Shortlister support?',
        answer:
          'The parser supports PDF, Microsoft Word (.doc, .docx), and plain text (.txt) candidate resumes.',
      },
      {
        question: 'Is candidate data stored or used for AI model training?',
        answer:
          'No. All candidate files are processed ephemerally in RAM and flushed immediately upon response completion in accordance with our Zero Persistent Logging security standard.',
      },
      {
        question: 'Can I connect the API to my existing ATS software?',
        answer:
          'Yes! Our REST API returns standard JSON payloads that integrate seamlessly with greenhouse, Lever, Workday, or custom HR portals.',
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
      'Transform lecture audio, video transcripts, and slides into study briefs & flashcards.',
    excerpt:
      'Convert hours of educational content into structured chapter summaries, interactive flashcards, key takeaways, and self-assessment quizzes.',
    latency: '< 0.41s',
    iconName: 'Zap',
    problem: [
      'Students and researchers struggle to retain key concepts from long 2-hour lecture video recordings.',
      'Manual note-taking takes hours away from active learning, problem solving, and concept revision.',
    ],
    solution: [
      'NorAI processes video transcripts and audio tracks into organized, high-density study outlines.',
      'Automatically generates interactive digital flashcards and chapter quizzes for rapid concept mastery.',
    ],
    features: [
      {
        title: 'Chapter Segmentation',
        desc: 'Automatically break long transcripts into logical topic sections with timestamped headings.',
      },
      {
        title: 'Flashcard Generation',
        desc: 'Extract key formulas, definitions, and core concepts into study-ready Q&A flashcard decks.',
      },
      {
        title: 'Multi-Lingual Support',
        desc: 'Summarize lectures recorded in English, Hindi, and regional languages with high accuracy.',
      },
      {
        title: 'Export Formats',
        desc: 'Download generated study guides in Markdown, Notion, PDF, or JSON formats.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Upload Transcript or Audio',
        desc: 'Paste a video URL, transcript text, or audio file into the processing console.',
      },
      {
        step: '02',
        title: 'Intelligent Digesting',
        desc: 'NorAI identifies core thesis points, key formulas, and main definitions.',
      },
      {
        step: '03',
        title: 'Study Guide & Flashcards',
        desc: 'Export structured chapter briefs and interactive flashcard decks instantly.',
      },
    ],
    pricing: [
      {
        tier: 'Starter',
        price: '$29/mo',
        desc: 'Perfect for individual students and self-learners.',
        features: [
          '30 Hours Lecture Processing/mo',
          'Markdown & PDF Exports',
          'Flashcard Generator',
          'Community Support',
        ],
      },
      {
        tier: 'Educator',
        price: '$99/mo',
        desc: 'Designed for course creators and university teaching assistants.',
        features: [
          '150 Hours Processing/mo',
          'Quiz Generator',
          'API & Webhook Access',
          'Priority Support',
        ],
        highlighted: true,
      },
      {
        tier: 'Institutional',
        price: '$299/mo',
        desc: 'For universities, LMS platforms, and online academies.',
        features: [
          '500 Hours Processing/mo',
          'LMS Integration',
          'Custom Branding',
          '99.9% Uptime SLA',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I upload video files directly or do I need a transcript?',
        answer:
          'You can provide video transcript text, YouTube links, or standard MP3/WAV audio files for automated processing.',
      },
      {
        question: 'Are flashcards exportable to study apps like Anki?',
        answer:
          'Yes! Generated flashcards can be exported as CSV, JSON, or text formats compatible with Anki and Quizlet.',
      },
    ],
  },

  'chat-digest': {
    slug: 'chat-digest',
    id: 'TOOL_03',
    title: 'Chat Digest & Newsletter AI',
    seoTitle: 'Chat Digest & Newsletter AI',
    badge: 'Community Summarization',
    tagline: 'Digest noisy community chat channels into daily executive briefs & newsletters.',
    excerpt:
      'Extract actionable feedback, sentiment trends, product bugs, and top discussion topics from Telegram, Discord, and Slack channels.',
    latency: '< 0.28s',
    iconName: 'Cpu',
    problem: [
      'Community managers and founders miss critical user feedback hidden inside thousands of daily chat messages.',
      'Manually writing community newsletters and weekly updates requires tedious message scanning.',
    ],
    solution: [
      'NorAI aggregates daily channel exports, filtering out spam and casual banter to isolate high-signal discussions.',
      'Delivers an executive daily brief highlighting top bug reports, feature requests, and newsletter highlights.',
    ],
    features: [
      {
        title: 'Noise & Spam Filtering',
        desc: 'Automatically filter out casual banter, memes, and spam to focus on high-value community insights.',
      },
      {
        title: 'Action Item Extraction',
        desc: 'Identify reported software bugs, customer questions, and product feature requests.',
      },
      {
        title: 'Automated Newsletter Generation',
        desc: 'Format top community discussions into ready-to-send email newsletter drafts.',
      },
      {
        title: 'Multi-Channel Support',
        desc: 'Connect Telegram channels, Discord servers, and Slack workspaces seamlessly.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Connect Channel Export',
        desc: 'Sync channel webhooks or paste chat transcript exports.',
      },
      {
        step: '02',
        title: 'Signal Extraction',
        desc: 'NorAI categorizes messages by sentiment, feature requests, and support queries.',
      },
      {
        step: '03',
        title: 'Daily Executive Digest',
        desc: 'Receive curated daily digests via email or Slack notification.',
      },
    ],
    pricing: [
      {
        tier: 'Community',
        price: '$39/mo',
        desc: 'For indie creators & single community channels.',
        features: [
          '2 Channels Connected',
          'Daily Digest Briefs',
          'Spam Filtering',
          'Email Support',
        ],
      },
      {
        tier: 'Pro Manager',
        price: '$119/mo',
        desc: 'For active Web3, SaaS, and open-source communities.',
        features: [
          '10 Channels Connected',
          'Newsletter Generator',
          'Webhook Notifications',
          'Priority Support',
        ],
        highlighted: true,
      },
      {
        tier: 'Enterprise',
        price: '$299/mo',
        desc: 'For multi-brand organizations with large community operations.',
        features: [
          'Unlimited Channels',
          'Custom Sentiment Models',
          'Dedicated Account Manager',
          'SLA Guarantees',
        ],
      },
    ],
    faq: [
      {
        question: 'Does the tool read private messages or user data?',
        answer:
          'No. The bot only accesses public messages in channels where it is explicitly installed or text transcripts provided via API.',
      },
      {
        question: 'Can I schedule automated daily email digests?',
        answer:
          'Yes! You can configure automated daily or weekly email dispatches sent to your team at designated times.',
      },
    ],
  },

  'smart-dainik-news': {
    slug: 'smart-dainik-news',
    id: 'TOOL_04',
    title: 'Smart Dainik News',
    seoTitle: 'Smart Dainik News',
    badge: 'Regional Intelligence',
    tagline: 'Hyper-local regional news curation & topic tracking with sentiment briefings.',
    excerpt:
      'Track sector trends, local news events, and market intelligence categorized by geographic relevance and sentiment metrics.',
    latency: '< 0.45s',
    iconName: 'Layers',
    problem: [
      'Media teams and market analysts drown in uncurated news feeds and duplicate press releases.',
      'Regional and local language news often lacks structured metadata and automated sentiment tagging.',
    ],
    solution: [
      'NorAI aggregates RSS feeds, regional news API sources, and web publications into categorized briefings.',
      'Applies sentiment analysis, entity extraction, and deduplication to produce clean media digests.',
    ],
    features: [
      {
        title: 'Regional Curation',
        desc: 'Filter news updates by specific state, district, or industry sector.',
      },
      {
        title: 'Sentiment & Entity Tagging',
        desc: 'Automatically tag articles with company names, key figures, and positive/negative sentiment scores.',
      },
      {
        title: 'Duplicate Removal',
        desc: 'Group syndicated articles and press releases into single topic story clusters.',
      },
      {
        title: 'Custom RSS & Webhook Feeds',
        desc: 'Export curated news briefings to custom webhooks or JSON feeds.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Define Topics & Regions',
        desc: 'Specify industry keywords, region preferences, and tracking topics.',
      },
      {
        step: '02',
        title: 'Aggregation & Tagging',
        desc: 'NorAI deduplicates incoming news stories and applies sentiment metadata.',
      },
      {
        step: '03',
        title: 'Curated Briefings',
        desc: 'Access real-time JSON feeds or receive daily executive news dispatches.',
      },
    ],
    pricing: [
      {
        tier: 'Analyst',
        price: '$59/mo',
        desc: 'For researchers and independent media analysts.',
        features: [
          '5 Keyword Trackers',
          'Daily News Briefings',
          'Basic Sentiment Analysis',
          'Email Support',
        ],
      },
      {
        tier: 'Media Hub',
        price: '$179/mo',
        desc: 'For regional newsrooms and corporate PR teams.',
        features: [
          '25 Keyword Trackers',
          'Real-Time Webhooks',
          'Advanced Entity Extraction',
          'Priority Support',
        ],
        highlighted: true,
      },
      {
        tier: 'Enterprise',
        price: '$449/mo',
        desc: 'For large media networks and institutional market intelligence.',
        features: [
          'Unlimited Trackers',
          'Custom NLP Models',
          'Dedicated Data Pipeline',
          '99.9% Uptime SLA',
        ],
      },
    ],
    faq: [
      {
        question: 'Which regional languages are supported?',
        answer:
          'The news aggregator supports English, Hindi, and major Indian regional language news feeds.',
      },
      {
        question: 'Can I export news data via REST API?',
        answer:
          'Yes! All curated news clusters and sentiment metrics are accessible via REST API endpoints.',
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
