'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Code2,
  Glasses,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface PillarData {
  id: string;
  n: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  desc: string;
  deliverables: string[];
  techStack: string[];
  accent: string;
  accentGlow: string;
  badge: string;
  sla: string;
  codeSnippet: string;
  architectureBlueprint: string[];
}

export const PILLARS: PillarData[] = [
  {
    id: 'ai-solutions',
    n: '01',
    icon: Brain,
    title: 'AI Solutions & Automation',
    tagline: 'Pragmatic machine intelligence for high-friction workflows.',
    desc: 'We engineer purpose-built intelligence pipelines that eliminate tedious operational busywork. From unstructured document extraction to contextual assistants, our systems run with sub-second latency and zero permanent data retention.',
    deliverables: [
      'Multi-format resume, invoice, and legal document parsers',
      'Contextual knowledge retrieval without hallucination',
      'Automated customer support triage and intent routing',
      'Custom fine-tuned open-weight classification models',
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Hugging Face', 'pgvector', 'Docker'],
    accent: '#1ef4b4',
    accentGlow: 'rgba(30,244,180,0.25)',
    badge: 'SUB-SECOND IN-MEMORY',
    sla: 'Latency < 0.35s · 0 Data Egress',
    codeSnippet: `// In-Memory Parsing & Vector Scoring Pipeline
async def process_document_pipeline(file_bytes: bytes) -> DocumentScorecard:
    extracted = await pdf_extractor.stream_extract(file_bytes)
    embeddings = local_embedder.encode_transient(extracted.text)
    scores = pgvector_session.cosine_similarity(embeddings, TARGET_VECTORS)
    return DocumentScorecard(relevance=scores.max(), latency_ms=42.6)`,
    architectureBlueprint: [
      'Transient RAM Sandbox · Zero Cold Storage',
      'Local vLLM Quantized Serving Node',
      'Deterministic Zod / Pydantic Output Validation',
    ],
  },
  {
    id: 'custom-software',
    n: '02',
    icon: Code2,
    title: 'Custom Modern Web Software',
    tagline: 'High-performance web applications and resilient digital products.',
    desc: 'Full-stack software engineering grounded in modern TypeScript ecosystems. We author ultra-fast web interfaces, robust REST/GraphQL APIs, and mission-critical admin portals designed to scale gracefully without technical debt.',
    deliverables: [
      'Next.js 15 & React 19 web applications with sub-second page loads',
      'High-concurrency RESTful and GraphQL backend microservices',
      'PostgreSQL / Redis database architectures with zero data loss SLAs',
      'Responsive enterprise consoles with real-time WebSocket telemetry',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL', 'Node.js'],
    accent: '#7a5cff',
    accentGlow: 'rgba(122,92,255,0.25)',
    badge: '100% CLIENT IP OWNERSHIP',
    sla: 'Sub-100ms TTFB · 99.99% Availability',
    codeSnippet: `// High-Concurrency Reactive Edge Gateway
export async function GET(req: Request) {
  const telemetry = await edgeTelemetry.probe({ session: req.headers.get('x-session') });
  return NextResponse.json({
    status: 'OPTIMAL',
    p99_latency: '18ms',
    tenant_guardrails: 'ENFORCED'
  }, { headers: { 'Cache-Control': 'no-store' } });
}`,
    architectureBlueprint: [
      'Edge CDN Caching & Fluid Streaming SSR',
      'Strict Type Contract Across Backend & Frontend',
      'Encrypted PostgreSQL DB & Redis Read-Replicas',
    ],
  },
  {
    id: 'ar-vr',
    n: '03',
    icon: Glasses,
    title: 'AR / VR Spatial Computing',
    tagline: 'Interactive 3D environments and immersive simulations.',
    desc: 'We bring spatial computing directly to the browser via WebXR and Three.js. No cumbersome headset-only app stores or heavy gigabyte downloads—just immediate, 60fps 3D interactions accessible across phones, tablets, and VR headsets.',
    deliverables: [
      'Interactive 3D mechanical, architectural, and equipment visualizers',
      'WebXR vocational training environments for technical apprentices',
      'Virtual product showcases with photorealistic PBR materials',
      'Interactive spatial educational modules for collegiate classrooms',
    ],
    techStack: ['Three.js', 'WebXR', 'GLSL', 'React Three Fiber', 'Blender', 'WebGPU'],
    accent: '#00e5ff',
    accentGlow: 'rgba(0,229,255,0.25)',
    badge: '60 FPS BROWSER NATIVE',
    sla: '60 FPS Lock · Zero App Store Install',
    codeSnippet: `// WebGPU Compute Shader for Spatial Telemetry
const shaderModule = device.createShaderModule({
  code: \`
    @compute @workgroup_size(64)
    fn main(@builtin(global_invocation_id) id: vec3<u32>) {
      particles[id.x].position += particles[id.x].velocity * 0.016;
    }
  \`
});`,
    architectureBlueprint: [
      'Zero Install · Direct Browser Canvas WebGL/WebGPU',
      'Physically Based Rendering (PBR) Shaders',
      'Cross-Device Compatibility (iOS, Android, Meta Quest)',
    ],
  },
  {
    id: 'research-innovation',
    n: '04',
    icon: Lightbulb,
    title: 'Applied Research & Innovation',
    tagline: 'Experimental R&D, local edge intelligence, and student prototypes.',
    desc: 'Where cutting-edge AI research meets real ground utility. We benchmark open-weight models, run local quantized inference on consumer GPUs, and collaborate with student fellows to author civic intelligence tools.',
    deliverables: [
      'Local on-device inference setups using vLLM and quantized GGUF weights',
      'Vernacular Hindi language scrapers and regional gazette extractors',
      'Mathematical lecture synthesis and academic research tools',
      'Open-source student developer sandboxes and reproducible blueprints',
    ],
    techStack: ['vLLM', 'Ollama', 'GGUF', 'KaTeX', 'Open Data APIs', 'Python'],
    accent: '#ffa24d',
    accentGlow: 'rgba(255,162,77,0.25)',
    badge: 'OPEN STANDARDS & CIVIC',
    sla: 'Edge Inference · 100% Offline Capable',
    codeSnippet: `// Local vLLM Quantized Regional Serving
from vllm import LLM, SamplingParams
llm = LLM(model="Qwen/Qwen2.5-7B-Instruct-AWQ", quantization="awq")
output = llm.generate(["Ghazipur regional agricultural market dispatch..."],
                      SamplingParams(temperature=0.1, max_tokens=150))
print(output[0].outputs[0].text)`,
    architectureBlueprint: [
      'Consumer GPU Quantization (AWQ & GGUF)',
      'Bilingual Vernacular Hindi NLP Ensembles',
      'Collegiate Research & Student Fellowship Blueprints',
    ],
  },
];

export function ServicesPillarsBento() {
  const [selectedId, setSelectedId] = useState('ai-solutions');
  const [activeTab, setActiveTab] = useState<'deliverables' | 'blueprint' | 'code'>('deliverables');
  const [copied, setCopied] = useState(false);

  const activePillar: PillarData = (PILLARS.find((p) => p.id === selectedId) || PILLARS[0]) as PillarData;
  const Icon = activePillar.icon;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activePillar.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* 4-Pillars Horizontal Bento Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PILLARS.map((pillar) => {
          const isSelected = pillar.id === selectedId;
          const PIcon = pillar.icon;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setSelectedId(pillar.id)}
              className={cn(
                'relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border group',
                isSelected
                  ? 'bg-[#04130f] border-white/20 shadow-xl ring-1 ring-white/10'
                  : 'bg-[#fffdf7] dark:bg-[#072929]/50 border-[var(--line)] hover:border-[#1ef4b4]/40 hover:bg-[#fffdf7]/90'
              )}
            >
              {/* Sliding Active Highlight Pill */}
              {isSelected && (
                <motion.div
                  layoutId="active-pillar-indicator"
                  className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}



              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200',
                      isSelected
                        ? 'bg-white/10 text-white'
                        : 'bg-[var(--porcelain)] dark:bg-white/5 text-[var(--pine)] dark:text-white group-hover:scale-105'
                    )}
                    style={isSelected ? { color: pillar.accent } : undefined}
                  >
                    <PIcon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--pine)]/50 dark:text-white/40">
                    /{pillar.n}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      'font-display text-base sm:text-lg font-bold tracking-tight line-clamp-1',
                      isSelected ? 'text-white' : 'text-[var(--pine)] dark:text-white'
                    )}
                  >
                    {pillar.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--mint-ink)] dark:text-[#1ef4b4]/90 block mt-0.5">
                    {pillar.badge}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Architecture & Sandbox Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#04130f] border border-white/15 p-6 sm:p-10 text-[#f5f5f0] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ background: activePillar.accent }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Pillar Overview & Interactive Tab Controller */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15"
                  style={{ background: activePillar.accentGlow, color: activePillar.accent }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-wider uppercase font-semibold text-[#1ef4b4]">
                    PILLAR /{activePillar.n} SPECIFICATION
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#a8beb4] leading-relaxed">
                {activePillar.desc}
              </p>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-black/40 border border-white/10 w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab('deliverables')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer',
                    activeTab === 'deliverables'
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  Deliverables
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('blueprint')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer',
                    activeTab === 'blueprint'
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer',
                    activeTab === 'code'
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  Code Sample
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="min-h-[160px]">
                {activeTab === 'deliverables' && (
                  <div className="space-y-2.5">
                    {activePillar.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#eaf4f0]/90">
                        <CheckCircle2 className="w-4 h-4 text-[#1ef4b4] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'blueprint' && (
                  <div className="space-y-2.5">
                    {activePillar.architectureBlueprint.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#eaf4f0]/90">
                        <Layers className="w-4 h-4 text-[#7a5cff] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="relative rounded-xl bg-black/60 border border-white/10 p-3.5 font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                      title="Copy Code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#1ef4b4]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <pre className="text-[#8af6cf] overflow-x-auto whitespace-pre leading-relaxed pr-8">
                      {activePillar.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>

              {/* Technologies Tag Cloud */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                  Core Foundations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePillar.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Telemetry Cockpit & Direct Scope Card */}
            <div className="lg:col-span-6 rounded-2xl bg-black/50 border border-white/10 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#1ef4b4]">
                  <span className="w-2 h-2 rounded-full bg-[#1ef4b4] animate-pulse" />
                  <span>RUNTIME PROTOCOL ACTIVE</span>
                </div>
                <span className="font-mono text-xs text-white/60">
                  {activePillar.sla}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-white/60 flex items-center justify-between">
                    <span>DEPLOYMENT ARTIFACT:</span>
                    <span className="text-[#1ef4b4]">DOCKERIZED &amp; VERIFIED</span>
                  </div>
                  <div className="text-white/60 flex items-center justify-between">
                    <span>INTELLECTUAL PROPERTY:</span>
                    <span className="text-white font-semibold">100% CLIENT CODE OWNERSHIP</span>
                  </div>
                  <div className="text-white/60 flex items-center justify-between">
                    <span>LATENCY VERIFICATION:</span>
                    <span className="text-[#ffa24d]">REAL GROUND DATA PROBES</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white/80">
                    <ShieldCheck className="w-4 h-4 text-[#1ef4b4]" />
                    <span>Zero Vendor Lock-In Guaranteed</span>
                  </div>
                  <span className="text-white/40">·</span>
                  <div className="flex items-center gap-2 text-white/80">
                    <Zap className="w-4 h-4 text-[#ffa24d]" />
                    <span>5-Day PoC Handover</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full h-12 rounded-full bg-[#1ef4b4] hover:bg-[#1ae0a5] text-[#04130f] font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#1ef4b4]/25 group"
                >
                  <span>Scope a {activePillar.title.split(' ')[0]} Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <p className="text-center text-[11px] font-mono text-white/50 mt-2.5">
                  Direct senior architect response within one business day.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
