import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { FeedbackForm } from "@/components/site/FeedbackForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Robert Software Labs" },
      { name: "description", content: "Institutional contact for Robert Software Labs: helloprsl.ai@outlook.com." },
      { property: "og:title", content: "Contact — Robert Software Labs" },
      { property: "og:description", content: "Institutional contact for Robert Software Labs: helloprsl.ai@outlook.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="contact"><FeedbackForm subjectPrefix="Contact" /></ContentPage>,
});
