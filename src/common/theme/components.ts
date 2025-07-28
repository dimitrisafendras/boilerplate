// src/common/theme/components.ts
import type { ThemeConfig } from "antd";

/**
 * Component-specific theme overrides
 * These settings customize the appearance of individual Ant Design components
 */
export const components: ThemeConfig["components"] = {
  // Button component customization
  Button: {
    // Using global token instead of duplicating it here
    // colorPrimary: '#646cff',
    // Note: Custom button link styling is handled in CSS (.button-link class)
  },

  // Card component customization
  Card: {
    colorBorderSecondary: "#f0f0f0",
    borderRadiusLG: 8,
    marginXXS: 16, // For marginBottom in cards
    marginSM: 24, // For larger marginBottom in cards
  },

  // Table component customization
  Table: {
    colorBgContainer: "#ffffff",
    // Using global token instead of duplicating it here
    // fontWeightStrong: 600,
  },

  // Form component customization
  Form: {
    marginLG: 24,
  },

  // Layout component customization
  Layout: {
    // Note: Custom layout styling is handled in CSS (.site-content class)
  },

  // Note: Row component styling is handled through Ant Design's props
  // Row component is not available in the theme configuration

  // List component customization
  List: {
    // Note: Custom avatar icon styling is handled in CSS (.avatar-icon class)
  },

  // Typography component customization
  Typography: {
    // For pre element in Typography
    colorBgTextHover: "#f5f5f5", // For backgroundColor of pre
    paddingLG: 16, // For padding in pre
    borderRadiusSM: 4, // For borderRadius in pre
    fontSizeSM: 12, // For fontSize in pre
  },

  // Space component customization
  Space: {
    marginXS: 8, // For marginTop in smaller spaces
    marginSM: 16, // For marginTop in medium spaces
    marginMD: 24, // For marginTop in larger spaces
  },
};
