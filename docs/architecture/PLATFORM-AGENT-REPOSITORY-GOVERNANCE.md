# PRSL-AI Ecosystem — Platform, Agent, and Repository Governance

**Owner:** Robert Software Labs  
**Platform:** PRSL-AI Ecosystem  
**Platform identity:** `@prsl-ai.prsl.ai.ecosystem`  
**Agent identity:** `@prsl-ai.agent.prsl.ai`  
**Institutional signature:** Powerful by Robert Software Labs  
**Status:** Canonical architecture decision  
**Canonical language:** English (US)

## 1. Decision

**Agent PRSL-AI is a first-party component of the PRSL-AI Ecosystem. It does not require an independent Git repository.**

The canonical implementation and architecture repository for the platform and its first-party Agent is:

`iRiel-AI-Environment/platform-prsl-ai-ecosystem-irielmail-com`

The Agent must have a distinct identity, bounded responsibilities, modular source organization, explicit contracts, independent tests, and a separately governed capability lifecycle. Those properties do not require a separate repository.

A repository boundary is a source-control and delivery decision. It is not, by itself, a product, identity, trust, security, deployment, or runtime boundary.

## 2. Institutional and technical hierarchy

| Layer | Identity | Responsibility |
|---|---|---|
| Creator and institutional owner | Robert Software Labs | Owns the institutional direction, product identities, and governing principles. |
| Platform | PRSL-AI Ecosystem — `@prsl-ai.prsl.ai.ecosystem` | Owns shared architecture, policy, contracts, infrastructure, and platform services. |
| First-party specialized agent | Agent PRSL-AI — `@prsl-ai.agent.prsl.ai` | Provides specialized platform intelligence and performs only authorized platform tasks. |
| Personal intelligence environment | iRiel AI — `@iriel.prsl.ai.ecosystem` | Coordinates the person's Powerfully Intelligence Environment and may consume approved platform capabilities through explicit integration. |
| Inference providers | Replaceable provider adapters | Supply inference; they do not own the Agent's identity, policies, or permissions. |

Agent PRSL-AI is part of the platform, not the platform itself. iRiel is a distinct environment, not a child agent of Agent PRSL-AI. Neither identity replaces the other.

## 3. Responsibility boundaries

### 3.1 PRSL-AI Ecosystem owns

- Shared platform architecture and technical standards.
- Policy definitions and enforcement contracts.
- Intelligence Router and provider adapter contracts.
- Capability framework, registry contracts, and shared schemas.
- Permission Manager authorization contracts and policy integration.
- Shared security, privacy, accessibility, localization, and observability requirements.
- Platform-wide CI, validation, release governance, and integration contracts.

### 3.2 Agent PRSL-AI owns within the platform

- Its specialized identity, instructions, and platform knowledge domain.
- Agent-specific orchestration and task-solving behavior.
- Its capability modules and capability manifests.
- Agent-specific tool adapters and integration extensions.
- Execution planning, observation, verification, and safe failure behavior.
- Agent-specific evaluations, fixtures, and tests.
- Documentation of its supported scope and implementation status.

The Agent may consume shared platform services, but it must not redefine or privately fork shared authorization, identity, policy, or provider contracts.

### 3.3 Shared authority rules

- The human remains the source of intent and consent.
- PRSL-AI policy defines applicable constraints.
- The Intelligence Router selects eligible execution candidates; it does not grant permissions.
- The Capability Registry establishes trusted capability metadata and lifecycle eligibility; registration does not grant permissions.
- The Permission Manager is the only PRSL-AI component that issues authorization decisions for protected operations.
- The host operating system independently controls native permissions.
- Agent PRSL-AI, its capabilities, and its inference model cannot authorize themselves or elevate their privileges.

## 4. Canonical repository strategy

### 4.1 One platform repository, modular internal ownership

Keep platform and first-party Agent architecture and implementation in the canonical PRSL-AI platform repository. Organize Agent material under dedicated paths, preserving the existing repository structure.

Current architecture documentation:

- `docs/architecture/PRSL-AI-AGENT.md` — institutional and architectural definition.
- `docs/architecture/agent-prsl-ai/README.md` — Agent architecture index.
- `docs/architecture/agent-prsl-ai/` — capability contracts, registry, execution, schemas, examples, extensions, and validation.
- `docs/architecture/README.md` — platform architecture index.

Agent implementation files should remain in a clearly owned module/package in the platform source tree. Existing implementation references such as `src/lib/agent.ts` must be treated according to the actual code and verified runtime status; documentation must not imply that a complete agent runtime exists merely because a source file or specification exists.

### 4.2 Recommended logical layout

This is a target organization guide, not an instruction to move files blindly. Preserve existing paths unless a reviewed refactor demonstrates a concrete benefit.

```text
platform-prsl-ai-ecosystem-irielmail-com/
├── src/
│   ├── platform/                 # platform composition and shared services
│   ├── agents/
│   │   └── agent-prsl-ai/        # Agent-specific implementation
│   │       ├── core/
│   │       ├── orchestration/
│   │       ├── knowledge/
│   │       ├── capabilities/
│   │       ├── adapters/
│   │       └── evaluation/
│   └── shared/                   # reusable, platform-owned primitives
├── docs/
│   └── architecture/
│       ├── PRSL-AI-AGENT.md
│       └── agent-prsl-ai/
│           ├── schemas/
│           ├── examples/
│           ├── extensions/
│           └── validation/
├── tests/
│   ├── platform/
│   └── agents/
│       └── agent-prsl-ai/
└── .github/
    └── workflows/
```

The layout is illustrative. Do not create empty directories or relocate existing application files solely to match this diagram. Adopt paths incrementally when implementation work justifies them.

### 4.3 What belongs in another repository

A distinct repository may be appropriate for a separate product or application, such as an independently delivered iRiel client or AppWeb. Such a repository consumes platform contracts through documented interfaces; it does not become the owner of PRSL-AI shared policy or the Agent's canonical identity.

Do not treat multiple iRiel application repositories, prototypes, deployment mirrors, or Lovable-connected projects as alternative canonical locations for the Agent without an explicit repository ownership decision.

## 5. Dependency direction and integration

The intended dependency direction is:

```text
Robert Software Labs
        │ institutional ownership
        ▼
PRSL-AI Ecosystem
        │ shared contracts, policy, services
        ▼
Agent PRSL-AI
        │ approved capabilities and integrations
        ├──────────────► platform services
        └──────────────► authorized external systems

iRiel AI ── explicit, governed integration ──► approved PRSL-AI capabilities
```

Rules:

1. Agent PRSL-AI depends on platform-owned contracts and services.
2. Shared platform services must not depend on Agent-specific implementation details.
3. iRiel integration is explicit and contract-based; it does not make iRiel a prerequisite for ordinary platform operation.
4. The Agent must not depend on one inference provider. Provider changes must not alter its identity, scope, or authorization model.
5. Cross-repository consumers must use versioned, documented interfaces rather than importing private implementation details.
6. No integration may bypass the Permission Manager or applicable host permissions.

## 6. Versioning, testing, and release independence

The Agent may have its own internal module version, capability versions, compatibility declarations, and release notes while remaining in the platform repository.

Minimum governance:

- Validate Agent contracts and schemas in CI.
- Test Agent-specific behavior separately from platform-wide behavior.
- Test shared contracts at integration boundaries.
- Require code ownership/review appropriate to the affected component.
- Record breaking changes and compatibility requirements.
- Keep synthetic test fixtures clearly distinguished from production records and grants.
- Do not describe a capability as implemented, available, or verified without evidence for that status.

Separate release cadence does not require separate Git history. Use independent packages or deployment units only when an actual build/runtime boundary requires them.

## 7. Criteria for a future repository split

Reconsider a separate Agent repository only when one or more concrete requirements justify the additional operational cost, such as:

- Independent deployment or distribution is required.
- The Agent needs a release cadence that cannot be managed safely within the platform repository.
- A separate team requires isolated repository permissions and ownership.
- The Agent becomes a separately consumable product or service with a stable public contract.
- Build, compliance, or security boundaries require isolated source control.
- Its dependency and versioning model can be separated without duplicating or forking platform-owned contracts.

A split requires an approved migration plan covering repository ownership, history, package boundaries, dependency direction, contract versioning, CI, security controls, release process, and deprecation of old paths. Until that decision is documented and approved, this repository remains canonical.

## 8. Non-goals and prohibited interpretations

This decision does not:

- Claim that every Agent capability or runtime is implemented.
- Claim that a production Permission Manager or execution service is deployed.
- Authorize the Agent to act outside declared permissions.
- Make the Agent a separate platform, product owner, or model provider.
- Require all iRiel application code to live in this repository.
- Require an immediate source-tree refactor.
- Authorize deleting, renaming, archiving, or merging any existing repository.

## 9. Canonical statement

**Robert Software Labs creates and governs the PRSL-AI Ecosystem. PRSL-AI Ecosystem owns the shared platform architecture and services. Agent PRSL-AI is its first-party specialized agent, independently modular but maintained within the platform's canonical repository. iRiel AI remains a distinct Powerfully Intelligence Environment that integrates through explicit contracts.**

> One platform repository. Modular components. Distinct identities. Shared contracts. Explicit permissions. No duplicated authority.

**Agent PRSL-AI — Powerful by Robert Software Labs.**


## 10. Documentation language standard

All human-readable platform documentation, architecture specifications, repository guidance, and user-facing technical explanations must use **English (United States)** as the canonical editorial language.

- Use US spelling, punctuation, date conventions, and technical writing style consistently.
- Keep product names, canonical identities, API names, schema fields, code symbols, protocol values, and established compatibility identifiers unchanged.
- Retain source-language identifiers only when required for compatibility or traceability; explain them in English and do not use them as translated prose.
- Do not add parallel-language definitions or translated paragraphs to canonical EN-US documents. Maintain translations as separately governed localization assets when explicitly required.
- Preserve exact machine-readable enum values even when their historical spelling differs from US English; changing such values requires a versioned compatibility decision, not an editorial correction.

This standard applies to new documentation and revisions of existing documentation in this repository.
