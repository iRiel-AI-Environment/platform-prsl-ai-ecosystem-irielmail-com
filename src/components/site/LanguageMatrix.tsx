import { LOCALES } from "@/i18n/locales";
import { useI18n } from "@/i18n/context";

/** Public availability matrix of the Language Core, generated from the typed registry. */
export function LanguageMatrix() {
  const { t } = useI18n();
  return (
    <section id="language-core" className="panel scroll-mt-24 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-foreground">Language Core · {LOCALES.length}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {LOCALES.map((l) => (
          <li
            key={l.code}
            lang={l.code}
            dir={l.dir}
            className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2"
          >
            <span>
              <span className="font-medium text-foreground">{l.nativeName}</span>
              <span className="ms-2 text-sm text-muted-foreground">{l.region}</span>
            </span>
            <span dir="ltr" className="flex shrink-0 gap-2 text-xs text-muted-foreground">
              <span className="text-telemetry">{l.code}</span>
              <span>{l.script}</span>
              <span>{l.dir === "rtl" ? "RTL" : "LTR"}</span>
              {l.complete && <span className="text-primary">{t.language.complete}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
