import Product from "@/views/Product";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;

export const metadata = generatePageMetadata({
  title: "Product | Pullse - Complete AI-Powered Support Platform",
  description:
    "Explore Pullse's complete suite of AI-powered customer support tools. Unified inbox, AI chatbots, copilots, workflows, analytics, auto-QA, and help centers—all in one platform.",
  path: "/product",
  keywords:
    "product features, customer support software, ai support tools, support platform features, helpdesk features",
});

const ProductPage = () => <Product />;

export default ProductPage;
