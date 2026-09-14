"use client";

import React, { useState } from "react";
import {
  FileScan,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Search
} from "lucide-react";

interface NodeState {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
  status: "ARMED" | "RUNNING" | "SUCCESS";
  latency: string;
  metric: string;
  spec: string;
}

export const WorkflowCanvas: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const nodes: NodeState[] = [
    {
      id: 1,
      title: "OCR & Document Ingest",
      subtitle: "Tesseract & Vision Parser",
      icon: FileScan,
      status: activeStep === 0 ? "ARMED" : activeStep >= 1 ? "SUCCESS" : "ARMED",
      latency: "118ms",
      metric: "99.4% OCR Conf",
      spec: "Extracts text, page numbers & bounding boxes [ymin, xmin, ymax, xmax]"
    },
    {
      id: 2,
      title: "Chunking & Hashing",
      subtitle: "Token Norm & SHA-256",
      icon: Database,
      status: activeStep <= 1 ? "ARMED" : activeStep >= 2 ? "SUCCESS" : "RUNNING",
      latency: "42ms",
      metric: "512 Token Chunks",
      spec: "Sliding window overlap (64t), metadata extraction, PII scrubber"
    },
    {
      id: 3,
      title: "Hybrid Search Core",
      subtitle: "Dense Vector + BM25",
      icon: Search,
      status: activeStep <= 2 ? "ARMED" : activeStep >= 3 ? "SUCCESS" : "RUNNING",
      latency: "68ms",
      metric: "HNSW 1536d + GIN",
      spec: "Postgres pgvector cosine distance + Sparse lexical keyword matching"
    },
    {
      id: 4,
      title: "Cross-Encoder Re-Rank",
      subtitle: "Deep Attention Rescore",
      icon: Sparkles,
      status: activeStep <= 3 ? "ARMED" : activeStep >= 4 ? "SUCCESS" : "RUNNING",
      latency: "94ms",
      metric: "Top-10 Candidates",
      spec: "Cross-attention scoring re-orders top results, eliminating semantic drift"
    },
    {
      id: 5,
      title: "Citation & Audit Seal",
      subtitle: "WORM Cryptographic Log",
      icon: ShieldCheck,
      status: activeStep === 5 ? "SUCCESS" : activeStep === 4 ? "RUNNING" : "ARMED",
      latency: "32ms",
      metric: "SHA-256 Verified",
      spec: "Ground-truth split screen citation linking & immutable audit dispatch"
    }
  ];

  const handleSimulate = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);

    const timeouts = [
      setTimeout(() => setActiveStep(2), 600),
      setTimeout(() => setActiveStep(3), 1200),
      setTimeout(() => setActiveStep(4), 1800),
      setTimeout(() => {
        setActiveStep(5);
        setIsRunning(false);
      }, 2500),
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(0);
    setSelectedNode(null);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 sm:p-5 shadow-xs">
      {/* Header bar of Canvas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            End-to-End RAG & Citation Pipeline Architecture
          </span>
          <span className="text-xs text-[var(--color-text-muted)] font-mono hidden md:inline">
            [Inngest Event-Driven Orchestration]
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSimulate}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            {isRunning ? (
              <>
                <Clock className="h-3 w-3 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-white" />
                <span>Simulate Flow</span>
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] text-xs transition-colors shrink-0"
            title="Reset simulation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Node Flow Grid */}
      <div className="relative mt-4">
        {/* SVG Pulse Connectors (Visible on desktop) */}
        <div className="hidden lg:block absolute top-12 left-8 right-8 h-2 -z-0 pointer-events-none">
          <svg className="w-full h-4 overflow-visible">
            <line
              x1="5%"
              y1="4"
              x2="95%"
              y2="4"
              stroke="var(--color-border)"
              strokeWidth="2"
            />
            <line
              x1="5%"
              y1="4"
              x2="95%"
              y2="4"
              stroke="#6366f1"
              strokeWidth="2"
              className={isRunning ? "conduit-pulse-fast" : "conduit-pulse"}
              opacity="0.8"
            />
          </svg>
        </div>

        {/* 5 Process Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isCurrentActive = isRunning && activeStep === node.id;
            const isCompleted = activeStep >= node.id;
            const isSelected = selectedNode === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                className={`flex flex-col justify-between rounded-xl border p-3.5 cursor-pointer transition-all duration-200 bg-[var(--color-panel)] ${
                  isSelected
                    ? "ring-2 ring-indigo-500 border-indigo-500 shadow-md"
                    : isCurrentActive
                    ? "border-indigo-500 ring-2 ring-indigo-500/30 shadow-sm"
                    : isCompleted
                    ? "border-emerald-300 dark:border-emerald-800"
                    : "border-[var(--color-border)] hover:border-indigo-300 dark:hover:border-indigo-800"
                }`}
              >
                <div>
                  {/* Top row: Stage ID & Status Pill */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-mono font-bold text-[var(--color-text-muted)]">
                      0{node.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          : isCurrentActive
                          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 animate-pulse"
                          : "bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          <span>SYNCED</span>
                        </>
                      ) : isCurrentActive ? (
                        <>
                          <Clock className="h-2.5 w-2.5 animate-spin" />
                          <span>ACTIVE</span>
                        </>
                      ) : (
                        <span>ARMED</span>
                      )}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                          : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                      {node.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] truncate">
                    {node.subtitle}
                  </p>
                </div>

                {/* Bottom Metric & Latency */}
                <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-text-muted)]">{node.latency}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {node.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="mt-3 p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-indigo-200 dark:border-indigo-900/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-700 dark:text-indigo-300">
                Node {selectedNode}: {nodes[selectedNode - 1].title}
              </span>
              <span className="text-[var(--color-text-secondary)]">
                {nodes[selectedNode - 1].spec}
              </span>
            </div>
            <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">
              Benchmark Latency: {nodes[selectedNode - 1].latency}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
