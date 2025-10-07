import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Solutions for Ecommerce | Pullse",
  description: "Optimized for online retail with order tracking and automation.",
};

const EcommerceSolutionsPage = () => (
  <GenericPage
    title="For Ecommerce"
    description="Optimized for online retail with order tracking and automation."
  />
);

export default EcommerceSolutionsPage;
