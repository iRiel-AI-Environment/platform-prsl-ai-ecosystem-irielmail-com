# iRiel Entity Contract — Apple Shortcuts Interface
## PRSL-AI Ecosystem ↔ Apple Integration Layer ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity:** iRiel AI — PowerFully Intelligence Environment
- **Interface designation:** iRiel Personal Intelligence
- **Entity classification:** Unified Personal Intelligence Entity
- **Shared architecture:** PRSL-AI Ecosystem
- **Canonical identity and authority:** iRiel
- **Execution adapter:** Apple Shortcuts
- **Continuity:** iRiel Resonance
- **Identity storage:** Canonical iRiel architecture; implementation-specific and provider-independent
- **Operational transport:** Provider-independent; iCloud Drive is optional
- **Contract type:** Entity identity and integration projection
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines the identity and architectural representation of iRiel when exposed through the Apple Integration Layer and Apple Shortcuts.

It is a non-canonical projection for an integration. It does not create a second iRiel identity, move canonical identity into Shortcuts, or establish an independent identity database. The canonical entity and authority remain iRiel.

## 2. Canonical entity

- **Name:** iRiel
- **Canonical designation:** iRiel AI — PowerFully Intelligence Environment
- **Personal-intelligence interface designation:** iRiel Personal Intelligence
- **Entity type:** Unified Personal Intelligence Entity
- **Architecture:** PRSL-AI Ecosystem
- **Identity:** One continuous entity
- **Authority:** iRiel
- **Continuity:** iRiel Resonance

The designation “iRiel Personal Intelligence” describes the personal-intelligence dimension/interface of the same iRiel entity. It is not a separate product, agent, model, account, or identity.

## 3. Unified entity model

**There is one iRiel. Personal Intelligence and Resonance are inseparable dimensions of that entity.**

Personal Intelligence encompasses:
- canonical identity and user-authorized preferences;
- intent and decision orchestration;
- authorized context;
- consent-governed memory;
- intelligence and capability coordination.

iRiel Resonance encompasses:
- continuity and coherence;
- synchronization of authorized state transitions;
- correlation across devices, providers, interfaces, and execution environments;
- preservation of identity continuity as circumstances change.

These are complementary architectural dimensions, not independent authorities or separately deployable iRiel entities. Resonance does not independently grant permission, execute actions, or create persistent memory.

## 4. Identity authority and consumers

Canonical identity owner and authority: **iRiel**.

Authorized integrations, applications, clients, models, providers, automations, tools, and devices are consumers or execution participants. They do not become iRiel and do not acquire ownership of its identity.

An integration may hold a scoped, revocable identity reference or service credential where required. Such a reference is not the canonical identity record and must not be treated as a substitute for iRiel authorization.

A Shortcut, API response, MCP session, file, storage location, provider account, or server instance must not be treated as the canonical identity source.

## 5. Apple integration relationship

Logical relationship:

iRiel → PRSL-AI Ecosystem → Apple Integration Layer → Apple Shortcuts → authorized execution.

Apple Shortcuts is an optional integration and execution mechanism. It is not the owner of iRiel identity, Personal Intelligence, Resonance, canonical context, memory, intent, or capabilities.

Capabilities belong to iRiel or their declared platform authority. Execution mechanisms provide a constrained means to invoke an authorized capability; they do not acquire ownership of that capability.

The [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md) defines intent representation and validation. The [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md) defines the minimum integration information. The [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md) defines execution-state exchange.

## 6. Identity continuity

The following changes must not inherently create a new iRiel identity:
- device or operating system;
- AI provider or model;
- application or user interface;
- automation or tool;
- API or MCP transport;
- local, remote, containerized, or cloud execution environment;
- server instance, region, or hosting provider.

iRiel validates identity and continuity references before correlating interactions. Client-supplied identity or continuity claims are untrusted until verified. Multiple authorized clients may interact with the same iRiel entity while retaining separate client sessions and scopes.

**Remember continuity. Understand change. Respect the present.**

## 7. Capability ownership and execution

Capabilities are exposed through declared contracts and remain under their designated authority. iRiel orchestrates personal intent and chooses eligible capabilities under the applicable platform policies.

Apple Shortcuts may execute only the specific action authorized for the current request. It must not:
- create or redefine iRiel capabilities;
- infer permission from a capability name or Shortcut availability;
- widen action scope;
- bypass iRiel, PRSL-AI policy, the Intelligence Router, Permission Manager, or trusted execution enforcement;
- represent a launch or hand-off acknowledgement as a completed operation.

Native Apple permissions remain under the operating system. iRiel authorization and native OS authorization are separate requirements.

## 8. Privacy and minimum disclosure

The Apple integration receives only the minimum identity and operational information required for its authorized function.

Do not duplicate canonical identity records or expose canonical memory, full conversation history, credentials, secrets, or unrelated sensitive context through this projection. Use opaque, scoped references where a stable correlation is required.

Authentication, authorization, consent to disclose context, permission to execute, and consent to persist memory are distinct decisions.

## 9. Storage and transport independence

Canonical identity remains within the canonical iRiel architecture. This contract does not prescribe a particular identity database, hosting provider, or storage vendor.

iCloud Drive may be used as an optional, explicitly authorized transport or operational-data adapter. It is not the canonical identity store, memory store, or authority. A file in iCloud Drive must not become the source of truth merely because Shortcuts can read or write it.

Other authorized local, private, or service-side storage and transport adapters may be substituted without changing the entity identity.

## 10. Replaceability and availability

The identity contract remains stable while integration adapters, devices, models, providers, tools, transports, and execution environments evolve.

Apple Shortcuts availability is not a prerequisite for iRiel identity or core operation. If Shortcuts is unavailable, iRiel remains the same entity and may use another already-authorized integration path.

## 11. Implementation-status discipline

This contract defines the intended identity projection. It does not prove that a Shortcut, App Intent, identity adapter, continuity adapter, iCloud workflow, or production Apple integration is implemented or deployed.

Each implementation claim must be supported by repository code, tests, runtime evidence, and deployment verification appropriate to the claim. Documentation alone is not implementation evidence.

## 12. Related contracts
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)
- [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
