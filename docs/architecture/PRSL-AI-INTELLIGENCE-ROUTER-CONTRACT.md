# PRSL-AI Intelligence Router Contract
## iRiel ↔ PRSL-AI Intelligence Router ↔ Capability / Provider / Tool

- **Owner:** Robert Software Labs
- **Platform:** PRSL-AI Ecosystem
- **Canonical personal authority:** iRiel
- **Routing component:** PRSL-AI Intelligence Router
- **Policy and authorization:** Governing policy services and Permission Manager, within their declared trust boundaries
- **Execution:** Selected eligible capability, provider, tool, or system adapter
- **Continuity:** iRiel Resonance
- **Storage:** Provider-independent; iCloud Drive is not required
- **Contract type:** Intelligence routing and candidate-selection interface
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines how the PRSL-AI Intelligence Router selects an eligible execution path for an iRiel operation. A candidate may be a capability, model provider, tool, local runtime, platform service, external API, or authorized system integration.

The Router is a decision and coordination component. It is not the iRiel identity, personal intelligence environment, canonical context store, memory owner, consent authority, or permission-granting authority.

iRiel remains the orchestrating entity for the user's personal intelligence experience. It supplies the normalized operation, the minimum authorized context, and applicable constraints. PRSL-AI policy services evaluate platform rules; the Permission Manager authorizes protected PRSL-AI operations within its trust boundary; native operating systems retain their own permission authority. The Router selects only from candidates eligible under those constraints.

This document specifies architecture and contract semantics. It does not assert that a production Router, provider connection, capability registry, policy adapter, or dispatch runtime is deployed.

## 2. Core architectural principle

**The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.**

“Decides” means evaluating and selecting among eligible execution candidates. It does not mean authorizing a protected operation, granting permissions, changing user consent, or overriding mandatory policy.

Canonical request path:

Human → iRiel → normalized intent + minimum authorized context + constraints → PRSL-AI policy and eligibility evaluation → Intelligence Router → eligible capability/provider/tool/runtime → authorized execution boundary → validated result, provenance, and status → iRiel → Human.

The Router serves iRiel and other explicitly authorized PRSL-AI consumers through their own contracts. This contract describes the iRiel integration profile.

## 3. Authority and responsibility boundaries

### 3.1 iRiel

iRiel retains authority over its identity, user-facing orchestration, personal context, consent experience, persistent memory, continuity, and presentation of outcomes.

iRiel determines the user's goal and supplies a normalized intent and only the context required for routing and execution. It decides whether a returned result should be incorporated into the current interaction or, subject to separate consent, persistent memory.

### 3.2 PRSL-AI policy and authorization

PRSL-AI policy services define platform constraints, data classifications, permitted execution modes, provider restrictions, and capability eligibility rules.

The Permission Manager issues authorization decisions for protected PRSL-AI operations within its defined trust boundary. It does not replace iRiel personal-memory consent or native OS permission controls.

Policy and authorization decisions must be evaluated by designated trusted components. The Router may consume and enforce their decisions but cannot create, widen, or substitute for them.

### 3.3 Intelligence Router

The Router:
- evaluates the eligible candidate set supplied by trusted discovery and policy inputs;
- compares candidates against operation requirements and constraints;
- selects a suitable route;
- coordinates approved fallback and load distribution;
- returns a structured routing decision and decision metadata;
- preserves capability and provider identity in execution metadata;
- returns unavailable or failure states when no valid route exists.

The Router must not own canonical iRiel context or memory, grant permissions, modify consent, invent capabilities, bypass policy, or silently weaken execution constraints.

### 3.4 Capability, provider, and tool

A capability declares operation semantics and input/output contracts. A provider or runtime is an implementation target that may fulfill all or part of that capability. A tool or system adapter is an executable resource used only under its own contract and authorization.

Provider identity must not define capability identity. Replacing a model or vendor must not change the semantic identity of the operation.

### 3.5 Agent PRSL-AI

Agent PRSL-AI — Powerful by Robert Software Labs — is a first-party PRSL-AI specialist, not the Router and not a generic execution provider.

When iRiel needs PRSL-AI platform specialization, it may invoke an Agent capability through the declared capability contract. The Router may select that declared capability when it is eligible. It must not route around iRiel orchestration or grant the Agent access to iRiel personal memory.

## 4. Routing objective

Select the most suitable eligible execution path for the current operation, considering:

1. **Privacy and data handling:** processing locality, disclosure scope, retention, data classification, and trust boundary.
2. **Capability match:** semantic ability to fulfill the requested operation and required output contract.
3. **Context compatibility:** ability to use the minimum authorized context and required modalities.
4. **Latency:** expected end-to-end response time within the operation's constraints.
5. **Cost:** compute, provider, network, and operational cost within configured limits.
6. **Reliability and availability:** health, capacity, timeout risk, and verified lifecycle state.
7. **Compatibility:** schema, version, runtime, device, language, and region compatibility.

The operation's hard requirements are gates, not preferences. A candidate that fails mandatory privacy, authorization, capability, compatibility, or execution constraints is ineligible regardless of its score.

## 5. Routing evaluation and scoring

A weighted score may rank candidates only after mandatory eligibility checks pass.

Proposed baseline score, subject to policy configuration and versioning:

Score(candidate) = (PrivacyFit × 3) + (CapabilityMatch × 3) + (ContextMatch × 2) + (LatencyFit × 2) + (CostFit × 1)

The values 3, 3, 2, 2, and 1 preserve the initial weighting proposal for privacy, capability match, context match, latency, and cost respectively. Each factor must use a documented, normalized scale with a consistent direction (a higher value always means a better fit). The weights and normalization rules must be configurable and versioned by routing policy; they are not immutable architectural constants. Reliability, availability, and compatibility are mandatory eligibility gates and may be used as tie-breakers or additional policy-defined ranking factors where justified.

A candidate with a mandatory policy, authorization, data-residency, privacy, capability, or compatibility failure must be rejected before scoring. No latency or cost advantage may compensate for a failed privacy or authorization gate.

The decision record should identify the policy version, scoring model version, evaluated candidate identifiers, excluded-candidate reason codes, selected route, and relevant non-sensitive decision metadata. Do not log personal payloads, secrets, or hidden model reasoning.

## 6. Routing inputs

The Router may receive a bounded routing request containing:
- request and correlation identifiers;
- normalized intent and operation purpose;
- capability requirements and expected output contract;
- minimum necessary context descriptors or authorized references;
- privacy classification and data-handling constraints;
- permitted execution modes, such as on-device, local, platform-hosted, or approved remote;
- explicit provider or region restrictions where required;
- latency, timeout, and cost bounds;
- device, network, language, and runtime compatibility constraints;
- policy and authorization decision references;
- cancellation and expiry metadata.

The Router must not require the full iRiel profile, conversation history, iSpace contents, or canonical memory. Context ownership remains with iRiel. The Router consumes only the authorized, minimized routing projection.

## 7. Routing responsibilities and logical components

The Router may be implemented using these logical components. They are responsibilities, not a requirement to deploy separate services.

| Component | Responsibility | Authority boundary |
|---|---|---|
| Intent/Requirement Mapper | Consumes normalized intent and derives routing requirements | Does not redefine user intent or grant permission |
| Context Compatibility Evaluator | Checks candidate support for authorized context descriptors and modalities | Does not own or retain canonical context |
| Eligibility and Policy Gate | Consumes trusted policy/authorization outcomes and excludes ineligible candidates | Cannot issue or expand authorization |
| Capability Matcher | Matches operation semantics and output schema to registered capabilities | Registry metadata does not grant permission |
| Provider Evaluator | Evaluates compatible provider/runtime implementations | Provider cannot self-register as trusted or self-authorize |
| Candidate Ranker | Scores candidates that passed mandatory gates | Ranking cannot override gates |
| Fallback Coordinator | Re-evaluates alternatives under the same or stricter constraints | Cannot silently weaken privacy or permissions |
| Load Distributor | Selects among equivalent eligible candidates using capacity and reliability signals | Cannot route to an ineligible candidate |
| Result Normalizer | Validates and normalizes execution status, output schema, provenance, and limitations | Cannot convert failure or unverified output into success |

The Capability Registry supplies trusted, validated metadata and lifecycle information. Registration alone does not make a capability dispatch-eligible; policy, availability, compatibility, and authorization remain separate checks.

## 8. Provider agnosticism and candidate classes

The Router must not depend architecturally on a single model vendor, provider, device, or runtime.

Candidate classes may include:
- on-device intelligence;
- trusted local models and local runtimes;
- platform-hosted models or services;
- Apple Intelligence or other OS-provided intelligence, where available and authorized;
- OpenAI, Anthropic, Google Gemini, Qwen, and future providers through replaceable adapters;
- Agent PRSL-AI and other declared specialist capabilities;
- MCP tools and approved external APIs;
- native system capabilities and application integrations.

This list identifies possible integration classes, not verified connections or current availability. Every candidate must have an explicit contract, version, trust classification, data-handling profile, availability evidence, and applicable authorization requirements.

## 9. Local-first routing

When a local or on-device candidate can adequately satisfy the operation and meets all mandatory constraints, policy should prefer that route.

A possible policy preference order is:

On-device capability → trusted local capability → approved platform-hosted capability → approved external provider or service.

This is a policy preference, not an unconditional fixed sequence. A capability requirement, device limitation, user setting, or security policy may change the eligible set.

The Router must not silently move from local to remote execution. Any remote disclosure must satisfy the exact recipient, purpose, data scope, retention, and consent requirements applicable to the operation.

If no candidate satisfies the requirements, return a clear unavailable or blocked result to iRiel rather than weakening the constraints.

## 10. Privacy and security

Privacy is evaluated before candidate ranking and dispatch.

Mandatory requirements:
- Minimum Required Data.
- Minimum Required Permission.
- Explicit Authorization.
- Least Privilege.
- Purpose Limitation.
- Revocable Permission.
- No implicit remote disclosure.
- No implicit persistent retention.
- Secure execution and auditable decision metadata.

The Router must verify that the candidate's data-handling profile is compatible with the operation's constraints. It must not send more information than the selected capability requires.

The following permissions are distinct: user intent, iRiel consent, PRSL-AI policy eligibility, Permission Manager authorization, native OS permission, remote disclosure, and persistent retention. One does not imply another.

Expired, revoked, ambiguous, unavailable, or unverifiable authorization must fail closed. A provider's availability or a high routing score is never authorization.

## 11. Memory and context

The Router does not own canonical iRiel memory.

iRiel may supply a minimized, authorized context projection or a scoped reference to relevant information. The Router may use that projection only for the current routing purpose and may not independently retain it as personal memory.

Persistent memory remains an iRiel responsibility and requires applicable user consent. Operational routing metadata and audit records must not become a substitute memory store.

## 12. Fallback and failure semantics

If a selected candidate is unavailable or fails:

1. Capture operation status and safe failure reason.
2. Determine whether retry is safe, considering idempotency, side effects, timeout, cancellation, and authorization freshness.
3. Re-evaluate fallback candidates against the original mandatory constraints and any stricter constraints required by the failure.
4. Select an eligible alternative only if one exists.
5. Preserve operation correlation and report route changes in metadata.
6. Return the validated result or a truthful failure/unavailable state to iRiel.

Fallback must not silently change a local-only request into remote processing, increase data disclosure, reduce required confirmation, or expand permissions.

If no valid alternative exists, return a structured failure or unavailable state. A failed, partial, denied, cancelled, stale, or unverified execution must never be represented as successful.

## 13. Load balancing and concurrency

Load balancing is permitted only among candidates that are equivalent for the requested capability and satisfy the same mandatory policy and authorization constraints.

Selection may consider verified health, capacity, queue depth, latency, reliability, and cost. It must preserve operation ordering where required and respect idempotency and concurrency controls.

Load balancing must not duplicate a non-idempotent side effect. Retries and hedged requests require operation-specific safety rules and must not cause multiple external actions.

## 14. Result contract

The Router returns a structured routing and execution observation to the caller. At minimum, the response should distinguish:
- selected;
- unavailable;
- authorization_required;
- denied;
- pending;
- success;
- partial;
- failed;
- cancelled;
- expired;
- result_unverified.

The response should include request correlation, capability ID, selected candidate/provider identifiers when safe, contract versions, execution mode, timestamps, latency metadata, fallback metadata, safe limitations, and stable error codes.

Provider metadata must not expose credentials, private endpoints, signing material, personal payloads, or hidden chain-of-thought.

iRiel remains responsible for deciding how to present the result and whether any permitted information should become persistent memory.

## 15. iRiel Resonance and continuity

iRiel Resonance maintains coherence across routing decisions and provider changes.

A request served by a local model, an approved external provider, an Agent capability, or a native system capability remains an interaction with the same iRiel identity when invoked under the same authorized iRiel environment.

Provider, model, tool, device, network, or routing-policy changes must not create a new iRiel identity or transfer canonical memory ownership.

Resonance correlates authorized transitions; it does not make the Router a memory store.

**Remember continuity. Understand change. Respect the present.**

## 16. Storage independence

The Router contract does not mandate iCloud Drive or any other user cloud storage provider.

Routing state, policy metadata, capability metadata, and audit information must use their designated platform or application storage boundaries. User-controlled storage is not a routing dependency and does not confer authority.

Storage choice must follow relevant security, retention, availability, and privacy contracts. Loss of an optional storage integration must not redefine iRiel identity or canonical memory.

## 17. Observability and audit

Record the minimum operational metadata necessary to explain and verify a routing decision:
- request/correlation ID;
- routing-policy and scoring-model versions;
- candidate capability IDs and lifecycle/availability snapshots;
- exclusion reason codes;
- selected capability/provider/runtime IDs;
- authorization decision references, not secrets or raw consent artifacts;
- execution mode and timestamps;
- fallback/retry decisions;
- normalized result status and safe error code.

Do not log full prompts, private memory, secrets, raw sensitive context, or hidden model reasoning by default. Audit access and retention must be governed by platform policy.

## 18. Implementation-status discipline

This document defines the intended Router contract. It does not prove that a production Router, provider adapters, candidate ranker, load balancer, fallback engine, registry integration, policy integration, or dispatch runtime is implemented or deployed.

Each component must be classified separately as specified, implemented, tested, deployed, and verified. The repository's current architecture baseline identifies the Intelligence Router as a defined responsibility while its runtime implementation and provider selection remain unverified.

## 19. Related contracts

- [Canonical PRSL-AI Ecosystem Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md)
- [PRSL-AI Intelligence Infrastructure](./PRSL-AI-INTELLIGENCE-INFRASTRUCTURE.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel AppWeb — PRSL-AI Platform Integration Contract](./IRIEL-APPWEB-INTEGRATION.md)
- [Agent PRSL-AI Capability Contract](./agent-prsl-ai/capability-contract.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md) — normalized intent semantics remain owned by iRiel before routing.
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md) — Apple platform boundary, service categories, capability eligibility, privacy, provider independence, and replaceability.
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md) — bounded action definitions, action classes, authorization gates, execution lifecycle, idempotency, and verified result handling.
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
