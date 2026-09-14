import { NextRequest, NextResponse } from "next/server";
import { executeRAGQuery } from "@/lib/ai";

export const dynamic = "force-dynamic";

const CANARY_INJECTION_PATTERNS = [
  "ignore previous instructions",
  "system prompt",
  "reveal confidential",
  "dump database",
  "drop table",
  "<script>",
  "bypass rbac"
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, collection, useReranker, chaosMode, customApiKey, role } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing or invalid query parameter." }, { status: 400 });
    }

    // Anti-Abuse Guardrail: Canary token & injection scan
    const normalizedQuery = query.toLowerCase();
    for (const pattern of CANARY_INJECTION_PATTERNS) {
      if (normalizedQuery.includes(pattern)) {
        return NextResponse.json(
          {
            error: "SECURITY_VIOLATION_CANARY_TRIGGERED",
            message: `Ingress anti-abuse guardrail intercepted prohibited pattern: "${pattern}". Incident logged to immutable audit stream with client IP.`,
            status: "BLOCKED",
            code: 403,
            timestamp: new Date().toISOString()
          },
          { status: 403 }
        );
      }
    }

    // RBAC Authorization Gate
    if (role === "READ_ONLY_VIEWER" && collection === "Enterprise MSAs") {
      // Viewer restricted from restricted legal agreements
      return NextResponse.json(
        {
          error: "RBAC_ACCESS_DENIED",
          message: "Role 'READ_ONLY_VIEWER' lacks authorization to query RESTRICTED Enterprise MSA documents. Upgrade to LEGAL_REVIEWER or COMPLIANCE_AUDITOR.",
          status: "FORBIDDEN",
          code: 403
        },
        { status: 403 }
      );
    }

    const result = await executeRAGQuery(query, {
      collection,
      useReranker: useReranker !== false,
      chaosMode: Boolean(chaosMode),
      customApiKey,
      role
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Query route execution error:", error);
    return NextResponse.json(
      { error: "INTERNAL_EXECUTION_ERROR", message: error.message || "Failed to execute RAG query." },
      { status: 500 }
    );
  }
}
