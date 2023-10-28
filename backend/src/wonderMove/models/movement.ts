import prisma from './index.ts'
import { Prisma } from '@prisma/client'

export const createMany = (data: Prisma.vehicleMovementsCreateManyInput[]) =>
    prisma.vehicleMovements.createMany({ data })
