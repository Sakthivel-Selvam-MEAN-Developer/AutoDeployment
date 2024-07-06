import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.74,
                functions: 77.06,
                lines: 85.62,
                statements: 85.62,
                'src/subContracts/models/**': {
                    branches: 89.85,
                    functions: 96,
                    lines: 93.97,
                    statements: 93.97
                },
                'src/subContracts/controller/**': {
                    branches: 87.05,
                    functions: 96.11,
                    lines: 96.38,
                    statements: 96.38
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
            exclude: [
                'src/subContracts/InvoiceFormat/**',
                'src/subContracts/controller/uploadToS3.ts'
            ]
        }
    }
})