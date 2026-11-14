# QwenCloud Chat Completions Adapter

**Implementation status:** Isolated adapter implementation; not registered, routed, or enabled for public inference.  
**Default model:** `qwen3.7-max`  
**Default endpoint:** Singapore (`ap-southeast-1`)

## Scope

This module implements a server-side transport client for QwenCloud's OpenAI-compatible Chat Completions endpoint. It is deliberately isolated from the public inference API, Agent PRSL-AI console, Intelligence Router, Capability Registry, Permission Manager, and any iRiel context source.

It does not establish a provider-neutral PRSL-AI canonical contract and does not authorize remote disclosure.

## Configuration

Construct the client only in a trusted server-side module:

```ts
import { QwenCloudChatClient } from "@/lib/providers/qwencloud/client";

const client = new QwenCloudChatClient({
  apiKey: process.env.QWENCLOUD_API_KEY ?? "",
  endpoint:
    process.env.QWENCLOUD_ENDPOINT ??
    "https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1/chat/completions",
  model: process.env.QWENCLOUD_MODEL ?? "qwen3.7-max",
  enableThinking: true,
  timeoutMs: 120_000,
});
```

Never expose `QWENCLOUD_API_KEY` to browser code, public variables, logs, source control, or client bundles. QwenCloud API keys are region-specific; select the endpoint matching the key's region. Do not assume the Singapore endpoint is appropriate for a key provisioned in another region.

## Streaming

`streamChat()` returns an async iterable of normalized events:

- `text`: user-facing text delta.
- `usage`: token usage metadata, when returned by the provider.
- `completed`: stream completion metadata.

The adapter intentionally discards QwenCloud's `reasoning_content`. It must not be forwarded to the user interface, persisted as conversation context, included in logs, or placed in an execution envelope.

The adapter does not retry requests. A retry after a partially consumed stream could duplicate work and provider charges. Retry policy belongs to a higher-level execution boundary and must be idempotency-aware.

## Explicit non-goals

- No public route or client-side provider call.
- No automatic provider selection or fallback.
- No registration as a dispatch-eligible capability.
- No identity, consent, policy, authorization, or routing decisions.
- No access to iRiel memory, profile, history, or personal context.
- No tool/function dispatch.
- No multimodal content.
- No persistence of prompts or responses.

## Validation

```bash
bun run test -- src/lib/providers/qwencloud/client.test.ts
bunx tsc --noEmit
bun run lint
bun run build
```

A passing adapter unit test proves only the tested transport behavior. It does not prove provider account access, regional availability, production authorization, disclosure consent, deployment, or end-to-end routing.
