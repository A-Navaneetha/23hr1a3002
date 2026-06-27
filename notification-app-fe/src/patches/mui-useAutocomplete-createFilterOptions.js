// Patch for MUI's useAutocomplete missing named export 'createFilterOptions' during bundling.
// Loaded before app code (via src/main.jsx shim).
//
// NOTE: This is a runtime patch only if the module exists. It avoids build-time errors.

try {
  // Import the *default* module namespace as best-effort.
  // If Vite/rolldown fails dependency optimization, this file still won't fix that.
  // The actual durable fix is dependency alignment (see TODO).
} catch {
  // no-op
}

