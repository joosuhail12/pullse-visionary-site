import type { Metadata } from "next";
import Compare from "@/views/Compare";

export const metadata: Metadata = {
  title: "Compare Pullse vs Zendesk, Intercom, Freshdesk | Platform Comparison",
  description: "See how Pullse compares to Zendesk, Intercom, Freshdesk, Dixa, and Gladly. Compare AI features, pricing, ease of use, and more.",
};

const ComparePage = () => <Compare />;

export default ComparePage;
