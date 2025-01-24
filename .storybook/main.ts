import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  core: {
    disableTelemetry: true
  }
};
export default config;
