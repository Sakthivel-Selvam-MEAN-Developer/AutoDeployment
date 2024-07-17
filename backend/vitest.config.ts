import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 91.61,
                functions: 80.81,
                lines: 88.23,
                statements: 88.23,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 99.23,
                    lines: 100,
                    statements: 100
                },
                'src/subContracts/controller/**': {
                    branches: 90.5,
                    functions: 100,
                    lines: 98.69,
                    statements: 98.69
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