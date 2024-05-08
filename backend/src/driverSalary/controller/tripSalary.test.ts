import { NextFunction, Request, Response } from 'express'
import supertest from 'supertest'
import { createTripSalaryDetails } from './tripSalary.ts'
import { app } from '../../app.ts'

const mockCreateTripSalary = vi.fn()
const mockGetTripSalaryDetailsById = vi.fn()

vi.mock('../models/tripSalary', () => ({
    createTripSalary: (inputs: any) => mockCreateTripSalary(inputs),
    getTripSalaryDetailsByLoactionId: (inputs: any) => mockGetTripSalaryDetailsById(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))

const mockTripSalaryData = {
    body: {
        id: 1,
        cementCompanyId: 1,
        loadingPointId: 1,
        stockPointId: null,
        unloadingPointId: 1,
        tripBetta: 7000,
        dailyBetta: 350,
        driverAdvance: 3000
    }
} as Request

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
} as unknown as Response

const mockTripDetailsData = {
    loadingPointId: '1',
    unloadingPointId: '1',
    stockPointId: ''
}
describe('Trip Salary Controller', () => {
    test('should create trip salary details', async () => {
        mockCreateTripSalary.mockResolvedValue(mockTripSalaryData.body)
        createTripSalaryDetails(mockTripSalaryData, mockRes)
        expect(mockCreateTripSalary).toBeCalledTimes(1)
    })
    test('should get trip salary details by id', async () => {
        mockGetTripSalaryDetailsById.mockResolvedValue(mockTripSalaryData.body)
        await supertest(app).get('/api/getTripSalaryDetails').query(mockTripDetailsData).expect(200)
        expect(mockGetTripSalaryDetailsById).toBeCalledTimes(1)
    })
})
