import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Help Center — PRSL-AI" },
      { name: "description", content: "Getting started, FAQ and help for the PRSL-AI Ecosystem." },
      { property: "og:title", content: "Support & Help Center — PRSL-AI" },
      { property: "og:description", content: "Getting started, FAQ and help for the PRSL-AI Ecosystem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="support" />,
});
