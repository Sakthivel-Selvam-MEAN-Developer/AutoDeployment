import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { createDriverTrip, updateDriverAdvance } from './driverTrip.ts'

const mockCreateDriverTrip = vi.fn()
const mockGetAllDriverTripById = vi.fn()
const mockGetTripSalaryDetailsById = vi.fn()
const mockGetAllExpenseCountByTripId = vi.fn()
const mockGetOverAllTripByArrayOfId = vi.fn()
const mockUpdateDriverAdvanceByTripId = vi.fn()
const mockGetDriverIdByTripId = vi.fn()

vi.mock('../models/driverTrip', () => ({
    create: (inputs: any) => mockCreateDriverTrip(inputs),
    getAllDriverTripById: (id: number[]) => mockGetAllDriverTripById(id),
    updateDriverAdvanceByTripId: (id: number, advance: number) =>
        mockUpdateDriverAdvanceByTripId(id, advance),
    getDriverIdByTripId: (tripId: number) => mockGetDriverIdByTripId(tripId)
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
        unloadingTripSalaryId: 1,
        stockTripSalaryId: 2,
        driverAdvance: [1200]
    }
]

const mockGetAllExpenseCountByTripIdData = [{ amount: 123, tripId: 35 }]
const mockGetOverAllTripByArrayOfIdData = [
    { id: 37, dailyBetta: 350, appPayAdvance: 2000, tripBetta: 4500 },
    { id: 37, dailyBetta: 350, appPayAdvance: 1200, tripBetta: 4500 }
]
const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
} as unknown as Response
const mockGetDriverIdByTripIdData = {
    id: 1,
    driverId: 1
}
const mockUpdateDriverAdvanceByTripIdData = {
    id: 2,
    tripId: 3,
    tripStartDate: 1714674600,
    driverId: 1,
    unloadingTripSalaryId: 1,
    stockTripSalaryId: 2,
    driverAdvance: [1234]
}
const mockUpdateDriverAdvance = {
    body: { driverAdvance: '1234', tripId: 3 }
} as Request

describe('driverTrip Controller', () => {
    test('should able to create driver Trip', async () => {
        mockCreateDriverTrip.mockResolvedValue(mockDriverTripData.body)
        createDriverTrip(mockDriverTripData, mockRes)
        await supertest(app).post('/api/drivertrip').expect(200)
        expect(mockCreateDriverTrip).toBeCalledTimes(2)
    })
    test('should able to get all driver Trip by Id', async () => {
        mockGetAllDriverTripById.mockResolvedValue(mockGetDriverTripData)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        mockGetOverAllTripByArrayOfId.mockResolvedValue(mockGetOverAllTripByArrayOfIdData)
        await supertest(app).get('/api/drivertrip').query({ driverId: 1 }).expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(1)
        expect(mockGetAllExpenseCountByTripId).toBeCalledTimes(1)
        expect(mockGetOverAllTripByArrayOfId).toBeCalledTimes(1)
    })
    test('should able to update driver advance by trip id', async () => {
        mockGetDriverIdByTripId.mockResolvedValue(mockGetDriverIdByTripIdData)
        mockUpdateDriverAdvanceByTripId.mockResolvedValue(mockUpdateDriverAdvanceByTripIdData)
        await updateDriverAdvance(mockUpdateDriverAdvance, mockRes)
        expect(mockGetDriverIdByTripId).toHaveBeenCalledWith(mockUpdateDriverAdvance.body.tripId)
        expect(mockUpdateDriverAdvanceByTripId).toHaveBeenCalledWith(
            mockGetDriverIdByTripIdData.id,
            parseInt(mockUpdateDriverAdvance.body.driverAdvance)
        )
        expect(mockGetDriverIdByTripId).toBeCalledTimes(1)
        expect(mockUpdateDriverAdvanceByTripId).toBeCalledTimes(1)
    })
})
