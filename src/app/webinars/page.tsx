import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Webinars | Pullse",
  description: "Live training sessions and product demos.",
};

const WebinarsPage = () => (
  <GenericPage title="Webinars" description="Live training sessions and product demos." />
);

export default WebinarsPage;
