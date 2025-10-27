import type { Metadata } from "next";
import Company from "@/views/Company";

export const metadata: Metadata = {
  title: "About Pullse | AI-First Customer Support Platform | Antler-Backed",
  description: "We're building the customer support platform we wish existed. Antler-backed, AI-native, transparent pricing. Meet our team and join our journey.",
};

const CompanyPage = () => <Company />;

export default CompanyPage;
