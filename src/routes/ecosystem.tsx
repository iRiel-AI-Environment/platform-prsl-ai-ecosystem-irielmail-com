import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { brand } from "@/lib/brand";
import { LanguageMatrix } from "@/components/site/LanguageMatrix";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Ecosystem Architecture — PRSL-AI" },
      { name: "description", content: "PRSL-AI Ecosystem architecture: PRSL-AI Core, Agent PRSL-AI, the separate iRiel PowerFully Intelligence Environment, and the iApps family." },
      { property: "og:title", content: "Ecosystem Architecture — PRSL-AI" },
      { property: "og:description", content: "PRSL-AI Ecosystem architecture: PRSL-AI Core, Agent PRSL-AI, the separate iRiel PowerFully Intelligence Environment, and the iApps family." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ContentPage page="ecosystem" aside={<img src={brand.banner} alt="PRSL-AI Ecosystem overview" className="panel w-full" />}>
      <LanguageMatrix />
    </ContentPage>
  ),
});
