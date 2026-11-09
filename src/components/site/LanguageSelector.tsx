import { Globe, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/context";
import { LOCALES } from "@/i18n/locales";

export function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.language.label}: ${locale.nativeName} (${locale.code})`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-panel px-3 text-sm hover:border-primary"
      >
        <Globe className="h-4 w-4 text-primary" aria-hidden />
        <span className="font-mono">{locale.code}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t.language.label}
          className="absolute end-0 z-50 mt-2 max-h-[70vh] w-80 overflow-auto rounded-lg border border-border bg-popover p-1 shadow-2xl"
        >
          {LOCALES.map((l) => {
            const selected = l.code === locale.code;
            return (
              <li key={l.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  lang={l.code}
                  dir={l.dir}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-start hover:bg-secondary aria-selected:bg-secondary"
                >
                  <span className="mt-0.5 w-4">
                    {selected && <Check className="h-4 w-4 text-primary" aria-hidden />}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">
                      {l.nativeName} <span className="text-muted-foreground">· {l.region}</span>
                    </span>
                    <span
                      className="mt-0.5 flex flex-wrap gap-1.5 font-mono text-xs text-muted-foreground"
                      dir="ltr"
                    >
                      <span>{l.code}</span>
                      <span>
                        {t.language.script}: {l.script}
                      </span>
                      <span className={l.dir === "rtl" ? "text-telemetry" : ""}>
                        {l.dir.toUpperCase()}
                      </span>
                      {l.complete && <span className="text-primary">✓ {t.language.complete}</span>}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
