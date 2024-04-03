import { Router } from 'express'
import { createExpense, listAllExpenseByTripId } from '../controller/expense.ts'

const expenseRoutes = (router: Router) => {
    router.post('/expenses', createExpense)
    router.get('/expenses', listAllExpenseByTripId)
}

export default expenseRoutes
