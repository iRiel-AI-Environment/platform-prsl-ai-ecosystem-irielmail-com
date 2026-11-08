# Agent PRSL-AI Contract Validation

This directory contains deterministic examples and positive/negative test vectors for capability, Permission Manager, execution, and Dependency Resolver contracts.

## Capability manifests

Run from the repository root:

```bash
python -m pip install -r docs/architecture/agent-prsl-ai/requirements-dev.txt
python docs/architecture/agent-prsl-ai/scripts/validate_capability_manifests.py
```

This validates manifest structure, nested input/output schemas, unique IDs, module/ID consistency, and permission declaration consistency.

## Permission Manager contracts

```bash
python docs/architecture/agent-prsl-ai/scripts/validate_permission_manager.py
```

This validates request/decision JSON Schemas, positive and negative vectors, and grant expiry ordering. It does not test a live authorization service, consent store, native operating-system grant, or runtime enforcement.

## Cross-component execution contract

```bash
python docs/architecture/agent-prsl-ai/scripts/validate_execution_contract.py
```

This validates the execution envelope and deterministic cross-component dispatch gates, including registry eligibility, manifest digest binding, request/decision correlation, subject and scope binding, expiry, single-use replay, permission declarations, execution-mode policy, remote disclosure separation, and native permission fail-closed behavior.

The [execution contract cases](./execution-contract-cases.json) are synthetic test fixtures. The validator uses a verified copy of the Vision example only in memory; the published example remains `specified` and is not registered or promoted.

## Dependency Resolver contract

```bash
python docs/architecture/agent-prsl-ai/scripts/validate_dependency_resolver.py
```

This validates the request/result schemas and deterministic graph fixtures for trusted registry snapshot binding, version selection, transitive capability dependencies, cycle detection, version conflicts, optional omissions, depth limits, permission requirements, and model-provider constraint forwarding. Fixtures are synthetic; the validator does not exercise a production registry or resolver service.

## Validation boundary

GitHub Actions runs the capability, Permission Manager, execution-contract, and Dependency Resolver validators on relevant pull requests and pushes to `main`. Passing these checks establishes contract/schema consistency against the fixtures only. It does not prove that a production registry, Permission Manager, consent store, token verifier, native permission adapter, or capability runtime exists or is secure.
