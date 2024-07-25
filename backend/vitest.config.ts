import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.85,
                functions: 81.31,
                lines: 88.51,
                statements: 88.51,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 97.87,
                    lines: 99.4,
                    statements: 99.4
                },
                'src/subContracts/controller/**': {
                    branches: 92.34,
                    functions: 99.17,
                    lines: 98.31,
                    statements: 98.31
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