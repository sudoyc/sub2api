# Arqel Docs Site

This is the VitePress documentation site for `docs.arqel.net`.

## Development

```bash
pnpm install
pnpm run dev
```

## Docker hot reload

From the repository root:

```bash
docker compose -f deploy/docker-compose.docs-dev.yml up -d
```

Open:

```text
http://127.0.0.1:5174
```

Optional port override:

```bash
DOCS_DEV_PORT=5175 docker compose -f deploy/docker-compose.docs-dev.yml up -d
```

Logs:

```bash
docker compose -f deploy/docker-compose.docs-dev.yml logs -f docs
```

Stop:

```bash
docker compose -f deploy/docker-compose.docs-dev.yml down
```

## Build

```bash
pnpm run build
```

## Preview

```bash
pnpm run preview
```

## Deployment target

- Domain: `docs.arqel.net`
- Build output: `docs-site/docs/.vitepress/dist`

Configure DNS and hosting/CDN separately. Do not deploy unless explicitly requested.
