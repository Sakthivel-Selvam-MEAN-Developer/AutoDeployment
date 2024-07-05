import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 88.12,
                functions: 77.06,
                lines: 85.62,
                statements: 85.62,
                'src/subContracts/models/**': {
                    branches: 91.45,
                    functions: 91.33,
                    lines: 92.56,
                    statements: 92.56
                },
                'src/subContracts/controller/**': {
                    branches: 86.94,
                    functions: 94.17,
                    lines: 95.88,
                    statements: 95.88
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