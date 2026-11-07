#!/usr/bin/env python3
"""Validate the Agent PRSL-AI execution envelope and cross-component dispatch gates.

This is a deterministic contract test harness. It does not call or emulate a
production registry, Permission Manager, native OS permission API, or agent runtime.
"""

from __future__ import annotations

import copy
import hashlib
import json
import sys
from datetime import datetime
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker, SchemaError

ROOT = Path(__file__).resolve().parents[1]
SCHEMAS = ROOT / "schemas"
EXAMPLES = ROOT / "examples"
VALIDATION = ROOT / "validation"
FORMAT_CHECKER = FormatChecker()
NOW = datetime.fromisoformat("2026-11-07T19:00:10+00:00")


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def canonical_digest(value: dict) -> str:
    encoded = json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    return "sha256:" + hashlib.sha256(encoded).hexdigest()


def parse_time(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def evaluate_gate(case: dict, manifest_template: dict, request_template: dict, decision_template: dict) -> tuple[bool, str, dict]:
    manifest = copy.deepcopy(manifest_template)
    manifest["lifecycle_status"] = case.get("manifest_lifecycle_status", "verified")
    request = copy.deepcopy(request_template)
    decision = copy.deepcopy(decision_template)

    if case.get("undeclared_permission"):
        request["permission_id"] = "camera.use"
    if case.get("remote_execution"):
        request["execution_mode"] = "remote"
        decision["execution_mode"] = "remote"
    if case.get("decision_status"):
        decision["status"] = case["decision_status"]
        decision["reason_code"] = "USER_DENIED"
        decision.pop("approved_scope", None)
        decision.pop("execution_mode", None)
        decision.pop("expires_at", None)
        decision.pop("single_use", None)
    if case.get("decision_request_mismatch"):
        decision["request_id"] = "4d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8cff"
    if case.get("decision_subject_mismatch"):
        decision["subject"]["principal_id"] = "different-subject"
    if case.get("decision_capability_mismatch"):
        decision["capability_id"] = "prsl.agent.reader.extract-document-content"
    if case.get("decision_permission_mismatch"):
        decision["permission_id"] = "camera.use"
    if case.get("decision_scope_mismatch"):
        decision["approved_scope"]["resource_ids"] = ["different-resource"]
    if case.get("decision_expired"):
        decision["expires_at"] = "2026-11-07T19:00:09Z"
    if case.get("decision_consumed"):
        decision["single_use"] = True

    registry = {
        "registration_status": case.get("registration_status", "registered"),
        "validation_status": case.get("validation_status", "passed"),
        "review_status": case.get("review_status", "approved"),
        "manifest_digest": canonical_digest(manifest),
    }
    if not case.get("digest_matches", True):
        registry["manifest_digest"] = "sha256:" + ("0" * 64)

    request_validator = Draft202012Validator(
        load_json(SCHEMAS / "permission-request.schema.json"), format_checker=FORMAT_CHECKER
    )
    decision_validator = Draft202012Validator(
        load_json(SCHEMAS / "permission-decision.schema.json"), format_checker=FORMAT_CHECKER
    )
    manifest_validator = Draft202012Validator(
        load_json(SCHEMAS / "capability-manifest.schema.json"), format_checker=FORMAT_CHECKER
    )

    if list(manifest_validator.iter_errors(manifest)):
        return False, "manifest schema invalid", manifest
    if manifest["capability_id"] != request["capability_id"]:
        return False, "request does not target manifest Capability ID", manifest
    if registry["registration_status"] != "registered":
        return False, "registry record is not registered", manifest
    if manifest["lifecycle_status"] != "verified":
        return False, "manifest lifecycle is not verified", manifest
    if registry["validation_status"] != "passed" or registry["review_status"] != "approved":
        return False, "registry validation or policy review is not approved", manifest
    if registry["manifest_digest"] != canonical_digest(manifest):
        return False, "registry manifest digest is stale or mismatched", manifest
    if request["permission_id"] not in manifest.get("permissions", []):
        return False, "permission is not declared by the capability manifest", manifest
    if list(request_validator.iter_errors(request)):
        return False, "Permission Manager request schema invalid", manifest
    if list(decision_validator.iter_errors(decision)):
        return False, "Permission Manager decision schema invalid", manifest
    if decision["status"] != "granted":
        return False, "Permission Manager decision is not granted", manifest
    if decision["request_id"] != request["request_id"]:
        return False, "decision request_id does not match request", manifest
    if decision["subject"] != request["subject"]:
        return False, "decision subject does not match request", manifest
    for field in ("capability_id", "permission_id", "purpose", "execution_mode"):
        if decision[field] != request[field]:
            return False, f"decision {field} does not match request", manifest
    if decision["approved_scope"] != request["resource_scope"]:
        return False, "approved scope is not identical to the requested scope", manifest
    if parse_time(decision["issued_at"]) > NOW or parse_time(decision["expires_at"]) <= NOW:
        return False, "authorization is not currently valid", manifest
    if decision.get("single_use") and case.get("decision_consumed", False):
        return False, "single-use authorization was already consumed", manifest
    if request["execution_mode"] not in manifest["execution_policy"]["execution_modes"]:
        return False, "execution mode is not allowed by capability policy", manifest
    if request["execution_mode"] in ("remote", "hybrid") and request["data_classification"] != "public":
        if "data.remote_disclose" not in manifest.get("permissions", []):
            return False, "remote disclosure lacks a separate declared permission", manifest
    if case.get("native_permission_status", "granted") != "granted":
        return False, "native permission is not granted", manifest

    return True, "all registry, permission, policy, and native gates passed", manifest


def validate_envelope_cases(cases: list[dict], manifest: dict, schema: dict) -> int:
    validator = Draft202012Validator(schema, format_checker=FORMAT_CHECKER)
    failures = 0
    for case in cases:
        envelope = {
            "schema_version": "1.0",
            "execution_id": "7d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11",
            "request_id": "4d2d4e7e-9c0e-4d50-a2a1-6d5f2f6c8c11",
            "capability_id": manifest["capability_id"],
            "plan_step_id": "step-01",
            "state": case["state"],
            "registry_binding": {
                "registry_id": "registry-record:test-fixture",
                "registration_status": "registered",
                "lifecycle_status": "verified",
                "manifest_digest": canonical_digest(manifest),
                "validation_status": "passed",
                "review_status": "approved",
            },
            "required_permissions": manifest["permissions"],
            "permission_checks": [{
                "permission_id": "media.read",
                "request_ref": "permission-request:test-fixture",
                "decision_ref": "permission-decision:test-fixture",
                "status": "granted",
            }],
            "execution_mode": "on_device",
            "native_permission_status": "granted",
            "verification": {"status": case["verification_status"], "evidence_refs": []},
            "limitations": [],
        }
        if case["verification_status"] == "passed":
            envelope["verification"]["evidence_refs"] = ["verification:evidence-01"]
        if case["include_observation"]:
            envelope["observation_ref"] = "observation:result-01"
        if case.get("omit_permission_check"):
            envelope["permission_checks"] = []
        errors = list(validator.iter_errors(envelope))
        checked_permissions = [item["permission_id"] for item in envelope["permission_checks"]]
        if set(checked_permissions) != set(envelope["required_permissions"]) or len(checked_permissions) != len(set(checked_permissions)):
            errors.append("permission_checks must cover each required permission exactly once")
        actual_valid = not errors
        if actual_valid != case["valid"]:
            failures += 1
            print(f"FAIL envelope: {case['name']} (expected valid={case['valid']})")
            for error in errors:
                print(f"  {'.'.join(str(part) for part in error.absolute_path) or '<root>'}: {error.message}")
        else:
            print(f"PASS envelope: {case['name']}")
    return failures


def main() -> int:
    try:
        manifest_schema = load_json(SCHEMAS / "capability-manifest.schema.json")
        envelope_schema = load_json(SCHEMAS / "execution-envelope.schema.json")
        request_cases = load_json(VALIDATION / "permission-manager-cases.json")
        execution_cases = load_json(VALIDATION / "execution-contract-cases.json")
        manifest_template = load_json(EXAMPLES / "vision-analyze-image.manifest.json")
        for schema in (
            manifest_schema,
            envelope_schema,
            load_json(SCHEMAS / "permission-request.schema.json"),
            load_json(SCHEMAS / "permission-decision.schema.json"),
        ):
            Draft202012Validator.check_schema(schema)
    except (OSError, json.JSONDecodeError, SchemaError) as exc:
        print(f"ERROR: invalid execution contract input: {exc}", file=sys.stderr)
        return 2

    request_template = next(
        case["value"] for case in request_cases["request_cases"]
        if case["name"] == "valid single-operation local media read"
    )
    decision_template = next(
        case["value"] for case in request_cases["decision_cases"]
        if case["name"] == "valid scoped grant"
    )

    failures = 0
    for case in execution_cases["gate_cases"]:
        allowed, reason, manifest = evaluate_gate(case, manifest_template, request_template, decision_template)
        if allowed != case["expected_dispatch"]:
            failures += 1
            print(f"FAIL dispatch gate: {case['name']} (expected {case['expected_dispatch']}, got {allowed}: {reason})")
        else:
            print(f"PASS dispatch gate: {case['name']} ({reason})")

    verified_manifest = copy.deepcopy(manifest_template)
    verified_manifest["lifecycle_status"] = "verified"
    failures += validate_envelope_cases(
        execution_cases["envelope_cases"], verified_manifest, envelope_schema
    )

    if failures:
        print(f"\nFAIL: {failures} execution contract test(s) failed.")
        return 1
    print(
        f"\nPASS: {len(execution_cases['gate_cases'])} cross-component dispatch gates and "
        f"{len(execution_cases['envelope_cases'])} execution-envelope cases."
    )
    print("NOTE: synthetic contract fixtures only; no production registry or runtime was exercised.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
