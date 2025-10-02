import { createServer, Response, Server } from 'miragejs';
import type { User } from '@/common/types/user';

// Simple in-memory store for users for MirageJS
let users: User[] = [
  {
    id: 'u_123',
    email: 'jane@example.com',
    name: 'Jane Doe',
    role: 'admin',
    createdAt: '2025-08-01T12:00:00Z',
    profile: { avatarUrl: 'https://...', bio: 'Hello' },
    tags: ['alpha', 'beta'],
    active: true,
  },
  {
    id: 'u_124',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'user',
    createdAt: '2025-08-05T09:30:00Z',
    profile: { avatarUrl: 'https://...', bio: 'Hey there' },
    tags: ['gamma'],
    active: true,
  },
];

export function makeServer({ environment = 'development' }: { environment?: string } = {}): Server {
  const server = createServer({
    environment,
    routes() {
      this.namespace = 'api';

      // GET /api/users with optional pagination (?page=&pageSize=)
      this.get('/users', (schema, request) => {
        const pageParam = request.queryParams.page;
        const pageSizeParam = request.queryParams.pageSize;

        if (pageParam !== undefined || pageSizeParam !== undefined) {
          const page = Math.max(parseInt(pageParam || '1', 10), 1);
          const pageSize = Math.max(parseInt(pageSizeParam || '10', 10), 1);
          const start = (page - 1) * pageSize;
          const end = start + pageSize;
          const data = users.slice(start, end);
          const total = users.length;
          return { data, meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
        }

        // Default (for existing code/tests): return a plain array
        return users;
      });

      // GET /api/users/:id
      this.get('/users/:id', (_schema, request) => {
        const { id } = request.params as { id: string };
        const found = users.find((u) => u.id === id);
        if (!found) {
          return new Response(404, {}, { error: 'User not found' });
        }
        return found;
      });

      // POST /api/users
      this.post('/users', (_schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody) as Partial<User>;
          if (!attrs.name || !attrs.email) {
            return new Response(400, {}, { error: 'Missing required fields' });
          }
          const newUser: User = {
            id: attrs.id || `u_${Math.random().toString(36).slice(2, 8)}`,
            name: attrs.name,
            email: attrs.email,
            role: (attrs.role as User['role']) || 'user',
            createdAt: attrs.createdAt || new Date().toISOString(),
            profile: attrs.profile || { avatarUrl: '', bio: '' },
            tags: attrs.tags || [],
            active: attrs.active ?? true,
          };
          users.unshift(newUser);
          return newUser;
        } catch (e) {
          return new Response(400, {}, { error: 'Invalid JSON' });
        }
      });

      // PUT /api/users/:id
      this.put('/users/:id', (_schema, request) => {
        try {
          const { id } = request.params as { id: string };
          const idx = users.findIndex((u) => u.id === id);
          if (idx === -1) {
            return new Response(404, {}, { error: 'User not found' });
          }
          const updates = JSON.parse(request.requestBody) as Partial<User>;
          users[idx] = { ...users[idx], ...updates, id: users[idx].id };
          return users[idx];
        } catch (e) {
          return new Response(400, {}, { error: 'Invalid JSON' });
        }
      });

      // DELETE /api/users/:id
      this.delete('/users/:id', (_schema, request) => {
        const { id } = request.params as { id: string };
        const before = users.length;
        users = users.filter((u) => u.id !== id);
        if (users.length === before) {
          return new Response(404, {}, { error: 'User not found' });
        }
        return new Response(204);
      });
    },
  });

  return server;
}
