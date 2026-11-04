import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { brand } from "@/lib/brand";

export function SiteFooter() {
  const { t } = useI18n();
  const f = t.footer;
  const cols = [
    { h: f.platform, links: [
      { label: f.about, to: "/about" as const },
      { label: f.ecosystem, to: "/ecosystem" as const },
      { label: f.iriel, to: "/iriel" as const },
      { label: f.iapps, to: "/iapps" as const },
    ] },
    { h: f.developers, links: [
      { label: f.documentation, to: "/docs" as const },
      { label: f.architecture, to: "/developers" as const, hash: "architecture" },
      { label: f.integrations, to: "/developers" as const, hash: "integrations" },
      { label: f.devResources, to: "/developers" as const, hash: "resources" },
    ] },
    { h: f.resources, links: [
      { label: f.feedback, to: "/feedback" as const },
      { label: f.support, to: "/support" as const },
      { label: f.contact, to: "/contact" as const },
    ] },
    { h: f.legal, links: [
      { label: f.privacy, to: "/privacy" as const },
      { label: f.security, to: "/security" as const },
      { label: f.terms, to: "/terms" as const },
    ] },
  ];
  return (
    <footer className="mt-24 border-t border-border bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-5">
        <div className="md:col-span-1">
          <img src={brand.shield} alt="PRSL-AI shield" className="h-14 w-auto" />
          <p className="mt-4 font-display text-lg font-bold tracking-wider">
            <span className="text-metal">PRSL-AI ECOSYSTEM</span>
          </p>
          <p className="text-sm text-muted-foreground">By Robert Software Labs</p>
          <p className="mt-3 text-sm text-muted-foreground">{f.tagline}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">{c.h}</h2>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} {..."hash" in l && l.hash ? { hash: l.hash } : {}} className="text-sm text-muted-foreground hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground">{f.copyright}</p>
      </div>
    </footer>
  );
}
