import ProductAISuite from "@/views/ProductAISuite";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "AI Suite | Complete AI Platform for Support by Pullse",
  description:
    "Six AI-powered tools working together—chatbots, copilots, QA, summaries, sentiment analysis, and rewriting. All trained on your content, all learning from every conversation.",
  path: "/product/ai-suite",
  keywords:
    "ai suite, ai chatbots, ai copilots, customer support ai, agent assistance, auto qa, conversation summaries, sentiment analysis, ai platform, support automation, intelligent support",
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
