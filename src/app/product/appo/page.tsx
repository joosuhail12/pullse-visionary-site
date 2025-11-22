import ProductHelpCenters from "@/views/ProductHelpCenters";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Appo | AI-Powered Help Centers by Pullse",
  description:
    "Create beautiful, AI-powered help centers with Appo. White-labeled, multilingual knowledge bases with content gap analysis and native Pullse integration.",
  path: "/product/appo",
  keywords: [
    "help center software",
    "ai knowledge base",
    "white label help center",
    "multilingual self-service",
    "content gap analysis",
    "faq automation",
    "ticket deflection",
    "support documentation platform",
  ],
});

const AppoPage = () => (
  <>
    <SoftwareApplicationSchema
      name="Appo"
      description="Create beautiful, AI-powered help centers with Appo. White-labeled, multilingual knowledge bases with content gap analysis and native Pullse integration."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductHelpCenters />
  </>
);

export default AppoPage;
