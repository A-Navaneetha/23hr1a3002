// Temporary shim file for MUI useAutocomplete ESM optimization issues.
// This project may not directly use Autocomplete, but MUI may import it internally.
//
// Current environment: rolldown dependency optimization fails with:
// [MISSING_EXPORT] "createFilterOptions" is not exported by .../useAutocomplete.js
//
// This shim is a best-effort safety net: it does not address the build-time error.
// The real durable fix is to align MUI versions (see TODO).

import './patches/mui-useAutocomplete-createFilterOptions'


