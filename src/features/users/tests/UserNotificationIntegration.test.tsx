import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { createServer, Server, Response } from 'miragejs';
import UserList from '../components/UserList';
import { renderWithProviders } from '@/common/utils/test-utils';
import { NotificationList } from '@/common/features/notification';

// Component that combines UserList and NotificationList for integration testing
const UserListWithNotifications: React.FC = () => (
  <>
    <NotificationList />
    <UserList />
  </>
);

describe('User and Notification Integration', () => {
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

  it('shows success notification when users are fetched', async () => {
    // Render component with store and router providers using the utility function
    renderWithProviders(<UserListWithNotifications />);

    // Initially should show loading
    expect(screen.getByText('Loading users...')).toBeTruthy();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('Jane Smith')).toBeTruthy();
    });

    // Check if success notification is displayed
    await waitFor(() => {
      expect(screen.getByText('Users fetched successfully')).toBeTruthy();
    });
  });

  it('shows error notification when users fetch fails', async () => {
    // Modify server to return an error
    server.get('/users', () => {
      return new Response(500, {}, { error: 'Server error' });
    });

    // Render component with store and router providers using the utility function
    renderWithProviders(<UserListWithNotifications />);

    // Initially should show loading
    expect(screen.getByText('Loading users...')).toBeTruthy();

    // Wait for error notification to appear
    await waitFor(() => {
      // Use getAllByText to handle multiple matching elements
      const errorElements = screen.getAllByText(/Failed to fetch users/);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });
});
