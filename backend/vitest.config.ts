import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.36,
                functions: 78.11,
                lines: 86.96,
                statements: 86.96,
                'src/subContracts/models/**': {
                    branches: 84.34,
                    functions: 98.38,
                    lines: 98.09,
                    statements: 98.09
                },
                'src/subContracts/controller/**': {
                    branches: 87.74,
                    functions: 99.02,
                    lines: 97.25,
                    statements: 97.25
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
                    lines: 99.46,
                    statements: 99.46
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})