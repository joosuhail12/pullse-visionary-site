import type { Metadata } from "next";
import ProductAnalytics from "@/views/ProductAnalytics";

export const metadata: Metadata = {
  title: "Analytics & Reporting | Pullse",
  description: "Real-time dashboards, custom reports, and ROI tracking. Turn support data into strategic decisions with Pullse Analytics.",
};

const AnalyticsPage = () => <ProductAnalytics />;

export default AnalyticsPage;
