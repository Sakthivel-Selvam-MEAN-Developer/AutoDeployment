import { Router } from 'express'
import {
    createExpense,
    listAllExpenseByTripId,
    ListAllExpenseByTripIdForApproval,
    updateExpenseApproval
} from '../controller/expense.ts'

const expenseRoutes = (router: Router) => {
    router.post('/expenses', createExpense)
    router.get('/expenses', listAllExpenseByTripId)
    router.get('/expensesApproval', ListAllExpenseByTripIdForApproval)
    router.post('/updateExpensesApproval', updateExpenseApproval)
}

export default expenseRoutes
