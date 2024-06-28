import { seedExpenses } from '../seed/expenses.ts'
import { create, getAllExpenseByTripId, getAllExpenses } from './expenses.ts'

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
})
