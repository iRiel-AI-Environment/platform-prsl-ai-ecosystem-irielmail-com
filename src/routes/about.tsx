import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Robert Software Labs — PRSL-AI" },
      { name: "description", content: "Origin, vision and mission of Robert Software Labs and its founder Robert, a Brazilian software engineer." },
      { property: "og:title", content: "About Robert Software Labs — PRSL-AI" },
      { property: "og:description", content: "Origin, vision and mission of Robert Software Labs and its founder Robert, a Brazilian software engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="about" />,
});
