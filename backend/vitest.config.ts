import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 91.66,
                functions: 80.51,
                lines: 88.08,
                statements: 88.08,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 99.23,
                    lines: 100,
                    statements: 100
                },
                'src/subContracts/controller/**': {
                    branches: 90.9,
                    functions: 100,
                    lines: 98.99,
                    statements: 98.99
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
                    lines: 99.49,
                    statements: 99.49
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})