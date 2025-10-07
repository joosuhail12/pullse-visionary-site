import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Auto-QA | Pullse",
  description: "Automated quality assurance with custom rubrics and coaching insights.",
};

const AutoQAPage = () => (
  <GenericPage
    title="Auto-QA"
    description="Automated quality assurance with custom rubrics and coaching insights."
  />
);

export default AutoQAPage;
