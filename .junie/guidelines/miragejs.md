# MirageJS Mock Server

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
