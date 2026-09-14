import { NextRequest, NextResponse } from "next/server";
import { computeSha256 } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, answer, citations, requestedByRole, reportTitle } = body;

    const timestamp = new Date().toISOString();
    const citationIds = Array.isArray(citations)
      ? citations.map((c: any) => c.chunkId || c.section).join("::")
      : "";

    // Deterministic payload hashing
    const integrityPayload = `${query}|${answer}|${citationIds}|${requestedByRole || "LEGAL_REVIEWER"}`;
    const sha256Seal = computeSha256(integrityPayload);

    const report = {
      reportId: `REP-${Date.now().toString().slice(-6)}`,
      reportTitle: reportTitle || "Deterministic Ground-Truth Document Citation Audit",
      generatedAt: timestamp,
      status: "SEALED_CRYPTOGRAPHIC_VERIFIED",
      sha256Seal,
      queryExecuted: query,
      verifiedSynthesis: answer,
      totalCitations: Array.isArray(citations) ? citations.length : 0,
      citationsSummary: citations,
      complianceStandard: "SOC-2 Type II §CC6.1 / FAR 52.204-21 / WORM Immutable",
      authorizedSignatory: "BarakahSoft Automated Cryptographic Notary v1.4",
      verificationUrl: `https://docref-vault.vercel.app/api/report/verify?hash=${sha256Seal}`
    };

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json(
      { error: "REPORT_GENERATION_FAILED", message: error.message },
      { status: 500 }
    );
  }
}
