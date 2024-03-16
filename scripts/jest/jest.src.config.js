const config = {
  transform: {
    // '^.+\\.(t|j)s$': require.resolve('./transformer.js')
    '^.+\\.(t)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: './tsconfig.test.json',
    },
  },
  testMatch: [
    // '<rootDir>/packages/**/test/?(*.)+(spec|test).js',
    '<rootDir>/packages/intelchain-core/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-account/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-network/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-crypto/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-contract/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-transaction/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-staking/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/intelchain-utils/test/?(*.)+(spec|test).ts',
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
  },
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts', '<rootDir>/e2e'],
  collectCoverageFrom: [
    // 'packages/!(intelchain-core)/src/**/*.ts',
    'packages/intelchain-core/src/**/*.ts',
    'packages/intelchain-utils/src/**/*.ts',
    'packages/intelchain-crypto/src/**/*.ts',
    'packages/intelchain-transaction/src/**/*.ts',
    'packages/intelchain-staking/src/**/*.ts',
    'packages/intelchain-contract/src/**/*.ts',
  ],
  // timers: 'fake',
  setupFiles: ['<rootDir>/scripts/jest/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testEnvironment: process.env.NODE_ENV === 'development' ? 'node' : 'jsdom',
  collectCoverage: true,
  automock: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = config;
