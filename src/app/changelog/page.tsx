import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "Changelog | Pullse",
  description: "Latest updates and feature releases.",
};

const ChangelogPage = () => (
  <GenericPage title="Changelog" description="Latest updates and feature releases." />
);

export default ChangelogPage;
