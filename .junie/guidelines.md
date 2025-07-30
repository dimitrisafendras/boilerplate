# Project Guidelines

## Build Setup
Ensure developers can install, develop, and build the project.

- Run `npm install` to install dependencies.
- Use `npm run dev` to start the development server.
- Use `npm run build` to build the production bundle.
- Use `npm test` to test the application.

## Feature-Based Architecture
Enforce modular feature-based file structure with shared models and types extracted.

- Each feature must live in `src/features/<feature-name>/`.
- Each feature should include its own `components/`, `routes.tsx`, and `tests/`.
- Models are centralized in `src/models/<model-name>/` with a one-to-many relationship to features.
- Avoid cross-feature imports directly—extract shared code to `src/common/`.
- Place reusable types, interfaces, and models in `src/common/types/` or `src/common/models/`.
- Utilities shared across features should be located in `src/common/utils/` or similar.

## Routing
Organize routing via centralized and feature-specific route files.

- Centralized routing logic is in `src/routes/index.tsx`.
- Each feature exports its own route(s) via `routes.tsx` inside the feature folder.
- Use React Router v6+ with JSX route definitions.

## Redux & Redux-Saga
Ensure proper Redux Toolkit + Saga integration with centralized models.

- Use `createSlice` inside each model's directory in the slice file (e.g., `src/models/<model-name>/slice.ts`).
- Organize sagas in a dedicated `sagas/` directory within each model (e.g., `src/models/<model-name>/sagas/`).
- Break up sagas into separate files by functionality (e.g., `fetchUsers.ts`, `fetchUserById.ts`).
- Each saga file should export its saga function and watcher function.
- Create an index.ts file in the sagas directory to combine and export all sagas.
- Register the main saga in `src/app/rootSaga.ts`.
- Slices and sagas must be registered in `src/app/store.ts` and `rootSaga.ts` respectively.
- Create a dedicated `selectors/` directory in each model folder for Redux selectors.
- Every selector should be a standalone file and the index should just export all of them.
- Place hooks in the `src/models/<model-name>/hooks/` directory.
- Use selectors to access Redux state in components and hooks instead of direct state access.
- Import models in components using `import { useModelName } from '@/models/model-name'`.

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

## API Organization
Organize API calls in a centralized top-level directory structure.

- Place all API functions in a dedicated top-level directory: `src/api/`.
- Organize API functions by domain/entity (e.g., `src/api/users/`, `src/api/products/`).
- Each domain should have an `index.ts` file that exports all API functions.
- API functions should follow a consistent naming convention (e.g., `fetchUsersApi`, `createUserApi`).
- API functions should handle basic error responses and return properly typed data.
- Use the environment variable `VITE_API_BASE_URL` for the API base URL.
- Import API functions in sagas using absolute imports: `import { fetchUsersApi } from '@/api/users'`.

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
- Run tests with `npm test`. Use `-- <path>` to target specific files.
- Use `screen`, `waitFor`, and `userEvent` for clean test interaction logic.

## CSS Modules
Use CSS Modules for component-scoped styling to avoid style conflicts and improve maintainability.

- Name CSS module files with the `.module.css` extension (e.g., `component-name.module.css`).
- Place CSS module files adjacent to their corresponding component files.
- Import CSS modules using the following syntax: `import styles from './component-name.module.css'`.
- Apply CSS module classes using the `className={styles.className}` syntax.
- Use camelCase for CSS class names to ensure consistent JavaScript property access.
- Leverage CSS variables from the theme system for colors, spacing, and typography.
- For dynamic class names, use template literals or the classnames library:

  Using template literals:
  ```
  className={`${styles.base} ${isActive ? styles.active : ''}`}
  ```
  
  Using classnames library:
  ```
  import classNames from 'classnames';
  className={classNames(styles.base, { [styles.active]: isActive })}
  ```

- Keep CSS modules focused on component-specific styling; use global styles for app-wide concerns.
- TypeScript support for CSS modules is provided via the `css-modules.d.ts` file.
- CSS modules support is also available for SCSS, SASS, and LESS with the appropriate extensions.

## UI Components & Ant Design
Use Ant Design as the primary UI component library for consistent user experience.

- Always use Ant Design components instead of HTML elements when an equivalent component exists.
- Import components individually to optimize bundle size: `import { Button } from 'antd'` not `import * from 'antd'`.
- Use Ant Design's layout components (`Layout`, `Row`, `Col`) for page structure.
- Follow Ant Design's form patterns and validation approach.
- Use Ant Design's `Typography` components for text elements.
- Customize theme through the `ConfigProvider` in main.tsx only.
- For custom styling, use CSS modules with Ant Design's design tokens.
- Refer to the [Ant Design documentation](https://ant.design/components/overview/) for component usage guidelines.

## Code Style & Conventions
Maintain consistent code formatting and organization.

- Use the `@/` alias for absolute imports from `src/`.
- Run `npm run format` and `npm run lint` before commits.
- Shared types/interfaces/models must not be duplicated—extract them into `src/common/types/`.
- Ensure Mirage, Redux slices, and component props all share the same source of truth for types.
- When importing types, use the `import type` syntax: `import type { RootState } from '@/app/store';` instead of `import { RootState } from '@/app/store';`.
- Every folder should have an index file and everything should be exported from there.
- Import from directories instead of specific files (e.g., `import { Component } from './components'` instead of `import Component from './components/Component'`).
- Group related imports together with clear separation and comments:
  ```typescript
  // React and React-related imports
  import React, { useState, useEffect } from 'react';
  import { useParams, Link } from 'react-router-dom';
  
  // Third-party library imports
  import { Button, Card, Form } from 'antd';
  import { UserOutlined } from '@ant-design/icons';
  
  // Local imports
  import { useUsers } from '@/models/users';
  import { formatDate } from '@/common/utils/date';
  ```
- Follow this specific ordering for imports:
  1. React core imports first
  2. React-related libraries (React Router, React Redux, etc.)
  3. Third-party libraries (alphabetically ordered when possible)
  4. Local imports (from most general to most specific)
- Separate each import group with a blank line and a comment header
- When importing types, use the `import type` syntax and group with their respective categories
- Always use named exports with `export const` instead of `export default` for better tree-shaking, easier refactoring, and consistent import style. Exception: React components can use default exports when they are the only export from a file.
