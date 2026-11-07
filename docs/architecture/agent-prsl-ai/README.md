# Agent PRSL-AI Architecture

**Owner:** Robert Software Labs  
**Ecosystem:** PRSL-AI Ecosystem  
**Canonical agent identity:** `@prsl-ai.agent.prsl.ai`  
**Parent platform identity:** `@prsl-ai.prsl.ai.ecosystem`  
**Institutional signature:** Powerful by Robert Software Labs  
**Document status:** Architecture specification; implementation status is component-specific

This documentation defines Agent PRSL-AI as the specialized platform agent within the PRSL-AI Ecosystem. It distinguishes architectural definitions from implementation status: inclusion in this catalog does not claim that a module, API, provider, adapter, or runtime is already implemented.

## Identity and scope

- **Agent PRSL-AI** is the specialized agent identity for institutional and technical knowledge of the PRSL-AI Ecosystem and authorized platform tasks.
- **Powerful by Robert Software Labs** is its institutional signature; it is not a model/provider name and does not imply unrestricted autonomy.
- **iRiel AI** is the distinct Powerfully Intelligence Environment that coordinates the user's broader personal intelligence experience.
- **Capability modules** group related specialist functions.
- **Capabilities** are individually identified operations with explicit input/output contracts.
- **Integration extensions** connect the agent and authorized consumers to external platforms and system surfaces.
- **PRSL-AI policy and routing** govern candidate selection, permissions, provider choice, and execution boundaries.
- **The Permission Manager** is the only PRSL-AI component that issues authorization decisions for protected operations.
- **Human authority** remains the source of user intent and consent.

The governing separation is:

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

## Documents

| Document | Purpose |
|---|---|
| [Agent PRSL-AI institutional and architectural specification](../PRSL-AI-AGENT.md) | Canonical agent identity, specialization, scope, responsibilities, and boundaries. |
| [iRiel — Powerfully Intelligence Environment](../IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md) | Canonical definition of the environment that orchestrates personal intelligence. |
| [Capability Contract v1.0](./capability-contract.md) | Shared contract for identity, schemas, permissions, dependencies, availability, and execution policy. |
| [Capability Catalog](./capability-catalog.md) | Initial module and interface inventory with candidate capability operations. |
| [Reasoning and Action Execution Pattern](./reasoning-action-execution-pattern.md) | ReAct-informed plan/action/observation/verification cycle, with PRSL-AI policy and authorization gates. |
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

`Human → iRiel identity/context → PRSL-AI intent and policy → Intelligence Router (candidate selection only) → Permission Manager (authorization gate) → approved capability or integration adapter → execution target`

The ReAct-informed execution pattern adds a governed task loop around approved operations:

`Interpret → Plan → Evaluate → Authorize → Act → Observe → Verify → Adapt or Stop`

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
