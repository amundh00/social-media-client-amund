// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginCypress from "eslint-plugin-cypress";

export default [
  {
    files: ["*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      "no-undef": "off",
      "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["cypress.config.js", "cypress/**/*.cy.js"],
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.cypress,
      },
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      "no-undef": "off",
      "no-unused-vars": ["warn", { vars: "all", args: "none" }],
      "cypress/no-unnecessary-waiting": "off",
    },
  },
];
