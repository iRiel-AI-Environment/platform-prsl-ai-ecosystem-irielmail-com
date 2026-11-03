import { createFileRoute } from "@tanstack/react-router";
import { AgentConsole } from "@/components/site/AgentConsole";
import { PageHero } from "@/components/site/ContentPage";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "Agent PRSL-AI Console — Robert Software Labs" },
      { name: "description", content: "Ask Agent PRSL-AI, the institutional ambassador, about the ecosystem, routing, iRiel and architectural principles." },
      { property: "og:title", content: "Agent PRSL-AI Console" },
      { property: "og:description", content: "The institutional knowledge ambassador of the PRSL-AI Ecosystem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgentPage,
});

function AgentPage() {
  const { t } = useI18n();
  const a = t.agent;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} intro={a.intro} />
      <div className="mx-auto max-w-6xl space-y-6 px-4">
        <AgentConsole />
        <section className="panel p-6 md:p-8">
          <h2 className="text-xl font-semibold">{a.distinctionTitle}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {a.distinction.map((d, i) => (
              <p key={d} className={`border-s-2 ps-4 text-muted-foreground ${i === 0 ? "border-telemetry" : "border-primary"}`}>{d}</p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
