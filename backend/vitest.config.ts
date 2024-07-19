import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 91.85,
                functions: 80.81,
                lines: 88.27,
                statements: 88.27,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 99.24,
                    lines: 100,
                    statements: 100
                },
                'src/subContracts/controller/**': {
                    branches: 91.32,
                    functions: 100,
                    lines: 99.16,
                    statements: 99.16
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
                    lines: 99.5,
                    statements: 99.5
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})