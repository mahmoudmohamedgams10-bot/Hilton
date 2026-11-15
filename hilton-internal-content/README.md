# hilton-internal-content

Frontend-only internal content redesign for the Hilton Maintenance (ShiftFlow) app.

## Rules
- Dark mode, Arabic, full RTL, Android-first.
- Reuses `@/services/api`, `@/lib/types`, `@/lib/theme`, `@/state/AuthContext`.
- ZERO database access; no schema/migration/RLS/Edge Function changes.
- No fake data; screens read only from existing contracts.

## Usage (after approval)
Import screens and mount them behind `app/(root)` routes, or copy screen bodies into the matching existing route files. See FILE_REPLACEMENT_MAP.md.
