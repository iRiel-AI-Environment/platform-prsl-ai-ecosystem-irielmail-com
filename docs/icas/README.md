# PRSL-AI Intelligent Capability Architecture (ICAS)

**Version:** 1.0.0  
**Status:** Draft foundation for review  
**Owner:** Robert Software Labs  
**Canonical repository:** PRSL-AI Ecosystem Platform

ICAS defines the shared vocabulary and contracts for intent resolution, capability discovery, skills, agents, policies, providers, and governed execution.

## Authority and repository boundaries

This repository is authoritative for ecosystem-wide contracts, schemas, registries, policy semantics, and platform runtime interfaces. iRiel AppWeb consumes versioned contracts and does not become a second authority for platform policy or authorization.

The platform's existing Capability Manifest, Registry, Permission Manager, Execution Contract, and Intelligence Router documents remain important source material. ICAS is an organizing architecture and compatibility layer; it does not silently replace existing contracts or declare prototypes production-ready.

## Canonical resolution model

```text
Human Intent
  -> Intent Resolution
  -> Capability Discovery
  -> Skill Resolution
  -> Policy Evaluation
  -> Eligible Agent / Runtime Selection
  -> Provider or Local Adapter Selection
  -> Bounded Execution
  -> Evidence and Governance Record
```

The Router selects eligible candidates. It does not grant permissions. The Permission Manager remains authoritative for protected operations. Policy evaluation must occur before execution and be enforced at the trusted execution boundary.

## Documents

- [ICAS Architecture and Normative Model](./specification.md)
- [IMS Manifest Specification](./ims-specification.md)
- [Initial catalog manifest](../../catalog/manifest.json)
- [IMS manifest JSON Schema](../../schemas/ims/manifest.schema.json)

## Normative language

The terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are normative requirements.

## Implementation status

This change establishes documentation and a schema-governed manifest foundation only. It does not implement registries, OAuth servers, mTLS, token issuance, a Router runtime, MCP transports, or agent execution. Those require separately reviewed code, threat models, tests, and deployment evidence.
