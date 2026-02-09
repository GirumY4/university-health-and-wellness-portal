# University Health & Wellness Portal

Lightweight admin portal for university health and wellness services — built with React, TypeScript, Vite and MUI.

## Quick start

Prerequisites: Node 18+ and npm or yarn.

Install dependencies:

```bash
npm install
```

Run the dev server with Fast Refresh:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Useful scripts (from `package.json`):

- `dev` — start Vite dev server
- `build` — type-check and build with Vite
- `preview` — preview production build
- `lint` / `lint:fix` — run ESLint
- `type-check` — run TypeScript checks
- `clean` — clear caches and `dist`
- `dev:full` — clean, type-check, then start dev server

## Tech stack

- React 19 + TypeScript
- Vite (bundler/dev server)
- MUI (Material UI) for components and theming
- React Router for routing
- Axios for HTTP services

## Project structure (high level)

- `src/` — application source
  - `app/` — main app shell, theme provider, router
  - `components/` — shared UI components and layout
  - `contexts/` — React contexts (Auth, Theme)
  - `features/` — domain feature modules (appointments, dashboard, records, etc.)
  - `services/` — API clients and service helpers
  - `styles/` — global styles and theme definitions

See the repository tree for full layout.

## Development notes

- This repo uses TypeScript project references and enforces type-checking before builds.
- ESLint is configured; use `npm run lint:fix` to auto-fix where possible.

## Contributing

Please open issues or pull requests. Keep changes small and focused; run `npm run lint` and `npm run type-check` before submitting.

## License

Check the repository for a `LICENSE` file.
