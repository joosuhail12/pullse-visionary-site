import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Analytics & Reporting | Pullse",
  description: "Comprehensive dashboards tracking volumes, resolution rates, and team performance.",
};

const AnalyticsPage = () => (
  <GenericPage
    title="Analytics & Reporting"
    description="Comprehensive dashboards tracking volumes, resolution rates, and team performance."
  />
);

export default AnalyticsPage;
