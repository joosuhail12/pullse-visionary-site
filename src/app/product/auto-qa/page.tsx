import ProductAutoQA from "@/views/ProductAutoQA";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Auto-QA | AI-Powered Quality Assurance by Pullse",
  description:
    "AI analyzes 100% of conversations—bot and human—with moment-level feedback, trend analysis, and structured coaching workflows. Turn QA into continuous improvement.",
  path: "/product/auto-qa",
  keywords: [
    "support quality assurance",
    "ai qa for support",
    "conversation analysis",
    "agent coaching workflows",
    "support quality scoring",
    "feedback management",
    "customer service qa automation",
    "performance tracking support",
  ],
});

const AutoQAPage = () => (
  <>
    <SoftwareApplicationSchema
      name="Pullse Auto-QA"
      description="AI analyzes 100% of conversations—bot and human—with moment-level feedback, trend analysis, and structured coaching workflows. Turn QA into continuous improvement."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductAutoQA />
  </>
);

export default AutoQAPage;
