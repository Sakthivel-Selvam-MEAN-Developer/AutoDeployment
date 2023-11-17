import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        coverage: {
            reporter: ['text', 'json', 'html'],
            lines: 52,
            functions: 42,
            branches: 52,
            statements: 52,
        }
    },
})