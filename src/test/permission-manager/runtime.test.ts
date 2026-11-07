import { describe, expect, it, vi } from "vitest";
import {
  PermissionManagerRuntime,
  type AuthenticatedPrincipal,
  type PermissionManagerPorts,
  type PermissionRequest,
  type RegisteredCapability,
} from "@/lib/permission-manager/runtime";

const request: PermissionRequest = {
  schema_version: "1.0",
  request_id: "4d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11",
  subject: { principal_type: "user", principal_id: "user-01", session_id: "session-01" },
  capability_id: "prsl.agent.vision.analyze-image",
  permission_id: "media.read",
  action: "read_user_selected_image",
  resource_scope: { resource_type: "image", scope_mode: "exact", resource_ids: ["media-01"] },
  purpose: { purpose_id: "understand_image", description: "Describe the selected image." },
  data_classification: "personal",
  execution_mode: "on_device",
  requested_duration: { kind: "seconds", seconds: 60 },
};
const principal: AuthenticatedPrincipal = {
  ...request.subject,
  authentication_method: "verified-test-session",
  audit_subject_ref: "subject-hash:test-user-01",
};
const capability: RegisteredCapability = {
  registry_id: "registry-vision-01",
  manifest_digest: "sha256:synthetic",
  digest_verified: true,
  registered: true,
  validation_status: "passing",
  review_status: "approved",
  manifest: {
    capability_id: request.capability_id,
    lifecycle_status: "verified",
    permissions: ["media.read"],
    dependencies: { permission: [{ id: "media.read", required: true }] },
    execution_policy: {
      execution_modes: ["on_device"],
      confirmation_required: false,
      timeout_ms: 30000,
    },
  },
};
const policy = {
  allowed: true,
  policy_version: "test-policy-1",
  reason_code: "AUTHORIZED",
  approved_scope: request.resource_scope,
  consent_required: false,
  native_permission_required: false,
  remote_disclosure_required: false,
};

function ports(overrides: Partial<PermissionManagerPorts> = {}): PermissionManagerPorts {
  const base: PermissionManagerPorts = {
    authenticator: { authenticate: vi.fn(async () => principal) },
    registry: { resolve: vi.fn(async () => capability) },
    policy: { evaluate: vi.fn(async () => policy) },
    confirmation: {
      verify: vi.fn(async () => ({ status: "valid", evidence_ref: "confirmation:test" }) as const),
    },
    consent: {
      verify: vi.fn(async () => ({ status: "valid", evidence_ref: "consent:test" }) as const),
    },
    nativePermissions: {
      verify: vi.fn(async () => ({ status: "granted", evidence_ref: "native:test" }) as const),
    },
    remoteDisclosure: {
      verify: vi.fn(async () => ({ status: "valid", evidence_ref: "disclosure:test" }) as const),
    },
    decisionAuthority: {
      issue: vi.fn(async (decision) => decision),
      verifyAndConsume: vi.fn(async () => "valid" as const),
    },
    audit: { record: vi.fn(async () => undefined) },
  };
  return {
    ...base,
    ...overrides,
    authenticator: overrides.authenticator ?? base.authenticator,
    registry: overrides.registry ?? base.registry,
    policy: overrides.policy ?? base.policy,
    confirmation: overrides.confirmation ?? base.confirmation,
    consent: overrides.consent ?? base.consent,
    nativePermissions: overrides.nativePermissions ?? base.nativePermissions,
    remoteDisclosure: overrides.remoteDisclosure ?? base.remoteDisclosure,
    decisionAuthority: overrides.decisionAuthority ?? base.decisionAuthority,
    audit: overrides.audit ?? base.audit,
  };
}
function runtime(p: PermissionManagerPorts, timeoutMs = 30000) {
  const wired: PermissionManagerPorts = {
    ...p,
    registry: {
      resolve: async (id) => {
        const found = await p.registry.resolve(id);
        return found
          ? {
              ...found,
              manifest: {
                ...found.manifest,
                execution_policy: {
                  ...found.manifest.execution_policy,
                  timeout_ms: Math.min(timeoutMs, found.manifest.execution_policy.timeout_ms),
                },
              },
            }
          : null;
      },
    },
  };
  return new PermissionManagerRuntime({
    ports: wired,
    now: () => new Date("2026-11-07T20:00:00.000Z"),
    createId: () => "5d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11",
  });
}

describe("PermissionManagerRuntime.evaluate", () => {
  it("issues a short-lived single-use grant after all checks pass", async () => {
    const p = ports();
    const result = await runtime(p, 5000).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status !== "issued") return;
    expect(result.decision.status).toBe("granted");
    expect(result.decision.single_use).toBe(true);
    expect(result.decision.approved_scope).toEqual(request.resource_scope);
    expect(Date.parse(result.decision.expires_at!) - Date.parse(result.decision.issued_at)).toBe(
      5000,
    );
    expect(p.decisionAuthority.issue).toHaveBeenCalledOnce();
    expect(p.audit.record).toHaveBeenCalledOnce();
    expect(p.audit.record).toHaveBeenCalledWith(
      expect.objectContaining({ subject_ref: "subject-hash:test-user-01" }),
    );
  });
  it("rejects malformed requests and unknown fields before authentication", async () => {
    const p = ports();
    const result = await runtime(p).evaluate({ ...request, unexpected: true }, {});
    expect(result).toEqual({ status: "rejected", reason_code: "INVALID_REQUEST" });
    expect(p.authenticator.authenticate).not.toHaveBeenCalled();
    expect(p.decisionAuthority.issue).not.toHaveBeenCalled();
  });
  it("rejects an unauthenticated principal before registry lookup", async () => {
    const p = ports({
      authenticator: { authenticate: vi.fn(async () => ({ ...principal, principal_id: "other" })) },
    });
    expect(await runtime(p).evaluate(request, {})).toEqual({
      status: "rejected",
      reason_code: "SUBJECT_UNAUTHENTICATED",
    });
    expect(p.registry.resolve).not.toHaveBeenCalled();
  });
  it("blocks a registered capability that is not verified", async () => {
    const p = ports({
      registry: {
        resolve: vi.fn(async () => ({
          ...capability,
          manifest: { ...capability.manifest, lifecycle_status: "specified" as const },
        })),
      },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") {
      expect(result.decision.status).toBe("policy_blocked");
      expect(result.decision.reason_code).toBe("CAPABILITY_NOT_VERIFIED");
      expect(result.decision.approved_scope).toBeUndefined();
    }
    expect(p.policy.evaluate).not.toHaveBeenCalled();
  });
  it("blocks registry records whose manifest digest has not been verified", async () => {
    const p = ports({
      registry: {
        resolve: vi.fn(async () => ({ ...capability, digest_verified: false })),
      },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued")
      expect(result.decision.reason_code).toBe("CAPABILITY_DIGEST_NOT_VERIFIED");
    expect(p.policy.evaluate).not.toHaveBeenCalled();
  });
  it("requires explicit user confirmation when the capability policy requires it", async () => {
    const p = ports({
      registry: {
        resolve: vi.fn(async () => ({
          ...capability,
          manifest: {
            ...capability.manifest,
            execution_policy: {
              ...capability.manifest.execution_policy,
              confirmation_required: true,
            },
          },
        })),
      },
      confirmation: { verify: vi.fn(async () => ({ status: "required" as const })) },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") {
      expect(result.decision.status).toBe("consent_required");
      expect(result.decision.reason_code).toBe("USER_CONFIRMATION_REQUIRED");
    }
    expect(p.consent.verify).not.toHaveBeenCalled();
  });
  it("rejects location requests that omit the requested precision", async () => {
    const locationRequest = {
      ...request,
      permission_id: "location.coarse",
      resource_scope: {
        resource_type: "location",
        scope_mode: "bounded",
        boundary: "current area",
      },
    };
    const p = ports();
    expect(await runtime(p).evaluate(locationRequest, {})).toEqual({
      status: "rejected",
      reason_code: "INVALID_REQUEST",
    });
    expect(p.authenticator.authenticate).not.toHaveBeenCalled();
  });
  it("blocks permissions absent from the registered manifest", async () => {
    const p = ports({
      registry: {
        resolve: vi.fn(async () => ({
          ...capability,
          manifest: { ...capability.manifest, permissions: [] },
        })),
      },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued")
      expect(result.decision.reason_code).toBe("PERMISSION_NOT_DECLARED");
  });
  it("rejects a policy-approved scope that widens the requested resources", async () => {
    const broadRequest: PermissionRequest = {
      ...request,
      resource_scope: { ...request.resource_scope, resource_ids: ["media-01", "media-02"] },
    };
    const p = ports({
      policy: {
        evaluate: vi.fn(async () => ({
          ...policy,
          approved_scope: { ...request.resource_scope, resource_ids: ["media-01", "media-03"] },
        })),
      },
    });
    const result = await runtime(p).evaluate(broadRequest, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") {
      expect(result.decision.status).toBe("policy_blocked");
      expect(result.decision.reason_code).toBe("POLICY_SCOPE_MISSING_OR_WIDENED");
    }
  });
  it("issues a policy-blocked result when policy denies", async () => {
    const p = ports({
      policy: {
        evaluate: vi.fn(async () => ({
          ...policy,
          allowed: false,
          reason_code: "REMOTE_POLICY_BLOCKED",
        })),
      },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") {
      expect(result.decision.status).toBe("policy_blocked");
      expect(result.decision.reason_code).toBe("REMOTE_POLICY_BLOCKED");
    }
  });
  it("does not grant when required consent is absent", async () => {
    const p = ports({
      policy: { evaluate: vi.fn(async () => ({ ...policy, consent_required: true })) },
      consent: { verify: vi.fn(async () => ({ status: "required" as const })) },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") expect(result.decision.status).toBe("consent_required");
  });
  it("fails closed when consent is revoked", async () => {
    const p = ports({
      policy: { evaluate: vi.fn(async () => ({ ...policy, consent_required: true })) },
      consent: { verify: vi.fn(async () => ({ status: "revoked" as const })) },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") expect(result.decision.reason_code).toBe("CONSENT_NOT_VALID");
  });
  it("requires a separate remote-disclosure authorization", async () => {
    const remote: PermissionRequest = {
      ...request,
      execution_mode: "remote",
      resource_scope: { ...request.resource_scope, recipient: "provider:approved-service" },
    };
    const remoteCapability: RegisteredCapability = {
      ...capability,
      manifest: {
        ...capability.manifest,
        permissions: ["media.read", "data.remote_disclose"],
        dependencies: {
          permission: [
            { id: "media.read", required: true },
            { id: "data.remote_disclose", required: true },
          ],
        },
        execution_policy: { ...capability.manifest.execution_policy, execution_modes: ["remote"] },
      },
    };
    const p = ports({
      registry: { resolve: vi.fn(async () => remoteCapability) },
      policy: {
        evaluate: vi.fn(async () => ({ ...policy, approved_scope: remote.resource_scope })),
      },
      remoteDisclosure: { verify: vi.fn(async () => ({ status: "required" as const })) },
    });
    const result = await runtime(p).evaluate(remote, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued") {
      expect(result.decision.status).toBe("policy_blocked");
      expect(result.decision.reason_code).toBe("REMOTE_DISCLOSURE_NOT_AUTHORIZED");
    }
  });
  it("requires native host permission independently", async () => {
    const p = ports({
      policy: { evaluate: vi.fn(async () => ({ ...policy, native_permission_required: true })) },
      nativePermissions: { verify: vi.fn(async () => ({ status: "required" as const })) },
    });
    const result = await runtime(p).evaluate(request, {});
    expect(result.status).toBe("issued");
    if (result.status === "issued")
      expect(result.decision.status).toBe("platform_permission_required");
  });
  it("rejects an issuer that widens the approved scope", async () => {
    const p = ports({
      decisionAuthority: {
        issue: vi.fn(async (d) => ({
          ...d,
          approved_scope: { ...request.resource_scope, resource_ids: ["media-01", "media-02"] },
        })),
        verifyAndConsume: vi.fn(async () => "valid" as const),
      },
    });
    expect(await runtime(p).evaluate(request, {})).toEqual({
      status: "rejected",
      reason_code: "DECISION_AUTHORITY_UNVERIFIABLE",
    });
  });
  it("does not issue when audit is unavailable", async () => {
    const p = ports({
      audit: {
        record: vi.fn(async () => {
          throw new Error("unavailable");
        }),
      },
    });
    expect(await runtime(p).evaluate(request, {})).toEqual({
      status: "rejected",
      reason_code: "RUNTIME_DEPENDENCY_UNAVAILABLE",
    });
    expect(p.decisionAuthority.issue).not.toHaveBeenCalled();
  });
  it("fails closed when a required dependency throws", async () => {
    const p = ports({
      policy: {
        evaluate: vi.fn(async () => {
          throw new Error("offline");
        }),
      },
    });
    expect(await runtime(p).evaluate(request, {})).toEqual({
      status: "rejected",
      reason_code: "RUNTIME_DEPENDENCY_UNAVAILABLE",
    });
  });
});

describe("PermissionManagerRuntime.verifyForExecution", () => {
  it("rechecks policy and atomically consumes the one-time decision", async () => {
    const p = ports();
    expect(
      await runtime(p).verifyForExecution("5d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11", request, {}),
    ).toEqual({ eligible: true, decision_id: "5d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11" });
    expect(p.policy.evaluate).toHaveBeenCalledOnce();
    expect(p.decisionAuthority.verifyAndConsume).toHaveBeenCalledOnce();
  });
  it("rejects replayed decisions", async () => {
    const p = ports({
      decisionAuthority: {
        issue: vi.fn(async (d) => d),
        verifyAndConsume: vi.fn(async () => "replayed" as const),
      },
    });
    expect(
      await runtime(p).verifyForExecution("5d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11", request, {}),
    ).toEqual({ eligible: false, reason_code: "DECISION_REPLAYED" });
  });
  it("rejects execution when current policy changes to deny", async () => {
    const p = ports({
      policy: {
        evaluate: vi.fn(async () => ({ ...policy, allowed: false, reason_code: "POLICY_CHANGED" })),
      },
    });
    expect(
      await runtime(p).verifyForExecution("5d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11", request, {}),
    ).toEqual({ eligible: false, reason_code: "POLICY_CHANGED" });
    expect(p.decisionAuthority.verifyAndConsume).not.toHaveBeenCalled();
  });
});
