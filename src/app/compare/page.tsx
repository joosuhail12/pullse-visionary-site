import Compare from "@/views/Compare";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Compare Pullse vs Zendesk, Intercom, Freshdesk | Platform Comparison",
  description:
    "See how Pullse compares to Zendesk, Intercom, Freshdesk, Dixa, and Gladly. Compare AI features, pricing, ease of use, and more.",
  path: "/compare",
  keywords:
    "compare, vs zendesk, vs intercom, vs freshdesk, vs dixa, vs gladly, comparison, alternatives",
});

const ComparePage = () => <Compare />;

export default ComparePage;
