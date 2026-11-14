import {
  QwenCloudError,
  type QwenCloudChatRequest,
  type QwenCloudClientOptions,
  type QwenCloudStreamEvent,
  type QwenCloudUsage,
} from "./types";

const DEFAULT_ENDPOINT =
  "https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1/chat/completions";
const DEFAULT_MODEL = "qwen3.7-max";
const DEFAULT_TIMEOUT_MS = 120_000;

type WireChunk = {
  model?: unknown;
  choices?: Array<{
    delta?: {
      content?: unknown;
      reasoning_content?: unknown;
    };
    finish_reason?: unknown;
  }>;
  usage?: {
    prompt_tokens?: unknown;
    completion_tokens?: unknown;
    total_tokens?: unknown;
  };
  error?: unknown;
};

function toOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function normalizeUsage(value: WireChunk["usage"]): QwenCloudUsage | null {
  if (!value) return null;
  const usage: QwenCloudUsage = {};
  const promptTokens = toOptionalNumber(value.prompt_tokens);
  const completionTokens = toOptionalNumber(value.completion_tokens);
  const totalTokens = toOptionalNumber(value.total_tokens);

  if (promptTokens !== undefined) usage.promptTokens = promptTokens;
  if (completionTokens !== undefined) usage.completionTokens = completionTokens;
  if (totalTokens !== undefined) usage.totalTokens = totalTokens;

  return Object.keys(usage).length > 0 ? usage : null;
}

/** Parses SSE data fields, including events split across network chunks. */
export async function* parseSseData(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const takeData = (block: string): string | null => {
    const lines = block.split(/\r\n|\n|\r/);
    const data = lines
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).replace(/^ /, ""));
    return data.length > 0 ? data.join("\n") : null;
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });

      while (true) {
        const separator = /\r\n\r\n|\n\n|\r\r/.exec(buffer);
        if (!separator || separator.index === undefined) break;
        const block = buffer.slice(0, separator.index);
        buffer = buffer.slice(separator.index + separator[0].length);
        const data = takeData(block);
        if (data !== null) yield data;
      }

      if (done) {
        if (buffer.length > 0) {
          const data = takeData(buffer);
          if (data !== null) yield data;
        }
        break;
      }
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      // The stream may already be closed or errored.
    }
    reader.releaseLock();
  }
}

/**
 * Server-side QwenCloud transport adapter.
 *
 * The adapter intentionally exposes only user-facing text and usage metadata.
 * Provider reasoning_content is discarded and must never enter UI, logs,
 * persisted context, or downstream execution envelopes.
 */
export class QwenCloudChatClient {
  private readonly apiKey: string;
  private readonly endpoint: string;
  private readonly model: string;
  private readonly enableThinking: boolean;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(options: QwenCloudClientOptions) {
    if (typeof window !== "undefined") {
      throw new QwenCloudError(
        "invalid_configuration",
        "QwenCloud client is server-side only.",
      );
    }
    if (!options.apiKey.trim()) {
      throw new QwenCloudError(
        "invalid_configuration",
        "QwenCloud API key is required.",
      );
    }

    this.apiKey = options.apiKey.trim();
    this.endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
    this.model = options.model ?? DEFAULT_MODEL;
    this.enableThinking = options.enableThinking;

    let endpointUrl: URL;
    try {
      endpointUrl = new URL(this.endpoint);
    } catch {
      throw new QwenCloudError(
        "invalid_configuration",
        "QwenCloud endpoint must be a valid HTTPS URL.",
      );
    }
    if (endpointUrl.protocol !== "https:" || !this.model.trim()) {
      throw new QwenCloudError(
        "invalid_configuration",
        "QwenCloud endpoint must use HTTPS and model must be non-empty.",
      );
    }
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.fetchImpl = options.fetchImpl ?? fetch;

    if (!Number.isInteger(this.timeoutMs) || this.timeoutMs <= 0) {
      throw new QwenCloudError(
        "invalid_configuration",
        "timeoutMs must be a positive integer.",
      );
    }
  }

  async *streamChat(
    request: QwenCloudChatRequest,
    signal?: AbortSignal,
  ): AsyncGenerator<QwenCloudStreamEvent> {
    if (request.messages.length === 0) {
      throw new QwenCloudError(
        "invalid_configuration",
        "At least one chat message is required.",
      );
    }
    if (
      request.maxCompletionTokens !== undefined &&
      (!Number.isInteger(request.maxCompletionTokens) ||
        request.maxCompletionTokens <= 0)
    ) {
      throw new QwenCloudError(
        "invalid_configuration",
        "maxCompletionTokens must be a positive integer.",
      );
    }
    if (
      request.temperature !== undefined &&
      (!Number.isFinite(request.temperature) ||
        request.temperature < 0 ||
        request.temperature > 2)
    ) {
      throw new QwenCloudError(
        "invalid_configuration",
        "temperature must be between 0 and 2.",
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort(new QwenCloudError(
        "request_timeout",
        "QwenCloud request timed out.",
      ));
    }, this.timeoutMs);

    const abortFromCaller = () => controller.abort(signal?.reason);
    signal?.addEventListener("abort", abortFromCaller, { once: true });
    if (signal?.aborted) abortFromCaller();

    try {
      const response = await this.fetchImpl(this.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          model: this.model,
          messages: request.messages,
          stream: true,
          stream_options: { include_usage: true },
          enable_thinking: this.enableThinking,
          ...(request.maxCompletionTokens !== undefined
            ? { max_completion_tokens: request.maxCompletionTokens }
            : {}),
          ...(request.temperature !== undefined
            ? { temperature: request.temperature }
            : {}),
        }),
        signal: controller.signal,
        redirect: "error",
      });

      if (!response.ok) {
        throw new QwenCloudError(
          "provider_http_error",
          `QwenCloud returned HTTP ${response.status}.`,
          response.status,
        );
      }
      if (!response.body) {
        throw new QwenCloudError(
          "missing_stream",
          "QwenCloud returned no streaming response body.",
        );
      }

      let model: string | undefined;
      let finishReason: string | null | undefined;
      let sawDone = false;

      for await (const data of parseSseData(response.body)) {
        if (data === "[DONE]") {
          sawDone = true;
          break;
        }

        let chunk: WireChunk;
        try {
          chunk = JSON.parse(data) as WireChunk;
        } catch {
          throw new QwenCloudError(
            "invalid_stream_payload",
            "QwenCloud returned an invalid SSE JSON payload.",
          );
        }

        if (chunk.error !== undefined) {
          throw new QwenCloudError(
            "invalid_stream_payload",
            "QwenCloud returned an error event during streaming.",
          );
        }
        if (typeof chunk.model === "string") model = chunk.model;

        const choice = chunk.choices?.[0];
        if (typeof choice?.finish_reason === "string" ||
            choice?.finish_reason === null) {
          finishReason = choice.finish_reason;
        }

        // Deliberately ignore choice.delta.reasoning_content.
        if (typeof choice?.delta?.content === "string" &&
            choice.delta.content.length > 0) {
          yield { type: "text", text: choice.delta.content };
        }

        const usage = normalizeUsage(chunk.usage);
        if (usage) yield { type: "usage", usage };
      }

      if (!sawDone) {
        throw new QwenCloudError(
          "invalid_stream_payload",
          "QwenCloud stream ended before the completion marker.",
        );
      }

      yield {
        type: "completed",
        ...(model ? { model } : {}),
        ...(finishReason !== undefined ? { finishReason } : {}),
      };
    } catch (error) {
      if (controller.signal.aborted) {
        const reason = controller.signal.reason;
        if (reason instanceof QwenCloudError) throw reason;
        if (signal?.aborted) {
          throw new QwenCloudError(
            "request_aborted",
            "QwenCloud request was cancelled.",
          );
        }
        throw new QwenCloudError(
          "request_timeout",
          "QwenCloud request timed out.",
        );
      }
      throw error;
    } finally {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abortFromCaller);
    }
  }
}
