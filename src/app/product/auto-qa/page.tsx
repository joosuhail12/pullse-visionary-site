import type { Metadata } from "next";
import ProductAutoQA from "@/views/ProductAutoQA";

export const metadata: Metadata = {
  title: "Auto-QA | AI-Powered Quality Assurance by Pullse",
  description: "AI analyzes 100% of conversations—bot and human—with moment-level feedback, trend analysis, and structured coaching workflows. Turn QA into continuous improvement.",
  keywords: "auto qa, quality assurance, ai qa, conversation analysis, coaching, feedback management, customer service qa, support quality, performance tracking",
};

const AutoQAPage = () => <ProductAutoQA />;

export default AutoQAPage;
