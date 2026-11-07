# Permission Manager Runtime Core

This module contains two implementation slices:

- `decision-gate.ts`: deterministic binding checks for a decision returned by a trusted Permission Manager.
- `runtime.ts`: framework-neutral orchestration for request evaluation and the immediate pre-execution verification gate.

## Runtime evaluation sequence

The runtime validates the request against a strict schema, authenticates the subject through a trusted server-side adapter, resolves the exact capability record, and requires all of the following: registered state, a cryptographically verified manifest digest, passing schema validation, approved review, a `verified` manifest lifecycle, a declared required permission dependency, and an allowed execution mode.

The policy engine must return a current policy version and an approved resource scope. The runtime independently verifies that this scope is equal to or narrower than the requested scope; the policy adapter cannot widen resource IDs, change recipients, increase location precision, or extend retention.

The runtime then verifies explicit confirmation when the capability requires it, verifies consent when policy requires it, checks native host permission independently, and verifies a separate remote-disclosure authorization. Remote or hybrid processing of personal, sensitive, or restricted data requires an exact recipient and independent disclosure authorization even if the policy adapter omits that requirement. A request for `data.remote_disclose` is itself the separate disclosure authorization request and does not recursively require another disclosure grant.

Only after all checks does the runtime ask the trusted Decision Authority to issue a short-lived, single-use decision. Grant expiry is bounded by the requested duration, the 15-minute ceiling, and the capability execution timeout. The issued record carries an opaque reference to the verified registry record.

Immediately before protected access, `verifyForExecution` repeats identity, registry, policy, confirmation, consent, native permission, and remote-disclosure checks. It passes the current approved scope, policy version, registry ID, and manifest digest to the Decision Authority. The authority must atomically verify decision authenticity, request/subject binding, expiry, revocation, current policy/registry binding, scope, and replay state, then consume the one-time decision. A read followed by a separate consume is not acceptable because it permits replay races.

## Required adapter contracts

The runtime uses dependency-injected ports:

- **Authenticator:** verifies the server-side authentication context and returns the authoritative principal plus a pseudonymous audit subject reference. Request-supplied subject fields are never trusted on their own.
- **Capability Registry:** returns the registered manifest, registry ID, digest, an explicit digest-verification result, validation status, and review status. Only a registered record with a verified digest, passing validation, approved review, and a `verified` manifest is eligible.
- **Policy Engine:** evaluates current policy and returns policy version, a scope that is equal to or narrower than the request, and consent/native/remote-disclosure requirements.
- **Confirmation Authority:** verifies a fresh, affirmative confirmation bound to the exact operation when the capability execution policy requires it.
- **Consent Authority:** verifies affirmative, subject-bound, purpose- and scope-specific evidence. It does not infer consent from conversation content.
- **Native Permission Adapter:** checks the operating-system or host permission independently.
- **Remote Disclosure Authority:** verifies a separate authorization for the exact remote recipient and disclosure scope; local resource access never implies remote disclosure.
- **Decision Authority:** issues the canonical decision and atomically verifies, checks revocation/expiry/current policy/current registry binding, and consumes a one-time decision at execution time.
- **Audit Sink:** records minimized decision metadata before issuance and after execution verification. Audit events use a pseudonymous subject reference and exclude payloads, prompts, tokens, media, and precise location.

All ports are mandatory. An unavailable or throwing dependency results in a safe rejection. The runtime does not provide permissive defaults.

## Security boundary and implementation status

**Implemented:** strict request/decision contract validation; dependency-injected evaluation orchestration; subject binding; registry eligibility and digest-verification gates; required permission and execution-mode checks; policy-approved scope narrowing; explicit confirmation; consent; native permission; remote disclosure; bounded decision lifetime; trusted issuance interface; pre-execution re-evaluation; atomic-consumption interface; and minimized pseudonymous audit interface.

**Not implemented:** production adapters, authenticated HTTP transport, persistent registry, production policy engine, consent/confirmation stores, native OS integration, remote-disclosure decision store, cryptographic decision signing, atomic replay/revocation storage, durable audit storage, deployment, or production authorization.

The adapter interfaces are contracts, not live services. Test fixtures use synthetic principals and a synthetic verified registry record; they do not promote any real capability. The current example capability manifests remain `specified`, so they are not eligible for protected execution.

Do not expose this module to browser code as an authorization authority. Do not let a capability, model, provider, tool, or client create its own adapters or decision. Protected resource access must remain behind a trusted server/host execution boundary. Until production adapters and deployment are independently verified, protected execution remains disabled or fail-closed.

## Validation

Run `bun run test`, `bunx tsc --noEmit`, and the repository's Python contract validators from the repository root.
