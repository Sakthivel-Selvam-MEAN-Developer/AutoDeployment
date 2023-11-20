import { jest } from '@jest/globals'
import { employeeLeavesPerOrg } from './orgUnitHeads'

const mockOrgUnitHead = jest.fn()
const mockLeaves = jest.fn()

jest.mock('../models/orgUnitHeads', () => ({
    isEmployeeInOrgUnitHeads: (employeeId: any) => mockOrgUnitHead(employeeId)
}))
jest.mock('../models/leaves', () => ({
    leavesBeforeApproval: (orgUnitId: any) => mockLeaves(orgUnitId)
}))

describe('orgUnitHead Controller', () => {
    test.skip('should able to access', async () => {
        const req = { params: { employeeId: "randon" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        // const id = 1
        // const orgUnitsId = 2
        // const employeesId = 4
        // mockOrgUnitHead.mockResolvedValue({ orgUnitsId, employeesId, id })
        mockLeaves.mockReturnValue([{employeesId}])
        const data = await employeeLeavesPerOrg(req, res)
        console.log(data)        
    })
})
