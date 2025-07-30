import type { ThemeConfig } from "antd";

/**
 * Component-specific theme overrides for Ant Design components
 */
export const components: ThemeConfig["components"] = {
  Button: {},

  Card: {
    colorBorderSecondary: "#f0f0f0",
    borderRadiusLG: 8,
    marginXXS: 16,
    marginSM: 24,
  },

  Table: {
    colorBgContainer: "#ffffff",
    // fontWeightStrong: 600,
  },

  Form: {
    marginLG: 24,
  },

  Layout: {},

  List: {},

  Typography: {
    colorBgTextHover: "#f5f5f5",
    paddingLG: 16,
    borderRadiusSM: 4,
    fontSizeSM: 12,
  },

  Space: {
    marginXS: 8,
    marginSM: 16,
    marginMD: 24,
  },
};
