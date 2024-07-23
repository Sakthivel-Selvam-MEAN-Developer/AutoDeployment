import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.67,
                functions: 81.02,
                lines: 88.43,
                statements: 88.43,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 97.14,
                    lines: 99.13,
                    statements: 99.13
                },
                'src/subContracts/controller/**': {
                    branches: 92.05,
                    functions: 98.3,
                    lines: 98.06,
                    statements: 98.06
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