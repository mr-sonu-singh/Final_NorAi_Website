import { ShortlistPreset } from './types';

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
- Integrated automated reconciliation pipelines processing $2M+ in daily transaction volume.
- Configured Docker CI/CD pipelines in GitLab for automated linting and unit testing.

Software Engineer — Cognizant (2020 - 2022)
- Built enterprise customer portal backends with Node.js, Express, and MongoDB.
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
Motivated junior backend developer with 2 years of experience writing REST APIs and frontend dashboards.

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
        'The candidate batch shows a strong top match (Aditya Verma) with verified high-concurrency distributed systems expertise, followed by a qualified mid-level contender (Neha Kulkarni) and a junior candidate requiring further progression.',
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
              evidence: 'Architected async event ingestion on Redis Streams & Kafka handling 45M+ daily transactions with 24ms p99.',
            },
            {
              label: 'Python & Async Concurrency',
              matchScore: 96,
              evidence: 'Deep FastAPI, uvloop, and Celery mastery across high-concurrency microservices.',
            },
            {
              label: 'PostgreSQL & Data Modeling',
              matchScore: 94,
              evidence: 'Managed read replicas with pgBouncer pooling supporting 12,000 queries/sec.',
            },
            {
              label: 'DevOps & Observability',
              matchScore: 92,
              evidence: 'Migrated monolith to AWS EKS and instituted OpenTelemetry tracing across 14 services.',
            },
          ],
          keyStrengths: [
            'Proven high-concurrency scaling past 12k RPS with measurable latency reduction (140ms to 24ms).',
            'Strong leadership experience driving microservices migration on Kubernetes.',
            'Production proficiency across both Python and Go for high-throughput pipelines.',
          ],
          missingRequirements: [],
          potentialRedFlags: [
            'None detected. Career trajectory shows consistent promotion and architectural scope ownership.',
          ],
          interviewQuestions: [
            'How did you tune pgBouncer and PostgreSQL connection limits during peak 12,000 QPS spikes?',
            'What failure modes did you encounter with Redis Streams when consumers lagged, and how did you mitigate message loss?',
            'How did you implement distributed tracing sampling to minimize CPU overhead in uvloop?',
          ],
        },
        {
          id: 'cand-02',
          name: 'Neha Kulkarni',
          currentRole: 'Full Stack Backend Specialist at FinEdge Tech',
          experienceYears: '4 yrs exp',
          compositeScore: 82,
          status: 'Shortlisted',
          oneLineVerdict:
            'Solid backend engineer with robust fintech API reliability experience; recommended for secondary architecture interview.',
          skillVectors: [
            {
              label: 'Distributed Systems Architecture',
              matchScore: 74,
              evidence: 'Built financial ledger APIs and reconciliation pipelines; limited exposure to multi-broker Kafka clusters.',
            },
            {
              label: 'Python & Async Concurrency',
              matchScore: 86,
              evidence: 'Strong production FastAPI and SQLAlchemy usage maintaining 99.98% SLA.',
            },
            {
              label: 'PostgreSQL & Data Modeling',
              matchScore: 85,
              evidence: 'Solid relational schema design and transaction isolation in fintech context.',
            },
            {
              label: 'DevOps & Observability',
              matchScore: 78,
              evidence: 'Hands-on Docker and GitLab CI/CD experience on AWS EC2.',
            },
          ],
          keyStrengths: [
            'Disciplined financial API engineering with high reliability and zero-data-loss standards.',
            'Strong automated testing discipline (88% unit/integration coverage).',
            'Solid Python FastAPI and relational data modeling skills.',
          ],
          missingRequirements: [
            'Lacks demonstrated experience with large-scale Kafka/Redis streaming pipelines (>10k RPS).',
            'No direct Kubernetes cluster administration mentioned.',
          ],
          potentialRedFlags: [
            'Primary infrastructure experience is single-instance AWS EC2 rather than auto-scaling container clusters.',
          ],
          interviewQuestions: [
            'How did you ensure idempotency in your financial ledger APIs during network retries?',
            'Describe how you would redesign your current reconciliation batch job into an event-driven async streaming pipeline.',
          ],
        },
        {
          id: 'cand-03',
          name: 'Rohit Sen',
          currentRole: 'Junior Backend Developer at AppStudio Labs',
          experienceYears: '2 yrs exp',
          compositeScore: 58,
          status: 'Review Queue',
          oneLineVerdict:
            'Promising junior engineer but lacks the required senior architectural breadth and high-concurrency scaling experience.',
          skillVectors: [
            {
              label: 'Distributed Systems Architecture',
              matchScore: 42,
              evidence: 'Basic Celery task scheduling only; no distributed queue or high-concurrency experience.',
            },
            {
              label: 'Python & Async Concurrency',
              matchScore: 68,
              evidence: 'Standard Django and DRF CRUD API development with introductory FastAPI exposure.',
            },
            {
              label: 'PostgreSQL & Data Modeling',
              matchScore: 62,
              evidence: 'Standard relational schema creation and Django ORM queries.',
            },
            {
              label: 'DevOps & Observability',
              matchScore: 50,
              evidence: 'Basic Docker containerization and Git workflows.',
            },
          ],
          keyStrengths: [
            'Clean Django API development and authentication practices.',
            'Clear motivation and rapid growth across 2 years of agency work.',
          ],
          missingRequirements: [
            'Does not meet 4+ year senior experience threshold.',
            'No experience scaling systems beyond standard web traffic.',
            'No Kafka, Redis Streams, or Kubernetes production background.',
          ],
          potentialRedFlags: [
            'Experience is largely entry-level CRUD development rather than complex system design.',
          ],
          interviewQuestions: [
            'What are the performance differences between Django ORM queries and raw SQL when handling large joins?',
            'How does Python async/await differ fundamentally from standard synchronous WSGI execution in Django?',
          ],
        },
      ],
      telemetry: {
        latencyMs: 312,
        inputTokens: 1420,
        outputTokens: 780,
        totalTokens: 2200,
        estimatedCostUsd: 0.00032,
        modelUsed: 'gemini-2.5-flash (deterministic JSON mode)',
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
Tools: Python, pgvector, LangChain, PostgreSQL, Apache Airflow, Docker`,
    precomputedResult: {
      batchId: 'norai_batch_ai_ops_002',
      jobTitle: 'AI Platform & Inference Engineer',
      totalEvaluated: 2,
      shortlistedCount: 2,
      summaryOverview:
        'The candidate pool features an exceptional AI platform specialist (Dr. Siddharth Rawat) with direct vLLM quantization expertise, and a solid data pipeline engineer (Priya Sharma) suitable for ingestion and vector ETL.',
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
              label: 'High-Throughput LLM Inference',
              matchScore: 99,
              evidence: 'Deployed vLLM with AWQ 4-bit quantization cutting GPU VRAM by 55% at 300+ req/sec.',
            },
            {
              label: 'Vector Search & RAG Architecture',
              matchScore: 96,
              evidence: 'Built hybrid BM25 + dense Qdrant retrieval with Cohere neural rerankers.',
            },
            {
              label: 'Kubernetes GPU Scheduling',
              matchScore: 94,
              evidence: 'Managed multi-tenant Ray Serve and GPU node affinity on Kubernetes.',
            },
            {
              label: 'Observability & Guardrails',
              matchScore: 95,
              evidence: 'Instituted custom Prometheus metrics for KV-cache pressure and TTFT.',
            },
          ],
          keyStrengths: [
            'Direct hands-on quantization and memory optimization on high-concurrency vLLM clusters.',
            'Production architecture across state-of-the-art hybrid RAG and rerankers.',
          ],
          missingRequirements: [],
          potentialRedFlags: ['None. Directly aligns with the core requirements of high-throughput model serving.'],
          interviewQuestions: [
            'How did you handle continuous batching and PagedAttention fragmentation under high concurrency spikes in vLLM?',
            'What criteria did you use to tune chunk overlap and hybrid alpha weight between BM25 and vector embeddings in Qdrant?',
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
              label: 'High-Throughput LLM Inference',
              matchScore: 62,
              evidence: 'Primarily uses API endpoints; limited direct vLLM/Triton engine deployment.',
            },
            {
              label: 'Vector Search & RAG Architecture',
              matchScore: 88,
              evidence: 'Successfully indexed 1.2M documents with pgvector and LangChain.',
            },
            {
              label: 'Kubernetes GPU Scheduling',
              matchScore: 70,
              evidence: 'Managed Docker and Airflow pipelines; lighter Kubernetes GPU scheduling experience.',
            },
            {
              label: 'Observability & Guardrails',
              matchScore: 76,
              evidence: 'Airflow monitoring and data pipeline validation routines.',
            },
          ],
          keyStrengths: [
            'Proven enterprise document pipeline scaling across 1.2M PDFs.',
            'Solid Python and pgvector database foundation.',
          ],
          missingRequirements: [
            'Lacks deep vLLM/TensorRT-LLM model serving and AWQ quantization background.',
          ],
          potentialRedFlags: ['Focus is primarily data engineering rather than model inference optimization.'],
          interviewQuestions: [
            'How did you benchmark retrieval latency as your pgvector index grew past 1 million vectors?',
            'What trade-offs exist between HNSW and IVFFlat index types in PostgreSQL?',
          ],
        },
      ],
      telemetry: {
        latencyMs: 295,
        inputTokens: 1180,
        outputTokens: 620,
        totalTokens: 1800,
        estimatedCostUsd: 0.00026,
        modelUsed: 'gemini-2.5-flash (deterministic JSON mode)',
        ephemeralStatus: 'EPHEMERAL_RAM_FLUSHED',
        timestamp: new Date().toISOString(),
      },
    },
  },
];
