# Conventions — Mineral Link

These rules apply to both `mineral-link-api` and `mineral-link-web`, so the two repos stay consistent and easy for a reviewer to move between.

## Git Branch Naming

Branches are named by what they do, using a prefix:

- `feat/` — a new feature. Example: `feat/listing-creation`
- `fix/` — a bug fix. Example: `fix/login-error-message`
- `chore/` — maintenance work that isn't a feature or a fix (dependency updates, config changes). Example: `chore/update-eslint-config`
- `docs/` — documentation-only changes. Example: `docs/update-readme`
- `refactor/` — restructuring code without changing what it does. Example: `refactor/listing-service`

Branch names are lowercase, use hyphens (not underscores or spaces), and briefly describe the change.

## Commit Message Format

Format: `type: short description`

Where `type` matches the branch prefixes above (`feat`, `fix`, `chore`, `docs`, `refactor`). The description is written in the present tense, as an instruction (e.g. "add" not "added" or "adds").

Examples:
- `feat: add listing creation endpoint`
- `fix: correct price formatting on miner dashboard`
- `docs: initial project documentation and repository setup`

Commits should be small and focused on one change, rather than bundling unrelated work together.

## Branch Protection

The `main` branch is protected: no direct pushes. All changes go through a pull request, even for a solo contributor during the internship — this builds the habit of reviewable, isolated changes rather than one large history of direct commits.

## Code Style Rules

- **TypeScript strict mode is enabled** in both repos (`"strict": true` in `tsconfig.json`), so that types are checked as thoroughly as possible.
- **Naming**:
  - Variables and functions: `camelCase` (e.g. `getListingById`)
  - Types and interfaces: `PascalCase` (e.g. `ListingResponse`)
  - Constants that never change: `UPPER_SNAKE_CASE` (e.g. `MAX_LISTING_QUANTITY`)
  - Files: `camelCase` for regular files (e.g. `listingService.ts`), `PascalCase` for React components (e.g. `PriceCard.tsx`)
- **Indentation**: 2 spaces, no tabs.
- **Quotes**: single quotes for strings, except where double quotes are required (e.g. JSON).
- **No unused variables or imports** — these should be removed before committing.
- **Every function that isn't immediately obvious gets a short comment** explaining why it exists, not just what it does line-by-line.

## Notes

- ASSUMPTION — needs review: whether ESLint/Prettier configs will be shared/synced between the two repos, or kept separately since they serve different frameworks (Express vs. Next.js).
