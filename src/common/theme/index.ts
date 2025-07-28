import type { ThemeConfig } from "antd";
import { theme as antTheme } from "antd";
import { tokens } from "./tokens";
import { components } from "./components";
import { typography } from "./typography";

const { defaultAlgorithm } = antTheme;

/**
 * Main theme configuration for the application
 */
export const theme: ThemeConfig = {
  token: {
    ...tokens,
    ...typography,
  },

  components,

  algorithm: defaultAlgorithm,
};

export { tokens, components, typography };
