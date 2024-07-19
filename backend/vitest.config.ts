import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 91.88,
                functions: 81.18,
                lines: 88.38,
                statements: 88.38,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 99.25,
                    lines: 100,
                    statements: 100
                },
                'src/subContracts/controller/**': {
                    branches: 91.39,
                    functions: 100,
                    lines: 99.17,
                    statements: 99.17
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