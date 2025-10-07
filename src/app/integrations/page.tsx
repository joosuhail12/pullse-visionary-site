import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Integrations | Pullse",
  description: "Connect Pullse with your favorite tools and platforms.",
};

const IntegrationsPage = () => (
  <GenericPage
    title="Integrations"
    description="Connect Pullse with your favorite tools and platforms."
  />
);

export default IntegrationsPage;
