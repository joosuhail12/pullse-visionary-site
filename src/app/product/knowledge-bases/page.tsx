import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Knowledge Bases | Pullse",
  description: "Centralized knowledge management powered by Appo.",
};

const KnowledgeBasesPage = () => (
  <GenericPage
    title="Knowledge Bases"
    description="Centralized knowledge management powered by Appo."
  />
);

export default KnowledgeBasesPage;
