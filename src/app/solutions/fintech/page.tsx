import SolutionFintech from "@/views/SolutionFintech";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - solution pages change infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Solutions for Fintech | Pullse",
  description:
    "Built with compliance controls and audit trails. SOC 2 Type II in progress. Orchestrates fraud prevention workflows, automates KYC, and handles disputes across your entire stack. Reduce risk response time by 67%.",
  path: "/solutions/fintech",
  keywords:
    "fintech support, financial services support, fraud prevention, kyc automation, compliance, dispute management, soc 2",
});

const FintechSolutionsPage = () => <SolutionFintech />;

export default FintechSolutionsPage;
