import { Router } from 'express'
import {
    createExpense,
    listAllExpenseByTripId,
    ListAllExpenseByTripIdForApproval
} from '../controller/expense.ts'

const expenseRoutes = (router: Router) => {
    router.post('/expenses', createExpense)
    router.get('/expenses', listAllExpenseByTripId)
    router.get('/expensesApproval', ListAllExpenseByTripIdForApproval)
}

export default expenseRoutes
