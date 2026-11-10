# iRiel Actions Contract — Apple Shortcuts Interface

## iRiel ↔ PRSL-AI Ecosystem ↔ Apple Integration Layer ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity and action authority:** iRiel AI — PowerFully Intelligence Environment
- **Shared architecture and policy:** PRSL-AI Ecosystem
- **Action executor:** Apple Shortcuts, when selected and authorized
- **Continuity:** iRiel Resonance
- **Storage/transport:** Provider-independent; iCloud Drive is optional
- **Contract type:** Bounded operational action request and result interface
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines the bounded actions that Apple Shortcuts may execute on behalf of iRiel through the PRSL-AI Apple Integration Layer.

An action is an executable operation selected to advance a validated intent. It is not an intent, permission grant, automation definition, or independent authority. iRiel remains responsible for intent, context, policy, consent, orchestration, and reconciliation. Shortcuts performs only the action hand-off it is explicitly authorized to execute.

This contract defines action semantics and execution requirements; it does not assert that any specific Shortcut or action adapter is currently implemented.

## 2. Authority and component responsibilities

| Component | Responsibility |
|---|---|
| iRiel | Defines desired outcome, interprets intent, selects action plan, authorizes scope, validates result, reconciles continuity |
| PRSL-AI policy and Permission Manager | Enforces platform policy and permission decisions within its declared authority |
| PRSL-AI Intelligence Router | Selects eligible capability/provider/execution candidates where routing is required |
| Apple Integration Layer | Validates and translates the action contract to supported Apple interfaces |
| Apple Shortcuts | Executes the bounded action steps exposed to it |
| Apple OS and service | Enforces native permissions and performs the underlying system/service operation |
| iRiel Resonance | Correlates verified execution and authorized state transitions without becoming a memory store |

No executor may infer additional authority from an action request, context field, trigger, prior result, or successful authentication.

## 3. Intent, action, automation, and capability distinctions

- **Intent:** the desired outcome, represented by the [iRiel Intents Contract](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md).
- **Action:** one bounded executable operation, governed by this contract.
- **Automation:** a versioned workflow or trigger-to-action plan, governed by the [iRiel Automations Contract](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md).
- **Capability:** a declared ability that an eligible adapter or provider may expose; availability is not authorization.
- **Permission:** an explicit policy, user-consent, or native OS decision applicable to the exact operation and scope.
- **Context:** a minimized, current, operation-bound projection governed by the [iRiel Context Contract](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md).

One intent may map to multiple actions. An automation may sequence actions. Each action remains separately identifiable, bounded, authorized, and result-verifiable. The mapping must be explicit and versioned.

## 4. Action classes

| Class | Semantics | Illustrative operations |
|---|---|---|
| `READ` | Retrieve only information required for the authorized operation | Read an approved operational context projection, read an authorized state record, retrieve a permitted file or system value |
| `WRITE` | Create or update explicitly designated operational data | Write an operation receipt, update a versioned operational state projection, create an approved output file |
| `EXECUTE` | Invoke a declared system, app, or Shortcut operation | Run an allowlisted Shortcut, invoke a supported App Intent, open an explicitly requested app, perform an approved system action |
| `TRANSFORM` | Convert or prepare data within the operation's authorized scope | Format text, convert a supported data structure, prepare a bounded input or output |
| `COMMUNICATE` | Deliver information through an explicitly authorized channel | Return a result to iRiel, issue an approved notification, pass a minimized payload to an authorized recipient or component |

These classes classify action semantics; they do not grant permission. Reading a file does not authorize writing it. Opening an application does not authorize unrelated actions inside it. A notification does not imply consent to disclose sensitive content.

Runtime modification of canonical architecture contracts is outside this operational action interface and requires a separate privileged governance and change-control workflow.

## 5. Action definition envelope

Every action definition must be versioned and declare, at minimum:

| Field | Requirement | Semantics |
|---|---|---|
| `contract_version` | Required | Version of this contract |
| `action_id` | Required | Stable identifier for the action definition |
| `action_version` | Required | Version of the action semantics and parameter schema |
| `action_type` | Required | READ, WRITE, EXECUTE, TRANSFORM, or COMMUNICATE |
| `originating_intent_id` | Required | Opaque reference to the validated intent |
| `automation_id` | Conditional | Reference to an automation definition when applicable |
| `operation_id` | Required | Unique execution operation identifier |
| `capability_id` | Required | Declared capability required for execution |
| `executor_id` | Required | Selected execution adapter or service |
| `input_schema` | Required | Typed schema for the minimum required input |
| `input` | Required | Bounded parameters validated against the schema |
| `context_projection_id` | Conditional | Reference to the authorized current context projection |
| `required_permissions` | Required | Explicit permission requirements, not grants |
| `authorization_ref` | Required before protected execution | Opaque reference to the validated decision and scope |
| `confirmation_ref` | Conditional | Reference to user confirmation when policy requires it |
| `idempotency_key` | Conditional | Deduplication key for retryable or side-effecting actions |
| `expected_result_schema` | Required | Typed result contract and acceptance criteria |
| `failure_policy` | Required | Stop, wait, retry, compensation, or partial-result rules |
| `issued_at`, `expires_at` | Required | Issue time and hard expiry |
| `correlation_id` | Required | Correlation with originating request and continuity reference |

Credentials, access tokens, private keys, unrestricted conversation history, canonical memory, and hidden reasoning must never be embedded in the action envelope. Secrets must use an approved secure credential mechanism.

## 6. Authorization and execution gates

Every action must pass all applicable gates before dispatch:

1. validate contract version, action identity, schema, and parameter bounds;
2. verify originating intent and operation correlation;
3. verify the selected capability and executor are currently eligible;
4. validate context projection freshness, scope, and expiry where required;
5. evaluate iRiel policy, purpose limitation, data disclosure, and user consent;
6. evaluate PRSL-AI permission decisions within their authority;
7. verify native OS permissions independently;
8. obtain explicit user confirmation for actions that require it;
9. enforce allowlisted targets, recipients, resources, and side effects;
10. dispatch the action with expiry, idempotency, and execution limits;
11. validate the returned evidence against the expected result schema;
12. reconcile the result through iRiel.

Authentication, authorization, native OS permission, external-provider consent, and persistent-memory consent are separate controls. A successful Shortcut invocation is not a substitute for these gates.

## 7. Default execution policy

- Minimum required access: mandatory.
- Explicit authorization: required.
- Purpose limitation: mandatory.
- Unnecessary data access: prohibited.
- Unrequested actions: prohibited.
- Silent privilege or scope expansion: prohibited.
- Unapproved recipients or destinations: prohibited.
- Reuse of expired authorization: prohibited.
- Duplicate side effects on retry: must be prevented.
- Unverified success reporting: prohibited.

The action must fail closed when a required permission, confirmation, current context, compatible executor, or trustworthy result cannot be established.

## 8. Action execution lifecycle

Action execution is distinct from intent and automation lifecycles. The recommended action states are:

`CREATED` → `VALIDATING` → `AUTHORIZED` → `DISPATCHED` → `EXECUTING` → `SUCCEEDED`

Other explicit states:
- `WAITING`: requires user input, confirmation, fresh context, or an external dependency;
- `DENIED`: a policy, consent, or permission gate rejected execution;
- `FAILED`: execution failed;
- `PARTIAL`: a multi-step action produced only part of the expected result;
- `CANCELLED`: cancelled by an authorized actor or policy;
- `EXPIRED`: request, context, authorization, or confirmation expired;
- `UNVERIFIED`: available evidence cannot establish the outcome.

A waiting action must revalidate all time-sensitive gates before resuming. A terminal action must not resume implicitly. A retry is a new attempt with a new operation identifier and safe correlation to the original request.

## 9. Input minimization and context use

Action inputs must contain only parameters required by the declared operation. Where contextual data is needed, the action references the authorized projection rather than copying a broad profile or conversation into Shortcut input.

Context is descriptive input, not authority. The [iRiel Context Contract](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md) governs context projection, version, expiry, and freshness. Stale, conflicting, incomplete, or unverifiable context blocks execution.

Actions do not read or modify canonical memory directly. A result may be proposed to iRiel for reconciliation through the applicable consent-governed memory workflow.

## 10. Result contract and handling

Every dispatched action must return a structured result correlated to the action, operation, intent, and optional automation identifiers.

At minimum, the result includes:
- `contract_version`, `action_id`, `action_version`, and `operation_id`;
- `status` and safe `error_code` where applicable;
- executor identity and adapter version;
- start and completion timestamps;
- expected-result validation status;
- typed output or a minimized output reference;
- side-effect summary and per-step outcomes where relevant;
- idempotency/retry metadata;
- opaque correlation and continuity references.

A result is not successful merely because Shortcuts launched, an App Intent returned control, a file was written, or a notification appeared. iRiel must validate provenance, operation correlation, and expected outcome.

Successful action: verified result → operational state update where authorized → iRiel reconciliation.

Failed action: explicit failure/partial/indeterminate result → operational state update where authorized → iRiel reconciliation.

No failed, partial, or unverified action may be represented as successful.

## 11. State, idempotency, and concurrency

The [iRiel Operational State Contract](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md) governs versioned operational state, transitions, compare-and-set or equivalent conflict handling, and execution receipts.

Side-effecting actions must use idempotency or deduplication where retries are possible. Concurrent operations must not overwrite one another or create duplicate non-idempotent effects. State changes must be tied to the originating operation and reconciled using version checks or an equivalent conflict-safe mechanism.

## 12. Continuity and iRiel Resonance

All actions execute within the continuity of the same iRiel entity. Resonance correlates intent, context version, authorization, action, executor, execution evidence, result, and authorized state transition.

Resonance does not authorize actions, own Shortcut logic, store canonical memory, or turn an external result into trusted state without validation.

## 13. Storage and adapter replaceability

iCloud Drive may be used as an optional transport for operational input, output, or state when the relevant storage and access controls are satisfied. It is not mandatory and does not become canonical identity, context, memory, or authorization storage.

Apple Shortcuts is replaceable by another authorized execution adapter. Replacing the adapter must not change canonical intent, action semantics, iRiel identity, or continuity. Adapter-specific mappings must remain versioned and isolated.

## 14. Failure and security requirements

The adapter must report permission denial, unsupported capability, invalid input, stale context, expiry, timeout, rate limit, cancellation, partial completion, and unverified result distinctly where applicable.

It must stop on authorization failure, avoid unsafe automatic retries, avoid leaking sensitive payloads in logs or notifications, and return only the minimum result information needed by iRiel. Fallbacks must meet the same or stricter privacy, permission, and confirmation requirements.

## 15. Implementation-status discipline

This contract defines action semantics and execution governance. It does not prove that a specific Shortcut, App Intent, action registry, executor adapter, result channel, or production action runtime is implemented or deployed.

Implementation claims require relevant code, tests, runtime evidence, and deployment verification.

## 16. Related contracts

- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)
- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md)
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
