# Formal Production Scope & Engineering Estimate
## Full-Stack Document Reference System & Deterministic RAG Pipeline

**Client Location:** Mechanicsburg, PA  
**Prepared By:** Shakil Ahmed · Founder & Principal Systems Architect, BarakahSoft LLC  
**Verified Upwork Partner:** 12+ Years Enterprise Systems Engineering · Former Lead Engineer at Legiit ($1M ARR Command Center)  
**Calibrated Rate:** $50.00 / hr (Client Posted Range: $30.00 - $75.00 / hr)  
**Turnaround Timeline:** 3–4 Weeks across 4 Milestones  
**Total Estimated Investment:** 60 Hours · $3,000.00  
**Interactive Working Demo:** [https://docref-vault.vercel.app](https://docref-vault.vercel.app)  

---

### Executive Scope Breakdown

| Milestone | Deliverables & Technical Architecture | Estimated Hours | Milestone Total |
|---|---|:---:|:---:|
| **Milestone 1: Ingestion, OCR & Storage Core** | • Production Postgres setup with `pgvector` extension and HNSW/GIN indexes<br>• Asynchronous document ingestion engine with OCR coordinate extraction (`[ymin, xmin, ymax, xmax]`)<br>• Semantic chunking with recursive sliding window and character confidence tracking<br>• Document metadata registry and automated chunk SHA-256 integrity hashing | 18 hrs | $900.00 |
| **Milestone 2: Hybrid Retrieval & Re-Ranking** | • Dense vector search (1536-dim cosine similarity) via HNSW index<br>• Sparse lexical search via Postgres `tsvector` with BM25 scoring<br>• Two-stage cross-encoder re-ranking (`score_dense * 0.55 + score_bm25 * 0.45`)<br>• Dual-provider AI gateway (OpenAI `gpt-4o-mini` + Gemini `gemini-2.0-flash` + deterministic fallback) | 16 hrs | $800.00 |
| **Milestone 3: Cockpit UI & Deterministic Reports** | • Split-screen Document Reference Cockpit with synchronized citation badges<br>• Document canvas rendering with real-time OCR bounding box overlay<br>• Dynamic 4-role RBAC authorization hierarchy (Admin, Auditor, Reviewer, Viewer)<br>• Cryptographic deterministic report generator with SHA-256 seal and print stylesheets | 14 hrs | $700.00 |
| **Milestone 4: Security, Anti-Abuse & Handoff** | • Token bucket rate limiting (60 req/min) with client IP fingerprinting<br>• Canary token injection quarantine against adversarial prompt overrides<br>• Immutable WORM audit logging capturing timestamp, role, IP, and cryptographic hash<br>• Comprehensive handoff package: OpenAPI 3.1 specs, Docker blueprints, and administrator runbooks | 12 hrs | $600.00 |
| **Total Turnkey Scope** | **Complete Full-Stack Document Reference & Deterministic RAG System** | **60 hrs** | **$3,000.00** |

---

### Guaranteed Deliverables & Security Standards
1. **Zero Black-Box AI:** Every AI synthesis links directly to verified source document chunks with exact page numbers and OCR bounding box coordinates.
2. **Cryptographic Repeatability:** Generated compliance reports include deterministic SHA-256 digests computed across query, chunk IDs, and model tokens.
3. **High-Availability AI Gateway:** Sub-second response times with automatic failover between OpenAI and Google Gemini, backed by an offline local rule engine.
4. **Clean Handoff:** Fully documented Next.js 15 repository, automated CI/CD pipeline, Docker container configurations, and database migration scripts.

---
*BarakahSoft LLC · Mechanicsburg, PA Proposal Package · Confidential*
