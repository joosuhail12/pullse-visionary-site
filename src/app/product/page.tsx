import Product from "@/views/Product";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate daily - product information changes infrequently
export const revalidate = 86400;

export const metadata = generatePageMetadata({
  title: "Product | Pullse - Complete AI-Powered Support Platform",
  description:
    "Explore Pullse's complete suite of AI-powered customer support tools. Unified inbox, AI chatbots, copilots, workflows, analytics, auto-QA, and help centers—all in one platform.",
  path: "/product",
  keywords: [
    "ai support platform",
    "customer support software",
    "support automation tools",
    "omnichannel inbox",
    "agent copilot",
    "ai workflows",
    "helpdesk features",
    "customer experience automation",
  ],
});

const ProductPage = () => <Product />;

export default ProductPage;
