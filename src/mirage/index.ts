import { createServer } from "miragejs";
import { models } from "./models";
import { factories } from "./factories";
import { seeds } from "./seeds";
import { routes } from "./routes";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,
    models,
    factories,
    seeds,
    routes,
  });

  return server;
}
