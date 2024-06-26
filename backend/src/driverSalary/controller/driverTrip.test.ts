import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import dayjs from 'dayjs'
import { app } from '../../app.ts'
import { createDriverTrip, updateDriverAdvance } from './driverTrip.ts'

const mockCreateDriverTrip = vi.fn()
const mockGetAllDriverTripById = vi.fn()
const mockGetTripSalaryDetailsById = vi.fn()
const mockGetAllExpenseCountByTripId = vi.fn()
const mockGetOverAllTripByArrayOfId = vi.fn()
const mockGetDriverIdByTripId = vi.fn()
const mockCreateDriverAdvance = vi.fn()
const mockGetDriverAdvance = vi.fn()
const mockGetExpensesByTripId = vi.fn()

vi.mock('../models/driverTrip', () => ({
    create: (inputs: any) => mockCreateDriverTrip(inputs),
    getAllDriverTripById: (id: number[]) => mockGetAllDriverTripById(id),
    getDriverIdByTripId: (tripId: number) => mockGetDriverIdByTripId(tripId),
    getDriverAdvance: (id: number) => mockGetDriverAdvance(id),
    getExpensesByTripIds: (tripId: number) => mockGetExpensesByTripId(tripId)
}))
vi.mock('../models/tripSalary', () => ({
    getTripSalaryDetailsById: (id: number[]) => mockGetTripSalaryDetailsById(id)
}))
vi.mock('../../subContracts/models/overallTrip', () => ({
    getOverAllTripByArrayOfId: (id: number[]) => mockGetOverAllTripByArrayOfId(id)
}))
vi.mock('../models/driverAdvance', () => ({
    createDriverAdvance: (id: number[]) => mockCreateDriverAdvance(id)
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
        driver: {
            name: 'sakthi',
            driverAttendance: [
                {
                    attendance: [
                        {
                            year: 2024,
                            attendance: [
                                {
                                    month: 'June',
                                    datesPresent: [1, 2, 3, 4, 5]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        unloadingTripSalaryId: 1,
        stockTripSalaryId: 2,
        dailyBetta: 100,
        driverAdvanceForTrip: [
            {
                amount: true,
                advanceDate: true
            }
        ]
    }
]

const mockGetAllExpenseCountByTripIdData = [{ amount: 123, tripId: 35 }]
const mockGetOverAllTripByArrayOfIdData = {
    data: [
        { id: 37, dailyBetta: 350, appPayAdvance: 2000, tripBetta: 4500 },
        { id: 37, dailyBetta: 350, appPayAdvance: 1200, tripBetta: 4500 }
    ]
}
const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
} as unknown as Response
const mockGetDriverIdByTripIdData = {
    id: 1,
    driverId: 1
}
const mockCreateDriverAdvanceData = {
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
const mockDriverAdvanceData = [
    {
        tripId: 1,
        driver: { name: 'sakthi' },
        driverAdvanceForTrip: [{ amount: 1000 }]
    }
]
const mockTripExpensesData = [
    {
        tripId: 1,
        acceptedAmount: 200
    }
]
describe('driverTrip Controller', () => {
    test('should able to create driver Trip', async () => {
        mockCreateDriverTrip.mockResolvedValue(mockDriverTripData.body)
        createDriverTrip(mockDriverTripData, mockRes)
        await supertest(app).post('/api/drivertrip').expect(200)
        expect(mockCreateDriverTrip).toBeCalledTimes(2)
    })
    test('should able to get all driver Trip by Id', async () => {
        mockGetAllDriverTripById.mockResolvedValue(mockGetDriverTripData)
        vi.spyOn(axios, 'get').mockResolvedValue(mockGetOverAllTripByArrayOfIdData)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        await supertest(app).get('/api/drivertrip').query({ driverId: 1 }).expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(1)
        expect(mockGetAllExpenseCountByTripId).toBeCalledTimes(1)
    })
    test('should able to update driver advance by trip id', async () => {
        mockGetDriverIdByTripId.mockResolvedValue(mockGetDriverIdByTripIdData)
        mockCreateDriverAdvance.mockResolvedValue(mockCreateDriverAdvanceData)
        await updateDriverAdvance(mockUpdateDriverAdvance, mockRes)
        expect(mockGetDriverIdByTripId).toHaveBeenCalledWith(mockUpdateDriverAdvance.body.tripId)
        expect(mockCreateDriverAdvance).toHaveBeenCalledWith({
            driverTripId: mockGetDriverIdByTripIdData.id,
            amount: parseInt(mockUpdateDriverAdvance.body.driverAdvance),
            advanceDate: dayjs.utc().startOf('day').unix()
        })
        expect(mockGetDriverIdByTripId).toBeCalledTimes(1)
    })
    test('should return driver advances and expenses with total amount', async () => {
        const tripId = 1
        mockGetDriverAdvance.mockResolvedValue(mockDriverAdvanceData)
        mockGetExpensesByTripId.mockResolvedValue(mockTripExpensesData)

        await supertest(app)
            .get('/api/driverDetails')
            .query({ id: tripId })
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    driverAdvances: mockDriverAdvanceData,
                    amount: 200
                })
            })
        expect(mockGetDriverAdvance).toHaveBeenCalledWith(tripId)
        expect(mockGetExpensesByTripId).toHaveBeenCalledWith(tripId)
        expect(mockGetDriverAdvance).toBeCalledTimes(1)
        expect(mockGetExpensesByTripId).toBeCalledTimes(1)
    })
})
