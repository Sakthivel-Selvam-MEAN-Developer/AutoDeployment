import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const create = (data: Prisma.driverCreateInput | Prisma.driverUncheckedCreateInput) =>
    prisma.driver.create({ data })

export const getAllDriver = () => prisma.driver.findMany({})
