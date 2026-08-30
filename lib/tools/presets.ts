import {
  ShortlistPreset,
  CourseNotesPreset,
  ChatDigestPreset,
  DainikNewsPreset,
} from './types';

export const SHORTLIST_PRESETS: ShortlistPreset[] = [
  {
    id: 'preset-backend-sr',
    title: 'Senior Backend Engineer (Python / Distributed Systems)',
    category: 'Backend Infrastructure',
    jobTitle: 'Senior Backend Engineer (High-Concurrency APIs)',
    jobDescription: `We are looking for a Senior Backend Engineer to architect, build, and scale our high-throughput distributed ingestion pipelines.

Key Requirements:
- 4+ years building production backend systems with Python (FastAPI, Asyncio) or Go.
- Deep expertise in Distributed Systems, event-driven architectures (Kafka / RabbitMQ / Redis Streams).
- Relational and NoSQL database optimization (PostgreSQL indexing, async connection pooling, schema migrations).
- Proven track record scaling services past 10,000 requests/sec with sub-50ms p99 latencies.
- Docker, Kubernetes, CI/CD pipeline automation, and zero-downtime deployment strategies.`,
    customWeights: {
      'Distributed Systems Architecture': 35,
      'Python & Async Concurrency': 30,
      'PostgreSQL & Data Modeling': 20,
      'DevOps & Observability': 15,
    },
    sampleResumesText: `--- RESUME 1 ---
Candidate Name: Aditya Verma
Current Role: Lead Backend Systems Engineer at RazorMetrics
Experience: 6 years
Contact: aditya.verma@example.dev | Bengaluru, India

Summary:
Lead backend architect with 6 years building distributed event streaming platforms handling 45M+ daily API transactions.

Experience:
Lead Backend Systems Engineer — RazorMetrics (2022 - Present)
- Architected asynchronous event ingestion engine using Python (FastAPI, uvloop) and Redis Streams, reducing p99 latency from 140ms to 24ms.
- Scaled distributed PostgreSQL read replicas with pgBouncer connection pooling, managing 12,000 queries/sec peak load.
- Spearheaded migration of legacy monolith to containerized Kubernetes microservices on AWS EKS.

Senior Software Engineer — ZetaCloud Networks (2019 - 2022)
- Built high-throughput webhook dispatch system processing 8,000 RPS with Apache Kafka and Go.
- Implemented automated circuit breakers and OpenTelemetry distributed tracing across 14 microservices.

Skills:
Languages: Python (FastAPI, Asyncio, Celery), Go, SQL
Databases & Queues: PostgreSQL, Redis, Apache Kafka, Elasticsearch
Infrastructure: Docker, Kubernetes, AWS (EKS, RDS, S3), Prometheus, Grafana

--- RESUME 2 ---
Candidate Name: Neha Kulkarni
Current Role: Full Stack Backend Specialist at FinEdge Tech
Experience: 4 years
Contact: neha.kulkarni@example.dev | Pune, India

Summary:
Full-stack and backend engineer with 4 years of experience building secure fintech payment integrations and Node/Python microservices.

Experience:
Senior Backend Developer — FinEdge Tech (2022 - Present)
- Developed RESTful financial ledger APIs using Python FastAPI and SQLAlchemy with 99.98% uptime.
- Integrated automated reconciliation pipelines processing $2M+ in daily transaction volume with Redis lock idempotency.
- Configured Docker CI/CD pipelines in GitLab for automated linting and unit testing.

Software Engineer — Cognizant (2020 - 2022)
- Built enterprise customer portal backends with Node.js, Express, and PostgreSQL.
- Created automated integration test suites achieving 88% test coverage.

Skills:
Languages: Python, JavaScript/TypeScript, SQL
Frameworks: FastAPI, Flask, Node.js, Express
Databases: PostgreSQL, MongoDB, Redis
DevOps: Docker, GitHub Actions, AWS EC2

--- RESUME 3 ---
Candidate Name: Rohit Sen
Current Role: Junior Backend Developer at AppStudio Labs
Experience: 2 years
Contact: rohit.sen@example.dev | Noida, India

Summary:
Motivated junior backend developer with 2 years of experience writing REST APIs and data processing scripts.

Experience:
Backend Developer — AppStudio Labs (2023 - Present)
- Built CRUD endpoints for client mobile applications using Django and PostgreSQL.
- Assisted senior engineers in writing Celery task queues for scheduled email reminders.
- Implemented JWT token authentication and role-based access control.

Skills:
Languages: Python, JavaScript
Frameworks: Django, Django REST Framework, Basic FastAPI
Databases: PostgreSQL, SQLite
Tools: Git, Docker, Postman`,
    precomputedResult: {
      batchId: 'norai_batch_sr_backend_001',
      jobTitle: 'Senior Backend Engineer (High-Concurrency APIs)',
      totalEvaluated: 3,
      shortlistedCount: 2,
      summaryOverview:
        'The candidate batch shows a standout top match (Aditya Verma, 96%) with verified high-concurrency distributed systems expertise, followed by a qualified contender (Neha Kulkarni, 84%) and a junior engineer needing further architectural depth (Rohit Sen, 71%).',
      evaluationRubric: [
        {
          criteriaName: 'Distributed Systems Architecture',
          weightPercentage: 35,
          description: 'Event-driven streaming, Kafka/Redis queues, sub-50ms latency guarantees at scale.',
        },
        {
          criteriaName: 'Python & Async Concurrency',
          weightPercentage: 30,
          description: 'FastAPI, uvloop, Asyncio, connection pool management.',
        },
        {
          criteriaName: 'PostgreSQL & Data Modeling',
          weightPercentage: 20,
          description: 'Query optimization, indexing strategy, pgBouncer connection pooling.',
        },
        {
          criteriaName: 'DevOps & Observability',
          weightPercentage: 15,
          description: 'Kubernetes, Docker, OpenTelemetry, CI/CD automation.',
        },
      ],
      candidates: [
        {
          id: 'cand-01',
          name: 'Aditya Verma',
          currentRole: 'Lead Backend Systems Engineer at RazorMetrics',
          experienceYears: '6 yrs exp',
          compositeScore: 96,
          status: 'Top Match',
          oneLineVerdict:
            'Exceptional fit with proven track record scaling distributed event pipelines to 45M daily transactions and 12k RPS.',
          skillVectors: [
            {
              label: 'Distributed Systems Architecture',
              matchScore: 98,
              evidence: '"Architected asynchronous event ingestion engine using Python and Redis Streams, reducing p99 latency from 140ms to 24ms." [Resume Sec 2.1]',
            },
            {
              label: 'Python & Async Concurrency',
              matchScore: 96,
              evidence: '"Deep FastAPI, uvloop, and Celery mastery handling 45M+ daily API transactions." [Resume Sec 1.0]',
            },
            {
              label: 'PostgreSQL & Data Modeling',
              matchScore: 94,
              evidence: '"Scaled distributed PostgreSQL read replicas with pgBouncer connection pooling, managing 12,000 queries/sec peak load." [Resume Sec 2.2]',
            },
            {
              label: 'DevOps & Observability',
              matchScore: 92,
              evidence: '"Spearheaded migration to Kubernetes on AWS EKS; instituted OpenTelemetry distributed tracing across 14 microservices." [Resume Sec 2.3]',
            },
          ],
          keyStrengths: [
            'Proven high-concurrency scaling past 12k RPS with measurable latency reduction (140ms to 24ms).',
            'Strong leadership experience driving microservices migration on Kubernetes AWS EKS.',
            'Production proficiency across both Python (FastAPI/uvloop) and Go for high-throughput pipelines.',
          ],
          missingRequirements: [],
          potentialRedFlags: [
            'None detected. Consistent promotion trajectory and architectural ownership over 6 years.',
          ],
          interviewQuestions: [
            'How did you tune pgBouncer pool modes (transaction vs session) and PostgreSQL connection limits during peak 12,000 QPS spikes?',
            'What failure modes did you encounter with Redis Streams when consumer groups lagged, and how did you mitigate buffer overrun?',
            'How did you calibrate distributed tracing sampling rates in OpenTelemetry to minimize CPU overhead in uvloop?',
          ],
        },
        {
          id: 'cand-02',
          name: 'Neha Kulkarni',
          currentRole: 'Full Stack Backend Specialist at FinEdge Tech',
          experienceYears: '4 yrs exp',
          compositeScore: 84,
          status: 'Shortlisted',
          oneLineVerdict:
            'Solid backend engineer with robust fintech API reliability experience; recommended for secondary architecture interview.',
          skillVectors: [
            {
              label: 'Distributed Systems Architecture',
              matchScore: 78,
              evidence: '"Integrated automated reconciliation pipelines processing $2M+ daily transaction volume with Redis lock idempotency." [Resume Sec 2.2]',
            },
            {
              label: 'Python & Async Concurrency',
              matchScore: 88,
              evidence: '"Developed RESTful financial ledger APIs using Python FastAPI and SQLAlchemy with 99.98% uptime." [Resume Sec 2.1]',
            },
            {
              label: 'PostgreSQL & Data Modeling',
              matchScore: 86,
              evidence: '"Relational ledger schema design, ACID transaction isolation, and automated migration routines." [Resume Sec 2.1]',
            },
            {
              label: 'DevOps & Observability',
              matchScore: 80,
              evidence: '"Configured Docker CI/CD pipelines in GitLab for automated linting, security scanning, and unit testing." [Resume Sec 2.3]',
            },
          ],
          keyStrengths: [
            'Disciplined financial API engineering with high reliability and zero-data-loss standards (99.98% uptime).',
            'Strong automated testing discipline (88% unit/integration test coverage).',
            'Solid Python FastAPI and relational data modeling skills with SQLAlchemy.',
          ],
          missingRequirements: [
            'Lacks demonstrated experience with large-scale multi-broker Kafka streaming clusters (>10k RPS).',
            'Limited direct Kubernetes cluster administration and autoscaling experience.',
          ],
          potentialRedFlags: [
            'Primary infrastructure experience is single-instance AWS EC2 rather than auto-scaling container clusters.',
          ],
          interviewQuestions: [
            'How did you guarantee idempotency and avoid double-spending race conditions in your financial ledger APIs during network retries?',
            'Describe how you would redesign your current reconciliation batch job into an event-driven async streaming pipeline.',
            'What strategies would you use to migrate single-instance EC2 deployments to a zero-downtime Kubernetes deployment?',
          ],
        },
        {
          id: 'cand-03',
          name: 'Rohit Sen',
          currentRole: 'Junior Backend Developer at AppStudio Labs',
          experienceYears: '2 yrs exp',
          compositeScore: 71,
          status: 'Review Queue',
          oneLineVerdict:
            'Promising junior engineer but lacks the required senior architectural breadth and high-concurrency scaling experience.',
          skillVectors: [
            {
              label: 'Distributed Systems Architecture',
              matchScore: 55,
              evidence: '"Assisted senior engineers in writing Celery task queues for scheduled email reminders." [Resume Sec 2.2]',
            },
            {
              label: 'Python & Async Concurrency',
              matchScore: 78,
              evidence: '"Built CRUD endpoints using Django, Django REST Framework, and basic FastAPI." [Resume Sec 2.1]',
            },
            {
              label: 'PostgreSQL & Data Modeling',
              matchScore: 72,
              evidence: '"Standard relational schema creation and Django ORM queries with PostgreSQL." [Resume Sec 2.1]',
            },
            {
              label: 'DevOps & Observability',
              matchScore: 64,
              evidence: '"Basic Docker containerization and Git workflows for development staging." [Resume Sec 3.0]',
            },
          ],
          keyStrengths: [
            'Clean Django / FastAPI API development and authentication practices.',
            'Clear motivation and rapid growth across 2 years of agency application delivery.',
          ],
          missingRequirements: [
            'Does not meet 4+ year senior experience threshold (2 years total).',
            'No experience scaling systems beyond standard web traffic (<1k RPS).',
            'No Kafka, Redis Streams, or Kubernetes production background.',
          ],
          potentialRedFlags: [
            'Experience is largely entry-level CRUD development rather than complex distributed system design.',
          ],
          interviewQuestions: [
            'What are the performance differences between Django ORM queries and raw SQL when handling large joins under load?',
            'How does Python async/await differ fundamentally from standard synchronous WSGI execution in Django?',
            'What are the common pitfalls of using Celery with Redis as a broker when tasks run longer than expected?',
          ],
        },
      ],
      telemetry: {
        latencyMs: 312,
        inputTokens: 1420,
        outputTokens: 780,
        totalTokens: 2200,
        estimatedCostUsd: 0.00032,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-ai-platform',
    title: 'AI Platform & LLMOps Engineer',
    category: 'AI Infrastructure',
    jobTitle: 'AI Platform & Inference Engineer',
    jobDescription: `Looking for an AI Platform Engineer to build high-throughput model serving pipelines, RAG vector indexing, and GPU orchestration.

Key Requirements:
- 3+ years in MLOps/LLMOps deploying open-weight foundational models (vLLM, TensorRT-LLM, TGI).
- Vector databases and semantic search (Qdrant, Milvus, pgvector) with hybrid retrieval and reranking.
- Python, LangChain/LlamaIndex, Triton Inference Server, and Model Context Protocol (MCP).
- Kubernetes (K8s) GPU node scheduling, model quantization (AWQ, GPTQ), and autoscaling based on queue latency.`,
    customWeights: {
      'High-Throughput LLM Inference (vLLM/Triton)': 40,
      'Vector Search & RAG Architecture': 30,
      'Kubernetes GPU Scheduling': 20,
      'Observability & Guardrails': 10,
    },
    sampleResumesText: `--- RESUME 1 ---
Candidate Name: Dr. Siddharth Rawat
Current Role: Lead MLOps Architect at NeuralScale
Experience: 5 years
Summary: MLOps specialist with 5 years deploying multi-tenant vLLM clusters with 300+ req/sec throughput.

Experience:
Lead MLOps Architect — NeuralScale (2022 - Present)
- Deployed vLLM inference clusters on Kubernetes utilizing AWQ 4-bit quantization, decreasing GPU memory footprint by 55% while maintaining 98.4% benchmark parity.
- Architected enterprise RAG pipeline on Qdrant with hybrid BM25 + dense embedding reranking via Cohere Rerank.
- Implemented custom Prometheus GPU metrics tracking KV-cache utilization and time-to-first-token (TTFT).

Skills:
Tools: vLLM, TensorRT-LLM, Qdrant, pgvector, Ray Serve, PyTorch, Kubernetes, Triton
Languages: Python, C++, CUDA (basics)

--- RESUME 2 ---
Candidate Name: Priya Sharma
Current Role: Data Engineer at DataWave Labs
Experience: 3 years
Summary: Data engineer with strong vector pipeline experience and PySpark ETL background.

Experience:
Data Engineer — DataWave Labs (2022 - Present)
- Built automated document embedding ingestion pipeline using pgvector and LangChain for internal enterprise knowledge bases.
- Designed automated chunking strategies and metadata filters for 1.2M PDF policy documents.
- Managed Airflow DAGs for nightly vector database re-indexing.

Skills:
Tools: Python, pgvector, LangChain, PostgreSQL, Apache Airflow, Docker

--- RESUME 3 ---
Candidate Name: Aman Joshi
Current Role: Junior ML Engineer at CloudTensor
Experience: 2 years
Summary: ML engineer focusing on fine-tuning HuggingFace transformers and basic FastAPI model endpoints.

Experience:
Junior ML Engineer — CloudTensor (2023 - Present)
- Fine-tuned BERT and Llama-3-8B LoRA adapters on domain-specific customer support datasets.
- Deployed REST inference endpoints with Docker and FastAPI on single Nvidia T4 instances.
- Evaluated BLEU and ROUGE benchmark metrics across internal model releases.

Skills:
Tools: PyTorch, HuggingFace, FastAPI, Docker, MLflow`,
    precomputedResult: {
      batchId: 'norai_batch_ai_ops_002',
      jobTitle: 'AI Platform & Inference Engineer',
      totalEvaluated: 3,
      shortlistedCount: 2,
      summaryOverview:
        'The candidate pool features an exceptional AI platform specialist (Dr. Siddharth Rawat, 97%) with direct vLLM quantization expertise, a solid data pipeline engineer (Priya Sharma, 78%), and an early-career ML engineer (Aman Joshi, 68%).',
      evaluationRubric: [
        {
          criteriaName: 'High-Throughput LLM Inference (vLLM/Triton)',
          weightPercentage: 40,
          description: 'Model serving, quantization (AWQ/GPTQ), KV-cache optimization, low TTFT.',
        },
        {
          criteriaName: 'Vector Search & RAG Architecture',
          weightPercentage: 30,
          description: 'Hybrid search, Qdrant/pgvector, rerankers, semantic chunking.',
        },
        {
          criteriaName: 'Kubernetes GPU Scheduling',
          weightPercentage: 20,
          description: 'K8s GPU operator, Ray Serve, dynamic autoscaling on queue depth.',
        },
        {
          criteriaName: 'Observability & Guardrails',
          weightPercentage: 10,
          description: 'GPU telemetry, Prometheus KV-cache monitoring, latency tracking.',
        },
      ],
      candidates: [
        {
          id: 'cand-01',
          name: 'Dr. Siddharth Rawat',
          currentRole: 'Lead MLOps Architect at NeuralScale',
          experienceYears: '5 yrs exp',
          compositeScore: 97,
          status: 'Top Match',
          oneLineVerdict:
            'World-class AI platform architect with direct experience deploying optimized vLLM clusters with AWQ quantization.',
          skillVectors: [
            {
              label: 'High-Throughput LLM Inference (vLLM/Triton)',
              matchScore: 99,
              evidence: '"Deployed vLLM inference clusters on Kubernetes utilizing AWQ 4-bit quantization, decreasing GPU memory footprint by 55% at 300+ req/sec." [Resume Sec 2.1]',
            },
            {
              label: 'Vector Search & RAG Architecture',
              matchScore: 96,
              evidence: '"Architected enterprise RAG pipeline on Qdrant with hybrid BM25 + dense embedding reranking via Cohere Rerank." [Resume Sec 2.2]',
            },
            {
              label: 'Kubernetes GPU Scheduling',
              matchScore: 94,
              evidence: '"Managed multi-tenant Ray Serve and GPU node affinity on Kubernetes clusters." [Resume Sec 2.1]',
            },
            {
              label: 'Observability & Guardrails',
              matchScore: 95,
              evidence: '"Implemented custom Prometheus GPU metrics tracking KV-cache utilization and time-to-first-token (TTFT)." [Resume Sec 2.3]',
            },
          ],
          keyStrengths: [
            'Direct hands-on quantization and memory optimization on high-concurrency vLLM clusters.',
            'Production architecture across state-of-the-art hybrid RAG and neural rerankers.',
            'Deep GPU telemetry instrumentation and KV-cache monitoring expertise.',
          ],
          missingRequirements: [],
          potentialRedFlags: ['None. Directly matches senior AI platform engineering requirements.'],
          interviewQuestions: [
            'How did you handle continuous batching and PagedAttention fragmentation under high concurrency spikes in vLLM?',
            'What criteria did you use to tune chunk overlap and hybrid alpha weight between BM25 and vector embeddings in Qdrant?',
            'How do you manage GPU cold starts and model weight pre-warming during Kubernetes auto-scaling events?',
          ],
        },
        {
          id: 'cand-02',
          name: 'Priya Sharma',
          currentRole: 'Data Engineer at DataWave Labs',
          experienceYears: '3 yrs exp',
          compositeScore: 78,
          status: 'Shortlisted',
          oneLineVerdict:
            'Strong vector data and ETL engineer; capable on RAG ingestion but will require onboarding for high-throughput GPU model serving.',
          skillVectors: [
            {
              label: 'High-Throughput LLM Inference (vLLM/Triton)',
              matchScore: 62,
              evidence: '"Primarily uses cloud API endpoints; limited direct vLLM/Triton engine deployment." [Resume Sec 2.1]',
            },
            {
              label: 'Vector Search & RAG Architecture',
              matchScore: 88,
              evidence: '"Successfully built automated document embedding ingestion pipeline using pgvector and LangChain for 1.2M PDF policy documents." [Resume Sec 2.1]',
            },
            {
              label: 'Kubernetes GPU Scheduling',
              matchScore: 70,
              evidence: '"Managed Docker and Airflow pipelines; lighter Kubernetes GPU scheduling experience." [Resume Sec 2.3]',
            },
            {
              label: 'Observability & Guardrails',
              matchScore: 76,
              evidence: '"Managed Airflow DAG monitoring and data pipeline validation routines." [Resume Sec 2.3]',
            },
          ],
          keyStrengths: [
            'Proven enterprise document pipeline scaling across 1.2M PDFs.',
            'Solid Python, pgvector, and LangChain database foundation.',
            'Strong background in data pipeline resilience and nightly vector synchronization.',
          ],
          missingRequirements: [
            'Lacks deep vLLM/TensorRT-LLM model serving and AWQ quantization background.',
            'No direct Kubernetes GPU operator node scheduling experience.',
          ],
          potentialRedFlags: ['Focus is primarily data engineering rather than GPU inference optimization.'],
          interviewQuestions: [
            'How did you benchmark retrieval latency as your pgvector index grew past 1 million vectors?',
            'What trade-offs exist between HNSW and IVFFlat index types in PostgreSQL for vector search?',
            'How would you design a dead-letter queue for PDF documents that fail text extraction or embedding generation?',
          ],
        },
        {
          id: 'cand-03',
          name: 'Aman Joshi',
          currentRole: 'Junior ML Engineer at CloudTensor',
          experienceYears: '2 yrs exp',
          compositeScore: 68,
          status: 'Review Queue',
          oneLineVerdict:
            'Capable junior ML engineer with model fine-tuning experience, but lacks the high-throughput production infrastructure background.',
          skillVectors: [
            {
              label: 'High-Throughput LLM Inference (vLLM/Triton)',
              matchScore: 58,
              evidence: '"Deployed REST inference endpoints with Docker and FastAPI on single Nvidia T4 instances." [Resume Sec 2.2]',
            },
            {
              label: 'Vector Search & RAG Architecture',
              matchScore: 64,
              evidence: '"Basic embedding lookups and RAG demos; no large-scale hybrid retrieval experience." [Resume Sec 3.0]',
            },
            {
              label: 'Kubernetes GPU Scheduling',
              matchScore: 52,
              evidence: '"Single-container Docker deployments on standalone EC2 GPU VMs." [Resume Sec 2.2]',
            },
            {
              label: 'Observability & Guardrails',
              matchScore: 60,
              evidence: '"MLflow experiment tracking for LoRA fine-tuning hyperparameters." [Resume Sec 3.0]',
            },
          ],
          keyStrengths: [
            'Hands-on HuggingFace and LoRA adapter fine-tuning experience on Llama-3.',
            'Strong foundational Python, PyTorch, and Docker container skills.',
          ],
          missingRequirements: [
            'No experience with vLLM PagedAttention or TensorRT-LLM engine compilation.',
            'No Kubernetes GPU scheduling or multi-node distributed inference.',
            'No large-scale vector database production deployments.',
          ],
          potentialRedFlags: ['Experience is focused on batch training scripts rather than low-latency production APIs.'],
          interviewQuestions: [
            'What are the memory trade-offs between LoRA rank (r) and target module selection during Llama fine-tuning?',
            'How do you calculate the VRAM requirements for serving an 8B parameter model at fp16 vs 4-bit AWQ?',
            'How would you diagnose time-to-first-token latency bottlenecks in a FastAPI model server?',
          ],
        },
      ],
      telemetry: {
        latencyMs: 295,
        inputTokens: 1180,
        outputTokens: 620,
        totalTokens: 1800,
        estimatedCostUsd: 0.00026,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-frontend-lead',
    title: 'Lead Frontend Architect (React 19 / Next.js / Design Systems)',
    category: 'Frontend Engineering',
    jobTitle: 'Lead Frontend Architect (Design Systems & Web Performance)',
    jobDescription: `Looking for a Staff/Lead Frontend Architect to lead our web application UI architecture, design systems, and client performance.

Key Requirements:
- 5+ years building high-performance web applications with React, Next.js (App Router), TypeScript, and Tailwind CSS.
- Deep expertise in Design Systems, token pipelines, WCAG AAA accessibility, and Framer Motion micro-interactions.
- State management architecture (Zustand, React Server Components, Web Workers for client-side compute).
- Core Web Vitals optimization (sub-100ms INP, zero layout shift, sub-second LCP).`,
    customWeights: {
      'React 19 & Next.js Architecture': 35,
      'Design Systems & Motion Craft': 30,
      'Web Performance & Core Web Vitals': 20,
      'TypeScript & Ergonomic Contracts': 15,
    },
    sampleResumesText: `--- RESUME 1 ---
Candidate Name: Vikram Mehta
Current Role: Staff Frontend Engineer at DesignOS
Experience: 7 years
Summary: Frontend architect specializing in design systems, token architecture, and sub-100ms client performance.

Experience:
Staff Frontend Engineer — DesignOS (2021 - Present)
- Architected multi-brand design system with 40+ atomic components used by 180+ developers across 6 product teams.
- Optimized Core Web Vitals achieving 99 Performance Lighthouse scores and sub-80ms INP across entire product suite.
- Integrated React Server Components with leaf client component boundaries, reducing JavaScript bundle size by 42%.

Skills:
Languages & Frameworks: TypeScript, React 19, Next.js App Router, Tailwind CSS, Motion / Framer Motion
Performance & Testing: Web Vitals, Playwright, Vitest, Web Workers

--- RESUME 2 ---
Candidate Name: Sarah Jenkins
Current Role: Senior UI Engineer at MetricLayer
Experience: 5 years
Summary: Senior frontend engineer with strong design sensibility and interactive data visualization background.

Experience:
Senior UI Engineer — MetricLayer (2022 - Present)
- Built interactive dashboard telemetry canvases using Canvas API, WebGL, and React.
- Created reusable chart component library with dark/light theme tokens and keyboard navigation.
- Established strict TypeScript API contracts and zod validation pipelines for client-side forms.

Skills:
Languages: TypeScript, JavaScript, React, Next.js, CSS/Tailwind, D3.js

--- RESUME 3 ---
Candidate Name: Karan Malhotra
Current Role: Frontend Developer at WebCrafters Agency
Experience: 3 years
Summary: Frontend developer building client marketing websites and SaaS dashboards with Tailwind and React.

Experience:
Frontend Developer — WebCrafters Agency (2023 - Present)
- Developed responsive marketing sites and customer portals using Next.js and Tailwind CSS.
- Built reusable UI cards, modal dialogs, and navigation drawers.
- Assisted in migrating legacy CRA codebases to Next.js pages router.

Skills:
Languages: JavaScript, TypeScript, React, Next.js, HTML/CSS, Git`,
    precomputedResult: {
      batchId: 'norai_batch_fe_arch_003',
      jobTitle: 'Lead Frontend Architect (Design Systems & Web Performance)',
      totalEvaluated: 3,
      shortlistedCount: 2,
      summaryOverview:
        'The candidate batch reveals a world-class design engineering architect (Vikram Mehta, 94%), a strong data UI specialist (Sarah Jenkins, 82%), and a junior-mid agency developer (Karan Malhotra, 65%).',
      evaluationRubric: [
        {
          criteriaName: 'React 19 & Next.js Architecture',
          weightPercentage: 35,
          description: 'RSC server components, App Router, leaf client component isolation, Web Workers.',
        },
        {
          criteriaName: 'Design Systems & Motion Craft',
          weightPercentage: 30,
          description: 'Token system, 5-state ergonomics, WCAG AAA accessibility, Framer Motion physics.',
        },
        {
          criteriaName: 'Web Performance & Core Web Vitals',
          weightPercentage: 20,
          description: 'Sub-100ms INP, zero layout shift, bundle minimization, image optimization.',
        },
        {
          criteriaName: 'TypeScript & Ergonomic Contracts',
          weightPercentage: 15,
          description: 'Strict typing, Zod schema validation, modular component interfaces.',
        },
      ],
      candidates: [
        {
          id: 'cand-01',
          name: 'Vikram Mehta',
          currentRole: 'Staff Frontend Engineer at DesignOS',
          experienceYears: '7 yrs exp',
          compositeScore: 94,
          status: 'Top Match',
          oneLineVerdict:
            'Exceptional design engineer and architect with proven mastery scaling design systems and optimizing Core Web Vitals.',
          skillVectors: [
            {
              label: 'React 19 & Next.js Architecture',
              matchScore: 96,
              evidence: '"Integrated React Server Components with leaf client component boundaries, reducing JavaScript bundle size by 42%." [Resume Sec 2.3]',
            },
            {
              label: 'Design Systems & Motion Craft',
              matchScore: 95,
              evidence: '"Architected multi-brand design system with 40+ atomic components used by 180+ developers across 6 product teams." [Resume Sec 2.1]',
            },
            {
              label: 'Web Performance & Core Web Vitals',
              matchScore: 94,
              evidence: '"Optimized Core Web Vitals achieving 99 Performance Lighthouse scores and sub-80ms INP." [Resume Sec 2.2]',
            },
            {
              label: 'TypeScript & Ergonomic Contracts',
              matchScore: 91,
              evidence: '"Engineered strict token pipelines, type-safe theme contracts, and automated accessibility regression suites." [Resume Sec 3.0]',
            },
          ],
          keyStrengths: [
            'Proven track record architecting multi-brand design systems at enterprise scale (180+ devs).',
            'Deep expertise in React Server Components architecture and bundle optimization (42% cut).',
            'Relentless focus on Core Web Vitals (sub-80ms INP, 99 Lighthouse performance score).',
          ],
          missingRequirements: [],
          potentialRedFlags: ['None. 7 years of deep frontend specialization and staff-level leadership.'],
          interviewQuestions: [
            'How do you manage shared layout transitions and state hydration boundaries when combining React Server Components with client animation islands?',
            'What architectural strategies do you use to ensure zero layout shift (CLS: 0.0) when rendering dynamic server-streamed data?',
            'How do you structure design tokens in Tailwind CSS to support multi-theme runtime swapping without style recalculation lag?',
          ],
        },
        {
          id: 'cand-02',
          name: 'Sarah Jenkins',
          currentRole: 'Senior UI Engineer at MetricLayer',
          experienceYears: '5 yrs exp',
          compositeScore: 82,
          status: 'Shortlisted',
          oneLineVerdict:
            'Talented data visualization engineer with strong TypeScript and UI craft; well-suited for high-density analytics workbenches.',
          skillVectors: [
            {
              label: 'React 19 & Next.js Architecture',
              matchScore: 80,
              evidence: '"Built telemetry analytics applications with Next.js and custom state hooks." [Resume Sec 2.1]',
            },
            {
              label: 'Design Systems & Motion Craft',
              matchScore: 84,
              evidence: '"Created reusable chart component library with dark/light theme tokens and keyboard navigation." [Resume Sec 2.2]',
            },
            {
              label: 'Web Performance & Core Web Vitals',
              matchScore: 82,
              evidence: '"Optimized high-frequency canvas rendering loops for real-time telemetry dashboards." [Resume Sec 2.1]',
            },
            {
              label: 'TypeScript & Ergonomic Contracts',
              matchScore: 88,
              evidence: '"Established strict TypeScript API contracts and zod validation pipelines for client-side forms." [Resume Sec 2.3]',
            },
          ],
          keyStrengths: [
            'Excellent data visualization and Canvas / WebGL charting expertise.',
            'Strong TypeScript discipline with Zod schema validation.',
            'Solid component library development experience.',
          ],
          missingRequirements: [
            'Lacks extensive React Server Component App Router migration background.',
            'Less focus on multi-brand design system governance.',
          ],
          potentialRedFlags: ['Deepest experience is focused on charting tools rather than broad full-stack design systems.'],
          interviewQuestions: [
            'How do you optimize React re-render lifecycles when rendering real-time streaming time-series data at 60 FPS?',
            'What patterns do you use to ensure Canvas-rendered charts remain accessible to screen readers and keyboard users?',
            'How do you enforce type safety across complex polymorphic component props in TypeScript?',
          ],
        },
        {
          id: 'cand-03',
          name: 'Karan Malhotra',
          currentRole: 'Frontend Developer at WebCrafters Agency',
          experienceYears: '3 yrs exp',
          compositeScore: 65,
          status: 'Review Queue',
          oneLineVerdict:
            'Solid junior-mid developer with good Tailwind CSS and component building skills, but needs more senior architecture and performance experience.',
          skillVectors: [
            {
              label: 'React 19 & Next.js Architecture',
              matchScore: 68,
              evidence: '"Developed responsive marketing sites and customer portals using Next.js and Tailwind CSS." [Resume Sec 2.1]',
            },
            {
              label: 'Design Systems & Motion Craft',
              matchScore: 66,
              evidence: '"Built reusable UI cards, modal dialogs, and navigation drawers." [Resume Sec 2.2]',
            },
            {
              label: 'Web Performance & Core Web Vitals',
              matchScore: 60,
              evidence: '"Assisted in migrating legacy CRA codebases to Next.js pages router." [Resume Sec 2.3]',
            },
            {
              label: 'TypeScript & Ergonomic Contracts',
              matchScore: 64,
              evidence: '"Standard TypeScript component prop types and form state handlers." [Resume Sec 3.0]',
            },
          ],
          keyStrengths: [
            'Rapid UI prototyping with Tailwind CSS and Next.js.',
            'Good team collaboration across multiple client delivery deadlines.',
          ],
          missingRequirements: [
            'Does not meet 5+ year staff experience threshold (3 years).',
            'No deep React Server Components or Web Worker compute experience.',
            'No formal Core Web Vitals profiling or INP optimization background.',
          ],
          potentialRedFlags: ['Agency background with short project lifecycles rather than long-term architecture governance.'],
          interviewQuestions: [
            'How do you diagnose and fix an Interaction to Next Paint (INP) bottleneck on a slow React page?',
            'What is the difference between client-side state in Zustand vs server-side cache in React Server Components?',
            'How do you configure Tailwind theme tokens to prevent CSS bundle bloating in large codebases?',
          ],
        },
      ],
      telemetry: {
        latencyMs: 288,
        inputTokens: 1350,
        outputTokens: 710,
        totalTokens: 2060,
        estimatedCostUsd: 0.00029,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
];

export const COURSE_NOTES_PRESETS: CourseNotesPreset[] = [
  {
    id: 'preset-mit-raft',
    title: 'MIT 6.824: Raft Consensus Protocol & Leader Election',
    subject: 'Distributed Systems',
    instructor: 'Prof. Robert Morris (MIT CSAIL)',
    focusMode: 'Comprehensive Study Guide',
    sampleTranscriptText: `[00:00] Welcome back to 6.824. Today we are discussing the Raft consensus algorithm. In distributed systems, our goal is fault-tolerant state replication. We have multiple servers, and we want them to behave as a single reliable state machine even if some nodes crash or network partitions occur.
[05:20] Raft breaks consensus down into three independent sub-problems: Leader Election, Log Replication, and Safety. Every server is in one of three states: Leader, Follower, or Candidate.
[12:10] Let's look at Leader Election. Nodes start as Followers. If a follower does not hear a heartbeat from a leader within a randomized election timeout—typically between 150ms and 300ms—it transitions to a Candidate, increments its current term, votes for itself, and sends RequestVote RPCs to all other nodes.
[21:40] If the candidate receives votes from a strict majority (N/2 + 1) of nodes, it becomes the Leader and immediately broadcasts AppendEntries heartbeat RPCs.
[28:30] Now, Log Replication. When a client sends a state machine command to the leader, the leader appends the entry to its own local log. Then it broadcasts AppendEntries RPCs. Once the entry is safely replicated on a majority of nodes, the leader commits the entry and applies it to its state machine, then responds to the client.
[36:15] What about Safety? The Election Restriction rule ensures that a candidate cannot win an election unless its log contains all committed entries. Specifically, in RequestVote RPC, the receiver denies its vote if the candidate's log is less up-to-date than the receiver's own log (compared first by term of last entry, then by log length).
[42:50] To summarize: Raft guarantees state machine safety under up to f failures in a 2f + 1 cluster without ever producing split-brain states.`,
    precomputedResult: {
      lectureTitle: 'Raft Consensus Protocol & Fault-Tolerant Replicated State Machines',
      instructorOrSource: 'Prof. Robert Morris (MIT 6.824 / CSAIL)',
      estimatedDuration: '~45 mins',
      executiveAbstract:
        'This lecture dissects the Raft distributed consensus protocol, exploring how replicated state machines achieve deterministic fault tolerance across asynchronous networks by decomposing consensus into randomized leader elections, majority log replication, and the election safety restriction.',
      coreAxioms: [
        'State Invariant: Every cluster node must exist in exactly one of three states at any given moment: Follower, Candidate, or Leader.',
        'Quorum Rule: All state commits and leader election victories require explicit acknowledgment from a strict majority of nodes (\\lfloor N/2 \\rfloor + 1).',
        'Election Restriction: A candidate can only win an election if its log is at least as up-to-date as any majority voter (Term priority over Index length).',
        'Log Matching Property: If two logs contain an entry with the same index and term, they are identical in all entries up through the given index.',
      ],
      chapters: [
        {
          id: 'ch-01',
          timestamp: '00:00 - 12:10',
          title: 'Problem Formulation & The 3 Node States',
          summary:
            'Introduction to replicated state machines and the design motivation behind Raft as an understandable alternative to Multi-Paxos. Covers the fundamental state machine transitions between Follower, Candidate, and Leader.',
          keyTakeaways: [
            'Distributed consensus ensures a collection of machines agree on a sequence of state transitions despite node failures or network drops.',
            'Followers remain passive as long as periodic AppendEntries heartbeats are received from the active Leader.',
            'Heartbeat timeouts are deliberately randomized (150ms - 300ms) to prevent split-vote deadlocks.',
          ],
          formulasOrCode: [
            {
              label: 'Fault Tolerance Bound',
              formulaOrSnippet: 'N = 2f + 1 \\implies \\text{Tolerates } f \\text{ fail-stop crashes}',
              explanation: 'A cluster of 2f + 1 nodes can tolerate f concurrent node failures while maintaining an active quorum.',
            },
          ],
        },
        {
          id: 'ch-02',
          timestamp: '12:10 - 28:30',
          title: 'Randomized Leader Election & Term Increment',
          summary:
            'Step-by-step breakdown of the election lifecycle. How missed heartbeats trigger candidate elevation, term incrementation, and majority vote gathering.',
          keyTakeaways: [
            'Candidates increment currentTerm before broadcasting RequestVote RPCs.',
            'Each server votes at most once per term on a first-come, first-served basis subject to safety restrictions.',
            'Split votes are resolved through randomized election timeouts that stagger retry attempts.',
          ],
          formulasOrCode: [
            {
              label: 'Majority Quorum Condition',
              formulaOrSnippet: 'V_{\\text{granted}} \\ge \\left\\lfloor \\frac{N}{2} \\right\\rfloor + 1',
              explanation: 'Strict majority required to transition from Candidate to Leader state.',
            },
          ],
        },
        {
          id: 'ch-03',
          timestamp: '28:30 - 45:00',
          title: 'Log Replication Pipeline & Election Safety Restriction',
          summary:
            'Analysis of two-phase client commit mechanics and the critical Election Restriction check preventing uncommitted log truncation.',
          keyTakeaways: [
            'Client requests are appended locally by the Leader and synchronized via AppendEntries RPCs.',
            'An entry is committed once present on a majority of cluster nodes.',
            'Voters reject RequestVote RPCs if candidate.lastLogTerm < voter.lastLogTerm or (candidate.lastLogTerm == voter.lastLogTerm and candidate.lastLogIndex < voter.lastLogIndex).',
          ],
          formulasOrCode: [
            {
              label: 'Log Up-to-Date Safety Rule',
              formulaOrSnippet: '(t_{\\text{cand}} > t_{\\text{voter}}) \\lor (t_{\\text{cand}} = t_{\\text{voter}} \\land i_{\\text{cand}} \\ge i_{\\text{voter}})',
              explanation: 'Condition required for a voter to grant its vote to a candidate in RequestVote RPC.',
            },
          ],
        },
      ],
      flashcards: [
        {
          id: 'card-01',
          category: 'Node Roles',
          frontPrompt: 'What happens when a Follower misses heartbeats during its election timeout window?',
          backAnswer:
            'It transitions to the Candidate state, increments currentTerm, votes for itself, and broadcasts RequestVote RPCs to all peers.',
          difficulty: 'Foundational',
        },
        {
          id: 'card-02',
          category: 'Quorum Bounds',
          frontPrompt: 'In a 5-node cluster, what is the maximum number of failed nodes that can be tolerated without halting consensus?',
          backAnswer:
            '2 nodes. A 5-node cluster requires 3 nodes (\\lfloor 5/2 \\rfloor + 1 = 3) to form a functioning majority quorum.',
          difficulty: 'Foundational',
        },
        {
          id: 'card-03',
          category: 'Election Safety',
          frontPrompt: 'Explain the Election Restriction rule in Raft.',
          backAnswer:
            'A server rejects RequestVote if the candidate’s log is less up-to-date than its own. Term is evaluated first; if terms are equal, log length (lastLogIndex) is evaluated.',
          difficulty: 'Intermediate',
        },
        {
          id: 'card-04',
          category: 'Split-Brain Prevention',
          frontPrompt: 'How does Raft guarantee that two leaders cannot be elected in the same term?',
          backAnswer:
            'Each server votes at most once per term, and a candidate must win a strict majority. Any two majorities must overlap in at least one common server.',
          difficulty: 'Advanced',
        },
      ],
      quiz: [
        {
          id: 'q-01',
          topic: 'Leader Election Quorum',
          question: 'In a 7-node Raft cluster, what is the minimum number of affirmative votes a candidate requires to become Leader?',
          options: ['3 votes', '4 votes', '5 votes', '7 votes (unanimous)'],
          correctAnswerIndex: 1,
          explanation:
            'In a cluster of size N=7, majority quorum is \\lfloor 7/2 \\rfloor + 1 = 4 affirmative votes.',
        },
        {
          id: 'q-02',
          topic: 'Election Restriction Rule',
          question:
            'Server A has lastLogTerm=3, lastLogIndex=8. Server B has lastLogTerm=4, lastLogIndex=5. If Server A asks Server B for a vote, what happens?',
          options: [
            'Server B grants the vote because Server A has a longer log (8 > 5).',
            'Server B denies the vote because Server B has a higher term (4 > 3).',
            'Server B grants the vote because higher log index always overrides term.',
            'Server B crashes due to term conflict.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Raft compares terms first. Since Server B has entries in term 4 while Server A only has entries up to term 3, Server B has a more up-to-date log and rejects Server A’s vote request.',
        },
        {
          id: 'q-03',
          topic: 'Log Commitment Invariant',
          question: 'When is a log entry considered formally "committed" in Raft?',
          options: [
            'When the client receives a 200 OK acknowledgment from the leader.',
            'When the leader has written the entry to its local disk.',
            'When the entry is replicated on a strict majority of cluster nodes by the current term leader.',
            'When all non-faulty nodes confirm execution in memory.',
          ],
          correctAnswerIndex: 2,
          explanation:
            'An entry is committed once the leader in the current term has successfully replicated it across a majority of nodes.',
        },
      ],
      telemetry: {
        latencyMs: 340,
        inputTokens: 1650,
        outputTokens: 980,
        totalTokens: 2630,
        estimatedCostUsd: 0.00041,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-cs229-ml',
    title: 'Stanford CS229: Backpropagation & Neural Optimization',
    subject: 'Machine Learning & Deep Learning',
    instructor: 'Prof. Andrew Ng (Stanford AI Lab)',
    focusMode: 'Formulas & Axioms',
    sampleTranscriptText: `[00:00] Today we derive the backpropagation algorithm for multi-layer neural networks. We start with a supervised learning dataset and a forward propagation pass through layer l.
[08:15] Let a^[l] denote the activations at layer l, with z^[l] = W^[l] a^[l-1] + b^[l]. We apply an element-wise activation function g(z).
[17:30] For binary classification, our loss function is binary cross-entropy: L(y_hat, y) = - [y log(y_hat) + (1-y) log(1 - y_hat)].
[26:45] To update weights using Gradient Descent, we need dL/dW^[l]. Using the multivariate chain rule, we define delta^[l] = dL/dz^[l].
[35:10] The fundamental recurrence relation is delta^[l] = (W^[l+1]^T delta^[l+1]) * g'^[l](z^[l]), where * denotes the Hadamard element-wise product.
[44:00] Finally, dL/dW^[l] = (1/m) * delta^[l] (a^[l-1])^T, and we update W^[l] := W^[l] - alpha * dL/dW^[l].`,
    precomputedResult: {
      lectureTitle: 'Backpropagation Calculus, Loss Optimization & Gradient Descent',
      instructorOrSource: 'Prof. Andrew Ng (Stanford CS229)',
      estimatedDuration: '~50 mins',
      executiveAbstract:
        'A rigorous mathematical derivation of forward propagation, multivariate loss gradients, backpropagation error propagation via the chain rule, and parameter update dynamics across deep neural architectures.',
      coreAxioms: [
        'Forward Pass Invariant: Pre-activation linear transforms (z = Wa + b) precede non-linear activation mappings (a = g(z)).',
        'Chain Rule Conservation: Gradient vectors propagate backward from output error deltas through transposed weight matrices.',
        'Hadamard Error Scaling: Error vectors are element-wise modulated by the local first derivative of the layer activation function.',
        'Gradient Descent Update: Parameter tensors shift in the direction opposing the loss gradient scaled by learning rate \\alpha.',
      ],
      chapters: [
        {
          id: 'ch-01',
          timestamp: '00:00 - 17:30',
          title: 'Forward Propagation Dynamics & Binary Cross-Entropy',
          summary:
            'Formulates linear affine transformations at layer l, activation non-linearities, and the cost formulation over m training samples.',
          keyTakeaways: [
            'Forward pass computes activations sequentially from layer 1 to output layer L.',
            'Cross-entropy penalizes confident incorrect predictions exponentially.',
          ],
          formulasOrCode: [
            {
              label: 'Affine Forward Transform',
              formulaOrSnippet: 'z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = g^{[l]}(z^{[l]})',
              explanation: 'Linear combination of prior layer activations followed by non-linear activation function g.',
            },
            {
              label: 'Binary Cross-Entropy Loss',
              formulaOrSnippet: '\\mathcal{L}(\\hat{y}, y) = -\\left[ y \\log(\\hat{y}) + (1-y) \\log(1-\\hat{y}) \\right]',
              explanation: 'Per-sample loss measuring divergence between target label and model probability.',
            },
          ],
        },
        {
          id: 'ch-02',
          timestamp: '17:30 - 50:00',
          title: 'Backward Propagation & Weight Updates',
          summary:
            'Derivation of error vector delta, backward gradient propagation, and mini-batch stochastic gradient descent updates.',
          keyTakeaways: [
            'Delta represents the sensitivity of the final loss with respect to intermediate pre-activation values.',
            'Weight matrix gradients equal the outer product of error delta and previous layer activations.',
            'Hadamard product scales gradients by the local activation derivative.',
          ],
          formulasOrCode: [
            {
              label: 'Backprop Error Recurrence',
              formulaOrSnippet: '\\delta^{[l]} = \\left( (W^{[l+1]})^T \\delta^{[l+1]} \\right) \\odot g\'^{[l]}(z^{[l]})',
              explanation: 'Propagation of error vector across layers using transposed weights and Hadamard product with activation derivative.',
            },
            {
              label: 'Weight Gradient Tensor',
              formulaOrSnippet: '\\frac{\\partial \\mathcal{J}}{\\partial W^{[l]}} = \\frac{1}{m} \\delta^{[l]} (a^{[l-1]})^T',
              explanation: 'Average gradient across m training examples used for SGD parameter updates.',
            },
          ],
        },
      ],
      flashcards: [
        {
          id: 'card-01',
          category: 'Gradients',
          frontPrompt: 'What mathematical operation links the error vector of layer l+1 to layer l in backpropagation?',
          backAnswer:
            'Multiplication by the transposed weight matrix (W^{[l+1]})^T followed by element-wise Hadamard multiplication with g\'(z^{[l]}).',
          difficulty: 'Intermediate',
        },
        {
          id: 'card-02',
          category: 'Loss Functions',
          frontPrompt: 'Why is Cross-Entropy preferred over Mean Squared Error (MSE) for logistic/softmax classification?',
          backAnswer:
            'Cross-entropy avoids vanishing gradients in saturated sigmoid regions by canceling out exponential terms during differentiation, producing linear error scaling.',
          difficulty: 'Advanced',
        },
        {
          id: 'card-03',
          category: 'Optimization',
          frontPrompt: 'State the parameter update rule for weight matrix W^{[l]} with learning rate \\alpha.',
          backAnswer:
            'W^{[l]} := W^{[l]} - \\alpha \\frac{\\partial \\mathcal{J}}{\\partial W^{[l]}} where the gradient is computed over the batch.',
          difficulty: 'Foundational',
        },
      ],
      quiz: [
        {
          id: 'q-01',
          topic: 'Backpropagation Vector Dimensions',
          question:
            'If layer l has n^{[l]} neurons and layer l-1 has n^{[l-1]} neurons, what is the matrix dimension of dL/dW^{[l]}?',
          options: [
            '(n^{[l]} \\times n^{[l-1]})',
            '(n^{[l-1]} \\times n^{[l]})',
            '(n^{[l]} \\times 1)',
            '(1 \\times n^{[l-1]})',
          ],
          correctAnswerIndex: 0,
          explanation:
            'The gradient matrix dL/dW^{[l]} must strictly match the dimension of the weight matrix W^{[l]}, which is (n^{[l]} \\times n^{[l-1]}).',
        },
        {
          id: 'q-02',
          topic: 'Hadamard Product in Error Delta',
          question:
            'In the recurrence relation \\delta^{[l]} = (W^{[l+1]T} \\delta^{[l+1]}) \\odot g\'^{[l]}(z^{[l]}), what does the \\odot operator denote?',
          options: [
            'Matrix multiplication',
            'Element-wise (Hadamard) product',
            'Cross product',
            'Tensor contraction',
          ],
          correctAnswerIndex: 1,
          explanation:
            'The \\odot symbol represents element-wise (Hadamard) product between the backpropagated linear gradient and the activation derivative.',
        },
      ],
      telemetry: {
        latencyMs: 310,
        inputTokens: 1400,
        outputTokens: 820,
        totalTokens: 2220,
        estimatedCostUsd: 0.00034,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-cs162-os',
    title: 'UC Berkeley CS162: Virtual Memory Paging & TLB Translation',
    subject: 'Operating Systems & Architecture',
    instructor: 'Prof. Anthony Joseph (UC Berkeley)',
    focusMode: 'Formulas & Axioms',
    sampleTranscriptText: `[00:00] Welcome to CS162 Lecture 14 on Virtual Memory. Today we explore multi-level page tables, Translation Lookaside Buffers (TLBs), and demand paging page replacement policies.
[09:30] A virtual address consists of a Virtual Page Number (VPN) and a Page Offset. For a 32-bit system with 4KB pages, the offset is 12 bits (2^12 = 4096), leaving 20 bits for the VPN.
[18:45] To avoid allocating 4MB of page table per process, we use a 2-level page table: VPN is split into 10-bit Page Directory Index (PDI) and 10-bit Page Table Index (PTI).
[28:10] The TLB acts as a fully associative hardware cache for address translations. If a translation hits in the TLB, latency is under 1ns. If it misses, the MMU performs a 2-level memory walk.
[37:25] The Effective Memory Access Time (EMAT) is calculated as: EMAT = Hit_TLB * t_TLB + (1 - Hit_TLB) * (t_TLB + 2 * t_DRAM).
[46:00] Under memory pressure, the Clock (Second-Chance) algorithm approximates LRU by examining the Use bit before evicting dirty pages to swap space.`,
    precomputedResult: {
      lectureTitle: 'Virtual Memory Paging, Multi-Level Page Tables & TLB Translation',
      instructorOrSource: 'Prof. Anthony Joseph (UC Berkeley CS162)',
      estimatedDuration: '~52 mins',
      executiveAbstract:
        'An in-depth systems analysis of hardware virtual-to-physical address translation, multi-level hierarchical page tables, Translation Lookaside Buffer (TLB) hit ratios, and Working Set page eviction mechanics.',
      coreAxioms: [
        'Spatial Isolation Invariant: Every user process operates within a private 32-bit/64-bit virtual address space mapped dynamically to physical DRAM frames.',
        'Address Decomposition: Virtual addresses partition into Virtual Page Number (VPN) indices and Page Offset bits: \\text{Offset} = \\log_2(\\text{PageSize}).',
        'Hierarchical Table Conservation: Multi-level page tables allocate inner page tables on-demand, reducing memory footprints from \\mathcal{O}(2^{\\text{VPN}}) to active working sets.',
        'TLB Translation Principle: Hardware TLB lookups bypass DRAM page walks with sub-nanosecond cache hits.',
      ],
      chapters: [
        {
          id: 'ch-01',
          timestamp: '00:00 - 18:45',
          title: 'Virtual Address Decomposition & Multi-Level Page Tables',
          summary:
            'Explains virtual page addressing, offset bit allocation for 4KB pages, and two-level page table indexing (PDI/PTI) to minimize memory table overhead.',
          keyTakeaways: [
            'Offset determines the byte index within a page frame and is passed directly to the physical address.',
            'Two-level paging allows sparsely populated address spaces to omit unallocated page tables.',
          ],
          formulasOrCode: [
            {
              label: 'Virtual Address Bit Partition',
              formulaOrSnippet: '\\text{VPN} = \\text{Address} \\gg 12, \\quad \\text{Offset} = \\text{Address} \\land (2^{12} - 1)',
              explanation: 'Bitwise decomposition of a 32-bit address into a 20-bit VPN and 12-bit page offset.',
            },
          ],
        },
        {
          id: 'ch-02',
          timestamp: '18:45 - 37:25',
          title: 'Translation Lookaside Buffer (TLB) & Effective Access Time',
          summary:
            'Formulation of TLB cache hits, MMU page table walks on TLB miss, and mathematical derivation of Effective Memory Access Time (EMAT).',
          keyTakeaways: [
            'A TLB hit avoids memory lookups and translates addresses in 1 CPU clock cycle.',
            'A TLB miss triggers a multi-level table walk, requiring 2 or more DRAM accesses.',
          ],
          formulasOrCode: [
            {
              label: 'Effective Memory Access Time (EMAT)',
              formulaOrSnippet: '\\text{EMAT} = h_{\\text{TLB}} \\cdot t_{\\text{TLB}} + (1 - h_{\\text{TLB}}) \\cdot (t_{\\text{TLB}} + 2 \\cdot t_{\\text{DRAM}})',
              explanation: 'Weighted average access latency taking into account TLB hit rate h and two DRAM table lookups.',
            },
          ],
        },
        {
          id: 'ch-03',
          timestamp: '37:25 - 52:00',
          title: 'Page Eviction, Second-Chance Clock & Working Sets',
          summary:
            'Analysis of demand paging page faults, dirty page writeback to swap storage, and the Second-Chance Clock replacement heuristic.',
          keyTakeaways: [
            'Clock algorithm sweeps page frames, clearing the Use bit and evicting the first page found with Use=0.',
            'Dirty pages require asynchronous disk writeback before physical frames can be reclaimed.',
          ],
          formulasOrCode: [
            {
              label: 'Working Set Condition',
              formulaOrSnippet: 'W(t, \\Delta) = \\{ p \\in \\text{Pages} \\mid p \\text{ referenced in } [t-\\Delta, t] \\}',
              explanation: 'Set of active memory pages required by a process in time window Delta to prevent thrashing.',
            },
          ],
        },
      ],
      flashcards: [
        {
          id: 'card-01',
          category: 'Address Translation',
          frontPrompt: 'For a 32-bit virtual address with 4KB pages, how many bits are allocated to the Page Offset?',
          backAnswer:
            '12 bits (2^{12} = 4096 bytes). The remaining 20 bits are allocated to the Virtual Page Number (VPN).',
          difficulty: 'Foundational',
        },
        {
          id: 'card-02',
          category: 'Memory Performance',
          frontPrompt: 'If TLB hit rate is 98%, t_TLB = 1ns, and t_DRAM = 50ns, calculate EMAT for a 2-level page table.',
          backAnswer:
            'EMAT = 0.98 * (1 + 50) + 0.02 * (1 + 50 + 100) = 49.98 + 3.02 = 53.0 ns.',
          difficulty: 'Advanced',
        },
        {
          id: 'card-03',
          category: 'Page Replacement',
          frontPrompt: 'How does the Second-Chance (Clock) page replacement algorithm handle a page with Use bit = 1?',
          backAnswer:
            'It clears the Use bit to 0, advances the clock hand, and gives the page a second chance instead of immediately evicting it.',
          difficulty: 'Intermediate',
        },
      ],
      quiz: [
        {
          id: 'q-01',
          topic: 'Page Table Memory Footprint',
          question: 'Why do modern operating systems utilize multi-level page tables instead of single-level flat arrays?',
          options: [
            'Single-level tables are slower in CPU cache lookups.',
            'Multi-level page tables only allocate page table entries for allocated virtual address ranges, saving megabytes of DRAM per process.',
            'Single-level page tables do not support 64-bit architectures.',
            'Multi-level tables eliminate the need for a hardware MMU.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'A flat 32-bit table requires 4MB of contiguous DRAM per process. Multi-level tables allocate directory nodes on demand, reducing empty space overhead.',
        },
        {
          id: 'q-02',
          topic: 'TLB Miss Penalty',
          question: 'In a 3-level page table system without inverted hashing, how many DRAM reads occur on a complete TLB miss before the target data can be read?',
          options: ['1 read', '2 reads', '3 reads (1 for each page table level)', '4 reads'],
          correctAnswerIndex: 2,
          explanation:
            'The MMU must read Page Directory Level 1, Level 2, and Level 3 before translating the physical address (3 memory walks).',
        },
      ],
      telemetry: {
        latencyMs: 325,
        inputTokens: 1520,
        outputTokens: 890,
        totalTokens: 2410,
        estimatedCostUsd: 0.00038,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
];

export const CHAT_DIGEST_PRESETS: ChatDigestPreset[] = [
  {
    id: 'preset-discord-dev',
    title: 'SuperBase Developer Discord (1,850 messages)',
    platform: 'Discord',
    communityName: 'SuperBase Developer Community',
    timeframe: 'Last 24 Hours',
    sampleChatLogText: `[10:14] @alex_dev (#dev-announcements): Hey team, we just pushed v2.4.0 with edge streaming support!
[10:15] @bot_welcome (#welcome): Welcome @sarah_k to SuperBase Discord! Check rules in #announcements.
[10:18] @sarah_k (#sdk-help): thanks! quick question: does the new Python SDK support async connection pooling?
[10:20] @marcus_eng (#sdk-help): @sarah_k yes! use AsyncClient(pool_size=20). Full docs on docs.superbase.dev/python.
[11:05] @vikram_ops (#incident-response): [BUG] Encountered 504 Gateway Timeout on /v1/auth/session when executing with Postgres read replica failover.
[11:08] @alex_dev (#incident-response): @vikram_ops looking into this now. It looks like the replica healthcheck timeout is set to 5000ms instead of 500ms.
[11:30] @crypto_sam (#trading-banter): gm everyone!! to the moon 🚀🚀🚀
[11:31] @bot_mod (#trading-banter): Please keep price talk in #trading-banter.
[12:15] @elena_ai (#product-feedback): Feature request: Can we get automated webhook retry headers with exponential backoff metadata?
[12:18] @marcus_eng (#product-feedback): @elena_ai great idea, opened GitHub issue #402 for our next sprint.
[13:00] @meme_lord (#memes): [image attached: cat typing at 1000 wpm on mechanical keyboard]
[14:40] @david_sec (#dev-announcements): Verified SOC2 Type II audit report is now available in developer portal for enterprise teams.
[15:20] @vikram_ops (#incident-response): Update: v2.4.1 hotfix resolved the auth session timeout! Confirmed working under 2,000 req/sec load.
[16:10] @dev_rohit (#sdk-help): Can we run the vector search engine in local offline mock mode for CI unit tests?
[16:15] @alex_dev (#sdk-help): @dev_rohit yes, pass mockVectorStore=true in client options. Adding this to quickstart recipes.`,
    precomputedResult: {
      communityName: 'SuperBase Developer Community',
      timeframeCovered: 'Last 24 Hours',
      totalRawMessages: 1850,
      filteredSignalMessages: 412,
      spamFilteredPercentage: 77.7,
      overallSentiment: 'Bullish / Enthusiastic',
      sentimentScore: 91,
      executiveBrief:
        'Major community excitement surrounding the v2.4.0 edge streaming release. A high-priority P0 auth timeout bug during Postgres read replica failover was detected by @vikram_ops and hotfixed in under 4 hours with v2.4.1. Enterprise users welcomed the SOC2 Type II audit report, and webhook retry metadata was prioritized for Sprint 18.',
      activeChannels: ['#dev-announcements', '#incident-response', '#sdk-help', '#product-feedback', '#trading-banter'],
      topicClusters: [
        {
          id: 'topic-01',
          topicName: 'v2.4.0 Edge Streaming & SDK Async Support',
          channelOrContext: '#dev-announcements & #sdk-help',
          messageCount: 86,
          sentiment: 'Positive',
          sentimentScore: 95,
          status: 'RESOLVED',
          channelTags: ['#dev-announcements', '#sdk-help'],
          participantHandles: ['@alex_dev', '@sarah_k', '@marcus_eng'],
          impactSummary: 'High adoption impact; edge streaming reduces client TTFT by 45%.',
          summary:
            'Developers celebrated the launch of v2.4.0 edge streaming. Clarifications were provided on Python SDK async pooling configuration with AsyncClient(pool_size=20).',
          keyQuotations: [
            '@sarah_k: "does the new Python SDK support async connection pooling?"',
            '@marcus_eng: "yes! use AsyncClient(pool_size=20). Full docs on docs.superbase.dev/python."',
            '@alex_dev: "we just pushed v2.4.0 with edge streaming support!"',
          ],
        },
        {
          id: 'topic-02',
          topicName: 'Auth 504 Gateway Timeout Hotfix (v2.4.1)',
          channelOrContext: '#incident-response',
          messageCount: 54,
          sentiment: 'Mixed',
          sentimentScore: 82,
          status: 'RESOLVED',
          channelTags: ['#incident-response'],
          participantHandles: ['@vikram_ops', '@alex_dev'],
          impactSummary: 'Critical P0 incident resolved in <4 hrs; zero customer data loss.',
          summary:
            'A 504 timeout bug on session auth during replica failover was reported by @vikram_ops and resolved with v2.4.1 by recalibrating healthcheck timeouts to 500ms.',
          keyQuotations: [
            '@vikram_ops: "[BUG] Encountered 504 Gateway Timeout on /v1/auth/session when executing with Postgres read replica failover."',
            '@alex_dev: "replica healthcheck timeout is set to 5000ms instead of 500ms."',
            '@vikram_ops: "Update: v2.4.1 hotfix resolved the auth session timeout! Confirmed working under 2,000 req/sec load."',
          ],
        },
        {
          id: 'topic-03',
          topicName: 'SOC2 Type II Compliance & Webhook Backoff',
          channelOrContext: '#product-feedback & #dev-announcements',
          messageCount: 32,
          sentiment: 'Positive',
          sentimentScore: 92,
          status: 'IN PROGRESS',
          channelTags: ['#product-feedback', '#dev-announcements'],
          participantHandles: ['@david_sec', '@elena_ai', '@marcus_eng'],
          impactSummary: 'Unblocks enterprise compliance reviews and improves webhook reliability.',
          summary:
            'Enterprise teams welcomed SOC2 audit availability. Webhook retry headers with exponential backoff metadata were queued for the upcoming Sprint 18 release (#402).',
          keyQuotations: [
            '@david_sec: "Verified SOC2 Type II audit report is now available in developer portal for enterprise teams."',
            '@elena_ai: "Can we get automated webhook retry headers with exponential backoff metadata?"',
            '@marcus_eng: "great idea, opened GitHub issue #402 for our next sprint."',
          ],
        },
        {
          id: 'topic-04',
          topicName: 'Local Offline Testing & Mock Vector Store',
          channelOrContext: '#sdk-help',
          messageCount: 28,
          sentiment: 'Neutral',
          sentimentScore: 78,
          status: 'ACTIVE DEBATE',
          channelTags: ['#sdk-help'],
          participantHandles: ['@dev_rohit', '@alex_dev'],
          impactSummary: 'Reduces test suite runtimes from 40s to 1.2s in CI environments.',
          summary:
            'Discussion on running vector searches offline in CI pipelines using mock stores without provisioning live Qdrant instances.',
          keyQuotations: [
            '@dev_rohit: "Can we run the vector search engine in local offline mock mode for CI unit tests?"',
            '@alex_dev: "yes, pass mockVectorStore=true in client options. Adding this to quickstart recipes."',
          ],
        },
      ],
      actionItemsAndBugs: [
        {
          id: 'bug-01',
          type: 'Bug Report',
          priority: 'Urgent',
          priorityCode: 'P0',
          title: '504 Gateway Timeout on Postgres Read Replica Failover',
          description:
            'Replica healthcheck timeout was misconfigured at 5000ms, causing auth session timeouts during replica transitions.',
          reporterHandle: '@vikram_ops',
          recommendedTriage: 'Resolved via v2.4.1 hotfix; add automated failover latency test in CI pipeline.',
          status: 'Completed',
          assignee: { name: 'Alex Dev', handle: '@alex_dev', role: 'Staff Backend Lead' },
          sourceMessageRef: '[11:05] #incident-response',
          targetIntegration: 'Linear',
        },
        {
          id: 'feat-01',
          type: 'Feature Request',
          priority: 'High',
          priorityCode: 'P1',
          title: 'Exponential Backoff Metadata in Webhook Dispatches',
          description:
            'Provide attempt count and next retry timestamp headers on failed webhook delivery retries.',
          reporterHandle: '@elena_ai',
          recommendedTriage: 'Tracked in GitHub issue #402 for Sprint 18 release.',
          status: 'In Progress',
          assignee: { name: 'Marcus Eng', handle: '@marcus_eng', role: 'Integrations Architect' },
          sourceMessageRef: '[12:15] #product-feedback',
          targetIntegration: 'GitHub',
        },
        {
          id: 'doc-01',
          type: 'Community Action',
          priority: 'Medium',
          priorityCode: 'P2',
          title: 'Document AsyncClient Connection Pooling in Python SDK',
          description:
            'Create dedicated recipe showing AsyncClient(pool_size=20) with uvloop FastAPI setups.',
          reporterHandle: '@sarah_k',
          recommendedTriage: 'Update docs.superbase.dev/python with copy-pasteable snippet.',
          status: 'Open',
          assignee: { name: 'Sarah Jenkins', handle: '@sarah_k', role: 'Developer Advocate' },
          sourceMessageRef: '[10:18] #sdk-help',
          targetIntegration: 'Notion',
        },
        {
          id: 'sec-01',
          type: 'Community Action',
          priority: 'Low',
          priorityCode: 'P3',
          title: 'Publish SOC2 Type II Audit Whitepaper on Portal',
          description:
            'Make the audited report downloadable behind NDA gating in the customer organization settings.',
          reporterHandle: '@david_sec',
          recommendedTriage: 'Notify sales engineering and link in enterprise pricing tier.',
          status: 'Completed',
          assignee: { name: 'David Sec', handle: '@david_sec', role: 'Security & Compliance Lead' },
          sourceMessageRef: '[14:40] #dev-announcements',
          targetIntegration: 'Slack',
        },
      ],
      rawMessages: [
        {
          id: 'msg-01',
          timestamp: '10:14',
          author: '@alex_dev',
          channel: '#dev-announcements',
          content: 'Hey team, we just pushed v2.4.0 with edge streaming support!',
          isSignal: true,
          signalConfidence: 98,
          category: 'Announcement',
        },
        {
          id: 'msg-02',
          timestamp: '10:15',
          author: '@bot_welcome',
          channel: '#welcome',
          content: 'Welcome @sarah_k to SuperBase Discord! Check rules in #announcements.',
          isSignal: false,
          signalConfidence: 5,
          category: 'Spam',
        },
        {
          id: 'msg-03',
          timestamp: '10:18',
          author: '@sarah_k',
          channel: '#sdk-help',
          content: 'thanks! quick question: does the new Python SDK support async connection pooling?',
          isSignal: true,
          signalConfidence: 88,
          category: 'Question',
        },
        {
          id: 'msg-04',
          timestamp: '10:20',
          author: '@marcus_eng',
          channel: '#sdk-help',
          content: '@sarah_k yes! use AsyncClient(pool_size=20). Full docs on docs.superbase.dev/python.',
          isSignal: true,
          signalConfidence: 94,
          category: 'General',
        },
        {
          id: 'msg-05',
          timestamp: '11:05',
          author: '@vikram_ops',
          channel: '#incident-response',
          content: '[BUG] Encountered 504 Gateway Timeout on /v1/auth/session when executing with Postgres read replica failover.',
          isSignal: true,
          signalConfidence: 99,
          category: 'Bug',
        },
        {
          id: 'msg-06',
          timestamp: '11:08',
          author: '@alex_dev',
          channel: '#incident-response',
          content: '@vikram_ops looking into this now. It looks like the replica healthcheck timeout is set to 5000ms instead of 500ms.',
          isSignal: true,
          signalConfidence: 96,
          category: 'Bug',
        },
        {
          id: 'msg-07',
          timestamp: '11:30',
          author: '@crypto_sam',
          channel: '#trading-banter',
          content: 'gm everyone!! to the moon 🚀🚀🚀',
          isSignal: false,
          signalConfidence: 2,
          category: 'Spam',
        },
        {
          id: 'msg-08',
          timestamp: '12:15',
          author: '@elena_ai',
          channel: '#product-feedback',
          content: 'Feature request: Can we get automated webhook retry headers with exponential backoff metadata?',
          isSignal: true,
          signalConfidence: 92,
          category: 'Feature',
        },
        {
          id: 'msg-09',
          timestamp: '14:40',
          author: '@david_sec',
          channel: '#dev-announcements',
          content: 'Verified SOC2 Type II audit report is now available in developer portal for enterprise teams.',
          isSignal: true,
          signalConfidence: 95,
          category: 'Announcement',
        },
        {
          id: 'msg-10',
          timestamp: '15:20',
          author: '@vikram_ops',
          channel: '#incident-response',
          content: 'Update: v2.4.1 hotfix resolved the auth session timeout! Confirmed working under 2,000 req/sec load.',
          isSignal: true,
          signalConfidence: 99,
          category: 'Bug',
        },
      ],
      formattedNewsletter: {
        headline: 'SuperBase Daily Digest: v2.4.0 Streaming Live + Hotfix Deployed',
        introParagraph:
          'What an action-packed day for the SuperBase engineering ecosystem! We shipped v2.4.0 edge streaming, resolved a critical failover bug in under 4 hours, and announced SOC2 Type II compliance for enterprise teams.',
        spotlightSection:
          'Special thanks to @vikram_ops and @alex_dev for rapid bug discovery and patch verification under 2,000 requests/sec peak load.',
        communityShoutouts: [
          '@sarah_k for initiating deep Python SDK async connection pooling discussions',
          '@elena_ai for inspiring GitHub issue #402 with webhook retry improvements',
          '@dev_rohit for pushing forward offline local CI testing recipes',
        ],
        closingCallToAction:
          'Upgrade your dependencies to v2.4.1 today: npm i superbase-client@latest',
      },
      telemetry: {
        latencyMs: 280,
        inputTokens: 1350,
        outputTokens: 750,
        totalTokens: 2100,
        estimatedCostUsd: 0.00031,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-slack-ai',
    title: 'NextGen AI Builders Guild Slack (2,400 messages)',
    platform: 'Slack',
    communityName: 'NextGen AI Builders Guild',
    timeframe: 'Past 7 Days',
    sampleChatLogText: `[Monday 09:30] @dr_siddharth (#vllm-deployments): We observed a 12% KV-cache memory fragmentation issue on vLLM v0.5.2 when serving long context prompts (>16k tokens).
[Monday 10:15] @priya_data (#prompt-craft): Benchmarking Qdrant hybrid retrieval: BM25 + dense text-embedding-3-large with reciprocal rank fusion yields a 91.4% MRR@10.
[Tuesday 14:20] @karan_dev (#model-inference): [P0 CRITICAL] Ray Serve worker pods crashlooping due to OOM when AWQ model weights reload concurrently across 4 GPU nodes.
[Tuesday 15:45] @dr_siddharth (#model-inference): Fix: Added staggered node warmup delay (30s stagger) in K8s statefulset. PR #182 merged.
[Wednesday 11:10] @elena_ai (#infra-alerts): Prometheus alert: TTFT spiked to 450ms during midday inference load on US-East GPU cluster.
[Thursday 16:00] @sarah_k (#prompt-craft): Anyone tested the new tool calling schema in Gemini 3.5 Lite vs GPT-4o? Precision is at 98.2%.`,
    precomputedResult: {
      communityName: 'NextGen AI Builders Guild',
      timeframeCovered: 'Past 7 Days',
      totalRawMessages: 2400,
      filteredSignalMessages: 580,
      spamFilteredPercentage: 82.5,
      overallSentiment: 'Bullish / Enthusiastic',
      sentimentScore: 94,
      executiveBrief:
        'Intense technical deep-dives across high-throughput open-weight inference. A critical P0 Ray Serve worker crashloop during concurrent AWQ model reloading was identified and resolved via staggered container pre-warming. Qdrant hybrid search benchmarks demonstrated 91.4% MRR@10 across enterprise knowledge bases.',
      activeChannels: ['#vllm-deployments', '#prompt-craft', '#model-inference', '#infra-alerts'],
      topicClusters: [
        {
          id: 'topic-01',
          topicName: 'Ray Serve Multi-GPU AWQ Worker Crashloop (P0)',
          channelOrContext: '#model-inference',
          messageCount: 112,
          sentiment: 'Mixed',
          sentimentScore: 84,
          status: 'RESOLVED',
          channelTags: ['#model-inference', '#vllm-deployments'],
          participantHandles: ['@karan_dev', '@dr_siddharth'],
          impactSummary: 'Eliminated Kubernetes node OOM kills during cluster scale-up.',
          summary:
            'Simultaneous loading of AWQ quantized model weights caused GPU VRAM exhaustion. Solved by implementing a 30s staggered container startup policy in K8s statefulset (PR #182).',
          keyQuotations: [
            '@karan_dev: "[P0 CRITICAL] Ray Serve worker pods crashlooping due to OOM when AWQ model weights reload concurrently across 4 GPU nodes."',
            '@dr_siddharth: "Fix: Added staggered node warmup delay (30s stagger) in K8s statefulset. PR #182 merged."',
          ],
        },
        {
          id: 'topic-02',
          topicName: 'Qdrant Hybrid BM25 + Dense RRF Benchmarking',
          channelOrContext: '#prompt-craft',
          messageCount: 94,
          sentiment: 'Positive',
          sentimentScore: 96,
          status: 'RESOLVED',
          channelTags: ['#prompt-craft'],
          participantHandles: ['@priya_data', '@sarah_k'],
          impactSummary: 'Achieved 91.4% MRR@10 on 1.2M technical PDF document dataset.',
          summary:
            'Rigorous evaluation of reciprocal rank fusion (RRF) combining sparse BM25 lexical matches with dense embeddings for enterprise RAG.',
          keyQuotations: [
            '@priya_data: "Benchmarking Qdrant hybrid retrieval: BM25 + dense text-embedding-3-large with reciprocal rank fusion yields a 91.4% MRR@10."',
            '@sarah_k: "Precision is at 98.2% on schema tool-calling benchmarks."',
          ],
        },
      ],
      actionItemsAndBugs: [
        {
          id: 'bug-02',
          type: 'Bug Report',
          priority: 'Urgent',
          priorityCode: 'P0',
          title: 'Ray Serve GPU Worker OOM on Concurrent AWQ Weight Reload',
          description:
            'Concurrent model initialization exhausts VRAM before PagedAttention allocates KV cache.',
          reporterHandle: '@karan_dev',
          recommendedTriage: 'Enforce staggered node warmup delay in Kubernetes Helm chart.',
          status: 'Completed',
          assignee: { name: 'Dr. Siddharth', handle: '@dr_siddharth', role: 'MLOps Architect' },
          sourceMessageRef: '[Tuesday 14:20] #model-inference',
          targetIntegration: 'Linear',
        },
        {
          id: 'feat-02',
          type: 'Feature Request',
          priority: 'High',
          priorityCode: 'P1',
          title: 'Automate RRF Alpha Parameter Tuning in Qdrant Ingestion',
          description:
            'Provide CLI utility to benchmark alpha weight between dense and sparse BM25 vectors.',
          reporterHandle: '@priya_data',
          recommendedTriage: 'Implement in norai-rag-tools v1.4 release.',
          status: 'In Progress',
          assignee: { name: 'Priya Sharma', handle: '@priya_data', role: 'Data Engineer' },
          sourceMessageRef: '[Monday 10:15] #prompt-craft',
          targetIntegration: 'GitHub',
        },
      ],
      rawMessages: [
        {
          id: 'msg-01',
          timestamp: 'Mon 09:30',
          author: '@dr_siddharth',
          channel: '#vllm-deployments',
          content: 'We observed a 12% KV-cache memory fragmentation issue on vLLM v0.5.2 when serving long context prompts (>16k tokens).',
          isSignal: true,
          signalConfidence: 94,
          category: 'Bug',
        },
        {
          id: 'msg-02',
          timestamp: 'Mon 10:15',
          author: '@priya_data',
          channel: '#prompt-craft',
          content: 'Benchmarking Qdrant hybrid retrieval: BM25 + dense text-embedding-3-large with reciprocal rank fusion yields a 91.4% MRR@10.',
          isSignal: true,
          signalConfidence: 97,
          category: 'Feature',
        },
        {
          id: 'msg-03',
          timestamp: 'Tue 14:20',
          author: '@karan_dev',
          channel: '#model-inference',
          content: '[P0 CRITICAL] Ray Serve worker pods crashlooping due to OOM when AWQ model weights reload concurrently across 4 GPU nodes.',
          isSignal: true,
          signalConfidence: 99,
          category: 'Bug',
        },
      ],
      formattedNewsletter: {
        headline: 'AI Builders Weekly: vLLM Cluster Optimization & Hybrid RAG Benchmarks',
        introParagraph:
          'This week in the AI Builders Guild: world-class debugging of multi-GPU Ray Serve statefulsets, record-setting 91.4% MRR on hybrid Qdrant search, and practical KV-cache tuning tips.',
        spotlightSection:
          'Kudos to @dr_siddharth and @karan_dev for diagnosing GPU VRAM spikes during model initialization and publishing PR #182.',
        communityShoutouts: [
          '@priya_data for comprehensive Reciprocal Rank Fusion retrieval metrics',
          '@sarah_k for comparative tool-calling precision evaluations',
        ],
        closingCallToAction:
          'Review the latest GPU deployment guide in our documentation portal.',
      },
      telemetry: {
        latencyMs: 310,
        inputTokens: 1620,
        outputTokens: 840,
        totalTokens: 2460,
        estimatedCostUsd: 0.00037,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-telegram-regional',
    title: 'UP Developers Network & Regional Hub (1,200 messages)',
    platform: 'Telegram',
    communityName: 'UP Tech & Builders Community',
    timeframe: 'Last 24 Hours',
    sampleChatLogText: `[08:45] @ayush_up (#upsc-tech-alerts): Official UPPSC Assistant Engineer (1,450 posts) notification is out. Pay Level 10 (₹56,100 - ₹1,77,500).
[09:10] @rohit_dev (#freelance-gigs): Seeking Next.js 15 developer for government agri-portal dashboard in Lucknow. ₹80k budget for 3-week sprint.
[10:30] @ananya_ai (#hackathon-sync): Our team is building a bilingual Hindi/English voice assistant for Panchayat grievance redressal using NorAI MCP server!
[11:15] @vikas_eng (#upsc-tech-alerts): Note: All application forms must be submitted through uppsc.up.nic.in before 30 September 2026.
[14:00] @rohit_dev (#freelance-gigs): Contract awarded to @priya_m! Thanks everyone who submitted portfolios.`,
    precomputedResult: {
      communityName: 'UP Tech & Builders Community',
      timeframeCovered: 'Last 24 Hours',
      totalRawMessages: 1200,
      filteredSignalMessages: 345,
      spamFilteredPercentage: 71.3,
      overallSentiment: 'Bullish / Enthusiastic',
      sentimentScore: 93,
      executiveBrief:
        'High engagement across Uttar Pradesh tech ecosystem regarding the UPPSC 1,450 Assistant Engineer gazette release and regional GovTech hackathons. Freelance Next.js engineering contract for a Lucknow agri-portal was successfully matched and awarded within 5 hours.',
      activeChannels: ['#upsc-tech-alerts', '#freelance-gigs', '#hackathon-sync'],
      topicClusters: [
        {
          id: 'topic-01',
          topicName: 'UPPSC Assistant Engineer 1,450 Posts Notification',
          channelOrContext: '#upsc-tech-alerts',
          messageCount: 78,
          sentiment: 'Positive',
          sentimentScore: 96,
          status: 'RESOLVED',
          channelTags: ['#upsc-tech-alerts'],
          participantHandles: ['@ayush_up', '@vikas_eng'],
          impactSummary: '1,450 public engineering vacancies analyzed with eligibility dates.',
          summary:
            'Detailed breakdown of UPPSC Advt A-3/E-1/2026 across Civil, Electrical, and Mechanical engineering branches.',
          keyQuotations: [
            '@ayush_up: "Official UPPSC Assistant Engineer (1,450 posts) notification is out. Pay Level 10 (₹56,100 - ₹1,77,500)."',
            '@vikas_eng: "Note: All application forms must be submitted through uppsc.up.nic.in before 30 September 2026."',
          ],
        },
        {
          id: 'topic-02',
          topicName: 'GovTech Panchayat Voice Assistant Hackathon Sync',
          channelOrContext: '#hackathon-sync',
          messageCount: 52,
          sentiment: 'Positive',
          sentimentScore: 92,
          status: 'ACTIVE DEBATE',
          channelTags: ['#hackathon-sync'],
          participantHandles: ['@ananya_ai', '@rohit_dev'],
          impactSummary: 'Bilingual voice MCP server for rural citizen grievance redressal.',
          summary:
            'Regional developers collaborating on voice-first multi-modal AI agents for rural panchayats in Uttar Pradesh.',
          keyQuotations: [
            '@ananya_ai: "Our team is building a bilingual Hindi/English voice assistant for Panchayat grievance redressal using NorAI MCP server!"',
          ],
        },
      ],
      actionItemsAndBugs: [
        {
          id: 'act-01',
          type: 'Community Action',
          priority: 'High',
          priorityCode: 'P1',
          title: 'Publish Eligibility Checklist for UPPSC Assistant Engineer',
          description:
            'Create interactive calculator matching candidate age, category, and B.Tech branch.',
          reporterHandle: '@ayush_up',
          recommendedTriage: 'Integrate with Smart Dainik News workbench.',
          status: 'Completed',
          assignee: { name: 'Ayush Verma', handle: '@ayush_up', role: 'Community Lead' },
          sourceMessageRef: '[08:45] #upsc-tech-alerts',
          targetIntegration: 'Slack',
        },
        {
          id: 'act-02',
          type: 'Feature Request',
          priority: 'Medium',
          priorityCode: 'P2',
          title: 'Bilingual Hindi Voice Ingestion for NorAI Tool Servers',
          description:
            'Support direct Whisper speech-to-text transcription in Hindi and Bhojpuri dialects.',
          reporterHandle: '@ananya_ai',
          recommendedTriage: 'Track in GovTech youth enablement roadmap.',
          status: 'In Progress',
          assignee: { name: 'Ananya Roy', handle: '@ananya_ai', role: 'AI Researcher' },
          sourceMessageRef: '[10:30] #hackathon-sync',
          targetIntegration: 'GitHub',
        },
      ],
      rawMessages: [
        {
          id: 'msg-01',
          timestamp: '08:45',
          author: '@ayush_up',
          channel: '#upsc-tech-alerts',
          content: 'Official UPPSC Assistant Engineer (1,450 posts) notification is out. Pay Level 10 (₹56,100 - ₹1,77,500).',
          isSignal: true,
          signalConfidence: 98,
          category: 'Announcement',
        },
        {
          id: 'msg-02',
          timestamp: '09:10',
          author: '@rohit_dev',
          channel: '#freelance-gigs',
          content: 'Seeking Next.js 15 developer for government agri-portal dashboard in Lucknow. ₹80k budget for 3-week sprint.',
          isSignal: true,
          signalConfidence: 94,
          category: 'Feature',
        },
        {
          id: 'msg-03',
          timestamp: '10:30',
          author: '@ananya_ai',
          channel: '#hackathon-sync',
          content: 'Our team is building a bilingual Hindi/English voice assistant for Panchayat grievance redressal using NorAI MCP server!',
          isSignal: true,
          signalConfidence: 96,
          category: 'Feature',
        },
      ],
      formattedNewsletter: {
        headline: 'UP Tech Pulse: UPPSC Engineering Dispatch + GovTech Hackathon Momentum',
        introParagraph:
          'Welcome to the UP Developers Network weekly roundup! Major announcements include 1,450 UPPSC engineering positions, active regional GovTech voice assistant initiatives, and local freelance project grants.',
        spotlightSection:
          'Congratulations to @priya_m and @rohit_dev for successfully initiating the Lucknow Agri-Portal dashboard project.',
        communityShoutouts: [
          '@ayush_up for instant verified UPPSC gazette dispatches',
          '@ananya_ai for pioneering Hindi voice interfaces for regional panchayats',
        ],
        closingCallToAction:
          'Submit your hackathon abstracts before Friday midnight on the community portal.',
      },
      telemetry: {
        latencyMs: 290,
        inputTokens: 1190,
        outputTokens: 680,
        totalTokens: 1870,
        estimatedCostUsd: 0.00028,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
];

export const DAINIK_NEWS_PRESETS: DainikNewsPreset[] = [
  {
    id: 'preset-uppsc-gazette',
    title: 'UPPSC State Engineering Services (Assistant Engineers — 1,450 Posts)',
    stateOrRegion: 'Uttar Pradesh, India',
    domain: 'Public Engineering & Technical Services',
    languageMode: 'Bilingual (Hindi + English)',
    sampleGazetteText: `उत्तर प्रदेश लोक सेवा आयोग (UPPSC), प्रयागराज — आधिकारिक अधिसूचना संख्या: A-3/E-1/2026
दिनांक: 15 अगस्त 2026

1. पद विवरण एवं रिक्तियां (Post Details & Vacancies):
सम्मिलित राज्य अभियंत्रण सेवा (सहायक अभियंता / Assistant Engineer - Civil, Electrical, Mechanical) के कुल 1,450 पदों हेतु ऑनलाइन आवेदन आमंत्रित किए जाते हैं।
- वेतनमान: पे-मैट्रिक्स लेवल 10 (₹56,100 - ₹1,77,500).

2. महत्वपूर्ण तिथियां (Critical Deadlines):
- ऑनलाइन आवेदन प्रारंभ तिथि: 20 अगस्त 2026
- ऑनलाइन परीक्षा शुल्क बैंक में जमा करने की अंतिम तिथि: 25 सितंबर 2026
- ऑनलाइन आवेदन सबमिट करने की अंतिम तिथि: 30 सितंबर 2026 (अंतिम तिथि के पश्चात कोई आवेदन स्वीकार नहीं होगा)

3. पात्रता मापदंड (Eligibility Criteria):
- आयु सीमा: 21 से 40 वर्ष (उत्तर प्रदेश के आरक्षित वर्गों SC/ST/OBC हेतु नियमानुसार 5 वर्ष की छूट, दिव्यांग हेतु 10 वर्ष).
- शैक्षणिक योग्यता: भारत में विधि द्वारा स्थापित विश्वविद्यालय से संबंधित इंजीनियरिंग शाखा (Civil / Electrical / Mechanical) में बी.ई. / बी.टेक. उपाधि।

4. आवेदन शुल्क (Application Fee):
- अनारक्षित / ई.डब्ल्यू.एस. / अन्य पिछड़ा वर्ग: ₹225/-
- अनुसूचित जाति / अनुसूचित जनजाति: ₹105/-
- दिव्यांग अभ्यर्थी: ₹25/-

5. चयन प्रक्रिया (Selection Process):
- प्रथम चरण: संयुक्त प्रारंभिक परीक्षा (वस्तुनिष्ठ प्रकार - 375 अंक)
- द्वितीय चरण: मुख्य लिखित परीक्षा (पारंपरिक विषयवार - 750 अंक)
- तृतीय चरण: साक्षात्कार (100 अंक)

आधिकारिक पोर्टल: https://uppsc.up.nic.in
आधिकारिक राजपत्र मुहर संख्या: UPPSC/DISPATCH/2026/A-3-E-1
सत्यापन चेतावनी (Anti-Rumor Clause): किसी भी अनधिकृत एजेंट, कोचिंग दलाल या मध्यस्थ के झांसे में न आएं। ऑफलाइन फॉर्म पूर्णतः अमान्य हैं। आवेदन केवल आधिकारिक वेबसाइट uppsc.up.nic.in पर ही मान्य होगा।`,
    precomputedResult: {
      editionDate: '15 August 2026',
      stateOrRegion: 'Uttar Pradesh, India',
      totalNotificationsAnalyzed: 1,
      verifiedGazetteCount: 1,
      englishSummaryHeadline:
        'UPPSC Notifies 1,450 Assistant Engineer Positions: Online Application Active till 30 Sept 2026',
      hindiSummaryHeadline:
        'UPPSC ने 1,450 सहायक अभियंता पदों हेतु जारी की अधिसूचना: 30 सितंबर तक ऑनलाइन आवेदन सक्रिय',
      executiveBriefEnglish:
        'The Uttar Pradesh Public Service Commission (UPPSC) has officially notified 1,450 Assistant Engineer positions across Civil, Electrical, and Mechanical engineering departments under Pay Matrix Level 10 (₹56,100 - ₹1,77,500). Online application window is open with the final submission deadline set for 30 September 2026. Age relaxation of 5 years applies for UP domicile OBC/SC/ST candidates.',
      executiveBriefHindi:
        'उत्तर प्रदेश लोक सेवा आयोग (UPPSC) प्रयागराज ने सम्मिलित राज्य अभियंत्रण सेवा परीक्षा 2026 के अंतर्गत 1,450 सहायक अभियंता (सिविल, इलेक्ट्रिकल, मैकेनिकल) पदों के लिए भर्ती अधिसूचना जारी की है। पे-मैट्रिक्स लेवल 10 (₹56,100 - ₹1,77,500) के इन पदों हेतु ऑनलाइन आवेदन की अंतिम तिथि 30 सितंबर 2026 निर्धारित है। उत्तर प्रदेश के मूल निवासी आरक्षित वर्गों (OBC/SC/ST) को नियमानुसार 5 वर्ष की अधिकतम आयु छूट प्राप्त है।',
      alertCards: [
        {
          id: 'alert-01',
          title: 'UPPSC Assistant Engineer (Combined State Engineering Services 2026)',
          hindiTitle: 'UPPSC सहायक अभियंता (सम्मिलित राज्य अभियंत्रण सेवा परीक्षा 2026)',
          departmentOrMinistry: 'Uttar Pradesh Public Service Commission (UPPSC)',
          hindiDepartmentOrMinistry: 'उत्तर प्रदेश लोक सेवा आयोग (UPPSC)',
          category: 'Govt Recruitment & Jobs',
          urgencyLevel: 'Active Window',
          deadlineDate: '30 September 2026',
          hindiDeadlineDate: '30 सितंबर 2026',
          daysRemaining: 31,
          vacanciesOrScope: '1,450 Posts (Civil: 820, Electrical: 380, Mech: 250)',
          hindiVacanciesOrScope: '1,450 पद (सिविल: 820, इलेक्ट्रिकल: 380, मैकेनिकल: 250)',
          salaryBandOrBudget: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
          hindiSalaryBandOrBudget: 'पे-मैट्रिक्स लेवल 10 (₹56,100 - ₹1,77,500)',
          eligibilitySnippet: 'B.E. / B.Tech in Civil/EE/ME from recognized University; Age: 21-40 yrs (UP Relaxations apply)',
          hindiEligibilitySnippet: 'मान्यता प्राप्त विश्वविद्यालय से सिविल/इलेक्ट्रिकल/मैकेनिकल में बी.ई./बी.टेक; आयु: 21-40 वर्ष (छूट लागू)',
          officialPortalUrl: 'https://uppsc.up.nic.in',
          verifiedSourceRef: 'Advt No: A-3/E-1/2026',
          officialSealReference: 'UPPSC Official Dispatch A-3/E-1/2026',
          verificationSealNumber: 'SEAL-UPPSC-2026-AE-091',
          isVerifiedOfficial: true,
          antiRumorNote: 'Offline forms and third-party fee links are fraudulent and legally void. Apply exclusively through uppsc.up.nic.in.',
          hindiAntiRumorNote: 'ऑफलाइन फॉर्म और किसी तीसरे पक्ष के लिंक पूर्णतः अमान्य एवं फर्जी हैं। केवल uppsc.up.nic.in पर आवेदन करें।',
          minAge: 21,
          maxAge: 40,
          requiredDegrees: [
            'B.Tech / B.E. (Civil Engineering)',
            'B.Tech / B.E. (Electrical Engineering)',
            'B.Tech / B.E. (Mechanical Engineering)',
          ],
          categoryRelaxations: {
            General: 0,
            EWS: 0,
            OBC: 5,
            'SC/ST': 5,
            PwD: 10,
          },
          feeStructure: {
            'General / EWS / OBC': '₹225',
            'SC / ST': '₹105',
            'PwD (Specially Abled)': '₹25',
          },
          hindiFeeStructure: {
            'सामान्य / ई.डब्ल्यू.एस. / ओ.बी.सी.': '₹225',
            'अनुसूचित जाति / अनुसूचित जनजाति': '₹105',
            'दिव्यांग अभ्यर्थी': '₹25',
          },
          applicationStartDate: '20 August 2026',
          portalName: 'UPPSC Online Portal',
        },
      ],
      eligibilityMatrix: [
        {
          postOrNotification: 'Assistant Engineer (Civil/Electrical/Mechanical)',
          hindiPostOrNotification: 'सहायक अभियंता (सिविल/इलेक्ट्रिकल/मैकेनिकल)',
          ageCriteria: '21 to 40 Years (5-year relaxation for SC/ST/OBC of UP, 10-year for PwD)',
          hindiAgeCriteria: '21 से 40 वर्ष (उत्तर प्रदेश के SC/ST/OBC हेतु 5 वर्ष तथा दिव्यांग हेतु 10 वर्ष की छूट)',
          qualification: 'B.E. / B.Tech degree in relevant engineering branch (Civil, EE, ME)',
          hindiQualification: 'संबंधित इंजीनियरिंग शाखा (Civil, EE, ME) में बी.ई. / बी.टेक. उपाधि',
          reservationQuotas: 'Vertical (SC 21%, ST 2%, OBC 27%, EWS 10%) & Horizontal (Women 20%, Ex-Servicemen 5%)',
          hindiReservationQuotas: 'उ.प्र. शासन के नियमानुसार लंबवत एवं क्षैतिज आरक्षण (SC 21%, ST 2%, OBC 27%, EWS 10%)',
          applicationFee: '₹225 (Gen/OBC/EWS), ₹105 (SC/ST), ₹25 (PwD)',
          hindiApplicationFee: '₹225 (सामान्य/OBC/EWS), ₹105 (SC/ST), ₹25 (दिव्यांग)',
          selectionProcess: 'Prelims Exam (375 M) -> Mains Written (750 M) -> Interview (100 M)',
          hindiSelectionProcess: 'प्रारंभिक परीक्षा (375 अंक) -> मुख्य लिखित परीक्षा (750 अंक) -> साक्षात्कार (100 अंक)',
        },
      ],
      factValidationNotes: [
        'Verified against UPPSC official gazette dispatch A-3/E-1/2026 published on 15 August 2026.',
        'Anti-Rumor Check: All candidates must apply exclusively through uppsc.up.nic.in; offline forms and agents are strictly fraudulent.',
        'Age calculation baseline strictly verified against 1 July 2026 per Commission bylaws.',
      ],
      telemetry: {
        latencyMs: 295,
        inputTokens: 1250,
        outputTokens: 890,
        totalTokens: 2140,
        estimatedCostUsd: 0.00033,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-up-smartcity-gazette',
    title: 'UP Industrial Development & Smart City Infrastructure Corridor',
    stateOrRegion: 'Uttar Pradesh, India',
    domain: 'Infrastructure & Smart City',
    languageMode: 'Bilingual (Hindi + English)',
    sampleGazetteText: `उत्तर प्रदेश राज्य औद्योगिक विकास प्राधिकरण (UPSIDA) एवं नगर विकास विभाग, लखनऊ
अधिसूचना संख्या: UPSIDA-IND/2026/P-88
दिनांक: 01 सितंबर 2026

विषय: लखनऊ-कानपुर-वाराणसी हाई-स्पीड एक्सप्रेसवे लॉजिस्टिक्स एवं आईटी पार्क प्रोत्साहन नीति 2026
कुल बजटीय आवंटन: ₹12,400 करोड़

1. मुख्य प्रोत्साहन एवं रियायतें (Key Incentives):
- पूंजीगत अनुदान (Capital Subsidy): योग्य आईटी/ईएसडीएम एवं लॉजिस्टिक्स पार्कों हेतु 25% तक (अधिकतम सीमा ₹50 करोड़).
- स्टाम्प शुल्क छूट: उत्तर प्रदेश में पंजीकृत इकाइयों हेतु 100% स्टाम्प ड्यूटी प्रतिपूर्ति।
- विद्युत शुल्क छूट: वाणिज्यिक परिचालन से प्रथम 5 वर्षों हेतु 100% विद्युत कर छूट।

2. आवेदन एवं कार्यान्वयन खिड़की (Application Window):
- सिंगल विंडो पोर्टल 'निवेश मित्र' (Nivesh Mitra) पर ऑनलाइन पंजीकरण प्रारंभ: 05 सितंबर 2026
- प्रथम चरण के प्रस्ताव जमा करने की अंतिम तिथि: 15 नवंबर 2026

3. पात्रता मापदंड (Eligibility):
- न्यूनतम निवेश सीमा: आईटी/सॉफ्टवेयर क्लस्टर हेतु ₹25 करोड़, लॉजिस्टिक्स पार्क हेतु ₹50 करोड़।
- पंजीकृत स्टार्ट-अप्स एवं एमएसएमई इकाइयों हेतु विशेष 10% अतिरिक्त शीर्ष अनुदान।

सत्यापित स्रोत: https://niveshmitra.up.nic.in
आधिकारिक राजपत्र मुहर: SEAL-UPSIDA-INFRA-2026-088
नोट: किसी भी प्रकार के मध्यस्थ या गैर-पोर्टल शुल्क दावों से बचें। समस्त प्रक्रिया डिजिटल ई-साइन से पूर्ण होगी।`,
    precomputedResult: {
      editionDate: '01 September 2026',
      stateOrRegion: 'Uttar Pradesh, India',
      totalNotificationsAnalyzed: 1,
      verifiedGazetteCount: 1,
      englishSummaryHeadline:
        'UP Govt Unveils ₹12,400 Cr Smart City & IT Logistics Corridor Incentive Policy 2026',
      hindiSummaryHeadline:
        'उत्तर प्रदेश सरकार ने ₹12,400 करोड़ की स्मार्ट सिटी एवं आईटी लॉजिस्टिक्स कॉरिडोर नीति 2026 अधिसूचित की',
      executiveBriefEnglish:
        'The Uttar Pradesh State Industrial Development Authority (UPSIDA) and Urban Development Department have notified a ₹12,400 Cr capital incentive package for IT parks, ESDM hubs, and high-speed logistics corridors connecting Lucknow, Kanpur, and Varanasi. Benefits include up to 25% capital subsidy (capped at ₹50 Cr) and 100% stamp duty exemption via the single-window Nivesh Mitra portal closing on 15 November 2026.',
      executiveBriefHindi:
        'उत्तर प्रदेश राज्य औद्योगिक विकास प्राधिकरण (UPSIDA) एवं नगर विकास विभाग ने लखनऊ-कानपुर-वाराणसी कॉरिडोर पर आईटी पार्कों और अत्याधुनिक लॉजिस्टिक्स केंद्रों हेतु ₹12,400 करोड़ के प्रोत्साहन पैकेज की अधिसूचना जारी की है। इसके तहत 25% तक पूंजीगत सब्सिडी (अधिकतम ₹50 करोड़) तथा 100% स्टाम्प ड्यूटी छूट प्रदान की जाएगी। आवेदन सिंगल विंडो पोर्टल "निवेश मित्र" पर 15 नवंबर 2026 तक स्वीकार किए जाएंगे।',
      alertCards: [
        {
          id: 'alert-02',
          title: 'UP High-Speed IT & Logistics Corridor Capital Subsidy Scheme 2026',
          hindiTitle: 'उ.प्र. हाई-स्पीड आईटी एवं लॉजिस्टिक्स कॉरिडोर पूंजीगत सब्सिडी योजना 2026',
          departmentOrMinistry: 'UP State Industrial Development Authority (UPSIDA)',
          hindiDepartmentOrMinistry: 'उ.प्र. राज्य औद्योगिक विकास प्राधिकरण (UPSIDA)',
          category: 'Infrastructure & Smart City',
          urgencyLevel: 'Active Window',
          deadlineDate: '15 November 2026',
          hindiDeadlineDate: '15 नवंबर 2026',
          daysRemaining: 77,
          vacanciesOrScope: '₹12,400 Cr Total Allocation (Target: 45 Industrial Hubs)',
          hindiVacanciesOrScope: '₹12,400 करोड़ कुल आवंटन (लक्ष्य: 45 औद्योगिक हब)',
          salaryBandOrBudget: 'Up to 25% Capital Subsidy (Max ₹50 Cr per unit)',
          hindiSalaryBandOrBudget: '25% तक पूंजीगत अनुदान (प्रति इकाई अधिकतम ₹50 करोड़)',
          eligibilitySnippet: 'Registered IT/ESDM & Logistics Entities in UP; Min ₹25 Cr investment for IT, ₹50 Cr for Logistics',
          hindiEligibilitySnippet: 'उ.प्र. में पंजीकृत IT/ESDM एवं लॉजिस्टिक्स इकाइयां; IT हेतु न्यूनतम ₹25 करोड़ एवं लॉजिस्टिक्स हेतु ₹50 करोड़ निवेश',
          officialPortalUrl: 'https://niveshmitra.up.nic.in',
          verifiedSourceRef: 'Govt Dispatch No: UPSIDA-IND/2026/P-88',
          officialSealReference: 'UPSIDA Official Dispatch P-88/2026',
          verificationSealNumber: 'SEAL-UPSIDA-INFRA-2026-088',
          isVerifiedOfficial: true,
          antiRumorNote: 'All subsidy applications are processed exclusively online on Nivesh Mitra. Physical agent submissions are invalid.',
          hindiAntiRumorNote: 'सभी सब्सिडी आवेदन केवल "निवेश मित्र" पोर्टल पर डिजिटल माध्यम से मान्य हैं। ऑफलाइन एजेंट आवेदन अमान्य हैं।',
          minAge: 18,
          maxAge: 70,
          requiredDegrees: [
            'Registered MSME / Private Limited Company',
            'IT / Software Tech Infrastructure Entity',
            'Civil & Logistics Infrastructure Developer',
          ],
          categoryRelaxations: {
            General: 0,
            MSME: 5,
            'Women-Led Unit': 10,
          },
          feeStructure: {
            'Online Processing Fee': '₹5,000 (Non-refundable)',
            'Stamp Duty Exemption': '100% Reimbursed',
          },
          hindiFeeStructure: {
            'ऑनलाइन प्रोसेसिंग शुल्क': '₹5,000 (अप्रतिदेय)',
            'स्टाम्प ड्यूटी छूट': '100% प्रतिपूर्ति',
          },
          applicationStartDate: '05 September 2026',
          portalName: 'Nivesh Mitra Single Window System',
        },
      ],
      eligibilityMatrix: [
        {
          postOrNotification: 'IT Park / ESDM Tech Cluster Infrastructure Subsidy',
          hindiPostOrNotification: 'आईटी पार्क / ईएसडीएम टेक क्लस्टर अवसंरचना सब्सिडी',
          ageCriteria: 'Entity must have minimum 1 year incorporation in India or UP',
          hindiAgeCriteria: 'इकाई का भारत या उत्तर प्रदेश में न्यूनतम 1 वर्ष का निगमन अनिवार्य',
          qualification: 'Minimum ₹25 Cr Capital Investment in IT Hardware/Software Facility',
          hindiQualification: 'आईटी हार्डवेयर/सॉफ्टवेयर सुविधा में न्यूनतम ₹25 करोड़ का पूंजीगत निवेश',
          reservationQuotas: 'Special 10% Additional Top-Up Grant for UP Registered Startups',
          hindiReservationQuotas: 'उत्तर प्रदेश में पंजीकृत स्टार्ट-अप्स हेतु विशेष 10% अतिरिक्त टॉप-अप अनुदान',
          applicationFee: '₹5,000 Portal Processing Fee (Digital payment on Nivesh Mitra)',
          hindiApplicationFee: '₹5,000 पोर्टल प्रोसेसिंग शुल्क (निवेश मित्र पर डिजिटल भुगतान)',
          selectionProcess: 'State Empowered Committee (SEC) DPR Review -> Fast-Track Sanction',
          hindiSelectionProcess: 'राज्य अधिकार प्राप्त समिति (SEC) द्वारा डीपीआर समीक्षा -> त्वरित संस्तुति',
        },
      ],
      factValidationNotes: [
        'Verified against UPSIDA Official Gazette Dispatch UPSIDA-IND/2026/P-88 dated 01 September 2026.',
        'Anti-Rumor Note: Subsidies are disbursed directly via DBT/Treasury into corporate escrow accounts; zero cash transactions permitted.',
      ],
      telemetry: {
        latencyMs: 310,
        inputTokens: 1480,
        outputTokens: 920,
        totalTokens: 2400,
        estimatedCostUsd: 0.00037,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
  {
    id: 'preset-up-scholarship-gazette',
    title: 'UP Post-Matric & Collegiate STEM Merit Scholarship Dispatch 2026',
    stateOrRegion: 'Uttar Pradesh, India',
    domain: 'Education & Scholarships',
    languageMode: 'Bilingual (Hindi + English)',
    sampleGazetteText: `समाज कल्याण विभाग एवं उच्च शिक्षा विभाग, उत्तर प्रदेश शासन, लखनऊ
आधिकारिक अधिसूचना संख्या: SCHOLARSHIP-UP-SWD/2026/892
दिनांक: 25 अगस्त 2026

विषय: उत्तर प्रदेश दशमोत्तर छात्रवृत्ति एवं शुल्क प्रतिपूर्ति योजना 2026-27
कुल बजटीय प्रावधान: ₹1,850 करोड़ (2.4 लाख तकनीकी एवं उच्च शिक्षा विद्यार्थियों हेतु)

1. छात्रवृत्ति लाभ एवं दायरा (Scholarship Benefits):
- 100% शिक्षण शुल्क प्रतिपूर्ति (Tuition Fee Reimbursement) सभी मान्यता प्राप्त इंजीनियरिंग, मेडिकल, एवं डिग्री कॉलेजों हेतु।
- वार्षिक शैक्षणिक संधारण भत्ता (Maintenance Allowance): ₹12,000 प्रति वर्ष (छात्रावासी) एवं ₹7,200 प्रति वर्ष (दिवा छात्र)।

2. महत्वपूर्ण तिथियां (Critical Deadlines):
- ऑनलाइन छात्रवृत्ति पोर्टल पंजीकरण प्रारंभ: 01 सितंबर 2026
- ऑनलाइन फॉर्म सबमिट करने की अंतिम तिथि: 25 अक्टूबर 2026
- शिक्षण संस्थान द्वारा मास्टर डेटा सत्यापन की अंतिम तिथि: 10 नवंबर 2026

3. पात्रता मापदंड (Eligibility Criteria):
- अधिवास: उत्तर प्रदेश का स्थायी निवासी (UP Domicile).
- पारिवारिक आय सीमा: समस्त स्रोतों से वार्षिक आय ₹2,50,000/- (सामान्य, ओबीसी, एससी, एसटी, अल्पसंख्यक वर्ग).
- शैक्षणिक योग्यता: कक्षा 12 उत्तीर्ण तथा मान्यता प्राप्त पॉलिटेक्निक/बी.टेक/बी.एस.सी./बी.ए. में अध्ययनरत।

आधिकारिक छात्रवृत्ति पोर्टल: https://scholarship.up.gov.in
आधिकारिक मुहर: SEAL-UP-SWD-SCHOLARSHIP-892
सावधानी (Anti-Fraud Clause): छात्रवृत्ति आवेदन पूर्णतः निःशुल्क है। किसी भी साइबर कैफे या दलाल को अपना बैंक विवरण, आधार ओटीपी या पासवर्ड साझा न करें।`,
    precomputedResult: {
      editionDate: '25 August 2026',
      stateOrRegion: 'Uttar Pradesh, India',
      totalNotificationsAnalyzed: 1,
      verifiedGazetteCount: 1,
      englishSummaryHeadline:
        'UP Govt Releases ₹1,850 Cr Post-Matric & STEM Scholarship Notification for 2.4 Lakh Students',
      hindiSummaryHeadline:
        'उ.प्र. शासन ने 2.4 लाख छात्र-छात्राओं हेतु ₹1,850 करोड़ की दशमोत्तर एवं तकनीकी छात्रवृत्ति अधिसूचना जारी की',
      executiveBriefEnglish:
        'The Social Welfare and Higher Education Departments of Uttar Pradesh have published the official dispatch for the 2026-27 Post-Matric Scholarship and Fee Reimbursement Scheme. With an allocation of ₹1,850 Crores, the scheme covers 100% tuition fees and up to ₹12,000 annual maintenance allowance for eligible UP domicile students enrolled in engineering, polytechnic, and university degree programs. Deadline is 25 October 2026.',
      executiveBriefHindi:
        'उत्तर प्रदेश शासन के समाज कल्याण एवं उच्च शिक्षा विभाग ने सत्र 2026-27 हेतु दशमोत्तर छात्रवृत्ति एवं शुल्क प्रतिपूर्ति योजना की आधिकारिक अधिसूचना जारी की है। ₹1,850 करोड़ के बजटीय प्रावधान से इंजीनियरिंग, पॉलिटेक्निक और डिग्री कॉलेजों के 2.4 लाख विद्यार्थियों की 100% फीस प्रतिपूर्ति तथा ₹12,000 वार्षिक संधारण भत्ता दिया जाएगा। ऑनलाइन आवेदन की अंतिम तिथि 25 अक्टूबर 2026 है।',
      alertCards: [
        {
          id: 'alert-03',
          title: 'UP Post-Matric Tuition Fee Reimbursement & STEM Scholarship 2026-27',
          hindiTitle: 'उ.प्र. दशमोत्तर शुल्क प्रतिपूर्ति एवं तकनीकी छात्रवृत्ति योजना 2026-27',
          departmentOrMinistry: 'Social Welfare & Higher Education Dept, Govt of UP',
          hindiDepartmentOrMinistry: 'समाज कल्याण एवं उच्च शिक्षा विभाग, उ.प्र. शासन',
          category: 'Education & Scholarships',
          urgencyLevel: 'Active Window',
          deadlineDate: '25 October 2026',
          hindiDeadlineDate: '25 अक्टूबर 2026',
          daysRemaining: 56,
          vacanciesOrScope: '2,40,000 Student Beneficiaries (Budget: ₹1,850 Cr)',
          hindiVacanciesOrScope: '2,40,000 छात्र-छात्राएं लाभान्वित (बजट: ₹1,850 करोड़)',
          salaryBandOrBudget: '100% Tuition Fee + ₹12,000/yr Academic Stipend',
          hindiSalaryBandOrBudget: '100% शिक्षण शुल्क प्रतिपूर्ति + ₹12,000/वर्ष भत्ता',
          eligibilitySnippet: 'UP Domicile; Family Income <= ₹2.5L/yr; Enrolled in recognized College/B.Tech/Diploma',
          hindiEligibilitySnippet: 'उ.प्र. अधिवास; वार्षिक पारिवारिक आय ₹2.5 लाख से कम; मान्यता प्राप्त कॉलेज/डिप्लोमा/डिग्री में नामांकित',
          officialPortalUrl: 'https://scholarship.up.gov.in',
          verifiedSourceRef: 'Notification No: SCHOLARSHIP-UP-SWD/2026/892',
          officialSealReference: 'UP-SWD Dispatch #892/2026',
          verificationSealNumber: 'SEAL-UP-SWD-SCHOLARSHIP-892',
          isVerifiedOfficial: true,
          antiRumorNote: 'Scholarship registration is 100% free of charge. Never share your Aadhaar OTP or bank login credentials with any agent.',
          hindiAntiRumorNote: 'छात्रवृत्ति पंजीकरण पूर्णतः निःशुल्क है। किसी भी व्यक्ति या साइबर कैफे के साथ अपना आधार ओटीपी या बैंक पासवर्ड साझा न करें।',
          minAge: 16,
          maxAge: 35,
          requiredDegrees: [
            'Class 12th / Intermediate Passed',
            'Polytechnic Diploma Student',
            'Undergraduate (B.Tech / B.Sc / B.Com / B.A.)',
            'Postgraduate (M.Tech / M.Sc / M.A.)',
          ],
          categoryRelaxations: {
            General: 0,
            EWS: 0,
            OBC: 0,
            'SC/ST': 0,
          },
          feeStructure: {
            'Application Fee': '₹0 (100% Free of Cost)',
          },
          hindiFeeStructure: {
            'आवेदन शुल्क': '₹0 (पूर्णतः निःशुल्क)',
          },
          applicationStartDate: '01 September 2026',
          portalName: 'UP Scholarship Online Portal',
        },
      ],
      eligibilityMatrix: [
        {
          postOrNotification: 'Post-Matric Technical & Professional Degree Scholarship',
          hindiPostOrNotification: 'दशमोत्तर तकनीकी एवं व्यावसायिक डिग्री छात्रवृत्ति',
          ageCriteria: 'Enrolled in valid academic year (No rigid upper age bar for genuine students)',
          hindiAgeCriteria: 'वैध शैक्षणिक सत्र में नामांकित (नियमित विद्यार्थियों हेतु कोई कठोर अधिकतम आयु सीमा नहीं)',
          qualification: 'Class 12th Passed + Active admission in recognized UP institution / AICTE approved college',
          hindiQualification: 'कक्षा 12 उत्तीर्ण + उ.प्र. में मान्यता प्राप्त संस्थान / एआईसीटीई अनुमोदित कॉलेज में सक्रिय प्रवेश',
          reservationQuotas: 'All categories eligible with family income <= ₹2,50,000/annum (SC, ST, OBC, Gen, Minority)',
          hindiReservationQuotas: 'समस्त वर्गों हेतु पारिवारिक वार्षिक आय ₹2.5 लाख से कम होना अनिवार्य (SC, ST, OBC, सामान्य, अल्पसंख्यक)',
          applicationFee: '₹0 (Completely Free of Cost)',
          hindiApplicationFee: '₹0 (पूर्णतः निःशुल्क)',
          selectionProcess: 'Online Aadhaar e-KYC Verification -> College Verification -> District Committee Direct DBT',
          hindiSelectionProcess: 'ऑनलाइन आधार e-KYC सत्यापन -> संस्थान सत्यापन -> जिला समिति द्वारा प्रत्यक्ष DBT अंतरण',
        },
      ],
      factValidationNotes: [
        'Verified against UP Social Welfare Dept Dispatch SCHOLARSHIP-UP-SWD/2026/892 dated 25 August 2026.',
        'Anti-Rumor Note: Scholarship funds are transferred exclusively via Aadhaar-linked Direct Benefit Transfer (DBT) into student bank accounts.',
      ],
      telemetry: {
        latencyMs: 280,
        inputTokens: 1390,
        outputTokens: 850,
        totalTokens: 2240,
        estimatedCostUsd: 0.00031,
        modelUsed: 'gemini-3.5-lite (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
];

