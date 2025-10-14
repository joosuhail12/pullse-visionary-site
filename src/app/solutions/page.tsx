import type { Metadata } from "next";
import SolutionsHub from "@/views/SolutionsHub";

export const metadata: Metadata = {
  title: "Solutions Hub | Pullse",
  description: "AI-powered customer support tailored to B2B SaaS, E-commerce, and Fintech teams. Choose the solution built for your industry's unique challenges.",
};

const SolutionsPage = () => <SolutionsHub />;

export default SolutionsPage;
