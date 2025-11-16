import SolutionsHub from "@/views/SolutionsHub";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - solution pages change infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Solutions Hub | Pullse",
  description:
    "AI-powered customer support tailored to B2B SaaS, E-commerce, and Fintech teams. Choose the solution built for your industry's unique challenges.",
  path: "/solutions",
  keywords:
    "industry solutions, saas support, ecommerce support, fintech support, customer support solutions",
});

const SolutionsPage = () => <SolutionsHub />;

export default SolutionsPage;
