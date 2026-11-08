import type { Messages } from "../messages";
import { fr, de, it, nl, ru, zhCN, zhTW, ja, ko, hi, enGB } from "./world";

type DeepPartial<T> = T extends (infer U)[] ? U[] : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
export type Override = DeepPartial<Messages>;

const es: Override = {
  nav: { home: "Inicio", about: "Acerca de", ecosystem: "Ecosistema", developers: "Desarrolladores", docs: "Docs", agent: "Agent PRSL-AI", support: "Soporte", contact: "Contacto" },
  skip: "Saltar al contenido principal",
  language: { label: "Idioma", rtl: "Derecha a izquierda", ltr: "Izquierda a derecha", script: "Escritura", fallback: "Traducción completa en curso — mostrando contenido en", complete: "Completo" },
  footer: {
    tagline: "Accesibilidad, inclusión y seguridad por defecto.",
    platform: "Plataforma", developers: "Desarrolladores", resources: "Recursos", legal: "Legal",
    about: "Acerca de", ecosystem: "Ecosistema", documentation: "Documentación", architecture: "Arquitectura", integrations: "Integraciones", devResources: "Recursos para desarrolladores",
    feedback: "Comentarios", support: "Soporte", contact: "Contacto", privacy: "Privacidad", security: "Seguridad", terms: "Términos de servicio",
    copyright: "Copyright © 2026 Robert Software Labs. Todos los derechos reservados.",
  },
  home: {
    title: "Accesibilidad, inclusión y seguridad por defecto.",
    manifesto: "Tu continuidad es tu derecho. La máquina se adapta a ti.",
    tagline: ["Privacidad por defecto", "Primero en el dispositivo", "Independiente de proveedores"],
    ctaPrimary: "Explorar el ecosistema", ctaSecondary: "Hablar con Agent PRSL-AI",
    manifestoTitle: "Manifiesto",
    manifestoBody: [
      "La tecnología nunca debe pedir a las personas que se hagan más pequeñas para encajar en ella. PRSL-AI nace de la convicción de que la inteligencia debe adaptarse al ser humano: a su idioma, capacidades, ritmo y contexto.",
      "Diseñamos para la continuidad: tu trabajo, memoria y preferencias te pertenecen y viajan contigo, sin depender de un único proveedor, modelo o nube.",
      "La accesibilidad no es una función. La inclusión no es un ajuste. La seguridad no es una mejora. Son el estado por defecto de todo lo que entregamos.",
    ],
    entitiesTitle: "Entidades principales", principlesTitle: "Principios arquitectónicos",
    dependencyTitle: "Inteligencia sin dependencia",
    dependencyLines: ["El modelo piensa.", "El agente ejecuta.", "El Router decide.", "iRiel orquesta."],
    crestTitle: "El escudo y emblema PRSL-AI",
    irielTitle: "iRiel — Entorno de Inteligencia Personal",
    agentTitle: "Agent PRSL-AI — Geometría sagrada y red de energía",
    geometry: ["Amplificación del aura", "Formación de galaxias", "Red de nodos de energía"],
  },
  agent: {
    eyebrow: "Embajador institucional del conocimiento", poweredBy: "Powered by Robert Software Labs",
    intro: "Pregunta sobre el ecosistema, el Router, iRiel, las iApps, los idiomas o nuestros principios arquitectónicos.",
    distinctionTitle: "Agent PRSL-AI no es iRiel",
    placeholder: "Pregunta a Agent PRSL-AI…", send: "Enviar", you: "Tú", suggestionsLabel: "Preguntas sugeridas",
  },
  form: { name: "Nombre", email: "Correo", category: "Categoría", message: "Mensaje", submit: "Enviar", thanks: "Gracias. Tu mensaje se registró en esta sesión. Para una respuesta inmediata, abre Agent PRSL-AI.", categories: ["Sugerencia", "Accesibilidad", "Informe de error", "Idioma / traducción", "Otro"], required: "Obligatorio" },
};

const ar: Override = {
  nav: { home: "نظرة عامة", about: "من نحن", ecosystem: "المنظومة", developers: "المطورون", docs: "التوثيق", agent: "Agent PRSL-AI", support: "الدعم", contact: "التواصل" },
  skip: "انتقل إلى المحتوى الرئيسي",
  language: { label: "اللغة", rtl: "من اليمين إلى اليسار", ltr: "من اليسار إلى اليمين", script: "نظام الكتابة", fallback: "الترجمة الكاملة قيد الإنجاز — يُعرض المحتوى بـ", complete: "مكتمل" },
  footer: {
    tagline: "إتاحة وشمول وأمان بشكل افتراضي.",
    platform: "المنصة", developers: "المطورون", resources: "الموارد", legal: "قانوني",
    about: "من نحن", ecosystem: "المنظومة", documentation: "التوثيق", architecture: "البنية", integrations: "التكاملات", devResources: "موارد المطورين",
    feedback: "الملاحظات", support: "الدعم", contact: "التواصل", privacy: "الخصوصية", security: "الأمان", terms: "شروط الخدمة",
    copyright: "حقوق النشر © 2026 Robert Software Labs. جميع الحقوق محفوظة.",
  },
  home: {
    title: "إتاحة وشمول وأمان بشكل افتراضي.",
    manifesto: "استمراريتك حقك. الآلة تتكيف معك.",
    tagline: ["الخصوصية افتراضيًا", "المعالجة على الجهاز أولًا", "مستقل عن المزوّدين"],
    ctaPrimary: "استكشف المنظومة", ctaSecondary: "تحدث مع Agent PRSL-AI",
    manifestoTitle: "البيان",
    manifestoBody: [
      "لا ينبغي للتقنية أن تطلب من الناس أن يصغروا ليتلاءموا معها. يقوم PRSL-AI على قناعة بأن الذكاء يجب أن يتكيف مع الإنسان: لغته وقدراته وإيقاعه وسياقه.",
      "نصمم من أجل الاستمرارية: عملك وذاكرتك وتفضيلاتك ملك لك وتنتقل معك، دون الاعتماد على مزوّد أو نموذج أو سحابة واحدة.",
      "الإتاحة ليست ميزة. الشمول ليس إعدادًا. الأمان ليس ترقية. إنها الحالة الافتراضية لكل ما نقدمه.",
    ],
    entitiesTitle: "الكيانات الأساسية", principlesTitle: "المبادئ المعمارية",
    dependencyTitle: "ذكاء بلا تبعية",
    dependencyLines: ["النموذج يفكر.", "الوكيل ينفذ.", "الموجّه يقرر.", "iRiel ينسّق."],
    crestTitle: "شعار ودرع PRSL-AI",
    irielTitle: "iRiel — بيئة الذكاء الشخصي",
    agentTitle: "Agent PRSL-AI — الهندسة المقدسة وشبكة الطاقة",
    geometry: ["تضخيم الهالة", "تشكّل المجرة", "شبكة مراكز الطاقة"],
  },
  agent: {
    eyebrow: "سفير المعرفة المؤسسية",
    intro: "اسأل عن المنظومة أو الموجّه أو iRiel أو iApps أو اللغات أو مبادئنا المعمارية.",
    distinctionTitle: "Agent PRSL-AI ليس iRiel",
    placeholder: "اسأل Agent PRSL-AI…", send: "إرسال", you: "أنت", suggestionsLabel: "أسئلة مقترحة",
  },
  form: { name: "الاسم", email: "البريد الإلكتروني", category: "الفئة", message: "الرسالة", submit: "إرسال", thanks: "شكرًا لك. تم تسجيل رسالتك في هذه الجلسة. للحصول على رد فوري، افتح Agent PRSL-AI.", categories: ["اقتراح", "الإتاحة", "بلاغ عن خطأ", "اللغة / الترجمة", "أخرى"], required: "مطلوب" },
};

const ptPT: Override = {
  nav: { contact: "Contacto" },
  skip: "Saltar para o conteúdo principal",
  footer: { contact: "Contacto", feedback: "Opinião", copyright: "Copyright © 2026 Robert Software Labs. Todos os direitos reservados." },
  home: { ctaSecondary: "Falar com o Agent PRSL-AI" },
  agent: { placeholder: "Pergunte ao Agent PRSL-AI…", you: "Você" },
  form: { email: "Correio eletrónico", thanks: "Obrigado. A sua mensagem foi registada nesta sessão. Para resposta imediata, abra o Agent PRSL-AI.", categories: ["Sugestão", "Acessibilidade", "Relato de erro", "Idioma / tradução", "Outro"] },
};

export const OVERRIDES: Partial<Record<string, Override>> = { "es-ES": es, "es-419": es, ar, "pt-PT": ptPT,
  "fr-FR": fr, "de-DE": de, "it-IT": it, "nl-NL": nl, "ru-RU": ru, "zh-CN": zhCN, "zh-TW": zhTW, "ja-JP": ja, "ko-KR": ko, "hi-IN": hi, "en-GB": enGB };

export function deepMerge<T>(base: T, over: unknown): T {
  if (!over || typeof over !== "object" || Array.isArray(over)) return (over ?? base) as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over)) out[k] = deepMerge(out[k], v);
  return out as T;
}
