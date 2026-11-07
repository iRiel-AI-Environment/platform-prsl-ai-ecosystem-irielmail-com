/**
 * PRSL-AI Permission Manager decision-binding gate.
 *
 * This module checks whether a decision returned by a trusted Permission
 * Manager is bound to the exact invocation. It does NOT authenticate the
 * decision, issue grants, collect consent, inspect native OS permissions,
 * or replace server-side policy enforcement.
 *
 * Never treat this validator as proof of authorization. Protected resource
 * access must remain behind a trusted server/host boundary.
 */

export type ExecutionMode = "on_device" | "remote" | "hybrid";

export interface PermissionSubject {
  principal_type: "user" | "system";
  principal_id: string;
  session_id?: string | null;
}

export interface PermissionPurpose {
  purpose_id: string;
  description: string;
}

export interface RetentionScope {
  duration_seconds: number;
  storage_scope: string;
  deletion_trigger?: "expiry" | "user_revocation" | "operation_completion";
}

export interface PermissionResourceScope {
  resource_type: string;
  scope_mode: "exact" | "bounded";
  resource_ids?: string[];
  boundary?: string;
  precision?: "coarse" | "precise" | "not_applicable";
  recipient?: string;
  retention?: RetentionScope;
}

export interface PermissionRequest {
  schema_version: "1.0";
  request_id: string;
  subject: PermissionSubject;
  capability_id: string;
  permission_id: string;
  action: string;
  resource_scope: PermissionResourceScope;
  purpose: PermissionPurpose;
  execution_mode: ExecutionMode;
  requested_duration: { kind: "single_operation" } | { kind: "seconds"; seconds: number };
}

export interface PermissionDecision {
  schema_version: "1.0";
  decision_id: string;
  request_id: string;
  status:
    | "granted"
    | "denied"
    | "consent_required"
    | "platform_permission_required"
    | "policy_blocked"
    | "revoked"
    | "indeterminate";
  subject: PermissionSubject;
  capability_id: string;
  permission_id: string;
  approved_scope?: PermissionResourceScope;
  purpose: PermissionPurpose;
  execution_mode?: ExecutionMode;
  issued_at: string;
  expires_at?: string;
  single_use?: boolean;
  policy_version: string;
  reason_code: string;
}

export type DecisionGateFailure =
  | "SCHEMA_VERSION_MISMATCH"
  | "DECISION_NOT_GRANTED"
  | "REQUEST_BINDING_MISMATCH"
  | "SUBJECT_MISMATCH"
  | "CAPABILITY_MISMATCH"
  | "PERMISSION_MISMATCH"
  | "PURPOSE_MISMATCH"
  | "EXECUTION_MODE_MISMATCH"
  | "SCOPE_MISSING"
  | "SCOPE_WIDENED"
  | "INVALID_TIME_WINDOW"
  | "DECISION_NOT_YET_VALID"
  | "DECISION_EXPIRED"
  | "NOT_SINGLE_USE";

export type DecisionGateResult =
  | { eligible: true; decision_id: string; request_id: string }
  | { eligible: false; reason: DecisionGateFailure };

const MAX_SINGLE_OPERATION_TTL_SECONDS = 900;

/**
 * Performs deterministic request/decision binding checks.
 * "eligible" means only that the supplied grant matches this request;
 * it is not an authorization token and does not prove decision authenticity.
 * The caller must separately authenticate, validate, and consume the decision.
 */
export function validateDecisionBinding(
  request: PermissionRequest,
  decision: PermissionDecision,
  now: Date = new Date(),
): DecisionGateResult {
  if (request.schema_version !== "1.0" || decision.schema_version !== "1.0") {
    return fail("SCHEMA_VERSION_MISMATCH");
  }
  if (decision.status !== "granted") {
    return fail("DECISION_NOT_GRANTED");
  }
  if (decision.request_id !== request.request_id) {
    return fail("REQUEST_BINDING_MISMATCH");
  }

  if (
    decision.subject.principal_type !== request.subject.principal_type ||
    decision.subject.principal_id !== request.subject.principal_id ||
    (decision.subject.session_id ?? null) !== (request.subject.session_id ?? null)
  ) {
    return fail("SUBJECT_MISMATCH");
  }

  if (decision.capability_id !== request.capability_id) {
    return fail("CAPABILITY_MISMATCH");
  }
  if (decision.permission_id !== request.permission_id) {
    return fail("PERMISSION_MISMATCH");
  }
  if (
    decision.purpose.purpose_id !== request.purpose.purpose_id ||
    decision.purpose.description !== request.purpose.description
  ) {
    return fail("PURPOSE_MISMATCH");
  }

  if (decision.execution_mode !== request.execution_mode) {
    return fail("EXECUTION_MODE_MISMATCH");
  }

  if (!decision.approved_scope) {
    return fail("SCOPE_MISSING");
  }
  if (!isScopeNoBroaderThan(decision.approved_scope, request.resource_scope)) {
    return fail("SCOPE_WIDENED");
  }

  const issuedAt = Date.parse(decision.issued_at);
  const expiresAt = decision.expires_at ? Date.parse(decision.expires_at) : Number.NaN;
  const nowMs = now.getTime();

  if (
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(expiresAt) ||
    !Number.isFinite(nowMs) ||
    expiresAt <= issuedAt
  ) {
    return fail("INVALID_TIME_WINDOW");
  }

  if (nowMs < issuedAt) {
    return fail("DECISION_NOT_YET_VALID");
  }
  if (nowMs >= expiresAt) {
    return fail("DECISION_EXPIRED");
  }
  if (decision.single_use !== true) {
    return fail("NOT_SINGLE_USE");
  }

  const maximumDurationSeconds =
    request.requested_duration.kind === "seconds"
      ? request.requested_duration.seconds
      : MAX_SINGLE_OPERATION_TTL_SECONDS;
  if (expiresAt - issuedAt > maximumDurationSeconds * 1000) {
    return fail("INVALID_TIME_WINDOW");
  }

  return { eligible: true, decision_id: decision.decision_id, request_id: request.request_id };
}

function isScopeNoBroaderThan(
  approved: PermissionResourceScope,
  requested: PermissionResourceScope,
): boolean {
  if (approved.resource_type !== requested.resource_type) {
    return false;
  }
  if (approved.scope_mode !== requested.scope_mode) {
    return false;
  }

  if (requested.scope_mode === "exact") {
    const requestedIds = requested.resource_ids ?? [];
    const approvedIds = approved.resource_ids ?? [];
    if (requestedIds.length === 0 || approvedIds.length === 0) {
      return false;
    }
    if (new Set(requestedIds).size !== requestedIds.length) {
      return false;
    }
    if (new Set(approvedIds).size !== approvedIds.length) {
      return false;
    }
    if (!approvedIds.every((id) => requestedIds.includes(id))) {
      return false;
    }
  } else if (approved.boundary !== requested.boundary || !approved.boundary) {
    return false;
  }

  if (approved.precision !== requested.precision) {
    if (approved.precision === "not_applicable" || requested.precision === "not_applicable") {
      return false;
    }
    if (approved.precision !== "coarse" || requested.precision !== "precise") {
      return false;
    }
  }

  if (requested.recipient !== approved.recipient) {
    return false;
  }

  if (requested.retention) {
    if (!approved.retention) {
      return false;
    }
    if (approved.retention.storage_scope !== requested.retention.storage_scope) {
      return false;
    }
    if (approved.retention.duration_seconds > requested.retention.duration_seconds) {
      return false;
    }
    if (
      requested.retention.deletion_trigger &&
      approved.retention.deletion_trigger !== requested.retention.deletion_trigger
    ) {
      return false;
    }
  } else if (approved.retention) {
    return false;
  }

  return true;
}

function fail(reason: DecisionGateFailure): DecisionGateResult {
  return { eligible: false, reason };
}
