import js from "@eslint/js";
import tseslint from "typescript-eslint";
import {fixupPluginRules} from "@eslint/compat";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

const ignores = ['dist', '.eslintrc.cjs']

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores,
    plugins: {
      react: react,
      "react-hooks": fixupPluginRules(reactHooks),
      "react-refresh": reactRefresh
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect",
        ecmaVersion: "latest"
      }
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores,
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
    }
  }
]