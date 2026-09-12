# NorAI Technologies — Product Overview & Context (`PRODUCT.md`)

## 1. About NorAI Technologies

**NorAI Technologies** builds fast, reliable AI utilities and custom enterprise automation pipelines. Headquartered in **Uttar Pradesh, India**, NorAI focuses on practical tools that solve real operational bottlenecks with transparent execution, sub-second latency, and privacy-first ephemeral memory.

Rather than chasing generic AI hype or building complex black boxes, NorAI builds focused, single-purpose software that is dependable, understandable, and immediately useful.

---

## 2. The Four Flagship Products

The platform centers around four purpose-built autonomous tools available at `/products`:

### 1. AI Resume Shortlister (`/products/resume-shortlister`)

- **What it does:** High-velocity candidate screening and contextual resume parsing for recruiting teams and engineering managers.
- **Key Capabilities:**
  - Sub-second vector scoring and weighted skills evaluation (`< 0.35s / PDF`).
  - Multi-format ingestion (PDF, DOCX, TXT) with zero permanent data retention.
  - Transparent candidate scorecards and ATS-compatible structured JSON export.

### 2. Course Note-Taker (`/products/course-note-taker`)

- **What it does:** Transforms raw lecture recordings, technical videos, and slide decks into clean, structured study notes.
- **Key Capabilities:**
  - Real-time audio NLP and timestamped topic synthesis.
  - Automatic LaTeX mathematical formula extraction and rendering.
  - Interactive flashcards with spaced repetition for active recall.
  - Accessible scholar access for students and researchers.

### 3. Community Chat Digest (`/products/chat-digest`)

- **What it does:** Condenses thousands of unread messages from Discord, Slack, and Telegram into concise executive briefs.
- **Key Capabilities:**
  - Noise deduplication and high-ratio token compression.
  - Automatic action-item extraction with assignee tags and dead links filtered.
  - Multi-channel topic clustering and sentiment radar.

### 4. Smart Dainik News (`/products/smart-dainik-news`)

- **What it does:** Aggregates and simplifies public employment gazettes and regional government notifications.
- **Key Capabilities:**
  - Bilingual coverage across Hindi and English feeds.
  - Clear eligibility criteria, age limits, and countdown timers for application deadlines.
  - Direct links to official application portals, eliminating misinformation and broken links.

---

## 3. Enterprise Services (`/services`)

For organizations requiring tailored infrastructure, NorAI provides bespoke engineering partnerships:

- **High-Throughput Ingestion & Document Pipelines:** Scalable ETL architectures, custom parsing, and vector indexing (Milvus / Qdrant).
- **Agent Orchestration & MCP Server Architecture:** Designing production Model Context Protocol (MCP) servers, multi-agent workflows, and deterministic human-in-the-loop checkpoints.
- **Private On-Premises Inference & Fine-Tuning:** Dedicated VPC enclaves, air-gapped container deployments, custom LoRA adapters, and local vLLM inference with zero external data egress.

---

## 4. AI Skill Mission (`/mission`)

A core pillar of NorAI is regional community impact in Uttar Pradesh:

- Delivering free, hands-on computational and AI literacy workshops to students in regional colleges and polytechnics across 75 districts.
- Founder-led masterclasses covering local model execution, modern web engineering, and practical AI tools.
- Grassroots vernacular inclusion to make modern technology accessible in everyday Hindi and regional dialects.

---

## 5. Core Philosophy & Product Values

When building features, writing copy, or extending functionality, keep these foundational values in mind:

- **Speed & Responsiveness:** Software should feel instantaneous. Strive for low latency and snappy feedback loops across all user interactions.
- **Hardware Honesty & Transparency:** Avoid vague buzzwords or fabricated claims. Expose real telemetry (processing time in milliseconds, verified status, JSON payloads) when helpful.
- **Privacy by Default:** Prioritize ephemeral processing and minimize data storage. Users should trust that their files and messages remain their own.
- **Immediate Utility:** Let users test and experience the value of tools quickly with minimal onboarding friction.
- **Clear, Grounded Voice:** Communicate like pragmatic engineers who take pride in their craft—calm, confident, and direct.

---

## 6. How to Use This Context

This document is intended to give contributors, engineers, and AI agents a clear mental model of what NorAI does, who it serves, and what makes it distinct. Use this context to inspire great ideas, craft relevant copy, and design useful features that align with the company's authentic mission.
