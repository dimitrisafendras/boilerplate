// Environment variables utility that works in both Vite and Jest environments
// In Jest environment, these values will be set in setupTests.ts
// In Vite environment, these will be replaced at build time

// Common environment variables with default values
export const API_BASE_URL = process.env.VITE_API_BASE_URL || '/api';
export const USE_MOCKS = process.env.VITE_USE_MOCKS || 'true';
