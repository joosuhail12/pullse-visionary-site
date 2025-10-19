import type { Metadata } from "next";
import Blog from "@/views/Blog";

export const metadata: Metadata = {
  title: "Blog | Pullse - AI Support Insights & Customer Stories",
  description: "Explore AI-powered support insights, product updates, and customer success stories. Learn how leading teams are transforming customer experience with Pullse.",
};

const BlogPage = () => <Blog />;

export default BlogPage;
