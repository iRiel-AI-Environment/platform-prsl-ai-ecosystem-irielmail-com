import { z } from "zod";

const permissionIds = [
  "media.read",
  "camera.use",
  "microphone.use",
  "location.coarse",
  "location.precise",
  "files.read",
  "files.write",
  "notifications.schedule",
  "network.access",
  "data.remote_disclose",
  "data.retain",
  "tools.execute",
  "system.invoke",
  "accessibility.read",
  "speech.output",
] as const;
const executionModes = ["on_device", "remote", "hybrid"] as const;
const principalSchema = z
  .object({
    principal_type: z.enum(["user", "system"]),
    principal_id: z.string().min(1).max(160),
    session_id: z.string().max(160).nullable().optional(),
  })
  .strict();
const resourceScopeSchema = z
  .object({
    resource_type: z.string().min(1).max(100),
    scope_mode: z.enum(["exact", "bounded"]),
    resource_ids: z.array(z.string().min(1).max(512)).min(1).optional(),
    boundary: z.string().min(1).max(512).optional(),
    precision: z.enum(["coarse", "precise", "not_applicable"]).optional(),
    recipient: z.string().min(1).max(256).optional(),
    retention: z
      .object({
        duration_seconds: z.number().int().min(1).max(31536000),
        storage_scope: z.string().min(1).max(256),
        deletion_trigger: z.enum(["expiry", "user_revocation", "operation_completion"]).optional(),
      })
      .strict()
      .optional(),
  })
  .strict()
  .superRefine((scope, ctx) => {
    if (scope.scope_mode === "exact" && !scope.resource_ids?.length)
      ctx.addIssue({
        code: "custom",
        message: "Exact scope requires resource_ids.",
        path: ["resource_ids"],
      });
    if (scope.scope_mode === "bounded" && !scope.boundary)
      ctx.addIssue({
        code: "custom",
        message: "Bounded scope requires boundary.",
        path: ["boundary"],
      });
    if (scope.resource_ids && new Set(scope.resource_ids).size !== scope.resource_ids.length)
      ctx.addIssue({
        code: "custom",
        message: "Resource identifiers must be unique.",
        path: ["resource_ids"],
      });
  });
const purposeSchema = z
  .object({
    purpose_id: z.string().regex(/^[a-z][a-z0-9_.-]{1,79}$/),
    description: z.string().min(1).max(500),
  })
  .strict();

export const permissionRequestSchema = z
  .object({
    schema_version: z.literal("1.0"),
    request_id: z.string().uuid(),
    subject: principalSchema,
    capability_id: z
      .string()
      .regex(
        /^prsl\.(agent|integration)\.[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$/,
      ),
    permission_id: z.enum(permissionIds),
    action: z.string().min(1).max(160),
    resource_scope: resourceScopeSchema,
    purpose: purposeSchema,
    data_classification: z.enum(["public", "internal", "personal", "sensitive", "restricted"]),
    execution_mode: z.enum(executionModes),
    requested_duration: z.discriminatedUnion("kind", [
      z.object({ kind: z.literal("single_operation") }).strict(),
      z.object({ kind: z.literal("seconds"), seconds: z.number().int().min(1).max(900) }).strict(),
    ]),
    context_ref: z.string().min(1).max(256).optional(),
  })
  .strict()
  .superRefine((request, ctx) => {
    if (request.permission_id === "data.remote_disclose") {
      if (!request.resource_scope.recipient)
        ctx.addIssue({
          code: "custom",
          message: "Remote disclosure must bind a recipient.",
          path: ["resource_scope", "recipient"],
        });
      if (request.execution_mode === "on_device")
        ctx.addIssue({
          code: "custom",
          message: "Remote disclosure requires remote or hybrid execution.",
          path: ["execution_mode"],
        });
    }
    if (
      request.permission_id === "location.coarse" &&
      request.resource_scope.precision !== "coarse"
    )
      ctx.addIssue({
        code: "custom",
        message: "Coarse location permission requires coarse precision.",
        path: ["resource_scope", "precision"],
      });
    if (
      request.permission_id === "location.precise" &&
      request.resource_scope.precision !== "precise"
    )
      ctx.addIssue({
        code: "custom",
        message: "Precise location permission requires precise precision.",
        path: ["resource_scope", "precision"],
      });
    if (request.resource_scope.retention && request.permission_id !== "data.retain")
      ctx.addIssue({
        code: "custom",
        message: "Retention scope requires data.retain permission.",
        path: ["resource_scope", "retention"],
      });
    if (request.resource_scope.recipient && request.execution_mode === "on_device")
      ctx.addIssue({
        code: "custom",
        message: "A remote recipient cannot be bound to on-device execution.",
        path: ["resource_scope", "recipient"],
      });
    if (
      request.execution_mode !== "on_device" &&
      ["personal", "sensitive", "restricted"].includes(request.data_classification) &&
      !request.resource_scope.recipient
    )
      ctx.addIssue({
        code: "custom",
        message: "Protected remote processing requires an exact recipient.",
        path: ["resource_scope", "recipient"],
      });
    if (request.permission_id === "data.retain" && !request.resource_scope.retention)
      ctx.addIssue({
        code: "custom",
        message: "Retention requires an explicit retention scope.",
        path: ["resource_scope", "retention"],
      });
  });

const decisionStatus = z.enum([
  "granted",
  "denied",
  "consent_required",
  "platform_permission_required",
  "policy_blocked",
  "revoked",
  "indeterminate",
]);
const permissionDecisionSchema = z
  .object({
    schema_version: z.literal("1.0"),
    decision_id: z.string().uuid(),
    request_id: z.string().uuid(),
    status: decisionStatus,
    subject: principalSchema,
    capability_id: z.string(),
    permission_id: z.enum(permissionIds),
    approved_scope: resourceScopeSchema.optional(),
    purpose: purposeSchema,
    execution_mode: z.enum(executionModes).optional(),
    issued_at: z.string().datetime({ offset: true }),
    expires_at: z.string().datetime({ offset: true }).optional(),
    single_use: z.boolean().optional(),
    policy_version: z.string().min(1).max(80),
    evidence_refs: z.array(z.string().min(1).max(256)).max(100).optional(),
    reason_code: z.string().regex(/^[A-Z][A-Z0-9_]{1,79}$/),
    explanation: z.string().max(1000).optional(),
  })
  .strict()
  .superRefine((decision, ctx) => {
    if (decision.status === "granted") {
      if (!decision.approved_scope)
        ctx.addIssue({
          code: "custom",
          message: "Grant requires approved_scope.",
          path: ["approved_scope"],
        });
      if (!decision.execution_mode)
        ctx.addIssue({
          code: "custom",
          message: "Grant requires execution_mode.",
          path: ["execution_mode"],
        });
      if (!decision.expires_at)
        ctx.addIssue({ code: "custom", message: "Grant requires expiry.", path: ["expires_at"] });
      if (decision.single_use !== true)
        ctx.addIssue({
          code: "custom",
          message: "Grant must be single-use.",
          path: ["single_use"],
        });
      if (decision.expires_at && Date.parse(decision.expires_at) <= Date.parse(decision.issued_at))
        ctx.addIssue({
          code: "custom",
          message: "Expiry must follow issue time.",
          path: ["expires_at"],
        });
    } else if (decision.approved_scope) {
      ctx.addIssue({
        code: "custom",
        message: "Non-granted decisions cannot include approved_scope.",
        path: ["approved_scope"],
      });
    }
  });

export type PermissionRequest = z.infer<typeof permissionRequestSchema>;
export type PermissionDecision = z.infer<typeof permissionDecisionSchema>;
export type PermissionId = (typeof permissionIds)[number];
export type DecisionStatus = z.infer<typeof decisionStatus>;
export type Principal = z.infer<typeof principalSchema>;
export type ResourceScope = z.infer<typeof resourceScopeSchema>;

export interface AuthenticatedPrincipal extends Principal {
  authentication_method: string;
  audit_subject_ref: string;
}
export interface RegisteredCapability {
  registry_id: string;
  manifest_digest: string;
  digest_verified: boolean;
  registered: boolean;
  validation_status: "passing" | "failing" | "pending";
  review_status: "approved" | "rejected" | "pending";
  manifest: {
    capability_id: string;
    lifecycle_status:
      "proposed" | "specified" | "in_development" | "implemented" | "verified" | "deprecated";
    permissions: string[];
    dependencies: { permission: Array<{ id: string; required: boolean }> };
    execution_policy: {
      execution_modes: Array<(typeof executionModes)[number]>;
      confirmation_required: boolean;
      timeout_ms: number;
    };
  };
}
export interface PolicyEvaluation {
  allowed: boolean;
  policy_version: string;
  reason_code: string;
  approved_scope?: ResourceScope;
  consent_required: boolean;
  native_permission_required: boolean;
  remote_disclosure_required: boolean;
  explanation?: string;
}
export type ConfirmationVerification =
  | { status: "valid"; evidence_ref: string }
  | { status: "required" | "denied" | "mismatch" | "unavailable" };
export type ConsentVerification =
  | { status: "valid"; evidence_ref: string }
  | { status: "required" | "expired" | "revoked" | "mismatch" | "unavailable" };
export type NativePermissionVerification =
  | { status: "granted"; evidence_ref?: string }
  | { status: "not_applicable" }
  | { status: "required" | "denied" | "unavailable" };
export type DecisionVerification =
  "valid" | "revoked" | "expired" | "replayed" | "mismatch" | "unavailable";

export interface PermissionAuditEvent {
  event_type: "decision_issuance_requested" | "execution_verification";
  request_id: string;
  decision_id?: string;
  subject_ref: string;
  capability_id: string;
  permission_id: PermissionId;
  status: string;
  reason_code: string;
  policy_version?: string;
  occurred_at: string;
}
export interface PermissionManagerPorts {
  authenticator: { authenticate(authContext: unknown): Promise<AuthenticatedPrincipal | null> };
  registry: { resolve(capabilityId: string): Promise<RegisteredCapability | null> };
  policy: {
    evaluate(
      request: PermissionRequest,
      capability: RegisteredCapability,
    ): Promise<PolicyEvaluation>;
  };
  confirmation: {
    verify(
      request: PermissionRequest,
      principal: AuthenticatedPrincipal,
    ): Promise<ConfirmationVerification>;
  };
  consent: {
    verify(
      request: PermissionRequest,
      principal: AuthenticatedPrincipal,
    ): Promise<ConsentVerification>;
  };
  nativePermissions: {
    verify(
      request: PermissionRequest,
      principal: AuthenticatedPrincipal,
    ): Promise<NativePermissionVerification>;
  };
  remoteDisclosure: {
    verify(
      request: PermissionRequest,
      principal: AuthenticatedPrincipal,
    ): Promise<ConsentVerification>;
  };
  decisionAuthority: {
    issue(decision: PermissionDecision): Promise<unknown>;
    verifyAndConsume(input: {
      decisionId: string;
      request: PermissionRequest;
      principal: AuthenticatedPrincipal;
      currentApprovedScope: ResourceScope;
      currentPolicyVersion: string;
      registryId: string;
      manifestDigest: string;
    }): Promise<DecisionVerification>;
  };
  audit: { record(event: PermissionAuditEvent): Promise<void> };
}
export interface PermissionManagerRuntimeOptions {
  ports: PermissionManagerPorts;
  now?: () => Date;
  createId?: () => string;
}
export type EvaluationResult =
  { status: "issued"; decision: PermissionDecision } | { status: "rejected"; reason_code: string };
export type ExecutionVerificationResult =
  { eligible: true; decision_id: string } | { eligible: false; reason_code: string };

const MAX_GRANT_TTL_SECONDS = 900;

export class PermissionManagerRuntime {
  private readonly ports: PermissionManagerPorts;
  private readonly now: () => Date;
  private readonly createId: () => string;

  constructor(options: PermissionManagerRuntimeOptions) {
    this.ports = options.ports;
    this.now = options.now ?? (() => new Date());
    this.createId = options.createId ?? (() => crypto.randomUUID());
  }

  async evaluate(rawRequest: unknown, authContext: unknown): Promise<EvaluationResult> {
    const parsed = permissionRequestSchema.safeParse(rawRequest);
    if (!parsed.success) return { status: "rejected", reason_code: "INVALID_REQUEST" };
    const request = parsed.data;
    try {
      const principal = await this.ports.authenticator.authenticate(authContext);
      if (!principal || !principal.audit_subject_ref || !samePrincipal(principal, request.subject))
        return { status: "rejected", reason_code: "SUBJECT_UNAUTHENTICATED" };

      const capability = await this.ports.registry.resolve(request.capability_id);
      const registryFailure = validateRegistryCapability(capability, request);
      if (registryFailure)
        return this.issueNonGrant(
          request,
          principal,
          "policy_blocked",
          registryFailure,
          "registry-gate/1.0",
        );

      const policy = await this.ports.policy.evaluate(request, capability!);
      if (!policy.allowed)
        return this.issueNonGrant(
          request,
          principal,
          "policy_blocked",
          safeReason(policy.reason_code, "POLICY_BLOCKED"),
          policy.policy_version,
        );

      if (!scopeIsNoBroaderThan(policy.approved_scope, request.resource_scope))
        return this.issueNonGrant(
          request,
          principal,
          "policy_blocked",
          "POLICY_SCOPE_MISSING_OR_WIDENED",
          policy.policy_version,
        );

      const evidenceRefs: string[] = [
        "registry:" + capability!.registry_id + ":" + capability!.manifest_digest,
      ];
      if (capability!.manifest.execution_policy.confirmation_required) {
        const confirmation = await this.ports.confirmation.verify(request, principal);
        if (confirmation.status !== "valid") {
          const status =
            confirmation.status === "required"
              ? "consent_required"
              : confirmation.status === "unavailable"
                ? "indeterminate"
                : "policy_blocked";
          const reason =
            confirmation.status === "required"
              ? "USER_CONFIRMATION_REQUIRED"
              : confirmation.status === "unavailable"
                ? "USER_CONFIRMATION_UNAVAILABLE"
                : "USER_CONFIRMATION_NOT_VALID";
          return this.issueNonGrant(request, principal, status, reason, policy.policy_version);
        }
        evidenceRefs.push(confirmation.evidence_ref);
      }
      if (policy.consent_required) {
        const consent = await this.ports.consent.verify(request, principal);
        if (consent.status !== "valid") {
          const status =
            consent.status === "required"
              ? "consent_required"
              : consent.status === "unavailable"
                ? "indeterminate"
                : "policy_blocked";
          const reason =
            consent.status === "required"
              ? "CONSENT_REQUIRED"
              : consent.status === "unavailable"
                ? "CONSENT_EVIDENCE_UNAVAILABLE"
                : "CONSENT_NOT_VALID";
          return this.issueNonGrant(request, principal, status, reason, policy.policy_version);
        }
        evidenceRefs.push(consent.evidence_ref);
      }

      if (
        requiresRemoteDisclosure(request, policy) &&
        request.permission_id !== "data.remote_disclose"
      ) {
        const disclosure = await this.ports.remoteDisclosure.verify(request, principal);
        if (disclosure.status !== "valid") {
          const status = disclosure.status === "unavailable" ? "indeterminate" : "policy_blocked";
          const reason =
            disclosure.status === "unavailable"
              ? "REMOTE_DISCLOSURE_EVIDENCE_UNAVAILABLE"
              : "REMOTE_DISCLOSURE_NOT_AUTHORIZED";
          return this.issueNonGrant(request, principal, status, reason, policy.policy_version);
        }
        evidenceRefs.push(disclosure.evidence_ref);
      }

      if (policy.native_permission_required) {
        const native = await this.ports.nativePermissions.verify(request, principal);
        if (native.status !== "granted") {
          const status =
            native.status === "required" || native.status === "denied"
              ? "platform_permission_required"
              : "indeterminate";
          const reason =
            native.status === "unavailable"
              ? "NATIVE_PERMISSION_UNAVAILABLE"
              : "NATIVE_PERMISSION_REQUIRED";
          return this.issueNonGrant(request, principal, status, reason, policy.policy_version);
        }
        if (native.status === "granted" && native.evidence_ref)
          evidenceRefs.push(native.evidence_ref);
      }

      const issuedAt = this.now();
      const requestedTtl =
        request.requested_duration.kind === "seconds"
          ? request.requested_duration.seconds
          : MAX_GRANT_TTL_SECONDS;
      const ttlSeconds = Math.min(
        requestedTtl,
        MAX_GRANT_TTL_SECONDS,
        Math.floor(capability!.manifest.execution_policy.timeout_ms / 1000),
      );
      if (ttlSeconds < 1)
        return this.issueNonGrant(
          request,
          principal,
          "policy_blocked",
          "INVALID_CAPABILITY_TIMEOUT",
          policy.policy_version,
        );

      const payload: PermissionDecision = {
        schema_version: "1.0",
        decision_id: this.createId(),
        request_id: request.request_id,
        status: "granted",
        subject: request.subject,
        capability_id: request.capability_id,
        permission_id: request.permission_id,
        approved_scope: policy.approved_scope!,
        purpose: request.purpose,
        execution_mode: request.execution_mode,
        issued_at: issuedAt.toISOString(),
        expires_at: new Date(issuedAt.getTime() + ttlSeconds * 1000).toISOString(),
        single_use: true,
        policy_version: policy.policy_version,
        evidence_refs: evidenceRefs,
        reason_code: "AUTHORIZED",
      };
      return this.issue(payload, request, principal);
    } catch {
      return { status: "rejected", reason_code: "RUNTIME_DEPENDENCY_UNAVAILABLE" };
    }
  }

  async verifyForExecution(
    decisionId: string,
    rawRequest: unknown,
    authContext: unknown,
  ): Promise<ExecutionVerificationResult> {
    const parsed = permissionRequestSchema.safeParse(rawRequest);
    if (!parsed.success || !z.string().uuid().safeParse(decisionId).success)
      return { eligible: false, reason_code: "INVALID_EXECUTION_CONTEXT" };
    const request = parsed.data;
    try {
      const principal = await this.ports.authenticator.authenticate(authContext);
      if (!principal || !principal.audit_subject_ref || !samePrincipal(principal, request.subject))
        return { eligible: false, reason_code: "SUBJECT_UNAUTHENTICATED" };

      const capability = await this.ports.registry.resolve(request.capability_id);
      const registryFailure = validateRegistryCapability(capability, request);
      if (registryFailure) return { eligible: false, reason_code: registryFailure };

      const policy = await this.ports.policy.evaluate(request, capability!);
      if (!policy.allowed)
        return { eligible: false, reason_code: safeReason(policy.reason_code, "POLICY_BLOCKED") };
      if (!scopeIsNoBroaderThan(policy.approved_scope, request.resource_scope))
        return { eligible: false, reason_code: "POLICY_SCOPE_MISSING_OR_WIDENED" };

      if (capability!.manifest.execution_policy.confirmation_required) {
        const confirmation = await this.ports.confirmation.verify(request, principal);
        if (confirmation.status !== "valid")
          return { eligible: false, reason_code: "USER_CONFIRMATION_NOT_VALID" };
      }
      if (policy.consent_required) {
        const consent = await this.ports.consent.verify(request, principal);
        if (consent.status !== "valid")
          return { eligible: false, reason_code: "CONSENT_NOT_VALID" };
      }
      if (
        requiresRemoteDisclosure(request, policy) &&
        request.permission_id !== "data.remote_disclose"
      ) {
        const disclosure = await this.ports.remoteDisclosure.verify(request, principal);
        if (disclosure.status !== "valid")
          return { eligible: false, reason_code: "REMOTE_DISCLOSURE_NOT_AUTHORIZED" };
      }
      if (policy.native_permission_required) {
        const native = await this.ports.nativePermissions.verify(request, principal);
        if (native.status !== "granted")
          return { eligible: false, reason_code: "NATIVE_PERMISSION_NOT_VALID" };
      }

      // This trusted operation must atomically check revocation/expiry/binding
      // and consume the one-time decision. Read-then-consume is replayable.
      const verification = await this.ports.decisionAuthority.verifyAndConsume({
        decisionId,
        request,
        principal,
        currentApprovedScope: policy.approved_scope!,
        currentPolicyVersion: policy.policy_version,
        registryId: capability!.registry_id,
        manifestDigest: capability!.manifest_digest,
      });
      if (verification !== "valid")
        return { eligible: false, reason_code: "DECISION_" + verification.toUpperCase() };

      await this.ports.audit.record({
        event_type: "execution_verification",
        request_id: request.request_id,
        decision_id: decisionId,
        subject_ref: principal.audit_subject_ref,
        capability_id: request.capability_id,
        permission_id: request.permission_id,
        status: "eligible",
        reason_code: "VERIFIED_AND_CONSUMED",
        policy_version: policy.policy_version,
        occurred_at: this.now().toISOString(),
      });
      return { eligible: true, decision_id: decisionId };
    } catch {
      return { eligible: false, reason_code: "RUNTIME_DEPENDENCY_UNAVAILABLE" };
    }
  }

  private async issueNonGrant(
    request: PermissionRequest,
    principal: AuthenticatedPrincipal,
    status: Exclude<DecisionStatus, "granted">,
    reasonCode: string,
    policyVersion: string,
  ): Promise<EvaluationResult> {
    const issuedAt = this.now();
    const payload: PermissionDecision = {
      schema_version: "1.0",
      decision_id: this.createId(),
      request_id: request.request_id,
      status,
      subject: request.subject,
      capability_id: request.capability_id,
      permission_id: request.permission_id,
      purpose: request.purpose,
      execution_mode: request.execution_mode,
      issued_at: issuedAt.toISOString(),
      policy_version: policyVersion,
      reason_code: safeReason(reasonCode, "POLICY_BLOCKED"),
    };
    return this.issue(payload, request, principal);
  }

  private async issue(
    payload: PermissionDecision,
    request: PermissionRequest,
    principal: AuthenticatedPrincipal,
  ): Promise<EvaluationResult> {
    const validated = permissionDecisionSchema.safeParse(payload);
    if (!validated.success) return { status: "rejected", reason_code: "DECISION_CONTRACT_INVALID" };
    try {
      await this.ports.audit.record({
        event_type: "decision_issuance_requested",
        request_id: request.request_id,
        decision_id: payload.decision_id,
        subject_ref: principal.audit_subject_ref,
        capability_id: request.capability_id,
        permission_id: request.permission_id,
        status: payload.status,
        reason_code: payload.reason_code,
        policy_version: payload.policy_version,
        occurred_at: this.now().toISOString(),
      });
      const issued = permissionDecisionSchema.safeParse(
        await this.ports.decisionAuthority.issue(validated.data),
      );
      if (!issued.success || !sameDecisionBinding(validated.data, issued.data))
        return { status: "rejected", reason_code: "DECISION_AUTHORITY_UNVERIFIABLE" };
      return { status: "issued", decision: issued.data };
    } catch {
      return { status: "rejected", reason_code: "RUNTIME_DEPENDENCY_UNAVAILABLE" };
    }
  }
}

function requiresRemoteDisclosure(request: PermissionRequest, policy: PolicyEvaluation): boolean {
  const protectedData = ["personal", "sensitive", "restricted"].includes(
    request.data_classification,
  );
  return (
    policy.remote_disclosure_required || (request.execution_mode !== "on_device" && protectedData)
  );
}

function scopeIsNoBroaderThan(
  approved: ResourceScope | undefined,
  requested: ResourceScope,
): boolean {
  if (!approved) return false;
  if (
    approved.resource_type !== requested.resource_type ||
    approved.scope_mode !== requested.scope_mode
  )
    return false;
  if (requested.scope_mode === "exact") {
    const requestedIds = requested.resource_ids ?? [];
    const approvedIds = approved.resource_ids ?? [];
    if (!requestedIds.length || !approvedIds.length) return false;
    if (
      new Set(requestedIds).size !== requestedIds.length ||
      new Set(approvedIds).size !== approvedIds.length
    )
      return false;
    if (!approvedIds.every((id) => requestedIds.includes(id))) return false;
  } else if (!requested.boundary || approved.boundary !== requested.boundary) {
    return false;
  }
  if (approved.precision !== requested.precision) {
    if (approved.precision === "not_applicable" || requested.precision === "not_applicable")
      return false;
    if (!(approved.precision === "coarse" && requested.precision === "precise")) return false;
  }
  if (approved.recipient !== requested.recipient) return false;
  if (requested.retention) {
    if (
      !approved.retention ||
      approved.retention.storage_scope !== requested.retention.storage_scope
    )
      return false;
    if (approved.retention.duration_seconds > requested.retention.duration_seconds) return false;
    if (
      requested.retention.deletion_trigger &&
      approved.retention.deletion_trigger !== requested.retention.deletion_trigger
    )
      return false;
  } else if (approved.retention) {
    return false;
  }
  return true;
}

function samePrincipal(principal: Principal, requested: Principal): boolean {
  return (
    principal.principal_type === requested.principal_type &&
    principal.principal_id === requested.principal_id &&
    (principal.session_id ?? null) === (requested.session_id ?? null)
  );
}
function validateRegistryCapability(
  capability: RegisteredCapability | null,
  request: PermissionRequest,
): string | null {
  if (!capability || !capability.registered) return "CAPABILITY_NOT_REGISTERED";
  if (capability.validation_status !== "passing") return "CAPABILITY_VALIDATION_NOT_PASSING";
  if (capability.review_status !== "approved") return "CAPABILITY_REVIEW_NOT_APPROVED";
  if (capability.manifest.capability_id !== request.capability_id) return "CAPABILITY_ID_MISMATCH";
  if (capability.manifest.lifecycle_status !== "verified") return "CAPABILITY_NOT_VERIFIED";
  if (!capability.manifest_digest) return "CAPABILITY_DIGEST_MISSING";
  if (!capability.digest_verified) return "CAPABILITY_DIGEST_NOT_VERIFIED";
  if (!capability.manifest.permissions.includes(request.permission_id))
    return "PERMISSION_NOT_DECLARED";
  if (
    !capability.manifest.dependencies.permission.some(
      (p) => p.id === request.permission_id && p.required,
    )
  )
    return "PERMISSION_DEPENDENCY_NOT_DECLARED";
  if (!capability.manifest.execution_policy.execution_modes.includes(request.execution_mode))
    return "EXECUTION_MODE_NOT_ALLOWED";
  return null;
}
function sameDecisionBinding(expected: PermissionDecision, actual: PermissionDecision): boolean {
  return (
    actual.decision_id === expected.decision_id &&
    actual.request_id === expected.request_id &&
    actual.status === expected.status &&
    samePrincipal(actual.subject, expected.subject) &&
    actual.capability_id === expected.capability_id &&
    actual.permission_id === expected.permission_id &&
    actual.purpose.purpose_id === expected.purpose.purpose_id &&
    actual.purpose.description === expected.purpose.description &&
    actual.execution_mode === expected.execution_mode &&
    actual.issued_at === expected.issued_at &&
    actual.expires_at === expected.expires_at &&
    actual.single_use === expected.single_use &&
    actual.policy_version === expected.policy_version &&
    actual.reason_code === expected.reason_code &&
    canonicalJson(actual.approved_scope) === canonicalJson(expected.approved_scope) &&
    canonicalJson(actual.evidence_refs ?? []) === canonicalJson(expected.evidence_refs ?? [])
  );
}
function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return (
      "{" +
      Object.keys(record)
        .sort()
        .map((key) => JSON.stringify(key) + ":" + canonicalJson(record[key]))
        .join(",") +
      "}"
    );
  }
  return JSON.stringify(value) ?? "undefined";
}
function safeReason(value: string, fallback: string): string {
  return /^[A-Z][A-Z0-9_]{1,79}$/.test(value) ? value : fallback;
}
