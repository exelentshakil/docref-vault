"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck,
  Moon,
  Sun,
  Lock,
  FileCheck2,
  SlidersHorizontal,
  Terminal,
  Zap,
  KeyRound,
  DownloadCloud
} from "lucide-react";

interface HeaderProps {
  currentRole: "ADMIN" | "COMPLIANCE_AUDITOR" | "LEGAL_REVIEWER" | "READ_ONLY_VIEWER";
  onRoleChange: (role: "ADMIN" | "COMPLIANCE_AUDITOR" | "LEGAL_REVIEWER" | "READ_ONLY_VIEWER") => void;
  onOpenRbacModal: () => void;
  onOpenIngestModal: () => void;
  onOpenBlueprints: () => void;
  onOpenRoi: () => void;
  onToggleTerminal: () => void;
  rateLimitRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenRbacModal,
  onOpenIngestModal,
  onOpenBlueprints,
  onOpenRoi,
  onToggleTerminal,
  rateLimitRemaining,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b border-[var(--color-border)] bg-[var(--color-panel)] px-0 py-3.5 sticky top-0 z-30 shadow-xs backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Workspace Title & Brand Identity */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-[var(--color-text-primary)] tracking-tight">
                  DocRef Vault
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 whitespace-nowrap shrink-0">
                  <ShieldCheck className="h-3 w-3" />
                  RAG & Citation Cockpit
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  WORM Immutable
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate font-mono">
                Apex Compliance & Legal Systems • Mechanicsburg Ops (Node #US-EAST-4)
              </p>
            </div>
          </div>

          {/* Action Center: Role Switcher, Blueprints, ROI, Terminal, Theme */}
          <div className="flex items-center gap-2 flex-wrap shrink-0 justify-end">
            {/* Anti-Abuse Token Bucket Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-mono whitespace-nowrap shrink-0" title="Token Bucket Rate Limiter">
              <Zap className="h-3 w-3 text-amber-500" />
              <span>Bucket: </span>
              <span className="font-semibold text-[var(--color-text-primary)]">{rateLimitRemaining}/60 req/m</span>
            </div>

            {/* RBAC Role Selector */}
            <div className="flex items-center gap-1.5 bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-lg p-1 text-xs">
              <span className="text-xs text-[var(--color-text-muted)] font-medium pl-1.5 hidden sm:inline">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-[var(--color-text-primary)] focus:outline-hidden cursor-pointer pr-2 py-0.5"
                title="Simulate RBAC User Access Level"
              >
                <option value="ADMIN">Admin (Full Control)</option>
                <option value="COMPLIANCE_AUDITOR">Compliance Auditor</option>
                <option value="LEGAL_REVIEWER">Legal Reviewer</option>
                <option value="READ_ONLY_VIEWER">Read-Only Viewer</option>
              </select>
              <button
                onClick={onOpenRbacModal}
                className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors shrink-0"
                title="View RBAC Authorization Matrix"
              >
                <Lock className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Ingest Document Button */}
            <button
              onClick={onOpenIngestModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>+ Ingest OCR Doc</span>
            </button>

            {/* Blueprints Exporter Modal Trigger */}
            <button
              onClick={onOpenBlueprints}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] transition-colors whitespace-nowrap shrink-0"
              title="Download Production Blueprints (pgvector, Inngest, Docker)"
            >
              <DownloadCloud className="h-3.5 w-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Blueprints</span>
            </button>

            {/* ROI Cost Calculator Modal Trigger */}
            <button
              onClick={onOpenRoi}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] transition-colors whitespace-nowrap shrink-0"
              title="Operational ROI & Token Burn Calculator"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-500" />
              <span className="hidden md:inline">ROI Engine</span>
            </button>

            {/* Live Terminal Telemetry Drawer Toggle */}
            <button
              onClick={onToggleTerminal}
              className="p-1.5 rounded-lg bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors shrink-0"
              title="Toggle Live Event & Webhook Telemetry Drawer"
            >
              <Terminal className="h-4 w-4" />
            </button>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors shrink-0"
                title="Toggle Theme Mode"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
