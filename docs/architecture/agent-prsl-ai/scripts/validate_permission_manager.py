#!/usr/bin/env python3
"""Validate Permission Manager schemas and positive/negative contract vectors."""

from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker, SchemaError

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_DIR = ROOT / "schemas"
CASES_PATH = ROOT / "validation" / "permission-manager-cases.json"


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_cases(label: str, cases: list[dict], schema: dict) -> int:
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    failures = 0
    for case in cases:
        errors = list(validator.iter_errors(case["value"]))
        actual_valid = not errors
        if actual_valid != case["valid"]:
            failures += 1
            print(f"FAIL {label}: {case['name']} (expected valid={case['valid']})")
            for error in errors:
                location = ".".join(str(part) for part in error.absolute_path) or "<root>"
                print(f"  {location}: {error.message}")
        else:
            print(f"PASS {label}: {case['name']}")
    return failures


def main() -> int:
    try:
        request_schema = load_json(SCHEMA_DIR / "permission-request.schema.json")
        decision_schema = load_json(SCHEMA_DIR / "permission-decision.schema.json")
        cases = load_json(CASES_PATH)
        Draft202012Validator.check_schema(request_schema)
        Draft202012Validator.check_schema(decision_schema)
    except (OSError, json.JSONDecodeError, SchemaError) as exc:
        print(f"ERROR: invalid Permission Manager validation input: {exc}", file=sys.stderr)
        return 2

    failures = validate_cases("request", cases["request_cases"], request_schema)
    failures += validate_cases("decision", cases["decision_cases"], decision_schema)

    for case in cases["decision_cases"]:
        decision = case["value"]
        if case["valid"] and decision.get("status") == "granted":
            try:
                issued = datetime.fromisoformat(decision["issued_at"].replace("Z", "+00:00"))
                expires = datetime.fromisoformat(decision["expires_at"].replace("Z", "+00:00"))
                if expires <= issued:
                    failures += 1
                    print(f"FAIL decision semantics: {case['name']} (expiry must follow issue time)")
            except (KeyError, ValueError) as exc:
                failures += 1
                print(f"FAIL decision semantics: {case['name']} ({exc})")

    if failures:
        print(f"\nFAIL: {failures} Permission Manager validation error(s).")
        return 1

    request_count = len(cases["request_cases"])
    decision_count = len(cases["decision_cases"])
    print(f"\nPASS: {request_count} request vectors and {decision_count} decision vectors; both Draft 2020-12 schemas are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
