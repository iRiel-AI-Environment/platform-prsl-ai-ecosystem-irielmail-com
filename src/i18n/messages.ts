import { getLocale, type LocaleCode } from "./locales";
import { OVERRIDES, deepMerge } from "./locales/overrides";

export type PageKey =
  | "about" | "ecosystem" | "iriel" | "iapps" | "developers" | "docs"
  | "privacy" | "security" | "support" | "feedback" | "terms" | "contact";

export interface Section { id?: string; h: string; body?: string[]; items?: string[] }
export interface PageContent { eyebrow: string; title: string; intro: string; sections: Section[] }
export type AgentTopic = "ecosystem" | "routing" | "iriel" | "principles" | "privacy" | "languages" | "iapps" | "contact" | "framework" | "exposure" | "apple" | "tools";

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
    localOnly: string;
    greeting: string; fallback: string;
    suggestions: { label: string; topic: AgentTopic }[];
    keywords: Record<AgentTopic, string[]>;
    answers: Record<AgentTopic, string>;
  };
  pages: Record<PageKey, PageContent>;
  form: { unavailable: string };
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
      { name: "PRSL-AI Core", role: "Foundation", desc: "The platform's foundational architecture. Its target design includes language, routing, policy and runtime components; the complete infrastructure is not yet operational." },
      { name: "iRiel AI", role: "PowerFully Intelligence Environment", desc: "A separate environment for personal intelligence orchestration. It coordinates intent, authorized context and continuity through explicit integrations; it is not the PRSL-AI platform." },
      { name: "iApps", role: "Modular Family", desc: "A modular application family designed to consume PRSL-AI capabilities and connect to iRiel through explicit interfaces as each integration is implemented." },
      { name: "Agent PRSL-AI", role: "Platform Specialist", desc: "The first-party platform specialist for PRSL-AI architecture and capability guidance. The current console is a knowledge Q&A interface, not a general autonomous task-execution runtime." },
    ],
    principlesTitle: "Architectural Principles",
    principles: [
      { h: "Local-first execution", p: "Processing happens on-device whenever possible. The cloud is optional, never required." },
      { h: "Provider agnosticism", p: "No lock-in to a single model or vendor. Models are interchangeable components." },
      { h: "Accessible by construction", p: "WCAG 2.2 AA is the conformance target. Keyboard, screen-reader and alternative-input support must be verified for each relevant interface." },
      { h: "Language as infrastructure", p: "17 locales are registered. en-US and pt-BR have complete core translations; other locales currently use partial native UI overrides and fallback content." },
      { h: "Explicit consent", p: "Any future remote disclosure requires a clear, purpose-specific and revocable user decision. Remote processing is not enabled in the current public Agent console." },
      { h: "Continuity", p: "The architecture is designed to preserve user-controlled context across model and provider changes, subject to consent, supported storage and verified integrations." },
    ],
    dependencyTitle: "Intelligence Without Dependency",
    dependencyLines: ["The model thinks.", "The agent executes.", "The Router decides.", "iRiel orchestrates."],
    dependencyBody: "Each role is separated by design. Models are replaceable reasoning engines. Agents operate within explicit permissions. The architecture assigns the Router responsibility for policy-based execution placement; actual local or remote routes are available only when implemented and enabled. iRiel coordinates the authorized experience.",
    crestTitle: "The PRSL-AI Crest & Shield",
    crestBody: "Forged in brushed emerald metal, the shield carries the interlocked PRSL monogram — a symbol of protection, privacy by default and on-device first.",
    irielTitle: "iRiel — PowerFully Intelligence Environment",
    irielBody: "iRiel is a separate PowerFully Intelligence Environment with its own AppWeb. It is designed to coordinate personal intent, authorized context and continuity. Integration with PRSL-AI is governed by explicit contracts and must not be presented as complete until verified.",
    agentTitle: "Agent PRSL-AI — Sacred Geometry & Energy Network",
    agentBody: "Aura amplification, galaxy formation and the energy hub network visualize how Agent PRSL-AI connects knowledge across the ecosystem.",
    geometry: ["Aura Amplification", "Galaxy Formation", "Energy Hub Network"],
  },
  agent: {
    eyebrow: "Platform-specialized assistant",
    title: "Agent PRSL-AI",
    poweredBy: "Powered by Robert Software Labs",
    intro: "Ask about the ecosystem, the Router, iRiel, iApps, languages or our architectural principles.",
    distinctionTitle: "Agent PRSL-AI is not iRiel",
    distinction: [
      "Agent PRSL-AI is the platform's knowledge specialist. It explains PRSL-AI architecture and documented capabilities; it is distinct from the user's personal environment and does not execute general platform tasks in the current console.",
      "iRiel is a separate PowerFully Intelligence Environment. It coordinates the person's broader intelligence experience and consumes PRSL-AI capabilities only through explicit, governed integration contracts.",
    ],
    placeholder: "Ask Agent PRSL-AI…",
    send: "Send",
    you: "You",
    agentName: "Agent PRSL-AI",
    suggestionsLabel: "Suggested questions",
    status: "Online · Knowledge base v1",
    local: "Known-topic answers are matched locally. Questions outside the local knowledge base receive a local-only notice and are not sent to remote AI or any external provider.",
    localOnly: "No information was sent. I can answer only from the local knowledge topics available in this session.",
    greeting: "Hello. I am Agent PRSL-AI, the platform knowledge specialist for the PRSL-AI Ecosystem. I can explain documented architecture and current implementation status; I do not execute platform operations in this console.",
    fallback: "I'm specialized in the PRSL-AI Ecosystem. Try asking about the Router, iRiel, iApps, privacy, languages or the architectural principles.",
    suggestions: [
      { label: "What is the PRSL-AI Ecosystem?", topic: "ecosystem" },
      { label: "How does the Router decide?", topic: "routing" },
      { label: "How are you different from iRiel?", topic: "iriel" },
      { label: "What are the architectural principles?", topic: "principles" },
      { label: "Which languages are supported?", topic: "languages" },
      { label: "What are the five framework layers?", topic: "framework" },
    ],
    keywords: {
      ecosystem: ["ecosystem", "what is", "prsl", "core", "overview"],
      routing: ["router", "route", "routing", "decide", "model"],
      iriel: ["iriel", "different", "difference", "personal", "pie", "connection", "integration", "deep intelligence"],
      principles: ["principle", "architecture", "design", "dependency"],
      privacy: ["privacy", "data", "security", "local", "device"],
      languages: ["language", "locale", "rtl", "arabic", "translation", "i18n"],
      iapps: ["iapps", "apps", "mail", "calendar", "notes"],
      contact: ["contact", "email", "robert", "founder", "team"],
      framework: ["framework", "layer", "layers", "on-demand", "on demand", "contract"],
      exposure: ["exposure", "execution", "usagealternativetolls", "tolls", "expose"],
      apple: ["apple", "siri", "app intents", "spotlight", "shortcuts", "ios", "mac"],
      tools: ["tools", "vision", "audio", "voice", "location", "recognizer", "creative", "reader", "cli", "specialized"],
    },
    answers: {
      ecosystem: "The PRSL-AI Ecosystem is the modular intelligence platform created by Robert Software Labs. Its distinct elements include PRSL-AI Core (the platform foundation), Agent PRSL-AI (the platform specialist), iRiel (a separate PowerFully Intelligence Environment), and iApps (the modular application family). iSpace belongs inside iRiel. Their responsibilities are separate and connect only through explicit contracts.",
      routing: "The Intelligence Router selects eligible execution candidates using policy, sensitivity, capability, availability and execution constraints. It does not grant permissions. The Permission Manager separately authorizes protected operations; host operating-system permissions remain independent. The model thinks, the agent executes a specialty, the Router decides, and iRiel orchestrates.",
      iriel: "I am Agent PRSL-AI, the platform specialist. I explain the PRSL-AI Ecosystem and do not act as iRiel. iRiel is a separate PowerFully Intelligence Environment with its own AppWeb. It may consume PRSL-AI capabilities through explicit, governed contracts. That integration is a documented target and must not be described as operational until verified.",
      principles: "The platform is governed by accessibility, inclusion and security by default; privacy and data minimization; local-first execution where suitable; provider-agnostic architecture; explicit consent; and user-controlled continuity. WCAG 2.2 AA is a target, not a conformance claim.",
      privacy: "The current Agent Q&A console uses local topic matching only. Questions that do not match a documented local topic receive a local-only notice; no question is sent to a remote model or provider. The console does not access an iRiel profile, personal memory or conversation history. Security requirements include least privilege and a responsible vulnerability-disclosure process; this description is not a security certification.",
      languages: "The Language Core registers 17 BCP 47 locales: en-US, en-GB, pt-BR, pt-PT, es-ES, es-419, fr-FR, de-DE, it-IT, zh-CN, zh-TW, ja-JP, ko-KR, ar (right-to-left), hi-IN, ru-RU and nl-NL. en-US and pt-BR have complete core message sets. The other locales have partial native UI overrides and use fallback content for missing messages. Registry presence does not mean a complete translation or a verified iRiel integration.",
      iapps: "iApps are a modular application family designed to use PRSL-AI capabilities and connect to iRiel through explicit, permissioned contracts as each integration is implemented and verified.",
      contact: "Robert Software Labs was founded by Robert, a Brazilian software engineer. Agent PRSL-AI answers general platform questions only; it does not execute platform operations or forward messages to the RSL team. The contact form is not connected and no message is sent or stored.",
      framework: "The PRSL-AI framework has five layers: Human intention, Application, Capability, Execution, and Governance & observability. Execution is strictly on demand — nothing runs without a request — and every capability is reached through an explicit capability contract. PRSL-AI is the governed intelligence infrastructure; iRiel is the authorized consumer, connected by explicit contracts with no hidden coupling.",
      exposure: "In the documented architecture, Capability Exposure defines what may be accessed, while Capability Execution defines how a capability is performed. UsageAlternativeTolls and Tolls_Intelligence are named API concepts in the specification; their names do not prove that production endpoints are deployed or available.",
      apple: "The architecture specifies a possible Apple Integration extension for Siri, App Intents, Shortcuts, Spotlight and Apple Intelligence, following Human → iRiel → PRSL-AI → Apple adapter → Apple surface. This is an architectural target, not a verified available integration. Apple must never own iRiel's identity, memory or semantics; availability, permissions and disclosure require explicit checks.",
      tools: "The platform architecture defines specialized capability domains such as Vision, Audio, Voice, Location, Recognizers, Creative, Reader and CLI. These are architectural capability areas; they are not all implemented or callable from the current Agent Q&A console.",
    },
  },
  form: { unavailable: "This form is not connected to a submission service. Nothing is sent or stored. Do not enter personal or sensitive information here." },
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
        { id: "core", h: "PRSL-AI Core", body: ["The platform's foundational architecture. The target design includes language, routing, policy, secure-storage and local-runtime components; the complete infrastructure is not yet operational."], items: ["Language Core — 17 registered BCP 47 locales; translation completeness varies", "Intelligence Router — candidate selection under policy; production runtime not verified", "Permission Manager — authorization boundary for protected operations; production adapters remain incomplete", "Local runtime — intended on-device execution path; operational availability must be verified"] },
        { id: "iriel", h: "iRiel — PowerFully Intelligence Environment", body: ["iRiel is a separate PowerFully Intelligence Environment with its own AppWeb. It coordinates personal intent, authorized context and continuity. Its integration with PRSL-AI is governed by explicit contracts and remains subject to implementation evidence."] },
        { id: "iapps", h: "iApps — Modular Family", body: ["A planned family of independent applications, each with a focused responsibility and a shared accessibility standard."], items: ["iMail", "iNotes", "iCalendar", "iFiles"] },
        { h: "Agent PRSL-AI", body: ["The first-party platform knowledge specialist that explains PRSL-AI architecture and documented capabilities. It is distinct from iRiel and must not access personal data without a defined purpose and authorization."] },
        { id: "hierarchy", h: "Responsibility hierarchy", body: ["Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you."], items: ["Robert Software Labs — creator and institutional steward", "PRSL-AI Ecosystem — shared platform architecture, governance, contracts and capabilities", "PRSL-AI Core — foundational platform architecture and infrastructure", "Agent PRSL-AI — first-party specialist for platform knowledge and documented capability guidance", "iRiel — separate PowerFully Intelligence Environment; iSpace is inside iRiel", "iApps — modular application family"] },
        { id: "iriel-connection", h: "iRiel ↔ Platform: planned integration boundary", body: ["The iRiel AppWeb is a separate application and deployment. A future integration may allow it to discover PRSL-AI capabilities and request authorized inference through versioned contracts. This integration is specified architecturally but is not established as operational by this page. The 17-locale registry is available in the platform code; only en-US and pt-BR have complete core message sets, with partial native UI overrides and fallback content for other locales.", "iRiel retains responsibility for its identity, personal context, memory consent and user experience. PRSL-AI retains responsibility for shared platform contracts, policy and protected-operation authorization. Provider credentials must remain server-side and must never be embedded in the iRiel client."], items: ["Health — planned service availability contract", "Capabilities — planned discovery of registered capability metadata", "Inference — planned policy-evaluated request through the Intelligence Router and Permission Manager", "Local fallback — remains the responsibility of the iRiel client and must be verified separately"] },
        { id: "framework", h: "PRSL-AI Framework: five layers, on-demand execution", body: ["The platform is organised in five interacting layers. Intelligence runs strictly on demand: nothing executes without an explicit request, and every capability is invoked through a versioned contract, so a model or provider can be replaced without rewriting applications.", "PRSL-AI is the governed intelligence infrastructure. iRiel is an authorized consumer and interaction environment. They connect through explicit contracts, not through ownership overlap or hidden coupling. Volatile context is never promoted to permanent memory without consent."], items: ["Human intent — goals, constraints and preferences, with accessibility and trust first", "Application — iRiel and authorized clients turn intent into structured requests", "Capability — versioned, named operations with input/output contracts and policy checks", "Execution — model runtimes, router, routing policies and provider adapters", "Governance & observability — consent, permissions, quotas, audit, fallback and privacy"] },
      ],
    },
    iriel: {
      eyebrow: "Separate environment", title: "iRiel",
      intro: "A separate PowerFully Intelligence Environment designed to coordinate personal intent, authorized context and continuity.",
      sections: [
        { h: "Designed capabilities", items: ["Ask and search across authorized iApps as integrations become available", "Preserve context with explicit user permission", "Coordinate specialized agents through authorized capabilities", "Adapt to language, accessibility needs and user preferences"] },
        { h: "Target execution model", body: ["Designed for phone, tablet and desktop, with local-first execution where supported. Remote inference requires explicit user consent and applicable policy approval. Actual availability depends on the separate iRiel release and device support."] },
        { h: "Planned PRSL-AI integration", body: ["The iRiel AppWeb is deployed separately. Its integration with PRSL-AI is defined by a cross-project contract; platform capability discovery and inference must not be described as available until the corresponding services and authorization gates are implemented and verified."] },
      ],
    },
    iapps: {
      eyebrow: "Platform", title: "iApps",
      intro: "A modular family of focused applications designed to consume PRSL-AI Core capabilities through explicit contracts.",
      sections: [
        { h: "Design target", body: ["Each iApp is intended to share accessible components, keyboard behavior and language conventions. Conformance and consistency must be verified as individual apps are implemented."] },
        { h: "Interoperability target", body: ["iApps are intended to expose capabilities to iRiel through permissioned interfaces, never by sharing raw data. Each integration must be implemented and verified before being described as available."] },
      ],
    },
    developers: {
      eyebrow: "Developers", title: "Build with PRSL-AI",
      intro: "Architecture specifications, SDK concepts and provider-agnostic integration guidelines.",
      sections: [
        { id: "architecture", h: "Architecture specification", items: ["Model layer — interchangeable reasoning engines", "Agent layer — permissioned executors", "Router — policy-driven placement (local / remote; route availability depends on implementation)", "Orchestration — iRiel coordinates context and tasks"] },
        { id: "sdk", h: "SDK & API concepts", body: ["The SDK exposes capabilities, not providers. You request a capability (e.g. summarize, translate) and the Router selects how to fulfil it."] },
        { id: "integrations", h: "Provider-agnostic integration", items: ["Never hard-code a vendor; register providers as adapters", "Declare data sensitivity on every request", "Respect user locale and direction from the Language Core", "Fail gracefully to on-device capabilities"] },
        { id: "resources", h: "Developer resources", items: ["Language Core specification", "Accessibility checklist (WCAG 2.2 AA target)", "Security disclosure status — no dedicated reporting channel verified", "General platform Q&A: Agent PRSL-AI (not a human contact or security-reporting channel)"] },
      ],
    },
    docs: {
      eyebrow: "Documentation", title: "Documentation",
      intro: "Architectural principles, technical guides and the Language Core specification.",
      sections: [
        { h: "Architectural principles", items: ["Local-first execution", "Provider agnosticism", "Accessible by construction", "Language as infrastructure", "Explicit consent", "Continuity"] },
        { id: "language-core", h: "Language Core specification", body: ["Each locale is described by a typed record: BCP 47 code, native name, region, script (ISO 15924), text direction and fallback locale. The interface sets the document lang and dir attributes dynamically, so right-to-left scripts such as Arabic mirror the whole layout."], items: ["17 locales registered", "Complete core message sets: en-US, pt-BR", "Other locales: partial native UI overrides with fallback for missing content", "RTL: ar"] },
        { h: "Planned technical guides", items: ["SDK getting-started guide (planned)", "Provider-adapter registration guide (planned)", "Accessible iApp implementation guide (planned)", "Router policy authoring guide (planned)"] },
      ],
    },
    privacy: {
      eyebrow: "Legal", title: "Privacy by Default",
      intro: "Your data stays with you unless you decide otherwise.",
      sections: [
        { h: "On-device execution", body: ["Whenever possible, processing happens locally on your device."] },
        { h: "Zero unauthorized transmission", body: ["No personal data is transmitted without explicit, informed and revocable consent."] },
        { h: "This website and Agent console", body: ["The site stores the selected language in browser localStorage. Agent topics are matched locally. Unmatched questions receive a local-only notice; no question text is sent to a remote model or provider. The console does not access an iRiel profile, personal memory or conversation history."] },
      ],
    },
    security: {
      eyebrow: "Legal", title: "Security by Default",
      intro: "Security is a foundational requirement. Actual controls and conformance must be verified against the implemented system.",
      sections: [
        { h: "Principles", items: ["Least privilege for protected operations", "Secrets and service-role credentials kept server-side", "Input validation and explicit authorization boundaries", "Security controls verified through tests and operational review"] },
        { h: "Vulnerability disclosure", body: ["No dedicated secure vulnerability-reporting channel is currently verified. Do not submit exploit details, credentials or sensitive data through the public Agent or this website. A dedicated reporting route must be published before this site can accept vulnerability reports."] },
      ],
    },
    support: {
      eyebrow: "Support", title: "Help Center",
      intro: "Getting started, answers and help.",
      sections: [
        { h: "Getting started", items: ["Choose your language in the top navigation", "Explore the Ecosystem page", "Ask Agent PRSL-AI about documented platform architecture and current implementation status"] },
        { h: "FAQ", items: ["Is iRiel the same as Agent PRSL-AI? — No. iRiel is a separate PowerFully Intelligence Environment; Agent PRSL-AI is the PRSL-AI platform specialist.", "Does PRSL-AI need the cloud? — The architecture is local-first and provider-agnostic, but the complete local infrastructure is not yet operational. The current public Agent console is local-only and has no remote provider configured.", "Which languages are supported? — 17 locales are registered. en-US and pt-BR have complete core message sets; other locales have partial native UI overrides and fallback content. Arabic is registered as RTL."] },
        { h: "Still need help?", body: ["Open Agent PRSL-AI using the floating button at the bottom of any page."] },
      ],
    },
    feedback: {
      eyebrow: "Community", title: "Feedback",
      intro: "Feedback submission is not connected yet. This page currently displays status only; nothing is transmitted or stored.",
      sections: [],
    },
    terms: {
      eyebrow: "Legal", title: "Terms of Service",
      intro: "Terms for using the PRSL-AI Ecosystem website.",
      sections: [
        { h: "Use of this site", body: ["Content is provided for information about the PRSL-AI Ecosystem. Brand names and visual assets belong to Robert Software Labs."] },
        { h: "No warranty", body: ["Information is provided as is and may change as the ecosystem evolves."] },
        { h: "Contact", body: ["The public Agent can answer general platform questions, but it does not accept formal legal notices or forward messages to the RSL team. No dedicated legal-contact route is currently verified."] },
      ],
    },
    contact: {
      eyebrow: "Contact", title: "Contact Robert Software Labs",
      intro: "This site does not yet provide a connected submission service or a verified direct human-contact channel.",
      sections: [{ h: "Agent PRSL-AI", body: ["Agent PRSL-AI can answer general platform questions, but it does not forward messages to the Robert Software Labs team. The contact form is not connected; no message is sent or stored."] }],
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
      { name: "PRSL-AI Core", role: "Fundação", desc: "A arquitetura fundacional da plataforma. O desenho-alvo inclui componentes de idioma, roteamento, políticas e runtime; a infraestrutura completa ainda não está operacional." },
      { name: "iRiel AI", role: "Ambiente de Inteligência Poderosa", desc: "Um ambiente separado para orquestração de inteligência pessoal. Coordena intenção, contexto autorizado e continuidade por integrações explícitas; não é a plataforma PRSL-AI." },
      { name: "iApps", role: "Família Modular", desc: "Aplicativos focados e interoperáveis — e-mail, notas, agenda, arquivos — que se conectam ao iRiel e compartilham uma linguagem de design acessível." },
      { name: "Agent PRSL-AI", role: "Especialista da Plataforma", desc: "O especialista em PRSL-AI que explica a arquitetura e as capacidades documentadas. O console público atual usa apenas conhecimento local; perguntas sem correspondência recebem um aviso local e não são enviadas a provedores remotos." },
    ],
    principlesTitle: "Princípios Arquiteturais",
    principles: [
      { h: "Execução local primeiro", p: "O processamento ocorre no dispositivo sempre que possível. A nuvem é opcional, nunca obrigatória." },
      { h: "Independência de provedor", p: "Sem aprisionamento a um único modelo ou fornecedor. Modelos são componentes intercambiáveis." },
      { h: "Acessível por construção", p: "WCAG 2.2 AA é a meta de conformidade. O suporte a teclado, leitores de tela e entradas alternativas precisa ser verificado em cada interface relevante." },
      { h: "Idioma como infraestrutura", p: "Há 17 locales registrados. en-US e pt-BR têm conjuntos centrais completos; os demais possuem traduções nativas parciais e usam fallback para textos ausentes." },
      { h: "Consentimento explícito", p: "Qualquer divulgação remota futura exigirá uma decisão humana clara, específica para a finalidade e revogável. O console público atual do Agent não habilita processamento remoto." },
      { h: "Continuidade", p: "A arquitetura foi projetada para preservar o contexto sob controle do usuário entre modelos e provedores, conforme consentimento, armazenamento disponível e integrações verificadas." },
    ],
    dependencyTitle: "Inteligência Sem Dependência",
    dependencyLines: ["O modelo pensa.", "O agente executa.", "O Router decide.", "O iRiel orquestra."],
    dependencyBody: "Cada papel é separado por design. Modelos são motores de raciocínio substituíveis. Agentes agem dentro de permissões explícitas. O Router escolhe onde cada tarefa roda — local ou remotamente — por política. O iRiel coordena tudo em seu nome.",
    crestTitle: "O Brasão e Escudo PRSL-AI",
    crestBody: "Forjado em metal esmeralda escovado, o escudo carrega o monograma PRSL entrelaçado — símbolo de proteção, privacidade por padrão e execução no dispositivo primeiro.",
    irielTitle: "iRiel — Ambiente de Inteligência Poderosa",
    irielBody: "O iRiel é um Ambiente de Inteligência Poderosa separado, com seu próprio AppWeb. Ele foi projetado para coordenar intenção pessoal, contexto autorizado e continuidade. A integração com o PRSL-AI é regida por contratos explícitos e não deve ser apresentada como concluída sem verificação.",
    agentTitle: "Agent PRSL-AI — Geometria Sagrada e Rede de Energia",
    agentBody: "Amplificação de aura, formação galáctica e a rede de hubs de energia visualizam como o Agent PRSL-AI conecta o conhecimento do ecossistema.",
    geometry: ["Amplificação de Aura", "Formação Galáctica", "Rede de Hubs de Energia"],
  },
  agent: {
    eyebrow: "Assistente especializado da plataforma",
    title: "Agent PRSL-AI",
    poweredBy: "Desenvolvido por Robert Software Labs",
    intro: "Pergunte sobre o ecossistema, o Router, o iRiel, os iApps, idiomas ou nossos princípios arquiteturais.",
    distinctionTitle: "O Agent PRSL-AI não é o iRiel",
    distinction: [
      "O Agent PRSL-AI é o especialista da plataforma. Ele explica a arquitetura PRSL-AI e orienta tarefas autorizadas; é distinto do ambiente pessoal do usuário.",
      "O iRiel é um Ambiente de Inteligência Poderosa separado. Ele coordena a experiência de inteligência pessoal e consome capacidades PRSL-AI somente por contratos explícitos e governados.",
    ],
    placeholder: "Pergunte ao Agent PRSL-AI…",
    send: "Enviar",
    you: "Você",
    agentName: "Agent PRSL-AI",
    suggestionsLabel: "Perguntas sugeridas",
    status: "Online · Base de conhecimento v1",
    local: "Tópicos conhecidos são respondidos localmente. Perguntas fora da base local não são enviadas à IA remota sem sua aprovação explícita.",
    localOnly: "Nenhuma informação foi enviada. Posso responder apenas com base nos tópicos disponíveis localmente nesta sessão.",
    greeting: "Olá. Eu sou o Agent PRSL-AI, especialista em conhecimento da plataforma PRSL-AI. Posso explicar a arquitetura documentada e o status atual da implementação; não executo operações da plataforma neste console.",
    fallback: "Sou especializado no Ecossistema PRSL-AI. Pergunte sobre o Router, o iRiel, os iApps, privacidade, idiomas ou os princípios arquiteturais.",
    suggestions: [
      { label: "O que é o Ecossistema PRSL-AI?", topic: "ecosystem" },
      { label: "Como o Router decide?", topic: "routing" },
      { label: "Qual a diferença entre você e o iRiel?", topic: "iriel" },
      { label: "Quais são os princípios arquiteturais?", topic: "principles" },
      { label: "Quais idiomas são suportados?", topic: "languages" },
      { label: "Quais são as cinco camadas do framework?", topic: "framework" },
    ],
    keywords: {
      ecosystem: ["ecossistema", "o que é", "prsl", "core", "visão"],
      routing: ["router", "rota", "roteamento", "decide", "modelo"],
      iriel: ["iriel", "diferença", "diferente", "pessoal", "pie", "conexão", "integração", "inteligência profunda"],
      principles: ["princípio", "principio", "arquitetura", "design", "dependência"],
      privacy: ["privacidade", "dados", "segurança", "local", "dispositivo"],
      languages: ["idioma", "língua", "locale", "rtl", "árabe", "tradução"],
      iapps: ["iapps", "apps", "aplicativo", "email", "agenda", "notas"],
      contact: ["contato", "email", "robert", "fundador", "equipe"],
      framework: ["framework", "camada", "camadas", "sob demanda", "contrato"],
      exposure: ["exposição", "exposicao", "execução", "usagealternativetolls", "tolls", "expor"],
      apple: ["apple", "siri", "app intents", "spotlight", "atalhos", "shortcuts", "ios", "mac"],
      tools: ["ferramenta", "ferramentas", "visão", "áudio", "voz", "localização", "reconhecedor", "criativ", "leitor", "cli", "especializ"],
    },
    answers: {
      ecosystem: "O Ecossistema PRSL-AI é a plataforma modular de inteligência criada pela Robert Software Labs. Seus elementos distintos incluem PRSL-AI Core (a fundação da plataforma), Agent PRSL-AI (o especialista da plataforma), iRiel (um Ambiente de Inteligência Poderosa separado) e iApps (a família modular de aplicativos). O iSpace pertence ao iRiel. As responsabilidades são separadas e se conectam somente por contratos explícitos.",
      routing: "O Intelligence Router seleciona candidatos elegíveis considerando política, sensibilidade, capacidade, disponibilidade e restrições de execução. Ele não concede permissões. O Permission Manager autoriza separadamente operações protegidas; permissões do sistema operacional continuam independentes. O modelo pensa, o agente executa uma especialidade, o Router decide e o iRiel orquestra.",
      iriel: "Eu sou o Agent PRSL-AI, o especialista da plataforma. Explico o Ecossistema PRSL-AI e não substituo o iRiel. O iRiel é um Ambiente de Inteligência Poderosa separado, com seu próprio AppWeb. Ele poderá consumir capacidades PRSL-AI por contratos explícitos e governados. Essa integração é um objetivo documentado e não deve ser descrita como operacional até ser verificada.",
      principles: "A plataforma é regida por acessibilidade, inclusão e segurança por padrão; privacidade e minimização de dados; execução local primeiro quando adequada; arquitetura independente de provedor; consentimento explícito; e continuidade sob controle do usuário. WCAG 2.2 AA é uma meta, não uma declaração de conformidade.",
      privacy: "O console atual de perguntas e respostas do Agent usa somente correspondência local de tópicos. Perguntas que não correspondem a um tópico local documentado recebem um aviso de resposta exclusivamente local; nenhuma pergunta é enviada a modelo ou provedor remoto. O console não acessa perfil do iRiel, memória pessoal nem histórico de conversas. Os requisitos de segurança incluem privilégio mínimo e divulgação responsável de vulnerabilidades; esta descrição não é uma certificação de segurança.",
      languages: "O Language Core registra 17 locales BCP 47: en-US, en-GB, pt-BR, pt-PT, es-ES, es-419, fr-FR, de-DE, it-IT, zh-CN, zh-TW, ja-JP, ko-KR, ar (direita para esquerda), hi-IN, ru-RU e nl-NL. en-US e pt-BR têm conjuntos centrais completos. Os demais possuem traduções nativas parciais e usam fallback para textos ausentes. A presença no registro não significa tradução completa nem integração verificada com o iRiel.",
      iapps: "Os iApps formam uma família modular projetada para consumir capacidades PRSL-AI e se conectar ao iRiel por contratos explícitos e com permissões, conforme cada integração for implementada e verificada.",
      contact: "A Robert Software Labs foi fundada por Robert, engenheiro de software brasileiro. O Agent PRSL-AI responde apenas a dúvidas gerais sobre a plataforma; não executa operações nem encaminha mensagens à equipe da RSL. O formulário de contato não está conectado e nenhuma mensagem é enviada ou armazenada.",
      framework: "O framework PRSL-AI tem cinco camadas: Intenção humana, Aplicação, Capacidade, Execução, e Governança e observabilidade. A execução é estritamente sob demanda — nada roda sem um pedido — e toda capacidade é acessada por um contrato de capacidade explícito. O PRSL-AI é a infraestrutura de inteligência governada; o iRiel é o consumidor autorizado, conectados por contratos explícitos, sem acoplamento oculto.",
      exposure: "Na arquitetura documentada, Capability Exposure define o que pode ser acessado, enquanto Capability Execution define como uma capacidade é executada. UsageAlternativeTolls e Tolls_Intelligence são conceitos de API nomeados na especificação; seus nomes não comprovam que endpoints de produção estejam implantados ou disponíveis.",
      apple: "A arquitetura especifica uma possível extensão de Integração Apple para Siri, App Intents, Atalhos, Spotlight e Apple Intelligence, seguindo Humano → iRiel → PRSL-AI → adaptador Apple → superfície Apple. Isso é um objetivo arquitetural, não uma integração cuja disponibilidade esteja verificada. A Apple nunca deve ser dona da identidade, memória ou semântica do iRiel; disponibilidade, permissões e divulgação exigem verificações explícitas.",
      tools: "A arquitetura da plataforma define domínios de capacidades especializadas como Vision, Audio, Voice, Location, Recognizers, Creative, Reader e CLI. Essas são áreas de capacidade arquitetural; nem todas estão implementadas ou podem ser acionadas pelo console atual de perguntas e respostas do Agent.",
    },
  },
  form: { unavailable: "Este formulário ainda não está conectado a um serviço de envio. Nada é transmitido ou armazenado. Não informe dados pessoais ou sensíveis aqui." },
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
        { id: "core", h: "PRSL-AI Core", body: ["A arquitetura fundacional da plataforma. O desenho-alvo inclui componentes de idioma, roteamento, políticas, armazenamento seguro e runtime local; a infraestrutura completa ainda não está operacional."], items: ["Language Core — 17 locales BCP 47 registrados; a completude das traduções varia", "Intelligence Router — seleção de candidatos sob política; runtime de produção não verificado", "Permission Manager — fronteira de autorização para operações protegidas; adaptadores de produção ainda incompletos", "Runtime local — caminho previsto para execução no dispositivo; disponibilidade operacional precisa ser verificada"] },
        { id: "iriel", h: "iRiel — Ambiente de Inteligência Poderosa", body: ["O iRiel é um Ambiente de Inteligência Poderosa separado, com seu próprio AppWeb. Ele coordena intenção pessoal, contexto autorizado e continuidade. Sua integração com o PRSL-AI é regida por contratos explícitos e depende de evidências de implementação."] },
        { id: "iapps", h: "iApps — Família Modular", body: ["Uma família planejada de aplicativos independentes, cada um com responsabilidade focada e um padrão compartilhado de acessibilidade."], items: ["iMail", "iNotes", "iCalendar", "iFiles"] },
        { h: "Agent PRSL-AI", body: ["O especialista de conhecimento da plataforma, que explica a arquitetura PRSL-AI e capacidades documentadas. É distinto do iRiel e não deve acessar dados pessoais sem finalidade definida e autorização."] },
        { id: "hierarchy", h: "Hierarquia de responsabilidades", body: ["Acessibilidade, Inclusão e Segurança por Padrão. Sua continuidade é seu direito. A máquina se adapta a você."], items: ["Robert Software Labs — criadora e guardiã institucional", "PRSL-AI Ecosystem — arquitetura compartilhada da plataforma, governança, contratos e capacidades", "PRSL-AI Core — arquitetura fundacional e infraestrutura da plataforma", "Agent PRSL-AI — especialista de primeira parte em conhecimento da plataforma e orientação sobre capacidades documentadas", "iRiel — Ambiente de Inteligência Poderosa separado; iSpace está dentro do iRiel", "iApps — família modular de aplicativos"] },
        { id: "iriel-connection", h: "iRiel ↔ Plataforma: fronteira de integração planejada", body: ["O iRiel AppWeb é um aplicativo e uma implantação separados. Uma integração futura poderá permitir que ele descubra capacidades PRSL-AI e solicite inferência autorizada por contratos versionados. Essa integração está especificada arquiteturalmente, mas esta página não comprova que esteja operacional. O registro da plataforma contém 17 locales; somente en-US e pt-BR têm conjuntos centrais completos, enquanto os demais possuem traduções parciais e fallback.", "O iRiel mantém a responsabilidade por sua identidade, contexto pessoal, consentimento de memória e experiência do usuário. O PRSL-AI mantém a responsabilidade pelos contratos compartilhados da plataforma, políticas e autorização de operações protegidas. Credenciais de provedores devem permanecer no servidor e nunca ser incorporadas ao cliente iRiel."], items: ["Health — contrato planejado de disponibilidade de serviço", "Capabilities — descoberta planejada de metadados de capacidades registradas", "Inference — solicitação planejada avaliada por política através do Intelligence Router e Permission Manager", "Fallback local — responsabilidade do cliente iRiel, a ser verificada separadamente"] },
        { id: "framework", h: "Framework PRSL-AI: cinco camadas, execução sob demanda", body: ["A plataforma é organizada em cinco camadas que interagem. A inteligência roda estritamente sob demanda: nada executa sem um pedido explícito, e toda capacidade é chamada por um contrato versionado, para que um modelo ou provedor possa ser trocado sem reescrever as aplicações.", "O PRSL-AI é a infraestrutura de inteligência governada. O iRiel é um consumidor autorizado e ambiente de interação. Eles se conectam por contratos explícitos, sem sobreposição de propriedade nem acoplamento oculto. Contexto volátil nunca vira memória permanente sem consentimento."], items: ["Intenção humana — objetivos, limites e preferências, com acessibilidade e confiança em primeiro lugar", "Aplicação — o iRiel e clientes autorizados transformam a intenção em pedidos estruturados", "Capacidade — operações nomeadas e versionadas, com contratos de entrada/saída e checagem de política", "Execução — runtimes de modelos, roteador, políticas de roteamento e adaptadores de provedores", "Governança e observabilidade — consentimento, permissões, cotas, auditoria, fallback e privacidade"] },
      ],
    },
    iriel: {
      eyebrow: "Ambiente separado", title: "iRiel",
      intro: "Um Ambiente de Inteligência Poderosa separado, projetado para coordenar intenção pessoal, contexto autorizado e continuidade.",
      sections: [
        { h: "Capacidades projetadas", items: ["Perguntar e pesquisar em iApps autorizados conforme as integrações forem disponibilizadas", "Preservar contexto com permissão explícita do usuário", "Coordenar agentes especializados por capacidades autorizadas", "Adaptar-se ao idioma, às necessidades de acessibilidade e às preferências do usuário"] },
        { h: "Modelo de execução previsto", body: ["Projetado para celular, tablet e desktop, com execução local primeiro quando houver suporte. Inferência remota exige consentimento explícito e aprovação das políticas aplicáveis. A disponibilidade real depende da versão separada do iRiel e do suporte do dispositivo."] },
        { h: "Integração planejada com PRSL-AI", body: ["O iRiel AppWeb é implantado separadamente. Sua integração com o PRSL-AI é definida por um contrato entre projetos; descoberta de capacidades e inferência da plataforma não devem ser descritas como disponíveis até que os serviços e as barreiras de autorização correspondentes sejam implementados e verificados."] },
      ],
    },
    iapps: {
      eyebrow: "Plataforma", title: "iApps",
      intro: "Uma família modular de aplicativos focados, projetada para consumir capacidades do PRSL-AI Core por contratos explícitos.",
      sections: [
        { h: "Meta de design", body: ["Cada iApp deverá compartilhar componentes acessíveis, comportamento de teclado e convenções de idioma. A conformidade e a consistência precisam ser verificadas conforme cada aplicativo for implementado."] },
        { h: "Meta de interoperabilidade", body: ["Os iApps deverão expor capacidades ao iRiel por interfaces com permissões, nunca compartilhando dados brutos. Cada integração precisa ser implementada e verificada antes de ser apresentada como disponível."] },
      ],
    },
    developers: {
      eyebrow: "Desenvolvedores", title: "Construa com PRSL-AI",
      intro: "Especificações de arquitetura, conceitos de SDK e diretrizes de integração independentes de provedor.",
      sections: [
        { id: "architecture", h: "Especificação de arquitetura", items: ["Camada de modelo — motores de raciocínio intercambiáveis", "Camada de agente — executores com permissão", "Router — alocação por política (local / remoto; disponibilidade depende da implementação)", "Orquestração — o iRiel coordena contexto e tarefas"] },
        { id: "sdk", h: "Conceitos de SDK e API", body: ["O SDK expõe capacidades, não provedores. Você solicita uma capacidade (ex.: resumir, traduzir) e o Router escolhe como atendê-la."] },
        { id: "integrations", h: "Integração independente de provedor", items: ["Nunca fixe um fornecedor; registre provedores como adaptadores", "Declare a sensibilidade dos dados em cada requisição", "Respeite o locale e a direção do usuário via Language Core", "Recorra às capacidades no dispositivo em caso de falha"] },
        { id: "resources", h: "Recursos para desenvolvedores", items: ["Especificação do Language Core", "Checklist de acessibilidade (meta WCAG 2.2 AA)", "Status de divulgação de segurança — nenhum canal dedicado verificado", "Dúvidas gerais sobre a plataforma: Agent PRSL-AI (não é contato humano nem canal de denúncias)"] },
      ],
    },
    docs: {
      eyebrow: "Documentação", title: "Documentação",
      intro: "Princípios arquiteturais, guias técnicos e a especificação do Language Core.",
      sections: [
        { h: "Princípios arquiteturais", items: ["Execução local primeiro", "Independência de provedor", "Acessível por construção", "Idioma como infraestrutura", "Consentimento explícito", "Continuidade"] },
        { id: "language-core", h: "Especificação do Language Core", body: ["Cada locale é descrito por um registro tipado: código BCP 47, nome nativo, região, escrita (ISO 15924), direção do texto e locale de fallback. A interface define dinamicamente os atributos lang e dir do documento, de modo que escritas da direita para a esquerda, como o árabe, espelham todo o layout."], items: ["17 locales registrados", "Conjuntos centrais completos: en-US, pt-BR", "Demais locales: traduções nativas parciais com fallback para conteúdo ausente", "RTL: ar"] },
        { h: "Guias técnicos planejados", items: ["Guia inicial do SDK (planejado)", "Guia de registro de adaptadores de provedores (planejado)", "Guia de implementação de iApps acessíveis (planejado)", "Guia de autoria de políticas do Router (planejado)"] },
      ],
    },
    privacy: {
      eyebrow: "Legal", title: "Privacidade por Padrão",
      intro: "Seus dados ficam com você, a menos que você decida o contrário.",
      sections: [
        { h: "Execução no dispositivo", body: ["Sempre que possível, o processamento acontece localmente no seu dispositivo."] },
        { h: "Zero transmissão não autorizada", body: ["Nenhum dado pessoal é transmitido sem consentimento explícito, informado e revogável."] },
        { h: "Este site e o console Agent", body: ["O site armazena o idioma selecionado no localStorage do navegador. Os tópicos do Agent são identificados localmente. Perguntas sem correspondência recebem um aviso de resposta exclusivamente local; nenhum texto é enviado a modelos ou provedores remotos. O console não acessa perfil do iRiel, memória pessoal nem histórico de conversas."] },
      ],
    },
    security: {
      eyebrow: "Legal", title: "Segurança por Padrão",
      intro: "Segurança é um requisito fundacional. Os controles e a conformidade reais precisam ser verificados no sistema implementado.",
      sections: [
        { h: "Princípios", items: ["Privilégio mínimo para operações protegidas", "Segredos e credenciais de service role mantidos no servidor", "Validação de entrada e fronteiras explícitas de autorização", "Controles de segurança verificados por testes e revisão operacional"] },
        { h: "Divulgação de vulnerabilidades", body: ["No momento, não há um canal seguro e dedicado de denúncia de vulnerabilidades cuja operação esteja verificada. Não envie detalhes de exploração, credenciais ou dados sensíveis pelo Agent público ou por este site. Um canal dedicado precisa ser publicado antes que o site possa receber denúncias."] },
      ],
    },
    support: {
      eyebrow: "Suporte", title: "Central de Ajuda",
      intro: "Primeiros passos, respostas e ajuda.",
      sections: [
        { h: "Primeiros passos", items: ["Escolha seu idioma na navegação superior", "Explore a página do Ecossistema", "Pergunte ao Agent PRSL-AI sobre a arquitetura documentada e o status atual de implementação"] },
        { h: "Perguntas frequentes", items: ["O iRiel é o mesmo que o Agent PRSL-AI? — Não. O iRiel é um Ambiente de Inteligência Poderosa separado; o Agent PRSL-AI é o especialista da plataforma.", "O PRSL-AI precisa da nuvem? — A arquitetura prioriza execução local e independência de provedor, mas a infraestrutura local completa ainda não está operacional. O console público atual do Agent é exclusivamente local e não tem provedor remoto configurado.", "Quais idiomas são suportados? — 17 locales estão registrados. en-US e pt-BR têm conjuntos centrais completos; os demais possuem traduções parciais e fallback. O árabe está registrado com RTL."] },
        { h: "Ainda precisa de ajuda?", body: ["Abra o Agent PRSL-AI pelo botão flutuante no canto de qualquer página."] },
      ],
    },
    feedback: {
      eyebrow: "Comunidade", title: "Feedback",
      intro: "O envio de feedback ainda não está conectado. Esta página exibe apenas o status; nada é transmitido ou armazenado.",
      sections: [],
    },
    terms: {
      eyebrow: "Legal", title: "Termos de Serviço",
      intro: "Termos para uso do site do Ecossistema PRSL-AI.",
      sections: [
        { h: "Uso deste site", body: ["O conteúdo é fornecido para informação sobre o Ecossistema PRSL-AI. Marcas e ativos visuais pertencem à Robert Software Labs."] },
        { h: "Sem garantia", body: ["As informações são fornecidas como estão e podem mudar conforme o ecossistema evolui."] },
        { h: "Contato", body: ["O Agent público pode responder a dúvidas gerais sobre a plataforma, mas não recebe notificações legais formais nem encaminha mensagens à equipe da RSL. Nenhum canal dedicado de contato jurídico está verificado no momento."] },
      ],
    },
    contact: {
      eyebrow: "Contato", title: "Contato Robert Software Labs",
      intro: "Este site ainda não oferece um serviço de envio conectado nem um canal direto de contato humano cuja operação esteja verificada.",
      sections: [{ h: "Agent PRSL-AI", body: ["O Agent PRSL-AI pode responder a dúvidas gerais sobre a plataforma, mas não encaminha mensagens à equipe da Robert Software Labs. O formulário de contato não está conectado; nenhuma mensagem é enviada ou armazenada."] }],
    },
  },
};

export const MESSAGES = { "en-US": en, "pt-BR": pt } as const;

export function messagesFor(code: LocaleCode): Messages {
  const info = getLocale(code);
  const base = MESSAGES[info.fallback];
  const over = OVERRIDES[info.code];
  return over ? deepMerge(base, over) : base;
}
