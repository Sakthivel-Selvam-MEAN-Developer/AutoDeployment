import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.3,
                functions: 80.43,
                lines: 88.09,
                statements: 88.09,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 97.82,
                    lines: 99.4,
                    statements: 99.4
                },
                'src/subContracts/controller/**': {
                    branches: 92.05,
                    functions: 99.14,
                    lines: 98.32,
                    statements: 98.32
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
                    lines: 99.52,
                    statements: 99.52
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})