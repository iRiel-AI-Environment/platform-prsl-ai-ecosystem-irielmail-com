import { createFileRoute } from "@tanstack/react-router";
import { json, preflight } from "@/lib/ai/cors";
import { LOCALES } from "@/i18n/locales";

export const Route = createFileRoute("/api/public/v1/capabilities")({
  server: {
    handlers: {
      OPTIONS: async () => preflight(),
      GET: async () =>
        json({
          version: "v1",
          capabilities: [
            {
              id: "prsl.language.core",
              kind: "language",
              status: "available",
              note: "Locale registry is available; translation completeness varies by locale.",
            },
            {
              id: "prsl.inference.text",
              kind: "inference",
              status: "not_enabled",
              requires: [
                "provider-neutral adapter",
                "policy approval",
                "trusted remote-disclosure authorization",
                "server-side abuse controls",
              ],
              routing: "disabled",
            },
          ],
          languages: LOCALES.map((l) => ({
            code: l.code,
            nativeName: l.nativeName,
            region: l.region,
            script: l.script,
            dir: l.dir,
            complete: l.complete,
            fallback: l.fallback,
          })),
        }),
    },
  },
});
