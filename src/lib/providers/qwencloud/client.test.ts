// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { QwenCloudChatClient, parseSseData } from "./client";
import { QwenCloudError } from "./types";

function streamFrom(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let index = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[index++]));
    },
  });
}

describe("parseSseData", () => {
  it("reassembles events split across transport chunks", async () => {
    const values: string[] = [];
    for await (const value of parseSseData(streamFrom([
      "data: {\"choices\":",
      "[{\"delta\":{\"content\":\"Hi\"}}]}\r",
      "\n\r\ndata: [DONE]\n\n",
    ]))) {
      values.push(value);
    }

    expect(values).toEqual([
      "{\"choices\":[{\"delta\":{\"content\":\"Hi\"}}]}",
      "[DONE]",
    ]);
  });
});

describe("QwenCloudChatClient", () => {
  it("streams visible text and usage but never exposes reasoning_content", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(streamFrom([
        'data: {"model":"qwen3.7-max","choices":[{"delta":{"reasoning_content":"private reasoning","content":"Hello"}}]}\n\n',
        'data: {"choices":[{"delta":{"content":" world"},"finish_reason":"stop"}]}\n\n',
        'data: {"choices":[],"usage":{"prompt_tokens":4,"completion_tokens":2,"total_tokens":6}}\n\n',
        "data: [DONE]\n\n",
      ]), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }),
    );

    const client = new QwenCloudChatClient({
      apiKey: "test-key",
      enableThinking: true,
      fetchImpl,
    });

    const events = [];
    for await (const event of client.streamChat({
      messages: [{ role: "user", content: "Hello" }],
    })) {
      events.push(event);
    }

    expect(events).toEqual([
      { type: "text", text: "Hello" },
      { type: "text", text: " world" },
      {
        type: "usage",
        usage: { promptTokens: 4, completionTokens: 2, totalTokens: 6 },
      },
      {
        type: "completed",
        model: "qwen3.7-max",
        finishReason: "stop",
      },
    ]);
    expect(JSON.stringify(events)).not.toContain("private reasoning");

    const [, init] = fetchImpl.mock.calls[0] ?? [];
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer test-key",
      Accept: "text/event-stream",
    });
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    expect(body).toMatchObject({
      model: "qwen3.7-max",
      stream: true,
      enable_thinking: true,
      stream_options: { include_usage: true },
    });
  });

  it("does not retry or leak provider response bodies on HTTP errors", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response("secret provider diagnostic", { status: 401 }),
    );
    const client = new QwenCloudChatClient({
      apiKey: "test-key",
      enableThinking: true,
      fetchImpl,
    });

    await expect(async () => {
      for await (const _event of client.streamChat({
        messages: [{ role: "user", content: "Hello" }],
      })) {
        // Consume the stream.
      }
    }).rejects.toMatchObject({
      code: "provider_http_error",
      status: 401,
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });


  it("rejects a stream that closes before the completion marker", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(streamFrom([
        'data: {"choices":[{"delta":{"content":"partial"}}]}\n\n',
      ]), { status: 200 }),
    );
    const client = new QwenCloudChatClient({
      apiKey: "test-key",
      enableThinking: true,
      fetchImpl,
    });

    await expect(async () => {
      for await (const _event of client.streamChat({
        messages: [{ role: "user", content: "Hello" }],
      })) {
        // Consume the stream.
      }
    }).rejects.toMatchObject({ code: "invalid_stream_payload" });
  });

  it("rejects an insecure provider endpoint", () => {
    expect(() => new QwenCloudChatClient({
      apiKey: "test-key",
      endpoint: "http://example.invalid/chat/completions",
      enableThinking: true,
    })).toThrow(QwenCloudError);
  });

  it("rejects HTTPS endpoints outside the QwenCloud MaaS domain", () => {
    expect(() => new QwenCloudChatClient({
      apiKey: "test-key",
      endpoint: "https://attacker.example/chat/completions",
      enableThinking: true,
    })).toThrow(QwenCloudError);
  });

  it("rejects empty message lists before making a network request", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    const client = new QwenCloudChatClient({
      apiKey: "test-key",
      enableThinking: true,
      fetchImpl,
    });

    await expect(async () => {
      for await (const _event of client.streamChat({ messages: [] })) {
        // Consume the stream.
      }
    }).rejects.toBeInstanceOf(QwenCloudError);

    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
