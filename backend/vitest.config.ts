import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 92.68,
                functions: 81.02,
                lines: 88.43,
                statements: 88.43,
                'src/subContracts/models/**': {
                    branches: 100,
                    functions: 90,
                    lines: 97.66,
                    statements: 97.66
                },
                'src/subContracts/controller/**': {
                    branches: 92.03,
                    functions: 97.47,
                    lines: 97.66,
                    statements: 97.66
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
                    lines: 99.52,
                    statements: 99.52
                }
            },
            exclude: ['src/subContracts/InvoiceFormat/**']
        }
    }
})