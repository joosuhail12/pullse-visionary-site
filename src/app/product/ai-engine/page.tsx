import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "The Pullse AI Engine | Pullse",
  description: "Advanced model orchestration, RAG, and API-connected actions.",
};

const AIEnginePage = () => (
  <GenericPage
    title="The Pullse AI Engine"
    description="Advanced model orchestration, RAG, and API-connected actions."
  />
);

export default AIEnginePage;
