/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globalSetup: './src/wonderMove/models/testUtils/autoDBSync.ts',
  setupFilesAfterEnv: ['./src/wonderMove/models/testUtils/testGlobalHooks.ts'],
};