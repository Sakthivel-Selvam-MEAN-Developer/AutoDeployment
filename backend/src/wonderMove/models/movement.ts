import { Prisma } from '@prisma/client'
import prisma from './index.ts'

export const createMany = (data: Prisma.vehicleMovementsCreateManyInput[]) =>
    prisma.vehicleMovements.createMany({ data })
