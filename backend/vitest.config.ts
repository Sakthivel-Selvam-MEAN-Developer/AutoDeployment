import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.11,
                functions: 76.6,
                lines: 85.25,
                statements: 85.25,
                'src/subContracts/models/**': {
                    branches: 91.28,
                    functions: 91.33,
                    lines: 92.39,
                    statements: 92.39
                },
                'src/subContracts/controller/**': {
                    branches: 87.02,
                    functions: 94.17,
                    lines: 96.06,
                    statements: 96.06
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