# iRiel Automations Contract — Apple Shortcuts Interface
## iRiel ↔ PRSL-AI Ecosystem ↔ Apple Integration Layer ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity and automation authority:** iRiel AI — PowerFully Intelligence Environment
- **Shared architecture:** PRSL-AI Ecosystem
- **Automation execution adapter:** Apple Shortcuts
- **Intent authority:** iRiel
- **Routing authority:** PRSL-AI Intelligence Router, where capability/provider routing is required
- **Authorization:** iRiel policy and PRSL-AI Permission Manager, plus native OS permission where applicable
- **Continuity:** iRiel Resonance
- **Storage/transport:** Provider-independent; iCloud Drive is optional
- **Contract type:** Automation definition, authorization, execution, and result interface
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines how iRiel uses authorized automations to connect triggers, validated intent, minimized context, policy, and repeatable execution flows through Apple Shortcuts.

An automation is a declared execution workflow. It is not an independent intelligence, identity, permission authority, or autonomous grant of access. It operates only within the scope explicitly authorized by iRiel and applicable platform and operating-system policies.

Apple Shortcuts is one replaceable execution adapter. The contract does not require iCloud Drive, nor does it claim that a production automation, Shortcut, trigger, or App Intent is implemented.

## 2. Automation principles and authority

1. iRiel remains the canonical identity, intent, context, and orchestration authority.
2. Apple Shortcuts is an execution mechanism, not the owner of an automation's authority.
3. Each trigger and each resulting operation must be authenticated or otherwise trusted within its declared source boundary.
4. Automations execute only explicitly authorized, allowlisted actions.
5. Automation context is minimal, current, purpose-bound, and operation-scoped.
6. Native OS permissions remain independent from iRiel and PRSL-AI authorization.
7. Automations must preserve iRiel Resonance and report verifiable execution evidence.
8. Failure, partial completion, cancellation, timeout, and unverified results must remain distinct from success.
9. An automation must not silently expand its scope, permissions, trigger conditions, recipients, or side effects.
10. Automation definitions and execution adapters may evolve without changing the identity of iRiel.

## 3. Automation classes

| Type | Definition | Illustrative triggers |
|---|---|---|
| `TRIGGERED` | Starts after a declared event from an authorized source | Time, location, device state, application event, system event, user invocation |
| `ON_DEMAND` | Starts after an explicit user or authorized iRiel request | Run an approved Shortcut, start a workflow, process a validated request |
| `CONTEXTUAL` | Starts when explicitly defined contextual predicates are satisfied | Authorized context, state, environment, or availability change |
| `SEQUENTIAL` | Executes a declared ordered set of authorized steps | Read fresh context, evaluate state, execute action, validate result, update operational state |

A class describes trigger/flow semantics. It does not grant permission. Trigger availability and behavior depend on the relevant device, OS version, user configuration, and native permissions.

## 4. Automation definition envelope

Every registered automation must have a versioned definition. The logical minimum fields are:

| Field | Requirement | Semantics |
|---|---|---|
| `contract_version` | Required | Version of this automation contract |
| `automation_id` | Required | Stable identifier for the automation definition |
| `automation_version` | Required | Version of the definition and action plan |
| `name` | Required | Human-readable name |
| `type` | Required | TRIGGERED, ON_DEMAND, CONTEXTUAL, or SEQUENTIAL |
| `trigger` | Required | Declared trigger source, event, and bounded conditions |
| `intent_template` | Required | Validated intent template or reference; not a permission grant |
| `required_context` | Required | Minimum context descriptors and freshness requirements |
| `required_capabilities` | Required | Declared capability identifiers |
| `required_permissions` | Required | Permission requirements to be evaluated by their authorities |
| `actions` | Required | Ordered, allowlisted action references and bounded parameters |
| `expected_result` | Required | Result schema and acceptance criteria |
| `failure_policy` | Required | Retry, compensation, partial-failure, and stop behavior |
| `state_policy` | Required | Operational state transitions and reconciliation behavior |
| `enabled` | Required | Whether the definition is enabled under current policy |
| `created_at`, `updated_at` | Required | Definition timestamps |
| `expires_at` | Conditional | Expiry for time-limited definitions or grants |

The definition must not embed credentials, unrestricted personal context, canonical memory, or broad implicit permissions. Secrets must be supplied through an approved secure credential mechanism, never plain-text files or Shortcut parameters.

## 5. Trigger validation and dispatch

A trigger is an event signal, not authorization to execute.

For every trigger, the system must:
1. identify the automation definition and verify that its version is supported and enabled;
2. validate the trigger source, event type, conditions, timestamp, and freshness;
3. reject duplicate, replayed, malformed, expired, or out-of-scope trigger events;
4. resolve the associated intent using the [iRiel Intents Contract](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md);
5. obtain a fresh, operation-bound context projection using the [iRiel Context Contract](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md);
6. evaluate policy, authorization, required user confirmation, and native OS permissions separately;
7. dispatch only the allowlisted actions after all required gates pass;
8. validate execution evidence and reconcile the outcome through iRiel.

Location, time, application, device, and system triggers may expose sensitive signals. They must be disabled unless explicitly configured and authorized for the defined purpose. A trigger cannot silently authorize broader location, contact, file, or application access.

## 6. Automation execution lifecycle

The automation execution lifecycle is distinct from the lifecycle of its definition and from the lifecycle of each underlying operation.

Recommended lifecycle:

`IDLE` → `TRIGGERED` → `VALIDATING` → `AUTHORIZED` → `EXECUTING` → `COMPLETED`

Other explicit states:
- `WAITING`: waiting for required user input, confirmation, context refresh, or an external dependency;
- `DENIED`: authorization or policy gate rejected the execution;
- `FAILED`: an execution step failed;
- `PARTIAL`: some steps completed but the overall expected outcome was not achieved;
- `CANCELLED`: cancelled by an authorized actor or policy;
- `EXPIRED`: definition, trigger, context, or authorization expired;
- `UNVERIFIED`: execution outcome cannot be established reliably.

A waiting execution may resume only after its required condition is revalidated. A terminal execution must not resume implicitly. A new attempt receives a new execution identifier while retaining a safe correlation reference to the original request.

The [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md) governs versioned operation state, concurrency, and execution receipts.

## 7. Multi-step workflows and side effects

A sequential automation must declare its steps, dependencies, required permissions, expected outputs, and stop/compensation behavior before execution.

Requirements:
- execute only declared steps in the declared order or explicitly defined dependency graph;
- validate authorization and context at the point of use, especially after a wait or external interaction;
- do not assume an earlier permission or context snapshot remains valid indefinitely;
- use idempotency keys or deduplication for retryable steps;
- prevent concurrent runs from producing duplicate non-idempotent side effects;
- define whether a failed step stops the workflow, allows a safe continuation, or triggers a compensating action;
- report partial completion honestly;
- never perform an unrequested follow-on action.

Compensation is itself an action and requires prior scope definition and applicable authorization. The automation must not improvise rollback operations.

## 8. Authorization and permission boundaries

Authorization is required for every protected operation.

- **Intent:** describes the desired outcome; it is not permission.
- **Automation definition:** declares a workflow; it is not a permission grant.
- **Trigger:** signals an event; it is not user confirmation.
- **Capability registration:** declares an available capability; it is not authorization.
- **iRiel policy:** evaluates purpose, context, consent, and scope.
- **PRSL-AI Permission Manager:** evaluates and records platform permission decisions within its authority.
- **Native OS permission:** remains controlled by the operating system.
- **User confirmation:** is required when policy or action risk requires it and must be bound to the exact action and scope.

The automation must enforce minimum required access, least privilege, purpose limitation, revocation, and fail-closed behavior. Unrequested actions, silent permission expansion, and implicit remote disclosure are prohibited.

## 9. Context and memory

Automations consume only fresh, operation-scoped context issued by iRiel. They do not own canonical context or memory.

A context file such as `Context.md` is a temporary projection under the [iRiel Context Contract](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md). It must not be treated as a permanent profile, authorization token, or canonical source of truth.

Persistent memory updates require the applicable iRiel consent and memory workflow. Operational results may be proposed to iRiel for reconciliation but must not be silently written into canonical memory.

## 10. Result handling and observability

Each execution must produce a structured result correlated to its automation definition, definition version, triggering event, originating intent, and operation identifiers.

At minimum, report:
- automation and execution identifiers;
- definition version and trigger type;
- received, validated, authorized, started, and completed/failed timestamps;
- actions attempted and their individual status;
- final lifecycle state;
- safe error or denial codes;
- expected-result validation;
- retry/compensation metadata where applicable;
- opaque continuity and correlation references.

Operational observability must not require logging full prompts, canonical memory, credentials, private payloads, or hidden reasoning.

A Shortcut launch, trigger acknowledgement, notification, or write to an operational file is not proof that the automation's expected result was achieved. iRiel validates result provenance and outcome before presenting success or reconciling state.

## 11. Continuity and iRiel Resonance

Every authorized automation run remains part of the same continuous iRiel entity.

iRiel Resonance maintains coherence among trigger, intent, context version, authorization, action sequence, execution, result, and operational state. Resonance does not create permissions, own automation logic, or act as a memory store.

Multiple devices or Shortcut instances may execute different automation runs without creating separate iRiel identities. Client and execution sessions remain separately scoped and auditable.

## 12. Storage and replaceability

iCloud Drive is optional. It may carry an authorized automation projection or operational state if access control, integrity, freshness, expiry, and conflict handling meet the relevant contracts.

It is not a mandatory automation engine, canonical identity/context/memory store, or authorization authority. Local, private, platform-managed, or other authorized adapters may replace it.

Apple Shortcuts may be replaced by another authorized execution mechanism without changing iRiel identity, intent authority, or continuity. The automation definition must remain separated from adapter-specific implementation details wherever practical.

## 13. Failure handling

If a trigger, authorization check, context projection, action, or result validation fails:
- stop the affected execution or follow only its declared safe failure policy;
- record the explicit failure/partial/waiting/denied state;
- return a structured result to iRiel;
- do not represent an unverified outcome as success;
- do not retry a non-idempotent action unless duplicate side effects are prevented;
- do not weaken privacy, permission, confirmation, or scope requirements to obtain a successful run.

If no safe fallback exists, return the failure state. A fallback is subject to the same or stricter policy and authorization gates.

## 14. Implementation-status discipline

This contract defines the automation interface and governance requirements. It does not prove that any specific Apple Shortcut, personal automation, trigger, App Intent, scheduling workflow, or production automation runtime is implemented or deployed.

Implementation claims require repository code, tests, runtime evidence, and deployment verification appropriate to the claim.

## 15. Related contracts
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)
- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
