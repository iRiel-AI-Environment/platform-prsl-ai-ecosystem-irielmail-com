# Agent PRSL-AI Architecture

**Owner:** Robert Software Labs  
**Ecosystem:** PRSL-AI Ecosystem  
**Canonical agent identity:** `@prsl-ai.agent.prsl.ai`  
**Parent platform identity:** `@prsl-ai.prsl.ai.ecosystem`  
**Institutional signature:** Powerful by Robert Software Labs  
**Repository placement:** First-party component in the canonical PRSL-AI platform repository  
**Document status:** Architecture specification; implementation status is component-specific

This documentation defines Agent PRSL-AI as the specialized platform agent within the PRSL-AI Ecosystem. It distinguishes architectural definitions from implementation status: inclusion in this catalog does not claim that a module, API, provider, adapter, or runtime is already implemented.

**Repository decision:** Agent PRSL-AI does not require an independent Git repository. It is modularly owned and tested within the PRSL-AI Ecosystem repository. See [Platform, Agent, and Repository Governance](../PLATFORM-AGENT-REPOSITORY-GOVERNANCE.md) for the canonical ownership, dependency, release, and repository-split rules.

## Identity and scope

- **Agent PRSL-AI** is the first-party specialized agent identity for institutional and technical knowledge of the PRSL-AI Ecosystem and authorized platform tasks.
- **Powerful by Robert Software Labs** is its institutional signature; it is not a model/provider name and does not imply unrestricted autonomy.
- **iRiel AI** is the distinct Powerfully Intelligence Environment that coordinates the user's broader personal intelligence experience and may integrate with approved PRSL-AI capabilities.
- **Capability modules** group related specialist functions.
- **Capabilities** are individually identified operations with explicit input/output contracts.
- **Integration extensions** connect the agent and authorized consumers to external platforms and system surfaces.
- **PRSL-AI policy and routing** govern candidate selection, permissions, provider choice, and execution boundaries.
- **The Permission Manager** is the only PRSL-AI component that issues authorization decisions for protected operations.
- **Human authority** remains the source of user intent and consent.

The governing separation is:

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

## Repository and module boundary

The canonical repository is the PRSL-AI Ecosystem platform repository. Agent-specific code, tests, manifests, evaluations, and documentation must remain identifiable as Agent-owned modules within that repository. Shared policy, routing, registry, Permission Manager, and common schemas remain platform-owned contracts; the Agent consumes them and must not fork or privately redefine them.

An independent Agent repository is a future option only if deployment, distribution, team permissions, compliance, or release requirements establish a real need. Such a split requires an approved migration and compatibility plan. It is not the current architecture decision.

## Documents

| Document | Purpose |
|---|---|
| [Platform, Agent, and Repository Governance](../PLATFORM-AGENT-REPOSITORY-GOVERNANCE.md) | Canonical ownership, repository placement, module boundaries, dependency direction, release governance, and split criteria. |
| [Agent PRSL-AI institutional and architectural specification](../PRSL-AI-AGENT.md) | Canonical agent identity, specialization, scope, responsibilities, and boundaries. |
| [iRiel — Powerfully Intelligence Environment](../IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md) | Canonical definition of the environment that orchestrates personal intelligence. |
| [Capability Contract v1.0](./capability-contract.md) | Shared contract for identity, schemas, permissions, dependencies, availability, and execution policy. |
| [Capability Catalog](./capability-catalog.md) | Initial module and interface inventory with candidate capability operations. |
| [Reasoning and Action Execution Pattern](./reasoning-action-execution-pattern.md) | ReAct-informed plan/action/observation/verification cycle, with PRSL-AI policy and authorization gates. |
| [Executable Execution Contract v1.0](./executable-execution-contract.md) | Machine-readable execution envelope and cross-component dispatch/authorization gates. |
| [Execution Envelope JSON Schema](./schemas/execution-envelope.schema.json) | State and trusted-reference contract for one bounded execution. |
| [Execution Contract Test Vectors](./validation/execution-contract-cases.json) | Positive and negative registry, authorization, native-permission, and state-transition scenarios. |
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

`Human → iRiel identity/context → PRSL-AI intent and policy → Intelligence Router (candidate selection only) → Capability Registry (eligible metadata) → Permission Manager (authorization gate) → native host permission (when applicable) → approved capability → execution target`

The ReAct-informed task loop is:

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

GitHub Actions validates capability manifests, Permission Manager contracts, and the cross-component execution contract. These are deterministic contract tests against synthetic fixtures. A passing workflow is not proof of a deployed runtime, provider connection, permission grant, or operational capability.

## Scope note

This documentation and its validators establish architecture and testable contract rules. They do not create application code, runtime registrations, Apple entitlements, provider connections, permissions, or deployed integrations.
