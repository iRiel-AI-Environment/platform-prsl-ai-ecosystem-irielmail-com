import { getLocale, type LocaleCode } from "./locales";

export type PageKey =
  | "about" | "ecosystem" | "iriel" | "iapps" | "developers" | "docs"
  | "privacy" | "security" | "support" | "feedback" | "terms" | "contact";

export interface Section { id?: string; h: string; body?: string[]; items?: string[] }
export interface PageContent { eyebrow: string; title: string; intro: string; sections: Section[] }
export type AgentTopic = "ecosystem" | "routing" | "iriel" | "principles" | "privacy" | "languages" | "iapps" | "contact";

export interface Messages {
  nav: Record<"home" | "about" | "ecosystem" | "developers" | "docs" | "agent" | "support" | "contact", string>;
  skip: string;
  language: { label: string; rtl: string; ltr: string; script: string; fallback: string; complete: string };
  footer: {
    tagline: string;
    platform: string; developers: string; resources: string; legal: string;
    about: string; ecosystem: string; iriel: string; iapps: string;
    documentation: string; architecture: string; integrations: string; devResources: string;
    feedback: string; support: string; contact: string;
    privacy: string; security: string; terms: string;
    copyright: string;
  };
  home: {
    eyebrow: string; title: string; manifesto: string; tagline: string[]; ctaPrimary: string; ctaSecondary: string;
    manifestoTitle: string; manifestoBody: string[];
    entitiesTitle: string; entities: { name: string; role: string; desc: string }[];
    principlesTitle: string; principles: { h: string; p: string }[];
    dependencyTitle: string; dependencyLines: string[]; dependencyBody: string;
    crestTitle: string; crestBody: string;
    irielTitle: string; irielBody: string;
    agentTitle: string; agentBody: string; geometry: string[];
  };
  agent: {
    eyebrow: string; title: string; poweredBy: string; intro: string; distinctionTitle: string; distinction: string[];
    placeholder: string; send: string; you: string; agentName: string; suggestionsLabel: string;
    status: string; local: string;
    greeting: string; fallback: string;
    suggestions: { label: string; topic: AgentTopic }[];
    keywords: Record<AgentTopic, string[]>;
    answers: Record<AgentTopic, string>;
  };
  pages: Record<PageKey, PageContent>;
  form: { name: string; email: string; category: string; message: string; submit: string; thanks: string; categories: string[]; required: string };
}

const en: Messages = {
  nav: { home: "Overview", about: "About", ecosystem: "Ecosystem", developers: "Developers", docs: "Docs", agent: "Agent PRSL-AI", support: "Support", contact: "Contact" },
  skip: "Skip to main content",
  language: { label: "Language", rtl: "Right-to-left", ltr: "Left-to-right", script: "Script", fallback: "Full translation in progress — showing content in", complete: "Complete" },
  footer: {
    tagline: "Accessibility, Inclusion, and Security by Default.",
    platform: "Platform", developers: "Developers", resources: "Resources", legal: "Legal",
    about: "About", ecosystem: "Ecosystem", iriel: "iRiel", iapps: "iApps",
    documentation: "Documentation", architecture: "Architecture", integrations: "Integrations", devResources: "Developer Resources",
    feedback: "Feedback", support: "Support", contact: "Contact",
    privacy: "Privacy", security: "Security", terms: "Terms of Service",
    copyright: "Copyright © 2026 Robert Software Labs. All rights reserved.",
  },
  home: {
    eyebrow: "PRSL-AI Ecosystem · By Robert Software Labs",
    title: "Accessibility, Inclusion, and Security by Default.",
    manifesto: "Your continuity is your right. The machine adapts to you.",
    tagline: ["Privacy by default", "On-device first", "Provider-agnostic"],
    ctaPrimary: "Explore the Ecosystem",
    ctaSecondary: "Talk to Agent PRSL-AI",
    manifestoTitle: "Manifesto",
    manifestoBody: [
      "Technology should never ask people to become smaller to fit it. PRSL-AI is built on the conviction that intelligence must adapt to the human — to their language, abilities, rhythm and context — not the other way around.",
      "We design for continuity: your work, memory and preferences belong to you and travel with you, independent of any single vendor, model or cloud.",
      "Accessibility is not a feature. Inclusion is not a setting. Security is not an upgrade. They are the default state of everything we ship.",
    ],
    entitiesTitle: "Core Entities",
    entities: [
      { name: "PRSL-AI Core", role: "Foundation", desc: "The architectural kernel: Language Core, Router, policy engine and secure local runtime that every product is built on." },
      { name: "iRiel PIE", role: "Personal Intelligence Environment", desc: "Your private environment where personal intelligence lives, remembers and orchestrates — on your device, under your control." },
      { name: "iApps", role: "Modular Family", desc: "Focused, interoperable applications — mail, notes, calendar, files — that plug into iRiel and share one accessible design language." },
      { name: "Agent PRSL-AI", role: "Institutional Ambassador", desc: "The public knowledge agent that explains the ecosystem, its architecture and principles to anyone who asks." },
    ],
    principlesTitle: "Architectural Principles",
    principles: [
      { h: "Local-first execution", p: "Processing happens on-device whenever possible. The cloud is optional, never required." },
      { h: "Provider agnosticism", p: "No lock-in to a single model or vendor. Models are interchangeable components." },
      { h: "Accessible by construction", p: "WCAG 2.2 AA is the floor. Every interface works with keyboard, screen reader and voice." },
      { h: "Language as infrastructure", p: "17 locales, RTL scripts and regional variants are structural, not translated afterthoughts." },
      { h: "Explicit consent", p: "No data leaves your device without a clear, revocable, human decision." },
      { h: "Continuity", p: "Your context survives model changes, device changes and provider changes." },
    ],
    dependencyTitle: "Intelligence Without Dependency",
    dependencyLines: ["The model thinks.", "The agent executes.", "The Router decides.", "iRiel orchestrates."],
    dependencyBody: "Each role is separated by design. Models are reasoning engines that can be swapped. Agents act within explicit permissions. The Router chooses where each task runs — locally or remotely — by policy. iRiel coordinates it all on your behalf.",
    crestTitle: "The PRSL-AI Crest & Shield",
    crestBody: "Forged in brushed emerald metal, the shield carries the interlocked PRSL monogram — a symbol of protection, privacy by default and on-device first.",
    irielTitle: "iRiel — Personal Intelligence Environment",
    irielBody: "The emerald energy orb is iRiel's presence: calm, always available, never intrusive. Ask, search and orchestrate across your iApps on phone, tablet and desktop.",
    agentTitle: "Agent PRSL-AI — Sacred Geometry & Energy Network",
    agentBody: "Aura amplification, galaxy formation and the energy hub network visualize how Agent PRSL-AI connects knowledge across the ecosystem.",
    geometry: ["Aura Amplification", "Galaxy Formation", "Energy Hub Network"],
  },
  agent: {
    eyebrow: "Institutional Knowledge Ambassador",
    title: "Agent PRSL-AI",
    poweredBy: "Powered by Robert Software Labs",
    intro: "Ask about the ecosystem, the Router, iRiel, iApps, languages or our architectural principles.",
    distinctionTitle: "Agent PRSL-AI is not iRiel",
    distinction: [
      "Agent PRSL-AI is the public, institutional ambassador. It explains how the ecosystem works and holds no personal data about you.",
      "iRiel is your Personal Intelligence Environment — private, on your device, orchestrating your own context and iApps.",
    ],
    placeholder: "Ask Agent PRSL-AI…",
    send: "Send",
    you: "You",
    agentName: "Agent PRSL-AI",
    suggestionsLabel: "Suggested questions",
    status: "Online · Knowledge base v1",
    local: "Runs entirely in your browser. Nothing you type is sent anywhere.",
    greeting: "Hello. I am Agent PRSL-AI, the institutional ambassador of the PRSL-AI Ecosystem. How can I help you understand it?",
    fallback: "I'm specialized in the PRSL-AI Ecosystem. Try asking about the Router, iRiel, iApps, privacy, languages or the architectural principles.",
    suggestions: [
      { label: "What is the PRSL-AI Ecosystem?", topic: "ecosystem" },
      { label: "How does the Router decide?", topic: "routing" },
      { label: "How are you different from iRiel?", topic: "iriel" },
      { label: "What are the architectural principles?", topic: "principles" },
      { label: "Which languages are supported?", topic: "languages" },
    ],
    keywords: {
      ecosystem: ["ecosystem", "what is", "prsl", "core", "overview"],
      routing: ["router", "route", "routing", "decide", "model"],
      iriel: ["iriel", "different", "difference", "personal", "pie"],
      principles: ["principle", "architecture", "design", "dependency"],
      privacy: ["privacy", "data", "security", "local", "device"],
      languages: ["language", "locale", "rtl", "arabic", "translation", "i18n"],
      iapps: ["iapps", "apps", "mail", "calendar", "notes"],
      contact: ["contact", "email", "robert", "founder", "team"],
    },
    answers: {
      ecosystem: "The PRSL-AI Ecosystem is an accessible, privacy-first intelligence platform by Robert Software Labs. It has four core entities: PRSL-AI Core (the foundation), iRiel (your Personal Intelligence Environment), iApps (the modular application family) and me, Agent PRSL-AI (the institutional ambassador).",
      routing: "The Router is the decision layer. For each task it evaluates policy, sensitivity, capability and cost, then decides where it runs — on-device first, remote only with consent. In short: the model thinks, the agent executes, the Router decides, and iRiel orchestrates.",
      iriel: "I am the public ambassador: I explain the ecosystem and hold no personal data. iRiel is your private Personal Intelligence Environment — it lives on your device, remembers your context and orchestrates your iApps on your behalf.",
      principles: "Six principles guide every decision: local-first execution, provider agnosticism, accessibility by construction (WCAG 2.2 AA), language as infrastructure, explicit consent, and continuity of your context across models, devices and providers.",
      privacy: "Privacy by Default: processing happens on-device whenever possible, and no data is transmitted without explicit, revocable consent. Security by Default means encrypted storage, least-privilege agents and a public vulnerability disclosure process.",
      languages: "The Language Core ships a typed BCP 47 registry with 17 locales: en-US, en-GB, pt-BR, pt-PT, es-ES, es-419, fr-FR, de-DE, it-IT, zh-CN, zh-TW, ja-JP, ko-KR, ar (right-to-left), hi-IN, ru-RU and nl-NL. en-US and pt-BR are complete; others fall back gracefully.",
      iapps: "iApps are focused modular applications — such as mail, notes, calendar and files — that share one accessible design language and plug into iRiel for orchestration.",
      contact: "Robert Software Labs was founded by Robert, a Brazilian software engineer. For any question, talk to Agent PRSL-AI, the official guide of the platform.",
    },
  },
  form: { name: "Name", email: "Email", category: "Category", message: "Message", submit: "Send", thanks: "Thank you. Your message was received in this session. For a direct answer, open Agent PRSL-AI.", categories: ["Suggestion", "Accessibility", "Bug report", "Language / translation", "Other"], required: "Required" },
  pages: {
    about: {
      eyebrow: "About", title: "Robert Software Labs",
      intro: "An independent software lab building accessible, human-centered and secure intelligence.",
      sections: [
        { h: "Origin", body: ["Robert Software Labs began with a simple frustration: powerful technology that excluded the people who needed it most. The lab was founded to prove that advanced intelligence can be inclusive, private and dependable at the same time."] },
        { h: "Vision", body: ["A world where every person has a continuous, private intelligence that adapts to them — regardless of language, ability, device or provider."] },
        { h: "Mission", body: ["Build the PRSL-AI Ecosystem with accessibility, inclusion and security by default, and keep people in control of their own continuity."] },
        { h: "Founder", body: ["Robert is a Brazilian software engineer and the founder of Robert Software Labs. He leads the architecture of PRSL-AI Core, iRiel and the iApps family, with a focus on accessibility and multilingual design."] },
      ],
    },
    ecosystem: {
      eyebrow: "Ecosystem", title: "The PRSL-AI Architecture",
      intro: "A layered system where each part has one clear responsibility.",
      sections: [
        { id: "core", h: "PRSL-AI Core", body: ["The foundation: Language Core, Router, policy engine, secure storage and local runtime."], items: ["Language Core — typed BCP 47 registry and RTL support", "Router — policy-based task placement", "Policy engine — consent and permission enforcement", "Local runtime — on-device model execution"] },
        { id: "iriel", h: "iRiel — Personal Intelligence Environment", body: ["iRiel is where your personal intelligence lives. It keeps your context, memory and preferences on your device and orchestrates agents and iApps for you."] },
        { id: "iapps", h: "iApps — Modular Family", body: ["Independent applications that each do one thing well and share a single accessible interface language."], items: ["iMail", "iNotes", "iCalendar", "iFiles", "iSpace"] },
        { h: "Agent PRSL-AI", body: ["The public institutional agent that explains the ecosystem. It does not access personal data."] },
      ],
    },
    iriel: {
      eyebrow: "Platform", title: "iRiel",
      intro: "Your Personal Intelligence Environment — private, continuous and yours.",
      sections: [
        { h: "What iRiel does", items: ["Ask or search across all your iApps", "Remember context with your permission", "Orchestrate agents to complete tasks", "Adapt to your language, abilities and rhythm"] },
        { h: "Where it runs", body: ["On your phone, tablet and desktop, on-device first. Remote models are used only when the Router's policy and your consent allow it."] },
      ],
    },
    iapps: {
      eyebrow: "Platform", title: "iApps",
      intro: "A modular family of focused applications built on PRSL-AI Core.",
      sections: [
        { h: "Design", body: ["Every iApp shares the same accessible components, keyboard model and language support, so learning one means knowing them all."] },
        { h: "Interoperability", body: ["iApps expose capabilities to iRiel through permissioned interfaces, never by sharing raw data."] },
      ],
    },
    developers: {
      eyebrow: "Developers", title: "Build with PRSL-AI",
      intro: "Architecture specifications, SDK concepts and provider-agnostic integration guidelines.",
      sections: [
        { id: "architecture", h: "Architecture specification", items: ["Model layer — interchangeable reasoning engines", "Agent layer — permissioned executors", "Router — policy-driven placement (local / remote)", "Orchestration — iRiel coordinates context and tasks"] },
        { id: "sdk", h: "SDK & API concepts", body: ["The SDK exposes capabilities, not providers. You request a capability (e.g. summarize, translate) and the Router selects how to fulfil it."] },
        { id: "integrations", h: "Provider-agnostic integration", items: ["Never hard-code a vendor; register providers as adapters", "Declare data sensitivity on every request", "Respect user locale and direction from the Language Core", "Fail gracefully to on-device capabilities"] },
        { id: "resources", h: "Developer resources", items: ["Language Core specification", "Accessibility checklist (WCAG 2.2 AA)", "Security disclosure policy", "Contact: Agent PRSL-AI (floating button)"] },
      ],
    },
    docs: {
      eyebrow: "Documentation", title: "Documentation",
      intro: "Architectural principles, technical guides and the Language Core specification.",
      sections: [
        { h: "Architectural principles", items: ["Local-first execution", "Provider agnosticism", "Accessible by construction", "Language as infrastructure", "Explicit consent", "Continuity"] },
        { id: "language-core", h: "Language Core specification", body: ["Each locale is described by a typed record: BCP 47 code, native name, region, script (ISO 15924), text direction and fallback locale. The interface sets the document lang and dir attributes dynamically, so right-to-left scripts such as Arabic mirror the whole layout."], items: ["17 locales supported", "Complete: en-US, pt-BR", "Fallback chain: pt-PT → pt-BR; others → en-US", "RTL: ar"] },
        { h: "Technical guides", items: ["Getting started with the SDK", "Registering a provider adapter", "Writing accessible iApp interfaces", "Router policy authoring"] },
      ],
    },
    privacy: {
      eyebrow: "Legal", title: "Privacy by Default",
      intro: "Your data stays with you unless you decide otherwise.",
      sections: [
        { h: "On-device execution", body: ["Whenever possible, processing happens locally on your device."] },
        { h: "Zero unauthorized transmission", body: ["No personal data is transmitted without explicit, informed and revocable consent."] },
        { h: "This website", body: ["This site stores only your language preference in your browser. Agent PRSL-AI runs locally in your browser and does not send your questions anywhere."] },
      ],
    },
    security: {
      eyebrow: "Legal", title: "Security by Default",
      intro: "Protection is built in from the first line of code.",
      sections: [
        { h: "Principles", items: ["Least privilege for every agent", "Encrypted local storage", "Signed, verifiable updates", "Ethical protection of users"] },
        { h: "Vulnerability disclosure", body: ["Found a vulnerability? Report it through Agent PRSL-AI with details and steps to reproduce. We acknowledge reports and work with researchers in good faith."] },
      ],
    },
    support: {
      eyebrow: "Support", title: "Help Center",
      intro: "Getting started, answers and help.",
      sections: [
        { h: "Getting started", items: ["Choose your language in the top navigation", "Explore the Ecosystem page", "Ask Agent PRSL-AI anything about the platform"] },
        { h: "FAQ", items: ["Is iRiel the same as Agent PRSL-AI? — No. iRiel is your private environment; the Agent is the public ambassador.", "Does PRSL-AI need the cloud? — No. It is on-device first.", "Which languages are supported? — 17 locales, including Arabic right-to-left."] },
        { h: "Still need help?", body: ["Open Agent PRSL-AI using the floating button at the bottom of any page."] },
      ],
    },
    feedback: {
      eyebrow: "Community", title: "Feedback",
      intro: "Your suggestions shape the ecosystem. Tell us what works and what does not.",
      sections: [],
    },
    terms: {
      eyebrow: "Legal", title: "Terms of Service",
      intro: "Terms for using the PRSL-AI Ecosystem website.",
      sections: [
        { h: "Use of this site", body: ["Content is provided for information about the PRSL-AI Ecosystem. Brand names and visual assets belong to Robert Software Labs."] },
        { h: "No warranty", body: ["Information is provided as is and may change as the ecosystem evolves."] },
        { h: "Contact", body: ["Questions about these terms: ask Agent PRSL-AI."] },
      ],
    },
    contact: {
      eyebrow: "Contact", title: "Contact Robert Software Labs",
      intro: "Institutional contact for partnerships, press, security and general enquiries.",
      sections: [{ h: "Agent PRSL-AI", body: ["Agent PRSL-AI is the official point of contact for the platform. Open it with the floating button at the bottom of any page."] }],
    },
  },
};

const pt: Messages = {
  nav: { home: "Visão geral", about: "Sobre", ecosystem: "Ecossistema", developers: "Desenvolvedores", docs: "Docs", agent: "Agent PRSL-AI", support: "Suporte", contact: "Contato" },
  skip: "Pular para o conteúdo principal",
  language: { label: "Idioma", rtl: "Direita para esquerda", ltr: "Esquerda para direita", script: "Escrita", fallback: "Tradução completa em andamento — exibindo conteúdo em", complete: "Completo" },
  footer: {
    tagline: "Acessibilidade, Inclusão e Segurança por Padrão.",
    platform: "Plataforma", developers: "Desenvolvedores", resources: "Recursos", legal: "Legal",
    about: "Sobre", ecosystem: "Ecossistema", iriel: "iRiel", iapps: "iApps",
    documentation: "Documentação", architecture: "Arquitetura", integrations: "Integrações", devResources: "Recursos para Desenvolvedores",
    feedback: "Feedback", support: "Suporte", contact: "Contato",
    privacy: "Privacidade", security: "Segurança", terms: "Termos de Serviço",
    copyright: "Copyright © 2026 Robert Software Labs. Todos os direitos reservados.",
  },
  home: {
    eyebrow: "Ecossistema PRSL-AI · Por Robert Software Labs",
    title: "Acessibilidade, Inclusão e Segurança por Padrão.",
    manifesto: "Sua continuidade é seu direito. A máquina se adapta a você.",
    tagline: ["Privacidade por padrão", "No dispositivo primeiro", "Independente de provedor"],
    ctaPrimary: "Explorar o Ecossistema",
    ctaSecondary: "Falar com o Agent PRSL-AI",
    manifestoTitle: "Manifesto",
    manifestoBody: [
      "A tecnologia nunca deveria pedir que as pessoas se diminuam para caber nela. O PRSL-AI nasce da convicção de que a inteligência deve se adaptar ao ser humano — ao seu idioma, habilidades, ritmo e contexto — e não o contrário.",
      "Projetamos para a continuidade: seu trabalho, memória e preferências pertencem a você e acompanham você, independentemente de fornecedor, modelo ou nuvem.",
      "Acessibilidade não é um recurso. Inclusão não é uma configuração. Segurança não é um upgrade. São o estado padrão de tudo o que entregamos.",
    ],
    entitiesTitle: "Entidades Centrais",
    entities: [
      { name: "PRSL-AI Core", role: "Fundação", desc: "O núcleo arquitetural: Language Core, Router, motor de políticas e runtime local seguro sobre o qual todos os produtos são construídos." },
      { name: "iRiel PIE", role: "Ambiente de Inteligência Pessoal", desc: "Seu ambiente privado onde a inteligência pessoal vive, lembra e orquestra — no seu dispositivo, sob seu controle." },
      { name: "iApps", role: "Família Modular", desc: "Aplicativos focados e interoperáveis — e-mail, notas, agenda, arquivos — que se conectam ao iRiel e compartilham uma linguagem de design acessível." },
      { name: "Agent PRSL-AI", role: "Embaixador Institucional", desc: "O agente público de conhecimento que explica o ecossistema, sua arquitetura e princípios a quem perguntar." },
    ],
    principlesTitle: "Princípios Arquiteturais",
    principles: [
      { h: "Execução local primeiro", p: "O processamento ocorre no dispositivo sempre que possível. A nuvem é opcional, nunca obrigatória." },
      { h: "Independência de provedor", p: "Sem aprisionamento a um único modelo ou fornecedor. Modelos são componentes intercambiáveis." },
      { h: "Acessível por construção", p: "WCAG 2.2 AA é o mínimo. Toda interface funciona com teclado, leitor de tela e voz." },
      { h: "Idioma como infraestrutura", p: "17 locales, escritas RTL e variantes regionais são estruturais, não traduções tardias." },
      { h: "Consentimento explícito", p: "Nenhum dado sai do seu dispositivo sem uma decisão humana clara e revogável." },
      { h: "Continuidade", p: "Seu contexto sobrevive a mudanças de modelo, dispositivo e provedor." },
    ],
    dependencyTitle: "Inteligência Sem Dependência",
    dependencyLines: ["O modelo pensa.", "O agente executa.", "O Router decide.", "O iRiel orquestra."],
    dependencyBody: "Cada papel é separado por design. Modelos são motores de raciocínio substituíveis. Agentes agem dentro de permissões explícitas. O Router escolhe onde cada tarefa roda — local ou remotamente — por política. O iRiel coordena tudo em seu nome.",
    crestTitle: "O Brasão e Escudo PRSL-AI",
    crestBody: "Forjado em metal esmeralda escovado, o escudo carrega o monograma PRSL entrelaçado — símbolo de proteção, privacidade por padrão e execução no dispositivo primeiro.",
    irielTitle: "iRiel — Ambiente de Inteligência Pessoal",
    irielBody: "O orbe de energia esmeralda é a presença do iRiel: calmo, sempre disponível, nunca intrusivo. Pergunte, pesquise e orquestre seus iApps no celular, tablet e desktop.",
    agentTitle: "Agent PRSL-AI — Geometria Sagrada e Rede de Energia",
    agentBody: "Amplificação de aura, formação galáctica e a rede de hubs de energia visualizam como o Agent PRSL-AI conecta o conhecimento do ecossistema.",
    geometry: ["Amplificação de Aura", "Formação Galáctica", "Rede de Hubs de Energia"],
  },
  agent: {
    eyebrow: "Embaixador Institucional do Conhecimento",
    title: "Agent PRSL-AI",
    poweredBy: "Desenvolvido por Robert Software Labs",
    intro: "Pergunte sobre o ecossistema, o Router, o iRiel, os iApps, idiomas ou nossos princípios arquiteturais.",
    distinctionTitle: "O Agent PRSL-AI não é o iRiel",
    distinction: [
      "O Agent PRSL-AI é o embaixador público e institucional. Ele explica como o ecossistema funciona e não guarda dados pessoais sobre você.",
      "O iRiel é o seu Ambiente de Inteligência Pessoal — privado, no seu dispositivo, orquestrando seu próprio contexto e seus iApps.",
    ],
    placeholder: "Pergunte ao Agent PRSL-AI…",
    send: "Enviar",
    you: "Você",
    agentName: "Agent PRSL-AI",
    suggestionsLabel: "Perguntas sugeridas",
    status: "Online · Base de conhecimento v1",
    local: "Roda inteiramente no seu navegador. Nada do que você digita é enviado.",
    greeting: "Olá. Eu sou o Agent PRSL-AI, embaixador institucional do Ecossistema PRSL-AI. Como posso ajudar você a entendê-lo?",
    fallback: "Sou especializado no Ecossistema PRSL-AI. Pergunte sobre o Router, o iRiel, os iApps, privacidade, idiomas ou os princípios arquiteturais.",
    suggestions: [
      { label: "O que é o Ecossistema PRSL-AI?", topic: "ecosystem" },
      { label: "Como o Router decide?", topic: "routing" },
      { label: "Qual a diferença entre você e o iRiel?", topic: "iriel" },
      { label: "Quais são os princípios arquiteturais?", topic: "principles" },
      { label: "Quais idiomas são suportados?", topic: "languages" },
    ],
    keywords: {
      ecosystem: ["ecossistema", "o que é", "prsl", "core", "visão"],
      routing: ["router", "rota", "roteamento", "decide", "modelo"],
      iriel: ["iriel", "diferença", "diferente", "pessoal", "pie"],
      principles: ["princípio", "principio", "arquitetura", "design", "dependência"],
      privacy: ["privacidade", "dados", "segurança", "local", "dispositivo"],
      languages: ["idioma", "língua", "locale", "rtl", "árabe", "tradução"],
      iapps: ["iapps", "apps", "aplicativo", "email", "agenda", "notas"],
      contact: ["contato", "email", "robert", "fundador", "equipe"],
    },
    answers: {
      ecosystem: "O Ecossistema PRSL-AI é uma plataforma de inteligência acessível e com privacidade em primeiro lugar, da Robert Software Labs. Possui quatro entidades centrais: PRSL-AI Core (a fundação), iRiel (seu Ambiente de Inteligência Pessoal), iApps (a família modular de aplicativos) e eu, o Agent PRSL-AI (o embaixador institucional).",
      routing: "O Router é a camada de decisão. Para cada tarefa ele avalia política, sensibilidade, capacidade e custo, e decide onde ela roda — no dispositivo primeiro, remotamente só com consentimento. Resumindo: o modelo pensa, o agente executa, o Router decide e o iRiel orquestra.",
      iriel: "Eu sou o embaixador público: explico o ecossistema e não guardo dados pessoais. O iRiel é o seu Ambiente de Inteligência Pessoal privado — vive no seu dispositivo, lembra seu contexto e orquestra seus iApps por você.",
      principles: "Seis princípios guiam cada decisão: execução local primeiro, independência de provedor, acessibilidade por construção (WCAG 2.2 AA), idioma como infraestrutura, consentimento explícito e continuidade do seu contexto entre modelos, dispositivos e provedores.",
      privacy: "Privacidade por Padrão: o processamento ocorre no dispositivo sempre que possível, e nenhum dado é transmitido sem consentimento explícito e revogável. Segurança por Padrão significa armazenamento criptografado, agentes com privilégio mínimo e um processo público de divulgação de vulnerabilidades.",
      languages: "O Language Core traz um registro BCP 47 tipado com 17 locales: en-US, en-GB, pt-BR, pt-PT, es-ES, es-419, fr-FR, de-DE, it-IT, zh-CN, zh-TW, ja-JP, ko-KR, ar (direita para esquerda), hi-IN, ru-RU e nl-NL. en-US e pt-BR estão completos; os demais usam fallback.",
      iapps: "Os iApps são aplicativos modulares focados — como e-mail, notas, agenda e arquivos — que compartilham uma linguagem de design acessível e se conectam ao iRiel para orquestração.",
      contact: "A Robert Software Labs foi fundada por Robert, engenheiro de software brasileiro. Para qualquer dúvida, fale com o Agent PRSL-AI, o guia oficial da plataforma.",
    },
  },
  form: { name: "Nome", email: "E-mail", category: "Categoria", message: "Mensagem", submit: "Enviar", thanks: "Obrigado. Sua mensagem foi registrada nesta sessão. Para resposta imediata, abra o Agent PRSL-AI.", categories: ["Sugestão", "Acessibilidade", "Relato de erro", "Idioma / tradução", "Outro"], required: "Obrigatório" },
  pages: {
    about: {
      eyebrow: "Sobre", title: "Robert Software Labs",
      intro: "Um laboratório de software independente que constrói inteligência acessível, humana e segura.",
      sections: [
        { h: "Origem", body: ["A Robert Software Labs nasceu de uma frustração simples: tecnologia poderosa que excluía justamente quem mais precisava dela. O laboratório foi fundado para provar que inteligência avançada pode ser inclusiva, privada e confiável ao mesmo tempo."] },
        { h: "Visão", body: ["Um mundo onde cada pessoa tenha uma inteligência contínua e privada que se adapta a ela — independentemente de idioma, habilidade, dispositivo ou provedor."] },
        { h: "Missão", body: ["Construir o Ecossistema PRSL-AI com acessibilidade, inclusão e segurança por padrão, mantendo as pessoas no controle da própria continuidade."] },
        { h: "Fundador", body: ["Robert é engenheiro de software brasileiro e fundador da Robert Software Labs. Ele lidera a arquitetura do PRSL-AI Core, do iRiel e da família iApps, com foco em acessibilidade e design multilíngue."] },
      ],
    },
    ecosystem: {
      eyebrow: "Ecossistema", title: "A Arquitetura PRSL-AI",
      intro: "Um sistema em camadas em que cada parte tem uma responsabilidade clara.",
      sections: [
        { id: "core", h: "PRSL-AI Core", body: ["A fundação: Language Core, Router, motor de políticas, armazenamento seguro e runtime local."], items: ["Language Core — registro BCP 47 tipado e suporte RTL", "Router — alocação de tarefas por política", "Motor de políticas — aplicação de consentimento e permissões", "Runtime local — execução de modelos no dispositivo"] },
        { id: "iriel", h: "iRiel — Ambiente de Inteligência Pessoal", body: ["O iRiel é onde sua inteligência pessoal vive. Ele mantém seu contexto, memória e preferências no seu dispositivo e orquestra agentes e iApps para você."] },
        { id: "iapps", h: "iApps — Família Modular", body: ["Aplicativos independentes que fazem uma coisa bem e compartilham uma única linguagem de interface acessível."], items: ["iMail", "iNotes", "iCalendar", "iFiles", "iSpace"] },
        { h: "Agent PRSL-AI", body: ["O agente institucional público que explica o ecossistema. Ele não acessa dados pessoais."] },
      ],
    },
    iriel: {
      eyebrow: "Plataforma", title: "iRiel",
      intro: "Seu Ambiente de Inteligência Pessoal — privado, contínuo e seu.",
      sections: [
        { h: "O que o iRiel faz", items: ["Perguntar ou pesquisar em todos os seus iApps", "Lembrar contexto com sua permissão", "Orquestrar agentes para concluir tarefas", "Adaptar-se ao seu idioma, habilidades e ritmo"] },
        { h: "Onde roda", body: ["No celular, tablet e desktop, no dispositivo primeiro. Modelos remotos só são usados quando a política do Router e o seu consentimento permitem."] },
      ],
    },
    iapps: {
      eyebrow: "Plataforma", title: "iApps",
      intro: "Uma família modular de aplicativos focados, construídos sobre o PRSL-AI Core.",
      sections: [
        { h: "Design", body: ["Todo iApp compartilha os mesmos componentes acessíveis, modelo de teclado e suporte a idiomas — aprender um é conhecer todos."] },
        { h: "Interoperabilidade", body: ["Os iApps expõem capacidades ao iRiel por interfaces com permissão, nunca compartilhando dados brutos."] },
      ],
    },
    developers: {
      eyebrow: "Desenvolvedores", title: "Construa com PRSL-AI",
      intro: "Especificações de arquitetura, conceitos de SDK e diretrizes de integração independentes de provedor.",
      sections: [
        { id: "architecture", h: "Especificação de arquitetura", items: ["Camada de modelo — motores de raciocínio intercambiáveis", "Camada de agente — executores com permissão", "Router — alocação por política (local / remoto)", "Orquestração — o iRiel coordena contexto e tarefas"] },
        { id: "sdk", h: "Conceitos de SDK e API", body: ["O SDK expõe capacidades, não provedores. Você solicita uma capacidade (ex.: resumir, traduzir) e o Router escolhe como atendê-la."] },
        { id: "integrations", h: "Integração independente de provedor", items: ["Nunca fixe um fornecedor; registre provedores como adaptadores", "Declare a sensibilidade dos dados em cada requisição", "Respeite o locale e a direção do usuário via Language Core", "Recorra às capacidades no dispositivo em caso de falha"] },
        { id: "resources", h: "Recursos para desenvolvedores", items: ["Especificação do Language Core", "Checklist de acessibilidade (WCAG 2.2 AA)", "Política de divulgação de segurança", "Contato: Agent PRSL-AI (botão flutuante)"] },
      ],
    },
    docs: {
      eyebrow: "Documentação", title: "Documentação",
      intro: "Princípios arquiteturais, guias técnicos e a especificação do Language Core.",
      sections: [
        { h: "Princípios arquiteturais", items: ["Execução local primeiro", "Independência de provedor", "Acessível por construção", "Idioma como infraestrutura", "Consentimento explícito", "Continuidade"] },
        { id: "language-core", h: "Especificação do Language Core", body: ["Cada locale é descrito por um registro tipado: código BCP 47, nome nativo, região, escrita (ISO 15924), direção do texto e locale de fallback. A interface define dinamicamente os atributos lang e dir do documento, de modo que escritas da direita para a esquerda, como o árabe, espelham todo o layout."], items: ["17 locales suportados", "Completos: en-US, pt-BR", "Cadeia de fallback: pt-PT → pt-BR; demais → en-US", "RTL: ar"] },
        { h: "Guias técnicos", items: ["Primeiros passos com o SDK", "Registrando um adaptador de provedor", "Escrevendo interfaces acessíveis para iApps", "Criando políticas do Router"] },
      ],
    },
    privacy: {
      eyebrow: "Legal", title: "Privacidade por Padrão",
      intro: "Seus dados ficam com você, a menos que você decida o contrário.",
      sections: [
        { h: "Execução no dispositivo", body: ["Sempre que possível, o processamento acontece localmente no seu dispositivo."] },
        { h: "Zero transmissão não autorizada", body: ["Nenhum dado pessoal é transmitido sem consentimento explícito, informado e revogável."] },
        { h: "Este site", body: ["Este site armazena apenas sua preferência de idioma no navegador. O Agent PRSL-AI roda localmente no navegador e não envia suas perguntas a lugar nenhum."] },
      ],
    },
    security: {
      eyebrow: "Legal", title: "Segurança por Padrão",
      intro: "A proteção é incorporada desde a primeira linha de código.",
      sections: [
        { h: "Princípios", items: ["Privilégio mínimo para cada agente", "Armazenamento local criptografado", "Atualizações assinadas e verificáveis", "Proteção ética dos usuários"] },
        { h: "Divulgação de vulnerabilidades", body: ["Encontrou uma vulnerabilidade? Relate pelo Agent PRSL-AI com detalhes e passos para reproduzir. Confirmamos os relatos e trabalhamos com pesquisadores de boa-fé."] },
      ],
    },
    support: {
      eyebrow: "Suporte", title: "Central de Ajuda",
      intro: "Primeiros passos, respostas e ajuda.",
      sections: [
        { h: "Primeiros passos", items: ["Escolha seu idioma na navegação superior", "Explore a página do Ecossistema", "Pergunte qualquer coisa ao Agent PRSL-AI"] },
        { h: "Perguntas frequentes", items: ["O iRiel é o mesmo que o Agent PRSL-AI? — Não. O iRiel é seu ambiente privado; o Agent é o embaixador público.", "O PRSL-AI precisa da nuvem? — Não. Ele prioriza o dispositivo.", "Quais idiomas são suportados? — 17 locales, incluindo árabe da direita para a esquerda."] },
        { h: "Ainda precisa de ajuda?", body: ["Abra o Agent PRSL-AI pelo botão flutuante no canto de qualquer página."] },
      ],
    },
    feedback: {
      eyebrow: "Comunidade", title: "Feedback",
      intro: "Suas sugestões moldam o ecossistema. Conte o que funciona e o que não funciona.",
      sections: [],
    },
    terms: {
      eyebrow: "Legal", title: "Termos de Serviço",
      intro: "Termos para uso do site do Ecossistema PRSL-AI.",
      sections: [
        { h: "Uso deste site", body: ["O conteúdo é fornecido para informação sobre o Ecossistema PRSL-AI. Marcas e ativos visuais pertencem à Robert Software Labs."] },
        { h: "Sem garantia", body: ["As informações são fornecidas como estão e podem mudar conforme o ecossistema evolui."] },
        { h: "Contato", body: ["Dúvidas sobre estes termos: pergunte ao Agent PRSL-AI."] },
      ],
    },
    contact: {
      eyebrow: "Contato", title: "Contato Robert Software Labs",
      intro: "Contato institucional para parcerias, imprensa, segurança e assuntos gerais.",
      sections: [{ h: "Agent PRSL-AI", body: ["O Agent PRSL-AI é o ponto de contato oficial da plataforma. Abra-o pelo botão flutuante no canto de qualquer página."] }],
    },
  },
};

export const MESSAGES = { "en-US": en, "pt-BR": pt } as const;

export function messagesFor(code: LocaleCode): Messages {
  const info = getLocale(code);
  return MESSAGES[info.fallback];
}
