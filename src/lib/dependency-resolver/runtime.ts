/* eslint-disable prettier/prettier */
import { z } from "zod";

const capabilityIdSchema = z.string().regex(/^prsl\.(agent|integration)\.[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$/);
const selectorSchema = z.string().regex(/^(?:=|>=|<=|>|<)?(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/);
const dependencySchema = z.object({
  id: z.string().min(1).max(256),
  required: z.boolean(),
  version: selectorSchema.optional(),
}).strict();

const manifestSchema = z.object({
  capability_id: capabilityIdSchema,
  capability_version: z.string().regex(/^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/),
  lifecycle_status: z.enum(["proposed", "specified", "in_development", "implemented", "verified", "deprecated"]),
  dependencies: z.object({
    runtime: z.array(dependencySchema).default([]),
    framework: z.array(dependencySchema).default([]),
    device: z.array(dependencySchema).default([]),
    service: z.array(dependencySchema).default([]),
    capability: z.array(dependencySchema).default([]),
    permission: z.array(dependencySchema).default([]),
    model: z.object({
      required: z.boolean().default(false),
      provider_constraints: z.array(z.string().min(1).max(128)).default([]),
    }).strict().default({ required: false, provider_constraints: [] }),
  }).strict(),
}).passthrough();

export const dependencyResolutionRequestSchema = z.object({
  schema_version: z.literal("1.0"),
  resolution_id: z.string().uuid(),
  root_capability_id: capabilityIdSchema,
  root_version_constraint: selectorSchema.optional(),
  registry_snapshot_ref: z.string().min(1).max(256),
  optional_dependency_policy: z.enum(["required_only", "include_available_optional"]).default("include_available_optional"),
  limits: z.object({
    max_depth: z.number().int().min(1).max(64).default(16),
    max_nodes: z.number().int().min(1).max(1000).default(128),
  }).strict().default({ max_depth: 16, max_nodes: 128 }),
}).strict();

export type DependencyResolutionRequest = z.input<typeof dependencyResolutionRequestSchema>;
type ParsedRequest = z.output<typeof dependencyResolutionRequestSchema>;
type DependencyType = "runtime" | "framework" | "device" | "service" | "capability";
type DependencyRef = z.infer<typeof dependencySchema>;
type Manifest = z.infer<typeof manifestSchema>;

export interface TrustedRegistryRecord {
  registry_record_ref: string;
  registry_snapshot_ref: string;
  dependency_type: "root" | DependencyType;
  dependency_id: string;
  version: string;
  registration_status: "registered" | "unregistered";
  validation_status: "passed" | "failing" | "pending";
  review_status: "approved" | "rejected" | "pending";
  lifecycle_status: string;
  digest_verified: boolean;
  manifest?: unknown;
}

export interface TrustedDependencyRegistry {
  getRootCapability(input: { capabilityId: string; snapshotRef: string }): Promise<TrustedRegistryRecord | null>;
  findCandidates(input: { dependencyType: DependencyType; dependencyId: string; snapshotRef: string }): Promise<TrustedRegistryRecord[]>;
}

export interface DependencyResolutionResult {
  schema_version: "1.0";
  resolution_id: string;
  root_capability_id: string;
  registry_snapshot_ref: string;
  status: "resolved" | "degraded" | "blocked";
  resolved_dependencies: Array<{
    dependency_type: DependencyType;
    dependency_id: string;
    version: string;
    registry_record_ref: string;
    required: boolean;
    parents: string[];
  }>;
  skipped_optional_dependencies: Array<{
    dependency_type: DependencyType;
    dependency_id: string;
    reason_code: "OPTIONAL_DEPENDENCY_NOT_FOUND" | "OPTIONAL_DEPENDENCY_NOT_VERIFIED" | "OPTIONAL_DEPENDENCY_VERSION_UNSATISFIED" | "OPTIONAL_DEPENDENCY_OMITTED_BY_POLICY";
  }>;
  authorization_requirements: Array<{ permission_id: string; required: boolean }>;
  model_requirement: { required: boolean; provider_constraints: string[] };
  dependency_order: string[];
  errors: Array<{
    code: string;
    dependency_type: string | null;
    dependency_id: string | null;
    parent_id: string | null;
  }>;
}

const categories: DependencyType[] = ["runtime", "framework", "device", "service", "capability"];
const versionPattern = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/;

function parseVersion(value: string): [number, number, number] | null {
  const match = versionPattern.exec(value);
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function compareVersions(a: [number, number, number], b: [number, number, number]): number {
  for (let index = 0; index < 3; index += 1) {
    const left = a[index] ?? 0;
    const right = b[index] ?? 0;
    if (left !== right) return left - right;
  }
  return 0;
}

function satisfies(version: [number, number, number], selector?: string): boolean {
  if (!selector) return true;
  const match = /^(>=|<=|>|<|=)?(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/.exec(selector);
  if (!match) return false;
  const target: [number, number, number] = [Number(match[2]), Number(match[3]), Number(match[4])];
  const comparison = compareVersions(version, target);
  switch (match[1] ?? "=") {
    case "=": return comparison === 0;
    case ">=": return comparison >= 0;
    case ">": return comparison > 0;
    case "<=": return comparison <= 0;
    case "<": return comparison < 0;
    default: return false;
  }
}

function isEligible(record: TrustedRegistryRecord, snapshotRef: string): boolean {
  return record.registry_snapshot_ref === snapshotRef &&
    record.registration_status === "registered" &&
    record.validation_status === "passed" &&
    record.review_status === "approved" &&
    record.lifecycle_status === "verified" &&
    record.digest_verified === true &&
    parseVersion(record.version) !== null &&
    typeof record.registry_record_ref === "string" &&
    record.registry_record_ref.length > 0;
}

function isManifest(value: unknown): Manifest | null {
  const parsed = manifestSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

/**
 * Resolves a dependency graph against a trusted, immutable registry snapshot.
 * The registry adapter is the authority: caller-supplied catalogs are never accepted.
 * This component plans only; it does not authorize, install, download, or execute.
 */
export async function resolveDependencies(
  rawRequest: unknown,
  registry: TrustedDependencyRegistry,
): Promise<DependencyResolutionResult> {
  const parsedRequest = dependencyResolutionRequestSchema.safeParse(rawRequest);
  if (!parsedRequest.success) {
    const fallback = rawRequest && typeof rawRequest === "object" ? rawRequest as Record<string, unknown> : {};
    const fallbackResolutionId = z.string().uuid().safeParse(fallback["resolution_id"]);
    const fallbackCapabilityId = capabilityIdSchema.safeParse(fallback["root_capability_id"]);
    const fallbackSnapshotRef = z.string().min(1).max(256).safeParse(fallback["registry_snapshot_ref"]);
    return blockedResult(
      fallbackResolutionId.success ? fallbackResolutionId.data : "00000000-0000-4000-8000-000000000000",
      fallbackCapabilityId.success ? fallbackCapabilityId.data : "prsl.agent.invalid.root",
      fallbackSnapshotRef.success ? fallbackSnapshotRef.data : "invalid",
      "INVALID_REQUEST",
      null,
      null,
      null,
    );
  }

  const request: ParsedRequest = parsedRequest.data;
  const errors: DependencyResolutionResult["errors"] = [];
  const skipped: DependencyResolutionResult["skipped_optional_dependencies"] = [];
  const selected = new Map<string, {
    dependency_type: DependencyType;
    dependency_id: string;
    version: string;
    registry_record_ref: string;
    required: boolean;
    parents: Set<string>;
  }>();
  const active: string[] = [];
  const order: string[] = [];
  const authorization = new Map<string, boolean>();
  const modelConstraintSets: Set<string>[] = [];
  let modelRequired = false;

  const addError = (code: string, dependencyType: string | null, dependencyId: string | null, parentId: string | null) => {
    if (!errors.some((item) => item.code === code && item.dependency_type === dependencyType && item.dependency_id === dependencyId && item.parent_id === parentId)) {
      errors.push({ code, dependency_type: dependencyType, dependency_id: dependencyId, parent_id: parentId });
    }
  };

  let rootRecord: TrustedRegistryRecord | null;
  let rootRegistryUnavailable = false;
  try {
    rootRecord = await registry.getRootCapability({ capabilityId: request.root_capability_id, snapshotRef: request.registry_snapshot_ref });
  } catch {
    rootRecord = null;
    rootRegistryUnavailable = true;
  }

  const rootManifest = rootRecord ? isManifest(rootRecord.manifest) : null;
  if (rootRegistryUnavailable) {
    addError("REGISTRY_UNAVAILABLE", "capability", request.root_capability_id, null);
  } else if (!rootRecord || !isEligible(rootRecord, request.registry_snapshot_ref) || rootRecord.dependency_type !== "root" || !rootManifest) {
    addError("ROOT_CAPABILITY_NOT_VERIFIED", "capability", request.root_capability_id, null);
  } else if (
    rootRecord.dependency_id !== request.root_capability_id ||
    rootManifest.capability_id !== request.root_capability_id
  ) {
    addError("ROOT_CAPABILITY_ID_MISMATCH", "capability", request.root_capability_id, null);
  } else if (rootRecord.version !== rootManifest.capability_version || !satisfies(parseVersion(rootRecord.version)!, request.root_version_constraint)) {
    addError("ROOT_VERSION_UNSATISFIED", "capability", request.root_capability_id, null);
  }

  const collectManifest = async (manifest: Manifest, parentId: string, depth: number): Promise<void> => {
    const model = manifest.dependencies.model;
    if (model.required) {
      modelRequired = true;
      if (model.provider_constraints.length > 0) modelConstraintSets.push(new Set(model.provider_constraints));
    }
    for (const permission of manifest.dependencies.permission) {
      authorization.set(permission.id, (authorization.get(permission.id) ?? false) || permission.required);
    }
    for (const type of categories) {
      const refs = [...manifest.dependencies[type]].sort((a, b) => a.id.localeCompare(b.id));
      for (const dependency of refs) await resolveOne(type, dependency, parentId, depth + 1);
    }
  };

  const resolveOne = async (type: DependencyType, dependency: DependencyRef, parentId: string, depth: number): Promise<void> => {
    const key = type + ":" + dependency.id;
    if (depth > request.limits.max_depth || (selected.size >= request.limits.max_nodes && !selected.has(key))) {
      addError("RESOLUTION_LIMIT_EXCEEDED", type, dependency.id, parentId);
      return;
    }
    if (active.includes(key)) {
      addError("DEPENDENCY_CYCLE", type, dependency.id, parentId);
      return;
    }
    if (selected.has(key)) {
      const existing = selected.get(key)!;
      const parsedVersion = parseVersion(existing.version);
      if (!parsedVersion || !satisfies(parsedVersion, dependency.version)) {
        addError("DEPENDENCY_VERSION_CONFLICT", type, dependency.id, parentId);
        return;
      }
      existing.required ||= dependency.required;
      existing.parents.add(parentId);
      return;
    }

    let candidates: TrustedRegistryRecord[];
    try {
      candidates = await registry.findCandidates({ dependencyType: type, dependencyId: dependency.id, snapshotRef: request.registry_snapshot_ref });
    } catch {
      addError("REGISTRY_UNAVAILABLE", type, dependency.id, parentId);
      return;
    }

    if (!dependency.required && request.optional_dependency_policy === "required_only" && candidates.length > 0) {
      skipped.push({ dependency_type: type, dependency_id: dependency.id, reason_code: "OPTIONAL_DEPENDENCY_OMITTED_BY_POLICY" });
      return;
    }
    if (candidates.length === 0) {
      if (dependency.required) addError("DEPENDENCY_NOT_FOUND", type, dependency.id, parentId);
      else skipped.push({ dependency_type: type, dependency_id: dependency.id, reason_code: "OPTIONAL_DEPENDENCY_NOT_FOUND" });
      return;
    }

    const eligible = candidates.filter((record) => record.dependency_type === type && record.dependency_id === dependency.id && isEligible(record, request.registry_snapshot_ref));
    if (eligible.length === 0) {
      if (dependency.required) addError("DEPENDENCY_NOT_VERIFIED", type, dependency.id, parentId);
      else skipped.push({ dependency_type: type, dependency_id: dependency.id, reason_code: "OPTIONAL_DEPENDENCY_NOT_VERIFIED" });
      return;
    }

    const compatible = eligible
      .filter((record) => satisfies(parseVersion(record.version)!, dependency.version))
      .sort((a, b) => compareVersions(parseVersion(b.version)!, parseVersion(a.version)!));
    if (compatible.length === 0) {
      if (dependency.required) addError("DEPENDENCY_VERSION_UNSATISFIED", type, dependency.id, parentId);
      else skipped.push({ dependency_type: type, dependency_id: dependency.id, reason_code: "OPTIONAL_DEPENDENCY_VERSION_UNSATISFIED" });
      return;
    }

    const highestVersion = compatible[0]!.version;
    const highest = compatible.filter((record) => record.version === highestVersion);
    if (highest.length !== 1) {
      addError("DEPENDENCY_REGISTRY_AMBIGUOUS", type, dependency.id, parentId);
      return;
    }
    const record = highest[0]!;
    let childManifest: Manifest | null = null;
    if (type === "capability") {
      childManifest = isManifest(record.manifest);
      if (!childManifest || childManifest.capability_id !== dependency.id || childManifest.capability_version !== record.version || childManifest.lifecycle_status !== "verified") {
        addError("DEPENDENCY_MANIFEST_MISMATCH", type, dependency.id, parentId);
        return;
      }
    }

    selected.set(key, {
      dependency_type: type,
      dependency_id: dependency.id,
      version: record.version,
      registry_record_ref: record.registry_record_ref,
      required: dependency.required,
      parents: new Set([parentId]),
    });
    if (childManifest) {
      active.push(key);
      await collectManifest(childManifest, dependency.id, depth);
      active.pop();
    }
    order.push(record.registry_record_ref);
  };

  if (errors.length === 0 && rootManifest) {
    active.push("capability:" + request.root_capability_id);
    await collectManifest(rootManifest, request.root_capability_id, 0);
    active.pop();
  }

  const providerConstraints = modelConstraintSets.length > 0
    ? [...modelConstraintSets[0]!].filter((provider) => modelConstraintSets.every((set) => set.has(provider))).sort()
    : [];
  if (modelRequired && modelConstraintSets.length > 0 && providerConstraints.length === 0) {
    addError("MODEL_PROVIDER_CONSTRAINT_CONFLICT", "model", null, request.root_capability_id);
  }

  const blocked = errors.length > 0;
  const resolved = [...selected.values()].map((item) => ({
    dependency_type: item.dependency_type,
    dependency_id: item.dependency_id,
    version: item.version,
    registry_record_ref: item.registry_record_ref,
    required: item.required,
    parents: [...item.parents].sort(),
  })).sort((a, b) => order.indexOf(a.registry_record_ref) - order.indexOf(b.registry_record_ref));

  return {
    schema_version: "1.0",
    resolution_id: request.resolution_id,
    root_capability_id: request.root_capability_id,
    registry_snapshot_ref: request.registry_snapshot_ref,
    status: blocked ? "blocked" : skipped.length > 0 ? "degraded" : "resolved",
    resolved_dependencies: resolved,
    skipped_optional_dependencies: skipped.sort((a, b) => (a.dependency_type + a.dependency_id).localeCompare(b.dependency_type + b.dependency_id)),
    authorization_requirements: [...authorization.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([permission_id, required]) => ({ permission_id, required })),
    model_requirement: { required: modelRequired, provider_constraints: providerConstraints },
    dependency_order: blocked ? [] : order,
    errors,
  };
}

function blockedResult(
  resolutionId: string,
  rootCapabilityId: string,
  snapshotRef: string,
  code: string,
  dependencyType: string | null,
  dependencyId: string | null,
  parentId: string | null,
): DependencyResolutionResult {
  return {
    schema_version: "1.0",
    resolution_id: resolutionId,
    root_capability_id: rootCapabilityId,
    registry_snapshot_ref: snapshotRef,
    status: "blocked",
    resolved_dependencies: [],
    skipped_optional_dependencies: [],
    authorization_requirements: [],
    model_requirement: { required: false, provider_constraints: [] },
    dependency_order: [],
    errors: [{ code, dependency_type: dependencyType, dependency_id: dependencyId, parent_id: parentId }],
  };
}
