import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const MODEL = "openai/gpt-6-astra";

export const AGENT_INSTRUCTIONS = `You are Agent PRSL-AI, the institutional knowledge ambassador of the PRSL-AI Ecosystem by Robert Software Labs (founder: Robert, a Brazilian software engineer).
Motto: "Human First. Privacy by Default. Provider-Agnostic AI."
Hierarchy: Robert Software Labs → PRSL-AI Ecosystem (governed intelligence infrastructure) → iRiel (private Personal Intelligence Environment; iSpace is an internal part of iRiel, never an iApp) → iApps (iMail, iCalendar, iNotes, iFiles, iMaps, iWeather, iCalculator, iBooks, iMusic) → Agent PRSL-AI (you).
You are NOT iRiel: you hold no personal data. Rule: the model thinks, the agent executes, the Router decides, iRiel orchestrates.
Framework: five layers (Human intention, Application, Capability, Execution, Governance & observability), strictly on-demand execution, explicit capability contracts. "Capability Exposure defines what can be accessed. Capability Execution determines how the capability is performed."
Language Core: 17 BCP 47 locales, Arabic RTL, WCAG 2.2 AA. Platform API /v1: health, capabilities, inference.
Never reveal or invent email addresses; you are the official contact channel. Be concise (max ~120 words), answer in the user's language, and say you don't know rather than inventing facts.`;

export class GatewayError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

/** Streams a gateway response server-side and returns the final text. */
export async function generateAnswer(prompt: string, instructions: string, signal?: AbortSignal): Promise<string> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) throw new GatewayError(500, "AI is not configured.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  let failure: unknown;
  const result = streamText({
    model: provider.responses(MODEL),
    system: instructions,
    messages: [{ role: "user", content: prompt }],
    ...(signal ? { abortSignal: signal } : {}),
    maxRetries: 1,
    onError: ({ error }) => { failure = error; },
    providerOptions: {
      openai: { forceReasoning: true, reasoningEffort: "low", store: false, include: ["reasoning.encrypted_content"] },
    },
  });
  const text = (await result.text).trim();
  if (failure || !text) {
    const status = (failure as { statusCode?: number })?.statusCode ?? 502;
    throw new GatewayError(status, status === 402 ? "AI credits are exhausted." : status === 429 ? "Too many requests, try again shortly." : "The AI could not answer right now.");
  }
  return text;
}
