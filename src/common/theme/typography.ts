// src/common/theme/typography.ts
import type { ThemeConfig } from 'antd';

/**
 * Typography-related theme settings
 * These settings define the text styles used throughout the application
 */
export const typography: Partial<ThemeConfig['token']> = {
  // Font family
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

  // Font sizes
  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,

  // Line heights
  lineHeight: 1.5715,
  lineHeightLG: 1.8,
  lineHeightSM: 1.4,

  // Font weights
  fontWeightStrong: 600,
  fontWeightNormal: 400,
  fontWeightLight: 300,
};
