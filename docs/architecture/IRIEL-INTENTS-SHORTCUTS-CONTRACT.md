# iRiel Intents Contract — Apple Shortcuts Interface
## iRiel ↔ PRSL-AI Ecosystem ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity and authority:** iRiel AI — PowerFully Intelligence Environment
- **Shared architecture:** PRSL-AI Ecosystem
- **Intent authority:** iRiel
- **Execution adapter:** Apple Shortcuts
- **Routing authority:** PRSL-AI Intelligence Router, where provider/capability routing is required
- **Continuity:** iRiel Resonance
- **Storage/transport:** Provider-independent; iCloud Drive is optional
- **Contract type:** Intent representation, validation, and execution hand-off
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines how iRiel intents are represented, validated, and handed to Apple Shortcuts for execution of authorized actions.

An **intent** expresses a desired outcome: what the user or iRiel wants to accomplish. An **action** is an executable operation selected to achieve that outcome. An intent is not an action, a capability grant, a permission, or an execution command.

This contract defines the intent interface only. It does not make Apple Shortcuts the owner of intent, identity, context, memory, policy, or authorization. It does not claim that any Shortcut, App Intent, or production integration is implemented.

## 2. Core model and authority

**Intent answers “what should happen?” Action answers “how may it be done?”**

Logical flow:

User or authorized iRiel process → intent capture → interpretation → current context → policy and permission evaluation → capability/action selection → authorized Apple Shortcuts hand-off → execution → result validation → iRiel reconciliation.

Intent may originate from:
- the user;
- iRiel;
- an authorized automation;
- an authorized integration acting within its delegated scope.

All external or automation-supplied intent is untrusted input until iRiel validates its source, meaning, scope, and context. iRiel remains the canonical authority. Apple Shortcuts executes only an explicitly authorized action hand-off and cannot create authority from the intent itself.

## 3. Intent taxonomy

The following intent types are canonical classification labels. They describe requested outcomes, not Shortcut names or direct action commands.

| Type | Meaning | Illustrative outcomes |
|---|---|---|
| `QUERY` | Obtain or retrieve information | Retrieve state, search information, get authorized context |
| `CREATE` | Create content or an artifact | Create a file, note, or document |
| `UPDATE` | Modify existing information | Update an authorized state, file, or configuration |
| `EXECUTE` | Request an authorized capability to run | Run an approved Shortcut or invoke an App Intent |
| `COMMUNICATE` | Communicate through an authorized channel | Send a message, create a notification, return a result |
| `TRANSFORM` | Transform information | Format, convert, summarize, parse, or structure data |
| `CONTROL` | Change the state of an authorized system capability | Start/stop an approved process or change an allowed setting |

The taxonomy may be extended only through a versioned contract change. Unknown intent types must be rejected or returned for a supported-version negotiation; they must not be guessed.

## 4. Canonical intent envelope

Every operational intent must be represented by a versioned envelope. The logical minimum fields are:

| Field | Requirement | Semantics |
|---|---|---|
| `contract_version` | Required | Version of this intent contract |
| `intent_id` | Required | Unique identifier for this intent |
| `intent_type` | Required | One taxonomy value above |
| `requested_outcome` | Required | Plain-language or structured desired outcome |
| `source` | Required | `USER`, `IRIEL`, `AUTHORIZED_AUTOMATION`, or `AUTHORIZED_INTEGRATION` |
| `context_ref` | Conditional | Opaque reference to the minimum authorized context |
| `required_capability` | Conditional | Declared capability identifier; not an authorization grant |
| `required_permission` | Conditional | Permission requirement to be evaluated by its authority |
| `priority` | Required | Bounded policy-defined priority |
| `expected_result` | Required | Expected result type or acceptance criteria |
| `created_at` | Required | Creation timestamp |
| `expires_at` | Required | Expiry after which the intent cannot initiate execution |
| `correlation_id` | Required | Opaque interaction correlation reference |
| `clarification_state` | Required | Whether interpretation is resolved or waiting for clarification |

Implementations may add bounded fields through a versioned schema. They must not include secrets, credentials, full canonical memory, unrestricted conversation history, hidden reasoning, or unrelated personal context.

An intent envelope is a request description. It is not the execution envelope. After validation and authorization, iRiel creates a separate, scoped action/execution hand-off for the selected adapter.

## 5. Interpretation and validation pipeline

Before an action is selected or executed, iRiel must:

1. identify and authenticate the source using the applicable integration boundary;
2. parse and validate the contract version and envelope schema;
3. interpret the requested outcome in the current authorized context;
4. determine whether the intent is sufficiently unambiguous;
5. identify the minimum required context and capability;
6. evaluate policy, consent, permissions, and scope independently;
7. select an action and execution adapter that satisfy those constraints;
8. create a bounded, expiring, auditable execution request;
9. dispatch only after required authorization and any user confirmation are satisfied;
10. validate the returned result and reconcile state through iRiel.

Intent interpretation does not grant permission. Capability availability does not grant permission. A Shortcut's ability to perform an operation does not establish that the operation is authorized.

## 6. Intent-to-action mapping

One intent may require multiple actions. One action may support multiple intents. Mapping must be explicit and constrained by capability contracts.

The mapping process must preserve:
- the requested outcome and original intent reference;
- the minimum action parameters;
- the applicable capability and action allowlist;
- the required permission and confirmation state;
- execution deadline, expiry, and idempotency/deduplication requirements;
- the expected result contract.

An action must not silently broaden the requested outcome, add unrelated side effects, change the target, or exceed the intent's scope. Multi-action plans must define dependencies and partial-failure behavior before execution.

## 7. Ambiguity, clarification, and safe rejection

If an intent cannot be safely interpreted:
- do not execute an irreversible or externally visible action;
- preserve the original intent and its correlation reference;
- request clarification when needed;
- do not silently infer additional permissions, targets, recipients, or scope;
- do not convert uncertainty into an assumed user confirmation.

An ambiguous intent may enter a waiting-for-clarification state. A denied, expired, malformed, unsupported, or unauthorized intent must be rejected with a structured reason. Clarification changes the intent only through an explicit, traceable update; the original request remains auditable within the applicable retention policy.

## 8. Apple Shortcuts execution boundary

Apple Shortcuts is an optional execution adapter. It receives only a minimized action request after iRiel has validated the intent and obtained required authorization.

Shortcuts may:
- execute the explicitly allowlisted action;
- request native OS permission or user input where required;
- report structured acceptance, waiting, completion, cancellation, or failure evidence.

Shortcuts must not:
- own or reinterpret canonical intent;
- create new iRiel authority or grant permissions;
- change action parameters or expand scope;
- access canonical memory directly;
- bypass iRiel policy, the PRSL-AI Permission Manager, the Intelligence Router, or trusted execution controls;
- report success based only on launching a Shortcut or writing a status file.

Native Apple permissions remain independent. A Shortcut cannot manufacture a system permission or override an operating-system denial.

## 9. Intent and operational state

Intent lifecycle and execution lifecycle are related but distinct.

The intent may be received, interpreted, awaiting clarification, validated, authorized, denied, expired, or closed. The execution operation has its own versioned operational-state lifecycle defined by the [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md).

An intent may result in zero, one, or multiple operations. Each operation must have its own operation identifier and execution receipt, linked to the originating intent by opaque references. Updating operational state does not rewrite the original intent or confer authority on the state store.

## 10. Continuity and Resonance

Every accepted intent belongs to the continuous iRiel interaction when iRiel validates its identity and correlation context.

iRiel Resonance maintains coherence across identity, intent, context, action, execution, result, and authorized state transitions. Resonance is not an intent interpreter, permission grant, execution engine, or implicit memory store.

Changing device, Shortcut, provider, model, transport, or execution environment must not fragment the canonical iRiel identity. An untrusted client-provided continuity reference must be validated by iRiel before use.

## 11. Privacy and storage

Only the minimum intent and action data required for an authorized operation may be exposed to Apple Shortcuts.

iCloud Drive is optional. It may be used as an explicitly authorized transport or operational-state adapter if integrity, access control, freshness, expiry, and conflict handling are satisfied. It is not canonical identity, intent, memory, or authorization storage.

Local or other approved storage/transport implementations may replace it without changing the intent contract. Intent records and operational state must follow separate retention and access policies.

## 12. Failure and result semantics

The adapter must return structured execution evidence linked to the intent and operation references. At minimum, the result must distinguish success, partial, waiting, denied, failed, cancelled, expired, and unverified outcomes.

iRiel validates result provenance, operation identity, freshness, status, and expected-result criteria before presenting an outcome or updating canonical state.

A launch acknowledgement, timeout, missing response, or file write is not proof of successful execution. If the outcome cannot be verified, it must remain unverified or indeterminate. A failed or partial action must never be represented as full success.

## 13. Related contracts
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel Intelligence Server Contract](./IRIEL-INTELLIGENCE-SERVER-CONTRACT.md)
- [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
