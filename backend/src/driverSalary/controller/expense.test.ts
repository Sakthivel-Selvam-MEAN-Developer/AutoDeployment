import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import dayjs from 'dayjs'
import { app } from '../../app.ts'
import { createExpense, getOverallTrip } from './expense.ts'

const mockCreateExpense = vi.fn()
const mockGetAllExpenses = vi.fn()
const mockGetAllExpenseByTripId = vi.fn()
const mockGetAllDriverTripById = vi.fn()
const mockGetAllExpenseForApproval = vi.fn()
const mockupdateExpense = vi.fn()

vi.mock('axios', () => ({
    default: {
        get: vi.fn()
    }
}))
vi.mock('../models/expenses', () => ({
    create: (inputs: any) => mockCreateExpense(inputs),
    getAllExpenses: () => mockGetAllExpenses(),
    getAllExpenseByTripId: () => mockGetAllExpenseByTripId(),
    getAllExpenseForApproval: (tripId: number) => mockGetAllExpenseForApproval(tripId),
    updateExpenseApproval: (expenseId: number, data: any) => mockupdateExpense(expenseId, data)
}))
vi.mock('../models/driverTrip', () => ({
    getAllDriverTripById: (driverId: number, date: any) => mockGetAllDriverTripById(driverId, date)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockExpenseData = {
    body: [
        {
            id: 1,
            amount: 5000,
            expenseType: 'LOADING_CHARGES',
            tripId: 1
        }
    ]
} as Request

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
} as unknown as Response
const mockgetAllDriverTripByIdData = [
    {
        id: 1,
        tripStartDate: 1719556641,
        driver: {
            id: 1,
            name: 'sakthi',
            driverAttendance: {
                attendance: [
                    {
                        year: 2024,
                        attendance: [
                            {
                                month: 'May',
                                presentDates: [1, 4, 5, 6]
                            }
                        ]
                    }
                ]
            }
        },
        tripId: 1,
        unloadingTripSalaryId: 2,
        stockTripSalaryId: 3,
        driverAdvanceForTrip: {
            amount: 1200,
            advanceDate: 1719532800
        },
        primaryTripBetta: 1200,
        secondaryTripBetta: 300,
        dailyBetta: 350
    }
]
const mockGetAllExpenseForApprovalData = [
    {
        expenseType: 'Loading_Charges',
        tripId: 1,
        id: 4,
        placedAmount: 5000
    }
]
const mockApiResponse = [
    {
        id: 1,
        fuel: {
            fuelType: 'Full tank',
            dieselkilometer: 12000,
            vehicleNumber: 'TN01B1234',
            quantity: 120,
            totalprice: 100,
            fueledDate: 1719532800,
            invoiceNumber: 'ASWE01',
            bunk: { bunkName: 'Sakthi Petroleum' }
        },
        loadingPointToUnloadingPointTrip: {
            id: 2,
            filledLoad: 45,
            loadingPoint: {
                name: 'Chennia',
                cementCompany: { name: 'UltraTech Cements' }
            },
            invoiceNumber: 'AWSQW12',
            startDate: 1719014400,
            unloadingPoint: { name: 'Salem' },
            truck: { vehicleNumber: 'TN01B1234' }
        },
        loadingPointToStockPointTrip: null
    }
]
const mockUpdateExpenseData = {
    acceptedAmount: 1200,
    rejectableReason: 'NA',
    expenseApproval: true,
    expenseDate: dayjs.utc().startOf('day').unix()
}
describe('Expense Controller', () => {
    test('should able to create expense', async () => {
        createExpense(mockExpenseData, mockRes)
        mockCreateExpense.mockResolvedValue(mockExpenseData.body)
    })
    test('should able to get all expense', async () => {
        mockGetAllExpenseByTripId.mockResolvedValue(mockExpenseData.body)
        await supertest(app).get('/api/expenses').expect(200)
        expect(mockGetAllExpenseByTripId).toBeCalledTimes(1)
    })
    test('should list all expenses by id for approval', async () => {
        const headers = { hostname: 'http://localhost' }
        const overallTripIds = '[1]'

        vi.spyOn(axios, 'get').mockResolvedValue({ data: mockApiResponse })
        mockGetAllDriverTripById.mockResolvedValue(mockgetAllDriverTripByIdData)
        mockGetAllExpenseForApproval.mockResolvedValue(mockGetAllExpenseForApprovalData)

        await supertest(app)
            .get('/api/expensesApproval')
            .query({ driverId: mockgetAllDriverTripByIdData[0].driver.id })
            .expect(200)

        await getOverallTrip(headers.hostname, overallTripIds)
        expect(axios.get).toHaveBeenCalledWith('http://localhost/api/overalltrip/ids', {
            params: { ids: overallTripIds }
        })

        expect(mockGetAllDriverTripById).toHaveBeenCalledWith(1, undefined)
        expect(mockGetAllExpenseForApproval).toHaveBeenCalledWith([1])

        expect(mockGetAllDriverTripById).toHaveBeenCalledTimes(1)
        expect(mockGetAllExpenseForApproval).toHaveBeenCalledTimes(1)
    })
    test('should update expenses approval', async () => {
        const expenseId = 1
        const mockBody = {
            acceptedAmount: 1200,
            rejectableReason: 'NA'
        }
        mockupdateExpense.mockResolvedValue(mockUpdateExpenseData)
        await supertest(app)
            .post('/api/updateExpensesApproval')
            .query({ expenseId })
            .send(mockBody)
            .expect(200)
            .then((data) => {
                expect(data.body).toStrictEqual(mockUpdateExpenseData)
            })
    })
})
