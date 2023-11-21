import express from 'express'
import supertest from 'supertest'
import { employeeLeavesPerOrg } from './orgUnitHeads.ts'

const mockOrgUnitHead = jest.fn()
const mockLeaves = jest.fn()

jest.mock('../models/orgUnitHeads', () => ({
    isEmployeeInOrgUnitHeads: (employeeId: any) => mockOrgUnitHead(employeeId)
}))
jest.mock('../models/leaves', () => ({
    leavesPendingReview: (orgUnitId: any) => mockLeaves(orgUnitId)
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
})
