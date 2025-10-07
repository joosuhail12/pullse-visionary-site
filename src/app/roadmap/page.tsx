import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Roadmap | Pullse",
  description: "Upcoming features and improvements.",
};

const RoadmapPage = () => (
  <GenericPage title="Roadmap" description="Upcoming features and improvements." />
);

export default RoadmapPage;
