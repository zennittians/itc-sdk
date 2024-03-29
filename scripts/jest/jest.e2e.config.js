const baseConfig = require('./jest.src.config');
module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@intelchain-js/(.*)$': '<rootDir>/packages/intelchain-$1/src/index.ts',
    'cross-fetch': 'jest-fetch-mock',
  },
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testMatch: ['<rootDir>/e2e/src/?(*.)+(spec|test|e2e).ts'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  collectCoverageFrom: [
    // 'packages/!(intelchain-core)/src/**/*.ts',
    'packages/intelchain-core/src/**/*.ts',
    'packages/intelchain-utils/src/**/*.ts',
    'packages/intelchain-crypto/src/**/*.ts',
    'packages/intelchain-transaction/src/**/*.ts',
  ],
  automock: false,
};
