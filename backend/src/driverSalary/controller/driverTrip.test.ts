import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { app } from '../../app.ts'
import { createDriverTrip, updateDriverAdvance } from './driverTrip.ts'

const mockCreateDriverTrip = vi.fn()
const mockGetAllDriverTripById = vi.fn()
const mockGetTripSalaryDetailsById = vi.fn()
const mockGetAllExpenseCountByTripId = vi.fn()
const mockGetOverAllTripByArrayOfId = vi.fn()
const mockGetDriverIdByTripId = vi.fn()
const mockCreateDriverAdvance = vi.fn()
const mockGetPreviousFuel = vi.fn()
const mockGetDriverAdvance = vi.fn()
const mockGetExpensesByTripId = vi.fn()
const mockGtDriverTripByOverallId = vi.fn()

vi.mock('../models/driverTrip', () => ({
    create: (inputs: any) => mockCreateDriverTrip(inputs),
    getAllDriverTripById: (id: number[]) => mockGetAllDriverTripById(id),
    getDriverIdByTripId: (tripId: number) => mockGetDriverIdByTripId(tripId),
    getDriverAdvance: (id: number) => mockGetDriverAdvance(id),
    getExpensesByTripIds: (tripId: number) => mockGetExpensesByTripId(tripId),
    getDriverTripByOverallId: (id: number) => mockGtDriverTripByOverallId(id)
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
vi.mock('./getPreviosFuel', () => ({
    getPreviousFuel: (inputs: number) => mockGetPreviousFuel(inputs)
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
        tripId: 1,
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
        primaryTripBetta: 2000,
        secondaryTripBetta: 1200,
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

const mockGetAllExpenseCountByTripIdData = [
    { expenseType: 'Loading_Charges', acceptedAmount: 123, tripId: 1 }
]
const mockGetOverAllTripByArrayOfIdData = {
    data: [
        {
            id: 1,
            fuel: [
                {
                    fuelType: 'Full tank',
                    dieselkilometer: 5100,
                    vehicleNumber: 'TN12G9456',
                    quantity: 12,
                    totalprice: 1200,
                    fueledDate: 1719400371,
                    invoiceNumber: 'asdfghjkl',
                    bunk: { bunkName: 'SRK Barath Petroleum' }
                }
            ]
        }
    ]
}
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
    body: { driverAdvance: '1234', tripId: 3, advanceDate: 1714674600 }
} as Request
const previousFuelDetails = {
    fuelType: 'Full tank',
    dieselkilometer: 5000,
    vehicleNumber: 'TN12G9456',
    quantity: 13,
    totalprice: 1200,
    fueledDate: 1719400371,
    invoiceNumber: 'asdfghjkl',
    bunk: { bunkName: 'SRK Barath Petroleum' }
}
const mockGetTripSalaryDetailsByIdData = [
    {
        id: 1,
        dailyBetta: 350,
        appPayAdvance: 2300,
        tripBetta: 1200
    }
]
const mockGtDriverTripByOverallIdData = [
    {
        id: 1,
        driverId: 2,
        stockTripSalaryId: 2,
        unloadingTripSalaryId: 2,
        tripId: 1
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
        vi.spyOn(axios, 'get').mockResolvedValue(mockGetOverAllTripByArrayOfIdData)
        mockGetAllDriverTripById.mockResolvedValue(mockGetDriverTripData)
        mockGetPreviousFuel.mockResolvedValue(previousFuelDetails)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        await supertest(app).get('/api/drivertrip').query({ driverId: 1 }).expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(1)
        expect(mockGetAllExpenseCountByTripId).toBeCalledTimes(1)
    })
    test('should not able to get all driver Trip by Id', async () => {
        mockGetAllDriverTripById.mockResolvedValue([])
        mockGetPreviousFuel.mockResolvedValue(previousFuelDetails)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        vi.spyOn(axios, 'get').mockResolvedValue(mockGetOverAllTripByArrayOfIdData)
        await supertest(app).get('/api/drivertrip').query({ driverId: 1 }).expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(2)
        expect(mockGetAllExpenseCountByTripId).toBeCalledTimes(1)
    })
    test('should able to get all driver Trip by Id btu should return without fuel', async () => {
        mockGetAllDriverTripById.mockResolvedValue(mockGetDriverTripData)
        mockGetPreviousFuel.mockResolvedValue(previousFuelDetails)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        vi.spyOn(axios, 'get').mockResolvedValue({
            data: [{ ...mockGetOverAllTripByArrayOfIdData.data[0], fuel: [] }]
        })
        await supertest(app)
            .get('/api/drivertrip')
            .query({ driverId: 1, month: 1719400371 })
            .expect(200)
        expect(mockGetAllDriverTripById).toBeCalledTimes(3)
        expect(mockGetAllExpenseCountByTripId).toBeCalledTimes(2)
    })
    test('should able to update driver advance by trip id', async () => {
        mockGetDriverIdByTripId.mockResolvedValue(mockGetDriverIdByTripIdData)
        mockCreateDriverAdvance.mockResolvedValue(mockCreateDriverAdvanceData)
        await updateDriverAdvance(mockUpdateDriverAdvance, mockRes)
        expect(mockGetDriverIdByTripId).toHaveBeenCalledWith(mockUpdateDriverAdvance.body.tripId)
        expect(mockCreateDriverAdvance).toHaveBeenCalledWith({
            driverTripId: mockGetDriverIdByTripIdData.id,
            amount: parseInt(mockUpdateDriverAdvance.body.driverAdvance),
            advanceDate: 1714674600
        })
        expect(mockGetDriverIdByTripId).toBeCalledTimes(1)
    })
    test('should not able to update driver advance by trip id if driver trip is null', async () => {
        mockGetDriverIdByTripId.mockResolvedValue(null)
        await updateDriverAdvance(mockUpdateDriverAdvance, mockRes)
        await supertest(app).get('/api/drivertrip/updateDriverAdvance').expect(500)
        expect(mockGetDriverIdByTripId).toHaveBeenCalledWith(mockUpdateDriverAdvance.body.tripId)
        expect(mockGetDriverIdByTripId).toBeCalledTimes(2)
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
    test('should list all driver trip by overallTrip id', async () => {
        const id = '1'
        mockGtDriverTripByOverallId.mockResolvedValue(mockGtDriverTripByOverallIdData)
        mockGetAllExpenseCountByTripId.mockResolvedValue(mockGetAllExpenseCountByTripIdData)
        mockGetTripSalaryDetailsById.mockResolvedValue(mockGetTripSalaryDetailsByIdData)
        await supertest(app)
            .get('/api//drivertrip/getDriverTrip')
            .query({ id })
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    expenses: mockGetAllExpenseCountByTripIdData,
                    tripSalaryDetails: mockGetTripSalaryDetailsByIdData,
                    driverTrip: mockGtDriverTripByOverallIdData
                })
            })
        expect(mockGtDriverTripByOverallId).toHaveBeenCalledTimes(1)
        expect(mockGetAllExpenseCountByTripId).toHaveBeenCalledTimes(3)
        expect(mockGetTripSalaryDetailsById).toHaveBeenCalledTimes(1)
        expect(mockGtDriverTripByOverallId).toHaveBeenCalledWith(1)
        expect(mockGetAllExpenseCountByTripId).toHaveBeenCalledWith([1])
        expect(mockGetTripSalaryDetailsById).toHaveBeenCalledWith([2, 2])
    })
})
