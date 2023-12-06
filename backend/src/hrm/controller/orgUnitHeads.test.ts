import supertest from 'supertest'
import { app } from '../../app.ts'

const mockOrgUnitHead = jest.fn()
const mockLeaves = jest.fn()
const mockChildsOrgUnitHead = jest.fn()
const mockIsEmployeeHeadOfParentOrg = jest.fn()
const mockOrgHeadOfEmployees = jest.fn()
const mockHeadLeaves = jest.fn()

jest.mock('../models/orgUnitHeads', () => ({
    isEmployeeInOrgUnitHeads: (employeeId: string) => mockOrgUnitHead(employeeId),
    orgHeadOfEmployees: (childOrgId: string) => mockOrgHeadOfEmployees(childOrgId)
}))
jest.mock('../models/leaves', () => ({
    leavesPendingReview: (orgUnitId: number) => mockLeaves(orgUnitId),
    getHeadLeave: (orgUnitId: number) => mockHeadLeaves(orgUnitId)
}))
jest.mock('../models/employee', () => ({
    getEmployeeOrgId: (employeeId: any) => mockChildsOrgUnitHead(employeeId)
}))
jest.mock('../models/orgUnitRelations', () => ({
    isEmployeeHeadOfParentOrg: (orgUnitId: any) => mockIsEmployeeHeadOfParentOrg(orgUnitId)
}))

describe('orgUnitHead Controller', () => {
    test('should able to access', async () => {
        mockOrgUnitHead.mockResolvedValue({ orgUnitId: 2, employeeId: 4, id: 1 })
        mockLeaves.mockResolvedValue([{ employeeId: 4 }])
        await supertest(app)
            .get('/org-leaves/random')
            .expect([{ employeeId: 4 }])
        expect(mockOrgUnitHead).toBeCalledWith('random')
        expect(mockLeaves).toBeCalledWith(2)
    })
    test('should get leaves of child org head to parent org', async () => {
        mockChildsOrgUnitHead.mockResolvedValue({ orgUnitId: 3 })
        mockIsEmployeeHeadOfParentOrg.mockResolvedValue([{ childOrgId: 4 }])
        mockOrgHeadOfEmployees.mockResolvedValue({ childOrgId: 4 })
        mockHeadLeaves.mockResolvedValue({ employeeId: 4 })
        await supertest(app)
            .get('/org-head-leaves/employeeid')
            .expect([{ employeeId: 4 }])
        expect(mockChildsOrgUnitHead).toBeCalledWith('employeeid')
        expect(mockIsEmployeeHeadOfParentOrg).toBeCalledWith(3)
    })
})
