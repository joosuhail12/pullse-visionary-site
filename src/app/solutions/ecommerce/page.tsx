import SolutionEcommerce from "@/views/SolutionEcommerce";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - solution pages change infrequently
export const revalidate = 86400;


export const metadata = generatePageMetadata({
  title: "Solutions for Ecommerce | Pullse",
  description:
    "Order management, shipping tracking, and automated returns in one place. Handle Black Friday volume without breaking a sweat. Reduce WISMO tickets by 58%.",
  path: "/solutions/ecommerce",
  keywords: [
    "ecommerce customer service",
    "order management automation",
    "shipping tracking support",
    "returns automation",
    "wismo reduction",
    "peak season support",
    "shopify support automation",
  ],
});

const EcommerceSolutionsPage = () => <SolutionEcommerce />;

export default EcommerceSolutionsPage;
