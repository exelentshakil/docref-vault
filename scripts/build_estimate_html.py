import os
import base64
import subprocess
import re

docs_dir = os.path.expanduser("~/Apps/claude-code/docref-vault/docs")
html_path = os.path.join(docs_dir, "estimate.html")
pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

with open(os.path.join(docs_dir, "headshot.jpeg"), "rb") as f:
    headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

with open(os.path.join(docs_dir, "logo.png"), "rb") as f:
    logo_b64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope & Formal Estimate - Full-Stack Document Reference System</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 5.5mm 8mm 5.5mm 8mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.5px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 5px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #2563eb;
      margin-bottom: 2px;
    }}
    h1 {{
      font-size: 14.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }}
    .subtitle {{
      font-size: 8.6px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 9px;
      font-size: 8.3px;
      text-align: right;
      line-height: 1.35;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 7.8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope Table */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
    }}
    .section-title {{
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      border-left: 3px solid #2563eb;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.2px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.2px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.5px 5.5px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 4px 5.5px;
      font-size: 8.5px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.5px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.8px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.8px;
      margin-top: 1px;
      line-height: 1.2;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4.5px 5.5px;
      font-size: 8.8px;
    }}

    /* 3. 2-Column Grid */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5.5px 8px;
    }}
    .card-box-title {{
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #1e293b;
      margin: 0 0 3px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2px 0;
      font-size: 7.8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.8px;
      color: #334155;
      margin-bottom: 2px;
      padding-left: 9px;
      position: relative;
      line-height: 1.2;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 5.5px 8px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
    }}
    .term-col {{
      font-size: 7.6px;
      line-height: 1.2;
    }}
    .term-title {{
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
      font-size: 7.6px;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 10px;
    }}
    .auth-title {{
      font-size: 8.2px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 7.8px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.6px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 3px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 22px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 13.5px;
      color: #1e3a8a;
      padding-left: 4px;
    }}
    .auth-date-field {{
      width: 75px;
      border-bottom: 1.2px solid #475569;
      min-height: 22px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-size: 7.8px;
      color: #334155;
      font-family: ui-monospace, monospace;
    }}
    .auth-label {{
      font-size: 6.8px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-top: 1.5px solid #cbd5e1;
      padding-top: 4.5px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .founder-avatar {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1.5px solid #2563eb;
      object-fit: cover;
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      line-height: 1.25;
    }}
    .founder-name {{
      font-size: 8.5px;
      color: #0f172a;
    }}
    .founder-company {{
      font-size: 7.8px;
      color: #2563eb;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.2px;
      color: #64748b;
    }}
    .footer-brand {{
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 22px;
      object-fit: contain;
    }}
    .demo-badge {{
      display: inline-block;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-weight: 700;
      font-size: 7.5px;
      padding: 2.5px 6px;
      border-radius: 4px;
      text-decoration: none;
      font-family: ui-monospace, monospace;
    }}
  </style>
</head>
<body>
<div class="page-container">

  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise Document Intelligence</div>
      <h1>Full-Stack Document Reference System & RAG Engine</h1>
      <p class="subtitle">Next.js 15 • Postgres pgvector • Cross-Encoder Re-Ranking • OCR Bounding Box Citation • Cryptographic Attestation</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Enterprise Client · Mechanicsburg, PA</div>
      <div><strong>Contract:</strong> Production Scope · 60 Estimated Hours</div>
      <div><strong>Calibrated Rate:</strong> $50.00 / hr <span class="live-badge">Live Prototype Active</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-section">
    <div class="section-header">
      <h2 class="section-title">Milestone Breakdown & Engineering Deliverables</h2>
      <div class="section-meta">TOTAL SCOPE: 60 HOURS • $3,000.00</div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 14%;">Milestone</th>
          <th style="width: 60%;">Technical Deliverables & Architecture</th>
          <th style="width: 13%; text-align: center;">Timeline</th>
          <th style="width: 13%; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Milestone 0</span><br><span style="font-size: 7.2px; color: #15803d; font-weight: 700;">PROTOTYPE</span></td>
          <td>
            <div class="phase-name">Interactive Working Proof-of-Concept (Delivered Upfront)</div>
            <div class="phase-desc">Working Next.js 15 reference cockpit deployed at docref-vault.vercel.app with split-screen OCR bounding boxes, dual-provider AI query execution, and dynamic 4-role RBAC switcher.</div>
          </td>
          <td style="text-align: center; font-weight: 700; color: #15803d;">Shipped</td>
          <td style="text-align: right; font-weight: 800; color: #15803d;">$0.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 1</td>
          <td>
            <div class="phase-name">Postgres pgvector Foundation, Ingestion Engine & OCR Parsing</div>
            <div class="phase-desc">Production Postgres schema with pgvector (1536-dim HNSW index) and GIN index. Asynchronous document ingestion with OCR bounding-box coordinate extraction ([ymin, xmin, ymax, xmax]) and chunk SHA-256 sealing.</div>
          </td>
          <td style="text-align: center;">18 hrs</td>
          <td style="text-align: right; font-weight: 700;">$900.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 2</td>
          <td>
            <div class="phase-name">Hybrid RAG Retrieval, Cross-Encoder Re-Ranking & AI Gateway</div>
            <div class="phase-desc">Dense vector similarity combined with sparse lexical BM25. Two-stage cross-encoder re-ranking pipeline. Dual-provider AI gateway (OpenAI gpt-4o-mini + Gemini 2.0 Flash + deterministic local fallback).</div>
          </td>
          <td style="text-align: center;">16 hrs</td>
          <td style="text-align: right; font-weight: 700;">$800.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 3</td>
          <td>
            <div class="phase-name">Split-Screen Cockpit UI, RBAC Security Gate & Deterministic Reports</div>
            <div class="phase-desc">Interactive split-screen reference workspace with bi-directional citation highlighting. 4-role RBAC authorization gateway. Cryptographic deterministic report generator with SHA-256 seal.</div>
          </td>
          <td style="text-align: center;">14 hrs</td>
          <td style="text-align: right; font-weight: 700;">$700.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 4</td>
          <td>
            <div class="phase-name">Anti-Abuse Shield, WORM Audit Logs, Security Hardening & Handoff</div>
            <div class="phase-desc">Token bucket rate limiting (60 req/min), canary token injection trap, immutable WORM audit logs. Comprehensive handoff package: OpenAPI 3.1 specs, Docker blueprints, and administrator runbooks.</div>
          </td>
          <td style="text-align: center;">12 hrs</td>
          <td style="text-align: right; font-weight: 700;">$600.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="text-transform: uppercase; letter-spacing: 0.05em; font-size: 8.8px;">Total Fixed Investment (Turnkey Architecture & Production Handoff)</td>
          <td style="text-align: center; font-size: 8.8px;">60 hrs</td>
          <td style="text-align: right; font-size: 9.5px; font-family: ui-monospace, monospace;">$3,000.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Grid -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">System Architecture & Capabilities</div>
      <div class="milestone-item">
        <span class="milestone-name">Hybrid RAG Pipeline</span>
        <span class="milestone-val">pgvector HNSW (Dense) + BM25 (Sparse)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Re-Ranking Engine</span>
        <span class="milestone-val">Cross-Encoder Rescoring (Dense 0.55 / BM25 0.45)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">OCR Coordinate Citations</span>
        <span class="milestone-val">Exact [ymin, xmin, ymax, xmax] Bounding Box</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Cryptographic Verification</span>
        <span class="milestone-val">SHA-256 Deterministic Attestation Seal</span>
      </div>
    </div>
    <div class="card-box">
      <div class="card-box-title">Security & Production Guardrails</div>
      <div class="guardrail-item">Zero Black-Box AI: Every synthesis cites verified source document chunks.</div>
      <div class="guardrail-item">Anti-Abuse Shield: Token bucket rate limiter (60 req/min) + canary injection quarantine.</div>
      <div class="guardrail-item">Dual AI Provider: OpenAI gpt-4o-mini + Gemini 2.0 Flash sub-second failover.</div>
      <div class="guardrail-item">RBAC Hierarchy: 4-role permission gating across UI and API endpoints.</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Turnaround Cadence</div>
        <div class="term-body">3–4 weeks total delivery with functional bi-weekly staging deploys for continuous testing.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Code Ownership</div>
        <div class="term-body">100% full intellectual property transfer upon milestone sign-off. Clean MIT-licensed repo.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Warranty & Support</div>
        <div class="term-body">30 days of post-handoff bug fixes and developer support included at zero additional cost.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Handoff Deliverables</div>
        <div class="term-body">Docker compose configs, pgvector migrations, OpenAPI specs, and deployment runbooks.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Acceptance & Authorization</span>
      <span style="font-weight: 500; font-size: 7.2px; color: #64748b; font-family: ui-monospace, monospace;">EST-DOCREF-2026-V1</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Systems Contractor: BarakahSoft LLC</div>
        <div style="color: #475569;">Signatory: Shakil Ahmed, Founder & Principal Systems Architect</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">Sep 15, 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Contractor Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
      <div class="auth-party">
        <div class="auth-party-title">Client: Enterprise Partner · Mechanicsburg, PA</div>
        <div style="color: #475569;">Signatory: Authorized Representative / Engineering Lead</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 7.8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Escrow ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder & Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Document Intelligence Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://docref-vault.vercel.app" target="_blank" class="demo-badge">docref-vault.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Saved estimate.html to:", html_path)

# Run headless Chrome to produce clean 1-page ESTIMATE.pdf with NO header/footer artifacts
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
    print("File size:", os.path.getsize(pdf_path), "bytes")
else:
    print("Chrome print-to-pdf error:", res.stderr)

# Verify page count
with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()

pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
print(f"Verified PDF page count: {len(pages)} page(s)")
