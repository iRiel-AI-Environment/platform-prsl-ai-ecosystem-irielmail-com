import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { FeedbackForm } from "@/components/site/FeedbackForm";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — PRSL-AI" },
      { name: "description", content: "Share community feedback and suggestions with Robert Software Labs." },
      { property: "og:title", content: "Feedback — PRSL-AI" },
      { property: "og:description", content: "Share community feedback and suggestions with Robert Software Labs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="feedback"><FeedbackForm subjectPrefix="Feedback" /></ContentPage>,
});
