/**
 * Environment variables utility that works in both Vite and Jest environments
 * This avoids direct reference to import.meta.env which causes issues in Jest
 */
type EnvVars = {
  [key: string]: string;
};

const getEnvVars = (): EnvVars => {
  // In Node.js environment (Jest)
  if (typeof process !== "undefined" && process.env) {
    return process.env as EnvVars;
  }

  // Workaround for browser environment (Vite)
  const globalObj = typeof window !== "undefined" ? window : global;

  if (globalObj && "VITE_DEV_SERVER_URL" in globalObj) {
    return {} as EnvVars;
  }

  return {} as EnvVars;
};

const getEnv = (key: string, defaultValue: string): string => {
  const envVars = getEnvVars();
  return envVars[key] || defaultValue;
};

export const API_BASE_URL = getEnv("VITE_API_BASE_URL", "/api");
export const USE_MOCKS = getEnv("VITE_USE_MOCKS", "true");
export const ROUTER_BASENAME = getEnv("VITE_ROUTER_BASENAME", "/boilerplate");
