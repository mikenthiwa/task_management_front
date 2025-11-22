# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router (e.g., `page.tsx`, `layout.tsx`, API routes under `api/`). Global styles in `src/app/globals.css`.
- `src/features`: Feature modules with UI under `components/` (e.g., `task-list.component.tsx`).
- `src/core`: API clients (`services/`), shared interfaces (`common/interfaces/`), and server helpers.
- `src/store`: Redux Toolkit store and middleware.
- `src/providers`: App-level providers (theme, MUI, Next themes).
- `public`: Static assets. `middleware.ts` at `src/` handles auth flows.
- Path alias: `@/*` → `src/*` (see `tsconfig.json`).

## Build, Test, and Development Commands
- `yarn dev` / `npm run dev`: Run locally with Turbopack.
- `yarn build` / `npm run build`: Production build.
- `yarn start` / `npm run start`: Start production server.
- `yarn lint`: ESLint (Next + TypeScript rules).
- `yarn format-test`: Check Prettier formatting.
- `yarn format-write`: Auto-format codebase.

## Coding Style & Naming Conventions
- TypeScript, `strict` mode enabled.
- Prettier: 2-space indent, semicolons, single quotes, 80-char width, JSX single quotes.
- ESLint: extends `next/core-web-vitals` and `next/typescript`; ignores `.next`, `node_modules`, `out`.
- Files: kebab-case (e.g., `user-selector.component.tsx`). React components use PascalCase names.
- Next.js files follow conventions: `page.tsx`, `layout.tsx`, `route.ts`.
- Prefer `@/` imports over relative chains (e.g., `@/core/services/api`).

## Testing Guidelines
- No test suite committed yet. If adding tests:
  - Framework: React Testing Library with Vitest or Jest.
  - Location: colocate as `*.test.ts(x)` next to the source file.
  - Add a `test` script in `package.json` and keep core logic covered.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat`, `fix`, `chore`, etc. with optional scope.
  - Examples: `feat(auth): add Google OAuth`, `fix(pagination): correct page index type`.
- PRs: include clear description, linked issues, screenshots for UI changes, and steps to verify.
- Ensure `yarn lint` and `yarn format-test` pass before requesting review.

## Security & Configuration Tips
- Use `.env.local` for secrets. Expected keys: `NEXT_PUBLIC_API_BASE_URL`, `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- Never commit secrets or `.env.local`. Validate auth flows when changing `middleware.ts` or NextAuth routes.
