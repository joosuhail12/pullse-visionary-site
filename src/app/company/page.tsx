import Company from "@/views/Company";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "About Pullse | AI-First Customer Support Platform | Antler-Backed",
  description:
    "We're building the customer support platform we wish existed. Antler-backed, AI-native, transparent pricing. Meet our team and join our journey.",
  path: "/company",
  keywords:
    "about pullse, company, team, antler, startup, ai-first, mission, vision",
});

const CompanyPage = () => <Company />;

export default CompanyPage;
