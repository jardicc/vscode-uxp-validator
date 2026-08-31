# Architecture Review & Refactoring Plan — Validator for UXP

> Status: analysis only, nothing implemented yet.
> Scope: whole extension (client, server, common, vendored language services).
> Intended audience: implementer or AI agent executing the refactor.

## Repository context

- VS Code extension with LSP client/server split:
  - `client/src/` — extension activation (`extension.ts`), status bar UI (`UI.ts`), settings wrapper (`Settings.ts`), client↔server request handlers.
  - `server/src/` — `server.ts` → `LSPServer.ts` (static class), `Validator.ts` (CSS/LESS/SCSS + manifest.json validation), `serverRequestHandlers.ts`.
  - `common/` — `VersionMatcher.ts`, `versionTable.ts`, `types.ts`, `constants.ts`, `jsonrepair.ts`.
  - `server/src/CssServiceOriginal/` — vendored fork of `vscode-css-languageservice`.
  - `server/src/CssService/` — UXP-specific lint rules, custom data, and a full copy of the upstream test suite.
  - `server/src/manifestValidation/JsonService/` — vendored fork of `vscode-json-languageservice` + UXP manifest schemas (`Schemas/V4Schema`, `V5Schema`, `V6Schema`, `unsupportedSchema`), inlay hints, quirks detector.

---

## Problem 1 — Inverted dependency: vendored library reaches into app layer (CRITICAL)

### Findings

- `server/src/CssService/services/lint.ts` (line ~17) imports `LSPServer` and reads the global singleton as a default parameter:
  ```ts
  uxpCustomData: UXPCustomData = new UXPCustomData(cssData, LSPServer.validator.versionMatcher.activeUXPVersion)
  ```
  A low-level lint rule depends on the LSP application layer.
- `server/src/CssServiceOriginal/services/cssValidation.ts` (lines ~9–11) imports `LintConfigurationSettings`, `Rules`, and `LintVisitor` **from `CssService/`** — the "original" fork depends on the customization layer. This is a circular dependency between the two folders, and it means `CssServiceOriginal` is not pristine and cannot be diffed/updated against upstream.

### Fix

1. Remove the `LSPServer` import from `CssService/services/lint.ts`. Pass the active UXP version (or a prebuilt `UXPCustomData`) explicitly through the validation call chain: `Validator.update()` → `ls.doValidation(document, stylesheet, settings)` — thread it via `LanguageSettings` (upstream supports custom settings objects) or an explicit parameter on the entry function.
2. Remove the `CssServiceOriginal → CssService` imports. Instead, inject the UXP lint visitor from the outside (see Problem 2) so the fork stays byte-identical to upstream.
3. Acceptance: `grep -r "LSPServer" server/src/CssService*` returns nothing; `grep -r "CssService/" server/src/CssServiceOriginal` returns nothing.

---

## Problem 2 — Three vendored language-service forks (HIGH, biggest long-term cost)

### Findings

- `CssServiceOriginal/` = full fork of `vscode-css-languageservice` (parser, services, beautify, tests).
- `CssService/` = partial fork (lint.ts, lintRules.ts, UXPCustomData) **plus a full duplicated upstream test suite** (`CssService/test/**` imports everything from `../../CssServiceOriginal/...`).
- `manifestValidation/JsonService/` = fork of `vscode-json-languageservice`.
- Consequences: no upstream bugfixes or new CSS property data, huge unmaintained code surface, duplicated tests, slow builds.

### Fix

1. Replace `CssServiceOriginal` with the npm package `vscode-css-languageservice`:
   - UXP-specific property/at-rule/pseudo-class data → implement `ICSSDataProvider` (via `newCSSDataProvider(cssData)`) and pass with `useDefaultDataProvider: false` in `getCSSLanguageService({ customDataProviders, useDefaultDataProvider: false })`.
   - UXP-specific lint (unsupported property/value/unit/at-rule per UXP version) → run as a **separate post-validation pass**: parse with the upstream service, walk the returned AST (`parseStylesheet` result is a `Stylesheet` node tree) with the existing `LintVisitor`, and merge diagnostics in `Validator.update()`. Keep only `CssService/` (renamed e.g. `uxpCssLint/`) as first-party code.
2. Evaluate replacing `manifestValidation/JsonService` with npm `vscode-json-languageservice` — the schemas, inlay hints, and quirks detector are already separate modules and only need the public API (`getLanguageService`, `parseJSONDocument`, `doValidation`, `doHover`, `doComplete`, `schemaRequestService`). Check first whether the fork contains real behavioral patches (diff against the upstream version it was copied from); if yes, document them before migrating.
3. Delete the duplicated upstream test suites; keep only tests that cover first-party UXP lint/quirks/version-matching code.
4. Acceptance: `server/src/CssServiceOriginal` and `manifestValidation/JsonService` deleted; extension compiles against npm packages; UXP lint tests still pass.

> Note: do Problem 1 first — it removes the coupling that currently makes this migration impossible.

---

## Problem 3 — Global mutable state / static classes (HIGH)

### Findings

- `LSPServer` is an all-static class holding `documents`, `validator`, `settings`, `connection`. `Validator`'s constructor reads `LSPServer.settings` statically; `jsonQuirksDetector.ts` reads `LSPServer.validator.versionMatcher` globally.
- `LSPServer.validator` is only created inside `onInitialized` (marked `// TODO improve instantiation`); anything touching it earlier crashes.
- One global `VersionMatcher` for the whole workspace.
- Effectively untestable without booting a full LSP connection.

### Fix

1. Convert `LSPServer` to an instantiated class (or a composition of small services): `new LSPServer(connection)` created in `server.ts`.
2. Inject dependencies via constructors: `new Validator({ settings, documents, connection, sendDiagnostics })`.
3. `jsonQuirksDetector` and `inlayHint` receive the `VersionMatcher` as a function argument (inlayHint already does; quirks detector must stop importing `LSPServer`).
4. Acceptance: no module outside `LSPServer.ts` imports `LSPServer`; `Validator` unit-testable with a mock connection.

---

## Problem 4 — Inlay hint handlers re-registered on every validation (MEDIUM, real bug)

### Findings

- `Validator.inlineHintExperiment()` calls `connection.languages.inlayHint.on(...)` and `.resolve(...)`:
  - once from `start()` (marked `! FIXME - inLay hints shows error without this one`),
  - again from `cleanAll()`,
  - and again on **every** manifest.json validation in `update()`.
- The registered handler captures the last-validated `document`/`jsonDocument` in a closure and ignores `arg.textDocument.uri` except for a `endsWith("manifest.json")` suffix check → with multiple manifests (or after edits) hints are computed from a stale or wrong document.

### Fix

1. Register `inlayHint.on` / `inlayHint.resolve` exactly once during server initialization.
2. Inside the handler, resolve the document from `documents.get(arg.textDocument.uri)` and the parsed JSON from the existing `languageModelCache` (`jsonDocuments`), not from a closure.
3. Return `[]` when the validator is disabled or the URI is not a manifest.
4. Acceptance: `inlayHint.on` appears exactly once in the codebase, outside `Validator.update()`.

---

## Problem 5 — Enable/version state has three sources of truth (HIGH)

### Findings

- Setting `uxpvalidator.enabled` is declared in `package.json` but **never read by the server** — `Validator.start()` hardcodes `this._enabled = true`. Start/Stop commands only flip in-memory server state; it is lost on window reload. `UI.ts` has `// TODO add enable/disable support`.
- `SERVER_REQUESTS.SET_VERSION` handler on the server (`LSPServer.onSetVersion`) is dead code (body commented out); the UI instead writes settings and calls `restartServer` — two protocols for the same operation.
- Any configuration change triggers a full `restartServer()` (stop + start + revalidate everything).
- When the user edits `manifest.json` and the detected UXP version changes, **open CSS/LESS/SCSS documents are not revalidated** — the Problems panel keeps diagnostics computed for the old version until each CSS file is touched.

### Fix

1. Make workspace configuration the single source of truth:
   - Enable/Disable commands write `uxpvalidator.enabled`; the server reads config (initial fetch + `onDidChangeConfiguration`) and reacts.
   - Delete the `ENABLE_VALIDATOR` / `SET_VERSION` / `RESTART_SERVER` custom request round-trips where config can carry the state; keep only server→client notifications for status-bar display (version label, enabled state).
2. On config change, re-configure in place (`fetchSettings` → `configureJsonLs` → `validateAllDocs`) instead of restart.
3. After `initVersionMatcher` detects a version change during manifest validation, call `validateAllDocs()` (or at least revalidate all open style documents).
4. Delete dead `onSetVersion` path.
5. Acceptance: toggling enabled in Settings UI enables/disables diagnostics without restart; editing `requiredVersion`/host version in manifest.json immediately updates CSS diagnostics; state survives window reload.

---

## Problem 6 — Single manifest / single folder / single shared debounce (MEDIUM)

### Findings

- `Validator.findManifestFiles()` uses only `folders[0]` of the workspace and then only `files[0]` of the globby result → multi-root workspaces and monorepos with several plugins are all validated against whichever manifest happens to be found first.
- `LSPServer.onDidChangeContentDebounced` is **one shared lodash `debounce`** for all documents — alternating edits between two files cancel the first file's pending validation (the event argument is overwritten).
- On every manifest change the content is parsed three times: `jsonrepair`+`JSON.parse` in `assignManifestVersionFromContent`, again in `initVersionMatcher` (via `VersionMatcherFromFile`), plus `jsonLs.parseJSONDocument`. The `languageModelCache` in `LSPServer` exists but `Validator.update()` doesn't use it.

### Fix

1. Per-document version resolution: map each style/manifest document to its nearest ancestor `manifest.json` (walk up from the document URI; cache per folder). Hold a `Map<manifestUri, VersionMatcher>` instead of one global matcher. Iterate **all** workspace folders.
2. Debounce per URI: `Map<string, DebouncedFunc>` (create on first change, dispose on close), or a simple timestamp/version check.
3. Parse the manifest once: `jsonrepair` + parse a single time and feed the result to both the schema-version switch and `VersionMatcherFromFile`; reuse `jsonDocuments` cache in `update()` instead of calling `parseJSONDocument` again.
4. Acceptance: two manifests with different versions in one workspace produce different diagnostics for their respective CSS files; rapid alternating edits in two files validate both.

---

## Problem 7 — Packaging and dependency hygiene (MEDIUM)

### Findings

- Root `package.json` has build/test tooling in `dependencies` instead of `devDependencies`: `typescript`, `webpack`, `webpack-cli`, `ts-loader`, `mocha`, `rimraf`, `@types/*`, `@typescript-eslint/*`, `@vscode/test-web`. Meanwhile `eslint` itself is the only entry in `devDependencies` (so lint plugins ship without their host).
- `postinstall: cd client && npm install && cd ../server && npm install` — three independent `node_modules` trees, no version dedupe, breaks on immutable installs.
- Client hardcodes the dev tsc output path `server/out/server/src/server.js`; the webpack production layout differs (commented-out `devPath`/`prodPath` fallback shows the problem was known). Fragile: a production package built with webpack would not resolve unless the webpack config replicates this exact path.

### Fix

1. Move all tooling and `@types/*` to `devDependencies`; keep only runtime deps (`jsonc-parser`, `jsonrepair`, `lodash` or per-function lodash imports, `@vscode/l10n`, `semver`, `globby`, `vscode-languageclient/server` packages) in the right sub-package.
2. Adopt npm workspaces (`"workspaces": ["client", "server"]`), delete the `postinstall` cd-chain.
3. Unify the server entry path between tsc and webpack builds (either make webpack emit to `server/out/server/src/server.js` intentionally and document it, or restore the existence-check fallback).
4. Acceptance: `npm ci` at root installs everything; `vsce package` output activates correctly; `npm ls typescript` shows one copy.

---

## Problem 8 — Smaller systemic issues (LOW)

- Production `console.log` noise everywhere (including logging the entire `vscode` module object in `UI.addStatusBarMenu`, every completion list, every request). → Introduce a leveled logger wired to `connection.console`; strip debug logs.
- `onCompletion` / `onHover` ignore LSP `CancellationToken`s. → Accept and honor tokens (the commented-out `runSafeAsync` scaffolding suggests this was intended).
- `ls.configure({validate: true})` runs on every style validation. → Configure once per language service (or on settings change only).
- `getPropertiesReport.ts` (a dev-time reporting script) lives in `server/src` and imports both CSS data sets into the server bundle. → Move to a `scripts/`/`tools/` folder excluded from the build.
- Large blocks of commented-out code and TODO/FIXME markers in critical paths (`extension.ts`, `Validator.ts`, `LSPServer.ts`). → Delete or convert to tracked issues during the refactor.
- `Settings.enabled` setter and `setVersion` miss `await` on `update()` in one place (`Settings.ts` `setVersion` doesn't await; `enabled` is a sync setter calling async API).

---

## Suggested execution order

| Phase | Items | Rationale |
| --- | --- | --- |
| 1 | Problem 1 (decouple forks from `LSPServer`) | Unblocks everything; small, mechanical |
| 2 | Problem 3 (de-static `LSPServer`, DI) | Enables unit tests before behavior changes |
| 3 | Problem 5 (settings as single source of truth) + Problem 4 (inlay hint registration) | User-visible correctness bugs |
| 4 | Problem 6 (per-manifest matchers, per-URI debounce, single parse) | Correctness in multi-plugin workspaces |
| 5 | Problem 2 (migrate to upstream npm language services) | Largest change; do with test safety net in place |
| 6 | Problem 7 (workspaces, deps) + Problem 8 (cleanup) | Hygiene; can be done anytime, low risk |

## Verification checklist (after each phase)

- `npm run compile` (tsc -b) clean.
- Existing mocha/wallaby tests for `CssService` UXP lint and `manifestValidation` pass.
- Manual smoke test: open a plugin folder with `manifest.json` (v4/v5/v6), confirm status bar version, CSS property diagnostics change when switching versions, Start/Stop works and survives reload.
- `vsce package` + install the `.vsix` to verify the production server path resolves (Problem 7.3 regression guard).
