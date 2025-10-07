import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Compare | Pullse",
  description: "See how Pullse compares to other platforms.",
};

const ComparePage = () => (
  <GenericPage title="Compare" description="See how Pullse compares to other platforms." />
);

export default ComparePage;
