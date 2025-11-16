import SolutionEcommerce from "@/views/SolutionEcommerce";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Solutions for Ecommerce | Pullse",
  description:
    "Order management, shipping tracking, and automated returns in one place. Handle Black Friday volume without breaking a sweat. Reduce WISMO tickets by 58%.",
  path: "/solutions/ecommerce",
  keywords:
    "ecommerce support, order management, shipping tracking, returns automation, wismo, black friday support",
});

const EcommerceSolutionsPage = () => <SolutionEcommerce />;

export default EcommerceSolutionsPage;
