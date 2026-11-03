import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security by Default — PRSL-AI" },
      { name: "description", content: "Security principles and vulnerability disclosure for the PRSL-AI Ecosystem." },
      { property: "og:title", content: "Security by Default — PRSL-AI" },
      { property: "og:description", content: "Security principles and vulnerability disclosure for the PRSL-AI Ecosystem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="security" />,
});
