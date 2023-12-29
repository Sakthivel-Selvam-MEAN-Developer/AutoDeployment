import { defineWorkspace } from 'vitest/config'

const basicConfig = {
    globals: true,
    environment: 'node',
    coverage: {
        provider: 'v8',
        thresholds: {
            branches: 80,
            functions: 79,
            lines: 80,
            statements: 80
        }
    },
    poolOptions: { threads: { singleThread: true } }
}
// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
    {
        test: {
            ...basicConfig,
            name: 'hrm',
            include: ['src/hrm/**/*.test.ts'],
            setupFiles: ['./src/hrm/testUtils/testGlobalHooks.ts']
        }
    },
    {
        test: {
            ...basicConfig,
            name: 'subContracts',
            include: ['src/subContracts/**/*.test.ts'],
            setupFiles: ['./src/subContracts/testUtils/testGlobalHooks.ts']
        }
    },
    {
        test: {
            ...basicConfig,
            name: 'wonderMove',
            include: ['src/wonderMove/**/*.test.ts'],
            setupFiles: ['./src/wonderMove/testUtils/testGlobalHooks.ts']
        }
    }
])
