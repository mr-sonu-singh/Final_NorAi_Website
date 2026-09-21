# NorAI Product Architecture & Three Dimensions (`PRODUCT.md`)

> **The Sovereign Proposition**: NorAI builds software you own and intelligence that stays. We engineer private on-premises enterprise pipelines and sovereign everyday tools, backed by a 100% free grassroots mission across 75 districts of Uttar Pradesh.

---

## 1. The Core Philosophy & Single-Responsibility Architecture

In contrast to brittle AI wrappers that rent external APIs and compromise privacy, NorAI builds **deterministic, air-gapped systems deployed into infrastructure you own**.

Every page and component in the NorAI platform adheres to the **Single Responsibility Principle**:
- **The Homepage (`/`)**: Sole Responsibility = Establish the brand thesis, articulate the Three Dimensions, showcase a fast 4-tool Telemetry Arc, highlight the 75-District Bharat Mission, and invite executive engagement.
- **The Tools Catalog (`/products`)**: Sole Responsibility = Deep exploration and interactive sandboxes for the 4 Sovereign Everyday Tools.
- **Enterprise Deliverables (`/services`)**: Sole Responsibility = Concrete architectural specifications, latency SLAs, topology viewers, and security guarantees for enterprise clients.
- **The Bharat Mission (`/mission`)**: Sole Responsibility = District impact radar, workshop curriculums, and grassroots community tiers.
- **The Builders & Desk (`/team`)**: Sole Responsibility = Founding engineering pedigree, defense operations governance, and spatial systems craft.
- **Engagement Desk (`/contact`)**: Sole Responsibility = Direct founder consultation, architecture scoping, and fixed-scope diagnostic booking.

---

## 2. The Three Dimensions of NorAI

NorAI operates across three distinct, compounding dimensions:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE THREE DIMENSIONS                            │
├────────────────────────────────────────────────────────────────────────┤
│ DIMENSION 1: SOVEREIGN EVERYDAY TOOLS                                  │
│ Four focused autonomous instruments designed to eliminate busywork.    │
│ Sub-second execution, in-memory RAM parsing, and zero data retention.   │
│                                                                        │
│ DIMENSION 2: BESPOKE ENTERPRISE INTELLIGENCE                           │
│ Private on-premises VPC inference, deterministic RAG pipelines, and   │
│ Model Context Protocol (MCP) servers with provenance on every claim.   │
│                                                                        │
│ DIMENSION 3: GRASSROOTS 75-DISTRICT BHARAT MISSION                     │
│ 100% free computational literacy workshops, vernacular Hindi voice     │
│ tools, and open-weight model deployment across Uttar Pradesh.           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Dimension 1: Sovereign Everyday Tools

Four single-purpose autonomous tools engineered for immediate utility and zero cognitive drag.

### 3.1 AI Resume Shortlister
- **The Problem**: Recruiters drown in thousands of resumes stuffed with ATS buzzwords; screening takes hours and yields biased, superficial matches.
- **The Solution**: Sub-second vector scoring parses verified engineering depth, architectural systems experience, and git history from raw PDFs.
- **Authoritative Telemetry**:
  - P95 Parse Latency: `< 0.28s / PDF`
  - Egress / Storage: `0 bytes retained (ephemeral RAM)`
  - Verification Scorecard: `Ranked 0–100 with cited evidence`
- **Output**: Structured JSON & exportable candidate decision briefs.
- **Canonical Route**: `/products/resume-shortlister`

### 3.2 Course Note-Taker
- **The Problem**: Students and researchers spend lectures frantically typing messy notes rather than engaging with complex mathematical and engineering concepts.
- **The Solution**: Converts raw multi-hour lecture recordings and slide decks into formatted KaTeX equations, executive summaries, and active recall flashcards.
- **Authoritative Telemetry**:
  - Processing Velocity: `1.2h lecture audio processed in 8.4s`
  - Math Accuracy: `99.4% KaTeX syntax verification`
  - Student Pricing: `100% free scholar access tier`
- **Output**: Markdown, Notion-ready briefs, and spaced repetition (SRS) study decks.
- **Canonical Route**: `/products/course-note-taker`

### 3.3 Community Chat Digest
- **The Problem**: High-velocity Discord, Slack, and Telegram engineering communities produce thousands of unread messages daily; critical decisions and bugs get lost in chatter.
- **The Solution**: Stream processing workers condense noisy multi-channel transcripts into prioritized executive briefs, technical decisions, and unresolved blockers.
- **Authoritative Telemetry**:
  - Compression Efficiency: `4,820 messages condensed to 3 decisions`
  - Noise Filtration: `98.7% conversational chatter pruned`
  - Privacy: `Zero permanent bot logging or retention`
- **Output**: Daily executive digests and categorized action tables.
- **Canonical Route**: `/products/chat-digest`

### 3.4 Smart Dainik News
- **The Problem**: Regional government gazettes, district notifications, and citizen welfare schemes are buried in complex bureaucratic PDFs with imminent deadlines.
- **The Solution**: Autonomous crawlers parse and verify state gazette notifications, delivering concise, actionable vernacular Hindi alerts before windows close.
- **Authoritative Telemetry**:
  - Source Verification: `100% cross-checked against official state gazettes`
  - Delivery Language: `Clean, vernacular Hindi & regional dialects`
  - Alert Horizon: `48-hour deadline warning alerts`
- **Output**: Verified civic alerts and eligibility checklists.
- **Canonical Route**: `/products/smart-dainik-news`

---

## 4. Dimension 2: Bespoke Enterprise Intelligence

Private AI systems deployed into infrastructure you own, engineered for institutions where data leakage or hallucination is unacceptable.

### 4.1 Air-Gapped Private VPC Inference
- **Description**: Dedicated inference clusters deployed into AWS PrivateLink, GCP, Azure, or physical on-premise enclaves. Zero external network egress or telemetry.
- **Deliverables**: Hardened Docker / Helm packages, vLLM / TensorRT-LLM serving runtimes, sub-200ms latency SLAs.

### 4.2 Deterministic RAG & Grounded Retrieval
- **Description**: Enterprise hybrid vector search (pgvector + BM25) strictly grounded in your proprietary corpus. Every single generated statement carries an immutable citation back to the original source document.
- **Deliverables**: Ingestion pipelines, schema tokenizers, deterministic hallucination guardrails.

### 4.3 Model Context Protocol (MCP) Workflows
- **Description**: Production MCP tool servers connecting autonomous agents to internal ERPs, databases, and APIs with strict human-in-the-loop authorization gates.
- **Deliverables**: Typed schema contracts, sandboxed tool executors, audit logging pipelines.

---

## 5. Dimension 3: Grassroots 75-District Bharat Mission

Technological sovereignty must not be confined to elite metropolitan enclaves. NorAI commits engineering talent directly to the 75 districts of Uttar Pradesh.

### 5.1 Three Community Tiers
1. **Tier 01 · Village & Rural Citizens**: Vernacular Hindi voice interfaces, government welfare portal navigation, and digital financial fraud prevention. Delivered at ₹0 cost.
2. **Tier 02 · Secondary & Collegiate Students**: Free scholar access to lecture synthesis, KaTeX extraction, and AI study workflows.
3. **Tier 03 · Collegiate Builders & Engineers**: Founder-led intensive masterclasses teaching local undergraduate engineers how to serve open-weight models, build MCP servers, and architect typed APIs.

### 5.2 The Bharat Commitment Strip
`75 Districts Covered` · `₹0 Student Cost` · `Vernacular Hindi Delivery` · `Direct Founder Mentorship`
