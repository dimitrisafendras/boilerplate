import { Server } from 'miragejs';
import { AppRegistry } from './models';

// Define seeds for populating the mock database
export function seeds(server: Server<AppRegistry>) {
  // Create 10 users
  server.createList('user', 10);

  // Create a specific admin user for testing
  server.create('user', {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  });
}
