import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 87.3,
                functions: 76.6,
                lines: 85.25,
                statements: 85.25,
                'src/subContracts/models/**': {
                    branches: 91.28,
                    functions: 91.33,
                    lines: 92.55,
                    statements: 92.55
                },
                'src/subContracts/controller/**': {
                    branches: 86.94,
                    functions: 94.17,
                    lines: 95.84,
                    statements: 95.84
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