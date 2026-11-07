# Agent PRSL-AI — Executable Execution Contract v1.0

**Status:** Proposed, contract-tested  
**Owner:** Robert Software Labs  
**Applies to:** Agent PRSL-AI orchestration, capability dispatch, and protected operation boundaries  
**Related specifications:** [Capability Contract](./capability-contract.md) · [Capability Registry](./registry-specification.md) · [Permission Manager](./permission-manager-specification.md) · [Reasoning and Action Execution Pattern](./reasoning-action-execution-pattern.md)

## 1. Purpose

This contract defines the machine-readable execution envelope and the cross-component conditions that must pass before Agent PRSL-AI dispatches a capability.

It closes a gap between the independently validated capability manifests and Permission Manager request/decision schemas: an execution must prove that the selected capability, current registry record, permission request, permission decision, execution mode, and native permission state all refer to the same bounded operation.

The contract is provider-independent. It describes references and state, not model reasoning or provider-specific payloads.

## 2. Authority and trust boundaries

- The **Capability Registry** supplies the trusted manifest identity, lifecycle state, manifest digest, validation status, and policy-review status.
- **PRSL-AI policy** determines whether the operation and execution mode are eligible.
- The **Permission Manager** issues the authorization decision for each protected permission.
- The **host operating system** independently controls native device permissions.
- The **agent runtime** validates the bindings and enforces the dispatch gate.
- The **model** may propose a plan but cannot create registry records, authorize itself, set a protected execution state, or forge trusted references.

An execution envelope is correlation and state metadata. It is not a bearer token, proof of consent, registry signature, or authorization decision. The runtime must resolve references through trusted interfaces and verify integrity at the boundary.

## 3. Dispatch eligibility

A capability is dispatch-eligible only when all of the following are true:

1. The registry record exists and has registration status `registered`.
2. The manifest lifecycle status is `verified`.
3. The manifest digest matches the registered digest.
4. Manifest validation status is `passed`.
5. Policy review status is `approved`.
6. The capability ID in the manifest, request, decision, and execution envelope matches exactly.
7. Every requested permission is declared by the manifest and its required permission dependencies.
8. Each protected permission has a valid Permission Manager grant bound to the same request, subject, capability, permission, purpose, resource scope, and execution mode.
9. Each grant is current, not revoked, not replayed, and within its validity period.
10. The requested execution mode is allowed by the manifest and current PRSL-AI policy.
11. Native operating-system or host permission is independently granted wherever applicable.
12. No required dependency, availability, policy, or cancellation check blocks execution.

Registration alone does not imply implementation. A manifest marked `proposed`, `specified`, or `in_development` is never dispatch-eligible.

## 4. Permission and scope binding

For each protected permission, the runtime must:

- create a Permission Manager request from the validated manifest and concrete invocation;
- ensure the requested permission is declared by the capability;
- submit the request to the trusted Permission Manager;
- resolve the returned decision through the trusted Permission Manager interface;
- require `status=granted`;
- compare request and decision correlation ID, subject, capability ID, permission ID, purpose, execution mode, and approved resource scope;
- verify issue and expiry times, revocation state, audience, integrity, and single-use/replay state;
- independently verify native OS permission where applicable.

The contract test harness uses exact scope equality as the safe baseline. A production implementation may support a formally specified narrower-scope relation, but must never permit scope expansion.

Remote or hybrid execution involving non-public user data requires a separate `data.remote_disclose` permission and a recipient-bound authorization. Local resource access does not imply remote disclosure. Retention requires its own `data.retain` authorization and bounded storage scope/duration.

## 5. Execution envelope

The normative JSON Schema is [execution-envelope.schema.json](./schemas/execution-envelope.schema.json).

The envelope contains:

- execution and request correlation identifiers;
- exact Capability ID and plan-step identifier;
- execution state;
- registry binding, lifecycle, digest, validation, and review status;
- required permission identifiers and references to their authorization checks;
- execution mode and native permission status;
- observation reference;
- verification status and evidence references;
- limitations and safe error code.

The envelope deliberately excludes model chain-of-thought, raw prompts, credentials, access tokens, sensitive payloads, and full user context.

## 6. State gate

The following states are dispatch-sensitive:

| State | Minimum rule |
|---|---|
| `interpreting`, `planning`, `evaluating` | Planning and evaluation only; no protected dispatch. |
| `awaiting_consent`, `awaiting_authorization` | No protected dispatch. |
| `ready` | Registry, policy, authorization, and applicable native permission gates all passed. |
| `executing`, `observing`, `verifying` | The same gates remain valid; revocation/cancellation must be observed. |
| `completed` | An observation exists and verification passed with at least one evidence reference. |
| `partially_completed` | Some result exists but acceptance criteria remain unmet or blocked. |
| `denied`, `failed`, `cancelled` | No subsequent protected operation without a new valid evaluation and authorization. |

The model cannot set a state directly. Only the runtime may transition state after validating the required evidence.

## 7. Cross-component contract validation

Run:

```bash
python -m pip install -r docs/architecture/agent-prsl-ai/requirements-dev.txt
python docs/architecture/agent-prsl-ai/scripts/validate_capability_manifests.py
python docs/architecture/agent-prsl-ai/scripts/validate_permission_manager.py
python docs/architecture/agent-prsl-ai/scripts/validate_execution_contract.py
```

The execution validator checks:

- the execution-envelope JSON Schema;
- the capability manifest schema;
- the Permission Manager request and decision schemas;
- registry eligibility and manifest digest binding;
- exact request/decision correlation and scope binding;
- grant status, expiry, single-use replay, and subject binding;
- permission declaration and execution-mode policy;
- remote disclosure separation;
- native permission fail-closed behavior;
- valid and invalid execution-state envelopes.

Test scenarios are stored in [execution-contract-cases.json](./validation/execution-contract-cases.json).

## 8. Test fixture and runtime boundary

The validator uses a synthetic registry record and a verified copy of the existing Vision manifest solely to test dispatch rules. It does not register or promote the actual example manifest, which remains `specified`. Permission Manager decisions in the test vectors are fixtures, not live grants.

A passing test means the documented contract and cross-binding rules are internally consistent against these deterministic fixtures. It does not prove that a registry service, Permission Manager service, native permission adapter, token verifier, or capability runtime is deployed or secure.

Production readiness additionally requires authenticated service interfaces, cryptographic decision integrity, replay protection, revocation propagation, concurrency controls, real registry and policy adapters, native permission adapters, integration tests, and independent security review.

## 9. Acceptance criteria

1. Unregistered, revoked, unverified, stale, or unreviewed manifests cannot dispatch.
2. A permission request for an undeclared permission is rejected.
3. A decision for a different request, subject, capability, permission, purpose, scope, or mode is rejected.
4. Expired, revoked, consumed, or unverifiable grants fail closed.
5. Native permission denial or unavailability blocks the protected operation.
6. Remote/hybrid processing of non-public data requires separate recipient-bound disclosure authorization.
7. Execution cannot enter `ready` or `executing` while any required gate is unresolved.
8. `completed` requires an observation and passed verification evidence.
9. Execution records do not expose hidden model reasoning or unnecessary sensitive data.
10. Test fixtures and documentation never imply that a production runtime is implemented.
