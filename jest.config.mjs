import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginCypress from "eslint-plugin-cypress";

export default [
  // Section for general JavaScript files with ESLint recommendations
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
  // Section specifically for Jest test files
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Jest globals like `describe`, `it`, `expect`, etc.
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      "no-undef": "off", // Disable `no-undef` for Jest globals
      "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }], // Ignore unused variables that start with `_`
    },
  },
  // Section specifically for Cypress test files
  {
    files: ["cypress.config.js", "cypress/**/*.cy.js"], // Applies to Cypress configuration and test files
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.cypress, // Add Cypress globals like `cy`, `Cypress`, etc.
      },
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      "no-undef": "off", // Disable `no-undef` for CommonJS globals like `require` and `module`
      "no-unused-vars": ["warn", { vars: "all", args: "none" }], // Allow unused parameters for config functions
    },
  },
];
