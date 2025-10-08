import type { Metadata } from "next";
import ProductWorkflows from "@/views/ProductWorkflows";

export const metadata: Metadata = {
  title: "Visual Workflows & Automation | Pullse",
  description: "Build sophisticated automation with drag-and-drop workflows. No coding required. Smart routing, conditional logic, and 50+ pre-built templates for e-commerce, SaaS, and support ops.",
  keywords: "workflow automation, visual workflow builder, no-code automation, ticket routing, support automation, drag-and-drop workflows",
};

const WorkflowsPage = () => <ProductWorkflows />;

export default WorkflowsPage;
