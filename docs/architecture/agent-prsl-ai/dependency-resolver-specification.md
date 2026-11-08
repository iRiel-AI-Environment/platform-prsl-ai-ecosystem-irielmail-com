# PRSL-AI Dependency Resolver Specification v1.0

**Owner:** Robert Software Labs  
**Platform:** PRSL-AI Ecosystem  
**Consumer:** Agent PRSL-AI and other authorized capability consumers  
**Status:** Contract and deterministic reference validation  
**Related:** [Capability Contract](./capability-contract.md) · [Capability Manifest Schema](./schemas/capability-manifest.schema.json) · [Capability Registry](./registry-specification.md) · [Implementation Readiness and Gap Register](../IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md)

## 1. Purpose

The Dependency Resolver evaluates the declared dependencies of a verified root capability against one trusted, immutable registry snapshot. It produces a deterministic dependency graph, a dependency-first order, explicit optional omissions, and separate authorization/model requirements.

The resolver is a planning and validation component. It does not install, download, start, execute, authorize, grant, or provision dependencies. It does not query arbitrary URLs or accept a caller-supplied registry catalog as an authority.

## 2. Authority and separation of concerns

| Concern | Authority |
|---|---|
| Manifest identity, version, lifecycle, digest, and registration | Trusted Capability Registry |
| Dependency graph and version compatibility | Dependency Resolver |
| Current runtime/service readiness | Availability Resolver |
| Policy constraints and execution mode | PRSL-AI Policy Engine |
| Provider candidate selection | Intelligence Router |
| User/device permission decisions | Permission Manager and host operating system |
| Actual execution | Trusted server/host execution boundary |

The Dependency Resolver MUST NOT:
- treat a permission dependency as a granted permission;
- select or authenticate an AI provider;
- infer runtime availability from registry registration;
- change policy or widen a requested scope;
- download, install, start, or execute any dependency;
- promote a manifest lifecycle state;
- bypass registry integrity or revocation checks.

Permission dependencies are returned as authorization requirements for the Permission Manager. Model requirements and provider constraints are returned to the Intelligence Router. Neither is resolved into an authorization grant or provider selection.

## 3. Request contract

The normative request schema is [dependency-resolution-request.schema.json](./schemas/dependency-resolution-request.schema.json).

A request identifies:
- a unique resolution ID;
- the exact root Capability ID;
- an optional root version constraint;
- a trusted registry snapshot reference;
- an optional-dependency policy;
- bounded graph depth and node limits.

The registry snapshot reference is an opaque handle resolved through a trusted Registry adapter. Clients MUST NOT submit arbitrary manifest records or registry contents as trusted input.

The trusted root registry record MUST match the requested Capability ID and snapshot reference, be registered, schema-validated, policy-reviewed, digest-verified, and have lifecycle status verified. The registry record version must match the root manifest version. Otherwise the resolution is blocked.

## 4. Dependency model

The resolver processes the dependency groups already defined by the Capability Manifest:

- runtime
- framework
- device
- service
- capability
- permission
- model

The first five groups describe resolvable registry dependencies. Capability dependencies are recursive and contribute their own transitive dependencies.

Permission dependencies are collected into authorization requirements and are never marked resolved by this component.

The model object is returned as a model requirement. If required, its provider constraints are passed to the Intelligence Router. The resolver does not choose a provider or assume that a provider is available.

## 5. Version selector grammar

For v1.0, a dependency version selector supports exactly one stable semantic-version selector:

- exact version: 1.2.3
- explicit exact version: =1.2.3
- greater than or equal: >=1.2.3
- greater than: >1.2.3
- less than or equal: <=1.2.3
- less than: <1.2.3

Versions use MAJOR.MINOR.PATCH with non-negative integers and no leading zeroes except zero itself. Prerelease and build metadata, wildcards, OR expressions, and compound ranges are not supported in v1.0. Unsupported selectors MUST fail closed with UNSUPPORTED_VERSION_CONSTRAINT; they must not be guessed or interpreted permissively.

When no selector is declared, the resolver chooses the highest eligible stable version in the trusted snapshot. Separate platform policy may still block that candidate.

For a given dependency type and ID, only one version may appear in a resolution graph. If another path imposes a constraint not satisfied by the already selected version, the resolution is blocked with DEPENDENCY_VERSION_CONFLICT. The v1.0 resolver is deliberately conservative and does not perform speculative version backtracking.

## 6. Candidate eligibility and deterministic selection

A candidate is eligible only when:
1. its registry snapshot reference exactly matches the request snapshot;
2. its registration status is registered;
3. its validation status is passed;
4. its policy review status is approved;
5. its dependency type and ID exactly match the requested reference;
6. its version is a valid stable MAJOR.MINOR.PATCH version;
7. its lifecycle status is verified;
8. its registry record and manifest integrity have been verified by the trusted Registry adapter;
9. for a capability dependency, the embedded manifest Capability ID and capability version match the registry record.

The resolver chooses the highest eligible version in the trusted snapshot satisfying the declared selector. The root record and every candidate must be registered, schema-validated, policy-reviewed, digest-verified, and lifecycle-verified within the same snapshot. If multiple eligible records have the same highest version, the result is blocked with DEPENDENCY_REGISTRY_AMBIGUOUS. The resolver must not choose one arbitrarily.

A missing or unverified required dependency blocks the graph. A missing, unverified, or version-incompatible optional dependency may be omitted and produces a degraded result. When the request uses required_only, all optional dependencies are omitted even if candidates exist.

## 7. Graph algorithm and bounded execution

The resolver uses deterministic depth-first traversal with:
- a fixed dependency-category order;
- lexicographic ordering of dependency IDs within each category;
- descending semantic-version candidate ordering;
- - cycle detection against the active traversal stack;
- one selected version per dependency type and ID;
- bounded maximum depth and dependency-node count, excluding the root capability.

A cycle produces DEPENDENCY_CYCLE. Exceeding either configured limit produces RESOLUTION_LIMIT_EXCEEDED. Any blocked result MUST return an empty dependency_order, even if some dependencies were resolved for diagnostic purposes.

The dependency order is topological: every resolved dependency appears after its own transitive prerequisites. It is a resolution order only and never an instruction to execute or install dependencies. The result is deterministic for the same trusted root record, registry snapshot, and request policy.

## 8. Result contract

The normative result schema is [dependency-resolution-result.schema.json](./schemas/dependency-resolution-result.schema.json).

The result includes:
- resolution identity and trusted registry snapshot reference;
- resolved dependencies and their registry record references;
- optional dependencies omitted with reason codes;
- authorization requirements, not grants;
- model requirements and provider constraints, not provider selections;
- dependency-first order;
- structured errors.

Statuses:
- resolved: every required dependency was resolved and no optional dependency was omitted;
- degraded: all required dependencies were resolved, but one or more optional dependencies were omitted;
- blocked: a required dependency, trust check, version constraint, graph-integrity check, or resource limit failed.

A blocked result is never dispatch-eligible. A resolved or degraded result is only one input to subsequent availability, policy, authorization, and execution checks. It is not permission to execute.

## 9. Failure codes

| Code | Meaning |
|---|---|
| ROOT_CAPABILITY_NOT_VERIFIED | Root record is not verified and trusted. |
| ROOT_CAPABILITY_ID_MISMATCH | Root registry record does not match the requested Capability ID. |
| ROOT_VERSION_UNSATISFIED | Root version does not satisfy the request. |
| DEPENDENCY_NOT_FOUND | Required dependency has no registry record. |
| DEPENDENCY_NOT_VERIFIED | Candidate records exist but none is trusted and verified. |
| DEPENDENCY_VERSION_UNSATISFIED | No eligible version satisfies the selector. |
| DEPENDENCY_VERSION_CONFLICT | Another graph path requires an incompatible version of the same dependency. |
| DEPENDENCY_REGISTRY_AMBIGUOUS | Multiple eligible records share the highest compatible version. |
| DEPENDENCY_MANIFEST_MISMATCH | Capability manifest identity/version does not match its registry record. |
| DEPENDENCY_CYCLE | A dependency cycle exists in the active graph. |
| UNSUPPORTED_VERSION_CONSTRAINT | Version selector is outside the v1.0 grammar. |
| RESOLUTION_LIMIT_EXCEEDED | Maximum depth or node count was exceeded. |
| MODEL_PROVIDER_CONSTRAINT_CONFLICT | Required model constraints have an empty intersection. |

## 10. Validation and acceptance criteria

Run from the repository root:

    python docs/architecture/agent-prsl-ai/scripts/validate_dependency_resolver.py

The deterministic validator checks both JSON Schemas and synthetic positive/negative graph fixtures.

Acceptance criteria:
1. Required missing, unverified, or incompatible dependencies block resolution.
2. Optional omissions produce degraded status and never hide required failures.
3. Version selection is deterministic and rejects ambiguous registry records.
4. Transitive capability dependencies are traversed and cycles are rejected.
5. Conflicting version constraints fail closed.
6. Depth and node limits are enforced.
7. Permission dependencies are returned only as authorization requirements.
8. Model requirements are returned to routing without provider selection.
9. Blocked results have an empty dependency-first order.
10. No test fixture is represented as a production registry entry or runtime.

## 11. Implementation boundary

This artifact defines a contract and deterministic reference validator only. It does not implement a production Dependency Resolver service, trusted registry adapter, package manager, availability checker, or execution runtime. Synthetic records are test fixtures. Production dispatch remains blocked until the complete trust and execution gates are implemented and verified.
