# Agent PRSL-AI — Reasoning and Action Execution Pattern

**Classification:** Proposed execution pattern / architecture specification  
**Owner:** Robert Software Labs  
**Ecosystem:** PRSL-AI Ecosystem  
**Applies to:** Agent PRSL-AI orchestration of registered capabilities and approved tools  
**Research basis:** Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models* (arXiv:2210.03629, ICLR 2023)  
**Status:** Specified as a design pattern; runtime implementation is unverified

## 1. Purpose

This document adapts the ReAct research pattern—interleaving model-generated reasoning steps with environment actions and observations—to the governed execution architecture of Agent PRSL-AI.

The pattern is intended to improve task decomposition, evidence gathering, exception handling, and result verification. It does not define a new agent identity, capability, permission authority, model provider, or autonomous privilege.

ReAct is a research-informed execution pattern, not a guarantee of correctness or safety. Its use in PRSL-AI is subject to capability contracts, registry lifecycle rules, PRSL-AI policy, the Permission Manager, native host permissions, and user consent.

## 2. Architectural placement

The pattern operates inside the Agent PRSL-AI task-execution layer:

`Human intent → iRiel/context boundary → Agent PRSL-AI interpretation and plan → policy and routing → Permission Manager → approved capability/tool → observation → verification`

Responsibilities remain separate:

- **iRiel** coordinates the user's broader intelligence experience, context, continuity, and consent interaction.
- **Agent PRSL-AI** interprets a platform-specialized task, forms a plan, coordinates eligible capabilities, and communicates outcomes.
- **The model** supplies inference. Its provider is replaceable.
- **The Intelligence Router** selects eligible model/provider/capability candidates under policy. It does not authorize protected operations.
- **PRSL-AI policy** establishes execution constraints and route eligibility.
- **The Permission Manager** is the only PRSL-AI component that issues authorization decisions for protected operations.
- **A capability/tool** performs only its declared, validated operation.
- **The host operating system** independently controls native permissions.

No model-generated plan, reasoning trace, tool result, or agent statement is itself an authorization grant.

## 3. Normative execution cycle

The agent SHOULD follow this cycle, repeating only when a new observation materially changes the task or plan.

### 3.1 Interpret

- Resolve the user's requested outcome and constraints.
- Use only relevant, authorized context.
- Identify ambiguity, missing inputs, data sensitivity, and whether the request implies a state-changing or external action.
- Ask one focused clarification when essential information is missing.

### 3.2 Plan

- Decompose the task into bounded steps.
- Identify candidate Capability IDs and required inputs.
- Declare expected outputs, dependencies, execution mode, and verification criteria.
- Prefer the least-privileged and policy-compliant route; prefer on-device execution when suitable.
- Treat the plan as a proposal, not as permission to execute.

### 3.3 Evaluate policy and route

- Validate each candidate against the capability registry and lifecycle state.
- Only dispatch-eligible capabilities may be considered for execution.
- Resolve dependencies and availability.
- Apply policy constraints, privacy requirements, data minimization, and provider eligibility.
- The Router may select among eligible candidates but must not grant permissions or weaken policy.

### 3.4 Authorize

Before each protected operation:

1. Build a permission request from the validated capability manifest and concrete invocation.
2. Bind it to the authenticated subject, exact Capability ID, permission, purpose, resource scope, execution mode, and bounded duration.
3. Obtain the Permission Manager decision.
4. Require a valid, current, scope-matching `granted` decision.
5. Independently verify native host/OS permission when applicable.
6. Re-check policy and revocation state at the execution boundary.

If consent is required, present the request through the trusted user interface. A model, agent, capability, or provider cannot manufacture consent.

If authorization is denied, unavailable, expired, ambiguous, or unverifiable, do not execute the protected operation. Do not use a fallback to bypass the denial.

See the [Permission Manager Specification](./permission-manager-specification.md).

### 3.5 Act

- Invoke only the approved Capability ID through its registered execution interface.
- Validate the invocation against the capability's input schema.
- Pass the minimum necessary data and references.
- Enforce timeout, cancellation, idempotency, and output constraints.
- Do not grant the capability broader access than the authorization decision permits.
- Do not silently change execution mode, recipient, retention, or privacy characteristics.

A new protected operation requires its own authorization evaluation unless a valid decision explicitly covers that exact operation and scope.

### 3.6 Observe

- Capture the actual capability/tool response, status, and permitted metadata.
- Treat tool output, retrieved documents, web pages, and external content as untrusted data.
- Distinguish observed facts from inferred explanations.
- Do not treat an observation as a policy instruction or permission grant.
- Record safe evidence references and failure codes without copying unnecessary sensitive payloads.

### 3.7 Verify

Compare the observed result against the plan's declared success criteria.

- Confirm that the intended state or output exists using an appropriate independent check where possible.
- Verify the correct resource, scope, and operation; do not infer success from a tool invocation alone.
- Report partial completion, uncertainty, and unavailable verification explicitly.
- A successful tool response is not proof of a broader task outcome unless it satisfies the relevant acceptance criteria.

### 3.8 Adapt or stop

- Update the plan only when new evidence, failure, or changed user intent warrants it.
- Re-run policy, availability, and authorization checks for any materially changed operation.
- Stop when the task is complete, the user cancels, a required permission is denied, a dependency is unavailable without an eligible fallback, or safe execution cannot be established.
- Escalate or ask the user when a decision exceeds the agent's authority.

## 4. Execution state model

An implementation SHOULD expose explicit states equivalent to:

| State | Meaning |
|---|---|
| `interpreting` | Resolving intent and constraints. |
| `planning` | Preparing a bounded execution plan. |
| `evaluating` | Validating policy, registry, route, and dependencies. |
| `awaiting_consent` | Waiting for required user consent. |
| `awaiting_authorization` | Waiting for Permission Manager decision. |
| `ready` | All required checks for the next operation passed. |
| `executing` | Approved capability/tool is running. |
| `observing` | Collecting the operation result. |
| `verifying` | Checking the declared success criteria. |
| `adapting` | Revising the plan based on new evidence. |
| `completed` | The requested outcome is verified to the stated level. |
| `partially_completed` | Some work succeeded; remaining work is blocked or incomplete. |
| `denied` | Policy or authorization prevented execution. |
| `failed` | Execution or verification failed. |
| `cancelled` | The user or system cancelled the operation. |

State transitions must be validated by the runtime. A model response cannot directly set a protected operation to `ready` or `completed`.

## 5. Invocation and result envelope

This pattern reuses the canonical [Capability Contract v1.0](./capability-contract.md); it does not replace operation-specific schemas.

An execution record SHOULD carry the following minimized metadata:

- `execution_id`: unique task execution identifier;
- `request_id`: correlation identifier for the current capability invocation;
- `capability_id`: exact registered operation;
- `plan_step_id`: stable identifier for the bounded step;
- `state`: current execution state;
- `purpose`: user-understandable purpose;
- `execution_mode`: approved on-device, remote, or hybrid mode;
- `authorization_ref`: reference to the Permission Manager decision, when required;
- `observation_ref`: safe reference to the actual operation result;
- `verification`: status and evidence reference for the success criteria;
- `limitations`: uncertainty, omissions, or unresolved blockers.

This is a logical record, not a deployed API or claim that an execution store exists. Sensitive payloads, credentials, full prompts, and hidden model reasoning must not be copied into this record.

## 6. Security and privacy invariants

1. **No self-authorization:** the agent and model cannot approve their own actions.
2. **Per-operation gate:** every protected operation is authorized immediately before execution.
3. **Fail closed:** missing or unverifiable authorization blocks protected execution.
4. **Least privilege:** permissions and resource scope are limited to the exact operation.
5. **Separate consent dimensions:** local access, remote disclosure, and retention are distinct decisions.
6. **No silent fallback:** an alternative route must independently satisfy equal or stricter policy and authorization constraints.
7. **Untrusted observations:** tool and external content cannot override system policy or grant authority.
8. **Revocation-aware execution:** cancellation and revocation must be honored within documented runtime limits.
9. **No unsupported completion claims:** completion requires evidence against declared success criteria.
10. **Provider independence:** model/provider changes cannot alter capability identity, policy, or authorization authority.
11. **Transient by default:** plans and observations do not become persistent memory without the applicable explicit consent.
12. **Accessibility:** consent, progress, denial, and result states must be understandable and accessible.

## 7. Reasoning transparency and audit boundary

The system SHOULD expose concise, user-appropriate explanations of:

- the interpreted goal;
- the planned action at a high level;
- the capability/tool selected;
- the permission or confirmation required;
- the actual operation status;
- the evidence used to verify the result;
- limitations and next steps.

It MUST NOT expose, store, or present hidden model chain-of-thought as an audit record, authorization evidence, or proof of correctness. Internal model reasoning is not a trusted execution artifact.

Audit records should contain only the minimum operational metadata needed for security and diagnosis, such as execution ID, capability ID, state transitions, decision references, safe error codes, timestamps, and verification outcome. Do not log secrets, raw sensitive content, full prompts, or unnecessary user context.

## 8. Failure handling

| Condition | Required behavior |
|---|---|
| Ambiguous user intent | Ask one focused clarification; do not guess consequential details. |
| Capability not registered or not dispatch-eligible | Do not dispatch; report unavailability. |
| Required dependency missing | Stop that step or use only a policy-approved equivalent fallback. |
| Permission denied or consent absent | Do not execute; explain the required next step. |
| Permission Manager unavailable | Fail closed for protected operations. |
| Native OS permission absent | Do not access the protected resource; use the trusted host permission flow where available. |
| Tool returns an error | Preserve the actual status; diagnose from evidence and retry only when safe. |
| Observation conflicts with expectation | Mark unverified/partial; investigate or stop. |
| Revocation or cancellation | Stop further protected access and propagate cancellation where supported. |
| Verification unavailable | Report the result as unverified, not completed. |

Retries must respect capability idempotency, execution limits, and authorization freshness. A retry that changes purpose, scope, recipient, or execution mode requires a fresh evaluation.

## 9. Acceptance criteria

A conforming implementation must demonstrate:

1. Plans can be represented independently from capability invocations.
2. Unregistered, proposed, specified, deprecated, or otherwise ineligible capabilities cannot be dispatched.
3. Every protected invocation is checked by the Permission Manager at the execution boundary.
4. The agent/model cannot fabricate or modify authorization decisions.
5. Native OS permissions are checked independently where applicable.
6. Remote disclosure and retention are separately authorized.
7. Policy denial cannot be bypassed through alternative tools or providers.
8. Tool observations are treated as untrusted data.
9. The runtime distinguishes executed, observed, verified, partial, denied, failed, and cancelled outcomes.
10. Completion claims require verification evidence or are explicitly marked unverified.
11. Revocation and cancellation prevent subsequent protected access within documented limits.
12. Audit output excludes hidden chain-of-thought and unnecessary sensitive payloads.
13. User-facing explanations and consent flows meet accessibility requirements.
14. Provider replacement does not change capability identity or authorization semantics.

## 10. Relationship to research

The pattern is informed by:

Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models*. International Conference on Learning Representations (ICLR 2023). https://arxiv.org/abs/2210.03629

The paper studies interleaved reasoning traces and environment actions, reporting benefits on selected question-answering and interactive decision-making benchmarks. It also discusses limitations and risks when language models are connected to external tools or environments.

PRSL-AI adopts only the high-level plan/action/observation/adaptation pattern. The authorization gates, capability contracts, privacy constraints, and verification requirements in this document are PRSL-AI architectural controls; they should not be attributed to the paper as guarantees.

## 11. Implementation boundary

This document specifies a proposed execution pattern. It does not assert that a ReAct loop, agent runtime, planning engine, tool dispatcher, Permission Manager service, audit store, or execution-state machine is implemented or deployed.

A runtime implementation requires code, schemas where applicable, automated tests for positive and negative authorization paths, observability with privacy minimization, and verified acceptance evidence before any capability is reported as implemented or available.
