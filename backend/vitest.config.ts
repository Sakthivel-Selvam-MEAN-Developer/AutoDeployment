import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 88.04,
                functions: 78.11,
                lines: 87.01,
                statements: 87.01,
                'src/subContracts/models/**': {
                    branches: 87.15,
                    functions: 97.6,
                    lines: 98.05,
                    statements: 98.05
                },
                'src/subContracts/controller/**': {
                    branches: 87.85,
                    functions: 99.03,
                    lines: 97.27,
                    statements: 97.27
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