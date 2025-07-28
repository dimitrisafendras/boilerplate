// src/common/theme/index.ts
import type { ThemeConfig } from 'antd';
import { theme as antTheme } from 'antd';
import { tokens } from './tokens';
import { components } from './components';
import { typography } from './typography';

const { defaultAlgorithm } = antTheme;

/**
 * Main theme configuration for the application
 * Combines all theme subcomponents into a single theme object
 */
export const theme: ThemeConfig = {
  // Global design tokens
  token: {
    ...tokens,
    ...typography,
  },

  // Component-specific overrides
  components,

  // Algorithm configuration - must be a function or array of functions
  algorithm: defaultAlgorithm, // Use defaultAlgorithm from antd
};

// Export individual theme components for direct access if needed
export { tokens, components, typography };
