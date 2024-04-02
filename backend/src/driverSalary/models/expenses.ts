import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.expensesCreateManyInput | Prisma.expensesCreateManyInput[]) =>
    prisma.expenses.createMany({ data })

export const getAllExpenses = () => prisma.expenses.findMany({})
