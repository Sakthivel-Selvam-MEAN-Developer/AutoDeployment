import {
    create as createOrgHead,
    isEmployeeInOrgUnitHeads,
} from './orgUnitHeads.ts'
import { create } from './orgUnit.ts'
import { create as createEmployee } from './employee.ts'
import seedOrgUnits from '../seed/orgUnits.ts'
import seedEmployee from '../seed/employeeHead.ts'

describe('OrgUnitHeads', () => {
    test('should find Employee is OrgUnitHead or not', async () => {
        const orgUnits = await create(seedOrgUnits)
        const orgHead = await createEmployee({ ...seedEmployee, orgUnitId: orgUnits.id })
        await createOrgHead({ orgUnitsId: orgUnits.id, employeesId: orgHead.id })
        const actual = await isEmployeeInOrgUnitHeads(orgHead.employeeId)
        expect(actual?.employeesId).toBe(orgHead.id)
        expect(actual?.orgUnitsId).toBe(orgUnits.id)
    })
    // test('should find OrgUnitHead', async () => {
    //     const orgUnits = await create(seedOrgUnits)
    //     const anotherOrgUnits = await create({ ...seedOrgUnits, name: 'Finance' })
    //     const orgHead = await createEmployee({ ...seedEmployee, orgUnitId: orgUnits.id })
    //     // headOfOtherOrgToExclude
    //     await createEmployee({ ...seedEmployee, employeeId: 'abcd', orgUnitId: anotherOrgUnits.id })
    //     await createOrgHead({ orgUnitsId: orgUnits.id, employeesId: orgHead.id })
    //     const actual = await orgHeadOfEmployees(orgUnits.id)
    //     expect(actual.length).toBe(1)
    //     expect(actual[0]?.orgUnitsId).toBe(orgUnits.id)
    // })
})
