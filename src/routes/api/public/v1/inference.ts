import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { json, preflight } from "@/lib/ai/cors";

const Body = z.object({
  task: z.string().trim().min(1).max(4000),
  locale: z.string().max(20).optional(),
  consent: z.object({ granted: z.literal(true), scope: z.string().max(100).optional() }),
});

export const Route = createFileRoute("/api/public/v1/inference")({
  server: { handlers: {
    OPTIONS: async () => preflight(),
    POST: async ({ request }) => {
      let raw: unknown;
      try { raw = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
      const parsed = Body.safeParse(raw);
      if (!parsed.success) return json({ error: "invalid_request", detail: "task (1-4000 chars) and consent.granted=true are required." }, 400);
      const { generateAnswer, GatewayError } = await import("@/lib/ai/gateway.server");
      const { task, locale } = parsed.data;
      try {
        const output = await generateAnswer(task, `You are the PRSL-AI Core inference service. Answer concisely${locale ? ` in locale ${locale}` : ""}. Do not retain or request personal data.`, request.signal);
        return json({ version: "v1", output, retention: "none" });
      } catch (e) {
        const status = e instanceof GatewayError ? e.status : 502;
        return json({ error: "inference_failed", message: e instanceof Error ? e.message : "failed" }, status >= 400 ? status : 502);
      }
    },
  } },
});
