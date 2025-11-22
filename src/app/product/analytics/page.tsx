import ProductAnalytics from "@/views/ProductAnalytics";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Analytics & Reporting | Pullse",
  description:
    "Real-time dashboards, custom reports, and ROI tracking. Turn support data into strategic decisions with Pullse Analytics.",
  path: "/product/analytics",
  keywords: [
    "support analytics",
    "customer service reporting",
    "csat tracking",
    "sla monitoring",
    "support dashboards",
    "agent performance metrics",
    "automation impact analytics",
    "deflection rate reporting",
  ],
});

const AnalyticsPage = () => (
  <>
    <SoftwareApplicationSchema
      name="Pullse Analytics & Reporting"
      description="Real-time dashboards, custom reports, and ROI tracking. Turn support data into strategic decisions with Pullse Analytics."
      applicationCategory="BusinessApplication"
      offers={{
        price: "49",
        priceCurrency: "USD",
      }}
    />
    <ProductAnalytics />
  </>
);

export default AnalyticsPage;
