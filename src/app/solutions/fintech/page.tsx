import type { Metadata } from "next";
import SolutionFintech from "@/views/SolutionFintech";

export const metadata: Metadata = {
  title: "Solutions for Fintech | Pullse",
  description: "Built with compliance controls and audit trails. SOC 2 Type II in progress. Transaction context, fraud alerts, and KYC automation built for financial services. Reduce fraud response time by 67%.",
};

const FintechSolutionsPage = () => <SolutionFintech />;

export default FintechSolutionsPage;
