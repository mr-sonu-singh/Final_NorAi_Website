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
            '2 nodes. A 5-node cluster requires 3 nodes (floor(5/2) + 1 = 3) to form a functioning majority quorum.',
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
            'In a cluster of size N=7, majority quorum is floor(7/2) + 1 = 4 affirmative votes.',
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
            'Multiplication by the transposed weight matrix (W^[l+1])^T followed by element-wise Hadamard multiplication with g\'(z^[l]).',
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
      ],
      quiz: [
        {
          id: 'q-01',
          topic: 'Backpropagation Vector Dimensions',
          question:
            'If layer l has n^[l] neurons and layer l-1 has n^[l-1] neurons, what is the matrix dimension of dL/dW^[l]?',
          options: [
            '(n^[l] x n^[l-1])',
            '(n^[l-1] x n^[l])',
            '(n^[l] x 1)',
            '(1 x n^[l-1])',
          ],
          correctAnswerIndex: 0,
          explanation:
            'The gradient matrix dL/dW^[l] must strictly match the dimension of the weight matrix W^[l], which is (n^[l] x n^[l-1]).',
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
];

export const CHAT_DIGEST_PRESETS: ChatDigestPreset[] = [
  {
    id: 'preset-discord-dev',
    title: 'SuperBase Developer Discord (1,850 messages)',
    platform: 'Discord',
    communityName: 'SuperBase Developer Community',
    timeframe: 'Last 24 Hours',
    sampleChatLogText: `[10:14] @alex_dev: Hey team, we just pushed v2.4.0 with edge streaming support!
[10:15] @bot_welcome: Welcome @sarah_k to SuperBase Discord! Check rules in #announcements.
[10:18] @sarah_k: thanks! quick question: does the new Python SDK support async connection pooling?
[10:20] @marcus_eng: @sarah_k yes! use AsyncClient(pool_size=20). Full docs on docs.superbase.dev/python.
[11:05] @vikram_ops: [BUG] Encountered 504 Gateway Timeout on /v1/auth/session when executing with Postgres read replica failover.
[11:08] @alex_dev: @vikram_ops looking into this now. It looks like the replica healthcheck timeout is set to 5000ms instead of 500ms.
[11:30] @crypto_sam: gm everyone!! to the moon 🚀🚀🚀
[11:31] @bot_mod: Please keep price talk in #trading-banter.
[12:15] @elena_ai: Feature request: Can we get automated webhook retry headers with exponential backoff metadata?
[12:18] @marcus_eng: @elena_ai great idea, opened GitHub issue #402 for our next sprint.
[14:40] @david_sec: Verified SOC2 Type II audit report is now available in developer portal for enterprise teams.
[15:20] @vikram_ops: Update: v2.4.1 hotfix resolved the auth session timeout! Confirmed working under 2,000 req/sec load.`,
    precomputedResult: {
      communityName: 'SuperBase Developer Community',
      timeframeCovered: 'Last 24 Hours',
      totalRawMessages: 1850,
      filteredSignalMessages: 412,
      spamFilteredPercentage: 77.7,
      overallSentiment: 'Bullish / Enthusiastic',
      sentimentScore: 91,
      executiveBrief:
        'Major excitement surrounding the v2.4.0 edge streaming release. A high-priority auth timeout bug during Postgres read replica failover was detected by @vikram_ops and hotfixed in under 4 hours with v2.4.1.',
      topicClusters: [
        {
          id: 'topic-01',
          topicName: 'v2.4.0 Edge Streaming & SDK Async Support',
          channelOrContext: '#dev-announcements & #general',
          messageCount: 86,
          sentiment: 'Positive',
          sentimentScore: 95,
          summary:
            'Developers celebrated the launch of v2.4.0 edge streaming. Clarifications were provided on Python SDK async pooling configuration.',
          keyQuotations: [
            '@sarah_k: "does the new Python SDK support async connection pooling?"',
            '@marcus_eng: "yes! use AsyncClient(pool_size=20)"',
          ],
        },
        {
          id: 'topic-02',
          topicName: 'Auth 504 Gateway Timeout Hotfix (v2.4.1)',
          channelOrContext: '#incident-response & #bugs',
          messageCount: 54,
          sentiment: 'Mixed',
          sentimentScore: 82,
          summary:
            'A 504 timeout bug on session auth during replica failover was reported and resolved with v2.4.1, verified under 2,000 RPS load.',
          keyQuotations: [
            '@vikram_ops: "[BUG] Encountered 504 Gateway Timeout on /v1/auth/session"',
            '@alex_dev: "replica healthcheck timeout is set to 5000ms instead of 500ms"',
          ],
        },
        {
          id: 'topic-03',
          topicName: 'SOC2 Type II Compliance & Webhook Backoff',
          channelOrContext: '#product-feedback',
          messageCount: 32,
          sentiment: 'Positive',
          sentimentScore: 92,
          summary:
            'Enterprise teams welcomed SOC2 audit availability. Webhook retry headers with exponential backoff were queued for the upcoming sprint (#402).',
          keyQuotations: [
            '@david_sec: "Verified SOC2 Type II audit report is now available in developer portal"',
          ],
        },
      ],
      actionItemsAndBugs: [
        {
          id: 'bug-01',
          type: 'Bug Report',
          priority: 'Urgent',
          title: '504 Gateway Timeout on Postgres Read Replica Failover',
          description:
            'Replica healthcheck timeout was misconfigured at 5000ms, causing auth session timeouts during replica transitions.',
          reporterHandle: '@vikram_ops',
          recommendedTriage: 'Resolved via v2.4.1 hotfix; add automated failover latency test in CI pipeline.',
        },
        {
          id: 'feat-01',
          type: 'Feature Request',
          priority: 'Medium',
          title: 'Exponential Backoff Metadata in Webhook Dispatches',
          description:
            'Provide attempt count and next retry timestamp headers on failed webhook delivery retries.',
          reporterHandle: '@elena_ai',
          recommendedTriage: 'Tracked in GitHub issue #402 for Sprint 18 release.',
        },
      ],
      formattedNewsletter: {
        headline: 'SuperBase Daily Digest: v2.4.0 Streaming Live + Hotfix Deployed',
        introParagraph:
          'What a day for the SuperBase community! We shipped v2.4.0 edge streaming, resolved a critical failover bug in record time, and announced SOC2 Type II certification.',
        spotlightSection:
          'Special thanks to @vikram_ops and @alex_dev for rapid bug discovery and patch verification under 2,000 requests/sec peak load.',
        communityShoutouts: [
          '@sarah_k for great Python SDK async pooling questions',
          '@elena_ai for inspiring GitHub issue #402 with webhook retry improvements',
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
];

export const DAINIK_NEWS_PRESETS: DainikNewsPreset[] = [
  {
    id: 'preset-uppsc-gazette',
    title: 'Uttar Pradesh State Engineering Services Gazette (UPPSC)',
    stateOrRegion: 'Uttar Pradesh, India',
    domain: 'Public Engineering & Technical Services',
    languageMode: 'Bilingual (Hindi + English)',
    sampleGazetteText: `उत्तर प्रदेश लोक सेवा आयोग (UPPSC) — आधिकारिक अधिसूचना संख्या: A-3/E-1/2026
दिनांक: 15 अगस्त 2026

1. पद विवरण एवं रिक्तियां:
राज्य अभियंत्रण सेवा (सहायक अभियंता / Assistant Engineer - Civil, Electrical, Mechanical) के कुल 1,450 पदों हेतु ऑनलाइन आवेदन आमंत्रित किए जाते हैं।
- वेतनमान: पे-मैट्रिक्स लेवल 10 (₹56,100 - ₹1,77,500).

2. महत्वपूर्ण तिथियां (Important Deadlines):
- ऑनलाइन आवेदन प्रारंभ तिथि: 20 अगस्त 2026
- ऑनलाइन परीक्षा शुल्क बैंक में जमा करने की अंतिम तिथि: 25 सितंबर 2026
- ऑनलाइन आवेदन सबमिट करने की अंतिम तिथि: 30 सितंबर 2026 (अंतिम तिथि के पश्चात कोई आवेदन स्वीकार नहीं होगा)

3. पात्रता मापदंड (Eligibility Criteria):
- आयु सीमा: 21 से 40 वर्ष (आरक्षित वर्गों हेतु नियमानुसार 5 वर्ष की छूट).
- शैक्षणिक योग्यता: भारत में विधि द्वारा स्थापित विश्वविद्यालय से संबंधित इंजीनियरिंग शाखा में बी.ई. / बी.टेक. उपाधि।

4. चयन प्रक्रिया (Selection Process):
- प्रथम चरण: संयुक्त प्रारंभिक परीक्षा (वस्तुनिष्ठ प्रकार - 375 अंक)
- द्वितीय चरण: मुख्य लिखित परीक्षा (पारंपरिक विषयवार - 750 अंक)
- तृतीय चरण: साक्षात्कार (100 अंक)

आधिकारिक पोर्टल: https://uppsc.up.nic.in
नोट: किसी भी अनधिकृत एजेंट या मध्यस्थ के झांसे में न आएं। आवेदन केवल आधिकारिक वेबसाइट पर ही मान्य होगा।`,
    precomputedResult: {
      editionDate: '15 August 2026',
      stateOrRegion: 'Uttar Pradesh, India',
      totalNotificationsAnalyzed: 1,
      verifiedGazetteCount: 1,
      englishSummaryHeadline:
        'UPPSC Announces 1,450 Assistant Engineer Vacancies: Applications Open till 30 Sept 2026',
      hindiSummaryHeadline:
        'UPPSC ने 1,450 सहायक अभियंता पदों हेतु जारी की अधिसूचना: 30 सितंबर तक ऑनलाइन आवेदन',
      executiveBriefEnglish:
        'The Uttar Pradesh Public Service Commission (UPPSC) has officially notified 1,450 Assistant Engineer positions across Civil, Electrical, and Mechanical engineering branches under Pay Matrix Level 10 (₹56,100 - ₹1,77,500). Online submission window closes on 30 September 2026.',
      executiveBriefHindi:
        'उत्तर प्रदेश लोक सेवा आयोग (UPPSC) ने राज्य अभियंत्रण सेवा परीक्षा 2026 के अंतर्गत 1,450 सहायक अभियंता (सिविल, इलेक्ट्रिकल, मैकेनिकल) पदों के लिए भर्ती अधिसूचना जारी की है। पे-मैट्रिक्स लेवल 10 के इन पदों हेतु आवेदन की अंतिम तिथि 30 सितंबर 2026 निर्धारित की गई है।',
      alertCards: [
        {
          id: 'alert-01',
          title: 'UPPSC Assistant Engineer (Combined State Engineering Services)',
          hindiTitle: 'UPPSC सहायक अभियंता (राज्य अभियंत्रण सेवा परीक्षा)',
          departmentOrMinistry: 'Uttar Pradesh Public Service Commission (UPPSC)',
          category: 'Govt Employment',
          urgencyLevel: 'Active Window',
          deadlineDate: '30 September 2026',
          daysRemaining: 31,
          vacanciesOrScope: '1,450 Posts',
          salaryBandOrBudget: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
          eligibilitySnippet: 'B.E. / B.Tech in Civil/Electrical/Mechanical; Age: 21-40 yrs',
          officialPortalUrl: 'https://uppsc.up.nic.in',
          verifiedSourceRef: 'Advt No: A-3/E-1/2026',
        },
      ],
      eligibilityMatrix: [
        {
          postOrNotification: 'Assistant Engineer (Civil/Elec/Mech)',
          ageCriteria: '21 to 40 Years (5-year relaxation for SC/ST/OBC of UP)',
          qualification: 'B.E. / B.Tech degree in relevant engineering branch',
          reservationQuotas: 'Vertical & Horizontal reservation as per UP State Government orders',
          applicationFee: '₹225 (Gen/OBC/EWS), ₹105 (SC/ST), ₹25 (PwD)',
          selectionProcess: 'Prelims (375 Marks) -> Mains (750 Marks) -> Interview (100 Marks)',
        },
      ],
      factValidationNotes: [
        'Verified against UPPSC official gazette dispatch A-3/E-1/2026 published on 15 August 2026.',
        'Anti-Rumor Note: All candidates must apply exclusively through uppsc.up.nic.in; offline forms are null and void.',
      ],
      telemetry: {
        latencyMs: 320,
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
];
