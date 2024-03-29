module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',

  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  files: ['*.ts', '*.tsx'],
  extends: ['plugin:@nrwl/nx/typescript'],
  rules: {
    allowEmptyCatch: true,
    '@typescript-eslint/no-explicit-any': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-unsafe-optional-chaining': 'off',
    strict: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'array-bracket-spacing': 2,
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': 2,
    'block-spacing': ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    curly: ['error', 'all'],
    'brace-style': ['error'],
    'eol-last': ['error', 'always'],
    'key-spacing': ['error', { beforeColon: false }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'max-len': ['error', { code: 5000, ignoreUrls: true }],
    'no-extra-semi': 'error',
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-var': 'error',
    quotes: ['error', 'single'],
    'semi-style': ['error', 'last'],
    semi: ['error', 'always'],
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    '@typescript-eslint/ban-types': ['error', { types: { '{}': false } }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'func-call-spacing': ['error', 'never'],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
  },
};
