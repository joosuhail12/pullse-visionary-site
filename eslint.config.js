import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
  React: "readonly",
  RequestInfo: "readonly",
  RequestInit: "readonly",
  EventListener: "readonly",
  NodeJS: "readonly",
};

export default tseslint.config(
  {
    ignores: [
      "dist",
      ".next",
      ".sanity",
      "sanity",
      "playwright-report",
      "test-results",
      "node_modules",
      "**/node_modules/**",
    ],
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: sharedGlobals,
    },
  },
  ...tseslint.configs.recommended,
  js.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      "prefer-rest-params": "off",
      "no-redeclare": "off",
      "@typescript-eslint/no-namespace": "off",
      "@next/next/no-assign-module-variable": "off",
      "no-empty-pattern": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
