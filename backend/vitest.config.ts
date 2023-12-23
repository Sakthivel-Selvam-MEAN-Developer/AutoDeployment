import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 80,
                functions: 79,
                lines: 80,
                statements: 80
            }
        },
        globalSetup: './src/testUtils/autoDBSync.ts',
        setupFiles: ['./src/testUtils/testGlobalHooks.ts']
    }
})
