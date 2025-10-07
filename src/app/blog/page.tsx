import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Blog | Pullse",
  description: "Insights, tips, and customer stories.",
};

const BlogPage = () => (
  <GenericPage title="Blog" description="Insights, tips, and customer stories." />
);

export default BlogPage;
