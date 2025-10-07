import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Documentation | Pullse",
  description: "Complete guides and API documentation.",
};

const DocsPage = () => (
  <GenericPage title="Documentation" description="Complete guides and API documentation." />
);

export default DocsPage;
