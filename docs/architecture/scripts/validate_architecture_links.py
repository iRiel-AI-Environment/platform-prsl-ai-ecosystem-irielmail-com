#!/usr/bin/env python3
"""Validate repository-local Markdown links under docs/architecture.

External URLs and fragment-only references are intentionally skipped. This
checks target existence, not heading-anchor correctness or external availability.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / "docs" / "architecture"
LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
SKIP_SCHEMES = {"http", "https", "mailto", "tel", "data", "sediment"}


def main() -> int:
    failures: list[str] = []
    scanned = 0

    for source in sorted(DOCS.rglob("*.md")):
        scanned += 1
        content = source.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(content):
            raw_target = match.group(1).strip().strip("<>")
            parsed = urlsplit(raw_target)
            if parsed.scheme.lower() in SKIP_SCHEMES or parsed.scheme:
                continue
            target_text = unquote(parsed.path)
            if not target_text:
                continue
            target = (source.parent / target_text).resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                failures.append(f"{source.relative_to(ROOT)}: link escapes repository: {raw_target}")
                continue
            if not target.exists():
                line = content.count("\n", 0, match.start()) + 1
                failures.append(
                    f"{source.relative_to(ROOT)}:{line}: missing target: {raw_target}"
                )

    if failures:
        print("Architecture documentation link validation failed:")
        print("\n".join(failures))
        return 1

    print(f"Validated repository-local Markdown link targets in {scanned} architecture documents.")
    print("External URL availability and heading anchors are outside this validator's scope.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
