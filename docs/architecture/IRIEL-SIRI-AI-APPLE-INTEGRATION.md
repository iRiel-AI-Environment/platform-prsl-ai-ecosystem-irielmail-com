# iRiel Siri AI Interaction Contract — Apple Integration
## iRiel ↔ Apple Integration Layer ↔ Siri AI ↔ App Intents / Shortcuts

- **Owner:** Robert Software Labs
- **Canonical entity and authority:** iRiel — PowerFully Intelligence Environment
- **Shared platform:** PRSL-AI Ecosystem
- **Interaction surface:** Apple Siri / Siri AI
- **Integration boundary:** iRiel System Integration Layer / Apple Integration Adapter
- **Native execution mechanisms:** App Intents and Apple Shortcuts
- **Continuity mechanism:** iRiel Resonance
- **Storage:** Provider-independent; iCloud Drive is optional
- **Contract type:** Voice and system interaction interface
- **Status:** Canonical architectural specification
- **Language:** English (United States)

---

## 1. Purpose and scope

This contract defines how Apple Siri may serve as a voice and system-level interaction surface for invoking authorized iRiel capabilities.

Siri is an external interaction interface. It is not iRiel's identity, canonical intelligence, memory, context authority, or continuity layer.

This contract defines the boundary between the Apple interaction surface, the iRiel System Integration Layer, iRiel orchestration, and native execution mechanisms. It is an Apple-specific profile of the broader [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md).

This specification describes architectural responsibilities. It does not assert that a particular Siri, Apple Intelligence, App Intents, or Shortcuts capability is available on every device, OS release, account, language, or region.

## 2. Canonical entity and component roles

- **iRiel** is the canonical entity. It owns its identity, user-authorized context, consent-governed memory, intent orchestration, capability selection, and continuity.
- **PRSL-AI Ecosystem** supplies shared architecture, policies, capability contracts, and governed platform services.
- **Agent PRSL-AI — Powerful by Robert Software Labs** is a first-party PRSL-AI specialist. iRiel may invoke it through its declared capability contract when a task requires PRSL-AI platform specialization. Siri does not directly grant the Agent authority or bypass iRiel orchestration.
- **Apple Integration Layer** is the replaceable adapter boundary between iRiel and Apple system interfaces.
- **Siri / Siri AI** is an external voice and system interaction surface. It may receive a user request, expose supported system interaction, and present an authorized response.
- **App Intents and Apple Shortcuts** are native integration and execution mechanisms. They are subject to OS behavior, app declarations, user permissions, and device availability.
- **iRiel Resonance** preserves authorized continuity across entry points and execution environments. It is not a separate identity authority or implicit memory store.
- **Storage** is independent and replaceable. iCloud Drive is optional, not mandatory.

## 3. Architectural relationship

```text
Human
  │ voice or supported system interaction
  ▼
Apple Siri / Siri AI
  │ supported invocation
  ▼
Apple Integration Adapter
  │ authenticated, scoped hand-off
  ▼
iRiel System Integration Layer
  │
  ▼
iRiel orchestration
  ├── Intent and context mediation
  ├── Policy and consent evaluation
  ├── Capability selection
  ├── Optional Agent PRSL-AI specialist invocation
  └── Result validation and continuity
  │
  ▼
Authorized iRiel capability
  │
  ▼
App Intents / Apple Shortcuts / other permitted adapter
  │ native permissions and execution constraints
  ▼
Execution result
  │ validated, minimized return path
  ▼
iRiel
  │ authorized response
  ▼
Siri / Apple interaction surface
  │
  ▼
Human
```

The diagram describes responsibility and data flow, not a claim that every request traverses every component. A native App Intent may be the invocation mechanism, but it must preserve the same authority, authorization, and data-boundary rules.

## 4. Siri's role and limits

### 4.1 Siri may

- Receive a user request through supported voice or system interaction.
- Interpret supported invocation phrases and parameters within Apple's available capabilities.
- Invoke an iRiel capability exposed through an authorized App Intent or Shortcut.
- Pass the minimum required request parameters to the Apple Integration Adapter.
- Present a response or execution outcome returned and approved by iRiel.
- Request required user input or native permission through supported system interaction.
- Provide a system-level entry point without becoming the owner of the resulting iRiel interaction.

### 4.2 Siri must not

- Become the canonical identity of iRiel.
- Own or redefine iRiel's canonical personal memory or persistent context.
- Override iRiel's authority, policies, consent, or capability boundaries.
- Create, expose, or authorize capabilities that iRiel has not declared and made available.
- Expand the scope of a request or permissions beyond the user's authorization.
- Directly invoke Agent PRSL-AI in a way that bypasses iRiel orchestration and the Agent's declared capability contract.
- Treat access to an Apple system API as permission to disclose iRiel context or memory.
- Convert an unverified, failed, denied, cancelled, or incomplete execution into a successful result.
- Become a required dependency for iRiel identity, memory, or ordinary operation.

## 5. Intent and request flow

Intent is the desired outcome, not an executable action or permission grant. The [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md) defines its canonical taxonomy, versioned envelope, interpretation and ambiguity rules, and authorized action hand-off. Siri may provide a natural-language entry point, but iRiel remains responsible for validating the intent, context, policy, permissions, and selected action before Shortcuts or an App Intent executes.

The [iRiel Entity Contract — Apple Shortcuts Interface](./IRIEL-ENTITY-SHORTCUTS-CONTRACT.md) defines the single canonical iRiel entity represented through this integration; Siri and Shortcuts are consumers/execution mechanisms, not identity authorities.

### 5.1 Request flow

The interaction follows this logical sequence:

1. The user initiates a request through Siri or another authorized entry point.
2. Siri invokes a supported App Intent or Shortcut with the parameters required for that invocation.
3. The Apple Integration Adapter validates the hand-off format, invocation source where available, and request scope.
4. iRiel receives the request and decides whether it is valid, supported, and authorized.
5. iRiel mediates intent and the minimum required context, then evaluates applicable policy, consent, and capability eligibility.
6. iRiel selects an eligible capability or execution adapter.
7. If PRSL-AI platform specialization is required, iRiel may invoke Agent PRSL-AI through its declared capability contract and applicable authorization. Otherwise, it uses another eligible capability.
8. The selected capability executes within its own authority and native OS constraints.
9. iRiel validates the execution result, provenance, freshness, and operation status.
10. iRiel reconciles authorized continuity through iRiel Resonance and prepares a minimized response.
11. Siri presents the response to the user through supported system interaction.

A request becomes an accepted iRiel interaction only after it reaches the iRiel integration boundary and passes the applicable validation and authorization checks. Siri's interpretation alone is not iRiel authorization.

## 6. Capability and execution model

Siri provides an invocation surface; it does not own the capability being invoked.

Supported patterns may include:

```text
Siri
  → App Intent
  → Apple Integration Adapter
  → iRiel capability
  → authorized execution
  → validated result
```

or:

```text
Siri
  → Shortcut
  → Apple Integration Adapter
  → iRiel action
  → authorized execution
  → validated result
```

The capability definition and its authorization contract remain independent of the selected Apple execution mechanism. App Intents and Shortcuts are adapter mechanisms, not canonical iRiel capabilities.

Where an action has side effects, the implementation must apply the relevant authorization, confirmation, idempotency, and execution-result rules. A voice invocation must not silently weaken confirmation requirements that would apply to the same action in another interface.

The [iRiel Personal Intelligence Contract — Apple Shortcuts Interface](./IRIEL-PERSONAL-INTELLIGENCE-SHORTCUTS-CONTRACT.md) defines the minimum identity/operational interface and the inseparable relationship between Personal Intelligence and Resonance. The [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md) governs operational state when the Shortcuts adapter uses a state projection or hand-off record. Its versioning, expiry, stale-result, and failure rules remain applicable. App Intents implementations must preserve equivalent operation identity, authorization, and result-validation guarantees.

## 7. Context and data mediation

Siri or Apple system interfaces may make certain contextual signals available, depending on device, OS, configuration, user permissions, and the specific API.

Context may include only data that is:

- available through a supported Apple interface;
- necessary for the requested operation;
- within the permission and purpose granted by the user;
- accepted by iRiel's context and policy mediation.

The Apple Integration Adapter must pass the minimum required context. iRiel decides whether that context is relevant and may be used.

Apple-provided context does not become canonical iRiel context merely because it was supplied by Siri or an OS API. Context authority and the decision to retain any information remain with iRiel.

## 8. Privacy, permissions, and security

The integration follows these requirements:

- Minimum Required Data.
- Minimum Required Permission.
- Explicit Authorization.
- Least Privilege.
- Purpose Limitation.
- Revocable Permission.
- No unnecessary exposure of personal context or memory.
- Secure, bounded, and attributable execution.

The following are distinct and must not be conflated:

1. User intent to invoke Siri.
2. Permission for an Apple App Intent or Shortcut to run.
3. iRiel authorization to perform the requested capability.
4. PRSL-AI policy and Permission Manager authorization, where applicable.
5. Native OS permission for protected resources.
6. Consent to disclose data to an external provider or retain it as persistent memory.

One permission does not imply another. Siri invocation is not blanket consent. A native permission does not authorize Agent PRSL-AI or a remote provider to receive unrelated personal data.

Canonical iRiel memory must not be copied into Siri or Apple system context merely for convenience. Sensitive inputs must be minimized and passed only through an appropriately authorized channel.

Missing, ambiguous, expired, or revoked authorization must fail closed or request the required user action.

## 9. Identity and continuity

The interaction surface does not define the identity of the interaction.

A single iRiel identity may be reached through authorized entry points such as:

- Siri and supported voice interaction;
- App Intents;
- Apple Shortcuts;
- iRiel AppWeb or another direct iRiel interface;
- web or other authorized integrations.

Changing from voice to web, from Siri to Shortcuts, or from one device to another must not create a new iRiel identity.

iRiel Resonance correlates authorized interactions and preserves coherence across these transitions. It does not turn Siri history, Shortcuts state, or Apple storage into canonical iRiel memory.

**Remember continuity. Understand change. Respect the present.**

## 10. Storage independence

This contract does not mandate iCloud Drive.

Operational state or hand-off data may use local storage, an iRiel-controlled private store, iCloud Drive, or another explicitly authorized storage/transport adapter, provided that the selected implementation meets the applicable security, integrity, freshness, and conflict-handling requirements.

Storage is not the identity layer, memory authority, or authorization mechanism. The presence of a file or a successful storage operation does not authorize execution.

Failure or unavailability of iCloud Drive or another optional storage provider must not invalidate iRiel identity or canonical memory. Implementations using Shortcuts state hand-offs must additionally comply with the Apple Shortcuts Operational State Contract.

## 11. Availability and replaceability

Siri, Apple Intelligence, App Intents, Shortcuts, and iCloud are Apple-specific integration surfaces or services. Their availability and behavior may vary by device, operating-system version, region, language, account configuration, and user settings.

The Apple Integration Adapter must declare supported environments and verified capabilities. It must not assume that a feature is universally available because it exists in an Apple product family.

If Siri or an Apple service is unavailable, iRiel remains accessible through other supported entry points. Replacing Siri with another voice interface must not redefine iRiel identity, memory, capabilities, or continuity.

## 12. Failure and response semantics

The integration must distinguish at least:

- `INVOCATION_UNAVAILABLE`
- `INTENT_UNSUPPORTED`
- `ADAPTER_UNAVAILABLE`
- `INVALID_REQUEST`
- `AUTHORIZATION_REQUIRED`
- `PERMISSION_DENIED`
- `POLICY_DENIED`
- `USER_INPUT_REQUIRED`
- `USER_CANCELLED`
- `EXECUTION_FAILED`
- `RESULT_UNVERIFIED`
- `RESULT_STALE`
- `TRANSPORT_UNAVAILABLE`
- `CAPABILITY_UNAVAILABLE`

The user-facing response must accurately represent the operation outcome. Siri must not announce completion until iRiel has received and validated sufficient execution evidence. If execution is pending, waiting for input, denied, cancelled, or failed, the response must say so accurately and avoid exposing unnecessary diagnostic or personal data.

## 13. Implementation-status discipline

This document defines the intended architecture and integration contract. It does not prove that Siri AI, Apple Intelligence, an App Intent, a Shortcut, a particular voice workflow, or a storage hand-off is implemented or available on a specific device.

Each integration must be separately classified as specified, implemented, tested, deployed, and verified. Verification must identify the device, OS version, language/region configuration, invocation path, required permissions, supported actions, and tested success and failure paths.

Apple feature availability must be verified against the actual target environment. A conceptual flow or documented capability is not implementation evidence.

## 14. Related contracts

- [iRiel Intents Contract — Apple Shortcuts Interface](./IRIEL-INTENTS-SHORTCUTS-CONTRACT.md)
- [iRiel Context Contract — Apple Shortcuts Interface](./IRIEL-CONTEXT-SHORTCUTS-CONTRACT.md)
- [iRiel Automations Contract — Apple Shortcuts Interface](./IRIEL-AUTOMATIONS-SHORTCUTS-CONTRACT.md)
- [iRiel Apple Services Contract — PRSL-AI Ecosystem Integration](./IRIEL-APPLE-SERVICES-CONTRACT.md) — Apple platform boundary, service categories, capability eligibility, privacy, provider independence, and replaceability.
- [iRiel Actions Contract — Apple Shortcuts Interface](./IRIEL-ACTIONS-SHORTCUTS-CONTRACT.md) — bounded action definitions, action classes, authorization gates, execution lifecycle, idempotency, and verified result handling.

- [iRiel System Integration Contract](./IRIEL-SYSTEM-INTEGRATION-CONTRACT.md)
- [iRiel Operational State Contract — Apple Shortcuts Adapter](./IRIEL-OPERATIONAL-STATE-APPLE-SHORTCUTS.md)
- [iRiel AppWeb — PRSL-AI Platform Integration Contract](./IRIEL-APPWEB-INTEGRATION.md)
- [PRSL-AI Ecosystem Architecture Overview](./PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md)
- [Agent PRSL-AI capability contract](./agent-prsl-ai/capability-contract.md)

---

Maintained by Robert Software Labs · PRSL-AI Ecosystem

**Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**
