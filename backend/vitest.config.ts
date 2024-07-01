import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 86.83,
                functions: 77.39,
                lines: 84.61,
                statements: 84.61,
                'src/subContracts/models/**': {
                    branches: 85.38,
                    functions: 87.09,
                    lines: 86.73,
                    statements: 86.73
                },
                'src/subContracts/controller/**': {
                    branches: 82.63,
                    functions: 93.93,
                    lines: 94.2,
                    statements: 94.2
                },
                'src/subContracts/domain': {
                    branches: 61.81,
                    functions: 85.71,
                    lines: 95.95,
                    statements: 95.95
                },
                'src/subContracts/routes/**': {
                    branches:96.15,
                    functions: 96.15,
                    lines: 97.28,
                    statements: 97.28
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})