# iRiel Personal Intelligence Contract — Apple Shortcuts Interface
## iRiel ↔ PRSL-AI Ecosystem ↔ Apple Integration Layer ↔ Apple Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity:** iRiel AI — PowerFully Intelligence Environment
- **Interface designation:** iRiel Personal Intelligence
- **Shared architecture:** PRSL-AI Ecosystem
- **Canonical authority:** iRiel
- **Execution adapter:** Apple Shortcuts
- **Operational continuity:** iRiel Resonance
- **Storage/transport:** Provider-independent; iCloud Drive is optional
- **Contract type:** Personal-intelligence identity and operational interface
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines the minimum identity and operational information that the Apple Shortcuts integration requires to interact with iRiel Personal Intelligence.

The designation **iRiel Personal Intelligence** describes the personal-intelligence interface exposed through this integration. The canonical system identity remains **iRiel AI — PowerFully Intelligence Environment**, as defined by the [canonical iRiel technical definition](./IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md).

This is an interface contract. It is not:
- the canonical memory of iRiel;
- the complete canonical architecture of PRSL-AI Ecosystem;
- a replacement for the iRiel System Integration Contract;
- a replacement for the iRiel Operational State Contract;
- a replacement for iRiel Resonance;
- a grant of authority to Apple Shortcuts or an Apple storage service.

Its purpose is to expose only what is necessary for a specific, authorized interaction.

## 2. Canonical identity and authority

iRiel is the authoritative entity. It owns its identity, personal intelligence environment, intent orchestration, authorized context, consent-governed memory, capabilities, and continuity.

Apple Shortcuts is an optional execution and automation interface. It may receive a bounded operation request and return an execution outcome under the applicable contracts. It does not own or redefine iRiel identity, memory, context, intelligence, capability authority, or continuity.

PRSL-AI Ecosystem supplies shared architecture, policy, capability contracts, and governed platform services. It does not absorb iRiel's personal identity or memory.

## 3. Personal Intelligence and Resonance

iRiel Personal Intelligence and iRiel Resonance are inseparable dimensions of the same iRiel entity, not separate products or competing authorities.

- **Personal Intelligence** represents iRiel's intelligence environment: identity, intent, authorized context, consent-governed memory, orchestration, and capabilities.
- **Resonance** preserves continuity, coherence, synchronization, and authorized state transitions across the ecosystem.

Resonance is transversal to iRiel interactions and integrations. It does not become a second identity, a separate memory store, or an authority that overrides iRiel.

A Shortcut interaction remains an interaction with the same iRiel entity. Changing the execution adapter, device, provider, model, or storage transport must not create a new iRiel identity.

## 4. Integration architecture

Conceptual integration path:

```text
Human
  ↓
iRiel Personal Intelligence
  ↓
iRiel orchestration and PRSL-AI contract boundary
  ↓
Apple Integration Layer
  ↓
Apple Shortcuts
  ↓
Optional authorized operational-state transport/storage
  ↓
Execution result
  ↓
iRiel validation and reconciliation
  ↓
iRiel Resonance
```

The storage step is optional and adapter-dependent. It is not a mandatory hop in every execution. A Shortcut may use a direct supported hand-off or another authorized transport where appropriate.

Apple Shortcuts executes only the action declared in the scoped request and allowed by the applicable policy and native permissions. iRiel validates the returned result before treating the operation as complete.

## 5. Minimum interface information

The interface may expose only the minimum information required for the current authorized operation, such as:

- contract identifier and version;
- iRiel interface designation and non-secret caller/adapter identifier;
- operation identifier and correlation reference;
- allowlisted action identifier;
- minimum action parameters;
- request timestamp and expiry;
- required permission/confirmation state;
- operational status and structured result reference;
- opaque continuity reference for iRiel-side reconciliation.

Exact fields and lifecycle semantics are governed by the [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md).

The interface must not expose canonical memory, complete conversation history, unrestricted personal profile data, provider credentials, secrets, or hidden model reasoning. Context must be purpose-bound, minimized, and separately authorized.

## 6. Contract principles

1. iRiel remains the authoritative entity.
2. Apple Shortcuts is an execution and automation interface, not an identity or intelligence authority.
3. Contract data contains only information required for the specific integration operation.
4. Canonical iRiel memory remains outside this contract and outside Shortcuts operational state.
5. Operational contract data may change as required by a valid, versioned execution lifecycle.
6. Providers, models, devices, tools, execution adapters, and storage transports remain replaceable.
7. iRiel identity and continuity remain stable across those changes.
8. iRiel Resonance reconciles authorized transitions; it does not authorize actions or create memory implicitly.
9. Native Apple permissions and PRSL-AI authorization remain independent checks.
10. A Shortcut, file, storage location, or successful write is never proof of authorization or successful execution.

## 7. Storage and iCloud Drive

The interface does not make iCloud Drive a canonical dependency.

iCloud Drive may be used as an optional, explicitly authorized transport or storage adapter for operational hand-off data where the implementation meets required access-control, integrity, freshness, expiry, and conflict-handling properties.

Other permitted implementations may use local application storage, an iRiel-controlled private store, or another authorized transport. The selected storage mechanism must not become the source of truth for iRiel identity, context, memory, or authorization.

If iCloud Drive is unavailable, the integration must report the relevant transport failure or use another already-authorized adapter. It must not silently weaken security or invalidate iRiel identity.

## 8. Privacy, authorization, and execution

- Apply minimum required data and least privilege.
- Keep iRiel personal context and persistent memory outside Shortcut state unless a narrowly scoped, separately authorized operation requires a specific data item.
- Distinguish user intent, iRiel consent, PRSL-AI policy, Permission Manager authorization where applicable, native OS permission, remote disclosure, and persistent retention.
- Do not infer permission from a Shortcut being present, enabled, or invoked.
- Do not silently expand an allowlisted action or its parameters.
- Fail closed when authorization is missing, expired, revoked, ambiguous, or unverifiable.
- Preserve confirmation requirements for side-effecting operations.
- Validate operation identity, freshness, provenance, status, and result before reporting success.

## 9. Continuity and state reconciliation

iRiel Resonance preserves coherence across Shortcuts, App Intents, Siri, iRiel AppWeb, other authorized interfaces, providers, and devices.

Operational state is a bounded projection for an individual operation. iRiel remains responsible for validating and reconciling outcomes into its own canonical state. A Shortcut must not overwrite canonical identity, memory, or continuity.

A late, stale, duplicated, failed, cancelled, denied, or expired result must retain its truthful status and must not be promoted to success.

**Remember continuity. Understand change. Respect the present.**

## 10. Replaceability and availability

Apple Shortcuts is one replaceable execution interface within the Apple Integration Layer. The conceptual capability and operation contract must remain independent of the chosen automation mechanism.

Apple feature availability may vary by device, OS version, region, language, account configuration, and permissions. A contract declaration does not prove that a Shortcut, App Intent, iCloud workflow, or runtime is implemented or available.

Replacing Shortcuts, iCloud Drive, an Apple device, a model, or a provider must not redefine iRiel Personal Intelligence or its canonical identity.

## 11. Implementation-status discipline

This document specifies the intended interface. It does not prove that an Apple Shortcut, App Intent, operational-state store, iCloud workflow, alternate transport, or Resonance runtime is implemented, tested, deployed, or verified.

Each component must be reported according to independent evidence: specified, implemented, tested, deployed, and verified. Documentation alone is not evidence of runtime availability.

## 12. Related contracts
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md)
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)

- [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md)
- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)

- [Canonical iRiel Technical Definition](./IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md)
- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel Siri AI Interaction Contract — Apple Integration](./IRIEL-SIRI-AI-APPLE-INTEGRATION.md)
- [PRSL-AI Intelligence Router Contract](./PRSL-AI-INTELLIGENCE-ROUTER-CONTRACT.md)
- [PRSL-AI Ecosystem Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
