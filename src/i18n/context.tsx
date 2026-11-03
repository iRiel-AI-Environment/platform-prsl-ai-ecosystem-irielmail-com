import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, getLocale, matchLocale, type LocaleCode, type LocaleInfo } from "./locales";
import { messagesFor, type Messages } from "./messages";

interface Ctx {
  locale: LocaleInfo;
  t: Messages;
  setLocale: (c: LocaleCode) => void;
}

const I18nContext = createContext<Ctx | null>(null);
const KEY = "prsl-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    setCode(saved ? getLocale(saved).code : matchLocale(navigator.language || DEFAULT_LOCALE));
  }, []);

  const locale = getLocale(code);
  useEffect(() => {
    document.documentElement.lang = locale.code;
    document.documentElement.dir = locale.dir;
  }, [locale]);

  const setLocale = (c: LocaleCode) => {
    window.localStorage.setItem(KEY, c);
    setCode(c);
  };

  return (
    <I18nContext.Provider value={{ locale, t: messagesFor(code), setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
