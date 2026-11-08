import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/iriel")({
  head: () => ({
    meta: [
      { title: "iRiel — PowerFully Intelligence Environment | PRSL-AI" },
      { name: "description", content: "iRiel is a separate PowerFully Intelligence Environment with its own AppWeb, designed to coordinate personal intent, authorized context and continuity." },
      { property: "og:title", content: "iRiel — PowerFully Intelligence Environment | PRSL-AI" },
      { property: "og:description", content: "A separate PowerFully Intelligence Environment with its own AppWeb and explicit PRSL-AI integration boundaries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentPage page="iriel" aside={<div className="grid gap-4 md:grid-cols-2"><img src={brand.irielDevices} alt="iRiel on phone, tablet and desktop" className="panel w-full object-cover" /><img src={brand.irielDesktop} alt="iRiel desktop assistant with emerald orb" className="panel w-full object-cover" /><a href="https://iriel-prsl-ai-irielmail-com.lovable.app" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-foreground hover:bg-accent hover:text-accent-foreground md:col-span-2">Open the separate iRiel AppWeb</a></div>} />,
});
