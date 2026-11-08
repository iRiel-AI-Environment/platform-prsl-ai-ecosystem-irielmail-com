import { Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/context";
import type { AgentTopic } from "@/i18n/messages";
import { matchTopic } from "@/lib/agent";
import { brand } from "@/lib/brand";

type Msg = {
  from: "agent" | "user";
  text?: string;
  topic?: AgentTopic | "greeting" | "fallback" | "localOnly";
};

export function AuraVisualizer({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-56" aria-hidden>
      <div
        className={`absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--telemetry)_0%,transparent_65%)] opacity-30 ${active ? "animate-ping" : "animate-pulse"}`}
      />
      <div
        className="absolute inset-4 rounded-full border border-telemetry/40 animate-[spin_18s_linear_infinite]"
        style={{ borderStyle: "dashed" }}
      />
      <div className="absolute inset-10 rounded-full border border-primary/50 animate-[spin_12s_linear_infinite_reverse]" />
      <img
        src={brand.agentOrb}
        alt=""
        className="absolute inset-8 m-auto h-[calc(100%-4rem)] w-[calc(100%-4rem)] rounded-full object-contain"
      />
    </div>
  );
}

export function AgentConsole({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const a = t.agent;
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "agent", topic: "greeting" }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo?.({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, thinking]);

  const ask = (text: string, topic?: AgentTopic) => {
    const question = text.trim();
    if (!question) return;

    setMsgs((m) => [...m, { from: "user", text: question }]);
    setInput("");

    const found = topic ?? matchTopic(question, a.keywords);
    if (!found) {
      setMsgs((m) => [...m, { from: "agent", topic: "localOnly" }]);
      return;
    }

    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "agent", topic: found }]);
      setThinking(false);
    }, 350);
  };

  const render = (m: Msg) =>
    m.text
      ? m.text
      : m.topic === "greeting"
        ? a.greeting
        : m.topic === "fallback" || m.topic === "localOnly"
          ? a.localOnly
          : a.answers[m.topic as AgentTopic];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div
      className={
        compact
          ? "flex flex-col overflow-hidden"
          : "panel grid overflow-hidden md:grid-cols-[18rem_1fr]"
      }
    >
      {!compact && (
        <aside className="border-b border-border p-6 md:border-b-0 md:border-e">
          <AuraVisualizer active={thinking} />
          <p className="mt-4 text-center font-display text-lg font-bold text-metal">{a.title}</p>
          <p className="text-center text-xs text-muted-foreground">{a.poweredBy}</p>
          <p className="mt-3 flex items-center justify-center gap-2 font-mono text-xs text-telemetry">
            <span className="h-2 w-2 rounded-full bg-telemetry glow-cyan" aria-hidden /> {a.status}
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">{a.local}</p>
        </aside>
      )}
      <div className={compact ? "flex min-h-0 flex-1 flex-col" : "flex min-h-[28rem] flex-col"}>
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label={a.title}
          className="flex-1 space-y-4 overflow-y-auto p-6"
          style={{ maxHeight: compact ? "min(50vh, 24rem)" : "28rem" }}
        >
          {msgs.map((m, i) => (
            <div key={i} className={m.from === "user" ? "flex justify-end" : "flex"}>
              <div
                className={
                  m.from === "user"
                    ? "max-w-[85%] rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                    : "max-w-[90%] border-s-2 border-telemetry ps-4 text-foreground"
                }
              >
                <p className="mb-1 font-mono text-[11px] uppercase tracking-widest opacity-80">
                  {m.from === "user" ? a.you : a.agentName}
                </p>
                <p className="leading-relaxed">{render(m)}</p>
              </div>
            </div>
          ))}
          {thinking && <p className="font-mono text-sm text-telemetry">▍▍▍</p>}
        </div>
        <div className="border-t border-border p-4">
          <p className="sr-only">{a.suggestionsLabel}</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {a.suggestions.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => ask(s.label, s.topic)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-telemetry hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <label htmlFor={compact ? "agent-input-fab" : "agent-input"} className="sr-only">
              {a.placeholder}
            </label>
            <input
              id={compact ? "agent-input-fab" : "agent-input"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={a.placeholder}
              className="min-h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden /> {a.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
