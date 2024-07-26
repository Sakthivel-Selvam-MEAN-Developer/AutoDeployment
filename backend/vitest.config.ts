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
                    functions: 97.91,
                    lines: 99.41,
                    statements: 99.41
                },
                'src/subContracts/controller/**': {
                    branches: 92.38,
                    functions: 99.18,
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