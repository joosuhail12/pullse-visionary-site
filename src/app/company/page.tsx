import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Company | Pullse",
  description: "About Pullse, our team, and careers.",
};

const CompanyPage = () => (
  <GenericPage title="Company" description="About Pullse, our team, and careers." />
);

export default CompanyPage;
