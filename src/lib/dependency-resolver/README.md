# Dependency Resolver Runtime Core

This module implements deterministic dependency graph planning against an injected trusted registry adapter.

## Runtime boundary

- The caller supplies a request, never a trusted catalog.
- The registry adapter resolves the root record and candidate records from the exact immutable snapshot reference.
- Every selected record must match the snapshot and pass registration, validation, review, digest-verification, and verified-lifecycle checks.
- Stable semantic-version selectors are evaluated deterministically; conflicting versions, ambiguous highest versions, cycles, and graph-limit violations fail closed.
- Capability dependencies are traversed recursively.
- Permission dependencies are returned only as authorization requirements.
- Model requirements and provider constraints are returned without choosing a provider.
- A blocked result always has an empty dependency order.

The resolver does not install, download, start, execute, authorize, or grant anything. It is not an execution boundary.

## Adapter contract

Implement `TrustedDependencyRegistry` on the trusted server side. Its methods must read only from a server-selected immutable registry snapshot and must verify record integrity before returning records. Do not implement this interface in browser code or accept a client-provided registry catalog.

The current module has no production registry adapter, persistent store, authenticated HTTP transport, or deployment. Until those exist and are independently verified, its use is limited to controlled internal planning and tests. It must not be exposed as an authorization or dispatch authority.

## Validation

Run:

```bash
bun run test
bunx tsc --noEmit
python docs/architecture/agent-prsl-ai/scripts/validate_dependency_resolver.py
```
