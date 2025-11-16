import SolutionSaaS from "@/views/SolutionSaaS";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Solutions for B2B SaaS | Pullse",
  description:
    "Purpose-built for SaaS teams who need account context, usage data, and proactive churn prevention. Reduce churn by 28% and accelerate trial-to-paid by 42%.",
  path: "/solutions/b2b-saas",
  keywords:
    "saas support, b2b saas, churn prevention, saas customer success, trial conversion, account management",
});

const B2BSaasPage = () => <SolutionSaaS />;

export default B2BSaasPage;
