import {Response, type Server} from 'miragejs';

// Define API routes for the mock server
export function routes(this:Server) {
  // Set API namespace
  this.namespace = 'api';

  // Define a delay to simulate network latency (optional)
  this.timing = 0; // 1 second delay

  // GET /api/users - Get all users
  this.get('/users', (schema) => {
    const users = schema.all('user');
    return users.models;
  });

  // GET /api/users/:id - Get a specific user by ID
  this.get('/users/:id', (schema, request) => {
    const id = request.params.id;
    const user = schema.find('user', id);

    if (!user) {
      return new Response(404, {}, { error: 'User not found' });
    }

    return user;
  });

  // POST /api/users - Create a new user
  this.post('/users', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.create('user', attrs);
  });

  // PUT /api/users/:id - Update a user
  this.put('/users/:id', (schema, request) => {
    const id = request.params.id;
    const attrs = JSON.parse(request.requestBody);
    const user = schema.find('user', id);

    if (!user) {
      return new Response(404, {}, { error: 'User not found' });
    }

    return user.update(attrs);
  });

  // DELETE /api/users/:id - Delete a user
  this.delete('/users/:id', (schema, request) => {
    const id = request.params.id;
    const user = schema.find('user', id);

    if (!user) {
      return new Response(404, {}, { error: 'User not found' });
    }

    user.destroy();
    return new Response(204);
  });

  // Reset namespace for non-API routes
  this.namespace = '';
  this.passthrough();
}
