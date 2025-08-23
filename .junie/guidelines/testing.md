# Testing Setup

Follow standardized testing practices with React Testing Library + Jest.

- Use React Testing Library and Mirage for integration-style tests.
- Each feature must have a `tests/` folder.
- Mock backend behavior in tests via Mirage (with proper seeding).
- Run tests with `pnpm test`. Use `-- <path>` to target specific files.
- Use `screen`, `waitFor`, and `userEvent` for clean test interaction logic.
