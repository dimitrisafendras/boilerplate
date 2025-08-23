# Junie Workflow: Entity Generation from JSON/Schema

This workflow lets you provide a JSON example or JSON Schema and get back a consistent set of files: shared types, Redux Toolkit + Saga model, MirageJS mocks, feature scaffolding, and wiring updates—fully aligned with the project guidelines.

## How to use
Provide Junie a single payload containing:
- featureName (kebab-case)
- modelName (kebab-case, singular)
- entityName (PascalCase, singular)
- json or jsonSchema (representative sample or explicit schema)
- optional: endpoints, idKey, paginate, relations

Junie will return a plan and complete file templates that follow this repository’s structure and conventions.

## Input Contract (what you send to Junie)
Example using a JSON sample:

{
  "featureName": "users",
  "modelName": "user",
  "entityName": "User",
  "idKey": "id",
  "json": {
    "id": "u_123",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "role": "admin",
    "createdAt": "2025-08-01T12:00:00Z",
    "profile": {
      "avatarUrl": "https://...",
      "bio": "Hello"
    },
    "tags": ["alpha", "beta"],
    "active": true
  },
  "endpoints": {
    "base": "/api/users",
    "list": "GET /api/users",
    "get": "GET /api/users/:id",
    "create": "POST /api/users",
    "update": "PUT /api/users/:id",
    "delete": "DELETE /api/users/:id"
  },
  "paginate": true
}

If you have a JSON Schema, use jsonSchema instead of json.

## Files and structure Junie will generate
- src/common/types/<Entity>.ts — Shared types inferred from JSON/Schema
- src/models/<modelName>/ — Redux Toolkit + Saga model
  - slice.ts, saga.ts, selectors/, hooks/, index.ts
- src/features/<featureName>/ — Feature scaffolding
  - components/, routes.tsx, tests/
- src/mirage/ — Update existing models.ts, factories.ts, seeds.ts, routes.ts
- Wiring changes
  - src/app/store.ts — register slice
  - src/app/rootSaga.ts — register saga
  - src/routes/index.tsx — mount feature routes
  - src/main.tsx — ensure Mirage starts only when VITE_USE_MOCKS === 'true'

All imports use the @/ alias and named exports (except single React component files). Follow the import grouping/order rules in this document.

## Mapping rules: JSON → TypeScript types
- string → string
- number → number
- boolean → boolean
- array → T[] (infer T; fallback to unknown[] if mixed/empty)
- object → nested interface named Entity + Subpath (e.g., UserProfile)
- ISO date strings → string with comment // ISO8601
- idKey is readonly
- Fields that are sometimes absent/null become optional (?:)

Example (src/common/types/User.ts):

export interface UserProfile {
  avatarUrl: string;
  bio: string;
}

export interface User {
  readonly id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | string; // narrow union if known
  createdAt: string; // ISO8601
  profile: UserProfile;
  tags: string[];
  active: boolean;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type UserList = User[];

## Redux model (src/models/<modelName>)
State shape:

export interface UserState {
  entities: Record<string, User>;
  ids: string[];
  loading: boolean;
  error?: string;
  page?: number;
  pageSize?: number;
  total?: number;
}

Actions (examples):
- fetchUsersRequested(payload?: { page?: number; pageSize?: number })
- fetchUsersSucceeded(payload: { items: User[]; total?: number; page?: number; pageSize?: number })
- fetchUsersFailed(payload: string)
- fetchUserRequested(payload: { id: string })
- fetchUserSucceeded(payload: User)
- createUserRequested(payload: Partial<User>)
- updateUserRequested(payload: { id: string; changes: Partial<User> })
- deleteUserRequested(payload: { id: string })

Saga conventions:
- Build baseURL from import.meta.env.VITE_API_BASE_URL || '/api'
- Handle CRUD with try/catch and put() for success/failure
- Register in rootSaga with all([...])

Selectors (each in its own file under selectors/):
- selectUserState
- selectUsers
- selectUserById
- selectUsersLoading
- selectUsersPagination

Hooks (src/models/<modelName>/hooks/):
- useUsers({ page, pageSize })
- useUser(id)
- useCreateUser()
- useUpdateUser()
- useDeleteUser()

Barrel (src/models/<modelName>/index.ts):
- export { userReducer } from './slice';
- export { userSaga } from './saga';
- export * from './selectors';
- export * from './hooks';

Registering model:
- src/app/store.ts → user: userReducer
- src/app/rootSaga.ts → yield all([userSaga(), ...])

## MirageJS (src/mirage)
Keep the official separation (models.ts, factories.ts, seeds.ts, routes.ts):

// models.ts
import { Model } from 'miragejs';

export const models = {
  user: Model,
};

// factories.ts
import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export const factories = {
  user: Factory.extend({
    id() { return faker.string.uuid(); },
    email() { return faker.internet.email(); },
    name() { return faker.person.fullName(); },
    role() { return faker.helpers.arrayElement(['admin', 'member']); },
    createdAt() { return new Date().toISOString(); },
    profile() {
      return {
        avatarUrl: faker.image.avatar(),
        bio: faker.lorem.sentence(),
      };
    },
    tags() { return faker.helpers.arrayElements(['alpha', 'beta', 'gamma'], { min: 0, max: 3 }); },
    active() { return faker.datatype.boolean(); },
  }),
};

// seeds.ts
export function seeds(server: any) {
  server.createList('user', 20);
}

// routes.ts
export function routes() {
  // this.namespace = 'api' is set per your project
  this.get('/users', (schema, request) => {
    const page = Number(request.queryParams.page ?? 1);
    const pageSize = Number(request.queryParams.pageSize ?? 10);
    const all = (schema as any).all('user').models;
    const start = (page - 1) * pageSize;
    const items = all.slice(start, start + pageSize);
    return { items, total: all.length, page, pageSize };
  });

  this.get('/users/:id');
  this.post('/users');
  this.put('/users/:id');
  this.del('/users/:id');
}

Initialize only when mocks are enabled (main.tsx):
- if (import.meta.env.VITE_USE_MOCKS === 'true') makeServer({ environment: import.meta.env.MODE === 'test' ? 'test' : 'development' })
- Ensure no mock server in production builds

## Feature scaffolding (src/features/<featureName>)
- components/
  - UsersList.tsx — Ant Design Table for listing
  - UserForm.tsx — Ant Design Form for create/update
  - UserDetails.tsx — Card/Descriptions for detail
  - index.ts — re-exports
- routes.tsx — exports RouteObject(s) for list, details, create/edit
- tests/ — RTL + Mirage (environment: 'test')

Ant Design usage:
- Import individually: import { Table, Form, Input, Button, Card, Descriptions, Typography } from 'antd'
- Use Layout / Row / Col for structure

Routing:
- Centralized in src/routes/index.tsx; each feature exposes its routes via src/features/<feature>/routes.tsx

## Environment variables & HTTP
- Define .env.example keys:
  - VITE_API_BASE_URL=https://api.example.com
  - VITE_USE_MOCKS=true
- Build URLs with import.meta.env.VITE_API_BASE_URL
- Avoid hardcoding base URLs or mock flags
- Optionally add src/common/utils/http.ts for shared fetch/axios client

## Code style & conventions to enforce
- Use '@/ alias for absolute imports from src/
- Named exports everywhere; React component file can default export if it’s the only export
- Each folder has index.ts barrel
- Use import type for types
- Group imports with the specified order and blank lines + comment headers

## Generation checklist (for Junie to follow)
- Types:
  - Generate src/common/types/<Entity>.ts with nested interfaces
- Model:
  - slice.ts with initialState and reducers
  - saga.ts with CRUD effects; watchers; API base from env
  - selectors/<each>.ts and index.ts to re-export
  - hooks/use<Entity>s.ts and hooks/use<Entity>.ts
  - index.ts barrel
- Wiring:
  - Register reducer in src/app/store.ts
  - Register saga in src/app/rootSaga.ts
- Mirage:
  - Update models.ts, factories.ts, seeds.ts, routes.ts
  - Use namespace 'api' and ensure types align with src/common/types
- Feature:
  - components/* using Ant Design
  - routes.tsx exporting JSX routes
  - tests/* using RTL + Mirage (environment: 'test')
- Routes:
  - Update src/routes/index.tsx to include feature routes
- Env:
  - Guard Mirage boot with VITE_USE_MOCKS in main.tsx
- Style:
  - Use '@/...' imports, import type, named exports, barrels, import grouping

## Reusable “Junie generation” prompt template
Generate code for a new entity using the following input. Follow the project guidelines strictly:
- Feature-based architecture under src/features/<featureName>/
- Centralized model under src/models/<modelName>/
- Shared types under src/common/types/
- Redux Toolkit slice + Redux-Saga with proper registration in store.ts and rootSaga.ts
- MirageJS split across src/mirage/{models,factories,seeds,routes}.ts with namespace 'api'
- Use env vars VITE_API_BASE_URL and VITE_USE_MOCKS
- Use Ant Design and import components individually
- Use '@/...' alias, named exports, import type syntax, grouped imports, and index barrels

Input:
{
  "featureName": "users",
  "modelName": "user",
  "entityName": "User",
  "idKey": "id",
  "json": { "id": "u_123", "email": "jane@example.com", "name": "Jane Doe", "role": "admin", "createdAt": "2025-08-01T12:00:00Z", "profile": { "avatarUrl": "https://...", "bio": "Hello" }, "tags": ["alpha", "beta"], "active": true },
  "endpoints": { "base": "/api/users", "list": "GET /api/users", "get": "GET /api/users/:id", "create": "POST /api/users", "update": "PUT /api/users/:id", "delete": "DELETE /api/users/:id" },
  "paginate": true
}

Output:
- Provide file paths and full contents for each file
- Provide patch snippets for store.ts, rootSaga.ts, routes/index.tsx, and main.tsx
- Provide a brief usage guide for the generated hooks

## Next step
Share your JSON (or JSON Schema) plus feature/model names, and Junie will generate the exact files and wiring snippets tailored to this repository.
