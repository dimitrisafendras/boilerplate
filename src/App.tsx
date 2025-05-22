import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Feature-Based Architecture Example</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* This is where the route components will be rendered */}
        <Outlet />
      </main>

      <footer>
        <p>
          Built with React, Redux Toolkit, Redux-Saga, React Router, and MirageJS
        </p>
      </footer>
    </div>
  );
};

export default App;
