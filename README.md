# Task Management Frontend

Task Management Frontend is a Next.js 15 application that powers the web UI for the Task Management platform. It delivers a responsive Material UI experience, authenticates users with NextAuth credentials, talks to the backend through RTK Query, and redirects authenticated users to the task dashboard.

## Features

- Email/password sign-in via NextAuth Credentials, including automatic token refresh.
- Auth-guarded dashboard that redirects successful logins to `/dashboard/tasks`.
- Task listing with server-side pagination, assignment controls, and Material UI cards.
- Task creation modal with client-side validation powered by Zod schemas.
- Toast notifications for API errors and success states.
- Hybrid styling using Material UI components and Tailwind utility classes.

## Tech Stack

- Next.js 15 (App Router, server actions, middleware)
- React 19 + TypeScript
- NextAuth 5 (credentials provider)
- Redux Toolkit Query + Redux middleware
- Material UI 7 and MUI Lab
- Zod, React Toastify, Tailwind CSS

## Prerequisites

- Node.js 18.18 or newer
- Yarn (the project uses a `yarn.lock`)
- Backend API that exposes the task and user endpoints consumed by the frontend

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/mikenthiwa/task_management_front.git
   cd task_management_front
   ```
2. Install dependencies
   ```bash
   yarn install
   ```
3. Create an `.env.local` file at the project root and configure the API endpoint:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5230/api
   ```
   Adjust the URL to point at your Task Management backend.
4. Run the development server
   ```bash
   yarn dev
   ```
   The app is served at `http://localhost:3000`.

## NPM Scripts

- `yarn dev` – Start the development server with Turbopack.
- `yarn build` – Produce a production build.
- `yarn start` – Serve the production build.
- `yarn lint` – Run ESLint.
- `yarn format-write` – Format the codebase with Prettier (in-place).
- `yarn format-test` – Check formatting without writing changes.

## Authentication Flow

- All non-static routes are protected by `src/middleware.ts`.
- Unauthenticated visitors are redirected to `/api/auth/signin`; on successful login they return to `/dashboard/tasks`.
- API calls automatically attach the bearer token pulled from the NextAuth session both on the server (via `auth()`) and on the client (via `getSession()`).

## Test Admin Credentials

- Email: `administrator@localhost.com`
- Password: `Kenya2019%`

These credentials are intended for local development and manual QA of admin-level features. Do not use them in production environments.

## Project Structure Highlights

- `src/app` – Next.js App Router pages, including the `/dashboard/tasks` route.
- `src/features` – UI components and feature-specific logic (task list, modals, user selector).
- `src/core/services` – RTK Query endpoints for tasks and users, plus token refresh helpers.
- `src/store` – Redux store configuration and error handling middleware.

## Contributing

1. Create a feature branch.
2. Implement your changes with appropriate validation.
3. Run `yarn lint` and `yarn format-test` to ensure consistency.
4. Open a PR describing your changes and how to verify them manually.

## License

This project is distributed under the terms defined by the repository owner. Please refer to the main project documentation for licensing details.
