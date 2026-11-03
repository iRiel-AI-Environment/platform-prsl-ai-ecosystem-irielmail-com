import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/iapps")({
  head: () => ({
    meta: [
      { title: "iApps Modular Family — PRSL-AI" },
      { name: "description", content: "Focused, accessible, interoperable applications built on PRSL-AI Core." },
      { property: "og:title", content: "iApps Modular Family — PRSL-AI" },
      { property: "og:description", content: "Focused, accessible, interoperable applications built on PRSL-AI Core." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="iapps" />,
});
