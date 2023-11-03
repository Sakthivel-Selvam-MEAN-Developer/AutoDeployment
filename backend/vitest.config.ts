import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'istanbul' // or 'v8'
        },
        maxConcurrency: 1,
        globalSetup: './src/wonderMove/models/testUtils/autoDBSync.ts',
        setupFiles: ['./src/wonderMove/models/testUtils/testGlobalHooks.ts']
    }
})
