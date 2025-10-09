import type { Metadata } from "next";
import ProductHelpCenters from "@/views/ProductHelpCenters";

export const metadata: Metadata = {
  title: "Appo | AI-Powered Help Centers by Pullse",
  description: "Create beautiful, AI-powered help centers with Appo. White-labeled, multilingual knowledge bases with content gap analysis and native Pullse integration.",
  keywords: "Appo, help center software, knowledge base, white label, multilingual, AI writing, content gap analysis, self-service, ticket deflection",
};

const AppoPage = () => <ProductHelpCenters />;

export default AppoPage;
