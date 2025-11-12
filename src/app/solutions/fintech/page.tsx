import type { Metadata } from "next";
import SolutionFintech from "@/views/SolutionFintech";

export const metadata: Metadata = {
  title: "Solutions for Fintech | Pullse",
  description: "Built with compliance controls and audit trails. SOC 2 Type II in progress. Orchestrates fraud prevention workflows, automates KYC, and handles disputes across your entire stack. Reduce risk response time by 67%.",
};

const FintechSolutionsPage = () => <SolutionFintech />;

export default FintechSolutionsPage;
