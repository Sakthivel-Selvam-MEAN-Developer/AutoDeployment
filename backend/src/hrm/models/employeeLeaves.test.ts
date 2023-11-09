import seedEmployeeLeave from '../seed/employeeLeaves.ts'
import {
    approvedLeaves,
    create,
    getAllApprovedLeaves,
    getAllEmployeeLeaveForm,
    getAllRejectedLeaves,
    rejectedLeaves
} from './employeeLeaves.ts'

describe('Employee Leave Form model', () => {
    test('should able to access', async () => {
        await create(seedEmployeeLeave)
        const actual = await getAllEmployeeLeaveForm()
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe(seedEmployeeLeave.appliedBy)
    })
    test('should get only the rejected leave by employeeId', async () => {
        const leaveFormToDelete = await create(seedEmployeeLeave)
        await create({
            ...seedEmployeeLeave,
            appliedBy: 'Jack',
            leaveReason: { create: { name: 'Sick' } }
        })
        await rejectedLeaves(leaveFormToDelete.id, leaveFormToDelete.appliedBy)
        const actual = await getAllRejectedLeaves(leaveFormToDelete.appliedBy)
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe('raja')
    })
    test('should get only the approved leave by employeeId', async () => {
        await create(seedEmployeeLeave)
        const leaveFormToApprove = await create({
            ...seedEmployeeLeave,
            appliedBy: 'Jack',
            leaveReason: { create: { name: 'Sick' } }
        })
        await approvedLeaves(leaveFormToApprove.id, leaveFormToApprove.appliedBy)
        const actual = await getAllApprovedLeaves(leaveFormToApprove.appliedBy)
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe('Jack')
    })
})
