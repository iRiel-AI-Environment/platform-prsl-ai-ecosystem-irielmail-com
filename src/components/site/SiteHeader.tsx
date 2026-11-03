import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/context";
import { getLocale } from "@/i18n/locales";
import { brand } from "@/lib/brand";
import { LanguageSelector } from "./LanguageSelector";

const NAV = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/ecosystem", key: "ecosystem" },
  { to: "/developers", key: "developers" },
  { to: "/docs", key: "docs" },
  { to: "/agent", key: "agent" },
  { to: "/support", key: "support" },
] as const;

export function SiteHeader() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const shown = getLocale(locale.fallback);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        {t.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="PRSL-AI Ecosystem">
          <img src={brand.shield} alt="" className="h-9 w-auto" />
          <span className="font-display text-lg font-bold">
            <span className="text-metal">PRSL-AI</span> <span className="text-muted-foreground font-medium text-sm">Ecosystem</span>
          </span>
        </Link>
        <nav aria-label="Main" className="ms-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground data-[status=active]:text-primary"
                >
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <LanguageSelector />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border lg:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 p-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }} className="block rounded-md px-3 py-3 data-[status=active]:text-primary">
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {!locale.complete && (
        <p role="status" className="border-t border-border bg-panel px-4 py-1.5 text-center text-xs text-muted-foreground">
          {locale.nativeName} ({locale.code}) — {t.language.fallback} {shown.nativeName} ({shown.code}).
        </p>
      )}
    </header>
  );
}
