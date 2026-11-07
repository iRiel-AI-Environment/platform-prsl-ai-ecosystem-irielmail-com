import { describe, expect, it } from "vitest";
import {
  validateDecisionBinding,
  type PermissionDecision,
  type PermissionRequest,
} from "@/lib/permission-manager/decision-gate";

const request: PermissionRequest = {
  schema_version: "1.0",
  request_id: "4d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11",
  subject: { principal_type: "user", principal_id: "user-01", session_id: "session-01" },
  capability_id: "prsl.agent.vision.analyze-image",
  permission_id: "media.read",
  action: "read_user_selected_image",
  resource_scope: {
    resource_type: "image",
    scope_mode: "exact",
    resource_ids: ["media-01", "media-02"],
    precision: "not_applicable",
  },
  purpose: { purpose_id: "understand_image", description: "Describe the selected image." },
  execution_mode: "on_device",
  requested_duration: { kind: "seconds", seconds: 60 },
};

const decision: PermissionDecision = {
  schema_version: "1.0",
  decision_id: "5d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11",
  request_id: request.request_id,
  status: "granted",
  subject: request.subject,
  capability_id: request.capability_id,
  permission_id: request.permission_id,
  approved_scope: {
    resource_type: "image",
    scope_mode: "exact",
    resource_ids: ["media-01"],
    precision: "not_applicable",
  },
  purpose: request.purpose,
  execution_mode: "on_device",
  issued_at: "2026-11-07T19:00:00.000Z",
  expires_at: "2026-11-07T19:00:30.000Z",
  single_use: true,
  policy_version: "1.0",
  reason_code: "AUTHORIZED",
};

const now = new Date("2026-11-07T19:00:10.000Z");

describe("validateDecisionBinding", () => {
  it("accepts a matching, narrower, current single-use grant", () => {
    expect(validateDecisionBinding(request, decision, now)).toEqual({
      eligible: true,
      decision_id: decision.decision_id,
      request_id: request.request_id,
    });
  });

  it.each([
    ["schema version mismatch", { schema_version: "2.0" }, "SCHEMA_VERSION_MISMATCH"],
    ["non-granted decision", { status: "policy_blocked" }, "DECISION_NOT_GRANTED"],
    ["request correlation mismatch", { request_id: "other" }, "REQUEST_BINDING_MISMATCH"],
    [
      "subject mismatch",
      { subject: { ...request.subject, principal_id: "other" } },
      "SUBJECT_MISMATCH",
    ],
    [
      "capability mismatch",
      { capability_id: "prsl.agent.reader.extract-document-content" },
      "CAPABILITY_MISMATCH",
    ],
    ["permission mismatch", { permission_id: "camera.use" }, "PERMISSION_MISMATCH"],
    [
      "purpose mismatch",
      { purpose: { ...request.purpose, purpose_id: "other" } },
      "PURPOSE_MISMATCH",
    ],
    ["execution mode mismatch", { execution_mode: "remote" }, "EXECUTION_MODE_MISMATCH"],
    ["missing approved scope", { approved_scope: undefined }, "SCOPE_MISSING"],
    [
      "scope widening",
      { approved_scope: { ...decision.approved_scope, resource_ids: ["media-01", "other"] } },
      "SCOPE_WIDENED",
    ],
    ["future decision", { issued_at: "2026-11-07T19:00:20.000Z" }, "DECISION_NOT_YET_VALID"],
    ["expired decision", { expires_at: "2026-11-07T19:00:10.000Z" }, "DECISION_EXPIRED"],
    ["reusable decision", { single_use: false }, "NOT_SINGLE_USE"],
    ["excessive lifetime", { expires_at: "2026-11-07T19:02:00.000Z" }, "INVALID_TIME_WINDOW"],
  ] as const)("rejects %s", (_label, patch, reason) => {
    const candidate = { ...decision, ...patch } as PermissionDecision;
    expect(validateDecisionBinding(request, candidate, now)).toEqual({ eligible: false, reason });
  });

  it("rejects a session mismatch even when the principal matches", () => {
    const candidate = {
      ...decision,
      subject: { ...request.subject, session_id: "another-session" },
    };
    expect(validateDecisionBinding(request, candidate, now)).toEqual({
      eligible: false,
      reason: "SUBJECT_MISMATCH",
    });
  });

  it("rejects a more precise scope than requested", () => {
    const candidate = {
      ...decision,
      approved_scope: { ...decision.approved_scope!, precision: "precise" as const },
    };
    const coarseRequest = {
      ...request,
      resource_scope: { ...request.resource_scope, precision: "coarse" as const },
    };
    expect(validateDecisionBinding(coarseRequest, candidate, now)).toEqual({
      eligible: false,
      reason: "SCOPE_WIDENED",
    });
  });

  it("requires remote disclosure to preserve the exact recipient", () => {
    const remoteRequest: PermissionRequest = {
      ...request,
      permission_id: "data.remote_disclose",
      execution_mode: "remote",
      resource_scope: {
        resource_type: "document",
        scope_mode: "exact",
        resource_ids: ["document-01"],
        recipient: "provider:approved-service",
      },
    };
    const remoteDecision: PermissionDecision = {
      ...decision,
      permission_id: "data.remote_disclose",
      execution_mode: "remote",
      approved_scope: {
        ...remoteRequest.resource_scope,
        recipient: "provider:other-service",
      },
    };
    expect(validateDecisionBinding(remoteRequest, remoteDecision, now)).toEqual({
      eligible: false,
      reason: "SCOPE_WIDENED",
    });
  });

  it("does not allow a grant to extend retention or change storage scope", () => {
    const retentionRequest: PermissionRequest = {
      ...request,
      permission_id: "data.retain",
      resource_scope: {
        resource_type: "summary",
        scope_mode: "exact",
        resource_ids: ["summary-01"],
        retention: { duration_seconds: 3600, storage_scope: "private-space" },
      },
    };
    const retentionDecision: PermissionDecision = {
      ...decision,
      permission_id: "data.retain",
      approved_scope: {
        ...retentionRequest.resource_scope,
        retention: { duration_seconds: 7200, storage_scope: "private-space" },
      },
    };
    expect(validateDecisionBinding(retentionRequest, retentionDecision, now)).toEqual({
      eligible: false,
      reason: "SCOPE_WIDENED",
    });
  });

  it("rejects duplicate resource identifiers", () => {
    const duplicateRequest = {
      ...request,
      resource_scope: { ...request.resource_scope, resource_ids: ["media-01", "media-01"] },
    };
    expect(validateDecisionBinding(duplicateRequest, decision, now)).toEqual({
      eligible: false,
      reason: "SCOPE_WIDENED",
    });
  });
  it("rejects an inapplicable precision label for a coarse request", () => {
    const candidate = {
      ...decision,
      approved_scope: { ...decision.approved_scope!, precision: "not_applicable" as const },
    };
    const coarseRequest = {
      ...request,
      resource_scope: { ...request.resource_scope, precision: "coarse" as const },
    };
    expect(validateDecisionBinding(coarseRequest, candidate, now)).toEqual({
      eligible: false,
      reason: "SCOPE_WIDENED",
    });
  });
});
