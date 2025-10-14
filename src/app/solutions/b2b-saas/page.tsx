import type { Metadata } from "next";
import SolutionSaaS from "@/views/SolutionSaaS";

export const metadata: Metadata = {
  title: "Solutions for B2B SaaS | Pullse",
  description: "Purpose-built for SaaS teams who need account context, usage data, and proactive churn prevention. Reduce churn by 28% and accelerate trial-to-paid by 42%.",
};

const B2BSaasPage = () => <SolutionSaaS />;

export default B2BSaasPage;
