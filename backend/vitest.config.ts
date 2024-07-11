import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 89.61,
                functions: 80.44,
                lines: 88.19,
                statements: 88.19,
                'src/subContracts/models/**': {
                    branches: 95.54,
                    functions: 99.2,
                    lines: 99.92,
                    statements: 99.92
                },
                'src/subContracts/controller/**': {
                    branches: 88.08,
                    functions: 99.04,
                    lines: 97.34,
                    statements: 97.34
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