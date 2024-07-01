import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 86.06,
                functions: 77.39,
                lines: 84.62,
                statements: 84.62,
                'src/subContracts/models/**': {
                    branches: 90.9,
                    functions: 87.8,
                    lines: 90.22,
                    statements: 90.22
                },
                'src/subContracts/controller/**': {
                    branches: 82.16,
                    functions: 94,
                    lines: 94.33,
                    statements: 94.33
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
            exclude: [
                'src/subContracts/InvoiceFormat/**',
                'src/subContracts/controller/uploadToS3.ts'
            ]
        }
    }
})