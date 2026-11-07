# Permission Manager Specification v1.0

**Status:** Proposed  
**Owner:** Robert Software Labs  
**Scope:** PRSL-AI Ecosystem / Agent PRSL-AI  
**Authority boundary:** iRiel identity and user consent; PRSL-AI policy enforcement

## 1. Purpose

The Permission Manager is the authorization control-plane component responsible for evaluating whether a capability may access a protected resource or perform a protected action.

It evaluates permission requests; it does not create user consent, manufacture operating-system grants, or let a capability authorize itself. A permission decision is valid only for its declared subject, action, resource scope, purpose, context, and validity period.

This specification is an architectural proposal. It does not claim that a Permission Manager service, API, database, or device integration is implemented.

## 2. Authority and separation of concerns

The following authorities must remain distinct:

1. **User authority (iRiel):** owns user identity, consent intent, user-facing explanation, and user-controlled revocation.
2. **PRSL-AI policy authority:** evaluates policy, risk, purpose limitation, data minimization, and execution constraints.
3. **Platform authority:** the operating system or host application grants or denies native capabilities (for example camera, microphone, or location).
4. **Permission Manager:** combines applicable authorization evidence and returns a scoped decision.
5. **Capability / agent:** declares the permissions it needs and receives only the decision needed to proceed. It cannot grant or elevate permissions.

No model, provider, agent, tool, capability, plugin, or integration may become the authority for user consent.

## 3. Core invariants

- Default-deny: missing, ambiguous, malformed, expired, or unverifiable authorization fails closed.
- Least privilege: authorize the narrowest resource, action, purpose, and precision needed.
- Explicit consent: consent must be informed, specific, and affirmative whenever required by policy or platform rules.
- No implied consent: prior use, account creation, feature visibility, silence, or a broad terms acceptance does not authorize a distinct protected operation.
- Separation of access and processing: permission to read data does not authorize retention, remote transmission, training, profiling, or reuse.
- Provider independence: permission identity and decisions do not depend on a model vendor.
- Local-first: prefer on-device processing where compatible; remote processing requires separate policy authorization and any required user consent.
- Revocability: revocation must block subsequent use and be propagated to active operations where technically possible.
- No privilege escalation: dependencies and delegated tools cannot increase the caller's authority.
- Minimal audit: record decision metadata, not sensitive payloads or unnecessary personal content.

## 4. Permission identity and taxonomy

Permission identifiers are stable, namespaced PRSL-AI identifiers. They describe authorization semantics, not operating-system API names.

Initial vocabulary (extensible through reviewed governance):

| Permission | Protected scope |
|---|---|
| `media.read` | Read user-supplied or otherwise authorized media |
| `camera.use` | Capture media using an authorized camera |
| `microphone.use` | Capture audio using an authorized microphone |
| `location.coarse` | Access approximate device location |
| `location.precise` | Access precise device location |
| `files.read` | Read files within an authorized scope |
| `files.write` | Create or modify files within an authorized scope |
| `notifications.schedule` | Schedule notifications or reminders |
| `network.access` | Access network resources |
| `data.remote_disclose` | Disclose authorized data to a remote provider or service for a specifically authorized operation |
| `data.retain` | Retain data beyond the transient operation under an explicitly approved retention scope |
| `tools.execute` | Invoke an approved tool |
| `system.invoke` | Invoke an approved operating-system surface |
| `accessibility.read` | Read content through an authorized accessibility interface |
| `speech.output` | Produce spoken output |

A permission may require additional scope attributes, such as resource identifiers, directory boundaries, location precision, recipient identity, retention duration, or operation purpose. `data.remote_disclose` must bind the exact recipient; `data.retain` must bind a storage scope and maximum retention duration. A bare permission string is not sufficient evidence of a grant.

## 5. Request contract

A permission request must be generated from a validated capability manifest and a concrete invocation. The request must contain:

- `request_id`: unique correlation identifier;
- `subject`: authenticated user/session or system principal;
- `capability_id`: exact capability requesting access;
- `permission_id`: one declared permission;
- `action`: operation to be performed;
- `resource_scope`: exact resource or minimum bounded scope;
- `purpose`: user-understandable purpose tied to the current intent;
- `data_classification`: classification needed for policy evaluation;
- `requested_precision`: where applicable;
- `execution_mode`: on-device, remote, or hybrid;
- `requested_duration`: bounded duration or single-operation scope;
- `context_ref`: minimized reference to the invocation context, not a full profile or memory dump.

Reject requests with undeclared permissions, missing purpose, unbounded resource scope, invalid subject, or fields that attempt to override policy.

## 6. Decision contract

The Permission Manager returns a structured decision with:

- `decision_id` and `request_id`;
- `status`: `granted`, `denied`, `consent_required`, `platform_permission_required`, `policy_blocked`, `revoked`, or `indeterminate`;
- `permission_id`, `subject`, `capability_id`, and approved scope;
- `purpose` and `execution_mode` constraints;
- `issued_at`, `expires_at`, and optional `single_use`;
- `policy_version` and evidence references;
- safe `reason_code` and user-facing explanation where appropriate.

A `granted` decision means only that PRSL-AI authorization checks passed for the returned scope. It does not imply that the operating system has granted a native permission or that a resource is currently available. Native platform checks remain independently mandatory.

## 7. Evaluation sequence

The normative evaluation sequence is:

1. Authenticate the requesting subject and validate session state.
2. Resolve the exact capability manifest from the trusted registry.
3. Confirm the capability lifecycle is dispatch-eligible; `proposed`, `specified`, and `deprecated` capabilities are not executable.
4. Verify the requested permission is declared by that capability and consistent with its permission dependency.
5. Bind the request to the current intent, purpose, resource, and minimum required scope.
6. Evaluate applicable PRSL-AI policy, data classification, age/region/platform restrictions where applicable, and execution-mode constraints.
7. Check existing consent evidence and its scope, expiry, and revocation status.
8. If required, present a clear consent request through the trusted iRiel interface.
9. Verify native platform authorization independently when the resource is platform-controlled.
10. Issue a short-lived, scope-bound decision or return a non-granted status.
11. Re-check authorization at the execution boundary and on sensitive state transitions.

The order is mandatory in principle; implementations may combine internal steps only if they preserve the same security properties.

## 8. Consent lifecycle

Consent evidence must be:

- affirmative and attributable to the authenticated subject;
- specific to permission, purpose, resource scope, and relevant execution mode;
- presented with clear consequences, including remote processing or retention when applicable;
- timestamped and versioned against the consent text/policy;
- bounded by expiry and revocable by the user;
- stored separately from transient conversation context.

Consent must not be inferred from a model response, agent instruction, capability manifest, provider response, or a previously granted unrelated permission.

A new consent interaction is required when the purpose, scope, data class, execution mode, or material consequence changes beyond the existing grant.

## 9. Runtime enforcement and revocation

- Authorization must be checked immediately before protected access, not only when a capability is first selected.
- Long-running operations must observe cancellation and revocation signals where technically possible.
- Revocation invalidates future decisions and tokens within the defined propagation bound.
- If revocation cannot interrupt an in-flight operation, the implementation must document that limitation and prevent subsequent protected access.
- Permission tokens must be audience-bound, short-lived, non-transferable, and protected against replay.
- A capability must never receive a reusable broad user credential when a narrow operation token is sufficient.

## 10. Delegation and dependency rules

A capability may delegate work only to a registered dependency or tool that is eligible under policy. Delegation must preserve the original subject, purpose, resource scope, and execution constraints.

The effective permission set is the intersection of:
- permissions declared by the invoking capability;
- permissions authorized for the subject and current purpose;
- permissions available to the delegated capability/tool;
- native platform grants;
- current PRSL-AI policy.

Delegation cannot widen this intersection. A child operation that needs additional authority must trigger a new authorization evaluation.

## 11. Remote processing and data boundaries

Permission to access a local resource is not permission to transmit or retain its contents. Remote disclosure requires the separately declared `data.remote_disclose` permission and an independent policy/consent decision. Retention beyond the transient operation requires `data.retain` and an explicit retention scope.

Before any remote or hybrid route:
- require the operation to declare `data.remote_disclose` where protected user data leaves the device;
- evaluate the remote-processing policy independently;
- identify the data to be disclosed and the receiving provider/service;
- minimize or transform the payload where possible;
- verify the user has authorized the relevant disclosure when required;
- enforce provider eligibility, retention constraints, and data-residency rules;
- deny the route if required evidence is absent.

When `allowRemoteInference` or equivalent policy is false, remote inference must not be used as a fallback. The system must fail closed or offer a policy-compliant local alternative.

## 12. Failure and fallback behavior

| Condition | Required behavior |
|---|---|
| Permission declaration missing | Deny; manifest/policy integrity error |
| Consent absent but required | Return `consent_required`; do not access resource |
| Native platform grant absent | Return `platform_permission_required`; invoke platform flow only through trusted host |
| Policy prohibits operation | Return `policy_blocked`; no fallback may bypass the restriction |
| Consent expired or revoked | Deny and require fresh authorization where appropriate |
| Permission service unavailable | Fail closed for protected operations |
| Decision evidence invalid or unverifiable | Deny |
| Scope cannot be minimized or bounded | Deny or request a narrower operation |

Fallbacks may change implementation route only when the alternative independently satisfies the same or stricter permissions, consent, privacy, and policy constraints. A less-private route must never be selected silently.

## 13. Audit and privacy

Audit records may include decision ID, request ID, subject pseudonymous reference, capability ID, permission ID, decision status, reason code, policy version, timestamps, and revocation outcome.

Audit records must not include raw media, document contents, audio, precise coordinates, credentials, access tokens, full prompts, or persistent memory unless a separately approved and explicitly authorized audit requirement demands a narrowly scoped record.

Retention periods and access to audit records require a separate policy. Audit logging is not a substitute for consent.

## 14. Security acceptance criteria

A conforming implementation must demonstrate at minimum:

1. Undeclared permissions are rejected.
2. Missing, malformed, expired, revoked, and unverifiable grants fail closed.
3. A capability cannot grant itself permission or alter a decision.
4. Permission scope is bound to subject, capability, purpose, resource, and validity.
5. Native platform authorization is checked independently.
6. Consent for local access does not authorize remote disclosure or retention.
7. Remote execution is blocked when policy disallows it, including fallback paths.
8. Delegation cannot expand effective permissions.
9. Revocation blocks subsequent protected access and is propagated to in-flight work within documented limits.
10. Permission-service failure does not authorize protected access.
11. Audit output contains no unnecessary sensitive payload.
12. User-facing consent and denial explanations are accessible and understandable.

## 15. Interfaces and implementation boundary

Potential logical operations (not deployed endpoints):

- `evaluate(request)`
- `requestConsent(request)`
- `verify(decision_id, invocation_context)`
- `revoke(subject, permission_id, scope)`
- `listEffectivePermissions(subject, context)`

The implementation must define authenticated transport, token format, cryptographic integrity, storage, concurrency, revocation propagation, and platform-specific adapters before production use.

This specification defines expected behavior only. It does not assert that a Permission Manager runtime, consent store, token issuer, native permission adapter, or production endpoint exists.

## 16. Normative machine-readable contracts

The machine-readable request and decision contracts are:

- [Permission Request JSON Schema](./schemas/permission-request.schema.json)
- [Permission Decision JSON Schema](./schemas/permission-decision.schema.json)
- [Positive and negative contract vectors](./validation/permission-manager-cases.json)

Both schemas use JSON Schema Draft 2020-12. Unknown properties are rejected. Permission identifiers are restricted to the reviewed vocabulary in the schemas; extending that vocabulary requires a reviewed change to the specification, both schemas, capability manifests where applicable, and validation vectors.

### Request boundary

A request is a proposal for one protected operation. It is not a grant. It binds the authenticated principal, exact Capability ID, one permission identifier, action, bounded resource scope, purpose, data classification, execution mode, and bounded duration. Requests with an unbounded resource scope or a purpose that cannot be explained to the user are invalid.

### Decision boundary

A decision is an authorization outcome, not a reusable credential. A granted decision must include an approved scope, execution mode, issue time, expiry time, and single-use policy. The decision must remain bound to the originating request, subject, capability, permission, purpose, and policy version. The execution boundary must verify the decision with the trusted Permission Manager; a capability must not treat a client-supplied decision object as self-authenticating proof.

A non-granted decision must not include an approved scope. A grant whose expiry is not later than its issue time is invalid.

## 17. Mandatory execution gate

Every protected operation must pass this gate immediately before resource access:

1. Validate the invocation envelope and capability manifest.
2. Confirm the capability is `verified` and dispatch-eligible under registry policy.
3. Submit a permission request to the Permission Manager.
4. Require a `granted` decision whose subject, Capability ID, permission, purpose, scope, execution mode, and validity match the invocation exactly or are narrower.
5. Independently verify native operating-system or host permission when applicable.
6. Re-evaluate current policy and revocation state at the execution boundary.
7. Permit only the authorized operation; reject scope expansion, replay, stale decisions, and mismatched request IDs.

If the Permission Manager cannot be reached, its response cannot be verified, or any binding is ambiguous, execution is denied. There is no direct module-to-resource bypass path.

## 18. Permission authority and change control

The Permission Manager is the only component allowed to issue PRSL-AI authorization decisions. iRiel remains the authority for user consent and revocation intent; the operating system remains the authority for native grants; PRSL-AI policy remains the authority for policy constraints. These authorities are complementary and cannot impersonate one another.

Capabilities may declare required permissions but cannot create, edit, approve, or broaden permission vocabulary, consent evidence, policy, or authorization decisions. Permission vocabulary and policy changes require reviewed governance and validation.

## 19. Implementation readiness boundary

This documentation establishes contracts and acceptance tests, not an operational authorization service. A framework-neutral runtime orchestration core and deterministic decision-binding gate are implemented under `src/lib/permission-manager/`. They define and exercise the required control flow, but they do not provide deployed production adapters or an authenticated service.

Before protected operations can be enabled, an implementation must provide authenticated request transport, a trusted registry with verified manifest digests, current policy evaluation and scope narrowing, confirmation and consent evidence verification, native permission adapters, independent remote-disclosure authorization, cryptographic decision integrity, atomic replay prevention, revocation propagation, durable minimized audit, and trusted execution-boundary enforcement.

Until those production controls are implemented and independently verified, the Permission Manager service status remains `specified` and protected runtime execution must remain disabled or fail closed.