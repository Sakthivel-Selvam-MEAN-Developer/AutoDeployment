import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.employeeCreateInput | Prisma.employeeUncheckedCreateInput) =>
    prisma.employee.create({ data })

export const getAllEmployee = () => prisma.employee.findMany({})
