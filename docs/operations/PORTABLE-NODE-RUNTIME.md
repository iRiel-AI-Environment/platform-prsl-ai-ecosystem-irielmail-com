# Portable Node.js Runtime

## Purpose

The platform can be built as a Nitro Node.js server and packaged as a standard OCI container. GitHub is the canonical source and CI environment. Lovable may remain a visual/build validation surface; it is not required to build or run this container. This repository does not select a hosting provider or publish images to a registry.

## Build

Use Node.js 22 and the repository's Bun lockfile:

```bash
bun install --frozen-lockfile
bun run build
docker build -t prsl-ai-ecosystem-platform:local .
```

The Dockerfile intentionally copies the already-built `.output/` directory. It does not install development dependencies or rebuild application source inside the runtime image.

## Run

```bash
docker run --rm -p 3000:3000 prsl-ai-ecosystem-platform:local
```

The container listens on `0.0.0.0:3000`. The image runs as the unprivileged `node` user and includes a Docker health check against `/api/public/v1/health`.

## Runtime configuration

The public website and local-only Agent console can start without provider credentials. Optional integrations must remain disabled or fail closed when their required configuration is absent.

Only configure server-side values when the corresponding trusted integration has been implemented and approved:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — server-only; never expose to browser code.
- `LOVABLE_CRON_SECRET` and optional `LOVABLE_CRON_SECRET_PREVIOUS` — only if the corresponding scheduled endpoint is retained and enabled.

Client-exposed `VITE_*` variables are embedded at build time. Do not pass secrets through `VITE_*` variables or Docker build arguments. Do not bake credentials into the image. Supply runtime secrets through the selected host's secret manager.

The repository currently has no verified production persistence/authentication deployment, no production authorization adapters, and no selected hosting target. A successful container build or health check does not close those readiness gaps. See the [Implementation Readiness and Architecture Gap Register](../architecture/IMPLEMENTATION-READINESS-AND-GAP-REGISTER.md).

## Hosting neutrality

The OCI image can be run by any compatible container host. Selecting a host, configuring a domain, provisioning persistent services, and deploying the image are separate operational decisions. This change does not alter DNS, mail records, Cloudflare, Lovable projects, or public deployments.
