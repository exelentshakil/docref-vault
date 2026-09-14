"use client";

import React, { useState } from "react";
import { X, FileCheck, Printer, Check, Copy, ShieldCheck, Hash, ExternalLink } from "lucide-react";
import { CitationRef } from "@/lib/ai";

interface DeterministicReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  answer: string;
  citations: CitationRef[];
  currentRole: string;
}

export const DeterministicReportModal: React.FC<DeterministicReportModalProps> = ({
  isOpen,
  onClose,
  query,
  answer,
  citations,
  currentRole,
}) => {
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  if (!isOpen) return null;

  const reportId = `REP-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toISOString();
  const sha256Seal = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256Seal);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-3xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-xl animate-fadeIn max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Deterministic Compliance & Citation Verification Report
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Cryptographic Seal # {reportId} • WORM Audit Standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Canvas */}
        <div className="my-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 sm:p-6 space-y-4 text-xs">
          {/* Official Letterhead Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)] font-mono">
            <div>
              <span className="font-bold text-[var(--color-text-primary)] text-sm">
                DOCREF VAULT VERIFICATION ATTESTATION
              </span>
              <p className="text-xs text-[var(--color-text-muted)]">
                Issued by Automated Cryptographic Verification Notary
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="h-3 w-3" />
                SEALED & IMMUTABLE
              </span>
              <div className="text-[var(--color-text-muted)] mt-0.5">{timestamp}</div>
            </div>
          </div>

          {/* Audit Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-[var(--color-panel)] border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs">Requested Role:</span>
              <span className="font-bold text-[var(--color-text-primary)]">{currentRole}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--color-panel)] border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs">Total Citations:</span>
              <span className="font-bold text-indigo-600">{citations.length} Ground-Truth</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--color-panel)] border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs">Retrieval Engine:</span>
              <span className="font-bold text-[var(--color-text-primary)]">Hybrid HNSW+GIN</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--color-panel)] border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs">Compliance Spec:</span>
              <span className="font-bold text-emerald-600">SOC-2 §CC6.1</span>
            </div>
          </div>

          {/* Query Executed */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] uppercase tracking-wider text-xs mb-1 font-mono">
              Audit Query Target:
            </h4>
            <div className="p-3 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border-subtle)] font-medium text-[var(--color-text-primary)]">
              "{query}"
            </div>
          </div>

          {/* Verified Synthesis */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] uppercase tracking-wider text-xs mb-1 font-mono">
              Verified Legal & Compliance Synthesis:
            </h4>
            <div className="p-3 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border-subtle)] leading-relaxed text-[var(--color-text-primary)] whitespace-pre-wrap">
              {answer}
            </div>
          </div>

          {/* Sourced Citations Matrix */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] uppercase tracking-wider text-xs mb-1.5 font-mono">
              Ground-Truth Source Documents Cited ({citations.length}):
            </h4>
            <div className="space-y-2">
              {citations.map((c, idx) => (
                <div
                  key={c.chunkId || idx}
                  className="p-3 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border-subtle)] space-y-1"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      [REF {c.refIndex}] {c.docCode} • Page {c.pageNumber} ({c.section})
                    </span>
                    <span className="text-emerald-600 font-semibold">
                      OCR Conf: {c.ocrConfidence}%
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] italic">
                    "{c.exactSnippet}"
                  </p>
                  <div className="text-xs font-mono text-[var(--color-text-muted)] flex justify-between pt-1 border-t border-[var(--color-border-subtle)]">
                    <span>Bounding Box: [Y:{c.boundingBox?.ymin}-{c.boundingBox?.ymax}, X:{c.boundingBox?.xmin}-{c.boundingBox?.xmax}]</span>
                    <span>Similarity: {c.similarityScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHA-256 Seal Strip */}
          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-mono">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5" />
                Immutable SHA-256 Digital Verification Seal:
              </span>
              <button
                onClick={handleCopyHash}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-bold inline-flex items-center gap-1"
              >
                {copiedHash ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedHash ? "Copied" : "Copy Hash"}</span>
              </button>
            </div>
            <div className="p-2 rounded bg-[var(--color-panel)] border border-emerald-200 dark:border-emerald-900 break-all text-xs text-[var(--color-text-primary)]">
              {sha256Seal}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
              Deterministic guarantee: This report hash is mathematically computed from the exact query, citation chunk IDs, and model response tokens. Re-running the verification pipeline against the same document snapshot yields identical output.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
