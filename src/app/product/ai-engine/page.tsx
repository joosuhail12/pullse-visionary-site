import ProductAIEngine from "@/views/ProductAIEngine";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "AI Engine | Pullse - Governed AI with Guardrails",
  description:
    "From intent to safe action in seconds. Classification, retrieval, planning, execution, and QA—all governed and logged. Built on NIST AI RMF and OWASP best practices.",
  path: "/product/ai-engine",
  keywords:
    "ai engine, governed ai, ai guardrails, ai safety, nist ai rmf, owasp ai, secure ai, responsible ai",
});

const AIEnginePage = () => (
  <>
    <SoftwareApplicationSchema
      name="Pullse AI Engine"
      description="From intent to safe action in seconds. Classification, retrieval, planning, execution, and QA—all governed and logged. Built on NIST AI RMF and OWASP best practices."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductAIEngine />
  </>
);

export default AIEnginePage;
