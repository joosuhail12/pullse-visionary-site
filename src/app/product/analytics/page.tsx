import ProductAnalytics from "@/views/ProductAnalytics";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Analytics & Reporting | Pullse",
  description:
    "Real-time dashboards, custom reports, and ROI tracking. Turn support data into strategic decisions with Pullse Analytics.",
  path: "/product/analytics",
  keywords:
    "analytics, support analytics, customer service analytics, reporting, dashboards, roi tracking, support metrics",
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
