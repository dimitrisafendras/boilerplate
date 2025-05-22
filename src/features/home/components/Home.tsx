import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Feature-Based Architecture Example</h2>
      <p>
        This example demonstrates a modular, feature-based architecture for React applications
        using Redux Toolkit, Redux-Saga, React Router, and MirageJS.
      </p>

      <h3>Features</h3>
      <ul>
        <li>
          <strong>Feature-Based Structure:</strong> Code is organized by feature, not by type.
        </li>
        <li>
          <strong>Redux Toolkit + Redux-Saga:</strong> State management with side effects.
        </li>
        <li>
          <strong>React Router:</strong> Centralized routing with feature-specific route definitions.
        </li>
        <li>
          <strong>MirageJS:</strong> Mock API server for development and testing.
        </li>
      </ul>

      <h3>Example Features</h3>
      <ul>
        <li>
          <Link to="/users">Users</Link> - View a list of users and user details.
        </li>
      </ul>

      <h3>Project Structure</h3>
      <pre>
        {`
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
        `}
      </pre>
    </div>
  );
};

export default Home;
