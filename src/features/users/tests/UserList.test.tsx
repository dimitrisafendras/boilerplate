import { screen, waitFor } from '@testing-library/react';
import { createServer, Server } from 'miragejs';
import { UserList } from '../components/UserList';
import { renderWithProviders } from '@/common/utils/test-utils';

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
    // Render component with store and router providers using the utility function
    renderWithProviders(<UserList />);

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
