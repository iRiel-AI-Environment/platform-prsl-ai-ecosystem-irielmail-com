# iRiel Context Contract — Apple Shortcuts Interface
## iRiel ↔ PRSL-AI Ecosystem ↔ Apple Integration Layer ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity and context authority:** iRiel AI — PowerFully Intelligence Environment
- **Shared architecture:** PRSL-AI Ecosystem
- **Context consumer:** Apple Shortcuts
- **Execution adapter:** Apple Shortcuts
- **Continuity:** iRiel Resonance
- **Storage/transport:** Provider-independent; iCloud Drive is optional
- **Contract type:** Temporary, operation-scoped context projection
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines the minimum contextual information iRiel may project to Apple Shortcuts so a specific authorized operation can execute correctly.

The projection is operational and purpose-bound. It is not canonical iRiel context, persistent memory, a complete user profile, or the PRSL-AI context architecture. iRiel remains the only canonical authority for selecting, interpreting, updating, and reconciling context.

A file named `Context.md` may be used as a human-readable or machine-consumable transport projection. Its filename, location, or presence does not make it canonical, authoritative, current, or trusted.

## 2. Context authority and principles

The following principles are mandatory:

1. iRiel owns canonical context and controls disclosure.
2. Apple Shortcuts consumes only the context projection authorized for the current operation.
3. Context must be relevant, purpose-limited, minimized, and current.
4. Sensitive context is excluded unless explicitly necessary and authorized for the operation.
5. Context may change between operations; each operation must validate the version and freshness of its projection.
6. Stale, expired, incomplete, conflicting, or unverifiable context must not be treated as current.
7. Context disclosure does not grant action permission, provider permission, or consent to persist memory.
8. Context must be correlated with the originating iRiel intent and operation without exposing canonical identity or memory.
9. Execution results may propose context changes; only iRiel may reconcile them into canonical context.

## 3. Context classification

Context exposed to Shortcuts is a temporary projection of the minimum fields needed for a particular action. Depending on the operation, it may include:
- operation and intent correlation references;
- the requested outcome and bounded action parameters;
- a minimal environment descriptor, such as the execution adapter or supported OS capability;
- explicitly authorized locale, language, time-zone, or formatting preferences when required;
- narrowly scoped resource references or data selected by iRiel;
- permission/confirmation decision references and expiry metadata;
- expected result schema and safe failure-handling instructions.

It must not include by default:
- complete conversation history;
- canonical memory or unrestricted profile;
- unrelated personal, sensitive, or health information;
- authentication secrets, passwords, access tokens, private keys, or provider credentials;
- hidden reasoning or internal policy material;
- broad file-system, contacts, location, or application data when a narrower reference suffices.

## 4. Context projection envelope

Every operational context projection must be versioned and bound to a single purpose. The logical minimum envelope is:

| Field | Requirement | Semantics |
|---|---|---|
| `contract_version` | Required | Version of this context contract |
| `context_projection_id` | Required | Unique identifier for this projection |
| `intent_id` | Required | Opaque reference to the originating validated intent |
| `operation_id` | Required | Opaque reference to the execution operation |
| `context_version` | Required | Monotonic or otherwise comparable version assigned by iRiel |
| `issued_at` | Required | Time at which iRiel issued the projection |
| `expires_at` | Required | Hard expiry; projection is unusable after this time |
| `purpose` | Required | Specific operation purpose and permitted use |
| `source_authority` | Required | Indicates iRiel as the issuing authority |
| `data` | Required | Minimal, typed, operation-scoped context fields |
| `integrity_reference` | Required where supported | Mechanism to verify origin and integrity |
| `continuity_ref` | Required | Opaque reference validated by iRiel; not an identity credential |

Implementations may add bounded, typed fields through a versioned schema. They must not use a context projection as an authorization token or as proof of user consent.

## 5. Context lifecycle

The context projection lifecycle is:

1. **Generate:** iRiel selects the minimum relevant context for an already validated intent.
2. **Authorize disclosure:** iRiel evaluates purpose, sensitivity, recipient, and any required user consent.
3. **Issue:** iRiel creates a versioned, expiring projection bound to the intent and operation.
4. **Consume:** Shortcuts verifies the projection's expected version, operation binding, expiry, and integrity to the extent supported by the adapter.
5. **Execute:** Shortcuts uses the projection only for the authorized action and does not broaden its purpose.
6. **Report:** The execution adapter returns result evidence and any proposed operational changes.
7. **Reconcile:** iRiel validates freshness and provenance, then decides whether to update canonical context.
8. **Expire or revoke:** The projection becomes unusable at expiry, cancellation, revocation, or supersession.

A new operation must not silently reuse a projection issued for a different intent or operation.

## 6. Freshness, staleness, and conflict handling

Before use, the consumer must check:
- contract and schema compatibility;
- exact intent and operation binding;
- issue and expiry timestamps;
- expected context version;
- integrity and source authority where available;
- whether the projection has been revoked or superseded, where the transport supports such checks.

If the current version cannot be established, the projection is stale or unverifiable and must not authorize execution. The consumer should return a structured `context_stale`, `context_expired`, `context_conflict`, or `context_unverified` state to iRiel. iRiel may issue a fresh projection after re-evaluating the intent and permissions.

Concurrent operations must not overwrite each other's context. Updates must be correlated to their originating operation and reconciled using version checks or an equivalent conflict-safe mechanism.

## 7. Context and permission separation

Context is descriptive input, not authority.

Possessing a context field, resource reference, permission label, or previous execution receipt does not grant permission to act. Authentication, authorization, user confirmation, native OS permission, remote disclosure consent, and persistent-memory consent remain distinct decisions.

Shortcuts must execute only the action hand-off authorized by iRiel and the applicable PRSL-AI Permission Manager and trusted execution controls. It must not infer additional permissions from context.

## 8. Storage and transport

iCloud Drive is an optional transport or operational-data adapter. It is not required for iRiel or for this contract. If used, the projection must be access-controlled, integrity-checked where supported, versioned, purpose-bound, and time-limited.

A `Context.md` file in iCloud Drive is a projection only. It must not become:
- the canonical context or memory store;
- the identity or authorization authority;
- an unrestricted shared profile;
- a durable event log unless a separate contract explicitly defines and secures that function.

Local, private, or other authorized transport adapters may replace iCloud Drive without changing canonical context ownership. Loss of an optional storage adapter must not change iRiel identity or authority.

## 9. Continuity and iRiel Resonance

iRiel Resonance maintains coherence between the originating identity, intent, context version, operation, execution result, and authorized state transition.

Resonance does not own context, decide disclosure, grant permissions, or convert an operational projection into persistent memory. Client-supplied continuity references must be validated by iRiel before use.

**Remember continuity. Understand change. Respect the present.**

## 10. Failure and result semantics

If context is missing, stale, expired, malformed, unauthorized, conflicting, or unverifiable, execution must be blocked or returned to iRiel for reconciliation. The adapter must not silently substitute guessed or cached values.

The response must distinguish at least:
- `context_missing`;
- `context_invalid`;
- `context_stale`;
- `context_expired`;
- `context_conflict`;
- `context_unverified`;
- `context_authorization_required`;
- `context_denied`.

A context update returned by Shortcuts is a proposed operational change. iRiel validates it before changing canonical context.

## 11. Implementation-status discipline

This document specifies the context interface. It does not prove that a `Context.md` file, iCloud workflow, Shortcut, App Intent, context adapter, integrity mechanism, or production context synchronization is implemented or deployed.

Implementation claims require supporting code, tests, runtime evidence, and deployment verification appropriate to the claim.

## 12. Related contracts
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
