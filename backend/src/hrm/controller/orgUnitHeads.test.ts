import express from 'express'
import supertest from 'supertest'
import { childOrgLeavesEachOrg, employeeLeavesPerOrg } from './orgUnitHeads.ts'

const mockOrgUnitHead = jest.fn()
const mockLeaves = jest.fn()
const mockChildsOrgUnitHead = jest.fn()
const mockIsEmployeeHeadOfParentOrg = jest.fn()
const mockOrgHeadOfEmployees = jest.fn()
const mockHeadLeaves = jest.fn()

jest.mock('../models/orgUnitHeads', () => ({
    isEmployeeInOrgUnitHeads: (employeeId: any) => mockOrgUnitHead(employeeId),
    orgHeadOfEmployees: (childOrgId: any) => mockOrgHeadOfEmployees(childOrgId)
}))
jest.mock('../models/leaves', () => ({
    leavesPendingReview: (orgUnitId: any) => mockLeaves(orgUnitId),
    getHeadLeave: (orgUnitId: any) => mockHeadLeaves(orgUnitId)
}))
jest.mock('../models/employee', () => ({
    getEmployeeOrgId: (employeeId: any) => mockChildsOrgUnitHead(employeeId)
}))
jest.mock('../models/orgUnitRelations', () => ({
    isEmployeeHeadOfParentOrg: (orgUnitId: any) => mockIsEmployeeHeadOfParentOrg(orgUnitId)
}))

describe('orgUnitHead Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access', async () => {
        app.get('/leave/:employeeId', employeeLeavesPerOrg)
        mockOrgUnitHead.mockResolvedValue({ orgUnitsId: 2, employeesId: 4, id: 1 })
        mockLeaves.mockResolvedValue([{ employeesId: 4 }])
        await supertest(app)
            .get('/leave/random')
            .expect([{ employeesId: 4 }])
        expect(mockOrgUnitHead).toBeCalledWith('random')
        expect(mockLeaves).toBeCalledWith(2)
    })
    test('should get leaves of child org head to parent org', async () => {
        app.get('/org-head-leaves/:employeeId', childOrgLeavesEachOrg)
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
