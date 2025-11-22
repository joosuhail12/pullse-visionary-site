import Blog from "@/views/Blog";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Blog | Pullse - AI Support Insights & Customer Stories",
  description: "AI-powered support insights, product updates, and customer success stories. Learn how leading teams transform customer experience.",
  path: "/blog",
  keywords: [
    "ai support blog",
    "customer success stories",
    "support insights",
    "ai automation guides",
    "customer experience best practices",
    "product updates",
    "customer service best practices",
  ],
});

const BlogPage = () => <Blog />;

export default BlogPage;
