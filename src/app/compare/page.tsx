import Compare from "@/views/Compare";
import { generatePageMetadata } from "@/lib/metadata";
import FAQPageSchema from "@/components/structured-data/FAQPageSchema";
import { faqs } from "@/data/comparisonData";

// Revalidate hourly - comparison data may update
export const revalidate = 3600;


export const metadata = generatePageMetadata({
  title: "Compare Pullse vs Zendesk, Intercom, Freshdesk | Platform Comparison",
  description:
    "See how Pullse compares to Zendesk, Intercom, Freshdesk, Dixa, and Gladly. Compare AI features, pricing, ease of use, and more.",
  path: "/compare",
  keywords:
    "compare, vs zendesk, vs intercom, vs freshdesk, vs dixa, vs gladly, comparison, alternatives",
});

const ComparePage = () => (
  <>
    <FAQPageSchema faqs={faqs} />
    <Compare />
  </>
);

export default ComparePage;
