import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Design Partner Program | Pullse",
  description: "Join our early access program and shape the future of Pullse.",
};

const EarlyAccessPage = () => (
  <GenericPage
    title="Design Partner Program"
    description="Join our early access program and shape the future of Pullse."
  />
);

export default EarlyAccessPage;
