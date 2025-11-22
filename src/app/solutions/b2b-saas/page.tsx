import SolutionSaaS from "@/views/SolutionSaaS";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - solution pages change infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Solutions for B2B SaaS | Pullse",
  description:
    "Purpose-built for SaaS teams who need account context, usage data, and proactive churn prevention. Reduce churn by 28% and accelerate trial-to-paid by 42%.",
  path: "/solutions/b2b-saas",
  keywords: [
    "b2b saas support",
    "saas helpdesk automation",
    "saas customer success",
    "churn prevention",
    "usage based support",
    "trial to paid conversion",
    "account management support",
  ],
});

const B2BSaasPage = () => <SolutionSaaS />;

export default B2BSaasPage;
