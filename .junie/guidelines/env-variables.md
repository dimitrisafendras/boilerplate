# Environment Variables

Use environment variables consistently for mocks, endpoints, and feature flags.

- Define all environment variables with `VITE_` prefix (Vite convention) in `.env` files.
- Use `VITE_API_BASE_URL` for all HTTP calls.
- Use `VITE_USE_MOCKS` to conditionally start Mirage.
- Access environment variables via `import.meta.env.VITE_*` with proper fallback logic.
- Avoid hardcoding values like base URLs or mocking flags directly in code.
- All environment variable keys should be documented in `.env.example`.
