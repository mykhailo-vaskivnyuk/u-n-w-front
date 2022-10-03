module.exports = {
  extends: [
    'airbnb', /* includes [ react, react-a11y, eslint-config-airbnb-base: [ 
      best-practices, errors, node, style, variables, es6, imports, strict ]] */
    'airbnb-typescript', /* overrides and extends [ eslint-config-airbnb-base: [ 
      best-practices, errors, node, style, variables, es6, imports, strict ]] */
    'airbnb/hooks', /* includes [ react-hooks ] */
    'plugin:@typescript-eslint/recommended', /* implements additional rules for typescript linting */
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', /* enhances typescript linting for type checking */
    'plugin:prettier/recommended', /* extends [ eslint-config-prettier: [ 
      prettier, @typescript-eslint, prettier/babel, prettier/flowtype, prettier/react, 
      prettier/standard, prettier/unicorn, prettier/vue ]] */
  ],
  plugins: [
    'react', 
    'react-hooks', 
    'import', 
    'jsx-a11y', 
    'prettier', 
    '@typescript-eslint'
  ],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    es2021: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'off',
    'spaced-comment': 'warn',
  },
};
