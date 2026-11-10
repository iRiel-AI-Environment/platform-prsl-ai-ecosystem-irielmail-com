# Capability Registry Specification v1.0

**Status:** Proposed  
**Owner:** Robert Software Labs  
**Scope:** PRSL-AI Ecosystem / Agent PRSL-AI  
**Related:** [Trusted Registry Adapter Contract v1.0](./trusted-registry-adapter-contract.md)

## 1. Purpose

The Capability Registry is the authoritative discovery index for capability manifests. It stores and serves declarations; it does not itself grant permissions or execute capabilities.

## 2. Responsibilities

- Register and version capability manifests.
- Enforce unique Capability IDs.
- Validate manifests against the published JSON Schema.
- Expose discovery by ID, module, tags, lifecycle status, and supported execution modes.
- Resolve the declared contract version and capability version.
- Preserve deprecation and replacement metadata.
- Provide the Router with validated capability metadata.

## 3. Non-responsibilities

The Registry must not:
- grant user or device permissions;
- make policy exceptions;
- execute tools or models;
- store user conversation memory;
- treat registration as proof of implementation or runtime availability.

## 4. Registration lifecycle

`draft → schema_validated → policy_reviewed → registered → deprecated`

A registration is not eligible for routing until it is schema-valid, policy-reviewed, and in an eligible lifecycle state. `proposed`, `specified`, `in_development`, and `deprecated` entries are documentation or development records only and must not be dispatched as executable capabilities. For protected execution, the manifest lifecycle state must be `verified`, the registry record must be `registered`, `validation_status` must be passing, and `review_status` must be approved. No other manifest lifecycle state is dispatch-eligible.

## 5. Registry record

Each record contains the canonical Capability Manifest plus registry metadata:

- `registry_id`
- `registered_at`
- `updated_at`
- `manifest_digest`
- `validation_status`
- `review_status`
- `supersedes` (optional)
- `replaced_by` (optional)

Registry metadata must not be confused with manifest-owned declarations.

## 6. Discovery contract

Suggested read operations:

- `GET /capabilities/{capability_id}`
- `GET /capabilities?module_id=...`
- `GET /capabilities?tag=...`
- `GET /capabilities?lifecycle_status=...`

Suggested administrative operations:

- `POST /capabilities`
- `PUT /capabilities/{capability_id}`
- `POST /capabilities/{capability_id}/deprecate`

These are logical API proposals, not existing deployed endpoints.

## 7. Registration and dispatch controls

- Validate the complete manifest before registration, including compiling each embedded `input_schema` and `output_schema` with a Draft 2020-12 validator equivalent to `Draft202012Validator.check_schema`; validating only the outer manifest is insufficient.
- Enforce uniqueness and immutable identity semantics.
- Require authorized publisher identity for write operations.
- Verify manifest digest and version during dispatch.
- Re-check lifecycle status, availability, permissions, and execution policy at runtime.
- Do not route to entries marked `proposed`, `specified`, `in_development`, or `deprecated`.
- Dispatch only a registered record whose manifest lifecycle state is `verified`, whose manifest digest is current, and whose validation and policy-review statuses are passing/approved.
- Treat registry data and all external metadata as untrusted until validated.

## 8. Security and privacy

- Registry access follows least privilege.
- Read access exposes only public capability metadata.
- Secrets, user context, private signing material, and provider credentials are prohibited in manifests.
- Audit registration and mutation events without recording sensitive payloads.
- Revocation or disabling must take effect before the next dispatch and, where feasible, cancel in-flight operations.

## 9. Failure behavior

Registry unavailability must fail closed for new dispatches unless a separately specified, signed, policy-approved cache is available. A cached record must have a bounded age and be revalidated against current revocation and policy state.

## 10. Acceptance criteria

1. Duplicate IDs are rejected.
2. Invalid manifests are rejected with actionable validation errors.
3. Discovery returns only records visible to the caller.
4. Proposed, specified, in-development, and deprecated capabilities cannot be dispatched; only verified manifests on approved registered records are eligible.
5. Registry registration does not imply permission or availability.
6. Manifest version and digest are available to the Router.
7. Revocation is enforced at dispatch time.
8. No user memory or provider secrets are stored in registry records.

## 11. Adapter boundary

The server-side implementation MUST conform to the [Trusted Registry Adapter Contract v1.0](./trusted-registry-adapter-contract.md). The adapter verifies snapshot membership, record identity, schema validation, review state, manifest integrity, trust metadata, and current revocation before returning an eligible record to the Dependency Resolver.

## 12. Implementation boundary

This document specifies registry behavior. It does not claim that a registry service, persistent adapter, or endpoint has been implemented.
