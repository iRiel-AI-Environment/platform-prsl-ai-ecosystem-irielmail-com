import { describe, expect, it } from "vitest";
import { LOCALES, isRtl, matchLocale } from "@/i18n/locales";
import { messagesFor } from "@/i18n/messages";
import { matchTopic } from "@/lib/agent";

describe("Language Core", () => {
  it("registers exactly the 17 target locales", () => {
    expect(LOCALES.map((l) => l.code).sort()).toEqual(
      ["ar", "de-DE", "en-GB", "en-US", "es-419", "es-ES", "fr-FR", "hi-IN", "it-IT", "ja-JP", "ko-KR", "nl-NL", "pt-BR", "pt-PT", "ru-RU", "zh-CN", "zh-TW"],
    );
  });
  it("marks only Arabic as right-to-left", () => {
    expect(LOCALES.filter((l) => l.dir === "rtl").map((l) => l.code)).toEqual(["ar"]);
    expect(isRtl("ar")).toBe(true);
  });
  it("falls back pt-PT to pt-BR and other locales to en-US", () => {
    expect(messagesFor("pt-PT").nav.about).toBe("Sobre");
    expect(messagesFor("ja-JP").pages.about.sections).toEqual(messagesFor("en-US").pages.about.sections);
  });
  it("serves native interface text for every remaining locale", () => {
    expect(messagesFor("ja-JP").nav.about).toBe("概要");
    expect(messagesFor("fr-FR").nav.support).toBe("Assistance");
    expect(messagesFor("zh-CN").nav.home).toBe("首页");
    expect(messagesFor("ru-RU").pages.docs.title).toBe("Документация");
  });
  it("serves native interface text for es, ar and pt-PT", () => {
    expect(messagesFor("es-419").nav.about).toBe("Acerca de");
    expect(messagesFor("ar").nav.support).toBe("الدعم");
    expect(messagesFor("pt-PT").nav.contact).toBe("Contacto");
    expect(messagesFor("es-ES").pages.about.title).toBe(messagesFor("en-US").pages.about.title);
  });
  it("matches browser tags", () => {
    expect(matchLocale("pt")).toBe("pt-BR");
    expect(matchLocale("es-MX")).toBe("es-419");
  });
  it("agent routes an iRiel question to the distinction answer", () => {
    expect(matchTopic("How is iRiel different?", messagesFor("en-US").agent.keywords)).toBe("iriel");
  });
  it("provides a local-only response in all 17 locales", () => {
    for (const locale of LOCALES) {
      expect(messagesFor(locale.code).agent.localOnly.trim(), locale.code).not.toBe("");
    }
  });
  it("clearly states that contact and feedback submission is unavailable in every locale", () => {
    for (const locale of LOCALES) {
      expect(messagesFor(locale.code).form.unavailable.trim(), locale.code).not.toBe("");
    }
  });
});
