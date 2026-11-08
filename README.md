# PRSL-AI Ecosystem Platform

**Created and stewarded by Robert Software Labs (RSL).**

The **PRSL-AI Ecosystem** is a modular technology platform for artificial intelligence, accessibility, inclusion, privacy, security, and human-centered innovation. It defines shared architecture, policies, contracts, infrastructure, specialized capabilities, and integration boundaries for independently evolving products and services.

> **Accessibility, Inclusion, and Security by Default.**  
> Your continuity is your right.  
> The machine adapts to you.

## Official destinations

| Destination | Purpose |
|---|---|
| [PRSL-AI Ecosystem platform](https://platform-prsl-ai-ecosystem-irielmail-com.lovable.app) | Official platform website |
| [Ecosystem architecture page](https://platform-prsl-ai-ecosystem-irielmail-com.lovable.app/ecosystem) | Public overview of the ecosystem |
| [iRiel AppWeb](https://iriel-prsl-ai-irielmail-com.lovable.app) | Separate iRiel application |
| [GitHub repository](https://github.com/iRiel-AI-Environment/platform-prsl-ai-ecosystem-irielmail-com) | Source code and canonical platform documentation |

The platform and iRiel are separate projects and deployments. This repository is the PRSL-AI platform repository; it is not the iRiel AppWeb repository.

## Product and architectural boundaries

| Identity | What it is | What it is not |
|---|---|---|
| **Robert Software Labs (RSL)** | Creator and institutional steward | A model or runtime component |
| **PRSL-AI Ecosystem** | Shared platform architecture, governance, contracts, and capabilities | A single chatbot, model, or application |
| **PRSL-AI Core** | Foundational platform architecture and infrastructure | A model or independent product identity |
| **Intelligence Router** | Selects eligible execution candidates under policy constraints | An authorization authority |
| **Permission Manager** | Issues authorization decisions for protected PRSL-AI operations | A model router or UI toggle |
| **Agent PRSL-AI** | First-party specialist for PRSL-AI platform knowledge and documented capability guidance | iRiel, the platform itself, or a general autonomous task-execution runtime |
| **iRiel AI** | Separate **PowerFully Intelligence Environment** that coordinates a person's broader intelligence experience | An AI model, the PRSL-AI platform, or Agent PRSL-AI |
| **iSpace** | Personal workspace within iRiel | A peer platform or separate top-level product |
| **iApps** | Modular application family | A replacement name for the platform or its agents |

Canonical iRiel wording is **“PowerFully Intelligence Environment”**. Preserve the exact branded capitalization. Do not use the historical expansion “Personal Intelligence Environment (PIE)” as its definition.

### Responsibility flow

**Human intent → Context → Policy → Intelligence Router → Capability / Provider**

> The model thinks. The agent executes a specialty. The Router decides. iRiel orchestrates.

“Router decides” means selecting an eligible execution candidate. It does not mean granting permission. Protected operations require the Permission Manager and, where applicable, independent operating-system permissions.

## Foundational principles

1. Accessibility by default.
2. Inclusion by default.
3. Security by default.
4. Privacy by default and data minimization.
5. On-device and local execution first where technically suitable.
6. Provider-agnostic architecture through explicit adapters and contracts.
7. Human control, explicit consent, and purpose limitation.
8. Modular components with independent responsibilities and lifecycles.

Local, platform-hosted, and external execution must be distinguishable. A failed local route must never trigger an unauthorized remote fallback.

## Current implementation status

The website and repository contain a mixture of implemented interface elements, architectural specifications, partial code, and planned infrastructure. These categories must not be presented as equivalent.

| Area | Current documented status |
|---|---|
| Platform website | Implemented as a Lovable-hosted web application; individual pages and behaviors remain subject to testing |
| Language registry | 17 BCP 47 locales registered |
| Translation completeness | en-US and pt-BR have complete core message sets; other locales have partial native UI overrides and fallback content |
| Agent PRSL-AI console | Local topic matching only; unmatched questions receive a local-only notice and are not transmitted to a remote provider |
| Remote Agent inference | Not enabled in the current console; future remote providers require explicit, provider-neutral adapters and trusted disclosure authorization |
| Public inference API | /api/public/v1/inference returns HTTP 503 with not_enabled; /api/public/v1/capabilities reports inference as not_enabled | Disabled until provider-neutral adapters, policy enforcement, trusted disclosure authorization, and server-side abuse controls are implemented |
| PRSL-AI Intelligence Infrastructure | Architecture specified; not implemented as a complete operational infrastructure |
| Intelligence Router runtime | Architectural responsibility defined; production routing runtime is not verified |
| Permission Manager | Partial runtime core and contract tests exist; trusted production adapters and deployment are not established |
| Capability examples | Manifests and contracts are specified; examples are not automatically production-registered or dispatch-eligible |
| Accessibility conformance | WCAG 2.2 AA is a target; conformance requires automated and manual verification |

The [Implementation Readiness and Architecture Gap Register](docs/architecture/IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md) is the authoritative record of known production blockers and required evidence. Do not infer operational readiness from a page, diagram, manifest, or passing synthetic test.

## Agent PRSL-AI and execution boundaries

The current Agent console is a local knowledge Q&A interface. It matches documented topics in the browser and returns a local-only notice when no topic matches. **It does not send questions to a remote model or provider.** It does not execute general platform operations, forward messages to the RSL team, or accept formal security reports.

Remote inference is intentionally not enabled in this console. Any future remote execution must be introduced through a provider-neutral adapter contract, an approved provider implementation, explicit policy evaluation, trusted recipient- and purpose-bound disclosure authorization, server-side abuse controls, and tests. A user-interface prompt or client-supplied boolean is not a trusted authorization mechanism.

The current console does not access an iRiel profile, personal memory, or conversation history.

## Architecture documentation

Start here:

- [Architecture documentation index](docs/architecture/README.md)
- [Canonical ecosystem architecture overview](docs/architecture/PRSL-AI-ECOSYSTEM-ARCHITECTURE-OVERVIEW.md)
- [Implementation readiness and gap register](docs/architecture/IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md)
- [PRSL-AI Intelligence Infrastructure](docs/architecture/PRSL-AI-INTELLIGENCE-INFRASTRUCTURE.md)
- [Agent PRSL-AI specification](docs/architecture/PRSL-AI-AGENT.md)
- [Canonical iRiel definition](docs/architecture/IRIEL-POWERFULLY-INTELLIGENCE-ENVIRONMENT.md)
- [iRiel ↔ PRSL-AI integration contract](docs/architecture/IRIEL-APPWEB-INTEGRATION.md)
- [Platform and Agent repository governance](docs/architecture/PLATFORM-AGENT-REPOSITORY-GOVERNANCE.md)

## Development

### Requirements

- Node.js compatible with the versions used by the project toolchain.
- [Bun](https://bun.sh/) for dependency installation and scripts.
- Python 3.12 for architecture and capability validators.

### Setup

~~~bash
git clone https://github.com/iRiel-AI-Environment/platform-prsl-ai-ecosystem-irielmail-com.git
cd platform-prsl-ai-ecosystem-irielmail-com
cp .env.example .env
bun install --frozen-lockfile
bun run dev
~~~

Configure the environment variables in .env using your authorized development values. Never commit .env or real credentials.

### Validation

~~~bash
bun run lint
bun run test
bunx tsc --noEmit
bun run build
python -m pip install -r docs/architecture/agent-prsl-ai/requirements-dev.txt
python docs/architecture/scripts/validate_architecture_links.py
python docs/architecture/agent-prsl-ai/scripts/validate_capability_manifests.py
python docs/architecture/agent-prsl-ai/scripts/validate_permission_manager.py
python docs/architecture/agent-prsl-ai/scripts/validate_execution_contract.py
python docs/architecture/agent-prsl-ai/scripts/validate_dependency_resolver.py
~~~

GitHub Actions runs the architecture-link, capability-manifest, Permission Manager, execution-contract, Dependency Resolver, application-test, and type-check validations for the configured change paths. Run the relevant checks locally before opening a pull request.

## Contact, feedback, and security reporting status

The Contact and Feedback pages are status-only. Their previous form controls did not connect to a delivery service; they have been removed. No message is transmitted or stored by those pages. A direct human-contact channel and a dedicated secure vulnerability-reporting channel are not currently verified. Do not submit sensitive information, exploit details, credentials, or formal notices through the public Agent.

## Repository change rules

- Keep PRSL-AI platform work in this repository.
- Keep iRiel AppWeb implementation work in its separate repository and Lovable project.
- Do not copy .env files, credentials, provider tokens, or private runtime state between projects.
- Preserve published Lovable-connected Git history; never force-push or rewrite published commits.
- Update architecture documentation when contracts, responsibilities, or implementation status change.
- State clearly whether work is **specified**, **implemented**, **verified**, **available**, **planned**, or **blocked**.

---

**Robert Software Labs**  
**PRSL-AI Ecosystem**  
*Accessibility. Inclusion. Security. Human-centered intelligence.*
