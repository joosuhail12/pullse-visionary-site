import type { Metadata } from "next";
import SolutionEcommerce from "@/views/SolutionEcommerce";

export const metadata: Metadata = {
  title: "Solutions for Ecommerce | Pullse",
  description: "Order management, shipping tracking, and automated returns in one place. Handle Black Friday volume without breaking a sweat. Reduce WISMO tickets by 58%.",
};

const EcommerceSolutionsPage = () => <SolutionEcommerce />;

export default EcommerceSolutionsPage;
