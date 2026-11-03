import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — PRSL-AI" },
      { name: "description", content: "Architectural principles, technical guides and the PRSL-AI Language Core specification." },
      { property: "og:title", content: "Documentation — PRSL-AI" },
      { property: "og:description", content: "Architectural principles, technical guides and the PRSL-AI Language Core specification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="docs" />,
});
