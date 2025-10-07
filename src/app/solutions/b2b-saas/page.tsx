import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Solutions for B2B SaaS | Pullse",
  description: "Purpose-built for SaaS companies with complex workflows.",
};

const B2BSaasPage = () => (
  <GenericPage
    title="For B2B SaaS"
    description="Purpose-built for SaaS companies with complex workflows."
  />
);

export default B2BSaasPage;
