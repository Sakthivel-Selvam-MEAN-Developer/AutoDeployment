import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { createDriverTrip } from './driverTrip.ts'

const mockCreateDriverTrip = vi.fn()
const mockGetAllDriverTripById = vi.fn()
const mockGetTripSalaryDetailsById = vi.fn()
const mockGetAllExpenseCountByTripId = vi.fn()
const mockGetOverAllTripByArrayOfId = vi.fn()

vi.mock('../models/driverTrip', () => ({
    create: (inputs: any) => mockCreateDriverTrip(inputs),
    getAllDriverTripById: (id: number[]) => mockGetAllDriverTripById(id)
}))
vi.mock('../models/tripSalary', () => ({
    getTripSalaryDetailsById: (id: number[]) => mockGetTripSalaryDetailsById(id)
}))
vi.mock('../../subContracts/models/overallTrip', () => ({
    getOverAllTripByArrayOfId: (id: number[]) => mockGetOverAllTripByArrayOfId(id)
}))
vi.mock('../models/expenses', () => ({
    getAllExpenseCountByTripId: (inputs: number[]) => mockGetAllExpenseCountByTripId(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))

const mockDriverTripData = {
    body: {
        id: 1,
        tripId: 1,
        tripStartDate: 23456789,
        driverId: 1
    }
} as Request

const mockGetDriverTripData = [
    {
        id: 1,
        tripId: 37,
        tripSalaryId: 1
    }
]
const mockGetTripSalaryDetailsByIdData = [
    {
        id: 35,
        loadingPointToUnloadingPointTrip: {
            id: 35,
            loadingPoint: {
                name: 'Chennai'
            },
            invoiceNumber: 'asdsa',
            startDate: 1714588200,
            unloadingPoint: {
                name: 'Salem'
            },
            truck: {
                vehicleNumber: 'TN12G9456'
            }
        },
        loadingPointToStockPointTrip: null
    }
]
const mockGetAllExpenseCountByTripIdData = [{ amount: 123, tripId: 35 }]
const mockGetOverAllTripByArrayOfIdData = [
    { id: 1, dailyBetta: 350, driverAdvance: 2000, tripBetta: 4500 },
    { id: 2, dailyBetta: 350, driverAdvance: 2000, tripBetta: 5000 },
    { id: 3, dailyBetta: 350, driverAdvance: 1200, tripBetta: 4500 }
]
const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
} as unknown as Response

describe('driverTrip Controller', () => {
    test('should able to create driver Trip', async () => {
        mockCreateDriverTrip.mockResolvedValue(mockDriverTripData.body)
        createDriverTrip(mockDriverTripData, mockRes)
        await supertest(app).post('/api/drivertrip').expect(200)
        expect(mockCreateDriverTrip).toBeCalledTimes(2)
    })
    test('should able to get all driver Trip by Id', async () => {
        mockGetAllDriverTripById.mockResolvedValue(mockGetDriverTripData)
        mockGetTripSalaryDetailsById.mockResolvedValue(mockGetTripSalaryDetailsByIdData)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        mockGetOverAllTripByArrayOfId.mockResolvedValue(mockGetOverAllTripByArrayOfIdData)
        await supertest(app).get('/api/drivertrip').expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(1)
        expect(mockGetTripSalaryDetailsById).toBeCalledTimes(1)
        expect(mockGetAllExpenseCountByTripId).toBeCalledTimes(1)
        expect(mockGetOverAllTripByArrayOfId).toBeCalledTimes(1)
    })
})
