import type { Metadata } from "next";
import ProductAISuite from "@/views/ProductAISuite";

export const metadata: Metadata = {
  title: "AI Suite | Complete AI Platform for Support by Pullse",
  description: "Six AI-powered tools working together—chatbots, copilots, QA, summaries, sentiment analysis, and rewriting. All trained on your content, all learning from every conversation.",
  keywords: "ai suite, ai chatbots, ai copilots, customer support ai, agent assistance, auto qa, conversation summaries, sentiment analysis, ai platform, support automation, intelligent support",
};

const AISuitePage = () => <ProductAISuite />;

export default AISuitePage;
