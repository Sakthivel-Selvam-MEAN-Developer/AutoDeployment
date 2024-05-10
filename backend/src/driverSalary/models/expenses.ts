import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'
import { updateExpenseType } from '../controller/expense.ts'

export const create = (data: Prisma.expensesCreateManyInput | Prisma.expensesCreateManyInput[]) =>
    prisma.expenses.createMany({ data })

export const groupAllExpensesByTripId = (tripId: number[]) =>
    prisma.expenses.groupBy({
        by: ['tripId'],
        where: {
            tripId: { in: tripId },
            expenseApproval: false
        }
    })
export const getAllExpenses = () => prisma.expenses.findMany({})

export const getAllExpenseByTripId = (id: number) =>
    prisma.expenses.findMany({
        where: { tripId: id },
        select: { expenseType: true, tripId: true, id: true, placedAmount: true }
    })

export const getAllExpenseForApproval = (tripId: number[]) =>
    prisma.expenses.findMany({
        where: {
            tripId: { in: tripId },
            expenseApproval: false
        },
        select: { expenseType: true, tripId: true, id: true, placedAmount: true }
    })

export const getAllExpenseCountByTripId = (id: number[]) =>
    prisma.expenses.findMany({
        where: {
            tripId: { in: id },
            expenseApproval: true
        },
        select: {
            acceptedAmount: true,
            tripId: true
        }
    })

export const updateExpenseApproval = (id: number, data: updateExpenseType) =>
    prisma.expenses.update({
        where: { id },
        data: {
            acceptedAmount: data.acceptedAmount,
            rejectableReason: data.rejectableReason,
            expenseApproval: true
        }
    })
