module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': 'off',
    'object-shorthand': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'prefer-destructuring': 'off',
    'max-len': ["error", { "code": 300 }],
    'no-unused-expressions': ["error", { "allowShortCircuit": true }],
    'linebreak-style': 'off',
    'no-shadow': 'off',
    'space-before-function-paren': 'off',
    'import/no-extraneous-dependencies': ["error", { devDependencies: true, }],
    'object-curly-newline': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
