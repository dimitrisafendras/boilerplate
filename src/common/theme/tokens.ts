// src/common/theme/tokens.ts
import type { ThemeConfig } from 'antd';

/**
 * Basic design tokens for the application theme
 * These are the foundational elements of the design system
 */
export const tokens: ThemeConfig['token'] = {
  // Colors
  colorPrimary: '#646cff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#f5222d',
  colorInfo: '#1677ff',

  // Spacing and sizing
  borderRadius: 4,

  // Other global tokens
  wireframe: false,
};
