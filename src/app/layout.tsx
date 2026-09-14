import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "DocRef Vault - Full-Stack Document Reference & RAG Verification System",
  description: "Enterprise Document Reference System: Hybrid RAG Pipeline, OCR Bounding Box Ingestion, Cross-Encoder Re-Ranking, Ground-Truth Document Citation Viewer, RBAC Matrix & Deterministic Cryptographic Audit Reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased transition-colors duration-150">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Central Demo Traffic Tracking Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=docref-vault"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </body>
    </html>
  );
}
