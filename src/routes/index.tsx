import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { userRoutes } from '@/features/users/routes';
import { homeRoutes } from '@/features/home/routes';
import { App } from '@/App';

// Create a browser router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Add feature routes as children of the root route
      ...homeRoutes,
      ...userRoutes,
      // Add more feature routes here
    ],
  },
], {
  basename: '/boilerplate/'
});

// Router component that provides the router to the app
export const Router: React.FC = () => {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};

