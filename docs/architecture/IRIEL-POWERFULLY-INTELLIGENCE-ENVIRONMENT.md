# iRiel AI — Powerfully Intelligence Environment
## Canonical Technical Definition, Responsibilities, and Architectural Boundaries

**Canonical name:** iRiel AI  
**Canonical definition:** Powerfully Intelligence Environment  
**Portuguese definition:** Ambiente de Inteligência Poderosa  
**Canonical entity identity:** `@iriel.prsl.ai.ecosystem`  
**Owner and creator:** Robert Software Labs  
**Ecosystem:** PRSL-AI Ecosystem  
**Document status:** Canonical architectural definition  
**Implementation status:** The definition is canonical; individual services, integrations, and runtime capabilities remain subject to implementation evidence  
**Canonical language:** English (US)

---

## 1. Executive definition

**iRiel AI is a Powerfully Intelligence Environment: a human-centred intelligence environment that coordinates personal intent, authorized context, continuity, models, specialized agents, capabilities, and provider integrations through a coherent and accessible experience.**

iRiel is the environment and orchestration layer through which a person can interact with intelligence without having to manage the underlying models, providers, agents, tools, or infrastructure.

It is designed to make the system adapt to the person—not require the person to adapt to the system.

iRiel is not defined by a particular language model, AI provider, agent framework, application framework, hosting vendor, or device. Its identity and core responsibilities remain stable when those underlying components are replaced.

The branded wording **“Powerfully Intelligence Environment”** is intentional and canonical. Preserve this exact English wording in institutional and technical references. Do not silently normalize it to “Powerful Intelligence Environment” or substitute the historical “Personal Intelligence Environment (PIE)” expansion.

## 2. System classification

| Classification | Definition |
|---|---|
| Primary type | Personal intelligence orchestration environment |
| Architectural role | User-facing intelligence coordination and orchestration environment |
| Core responsibility | Translate human intent into authorized, contextualized intelligence workflows and present coherent outcomes |
| Control responsibility | Coordinate identity, context, consent experience, routing requests, capabilities, providers, and continuity |
| Execution responsibility | Delegate specialist work to authorized agents and capabilities; iRiel does not make those components self-authorizing |
| Model dependency | Provider-agnostic; no single model is part of iRiel's identity |
| Data posture | Privacy by default; on-device/local-first where technically supported; remote processing is optional and explicitly governed |

The phrase “environment” is deliberate: iRiel is broader than a conversational interface or a single assistant process. It encompasses the user-facing experience and the coordination boundaries required to make multiple intelligence components work as one coherent system.

## 3. What iRiel is

iRiel provides the personal intelligence coordination layer for:

1. **Human interaction:** receive intent through supported text, voice, visual, and accessible interaction surfaces.
2. **Identity continuity:** associate authorized context with the correct person and session while keeping identity separate from model/provider identity.
3. **Intent interpretation:** understand the user's requested outcome and determine which context or capability is relevant.
4. **Context mediation:** supply only the minimum authorized context required for a task.
5. **Intelligence orchestration:** coordinate the Intelligence Router, specialized agents, capabilities, and provider adapters through explicit contracts.
6. **Continuity management:** distinguish transient session context from persistent memory and respect user-controlled consent and revocation.
7. **Outcome presentation:** return understandable, accessible, source-aware, and appropriately localized results.
8. **User control:** expose meaningful controls for consent, privacy, accessibility, preferences, connections, and memory.

These responsibilities describe the target architecture. A responsibility must not be presented as operational in a particular release unless its implementation and availability have been verified.

## 4. What iRiel is not

| iRiel is not | Required distinction |
|---|---|
| An AI model or LLM | Models provide inference; iRiel coordinates the environment in which models may be used. |
| A single AI provider | Providers are replaceable adapters behind stable contracts. |
| A standalone specialist agent | Agents perform bounded specialist work; iRiel coordinates the user's broader intelligence experience. |
| Merely a chatbot or virtual assistant | Conversational interaction is one possible interface, not the complete system definition. |
| The PRSL-AI platform itself | PRSL-AI provides shared ecosystem architecture, policy, and capabilities; iRiel is an environment that consumes authorized ecosystem services. |
| Agent PRSL-AI | Agent PRSL-AI specializes in PRSL-AI platform knowledge and platform-related tasks. |
| A permission authority | iRiel presents user consent intent and user-controlled revocation; the Permission Manager evaluates and issues PRSL-AI authorization decisions. |
| A mandatory cloud service | Local and on-device execution are preferred where compatible; remote providers remain optional and policy-governed. |
| A persistent-memory system by default | Session context is transient by default; persistent memory requires the applicable explicit consent. |

## 5. Architectural responsibilities and boundaries

### 5.1 Identity and continuity

iRiel maintains a distinct environment identity and coordinates the user's authorized identity context. The continuity namespace `@iriel` is an identity/continuity concept, not an email address and not a model-provider account.

Identity continuity must not imply unrestricted access. Authentication, session validity, consent, authorization, and data access remain separate controls.

### 5.2 Intent and context

iRiel receives the user's intent, resolves relevant context, and creates a bounded request for routing or specialist execution.

- Use the current interaction context first.
- Retrieve persistent memory only when enabled, relevant, and authorized.
- Do not convert transient conversation content into persistent memory by default.
- Do not disclose context to a remote provider without the required recipient-bound authorization.
- Do not let a model or agent silently expand the purpose or scope of the user's request.

### 5.3 Orchestration and routing

iRiel orchestrates the overall experience and coordinates the Intelligence Router. The Router selects an eligible model/provider or capability candidate according to policy and routing inputs; it does not grant permissions.

The governing architecture statement is:

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

“Decides” refers to routing/candidate selection within policy constraints. Authorization remains a separate responsibility of the Permission Manager.

### 5.4 Specialized agents and capabilities

iRiel may delegate bounded work to specialist agents and registered capabilities through versioned contracts. Delegation must preserve:

- the authenticated subject and caller identity;
- the declared purpose and task scope;
- the minimum necessary context;
- declared capability dependencies and permissions;
- provenance and execution status;
- cancellation, timeout, and failure semantics.

An agent or capability cannot grant itself permissions, change iRiel identity, or turn a delegated task into unrestricted authority.

### 5.5 iSpace and iApps

- **iSpace** is an internal personal space within iRiel. It is not a peer platform or a separate top-level product identity.
- **iApps** are the modular application family associated with the ecosystem. They may consume iRiel or PRSL-AI capabilities through explicit contracts; they do not redefine iRiel's core identity.

## 6. Canonical intelligence request flow

The following flow is conceptual and describes authority boundaries, not proof of deployed services:

```text
Human
  │ intent and interaction
  ▼
iRiel
  │ identity, consent intent, bounded context
  ▼
PRSL-AI Intent / Policy
  │ policy constraints and eligible scope
  ▼
Intelligence Router
  │ candidate selection only
  ▼
Permission Manager
  │ scoped authorization decision (fail closed)
  ▼
Approved Agent / Capability / Provider Adapter
  │ bounded execution
  ▼
iRiel
  │ provenance-aware result and explanation
  ▼
Human
```

Authority boundaries:

- **Human:** remains the source of intent and the ultimate authority over personal choices and consent.
- **iRiel:** manages the user-facing identity, consent experience, contextual continuity, and orchestration.
- **PRSL-AI policy:** defines applicable system constraints and policy rules.
- **Intelligence Router:** selects eligible execution candidates; it does not authorize protected access.
- **Permission Manager:** is the PRSL-AI component that issues authorization decisions for protected operations.
- **Operating system / host:** independently controls native permissions such as camera, microphone, files, and location.
- **Agent / capability / provider:** executes only within the approved contract and authorization scope.

Missing, ambiguous, expired, or unverifiable authorization must fail closed.

## 7. Privacy, memory, and provider independence

### 7.1 Privacy by default

- Minimize collection, processing, disclosure, and retention.
- Keep user identity separate from provider identity.
- Prefer on-device or local execution when suitable and available.
- Make remote inference an explicit, visible, policy-governed choice.
- Never silently fall back to a remote provider when local execution fails.
- Preserve the user's ability to use supported core interactions without creating an unnecessary account or persistent profile.

### 7.2 Memory and continuity

Transient session context and persistent memory are separate data classes and lifecycles.

Persistent memory must be opt-in under the applicable consent model, purpose-bound, reviewable, and revocable. Revocation must prevent future use and propagate to active operations within the documented implementation limits.

### 7.3 Remote disclosure and retention

Remote disclosure and data retention are separate permissions:

- `data.remote_disclose` must bind the exact remote recipient and operation.
- `data.retain` must bind the storage scope and maximum retention duration.

Permission to read information does not imply permission to transmit, retain, train on, profile, or reuse it.

## 8. Accessibility, inclusion, and adaptation

Accessibility, inclusion, and security are architectural requirements—not optional interface enhancements.

iRiel must support adaptable interaction modalities, assistive technologies, clear language, localization, keyboard and screen-reader access, and user-controlled preferences. Voice, language, register, and interaction style may adapt to the person's selected needs and context without stereotyping or changing the meaning of technical information.

The governing principle is:

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**

## 9. Relationship with Agent PRSL-AI

iRiel and Agent PRSL-AI have distinct identities and responsibilities:

| Dimension | iRiel | Agent PRSL-AI |
|---|---|---|
| System type | Powerfully Intelligence Environment | Specialized platform agent |
| Primary purpose | Coordinate a person's broader intelligence experience | Explain, diagnose, and assist with PRSL-AI platform matters |
| Scope | Personal intent, context, continuity, routing, and orchestration | Institutional and technical PRSL-AI knowledge and authorized platform tasks |
| Model relationship | Provider-agnostic environment | Provider-agnostic specialist agent |
| Execution | Orchestrates and delegates | Executes bounded specialist tasks through approved capabilities |
| Authorization | Presents consent intent and user controls; does not issue PRSL-AI grants | Requests/uses authorization; cannot issue or elevate permissions |

iRiel may act as an authorized consumer of Agent PRSL-AI through a documented integration. Such integration must not merge their identities, contexts, permissions, or lifecycles.

See [Agent PRSL-AI — Institutional Identity and Architecture](./PRSL-AI-AGENT.md) and the [Agent PRSL-AI capability architecture](./agent-prsl-ai/README.md).

## 10. Availability and implementation status

This document defines canonical architecture and does not, by itself, prove that a complete iRiel orchestration runtime, persistent memory service, identity service, provider router, Permission Manager, or agent execution service is deployed.

For every release, implementation status must be reported per component:

- **Specified:** a documented design or contract exists.
- **Implemented:** corresponding code exists.
- **Verified:** defined tests or operational evidence confirm the required behavior.
- **Available:** the verified capability is enabled for the relevant environment and user.
- **Planned / In development / Unknown:** must not be represented as available.

A UI mock, documentation page, model download, or connected provider does not independently prove that the full environment is operational.

## 11. Architectural acceptance criteria

An implementation is conformant with this definition when:

1. iRiel remains functional as an identity and orchestration environment when an inference provider is replaced.
2. Model/provider identity cannot overwrite iRiel identity or user continuity.
3. Intent and context are minimized and purpose-bound before delegation.
4. Agents and capabilities are invoked only through explicit, versioned contracts.
5. The Intelligence Router cannot grant permissions.
6. The Permission Manager is the only PRSL-AI component issuing authorization decisions for protected operations.
7. Native operating-system permissions are independently enforced.
8. Persistent memory is not created without the applicable explicit consent.
9. Remote disclosure and retention are separately authorized and scope-bound.
10. Revocation blocks subsequent protected use within documented propagation limits.
11. Accessibility and inclusion are tested as structural requirements.
12. Implementation and availability claims are supported by evidence.

---

**Institutional definition:** iRiel AI is the Powerfully Intelligence Environment that orchestrates personal intelligence around the human, while preserving identity, consent, privacy, continuity, provider independence, and the user's control.

**Robert Software Labs**  
*The machine adapts to you.*
