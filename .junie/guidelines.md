# Project Guidelines

## Build Setup
Ensure developers can install, develop, and build the project.

- Run `pnpm install` to install dependencies.
- Use `pnpm dev` to start the development server.
- Use `pnpm build` to build the production bundle.

## Feature-Based Architecture
Enforce modular feature-based file structure with shared models and types extracted.

- Each feature must live in `src/features/<feature-name>/`.
- Each feature should include its own `components/`, `hooks/`, `selectors/`, `routes.tsx`, `slice.ts`, `saga.ts`, and `tests/`.
- Avoid cross-feature imports directly—extract shared code to `src/common/`.
- Place reusable types, interfaces, and models in `src/common/types/` or `src/common/models/`.
- Utilities shared across features should be located in `src/common/utils/` or similar.

## Routing
Organize routing via centralized and feature-specific route files.

- Centralized routing logic is in `src/routes/index.tsx`.
- Each feature exports its own route(s) via `routes.tsx` inside the feature folder.
- Use React Router v6+ with JSX route definitions.

## Redux & Redux-Saga
Ensure proper Redux Toolkit + Saga integration in a feature scope.

- Use `createSlice` inside each feature's slice file (e.g., `userSlice.ts`).
- Place side-effects in `saga.ts`, registered in `src/app/rootSaga.ts`.
- Slices and sagas must be registered in `src/app/store.ts` and `rootSaga.ts` respectively.
- Create a dedicated `selectors/` directory in each feature folder for Redux selectors.
- Every selector should be a stand alone file and the index should just export all of them.
- Use selectors to access Redux state in components and hooks instead of direct state access.

## MirageJS Mock Server
Follow official MirageJS structure for robust and type-consistent mocks.

- All Mirage configuration must reside in `src/mirage/`.
- Separate files must exist for `models.ts`, `factories.ts`, `seeds.ts`, and `routes.ts`.
- Define models in `models.ts` using Mirage's `Model`.
- Use `factories.ts` to generate mock data with Faker or sample data.
- Use `seeds.ts` to populate mock DB at server boot time.
- Define REST-style endpoints in `routes.ts` using `this.namespace = 'api'`.
- All mock data must conform to shared types from `src/common/types/`.
- Extend Mirage's TypeScript support in `mirage.d.ts`.
- Initialize Mirage in `main.tsx` only if the env variable `VITE_USE_MOCKS=true`.
- Use `environment: 'test'` in test suites.
- Ensure no mock server is booted in production builds.

## Environment Variables
Use environment variables consistently for mocks, endpoints, and feature flags.

- Define all environment variables with `VITE_` prefix (Vite convention) in `.env` files.
- Use `VITE_API_BASE_URL` for all HTTP calls.
- Use `VITE_USE_MOCKS` to conditionally start Mirage.
- Access environment variables via `import.meta.env.VITE_*` with proper fallback logic.
- Avoid hardcoding values like base URLs or mocking flags directly in code.
- All environment variable keys should be documented in `.env.example`.

## Testing Setup
Follow standardized testing practices with React Testing Library + Jest.

- Use React Testing Library and Mirage for integration-style tests.
- Each feature must have a `tests/` folder.
- Mock backend behavior in tests via Mirage (with proper seeding).
- Run tests with `pnpm test`. Use `-- <path>` to target specific files.
- Use `screen`, `waitFor`, and `userEvent` for clean test interaction logic.

## UI Components & Ant Design
Use Ant Design as the primary UI component library for consistent user experience.

- Always use Ant Design components instead of HTML elements when an equivalent component exists.
- Import components individually to optimize bundle size: `import { Button } from 'antd'` not `import * from 'antd'`.
- Use Ant Design's layout components (`Layout`, `Row`, `Col`) for page structure.
- Follow Ant Design's form patterns and validation approach.
- Use Ant Design's `Typography` components for text elements.
- Customize theme through the `ConfigProvider` in main.tsx only.
- For custom styling, use CSS modules or styled-components with Ant Design's design tokens.
- Refer to the [Ant Design documentation](https://ant.design/components/overview/) for component usage guidelines.

## Code Style & Conventions
Maintain consistent code formatting and organization.

- Use the `@/` alias for absolute imports from `src/`.
- Run `pnpm format` and `pnpm lint` before commits.
- Shared types/interfaces/models must not be duplicated—extract them into `src/common/types/`.
- Ensure Mirage, Redux slices, and component props all share the same source of truth for types.
