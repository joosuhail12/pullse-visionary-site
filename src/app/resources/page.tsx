import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Resources | Pullse",
  description: "Documentation, guides, and learning materials.",
};

const ResourcesPage = () => (
  <GenericPage title="Resources" description="Documentation, guides, and learning materials." />
);

export default ResourcesPage;
