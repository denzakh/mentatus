import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

/*
Плоский конфиг ESLint 9 — замена `.eslintrc` с `extends: "react-app"`
(правило из react-scripts, который удалён вместе с CRA).

JSX-рантайм автоматический (Vite/@vitejs/plugin-react), поэтому
`react/react-in-jsx-scope` выключен: импорт React в компонентах не обязателен.
*/
export default [
  {
    ignores: ["dist/**", "build/**", "node_modules/**"]
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
    ...react.configs.flat.recommended,
    settings: {
      react: { version: "detect" }
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      "react/prop-types": "off",
      "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }]
    }
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
    ...react.configs.flat["jsx-runtime"]
  },
  {
    files: ["src/**/*.test.{js,jsx}", "src/setupTests.js"],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  }
];
