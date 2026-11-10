import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AgentConsole } from "@/components/site/AgentConsole";
import { useI18n } from "@/i18n/context";
import { brand } from "@/lib/brand";

export function AgentFab() {
  const { t } = useI18n();
  const a = t.agent;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          id="agent-fab-panel"
          role="dialog"
          aria-modal="true"
          aria-label={a.agentName}
          className="panel fixed inset-x-3 bottom-24 z-50 flex max-h-[calc(100dvh-8rem)] flex-col overflow-hidden shadow-2xl sm:inset-x-auto sm:end-6 sm:w-[26rem]"
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
              ref={closeRef}
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
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="agent-fab-panel"
        aria-label={a.agentName}
        className="fixed bottom-5 end-5 z-50 h-16 w-16 rounded-full border border-telemetry/50 bg-panel p-1 glow-cyan transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full motion-reduce:hidden border border-telemetry/30"
          aria-hidden
        />
        <img src={brand.agentOrb} alt="" className="h-full w-full rounded-full object-contain" />
      </button>
    </>
  );
}
