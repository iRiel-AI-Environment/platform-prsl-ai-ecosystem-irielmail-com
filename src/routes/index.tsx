import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Layers, Network, ShieldCheck } from "lucide-react";
import { AgentConsole } from "@/components/site/AgentConsole";
import { useI18n } from "@/i18n/context";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PRSL-AI Ecosystem — By Robert Software Labs" },
      {
        name: "description",
        content:
          "Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.",
      },
      { property: "og:title", content: "PRSL-AI Ecosystem — By Robert Software Labs" },
      {
        property: "og:description",
        content:
          "PRSL-AI Core, iRiel, iApps and Agent PRSL-AI: privacy by default, on-device first.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ICONS = [Cpu, Layers, Network, ShieldCheck];

function Home() {
  const { t } = useI18n();
  const h = t.home;
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-16 pb-20 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">
            {h.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            <span className="text-metal">{h.title}</span>
          </h1>
          <p className="mt-6 text-xl text-foreground">{h.manifesto}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {h.tagline.map((x) => (
              <li
                key={x}
                className="rounded-full border border-primary/40 px-3 py-1 font-mono text-xs text-primary"
              >
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/ecosystem"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 font-medium text-primary-foreground glow-emerald hover:bg-accent hover:text-accent-foreground"
            >
              {h.ctaPrimary} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
            <Link
              to="/agent"
              className="inline-flex min-h-11 items-center rounded-md border border-telemetry/60 px-5 font-medium text-foreground hover:glow-cyan"
            >
              {h.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute inset-6 rounded-full bg-primary/20 blur-3xl" />
          <img
            src={brand.crest}
            alt="PRSL-AI Ecosystem crest — Privacy by default, on-device first"
            className="relative mx-auto w-full max-w-md rounded-full"
          />
        </div>
      </section>

      <section aria-labelledby="manifesto" className="mx-auto max-w-4xl px-4">
        <div className="panel p-8 md:p-10">
          <h2 id="manifesto" className="text-2xl font-bold text-primary">
            {h.manifestoTitle}
          </h2>
          {h.manifestoBody.map((p) => (
            <p key={p} className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="entities" className="mx-auto mt-20 max-w-7xl px-4">
        <h2 id="entities" className="text-3xl font-bold">
          {h.entitiesTitle}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {h.entities.map((e, i) => {
            const Icon = ICONS[i] ?? Cpu;
            return (
              <article key={e.name} className="panel p-6">
                <Icon
                  className={`h-7 w-7 ${i === 3 ? "text-telemetry" : "text-primary"}`}
                  aria-hidden
                />
                <h3 className="mt-4 text-lg font-bold">{e.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-telemetry">
                  {e.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="dependency" className="mx-auto mt-20 max-w-7xl px-4">
        <div className="panel grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 id="dependency" className="text-3xl font-bold">
              {h.dependencyTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{h.dependencyBody}</p>
          </div>
          <ol className="space-y-3">
            {h.dependencyLines.map((l, i) => (
              <li
                key={l}
                className="flex items-center gap-4 rounded-md border border-border bg-background/60 px-5 py-4"
              >
                <span className="font-mono text-sm text-telemetry">0{i + 1}</span>
                <span className="font-display text-xl font-semibold">{l}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="principles" className="mx-auto mt-20 max-w-7xl px-4">
        <h2 id="principles" className="text-3xl font-bold">
          {h.principlesTitle}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {h.principles.map((p) => (
            <div key={p.h} className="rounded-lg border border-border bg-panel p-6">
              <h3 className="font-semibold text-primary">{p.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase 1: Crest & Shield */}
      <section aria-labelledby="crest" className="mx-auto mt-24 max-w-7xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={brand.shield}
              alt="PRSL-AI emerald metal shield"
              className="panel w-full p-6"
            />
            <img src={brand.crest} alt="PRSL-AI circular crest" className="panel w-full" />
          </div>
          <div>
            <h2 id="crest" className="text-3xl font-bold">
              <span className="text-metal">{h.crestTitle}</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{h.crestBody}</p>
          </div>
        </div>
      </section>

      {/* Showcase 2: iRiel */}
      <section aria-labelledby="iriel" className="mx-auto mt-24 max-w-7xl px-4">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <img src={brand.orb} alt="" className="h-20 w-20 rounded-full glow-emerald" />
          <div>
            <h2 id="iriel" className="text-3xl font-bold">
              {h.irielTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">{h.irielBody}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <img
            src={brand.irielDevices}
            alt="iRiel on phone, tablet and desktop with the emerald orb"
            className="h-full w-full rounded-2xl border border-primary/20 object-cover shadow-2xl"
          />
          <img
            src={brand.irielDesktop}
            alt="iRiel desktop assistant: Ask or Search with iRiel"
            className="h-full w-full rounded-2xl border border-primary/20 object-cover shadow-2xl"
          />
        </div>
        <Link
          to="/iriel"
          className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        >
          iRiel <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </section>

      {/* Showcase 3: Agent geometry */}
      <section aria-labelledby="agent-geo" className="mx-auto mt-24 max-w-7xl px-4">
        <h2 id="agent-geo" className="text-3xl font-bold">
          {h.agentTitle}
        </h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">{h.agentBody}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[brand.aura, brand.galaxy, brand.hubs].map((src, i) => (
            <figure
              key={src}
              className={`group relative overflow-hidden rounded-2xl border border-telemetry/25 bg-card glow-cyan ${i === 2 ? "md:col-span-2" : ""}`}
            >
              <img
                src={src}
                alt={h.geometry[i]}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 2 ? "aspect-[21/9]" : "aspect-square"}`}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold tracking-wide text-telemetry">
                ◈ {h.geometry[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="console" className="mx-auto mt-24 max-w-6xl px-4">
        <h2 id="console" className="mb-6 text-3xl font-bold">
          {t.agent.title}{" "}
          <span className="text-base font-normal text-muted-foreground">· {t.agent.poweredBy}</span>
        </h2>
        <AgentConsole />
      </section>
    </>
  );
}
