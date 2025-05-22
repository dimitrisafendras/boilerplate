import React from 'react';
import { UserList, UserDetail } from './components';

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
