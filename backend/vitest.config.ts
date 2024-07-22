import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 91.63,
                functions: 80.04,
                lines: 87.63,
                statements: 87.63,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 93.43,
                    lines: 98.15,
                    statements: 98.15
                },
                'src/subContracts/controller/**': {
                    branches: 91.39,
                    functions: 98.16,
                    lines: 95.81,
                    statements: 95.81
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