# Trusted Capability Registry Adapter Contract v1.0

**Owner:** Robert Software Labs  
**Platform:** PRSL-AI Ecosystem  
**Consumers:** Dependency Resolver, Capability Registry service, trusted execution boundary  
**Status:** Normative adapter contract; production adapter not implemented  
**Related:** [Capability Registry Specification](./registry-specification.md) · [Dependency Resolver Specification](./dependency-resolver-specification.md) · [Implementation Readiness and Gap Register](../IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md)

## 1. Purpose and implementation boundary

This contract defines the server-side trust boundary between the Dependency Resolver and a future persistent Capability Registry implementation. It standardizes the adapter already injected into `resolveDependencies` without selecting a database, hosting provider, authentication vendor, or deployment topology.

The adapter is an authority boundary, not a thin database query wrapper. It MUST return only records whose identity, snapshot membership, lifecycle, validation, review, integrity, and current revocation state have been verified. Database rows, cache entries, request fields, and caller-provided manifests are untrusted until the adapter validates them.

This document does not claim that a production registry service, persistence layer, authentication integration, signing infrastructure, or adapter exists.

## 2. Trust and deployment boundary

1. The adapter MUST execute only in a trusted server or host process. It MUST NOT be imported into browser bundles or exposed as a client-side authorization mechanism.
2. Callers MUST be authenticated before invoking registry operations. The adapter MUST receive an authenticated service identity from the trusted transport boundary; request-supplied subject or role fields are never authoritative.
3. Registry read and write privileges MUST be separated. Dependency resolution receives read-only access to immutable snapshots and current revocation state.
4. Administrative registration, review, lifecycle transition, and revocation operations require separately authorized publisher/reviewer identities and auditable controls.
5. Registry access MUST use least privilege. No registry operation grants a user permission or authorizes capability execution.
6. Credentials, signing keys, private user context, prompts, provider secrets, and conversation memory MUST NOT be stored in capability manifests or returned registry records.

## 3. Adapter interface

The v1.0 resolver port is the compatibility boundary:

```ts
interface TrustedDependencyRegistry {
  getRootCapability(input: {
    capabilityId: string;
    snapshotRef: string;
  }): Promise<TrustedRegistryRecord | null>;

  findCandidates(input: {
    dependencyType: DependencyType;
    dependencyId: string;
    snapshotRef: string;
  }): Promise<TrustedRegistryRecord[]>;
}
```

The implementation MUST preserve these semantics:

- `getRootCapability` returns exactly one root record from the named immutable snapshot, or `null` when no such root exists.
- `findCandidates` returns every candidate for the exact dependency type and ID in that snapshot, subject to bounded pagination performed internally. It MUST NOT silently truncate results in a way that could hide a duplicate highest version.
- Both operations MUST reject malformed identifiers and unknown snapshots before querying persistent storage.
- Both operations MUST fail with an error when the registry or its required trust/revocation service is unavailable. Returning an empty list for an outage is prohibited.
- The adapter MUST NOT accept arbitrary manifests, snapshot contents, URLs, SQL fragments, or registry record objects from the caller.

The current TypeScript port is a resolver-facing interface only. A future contract revision may add explicit snapshot metadata, record version, revocation state, and attestation references; those fields MUST NOT be simulated by trusting caller-supplied booleans.

## 4. Immutable snapshot semantics

A snapshot reference identifies a fixed, complete registry view. Once published, its record membership, record versions, and manifest bytes MUST NOT be modified in place.

- Snapshot identifiers MUST be opaque, non-guessable references and MUST resolve only within the authenticated registry authority.
- A new registration, manifest version, approval, or lifecycle change creates a new snapshot or immutable record revision.
- Snapshot publication MUST be atomic: consumers see either the complete previous snapshot or the complete new snapshot, never a partially written set.
- The snapshot metadata MUST identify its creation time, registry authority, schema/contract versions, and integrity commitment.
- A snapshot MUST be complete for the declared registry scope. Pagination and query execution MUST preserve completeness and deterministic ordering.
- The resolver MUST use one snapshot reference for the root and every dependency in a single resolution.

Immutability does not freeze revocation. Current revocation and emergency-disable state MUST be checked independently at read/dispatch time. If a record in a historical snapshot has since been revoked or disabled, the adapter MUST fail closed and MUST NOT return it as eligible. A snapshot reference is not a revocation bypass.

## 5. Record verification requirements

Before returning a record as eligible, the adapter MUST verify all of the following at its trusted boundary:

1. Exact registry authority, snapshot reference, dependency type, and dependency ID.
2. Registration status is `registered`.
3. Schema validation has passed for the complete manifest, including compilation of embedded input and output JSON Schemas using a Draft 2020-12 validator.
4. Policy/security review status is `approved`.
5. Manifest lifecycle status is `verified`.
6. The record revision and manifest version are internally consistent.
7. The manifest digest matches the exact canonical manifest bytes.
8. The digest/attestation is anchored to a configured trust root and the verification key is valid, not expired, and not revoked.
9. The record has not been revoked, disabled, superseded for dispatch, or invalidated by a current security hold.
10. Required schema, contract, and trust metadata are supported by this adapter version.

A boolean such as `digest_verified: true` is an output of successful adapter verification, never an input that makes a record trusted. The resolver may consume the boolean as a result of the trusted adapter boundary; it cannot establish provenance itself.

## 6. Manifest canonicalization and integrity

The registry MUST define one canonicalization algorithm and version before accepting production registrations. The recommended v1.0 baseline is JSON Canonicalization Scheme (RFC 8785) followed by SHA-256 over the canonical UTF-8 manifest bytes.

- Canonicalization MUST reject duplicate object keys and invalid JSON.
- The exact canonicalization identifier and digest algorithm MUST be recorded with each immutable revision.
- Any change to manifest content, including embedded schemas, changes the digest and creates a new revision.
- Verification MUST compare the computed digest with the registry's independently protected integrity metadata.
- If signatures or attestations are used, verification MUST bind the digest, capability ID, capability version, registry authority, record revision, and snapshot publication.
- Trust roots, key rotation, compromise response, and revocation MUST be managed outside manifest content and protected from registry-writer privilege.
- Unsupported algorithms, missing trust metadata, invalid signatures, or key-state uncertainty MUST fail closed.

The RFC 8785/SHA-256 baseline is a contract recommendation, not evidence that signing keys or attestation infrastructure have been provisioned.

## 7. Persistence and transaction requirements

The storage engine is deliberately unspecified. A conforming adapter may use a self-hosted database, embedded durable store, or optional managed service, provided the following properties are demonstrated:

- Durable immutable record revisions and snapshot manifests.
- Unique constraints for registry identity and revision identity.
- Atomic snapshot publication and lifecycle transitions.
- Serializable or equivalently safe concurrency for registration, approval, revocation, and publication.
- No update-in-place of a published manifest revision.
- Append-only security/audit events or an equivalent tamper-evident audit mechanism.
- Backup, restore, retention, and integrity verification procedures.
- Bounded queries, indexes for exact identity/version lookup, and explicit pagination limits.
- No implicit dependency on a hosted vendor or on a browser-side SDK.

A database transaction MUST NOT make a record dispatch-eligible until validation, review, integrity verification, and publication have all completed. Revocation MUST become visible to subsequent adapter reads before another protected dispatch can rely on the record.

## 8. Failure semantics

The adapter MUST fail closed for:

- authentication failure or missing service identity;
- unknown, expired, incomplete, or unsupported snapshot;
- database timeout, connection loss, or partial query;
- unavailable revocation or trust-root service;
- digest, signature, schema, identity, or version mismatch;
- duplicate eligible highest-version records;
- stale cache or unverifiable cache provenance;
- concurrent lifecycle/revocation changes that cannot be resolved safely.

The adapter MUST NOT convert any of these conditions into an empty candidate list, a successful partial result, or a fallback to a different registry authority. Errors returned to callers MUST be bounded and redacted; internal logs MUST NOT contain credentials or manifest payloads unnecessarily.

A cache may be introduced only under a separate signed-cache contract with bounded age, authenticated provenance, and an online revocation check. No cache is implied by v1.0.

## 9. Required verification suite

A production adapter is not acceptable until automated integration and adversarial tests demonstrate:

1. Correct exact lookup by capability ID, dependency type, ID, and snapshot.
2. Snapshot immutability and atomic publication under concurrent readers.
3. Complete candidate enumeration and deterministic results across pages.
4. Rejection of cross-snapshot records, identity substitution, stale revisions, and duplicate versions.
5. Rejection of malformed manifests and invalid embedded JSON Schemas.
6. Digest mismatch, invalid attestation, unknown key, expired key, and revoked key failures.
7. Immediate rejection after record revocation or emergency disable.
8. Authentication and least-privilege enforcement for read, write, review, and revocation roles.
9. Transaction rollback and fail-closed behavior during storage outage, timeout, and partial publication.
10. Audit completeness without credentials, prompts, user context, or sensitive manifest payload leakage.
11. Resolver integration proving that registry outage blocks both required and optional dependency resolution.
12. Backup/restore and post-restore integrity verification.

Unit tests with synthetic fixtures are necessary but do not satisfy these production integration criteria.

## 10. Readiness decision

The adapter remains **not implemented** until a concrete persistence implementation, trusted authentication boundary, integrity/trust-root verification, current revocation check, integration tests, and operational evidence exist.

No database, cloud provider, hosting service, authentication vendor, or deployment target is selected by this contract. The platform remains provider-agnostic and local/self-hosted compatible.
