import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 88.72,
                functions: 80.22,
                lines: 88.07,
                statements: 88.07,
                'src/subContracts/models/**': {
                    branches: 95.85,
                    functions: 98.4,
                    lines: 98.7,
                    statements: 98.7
                },
                'src/subContracts/controller/**': {
                    branches: 88.64,
                    functions: 99.04,
                    lines: 97.51,
                    statements: 97.51
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