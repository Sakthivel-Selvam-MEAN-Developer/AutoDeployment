import { seedExpenses } from '../seed/expenses.ts'
import {
    create,
    getAllExpenseByTripId,
    getAllExpenses,
    getAllExpenseForApproval,
    updateExpenseApproval,
    getAllExpenseCountByTripId
} from './expenses.ts'

describe('Driver model', () => {
    test('should able to create', async () => {
        const expense = await create([seedExpenses])
        const actual = await getAllExpenses()
        expect(actual.length).toBe(expense.count)
    })
    test('should able to getAllExpenses', async () => {
        const expense = await create([seedExpenses])
        const actual = await getAllExpenses()
        expect(actual.length).toBe(expense.count)
    })
    test('should able to getAllExpenseByTripId', async () => {
        await create([seedExpenses])
        const actual = await getAllExpenseByTripId(seedExpenses.tripId)
        expect(actual[0].placedAmount).toBe(seedExpenses.placedAmount)
    })
    test('should able to getAllExpenseForApproval', async () => {
        await create([seedExpenses])
        const actual = await getAllExpenseForApproval([seedExpenses.tripId])
        expect(actual[0].placedAmount).toBe(seedExpenses.placedAmount)
    })
    test('should able to update Expense Approval', async () => {
        await create([seedExpenses])
        const expense = await getAllExpenses()
        const expenseApprovedData = {
            acceptedAmount: 1000,
            rejectableReason: 'qw'
        }
        const actual = await updateExpenseApproval(expense[0].id, expenseApprovedData)
        expect(actual.acceptedAmount).toBe(expenseApprovedData.acceptedAmount)
    })
    test('should able to getAllExpenseCountByTripId', async () => {
        await create([{ ...seedExpenses, expenseApproval: true }])
        const expense = await getAllExpenses()
        const actual = await getAllExpenseCountByTripId([expense[0].tripId])
        expect(actual[0].tripId).toBe(seedExpenses.tripId)
    })
})
