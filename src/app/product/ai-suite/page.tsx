import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "AI Suite | Pullse",
  description: "Deploy intelligent chatbots and AI copilot for automated customer support.",
};

const AISuitePage = () => (
  <GenericPage
    title="AI Suite"
    description="Deploy intelligent chatbots and AI copilot for automated customer support."
  />
);

export default AISuitePage;
