// Environment variables utility that works in both Vite and Jest environments
// In Jest environment, these values will be set in setupTests.ts
// In Vite environment, these will be replaced at build time

// Helper function to get environment variables from either process.env (Jest) or import.meta.env (Vite)
const getEnv = (key: string, defaultValue: string): string => {
  // Check if we're in a Node.js environment (Jest)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // We're in a browser environment (Vite)
  return (import.meta.env as Record<string, string>)[key] || defaultValue;
};

// Common environment variables with default values
export const API_BASE_URL = getEnv('VITE_API_BASE_URL', '/api');
export const USE_MOCKS = getEnv('VITE_USE_MOCKS', 'true');
