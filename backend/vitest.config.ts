import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.85,
                functions: 81.31,
                lines: 88.53,
                statements: 88.53,
                'src/subContracts/models/**': {
                    branches: 99.24,
                    functions: 97.94,
                    lines: 99.41,
                    statements: 99.41
                },
                'src/subContracts/controller/**': {
                    branches: 92.45,
                    functions: 99.2,
                    lines: 98.3,
                    statements: 98.3
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
                    lines: 99.53,
                    statements: 99.53
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})