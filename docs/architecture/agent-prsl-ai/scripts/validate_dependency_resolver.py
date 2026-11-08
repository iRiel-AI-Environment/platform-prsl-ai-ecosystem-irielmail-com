#!/usr/bin/env python3
"""Validate PRSL-AI Dependency Resolver schemas and deterministic fixtures."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker
from jsonschema.exceptions import SchemaError

ROOT = Path(__file__).resolve().parents[4]
BASE = ROOT / "docs" / "architecture" / "agent-prsl-ai"
SCHEMAS = BASE / "schemas"
VALIDATION = BASE / "validation"
VERSION_RE = re.compile(r"^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$")
SELECTOR_RE = re.compile(r"^(>=|<=|>|<|=)?(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$")
CATEGORIES = ("runtime", "framework", "device", "service", "capability")


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def parse_version(value: str):
    match = VERSION_RE.fullmatch(value)
    if not match:
        raise ValueError("invalid stable semantic version")
    return tuple(int(part) for part in match.groups())


def parse_selector(value: str | None):
    if value is None:
        return None, None
    match = SELECTOR_RE.fullmatch(value)
    if not match:
        raise ValueError("unsupported version selector")
    operator = match.group(1) or "="
    version = tuple(int(part) for part in match.groups()[1:])
    return operator, version


def satisfies(version: tuple[int, int, int], selector: str | None) -> bool:
    if selector is None:
        return True
    operator, target = parse_selector(selector)
    if operator == "=":
        return version == target
    if operator == ">=":
        return version >= target
    if operator == ">":
        return version > target
    if operator == "<=":
        return version <= target
    if operator == "<":
        return version < target
    return False


def resolve_fixture(case: dict) -> dict:
    request = case["request"]
    root = case["root_manifest"]
    limits = request.get("limits", {})
    max_depth = limits.get("max_depth", 16)
    max_nodes = limits.get("max_nodes", 128)
    optional_policy = request.get("optional_dependency_policy", "include_available_optional")

    errors: list[dict] = []
    skipped: list[dict] = []
    selected: dict[tuple[str, str], dict] = {}
    active_stack: list[tuple[str, str]] = []
    order: list[str] = []
    authorization: dict[str, bool] = {}
    model_required = False
    model_constraint_sets: list[set[str]] = []

    root_id = root.get("capability_id")
    root_registry = case.get("root_registry", {})
    if root_id != request.get("root_capability_id"):
        errors.append({"code": "ROOT_CAPABILITY_ID_MISMATCH", "dependency_type": "capability", "dependency_id": root_id, "parent_id": None})
    if (
        root.get("lifecycle_status") != "verified"
        or root_registry.get("registration_status") != "registered"
        or root_registry.get("validation_status") != "passed"
        or root_registry.get("review_status") != "approved"
        or root_registry.get("digest_verified") is not True
        or root_registry.get("registry_snapshot_ref") != request.get("registry_snapshot_ref")
        or not root_registry.get("registry_record_ref")
        or root_registry.get("version") != root.get("capability_version")
    ):
        errors.append({"code": "ROOT_CAPABILITY_NOT_VERIFIED", "dependency_type": "capability", "dependency_id": root_id, "parent_id": None})
    root_version = root_registry.get("version")
    requested_root_selector = request.get("root_version_constraint")
    try:
        if root_version is None or (requested_root_selector and not satisfies(parse_version(root_version), requested_root_selector)):
            errors.append({"code": "ROOT_VERSION_UNSATISFIED", "dependency_type": "capability", "dependency_id": root_id, "parent_id": None})
    except ValueError:
        errors.append({"code": "UNSUPPORTED_VERSION_CONSTRAINT", "dependency_type": "capability", "dependency_id": root_id, "parent_id": None})

    catalog: dict[tuple[str, str], list[dict]] = {}
    for record in case.get("catalog", []):
        key = (record.get("dependency_type"), record.get("dependency_id"))
        catalog.setdefault(key, []).append(record)

    def add_error(code: str, dep_type: str | None, dep_id: str | None, parent_id: str | None):
        item = {"code": code, "dependency_type": dep_type, "dependency_id": dep_id, "parent_id": parent_id}
        if item not in errors:
            errors.append(item)

    def collect_manifest(manifest: dict, parent_id: str, depth: int):
        nonlocal model_required, model_constraint_sets
        deps = manifest.get("dependencies", {})
        model = deps.get("model", {"required": False, "provider_constraints": []})
        if model.get("required"):
            model_required = True
            constraints = set(model.get("provider_constraints", []))
            if constraints:
                model_constraint_sets.append(constraints)

        for item in deps.get("permission", []):
            permission_id = item["id"]
            authorization[permission_id] = authorization.get(permission_id, False) or item.get("required", False)

        for dep_type in CATEGORIES:
            refs = sorted(deps.get(dep_type, []), key=lambda item: item["id"])
            for dependency in refs:
                resolve_dependency(dep_type, dependency, parent_id, depth + 1)

    def resolve_dependency(dep_type: str, dependency: dict, parent_id: str, depth: int):
        dep_id = dependency["id"]
        key = (dep_type, dep_id)
        required = dependency.get("required", False)
        selector = dependency.get("version")
        if depth > max_depth or len(selected) >= max_nodes and key not in selected:
            add_error("RESOLUTION_LIMIT_EXCEEDED", dep_type, dep_id, parent_id)
            return
        if key in active_stack:
            add_error("DEPENDENCY_CYCLE", dep_type, dep_id, parent_id)
            return
        try:
            parse_selector(selector)
        except ValueError:
            add_error("UNSUPPORTED_VERSION_CONSTRAINT", dep_type, dep_id, parent_id)
            return

        if key in selected:
            chosen = selected[key]
            try:
                compatible = satisfies(parse_version(chosen["version"]), selector)
            except ValueError:
                compatible = False
            if not compatible:
                add_error("DEPENDENCY_VERSION_CONFLICT", dep_type, dep_id, parent_id)
                return
            chosen["required"] = chosen["required"] or required
            chosen["parents"].add(parent_id)
            return

        records = catalog.get(key, [])
        if not records:
            if required:
                add_error("DEPENDENCY_NOT_FOUND", dep_type, dep_id, parent_id)
            else:
                skipped.append({"dependency_type": dep_type, "dependency_id": dep_id, "reason_code": "OPTIONAL_DEPENDENCY_NOT_FOUND"})
            return

        if not required and optional_policy == "required_only":
            skipped.append({"dependency_type": dep_type, "dependency_id": dep_id, "reason_code": "OPTIONAL_DEPENDENCY_OMITTED_BY_POLICY"})
            return

        verified = [
            record for record in records
            if (
                record.get("lifecycle_status") == "verified"
                and record.get("registration_status") == "registered"
                and record.get("validation_status") == "passed"
                and record.get("review_status") == "approved"
                and record.get("digest_verified") is True
                and record.get("registry_snapshot_ref") == request.get("registry_snapshot_ref")
            )
        ]
        if not verified:
            if required:
                add_error("DEPENDENCY_NOT_VERIFIED", dep_type, dep_id, parent_id)
            else:
                skipped.append({"dependency_type": dep_type, "dependency_id": dep_id, "reason_code": "OPTIONAL_DEPENDENCY_NOT_VERIFIED"})
            return

        compatible_records = []
        for record in verified:
            try:
                parsed = parse_version(record.get("version", ""))
            except ValueError:
                continue
            if satisfies(parsed, selector):
                compatible_records.append((parsed, record))

        if not compatible_records:
            if required:
                add_error("DEPENDENCY_VERSION_UNSATISFIED", dep_type, dep_id, parent_id)
            else:
                skipped.append({"dependency_type": dep_type, "dependency_id": dep_id, "reason_code": "OPTIONAL_DEPENDENCY_VERSION_UNSATISFIED"})
            return

        compatible_records.sort(key=lambda item: item[0], reverse=True)
        highest = compatible_records[0][0]
        highest_records = [record for version, record in compatible_records if version == highest]
        if len(highest_records) != 1:
            add_error("DEPENDENCY_REGISTRY_AMBIGUOUS", dep_type, dep_id, parent_id)
            return

        record = highest_records[0]
        if dep_type == "capability":
            manifest = record.get("manifest")
            if (
                not isinstance(manifest, dict)
                or manifest.get("capability_id") != dep_id
                or manifest.get("capability_version") != record["version"]
                or manifest.get("lifecycle_status") != "verified"
            ):
                add_error("DEPENDENCY_MANIFEST_MISMATCH", dep_type, dep_id, parent_id)
                return

        selected[key] = {
            "dependency_type": dep_type,
            "dependency_id": dep_id,
            "version": record["version"],
            "registry_record_ref": record["registry_record_ref"],
            "required": required,
            "parents": {parent_id},
        }

        if dep_type == "capability":
            active_stack.append(key)
            collect_manifest(record["manifest"], dep_id, depth)
            active_stack.pop()

        order.append(record["registry_record_ref"])

    if not errors:
        active_stack.append(("capability", root_id))
        collect_manifest(root, root_id, 0)
        active_stack.pop()

    provider_constraints = set.intersection(*model_constraint_sets) if model_constraint_sets else set()
    if model_required and model_constraint_sets and not provider_constraints:
        add_error("MODEL_PROVIDER_CONSTRAINT_CONFLICT", "model", None, root_id)

    blocked = bool(errors)
    status = "blocked" if blocked else ("degraded" if skipped else "resolved")
    resolved = [
        {
            "dependency_type": item["dependency_type"],
            "dependency_id": item["dependency_id"],
            "version": item["version"],
            "registry_record_ref": item["registry_record_ref"],
            "required": item["required"],
            "parents": sorted(item["parents"]),
        }
        for item in selected.values()
    ]
    resolved.sort(key=lambda item: order.index(item["registry_record_ref"]) if item["registry_record_ref"] in order else 10**9)
    return {
        "schema_version": "1.0",
        "resolution_id": request["resolution_id"],
        "root_capability_id": request["root_capability_id"],
        "registry_snapshot_ref": request["registry_snapshot_ref"],
        "status": status,
        "resolved_dependencies": resolved,
        "skipped_optional_dependencies": sorted(skipped, key=lambda item: (item["dependency_type"], item["dependency_id"])),
        "authorization_requirements": [
            {"permission_id": key, "required": authorization[key]} for key in sorted(authorization)
        ],
        "model_requirement": {
            "required": model_required,
            "provider_constraints": sorted(provider_constraints),
        },
        "dependency_order": [] if blocked else order,
        "errors": errors,
    }


def normalize(actual: dict) -> dict:
    return {
        "status": actual["status"],
        "resolved": sorted([[x["dependency_type"], x["dependency_id"], x["version"]] for x in actual["resolved_dependencies"]]),
        "skipped": sorted([[x["dependency_type"], x["dependency_id"], x["reason_code"]] for x in actual["skipped_optional_dependencies"]]),
        "authorization": sorted([[x["permission_id"], x["required"]] for x in actual["authorization_requirements"]]),
        "model": actual["model_requirement"],
        "dependency_order": actual["dependency_order"],
        "errors": sorted(x["code"] for x in actual["errors"]),
    }


def main() -> int:
    try:
        request_schema = load_json(SCHEMAS / "dependency-resolution-request.schema.json")
        result_schema = load_json(SCHEMAS / "dependency-resolution-result.schema.json")
        vectors = load_json(VALIDATION / "dependency-resolution-cases.json")
        Draft202012Validator.check_schema(request_schema)
        Draft202012Validator.check_schema(result_schema)
    except (OSError, json.JSONDecodeError, SchemaError) as exc:
        print(f"ERROR: invalid dependency resolver contract input: {exc}", file=sys.stderr)
        return 2

    request_validator = Draft202012Validator(request_schema, format_checker=FormatChecker())
    result_validator = Draft202012Validator(result_schema, format_checker=FormatChecker())
    failures = 0

    for case in vectors["cases"]:
        request = case["request"]
        request_errors = list(request_validator.iter_errors(request))
        if request_errors:
            failures += 1
            print(f"FAIL request schema: {case['name']}")
            for error in request_errors:
                print(f"  {error.message}")
            continue

        result = resolve_fixture(case)
        result_errors = list(result_validator.iter_errors(result))
        if result_errors:
            failures += 1
            print(f"FAIL result schema: {case['name']}")
            for error in result_errors:
                print(f"  {error.message}")

        expected = case["expected"]
        actual = normalize(result)
        expected_normalized = {
            "status": expected["status"],
            "resolved": sorted(expected["resolved"]),
            "skipped": sorted(expected["skipped"]),
            "authorization": sorted(expected["authorization"]),
            "model": expected["model"],
            "dependency_order": expected["dependency_order"],
            "errors": sorted(expected["errors"]),
        }
        if actual != expected_normalized:
            failures += 1
            print(f"FAIL resolution vector: {case['name']}")
            print(f"  expected: {json.dumps(expected_normalized, sort_keys=True)}")
            print(f"  actual:   {json.dumps(actual, sort_keys=True)}")
        else:
            print(f"PASS: {case['name']}")

    if failures:
        print(f"\nFAIL: {failures} dependency resolver validation failure(s).")
        return 1
    print(f"\nPASS: {len(vectors['cases'])} dependency resolver schema and behavior cases.")
    print("NOTE: synthetic registry fixtures only; no production registry or resolver runtime was exercised.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
