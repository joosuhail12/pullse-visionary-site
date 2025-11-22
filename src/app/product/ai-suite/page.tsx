import ProductAISuite from "@/views/ProductAISuite";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;

export const metadata = generatePageMetadata({
  title: "AI Suite | Complete AI Platform for Support by Pullse",
  description:
    "Six AI-powered tools working together—chatbots, copilots, QA, summaries, sentiment analysis, and rewriting. All trained on your content, all learning from every conversation.",
  path: "/product/ai-suite",
  keywords: [
    "ai support suite",
    "ai chatbots for support",
    "agent copilot",
    "support automation platform",
    "auto qa for support",
    "conversation summaries",
    "sentiment analysis support",
    "ai rewriting",
    "autonomous support agents",
  ],
});

const AISuitePage = () => (
  <>
    <SoftwareApplicationSchema
      name="Pullse AI Suite"
      description="Six AI-powered tools working together—chatbots, copilots, QA, summaries, sentiment analysis, and rewriting. All trained on your content, all learning from every conversation."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductAISuite />
  </>
);

export default AISuitePage;
