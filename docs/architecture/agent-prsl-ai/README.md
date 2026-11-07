# AgentPRSL-AI Architecture

**Owner:** Robert Software Labs  
**Ecosystem:** PRSL-AI Ecosystem  
**Agent identity:** `@AgentPRSL-AI`  
**Document status:** Architecture proposal assembled from the current design material

This documentation organizes the AgentPRSL-AI capability model and its integration boundaries. It distinguishes architectural definitions from implementation status: inclusion in this catalog does not claim that a module, API, provider, adapter, or runtime is already implemented.

## Architecture at a glance

- **AgentPRSL-AI** is the specialized agent identity.
- **Capability modules** group related specialist functions.
- **Capabilities** are individually identified operations with explicit input/output contracts.
- **Integration extensions** connect the agent and iRiel to external platforms and system surfaces.
- **PRSL-AI policy and routing** govern selection, permissions, provider choice, and execution.
- **Human authority** remains the ultimate authority for consent and consequential actions.

The governing separation is:

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

## Documents

| Document | Purpose |
|---|---|
| [Capability Contract v1.0](./capability-contract.md) | Shared contract for identity, schemas, permissions, dependencies, availability, and execution policy. |
| [Capability Catalog](./capability-catalog.md) | Initial module and interface inventory with candidate capability operations. |
| [Capability Registry Specification](./registry-specification.md) | Registration, discovery, lifecycle, and dispatch governance. |
| [Permission Manager Specification](./permission-manager-specification.md) | Authorization authority, consent lifecycle, runtime gate, revocation, delegation, and fail-closed enforcement. |
| [Permission Request Schema](./schemas/permission-request.schema.json) | Machine-readable input contract for one protected operation. |
| [Permission Decision Schema](./schemas/permission-decision.schema.json) | Machine-readable, scope-bound authorization outcome. |
| [Permission Manager Test Vectors](./validation/permission-manager-cases.json) | Positive and negative request/decision contract cases. |
| [Capability Manifest JSON Schema](./schemas/capability-manifest.schema.json) | Machine-readable validation schema for capability manifests. |
| Capability manifests | [Vision](./examples/vision-analyze-image.manifest.json) · [Voice](./examples/voice-synthesize-speech.manifest.json) · [Location](./examples/location-resolve-location.manifest.json) · [Recognizers](./examples/recognizers-classify-content.manifest.json) · [Tools](./examples/tools-evaluate-tool.manifest.json) · [Creative](./examples/creative-generate-text.manifest.json) · [Reader](./examples/reader-extract-document-content.manifest.json). All seven are specified examples, not implementation claims. |
| [Validation instructions](./validation/README.md) | Local validation commands and CI behavior. |
| [Apple Integration — Canonical Extension v5](./extensions/apple-integration-v5.md) | Controlled integration boundary for Apple technologies and system surfaces. |

## Canonical architecture flow

`Human → iRiel identity/context → PRSL-AI intent and policy → Intelligence Router (candidate selection only) → Permission Manager (authorization gate) → capability or integration adapter → execution target`

The flow is conceptual. Concrete runtime components and integrations must be verified separately.

## Status vocabulary

- **Canonical:** A user-designated architectural invariant or extension.
- **Proposed:** A structured design awaiting explicit adoption or implementation.
- **Planned:** A capability intended for future work.
- **Implemented:** Present in code and verified.
- **Verified:** Tested against a defined acceptance criterion.

Do not use *Implemented* or *Verified* based only on documentation or a declared intention.

## Design invariants

1. Provider independence: capability identity does not depend on a model vendor.
2. Minimum disclosure: only data required for a specific operation may cross a boundary.
3. Explicit authority: the Permission Manager is the only PRSL-AI component that issues authorization decisions; a capability cannot grant itself permissions.
4. Local-first preference: local execution is preferred where compatible and policy-compliant.
5. Graceful degradation: optional integrations may be unavailable without invalidating the agent or capability identity.
6. Memory separation: transient execution context does not automatically become persistent memory.
7. Accessibility and inclusion are structural requirements, not optional presentation features.
8. Human authority governs consent and consequential actions.

## Validation

A GitHub Actions workflow validates JSON syntax, JSON Schema conformance, unique capability identifiers, module/identifier consistency, and permission declaration consistency for example manifests on relevant pull requests.

A passing documentation validation is not proof of a deployed runtime, provider connection, permission grant, or operational capability.

## Scope note

This documentation is an architecture baseline. It does not create application code, runtime registrations, Apple entitlements, provider connections, permissions, or deployed integrations.
