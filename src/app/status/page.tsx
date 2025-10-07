import type { Metadata } from "next";
import GenericPage from "@/views/GenericPage";

export const metadata: Metadata = {
  title: "System Status | Pullse",
  description: "Real-time platform status and uptime.",
};

const StatusPage = () => (
  <GenericPage title="System Status" description="Real-time platform status and uptime." />
);

export default StatusPage;
