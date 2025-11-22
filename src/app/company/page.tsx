import Company from "@/views/Company";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - company information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "About Pullse | AI-First Customer Support Platform | Antler-Backed",
  description:
    "We're building the customer support platform we wish existed. Antler-backed, AI-native, transparent pricing. Meet our team and join our journey.",
  path: "/company",
  keywords: [
    "about pullse",
    "pullse team",
    "antler backed startup",
    "ai first company",
    "customer support startup",
    "mission and vision",
    "careers at pullse",
  ],
});

const CompanyPage = () => <Company />;

export default CompanyPage;
