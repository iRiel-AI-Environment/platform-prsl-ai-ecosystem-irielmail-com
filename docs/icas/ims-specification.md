# iRiel Manifest Specification (IMS)

**Version:** 1.0.0  
**Status:** Draft  
**Media type:** application/json  
**Schema:** [manifest.schema.json](../../schemas/ims/manifest.schema.json)

## 1. Purpose

IMS defines a portable, machine-readable catalog manifest for PRSL-AI. It declares references to intents, capabilities, skills, agents, providers, and policies. Individual definitions remain independently versioned artifacts.

## 2. Root document

A manifest MUST contain:
- `manifestVersion`: IMS format version.
- `catalogId`: stable catalog identifier.
- `name`: human-readable catalog name.
- `owner`: responsible organization.
- `generatedAt`: RFC 3339 timestamp.
- Six definition collections: capabilities, intents, skills, agents, providers, policies.

Collections MAY be empty during initial bootstrapping. Each item MUST have a stable identifier and version. Duplicate identifiers within a collection are invalid.

## 3. Identifier rules

Identifiers are case-sensitive and stable. Capability IDs SHOULD use reverse-domain-like dotted names (for example, `content.translation`). Intent IDs MAY use the canonical `iRiel.Intent.*` namespace. Renaming an identifier is a breaking change; use aliases and a migration period where needed.

## 4. Definition and reference rules

Definitions SHOULD be stored as separate files under `catalog/{collection}/`. The root manifest SHOULD contain concise references rather than duplicating full definitions. References MUST resolve within the same trusted catalog or to an explicitly trusted catalog source. Remote references MUST be pinned to an immutable version or digest before loading.

## 5. Trust and loading

A loader MUST:
1. Parse JSON without executing embedded content.
2. Validate the root against the published JSON Schema.
3. Validate every referenced definition against its own schema.
4. Reject duplicate IDs, unresolved references, unsupported versions, and invalid lifecycle transitions.
5. Verify catalog provenance/signature when the deployment trust profile requires it.
6. Build a read-only discovery graph.
7. Keep registration separate from authorization and runtime availability.

## 6. Security and privacy

Manifests MUST NOT contain secrets, access tokens, private keys, user-specific memory, or personal profile data. Provider configuration may reference secret-manager keys by opaque identifier, but the secret values MUST remain outside the manifest. A manifest MUST NOT grant scopes or permissions merely by declaring them.

## 7. Example

```json
{
  "manifestVersion": "1.0.0",
  "catalogId": "iriel.core",
  "name": "iRiel Core Catalog",
  "owner": "Robert Software Labs",
  "generatedAt": "2026-11-12T00:00:00Z",
  "capabilities": [],
  "intents": [],
  "skills": [],
  "agents": [],
  "providers": [],
  "policies": []
}
```

## 8. Compatibility

The IMS format version is independent of individual catalog definition versions. A loader MUST report the manifest version it supports and MUST fail closed for an unsupported major version.
