# Apple Integration — Canonical Extension v5

**Canonical identifier:** `prsl.integration.apple`  
**Agent association:** `@prsl-ai.agent.prsl.ai<Apple_Integration>`  
**Class:** Canonical Extension  
**Status:** Canonical  
**Owning Domain:** 07 — Integrations

**Supporting Domains:**

- 02 — Identity & Trust
- 03 — Experience & Workspace
- 05 — Intelligence & Routing
- 06 — Capabilities
- 08 — Privacy, Security & Accessibility
- 09 — Storage & Persistence
- 11 — Devices & Network
- 12 — Developer Platform

## 1. Purpose

This Extension establishes the controlled integration boundary between Agent PRSL-AI, iRiel AI, and Apple technologies.

Apple frameworks may expose or execute eligible iRiel capabilities, but must not assume ownership of iRiel identity, canonical memory, domain ownership, or architectural authority.

## 2. Integration surface

Where available and authorized, the Apple integration may include:

- Siri and system invocation surfaces;
- App Intents and App Shortcuts;
- Shortcuts automations and actions;
- Spotlight and indexed entities;
- AppEntity, EntityQuery, and App Schemas;
- Foundation Models and Apple system intelligence;
- Writing Tools;
- notifications and system presentation surfaces;
- accessibility frameworks;
- device-local capabilities and continuity mechanisms.

The list defines an integration surface, not a statement that every item is available on every device or has already been integrated.

## 3. Architectural boundary

The canonical relationship is:

`Human → iRiel capability → PRSL-AI policy/routing → Apple integration adapter/framework → Apple system surface`

Apple frameworks implement or expose eligible behaviors. They must not redefine:

- first-party iRiel identity;
- canonical iRiel memory;
- domain ownership;
- capability semantics;
- PRSL-AI architectural authority.

## 4. App Intents and Siri

App Intents should expose narrow, semantically stable iRiel capabilities instead of provider-specific operations.

Siri may invoke or surface these intents without becoming the iRiel runtime.

Each intent must declare the minimum data and authority required for its operation. Invocation through Siri does not imply unrestricted access to iRiel context or memory.

## 5. Foundation Models and Apple Intelligence

Apple intelligence resources may be selected as intelligence targets when available, compatible, and compliant with PRSL-AI policy.

Availability may vary according to:

- device compatibility;
- operating system and framework version;
- region and language;
- entitlements and permissions;
- Apple platform policies.

If Apple Intelligence is unavailable, the system must degrade gracefully. The identity and semantics of an iRiel capability must survive the absence of Apple Intelligence.

## 6. Spotlight and entities

Indexed entities and Spotlight surfaces may expose discoverable, privacy-appropriate iRiel content or actions.

Indexing must not disclose private context by default and must respect Domain 08 minimum-disclosure policies.

## 7. Shortcuts

Shortcuts may act as local orchestration and system-integration surfaces.

Persistent Shortcut storage remains subject to Domain 09 storage semantics. Shortcut actions do not automatically create canonical iRiel memory.

## 8. Privacy and secrets

Apple integration must expose only the minimum necessary projection of information for each operation.

API keys, provider secrets, and private signing material must not be embedded in:

- App Intents;
- Shortcuts payloads;
- Spotlight metadata;
- user-visible configuration.

## 9. Provider independence

Apple is an integration environment and a potential intelligence resource, not the permanent intelligence provider of iRiel.

OpenAI, Gemini, Claude, local models, and future providers may coexist or replace intelligence routes independently of Apple system integration.

## 10. Availability model

Every Apple-specific capability must expose an explicit availability state:

- `available`
- `unavailable_by_device`
- `unavailable_by_os_or_framework`
- `unavailable_by_region_language_or_policy`
- `permission_required`
- `dependency_missing`
- `degraded_with_fallback`
- `disabled_by_policy`

Runtime availability must be evaluated explicitly. The presence of a user interface element, App Intent declaration, or Spotlight entry alone is insufficient evidence that a capability is operational.

## 11. Developer references

Subordinate documentation may include references for:

- App Intents;
- App Schemas;
- AppEntity;
- EntityQuery;
- IndexedEntity;
- Siri;
- Spotlight;
- contextual UI;
- Apple Intelligence research and implementation notes.

These documents may evolve without redefining this Canonical Extension.

## 12. Canonical invariants

1. Apple integration is optional and replaceable at the architectural level.
2. Siri does not possess the iRiel identity.
3. Apple Intelligence does not own the semantics of iRiel capabilities.
4. App Intents represent scoped capability surfaces.
5. System availability is explicitly evaluated and may vary by device, region, and language.
6. Minimum-disclosure guidelines govern all system-bound information.
7. Failure of Apple integration does not imply failure of iRiel.
8. Human authority remains the ultimate authority.

## 13. Canonical statement

PRSL-AI Apple Integration enables iRiel to participate naturally in Apple system surfaces while preserving first-party identity, provider independence, privacy boundaries, and graceful operation when Apple-specific intelligence is unavailable.

## 14. Implementation boundary

This document establishes the canonical architecture and integration constraints. It does not claim that App Intents, Siri invocation, Foundation Models, Spotlight indexing, Shortcuts, entitlements, or any Apple adapter have been implemented or verified.
