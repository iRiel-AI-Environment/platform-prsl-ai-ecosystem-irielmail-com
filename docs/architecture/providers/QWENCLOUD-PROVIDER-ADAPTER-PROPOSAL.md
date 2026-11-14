# QwenCloud Provider Adapter — Integration Proposal

- **Status:** PROPOSED
- **Version:** 0.1.0-proposed
- **Owner:** Robert Software Labs
- **Platform:** PRSL-AI Ecosystem
- **Candidate provider:** QwenCloud MaaS
- **Candidate model:** `qwen3.7-max`
- **Transport:** OpenAI-compatible Chat Completions over HTTPS/SSE
- **Default regional example:** Singapore (`ap-southeast-1`)
- **Canonical architecture baseline:** PRSL-AI Ecosystem v6.3; this proposal does not amend or supersede any v6.3 contract.

## 1. Decision summary

Introduce QwenCloud as an optional, replaceable external inference implementation behind a provider-neutral contract owned by the current canonical PRSL-AI architecture.

This proposal authorizes neither remote execution nor remote data disclosure. The adapter code in this branch is an isolated transport implementation only. It is not registered, routed, exposed through the public inference API, or enabled in the Agent PRSL-AI console.

## 2. Architectural boundaries

The integration must preserve independent responsibilities:

- **Identity:** provider credentials identify the platform's service account to QwenCloud; they do not establish end-user identity.
- **Trust:** provider endpoint, region, TLS, credential provenance, and provider lifecycle are evaluated by trusted platform configuration.
- **Capabilities:** a provider/model advertises technical support; this does not create a capability or grant dispatch eligibility.
- **Authorization:** the designated authorization authority decides whether the exact operation may disclose the specified data to the exact remote recipient.
- **Routing:** the Intelligence Router selects only among candidates already eligible under policy and authorization constraints.
- **Runtime:** the trusted execution boundary performs the authorized request, enforces timeout/cancellation, validates output, and returns minimized metadata.

No adapter may fuse these concerns or act as an authority for another.

## 3. Provider identity and configuration

Suggested adapter identity: `qwencloud`.

Suggested implementation metadata (non-canonical until reviewed):

| Field | Value |
|---|---|
| Provider ID | `qwencloud` |
| Model ID | `qwen3.7-max` |
| Protocol | OpenAI-compatible Chat Completions |
| Streaming | SSE |
| Thinking control | `enable_thinking` |
| Usage metadata | `stream_options.include_usage` |
| Region example | `ap-southeast-1` |
| Credential | Server-side QwenCloud API key |

The endpoint and model must be explicit configuration. API keys are region-specific; endpoint/key mismatch must fail closed. Do not hard-code credentials or assume all regions offer the same model inventory.

## 4. Request/response translation

The isolated adapter accepts a bounded list of system/user/assistant text messages and translates them to the provider's Chat Completions request:

- `model`
- `messages`
- `stream: true`
- `stream_options.include_usage: true`
- `enable_thinking` as an explicit adapter configuration
- optional `max_completion_tokens` and `temperature`

The adapter normalizes provider SSE events into text, usage, and completion events. It does not expose provider-specific wire structures to a consuming application.

The current implementation intentionally discards `reasoning_content`. Hidden model reasoning is not a user-facing result, platform memory, audit payload, or execution envelope field.

## 5. Data disclosure and privacy

QwenCloud is an external processing recipient. Sending prompts, context, files, or personal data to it is remote disclosure.

Before any runtime integration, the platform must establish and verify:

1. Data classification and purpose for the exact operation.
2. The exact recipient identity and regional endpoint.
3. A trusted, server-side disclosure authorization bound to subject, request, purpose, data scope, recipient, and expiry.
4. Separate retention authorization if data is retained beyond the transient operation.
5. User-facing disclosure and consent where required by policy.
6. No automatic remote fallback when local execution is preferred, required, unavailable, or denied.
7. Revocation and cancellation behavior.
8. Minimized audit events that exclude prompts, credentials, tokens, and hidden reasoning.

Provider sign-in or an API key is not user consent. A user-interface boolean is not trusted authorization.

## 6. Failure and resilience semantics

- Missing credentials, unsupported model, region mismatch, invalid response, timeout, cancellation, and provider errors must be structured failures.
- The adapter performs no automatic retries.
- The adapter does not select another provider.
- The adapter never weakens privacy or execution constraints.
- The caller owns cancellation; the adapter enforces a bounded request timeout.
- Provider diagnostics and response bodies must not be copied into user-visible errors or routine logs.
- A stream that terminates without a valid response is a failure, not an empty successful answer.

## 7. Capability declaration

This proposal does not create a new user-facing capability ID. A provider is an implementation candidate, not the semantic identity of an operation.

Any later registration must reference the current canonical Capability Contract and manifest schema without forking them. Provider/model capability metadata must be verified against actual model and regional documentation and tested at runtime.

## 8. Implementation boundary in this branch

The branch contains an isolated server-side Chat Completions transport client and deterministic unit tests for:

- SSE parsing across transport chunk boundaries.
- Visible text and usage normalization.
- Suppression of `reasoning_content`.
- API-key header placement.
- Thinking-mode request configuration.
- Safe HTTP error handling.
- No implicit retry.
- Input validation before network access.

The code is not connected to a public route, UI, Agent PRSL-AI, Router, Registry, Permission Manager, or iRiel. No live QwenCloud request is performed by unit tests.

## 9. Required gates before integration

This proposal must be reconciled with the current canonical PRSL-AI Ecosystem v6.3 documents and contracts before adoption. At minimum:

- Confirm the provider-adapter contract and ownership boundary.
- Confirm the current Intelligence Router candidate schema and policy inputs.
- Confirm the current capability manifest/provider metadata rules.
- Confirm the authorization and trusted remote-disclosure contract.
- Confirm the runtime execution and observation envelope.
- Confirm audit, cancellation, timeout, and abuse-control requirements.
- Complete provider terms, data-processing, retention, regional availability, and security review.
- Run contract, integration, adversarial, and end-to-end tests.
- Obtain explicit owner approval before enabling remote inference.

No status transition from PROPOSED is implied by this branch.
