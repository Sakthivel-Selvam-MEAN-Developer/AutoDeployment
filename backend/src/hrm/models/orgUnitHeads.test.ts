import {
    create as createOrgHead,
    isEmployeeInOrgUnitHeads,
    orgHeadOfEmployees
} from './orgUnitHeads.ts'
import { create } from './orgUnit.ts'
import { create as createEmployee } from './employee.ts'
import seedOrgUnits from '../seed/orgUnits.ts'
import seedEmployee from '../seed/employeeHead.ts'

describe('OrgUnitHeads', () => {
    test('should find Employee is OrgUnitHead or not', async () => {
        const orgUnits = await create(seedOrgUnits)
        const orgHead = await createEmployee({
            ...seedEmployee,
            orgUnitId: orgUnits.id
        })
        await createOrgHead({ orgUnitId: orgUnits.id, employeeId: orgHead.id })
        const actual = await isEmployeeInOrgUnitHeads(orgHead.employeeId)
        expect(actual?.employeeId).toBe(orgHead.id)
        expect(actual?.orgUnitId).toBe(orgUnits.id)
    })
    test('should find OrgUnitHead of Employee', async () => {
        const orgUnits = await create(seedOrgUnits)
        const orgHead = await createEmployee({
            ...seedEmployee,
            orgUnitId: orgUnits.id
        })
        await createOrgHead({ orgUnitId: orgUnits.id, employeeId: orgHead.id })
        const actual = await orgHeadOfEmployees(orgUnits.id)
        expect(actual?.employeeId).toBe(orgHead.id)
    })
})
