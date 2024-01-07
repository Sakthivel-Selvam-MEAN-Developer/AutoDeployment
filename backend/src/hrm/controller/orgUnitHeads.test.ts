import supertest from 'supertest'
import { app } from '../../app.ts'

const mockOrgUnitHead = vi.fn()
const mockLeaves = vi.fn()
const mockChildsOrgUnitHead = vi.fn()
const mockIsEmployeeHeadOfParentOrg = vi.fn()
const mockOrgHeadOfEmployees = vi.fn()
const mockHeadLeaves = vi.fn()

vi.mock('../models/orgUnitHeads', () => ({
    isEmployeeInOrgUnitHeads: (employeeId: string) => mockOrgUnitHead(employeeId),
    orgHeadOfEmployees: (childOrgId: string) => mockOrgHeadOfEmployees(childOrgId)
}))
vi.mock('../models/leaves', () => ({
    leavesPendingReview: (orgUnitId: number) => mockLeaves(orgUnitId),
    getHeadLeave: (orgUnitId: number) => mockHeadLeaves(orgUnitId)
}))
vi.mock('../models/employee', () => ({
    getEmployeeOrgId: (employeeId: any) => mockChildsOrgUnitHead(employeeId)
}))
vi.mock('../models/orgUnitRelations', () => ({
    isEmployeeHeadOfParentOrg: (orgUnitId: any) => mockIsEmployeeHeadOfParentOrg(orgUnitId)
}))

describe('orgUnitHead Controller', () => {
    test('should able to access', async () => {
        mockOrgUnitHead.mockResolvedValue({ orgUnitId: 2, employeeId: 4, id: 1 })
        mockLeaves.mockResolvedValue([{ employeeId: 4 }])
        await supertest(app)
            .get('/api/org-leaves/random')
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
            .get('/api/org-head-leaves/employeeid')
            .expect([{ employeeId: 4 }])
        expect(mockChildsOrgUnitHead).toBeCalledWith('employeeid')
        expect(mockIsEmployeeHeadOfParentOrg).toBeCalledWith(3)
    })
})
