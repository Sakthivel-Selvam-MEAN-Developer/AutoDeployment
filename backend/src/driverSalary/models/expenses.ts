import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.expensesCreateManyInput | Prisma.expensesCreateManyInput[]) =>
    prisma.expenses.createMany({ data })

export const groupAllExpensesByTripId = () =>
    prisma.expenses.groupBy({
        by: ['tripId']
    })
export const getAllExpenses = () => prisma.expenses.findMany({})

export const getAllExpenseByTripId = (id: number) =>
    prisma.expenses.findMany({
        where: { tripId: id },
        select: { expenseType: true, tripId: true, id: true, amount: true }
    })

export const getAllExpenseForApproval = () =>
    prisma.expenses.findMany({
        where: {
            expenseApproval: false
        },
        select: { expenseType: true, tripId: true, id: true, amount: true }
    })

export const getAllExpenseCountByTripId = (id: number[]) =>
    prisma.expenses.findMany({
        where: {
            tripId: { in: id }
        },
        select: {
            amount: true,
            tripId: true
        }
    })
