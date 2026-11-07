# AgentPRSL-AI — Capability and Module Catalog

**Classification:** Initial architecture catalog  
**Owner:** Robert Software Labs  
**Parent identity:** `@AgentPRSL-AI`  
**Contract:** [Canonical Capability Contract v1.0](./capability-contract.md)  
**Registry:** [Capability Registry Specification](./registry-specification.md)  
**Manifest schema:** [Capability Manifest JSON Schema](./schemas/capability-manifest.schema.json)

## 1. Purpose

This catalog organizes the modules, operational interfaces, supporting tools, and integration extensions identified in the current AgentPRSL-AI design.

It is an architecture inventory, not an implementation report. Candidate operations below describe intended capability boundaries; they are not claims that corresponding code, APIs, or integrations currently exist.

## 2. Classification

| Class | Meaning | Examples |
|---|---|---|
| Capability module | Groups related specialist operations. | Vision, Voice, Reader |
| Supporting tool group | Provides alternatives or supporting resources. | UsageAlternativeTools |
| Developer interface | Exposes authorized development workflows. | CLI |
| Integration extension | Connects to an external platform or system surface. | Apple Integration |

A module can contain multiple independently registered capabilities. A module name alone is not an executable Capability ID.

## 3. Capability modules

### 3.1 Vision Intelligence

[Manifest: Analyze Image](./examples/vision-analyze-image.manifest.json)

**Module ID:** `prsl.agent.vision`  
**Display name:** Vision Intelligence  
**Responsibility:** Visual perception and interpretation.

Candidate operations:

- `prsl.agent.vision.analyze-image`
- `prsl.agent.vision.describe-scene`
- `prsl.agent.vision.extract-visual-text`
- `prsl.agent.vision.compare-visual-inputs`

Typical input: authorized image or frame reference, analysis intent, language, and output constraints.

Typical output: structured visual description, extracted information, confidence or uncertainty indicators, and limitations.

Potential permissions: `media.read`, `camera.use`, and operation-specific accessibility permissions.

[Representative manifest](./examples/vision-analyze-image.manifest.json).

### 3.2 Voice Intelligence

[Manifest: Synthesize Speech](./examples/voice-synthesize-speech.manifest.json)

**Module ID:** `prsl.agent.voice`  
**Display name:** Voice Intelligence  
**Responsibility:** Audio input, speech understanding, spoken interaction, and voice output.

Candidate operations:

- `prsl.agent.voice.transcribe-audio`
- `prsl.agent.voice.synthesize-speech`
- `prsl.agent.voice.detect-language`
- `prsl.agent.voice.adapt-speech-style`

Typical input: authorized audio reference or text, language/locale, speech task, and voice constraints.

Typical output: transcript, spoken-audio reference, language metadata, or speech analysis.

Potential permissions: `microphone.use`, `speech.output`, and `media.read`.

Voice identity, regional variation, accent, prosody, and register must remain policy-governed and accessible.

### 3.3 Location Intelligence

[Manifest: Resolve Location](./examples/location-resolve-location.manifest.json)

**Module ID:** `prsl.agent.location`  
**Display name:** Location Intelligence  
**Responsibility:** Geographic and spatial context.

Candidate operations:

- `prsl.agent.location.resolve-location`
- `prsl.agent.location.interpret-place`
- `prsl.agent.location.calculate-proximity`
- `prsl.agent.location.build-spatial-context`

Typical input: user-authorized coordinates, place reference, or geographic query.

Typical output: normalized place or spatial context with precision and freshness metadata.

Potential permissions: `location.coarse`, `location.precise`, and `network.access` where needed.

Precise location must not be requested when approximate location is sufficient.

### 3.4 Recognizers Intelligence

[Manifest: Classify Content](./examples/recognizers-classify-content.manifest.json)

**Module ID:** `prsl.agent.recognizers`  
**Display name:** Recognizers Intelligence  
**Responsibility:** Recognition, detection, identification, and classification across supported modalities.

Candidate operations:

- `prsl.agent.recognizers.detect-object`
- `prsl.agent.recognizers.recognize-pattern`
- `prsl.agent.recognizers.classify-content`
- `prsl.agent.recognizers.extract-entities`

Typical input: authorized content reference, recognition target, and classification constraints.

Typical output: recognized items, labels, structured entities, confidence/uncertainty, and limitations.

Permissions depend on the input modality and source.

### 3.5 Tools Intelligence

[Manifest: Evaluate Tool](./examples/tools-evaluate-tool.manifest.json)

**Module ID:** `prsl.agent.tools`  
**Display name:** Tools Intelligence  
**Responsibility:** Tool discovery, suitability evaluation, selection, and authorized invocation.

Candidate operations:

- `prsl.agent.tools.discover-tool`
- `prsl.agent.tools.evaluate-tool`
- `prsl.agent.tools.invoke-tool`
- `prsl.agent.tools.inspect-tool-result`

Typical input: intent, tool constraints, declared arguments, and authorization context.

Typical output: selected tool reference, execution result, or structured reason why no tool is eligible.

Potential permissions: `tools.execute`, plus permissions required by the selected tool.

Tool discovery does not authorize execution. Every invocation must be independently validated against policy.

### 3.6 Creative Intelligence

[Manifest: Generate Text](./examples/creative-generate-text.manifest.json)

**Module ID:** `prsl.agent.creative`  
**Display name:** Creative Intelligence  
**Responsibility:** Creative planning and generation of user-requested content.

Candidate operations:

- `prsl.agent.creative.generate-text`
- `prsl.agent.creative.generate-image`
- `prsl.agent.creative.transform-content`
- `prsl.agent.creative.prepare-creative-brief`

Typical input: user brief, supplied references, output format, and constraints.

Typical output: generated artifact or structured creative plan, with provenance and limitations where applicable.

Permissions depend on the requested output and the execution provider.

### 3.7 Reader Intelligence

[Manifest: Extract Document Content](./examples/reader-extract-document-content.manifest.json)

**Module ID:** `prsl.agent.reader`  
**Display name:** Reader Intelligence  
**Portuguese-facing alias:** `Leitor_Intelligence`  
**Responsibility:** Reading, extracting, interpreting, and presenting content accessibly.

Candidate operations:

- `prsl.agent.reader.extract-document-content`
- `prsl.agent.reader.read-content-aloud`
- `prsl.agent.reader.summarize-document`
- `prsl.agent.reader.explain-structured-content`

Typical input: authorized document, image, or text reference; language; reading preferences; and task.

Typical output: extracted text, structured interpretation, accessible summary, or speech-ready content.

Potential permissions: `files.read`, `media.read`, `accessibility.read`, and `speech.output`.

The module must preserve source meaning, distinguish extracted facts from interpretation, and communicate uncertainty.

## 4. Supporting tool group

### Usage and Alternative Tools

**Registry group:** `prsl.agent.usage-alternative-tools`  
**Original label:** `UsageAlternativeTolls`  
**Recommended spelling:** `UsageAlternativeTools`

Responsibility:

- Identify alternative tools or routes when a preferred tool is unavailable.
- Evaluate compatibility and capability equivalence.
- Present limitations before substituting a materially different tool.
- Avoid silent changes to privacy, cost, data residency, or execution mode.

This group is a supporting tool category. It is not automatically an autonomous agent or a policy authority.

## 5. Developer interface

### CLI

**Interface ID:** `prsl.agent.cli`  
**Class:** Developer Interface

The CLI is an authorized interface for development and operational workflows. It is not, by itself, a specialist intelligence capability.

Candidate command groups:

- capability discovery and inspection;
- manifest validation;
- local development and testing;
- runtime diagnostics;
- authorized execution;
- environment and configuration inspection.

Any command that changes state, accesses secrets, deploys resources, or invokes external systems must have explicit authorization and a documented execution policy.

## 6. Integration extension

### Apple Integration

**Extension ID:** `prsl.integration.apple`  
**Document:** [Apple Integration — Canonical Extension v5](./extensions/apple-integration-v5.md)

Apple Integration is an extension boundary, not a capability module and not the owner of iRiel identity or memory.

It may expose eligible operations through Apple system surfaces, subject to platform availability, user authorization, and PRSL-AI policy.

## 7. Naming corrections and compatibility

| Supplied label | Recommended canonical label | Treatment |
|---|---|---|
| `Vision_Intelligence` | `Vision_Intelligence` | Retain. |
| `Voice_Intelligence` | `Voice_Intelligence` | Retain. |
| `Location_Intelligence` | `Location_Intelligence` | Retain. |
| `Recognizers_Intelligence` | `Recognizers_Intelligence` | Retain. |
| `Tolls_Intelligence` | `Tools_Intelligence` | Correct likely spelling error. |
| `Creative_Intelligence` | `Creative_Intelligence` | Retain. |
| `Leitor_Intelligence` | `Reader_Intelligence` | Use English canonical label; preserve Portuguese alias. |
| `UsageAlternativeTolls` | `UsageAlternativeTools` | Correct likely spelling error. |
| `CLI` | `CLI` | Classify as developer interface. |
| `Apple_Integration` | `Apple_Integration` | Classify as canonical integration extension. |

Do not silently rename existing code symbols or deployed identifiers. Apply these canonical labels to new documentation and registrations, and use explicit migration mappings if existing identifiers are found.

## 8. Lifecycle and implementation status

Until implementation evidence is added, catalog entries should be treated as **architecture-defined / implementation unverified**.

Recommended lifecycle values:

- `proposed`
- `specified`
- `in_development`
- `implemented`
- `verified`
- `deprecated`

A status transition to `implemented` or `verified` requires a code reference and acceptance evidence.

## 9. Next technical artifacts

1. Per-module operation manifests and input/output schemas.
2. [Permission Manager Specification](./permission-manager-specification.md) — authorization authority, consent, scope, revocation, and enforcement.
3. Dependency and Availability Resolver contracts.
4. Execution Policy evaluation contract.
5. Runtime implementation and acceptance tests.
