# Notes: MUI useAutocomplete dependency optimization error

Current blocking error during Vite dependency optimization (rolldown):

[MISSING_EXPORT] "createFilterOptions" is not exported by "node_modules/@mui/material/useAutocomplete/useAutocomplete.js".

Tried:
- Added shim import in main/vite-env file.
- Added vite.config optimizeDeps exclude (did not resolve).
- Added @mui/base dependency (did not resolve).
- Attempted to patch at runtime (insufficient because error is thrown during dependency optimization/build).

Likely durable fix:
- Align/lock compatible MUI versions for the current MUI + Vite/rolldown toolchain.
- Downgrade/upgrade @mui/material (and @mui/base implicitly) to a version where rollup/rolldown can correctly resolve exports.
- Alternatively pin Vite/Rolldown or set `optimizeDeps.esbuildOptions`/`esbuild` to avoid the problematic ESM export resolution path.

Next step to take (outside code edits):
- Reinstall dependencies after removing lockfile + node_modules and pinning MUI version to e.g. 5.16.x (or 5.14.x) and/or Vite version known compatible with rolldown.

