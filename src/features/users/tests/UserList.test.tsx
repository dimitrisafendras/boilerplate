import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createServer, Server } from 'miragejs';
import UserList from '../components/UserList';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice';
import createSagaMiddleware from 'redux-saga';
import { userSaga } from '../saga';

describe('UserList', () => {
  let server: Server;

  beforeEach(() => {
    server = createServer({
      environment: 'test',
      routes() {
        this.namespace = 'api';
        this.get('/users', () => {
          return [
            { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2023-01-01' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2023-01-02' },
          ];
        });
      },
    });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('renders user list and displays users after loading', async () => {
    // Set up Redux store with saga middleware
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
      reducer: {
        users: userReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });
    sagaMiddleware.run(userSaga);

    // Render component with store and router providers
    render(
      <Provider store={store}>
        <RouterProvider
          router={createBrowserRouter([{ path: '/', element: <UserList /> }])}
          future={{ v7_startTransition: true }}
        />
      </Provider>
    );

    // Initially should show loading
    expect(screen.getByText('Loading users...')).toBeTruthy();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('Jane Smith')).toBeTruthy();
    });

    // Check if user details are displayed
    expect(screen.getByText(/john@example.com/)).toBeTruthy();
    expect(screen.getByText(/jane@example.com/)).toBeTruthy();
    expect(screen.getByText(/admin/)).toBeTruthy();
    expect(screen.getByText(/user/)).toBeTruthy();
  });
});
