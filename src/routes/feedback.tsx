import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SubmissionStatus } from "@/components/site/SubmissionStatus";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — PRSL-AI" },
      { name: "description", content: "Feedback submission is not connected. This page explains the current status; nothing is sent or stored." },
      { property: "og:title", content: "Feedback — PRSL-AI" },
      { property: "og:description", content: "Feedback submission is not connected. This page explains the current status; nothing is sent or stored." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="feedback"><SubmissionStatus /></ContentPage>,
});
