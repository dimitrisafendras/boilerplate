import type { ThemeConfig } from "antd";

/**
 * Typography-related theme settings
 */
export const typography: Partial<ThemeConfig["token"]> = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,

  lineHeight: 1.5715,
  lineHeightLG: 1.8,
  lineHeightSM: 1.4,

  fontWeightStrong: 600,
};
