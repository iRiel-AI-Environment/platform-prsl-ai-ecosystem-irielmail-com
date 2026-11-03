import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — PRSL-AI" },
      { name: "description", content: "Terms for using the PRSL-AI Ecosystem website." },
      { property: "og:title", content: "Terms of Service — PRSL-AI" },
      { property: "og:description", content: "Terms for using the PRSL-AI Ecosystem website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="terms" />,
});
