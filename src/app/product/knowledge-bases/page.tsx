import type { Metadata } from "next";
import ProductHelpCenters from "@/views/ProductHelpCenters";

export const metadata: Metadata = {
  title: "Help Centers | Appo by Pullse",
  description: "AI-powered help centers that deflect tickets. Create white-labeled, multilingual knowledge bases with Appo—seamlessly integrated into Pullse.",
  keywords: "help center software, knowledge base, white label, multilingual, AI writing, content gap analysis, Appo, self-service, ticket deflection",
};

const KnowledgeBasesPage = () => <ProductHelpCenters />;

export default KnowledgeBasesPage;
