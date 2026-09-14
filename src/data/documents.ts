export interface DocumentChunk {
  id: string;
  chunkIndex: number;
  section: string;
  pageNumber: number;
  content: string;
  ocrConfidence: number;
  boundingBox: { ymin: number; xmin: number; ymax: number; xmax: number };
  vectorScore: number;
  bm25Score: number;
  rerankScore: number;
  sha256: string;
  classification: "RESTRICTED" | "CONFIDENTIAL" | "PUBLIC" | "INTERNAL";
}

export interface IngestedDocument {
  id: string;
  code: string;
  title: string;
  category: "Legal & MSA" | "Regulatory Compliance" | "Security & Architecture" | "Engineering Spec";
  totalPages: number;
  fileSizeKb: number;
  ocrStatus: "COMPLETED" | "VERIFIED" | "INDEXED";
  author: string;
  createdDate: string;
  sha256Hash: string;
  collection: string;
  chunks: DocumentChunk[];
}

export const SAMPLE_DOCUMENTS: IngestedDocument[] = [
  {
    id: "doc-001",
    code: "DOC-2026-089",
    title: "Master Cloud Services Agreement & SOC-2 Enterprise Addendum",
    category: "Legal & MSA",
    totalPages: 24,
    fileSizeKb: 1420,
    ocrStatus: "VERIFIED",
    author: "General Counsel Office • Apex Enterprises LLC",
    createdDate: "2026-01-14",
    sha256Hash: "8f7e3d1a9b2c4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789ab",
    collection: "Enterprise MSAs",
    chunks: [
      {
        id: "chunk-001-1",
        chunkIndex: 1,
        section: "§4.2 Data Processing & Encryption Standards",
        pageNumber: 4,
        content: "Provider shall encrypt all Customer Data in transit using TLS 1.3 or higher and at rest using AES-256 with tenant-isolated customer managed keys (CMEK). Key rotation shall occur automatically every 90 days with cryptographic verification logs submitted to Customer Compliance Officer.",
        ocrConfidence: 99.8,
        boundingBox: { ymin: 120, xmin: 45, ymax: 220, xmax: 550 },
        vectorScore: 0.89,
        bm25Score: 14.2,
        rerankScore: 0.96,
        sha256: "4a2b9c7d1e3f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
        classification: "RESTRICTED"
      },
      {
        id: "chunk-001-2",
        chunkIndex: 2,
        section: "§8.1 Mutual Indemnification & Liability Limitation Caps",
        pageNumber: 12,
        content: "Each Party's aggregate cumulative liability arising out of or related to this Agreement shall be strictly capped at the total fees paid by Customer during the twelve (12) month period immediately preceding the incident giving rise to liability. Notwithstanding the foregoing, the liability cap shall not apply to breaches of Section 4 (Confidentiality and Security) or IP Infringement indemnification obligations, which remain subject to a super-cap of $5,000,000.00 USD.",
        ocrConfidence: 99.4,
        boundingBox: { ymin: 240, xmin: 45, ymax: 380, xmax: 550 },
        vectorScore: 0.94,
        bm25Score: 18.7,
        rerankScore: 0.98,
        sha256: "7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
        classification: "RESTRICTED"
      },
      {
        id: "chunk-001-3",
        chunkIndex: 3,
        section: "§14.3 Security Incident & Data Breach Notification SLA",
        pageNumber: 16,
        content: "In the event of a confirmed or reasonably suspected Security Incident affecting Customer Personal Data, Provider shall provide formal written notice to Customer's designated security contact via encrypted electronic mail within four (4) hours of confirmation. Notification shall include root-cause analysis, blast radius, and immediate remediation steps taken.",
        ocrConfidence: 99.6,
        boundingBox: { ymin: 150, xmin: 45, ymax: 260, xmax: 550 },
        vectorScore: 0.91,
        bm25Score: 16.5,
        rerankScore: 0.97,
        sha256: "9c0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e",
        classification: "RESTRICTED"
      }
    ]
  },
  {
    id: "doc-002",
    code: "DOC-2026-114",
    title: "Hazardous Materials & Cleanroom Safety Protocol Manual",
    category: "Regulatory Compliance",
    totalPages: 38,
    fileSizeKb: 2890,
    ocrStatus: "VERIFIED",
    author: "Industrial Hygiene & Safety Board • EHS Division",
    createdDate: "2026-02-02",
    sha256Hash: "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    collection: "EHS Protocols",
    chunks: [
      {
        id: "chunk-002-1",
        chunkIndex: 1,
        section: "§3.4 Flammable Vapor Containment & Negative Pressure HVAC",
        pageNumber: 7,
        content: "Solvent handling zones Class 1 Div 2 require continuous negative pressure ventilation maintaining a minimum static differential of -0.05 inches water gauge (wg) relative to adjacent sterile corridors. Air changes per hour (ACH) must be maintained at a minimum of 20 ACH with exhaust ducted directly to thermal oxidizer abatement units.",
        ocrConfidence: 96.9,
        boundingBox: { ymin: 180, xmin: 50, ymax: 310, xmax: 540 },
        vectorScore: 0.88,
        bm25Score: 15.1,
        rerankScore: 0.94,
        sha256: "1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a",
        classification: "CONFIDENTIAL"
      },
      {
        id: "chunk-002-2",
        chunkIndex: 2,
        section: "§5.2 Emergency Spill Containment & Neutralization Protocols",
        pageNumber: 14,
        content: "Secondary containment basins must provide 110% volumetric capacity of the primary storage vessel. In the event of an acid spill exceeding 5 gallons, automated deluge neutralizing valves will disperse dry sodium bicarbonate slurry within 45 seconds of optical pH sensor activation.",
        ocrConfidence: 98.1,
        boundingBox: { ymin: 110, xmin: 50, ymax: 230, xmax: 540 },
        vectorScore: 0.82,
        bm25Score: 11.4,
        rerankScore: 0.89,
        sha256: "3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c",
        classification: "INTERNAL"
      }
    ]
  },
  {
    id: "doc-003",
    code: "DOC-2026-203",
    title: "HIPAA Business Associate Agreement & PHI Access Control Policy",
    category: "Regulatory Compliance",
    totalPages: 18,
    fileSizeKb: 980,
    ocrStatus: "COMPLETED",
    author: "Privacy & Data Protection Officer • HealthTrust Systems",
    createdDate: "2026-03-10",
    sha256Hash: "d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
    collection: "Healthcare BAA",
    chunks: [
      {
        id: "chunk-003-1",
        chunkIndex: 1,
        section: "§2.1 Minimum Necessary Standard & Role-Based PHI Scoping",
        pageNumber: 3,
        content: "Covered Entity and Business Associate agree that access to Protected Health Information (PHI) shall be strictly limited to the minimum necessary workforce members required to execute designated treatment, payment, or operational services. All electronic medical record queries must record user role, clinical justification, and patient MRN.",
        ocrConfidence: 99.5,
        boundingBox: { ymin: 90, xmin: 40, ymax: 210, xmax: 550 },
        vectorScore: 0.85,
        bm25Score: 13.6,
        rerankScore: 0.91,
        sha256: "5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
        classification: "RESTRICTED"
      },
      {
        id: "chunk-003-2",
        chunkIndex: 2,
        section: "§7.4 Immutable Audit Log Retention & WORM Compliance",
        pageNumber: 11,
        content: "Audit logs recording read, modify, and export actions over patient records must be preserved for a minimum of seven (7) years on Write Once Read Many (WORM) storage media. Log tampering or deletion attempts shall automatically trigger SIEM alerts and immediate credential revocation.",
        ocrConfidence: 99.7,
        boundingBox: { ymin: 270, xmin: 40, ymax: 390, xmax: 550 },
        vectorScore: 0.92,
        bm25Score: 17.1,
        rerankScore: 0.97,
        sha256: "7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
        classification: "RESTRICTED"
      }
    ]
  },
  {
    id: "doc-004",
    code: "DOC-2026-301",
    title: "Federal Acquisition Regulation (FAR 52.204-21) System Security Plan",
    category: "Security & Architecture",
    totalPages: 42,
    fileSizeKb: 3410,
    ocrStatus: "VERIFIED",
    author: "Federal Systems Defense Directorate",
    createdDate: "2026-02-18",
    sha256Hash: "f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6",
    collection: "Defense & Federal",
    chunks: [
      {
        id: "chunk-004-1",
        chunkIndex: 1,
        section: "§2.1 Multi-Factor Authentication & Cryptographic Session Lifetimes",
        pageNumber: 9,
        content: "In accordance with FAR 52.204-21(b)(1)(iv), all remote administrative access to covered contractor information systems requires hardware-token or FIDO2-compliant phishing-resistant multi-factor authentication (MFA). Session idle timeouts must terminate active credentials after fifteen (15) minutes of inactivity.",
        ocrConfidence: 99.2,
        boundingBox: { ymin: 140, xmin: 50, ymax: 270, xmax: 540 },
        vectorScore: 0.87,
        bm25Score: 14.8,
        rerankScore: 0.93,
        sha256: "9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
        classification: "CONFIDENTIAL"
      },
      {
        id: "chunk-004-2",
        chunkIndex: 2,
        section: "§4.6 Ingress Sanitization & Anti-Injection Guardrails",
        pageNumber: 22,
        content: "All external input pipelines, document ingestion services, and query parsers must pass through an automated canary token inspection layer. Any string matching heuristic patterns for SQL injection, LLM system prompt override, or directory traversal must be quarantined with HTTP 403 Forbidden emitted.",
        ocrConfidence: 98.9,
        boundingBox: { ymin: 300, xmin: 50, ymax: 420, xmax: 540 },
        vectorScore: 0.93,
        bm25Score: 19.1,
        rerankScore: 0.99,
        sha256: "1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
        classification: "RESTRICTED"
      }
    ]
  }
];

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: "ADMIN" | "COMPLIANCE_AUDITOR" | "LEGAL_REVIEWER" | "READ_ONLY_VIEWER";
  action: "SEARCH_QUERY" | "RERANK_EXECUTION" | "CITATION_VERIFIED" | "REPORT_GENERATED" | "DOCUMENT_INGEST" | "ABUSE_BLOCKED";
  details: string;
  targetDoc: string;
  ipAddress: string;
  status: "SUCCESS" | "FLAGGED" | "BLOCKED";
  sha256Hash: string;
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "audit-101",
    timestamp: "2026-09-15T18:21:04.112Z",
    userRole: "LEGAL_REVIEWER",
    action: "RERANK_EXECUTION",
    details: "Hybrid search executed across Legal & MSA collection. Cohere/BGE cross-encoder re-ranked top 10 candidates. Delta: +2 on DOC-2026-089 §8.1.",
    targetDoc: "DOC-2026-089 §8.1",
    ipAddress: "198.51.100.42 (US-East)",
    status: "SUCCESS",
    sha256Hash: "c8e2b1f4a9d7e3c501829475a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4"
  },
  {
    id: "audit-102",
    timestamp: "2026-09-15T18:19:42.889Z",
    userRole: "COMPLIANCE_AUDITOR",
    action: "REPORT_GENERATED",
    details: "Deterministic audit report compiled for SOC-2 Encryption & SLA verification. SHA-256 seal issued.",
    targetDoc: "DOC-2026-089 §4.2, §14.3",
    ipAddress: "198.51.100.18 (US-East)",
    status: "SUCCESS",
    sha256Hash: "f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2"
  },
  {
    id: "audit-103",
    timestamp: "2026-09-15T18:15:11.432Z",
    userRole: "READ_ONLY_VIEWER",
    action: "ABUSE_BLOCKED",
    details: "Canary token anomaly detected: Query payload contained prompt injection directive 'IGNORE PREVIOUS INSTRUCTIONS'. Token bucket throttled.",
    targetDoc: "GLOBAL_GATEWAY",
    ipAddress: "203.0.113.88 (External)",
    status: "BLOCKED",
    sha256Hash: "e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3"
  },
  {
    id: "audit-104",
    timestamp: "2026-09-15T18:10:02.771Z",
    userRole: "ADMIN",
    action: "DOCUMENT_INGEST",
    details: "OCR extraction completed for DOC-2026-114 (Hazardous Materials). 38 pages indexed, 48 chunks embedded with 1536d vectors.",
    targetDoc: "DOC-2026-114",
    ipAddress: "198.51.100.4 (US-East)",
    status: "SUCCESS",
    sha256Hash: "a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8"
  }
];
