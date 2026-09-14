"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileCheck, CheckCircle2, RotateCw, Layers } from "lucide-react";

interface DocumentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (doc: any) => void;
  onLogEvent: (action: any, details: string, targetDoc: string, status: any) => void;
}

export const DocumentManagerModal: React.FC<DocumentManagerModalProps> = ({
  isOpen,
  onClose,
  onDocumentAdded,
  onLogEvent,
}) => {
  const [title, setTitle] = useState<string>("Exhibit D - Vendor SLA & Disaster Recovery Standard");
  const [category, setCategory] = useState<string>("Legal & MSA");
  const [collection, setCollection] = useState<string>("Enterprise MSAs");
  const [content, setContent] = useState<string>(
`Section 3.1 Availability SLA Guarantee.
Provider guarantees a monthly service uptime of not less than 99.99% across all production API and document reference endpoints. In the event uptime falls below 99.9%, Customer shall receive an automatic service fee credit of 25% of the monthly billing cycle.

Section 3.2 Disaster Recovery RPO and RTO.
In the event of a catastrophic regional datacenter failure, Provider shall execute automated DNS failover to the secondary standby region within fifteen (15) minutes (Recovery Time Objective - RTO) with zero data loss for all verified document commits (Recovery Point Objective - RPO = 0 seconds).

Section 4.1 Cryptographic Audit Log Export.
Customer compliance officers may trigger asynchronous exports of all query access logs formatted as signed JSON-LD packages hashed via SHA-256.`
  );
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [ingestSuccess, setIngestSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleIngest = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsIngesting(true);

    try {
      const response = await fetch("/api/ai/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          category,
          collection
        })
      });

      const data = await response.json();
      if (response.ok) {
        setIngestSuccess(true);
        onDocumentAdded(data.document);
        onLogEvent(
          "DOCUMENT_INGEST",
          `Uploaded & OCR-indexed: '${title}'. Chunks: ${data.chunksIndexed}. Hash: ${data.sha256Hash?.slice(0, 16)}...`,
          title,
          "SUCCESS"
        );
        setTimeout(() => {
          setIsIngesting(false);
          setIngestSuccess(false);
          onClose();
        }, 1200);
      } else {
        alert(`Ingest failed: ${data.error}`);
        setIsIngesting(false);
      }
    } catch (err: any) {
      alert(`Error during ingestion: ${err.message}`);
      setIsIngesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Document Ingestion & OCR Scanner Pipeline
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Test With Your Own Document • Auto-Chunking, Bounding Box OCR & 1536d Embeddings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="space-y-3.5 py-4 text-xs">
          <div>
            <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
              Document Title / Reference Code:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-hidden cursor-pointer"
              >
                <option value="Legal & MSA">Legal & MSA</option>
                <option value="Regulatory Compliance">Regulatory Compliance</option>
                <option value="Security & Architecture">Security & Architecture</option>
                <option value="Engineering Spec">Engineering Spec</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                Target Collection:
              </label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-hidden cursor-pointer"
              >
                <option value="Enterprise MSAs">Enterprise MSAs</option>
                <option value="EHS Protocols">EHS Protocols</option>
                <option value="Healthcare BAA">Healthcare BAA</option>
                <option value="Defense & Federal">Defense & Federal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
              Document Text / OCR Content (Paste clauses or agreement text):
            </label>
            <textarea
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 text-xs font-mono text-[var(--color-text-primary)] leading-relaxed focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* Pipeline Notice */}
          <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1">
            <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
              Automated Ingestion Pipeline Steps:
            </div>
            <p>
              1. Tesseract / Vision OCR text normalization & bounding box coordinate assignment.
              <br />
              2. Semantic chunking (512-token sliding window with 64-token overlap).
              <br />
              3. 1536-dimensional pgvector dense embeddings + GIN sparse lexical index insertion.
              <br />
              4. Cryptographic SHA-256 chunk hash seal registered in immutable audit ledger.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--color-border-subtle)]">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] text-xs font-medium text-[var(--color-text-secondary)] transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleIngest}
            disabled={isIngesting || ingestSuccess}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {ingestSuccess ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Ingestion Complete!</span>
              </>
            ) : isIngesting ? (
              <>
                <RotateCw className="h-3.5 w-3.5 animate-spin" />
                <span>Processing OCR & Vectors...</span>
              </>
            ) : (
              <>
                <FileCheck className="h-3.5 w-3.5" />
                <span>Run Ingest Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
