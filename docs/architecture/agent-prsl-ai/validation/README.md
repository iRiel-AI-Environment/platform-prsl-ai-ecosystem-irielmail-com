# Capability Manifest Validation

This folder contains representative manifests and automated validation for the AgentPRSL-AI Capability Contract.

Run locally:

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate_capability_manifests.py
```

The validator checks JSON Schema compliance, unique IDs, module/ID consistency, and permission declaration consistency. It validates architecture artifacts; it does not test a live capability runtime.

## Permission Manager contracts

The Permission Manager request/decision schemas and positive/negative test vectors are validated separately:

```bash
python scripts/validate_permission_manager.py
```

This validates schema structure, request and decision examples, expected rejection cases, and grant expiry ordering. It does not validate a live authorization service, consent store, operating-system grant, or runtime enforcement.