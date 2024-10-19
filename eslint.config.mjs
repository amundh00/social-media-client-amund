import globals from "globals";
import pluginJs from "@eslint/js";
import pluginCypress from "eslint-plugin-cypress";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Explicitly set Cypress globals to 'readonly' so that ESLint treats them correctly
        describe: "readonly",
        it: "readonly",
        cy: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      ecmaVersion: 2021, // Adjust based on your needs
    },
    rules: {
      // Add any other Cypress or custom rules if needed
    },
  },
];
