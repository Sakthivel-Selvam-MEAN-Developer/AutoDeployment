import { Router } from 'express'
import { createExpense, listAllExpenses } from '../controller/expense.ts'

const expenseRoutes = (router: Router) => {
    router.post('/expenses', createExpense)
    router.get('/expenses', listAllExpenses)
}

export default expenseRoutes
