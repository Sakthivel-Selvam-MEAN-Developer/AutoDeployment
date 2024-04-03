import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { createExpense } from './expense.ts'

const mockCreateExpense = vi.fn()
const mockGetAllExpenses = vi.fn()
const mockGetAllExpenseByTripId = vi.fn()

vi.mock('../models/expenses', () => ({
    create: (inputs: any) => mockCreateExpense(inputs),
    getAllExpenses: () => mockGetAllExpenses(),
    getAllExpenseByTripId: () => mockGetAllExpenseByTripId()
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

describe('Expense Controller', () => {
    test('should able to create expense', async () => {
        createExpense(mockExpenseData, mockRes)
        mockCreateExpense.mockResolvedValue(mockExpenseData.body)
    })
    test.skip('should able to get all expense', async () => {
        mockGetAllExpenses.mockResolvedValue(mockExpenseData.body)
        await supertest(app).get('/api/expenses').expect(200)
        expect(mockGetAllExpenses).toBeCalledTimes(1)
    })
    test('should able to get all expense', async () => {
        mockGetAllExpenseByTripId.mockResolvedValue(mockExpenseData.body)
        await supertest(app).get('/api/expenses').expect(200)
        expect(mockGetAllExpenseByTripId).toBeCalledTimes(1)
    })
})
