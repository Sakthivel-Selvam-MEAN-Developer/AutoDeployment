import { create, getEmployeeOrgId } from './employee.ts'
import seedEmployee from '../seed/employees.ts'

describe('Employee Model', () => {
    test('should able to access', async () => {
        const employee = await create(seedEmployee)
        const actual = await getEmployeeOrgId(employee.employeeId)
        expect(actual?.orgUnitId).toBe(employee.orgUnitId)
    })
})
