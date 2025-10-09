import type { Metadata } from "next";
import ProductAIEngine from "@/views/ProductAIEngine";

export const metadata: Metadata = {
  title: "AI Engine | Pullse - Governed AI with Guardrails",
  description: "From intent to safe action in seconds. Classification, retrieval, planning, execution, and QA—all governed and logged. Built on NIST AI RMF and OWASP best practices.",
};

const AIEnginePage = () => <ProductAIEngine />;

export default AIEnginePage;
