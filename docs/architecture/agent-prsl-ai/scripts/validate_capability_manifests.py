#!/usr/bin/env python3
"""Validate AgentPRSL-AI capability manifests against the canonical JSON Schema."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker, SchemaError

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "schemas" / "capability-manifest.schema.json"
EXAMPLES_DIR = ROOT / "examples"


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def main() -> int:
    schema = load_json(SCHEMA_PATH)
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())

    files = sorted(EXAMPLES_DIR.glob("*.manifest.json"))
    if not files:
        print("ERROR: no example manifests found", file=sys.stderr)
        return 1

    seen_ids: set[str] = set()
    failures = 0

    for path in files:
        try:
            manifest = load_json(path)
        except (OSError, json.JSONDecodeError) as exc:
            print(f"FAIL {path.name}: cannot parse JSON: {exc}")
            failures += 1
            continue

        errors = sorted(validator.iter_errors(manifest), key=lambda error: list(error.absolute_path))
        semantic_errors = []

        for schema_field in ("input_schema", "output_schema"):
            try:
                Draft202012Validator.check_schema(manifest[schema_field])
            except (SchemaError, KeyError) as exc:
                semantic_errors.append(f"{schema_field} is not a valid JSON Schema: {exc}")

        capability_id = manifest.get("capability_id", "")
        module_id = manifest.get("module_id", "")
        if capability_id in seen_ids:
            semantic_errors.append(f"duplicate capability_id: {capability_id}")
        seen_ids.add(capability_id)

        if capability_id.startswith(("prsl.agent.", "prsl.integration.")) and not capability_id.startswith(module_id + "."):
            semantic_errors.append("capability_id must begin with its module_id plus an operation suffix")

        declared_permissions = set(manifest.get("permissions", []))
        dependency_permissions = {
            item["id"]
            for item in manifest.get("dependencies", {}).get("permission", [])
            if item.get("required", True)
        }
        if declared_permissions != dependency_permissions:
            semantic_errors.append(
                "permissions must exactly match required dependencies.permission entries"
            )

        if errors or semantic_errors:
            failures += 1
            print(f"FAIL {path.name}")
            for error in errors:
                location = ".".join(str(part) for part in error.absolute_path) or "<root>"
                print(f"  schema {location}: {error.message}")
            for error in semantic_errors:
                print(f"  semantic: {error}")
        else:
            print(f"PASS {path.name}: {capability_id}")

    if failures:
        print(f"\n{failures} manifest(s) failed validation.")
        return 1

    print(f"\nPASS: {len(files)} manifest(s); manifest, nested schemas, and semantic checks succeeded.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
