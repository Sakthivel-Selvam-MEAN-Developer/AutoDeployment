import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 84.78,
                functions: 74.05,
                lines: 84.95,
                statements: 84.95,
                'src/subContracts/models/**': {
                    branches: 80.46,
                    functions: 84.42,
                    lines: 80.51,
                    statements: 80.51
                },
                'src/subContracts/controller/**': {
                    branches: 80.5,
                    functions: 88,
                    lines: 90.06,
                    statements: 90.06
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
                    lines: 99.45,
                    statements: 99.45
                }
            }
        }
    }
})