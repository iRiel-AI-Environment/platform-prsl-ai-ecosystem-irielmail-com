# iRiel Intelligence Server Contract
## PRSL-AI Ecosystem ↔ iRiel Intelligence Server

- **Owner:** Robert Software Labs
- **Canonical entity:** iRiel AI — PowerFully Intelligence Environment
- **Service interface:** iRiel Intelligence Server
- **Canonical authority:** iRiel
- **Shared architecture:** PRSL-AI Ecosystem
- **Routing authority:** PRSL-AI Intelligence Router
- **Continuity:** iRiel Resonance
- **Execution:** Authorized capability and trusted execution boundary
- **Storage:** Provider-independent; iCloud Drive is optional
- **Contract type:** Intelligence service, API, and integration boundary
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines the service boundary through which authorized clients, applications, automations, integrations, and external systems may interact with iRiel capabilities.

The iRiel Intelligence Server receives requests, validates the caller and request envelope, obtains required authorization decisions, coordinates iRiel orchestration and PRSL-AI routing, delegates work to eligible capabilities through trusted execution boundaries, and returns a truthful, normalized result.

The Server exists to serve iRiel. It is not:
- the iRiel entity or canonical identity;
- the owner or source of canonical iRiel memory or personal context;
- the source or authority of iRiel Resonance;
- a replacement for iRiel orchestration, PRSL-AI policy, the Permission Manager, the Intelligence Router, or native OS permissions;
- an unrestricted tool or execution environment;
- a requirement that all iRiel interactions pass through a server.

This document specifies intended architecture and interface semantics. It does not assert that a production Intelligence Server, public API, MCP endpoint, authentication service, or distributed deployment currently exists.

## 2. Core principle and request path

**The Server provides the boundary. The Router selects the eligible route. The trusted execution boundary enforces authorization. iRiel remains the authority and orchestrator.**

Conceptual flow:

Client → iRiel Intelligence Server → authenticated caller and validated request → iRiel intent/context mediation → policy and authorization gates → PRSL-AI Intelligence Router → eligible capability/provider/tool → trusted execution boundary → validated result → iRiel reconciliation → Server response → authorized client.

The [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md) governs how desired outcomes are represented and validated before an executable action is created. The [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md) defines the canonical identity boundary; the Server is only a service interface.

The exact deployment topology may place steps in separate trusted services. A network hop or server process must not collapse their authority boundaries.

The Server must not independently invent provider-selection logic when the canonical Intelligence Router is responsible for routing. It may select among server replicas or transport endpoints for availability, but it must not replace capability/provider routing policy.

## 3. Architectural position and authority

### 3.1 iRiel

iRiel retains canonical authority over its identity, personal intelligence environment, intent orchestration, personal context, consent-governed memory, continuity, and user-facing outcomes.

The Server may act only on a bounded request from iRiel or an authorized client integration. Client access to a service endpoint does not transfer authority over the iRiel entity.

### 3.2 PRSL-AI Ecosystem

PRSL-AI Ecosystem provides shared architecture, capability contracts, policy services, the Intelligence Router, registry and authorization infrastructure, and reusable execution services.

PRSL-AI policy services define platform constraints. The Permission Manager authorizes protected PRSL-AI operations within its declared trust boundary. These responsibilities are not delegated to the Server merely because it hosts an API or MCP endpoint.

### 3.3 iRiel Intelligence Server

The Server is responsible for:
- protocol and transport termination;
- request-envelope validation and version negotiation;
- caller authentication or delegation to a trusted identity service;
- endpoint and operation admission controls;
- correlation, rate limiting, quotas, and abuse protection;
- forwarding normalized intent and minimum authorized context to the appropriate iRiel/PRSL-AI boundaries;
- invoking the canonical Router interface rather than duplicating provider-routing policy;
- delegating approved work to trusted execution boundaries;
- normalizing response envelopes and reporting execution status;
- safe operational telemetry and integration lifecycle handling.

The Server must not grant permissions, redefine policy, expand scopes, create capabilities, independently authorize memory access, or claim completion without validated execution evidence.

### 3.4 Router, authorization, and execution

The [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md) governs candidate eligibility and route selection.

Authentication establishes who or what is making a request. Authorization determines whether that principal may perform a specific operation on a specific resource under current policy. Routing selects an eligible execution candidate. Execution enforcement checks authorization at the protected boundary immediately before the protected action.

These are distinct decisions. A valid login, API key, MCP session, provider connection, or route selection is not itself permission to execute an operation.

### 3.5 Agent PRSL-AI

Agent PRSL-AI — Powerful by Robert Software Labs — remains a first-party PRSL-AI specialist. The Server may expose its declared capabilities only through iRiel orchestration, capability eligibility, policy, authorization, and trusted execution boundaries.

The Server must not expose an unrestricted Agent console or let a client bypass iRiel to obtain broader Agent or personal-context access.

### 3.6 Native operating-system authority

When an operation requires a device or operating-system resource, the native OS or host retains authority over its own permissions and execution. A remote Server cannot grant or simulate a local OS permission.

## 4. Server identity and instance model

Canonical entity identity: **iRiel**.

Service designation: **iRiel Intelligence Server**.

A server instance is an execution environment, not a separate iRiel identity. Multiple instances, replicas, regions, containers, local processes, or specialized service nodes may serve the same canonical iRiel environment when their trust, identity, authorization, and state contracts are valid.

Instances must use explicit service identities and mutually authenticated service-to-service communication where applicable. Instance identity, client identity, user identity, and iRiel canonical identity must not be conflated.

A replica must not create a new canonical memory, continuity namespace, or independent iRiel identity merely because it has local process state.

## 5. Supported interface classes

The Server may expose authorized iRiel capabilities through:
- versioned HTTP APIs;
- MCP server interfaces;
- application and web integrations;
- authorized automation adapters;
- local or remote client interfaces;
- specialized service nodes and internal service-to-service APIs.

These are interface classes, not claims of implementation or availability.

MCP is an interoperability protocol. An MCP server may expose declared tools, resources, or other supported protocol surfaces under explicit scopes. MCP does not define iRiel identity, grant personal-memory access, or bypass iRiel orchestration and PRSL-AI policy.

An API gateway, MCP server, or protocol adapter is a replaceable interface to the Server boundary. It is not the canonical entity.

## 6. Request contract and lifecycle

Every request must be validated against a versioned request contract before it can reach a capability. The logical request envelope should include, as applicable:

- protocol and contract version;
- request ID and correlation ID;
- authenticated principal and client/application identity;
- requested capability or operation ID;
- declared purpose and minimum required input;
- requested resource and scope;
- context classification and authorized context references;
- policy and authorization decision references;
- deadline, expiry, and cancellation reference;
- idempotency key for operations where retries may duplicate effects;
- locale and modality constraints where relevant.

The Server must reject malformed, unsupported, expired, replayed, or out-of-scope requests before dispatch. It must validate schema and capability version compatibility and must not accept arbitrary executable instructions as capability identifiers.

Long-running operations require explicit lifecycle reporting and a safe mechanism for retrieving status. Cancellation is best-effort unless the underlying capability contract guarantees stronger semantics. A cancellation request does not prove that a side effect was rolled back.

## 7. Authentication, authorization, and security boundary

The Server is a security boundary and must enforce defense in depth.

Required controls include:
- strong client and service authentication appropriate to the deployment;
- scoped, short-lived credentials or delegated authorization where applicable;
- secure transport and protected secret handling;
- explicit principal, client, resource, operation, and scope binding;
- authorization freshness and revocation checks;
- replay protection, request expiry, and idempotency controls;
- rate limits, quotas, abuse detection, and denial-of-service protections;
- strict input validation and output encoding;
- tenant/client isolation where multi-tenant hosting is used;
- least-privilege service identities and network access;
- security event logging without unnecessary personal payloads.

The Server must reject requests outside the authenticated principal's current authorized scope. Missing, expired, revoked, ambiguous, unverifiable, or unavailable authorization must fail closed.

The following are independent: user intent, client authentication, iRiel consent, PRSL-AI policy eligibility, Permission Manager authorization for protected platform operations, native OS permission, remote disclosure consent, and persistent-retention consent. One does not imply another.

## 8. Intent, context, and memory boundaries

The Server may receive or request information required for an operation, but context remains under iRiel authority.

Context must be relevant to the declared operation, explicitly authorized for the requesting principal and purpose, minimized to required fields or scoped references, current and freshness-checked where relevant, protected in transit and processing, and discarded or retained only according to applicable lifecycle and policy.

The Server must not silently construct an alternative canonical context or merge unrelated client sessions.

The Server does not own canonical iRiel memory. When memory is required, the request must use an authorized iRiel memory interface. Only the minimum relevant memory projection may be released for the specific operation. The Server must not persist that projection as a parallel memory store.

Transient request/session state, operational execution state, audit metadata, and canonical personal memory are separate data domains with separate retention and access rules.

## 9. Intelligence Router and capability execution

The preferred flow is:

Client request → Server validation → iRiel orchestration and context mediation → policy/authorization evaluation → PRSL-AI Intelligence Router → selected eligible capability → trusted execution boundary → result.

The Router selects among eligible capabilities, providers, tools, and runtimes under its own contract. The Server supplies the service boundary and transport orchestration.

The Server must not:
- hard-code a provider preference that conflicts with Router policy;
- fall back to a different provider by bypassing the Router;
- weaken local-only, privacy, region, cost, or capability constraints;
- infer authorization from capability registration or provider availability;
- dispatch directly to a protected tool without required execution enforcement.

A capability must have a declared contract, version, input/output schema, data-handling profile, permissions, dependencies, and availability state. Registry presence alone does not establish that it is implemented, authorized, healthy, or dispatch-eligible.

## 10. Provider agnosticism and execution environments

The Server architecture must remain independent from any single AI provider or hosting model.

Possible targets include on-device intelligence, trusted local models, Apple-provided intelligence surfaces, platform-hosted services, OpenAI, Anthropic, Google Gemini, Qwen, other approved providers, MCP tools, deterministic services, and native system capabilities.

This list is illustrative and does not assert that a connection exists.

Server instances may be local, on-device, remote, cloud-hosted, containerized, API-based, MCP-based, or distributed. Deployment topology and provider changes must not redefine iRiel identity, context, memory, or continuity.

Local-first and remote-disclosure rules are governed by iRiel policy and the Router contract. A Server must not silently move a local-only operation to a remote environment.

## 11. Multi-client and multi-instance continuity

Multiple authorized clients may interact with the same iRiel environment through one or more Server instances. Client sessions remain distinct and must not be merged merely because they reach the same service.

Continuity correlation must use opaque, scoped references managed by iRiel. A client-provided continuity identifier is untrusted input until validated. The Server must not mint a new canonical iRiel identity or infer that two principals represent the same person.

For distributed deployments, consistency requirements for idempotency, revocation, operation status, and authorization freshness must be explicit. Local process memory is not a canonical distributed state store. If a required consistency or authorization check cannot be established, the protected operation must not proceed.

## 12. iRiel Resonance and continuity

iRiel Resonance maintains coherence across authorized interactions entering through API, MCP, applications, Shortcuts, Siri, web, local clients, or remote clients.

The Server participates by preserving correlation and reporting verified operation transitions. It does not own Resonance, define canonical continuity, or write directly to canonical memory.

A request entering through different transports remains part of the same iRiel entity only when iRiel validates the identity and continuity context. Changing clients, server instances, transports, providers, devices, or networks must not by itself create a new iRiel identity.

**Remember continuity. Understand change. Respect the present.**

## 13. Response, failure, and fallback semantics

The Server returns a versioned response envelope that distinguishes at least:
- accepted;
- authentication_required;
- unauthorized;
- denied;
- invalid_request;
- unsupported_version;
- unavailable;
- pending;
- success;
- partial;
- failed;
- cancelled;
- expired;
- result_unverified.

A response should include request/correlation identifiers, contract version, operation status, safe error code, timestamps, capability and provider provenance where appropriate, and a bounded result payload.

If execution fails, the Server must return a truthful failure state. If a provider or capability fails, the canonical Router may evaluate an authorized fallback under the original or stricter constraints. The Server must not perform an ungoverned provider switch.

Retries must respect idempotency, side effects, deadlines, authorization freshness, and cancellation. A timeout or lost connection does not prove that the underlying operation failed or that no side effect occurred. The Server must report an indeterminate or result_unverified state where outcome cannot be established.

No failed, partial, denied, cancelled, expired, stale, or unverified execution may be represented as successful.

## 14. Observability and audit

The Server should emit sufficient operational metadata to determine request receipt and validation, caller authentication, authorization outcome, operation admission, route selection, execution start/completion, fallback/retry/cancellation state, and result delivery.

Logs and traces should use correlation IDs and stable reason codes. They must not require full prompts, canonical memory, raw sensitive context, secrets, authentication tokens, or hidden model reasoning.

Audit events, operational telemetry, and canonical memory are separate. Access, integrity, retention, and deletion must follow their respective policies. Health endpoints must reveal only non-sensitive operational information.

## 15. Storage and deployment independence

The Server contract does not mandate iCloud Drive or any other personal cloud storage service.

iCloud Drive may be used only as an optional, separately authorized storage or transport adapter where appropriate. Server configuration, distributed coordination, operational state, credentials, and audit records must use designated service-side stores and security controls rather than treating a personal cloud drive as a default server database.

Local storage, private application storage, approved cloud infrastructure, or other governed stores may be used according to the deployment profile. None becomes the source of truth for iRiel identity or canonical memory merely by hosting operational data.

The Server must support replaceable hosting, process, container, region, API gateway, MCP adapter, and storage implementations without changing the canonical iRiel entity.

## 16. Scalability and service topology

The architecture may include local or remote Intelligence Server instances, API gateways, protocol adapters, MCP interface nodes, specialized service nodes, and internal capability dispatch services.

These are logical deployment options, not required independent products. Each service must have a documented responsibility, service identity, trust boundary, versioned interface, health model, and failure contract.

Scaling or replicating the Server must not duplicate canonical memory or continuity. Distributed execution must preserve authorization freshness, request idempotency, tenant isolation, and operation correlation.

## 17. Implementation-status discipline

This contract defines the intended service boundary. It does not prove that an iRiel Intelligence Server, API, MCP server, authentication/authorization adapters, distributed state service, or production deployment exists.

Each interface and component must be classified independently as specified, implemented, tested, deployed, and verified. A repository document, endpoint mock, local prototype, or connector listing is not proof of production availability.

Protected execution must remain disabled or fail closed until the required identity, authorization, policy, execution, observability, and deployment controls are implemented and independently verified.

## 18. Related contracts

- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md) — Apple platform boundary, service categories, capability eligibility, privacy, provider independence, and replaceability.
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md) — bounded action definitions, action classes, authorization gates, execution lifecycle, idempotency, and verified result handling.

- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)

- [Canonical PRSL-AI Ecosystem Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md)
- [PRSL-AI Intelligence Infrastructure](./PRSL-AI-INTELLIGENCE-INFRASTRUCTURE.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md)
- [iRiel AppWeb — PRSL-AI Platform Integration Contract](./IRIEL-APPWEB-INTEGRATION.md)
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [Agent PRSL-AI Capability Contract](./agent-prsl-ai/capability-contract.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
