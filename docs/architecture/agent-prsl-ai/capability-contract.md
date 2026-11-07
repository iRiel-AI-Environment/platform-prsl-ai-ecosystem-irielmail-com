# AgentPRSL-AI — Canonical Capability Contract v1.0

**Classification:** Proposed shared architecture standard  
**Owner:** Robert Software Labs  
**Ecosystem:** PRSL-AI Ecosystem  
**Applies to:** Agent capability modules, tool-backed operations, and capability-facing integration adapters

**Machine-readable manifest:** [capability-manifest.schema.json](./schemas/capability-manifest.schema.json)  
**Registry governance:** [Capability Registry Specification](./registry-specification.md)  
**Validation:** [Validation instructions](./validation/README.md)

## 1. Purpose

The Capability Contract defines the minimum information required to register, discover, authorize, route, execute, and observe a capability.

A capability declares what it can do and the conditions under which it may do it. It does not decide its own authority, bypass policy, or select an unrestricted provider. PRSL-AI policy and routing remain responsible for those decisions.

## 2. Terminology and boundaries

- **Agent:** The specialized identity `@AgentPRSL-AI`.
- **Module:** A domain grouping of related capabilities, such as Vision or Voice.
- **Capability:** A specific operation exposed under a stable identifier.
- **Tool:** An executable resource that a capability may use, subject to policy.
- **Integration extension:** A controlled adapter boundary to an external platform or system, such as Apple Integration.
- **Provider:** A model or service that may perform part of an operation. A provider is not the capability identity.
- **Runtime:** The environment that validates and executes the operation.

A module identifier is not a substitute for an operation-level Capability ID.

## 3. Contract dimensions

Every registered capability must declare these seven dimensions:

1. `Capability ID`
2. `Input Schema`
3. `Output Schema`
4. `Permissions`
5. `Dependencies`
6. `Availability`
7. `Execution Policy`

A registry record should additionally include `name`, `description`, `module_id`, `contract_version`, `lifecycle_status`, and `owner`.

## 4. Capability ID

### 4.1 Identifier format

Use a stable, lowercase, dot-separated identifier:

```text
prsl.agent.<module>.<operation>
prsl.integration.<integration>.<operation>
```

Examples:

- `prsl.agent.vision.analyze-image`
- `prsl.agent.voice.transcribe-audio`
- `prsl.agent.location.resolve-location`
- `prsl.agent.reader.extract-document-content`
- `prsl.integration.apple.app-intents.invoke`

### 4.2 Rules

- IDs must be globally unique within the PRSL-AI capability namespace.
- IDs must be stable across provider changes and implementation refactors.
- IDs identify semantics, not a model, vendor, endpoint, or UI label.
- Breaking semantic changes require a new capability version or identifier according to registry compatibility rules.
- Display names and localized labels may change without changing the ID.

## 5. Input Schema

Every invocation uses a common envelope. The `input` object is validated against the operation-specific schema.

### 5.1 Common input envelope

```json
{
  "contract_version": "1.0",
  "capability_id": "prsl.agent.vision.analyze-image",
  "request_id": "uuid",
  "intent": "understand_image",
  "context": {
    "session_id": null,
    "language": "en-US",
    "locale": "en-GB",
    "timezone": null
  },
  "input": {
    "media_ref": "authorized-reference",
    "analysis_mode": "describe"
  },
  "constraints": {
    "execution_preference": "on_device",
    "allow_remote_processing": false,
    "retention": "ephemeral"
  }
}
```

### 5.2 Field requirements

| Field | Requirement | Meaning |
|---|---|---|
| `contract_version` | Required | Contract version used by the caller. |
| `capability_id` | Required | Exact operation being invoked. |
| `request_id` | Required | Unique correlation identifier. |
| `intent` | Required | Requested operation semantics. |
| `context` | Optional, minimized | Only context required for this operation. |
| `input` | Required | Operation-specific payload. |
| `constraints` | Optional, policy-bound | Caller preferences and constraints; cannot weaken mandatory policy. |

### 5.3 Input rules

- Validate types, required fields, allowed values, size limits, and referenced resources before execution.
- Treat all user-supplied and external content as untrusted data.
- Use references to large or sensitive content where possible rather than duplicating it in the envelope.
- Do not attach the complete iRiel profile, history, or memory by default.
- Caller constraints may be stricter than policy, but may never override or weaken policy.
- Reject unknown fields when strict validation is required by the operation.

## 6. Output Schema

All operations return a normalized envelope.

```json
{
  "contract_version": "1.0",
  "capability_id": "prsl.agent.vision.analyze-image",
  "request_id": "uuid",
  "status": "success",
  "result": {
    "description": "Example result"
  },
  "metadata": {
    "execution_mode": "on_device",
    "provider_id": "local",
    "duration_ms": 125
  },
  "limitations": [],
  "error": null
}
```

### 6.1 Status values

- `success`: operation completed.
- `partial`: a usable but incomplete result was produced.
- `unavailable`: operation could not run because the capability is unavailable.
- `permission_required`: additional authorization is needed.
- `denied`: policy refused the operation.
- `failed`: technical execution failure.
- `cancelled`: operation was cancelled.

### 6.2 Output rules

- `result` follows the operation-specific output schema.
- `metadata` may include execution mode, provider identifier, timing, and non-sensitive diagnostics.
- Provider metadata must not expose credentials, private endpoints, signing material, or hidden chain-of-thought.
- `limitations` communicates uncertainty, omissions, degraded operation, or unsupported input.
- `error` is null on success; otherwise it contains a stable error code, safe message, and optional retryability indicator.
- Outputs must not silently create persistent memory.

## 7. Permissions

Permissions are scoped declarations of authority required by an operation. They are internal PRSL-AI permission identifiers; they are not claims that an operating system exposes identically named native permissions.

### 7.1 Initial permission vocabulary

| Permission | Intended scope |
|---|---|
| `media.read` | Read media explicitly supplied or otherwise authorized. |
| `camera.use` | Access the device camera. |
| `microphone.use` | Capture audio through an authorized microphone. |
| `location.coarse` | Access approximate location. |
| `location.precise` | Access precise location. |
| `files.read` | Read authorized files. |
| `files.write` | Create or modify authorized files. |
| `notifications.schedule` | Schedule notifications or reminders. |
| `network.access` | Access network resources. |
| `data.remote_disclose` | Disclose protected data to a remote provider or service for a specific authorized operation. |
| `data.retain` | Retain data beyond the transient operation under an explicit scope. |
| `tools.execute` | Execute an approved tool. |
| `system.invoke` | Invoke an approved operating-system surface. |
| `accessibility.read` | Read content through authorized accessibility interfaces. |
| `speech.output` | Produce spoken output. |

### 7.2 Authorization rules

- Declare permissions at operation level, not only at module level.
- Request only the minimum permissions required.
- Permission grants must be explicit, scoped, revocable, and evaluated at runtime.
- A capability cannot grant, elevate, or persist its own permissions.
- Permission to access a resource does not imply permission to retain, transmit, or repurpose its contents.
- Remote disclosure and non-ephemeral retention require separate permission declarations and policy/consent evaluation. Remote disclosure must bind the exact recipient; retention must bind its storage scope and maximum duration.
- Platform permissions and PRSL-AI authorization are separate checks; both must pass where applicable.

## 8. Dependencies

Dependencies describe technical prerequisites. They do not confer authority.

### 8.1 Dependency categories

- `runtime`: required execution runtime or version.
- `framework`: framework or SDK.
- `model`: optional or required model dependency.
- `device`: hardware or device feature.
- `service`: internal or external service.
- `capability`: another registered capability.
- `permission`: required authorization.

### 8.2 Dependency declaration

```json
{
  "dependencies": {
    "runtime": [
      {
        "id": "prsl-agent-runtime",
        "version": ">=1.0.0"
      }
    ],
    "framework": [],
    "model": {
      "required": false,
      "provider_constraints": []
    },
    "device": [],
    "service": [],
    "capability": [],
    "permission": [
      {
        "id": "media.read",
        "required": true
      }
    ]
  }
}
```

### 8.3 Dependency rules

- Mark each dependency as required or optional.
- Declare supported version ranges where version compatibility matters.
- Do not hard-code a single model vendor unless the capability semantics genuinely require it.
- Resolve dependencies before execution.
- Missing optional dependencies may activate a policy-approved fallback.
- Missing required dependencies must prevent execution and produce an explicit availability reason.

## 9. Availability

Availability is a runtime evaluation, not a static UI property.

### 9.1 Canonical states

- `available`
- `unavailable`
- `unavailable_by_device`
- `unavailable_by_os_or_framework`
- `unavailable_by_region_language_or_policy`
- `permission_required`
- `dependency_missing`
- `degraded_with_fallback`
- `disabled_by_policy`

### 9.2 Availability record

```json
{
  "status": "degraded_with_fallback",
  "reason_code": "preferred_provider_unavailable",
  "evaluated_at": "2026-01-01T00:00:00Z",
  "fallback": {
    "enabled": true,
    "target": "approved_local_route"
  }
}
```

The timestamp above is illustrative, not a runtime observation.

### 9.3 Evaluation inputs

Evaluate device compatibility, OS/framework version, region and language restrictions, permissions, dependency health, network requirements, provider eligibility, and current policy.

The presence of a button, App Intent declaration, or indexed entity is not proof that the underlying operation is available.

## 10. Execution Policy

Execution Policy governs whether and how an operation may run. It is evaluated by PRSL-AI policy and routing components; the capability cannot override it.

### 10.1 Policy fields

| Field | Meaning |
|---|---|
| `execution_modes` | Permitted modes: on-device, remote, or hybrid. |
| `routing_policy` | Policy-controlled route selection. |
| `privacy_policy` | Data minimization and processing restrictions. |
| `consent_policy` | Conditions requiring user consent. |
| `authority_level` | Required authority for the operation. |
| `data_retention` | Permitted retention behavior. |
| `fallback_policy` | Behavior when a route or dependency fails. |
| `confirmation_required` | Whether confirmation is required before execution. |
| `timeout_ms` | Maximum execution duration. |
| `idempotency` | Whether retries can safely repeat the operation. |

### 10.2 Example policy

```json
{
  "execution_policy": {
    "execution_modes": ["on_device"],
    "routing_policy": "prsl_intelligence_router",
    "privacy_policy": "minimum_disclosure",
    "consent_policy": "explicit_when_required",
    "authority_level": "user_authorized",
    "data_retention": "ephemeral_by_default",
    "fallback_policy": "graceful_degradation",
    "confirmation_required": false,
    "timeout_ms": 30000,
    "idempotency": "operation_defined"
  }
}
```

### 10.3 Execution rules

1. Evaluate policy before dispatch.
2. Prefer on-device execution when it is compatible and policy-compliant.
3. Remote processing is denied unless explicitly allowed by policy and applicable user authorization.
4. A caller cannot weaken policy through input constraints.
5. Consequential, external, destructive, or persistent actions require operation-specific confirmation rules.
6. Apply data minimization before crossing a device, provider, or service boundary.
7. Use explicit fallback behavior; never silently change to a less private route.
8. Keep transient context separate from persistent memory.
9. Record operational audit metadata without logging secrets or unnecessary personal content.
10. Respect cancellation, timeout, and revocation during execution where technically possible.

## 11. Standard capability manifest

The machine-readable manifest contract is defined in [capability-manifest.schema.json](./schemas/capability-manifest.schema.json). The schema validates the manifest structure and embeds operation-specific JSON Schemas for `input_schema` and `output_schema`.

See the [validated Vision example](./examples/vision-analyze-image.manifest.json) for a complete representative manifest. It is marked `specified`, not `implemented`.

## 12. Error model

Errors should use stable machine-readable codes, safe user-facing messages, and explicit retryability.

Suggested codes:

- `INVALID_INPUT`
- `UNSUPPORTED_INPUT`
- `PERMISSION_DENIED`
- `CONSENT_REQUIRED`
- `DEPENDENCY_MISSING`
- `CAPABILITY_UNAVAILABLE`
- `POLICY_DENIED`
- `PROVIDER_UNAVAILABLE`
- `EXECUTION_TIMEOUT`
- `EXECUTION_FAILED`
- `CANCELLED`

Do not include credentials, secrets, private content, or internal reasoning in error messages.

## 13. Versioning and compatibility

- The contract version governs envelope and manifest semantics.
- Capability-specific input/output schemas may evolve independently when backward compatible.
- Breaking changes require a new major contract or capability version.
- Deprecation must include a replacement path and a documented sunset policy.
- Provider replacement alone does not require a new Capability ID.

## 14. Canonical invariants

1. Capability identity is provider-independent.
2. Every operation has explicit input and output schemas.
3. No capability self-authorizes.
4. Dependencies do not imply permissions.
5. Availability is evaluated at runtime.
6. Policy is evaluated before execution.
7. Transient context is not automatically persistent memory.
8. Remote processing requires explicit policy authorization.
9. Optional integration failure does not invalidate first-party capability identity.
10. Human authority remains ultimate.

## 15. Implementation boundary

This specification defines the intended contract. It does not assert that a registry, validator, permission manager, dependency resolver, availability resolver, policy engine, or execution runtime has already been implemented. Each component requires its own implementation and acceptance tests.
