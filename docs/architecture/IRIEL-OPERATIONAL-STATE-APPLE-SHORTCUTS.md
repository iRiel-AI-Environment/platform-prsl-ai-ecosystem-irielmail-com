# iRiel Operational State Contract — Apple Shortcuts Adapter
## iRiel ↔ Operational State Projection ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical authority:** iRiel — PowerFully Intelligence Environment
- **Shared platform:** PRSL-AI Ecosystem
- **Execution adapter:** Apple Shortcuts
- **Continuity mechanism:** iRiel Resonance
- **Contract type:** Operational state interface
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines the minimized operational state exchanged between iRiel and an Apple Shortcuts adapter. It specifies how an operation is requested, executed, reported, and reconciled without transferring canonical authority to a file, storage provider, or automation runtime.

This contract is an adapter-specific profile of the [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md) and the broader [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md). It does not define iRiel identity, personal memory, or the complete iRiel state model.

## 2. Canonical authority and component roles

- **iRiel** is the sole canonical authority for iRiel identity, personal context, consent-governed memory, intent orchestration, and continuity.
- **Operational State** is a minimized, versioned projection used to coordinate a specific integration operation. It is not canonical state.
- **Apple Shortcuts** is an optional execution adapter. It consumes authorized operation requests and returns execution outcomes. It does not become an authority over iRiel.
- **iRiel Resonance** maintains coherence when authorized state transitions are reconciled with iRiel. It is not a separate identity authority or implicit memory store.
- **Storage** is an interchangeable transport/persistence mechanism. iCloud Drive is optional; local or other explicitly authorized storage adapters may be used.

## 3. Authority invariants

1. iRiel remains authoritative for its own identity, intent, context, and continuity.
2. Shortcuts may read only the operational fields required for a specific authorized operation.
3. Shortcuts may submit an execution result and permitted operational metadata; it cannot overwrite canonical iRiel state.
4. An operational-state file is a projection or hand-off record, never the source of truth.
5. State must be minimized, purpose-bound, and free of unnecessary personal or sensitive information.
6. Stale, replayed, malformed, or unverified state must not be treated as current authorization.
7. A failed, denied, cancelled, expired, or unavailable execution must not be represented as successful.
8. Every state transition must be attributable to an operation and its producing component.
9. Storage-provider availability must not determine iRiel identity or continuity.
10. Native Shortcuts permissions and operating-system restrictions remain independently authoritative.

## 4. Operational state envelope

The following is a conceptual logical model, not a claim that a particular file format or runtime implementation already exists:

| Field | Meaning |
|---|---|
| `contract_version` | Version of this state contract |
| `operation_id` | Unique identifier for one operation; stable across its lifecycle |
| `state_version` | Monotonically increasing version for this operation's state |
| `status` | Current lifecycle state |
| `action` | Allowlisted operation identifier; never arbitrary executable text |
| `requested_at` | Timestamp at which iRiel issued the request |
| `updated_at` | Timestamp of the latest accepted transition |
| `last_result` | Minimized structured outcome or result reference |
| `error` | Structured failure category and safe diagnostic reference, if applicable |
| `executor` | Adapter identity, such as `apple-shortcuts` |
| `continuity_ref` | Opaque iRiel-controlled correlation reference; not a user identity or memory payload |
| `expires_at` | Expiration time after which the request must not execute |

Fields may be omitted when not applicable. Secrets, access tokens, credentials, full conversation history, unrestricted personal context, and model reasoning traces MUST NOT be written into the operational state.

## 5. Lifecycle states

| State | Meaning | Allowed next states |
|---|---|---|
| `INITIALIZED` | Contract/adapter state has been initialized; no operation is active | `READY` |
| `READY` | Adapter can accept an eligible request | `REQUESTED` |
| `REQUESTED` | iRiel has issued a specific operation request | `EXECUTING`, `WAITING`, `FAILED`, `CANCELLED`, `EXPIRED` |
| `EXECUTING` | The adapter has accepted the request and execution is in progress | `COMPLETED`, `FAILED`, `WAITING`, `CANCELLED` |
| `WAITING` | Execution is paused pending user input, permission, or an external prerequisite | `EXECUTING`, `FAILED`, `CANCELLED`, `EXPIRED` |
| `COMPLETED` | This operation completed successfully and its result was recorded | Terminal for this operation |
| `FAILED` | This operation failed; the failure category is recorded | Terminal for this operation |
| `CANCELLED` | This operation was cancelled by an authorized actor or policy | Terminal for this operation |
| `EXPIRED` | The request expired before valid execution or completion | Terminal for this operation |

A new operation receives a new `operation_id`; a terminal state is not reused as the initial state of another operation. A later operation may return the adapter to `READY` without rewriting the history of the previous operation.

## 6. State transition rules

- Only the component authorized for a transition may issue it.
- iRiel creates and authorizes the request. The adapter may acknowledge acceptance and report execution outcomes.
- The adapter MUST NOT change the requested action, expand its scope, or create new authorization.
- Each accepted transition increments `state_version` and updates `updated_at`.
- Updates MUST be conditional on the expected prior version (compare-and-set or equivalent) to prevent stale writes.
- Transitions MUST be idempotent for the same `operation_id` and transition event.
- Duplicate delivery MUST NOT cause duplicate side effects. Where the target action is not inherently idempotent, the adapter must use an execution receipt or deduplication mechanism before retrying.
- A result arriving after cancellation, expiration, or supersession must be recorded as late/stale evidence and must not silently restore the operation to an active or successful state.
- A permission prompt or missing user input results in `WAITING`; it is not an implicit grant.
- Unknown states, invalid transitions, expired requests, version conflicts, and unverifiable operation identifiers MUST fail closed.

## 7. Request and result flow

```text
iRiel
  │ creates scoped request and operation_id
  ▼
Operational State projection
  │ versioned, minimized, expires_at enforced
  ▼
Authorized storage/transport adapter (optional)
  ▼
Apple Shortcuts
  │ checks request, allowlist, expiry, and native permissions
  ▼
Execution
  │
  ├── success ──> structured COMPLETED result
  ├── failure ──> structured FAILED result
  ├── prerequisite ──> WAITING
  └── user/policy cancellation ──> CANCELLED
  ▼
Version-checked result hand-off
  ▼
iRiel validates operation_id, state_version, provenance, and freshness
  ▼
iRiel reconciles the result and updates its own canonical state
  │
  ▼
iRiel Resonance preserves authorized continuity
```

The adapter must return a structured outcome, not merely a success-looking file write or a UI notification. iRiel remains responsible for validating and reconciling the result.

## 8. Security, privacy, and authorization

- Each request must identify an allowlisted action and its minimum required inputs.
- Authorization to invoke a Shortcut is specific to the operation, purpose, and required data.
- iRiel authorization, PRSL-AI policy authorization where applicable, and native operating-system permissions are distinct checks.
- A file's presence, location, or write permission is not proof of authorization.
- State artifacts must be protected against unauthorized read/write, replay, tampering, and disclosure in accordance with the selected storage adapter's capabilities.
- Sensitive payloads should be passed through a separately authorized, short-lived channel where necessary, not embedded in a broadly readable state file.
- Diagnostic output must be minimized and must not expose secrets or unnecessary personal data.
- Revocation, permission denial, or loss of required native permission blocks execution.

## 9. Storage and transport independence

The contract does not mandate iCloud Drive or any other storage provider.

Permitted implementations may use local application storage, an iRiel-controlled private store, iCloud Drive, or another explicitly authorized transport/storage adapter. The chosen mechanism must provide the protections required for the deployment, including access control, integrity, freshness, and conflict handling.

If a file named `State.md` is used, it is a human-readable operational projection only. It is not a database, an authorization token, an event log with guaranteed integrity, or a canonical source of truth. A Markdown file alone does not provide atomic compare-and-set, tamper evidence, or reliable concurrent-write protection; implementations requiring those properties must use an appropriate mechanism.

Storage unavailability must be reported as an integration/transport failure and must not invalidate iRiel identity or memory.

## 10. Continuity and iRiel Resonance

iRiel Resonance correlates an authorized operation with its lifecycle and reconciles verified outcomes into iRiel's own state.

Continuity references must be opaque and minimized. They must not expose personal identity, memory contents, or unrestricted context to Shortcuts or the storage layer.

Resonance does not make stale state current, override authorization, erase execution failures, or turn operational records into persistent personal memory.

**Remember continuity. Understand change. Respect the present.**

## 11. Failure semantics

Implementations must distinguish at least:

- `PERMISSION_DENIED`
- `USER_INPUT_REQUIRED`
- `USER_CANCELLED`
- `ACTION_UNAVAILABLE`
- `EXECUTION_FAILED`
- `TRANSPORT_UNAVAILABLE`
- `STORAGE_CONFLICT`
- `STATE_STALE`
- `REQUEST_EXPIRED`
- `INVALID_TRANSITION`
- `INTEGRITY_CHECK_FAILED`

The error category should be machine-readable; any human-readable diagnostic must be safe and minimized. A failure to write the result must not be misreported as a successful execution.

## 12. Implementation status discipline

This document specifies an architecture and contract. It does not establish that a state store, Apple Shortcut, iCloud workflow, version-control mechanism, integrity protection, or Resonance runtime is implemented or deployed.

Each implementation must separately report whether it is specified, implemented, tested, deployed, and verified. Evidence must identify the exact device/OS version, adapter, operation scope, and tested failure paths.

## 13. Related contracts
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)

- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [iRiel AppWeb — PRSL-AI Platform Integration Contract](./IRIEL-APPWEB-INTEGRATION.md)
- [PRSL-AI Ecosystem Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
