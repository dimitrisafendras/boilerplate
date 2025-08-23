# Architecture

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
- Place side-effects in `src/models/<model-name>/saga.ts`, registered in `src/app/rootSaga.ts`.
- Slices and sagas must be registered in `src/app/store.ts` and `rootSaga.ts` respectively.
- Create a dedicated `selectors/` directory in each model folder for Redux selectors.
- Every selector should be a standalone file and the index should just export all of them.
- Place hooks in the `src/models/<model-name>/hooks/` directory.
- Use selectors to access Redux state in components and hooks instead of direct state access.
- Import models in components using `import { useModelName } from '@/models/model-name'`.
