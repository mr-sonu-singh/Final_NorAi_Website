import os

print("--- Writing Redesign Components ---")

# 1. Update ProductsIndexClient.tsx
products_path = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/app/(marketing)/products/ProductsIndexClient.tsx"
with open(products_path, "w", encoding="utf-8") as f:
    f.write('''\'use client\';

import React, { useState } from \'react\';
import { Container } from \'@/components/foundation/Container\';
import { Link } from \'@/components/atoms/Link\';
import { motion, AnimatePresence } from \'motion/react\';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Terminal,
  Activity,
} from \'lucide-react\';
import { cn } from \'@/lib/utils\';

export interface CatalogToolItem {
  number: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  metric: string;
  inputFormat: string;
  outputFormat: string;
  highlights: string[];
  accent: string;
  badgeBg: string;
  badgeText: string;
  telemetryStream: {
    inputSample: string;
    engine: string;
    stat: string;
    snippet: string;
  };
}

export const CATALOG_TOOLS: CatalogToolItem[] = [
  {
    number: \'01\',
    slug: \'resume-shortlister\',
    title: \'AI Resume Shortlister\',
    category: \'Recruitment AI\',
    tagline:
      \'Screen hundreds of engineering resumes in seconds with sub-second vector scoring and weighted skills matching.\',
    metric: \'< 0.35s / PDF\',
    inputFormat: \'PDF, DOCX, TXT\',
    outputFormat: \'Ranked Scorecard & Validated JSON\',
    highlights: [
      \'Multi-format resume parsing with zero permanent storage\',
      \'Custom skill vector weighting and experience thresholds\',
      \'ATS-compatible structured JSON export\',
    ],
    accent: \'var(--mint)\',
    badgeBg: \'bg-[var(--mint)]/15\',
    badgeText: \'text-[var(--mint-ink)]\',
    telemetryStream: {
      inputSample: \'540 Engineering Resumes (Batch #0482)\',
      engine: \'pgvector In-Memory Cosine Similarity\',
      stat: \'0.28s Execution · 94.2% Relevance Match\',
      snippet: \'{\\n  "candidate_id": "eng-7402",\\n  "score": 0.942,\\n  "skills_matched": ["Rust", "Distributed Systems", "vLLM"],\\n  "verdict": "SHORTLIST_STAGE_1"\\n}\',
    },
  },
  {
    number: \'02\',
    slug: \'course-note-taker\',
    title: \'Course Note-Taker\',
    category: \'EdTech & Study AI\',
    tagline:
      \'Transform raw lecture recordings, videos, and slide decks into executive study notes and interactive flashcards.\',
    metric: \'Real-Time Audio NLP\',
    inputFormat: \'MP3, WAV, MP4, YouTube\',
    outputFormat: \'Markdown, Notion & SRS Flashcards\',
    highlights: [
      \'LaTeX math formula extraction and rendering\',
      \'Interactive 3D study flashcards with spaced repetition\',
      \'100% free scholar access for students\',
    ],
    accent: \'var(--lavender)\',
    badgeBg: \'bg-[var(--lavender)]/25\',
    badgeText: \'text-[#4e3a8c]\',
    telemetryStream: {
      inputSample: \'Stanford CS229 Lecture Audio (1hr 42m)\',
      engine: \'Whisper-v3 Transient Streaming + KaTeX Parser\',
      stat: \'42 LaTeX Equations Extracted · 0 Storage Retained\',
      snippet: \'## Gradient Descent Optimization\\n$$\\\\nabla f(\\\\theta) = \\\\frac{1}{m} \\\\sum_{i=1}^m (h_\\\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$$\\n- Verified: Converges in 14 iterations\\n- SRS Flashcard #12 generated\',
    },
  },
  {
    number: \'03\',
    slug: \'chat-digest\',
    title: \'Community Chat Digest\',
    category: \'Community AI\',
    tagline:
      \'Condense thousands of unread Slack, Discord, and Telegram team messages into structured executive decisions.\',
    metric: \'4,820 msgs ➔ 3 points\',
    inputFormat: \'Slack, Discord, TG exports\',
    outputFormat: \'Chronological Decisions & Action Items\',
    highlights: [
      \'Noise filtering with thread deduplication & priority scoring\',
      \'Action item extraction with assignees and dead-ends flagged\',
      \'Executive 3-bullet morning dispatch generation\',
    ],
    accent: \'var(--coral)\',
    badgeBg: \'bg-[var(--coral)]/20\',
    badgeText: \'text-[#b83818]\',
    telemetryStream: {
      inputSample: \'4,820 unread team messages (#core-dev, #general)\',
      engine: \'Deterministic Graph Cluster & Action Extractor\',
      stat: \'96.4% Noise Rejected · 3 Key Decisions Extracted\',
      snippet: \'• Decision 01: PR #892 merged to main; API v2 deployed\\n• Decision 02: Database migration scheduled for 02:00 UTC\\n• Action Item: @sonu to sign off on WebGPU shader telemetry\',
    },
  },
  {
    number: \'04\',
    slug: \'smart-dainik-news\',
    title: \'Smart Dainik News\',
    category: \'Regional Intelligence\',
    tagline:
      \'Hyper-local regional news and public employment alerts clustered across Hindi and English feeds.\',
    metric: \'Bilingual Feeds (EN/HI)\',
    inputFormat: \'UP Gazette, Regional Wires, RSS\',
    outputFormat: \'Verified Employment Alerts\',
    highlights: [
      \'Bi-directional Hindi/English public notification parsing\',
      \'Official UP public service commission alert verification\',
      \'Zero advertising clutter or clickbait filtering\',
    ],
    accent: \'var(--sky)\',
    badgeBg: \'bg-[var(--sky)]/25\',
    badgeText: \'text-[#16656e]\',
    telemetryStream: {
      inputSample: \'UP State Gazette Official PDF & 12 Regional Wires\',
      engine: \'Bilingual Hindi-English Cross-Modal Parser\',
      stat: \'100% Verified Public Source · 0 Ads · Zero Clickbait\',
      snippet: \'सूचना: उत्तर प्रदेश लोक सेवा आयोग भर्ती अधिसूचना 2026\\n[Verified UPPSC Dispatch #4902 · Eligibility: B.Tech / B.Sc]\\nDirect Application Portal: Active (Closes 30 Sep)\',
    },
  },
];

const CATEGORIES = [
  \'All\',
  \'Recruitment AI\',
  \'EdTech & Study AI\',
  \'Community AI\',
  \'Regional Intelligence\',
];

const ICON_MAP: Record<string, React.ElementType> = {
  \'resume-shortlister\': FileText,
  \'course-note-taker\': Headphones,
  \'chat-digest\': MessageSquare,
  \'smart-dainik-news\': Newspaper,
};

export function ProductsIndexClient() {
  const [activeCategory, setActiveCategory] = useState(\'All\');
  const [selectedSlug, setSelectedSlug] = useState(\'resume-shortlister\');

  const filteredTools =
    activeCategory === \'All\'
      ? CATALOG_TOOLS
      : CATALOG_TOOLS.filter((t) => t.category === activeCategory);

  const activeTool =
    filteredTools.find((t) => t.slug === selectedSlug) || filteredTools[0] || CATALOG_TOOLS[0];

  const ActiveIcon = ICON_MAP[activeTool.slug] || Sparkles;

  return (
    <div className=\"min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]\">
      {/* HERO CHAMBER */}
      <section className=\"relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]\">
        <div className=\"aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15\" aria-hidden=\"true\" />
        <div className=\"aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12\" aria-hidden=\"true\" />

        <Container size=\"default\" className=\"relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6\">
          <div className=\"max-w-3xl space-y-6 text-left\">
            <div className=\"inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase\">
              <span className=\"w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse\" aria-hidden=\"true\" />
              <span>— 01 · SOVEREIGN CAPABILITIES CATALOG</span>
            </div>

            <h1 className=\"font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]\">
              Four tools. <br />
              <span className=\"relative inline-block text-[var(--mint-ink)]\">
                Each solves one problem.
                <svg
                  className=\"absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]\"
                  viewBox=\"0 0 240 40\"
                  fill=\"none\"
                  preserveAspectRatio=\"none\"
                  aria-hidden=\"true\"
                >
                  <path d=\"M3 33C50 12 150 5 237 22\" stroke=\"currentColor\" strokeWidth=\"5\" strokeLinecap=\"round\" />
                </svg>
              </span>
            </h1>

            <p className=\"text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty\">
              Single-purpose AI instruments engineered for operational workflows. Zero cold storage,
              sub-second in-memory vector scoring, and complete data privacy.
            </p>

            <div className=\"pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]\">
              <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                <ShieldCheck className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                <span>Zero Cold-Storage Retention</span>
              </div>
              <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                <Zap className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                <span>Sub-Second Vector Execution</span>
              </div>
              <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                <Terminal className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                <span>REST API &amp; Web UI Ready</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* THE KINETIC SLIDING TOOL DECK & TELEMETRY WORKBENCH */}
      <section className=\"py-14 sm:py-20 border-b border-[var(--line)]\">
        <Container size=\"wide\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
          <div className=\"flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none\" role=\"tablist\">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type=\"button\"
                  role=\"tab\"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(cat);
                    const match =
                      cat === \'All\'
                        ? CATALOG_TOOLS[0]
                        : CATALOG_TOOLS.find((t) => t.category === cat);
                    if (match) setSelectedSlug(match.slug);
                  }}
                  className={cn(
                    \'px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-[0.98]\',
                    isSelected
                      ? \'bg-[var(--pine)] text-[#f5f5f0] shadow-sm font-semibold\'
                      : \'bg-[#fffdf7] text-[var(--pine)]/80 hover:bg-[var(--bone)] border border-[var(--line)]\',
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className=\"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start\">
            {/* Left Column: Precision Monospace Tool Ledger */}
            <div className=\"lg:col-span-5 space-y-3\">
              <span className=\"font-mono text-xs uppercase tracking-widest text-[var(--mint-ink)] font-bold block mb-3\">
                SELECT INSTRUMENT (01–04)
              </span>

              <div className=\"space-y-2\">
                {filteredTools.map((tool) => {
                  const isSelected = tool.slug === activeTool.slug;
                  const Icon = ICON_MAP[tool.slug] || Sparkles;

                  return (
                    <div
                      key={tool.slug}
                      onClick={() => setSelectedSlug(tool.slug)}
                      onMouseEnter={() => setSelectedSlug(tool.slug)}
                      className={cn(
                        \'p-5 rounded-2xl transition-all duration-200 cursor-pointer text-left border relative overflow-hidden group\',
                        isSelected
                          ? \'bg-[#072929] text-[#f5f5f0] border-transparent shadow-xl ring-1 ring-white/15\'
                          : \'bg-[#fffdf7] text-[var(--pine)] border-[var(--line)] hover:border-[var(--pine)]/30 hover:bg-[#fffdf7]/90\',
                      )}
                    >
                      {isSelected && (
                        <div className=\"absolute left-0 top-0 bottom-0 w-1.5 bg-[#00E599]\" />
                      )}

                      <div className=\"flex items-center justify-between gap-4\">
                        <div className=\"flex items-center gap-3\">
                          <div
                            className={cn(
                              \'w-10 h-10 rounded-xl flex items-center justify-center transition-colors border\',
                              isSelected
                                ? \'bg-white/10 text-[#00E599] border-white/10\'
                                : \'bg-[var(--porcelain)] text-[var(--pine)] border-[var(--line)]\',
                            )}
                          >
                            <Icon className=\"w-5 h-5\" />
                          </div>
                          <div>
                            <div className=\"flex items-center gap-2\">
                              <span className=\"font-mono text-xs font-bold text-[#00E599]\">
                                {tool.number}
                              </span>
                              <h3
                                className={cn(
                                  \'font-display text-lg font-bold tracking-tight\',
                                  isSelected ? \'text-white\' : \'text-[var(--pine)]\',
                                )}
                              >
                                {tool.title}
                              </h3>
                            </div>
                            <span
                              className={cn(
                                \'text-[11px] font-mono tracking-wide\',
                                isSelected ? \'text-[var(--bone-70)]\' : \'text-[var(--pine)]/60\',
                              )}
                            >
                              {tool.category}
                            </span>
                          </div>
                        </div>

                        <span
                          className={cn(
                            \'font-mono text-[11px] px-2.5 py-1 rounded-full border whitespace-nowrap\',
                            isSelected
                              ? \'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30\'
                              : \'bg-[var(--pine-08)] text-[var(--pine)] border-[var(--line)]\',
                          )}
                        >
                          {tool.metric}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Live Telemetry Workbench Stage */}
            <div className=\"lg:col-span-7\">
              <AnimatePresence mode=\"wait\">
                <motion.div
                  key={activeTool.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: \'easeOut\' }}
                  className=\"rounded-3xl bg-[#072929] border border-white/15 p-6 sm:p-9 text-[#f5f5f0] shadow-2xl relative overflow-hidden\"
                >
                  <div
                    className=\"absolute inset-0 opacity-10 pointer-events-none\"
                    style={{
                      backgroundImage: \'radial-gradient(circle, #00E599 1px, transparent 1px)\',
                      backgroundSize: \'24px 24px\',
                    }}
                    aria-hidden=\"true\"
                  />

                  <div className=\"relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5\">
                    <div className=\"flex items-center gap-3\">
                      <div className=\"w-11 h-11 rounded-xl bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]\">
                        <ActiveIcon className=\"w-6 h-6\" />
                      </div>
                      <div>
                        <div className=\"flex items-center gap-2\">
                          <span className=\"font-mono text-xs font-bold text-[#00E599]\">
                            ACTIVE CONSOLE
                          </span>
                          <span className=\"w-2 h-2 rounded-full bg-[#00E599] animate-pulse\" />
                        </div>
                        <h2 className=\"font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight\">
                          {activeTool.title}
                        </h2>
                      </div>
                    </div>

                    <span className=\"font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/30\">
                      {activeTool.metric}
                    </span>
                  </div>

                  <p className=\"relative z-10 text-sm sm:text-base text-[var(--bone-70)] leading-relaxed mt-4 font-normal\">
                    {activeTool.tagline}
                  </p>

                  <div className=\"relative z-10 my-6 rounded-2xl bg-black/40 border border-white/10 p-5 font-mono text-xs space-y-3\">
                    <div className=\"flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-[var(--bone-70)]\">
                      <span className=\"flex items-center gap-1.5 text-[#00E599]\">
                        <Activity className=\"w-3.5 h-3.5\" />
                        <span>RUNTIME TELEMETRY STREAM</span>
                      </span>
                      <span>IN-MEMORY · 0 BYTES EGRESS</span>
                    </div>

                    <div className=\"space-y-1 text-xs\">
                      <div className=\"text-[var(--bone-70)]\">
                        <span className=\"text-[#FFAE42]\">SOURCE:</span> {activeTool.telemetryStream.inputSample}
                      </div>
                      <div className=\"text-[var(--bone-70)]\">
                        <span className=\"text-[#00E599]\">ENGINE:</span> {activeTool.telemetryStream.engine}
                      </div>
                      <div className=\"text-[#00E599] font-semibold\">
                        STATUS: {activeTool.telemetryStream.stat}
                      </div>
                    </div>

                    <pre className=\"p-3.5 rounded-xl bg-black/60 border border-white/10 text-[#00E599] text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono\">
                      {activeTool.telemetryStream.snippet}
                    </pre>
                  </div>

                  <div className=\"relative z-10 space-y-2 border-t border-white/15 pt-4\">
                    {activeTool.highlights.map((point, idx) => (
                      <div key={idx} className=\"flex items-start gap-2.5 text-xs sm:text-sm text-[var(--bone-70)]\">
                        <CheckCircle2 className=\"w-4 h-4 text-[#00E599] shrink-0 mt-0.5\" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className=\"relative z-10 pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4\">
                    <span className=\"font-mono text-xs text-[var(--bone-70)]\">
                      Free to start · 50 sandbox credits
                    </span>

                    <Link
                      href={\'/products/\' + activeTool.slug}
                      className=\"bg-[#00E599] hover:bg-[#1ef4b4] text-[#072929] font-bold h-11 px-6 rounded-full inline-flex items-center gap-2 shadow-[0_10px_25px_-5px_rgba(0,229,153,0.4)] transition-all duration-200 active:scale-95\"
                      data-testid={
                        activeTool.slug === \'resume-shortlister\'
                          ? \'capability-link-resume-shortlister\'
                          : undefined
                      }
                    >
                      <span>Launch Tool</span>
                      <ArrowRight className=\"w-4 h-4\" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* CLOSING DISPATCH */}
      <section className=\"py-16 sm:py-24\">
        <Container size=\"default\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
          <div
            className=\"rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden\"
            style={{
              background: \'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)\',
            }}
          >
            <div className=\"max-w-3xl mx-auto space-y-6 text-[#072929]\">
              <div className=\"inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072929]/10 text-xs font-mono font-bold uppercase tracking-wider\">
                — HIGH-VOLUME &amp; PRIVATE VPC HOSTING
              </div>

              <h2 className=\"font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight\">
                Need dedicated endpoints or private VPC hosting?
              </h2>

              <p className=\"text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium\">
                All four tools provide dedicated REST API endpoints, custom latency SLAs, and air-gapped
                Docker/Helm containers running inside your private VPC with zero external training egress.
              </p>

              <div className=\"pt-4 flex flex-col sm:flex-row items-center justify-center gap-4\">
                <Link
                  href=\"/contact?service=enterprise-capacity\"
                  className=\"w-full sm:w-auto h-12 px-8 rounded-full bg-[#072929] hover:bg-[#0c3c3c] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all\"
                >
                  <span>Talk to an engineer</span>
                  <ArrowRight className=\"w-4 h-4\" />
                </Link>
                <Link
                  href=\"/services\"
                  className=\"w-full sm:w-auto h-12 px-7 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[#072929] font-bold text-sm inline-flex items-center justify-center transition-all\"
                >
                  <span>Explore Deliverables →</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
''')
print("✅ Updated ProductsIndexClient.tsx")

# 2. Create components/organisms/SpiralCapabilitiesMatrix/SpiralCapabilitiesMatrix.tsx
spiral_dir = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/components/organisms/SpiralCapabilitiesMatrix"
os.makedirs(spiral_dir, exist_ok=True)
with open(os.path.join(spiral_dir, "SpiralCapabilitiesMatrix.tsx"), "w", encoding="utf-8") as f:
    f.write('''\'use client\';

import React, { useState } from \'react\';
import { Container } from \'@/components/foundation/Container\';
import { motion, AnimatePresence } from \'motion/react\';
import { ArrowRight, CheckCircle2, Cpu, Database, Cloud, Glasses, Activity } from \'lucide-react\';
import { cn } from \'@/lib/utils\';

export interface CapabilityPractice {
  number: string;
  tag: string;
  title: string;
  summary: string;
  metric: string;
  accent: string;
  details: string[];
  telemetry: string;
  icon: React.ElementType;
}

export const CAPABILITY_PRACTICES: CapabilityPractice[] = [
  {
    number: \'01\',
    tag: \'DATA INGESTION\',
    title: \'Multi-Format Ingestion & Stream Extraction\',
    summary:
      \'Zero-egress stream parsing, layout-aware PDF tokenization, and sub-second extraction pipelines in transient RAM.\',
    metric: \'P95 Latency < 350ms\',
    accent: \'#00E599\',
    details: [
      \'Transient memory stream with 0 bytes written to cold disk\',
      \'Layout-aware bounding box extraction for multi-column tables\',
      \'Native streaming response back to client in < 250ms\',
    ],
    telemetry: \'LATENCY: 0.28s · RAM: 42MB · 0 EGRESS\',
    icon: Database,
  },
  {
    number: \'02\',
    tag: \'RAG & RETRIEVAL\',
    title: \'Deterministic RAG & Agent Orchestration\',
    summary:
      \'Enterprise hybrid vector search (pgvector + BM25), Model Context Protocol (MCP) tool servers, and grounded citation verification.\',
    metric: \'99.95% Citation Grounding\',
    accent: \'#C6B5FF\',
    details: [
      \'Hybrid reciprocal rank fusion (BM25 sparse + pgvector dense)\',
      \'MCP tool servers with deterministic schema verification\',
      \'Zero-hallucination citation provenance guaranteed\',
    ],
    telemetry: \'GROUNDING: 99.95% · RECALL@5: 0.98 · MCP: ACTIVE\',
    icon: Cpu,
  },
  {
    number: \'03\',
    tag: \'SOVEREIGN CLOUD\',
    title: \'Private VPC & Air-Gapped Inference\',
    summary:
      \'Dedicated vLLM and TensorRT-LLM container deployments operating inside your private VPC with zero external egress.\',
    metric: \'Sub-100ms Inference\',
    accent: \'#FFAE42\',
    details: [
      \'Air-gapped Kubernetes Helm charts & Docker compose recipes\',
      \'Continuous batching & PagedAttention with vLLM engines\',
      \'Your cryptographic keys, your physical servers, zero telemetry\',
    ],
    telemetry: \'THROUGHPUT: 180 tok/s · P99: 84ms · EGRESS: 0 BYTES\',
    icon: Cloud,
  },
  {
    number: \'04\',
    tag: \'R&D PILOT · AR/VR\',
    title: \'Spatial & Immersive Systems (AR/VR)\',
    summary:
      \'WebGPU compute shaders, Three.js/WGSL tactile spatial interaction models, and multi-modal sensory telemetry for spatial data.\',
    metric: \'60fps WebGPU Compute\',
    accent: \'#5EEAD4\',
    details: [
      \'Custom WGSL compute pipelines for dense point cloud physics\',
      \'Zero latency hand-tracking gesture recognition models\',
      \'Led by Japan VR/AR Summit finalist & spatial AI engineers\',
    ],
    telemetry: \'FRAME RATE: 60 FPS · WGSL: OPTIMIZED · LATENCY: 12ms\',
    icon: Glasses,
  },
];

export function SpiralCapabilitiesMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePractice = CAPABILITY_PRACTICES[activeIndex];
  const ActiveIcon = activePractice.icon;

  return (
    <section className=\"py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0] relative overflow-hidden\">
      <Container size=\"wide\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10\">
        <div className=\"max-w-2xl mb-12 text-left space-y-2\">
          <span className=\"font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block\">
            — ENGINEERED CAPABILITIES · THE SPIRAL MATRIX
          </span>
          <h2 className=\"font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-[-0.03em]\">
            Mission-critical scale practices.
          </h2>
          <p className=\"text-sm sm:text-base text-[var(--pine)]/75\">
            Explore our core practices across data ingestion, deterministic retrieval, sovereign VPC inference, and WebGPU spatial computing.
          </p>
        </div>

        {/* Fanned / Spiral Interactive Architecture Stage */}
        <div className=\"grid grid-cols-1 lg:grid-cols-12 gap-8 items-center\">
          {/* Left Column: Radial Selector Cards with subtle rotational spiral offsets */}
          <div className=\"lg:col-span-6 space-y-3 relative\">
            {CAPABILITY_PRACTICES.map((p, idx) => {
              const isSelected = activeIndex === idx;
              const Icon = p.icon;
              // Rotational spiral fan offsets: -2.5deg, -0.8deg, 0.8deg, 2.5deg
              const rotationDeg = [-2.5, -0.8, 0.8, 2.5][idx];

              return (
                <motion.div
                  key={p.number}
                  whileHover={{ x: 6, scale: 1.01 }}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    \'p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left relative overflow-hidden shadow-xs\',
                    isSelected
                      ? \'bg-[#072929] text-white border-white/20 shadow-xl ring-1 ring-white/10 z-20\'
                      : \'bg-[#fffdf7] text-[var(--pine)] border-[var(--line)] hover:border-[var(--pine)]/30 z-10\',
                  )}
                  style={{
                    transform: isSelected ? \'none\' : \'rotate(\' + rotationDeg + \'deg)\',
                  }}
                >
                  {isSelected && (
                    <div
                      className=\"absolute left-0 top-0 bottom-0 w-1.5\"
                      style={{ backgroundColor: p.accent }}
                    />
                  )}

                  <div className=\"flex items-center justify-between gap-4\">
                    <div className=\"flex items-center gap-3.5\">
                      <div
                        className={cn(
                          \'w-10 h-10 rounded-xl flex items-center justify-center border\',
                          isSelected
                            ? \'bg-white/10 text-white border-white/10\'
                            : \'bg-[var(--porcelain)] text-[var(--pine)] border-[var(--line)]\',
                        )}
                        style={isSelected ? { color: p.accent } : undefined}
                      >
                        <Icon className=\"w-5 h-5\" />
                      </div>

                      <div>
                        <div className=\"flex items-center gap-2\">
                          <span
                            className=\"font-mono text-xs font-bold\"
                            style={{ color: isSelected ? p.accent : \'var(--mint-ink)\' }}
                          >
                            {p.number}
                          </span>
                          <h3
                            className={cn(
                              \'font-display text-base sm:text-lg font-bold tracking-tight\',
                              isSelected ? \'text-white\' : \'text-[var(--pine)]\',
                            )}
                          >
                            {p.title}
                          </h3>
                        </div>
                        <span
                          className={cn(
                            \'text-[11px] font-mono tracking-wide\',
                            isSelected ? \'text-[var(--bone-70)]\' : \'text-[var(--pine)]/60\',
                          )}
                        >
                          {p.tag}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        \'font-mono text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0\',
                        isSelected
                          ? \'bg-white/10 text-white border-white/15\'
                          : \'bg-[var(--pine-08)] text-[var(--pine)] border-[var(--line)]\',
                      )}
                      style={isSelected ? { color: p.accent, borderColor: p.accent + \'40\' } : undefined}
                    >
                      {p.metric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Deep Telemetry Projection Stage */}
          <div className=\"lg:col-span-6\">
            <AnimatePresence mode=\"wait\">
              <motion.div
                key={activePractice.number}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: \'easeOut\' }}
                className=\"rounded-3xl bg-[#072929] border border-white/15 p-7 sm:p-9 text-[#f5f5f0] shadow-2xl relative overflow-hidden text-left\"
              >
                <div
                  className=\"absolute inset-0 opacity-10 pointer-events-none\"
                  style={{
                    backgroundImage: \'radial-gradient(circle, #00E599 1px, transparent 1px)\',
                    backgroundSize: \'20px 20px\',
                  }}
                  aria-hidden=\"true\"
                />

                <div className=\"relative z-10 flex items-center justify-between border-b border-white/15 pb-4\">
                  <div className=\"flex items-center gap-3\">
                    <div
                      className=\"w-10 h-10 rounded-xl flex items-center justify-center border\"
                      style={{
                        backgroundColor: activePractice.accent + \'20\',
                        borderColor: activePractice.accent + \'40\',
                        color: activePractice.accent,
                      }}
                    >
                      <ActiveIcon className=\"w-5 h-5\" />
                    </div>
                    <div>
                      <span
                        className=\"font-mono text-xs font-bold tracking-widest uppercase block\"
                        style={{ color: activePractice.accent }}
                      >
                        PRACTICE {activePractice.number} · {activePractice.tag}
                      </span>
                      <h3 className=\"font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight\">
                        {activePractice.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className=\"relative z-10 text-sm sm:text-base text-[var(--bone-70)] leading-relaxed mt-4\">
                  {activePractice.summary}
                </p>

                {/* Telemetry Console Strip */}
                <div className=\"relative z-10 my-6 rounded-xl bg-black/50 border border-white/10 p-4 font-mono text-xs space-y-2\">
                  <div className=\"flex items-center justify-between text-[11px] border-b border-white/10 pb-1.5\">
                    <span className=\"flex items-center gap-1.5\" style={{ color: activePractice.accent }}>
                      <Activity className=\"w-3.5 h-3.5\" />
                      <span>RUNTIME SLA VERIFICATION</span>
                    </span>
                    <span className=\"text-[var(--bone-70)]\">AUDITED BENCHMARK</span>
                  </div>
                  <div className=\"font-semibold text-xs pt-1\" style={{ color: activePractice.accent }}>
                    {activePractice.telemetry}
                  </div>
                </div>

                {/* Technical Pillars */}
                <div className=\"relative z-10 space-y-2.5 border-t border-white/15 pt-4\">
                  {activePractice.details.map((d, idx) => (
                    <div key={idx} className=\"flex items-start gap-2.5 text-xs sm:text-sm text-[var(--bone-70)]\">
                      <CheckCircle2
                        className=\"w-4 h-4 shrink-0 mt-0.5\"
                        style={{ color: activePractice.accent }}
                      />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
''')
print("✅ Created SpiralCapabilitiesMatrix.tsx")

# 3. Create components/organisms/DeliveryProtocolRail/DeliveryProtocolRail.tsx
protocol_dir = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/components/organisms/DeliveryProtocolRail"
os.makedirs(protocol_dir, exist_ok=True)
with open(os.path.join(protocol_dir, "DeliveryProtocolRail.tsx"), "w", encoding="utf-8") as f:
    f.write('''\'use client\';

import React, { useState } from \'react\';
import { Container } from \'@/components/foundation/Container\';
import { motion } from \'motion/react\';
import { FileCheck, Zap, Server, CheckCircle2, ArrowRight } from \'lucide-react\';
import { cn } from \'@/lib/utils\';

export const PROTOCOL_STEPS = [
  {
    stepNumber: \'01\',
    phase: \'PHASE 01\',
    timeline: \'Day 01–02\',
    title: \'Technical Workflow & Latency Audit\',
    desc: \'We analyze your data schemas, query volume, latency bottlenecks, and private network boundaries during an initial technical deep-dive.\',
    icon: FileCheck,
    deliverables: [
      \'Document Schema & Chunking Blueprint\',
      \'Zero-Trust Security Boundary Plan\',
      \'Target Latency & Accuracy SLA Spec\',
    ],
  },
  {
    stepNumber: \'02\',
    phase: \'PHASE 02\',
    timeline: \'Day 03–05\',
    title: \'5-Day Rapid Sandbox PoC Sprint\',
    desc: \'We engineer a functioning proof-of-concept pipeline in an isolated test sandbox with live benchmarks on your sample datasets.\',
    icon: Zap,
    deliverables: [
      \'Isolated Sandbox Inference Pipeline\',
      \'P95 Latency & Accuracy Benchmark Report\',
      \'Deterministic Output Guardrails\',
    ],
  },
  {
    stepNumber: \'03\',
    phase: \'PHASE 03\',
    timeline: \'Day 06+\',
    title: \'Production VPC & Guaranteed SLA\',
    desc: \'We deploy the hardened container into your private cloud (AWS / GCP / Azure PrivateLink or On-Prem) backed by automated telemetry.\',
    icon: Server,
    deliverables: [
      \'Air-Gapped Docker / Helm Package\',
      \'99.9% Uptime & Sub-200ms Latency SLA\',
      \'Direct Senior Architect Walkthrough\',
    ],
  },
];

export function DeliveryProtocolRail() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id=\"operating-rituals\" className=\"py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0] scroll-mt-24\">
      <Container size=\"wide\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
        <div className=\"max-w-2xl mb-14 text-left space-y-2\">
          <span className=\"font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block\">
            — DELIVERY PROTOCOL · MILESTONE TIMELINE
          </span>
          <h2 className=\"font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-[-0.03em]\">
            How we partner with engineering teams.
          </h2>
          <p className=\"text-sm sm:text-base text-[var(--pine)]/75\">
            A predictable, milestone-driven framework designed to deliver a verified proof-of-concept in days, not quarters.
          </p>
        </div>

        {/* The Continuous Kinetic Timeline Rail */}
        <div className=\"relative\">
          {/* Continuous illuminated connecting hairline */}
          <div className=\"hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[var(--pine-12)]\" aria-hidden=\"true\" />

          <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10\">
            {PROTOCOL_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.phase}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    \'rounded-2xl p-7 text-left transition-all duration-200 cursor-pointer border relative overflow-hidden group\',
                    isSelected
                      ? \'bg-[#072929] text-white border-transparent shadow-xl ring-1 ring-white/15\'
                      : \'bg-[#fffdf7] text-[var(--pine)] border-[var(--line)] hover:border-[var(--pine)]/30 hover:bg-[#fffdf7]/90 shadow-xs\',
                  )}
                >
                  {/* Glowing Milestone Header */}
                  <div className=\"flex items-center justify-between border-b pb-4 mb-5\" style={{ borderColor: isSelected ? \'rgba(255,255,255,0.15)\' : \'var(--line)\' }}>
                    <div className=\"flex items-center gap-3\">
                      <div
                        className={cn(
                          \'w-10 h-10 rounded-xl flex items-center justify-center border font-mono font-bold text-sm\',
                          isSelected
                            ? \'bg-[#00E599]/20 text-[#00E599] border-[#00E599]/30\'
                            : \'bg-[var(--porcelain)] text-[var(--pine)] border-[var(--line)]\',
                        )}
                      >
                        <Icon className=\"w-5 h-5\" />
                      </div>
                      <div>
                        <span className=\"font-mono text-xs font-bold block\" style={{ color: isSelected ? \'#00E599\' : \'var(--mint-ink)\' }}>
                          {step.phase}
                        </span>
                        <span className=\"text-[11px] font-mono\" style={{ color: isSelected ? \'var(--bone-70)\' : \'var(--pine)/60\' }}>
                          {step.timeline}
                        </span>
                      </div>
                    </div>

                    <span className=\"font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--pine-08)] text-[var(--pine)]\" style={isSelected ? { backgroundColor: \'rgba(255,255,255,0.1)\', color: \'#fff\' } : undefined}>
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className=\"space-y-2 mb-6\">
                    <h3 className=\"font-display text-xl font-bold tracking-tight leading-snug\" style={{ color: isSelected ? \'#fff\' : \'var(--pine)\' }}>
                      {step.title}
                    </h3>
                    <p className=\"text-xs sm:text-sm leading-relaxed\" style={{ color: isSelected ? \'var(--bone-70)\' : \'var(--pine)/75\' }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Deliverables Ledger */}
                  <div className=\"space-y-2 pt-4 border-t\" style={{ borderColor: isSelected ? \'rgba(255,255,255,0.15)\' : \'var(--line)\' }}>
                    <span className=\"text-[10px] font-mono font-bold uppercase tracking-widest block\" style={{ color: isSelected ? \'#00E599\' : \'var(--pine)/80\' }}>
                      KEY DELIVERABLES:
                    </span>
                    <div className=\"space-y-1.5\">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className=\"flex items-start gap-2 text-xs\" style={{ color: isSelected ? \'var(--bone-70)\' : \'var(--pine)/85\' }}>
                          <CheckCircle2 className=\"w-3.5 h-3.5 shrink-0 mt-0.5\" style={{ color: isSelected ? \'#00E599\' : \'var(--mint-ink)\' }} />
                          <span className=\"font-medium leading-tight\">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
''')
print("✅ Created DeliveryProtocolRail.tsx")

# 4. Create components/organisms/SwissStudioRoster/SwissStudioRoster.tsx
roster_dir = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/components/organisms/SwissStudioRoster"
os.makedirs(roster_dir, exist_ok=True)
with open(os.path.join(roster_dir, "SwissStudioRoster.tsx"), "w", encoding="utf-8") as f:
    f.write('''\'use client\';

import React, { useState } from \'react\';
import { Container } from \'@/components/foundation/Container\';
import { motion, AnimatePresence } from \'motion/react\';
import { ShieldCheck, Cpu, TrendingUp, Palette, Bot, ArrowUpRight, CheckCircle2 } from \'lucide-react\';
import { cn } from \'@/lib/utils\';

export interface StudioEngineer {
  id: string;
  name: string;
  role: string;
  conviction: string;
  runtimeOwnership: string;
  primaryToken: string;
  icon: React.ElementType;
}

export const STUDIO_ENGINEERS: StudioEngineer[] = [
  {
    id: \'dhruw-singh\',
    name: \'Dhruw Singh\',
    role: \'Founder & Head of Strategic Operations\',
    conviction: \'Operational security and institutional governance with 30 years defense discipline.\',
    runtimeOwnership: \'Security Guardrails · Defense Rigor · State Outreach\',
    primaryToken: \'30y Defense Service · Corps of Signals\',
    icon: ShieldCheck,
  },
  {
    id: \'sonu-singh\',
    name: \'Sonu Singh\',
    role: \'Co-Founder & Spatial Systems Lead\',
    conviction: \'Tactile 3D interaction models, WebGPU compute shaders, and spatial telemetry.\',
    runtimeOwnership: \'WebGPU Compute · Three.js/WGSL · Spatial Telemetry\',
    primaryToken: \'Japan VR/AR Summit Finalist\',
    icon: Cpu,
  },
  {
    id: \'annanta-singh\',
    name: \'Annanta Singh\',
    role: \'Digital Growth & Client Pipelines Lead\',
    conviction: \'Technical search visibility and enterprise partnership funnels into production.\',
    runtimeOwnership: \'Inbound Funnels · Technical SEO · B2B Client Pipelines\',
    primaryToken: \'Enterprise Partnership Ecosystems\',
    icon: TrendingUp,
  },
  {
    id: \'rishabh-singh\',
    name: \'Rishabh Singh\',
    role: \'Design & UI/UX Architecture Lead\',
    conviction: \'High-craft design tokens, fluid spring physics, and tactile software surfaces.\',
    runtimeOwnership: \'Design Systems · Fluid Spring Physics · motion/react\',
    primaryToken: \'High-Craft Design Tokens\',
    icon: Palette,
  },
  {
    id: \'gourav-singh\',
    name: \'Gourav Singh\',
    role: \'AI Orchestration Lead & Systems Architect\',
    conviction: \'Deterministic multi-agent state machines and zero-hallucination runtime contracts.\',
    runtimeOwnership: \'Autonomous Multi-Agents · pgvector · vLLM Serving\',
    primaryToken: \'Deterministic Zod Contracts\',
    icon: Bot,
  },
];

export function SwissStudioRoster() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className=\"py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0]\">
      <Container size=\"wide\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
        <div className=\"max-w-2xl mb-12 text-left space-y-2\">
          <span className=\"font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block\">
            — FOUNDING STUDIO ENGINEERS · SWISS ROSTER
          </span>
          <h2 className=\"font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-[-0.03em]\">
            The people who write the code.
          </h2>
          <p className=\"text-sm sm:text-base text-[var(--pine)]/75\">
            Zero executive insulation. Each engineer directly owns production runtime services.
          </p>
        </div>

        {/* Borderless Typographic Ledger */}
        <div className=\"divide-y divide-[var(--line)] border-y border-[var(--line)] text-left\">
          {STUDIO_ENGINEERS.map((eng, idx) => {
            const Icon = eng.icon;
            const isHovered = hoveredId === eng.id;

            return (
              <div
                key={eng.id}
                onMouseEnter={() => setHoveredId(eng.id)}
                onMouseLeave={() => setHoveredId(null)}
                className=\"py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200 group hover:bg-[#fffdf7] px-4 -mx-4 rounded-xl cursor-pointer\"
              >
                {/* Left: Index + Name + Role */}
                <div className=\"flex items-start md:items-center gap-4 sm:gap-6\">
                  <span className=\"font-mono text-xs text-[var(--pine)]/40 font-bold mt-1 md:mt-0\">
                    {String(idx + 1).padStart(2, \'0\')}
                  </span>

                  <div className=\"w-10 h-10 rounded-xl bg-[var(--porcelain)] border border-[var(--line)] flex items-center justify-center text-[var(--pine)] shrink-0 group-hover:border-[var(--mint-ink)] group-hover:text-[var(--mint-ink)] transition-colors\">
                    <Icon className=\"w-5 h-5\" />
                  </div>

                  <div>
                    <h3 className=\"font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)] tracking-tight group-hover:text-[var(--mint-ink)] transition-colors\">
                      {eng.name}
                    </h3>
                    <p className=\"text-xs sm:text-sm font-mono text-[var(--pine)]/75 mt-0.5\">
                      {eng.role}
                    </p>
                  </div>
                </div>

                {/* Center: Conviction Line */}
                <div className=\"max-w-md hidden lg:block text-xs sm:text-sm text-[var(--pine)]/80 leading-relaxed\">
                  {eng.conviction}
                </div>

                {/* Right: Runtime Ownership Capsule */}
                <div className=\"flex items-center gap-3 shrink-0\">
                  <span className=\"font-mono text-xs px-3 py-1 rounded-full bg-[var(--pine-08)] text-[var(--pine)] border border-[var(--line)] group-hover:bg-[#00E599]/15 group-hover:text-[#008f5d] group-hover:border-[#00E599]/30 transition-colors\">
                    {eng.primaryToken}
                  </span>
                  <div className=\"w-8 h-8 rounded-full bg-[var(--pine-08)] flex items-center justify-center text-[var(--pine)] group-hover:bg-[#00E599] group-hover:text-[#072929] transition-colors\">
                    <ArrowUpRight className=\"w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5\" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
''')
print("✅ Created SwissStudioRoster.tsx")

# 5. Export components from components/organisms/index.ts
organisms_index = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/components/organisms/index.ts"
with open(organisms_index, "r", encoding="utf-8") as f:
    orig_content = f.read()

exports_to_add = """
export * from './SpiralCapabilitiesMatrix/SpiralCapabilitiesMatrix';
export * from './DeliveryProtocolRail/DeliveryProtocolRail';
export * from './SwissStudioRoster/SwissStudioRoster';
"""
if "SpiralCapabilitiesMatrix" not in orig_content:
    with open(organisms_index, "a", encoding="utf-8") as f:
        f.write(exports_to_add)
    print("✅ Exported new organisms in index.ts")

# 6. Update app/(marketing)/services/page.tsx
services_page = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/app/(marketing)/services/page.tsx"
with open(services_page, "w", encoding="utf-8") as f:
    f.write('''import React from \'react\';
import type { Metadata } from \'next\';
import { Container } from \'@/components/foundation/Container\';
import { Link } from \'@/components/atoms/Link\';
import { ArrowRight, Lock, Clock, Zap } from \'lucide-react\';
import {
  ServicesDirectory,
  SpiralCapabilitiesMatrix,
  DeliveryProtocolRail,
} from \'@/components/organisms\';
import { buildMetadata, getServiceJsonLd, getBreadcrumbListJsonLd, JsonLd } from \'@/lib/seo\';

export const metadata: Metadata = buildMetadata({
  path: \'/services\',
  title: \'Bespoke Enterprise Deliverables — Built to change what happens\',
  description:
    \'Custom RAG pipelines, MCP tool servers, and high-throughput private VPC inference architectures engineered for enterprise scale and zero hallucination.\',
});

export default function ServicesPage() {
  const serviceJsonLd = getServiceJsonLd({
    name: \'Enterprise AI Engineering & Sovereign Private Deployments\',
    description:
      \'Air-gapped LLM inference pipelines, MCP tool servers, and custom vector search architectures deployed directly into your enterprise cloud perimeter.\',
    url: \'https://norai.tech/services\',
    providerName: \'NorAI Technologies\',
    areaServed: \'Global\',
  });

  const breadcrumbsJsonLd = getBreadcrumbListJsonLd([
    { name: \'Home\', url: \'https://norai.tech\' },
    { name: \'Deliverables\', url: \'https://norai.tech/services\' },
  ]);

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbsJsonLd} />

      <main id=\"main-content\" className=\"min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]\">
        {/* HERO CHAMBER */}
        <section className=\"relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]\">
          <div className=\"aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15\" aria-hidden=\"true\" />
          <div className=\"aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12\" aria-hidden=\"true\" />

          <Container size=\"default\" className=\"relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6\">
            <div className=\"max-w-3xl space-y-6 text-left\">
              <div className=\"inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase\">
                <span className=\"w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse\" aria-hidden=\"true\" />
                <span>— 02 · ENTERPRISE DELIVERABLES &amp; METHODOLOGY</span>
              </div>

              <h1 className=\"font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]\">
                Bespoke systems. <br />
                <span className=\"relative inline-block text-[var(--mint-ink)]\">
                  Built for your infrastructure.
                  <svg
                    className=\"absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]\"
                    viewBox=\"0 0 240 40\"
                    fill=\"none\"
                    preserveAspectRatio=\"none\"
                    aria-hidden=\"true\"
                  >
                    <path d=\"M3 33C50 12 150 5 237 22\" stroke=\"currentColor\" strokeWidth=\"5\" strokeLinecap=\"round\" />
                  </svg>
                </span>
              </h1>

              <p className=\"text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty\">
                Air-gapped LLM inference, deterministic RAG pipelines, and Model Context Protocol (MCP) servers deployed directly into your private cloud.
              </p>

              <div className=\"pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]\">
                <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                  <Lock className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                  <span>Private VPC &amp; Air-Gapped</span>
                </div>
                <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                  <Clock className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                  <span>5-Day Rapid PoC Sprints</span>
                </div>
                <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                  <Zap className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                  <span>Sub-200ms In-Memory SLA</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: THE SPIRAL CAPABILITIES MATRIX (Non-Card Archetype) */}
        <SpiralCapabilitiesMatrix />

        {/* SOVEREIGN ARCHITECTURE CONSOLE */}
        <ServicesDirectory />

        {/* SECTION 2: THE CONTINUOUS KINETIC TIMELINE RAIL (Non-Card Archetype) */}
        <DeliveryProtocolRail />

        {/* CLOSING DISPATCH */}
        <section className=\"py-16 sm:py-24\">
          <Container size=\"default\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
            <div
              className=\"rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden\"
              style={{
                background: \'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)\',
              }}
            >
              <div className=\"max-w-3xl mx-auto space-y-6 text-[#072929]\">
                <div className=\"inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072929]/10 text-xs font-mono font-bold uppercase tracking-wider\">
                  — ENTERPRISE ENGAGEMENT
                </div>

                <h2 className=\"font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight\">
                  Bring us the system you need to build.
                </h2>

                <p className=\"text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium\">
                  One hour with our founding engineering team. A straight answer: architecture, timeline, and exact cost.
                </p>

                <div className=\"pt-4 flex flex-col sm:flex-row items-center justify-center gap-4\">
                  <Link
                    href=\"/contact\"
                    className=\"w-full sm:w-auto h-12 px-8 rounded-full bg-[#072929] hover:bg-[#0c3c3c] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all\"
                  >
                    <span>Schedule an architecture session</span>
                    <ArrowRight className=\"w-4 h-4\" />
                  </Link>
                  <Link
                    href=\"/products\"
                    className=\"w-full sm:w-auto h-12 px-7 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[#072929] font-bold text-sm inline-flex items-center justify-center transition-all\"
                  >
                    <span>View Sovereign Tools →</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
''')
print("✅ Updated app/(marketing)/services/page.tsx")

# 7. Update app/(marketing)/team/page.tsx
team_page = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/app/(marketing)/team/page.tsx"
with open(team_page, "w", encoding="utf-8") as f:
    f.write('''import React from \'react\';
import type { Metadata } from \'next\';
import { Container } from \'@/components/foundation/Container\';
import { Link } from \'@/components/atoms/Link\';
import { ArrowRight, ShieldCheck, Cpu, Code2, Sparkles } from \'lucide-react\';
import { SwissStudioRoster } from \'@/components/organisms\';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from \'@/lib/seo\';

export const metadata: Metadata = buildMetadata({
  path: \'/team\',
  title: \'The Builders & Engineering Ethos — Built to change what happens\',
  description:
    \'Meet Dhruw Singh, Sonu Singh, Annanta Singh, Rishabh Singh, and Gourav Singh—the founding engineering team driving NorAI Technologies from Uttar Pradesh, India.\',
});

const RITUALS = [
  {
    number: \'01\',
    title: \'Founders write the code & answer technical questions\',
    desc: \'We do not employ deflection bots or junior triage queues. When you suggest an improvement or report a parsing edge case, the engineer who authored the schema fixes it.\',
  },
  {
    number: \'02\',
    title: \'Every model deployed is locally verifiable\',
    desc: \'We do not ask clients to trust closed vendor benchmarks. We deliver Docker containers with reproducible eval scripts and latency probes you run yourself.\',
  },
  {
    number: \'03\',
    title: \'Zero data egress is an engineering constraint, not a policy\',
    desc: \'Our tools do not communicate with external analytics or telemetry servers. Code parsing happens in transient RAM; vectors reside on your encrypted volume.\',
  },
  {
    number: \'04\',
    title: \'Direct senior architect walkthrough on every handover\',
    desc: \'Every project closes with an architecture walkthrough, full repository transfer, and environment configuration led by the founding engineer who built it.\',
  },
];

export default function TeamPage() {
  const breadcrumbsJsonLd = getBreadcrumbListJsonLd([
    { name: \'Home\', url: \'https://norai.tech\' },
    { name: \'Team & Ethos\', url: \'https://norai.tech/team\' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd} />

      <main id=\"main-content\" className=\"min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]\">
        {/* HERO CHAMBER */}
        <section className=\"relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden border-b border-[var(--line)]\">
          <div className=\"aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15\" aria-hidden=\"true\" />
          <div className=\"aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12\" aria-hidden=\"true\" />

          <Container size=\"default\" className=\"relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6\">
            <div className=\"max-w-3xl space-y-6 text-left\">
              <div className=\"inline-flex items-center gap-2 text-xs font-mono text-[var(--mint-ink)] font-bold tracking-widest uppercase\">
                <span className=\"w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse\" aria-hidden=\"true\" />
                <span>— 04 · FOUNDING STUDIO &amp; ENGINEERING ETHOS</span>
              </div>

              <h1 className=\"font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-[-0.03em]\">
                Engineers first. <br />
                <span className=\"relative inline-block text-[var(--mint-ink)]\">
                  Direct accountability.
                  <svg
                    className=\"absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]\"
                    viewBox=\"0 0 240 40\"
                    fill=\"none\"
                    preserveAspectRatio=\"none\"
                    aria-hidden=\"true\"
                  >
                    <path d=\"M3 33C50 12 150 5 237 22\" stroke=\"currentColor\" strokeWidth=\"5\" strokeLinecap=\"round\" />
                  </svg>
                </span>
              </h1>

              <p className=\"text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty\">
                NorAI is an independent engineering firm headquartered in Uttar Pradesh. We design and
                deliver private AI infrastructure and sovereign tools for students and citizens.
              </p>

              <div className=\"pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]\">
                <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                  <ShieldCheck className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                  <span>Zero Executive Insulation</span>
                </div>
                <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                  <Code2 className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                  <span>100% In-House Code</span>
                </div>
                <div className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)]\">
                  <Sparkles className=\"w-4 h-4 text-[var(--mint-ink)]\" />
                  <span>Free Grassroots Literacy</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 4: THE MINIMALIST SWISS STUDIO ROSTER (Non-Card Archetype) */}
        <SwissStudioRoster />

        {/* OPERATING RITUALS (Clean Borderless Ledger) */}
        <section className=\"py-16 sm:py-24 border-b border-[var(--line)]\">
          <Container size=\"wide\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
            <div className=\"max-w-2xl mb-12 text-left space-y-2\">
              <span className=\"font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block\">
                — OPERATING RITUALS
              </span>
              <h2 className=\"font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] tracking-[-0.03em]\">
                How we work with clients and code.
              </h2>
            </div>

            <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6 text-left\">
              {RITUALS.map((ritual) => (
                <div
                  key={ritual.number}
                  className=\"p-7 rounded-2xl bg-[#fffdf7] border border-[var(--line)] space-y-3 shadow-xs\"
                >
                  <div className=\"flex items-center gap-2\">
                    <span className=\"font-mono text-xs font-bold text-[var(--mint-ink)]\">
                      {ritual.number}
                    </span>
                    <h3 className=\"font-display text-lg font-bold text-[var(--pine)]\">
                      {ritual.title}
                    </h3>
                  </div>
                  <p className=\"text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed\">
                    {ritual.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CLOSING DISPATCH */}
        <section className=\"py-16 sm:py-24\">
          <Container size=\"default\" className=\"max-w-[1240px] mx-auto px-4 sm:px-6\">
            <div
              className=\"rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden\"
              style={{
                background: \'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)\',
              }}
            >
              <div className=\"max-w-3xl mx-auto space-y-6 text-[#072929]\">
                <div className=\"inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072929]/10 text-xs font-mono font-bold uppercase tracking-wider\">
                  — TALK DIRECTLY TO THE ENGINEERS
                </div>

                <h2 className=\"font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight\">
                  Bring us the problem you are actually facing.
                </h2>

                <p className=\"text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium\">
                  One hour with the founding team. Zero marketing decks. A straight answer: architecture, feasibility, and costs.
                </p>

                <div className=\"pt-4 flex flex-col sm:flex-row items-center justify-center gap-4\">
                  <Link
                    href=\"/contact\"
                    className=\"w-full sm:w-auto h-12 px-8 rounded-full bg-[#072929] hover:bg-[#0c3c3c] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all\"
                  >
                    <span>Schedule an architecture call</span>
                    <ArrowRight className=\"w-4 h-4\" />
                  </Link>
                  <Link
                    href=\"/services\"
                    className=\"w-full sm:w-auto h-12 px-7 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 text-[#072929] font-bold text-sm inline-flex items-center justify-center transition-all\"
                  >
                    <span>Explore Deliverables →</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
''')
print("✅ Updated app/(marketing)/team/page.tsx")

# 8. Update app/(marketing)/blog/BlogIndexClient.tsx
blog_client = "/home/gourav/coding/startup/NorAi_Ofiicial_Web/app/(marketing)/blog/BlogIndexClient.tsx"
with open(blog_client, "r", encoding="utf-8") as f:
    blog_src = f.read()

# Replace the featured post card (rounded-[22px] bg-[#fffdf7] border... p-8 sm:p-12 hover:shadow-xl)
# with a borderless Editorial Hero Cover
# and replace the ledger container (rounded-[22px] bg-[#fffdf7] border... divide-y) with a borderless ledger
new_blog_code = blog_src.replace(
    '''            <Link
              href={`/blog/${featured.slug}`}
              className="block rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-8 sm:p-12 hover:shadow-xl hover:border-[var(--pine)]/30 transition-[transform,box-shadow,border-color] duration-300 group"
            >''',
    '''            <Link
              href={`/blog/${featured.slug}`}
              className="block py-10 sm:py-14 border-b border-[var(--line)] transition-colors group text-left"
            >'''
).replace(
    '''          <div className="ledger rounded-[22px] bg-[#fffdf7] border border-[var(--line)] overflow-hidden shadow-xs divide-y divide-[var(--line)]">''',
    '''          <div className="ledger divide-y divide-[var(--line)] border-y border-[var(--line)]">'''
).replace(
    '''          <div className="gradient-card max-w-4xl mx-auto text-center">
            <div className="gradient-card__inner p-8 sm:p-12 space-y-6 bg-[#fffdf7] text-[var(--pine)]">''',
    '''          <div
            className="rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)',
            }}
          >
            <div className="max-w-3xl mx-auto space-y-6 text-[#072929]">'''
)

with open(blog_client, "w", encoding="utf-8") as f:
    f.write(new_blog_code)
print("✅ Updated app/(marketing)/blog/BlogIndexClient.tsx")

print("--- All 5 Sections Successfully Modernized! ---")
