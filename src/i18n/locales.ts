export type LocaleCode =
  | "en-US" | "en-GB" | "pt-BR" | "pt-PT" | "es-ES" | "es-419" | "fr-FR" | "de-DE" | "it-IT"
  | "zh-CN" | "zh-TW" | "ja-JP" | "ko-KR" | "ar" | "hi-IN" | "ru-RU" | "nl-NL";

export type Direction = "ltr" | "rtl";

export interface LocaleInfo {
  code: LocaleCode;
  nativeName: string;
  englishName: string;
  region: string;
  script: "Latn" | "Hans" | "Hant" | "Jpan" | "Kore" | "Arab" | "Deva" | "Cyrl";
  dir: Direction;
  /** Locale whose complete translations are used when this one has none. */
  fallback: "en-US" | "pt-BR";
  complete: boolean;
}

export const LOCALES: readonly LocaleInfo[] = [
  { code: "en-US", nativeName: "English", englishName: "English", region: "United States", script: "Latn", dir: "ltr", fallback: "en-US", complete: true },
  { code: "en-GB", nativeName: "English", englishName: "English", region: "United Kingdom", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
  { code: "pt-BR", nativeName: "Português", englishName: "Portuguese", region: "Brasil", script: "Latn", dir: "ltr", fallback: "pt-BR", complete: true },
  { code: "pt-PT", nativeName: "Português", englishName: "Portuguese", region: "Portugal", script: "Latn", dir: "ltr", fallback: "pt-BR", complete: false },
  { code: "es-ES", nativeName: "Español", englishName: "Spanish", region: "España", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
  { code: "es-419", nativeName: "Español", englishName: "Spanish", region: "Latinoamérica", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
  { code: "fr-FR", nativeName: "Français", englishName: "French", region: "France", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
  { code: "de-DE", nativeName: "Deutsch", englishName: "German", region: "Deutschland", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
  { code: "it-IT", nativeName: "Italiano", englishName: "Italian", region: "Italia", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
  { code: "zh-CN", nativeName: "简体中文", englishName: "Chinese (Simplified)", region: "中国", script: "Hans", dir: "ltr", fallback: "en-US", complete: false },
  { code: "zh-TW", nativeName: "繁體中文", englishName: "Chinese (Traditional)", region: "台灣", script: "Hant", dir: "ltr", fallback: "en-US", complete: false },
  { code: "ja-JP", nativeName: "日本語", englishName: "Japanese", region: "日本", script: "Jpan", dir: "ltr", fallback: "en-US", complete: false },
  { code: "ko-KR", nativeName: "한국어", englishName: "Korean", region: "대한민국", script: "Kore", dir: "ltr", fallback: "en-US", complete: false },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", region: "عالمي", script: "Arab", dir: "rtl", fallback: "en-US", complete: false },
  { code: "hi-IN", nativeName: "हिन्दी", englishName: "Hindi", region: "भारत", script: "Deva", dir: "ltr", fallback: "en-US", complete: false },
  { code: "ru-RU", nativeName: "Русский", englishName: "Russian", region: "Россия", script: "Cyrl", dir: "ltr", fallback: "en-US", complete: false },
  { code: "nl-NL", nativeName: "Nederlands", englishName: "Dutch", region: "Nederland", script: "Latn", dir: "ltr", fallback: "en-US", complete: false },
] as const;

export const DEFAULT_LOCALE: LocaleCode = "en-US";

export function getLocale(code: string | null | undefined): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isRtl(code: LocaleCode): boolean {
  return getLocale(code).dir === "rtl";
}

/** Best match for a browser language tag such as "pt", "pt-BR" or "es-MX". */
export function matchLocale(tag: string): LocaleCode {
  const exact = LOCALES.find((l) => l.code.toLowerCase() === tag.toLowerCase());
  if (exact) return exact.code;
  const lang = tag.split("-")[0].toLowerCase();
  if (lang === "es" && !/^es-es$/i.test(tag)) return "es-419";
  const byLang = LOCALES.find((l) => l.code.split("-")[0].toLowerCase() === lang);
  return byLang?.code ?? DEFAULT_LOCALE;
}
