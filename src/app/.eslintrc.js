module.exports = {
  rules: {
    'prettier/prettier': 'off',
    'max-lines': ['error', 100],
    'max-len': ['error', {
      'code': 80,
      'ignoreUrls': true
    }],
    '@typescript-eslint/naming-convention': ['error', {
      selector: ['variable', 'function'],
      format: ['camelCase', 'snake_case', 'UPPER_CASE'],
    }],
  },
};
