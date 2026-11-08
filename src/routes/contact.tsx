import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SubmissionStatus } from "@/components/site/SubmissionStatus";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Robert Software Labs" },
      { name: "description", content: "Contact status for Robert Software Labs. The website does not currently provide a connected submission service or verified direct human-contact channel." },
      { property: "og:title", content: "Contact — Robert Software Labs" },
      { property: "og:description", content: "Contact status for Robert Software Labs. The website does not currently provide a connected submission service or verified direct human-contact channel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="contact"><SubmissionStatus /></ContentPage>,
});
