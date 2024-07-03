import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.25,
                functions: 77.39,
                lines: 84.7,
                statements: 84.7,
                'src/subContracts/models/**': {
                    branches: 91.05,
                    functions: 88.8,
                    lines: 90.56,
                    statements: 90.56
                },
                'src/subContracts/controller/**': {
                    branches: 83.01,
                    functions: 94.11,
                    lines: 94.53,
                    statements: 94.53
                },
                'src/subContracts/domain': {
                    branches: 61.81,
                    functions: 85.71,
                    lines: 95.95,
                    statements: 95.95
                },
                'src/subContracts/routes/**': {
                    branches:100,
                    functions: 100,
                    lines: 99.46,
                    statements: 99.46
                }
            },
            exclude: [
                'src/subContracts/InvoiceFormat/**',
                'src/subContracts/controller/uploadToS3.ts'
            ]
        }
    }
})