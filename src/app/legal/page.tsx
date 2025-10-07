import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Legal | Pullse",
  description: "Terms of service, privacy policy, and legal information.",
};

const LegalPage = () => (
  <GenericPage title="Legal" description="Terms of service, privacy policy, and legal information." />
);

export default LegalPage;
