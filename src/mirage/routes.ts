import { Server, Response } from 'miragejs';
import { AppRegistry } from './models';

// Define API routes for the mock server
export function routes(server: Server<AppRegistry>) {
  // Set API namespace
  server.namespace = 'api';

  // Define a delay to simulate network latency (optional)
  server.timing = 1000; // 1 second delay

  // GET /api/users - Get all users
  server.get('/users', (schema) => {
    return schema.all('user');
  });

  // GET /api/users/:id - Get a specific user by ID
  server.get('/users/:id', (schema, request) => {
    const id = request.params.id;
    const user = schema.find('user', id);

    if (!user) {
      return new Response(404, {}, { error: 'User not found' });
    }

    return user;
  });

  // POST /api/users - Create a new user
  server.post('/users', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.create('user', attrs);
  });

  // PUT /api/users/:id - Update a user
  server.put('/users/:id', (schema, request) => {
    const id = request.params.id;
    const attrs = JSON.parse(request.requestBody);
    const user = schema.find('user', id);

    if (!user) {
      return new Response(404, {}, { error: 'User not found' });
    }

    return user.update(attrs);
  });

  // DELETE /api/users/:id - Delete a user
  server.delete('/users/:id', (schema, request) => {
    const id = request.params.id;
    const user = schema.find('user', id);

    if (!user) {
      return new Response(404, {}, { error: 'User not found' });
    }

    user.destroy();
    return new Response(204);
  });

  // Reset namespace for non-API routes
  server.namespace = '';
  server.passthrough();
}
