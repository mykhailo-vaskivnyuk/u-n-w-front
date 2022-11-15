module.exports = {
  rules: {
    'prettier/prettier': 'off',
    'max-lines': ['error', 100],
    'max-len': ['error', {
      'code': 80,
      'ignoreUrls': true
    }],
  },
};
