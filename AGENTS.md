<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Repository identity and scope

This repository is the **PRSL-AI Ecosystem platform** project owned by Robert Software Labs. Its public platform deployment is:

- Platform: https://platform-prsl-ai-ecosystem-irielmail-com.lovable.app
- Ecosystem page: https://platform-prsl-ai-ecosystem-irielmail-com.lovable.app/ecosystem

The separate iRiel AppWeb is deployed at https://iriel-prsl-ai-irielmail-com.lovable.app and has its own repository and Lovable project. Do not treat this repository as the iRiel AppWeb source, and do not modify the iRiel repository as part of platform work unless the task explicitly spans both projects and authorizes both.

# Canonical identities

- **Robert Software Labs (RSL):** creator and institutional steward.
- **PRSL-AI Ecosystem:** shared platform architecture, governance, contracts, and capabilities.
- **PRSL-AI Core:** foundational platform architecture and infrastructure; do not imply complete operational implementation without evidence.
- **Agent PRSL-AI:** first-party specialist for PRSL-AI platform knowledge and documented capability guidance. The current console is Q&A-only, not a general autonomous task-execution runtime.
- **iRiel AI:** separate **PowerFully Intelligence Environment**. Preserve this exact branded wording and capitalization; do not use the historical “Personal Intelligence Environment (PIE)” expansion.
- **iSpace:** a workspace inside iRiel, not a peer platform or independent top-level product.
- **iApps:** the modular application family.

The canonical principle is: **Accessibility, Inclusion, and Security by Default. Your continuity is your right. The machine adapts to you.**

The responsibility statement is: **The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.** Router selection is not authorization; protected operations require the Permission Manager and applicable host permissions.

# Source-of-truth documentation

- README.md — repository identity, destinations, implementation status, and development workflow.
- docs/architecture/README.md — architecture documentation index.
- docs/architecture/PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md — canonical ecosystem architecture and responsibility boundaries.
- docs/architecture/IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md — authoritative known gaps and production-readiness evidence.
- docs/architecture/IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md — canonical iRiel definition.
- docs/architecture/IRIEL-APPWEB-INTEGRATION.md — cross-project integration contract.
- docs/architecture/PLATFORM-AGENT-REPOSITORY-GOVERNANCE.md — ownership and repository placement.

# Internationalization

- UI copy is maintained in src/i18n/messages.ts.
- Locale identifiers and metadata are maintained in src/i18n/locales.ts.
- Native interface overrides are maintained in src/i18n/locales/overrides.ts.
- The registry contains 17 BCP 47 locales. Only en-US and pt-BR have complete core message sets; the other locales have partial native UI overrides and use fallback content for missing messages.
- Do not describe all 17 locales as fully translated. Preserve RTL behavior and verify locale-specific text before marking a locale complete.

# Agent console and execution boundaries

- Local topic matching is implemented in src/lib/agent.ts.
- The current Agent console is local-only. Known-topic answers are resolved in the browser; unmatched questions receive the localized local-only notice.
- Do not add a remote model or provider call to the public Agent console.
- Do not add provider-specific SDKs, model identifiers, or gateway credentials to the Agent console. Future remote execution requires an approved provider-neutral adapter contract, policy evaluation, trusted disclosure authorization, server-side abuse controls, and conformance tests.
- A UI confirmation or client-supplied boolean is not a trusted authorization authority and must never authorize protected data disclosure or platform capability execution.
- The production Remote Disclosure Authority and provider adapter runtime remain open architecture gaps (GAP-007 and GAP-016). Future remote execution must also satisfy abuse-control requirements (GAP-021).
- The Agent console does not access iRiel profile data, personal memory, conversation history, secrets, or other private context.



# Public forms and reporting channels

- Contact and Feedback pages are status-only until a real submission backend is implemented and verified.
- Do not reintroduce name/email/message inputs that appear to submit without a connected delivery service.
- No dedicated human-contact or secure vulnerability-reporting channel is currently verified. Do not route security reports through the public Agent.

# Security and configuration

- Use .env.example for variable names and safe placeholders.
- Never commit .env, secrets, service-role keys, access tokens, credentials, or generated private state.
- Do not expose server-only environment variables to browser code.
- SUPABASE_PUBLISHABLE_KEY / VITE_SUPABASE_PUBLISHABLE_KEY are publishable client configuration; service-role credentials are not.
- Keep authorization, consent, native host permissions, remote disclosure, and data retention as separate controls.

# Engineering and validation

- Keep modules cohesive and respect the documented platform/client boundary.
- Do not describe architecture, examples, mocks, or synthetic tests as production deployment.
- Update documentation and tests when implementation behavior or contracts change.
- Run the relevant checks before opening a pull request:
  - bun run lint
  - bun run test
  - bunx tsc --noEmit
  - bun run build
  - python docs/architecture/scripts/validate_architecture_links.py
  - Capability, Permission Manager, execution-contract, and Dependency Resolver validators under docs/architecture/agent-prsl-ai/scripts/.
- Preserve Lovable-connected Git history. Never force-push, amend, rebase, or squash commits already published to the connected branch.
