# @blacklight/player

[![CI](https://github.com/blacklight-kit/player/actions/workflows/ci.yml/badge.svg)](https://github.com/blacklight-kit/player/actions/workflows/ci.yml)
[![CodeQL](https://github.com/blacklight-kit/player/actions/workflows/codeql.yml/badge.svg)](https://github.com/blacklight-kit/player/actions/workflows/codeql.yml)

WebRTC streaming player for [Blacklight](https://github.com/isamarin/blacklight) — Xbox xCloud and home console streaming over GSSV.

The package ships three entry points: a React client for in-browser playback, a server module for GSSV session APIs, and streaming helpers for token/config resolution.

## Install

```bash
pnpm add github:blacklight-kit/player#v1.0.1
```

Pin a semver tag in production. For local development alongside the Blacklight monorepo:

```json
"@blacklight/player": "file:../../player"
```

**Peer dependency:** React 18+.

## Package exports

| Import | Description |
|--------|-------------|
| `@blacklight/player/client` | `StreamPlayer` React component, input proxies, types |
| `@blacklight/player/client.css` | Player stylesheet |
| `@blacklight/player/server` | GSSV HTTP helpers (`startStream`, SDP/ICE, keepalive, …) |
| `@blacklight/player/streaming` | Stream route parsing, `xCloudStreamConfig` / token builders |

### Client example

```tsx
import { StreamPlayer, type xCloudStreamConfig } from '@blacklight/player/client';
import '@blacklight/player/client.css';

<StreamPlayer
  communicationHandler={handler}
  onStatusChanged={(status) => console.log(status)}
  videoRenderer="webgl"
/>;
```

### Server example

```ts
import { startStream, sendSDPOffer } from '@blacklight/player/server';

const session = await startStream(streamToken, streamConfig);
```

### Streaming helpers

```ts
import { parseStreamRoute, buildStreamConfig, buildStreamingToken } from '@blacklight/player/streaming';

const route = parseStreamRoute('xcloud_9NBLGGH4R2R6');
const config = buildStreamConfig(route.id, route.type, 'en-US', 1080, token.coreHost);
```

## Development

Requirements: Node.js 24+, pnpm 10.4+.

```bash
pnpm install
pnpm dev          # watch client + server builds
pnpm build        # dist/client.*, dist/server.*, dist/streaming.*
pnpm test         # build + mocha
pnpm run lint
pnpm run typecheck
pnpm run ci       # lint + typecheck + test
```

### Project layout

```
src/
  client/       React player, WebRTC channels, renderers (WebGL / WebGPU / video)
  server/       GSSV session & signaling HTTP client
  streaming/    Stream config and Xbox streaming token helpers
  types/        Shared TypeScript types
tests/          Mocha unit tests (server, chat, streaming)
```

`typecheck` covers `server`, `streaming`, and shared types. The React client is validated via the Vite library build (legacy code still has gradual typing debt).

## Versioning

This repo uses [semantic versioning](https://semver.org/). Release flow:

1. Bump `version` in `package.json`
2. Commit and tag: `git tag v1.0.2 && git push origin main --tags`
3. Update consumers: `"github:blacklight-kit/player#v1.0.2"`

Tags trigger CI; `dist/` is built on `pnpm install` via the `prepare` script.

## CI

GitHub Actions on every push/PR to `main`:

- **Lint** — ESLint (TypeScript)
- **Typecheck** — `tsc` on server & streaming modules
- **Test** — Mocha (15 tests)
- **Build** — verifies all `dist/` artifacts and uploads them as a workflow artifact

[CodeQL](https://github.com/blacklight-kit/player/actions/workflows/codeql.yml) runs weekly and on `main` pushes.

## License

Free software under the [AGPL-3.0](LICENSE).

Use, study, modify, share and run it for any purpose, commercial use included. The
obligation is reciprocity: distribute a modified version, or run one as a network
service, and its recipients get the source under the same terms. No commercial
licence is sold; these terms are the whole deal.

Portions of this package are derived from Jim Kroon's MIT-licensed work; that
notice is retained in [NOTICE](NOTICE).

Contributions are certified under the [DCO](CONTRIBUTING.md) — one sign-off line.
