module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '/market/*.+(spec|test).+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/setup-tests.ts'],
};
