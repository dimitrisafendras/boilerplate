// Environment variables utility that works in both Vite and Jest environments
// In Jest environment, these values will be set in setupTests.ts
// In Vite environment, these will be replaced at build time

// Define a type for environment variables
type EnvVars = {
  [key: string]: string;
};

// Get environment variables based on the current environment
const getEnvVars = (): EnvVars => {
  // In Node.js environment (Jest)
  if (typeof process !== 'undefined' && process.env) {
    return process.env as EnvVars;
  }

  // In browser environment (Vite)
  // We need to avoid direct reference to import.meta.env which causes issues in Jest
  // This is a workaround to make it work in both environments
  const globalObj = typeof window !== 'undefined' ? window : global;

  // Check if we're in a Vite environment by looking for a specific property
  // that Vite adds to the global object
  if (globalObj && 'VITE_DEV_SERVER_URL' in globalObj) {
    // We're in a Vite environment, but we can't directly access import.meta.env
    // Return an empty object, and the default values will be used
    return {} as EnvVars;
  }

  return {} as EnvVars;
};

// Helper function to get environment variables with default values
const getEnv = (key: string, defaultValue: string): string => {
  const envVars = getEnvVars();
  return envVars[key] || defaultValue;
};

// Common environment variables with default values
export const API_BASE_URL = getEnv('VITE_API_BASE_URL', '/api');
export const USE_MOCKS = getEnv('VITE_USE_MOCKS', 'true');
