import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 89.29,
                functions: 80.44,
                lines: 88.19,
                statements: 88.19,
                'src/subContracts/models/**': {
                    branches: 98.83,
                    functions: 99.21,
                    lines: 99.92,
                    statements: 99.92
                },
                'src/subContracts/controller/**': {
                    branches: 88.15,
                    functions: 99.05,
                    lines: 97.36,
                    statements: 97.36
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
                    lines: 99.47,
                    statements: 99.47
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})