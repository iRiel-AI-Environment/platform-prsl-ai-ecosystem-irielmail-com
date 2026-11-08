# PRSL-AI Ecosystem — Architecture Documentation

This directory contains the canonical architecture definitions and technical specifications for the PRSL-AI Ecosystem and its associated intelligence components.

## Ecosystem-level architecture

- [Canonical PRSL-AI Ecosystem Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md) — institutional hierarchy, component responsibilities, routing and authorization boundaries, provider model, security principles, and evidence-based implementation status.
- [Implementation Readiness and Architecture Gap Register](./IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md) — known production blockers, mandatory security invariants, threat scenarios, closure evidence, and the next engineering sequence.
- [Architecture documentation link validator](./scripts/validate_architecture_links.py) — repository-local Markdown target validation, executed by GitHub Actions.

## Canonical identity definitions

| Identity | Technical classification | Canonical reference |
|---|---|---|
| **iRiel AI** | PowerFully Intelligence Environment; personal intelligence coordination and orchestration environment | [iRiel technical definition](./IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md) |
| **Agent PRSL-AI** | First-party specialized agent of the PRSL-AI platform; **Powerful by Robert Software Labs** | [Agent PRSL-AI specification](./PRSL-AI-AGENT.md) |
| **PRSL-AI Intelligence Infrastructure** | Shared platform foundation for governed capabilities, contracts, integrations, and execution infrastructure | [Infrastructure architecture](./PRSL-AI-INTELLIGENCE-INFRASTRUCTURE.md) |

- [iRiel AppWeb — PRSL-AI Platform Integration Contract](./IRIEL-APPWEB-INTEGRATION.md) — canonical responsibility boundary, request flow, provider-connection separation, capability-contract alignment, and cross-repository change control.

## Platform and repository governance

- [Platform, Agent, and Repository Governance](./PLATFORM-AGENT-REPOSITORY-GOVERNANCE.md) — canonical decision defining ownership, repository placement, modular boundaries, dependency direction, release governance, and future repository-split criteria.

**Repository decision:** Agent PRSL-AI is a first-party component of PRSL-AI Ecosystem and remains in the platform's canonical repository. It has its own identity, modular implementation boundary, contracts, tests, and lifecycle; a separate repository is not required.

## Agent PRSL-AI technical architecture

- [Agent PRSL-AI architecture overview](./agent-prsl-ai/README.md)
- [Capability contract](./agent-prsl-ai/capability-contract.md)
- [Capability catalog](./agent-prsl-ai/capability-catalog.md)
- [Reasoning and Action Execution Pattern](./agent-prsl-ai/reasoning-action-execution-pattern.md)
- [Executable Execution Contract](./agent-prsl-ai/executable-execution-contract.md)
- [Execution Envelope Schema](./agent-prsl-ai/schemas/execution-envelope.schema.json)
- [Execution Contract Test Vectors](./agent-prsl-ai/validation/execution-contract-cases.json)
- [Capability Registry specification](./agent-prsl-ai/registry-specification.md)
- [Permission Manager specification](./agent-prsl-ai/permission-manager-specification.md)
- [Dependency Resolver Specification v1.0](./agent-prsl-ai/dependency-resolver-specification.md)
- [Dependency Resolution Request Schema](./agent-prsl-ai/schemas/dependency-resolution-request.schema.json)
- [Dependency Resolution Result Schema](./agent-prsl-ai/schemas/dependency-resolution-result.schema.json)
- [Permission Manager schemas and validation](./agent-prsl-ai/validation/README.md)
- [Permission Manager decision-binding implementation](../../src/lib/permission-manager/README.md)
- [Apple integration extension](./agent-prsl-ai/extensions/apple-integration-v5.md)

## Governing separation of responsibilities

- **Robert Software Labs** is the creator and institutional owner.
- **PRSL-AI Ecosystem** defines the shared platform architecture, policy, and reusable capabilities.
- **PRSL-AI Core** provides the foundational platform infrastructure; the complete infrastructure is not yet established as operational.
- **iRiel** coordinates the PowerFully Intelligence Environment and the user's experience through explicit integration boundaries.
- **Agent PRSL-AI** is a first-party platform component that performs specialized assistance within its declared scope.
- **The model** provides inference and remains replaceable.
- **The Intelligence Router** selects eligible execution candidates; it does not authorize protected operations.
- **The Capability Registry** provides validated, dispatch-eligible capability metadata; registration does not grant permissions.
- **The Permission Manager** issues scoped authorization decisions for protected PRSL-AI operations.
- **The operating system / host** independently controls native permissions.

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

## Status discipline

Documentation describes intended architecture and contracts. It does not prove runtime implementation, deployment, provider connectivity, permission grants, or availability. Use implementation evidence and validation results for those claims.
