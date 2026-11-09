import type { ReactNode } from "react";
import { useI18n } from "@/i18n/context";
import type { PageKey } from "@/i18n/messages";

function linkify(text: string): ReactNode {
  return text;
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-16 pb-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">
        <span className="text-metal">{title}</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{intro}</p>
    </div>
  );
}

export function ContentPage({
  page,
  aside,
  children,
}: {
  page: PageKey;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const { t } = useI18n();
  const p = t.pages[page];
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      {aside && <div className="mx-auto max-w-4xl px-4 pb-8">{aside}</div>}
      <div className="mx-auto grid max-w-4xl gap-5 px-4">
        {p.sections.map((s) => (
          <section key={s.h} id={s.id} className="panel scroll-mt-24 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">{s.h}</h2>
            {s.body?.map((b) => (
              <p key={b} className="mt-3 leading-relaxed text-muted-foreground">
                {linkify(b)}
              </p>
            ))}
            {s.items && (
              <ul className="mt-4 space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary glow-emerald"
                    />
                    <span>{linkify(i)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {children}
      </div>
    </>
  );
}
