import { createServer } from 'miragejs';
import { models } from './models';
import { factories } from './factories';
import { seeds } from './seeds';
import { routes } from './routes';

// Function to create and configure the mock server
export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    // Add models to the server
    models,

    // Add factories to the server
    factories,

    // Configure the server
    seeds,
    routes,
  });

  return server;
}

// Create a type definition file for Mirage
// This would typically be in a separate mirage.d.ts file
// but for simplicity, we're including it here as a comment
/*
// src/mirage.d.ts
import { Server, Registry } from 'miragejs';
import { AppRegistry } from './mirage/models';

declare global {
  interface Window {
    server: Server<AppRegistry>;
  }
}
*/
