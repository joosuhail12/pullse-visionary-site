import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Security & Trust | Pullse",
  description: "Our commitment to security and compliance.",
};

const SecurityPage = () => (
  <GenericPage title="Security & Trust" description="Our commitment to security and compliance." />
);

export default SecurityPage;
