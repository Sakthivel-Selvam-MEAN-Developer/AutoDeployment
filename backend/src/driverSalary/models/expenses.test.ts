import seedExpenses from '../seed/expenses.ts'
import { create, getAllExpenses } from './expenses.ts'

describe('Driver model', () => {
    test('should able to create', async () => {
        const expense = await create(seedExpenses)
        const actual = await getAllExpenses()
        expect(actual.length).toBe(1)
        expect(actual[0].amount).toBe(expense.amount)
    })
})
