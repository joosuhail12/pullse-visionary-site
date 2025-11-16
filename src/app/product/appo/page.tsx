import ProductHelpCenters from "@/views/ProductHelpCenters";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Appo | AI-Powered Help Centers by Pullse",
  description:
    "Create beautiful, AI-powered help centers with Appo. White-labeled, multilingual knowledge bases with content gap analysis and native Pullse integration.",
  path: "/product/appo",
  keywords:
    "Appo, help center software, knowledge base, white label, multilingual, AI writing, content gap analysis, self-service, ticket deflection",
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
