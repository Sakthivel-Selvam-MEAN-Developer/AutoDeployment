import seedEmployeeLeave from '../seed/employeeLeaves.ts'
import { create, getAllEmployeeLeaveForm, getAllRejectedLeaves, rejectedLeaves } from './employeeLeaves.ts'

describe('Employee Leave Form model', () => {
    test('should able to access', async () => {
        await create(seedEmployeeLeave)
        const actual = await getAllEmployeeLeaveForm()
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe(seedEmployeeLeave.appliedBy)
    })
    test('should change the active state if form is rejected', async () => {
        const leaveFormToDelete = await create(seedEmployeeLeave)
        await create({...seedEmployeeLeave, appliedBy: 'Jack', leaveReason: {create: { name: 'Sick'}}})
        await rejectedLeaves(leaveFormToDelete.id, leaveFormToDelete.appliedBy)
        const actual = await getAllEmployeeLeaveForm()
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe('Jack')
    })
    test('should get only the rejected leave by employeeId', async () => {
        const leaveFormToDelete = await create(seedEmployeeLeave)
        await create({...seedEmployeeLeave, appliedBy: 'Jack', leaveReason: {create: { name: 'Sick'}}})
        await rejectedLeaves(leaveFormToDelete.id, leaveFormToDelete.appliedBy)
        const actual = await getAllRejectedLeaves(leaveFormToDelete.appliedBy)
        expect(actual.length).toBe(1)
        expect(actual[0].appliedBy).toBe('raja')
    })
})
