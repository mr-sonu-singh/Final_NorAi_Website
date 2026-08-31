# NorAI Technologies — Complete Project Context & Architecture Guide

> **Official Comprehensive Knowledge Base & Core Reference**  
> Generated from the direct codebase, live content, and architectural blueprints of the NorAI platform.  
> Target Audience: AI Agents, Systems Engineers, and Collaborators.

---

## 1. Executive Summary & Company Identity

- **Company Legal Name**: NorAI Technologies (NorAI Technologies Pvt. Ltd.)
- **Primary Brand Slogan**: *"AI That Actually Works"*
- **Core Taglines**: *"Your operations, on autopilot."* · *"Purpose-built tools. Zero operational drag."* · *"Democratizing AI from villages to tech hubs."*
- **Headquarters & Studio**: Uttar Pradesh, India
- **Primary Domain**: [norai.asia](https://norai.asia) (API: `api.norai.in`)
- **Direct Dispatch / Contact**: `noraitechnologies@gmail.com` (Active Desk: Mon–Sat, 9:00 AM – 8:00 PM IST)

### Core Mission & Engineering Philosophy
NorAI Technologies is an applied AI engineering studio born in Uttar Pradesh, India. The company was founded on a firm rejection of generic, hallucination-prone AI wrappers and bloated enterprise software. NorAI specializes in:
1. **Deterministic Micro-SaaS Utilities**: Purpose-built, single-task AI tools operating with sub-second execution speeds (< 0.35s), verified Zod schema outputs, and ephemeral in-memory processing.
2. **Bespoke Enterprise Systems**: Custom RAG architectures, official Model Context Protocol (MCP) tool servers, and private on-premise vLLM deployments.
3. **Grassroots Regional Enablement (The NorAI Skill Mission)**: Democratizing practical AI literacy and engineering education across all 75 districts of Uttar Pradesh at zero student cost.

### The NorAI Engineering Creed
> *“We do not build generic chatbots that guess. We engineer high-precision deterministic tools that do one job exceptionally well. Artificial intelligence shouldn’t require complex enterprise contracts or bloated software. Every tool we release must save real hours for real people—quietly, every single week.”*

---

## 2. Architectural Principles & Hard Technical Specifications

NorAI enforces four non-negotiable architectural guarantees across all software, APIs, and client systems:

| Architectural Pillar | Specification & Contract | Ground Mechanism |
| :--- | :--- | :--- |
| **Inference Latency SLA** | **Sub-Second Execution (< 0.35s / P95 < 320ms)** | Optimized serverless runtimes, local vLLM inference, and streamlined model tokenization eliminate queue stalls. |
| **Data Residency & Privacy** | **0 Bytes Permanent Logging (Ephemeral RAM)** | Candidate resumes, audio streams, and chat logs are processed ephemerally in volatile memory containers and wiped immediately upon response completion. Never stored, pooled, or used to train public or proprietary models. |
| **Schema Integrity** | **100% Deterministic Typed JSON (Zod Contracts)** | Every endpoint outputs strictly validated JSON structures. Eliminates parsing fragility, format hallucinations, and downstream schema drift. |
| **Hardware Honesty** | **Exposed Telemetry & Unit Economics** | Every tool visibly exposes execution latency (ms), token counts, ephemeral memory status, and raw JSON contracts. |

---

## 3. The NorAI Skill Mission & Regional Enablement Movement

A core pillar of NorAI is its grassroots educational initiative spanning Uttar Pradesh. True regional empowerment is treated not as a corporate CSR afterthought, but as an active engineering movement to transform UP into India's premier grassroots AI talent hub.

### The 3 Pedagogical Tiers

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NORAI SKILL MISSION TIERS                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [ Tier 1: Rural & Senior AI Literacy ]                                │
│  • Audience: Village elders, local shopkeepers, women SHGs, citizens.  │
│  • Curriculum: Everyday AI in Hindi, voice prompts, govt welfare      │
│    navigation, and digital scam / cyber-fraud prevention.              │
│  • Format: 100% Free Vernacular Sessions, projector community demos.  │
│                                                                        │
│  [ Tier 2: Youth & Academic Enablement ]                               │
│  • Audience: Undergraduate students, polytechnic diploma candidates.   │
│  • Curriculum: Converting lecture chaos to study flashcards (Course    │
│    Note-Taker), STEM AI tutoring, coding fundamentals.                 │
│  • Format: Free Scholar Tier Access, campus masterclasses.             │
│                                                                        │
│  [ Tier 3: Advanced Builder Masterclasses ]                            │
│  • Audience: Collegiate engineers, polytechnic researchers, founders.  │
│  • Curriculum: Model Context Protocol (MCP) servers, local vLLM open-  │
│    weights, vector search (pgvector/Qdrant), Next.js micro-SaaS.       │
│  • Format: Direct Founder Mentorship & code-level lab reviews.         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### On-Ground Execution Matrix: Rural vs. Collegiate

| Dimension | Rural & Village Deployment | Town & Collegiate Deployment |
| :--- | :--- | :--- |
| **Target Demographics** | Village elders, rural youth, local shopkeepers, women self-help groups. | Undergraduate engineers, polytechnic students, aspiring tech founders. |
| **Primary Curriculum** | ChatGPT & Gemini Hindi voice prompts, welfare schemes, digital fraud safety. | MCP tool servers, local vLLM serving, vector databases, type-safe APIs. |
| **Infrastructure & Tech** | Smartphone-first, low-bandwidth optimized, projector-led community sessions. | Campus computer labs, live code sandboxes, Git repos, local edge GPUs. |
| **Takeaway Outcome** | Self-reliance in drafting formal letters, crop advisory, online scam defense. | Automated study flashcard engines, deployable AI micro-SaaS portfolio apps. |

### Statewide 75-District Roadmap
- **Phase 01 (Active Deployment)**: Grassroots & Campus Hub Pilots in Gorakhpur, Lucknow, Varanasi, Meerut, and Prayagraj (**500+ participants mentored**).
- **Phase 02 (Scaling Cohort)**: Establishing monthly AI engineering clinics across **25+ Tier-2/3 district hubs** with collegiate and polytechnic partners.
- **Phase 03 (Strategic Blueprint)**: Collaborating with the **Uttar Pradesh Skill Development Mission (UPSDM)** and the **Department of IT & Electronics** to standardize vernacular AI curricula across all **75 UP districts**.

---

## 4. Founding Leadership & Core Engineering Team

NorAI operates with a lean core team of 5 in-house builders located in Uttar Pradesh. The team adheres to a **Zero Deflection Principle**: founders write the code, author the schemas, and answer support tickets directly.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               NORAI FOUNDING LEADERSHIP                                 │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  1. Dhruw Singh — Founder & Head of Strategic Operations                                │
│     • Background: B.Sc · Retd. Indian Army (Corps of Signals), 30 Years Military Svc    │
│     • Focus: Institutional governance, defense-grade operational security, SLAs.        │
│     • Systems Owned: Strategic Operations, Governance, Institutional Outreach, SLAs.    │
│     • Tenet: "Reliability is built into the chain of command from day zero."            │
│                                                                                         │
│  2. Sonu Singh — Co-Founder & AR-VR / AI Engineer                                       │
│     • Background: BCA · Spatial Computing Specialist (Returned from Japan VR/AR Summit) │
│     • Focus: Spatial computing architectures, WebGPU shaders, multi-modal pipelines.    │
│     • Systems Owned: Spatial Mesh Engine, 3D Interaction Pipeline, Multi-Modal Hooks.   │
│     • Tenet: "Interfaces must dissolve the boundary between screen and physical space." │
│                                                                                         │
│  3. Annanta Singh — Digital Marketing Lead                                              │
│     • Background: B.Com · Brand Development & Inbound Growth Specialist                 │
│     • Focus: Inbound acquisition funnels, digital product positioning, technical SEO.   │
│     • Systems Owned: Inbound Engine, Product Positioning, Multi-Channel SEO Pipeline.   │
│     • Tenet: "A great tool is defined by how fast it reaches those who need it."        │
│                                                                                         │
│  4. Rishabh Singh — Design & Visualisation Lead                                         │
│     • Background: B.Tech · UI/UX Architect & Visual Rendering Specialist                │
│     • Focus: Parchment & Terracotta tokens, tactile hardware UI, WCAG AAA accessibility.│
│     • Systems Owned: Design Tokens, Hardware UI Atoms/Molecules, Motion Curves.         │
│     • Tenet: "Software should feel as substantial and satisfying as a fine instrument." │
│                                                                                         │
│  5. Gourav Singh — AI Engineer / Orchestration Lead                                     │
│     • Background: B.Tech · Agent Systems Architect & Autonomous Workflows Specialist    │
│     • Focus: Multi-agent state machines, structured Zod schemas, vLLM local inference. │
│     • Systems Owned: AI Resume Shortlister, Note-Taker Pipeline, Chat Digest Engine.    │
│     • Tenet: "Zero hallucination, deterministic typed outputs, sub-second speed."       │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### The 4 Studio Operating Rituals
1. **Ritual 01 — Founders Write Code & Answer Support**: Zero deflection bots; the engineer who wrote the schema is the one who handles issues.
2. **Ritual 02 — Radical Hardware Honesty**: Exposed execution timing (ms), RAM isolation indicators, and raw typed JSON.
3. **Ritual 03 — Shipped Weekly on Rhythm**: Continuous delivery with real production releases every single Monday.
4. **Ritual 04 — Field Fridays Across UP**: Weekly visits to regional classrooms and village panchayats to test tools against ground truth.

---

## 5. Product Matrix — Flagship Self-Serve Micro-SaaS Tools

NorAI provides four purpose-built micro-SaaS utilities accessible via web dashboards, REST APIs, and developer SDKs.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 FLAGSHIP PRODUCT MATRIX                                 │
├──────────────────────┬────────────────────────┬─────────────┬───────────────────────────┤
│ Product Name         │ Category               │ Latency SLA │ Key Capabilities          │
├──────────────────────┼────────────────────────┼─────────────┼───────────────────────────┤
│ AI Resume            │ Recruitment            │ < 0.35s     │ • Multi-format (PDF/DOCX) │
│ Shortlister          │ Automation             │             │ • Weighted skill scoring  │
│ (TOOL_01)            │                        │             │ • JSON scorecard output   │
│                      │                        │             │ • Ephemeral RAM isolation │
├──────────────────────┼────────────────────────┼─────────────┼───────────────────────────┤
│ AI Course            │ EdTech & Academic      │ < 0.41s     │ • Timestamped chapters    │
│ Note-Taker           │ Summarization          │             │ • Anki/Quizlet flashcards │
│ (TOOL_02)            │                        │             │ • Self-assessment quizzes │
│                      │                        │             │ • Multi-lingual (EN/HI)   │
├──────────────────────┼────────────────────────┼─────────────┼───────────────────────────┤
│ Chat Digest &        │ Community & Channel    │ < 0.28s     │ • Telegram/Discord/Slack  │
│ Newsletter AI        │ Intelligence           │             │ • Spam/banter filtering   │
│ (TOOL_03)            │                        │             │ • Bug/action item triage  │
│                      │                        │             │ • Auto-newsletter drafts  │
├──────────────────────┼────────────────────────┼─────────────┼───────────────────────────┤
│ Smart Dainik News    │ Regional Intelligence  │ < 0.45s     │ • UP Gazettes & jobs      │
│ & Gazette Engine     │ & Media Curation       │             │ • Anti-rumor validation   │
│ (TOOL_04)            │                        │             │ • Eligibility matrices    │
│                      │                        │             │ • Bilingual (Hindi + EN)  │
└──────────────────────┴────────────────────────┴─────────────┴───────────────────────────┘
```

### Detailed Tool Specifications

#### 1. AI Resume Shortlister (`/products/resume-shortlister`)
- **Problem**: Recruiters waste 15+ hours weekly manually scanning unstructured resumes, while manual keyword matching misses qualified talent.
- **Solution**: High-speed neural parsing in RAM that extracts technical skill vectors, computes objective qualification scores against custom job rubrics, and emits clean ATS-ready JSON.
- **Tiers**:
  - *Starter* ($49/mo): 500 parses/mo, standard matching, web console.
  - *Pro* ($149/mo): 3,000 parses/mo, custom weights, REST API access.
  - *Scale* ($399/mo): 10,000 parses/mo, private webhook queues, 99.9% SLA.

#### 2. AI Course Note-Taker (`/products/course-note-taker`)
- **Problem**: 2-hour lecture recordings produce chaotic screenshots and notes that students fail to retain.
- **Solution**: Processes video URLs (YouTube), transcript text, or audio files (MP3/WAV) into structured chapter briefs, core axioms, Anki-ready flashcards, and quizzes.
- **Tiers**:
  - *Starter* ($29/mo): 30 hours audio/transcripts/mo, Markdown/PDF exports.
  - *Educator* ($99/mo): 150 hours/mo, quiz generator, API & webhooks.
  - *Institutional* ($299/mo): 500 hours/mo, LMS integration, custom branding.

#### 3. Chat Digest & Newsletter AI (`/products/chat-digest`)
- **Problem**: Community managers miss bugs, product requests, and community sentiment buried in thousands of daily chat messages.
- **Solution**: Ingests Discord, Telegram, and Slack exports/webhooks, filters out noise, groups topics into sentiment clusters, extracts P0–P3 bugs, and generates ready-to-send newsletter drafts.
- **Tiers**:
  - *Community* ($39/mo): 2 channels, daily executive briefs.
  - *Pro Manager* ($119/mo): 10 channels, newsletter generator, webhooks.
  - *Enterprise* ($299/mo): Unlimited channels, custom sentiment models, dedicated SLA.

#### 4. Smart Dainik News / Regional Gazette (`/products/news-aggregator` / `smart-dainik-news`)
- **Problem**: Regional public gazettes, recruitment alerts, and local news are plagued by duplicate press releases, unverified rumors, and lack of structured metadata.
- **Solution**: Ingests regional feeds in Hindi and English, clusters syndicated stories, verifies official portal URLs, extracts salary bands and age limits into eligibility matrices, and generates executive briefs.
- **Tiers**:
  - *Analyst* ($59/mo): 5 keyword trackers, daily briefs, basic sentiment.
  - *Media Hub* ($179/mo): 25 trackers, real-time webhooks, entity extraction.
  - *Enterprise* ($449/mo): Unlimited trackers, custom NLP models, dedicated pipeline.

---

## 6. Bespoke Enterprise Services & Systems Engineering

For organizations with specialized scale, custom data schemas, or strict data sovereignty, NorAI engineers bespoke solutions across five core practice areas:

### 1. RAG Systems & Vector Search
- **Focus**: Hybrid dense vector + BM25 keyword search engines engineered for internal enterprise document stores (PDFs, Notion, Wikis).
- **Deliverables**: Semantic layout-aware chunking, vector DB setup (pgvector, Qdrant, Milvus), sub-200ms retrieval latency with citation verification, and isolated VPC deployment.

### 2. Model Context Protocol (MCP) Tool Servers
- **Focus**: Official Model Context Protocol (MCP) servers connecting LLMs and Claude Desktop directly to internal SQL databases, ERPs, and custom APIs.
- **Deliverables**: Production-grade TypeScript/Python MCP servers, granular RBAC access policies, type-safe parameter validation, and full mock testing suites.

### 3. LLM Stack Optimization & Cost Auditing
- **Focus**: Eliminating foundation model token waste and slashing inference latency across existing client LLM pipelines.
- **Deliverables**: Prompt compression, semantic in-memory response caching, multi-model fallback routing, **40%–70% reduction in API spend**, and latency reduced from >4s to <600ms.

### 4. Custom AI Web Applications
- **Focus**: Bespoke Next.js 15 and React 19 full-stack applications with streaming neural inference and tactile design.
- **Deliverables**: Sub-100ms serverless endpoints, accessible WCAG AAA compliant UI, dynamic data visualization, and clean TypeScript codebases.

### 5. Business Automation Pipelines
- **Focus**: Fault-tolerant background worker queues for automated document extraction, ERP synchronization, and compliance auditing.
- **Deliverables**: Worker queues with exponential backoff (BullMQ/Redis), full audit trail, and 99.9% uptime SLAs.

### Enterprise Infrastructure Blueprint Tiers

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           ENTERPRISE INFRASTRUCTURE TIERS                               │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  [ TIER 01: High-Throughput Ingestion & Vector Indexing ]                               │
│  • Target: 10M+ Unstructured Records (PDFs, Audio, Tabular Gazettes)                    │
│  • SLA: < 200ms Query Latency · 99.9% Uptime                                            │
│  • Security: VPC / Air-Gapped Dedicated Tenant                                         │
│  • Topology: Multi-Format Ingestion ➔ Layout Parser ➔ Vector Indexer ➔ Typed API Output│
│                                                                                         │
│  [ TIER 02: Model Context Protocol (MCP) & Agent Orchestration ]                        │
│  • Target: Hardened MCP Servers connecting LLMs to SQL, ERPs, & Internal APIs           │
│  • SLA: Sub-second Tool Dispatch · Zero Leaks                                           │
│  • Security: Role-Based Access Control (RBAC) & Human-in-the-Loop Validation Gates      │
│  • Topology: Intent Classifier ➔ MCP Tool Bus ➔ Validation Interceptor ➔ Commit State   │
│                                                                                         │
│  [ TIER 03: Domain Fine-Tuning & Private On-Prem vLLM ]                                 │
│  • Target: Sovereign Hardware Inference with Proprietary LoRA Adapters                  │
│  • SLA: P95 < 120ms Cold Start · 100% On-Premise GPU Inference                          │
│  • Security: Zero External Network Egress (Fully Air-Gapped)                           │
│  • Topology: Domain Corpus ➔ LoRA Engine ➔ Quantized vLLM Server ➔ Air-Gapped VPC       │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3-Phase Enterprise Engagement Roadmap
1. **Discovery (Technical Workflow Audit)**: Deep-dive into data bottlenecks, latency targets, and schema integration requirements.
2. **Prototyping (3–5 Day PoC Sprint)**: Rapid development of a functional proof-of-concept pipeline in an isolated test harness using client sample datasets.
3. **Delivery (Production Deployment & SLA)**: Seamless integration into client VPC/on-prem stack, backed by automated heartbeat monitoring and uptime guarantees.

---

## 7. Operational Execution Pipeline: The 3-Stage Contract

Every tool and service in the NorAI ecosystem adheres to a standard 3-stage execution pipeline:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    STAGE 01     │       │    STAGE 02     │       │    STAGE 03     │
│     Ingest      │ ────> │   Neural Parse  │ ────> │ Deliver Action  │
│  Unstructured   │       │  (Ephemeral)    │       │ (Deterministic) │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Stage 01: Ingest Unstructured Input**  
   Accepts multi-modal inputs (PDF, DOCX, audio MP3/WAV, YouTube links, webhook payloads, chat logs).
2. **Stage 02: Deterministic Neural Parse**  
   Fine-tuned models parse entities, calculate embeddings, extract skill vectors, and validate assertions in **transient, RAM-isolated containers**. Average latency < 0.35s, 0 bytes logged.
3. **Stage 03: Deliver Verified Action**  
   Outputs typed JSON adhering to strict Zod schemas, dispatches webhooks, updates ATS scorecards, or pushes notifications to Slack/Discord with zero schema drift.

---

## 8. Platform Pricing & Subscription Models

NorAI provides transparent, predictable pricing across both self-serve bundles and specialized tools.

### General Micro-SaaS Subscription Tiers

| Plan Tier | Monthly Price | Annual Price (Save 20%) | Monthly AI Requests | Latency SLA | Key Features Included |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Starter** | **$29 / mo** | **$23 / mo** | 5,000 requests | < 1.0s | Access to all 4 micro-SaaS tools, web console, standard email support. |
| **Pro** | **$99 / mo** | **$79 / mo** | 50,000 requests | < 500ms | All 4 tools, webhooks & REST API access, custom scoring rules, priority support. |
| **Enterprise** | **Custom** | **Custom** | Unlimited | < 100ms | Dedicated compute cluster, custom LoRA fine-tuning, private VPC connectors, 99.99% SLA. |

- **Free Trial**: 14-day free trial including 1,000 API requests with zero credit card requirement.
- **Pay-As-You-Go Overage**: Simple $0.002 per request above monthly cap with no service interruption.

---

## 9. Developer Ecosystem & API Reference

Developers can integrate NorAI capabilities directly into ATS systems, LMS platforms, or custom software via REST APIs and the `@norai/sdk` client.

### Endpoints Overview (`https://api.norai.in/v1/...`)

#### 1. Candidate Evaluation API (`POST /api/v1/shortlist`)
```bash
curl -X POST https://api.norai.in/v1/shortlist \
  -H "Authorization: Bearer norai_live_sec_key" \
  -H "Content-Type: multipart/form-data" \
  -F "resume=@candidate_resume.pdf" \
  -F "job_criteria='{\"title\": \"Sr Backend Engineer\", \"min_exp\": 4}'"
```

#### 2. Lecture Transcription & Briefs API (`POST /api/v1/notes/transcribe`)
```bash
curl -X POST https://api.norai.in/v1/notes/transcribe \
  -H "Authorization: Bearer norai_live_sec_key" \
  -H "Content-Type: application/json" \
  -d '{"audio_url": "https://cdn.example.com/lecture_04.mp3", "deck_type": "ANKI_FLASHCARDS"}'
```

#### 3. Community Chat Digest Webhook (`POST /api/v1/digest/webhook`)
```bash
curl -X POST https://api.norai.in/v1/digest/webhook \
  -H "Authorization: Bearer norai_live_sec_key" \
  -H "Content-Type: application/json" \
  -d '{"channel_id": "C0489234", "timeframe_hours": 24}'
```

---

## 10. Design System: The "Parchment & Terracotta" Theme

The visual and interaction identity of NorAI is built upon the **Editorial Hardware & Technical Craft** aesthetic, engineered to convey warmth, authority, and mechanical precision.

### Color Tokens

```css
/* Core Canvas Surfaces */
--canvas-base:     #F5F0EA; /* Heavy archival parchment */
--canvas-paper:    #FDFBF7; /* Elevated clean paper surface */
--canvas-sunken:   #EDE7DF; /* Recessed hardware track */

/* Authoritative Inks */
--ink-primary:     #0D253D; /* Deep navy display & headings */
--ink-body:        #3D4F5F; /* Muted slate reading prose */
--ink-secondary:   #364757; /* Technical metadata & readouts */

/* Signature Accents */
--accent-terra:    #C2553A; /* Primary interactive terracotta */
--accent-sage:     #5B8A72; /* Ephemeral telemetry & verified badges */
--accent-ochre:    #B8860B; /* Regional intelligence & district markers */
```

### Typography Hierarchy
- **Display Headings**: `Instrument Serif` (Italic emphasis for signature words).
- **Body & Interface Prose**: `Plus Jakarta Sans` (Fluid clamped sizing, clean leading).
- **Technical & Numeric Telemetry**: `JetBrains Mono` with `tabular-nums` (Zero layout shift on dynamic counts).

---

## 11. Summary for Autonomous AI Agents

When interacting with or extending this codebase:
1. **Never build generic, chatty AI features**: Every tool must have a single clear job, explicit inputs, and deterministic Zod outputs.
2. **Respect the latency and RAM contracts**: Enforce ephemeral memory guarantees and sub-second execution SLAs.
3. **Preserve the design tokens**: Adhere strictly to the Parchment & Terracotta palette (`bg-canvas-base`, `bg-canvas-paper`, `text-ink-primary`, `text-accent-500`) and the established typography hierarchy.
4. **Remember the origin and mission**: NorAI is proudly engineered in Uttar Pradesh, solving real-world friction for enterprises and regional grassroots communities alike.
