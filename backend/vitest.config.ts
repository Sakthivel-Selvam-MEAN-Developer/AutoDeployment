import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'istanbul' // or 'v8'
        },
        maxConcurrency: 1,
        globalSetup: './src/testUtils/autoDBSync.ts',
        setupFiles: ['./src/testUtils/testGlobalHooks.ts']
    }
})
