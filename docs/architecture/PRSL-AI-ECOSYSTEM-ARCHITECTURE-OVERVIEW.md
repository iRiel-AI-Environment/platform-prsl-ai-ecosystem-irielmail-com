# PRSL-AI Ecosystem — Canonical Architecture Overview

**Version:** 2.0.0  
**Architecture baseline:** 2026  
**Owner:** Robert Software Labs  
**Platform identity:** @prsl-ai.prsl.ai.ecosystem  
**Canonical language:** English (United States)  
**Status:** Canonical architecture overview; implementation status is evidence-based

## 1. Purpose and scope

The PRSL-AI Ecosystem is the modular, provider-agnostic artificial intelligence platform created and governed by Robert Software Labs (RSL). It defines the shared architecture, policies, contracts, infrastructure, capability framework, integration boundaries, and governance through which independent components collaborate.

PRSL-AI is not a single model, chatbot, agent, application, or cloud provider. Its architecture supports local and platform-hosted intelligence as preferred execution options, with on-device and external services available only where technically supported and permitted. External providers are replaceable integrations, not owners of platform identity or authority.

This document is the ecosystem-level orientation and responsibility map. Detailed normative requirements remain in the linked specifications. A diagram or architectural definition does not establish that a runtime, service, provider connection, or capability is deployed.

## 2. Institutional and entity hierarchy

| Entity | Canonical identity / classification | Responsibility |
|---|---|---|
| Robert Software Labs | Creator and institutional owner | Owns the ecosystem's institutional direction, identities, and governance. |
| PRSL-AI Ecosystem | @prsl-ai.prsl.ai.ecosystem | Shared platform architecture, policy, infrastructure, contracts, and reusable capabilities. |
| PRSL-AI Core | Foundational platform infrastructure | Core services and intelligence infrastructure, including local-first inference foundations and shared platform contracts. It is not a model or a separate product identity. |
| Intelligence Router | Platform routing component | Selects eligible intelligence providers, capabilities, and execution candidates under policy constraints. It does not authorize protected operations. |
| Agent PRSL-AI | @prsl-ai.agent.prsl.ai | First-party specialized platform agent; Powerful by Robert Software Labs. It remains a modular component within the canonical platform repository. |
| iRiel AI | @iriel.prsl.ai.ecosystem | Independent PowerFully Intelligence Environment that coordinates the person's intelligence experience and authorized workflows. |
| iSpace | Internal component of iRiel | Personal space for identity, continuity, user-controlled memory, privacy, and settings. |
| iApps | Application family | Modular applications that consume approved platform and iRiel capabilities through explicit contracts. |
| Providers and integrations | Replaceable adapters / extensions | Supply optional inference or native/external system capabilities without owning platform identity or authorization. |

Agent PRSL-AI is a first-party component of PRSL-AI, not the platform itself. iRiel is a distinct environment, not an agent subordinate to Agent PRSL-AI. iSpace belongs inside iRiel and is not a peer platform. iApps is the application family, not a synonym for the platform.

See Platform, Agent, and Repository Governance; Agent PRSL-AI; and iRiel canonical technical definition for authoritative identity and ownership rules.

## 3. Governing architectural principle

The model thinks. The agent executes a specialty. The Router selects eligible execution candidates. iRiel orchestrates.

See the [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md) for mandatory eligibility gates, policy boundaries, scoring, local-first routing, fallback, and result semantics.

“Decides” means selecting eligible routing candidates within the constraints supplied by policy. It does not mean granting permissions. Authorization is a separate responsibility.

The human remains the source of intent and the authority over personal choices and consent. No model, agent, provider, capability, tool, or integration may authorize itself, elevate its privileges, or bypass the trusted execution boundary.

## 4. Logical architecture

The architecture is a set of independently governed responsibilities connected through versioned contracts. It is not a requirement to deploy every responsibility as a separate service.

1. **Human interaction and application surfaces:** iRiel, iApps, accessibility interfaces, and approved native surfaces receive intent and present outcomes.
2. **Identity and context mediation:** iRiel manages its identity experience, session context, user consent experience, and continuity. Context supplied to a task must be minimized and purpose-bound.
3. **Intent and policy:** requests are normalized and evaluated against platform rules, data classification, execution constraints, and user permissions.
4. **Intelligence Router:** eligible providers and capability candidates are selected. Routing never grants authorization.
5. **Capability Registry:** trusted capability metadata, versions, manifest digests, lifecycle, validation, and review status determine dispatch eligibility. Registration alone grants no authority.
6. **Permission Manager:** the sole PRSL-AI component that issues authorization decisions for protected PRSL-AI operations.
7. **Native host permissions:** the operating system or host independently controls permissions such as camera, microphone, files, and location.
8. **Execution boundary:** a trusted server or host validates all bindings and performs only authorized, bounded operations.
9. **Observation and verification:** results, errors, limitations, and evidence are returned through minimized structured contracts.
10. **Human-facing outcome:** iRiel or the consuming application presents the result accessibly and preserves user control.

Conceptual request path:

Human → iRiel or authorized application → intent and context mediation → PRSL-AI policy → Intelligence Router → Capability Registry → Permission Manager → native host permission when applicable → trusted execution boundary → approved capability/provider → observation and verification → iRiel/application → Human.

The actual deployment topology and transport must be defined by the relevant implementation and API contracts.

## 5. Component responsibilities

### 5.1 PRSL-AI Core and Intelligence Infrastructure

PRSL-AI Core is the foundational infrastructure responsibility within the ecosystem. The detailed infrastructure taxonomy includes APIs, frameworks, extensions, SDKs, engines, runtimes, adapters, orchestration services, schemas, intents, entities, and governance tools.

The target architecture prioritizes self-hosted/local intelligence infrastructure controlled by the platform. A visitor must not be required to download platform model files merely to use the platform. Any actual inference deployment, model registration, provider configuration, and availability must be verified independently.

The current infrastructure document explicitly states that the complete infrastructure is not yet implemented as a whole. Do not infer operational completeness from its architecture or component catalog.

### 5.2 Intelligence Router

The Router evaluates privacy classification, policy, user permissions, capability compatibility, provider availability, latency, cost, offline constraints, and execution mode. It selects only eligible candidates. It cannot issue grants, override policy, or silently fall back from local to remote processing.

### 5.3 Agent PRSL-AI

Agent PRSL-AI is the specialized institutional agent for explaining, diagnosing, and assisting with PRSL-AI platform matters within its actual scope and permissions. Its modules and capability operations are independently identified and governed by the Capability Contract.

The current platform console is documented as a browser-local knowledge base using keyword matching. The capability manifests are specified examples, not evidence of operational specialist runtimes.

Agent PRSL-AI may be invoked by iRiel through a declared specialist capability when a task concerns PRSL-AI platform knowledge or authorized platform support. It is not an operating-system adapter, does not own iRiel identity, and receives no default access to iRiel personal context or memory. The [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md) defines this boundary.

### 5.4 iRiel AI

iRiel AI is a **PowerFully Intelligence Environment**. It is the human-centered environment and orchestration layer for personal intelligence. It coordinates intent, authorized context, continuity, routing requests, specialist agents, capabilities, providers, and accessible outcome presentation.

Its identity and core responsibilities must remain independent of any model, vendor, framework, or device. iRiel may consume PRSL-AI capabilities through explicit, governed integration contracts; it does not duplicate the platform Permission Manager or claim platform-wide authority.

The branded spelling “PowerFully Intelligence Environment” is intentional and canonical. Do not substitute “Personal Intelligence Environment (PIE)” or normalize the capitalization.

### 5.5 iSpace and iApps

iSpace is an internal personal space within iRiel. It organizes identity, continuity, authorized persistent memory, privacy controls, preferences, and user-controlled information.

iApps is the modular application family associated with the ecosystem. Applications remain independently governed and consume shared capabilities through documented contracts.

### 5.6 Automation and action execution

Automation is an execution concern governed by capability contracts, policy, permissions, and the trusted execution boundary. The current canonical evidence does not establish a separate, fully operational ecosystem-wide Automation Engine. Do not present Apple Shortcuts, App Intents, scheduled tasks, or other automation targets as universally available services without implementation evidence.

## 6. iRiel Intelligence Server and service interfaces

The iRiel Intelligence Server is an optional integration and execution boundary for authorized API, MCP, application, automation, and local/remote clients. It validates caller and request envelopes, delegates policy and authorization to their designated authorities, invokes the canonical Intelligence Router for route selection, and dispatches only through trusted execution boundaries. It is not iRiel identity, memory, or Resonance, and multiple server instances do not create multiple iRiel entities. See the [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md).

The Server is a replaceable service interface, not a mandatory intermediary for every iRiel interaction. API and MCP exposure do not imply that a production endpoint is implemented or deployed.

## 7. Provider and integration model

Providers are replaceable sources of inference. Supported categories may include platform-hosted local models, on-device models, Apple-provided intelligence surfaces, and optional external providers such as OpenAI, Anthropic, Google, and Qwen.

Each provider must connect through an explicit adapter or integration contract. Provider-specific request and response behavior must not leak into unrelated platform components.

Apple Integration is a canonical extension boundary, documented in Apple Integration — Canonical Extension v5. Siri, Apple Intelligence, App Intents, Shortcuts, Spotlight, Widgets, Focus Modes, Live Activities, and native APIs remain subject to actual OS support, entitlements, permissions, and verified implementation.

A provider sign-in is not a PRSL-AI capability grant. A provider connection does not authorize every operation, remote disclosure, retention, or unrelated access.

## 8. Contracts and extensibility

The Apple Shortcuts integration has separate, composable contracts for the canonical iRiel entity projection, intent representation, minimum Personal Intelligence interface, and operational execution state. These contracts preserve iRiel as the authority while treating Shortcuts as an optional execution adapter. See the [Entity Contract](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md), [Intents Contract](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md), [Personal Intelligence Contract](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md), and [Operational State Contract](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md).

The platform evolves through independently versioned:

- APIs and service interfaces;
- frameworks and reusable runtime abstractions;
- extensions, connectors, and provider adapters;
- SDKs and developer interfaces;
- engines and execution runtimes;
- schemas and normalized entities;
- intents and capability identifiers;
- registry records, lifecycle metadata, and compatibility declarations.

Every capability must declare its stable ID, input schema, output schema, permissions, dependencies, availability, and execution policy. A capability declaration is not proof of implementation. A registered capability is not automatically verified or dispatch-eligible.

## 9. Security, privacy, and data lifecycle

The architecture requires explicit separation of the following authorities:

- **Human:** intent, personal choices, and consent.
- **iRiel:** user-facing identity and consent experience, context mediation, and continuity.
- **PRSL-AI policy:** platform constraints and policy evaluation.
- **Intelligence Router:** candidate selection only.
- **Capability Registry:** trusted capability metadata and lifecycle eligibility.
- **Permission Manager:** authorization decisions for protected PRSL-AI operations.
- **Operating system / host:** native platform permission grants.
- **Trusted execution boundary:** final enforcement immediately before protected access.

Transient session context and persistent memory have separate lifecycles. Persistent memory requires the applicable explicit user consent. Reading data does not imply permission to disclose it remotely, retain it, use it for training, profile the user, or reuse it for another purpose.

Remote disclosure and non-ephemeral retention are separate permissions. Remote disclosure must bind the exact recipient and scope. Retention must bind storage scope and duration. Missing, expired, revoked, ambiguous, unverifiable, or unavailable authorization must fail closed.

The Permission Manager runtime core currently provides dependency-injected orchestration and contract checks. Production authenticators, registry/policy/consent/native-permission/remote-disclosure adapters, cryptographic decision authority, atomic replay/revocation storage, durable audit storage, and deployment are not established by that code. It must not be exposed to browser code as an authorization authority.

## 10. Accessibility and institutional principles

The platform's governing institutional principle is:

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**

Accessibility is structural across interfaces, APIs, capabilities, workflows, documentation, and execution outcomes. The platform must support assistive technologies, adaptable interaction modalities, localization, and user-controlled preferences. WCAG 2.2 AA is a target where applicable; conformance must be tested rather than assumed.

## 11. Implementation status — evidence-based baseline

| Component / artifact | Current evidence | Status and limitation |
|---|---|---|
| Ecosystem and entity architecture | Canonical architecture and governance documents | Specified; not a claim that every service is deployed. |
| PRSL-AI Intelligence Infrastructure | Infrastructure taxonomy and architecture document | Specified; document states complete infrastructure is not yet implemented. |
| Agent PRSL-AI console | Browser-local topic matching; unmatched questions receive a local-only notice. No remote model/provider request is enabled. | Limited local Q&A implementation; not a general autonomous agent runtime. Provider adapters and trusted remote-disclosure authorization remain unimplemented. |
| Seven representative capability manifests | Vision, Voice, Location, Recognizers, Tools, Creative, Reader | Specified examples; not production-registered or dispatch-eligible. |
| Capability Registry | Registry specification and deterministic contract validation | Specification/validation exists; production registry service is not established. |
| Dependency Resolver | v1.0 specification, request/result schemas, and deterministic synthetic fixtures | Contract and fixture validator exist; production resolver runtime and trusted Registry adapter are not established. |
| Permission Manager | Decision-binding gate and framework-neutral runtime orchestration core with tests | Partial code implementation; trusted production adapters and deployment are not implemented. |
| Execution contract | JSON Schema, cross-component validator, and synthetic test vectors | Contract validation exists; does not establish a production execution runtime. |
| Intelligence Router | Defined responsibility and architecture boundary | Runtime implementation and provider selection are not verified by this repository evidence. |
| Apple Integration | Canonical Extension v5 specification | Canonical specification; individual native integrations remain subject to implementation evidence. |
| iRiel AppWeb integration | Canonical platform integration contract; RFC-007 referenced as next-build specification | Contract documented; do not infer that the next-build integration is already implemented. |
| iSpace and iApps | Canonical product/architecture definitions | Identity and boundaries defined; individual runtime capabilities require separate evidence. |
| Production protected execution | Required trust and adapter boundaries documented | Not production-ready; remain disabled or fail-closed until all gates are implemented and independently verified. |

Statuses must be updated only with source, test, configuration, deployment, and operational evidence. “Specified,” “Implemented,” “Verified,” and “Available” are different claims.

## 12. Canonical references

- [Platform, Agent, and Repository Governance](./PLATFORM-AGENT-REPOSITORY-GOVERNANCE.md)
- [PRSL-AI Intelligence Infrastructure](./PRSL-AI-INTELLIGENCE-INFRASTRUCTURE.md)
- [Agent PRSL-AI — Institutional Identity and Scope](./PRSL-AI-AGENT.md)
- [iRiel AI — PowerFully Intelligence Environment](./IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md)
- [iRiel AppWeb — PRSL-AI Platform Integration Contract](./IRIEL-APPWEB-INTEGRATION.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)
- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md) — Apple platform boundary, service categories, capability eligibility, privacy, provider independence, and replaceability.
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md) — bounded action definitions, action classes, authorization gates, execution lifecycle, idempotency, and verified result handling.
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)
- [Agent PRSL-AI architecture and capability contracts](./agent-prsl-ai/README.md)
- [Capability Contract v1.0](./agent-prsl-ai/capability-contract.md)
- [Capability Registry Specification](./agent-prsl-ai/registry-specification.md)
- [Dependency Resolver Specification v1.0](./agent-prsl-ai/dependency-resolver-specification.md)
- [Permission Manager Specification](./agent-prsl-ai/permission-manager-specification.md)
- [Executable Execution Contract](./agent-prsl-ai/executable-execution-contract.md)
- [Permission Manager Runtime Core and implementation boundary](../../src/lib/permission-manager/README.md)
- [Implementation Readiness and Architecture Gap Register](./IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md)

## 13. Governing statement

PRSL-AI Ecosystem provides the shared platform and governed capabilities. PRSL-AI Core provides its foundational infrastructure. Agent PRSL-AI performs bounded specialist work. The Intelligence Router selects eligible candidates. The Permission Manager authorizes protected PRSL-AI operations. Trusted execution boundaries enforce those decisions. iRiel AI coordinates the person's PowerFully Intelligence Environment. iSpace remains inside iRiel. iApps extend the ecosystem through independent applications. Providers remain replaceable.

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**

**Robert Software Labs**  
*PRSL-AI Ecosystem — Canonical Architecture Overview*
