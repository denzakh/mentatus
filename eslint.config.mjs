import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

/*
Плоский конфиг ESLint 9 — замена `.eslintrc` с `extends: "react-app"`
(правило из react-scripts, который удалён вместе с CRA).

JSX-рантайм автоматический (Vite/@vitejs/plugin-react), поэтому
`react/react-in-jsx-scope` выключен: импорт React в компонентах не обязателен.
С `src` на TypeScript появился блок `typescript-eslint`: базовые правила
`no-unused-vars`/`no-undef` для TS-файлов отключены, их заменяют правила
плагина (TypeScript сам проверяет типы и неопределённые имена).
*/
const jsFiles = ["**/*.{js,jsx,mjs}"];
const tsFiles = ["**/*.{ts,tsx}"];
const sourceFiles = ["**/*.{js,jsx,mjs,ts,tsx}"];

export default [
  {
    ignores: ["dist/**", "build/**", "node_modules/**"]
  },
  {
    files: jsFiles,
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
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: tsFiles,
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  })),
  {
    files: sourceFiles,
    ...react.configs.flat.recommended,
    settings: {
      react: { version: "detect" }
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^React$" }
      ],
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    files: sourceFiles,
    ...react.configs.flat["jsx-runtime"]
  },
  {
    files: ["src/**/*.test.{js,jsx,ts,tsx}", "src/setupTests.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  }
];
