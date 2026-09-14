"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { KpiBento } from "@/components/KpiBento";
import { DocumentReferenceCockpit } from "@/components/DocumentReferenceCockpit";
import { DocumentManagerModal } from "@/components/DocumentManagerModal";
import { RbacMatrixModal } from "@/components/RbacMatrixModal";
import { DeterministicReportModal } from "@/components/DeterministicReportModal";
import { ExecutionLogDrawer } from "@/components/ExecutionLogDrawer";
import { BlueprintExporterModal, RoiCostCalculatorModal } from "@/components/The4Weapons";
import { Footer } from "@/components/Footer";
import { SAMPLE_DOCUMENTS, INITIAL_AUDIT_LOGS, AuditLogEntry } from "@/data/documents";
import { CitationRef } from "@/lib/ai";

export default function Home() {
  const [currentRole, setCurrentRole] = useState<"ADMIN" | "COMPLIANCE_AUDITOR" | "LEGAL_REVIEWER" | "READ_ONLY_VIEWER">("LEGAL_REVIEWER");
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS);
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number>(58);

  // Modals state
  const [isRbacModalOpen, setIsRbacModalOpen] = useState<boolean>(false);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState<boolean>(false);
  const [isBlueprintsOpen, setIsBlueprintsOpen] = useState<boolean>(false);
  const [isRoiOpen, setIsRoiOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Deterministic Report Modal State
  const [reportModalData, setReportModalData] = useState<{
    isOpen: boolean;
    query: string;
    answer: string;
    citations: CitationRef[];
  }>({
    isOpen: false,
    query: "",
    answer: "",
    citations: [],
  });

  // Calculate totals
  const totalDocs = documents.length;
  const totalChunks = documents.reduce((acc, doc) => acc + doc.chunks.length, 0) + 1420;

  const handleRoleChange = (role: "ADMIN" | "COMPLIANCE_AUDITOR" | "LEGAL_REVIEWER" | "READ_ONLY_VIEWER") => {
    setCurrentRole(role);
    handleLogEvent(
      "SEARCH_QUERY",
      `Session access role updated to: ${role}. Gated permissions re-evaluated by API gateway.`,
      "AUTH_GATEWAY",
      "SUCCESS"
    );
  };

  const handleConsumeToken = (): boolean => {
    if (rateLimitRemaining <= 0) return false;
    setRateLimitRemaining((prev) => Math.max(0, prev - 1));
    return true;
  };

  const handleLogEvent = (
    action: AuditLogEntry["action"],
    details: string,
    targetDoc: string,
    status: AuditLogEntry["status"]
  ) => {
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userRole: currentRole,
      action,
      details,
      targetDoc,
      ipAddress: "198.51.100.42 (US-East)",
      status,
      sha256Hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleDocumentAdded = (newDoc: any) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleOpenReportModal = (query: string, answer: string, citations: CitationRef[]) => {
    setReportModalData({
      isOpen: true,
      query,
      answer,
      citations,
    });
    handleLogEvent(
      "REPORT_GENERATED",
      `Deterministic compliance report compiled and cryptographically sealed for query: "${query.slice(0, 40)}..."`,
      citations[0]?.docCode || "DOCS",
      "SUCCESS"
    );
  };

  // Keyboard shortcut listener for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* Top Application Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onOpenRbacModal={() => setIsRbacModalOpen(true)}
        onOpenIngestModal={() => setIsIngestModalOpen(true)}
        onOpenBlueprints={() => setIsBlueprintsOpen(true)}
        onOpenRoi={() => setIsRoiOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        rateLimitRemaining={rateLimitRemaining}
      />

      {/* Main Workspace Cockpit Container */}
      <main className="flex-1 w-full px-0 py-6 sm:py-8 space-y-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Pillar 1: Visual Interactive Workflow Pipeline Canvas */}
          <WorkflowCanvas />

          {/* Pillar 2: High-Density Bento KPIs */}
          <KpiBento
            totalDocs={totalDocs}
            totalChunks={totalChunks}
            avgLatency={285}
            activeRole={currentRole}
          />

          {/* Pillar 3 & 4: Interactive Document Reference & Search Cockpit */}
          <DocumentReferenceCockpit
            currentRole={currentRole}
            onGenerateReport={handleOpenReportModal}
            onLogEvent={handleLogEvent}
            onConsumeToken={handleConsumeToken}
          />
        </div>
      </main>

      {/* Footer with Architecture Cards & Engineering Attribution */}
      <Footer />

      {/* Modals & Overlays */}
      <DocumentManagerModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onDocumentAdded={handleDocumentAdded}
        onLogEvent={handleLogEvent}
      />

      <RbacMatrixModal
        isOpen={isRbacModalOpen}
        onClose={() => setIsRbacModalOpen(false)}
        currentRole={currentRole}
      />

      <DeterministicReportModal
        isOpen={reportModalData.isOpen}
        onClose={() => setReportModalData((prev) => ({ ...prev, isOpen: false }))}
        query={reportModalData.query}
        answer={reportModalData.answer}
        citations={reportModalData.citations}
        currentRole={currentRole}
      />

      <BlueprintExporterModal
        isOpen={isBlueprintsOpen}
        onClose={() => setIsBlueprintsOpen(false)}
      />

      <RoiCostCalculatorModal
        isOpen={isRoiOpen}
        onClose={() => setIsRoiOpen(false)}
      />

      <ExecutionLogDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        logs={logs}
      />
    </div>
  );
}
