import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developers — PRSL-AI" },
      { name: "description", content: "Architecture specifications, SDK concepts and provider-agnostic integration guidelines." },
      { property: "og:title", content: "Developers — PRSL-AI" },
      { property: "og:description", content: "Architecture specifications, SDK concepts and provider-agnostic integration guidelines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="developers" />,
});
