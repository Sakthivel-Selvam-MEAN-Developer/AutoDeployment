import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { createDriverTrip } from './driverTrip.ts'

const mockCreateDriverTrip = vi.fn()
const mockGetAllDriverTripById = vi.fn()

vi.mock('../models/driverTrip', () => ({
    create: (inputs: any) => mockCreateDriverTrip(inputs),
    getAllDriverTripById: (id: number) => mockGetAllDriverTripById(id)
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
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        loadingPointToUnloadingPointTrip: {
            loadingPoint: {
                id: 1,
                name: 'Chennai-south',
                cementCompanyId: 1,
                pricePointMarkerId: 1
            },
            invoiceNumber: 'ABC123',
            startDate: 1700764200
        },
        loadingPointToStockPointTrip: null
    }
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
        await supertest(app).get('/api/drivertrip').expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(1)
    })
})
