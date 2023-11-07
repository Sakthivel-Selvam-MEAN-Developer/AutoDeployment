import seedEmployeeLeave from '../seed/employeeLeaves.ts'
import { create, getAllEmployeeLeaveForm } from './employeeLeaves.ts'

describe('Employee Leave Form model', () => {
    test('should able to access', async () => {
        await create(seedEmployeeLeave)
        const actual = await getAllEmployeeLeaveForm()
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe(seedEmployeeLeave.appliedBy)
    })
})
