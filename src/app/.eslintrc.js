module.exports = {
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['variable', 'function'],
        format: ['camelCase', 'snake_case', 'UPPER_CASE'],
      },
    ],
  },
};
