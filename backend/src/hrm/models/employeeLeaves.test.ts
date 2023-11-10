import seedEmployeeLeave from '../seed/employeeLeaves.ts'
import {
    approvedLeaves,
    create,
    getAllLeave,
    leavesAfterApply,
    rejectedLeaves
} from './employeeLeaves.ts'

describe('Employee Leave Form model', () => {
    test('should able to access', async () => {
        await create(seedEmployeeLeave)
        const actual = await leavesAfterApply()
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe(seedEmployeeLeave.appliedBy)
    })
    test('should get only the rejected leave by employeeId', async () => {
        const leaveFormToDelete = await create(seedEmployeeLeave)
        await rejectedLeaves(leaveFormToDelete.id, leaveFormToDelete.appliedBy)
        const actual = await getAllLeave()
        expect(actual.length).toBe(1)
        expect(actual[0].approval).toBe(false)
    })
    test('should get only the approved leave by employeeId', async () => {
        const leaveFormToApprove = await create(seedEmployeeLeave)
        expect(leaveFormToApprove.approval).toBe(null)
        await approvedLeaves(leaveFormToApprove.id, leaveFormToApprove.appliedBy)
        const actual = await getAllLeave()
        expect(actual.length).toBe(1)
        expect(actual[0].approval).toBe(true)
    })
})
