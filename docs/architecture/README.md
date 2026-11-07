# PRSL-AI Ecosystem — Architecture Documentation

This directory contains the canonical architecture definitions and technical specifications for the PRSL-AI Ecosystem and its associated intelligence components.

## Canonical identity definitions

| Identity | Technical classification | Canonical reference |
|---|---|---|
| **iRiel AI** | Powerfully Intelligence Environment; personal intelligence coordination and orchestration environment | [iRiel technical definition](./IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md) |
| **Agent PRSL-AI** | First-party specialized agent of the PRSL-AI platform; **Powerful by Robert Software Labs** | [Agent PRSL-AI specification](./PRSL-AI-AGENT.md) |
| **PRSL-AI Intelligence Infrastructure** | Shared platform foundation for governed capabilities, contracts, integrations, and execution infrastructure | [Infrastructure architecture](./PRSL-AI-INTELLIGENCE-INFRASTRUCTURE.md) |

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
- [Permission Manager schemas and validation](./agent-prsl-ai/validation/README.md)
- [Apple integration extension](./agent-prsl-ai/extensions/apple-integration-v5.md)

## Governing separation of responsibilities

- **Robert Software Labs** is the creator and institutional owner.
- **PRSL-AI Ecosystem** defines the shared platform architecture, policy, and reusable capabilities.
- **iRiel** coordinates the Powerfully Intelligence Environment and the user's experience through explicit integration boundaries.
- **Agent PRSL-AI** is a first-party platform component that performs specialized assistance within its declared scope.
- **The model** provides inference and remains replaceable.
- **The Intelligence Router** selects eligible execution candidates; it does not authorize protected operations.
- **The Capability Registry** provides validated, dispatch-eligible capability metadata; registration does not grant permissions.
- **The Permission Manager** issues scoped authorization decisions for protected PRSL-AI operations.
- **The operating system / host** independently controls native permissions.

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

## Status discipline

Documentation describes intended architecture and contracts. It does not prove runtime implementation, deployment, provider connectivity, permission grants, or availability. Use implementation evidence and validation results for those claims.
