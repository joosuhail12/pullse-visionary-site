import type { Metadata } from "next";
import ProductTour from "@/views/ProductTour";

export const metadata: Metadata = {
  title: "Product Tour | Pullse - See the Platform in Action",
  description: "Take an interactive tour of Pullse's unified customer support platform. See how AI-powered automation, intelligent routing, and real-time analytics work together to transform your support operations.",
};

const ProductTourPage = () => <ProductTour />;

export default ProductTourPage;
