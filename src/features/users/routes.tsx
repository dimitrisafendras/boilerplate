import React from 'react';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

// Define our own route interface that matches React Router's expectations
interface AppRouteObject {
  path?: string;
  element?: React.ReactNode;
  children?: AppRouteObject[];
}

export const userRoutes: AppRouteObject[] = [
  {
    path: 'users',
    element: <UserList />,
  },
  {
    path: 'users/:id',
    element: <UserDetail />,
  },
];
