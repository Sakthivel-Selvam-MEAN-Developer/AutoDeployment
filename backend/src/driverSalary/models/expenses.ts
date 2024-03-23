import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.expensesCreateInput | Prisma.expensesUncheckedCreateInput) =>
    prisma.expenses.create({ data })

export const getAllExpenses = () => prisma.expenses.findMany({})

// export const getAllExpensesByTrip = (overallTripId: number) =>
//     prisma.expenses.findMany({
//         where: {
//             overallTripId
//         }
//     })
