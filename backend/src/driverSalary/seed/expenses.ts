import { expensesType } from '@prisma/client' // Import the Role enum

export const seedExpenses= {
    expenseType: expensesType.UNLOADING_CHARGES,
    amount: 500,
    tripId: 1
}
