"use client";

import React from "react";
import {
  FileText,
  Clock,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Database
} from "lucide-react";

interface KpiBentoProps {
  totalDocs: number;
  totalChunks: number;
  avgLatency: number;
  activeRole: string;
}

export const KpiBento: React.FC<KpiBentoProps> = ({
  totalDocs,
  totalChunks,
  avgLatency,
  activeRole,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* KPI 1: Indexed Document Chunks */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider mb-2">
          <span>Indexed Chunks</span>
          <Database className="h-4 w-4 text-indigo-500" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
            {totalChunks.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-muted)] font-mono truncate">
            Across {totalDocs} enterprise repositories
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" />
            100% OCR Parsed
          </span>
          <span className="text-[var(--color-text-muted)] font-mono">pgvector HNSW</span>
        </div>
      </div>

      {/* KPI 2: P95 Retrieval Latency */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider mb-2">
          <span>Retrieval Latency</span>
          <Clock className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
            {avgLatency}ms
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-muted)] font-mono truncate">
            Hybrid search + Cohere re-ranking
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Sub-second P95
          </span>
          <span className="text-[var(--color-text-muted)] font-mono">BM25 + 1536d</span>
        </div>
      </div>

      {/* KPI 3: Ground-Truth Citation Rate */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider mb-2">
          <span>Citation Accuracy</span>
          <FileText className="h-4 w-4 text-indigo-500" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-indigo-600 dark:text-indigo-400">
            100%
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-muted)] font-mono truncate">
            Deterministic bounding-box mapping
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Zero Hallucination
          </span>
          <span className="text-[var(--color-text-muted)] font-mono">Page-Level Proof</span>
        </div>
      </div>

      {/* KPI 4: Security & Anti-Abuse Shield */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider mb-2">
          <span>Security & RBAC</span>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
            ACTIVE
          </div>
          <p className="mt-1 text-xs text-[var(--color-text-muted)] font-mono truncate">
            Current Role: {activeRole}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            WORM Cryptographic
          </span>
          <span className="text-[var(--color-text-muted)] font-mono">SHA-256 Sealed</span>
        </div>
      </div>
    </div>
  );
};
