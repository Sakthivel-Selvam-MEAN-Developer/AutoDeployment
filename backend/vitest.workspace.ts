import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
    {
        test: {
            name: 'allTestsExceptModels',
            globals: true,
            environment: 'node',
            include: ['src/**/*.test.ts'],
            exclude: ['src/**/models/**/*.test.ts'],

        }
    },
    {
        test: {
            name: 'hrm',
            globals: true,
            environment: 'node',
            include: ['src/hrm/models/*.test.ts'],
            setupFiles: ['./src/hrm/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
        }
    },
    {
        test: {
            name: 'subContracts',
            globals: true,
            environment: 'node',
            include: ['src/subContracts/models/**/*.test.ts'],
            setupFiles: ['./src/subContracts/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
        }
    },
    {
        test: {
            name: 'wonderMove',
            globals: true,
            environment: 'node',
            include: ['src/wonderMove/models/**/*.test.ts'],
            setupFiles: ['./src/wonderMove/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
        }
    },
    {
        test: {
            name: 'driverSalary',
            globals: true,
            environment: 'node',
            include: ['src/driverSalary/models/**/*.test.ts'],
            setupFiles: ['./src/driverSalary/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
        }
    }
])
