import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.03,
                functions: 80.43,
                lines: 88.05,
                statements: 88.05,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 93.43,
                    lines: 98.15,
                    statements: 98.15
                },
                'src/subContracts/controller/**': {
                    branches: 91.66,
                    functions: 98.21,
                    lines: 95.94,
                    statements: 95.94
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