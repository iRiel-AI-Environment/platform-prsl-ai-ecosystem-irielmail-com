import type { AgentTopic, Messages } from "@/i18n/messages";

/** Picks the best-matching knowledge topic for a question, or null. Runs locally. */
export function matchTopic(question: string, keywords: Messages["agent"]["keywords"]): AgentTopic | null {
  const q = question.toLowerCase();
  let best: AgentTopic | null = null;
  let score = 0;
  for (const [topic, words] of Object.entries(keywords) as [AgentTopic, string[]][]) {
    const s = words.reduce((n, w) => (q.includes(w) ? n + w.length : n), 0);
    if (s > score) { score = s; best = topic; }
  }
  return best;
}
