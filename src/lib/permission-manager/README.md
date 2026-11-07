# Permission Manager Decision Gate

This module provides deterministic binding checks for a permission decision returned by a trusted Permission Manager.

## Security boundary

The gate checks request correlation, subject and session, capability, permission, purpose, execution mode, scope non-expansion, validity window, and the decision's `single_use` flag. It fails closed when any binding does not match.

**This is not the Permission Manager service and does not issue authorization.** It does not authenticate a decision, collect or verify consent, resolve trusted registry state, evaluate policy, inspect native operating-system grants, sign tokens, consume single-use decisions, prevent replay, persist revocation state, or produce an audit record. A positive result means only that the supplied decision is structurally eligible for a subsequent trusted execution-boundary check.

Do not use this module in a browser as an authorization authority. Protected resource access must remain server/host-side and must verify decision authenticity, enforce one-time consumption, and check current revocation/policy state independently.

## Current implementation status

- Decision-to-request binding validator: implemented as a pure TypeScript function.
- Contract tests: implemented.
- Trusted Permission Manager transport and decision authentication: not implemented.
- Consent, policy, registry, native permission, revocation, token integrity, replay protection, and audit adapters: not implemented.
- Production authorization: **not available**; protected execution remains fail-closed.

## Validation

Run `bun run test` from the repository root.
