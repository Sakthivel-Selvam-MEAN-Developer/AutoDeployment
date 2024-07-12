import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 90.72,
                functions: 80.51,
                lines: 88.3,
                statements: 88.3,
                'src/subContracts/models/**': {
                    branches: 98.84,
                    functions: 99.22,
                    lines: 99.92,
                    statements: 99.92
                },
                'src/subContracts/controller/**': {
                    branches: 87.77,
                    functions: 99.08,
                    lines: 97.4,
                    statements: 97.4
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
                    lines: 99.48,
                    statements: 99.48
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})