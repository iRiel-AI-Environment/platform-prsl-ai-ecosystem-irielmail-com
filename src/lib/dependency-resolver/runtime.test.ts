/* eslint-disable prettier/prettier */
import { describe, expect, it } from "vitest";
import { resolveDependencies, type TrustedDependencyRegistry, type TrustedRegistryRecord } from "./runtime";

const request = {
  schema_version: "1.0" as const,
  resolution_id: "d2d2d2d2-1111-4111-8111-111111111111",
  root_capability_id: "prsl.agent.demo.root",
  registry_snapshot_ref: "snapshot:test-001",
};

function manifest(capabilityId = request.root_capability_id, dependencies: Record<string, unknown> = {}) {
  return {
    capability_id: capabilityId,
    capability_version: "1.0.0",
    lifecycle_status: "verified",
    dependencies: {
      runtime: [], framework: [], device: [], service: [], capability: [], permission: [],
      model: { required: false, provider_constraints: [] },
      ...dependencies,
    },
  };
}

function record(overrides: Partial<TrustedRegistryRecord> = {}): TrustedRegistryRecord {
  return {
    registry_record_ref: "registry:root:1.0.0",
    registry_snapshot_ref: request.registry_snapshot_ref,
    dependency_type: "root",
    dependency_id: request.root_capability_id,
    version: "1.0.0",
    registration_status: "registered",
    validation_status: "passed",
    review_status: "approved",
    lifecycle_status: "verified",
    digest_verified: true,
    manifest: manifest(),
    ...overrides,
  };
}

function registry(root: TrustedRegistryRecord | null, candidates: TrustedRegistryRecord[] = []): TrustedDependencyRegistry {
  return {
    getRootCapability: async () => root,
    findCandidates: async ({ dependencyType, dependencyId }) =>
      candidates.filter((candidate) => candidate.dependency_type === dependencyType && candidate.dependency_id === dependencyId),
  };
}

describe("trusted-snapshot dependency resolver", () => {
  it("selects the highest verified version from the requested snapshot", async () => {
    const root = record({
      manifest: manifest(request.root_capability_id, {
        runtime: [{ id: "node-runtime", required: true, version: ">=1.0.0" }],
      }),
    });
    const candidates = [
      record({ dependency_type: "runtime", dependency_id: "node-runtime", version: "1.0.0", registry_record_ref: "registry:runtime:1.0.0" }),
      record({ dependency_type: "runtime", dependency_id: "node-runtime", version: "1.2.0", registry_record_ref: "registry:runtime:1.2.0" }),
    ];
    const result = await resolveDependencies(request, registry(root, candidates));
    expect(result.status).toBe("resolved");
    expect(result.resolved_dependencies.map((item) => item.version)).toEqual(["1.2.0"]);
    expect(result.dependency_order).toEqual(["registry:runtime:1.2.0"]);
  });

  it("blocks a required dependency that is missing", async () => {
    const root = record({
      manifest: manifest(request.root_capability_id, {
        service: [{ id: "required-index", required: true, version: ">=1.0.0" }],
      }),
    });
    const result = await resolveDependencies(request, registry(root));
    expect(result.status).toBe("blocked");
    expect(result.errors[0]?.code).toBe("DEPENDENCY_NOT_FOUND");
    expect(result.dependency_order).toEqual([]);
  });

  it("degrades when an optional dependency is missing", async () => {
    const root = record({
      manifest: manifest(request.root_capability_id, {
        service: [{ id: "optional-cache", required: false }],
      }),
    });
    const result = await resolveDependencies(request, registry(root));
    expect(result.status).toBe("degraded");
    expect(result.skipped_optional_dependencies[0]?.reason_code).toBe("OPTIONAL_DEPENDENCY_NOT_FOUND");
  });

  it("does not accept a record from a different snapshot", async () => {
    const root = record({
      manifest: manifest(request.root_capability_id, {
        runtime: [{ id: "node-runtime", required: true }],
      }),
    });
    const candidate = record({
      dependency_type: "runtime",
      dependency_id: "node-runtime",
      registry_snapshot_ref: "snapshot:other",
    });
    const result = await resolveDependencies(request, registry(root, [candidate]));
    expect(result.status).toBe("blocked");
    expect(result.errors[0]?.code).toBe("DEPENDENCY_NOT_VERIFIED");
  });

  it("returns permissions as requirements, never as grants", async () => {
    const root = record({
      manifest: manifest(request.root_capability_id, {
        permission: [{ id: "media.read", required: true }],
      }),
    });
    const result = await resolveDependencies(request, registry(root));
    expect(result.authorization_requirements).toEqual([{ permission_id: "media.read", required: true }]);
    expect(result).not.toHaveProperty("granted_permissions");
  });

  it("fails closed for malformed requests", async () => {
    const result = await resolveDependencies({ ...request, unexpected: true }, registry(record()));
    expect(result.status).toBe("blocked");
    expect(result.errors[0]?.code).toBe("INVALID_REQUEST");
  });
});

describe("registry failure handling", () => {
  it("blocks instead of degrading when the registry adapter is unavailable", async () => {
    const root = record({
      manifest: manifest(request.root_capability_id, {
        service: [{ id: "optional-cache", required: false }],
      }),
    });
    const unavailableRegistry: TrustedDependencyRegistry = {
      getRootCapability: async () => root,
      findCandidates: async () => { throw new Error("registry unavailable"); },
    };
    const result = await resolveDependencies(request, unavailableRegistry);
    expect(result.status).toBe("blocked");
    expect(result.errors[0]?.code).toBe("REGISTRY_UNAVAILABLE");
    expect(result.dependency_order).toEqual([]);
  });

  it("distinguishes an unavailable root registry from an unverified root", async () => {
    const unavailableRegistry: TrustedDependencyRegistry = {
      getRootCapability: async () => { throw new Error("registry unavailable"); },
      findCandidates: async () => [],
    };
    const result = await resolveDependencies(request, unavailableRegistry);
    expect(result.status).toBe("blocked");
    expect(result.errors[0]?.code).toBe("REGISTRY_UNAVAILABLE");
  });
});
