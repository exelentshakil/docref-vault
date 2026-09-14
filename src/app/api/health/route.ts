import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 5);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5);
  const hasSupabase = Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    system: "Full-Stack Document Reference & RAG Verification Cockpit",
    version: "1.0.0-enterprise",
    activeWorkspace: "Apex Compliance & Legal • Mechanicsburg Ops",
    telemetry: {
      openai: {
        active: hasOpenAI,
        model: "gpt-4o-mini",
        role: "Primary Inference & Structured Citation Extractor"
      },
      gemini: {
        active: hasGemini,
        model: "gemini-2.0-flash",
        role: "Sub-Second Failover & Multimodal OCR Verification"
      },
      deterministicEngine: {
        active: true,
        hashAlgorithm: "SHA-256",
        role: "Zero-Latency Regulatory Fallback & Audit Reproducibility"
      },
      postgresPgVector: {
        active: hasSupabase,
        indexes: "HNSW (1536d Cosine) + GIN (BM25 English)",
        reranker: "Cross-Encoder (Cohere/BGE Top-10 Rescore)"
      },
      antiAbuseShield: {
        active: true,
        tokenBucketLimit: "60 req/min per tenant",
        canaryDetection: "Active"
      }
    }
  });
}
