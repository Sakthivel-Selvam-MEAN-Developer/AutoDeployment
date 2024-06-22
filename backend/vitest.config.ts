import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 84.78,
                functions: 74.05,
                lines: 84.51,
                statements: 84.51,
                'src/subContracts/models/**': {
                    branches: 80.62,
                    functions: 85.95,
                    lines: 83.97,
                    statements: 83.97
                },
                'src/subContracts/controller/**': {
                    branches: 80.5,
                    functions: 88.88,
                    lines: 90.36,
                    statements: 90.36
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
            }
        }
    }
})
