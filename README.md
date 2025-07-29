# Feature-Based Architecture Example

This project demonstrates a modular, feature-based architecture for React applications using Redux Toolkit, Redux-Saga, React Router, and MirageJS. It follows the guidelines outlined in `.junie/guidelines.md`.

## Getting Started

This project uses [npm](https://www.npmjs.com/) as the package manager.

To install dependencies:

```bash
npm install
```

To start the development server:

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

To run tests:

```bash
npm test
```

## Pre-commit Hooks

This project uses [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to run ESLint and tests on staged files before each commit. This helps ensure that only code that passes linting and tests is committed to the repository.

When you commit changes, the following checks are automatically run:

1. ESLint will check and fix (when possible) any linting issues in staged TypeScript/TSX files.
2. Jest will run tests related to the staged files.

If any of these checks fail, the commit will be aborted, allowing you to fix the issues before committing again.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. The deployment workflow is defined in `.github/workflows/deploy.yml`.

### How it works

1. When you push changes to the `main` branch, the GitHub Actions workflow automatically triggers.
2. The workflow builds the application and deploys it to GitHub Pages.
3. The deployed application will be available at `https://<username>.github.io/boilerplate/`.

### Manual deployment

You can also manually trigger the deployment workflow:

1. Go to your GitHub repository.
2. Navigate to the "Actions" tab.
3. Select the "Deploy to GitHub Pages" workflow.
4. Click on "Run workflow" and select the branch you want to deploy.

### Setting up GitHub Pages

Before the first deployment, you need to configure GitHub Pages in your repository:

1. Go to your GitHub repository.
2. Navigate to "Settings" > "Pages".
3. Under "Build and deployment", select "GitHub Actions" as the source.
4. The first workflow run will set up everything else automatically.

## Project Structure

This project follows a feature-based architecture, where code is organized by feature rather than by type. This makes it easier to understand and maintain the codebase, as all related code is located in the same directory.

```
src/
  ├── app/                  # Application setup
  │   ├── store.ts          # Redux store configuration
  │   └── rootSaga.ts       # Root saga
  │
  ├── common/               # Shared code
  │   ├── types/            # Shared types and interfaces
  │   ├── models/           # Shared models
  │   └── utils/            # Shared utilities
  │
  ├── features/             # Feature modules
  │   ├── users/            # Users feature
  │   │   ├── components/   # React components
  │   │   ├── hooks/        # Custom hooks
  │   │   ├── tests/        # Tests
  │   │   ├── routes.tsx    # Feature routes
  │   │   ├── slice.ts      # Redux slice
  │   │   └── saga.ts       # Redux-Saga
  │   └── home/             # Home feature
  │
  ├── mirage/               # Mock API server
  │   ├── models.ts         # Data models
  │   ├── factories.ts      # Data factories
  │   ├── seeds.ts          # Initial data
  │   └── routes.ts         # API endpoints
  │
  └── routes/               # Routing
      └── index.tsx         # Centralized routes
```

## Features

### Feature-Based Structure
Code is organized by feature, not by type. Each feature has its own directory with all related components, hooks, routes, Redux slice, and sagas.

### Redux Toolkit + Redux-Saga
State management with side effects. Each feature has its own Redux slice and saga, which are combined in the root store and root saga.

### React Router
Centralized routing with feature-specific route definitions. Each feature exports its routes, which are combined in the centralized routing system.

### MirageJS
Mock API server for development and testing. The mock server is initialized in development mode if the `VITE_USE_MOCKS` environment variable is set to `true`.

## Example Features

### Users
The users feature demonstrates a complete implementation of the feature-based architecture. It includes:

- Components for displaying a list of users and user details
- A custom hook for accessing user-related functionality
- A Redux slice for managing user state
- A saga for handling side effects like fetching users from the API
- Routes for navigating to the user list and user details
- Tests for the components

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
