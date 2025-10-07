import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Product Tour | Pullse",
  description: "Interactive demo of Pullse features.",
};

const ProductTourPage = () => (
  <GenericPage title="Product Tour" description="Interactive demo of Pullse features." />
);

export default ProductTourPage;
