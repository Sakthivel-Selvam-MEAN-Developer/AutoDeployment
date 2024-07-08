import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.36,
                functions: 78.11,
                lines: 86.99,
                statements: 86.99,
                'src/subContracts/models/**': {
                    branches: 85.38,
                    functions: 99.19,
                    lines: 99.85,
                    statements: 99.85
                },
                'src/subContracts/controller/**': {
                    branches: 87.78,
                    functions: 99.03,
                    lines: 97.26,
                    statements: 97.26
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