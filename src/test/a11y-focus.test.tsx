import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/i18n/context";
import { AgentFab } from "@/components/site/AgentFab";
import { LanguageSelector } from "@/components/site/LanguageSelector";

describe("WCAG focus management", () => {
  it("Agent panel moves focus inside and returns it to the button on Escape", () => {
    render(
      <I18nProvider>
        <AgentFab />
      </I18nProvider>,
    );
    const trigger = screen.getByRole("button", { expanded: false });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.contains(document.activeElement)).toBe(true);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("Language list supports arrow keys and Escape returns focus", () => {
    render(
      <I18nProvider>
        <LanguageSelector />
      </I18nProvider>,
    );
    const trigger = screen.getByRole("button", { expanded: false });
    fireEvent.click(trigger);
    const first = document.activeElement as HTMLElement;
    expect(first.tagName).toBe("BUTTON");
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(document.activeElement).not.toBe(first);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
  });
});
