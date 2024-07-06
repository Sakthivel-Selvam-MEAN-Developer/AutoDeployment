import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
    {
        test: {
            name: 'hrm',
            globals: true,
            environment: 'node',
            include: ['src/hrm/**/*.test.ts'],
            setupFiles: ['./src/hrm/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
        }
    },
    {
        test: {
            name: 'subContracts',
            globals: true,
            environment: 'node',
            include: ['src/subContracts/**/*.test.ts'],
            setupFiles: ['./src/subContracts/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
        }
    },
    {
        test: {
            name: 'wonderMove',
            globals: true,
            environment: 'node',
            include: ['src/wonderMove/**/*.test.ts'],
            setupFiles: ['./src/wonderMove/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
            }
    },
    {
        test: {
            name: 'driverSalary',
            globals: true,
            environment: 'node',
            include: ['src/driverSalary/**/*.test.ts'],
            setupFiles: ['./src/driverSalary/testUtils/testGlobalHooks.ts'],
            poolOptions: { threads: { singleThread: true } }
            }
    }
])
