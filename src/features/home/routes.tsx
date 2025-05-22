import type {RouteObject} from 'react-router-dom';
import Home from './components/Home';

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];
