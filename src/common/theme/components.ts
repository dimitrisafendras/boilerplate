// src/common/theme/components.ts
import type { ThemeConfig } from 'antd';

/**
 * Component-specific theme overrides
 * These settings customize the appearance of individual Ant Design components
 */
export const components: ThemeConfig['components'] = {
  // Button component customization
  Button: {
    colorPrimary: '#646cff',
    // Removed incorrect algorithm property
  },

  // Card component customization
  Card: {
    colorBorderSecondary: '#f0f0f0',
    borderRadiusLG: 8,
  },

  // Table component customization
  Table: {
    colorBgContainer: '#ffffff',
    fontWeightStrong: 600,
  },

  // Form component customization
  Form: {
    marginLG: 24,
  },

  // Add more component customizations as needed
};
