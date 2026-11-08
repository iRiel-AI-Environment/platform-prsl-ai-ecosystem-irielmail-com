import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { I18nProvider } from "@/i18n/context";
import { AgentConsole } from "@/components/site/AgentConsole";

function renderConsole() {
  return render(
    <I18nProvider>
      <AgentConsole />
    </I18nProvider>,
  );
}

describe("Agent local-only Q&A", () => {
  it("does not send unmatched questions to a remote provider", () => {
    renderConsole();

    fireEvent.change(screen.getByPlaceholderText("Ask Agent PRSL-AI…"), {
      target: { value: "Tell me a bedtime story" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(
      screen.getByText(
        "No information was sent. I can answer only from the local knowledge topics available in this session.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /remote AI/i })).not.toBeInTheDocument();
  });
});
