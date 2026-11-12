# PRSL-AI Intelligent Capability Architecture Specification

**Version:** 1.0.0  
**Status:** Draft  
**Owner:** Robert Software Labs

## 1. Purpose

ICAS establishes a provider-independent architecture for describing and resolving human outcomes into governed, auditable execution plans. Models, vendors, plugins, frameworks, and transports are implementation choices. They MUST NOT define platform identity or authorization semantics.

## 2. Architectural entities

| Entity | Responsibility | Must not become |
|---|---|---|
| Intent | Expresses the requested outcome | A provider instruction |
| Capability | Defines a reusable, typed function and contract | A vendor-specific feature flag |
| Skill | Composes capabilities into a bounded task procedure | A direct provider credential holder |
| Agent | Performs a specialist role under explicit authority | An authorization authority |
| Policy | Defines constraints and decision rules | A UI-only preference |
| Provider | Supplies an implementation adapter | The source of platform semantics |
| Runtime | Enforces execution boundaries and contracts | An implicit permission grant |
| Router Maestro Resonance | Resolves and plans eligible execution paths | A policy or permission issuer |

## 3. Canonical execution sequence

1. Parse the request and resolve one or more candidate intents.
2. Discover capabilities using declared identifiers, versions, input/output schemas, and lifecycle state.
3. Resolve a compatible skill or an explicitly supported direct capability path.
4. Construct a minimal context envelope; transient context MUST remain distinct from persistent memory.
5. Evaluate applicable policies and obtain an authoritative permission decision for protected operations.
6. Select an eligible agent/runtime and a compatible local or provider adapter.
7. Issue narrowly scoped, short-lived execution authority where required.
8. Execute with bounded inputs, outputs, time, resource budgets, and cancellation.
9. Validate the result against the declared output schema.
10. Record the decision and execution evidence according to retention and privacy policy.

A denied, indeterminate, expired, or unavailable policy decision MUST fail closed for protected operations. A failed local route MUST NOT trigger an unapproved remote fallback.

## 4. Registry contracts

Each registry MUST support stable identifiers, semantic versions, lifecycle state, provenance, schema validation, compatibility checks, and explicit enablement. Discovery MUST distinguish registered, enabled, eligible, available, and executable states. Registration alone MUST NOT imply execution permission.

Recommended registries:
- Intent Registry
- Capability Registry
- Skill Registry
- Agent Registry
- Provider Registry
- Policy Registry

Registry implementations MAY be in-memory, local, database-backed, or distributed, provided that consistency, trust, and failure semantics are documented.

## 5. IMS

The iRiel Manifest Specification is the versioned interchange document that declares catalog metadata and references definitions. IMS is not an executable program and MUST NOT contain credentials, private keys, bearer tokens, personal memory, or secret provider configuration.

See [IMS Manifest Specification](./ims-specification.md) and the [JSON Schema](../../schemas/ims/manifest.schema.json).

## 6. Security model

Authentication, authorization, capability delegation, policy decision, and execution are separate controls.

- OAuth 2.0 Authorization Code with PKCE is the preferred interactive flow for public clients.
- Client Credentials is for confidential workloads only and requires strong client authentication.
- mTLS (RFC 8705) MAY bind access tokens to a client certificate for supported confidential workloads.
- Token Exchange (RFC 8693) MAY create a narrower downstream security context; it MUST NOT amplify authority.
- Refresh-token rotation, replay detection, revocation, audience restriction, issuer validation, and short token lifetimes MUST be defined by the applicable security profile.
- Capability tokens MUST be audience-bound, subject-bound, capability-scoped, constrained, short-lived, non-transferable, and revocable. They MUST NOT be renewable; obtain a new token through a fresh authorization decision.
- A JWT is a signed claims container, not proof that a request is currently authorized. Revocation and policy freshness requirements must be enforced.
- RBAC MAY provide coarse role assignment, but protected actions SHOULD also use resource, purpose, context, and capability constraints (ABAC/ReBAC where appropriate).

OpenAPI OAuth flow declarations document client requirements; they do not implement PKCE verification, mTLS enforcement, token exchange, revocation, or runtime authorization. These controls belong to the identity and execution services.

## 7. Provider independence and local-first policy

Provider adapters MUST implement platform-owned capability contracts. Provider-specific request/response formats MUST remain behind adapters. Selection MUST account for user consent, data classification, locality, accessibility, availability, cost, latency, and policy constraints. No implicit remote fallback is permitted.

## 8. MCP integration boundary

MCP is a future interoperability transport, not the canonical capability model. An MCP server/tool MUST be represented through a reviewed adapter that maps remote tools to registered capabilities, validates schemas, applies user consent and policy, limits authority, and records audit evidence. Tool discovery MUST NOT imply permission to invoke a tool.

## 9. Accessibility and inclusion

Capability and skill contracts SHOULD declare modality support, localization, language tags, assistive-technology considerations, and accessible alternatives. Accessibility requirements are policy inputs, not optional cosmetic metadata.

## 10. Lifecycle and compatibility

Capabilities, skills, agents, providers, and policies use: draft, beta, active, deprecated, retired. Breaking contract changes require a major version increment. Additive compatible changes use a minor increment; editorial or non-contract corrections use a patch increment. Consumers MUST reject unsupported major versions and MUST NOT execute deprecated or retired definitions unless an explicit migration policy allows it.

## 11. Observability and audit

Every execution SHOULD carry a correlation identifier and record the resolved intent, contract versions, policy decision reference, selected adapter, outcome, and timing. Audit records MUST minimize personal data and secrets. Logs MUST NOT store raw credentials, capability-token values, or unnecessary prompt/context content.

## 12. Conformance

A conforming implementation validates manifests, checks references and version compatibility, enforces policy at the execution boundary, rejects unauthorized provider fallback, validates execution inputs/outputs, and emits privacy-minimized audit evidence. Documentation or schema validation alone is not runtime conformance.
