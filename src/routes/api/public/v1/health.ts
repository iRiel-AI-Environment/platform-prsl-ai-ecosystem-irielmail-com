import { createFileRoute } from "@tanstack/react-router";
import { json, preflight } from "@/lib/ai/cors";

export const Route = createFileRoute("/api/public/v1/health")({
  server: { handlers: {
    OPTIONS: async () => preflight(),
    GET: async () => json({ status: "ok", service: "prsl-ai-core", version: "v1", timestamp: new Date().toISOString() }),
  } },
});
