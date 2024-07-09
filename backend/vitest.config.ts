import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.28,
                functions: 78.11,
                lines: 87.01,
                statements: 87.01,
                'src/subContracts/models/**': {
                    branches: 87.44,
                    functions: 98.4,
                    lines: 98.62,
                    statements: 98.62
                },
                'src/subContracts/controller/**': {
                    branches: 87.88,
                    functions: 99.04,
                    lines: 97.28,
                    statements: 97.28
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