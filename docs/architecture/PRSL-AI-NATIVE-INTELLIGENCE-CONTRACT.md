# PRSL-AI Native Intelligence Contract

**Document ID:** PRSL-AI-ARCH-NIC-001  
**Status:** Architecture contract — approved direction, not an implementation claim  
**Version:** 1.0.0  
**Owner:** Robert Software Labs  
**Applies to:** PRSL-AI Ecosystem Platform and [iRiel AI — Powerfully Intelligence Environment](https://github.com/iRiel-AI-Environment/https-iriel-ai-by-robert-software-labs.lovable.app/blob/main/docs/architecture/IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md)

## 1. Purpose

This contract defines how native intelligence is owned, organized, governed, and made available across the PRSL-AI Ecosystem and iRiel.

The platform's first responsibility is to develop and provide its own useful intelligence capabilities. External model providers, hosted APIs, and third-party inference services are optional Plugins; they are not prerequisites for the native platform or iRiel intelligence path.

This document establishes architectural boundaries and integration expectations. It does not claim that native LLMs, runtimes, APIs, or production deployments already exist.

## 2. Institutional principles

1. **Native-first:** PRSL-AI must have a first-party intelligence capability path that does not require an external AI provider.
2. **Human-centered:** technology adapts to the human; users retain meaningful control over their context and interactions.
3. **Privacy by default:** collect and expose the minimum data required for a requested capability.
4. **Provider-agnostic:** models and runtimes are replaceable behind stable contracts. No single model vendor defines the ecosystem.
5. **Modular independence:** capabilities are separately defined, versioned, testable, and replaceable.
6. **Accessibility and inclusion by default:** interfaces and outputs must support accessible interaction and the platform's language commitments.
7. **Continuity with boundaries:** preserve authorized continuity without merging unrelated users, sessions, products, or contexts.

## 3. Terminology

- **Native Intelligence:** first-party intelligence capabilities selected, configured, governed, and maintained by Robert Software Labs for PRSL-AI.
- **Native Model:** a language or multimodal model admitted to the PRSL-AI native model catalog under documented licensing, provenance, evaluation, and security requirements.
- **Inference Runtime:** the execution component that loads and runs a model. Its physical deployment topology is intentionally not prescribed by this contract.
- **Capability:** a named, versioned unit of intelligence behavior, such as institutional question answering, reasoning, coding assistance, language adaptation, or accessibility support.
- **Intelligence API:** the controlled interface through which authorized products request capabilities.
- **Intelligence Router:** the policy-aware component that selects an eligible native model, capability implementation, or explicitly enabled Plugin.
- **Plugin:** an optional adapter to an external provider or service. A Plugin must never be a hidden mandatory dependency of native functionality.
- **Consumer:** an authorized product or interface using a capability, initially the PRSL-AI Platform Agent and iRiel.
- **Context:** information supplied for one request or explicitly authorized for continuity. Context is scoped and must not be implicitly promoted to persistent memory.

## 4. Ownership and responsibility boundaries

### 4.1 Robert Software Labs

Robert Software Labs owns the institutional direction, native capability catalog, contracts, evaluation standards, security policies, and release governance of PRSL-AI Native Intelligence.

### 4.2 PRSL-AI Ecosystem Platform

The platform is the institutional experience and knowledge interface. Its Agent may explain the ecosystem and answer platform questions using authorized native capabilities. It is not iRiel and must not claim access to a visitor's private iRiel context.

### 4.3 iRiel

iRiel is the Powerfully Intelligence Environment and personal intelligence orchestration environment. It may request shared PRSL-AI capabilities while retaining responsibility for its identity, user consent experience, personal context, memory, accessibility preferences, and orchestration. The Intelligence Router selects eligible execution candidates; iRiel does not replace the Router or the Permission Manager.

The platform provides capabilities; it does not take over iRiel orchestration or personal memory.

### 4.4 Models and runtimes

A model is an implementation component, not the product identity, policy authority, or orchestration owner. Models may be replaced without changing consumer-facing contracts.

## 5. Native intelligence architecture

The logical architecture is:

    PRSL-AI Native Intelligence
    ├── Native Model Catalog
    ├── Inference Runtime (deployment topology deferred)
    ├── Capability Layer
    ├── Knowledge and Retrieval Layer
    ├── Policy and Safety Layer
    ├── Intelligence Router
    └── Versioned Intelligence API
        ├── PRSL-AI Platform Agent
        └── iRiel

This is a logical architecture, not a deployment diagram. It does not prescribe a third-party server, cloud vendor, hosting provider, hardware purchase, or specific model framework.

The same approved native model family and capability definitions may serve both the platform and iRiel. Consumers may use separate sessions, isolated execution contexts, or different resource allocations. Sharing native intelligence does **not** mean sharing user conversations, private memory, credentials, or unrestricted data.

## 6. Initial capability domains

The following domains define an extensible starting catalog. They are capability targets, not claims of completed implementation.

| Capability ID | Responsibility |
| --- | --- |
| institutional-knowledge | Explain PRSL-AI, Robert Software Labs, ecosystem components, and approved documentation. |
| general-reasoning | Analyze questions, synthesize information, and explain reasoning at an appropriate level. |
| software-engineering | Assist with software architecture, programming, debugging, and technical documentation. |
| language-and-localization | Support language understanding and culturally appropriate localization without caricature or stereotypes. |
| accessibility | Help produce accessible content and identify accessibility considerations. |
| knowledge-retrieval | Retrieve relevant, authorized institutional knowledge with source traceability. |

Capabilities must be added through explicit specifications, evaluation criteria, and versioned contracts. A model's presence in the catalog does not automatically make every capability available.

## 7. Intelligence API contract

Every consumer request must use a versioned, authenticated interface. The transport and implementation framework may be selected later; the logical request and response semantics are defined here.

### 7.1 Request envelope

    {
      "contract_version": "1",
      "request_id": "unique-request-id",
      "consumer": "prsl-platform | iriel",
      "capability": "institutional-knowledge",
      "capability_version": "1",
      "input": {
        "content": "User request",
        "content_type": "text"
      },
      "context": {
        "scope": "request",
        "items": []
      },
      "locale": "en-US",
      "policy": {
        "allow_external_plugins": false
      }
    }

Requirements:
- Consumer identity must be authenticated and authorized; it is not trusted merely because it appears in the payload.
- Capability and capability version must resolve to an enabled contract.
- Context must declare its scope. Request-scoped context is discarded according to the request lifecycle and must not become persistent memory by default.
- Locale must use a supported BCP 47 language tag where known.
- External Plugin use is denied by default and can occur only under explicit policy and authorization.
- Secrets, credentials, and private keys must never be supplied as ordinary prompt context.

### 7.2 Response envelope

    {
      "contract_version": "1",
      "request_id": "unique-request-id",
      "status": "completed",
      "capability": "institutional-knowledge",
      "capability_version": "1",
      "result": {
        "content": "Response content",
        "content_type": "text"
      },
      "provenance": {
        "execution_class": "native",
        "model_id": "registered-model-id",
        "plugin_id": null
      },
      "usage": {
        "input_tokens": null,
        "output_tokens": null
      }
    }

Requirements:
- Execution class must distinguish native execution from Plugin execution.
- Model ID may identify an approved model without exposing private filesystem paths, internal secrets, or infrastructure details.
- Provenance must not falsely label Plugin output as native.
- Token and usage fields may be omitted or null when unavailable.
- Errors must use stable machine-readable codes and must not disclose secrets or sensitive internal traces.

### 7.3 Error semantics

Implementations should expose stable error categories such as:
- UNAUTHENTICATED
- UNAUTHORIZED_CONSUMER
- CAPABILITY_NOT_FOUND
- CAPABILITY_VERSION_UNSUPPORTED
- POLICY_DENIED
- CONTEXT_SCOPE_INVALID
- MODEL_UNAVAILABLE
- RESOURCE_LIMIT
- INVALID_REQUEST
- INTERNAL_ERROR

A failure in an optional Plugin must not disable an available native capability. If no eligible native path exists, the system must return a truthful unavailable response rather than silently invoking an external provider.

## 8. Context, privacy, and isolation

1. Platform visitor conversations and iRiel personal conversations are separate security domains.
2. No cross-consumer context sharing is permitted by default.
3. The platform Agent must not read iRiel identity, history, memory, profile, or device data.
4. iRiel must explicitly authorize any context it sends to a PRSL-AI capability.
5. Request context, session context, and persistent memory are distinct scopes with separate policies.
6. Persistent memory requires an explicit product-level consent and lifecycle contract; model inference alone does not grant permission to store information.
7. Logs should capture operational metadata needed for reliability and security, not raw prompts or responses by default.
8. Retention, deletion, export, and access policies must be documented before production use.
9. Data must not be used to train, fine-tune, or evaluate models beyond the declared purpose without a separate lawful basis and explicit policy.
10. Access control must be enforced at the trusted execution boundary, never solely in the client UI.

## 9. Security and governance requirements

- Authenticate every consumer and authorize each capability independently.
- Apply least-privilege access and deny-by-default policy.
- Validate input size, content type, locale, capability version, and context scope.
- Protect against prompt injection, data exfiltration, unsafe tool execution, and retrieval poisoning.
- Treat retrieved documents and model output as untrusted data until validated.
- Do not give a language model direct authority to change policies, grant permissions, or access secrets.
- Keep credentials outside source control and model context.
- Record model provenance, license, version, evaluation status, and approval state in the native model catalog.
- Evaluate quality, robustness, safety, accessibility, latency, and resource behavior before release.
- Provide a controlled disable/rollback mechanism for a faulty model or capability.

## 10. Model and capability lifecycle

A model or capability must pass these stages before production availability:

1. **Proposed:** purpose, owner, intended consumers, and expected value documented.
2. **Reviewed:** license, provenance, security, privacy, and resource requirements reviewed.
3. **Evaluated:** quality, safety, robustness, and capability-specific tests completed.
4. **Registered:** immutable model/capability identifiers and versions recorded.
5. **Staged:** tested against the contract in a non-production environment.
6. **Approved:** release authority and rollback plan recorded.
7. **Available:** enabled for explicitly authorized consumers.
8. **Retired:** deprecated with a migration path and removal date.

Model replacement must not require consumers to rewrite against model-specific APIs.

## 11. Plugins and external providers

Plugins are optional extensions. They may add capabilities or provide a temporary alternative only when explicitly enabled by policy.

- Native capability availability must be evaluated first.
- Plugin activation requires an explicit policy decision.
- Consumers must be able to distinguish native and Plugin execution.
- Plugin credentials and data scopes must be isolated per integration.
- Plugin failure must not corrupt native state or disable unrelated native capabilities.
- No external provider may become a hidden dependency through fallback behavior.
- This contract does not authorize connecting, purchasing, or deploying any third-party service.

## 12. Accessibility and language behavior

- Capability responses must preserve the consumer's requested locale when supported.
- Language adaptation must be respectful, region-aware when requested, and free of caricature.
- User-facing experiences must support keyboard, assistive technology, readable structure, and WCAG 2.2 AA design goals.
- Errors and unavailable states must be understandable and actionable.
- Accessibility preferences belong to the relevant user/product context and must not be inferred from unrelated sessions.

## 13. Versioning and compatibility

- The API contract uses semantic versioning.
- Breaking changes require a new major contract version and a migration period.
- Capability versions are independent from model versions.
- Model identifiers and versions must not be used as consumer-facing capability identifiers.
- Deprecation notices must include affected consumers, replacement versions, and dates.
- Contract schemas and conformance tests must be maintained in the repository.

## 14. Operational requirements

Before production enablement, each capability must define:
- availability and health semantics;
- request and output limits;
- concurrency and resource controls;
- timeout and cancellation behavior;
- model loading and warm-up behavior where relevant;
- safe failure and rollback behavior;
- privacy-preserving operational metrics;
- evaluation and regression test coverage.

Physical hosting, hardware, runtime framework, and deployment topology remain separate architecture decisions. They must be evaluated against native ownership, privacy, accessibility, reliability, and cost requirements—not selected by assuming a third-party provider.

## 15. Acceptance criteria

The architecture is conformant when:

- The PRSL-AI Platform Agent can request an approved native capability without requiring an external AI provider.
- iRiel can request the same approved capability through an authenticated, versioned contract.
- Both consumers receive truthful execution provenance.
- Platform and iRiel contexts remain isolated.
- No visitor model download is required for the platform's hosted interaction experience.
- Native capability failure does not silently trigger an external provider.
- Plugins are optional, explicitly authorized, and independently disableable.
- Model replacement does not break consumer contracts.
- Security, privacy, accessibility, evaluation, and rollback requirements are tested before production release.

## 16. Implementation status and next decisions

**Current status:** This document establishes the target architecture and normative contract only. It does not assert that an inference runtime, native model catalog, Intelligence API, capability implementation, or iRiel integration has been deployed.

Recommended implementation sequence:

1. Define the native capability registry and model admission policy.
2. Select and evaluate an initial model candidate using documented licensing and hardware-independent benchmarks.
3. Specify the runtime boundary without committing to a hosting vendor.
4. Implement the first native capability: institutional knowledge for the PRSL-AI Platform Agent.
5. Implement the authenticated Intelligence API and consumer isolation.
6. Integrate iRiel as a second authorized consumer.
7. Add further specializations through independently versioned capability contracts.

No production deployment or external provider connection is implied by this sequence.

---

**Institutional rule:** The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates. PRSL-AI develops and governs the native capabilities that make this possible.
