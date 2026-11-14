/**
 * QwenCloud Chat Completions transport types.
 *
 * These are adapter-local wire types, not a replacement for PRSL-AI canonical
 * capability, routing, authorization, or execution contracts.
 */

export type QwenCloudMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type QwenCloudChatRequest = {
  messages: QwenCloudMessage[];
  maxCompletionTokens?: number;
  temperature?: number;
};

export type QwenCloudUsage = {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
};

export type QwenCloudStreamEvent =
  | { type: "text"; text: string }
  | { type: "usage"; usage: QwenCloudUsage }
  | {
      type: "completed";
      model?: string;
      finishReason?: string | null;
    };

export type QwenCloudClientOptions = {
  apiKey: string;
  endpoint?: string;
  model?: string;
  enableThinking: boolean;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

export type QwenCloudErrorCode =
  | "invalid_configuration"
  | "request_aborted"
  | "request_timeout"
  | "provider_http_error"
  | "missing_stream"
  | "invalid_stream_payload";

export class QwenCloudError extends Error {
  readonly code: QwenCloudErrorCode;
  readonly status?: number;

  constructor(
    code: QwenCloudErrorCode,
    message: string,
    status?: number,
  ) {
    super(message);
    this.name = "QwenCloudError";
    this.code = code;
    if (status !== undefined) this.status = status;
  }
}
