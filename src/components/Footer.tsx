"use client";

import React from "react";
import {
  ShieldCheck,
  Cpu,
  Layers,
  FileCheck2,
  Lock,
  GitBranch,
  Terminal,
  Database
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-panel)] px-0 py-8 mt-12 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section 1: 4 Architecture Decision Cards */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Enterprise System Design & Architectural Guardrails
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Hybrid Search */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--color-text-primary)]">
                  Hybrid Search + Reranker
                </span>
                <Layers className="h-4 w-4 text-indigo-500" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                Combines dense pgvector cosine embeddings (1536d) with sparse BM25 full-text search. Cohere / BGE cross-encoder rescores top candidates to guarantee sub-clause precision.
              </p>
            </div>

            {/* Card 2: Deterministic Reports */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--color-text-primary)]">
                  Deterministic SHA-256
                </span>
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                Cryptographic integrity hashing seals query strings, cited chunk IDs, and model responses into immutable audit attestations suitable for SOC-2 Type II and regulatory audits.
              </p>
            </div>

            {/* Card 3: RBAC Authorization */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--color-text-primary)]">
                  Granular RBAC Matrix
                </span>
                <Lock className="h-4 w-4 text-indigo-500" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                Server-side role verification (Admin, Auditor, Reviewer, Viewer) restricts sensitive MSAs, masks unredacted PII, and gates report sealing to authorized personnel.
              </p>
            </div>

            {/* Card 4: Anti-Abuse & Canary */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--color-text-primary)]">
                  Anti-Abuse Token Bucket
                </span>
                <FileCheck2 className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                Protects ingestion pipelines via 60 req/min token bucket throttling, canary prompt injection sanitization, and automatic IP quarantine logged to WORM storage.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Specifications Strip */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] font-mono text-xs flex flex-wrap items-center justify-between gap-4 text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-indigo-500" />
            <span>Postgres 16 + pgvector HNSW (Cosine m=16, ef=64)</span>
          </div>
          <div>OCR: Tesseract 5.3 + Vision Bounding Coordinates</div>
          <div>Inference: Dual-Provider (GPT-4o-mini + Gemini 2.0 Flash)</div>
          <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Status: Production Ready • AES-256
          </div>
        </div>

        {/* Section 3: Copyright & Agency Attribution */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] font-mono">
          <div>
            DocRef Vault Enterprise Systems Engineering • Ref #BS-2026-DOCREF
          </div>
          <div>
            Engineered by <span className="font-semibold text-[var(--color-text-primary)]">Shakil Ahmed</span> • BarakahSoft LLC
          </div>
        </div>
      </div>
    </footer>
  );
};
