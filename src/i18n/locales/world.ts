import type { Override } from "./overrides";
import type { PageKey } from "../messages";

const KEYS: PageKey[] = ["about", "ecosystem", "iriel", "iapps", "developers", "docs", "privacy", "security", "support", "feedback", "terms", "contact"];

interface Pack {
  nav: [string, string, string, string, string, string, string]; // home about ecosystem developers docs support contact
  skip: string; lang: [string, string, string, string, string, string]; // label rtl ltr script fallback complete
  foot: [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]; // tagline platform developers resources legal documentation architecture integrations devResources feedback support privacy security terms rights
  home: [string, string, string, string, string, string, string]; // title manifesto ctaPrimary ctaSecondary manifestoTitle entitiesTitle principlesTitle
  tag: [string, string, string];
  dep: [string, string, string, string, string];
  agent: [string, string, string, string, string, string, string]; // eyebrow intro distinction placeholder send you suggestions
  form: [string, string, string, string, string, string, string];
  pages: string[]; // 12 titles
}

function build(p: Pack): Override {
  const [home, about, ecosystem, developers, docs, support, contact] = p.nav;
  const f = p.foot;
  const pages = Object.fromEntries(KEYS.map((k, i) => [k, { title: p.pages[i] }])) as NonNullable<Override["pages"]>;
  return {
    nav: { home, about, ecosystem, developers, docs, agent: "Agent PRSL-AI", support, contact },
    skip: p.skip,
    language: { label: p.lang[0], rtl: p.lang[1], ltr: p.lang[2], script: p.lang[3], fallback: p.lang[4], complete: p.lang[5] },
    footer: {
      tagline: f[0], platform: f[1], developers: f[2], resources: f[3], legal: f[4], about, ecosystem,
      documentation: f[5], architecture: f[6], integrations: f[7], devResources: f[8], feedback: f[9], support: f[10], contact,
      privacy: f[11], security: f[12], terms: f[13], copyright: `Copyright © 2026 Robert Software Labs. ${f[14]}`,
    },
    home: {
      title: p.home[0], manifesto: p.home[1], tagline: p.tag, ctaPrimary: p.home[2], ctaSecondary: p.home[3],
      manifestoTitle: p.home[4], entitiesTitle: p.home[5], principlesTitle: p.home[6],
      dependencyTitle: p.dep[0], dependencyLines: p.dep.slice(1),
    },
    agent: { eyebrow: p.agent[0], poweredBy: "Powered by Robert Software Labs", intro: p.agent[1], distinctionTitle: p.agent[2], placeholder: p.agent[3], send: p.agent[4], you: p.agent[5], suggestionsLabel: p.agent[6] },
    form: { name: p.form[0], email: p.form[1], category: p.form[2], message: p.form[3], submit: p.form[4], thanks: p.form[5], required: p.form[6] },
    pages,
  };
}

export const fr = build({
  nav: ["Accueil", "À propos", "Écosystème", "Développeurs", "Docs", "Assistance", "Contact"],
  skip: "Aller au contenu principal",
  lang: ["Langue", "De droite à gauche", "De gauche à droite", "Écriture", "Traduction complète en cours — contenu affiché en", "Complet"],
  foot: ["Accessibilité, inclusion et sécurité par défaut.", "Plateforme", "Développeurs", "Ressources", "Mentions légales", "Documentation", "Architecture", "Intégrations", "Ressources développeurs", "Avis", "Assistance", "Confidentialité", "Sécurité", "Conditions d’utilisation", "Tous droits réservés."],
  home: ["Accessibilité, inclusion et sécurité par défaut.", "Votre continuité est votre droit. La machine s’adapte à vous.", "Explorer l’écosystème", "Parler à Agent PRSL-AI", "Manifeste", "Entités principales", "Principes architecturaux"],
  tag: ["Confidentialité par défaut", "Local d’abord", "Indépendant des fournisseurs"],
  dep: ["Intelligence sans dépendance", "Le modèle pense.", "L’agent exécute.", "Le Router décide.", "iRiel orchestre."],
  agent: ["Ambassadeur institutionnel du savoir", "Posez vos questions sur l’écosystème, le Router, iRiel, les iApps, les langues ou nos principes.", "Agent PRSL-AI n’est pas iRiel", "Demandez à Agent PRSL-AI…", "Envoyer", "Vous", "Questions suggérées"],
  form: ["Nom", "E-mail", "Catégorie", "Message", "Envoyer", "Merci. Votre message a été enregistré pour cette session. Pour une réponse immédiate, ouvrez Agent PRSL-AI.", "Obligatoire"],
  pages: ["À propos de Robert Software Labs", "L’écosystème PRSL-AI", "iRiel AI", "iApps", "Développeurs", "Documentation", "Confidentialité", "Sécurité", "Centre d’aide", "Avis", "Conditions d’utilisation", "Contacter Robert Software Labs"],
});

export const de = build({
  nav: ["Start", "Über uns", "Ökosystem", "Entwickler", "Doku", "Support", "Kontakt"],
  skip: "Zum Hauptinhalt springen",
  lang: ["Sprache", "Von rechts nach links", "Von links nach rechts", "Schrift", "Vollständige Übersetzung in Arbeit — Inhalte werden angezeigt auf", "Vollständig"],
  foot: ["Barrierefreiheit, Inklusion und Sicherheit als Standard.", "Plattform", "Entwickler", "Ressourcen", "Rechtliches", "Dokumentation", "Architektur", "Integrationen", "Entwickler-Ressourcen", "Feedback", "Support", "Datenschutz", "Sicherheit", "Nutzungsbedingungen", "Alle Rechte vorbehalten."],
  home: ["Barrierefreiheit, Inklusion und Sicherheit als Standard.", "Ihre Kontinuität ist Ihr Recht. Die Maschine passt sich Ihnen an.", "Ökosystem erkunden", "Mit Agent PRSL-AI sprechen", "Manifest", "Zentrale Entitäten", "Architekturprinzipien"],
  tag: ["Datenschutz als Standard", "Gerät zuerst", "Anbieterunabhängig"],
  dep: ["Intelligenz ohne Abhängigkeit", "Das Modell denkt.", "Der Agent führt aus.", "Der Router entscheidet.", "iRiel orchestriert."],
  agent: ["Institutioneller Wissensbotschafter", "Fragen Sie zum Ökosystem, Router, iRiel, den iApps, Sprachen oder unseren Prinzipien.", "Agent PRSL-AI ist nicht iRiel", "Agent PRSL-AI fragen…", "Senden", "Sie", "Vorgeschlagene Fragen"],
  form: ["Name", "E-Mail", "Kategorie", "Nachricht", "Senden", "Danke. Ihre Nachricht wurde in dieser Sitzung erfasst. Für eine sofortige Antwort öffnen Sie Agent PRSL-AI.", "Pflichtfeld"],
  pages: ["Über Robert Software Labs", "Das PRSL-AI-Ökosystem", "iRiel AI", "iApps", "Entwickler", "Dokumentation", "Datenschutz", "Sicherheit", "Hilfezentrum", "Feedback", "Nutzungsbedingungen", "Kontakt Robert Software Labs"],
});

export const it = build({
  nav: ["Home", "Chi siamo", "Ecosistema", "Sviluppatori", "Documenti", "Supporto", "Contatti"],
  skip: "Vai al contenuto principale",
  lang: ["Lingua", "Da destra a sinistra", "Da sinistra a destra", "Scrittura", "Traduzione completa in corso — contenuti mostrati in", "Completo"],
  foot: ["Accessibilità, inclusione e sicurezza per impostazione predefinita.", "Piattaforma", "Sviluppatori", "Risorse", "Note legali", "Documentazione", "Architettura", "Integrazioni", "Risorse per sviluppatori", "Feedback", "Supporto", "Privacy", "Sicurezza", "Termini di servizio", "Tutti i diritti riservati."],
  home: ["Accessibilità, inclusione e sicurezza per impostazione predefinita.", "La tua continuità è un tuo diritto. La macchina si adatta a te.", "Esplora l’ecosistema", "Parla con Agent PRSL-AI", "Manifesto", "Entità principali", "Principi architetturali"],
  tag: ["Privacy predefinita", "Prima il dispositivo", "Indipendente dai fornitori"],
  dep: ["Intelligenza senza dipendenza", "Il modello pensa.", "L’agente esegue.", "Il Router decide.", "iRiel orchestra."],
  agent: ["Ambasciatore istituzionale della conoscenza", "Chiedi dell’ecosistema, del Router, di iRiel, delle iApps, delle lingue o dei nostri principi.", "Agent PRSL-AI non è iRiel", "Chiedi ad Agent PRSL-AI…", "Invia", "Tu", "Domande suggerite"],
  form: ["Nome", "E-mail", "Categoria", "Messaggio", "Invia", "Grazie. Il tuo messaggio è stato registrato in questa sessione. Per una risposta immediata, apri Agent PRSL-AI.", "Obbligatorio"],
  pages: ["Chi è Robert Software Labs", "L’ecosistema PRSL-AI", "iRiel AI", "iApps", "Sviluppatori", "Documentazione", "Privacy", "Sicurezza", "Centro assistenza", "Feedback", "Termini di servizio", "Contatta Robert Software Labs"],
});

export const nl = build({
  nav: ["Home", "Over ons", "Ecosysteem", "Ontwikkelaars", "Docs", "Ondersteuning", "Contact"],
  skip: "Naar hoofdinhoud",
  lang: ["Taal", "Van rechts naar links", "Van links naar rechts", "Schrift", "Volledige vertaling in uitvoering — inhoud wordt getoond in", "Volledig"],
  foot: ["Toegankelijkheid, inclusie en veiligheid als standaard.", "Platform", "Ontwikkelaars", "Bronnen", "Juridisch", "Documentatie", "Architectuur", "Integraties", "Bronnen voor ontwikkelaars", "Feedback", "Ondersteuning", "Privacy", "Beveiliging", "Servicevoorwaarden", "Alle rechten voorbehouden."],
  home: ["Toegankelijkheid, inclusie en veiligheid als standaard.", "Uw continuïteit is uw recht. De machine past zich aan u aan.", "Ontdek het ecosysteem", "Praat met Agent PRSL-AI", "Manifest", "Kernentiteiten", "Architectuurprincipes"],
  tag: ["Privacy als standaard", "Apparaat eerst", "Leveranciersonafhankelijk"],
  dep: ["Intelligentie zonder afhankelijkheid", "Het model denkt.", "De agent voert uit.", "De Router beslist.", "iRiel orkestreert."],
  agent: ["Institutionele kennisambassadeur", "Vraag naar het ecosysteem, de Router, iRiel, de iApps, talen of onze principes.", "Agent PRSL-AI is niet iRiel", "Vraag het Agent PRSL-AI…", "Verzenden", "U", "Voorgestelde vragen"],
  form: ["Naam", "E-mail", "Categorie", "Bericht", "Verzenden", "Bedankt. Uw bericht is in deze sessie geregistreerd. Open Agent PRSL-AI voor direct antwoord.", "Verplicht"],
  pages: ["Over Robert Software Labs", "Het PRSL-AI-ecosysteem", "iRiel AI", "iApps", "Ontwikkelaars", "Documentatie", "Privacy", "Beveiliging", "Helpcentrum", "Feedback", "Servicevoorwaarden", "Contact Robert Software Labs"],
});

export const ru = build({
  nav: ["Главная", "О нас", "Экосистема", "Разработчикам", "Документация", "Поддержка", "Контакты"],
  skip: "Перейти к основному содержимому",
  lang: ["Язык", "Справа налево", "Слева направо", "Письменность", "Полный перевод в работе — содержимое показано на языке", "Полный"],
  foot: ["Доступность, инклюзивность и безопасность по умолчанию.", "Платформа", "Разработчикам", "Ресурсы", "Правовая информация", "Документация", "Архитектура", "Интеграции", "Ресурсы для разработчиков", "Отзывы", "Поддержка", "Конфиденциальность", "Безопасность", "Условия использования", "Все права защищены."],
  home: ["Доступность, инклюзивность и безопасность по умолчанию.", "Ваша непрерывность — ваше право. Машина подстраивается под вас.", "Изучить экосистему", "Поговорить с Agent PRSL-AI", "Манифест", "Ключевые сущности", "Архитектурные принципы"],
  tag: ["Приватность по умолчанию", "Сначала устройство", "Независимость от провайдеров"],
  dep: ["Интеллект без зависимости", "Модель думает.", "Агент исполняет.", "Router решает.", "iRiel оркестрирует."],
  agent: ["Институциональный посол знаний", "Спросите об экосистеме, Router, iRiel, iApps, языках или наших принципах.", "Agent PRSL-AI — это не iRiel", "Спросите Agent PRSL-AI…", "Отправить", "Вы", "Предлагаемые вопросы"],
  form: ["Имя", "Эл. почта", "Категория", "Сообщение", "Отправить", "Спасибо. Ваше сообщение сохранено в этом сеансе. Для немедленного ответа откройте Agent PRSL-AI.", "Обязательно"],
  pages: ["О Robert Software Labs", "Экосистема PRSL-AI", "iRiel AI", "iApps", "Разработчикам", "Документация", "Конфиденциальность", "Безопасность", "Центр помощи", "Отзывы", "Условия использования", "Связаться с Robert Software Labs"],
});

export const zhCN = build({
  nav: ["首页", "关于", "生态系统", "开发者", "文档", "支持", "联系"],
  skip: "跳到主要内容",
  lang: ["语言", "从右到左", "从左到右", "文字", "完整翻译进行中 — 当前显示语言：", "完整"],
  foot: ["默认无障碍、包容与安全。", "平台", "开发者", "资源", "法律", "文档", "架构", "集成", "开发者资源", "反馈", "支持", "隐私", "安全", "服务条款", "保留所有权利。"],
  home: ["默认无障碍、包容与安全。", "连续性是你的权利。机器适应你。", "探索生态系统", "与 Agent PRSL-AI 对话", "宣言", "核心实体", "架构原则"],
  tag: ["默认隐私", "设备优先", "不依赖供应商"],
  dep: ["无依赖的智能", "模型负责思考。", "智能体负责执行。", "Router 负责决策。", "iRiel 负责编排。"],
  agent: ["机构知识大使", "询问生态系统、Router、iRiel、iApps、语言或我们的架构原则。", "Agent PRSL-AI 不是 iRiel", "向 Agent PRSL-AI 提问…", "发送", "你", "推荐问题"],
  form: ["姓名", "电子邮件", "类别", "消息", "提交", "谢谢。你的消息已在本次会话中记录。如需即时回复，请打开 Agent PRSL-AI。", "必填"],
  pages: ["关于 Robert Software Labs", "PRSL-AI 生态系统", "iRiel AI", "iApps", "开发者", "文档", "隐私", "安全", "帮助中心", "反馈", "服务条款", "联系 Robert Software Labs"],
});

export const zhTW = build({
  nav: ["首頁", "關於", "生態系統", "開發者", "文件", "支援", "聯絡"],
  skip: "跳至主要內容",
  lang: ["語言", "由右至左", "由左至右", "文字", "完整翻譯進行中 — 目前顯示語言：", "完整"],
  foot: ["預設無障礙、包容與安全。", "平台", "開發者", "資源", "法律", "文件", "架構", "整合", "開發者資源", "意見回饋", "支援", "隱私", "安全", "服務條款", "保留所有權利。"],
  home: ["預設無障礙、包容與安全。", "連續性是你的權利。機器適應你。", "探索生態系統", "與 Agent PRSL-AI 對話", "宣言", "核心實體", "架構原則"],
  tag: ["預設隱私", "裝置優先", "不依賴供應商"],
  dep: ["無依賴的智慧", "模型負責思考。", "代理負責執行。", "Router 負責決策。", "iRiel 負責編排。"],
  agent: ["機構知識大使", "詢問生態系統、Router、iRiel、iApps、語言或我們的架構原則。", "Agent PRSL-AI 不是 iRiel", "向 Agent PRSL-AI 提問…", "傳送", "你", "建議問題"],
  form: ["姓名", "電子郵件", "類別", "訊息", "送出", "謝謝。你的訊息已在本次工作階段中記錄。如需即時回覆，請開啟 Agent PRSL-AI。", "必填"],
  pages: ["關於 Robert Software Labs", "PRSL-AI 生態系統", "iRiel AI", "iApps", "開發者", "文件", "隱私", "安全", "說明中心", "意見回饋", "服務條款", "聯絡 Robert Software Labs"],
});

export const ja = build({
  nav: ["ホーム", "概要", "エコシステム", "開発者", "ドキュメント", "サポート", "お問い合わせ"],
  skip: "メインコンテンツへ移動",
  lang: ["言語", "右から左", "左から右", "文字", "完全翻訳を準備中 — 表示言語：", "完全"],
  foot: ["アクセシビリティ、インクルージョン、セキュリティを標準に。", "プラットフォーム", "開発者", "リソース", "法的情報", "ドキュメント", "アーキテクチャ", "統合", "開発者リソース", "フィードバック", "サポート", "プライバシー", "セキュリティ", "利用規約", "All rights reserved."],
  home: ["アクセシビリティ、インクルージョン、セキュリティを標準に。", "継続性はあなたの権利。機械があなたに合わせます。", "エコシステムを見る", "Agent PRSL-AI と話す", "マニフェスト", "主要エンティティ", "アーキテクチャ原則"],
  tag: ["プライバシー標準", "デバイス優先", "プロバイダー非依存"],
  dep: ["依存のない知能", "モデルが考える。", "エージェントが実行する。", "Router が決定する。", "iRiel が統括する。"],
  agent: ["公式ナレッジアンバサダー", "エコシステム、Router、iRiel、iApps、言語、設計原則について質問できます。", "Agent PRSL-AI は iRiel ではありません", "Agent PRSL-AI に質問…", "送信", "あなた", "おすすめの質問"],
  form: ["お名前", "メール", "カテゴリ", "メッセージ", "送信", "ありがとうございます。メッセージはこのセッションに記録されました。すぐに回答が必要な場合は Agent PRSL-AI を開いてください。", "必須"],
  pages: ["Robert Software Labs について", "PRSL-AI エコシステム", "iRiel AI", "iApps", "開発者", "ドキュメント", "プライバシー", "セキュリティ", "ヘルプセンター", "フィードバック", "利用規約", "Robert Software Labs へのお問い合わせ"],
});

export const ko = build({
  nav: ["홈", "소개", "생태계", "개발자", "문서", "지원", "문의"],
  skip: "본문으로 건너뛰기",
  lang: ["언어", "오른쪽에서 왼쪽", "왼쪽에서 오른쪽", "문자", "전체 번역 진행 중 — 표시 언어:", "완료"],
  foot: ["기본값으로 접근성, 포용성, 보안을.", "플랫폼", "개발자", "리소스", "법적 고지", "문서", "아키텍처", "통합", "개발자 리소스", "피드백", "지원", "개인정보 보호", "보안", "서비스 약관", "All rights reserved."],
  home: ["기본값으로 접근성, 포용성, 보안을.", "연속성은 당신의 권리입니다. 기계가 당신에게 맞춥니다.", "생태계 살펴보기", "Agent PRSL-AI와 대화", "선언문", "핵심 엔티티", "아키텍처 원칙"],
  tag: ["기본 개인정보 보호", "기기 우선", "공급자 독립"],
  dep: ["종속 없는 지능", "모델은 생각합니다.", "에이전트는 실행합니다.", "Router는 결정합니다.", "iRiel은 조율합니다."],
  agent: ["공식 지식 대사", "생태계, Router, iRiel, iApps, 언어 또는 아키텍처 원칙에 대해 물어보세요.", "Agent PRSL-AI는 iRiel이 아닙니다", "Agent PRSL-AI에게 질문…", "보내기", "나", "추천 질문"],
  form: ["이름", "이메일", "분류", "메시지", "제출", "감사합니다. 메시지가 이번 세션에 기록되었습니다. 즉시 답변을 원하시면 Agent PRSL-AI를 여세요.", "필수"],
  pages: ["Robert Software Labs 소개", "PRSL-AI 생태계", "iRiel AI", "iApps", "개발자", "문서", "개인정보 보호", "보안", "도움말 센터", "피드백", "서비스 약관", "Robert Software Labs 문의"],
});

export const hi = build({
  nav: ["होम", "परिचय", "इकोसिस्टम", "डेवलपर्स", "दस्तावेज़", "सहायता", "संपर्क"],
  skip: "मुख्य सामग्री पर जाएँ",
  lang: ["भाषा", "दाएँ से बाएँ", "बाएँ से दाएँ", "लिपि", "पूर्ण अनुवाद प्रगति पर — सामग्री इस भाषा में दिखाई जा रही है:", "पूर्ण"],
  foot: ["डिफ़ॉल्ट रूप से सुलभता, समावेशन और सुरक्षा।", "प्लेटफ़ॉर्म", "डेवलपर्स", "संसाधन", "कानूनी", "दस्तावेज़ीकरण", "आर्किटेक्चर", "इंटीग्रेशन", "डेवलपर संसाधन", "प्रतिक्रिया", "सहायता", "गोपनीयता", "सुरक्षा", "सेवा की शर्तें", "सर्वाधिकार सुरक्षित।"],
  home: ["डिफ़ॉल्ट रूप से सुलभता, समावेशन और सुरक्षा।", "आपकी निरंतरता आपका अधिकार है। मशीन आपके अनुसार ढलती है।", "इकोसिस्टम देखें", "Agent PRSL-AI से बात करें", "घोषणापत्र", "मुख्य इकाइयाँ", "आर्किटेक्चर सिद्धांत"],
  tag: ["डिफ़ॉल्ट गोपनीयता", "डिवाइस पहले", "प्रदाता-स्वतंत्र"],
  dep: ["निर्भरता रहित बुद्धिमत्ता", "मॉडल सोचता है।", "एजेंट निष्पादित करता है।", "Router निर्णय लेता है।", "iRiel समन्वय करता है।"],
  agent: ["संस्थागत ज्ञान दूत", "इकोसिस्टम, Router, iRiel, iApps, भाषाओं या हमारे सिद्धांतों के बारे में पूछें।", "Agent PRSL-AI, iRiel नहीं है", "Agent PRSL-AI से पूछें…", "भेजें", "आप", "सुझाए गए प्रश्न"],
  form: ["नाम", "ईमेल", "श्रेणी", "संदेश", "भेजें", "धन्यवाद। आपका संदेश इस सत्र में दर्ज हो गया है। तुरंत उत्तर के लिए Agent PRSL-AI खोलें।", "आवश्यक"],
  pages: ["Robert Software Labs के बारे में", "PRSL-AI इकोसिस्टम", "iRiel AI", "iApps", "डेवलपर्स", "दस्तावेज़ीकरण", "गोपनीयता", "सुरक्षा", "सहायता केंद्र", "प्रतिक्रिया", "सेवा की शर्तें", "Robert Software Labs से संपर्क"],
});

export const enGB: Override = {
  language: { fallback: "Showing content in" },
  footer: { tagline: "Accessibility, inclusion and security by default." },
};
