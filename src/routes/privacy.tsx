import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy by Default — PRSL-AI" },
      {
        name: "description",
        content: "On-device local execution and zero unauthorized data transmission.",
      },
      { property: "og:title", content: "Privacy by Default — PRSL-AI" },
      {
        property: "og:description",
        content: "On-device local execution and zero unauthorized data transmission.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="privacy" />,
});
