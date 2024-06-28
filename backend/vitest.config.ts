import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 86.68,
                functions: 76.83,
                lines: 84.31,
                statements: 84.31,
                'src/subContracts/models/**': {
                    branches: 85.38,
                    functions: 87.09,
                    lines: 86.73,
                    statements: 86.73
                },
                'src/subContracts/controller/**': {
                    branches: 82.63,
                    functions: 93.93,
                    lines: 94.19,
                    statements: 94.19
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
                    lines: 99.44,
                    statements: 99.44
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})