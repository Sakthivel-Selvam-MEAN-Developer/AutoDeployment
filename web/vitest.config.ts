import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        coverage: {
            provider: 'v8',
            thresholds : {
                lines: 30,
                functions: 32,
                branches: 30,
                statements: 30,
            }
        }
    },
})