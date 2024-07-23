import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.18,
                functions: 80.43,
                lines: 88.04,
                statements: 88.04,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 94.89,
                    lines: 98.35,
                    statements: 98.35
                },
                'src/subContracts/controller/**': {
                    branches: 91.68,
                    functions: 98.23,
                    lines: 95.96,
                    statements: 95.96
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
                    lines: 99.51,
                    statements: 99.51
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})