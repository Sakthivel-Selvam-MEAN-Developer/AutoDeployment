import seedEmployeeLeave from '../seed/leaves.ts'
import {
    approvedLeaves,
    create,
    getAllLeave,
    leavesBeforeApproval,
    rejectedLeaves
} from './leaves.ts'

describe('Employee Leave Form model', () => {
    test('should able to access', async () => {
        await create(seedEmployeeLeave)
        const actual = await leavesBeforeApproval()
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe(seedEmployeeLeave.appliedBy)
    })
    test('should get only the rejected leave by employeeId', async () => {
        const leaveFormToDelete = await create(seedEmployeeLeave)
        const comment = { ...leaveFormToDelete, deniedComment: 'No comments' }
        await rejectedLeaves(comment.id, comment.appliedBy, comment.deniedComment)
        const actual = await getAllLeave('asdf')
        expect(actual.length).toBe(1)
        expect(actual[0].approval).toBe(false)
    })
    test('should get only the approved leave by employeeId', async () => {
        const leaveFormToApprove = await create(seedEmployeeLeave)
        expect(leaveFormToApprove.approval).toBe(null)
        await approvedLeaves(leaveFormToApprove.id, leaveFormToApprove.appliedBy)
        const actual = await getAllLeave('asdf')
        expect(actual.length).toBe(1)
        expect(actual[0].approval).toBe(true)
    })
    test.skip('dummy test', async () => {})
})
