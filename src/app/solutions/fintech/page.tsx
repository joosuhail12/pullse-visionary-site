import type { Metadata } from "next";
import SolutionFintech from "@/views/SolutionFintech";

export const metadata: Metadata = {
  title: "Solutions for Fintech | Pullse",
  description: "SOC 2, PCI-DSS, GDPR ready out of the box. Transaction context, fraud alerts, and KYC automation built for financial services. Reduce fraud response time by 67%.",
};

const FintechSolutionsPage = () => <SolutionFintech />;

export default FintechSolutionsPage;
