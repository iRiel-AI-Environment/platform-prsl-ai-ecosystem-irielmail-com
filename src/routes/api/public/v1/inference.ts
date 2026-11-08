import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/v1/inference")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: { Allow: "POST, OPTIONS", "Cache-Control": "no-store" },
        }),
      POST: async () =>
        Response.json(
          {
            error: "inference_unavailable",
            status: "not_enabled",
            message:
              "Remote inference is not enabled. No request is forwarded to an external model or provider.",
          },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        ),
    },
  },
});
