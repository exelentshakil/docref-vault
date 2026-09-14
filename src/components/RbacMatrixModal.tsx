"use client";

import React from "react";
import { X, ShieldCheck, Check, Ban, Lock, Info } from "lucide-react";

interface RbacMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: string;
}

export const RbacMatrixModal: React.FC<RbacMatrixModalProps> = ({
  isOpen,
  onClose,
  currentRole,
}) => {
  if (!isOpen) return null;

  const permissions = [
    {
      action: "Execute Hybrid RAG Search",
      desc: "Run BM25 + Dense Vector retrieval across authorized collections",
      admin: true,
      auditor: true,
      reviewer: true,
      viewer: true,
    },
    {
      action: "Cross-Encoder Re-Ranking",
      desc: "Trigger deep cross-attention rescoring over top candidate chunks",
      admin: true,
      auditor: true,
      reviewer: true,
      viewer: false,
    },
    {
      action: "Access RESTRICTED MSAs & Legal",
      desc: "Query and cite sensitive Master Services Agreements and super-caps",
      admin: true,
      auditor: true,
      reviewer: true,
      viewer: false,
    },
    {
      action: "View Raw OCR Bounding Coordinates",
      desc: "Inspect pixel coordinates [ymin, xmin, ymax, xmax] and token confidences",
      admin: true,
      auditor: true,
      reviewer: true,
      viewer: true,
    },
    {
      action: "Generate Deterministic Sealed Reports",
      desc: "Issue cryptographically signed SHA-256 compliance verification reports",
      admin: true,
      auditor: true,
      reviewer: true,
      viewer: false,
    },
    {
      action: "Document Ingestion & OCR Upload",
      desc: "Upload external contracts, execute chunking and pgvector embeddings",
      admin: true,
      auditor: false,
      reviewer: false,
      viewer: false,
    },
    {
      action: "Inspect Raw WORM Audit Stream",
      desc: "View user IP addresses, query vectors, and security incident alerts",
      admin: true,
      auditor: true,
      reviewer: false,
      viewer: false,
    },
    {
      action: "Manage Rate Limit & Canary Tokens",
      desc: "Configure anti-abuse thresholds and prompt injection trap signatures",
      admin: true,
      auditor: false,
      reviewer: false,
      viewer: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-4xl rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-xl animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Role-Based Access Control (RBAC) Authorization Matrix
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Granular Permission Scoping across Document Classes, Pipelines & Audit Operations
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

        {/* Current Role Banner */}
        <div className="my-4 p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              Your Current Active Session Role:{" "}
              <strong className="text-indigo-700 dark:text-indigo-300 font-mono">
                {currentRole}
              </strong>
            </span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
            Governed by SOC-2 §CC6.1
          </span>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="table-fixed w-full min-w-[700px] text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider">
                <th className="w-[40%] py-2 px-3">System Action & Capability</th>
                <th className="w-[15%] py-2 px-3 text-center">Admin</th>
                <th className="w-[15%] py-2 px-3 text-center">Auditor</th>
                <th className="w-[15%] py-2 px-3 text-center">Reviewer</th>
                <th className="w-[15%] py-2 px-3 text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-panel-subtle)] transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      {p.action}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] leading-tight">
                      {p.desc}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {p.admin ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Ban className="h-3 w-3" />
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {p.auditor ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Ban className="h-3 w-3" />
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {p.reviewer ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Ban className="h-3 w-3" />
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {p.viewer ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Ban className="h-3 w-3" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Security Design Notes */}
        <div className="mt-4 p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] flex items-start gap-2">
          <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Security Design Note:</strong> Permissions are evaluated server-side at the API gateway layer. Even if a client bypasses the frontend role selector, API routes validate session claims and reject unauthorized vector retrievals with HTTP 403 Forbidden.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 mt-4 border-t border-[var(--color-border-subtle)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Close Authorization Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
