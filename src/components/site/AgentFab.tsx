import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { AgentConsole } from "@/components/site/AgentConsole";
import { useI18n } from "@/i18n/context";
import { brand } from "@/lib/brand";

export function AgentFab() {
  const { t } = useI18n();
  const a = t.agent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={a.agentName}
          className="panel fixed inset-x-3 bottom-24 z-50 flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden shadow-2xl sm:inset-x-auto sm:end-6 sm:w-[26rem]"
        >
          <header className="flex items-center gap-3 border-b border-border p-4">
            <img
              src={brand.agentOrb}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-contain glow-cyan"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{a.agentName}</p>
              <p className="flex items-center gap-2 text-xs text-telemetry">
                <span className="h-2 w-2 rounded-full bg-telemetry" aria-hidden /> {a.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </header>
          <AgentConsole compact />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={a.agentName}
        className="fixed bottom-5 end-5 z-50 h-16 w-16 rounded-full border border-telemetry/50 bg-panel p-1 glow-cyan transition-transform hover:scale-105"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full border border-telemetry/30"
          aria-hidden
        />
        <img src={brand.agentOrb} alt="" className="h-full w-full rounded-full object-contain" />
      </button>
    </>
  );
}
