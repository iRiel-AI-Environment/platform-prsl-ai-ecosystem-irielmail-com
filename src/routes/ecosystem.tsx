import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Ecosystem Architecture — PRSL-AI" },
      { name: "description", content: "PRSL-AI Core, iRiel Personal Intelligence Environment and the iApps modular family." },
      { property: "og:title", content: "Ecosystem Architecture — PRSL-AI" },
      { property: "og:description", content: "PRSL-AI Core, iRiel Personal Intelligence Environment and the iApps modular family." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="ecosystem" aside={<img src={brand.banner} alt="PRSL-AI Ecosystem overview" className="panel w-full" />} />,
});
