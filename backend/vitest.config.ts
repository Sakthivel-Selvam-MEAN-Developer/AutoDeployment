import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 91.18,
                functions: 80.44,
                lines: 88.05,
                statements: 88.05,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 99.22,
                    lines: 100,
                    statements: 100
                },
                'src/subContracts/controller/**': {
                    branches: 88.82,
                    functions: 100,
                    lines: 97.7,
                    statements: 97.7
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