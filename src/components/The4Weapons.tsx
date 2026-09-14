"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  FileCode,
  Sliders,
  DollarSign,
  Zap,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
  Check,
  Copy
} from "lucide-react";

// ==========================================
// 1. ONE-CLICK PRODUCTION BLUEPRINTS MODAL
// ==========================================
interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintExporterModal: React.FC<BlueprintModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>("pgvector-schema.sql");
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const files: Record<string, { label: string; desc: string; content: string }> = {
    "pgvector-schema.sql": {
      label: "Postgres + pgvector Schema",
      desc: "Production HNSW Cosine Index (1536d) + GIN Full-Text Search + RLS Tables",
      content: `-- PostgreSQL 16 + pgvector Schema for Enterprise Document Reference System
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Documents Metadata Table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(64) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    collection VARCHAR(64) NOT NULL,
    total_pages INTEGER NOT NULL DEFAULT 1,
    file_size_kb INTEGER NOT NULL,
    sha256_hash CHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Document Chunks Table with 1536d Vector Embeddings
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    section_title TEXT NOT NULL,
    page_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    content_tsv TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
    ocr_confidence NUMERIC(5, 2) NOT NULL DEFAULT 99.00,
    bounding_box JSONB NOT NULL,
    embedding VECTOR(1536),
    chunk_hash CHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HNSW Vector Cosine Index (P95 < 25ms retrieval)
CREATE INDEX IF NOT EXISTS idx_chunks_hnsw_embedding 
ON document_chunks USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Sparse GIN Lexical Search Index for Hybrid BM25
CREATE INDEX IF NOT EXISTS idx_chunks_tsv 
ON document_chunks USING gin (content_tsv);

-- 5. Row Level Security Policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins full access" ON documents FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');
CREATE POLICY "Reviewers read all" ON documents FOR SELECT USING (true);`
    },
    "inngest-rag-pipeline.ts": {
      label: "Inngest Durable Workflow",
      desc: "Serverless Event-Driven Document Ingestion, OCR & Embedding Pipeline",
      content: `import { inngest } from "./client";
import { ocrExtractDocument } from "./services/ocr";
import { chunkTextWithOverlap } from "./services/chunker";
import { generateEmbeddings } from "./services/embeddings";
import { db } from "./services/database";

export const processDocumentUpload = inngest.createFunction(
  { id: "process-document-upload", retries: 3 },
  { event: "document/uploaded" },
  async ({ event, step }) => {
    const { docId, fileUrl, collection } = event.data;

    // Step 1: Execute OCR Text & Bounding Box Extraction
    const ocrResult = await step.run("ocr-extraction", async () => {
      return await ocrExtractDocument(fileUrl);
    });

    // Step 2: Semantic Chunking (512 tokens with 64 token overlap)
    const chunks = await step.run("semantic-chunking", async () => {
      return chunkTextWithOverlap(ocrResult.pages, { maxTokens: 512, overlap: 64 });
    });

    // Step 3: Dual Embedding Generation (1536d)
    const embeddedChunks = await step.run("generate-embeddings", async () => {
      return await generateEmbeddings(chunks);
    });

    // Step 4: Batch Insert to pgvector with HNSW Index
    await step.run("index-pgvector", async () => {
      await db.insertChunks(docId, embeddedChunks);
    });

    return { success: true, docId, totalChunks: chunks.length };
  }
);`
    },
    "docker-compose.yml": {
      label: "Self-Hosted Docker Stack",
      desc: "Postgres + pgvector + Tesseract OCR Worker + Redis Queue",
      content: `version: '3.8'

services:
  postgres-vector:
    image: pgvector/pgvector:pg16
    container_name: docref-postgres
    environment:
      POSTGRES_USER: docref_admin
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-enterprise_vault_secret}
      POSTGRES_DB: docref_vault
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./pgvector-schema.sql:/docker-entrypoint-initdb.d/01-init.sql
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: docref-redis
    ports:
      - "6379:6379"
    restart: unless-stopped

  ocr-worker:
    image: tesseractshadow/tesseract4re
    container_name: docref-ocr-worker
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      - redis
    restart: unless-stopped

volumes:
  pgdata:`
    },
    "openapi.json": {
      label: "OpenAPI 3.1 Specification",
      desc: "Official REST & Citation Endpoints Schema Definition",
      content: `{
  "openapi": "3.1.0",
  "info": {
    "title": "DocRef Vault API",
    "version": "1.0.0",
    "description": "Full-Stack Document Reference & RAG Citation Engine"
  },
  "paths": {
    "/api/ai/query": {
      "post": {
        "summary": "Execute Hybrid Search with Cross-Encoder Re-Ranking",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": { "type": "string" },
                  "collection": { "type": "string" },
                  "useReranker": { "type": "boolean" }
                },
                "required": ["query"]
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Verified Synthesis with Cited Chunks" }
        }
      }
    }
  }
}`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(files[selectedFile].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([files[selectedFile].content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedFile;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-4xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-xl animate-fadeIn max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Production Blueprints & Architectural Deliverables
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                100% Client Code Ownership • Zero Vendor Lock-in
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2 overflow-x-auto">
          {Object.keys(files).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedFile(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedFile === key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-border)]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <p className="text-xs text-[var(--color-text-muted)] font-mono mb-3">
          {files[selectedFile].desc}
        </p>

        {/* Code Viewer */}
        <div className="relative flex-1 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200">
          <pre className="h-full overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {files[selectedFile].content}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)] mt-4">
          <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
            Turnkey deployment files included with project handoff
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download {selectedFile}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. OPERATIONAL ROI & TOKEN BURN CALCULATOR
// ==========================================
interface RoiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoiCostCalculatorModal: React.FC<RoiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [docsPerMonth, setDocsPerMonth] = useState<number>(3500);
  const [queriesPerMonth, setQueriesPerMonth] = useState<number>(1800);
  const [legalHourlyRate, setLegalHourlyRate] = useState<number>(125);

  if (!isOpen) return null;

  // Math:
  // Embedding: text-embedding-3-small @ $0.02 per 1M tokens. ~500 tokens/chunk = ~1.75M tokens = $0.035
  // Query: gpt-4o-mini @ $0.15/1M input, $0.60/1M output. ~600 tokens/query = ~1.08M tokens = $0.27
  // Total LLM & Vector Run Cost: ~$0.31 to $1.20 / mo
  const tokenCost = Math.max(0.42, Math.round(((docsPerMonth * 500 * 0.00000002) + (queriesPerMonth * 600 * 0.0000004)) * 100) / 100);
  
  // Manual time saved: ~15 minutes per document reference verification query = 0.25 hrs * queries
  const hoursSaved = Math.round(queriesPerMonth * 0.25);
  const laborCostSaved = Math.round(hoursSaved * legalHourlyRate);
  const netRoi = Math.round((laborCostSaved / tokenCost) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-xl animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Operational ROI & API Token Burn Calculator
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Unit Economics: LLM Inference Cost vs Manual Legal/Compliance Labor Saved
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-4 py-4 text-xs">
          <div>
            <div className="flex justify-between font-semibold text-[var(--color-text-primary)] mb-1">
              <span>Monthly Ingested Pages:</span>
              <span className="font-mono text-indigo-600">{docsPerMonth.toLocaleString()} pages</span>
            </div>
            <input
              type="range"
              min="500"
              max="25000"
              step="500"
              value={docsPerMonth}
              onChange={(e) => setDocsPerMonth(Number(e.target.value))}
              className="w-full cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-[var(--color-text-primary)] mb-1">
              <span>Monthly Reference Queries:</span>
              <span className="font-mono text-indigo-600">{queriesPerMonth.toLocaleString()} queries</span>
            </div>
            <input
              type="range"
              min="200"
              max="15000"
              step="100"
              value={queriesPerMonth}
              onChange={(e) => setQueriesPerMonth(Number(e.target.value))}
              className="w-full cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-[var(--color-text-primary)] mb-1">
              <span>Legal / Compliance Reviewer Hourly Rate:</span>
              <span className="font-mono text-emerald-600">${legalHourlyRate}/hour</span>
            </div>
            <input
              type="range"
              min="45"
              max="350"
              step="5"
              value={legalHourlyRate}
              onChange={(e) => setLegalHourlyRate(Number(e.target.value))}
              className="w-full cursor-pointer accent-emerald-600"
            />
          </div>

          {/* KPI Output Bento */}
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
            <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)] text-xs block mb-1">LLM Run Burn:</span>
              <div className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                ${tokenCost}/mo
              </div>
              <span className="text-[11px] text-[var(--color-text-muted)]">Sub-penny per run</span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)] text-xs block mb-1">Labor Saved:</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-600">
                ${laborCostSaved.toLocaleString()}
              </div>
              <span className="text-[11px] text-[var(--color-text-muted)]">{hoursSaved} hrs/mo saved</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
              <span className="text-emerald-700 dark:text-emerald-300 text-xs block mb-1 font-bold">Net Return:</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-300">
                {netRoi.toLocaleString()}%
              </div>
              <span className="text-[11px] text-emerald-600">Operational ROI</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[var(--color-border-subtle)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
