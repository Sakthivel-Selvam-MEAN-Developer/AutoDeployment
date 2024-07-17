import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import prisma from '../../../prisma/index.ts'
import { updateExpenseType } from '../controller/expense.ts'

dayjs.extend(utc)

export const create = (data: Prisma.expensesCreateManyInput | Prisma.expensesCreateManyInput[]) =>
    prisma.expenses.createMany({ data })

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
            expenseType: true,
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
            expenseApproval: true,
            expenseDate: dayjs.utc().startOf('day').unix()
        }
    })
