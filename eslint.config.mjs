import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-console": ['error', { allow: ['warn', 'error', 'info'] }],
    }
  }, {
    ignores: ['node_modules', 'dist']
  }
];