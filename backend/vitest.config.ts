import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 86.48,
                functions: 76.83,
                lines: 84.28,
                statements: 84.28,
                'src/subContracts/models/**': {
                    branches: 85.29,
                    functions: 86.99,
                    lines: 86.53,
                    statements: 86.53
                },
                'src/subContracts/controller/**': {
                    branches: 82.14,
                    functions: 93.93,
                    lines: 94.14,
                    statements: 94.14
                },
                'src/subContracts/domain': {
                    branches: 61.81,
                    functions: 85.71,
                    lines: 95.95,
                    statements: 95.95
                },
                'src/subContracts/routes/**': {
                    branches: 100,
                    functions: 100,
                    lines: 99.44,
                    statements: 99.44
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})