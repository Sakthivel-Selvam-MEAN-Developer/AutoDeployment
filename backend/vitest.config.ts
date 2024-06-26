import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
<<<<<<< Updated upstream
                branches: 80.00,
                functions: 70.00,
                lines: 80.00,
                statements: 80.00,
=======
                branches: 85.24,
                functions: 74.05,
                lines: 84.51,
                statements: 84.51,
>>>>>>> Stashed changes
                'src/subContracts/models/**': {
                    branches: 81.88,
                    functions: 86.77,
                    lines: 86.25,
                    statements: 86.25
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