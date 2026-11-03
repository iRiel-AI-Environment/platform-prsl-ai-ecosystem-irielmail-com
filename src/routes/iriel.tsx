import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/iriel")({
  head: () => ({
    meta: [
      { title: "iRiel Personal Intelligence Environment — PRSL-AI" },
      { name: "description", content: "iRiel: your private, on-device Personal Intelligence Environment." },
      { property: "og:title", content: "iRiel Personal Intelligence Environment — PRSL-AI" },
      { property: "og:description", content: "iRiel: your private, on-device Personal Intelligence Environment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="iriel" aside={<div className="grid gap-4 md:grid-cols-2"><img src={brand.irielDevices} alt="iRiel on phone, tablet and desktop" className="panel w-full object-cover" /><img src={brand.irielDesktop} alt="iRiel desktop assistant with emerald orb" className="panel w-full object-cover" /></div>} />,
});
