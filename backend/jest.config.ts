/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 79,
            lines: 80,
            statements: 80
        }
    },
    globalSetup: './src/testUtils/autoDBSync.ts',
    setupFilesAfterEnv: ['./src/testUtils/testGlobalHooks.ts']
}
