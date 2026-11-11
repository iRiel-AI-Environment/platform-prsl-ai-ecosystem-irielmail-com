# PRSL-AI Core Transport Decision — Hono Fetch Adapter

**Decision ID:** CORE-TRANSPORT-001  
**Status:** Accepted architectural decision; implementation and production readiness remain open  
**Owner:** Robert Software Labs / PRSL-AI Ecosystem  
**Date:** 2026-11-11

## 1. Decision

Use **Hono as the HTTP transport adapter** for the PRSL-AI Core service boundary.

This does not make Hono the PRSL-AI Core itself. PRSL-AI Core remains a modular platform architecture comprising versioned contracts, policy, Permission Manager, Capability Registry, Intelligence Router, trusted execution boundaries, and approved runtime/provider adapters.

The Hono Fetch API is selected because the current platform server entrypoint is Fetch-compatible and Hono can operate across supported self-hosted runtimes without binding the Core architecture to Node's HTTP server model.

## 2. Existing prototype disposition

The iRiel AppWeb repository contains two transitional prototypes:

| Prototype | Decision | Rationale |
|---|---|---|
| Hono `services/prsl-ai-core/` | **Transport source candidate only; do not adopt as-is** | Fetch-compatible transport. Current static bearer authentication, custom request schema, provider-selection logic, and Node bootstrap are not canonical. |
| Fastify `services/prsl-ai-core-api/` | **Not selected as the transport** | Node HTTP-specific server model is less portable with the platform's Fetch-compatible server boundary. Its JWT scope and policy tests may be used as reference material, but not as a second authority. |

Neither prototype is canonical, deployed, or connected to AppWeb. Both remain in the AppWeb repository until the platform migration and compatibility checks are complete. No third Core service or prototype is authorized.

## 3. Mandatory refactoring before platform adoption

The existing Hono prototype must not be copied or deployed unchanged. The platform-owned implementation must:

1. Export a Fetch-compatible handler and keep any host-specific bootstrap outside the Core contract.
2. Replace static shared bearer-token authentication with the platform-approved service authentication boundary.
3. Treat service authentication as caller identity only; it must not substitute for end-user consent or Permission Manager authorization.
4. Remove its private `ModelRouter`; candidate selection belongs to the platform Intelligence Router.
5. Remove its private execution-policy authority; policy and Permission Manager remain platform-owned.
6. Replace its custom `language/input/preferences` request contract with versioned PRSL-AI capability and Router contracts.
7. Keep the RSL-controlled local runtime as the preferred execution path.
8. Keep remote inference disabled by default. External providers remain optional, separately governed adapters; no silent remote fallback is permitted.
9. Fail closed when registry, policy, Permission Manager, Router, or runtime dependencies are unavailable.
10. Retain no prompt, conversation, profile, or memory payloads in logs or service storage.
11. Add contract tests for malformed requests, unauthenticated callers, insufficient scope, missing/expired/revoked decisions, unavailable adapters, local-only requests, and remote-fallback denial.
12. Add CI and dependency audit coverage in the PRSL-AI platform repository.

## 4. Authority flow

`Intent → Context → Policy / Permission Manager → Intelligence Router → Capability / Runtime`

The Router selects only from candidates already eligible under platform policy and authorization constraints. The Permission Manager issues and verifies protected-operation decisions. The trusted execution boundary atomically verifies and consumes the applicable decision before execution.

The Hono transport adapter cannot create permissions, widen scopes, register trusted capabilities, select an unapproved provider, or bypass the platform Router.

## 5. Migration sequence

1. Define the platform-owned versioned Core request/response contract against the existing Capability and Router contracts.
2. Implement the Hono Fetch adapter inside the PRSL-AI platform repository using injected platform-owned ports.
3. Connect production registry, policy, Permission Manager, and trusted execution adapters only after each adapter passes its own security and contract tests.
4. Register the RSL-controlled local runtime through the approved provider/runtime contract. Do not enable remote inference as a temporary substitute.
5. Add cross-repository contract tests between platform and AppWeb.
6. Update the AppWeb client to call only the platform-owned versioned contract.
7. Verify end-to-end local execution, denial, revocation, timeout, unavailable-runtime, and no-remote-fallback cases.
8. Deprecate and remove the two AppWeb service prototypes only after the platform implementation and AppWeb integration are verified.

## 6. Explicit non-decisions

This decision does not select a hosting provider, deployment target, model vendor, inference endpoint, DNS configuration, or account. It does not claim that a production Core service, Intelligence Router runtime, local model runtime, or AppWeb integration currently exists.

The implementation gap remains tracked in [GAP-023](./IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md), with production Router, provider, authentication, Permission Manager, and trusted execution blockers tracked separately.

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem
