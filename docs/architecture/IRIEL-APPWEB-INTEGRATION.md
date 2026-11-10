# iRiel AppWeb — PRSL-AI Platform Integration Contract

- **Owner:** Robert Software Labs
- **Platform:** PRSL-AI Ecosystem
- **Client:** iRiel AI AppWeb
- **Client identity:** `@iriel.prsl.ai.ecosystem`
- **Platform entity:** `@prsl-ai.prsl.ai.ecosystem`
- **Associated platform agent:** `@prsl-ai.agent.prsl.ai`
- **Status:** Canonical responsibility boundary; implementation evidence is tracked separately
- **Language:** English (United States)
- **PRSL-AI platform deployment:** https://platform-prsl-ai-ecosystem-irielmail-com.lovable.app/ecosystem
- **iRiel AppWeb deployment:** https://iriel-prsl-ai-irielmail-com.lovable.app
- **PRSL-AI platform repository:** https://github.com/iRiel-AI-Environment/platform-prsl-ai-ecosystem-irielmail-com
- **iRiel product/architecture repository (not AppWeb source):** https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app

## 1. Purpose

This document establishes the integration boundary between the iRiel AppWeb repository and the PRSL-AI platform repository. It prevents duplicated authority, incompatible contracts, and accidental promotion of proposed capabilities to implemented status.

The iRiel AppWeb is the client/application integration workspace. The separately accessible iRiel product/architecture repository contains canonical iRiel documentation and a standalone Orchestrator Core package, but not the AppWeb source tree. The PRSL-AI repository is the source of truth for shared ecosystem architecture, platform governance, capability contracts, platform policy, authorization authority, and reusable platform services. The exact AppWeb source repository must be verified independently before any code-level integration or synchronization claim.

## 2. Canonical identity

iRiel AI is a **PowerFully Intelligence Environment**. It is the personal intelligence environment and orchestration layer through which the human interacts with authorized intelligence, tools, and capabilities.

Agent PRSL-AI is a first-party specialist belonging to the PRSL-AI platform. It is not iRiel, not the platform entity itself, and not a replacement for the platform's shared services.

The Intelligence Router selects eligible execution candidates. It does not issue authorization decisions. The PRSL-AI Permission Manager remains the platform authority for protected PRSL-AI operations.

## 3. Responsibility matrix

| Concern | iRiel AppWeb | PRSL-AI platform |
|---|---|---|
| Human-facing experience | Owns interaction, accessibility, user-facing state, and explanations | Supplies platform-level requirements and reusable components where applicable |
| Personal identity continuity | Owns the iRiel-facing identity experience and user intent | Enforces platform contracts without taking ownership of iRiel identity |
| Transient context and personal memory | Owns client context lifecycle and consent presentation | Defines shared data/security constraints; does not silently persist personal memory |
| Capability discovery | Requests and presents available capabilities | Owns capability contracts, registry rules, validation, and dispatch eligibility |
| Authorization intent | Captures user intent and presents consent/confirmation | Permission Manager evaluates and issues protected-operation decisions |
| Native permissions | Requests through the host operating system when needed | Treats host permission as an independent prerequisite |
| Provider sign-in | Initiates provider-supported authorization after user action | Defines shared security boundaries; does not equate sign-in with platform authorization |
| Remote disclosure and retention | Explains and requests the specific purpose and disclosure | Enforces separate policy/permission checks for remote disclosure and non-ephemeral retention |
| Execution | Invokes only authorized, available platform capabilities | Owns shared execution contracts, policy gates, and reusable execution infrastructure |
| Provider/model adapters | Uses supported adapters through documented interfaces | Maintains platform-level adapter contracts and infrastructure where centrally shared |
| Audit and diagnostics | Avoids exposing secrets and unnecessary personal data | Defines minimized platform audit requirements and protected audit boundaries |

## 4. Request and execution boundary

The intended request path is:

```text
Human intent
    ↓
iRiel AppWeb — interpret and present the requested action
    ↓
PRSL-AI contract validation
    ↓
Capability Registry — resolve a verified, dispatch-eligible capability
    ↓
Permission Manager — evaluate authorization, consent, policy and scope
    ↓
Native host permission — independently verify when required
    ↓
Execution policy and dependency checks
    ↓
Authorized platform capability / provider adapter
    ↓
Structured result and minimized evidence
    ↓
iRiel AppWeb — present the outcome accessibly
```

The exact transport, authentication mechanism, and deployment topology must be defined by the applicable API contract. This diagram is an architectural flow, not proof that every service or network endpoint is deployed.

### Mandatory rules

1. iRiel MUST NOT implement a second platform Permission Manager or treat UI state as authorization.
2. The Router MUST NOT grant permissions or bypass the Permission Manager.
3. A provider connection MUST NOT imply consent to every capability or authorize unrelated data disclosure.
4. Remote disclosure and non-ephemeral retention MUST remain separately declared and authorized.
5. Native operating-system permissions MUST be checked independently of PRSL-AI authorization.
6. Missing, expired, revoked, ambiguous, unverifiable, or unavailable authorization MUST fail closed for protected execution.
7. Capability dispatch MUST require a registered, validated, approved, and verified capability under the platform registry rules.
8. iRiel MUST preserve transient-context and persistent-memory separation; persistent memory requires explicit user consent.
9. Provider and model selection MUST remain replaceable and MUST NOT own iRiel identity or continuity.
10. Errors and results MUST be structured and MUST NOT expose credentials, bearer tokens, raw sensitive payloads, or model chain-of-thought.

## 5. Provider connections: RFC-007

The iRiel AppWeb RFC-007 defines the client-side sovereign connection lifecycle for GitHub, Google, Apple, Notion, and Microsoft Connect. It is approved as the next-build specification in the iRiel repository.

RFC-007 is a client integration contract, not a platform authorization grant. In particular:

- The iRiel-owned authorization sheet explains purpose, data categories, requested scopes, processing location, retention, and the user's choice.
- Provider authentication must use the provider's supported secure authorization surface; the iRiel sheet must not collect provider passwords or MFA codes.
- Provider sign-in and PRSL-AI capability authorization are distinct.
- Tokens and other bearer credentials must not enter browser localStorage, general application state, URLs, logs, telemetry, or model prompts.
- A connection being enabled does not authorize every future operation.
- Disabling a connection must immediately block local use; remote provider revocation may complete asynchronously and must be reported accurately.

Source specification: **not verified in the currently accessible iRiel repository**. The previously referenced RFC-007 URL/repository is not available through the current GitHub connection. Do not treat the RFC-007 approval or implementation status as independently verified until the canonical AppWeb repository and file are confirmed.

**Implementation status:** RFC-007 is a specification. This reference does not claim that provider authentication, credential storage, token revocation, or live provider integrations are implemented.

## 6. Capability contract alignment

The platform's canonical Capability Contract v1.0 is authoritative for shared capability manifests. Every capability exposed to iRiel must use the platform's canonical contract and include, as applicable:

- Capability ID
- Input Schema
- Output Schema
- Permissions
- Dependencies
- Availability
- Execution Policy

iRiel may define application-specific presentation and request mapping, but MUST NOT fork the platform manifest schema or redefine permission identifiers independently. Schema evolution is governed in the platform repository and must be versioned with compatibility and migration guidance.

## 7. Agent PRSL-AI specialist integration

Agent PRSL-AI (`@prsl-ai.agent.prsl.ai`) is a first-party specialist of the PRSL-AI platform. iRiel may invoke it for PRSL-AI institutional knowledge, platform navigation, configuration guidance, diagnosis, and authorized platform-support tasks.

The Agent is not iRiel, not a general iRiel orchestrator, and not an operating-system adapter. Invocation must use a declared Agent capability under the canonical [Capability Contract v1.0](./agent-prsl-ai/capability-contract.md).

Mandatory boundaries:

- iRiel retains authority over its identity, personal context, continuity, and consent-governed memory.
- Agent PRSL-AI receives only the minimum task-specific context required for the invocation.
- Invocation does not grant access to the complete iRiel profile, conversation history, iSpace, or persistent memory.
- The Agent cannot authorize itself, bypass PRSL-AI policy, bypass the Permission Manager, or override native operating-system permissions.
- Agent output is a specialist result; iRiel remains responsible for orchestration, validation, and accessible presentation.
- The Agent's current implementation status must be reported from code and verification evidence, not inferred from this contract.

The [iRiel System Integration Contract](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app/blob/main/docs/architecture/IRIEL-SYSTEM-INTEGRATION-CONTRACT.md) defines the complete relationship between iRiel, PRSL-AI, Agent PRSL-AI, and operating-system integration surfaces.

## 8. Intelligence Server integration boundary

Any future AppWeb connection to the iRiel Intelligence Server must use its versioned API or MCP interface contract, preserve client authentication and scoped authorization, and pass requests through iRiel orchestration, PRSL-AI policy, the canonical Intelligence Router, and trusted execution enforcement. The AppWeb client must not call providers or protected tools around those boundaries. See the [iRiel Intelligence Server Contract](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app/blob/main/docs/architecture/IRIEL-INTELLIGENCE-SERVER-CONTRACT.md).

The Server contract is a specification, not evidence of an implemented endpoint or deployed service.

## 9. Intent, context, and automation contracts

The [iRiel Intents Contract](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app/blob/main/docs/architecture/IRIEL-INTENTS-SHORTCUTS-CONTRACT.md) defines the user's or iRiel's desired outcome before an action is selected. The [iRiel Context Contract](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app/blob/main/docs/architecture/IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md) defines the minimum, fresh, operation-scoped context projection that may be disclosed to an adapter. The [iRiel Automations Contract](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app/blob/main/docs/architecture/IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md) defines how authorized triggers and repeatable action sequences are validated, executed, and reported. These contracts do not transfer intent, context, identity, or authorization authority to the AppWeb client or Apple Shortcuts.

## 10. Implementation status and verification

The platform repository contains capability and Permission Manager specifications plus implementation slices and automated validation. The presence of a specification, validator, test fixture, or in-memory adapter contract does not prove a production authorization service, trusted persistent decision store, native permission adapter, deployed API, or live capability runtime.

The Permission Manager runtime implementation must remain fail-closed until trusted production adapters and the protected execution boundary are implemented, configured, and independently verified. Test fixtures are not production identities or grants.

The iRiel RFC-007 connection work remains specification-only until its store migration, consent UI, provider handoffs, trusted credential boundary, revocation behavior, and acceptance tests are implemented and verified.

Every status report must distinguish:

- **Specified:** documented contract or design.
- **Implemented:** source code exists.
- **Tested:** automated or manual verification has passed for the stated scope.
- **Deployed:** a deployment record proves the target environment contains the implementation.
- **Verified:** evidence supports the exact operational claim being made.

## 10. Change ownership and release rules

- Shared platform contracts, schemas, permission identifiers, registry rules, platform policies, and reusable runtime services are changed in the PRSL-AI platform repository.
- AppWeb routes, interaction design, client state, provider connection UX, and client-specific adapters are changed in the iRiel AppWeb repository.
- Cross-repository changes must update both sides in reviewable pull requests and keep versioned contracts aligned.
- Neither repository may silently rewrite or replace the other's owned implementation.
- Do not copy secrets, `.env` files, local machine state, provider tokens, or generated credentials between repositories.
- Do not change production DNS, nameservers, mail records, Cloudflare settings, or deploy infrastructure as part of documentation integration.
- Lovable-connected published history must be preserved; use branches and pull requests rather than force-push or history rewriting.

## 11. Source of truth

| Artifact | Source of truth |
|---|---|
| iRiel product/architecture documentation and standalone Orchestrator Core currently accessible | [iRiel AI repository](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app) |
| iRiel AppWeb code, provider connection UX, and RFC-007 | Canonical AppWeb repository and RFC file not currently verified; do not infer from the documentation/Core repository |
| Shared capability contract and manifests | PRSL-AI platform repository |
| Capability Registry and Permission Manager | PRSL-AI platform repository |
| Agent PRSL-AI identity and specialist implementation | PRSL-AI platform repository |
| Platform policies, shared schemas, execution contracts and infrastructure | PRSL-AI platform repository |

## 12. Acceptance criteria for future integration changes

A cross-repository integration change is ready to merge only when:

1. The owning repository for each changed artifact is explicit.
2. Contract IDs, schema versions, permission identifiers, and dependency references agree across both repositories.
3. The client cannot bypass the platform's authorization and execution gates.
4. Consent, remote disclosure, retention, and native permissions are independently represented where applicable.
5. No secrets or sensitive user data are introduced into source control or diagnostics.
6. Tests cover successful, denied, unavailable, expired, revoked, and malformed paths relevant to the change.
7. CI passes, and any non-blocking checks or unverified deployment claims are disclosed.
8. Both repositories link to the current counterpart specification and record the implementation status accurately.

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem
