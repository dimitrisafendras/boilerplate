import '@testing-library/jest-dom';

// Set environment variables for Jest
process.env.VITE_API_BASE_URL = '/api';
process.env.VITE_USE_MOCKS = 'true';
process.env.VITE_ROUTER_BASENAME = '';
// Add any other environment variables used in the app

// Mock window.matchMedia for Ant Design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
