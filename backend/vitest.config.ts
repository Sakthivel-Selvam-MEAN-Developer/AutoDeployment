import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                branches: 85.63,
                functions: 74.18,
                lines: 84.73,
                statements: 84.73,
                'src/subContracts/models/**': {
                    branches: 85.2,
                    functions: 86.88,
                    lines: 86.49,
                    statements: 86.49
                },
                'src/subContracts/controller/**': {
                    branches: 81.81,
                    functions: 93.93,
                    lines: 93.97,
                    statements: 93.97
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