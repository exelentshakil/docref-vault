"use client";

import React, { useState } from "react";
import { Terminal, X, ChevronDown, ChevronUp, Copy, Check, Filter, ShieldCheck, AlertCircle } from "lucide-react";
import { AuditLogEntry } from "@/data/documents";

interface ExecutionLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLogEntry[];
}

export const ExecutionLogDrawer: React.FC<ExecutionLogDrawerProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    if (filter === "ALL") return true;
    if (filter === "BLOCKED") return log.status === "BLOCKED";
    if (filter === "SUCCESS") return log.status === "SUCCESS";
    return true;
  });

  const handleCopyCurl = (idx: number) => {
    const curl = `curl -X POST https://docref-vault.vercel.app/api/ai/query \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <USER_SESSION_TOKEN>" \\
  -d '{"query": "What is the liability cap under section 8.1?", "collection": "Enterprise MSAs", "useReranker": true}'`;
    navigator.clipboard.writeText(curl);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-panel)] border-t border-[var(--color-border)] shadow-2xl transition-all max-h-[480px] flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-panel-subtle)] border-b border-[var(--color-border)] text-xs font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-indigo-500" />
          <span className="font-bold text-[var(--color-text-primary)]">
            Live Enterprise Telemetry & Immutable WORM Audit Stream
          </span>
          <span className="text-xs text-[var(--color-text-muted)] hidden sm:inline">
            ({logs.length} logged events • Real-Time Ingestion & Retrieval Telemetry)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)] text-xs">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded px-2 py-0.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
            >
              <option value="ALL">All Events</option>
              <option value="SUCCESS">Success Only</option>
              <option value="BLOCKED">Security Blocks</option>
            </select>
          </div>

          <button
            onClick={() => handleCopyCurl(-1)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-panel)] hover:bg-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]"
            title="Copy reproducible cURL query command"
          >
            {copiedIndex === -1 ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            <span>Copy cURL</span>
          </button>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal log entries */}
      <div className="p-4 overflow-y-auto font-mono text-xs space-y-2 flex-1 bg-slate-950 text-slate-200">
        {filteredLogs.map((log, idx) => (
          <div
            key={log.id}
            className={`p-2.5 rounded border text-xs leading-relaxed ${
              log.status === "BLOCKED"
                ? "bg-rose-950/40 border-rose-800 text-rose-200"
                : "bg-slate-900/60 border-slate-800 text-slate-300"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">[{log.timestamp.split("T")[1]?.slice(0, 8)}]</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                    log.status === "BLOCKED"
                      ? "bg-rose-800 text-rose-100"
                      : "bg-indigo-900 text-indigo-200"
                  }`}
                >
                  {log.action}
                </span>
                <span className="text-emerald-400 font-semibold">{log.userRole}</span>
                <span className="text-slate-400 truncate max-w-[200px]">({log.targetDoc})</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>IP: {log.ipAddress}</span>
                <span className="truncate max-w-[120px]">Hash: {log.sha256Hash?.slice(0, 10)}...</span>
              </div>
            </div>

            <div className="text-slate-200 pl-2 border-l-2 border-slate-700">
              {log.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
