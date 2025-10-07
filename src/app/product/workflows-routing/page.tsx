import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Visual Workflows & Routing | Pullse",
  description: "Design complex automation flows with our drag-and-drop workflow builder.",
};

const WorkflowsRoutingPage = () => (
  <GenericPage
    title="Visual Workflows & Routing"
    description="Design complex automation flows with our drag-and-drop workflow builder."
  />
);

export default WorkflowsRoutingPage;
