import seedEmployeeLeave from '../seed/leaves.ts'
import seedEmployee from '../seed/employeeHead.ts'
import seedEmployeeLeaveWithoutDep from '../seed/leavesWithoutDep.ts'
import seedOrgUnit from '../seed/orgUnits.ts'
import seedReason from '../seed/reason.ts'
import { create as createOrgUnit } from './orgUnit.ts'
import { create as createEmployee } from './employee.ts'
import { create as createReason } from './leaveReasons.ts'
import {
    approvedLeaves,
    create as createLeave,
    getAllLeave,
    leavesPendingReview,
    rejectedLeaves,
    getHeadLeave
} from './leaves.ts'
import { create as createOrgHead } from './orgUnitHeads.ts'

describe('Employee Leave Form model', () => {
    test('should able to access', async () => {
        const orgUnit = await createOrgUnit(seedOrgUnit)
        const reason = await createReason(seedReason)
        const employee = await createEmployee({
            ...seedEmployee,
            orgUnitId: orgUnit.id
        })
        await createLeave({
            ...seedEmployeeLeaveWithoutDep,
            employeeId: employee.employeeId,
            leaveReasonId: reason.id
        })
        const actual = await leavesPendingReview(employee.orgUnitId, employee.employeeId)
        expect(actual.length).toBe(0)
    })
    test('should get only the rejected leave by employeeId', async () => {
        const leaveFormToDelete = await createLeave(seedEmployeeLeave)
        const comment = { ...leaveFormToDelete, deniedComment: 'No comments' }
        await rejectedLeaves(comment.id, comment.employeeId, comment.deniedComment)
        const actual = await getAllLeave('asdf')
        expect(actual.length).toBe(1)
        expect(actual[0].approval).toBe(false)
    })
    test('should get only the approved leave by employeeId', async () => {
        const leaveFormToApprove = await createLeave(seedEmployeeLeave)
        expect(leaveFormToApprove.approval).toBe(null)
        await approvedLeaves(leaveFormToApprove.id, leaveFormToApprove.employeeId)
        const actual = await getAllLeave('asdf')
        expect(actual.length).toBe(1)
        expect(actual[0].approval).toBe(true)
    })
    test('should get only the head leaves', async () => {
        const orgUnit = await createOrgUnit(seedOrgUnit)
        const reason = await createReason(seedReason)
        const orgHead = await createEmployee({
            ...seedEmployee,
            orgUnitId: orgUnit.id
        })
        await createOrgHead({ orgUnitId: orgUnit.id, employeeId: orgHead.id })
        await createLeave({
            ...seedEmployeeLeaveWithoutDep,
            employeeId: orgHead.employeeId,
            leaveReasonId: reason.id
        })
        const actual = await getHeadLeave(orgHead.id)
        expect(actual.length).toBe(1)
        expect(actual[0].employeeId).toBe(orgHead.employeeId)
    })
})
