# PRSL-AI Ecosystem — Implementation Readiness and Architecture Gap Register

**Owner:** Robert Software Labs  
**Platform:** PRSL-AI Ecosystem  
**Baseline:** 2026  
**Status:** Active engineering register; evidence-based  
**Related:** [Canonical Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md) · [Dependency Resolver Specification v1.0](./agent-prsl-ai/dependency-resolver-specification.md)

## 1. Purpose

This register makes the difference between architecture, code, verification, and production availability explicit. It records known blockers and missing evidence so that an architecture document, passing schema test, or partial implementation cannot be mistaken for a secure production system.

This is not a guarantee that every possible vulnerability has been found. It is a traceable baseline for closing known gaps. New threats and gaps must be added when discovered.

## 2. Status vocabulary

- **Specified:** a design or contract exists.
- **Implemented — non-production:** code exists but required trusted production integrations or operational controls are absent.
- **Verified:** a defined test or operational check has passed for the stated scope.
- **Not implemented:** available repository evidence confirms the component is not implemented.
- **Not verified:** current evidence is insufficient to establish implementation or behavior.
- **Blocked:** a required prerequisite prevents safe production use.

A status applies only to the exact component and scope stated. A passing synthetic test does not prove production security.

## 3. Known implementation and readiness gaps

| ID | Area | Current evidence / gap | Required closure evidence | Readiness |
|---|---|---|---|---|
| GAP-001 | Production authentication | Permission Manager requires a trusted Authenticator port; production adapter and authenticated transport are not implemented. | Server-side identity verification, session binding, expiry/revocation tests, negative authentication tests, deployment evidence. | Blocked |
| GAP-002 | Capability Registry runtime | Registry specification and test fixtures exist; a trusted persistent registry service is not established. | Authenticated registry, immutable/versioned records, atomic lifecycle changes, manifest digest verification, revocation, audit, integration tests. | Blocked |
| GAP-003 | Manifest provenance and integrity | Runtime port expects a verified digest, but production trust roots, signing/attestation, key rotation, and revocation are not established. | Defined signing/attestation model, protected keys, canonicalization rules, rotation/revocation tests, verified registry binding. | Blocked |
| GAP-004 | Policy Engine | Runtime expects current policy version and scope-bounded decisions; production policy engine and policy lifecycle are not established. | Versioned policy model, deterministic evaluation, conflict precedence, scope non-expansion tests, policy-change/revocation tests. | Blocked |
| GAP-005 | Consent and confirmation authorities | Consent and confirmation ports exist; trusted stores and production verification adapters are not established. | Subject-, purpose-, resource-, and operation-bound consent; freshness; withdrawal; revocation propagation; replay and race tests. | Blocked |
| GAP-006 | Native permission adapters | Host/OS permission checks are required but production adapters are not established. | Per-platform adapter, independent host grant checks, denied/unavailable/revoked tests, platform entitlement review. | Blocked |
| GAP-007 | Remote disclosure authority | Remote inference is not enabled in the current public Agent console. A trusted disclosure authority is still required before any future remote capability can receive user data. | Exact recipient binding, data classification, purpose/scope binding, trusted server-side consent issuance/verification, consent withdrawal, provider substitution and exfiltration tests. | Blocked |
| GAP-008 | Decision Authority | Trusted issue and atomic verify-and-consume ports are defined; cryptographic issuance, persistence, revocation, and atomic replay storage are not implemented. | Authenticated signed decisions, audience/subject/request/scope binding, atomic single-use consumption, concurrency/replay tests, key lifecycle. | Blocked |
| GAP-009 | Audit storage | Minimized audit port exists; durable production sink and integrity/retention controls are not established. | Tamper-resistant audit, pseudonymous subject references, access controls, retention/deletion, no-secret/no-payload tests. | Blocked |
| GAP-010 | Trusted execution boundary | Runtime code must not be exposed to browser code as an authorization authority; production protected resource boundary is not established. | Server/host-side enforcement, no client bypass, direct-resource tests, authorization re-check immediately before access. | Blocked |
| GAP-011 | Verified capability implementations | Seven example manifests remain specified; they are not production registered or dispatch-eligible. | Each capability has source implementation, owner, verified manifest, tests, security review, registry approval, and operational availability evidence. | Blocked |
| GAP-012 | Dependency Resolver | Version 1.0 contract, request/result schemas, deterministic synthetic validator, and framework-neutral TypeScript graph resolver are implemented. The resolver accepts only a dependency-injected trusted registry adapter; no production adapter or authenticated service exists. | Implement a server-only registry adapter backed by an immutable, authenticated snapshot; verify provenance/digest at the adapter boundary; add integration/adversarial tests and operational evidence. | Runtime core implemented; production registry integration blocked |
| GAP-013 | Availability Resolver | Availability metadata is part of the capability contract, but a live health/readiness resolver is not established. | Distinguish declared availability from observed health; freshness/TTL, timeout, circuit-breaker, offline and stale-state tests. | Not implemented / design gap |
| GAP-014 | Execution Policy contract | Policy evaluation is an adapter boundary; a complete separately versioned policy contract and runtime are not established. | Formal policy inputs/outputs, precedence, versioning, deny reasons, data-classification rules, mode restrictions, conformance vectors. | Not verified |
| GAP-015 | Intelligence Router runtime | Candidate selection is architecturally defined; production routing and provider-health behavior are not verified here. | Provider-neutral routing contract, deterministic policy-constrained selection, no unauthorized remote fallback, timeout/failure tests, route trace minimization. | Not verified |
| GAP-016 | Provider adapters | Provider independence is a design requirement. The current public Agent console is local-only and has no remote provider configured. A provider-neutral adapter runtime is not established. | Versioned adapter contract, replaceable provider implementations, authentication isolation, capability parity declarations, recipient-bound remote disclosure enforcement, error and timeout behavior, adapter conformance tests. | Not implemented |
| GAP-017 | Cancellation and concurrency | Execution contract requires cancellation/revocation observation; production orchestration and race behavior are not established. | Cancellation propagation, idempotency, bounded retries, concurrent revoke/execute tests, timeout and partial-completion semantics. | Not verified |
| GAP-018 | Observability and incident response | Minimized audit requirements are documented; end-to-end production monitoring and incident procedures are not established. | Redacted telemetry, security alerting, incident playbooks, access review, retention controls, tested recovery. | Not verified |
| GAP-019 | iRiel platform integration | Platform integration contract exists; RFC-007 is referenced as a next-build specification. | Versioned API/client integration, authentication, authorization, contract tests, consent UX, cross-repository CI, release evidence. | Specified; implementation not verified |
| GAP-020 | Accessibility conformance | Accessibility is a structural requirement; conformance cannot be inferred from the architecture text. | Automated and manual assistive-technology testing, WCAG 2.2 AA assessment where applicable, documented exceptions and remediation. | Not verified |
| GAP-021 | Future remote execution abuse controls | No public remote Agent gateway is enabled. Before any future remote provider is exposed, server-side abuse controls must be implemented and verified. | Server-side rate limits, abuse telemetry, quota/budget controls, fail-closed behavior, adversarial tests, and an incident-response procedure. | Not implemented; blocks future remote execution |
| GAP-022 | Contact, feedback, and vulnerability-reporting channels | Contact and Feedback pages are status-only; no delivery backend, verified human-contact route, or dedicated secure vulnerability-reporting channel is established. | Implement and test an authenticated or abuse-protected delivery service, privacy notice, retention policy, responsible owner, and dedicated security-reporting workflow before collecting submissions. | Not verified |
| GAP-023 | PRSL-AI Core service repository boundary | Two distinct prototypes (Hono Core and Fastify Core API) currently exist under the iRiel AppWeb repository. They are not interchangeable, no canonical runtime has been selected, and neither is deployed or connected to the public platform API. | Select one canonical service architecture; consolidate and migrate its source, contracts, tests, SDKs, and CI into the PRSL-AI platform repository; remove transitional copies from iRiel only after platform validation passes. | Migration not started; blocks claiming repository separation complete |

## 4. Security invariants — mandatory release gates

No protected operation may execute unless all applicable conditions are satisfied:

1. The caller is authenticated by a trusted server/host boundary. Request-supplied subject fields are not authoritative.
2. The exact capability exists in the trusted registry and is registered, verified, validated, reviewed, and not revoked.
3. The manifest digest and provenance are verified against trusted integrity metadata.
4. The capability declares every required permission and dependency.
5. Current policy permits the operation and the approved scope is equal to or narrower than the requested scope.
6. Consent and fresh confirmation are independently verified when required.
7. Native host permissions are independently granted when required.
8. Remote disclosure is separately authorized for the exact recipient and data scope.
9. Retention is separately authorized for an exact storage scope and bounded duration.
10. The authorization decision is authentic, current, request/subject/capability/purpose/scope-bound, short-lived, and single-use.
11. Decision verification and consumption are atomic; a separate read-then-consume sequence is prohibited.
12. Authorization, policy, registry, consent, and native permission state are rechecked immediately before protected resource access.
13. Any missing, ambiguous, expired, revoked, stale, unverifiable, or unavailable dependency fails closed.
14. Provider or local-execution failure never causes an implicit remote fallback that weakens privacy constraints.
15. Logs and traces exclude credentials, bearer tokens, raw prompts, model chain-of-thought, unnecessary personal data, and sensitive payloads.
16. The model, agent, capability, tool, provider, or client cannot create, widen, or self-approve its own authority.

## 5. Threat scenarios to test

| Threat | Required defense / test |
|---|---|
| Prompt injection or untrusted external content | Treat content as data; it cannot change policy, identity, permissions, or tool authority. |
| Subject/session spoofing | Authenticate independently and bind every decision to the authenticated principal and session. |
| Capability/manifest tampering | Verify provenance and digest against a trusted registry record; reject stale or revoked records. |
| Confused deputy / privilege escalation | Bind permission to exact capability, operation, purpose, resource, recipient, and execution mode. |
| Scope widening | Reject broader resources, increased precision, substituted recipients, or longer retention. |
| Remote data exfiltration | Require separate recipient-bound disclosure authorization; never infer it from local read access or provider sign-in. |
| Retention creep | Require separate storage-scope and duration-bound retention authorization. |
| Replay and TOCTOU race | Use atomic single-use consumption and re-check current state immediately before access. |
| Native permission mismatch | Independently verify the host grant; PRSL-AI authorization cannot replace it. |
| Stale availability / dependency substitution | Resolve dependencies and live availability using trusted, freshness-bounded metadata. |
| Silent remote fallback | Preserve the user's execution constraints; fail closed when no eligible local route exists. |
| Audit or telemetry leakage | Minimize and pseudonymize audit metadata; test that secrets and payloads are excluded. |
| Denial of service / runaway execution | Enforce timeouts, cancellation, bounded retries, quotas, and resource limits. |

## 6. Required next engineering sequence

The following order minimizes duplicated authority and avoids building execution services on untrusted metadata:

1. **Dependency Resolver runtime and trusted Registry integration.** Implement the approved v1.0 contract against authenticated, immutable registry snapshots; preserve permission and model routing boundaries.
2. **Availability Resolver contract.** Separate declared availability from observed readiness, with freshness, timeout, stale-state, and circuit-breaker semantics.
3. **Execution Policy contract.** Formalize policy inputs, outputs, precedence, scope narrowing, data classification, execution modes, and deny reasons.
4. **Capability Registry runtime.** Implement trusted records, digest/provenance verification, lifecycle transitions, review state, and revocation.
5. **Production Permission Manager adapters.** Implement authenticated identity, consent, confirmation, native permissions, remote disclosure, cryptographic decision authority, atomic replay/revocation storage, and durable minimized audit.
6. **Trusted execution boundary.** Enforce registry, dependency, availability, policy, permission, and native-host checks immediately before protected access.
7. **Reference capability.** Implement one narrowly scoped capability end-to-end, then test and review it before promoting additional manifests.
8. **Router and provider adapters.** Implement provider-neutral candidate selection and adapters only after policy, availability, and execution boundaries are enforced.
9. **iRiel integration.** Connect through versioned contracts and cross-repository tests only after the platform's trusted boundary is operational.
10. **Production readiness review.** Perform independent security review, threat-model review, privacy assessment, accessibility testing, operational readiness, and rollback/recovery exercises.

## 7. Evidence required to close a gap

A gap may be closed only when the pull request or release record includes:

- exact source paths and commit references;
- contract/schema version and compatibility impact;
- positive and negative tests, including adversarial cases;
- CI run URL and successful job results;
- security review for trust-boundary or authorization changes;
- operational evidence for deployed components;
- updated architecture indexes and cross-references;
- explicit limitations and remaining risks.

A documentation-only change may close a documentation gap, but it cannot close an implementation or production-readiness gap.

## 8. Release decision

Protected execution is **not production-ready** while any applicable blocking item in GAP-001 through GAP-018 remains open. iRiel integration and accessibility conformance remain additional release-specific gates (GAP-019 and GAP-020). The current Permission Manager core and synthetic contract validators are useful foundations, but they do not remove these blockers.

The gap register must be reviewed whenever a trust boundary, provider, capability, execution mode, data category, or persistent-storage behavior changes.

**Security statement:** This register records known gaps and required controls. It is not a certification, penetration-test report, or proof that the system has no vulnerabilities.
